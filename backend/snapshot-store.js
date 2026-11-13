const fs = require("fs");
const path = require("path");
const { API_FRONT_DIR, API_ALIAS_STEMS, SITE_DIR } = require("./config");
const { safeJoin, isFile, walkFiles, normalizeApiStem } = require("./http-utils");
const { unwrapSnapshotPayload } = require("./crypto");

class SnapshotStore {
  constructor() {
    this.apiStemToFile = new Map();
    this.apiPrefixToFile = new Map();
    this.wrappedFileCache = new Map();
    this.wrappedStemCache = new Map();
    this.decryptedCache = new Map();
    this.WRAPPED_FILE_CACHE_MAX = 12;
    this.WRAPPED_STEM_CACHE_MAX = 160;
    this.indexSnapshots();
  }

  setLruEntry(map, key, value, maxEntries) {
    if (map.has(key)) {
      map.delete(key);
    }
    map.set(key, value);
    const max = Math.max(1, Number(maxEntries || 0));
    while (map.size > max) {
      const oldestKey = map.keys().next().value;
      if (typeof oldestKey === "undefined") {
        break;
      }
      map.delete(oldestKey);
    }
  }

  indexSnapshots() {
    if (!fs.existsSync(API_FRONT_DIR)) {
      return;
    }

    for (const absFile of walkFiles(API_FRONT_DIR)) {
      if (path.extname(absFile).toLowerCase() !== ".html") {
        continue;
      }

      const relStem = `/${path
        .relative(SITE_DIR, absFile)
        .replace(/\\/g, "/")
        .replace(/\.html$/i, "")}`;

      if (!this.apiStemToFile.has(relStem)) {
        this.apiStemToFile.set(relStem, absFile);
      }

      const dir = relStem.slice(0, relStem.lastIndexOf("/") + 1);
      const base = relStem.slice(relStem.lastIndexOf("/") + 1);
      const dashIdx = base.indexOf("-");
      if (dashIdx > 0) {
        const prefixStem = `${dir}${base.slice(0, dashIdx)}`;
        if (!this.apiPrefixToFile.has(prefixStem)) {
          this.apiPrefixToFile.set(prefixStem, absFile);
        }
      }
    }
  }

  resolveApiSnapshot(requestPath) {
    const noExtStem = normalizeApiStem(requestPath);

    const directPath = safeJoin(SITE_DIR, requestPath.replace(/^\//, ""));
    if (directPath && isFile(directPath)) {
      return directPath;
    }

    const htmlPath = safeJoin(SITE_DIR, `${noExtStem.replace(/^\//, "")}.html`);
    if (htmlPath && isFile(htmlPath)) {
      return htmlPath;
    }

    if (this.apiStemToFile.has(noExtStem)) {
      return this.apiStemToFile.get(noExtStem);
    }
    if (this.apiPrefixToFile.has(noExtStem)) {
      return this.apiPrefixToFile.get(noExtStem);
    }

    const alias = API_ALIAS_STEMS.get(noExtStem);
    if (alias) {
      if (this.apiStemToFile.has(alias)) {
        return this.apiStemToFile.get(alias);
      }
      if (this.apiPrefixToFile.has(alias)) {
        return this.apiPrefixToFile.get(alias);
      }
    }

    for (const [prefixStem, absFile] of this.apiPrefixToFile.entries()) {
      if (noExtStem.startsWith(`${prefixStem}-`)) {
        return absFile;
      }
    }
    return null;
  }

  readWrappedSnapshot(requestPath) {
    const absFile = this.resolveApiSnapshot(requestPath);
    if (!absFile || !isFile(absFile)) {
      return null;
    }
    const stemKey = normalizeApiStem(requestPath);
    const stemCached = this.wrappedStemCache.get(stemKey);
    if (stemCached && stemCached.filePath === absFile && this.wrappedFileCache.has(absFile)) {
      const cached = this.wrappedFileCache.get(absFile);
      if (cached && cached.value) {
        this.setLruEntry(this.wrappedStemCache, stemKey, stemCached, this.WRAPPED_STEM_CACHE_MAX);
        this.setLruEntry(this.wrappedFileCache, absFile, cached, this.WRAPPED_FILE_CACHE_MAX);
        return cached.value;
      }
    }
    try {
      const stat = fs.statSync(absFile);
      const cached = this.wrappedFileCache.get(absFile);
      if (
        cached &&
        Number(cached.mtimeMs || 0) === Number(stat.mtimeMs || 0) &&
        Number(cached.size || 0) === Number(stat.size || 0)
      ) {
        this.setLruEntry(this.wrappedFileCache, absFile, cached, this.WRAPPED_FILE_CACHE_MAX);
        this.setLruEntry(
          this.wrappedStemCache,
          stemKey,
          { filePath: absFile },
          this.WRAPPED_STEM_CACHE_MAX
        );
        return cached.value;
      }

      const parsed = JSON.parse(fs.readFileSync(absFile, "utf8"));
      this.setLruEntry(
        this.wrappedFileCache,
        absFile,
        {
          mtimeMs: Number(stat.mtimeMs || 0),
          size: Number(stat.size || 0),
          value: parsed
        },
        this.WRAPPED_FILE_CACHE_MAX
      );
      this.setLruEntry(
        this.wrappedStemCache,
        stemKey,
        { filePath: absFile },
        this.WRAPPED_STEM_CACHE_MAX
      );
      return parsed;
    } catch {
      return null;
    }
  }

  readDecryptedSnapshot(requestPath) {
    const cacheKey = normalizeApiStem(requestPath);
    const absFile = this.resolveApiSnapshot(requestPath);
    if (!absFile || !isFile(absFile)) {
      return null;
    }

    try {
      const stat = fs.statSync(absFile);
      const cached = this.decryptedCache.get(cacheKey);
      if (
        cached &&
        cached.value &&
        cached.filePath === absFile &&
        Number(cached.mtimeMs || 0) === Number(stat.mtimeMs || 0) &&
        Number(cached.size || 0) === Number(stat.size || 0)
      ) {
        this.setLruEntry(this.decryptedCache, cacheKey, cached, this.WRAPPED_STEM_CACHE_MAX);
        return cached.value;
      }
    } catch {
      return null;
    }

    const wrapped = this.readWrappedSnapshot(requestPath);
    if (!wrapped) {
      return null;
    }
    const value = unwrapSnapshotPayload(wrapped);
    try {
      const stat = fs.statSync(absFile);
      this.setLruEntry(
        this.decryptedCache,
        cacheKey,
        {
          filePath: absFile,
          mtimeMs: Number(stat.mtimeMs || 0),
          size: Number(stat.size || 0),
          value
        },
        this.WRAPPED_STEM_CACHE_MAX
      );
    } catch {
      this.setLruEntry(
        this.decryptedCache,
        cacheKey,
        { filePath: absFile, mtimeMs: 0, size: 0, value },
        this.WRAPPED_STEM_CACHE_MAX
      );
    }
    return value;
  }
}

module.exports = {
  SnapshotStore
};
