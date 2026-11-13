const fs = require("fs");
const path = require("path");
const {
  ROOT_DIR,
  SITE_DIR,
  MIRROR_HOST_TO_DIR,
  FORCED_FILE_BY_REQUEST_PATH,
  FORCED_MIME_BY_REQUEST_PATH
} = require("./config");
const { safeJoin, isFile } = require("./http-utils");

const STATIC_PATH_CACHE_TTL_MS = Math.max(
  10 * 1000,
  Number(process.env.STATIC_PATH_CACHE_TTL_MS || 60 * 1000)
);
const STATIC_PATH_CACHE_MAX_ENTRIES = Math.max(
  100,
  Number(process.env.STATIC_PATH_CACHE_MAX_ENTRIES || 3000)
);
const staticPathCache = new Map();

function getCachedStaticPath(pathname = "", now = Date.now()) {
  const key = String(pathname || "");
  if (!key) {
    return undefined;
  }
  const cached = staticPathCache.get(key);
  if (!cached) {
    return undefined;
  }
  if (now - Number(cached.at || 0) > STATIC_PATH_CACHE_TTL_MS) {
    staticPathCache.delete(key);
    return undefined;
  }
  staticPathCache.delete(key);
  staticPathCache.set(key, cached);
  return cached.value;
}

function setCachedStaticPath(pathname = "", value = null) {
  const key = String(pathname || "");
  if (!key) {
    return;
  }
  if (staticPathCache.has(key)) {
    staticPathCache.delete(key);
  }
  staticPathCache.set(key, {
    at: Date.now(),
    value: value || null
  });
  while (staticPathCache.size > STATIC_PATH_CACHE_MAX_ENTRIES) {
    const oldestKey = staticPathCache.keys().next().value;
    if (typeof oldestKey === "undefined") {
      break;
    }
    staticPathCache.delete(oldestKey);
  }
}

function resolveStaticPath(pathname) {
  const cached = getCachedStaticPath(pathname, Date.now());
  if (typeof cached !== "undefined") {
    return cached;
  }

  const clean = pathname.replace(/^\/+/, "");
  if (!clean) {
    const next = path.join(SITE_DIR, "index.html");
    setCachedStaticPath(pathname, next);
    return next;
  }

  const segments = clean.split("/");
  const first = segments[0];
  const mirrorDir = MIRROR_HOST_TO_DIR.get(first);
  const useMirrorHostDir = Boolean(mirrorDir);
  const baseDir = useMirrorHostDir ? path.join(ROOT_DIR, mirrorDir) : SITE_DIR;
  const rel = useMirrorHostDir ? segments.slice(1).join("/") : clean;
  const relPath = rel || "index.html";

  const directPath = safeJoin(baseDir, relPath);
  if (directPath && isFile(directPath)) {
    setCachedStaticPath(pathname, directPath);
    return directPath;
  }

  const isIpLikeTail = /\/\d{1,3}(?:\.\d{1,3}){3}$/i.test(relPath);
  const hasFileExtension = Boolean(path.extname(relPath));
  const treatAsExtensionless = !hasFileExtension || isIpLikeTail;

  if (treatAsExtensionless) {
    const extensionFallbacks = [".css", ".js", ".json", ".txt", ".xml"];
    for (const ext of extensionFallbacks) {
      const alt = safeJoin(baseDir, `${relPath}${ext}`);
      if (alt && isFile(alt)) {
        setCachedStaticPath(pathname, alt);
        return alt;
      }
    }

    const htmlPath = safeJoin(baseDir, `${relPath}.html`);
    if (htmlPath && isFile(htmlPath)) {
      setCachedStaticPath(pathname, htmlPath);
      return htmlPath;
    }

    const indexPath = safeJoin(baseDir, path.posix.join(relPath, "index.html"));
    if (indexPath && isFile(indexPath)) {
      setCachedStaticPath(pathname, indexPath);
      return indexPath;
    }

    // Some casino media URLs include runtime token segments (for example
    // `/newmediaplayer/worli3/<token>`). If the exact token file is absent,
    // fall back to the game-level media shell.
    if (!useMirrorHostDir) {
      const virtualMediaMatch = relPath.match(/^mediaplayer\/virtual\/([^/]+)\/[^/]+$/i);
      if (virtualMediaMatch) {
        const gameId = virtualMediaMatch[1];
        const gameDir = safeJoin(baseDir, path.posix.join("mediaplayer", "virtual", gameId));
        if (gameDir && fs.existsSync(gameDir)) {
          try {
            const firstFile = fs
              .readdirSync(gameDir, { withFileTypes: true })
              .find((entry) => entry.isFile());
            if (firstFile) {
              const gameFile = safeJoin(gameDir, firstFile.name);
              if (gameFile && isFile(gameFile)) {
                setCachedStaticPath(pathname, gameFile);
                return gameFile;
              }
            }
          } catch {}
        }

        const virtualFallback = safeJoin(baseDir, path.posix.join("mediaplayer", "virtual", "index.html"));
        if (virtualFallback && isFile(virtualFallback)) {
          setCachedStaticPath(pathname, virtualFallback);
          return virtualFallback;
        }
      }

      const mediaTokenMatch = relPath.match(
        /^(newmediaplayer|mediaplayer)\/([^/]+)\/[^/]+(?:\/[^/]+)?$/i
      );
      if (mediaTokenMatch) {
        const mediaDir = safeJoin(baseDir, path.posix.join(mediaTokenMatch[1], mediaTokenMatch[2]));
        if (mediaDir && fs.existsSync(mediaDir)) {
          try {
            const firstHtmlFile = fs
              .readdirSync(mediaDir, { withFileTypes: true })
              .find((entry) => entry.isFile() && /\.html?$/i.test(entry.name));
            if (firstHtmlFile) {
              const mediaFile = safeJoin(mediaDir, firstHtmlFile.name);
              if (mediaFile && isFile(mediaFile)) {
                setCachedStaticPath(pathname, mediaFile);
                return mediaFile;
              }
            }
          } catch {}
        }

        const mediaIndexPath = safeJoin(
          baseDir,
          path.posix.join(mediaTokenMatch[1], mediaTokenMatch[2], "index.html")
        );
        if (mediaIndexPath && isFile(mediaIndexPath)) {
          setCachedStaticPath(pathname, mediaIndexPath);
          return mediaIndexPath;
        }
      }
    }
  }

  // Legacy casino UIs request images from `/sitethemedata.com/casino_icons*`.
  // If a specific file is missing in `theme/casino_icons`, fall back to local
  // mirrored icons under `casino/casino-icons`.
  if (/^sitethemedata\.com\//i.test(clean)) {
    const relFromHost = clean.replace(/^sitethemedata\.com\//i, "");
    if (/^casino_icons\//i.test(relFromHost)) {
      const iconRel = relFromHost
        .replace(/^casino_icons\//i, "")
        .replace(/\\/g, "/")
        .replace(/^\/+/, "");
      const iconBaseName = path.basename(iconRel);
      const fallbackCandidates = [
        safeJoin(path.join(ROOT_DIR, "casino", "casino-icons"), iconRel),
        safeJoin(path.join(ROOT_DIR, "casino", "casino-icons", "lc"), iconRel),
        safeJoin(path.join(ROOT_DIR, "casino", "casino-icons", "vc"), iconRel),
        safeJoin(path.join(ROOT_DIR, "casino", "casino-icons", "lc"), iconBaseName),
        safeJoin(path.join(ROOT_DIR, "casino", "casino-icons", "vc"), iconBaseName)
      ];

      for (const candidate of fallbackCandidates) {
        if (candidate && isFile(candidate)) {
          setCachedStaticPath(pathname, candidate);
          return candidate;
        }
      }
    }
  }

  setCachedStaticPath(pathname, null);
  return null;
}

function resolveForcedFile(pathname) {
  const filePath = FORCED_FILE_BY_REQUEST_PATH.get(pathname);
  if (!filePath || !isFile(filePath)) {
    return null;
  }
  return {
    filePath,
    mimeType: FORCED_MIME_BY_REQUEST_PATH.get(pathname)
  };
}

module.exports = {
  resolveStaticPath,
  resolveForcedFile
};
