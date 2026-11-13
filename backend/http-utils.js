const fs = require("fs");
const path = require("path");
const zlib = require("zlib");
const querystring = require("querystring");
const { MIME_TYPES, SECURITY_HEADERS } = require("./config");

const COMPRESSED_FILE_CACHE_TTL_MS = Math.max(
  10 * 1000,
  Number(process.env.COMPRESSED_FILE_CACHE_TTL_MS || 10 * 60 * 1000)
);
const COMPRESSED_FILE_CACHE_MAX_ENTRIES = Math.max(
  20,
  Number(process.env.COMPRESSED_FILE_CACHE_MAX_ENTRIES || 120)
);
const COMPRESSED_FILE_CACHE_MAX_BYTES = Math.max(
  8 * 1024 * 1024,
  Number(process.env.COMPRESSED_FILE_CACHE_MAX_BYTES || 96 * 1024 * 1024)
);
const COMPRESSED_FILE_CACHE_MAX_FILE_BYTES = Math.max(
  128 * 1024,
  Number(process.env.COMPRESSED_FILE_CACHE_MAX_FILE_BYTES || 12 * 1024 * 1024)
);
const compressedFileCache = new Map();
let compressedFileCacheBytes = 0;

function pruneCompressedFileCache(now = Date.now()) {
  for (const [key, entry] of compressedFileCache.entries()) {
    if (!entry || now - Number(entry.at || 0) > COMPRESSED_FILE_CACHE_TTL_MS) {
      compressedFileCache.delete(key);
      compressedFileCacheBytes -= Number(entry && entry.size ? entry.size : 0);
    }
  }
  if (compressedFileCacheBytes < 0) {
    compressedFileCacheBytes = 0;
  }
  while (
    compressedFileCache.size > COMPRESSED_FILE_CACHE_MAX_ENTRIES ||
    compressedFileCacheBytes > COMPRESSED_FILE_CACHE_MAX_BYTES
  ) {
    const oldestKey = compressedFileCache.keys().next().value;
    if (typeof oldestKey === "undefined") {
      break;
    }
    const oldest = compressedFileCache.get(oldestKey);
    compressedFileCache.delete(oldestKey);
    compressedFileCacheBytes -= Number(oldest && oldest.size ? oldest.size : 0);
    if (compressedFileCacheBytes < 0) {
      compressedFileCacheBytes = 0;
    }
  }
}

function getCompressedCacheKey(filePath, stat, encoding) {
  return [
    String(filePath || ""),
    String(encoding || ""),
    Number(stat && stat.size ? stat.size : 0),
    Math.floor(Number(stat && stat.mtimeMs ? stat.mtimeMs : 0))
  ].join("|");
}

function getCachedCompressedFile(cacheKey = "", now = Date.now()) {
  if (!cacheKey) {
    return null;
  }
  const entry = compressedFileCache.get(cacheKey);
  if (!entry) {
    return null;
  }
  if (now - Number(entry.at || 0) > COMPRESSED_FILE_CACHE_TTL_MS) {
    compressedFileCache.delete(cacheKey);
    compressedFileCacheBytes -= Number(entry.size || 0);
    if (compressedFileCacheBytes < 0) {
      compressedFileCacheBytes = 0;
    }
    return null;
  }
  compressedFileCache.delete(cacheKey);
  compressedFileCache.set(cacheKey, entry);
  return entry;
}

function putCachedCompressedFile(cacheKey = "", payload = null) {
  if (!cacheKey || !payload || !Buffer.isBuffer(payload)) {
    return;
  }
  if (!Number.isFinite(payload.length) || payload.length <= 0) {
    return;
  }
  const existing = compressedFileCache.get(cacheKey);
  if (existing) {
    compressedFileCache.delete(cacheKey);
    compressedFileCacheBytes -= Number(existing.size || 0);
  }
  compressedFileCache.set(cacheKey, {
    at: Date.now(),
    size: payload.length,
    payload
  });
  compressedFileCacheBytes += payload.length;
  pruneCompressedFileCache(Date.now());
}

function isFile(filePath) {
  try {
    return fs.statSync(filePath).isFile();
  } catch {
    return false;
  }
}

function safeJoin(baseDir, relPath) {
  const full = path.resolve(baseDir, relPath);
  const normalizedBase = `${path.resolve(baseDir)}${path.sep}`;
  if (!full.startsWith(normalizedBase) && full !== path.resolve(baseDir)) {
    return null;
  }
  return full;
}

function walkFiles(dir, out = []) {
  if (!fs.existsSync(dir)) {
    return out;
  }
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkFiles(abs, out);
      continue;
    }
    out.push(abs);
  }
  return out;
}

function sendJson(res, statusCode, payload, extraHeaders = {}) {
  const body = JSON.stringify(payload);
  res.writeHead(statusCode, {
    ...SECURITY_HEADERS,
    "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
    Pragma: "no-cache",
    Expires: "0",
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body),
    ...extraHeaders
  });
  res.end(body);
}

function sendText(res, statusCode, body, contentType = "text/plain; charset=utf-8", extraHeaders = {}) {
  res.writeHead(statusCode, {
    ...SECURITY_HEADERS,
    "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
    Pragma: "no-cache",
    Expires: "0",
    "Content-Type": contentType,
    "Content-Length": Buffer.byteLength(body),
    ...extraHeaders
  });
  res.end(body);
}

function buildWeakEtag(stat) {
  const size = Number(stat.size || 0).toString(16);
  const mtime = Math.floor(Number(stat.mtimeMs || 0)).toString(16);
  return `W/"${size}-${mtime}"`;
}

function hasContentHash(filePath = "") {
  const name = path.basename(String(filePath || "").toLowerCase());
  if (!name) {
    return false;
  }
  return /(?:^|[._-])[a-f0-9]{8,}(?:[._-]|$)/i.test(name);
}

function getCacheControl(filePath, ext) {
  const normalizedPath = String(filePath || "")
    .replace(/\\/g, "/")
    .toLowerCase();
  const normalized = ext.toLowerCase();
  const fingerprinted = hasContentHash(normalizedPath);
  if (normalized === ".html" || normalized === ".htm") {
    return "no-store, no-cache, must-revalidate, max-age=0";
  }

  // Runtime entry/service-worker files must always be fresh to avoid old UI flash on reload.
  if (
    normalizedPath.endsWith("/site/local/local-runtime-fixes.js") ||
    normalizedPath.endsWith("/site/local/local-bootstrap.js") ||
    normalizedPath.endsWith("/site/local/app-inline-bundle.20260309.js") ||
    normalizedPath.endsWith("/site/firebase-messaging-sw.js") ||
    normalizedPath.endsWith("/sw.js") ||
    normalizedPath.endsWith("/service-worker.js")
  ) {
    return "no-store, no-cache, must-revalidate, max-age=0";
  }

  const cacheableAssetExt = new Set([
    ".js",
    ".mjs",
    ".css",
    ".map",
    ".woff",
    ".woff2",
    ".ttf",
    ".otf",
    ".svg",
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".webp",
    ".ico",
    ".mp4",
    ".webm",
    ".mp3",
    ".wav"
  ]);
  if (cacheableAssetExt.has(normalized) && fingerprinted) {
    return "public, max-age=31536000, immutable";
  }
  if (cacheableAssetExt.has(normalized)) {
    // Non-fingerprinted assets are revalidated each load so deployments never flash stale UI.
    return "public, max-age=0, must-revalidate";
  }

  if (normalized === ".json" || normalized === ".xml" || normalized === ".txt") {
    return "public, max-age=3600";
  }

  return "public, max-age=86400";
}

function isCompressible(contentType) {
  const type = String(contentType || "").toLowerCase();
  return (
    type.startsWith("text/") ||
    type.includes("javascript") ||
    type.includes("json") ||
    type.includes("xml") ||
    type.includes("svg")
  );
}

function pickCompression(req) {
  const acceptEncoding = String(req.headers["accept-encoding"] || "").toLowerCase();
  if (acceptEncoding.includes("br")) {
    return "br";
  }
  if (acceptEncoding.includes("gzip")) {
    return "gzip";
  }
  return "";
}

function sendFile(req, res, filePath, forcedType) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = forcedType || MIME_TYPES[ext] || "application/octet-stream";
  let stat;
  try {
    stat = fs.statSync(filePath);
  } catch (err) {
    if (!res.headersSent) {
      sendText(res, 404, `File not found: ${path.basename(filePath)}`);
    }
    return;
  }
  const etag = buildWeakEtag(stat);
  const lastModified = stat.mtime.toUTCString();
  const cacheControl = getCacheControl(filePath, ext);

  const ifNoneMatch = String(req.headers["if-none-match"] || "");
  const ifModifiedSince = String(req.headers["if-modified-since"] || "");
  const sinceMs = ifModifiedSince ? Date.parse(ifModifiedSince) : NaN;
  const disableConditionalCache = /no-store|no-cache/i.test(cacheControl);
  const notModifiedByTag = ifNoneMatch && ifNoneMatch === etag;
  const notModifiedByDate =
    Number.isFinite(sinceMs) && Math.floor(stat.mtimeMs / 1000) <= Math.floor(sinceMs / 1000);

  if (!disableConditionalCache && (notModifiedByTag || notModifiedByDate)) {
    const notModifiedHeaders = {
      ...SECURITY_HEADERS,
      "Cache-Control": cacheControl,
      ETag: etag,
      "Last-Modified": lastModified,
      Vary: "Accept-Encoding"
    };
    if (/no-store|no-cache/i.test(cacheControl)) {
      notModifiedHeaders.Pragma = "no-cache";
      notModifiedHeaders.Expires = "0";
    }
    res.writeHead(304, {
      ...notModifiedHeaders
    });
    res.end();
    return;
  }

  const compression = pickCompression(req);
  const canCompress = compression && stat.size >= 1024 && isCompressible(contentType);
  const headers = {
    ...SECURITY_HEADERS,
    "Content-Type": contentType,
    "Cache-Control": cacheControl,
    ETag: etag,
    "Last-Modified": lastModified,
    Vary: "Accept-Encoding"
  };
  if (/no-store|no-cache/i.test(cacheControl)) {
    headers.Pragma = "no-cache";
    headers.Expires = "0";
  }

  if (!canCompress) {
    headers["Content-Length"] = stat.size;
  } else if (compression === "br") {
    headers["Content-Encoding"] = "br";
  } else if (compression === "gzip") {
    headers["Content-Encoding"] = "gzip";
  }

  if (canCompress && req.method === "GET" && stat.size <= COMPRESSED_FILE_CACHE_MAX_FILE_BYTES) {
    const cacheKey = getCompressedCacheKey(filePath, stat, compression);
    const cachedCompressed = getCachedCompressedFile(cacheKey, Date.now());
    if (cachedCompressed && Buffer.isBuffer(cachedCompressed.payload)) {
      headers["Content-Length"] = cachedCompressed.payload.length;
      res.writeHead(200, headers);
      res.end(cachedCompressed.payload);
      return;
    }
    try {
      const raw = fs.readFileSync(filePath);
      let compressed = null;
      if (compression === "br") {
        compressed = zlib.brotliCompressSync(raw, {
          params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 5 }
        });
      } else if (compression === "gzip") {
        compressed = zlib.gzipSync(raw, { level: 6 });
      }
      if (compressed && Buffer.isBuffer(compressed)) {
        putCachedCompressedFile(cacheKey, compressed);
        headers["Content-Length"] = compressed.length;
        res.writeHead(200, headers);
        res.end(compressed);
        return;
      }
    } catch {
      // Fallback to stream path below.
    }
  }

  res.writeHead(200, headers);

  const fileStream = fs.createReadStream(filePath);
  fileStream.on("error", () => {
    if (!res.headersSent) {
      sendText(res, 500, "Failed to read file");
    } else {
      res.destroy();
    }
  });

  if (!canCompress) {
    fileStream.pipe(res);
    return;
  }

  if (compression === "br") {
    const br = zlib.createBrotliCompress({
      params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 5 }
    });
    fileStream.pipe(br).pipe(res);
    return;
  }

  const gz = zlib.createGzip({ level: 6 });
  fileStream.pipe(gz).pipe(res);
}

function readRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => {
      chunks.push(chunk);
    });
    req.on("end", () => {
      resolve(Buffer.concat(chunks));
    });
    req.on("error", (error) => {
      reject(error);
    });
  });
}

function parseBodyText(text = "", contentType = "") {
  const normalized = String(contentType || "").toLowerCase();
  if (!text) {
    return {};
  }

  if (normalized.includes("multipart/form-data")) {
    const match = String(contentType).match(/boundary=(?:"([^"]+)"|([^;]+))/i);
    const boundary = (match && (match[1] || match[2])) || "";
    if (!boundary) {
      return {};
    }

    const result = {};
    const delimiter = `--${boundary}`;
    const parts = text.split(delimiter);
    for (const rawPart of parts) {
      const part = String(rawPart || "").trim();
      if (!part || part === "--") {
        continue;
      }

      const headerEndIdx = part.indexOf("\r\n\r\n");
      if (headerEndIdx < 0) {
        continue;
      }

      const headerBlock = part.slice(0, headerEndIdx);
      const bodyBlock = part.slice(headerEndIdx + 4).replace(/\r\n--$/, "").trim();
      const nameMatch = headerBlock.match(/name="([^"]+)"/i);
      if (!nameMatch || !nameMatch[1]) {
        continue;
      }

      const fieldName = nameMatch[1];
      if (Object.prototype.hasOwnProperty.call(result, fieldName)) {
        const prev = result[fieldName];
        result[fieldName] = Array.isArray(prev) ? [...prev, bodyBlock] : [prev, bodyBlock];
      } else {
        result[fieldName] = bodyBlock;
      }
    }
    return result;
  }

  if (normalized.includes("application/json")) {
    try {
      return JSON.parse(text);
    } catch {
      return {};
    }
  }

  if (
    normalized.includes("application/x-www-form-urlencoded")
  ) {
    return querystring.parse(text);
  }

  try {
    return JSON.parse(text);
  } catch {
    return querystring.parse(text);
  }
}

function normalizeScalar(value) {
  if (Array.isArray(value)) {
    return value.length ? value[value.length - 1] : "";
  }
  return value;
}

async function parseRequestPayload(req, urlObj) {
  const queryPayload = {};
  for (const [key, value] of urlObj.searchParams.entries()) {
    queryPayload[key] = value;
  }

  const isBodyMethod = req.method === "POST" || req.method === "PUT" || req.method === "PATCH";
  if (!isBodyMethod) {
    return queryPayload;
  }

  const raw = await readRawBody(req);
  const text = raw.toString("utf8");
  const contentType = req.headers["content-type"] || "";
  const parsedBody = parseBodyText(text, contentType);
  const merged = { ...queryPayload };

  for (const [key, value] of Object.entries(parsedBody)) {
    merged[key] = normalizeScalar(value);
  }
  return merged;
}

function pickFirstValue(payload, keys, fallback = "") {
  for (const key of keys) {
    if (Object.prototype.hasOwnProperty.call(payload, key)) {
      const value = payload[key];
      if (value !== null && value !== undefined && String(value).trim() !== "") {
        return String(value);
      }
    }
  }
  return fallback;
}

function toNumber(value, fallback = 0) {
  let normalized = value;
  if (typeof normalized === "string") {
    normalized = normalized.trim().replace(/,/g, "");
  }
  const num = Number(normalized);
  if (!Number.isFinite(num)) {
    return fallback;
  }
  return num;
}

function normalizeApiStem(pathname) {
  const clean = decodeURIComponent(pathname || "/").replace(/\/+$/, "") || "/";
  return clean.endsWith(".html") ? clean.slice(0, -".html".length) : clean;
}

module.exports = {
  isFile,
  safeJoin,
  walkFiles,
  sendJson,
  sendText,
  sendFile,
  parseRequestPayload,
  pickFirstValue,
  toNumber,
  normalizeApiStem
};
