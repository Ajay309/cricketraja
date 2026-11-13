const path = require("path");
const {
  MIME_TYPES,
  SECURITY_HEADERS,
  UPSTREAM_BASE_URLS,
  MIRROR_HOST_DIRS
} = require("./config");

const ASSET_PREFIXES = [
  "/static/",
  "/assets/",
  "/build/",
  "/media/",
  "/newmediaplayer/",
  "/mediaplayer/",
  "/casino/",
  "/all-sports/",
  "/game-details/"
];
const ASSET_EXTENSIONS = new Set([
  ".html",
  ".htm",
  ".js",
  ".mjs",
  ".css",
  ".map",
  ".json",
  ".svg",
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".webp",
  ".ico",
  ".woff",
  ".woff2",
  ".ttf",
  ".otf",
  ".mp4",
  ".webm",
  ".mp3",
  ".wav"
]);

const UPSTREAM_ASSET_CACHE_TTL_MS = Math.max(
  10 * 1000,
  Number(process.env.UPSTREAM_ASSET_CACHE_TTL_MS || 5 * 60 * 1000)
);
const UPSTREAM_ASSET_CACHE_MAX_ENTRIES = Math.max(
  20,
  Number(process.env.UPSTREAM_ASSET_CACHE_MAX_ENTRIES || 260)
);
const UPSTREAM_ASSET_CACHE_MAX_BYTES = Math.max(
  8 * 1024 * 1024,
  Number(process.env.UPSTREAM_ASSET_CACHE_MAX_BYTES || 96 * 1024 * 1024)
);
const UPSTREAM_ASSET_CACHE_MAX_ENTRY_BYTES = Math.max(
  128 * 1024,
  Number(process.env.UPSTREAM_ASSET_CACHE_MAX_ENTRY_BYTES || 2 * 1024 * 1024)
);
const upstreamAssetCache = new Map();
const pendingUpstreamAssetFetches = new Map();
let upstreamAssetCacheBytes = 0;

function pruneUpstreamAssetCache(now = Date.now()) {
  for (const [key, entry] of upstreamAssetCache.entries()) {
    if (!entry || now - Number(entry.at || 0) > UPSTREAM_ASSET_CACHE_TTL_MS) {
      upstreamAssetCache.delete(key);
      upstreamAssetCacheBytes -= Number(entry && entry.size ? entry.size : 0);
    }
  }
  if (upstreamAssetCacheBytes < 0) {
    upstreamAssetCacheBytes = 0;
  }
  while (
    upstreamAssetCache.size > UPSTREAM_ASSET_CACHE_MAX_ENTRIES ||
    upstreamAssetCacheBytes > UPSTREAM_ASSET_CACHE_MAX_BYTES
  ) {
    const oldestKey = upstreamAssetCache.keys().next().value;
    if (typeof oldestKey === "undefined") {
      break;
    }
    const oldest = upstreamAssetCache.get(oldestKey);
    upstreamAssetCache.delete(oldestKey);
    upstreamAssetCacheBytes -= Number(oldest && oldest.size ? oldest.size : 0);
    if (upstreamAssetCacheBytes < 0) {
      upstreamAssetCacheBytes = 0;
    }
  }
}

function getCachedUpstreamAsset(cacheKey = "", now = Date.now()) {
  if (!cacheKey) {
    return null;
  }
  const entry = upstreamAssetCache.get(cacheKey);
  if (!entry) {
    return null;
  }
  if (now - Number(entry.at || 0) > UPSTREAM_ASSET_CACHE_TTL_MS) {
    upstreamAssetCache.delete(cacheKey);
    upstreamAssetCacheBytes -= Number(entry.size || 0);
    if (upstreamAssetCacheBytes < 0) {
      upstreamAssetCacheBytes = 0;
    }
    return null;
  }
  upstreamAssetCache.delete(cacheKey);
  upstreamAssetCache.set(cacheKey, entry);
  return entry;
}

function putCachedUpstreamAsset(cacheKey = "", record = null) {
  if (!cacheKey || !record || !Buffer.isBuffer(record.payload)) {
    return;
  }
  if (
    !Number.isFinite(record.payload.length) ||
    record.payload.length <= 0 ||
    record.payload.length > UPSTREAM_ASSET_CACHE_MAX_ENTRY_BYTES
  ) {
    return;
  }
  const existing = upstreamAssetCache.get(cacheKey);
  if (existing) {
    upstreamAssetCache.delete(cacheKey);
    upstreamAssetCacheBytes -= Number(existing.size || 0);
  }
  const entry = {
    at: Date.now(),
    size: record.payload.length,
    payload: record.payload,
    contentType: String(record.contentType || "application/octet-stream"),
    cacheControl: String(record.cacheControl || "public, max-age=86400, stale-while-revalidate=600")
  };
  upstreamAssetCache.set(cacheKey, entry);
  upstreamAssetCacheBytes += entry.size;
  pruneUpstreamAssetCache(Date.now());
}

function shouldTryAssetProxy(pathname = "") {
  const clean = String(pathname || "");
  if (!clean || clean === "/") {
    return false;
  }
  if (ASSET_PREFIXES.some((prefix) => clean.startsWith(prefix))) {
    return true;
  }
  const ext = path.extname(clean).toLowerCase();
  return ASSET_EXTENSIONS.has(ext);
}

function isHtmlResponse(contentType = "", ext = "") {
  const type = String(contentType || "").toLowerCase();
  return ext === ".html" || ext === ".htm" || type.includes("text/html");
}

function isTextLikeResponse(contentType = "", ext = "") {
  const type = String(contentType || "").toLowerCase();
  return (
    isHtmlResponse(type, ext) ||
    type.includes("text/plain") ||
    type.includes("application/json") ||
    type.includes("application/javascript") ||
    type.includes("application/x-javascript") ||
    ext === ".txt" ||
    ext === ".json" ||
    ext === ".js" ||
    ext === ".mjs"
  );
}

function looksLikeNotFoundHtml(text = "") {
  const source = String(text || "");
  return (
    /opps!\s*page\s*not\s*found/i.test(source) ||
    /oops!\s*page\s*not\s*found/i.test(source) ||
    /the\s*page\s*you.?re\s*looking\s*for\s*doesn.?t\s*exist/i.test(source) ||
    /<h1[^>]*>\s*404\s*<\/h1>/i.test(source) ||
    />\s*404\s*</i.test(source) ||
    /go\s*to\s*home/i.test(source)
  );
}

function looksLikeUnavailableMediaPayload(text = "") {
  const source = String(text || "");
  return (
    /^\s*No Content:/i.test(source) ||
    /No\s*Content:\s*(?:https?:\/\/[^/\s]+)?\/(?:new)?mediaplayer\//i.test(source) ||
    /No\s*Content:\s*(?:https?:\/\/[^/\s]+)?\/casino\//i.test(source)
  );
}

function rewriteUpstreamHtmlToLocal(html = "") {
  let out = String(html || "");
  const replacements = [
    [/https?:\/\/www\.diamondexch99\.now/gi, ""],
    [/https?:\/\/diamondexch99\.now/gi, ""],
    [/\/\/www\.diamondexch99\.now/gi, ""],
    [/\/\/diamondexch99\.now/gi, ""],
    [/https?:\/\/sitethemedata\.com/gi, "/sitethemedata.com"],
    [/\/\/sitethemedata\.com/gi, "/sitethemedata.com"],
    [/https?:\/\/versionobj\.ecoassetsservice\.com/gi, "/versionobj.ecoassetsservice.com"],
    [/\/\/versionobj\.ecoassetsservice\.com/gi, "/versionobj.ecoassetsservice.com"],
    [/https?:\/\/dataobj\.ecoassetsservice\.com/gi, "/dataobj.ecoassetsservice.com"],
    [/\/\/dataobj\.ecoassetsservice\.com/gi, "/dataobj.ecoassetsservice.com"],
    [/https?:\/\/cdn\.jsdelivr\.net/gi, "/cdn.jsdelivr.net"],
    [/\/\/cdn\.jsdelivr\.net/gi, "/cdn.jsdelivr.net"],
    [/https?:\/\/code\.jquery\.com/gi, "/code.jquery.com"],
    [/\/\/code\.jquery\.com/gi, "/code.jquery.com"],
    [/https?:\/\/cdnjs\.cloudflare\.com/gi, "/cdnjs.cloudflare.com"],
    [/\/\/cdnjs\.cloudflare\.com/gi, "/cdnjs.cloudflare.com"],
    [/https?:\/\/fonts\.googleapis\.com/gi, "/fonts.googleapis.com"],
    [/\/\/fonts\.googleapis\.com/gi, "/fonts.googleapis.com"],
    [/https?:\/\/fonts\.gstatic\.com/gi, "/fonts.gstatic.com"],
    [/\/\/fonts\.gstatic\.com/gi, "/fonts.gstatic.com"],
    [/https?:\/\/www\.gstatic\.com/gi, "/www.gstatic.com"],
    [/\/\/www\.gstatic\.com/gi, "/www.gstatic.com"],
    [/https?:\/\/www\.google\.com/gi, "/www.google.com"],
    [/\/\/www\.google\.com/gi, "/www.google.com"]
  ];

  for (const [pattern, value] of replacements) {
    out = out.replace(pattern, value);
  }
  return out;
}

async function fetchUpstreamAsset(req, res, urlObj) {
  if (!urlObj || (req.method !== "GET" && req.method !== "HEAD")) {
    return false;
  }

  const pathname = decodeURIComponent(urlObj.pathname || "");
  if (!shouldTryAssetProxy(pathname)) {
    return false;
  }

  const ext = path.extname(pathname).toLowerCase();
  const requestPath = `${pathname}${urlObj.search || ""}`;

  async function tryServeFrom(url) {
    const cacheKey = `GET|${url}`;
    const cached = getCachedUpstreamAsset(cacheKey, Date.now());
    if (cached) {
      const headers = {
        ...SECURITY_HEADERS,
        "Content-Type": cached.contentType,
        "Cache-Control": cached.cacheControl,
        "Content-Length": cached.payload.length
      };
      res.writeHead(200, headers);
      if (req.method === "HEAD") {
        res.end();
      } else {
        res.end(cached.payload);
      }
      return true;
    }

    try {
      const fetchTaskKey = `${cacheKey}|${req.headers.accept || "*/*"}`;
      let fetchTask = pendingUpstreamAssetFetches.get(fetchTaskKey);
      if (!fetchTask) {
        fetchTask = (async () => {
          const response = await fetch(url, {
            method: "GET",
            redirect: "follow",
            headers: {
              accept: req.headers.accept || "*/*",
              "user-agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
                "(KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
              referer: "https://diamondexch99.now/home"
            }
          });

          if (!response.ok) {
            return null;
          }

          const body = Buffer.from(await response.arrayBuffer());
          let contentType =
            response.headers.get("content-type") || MIME_TYPES[ext] || "application/octet-stream";
          const cacheControl =
            response.headers.get("cache-control") || "public, max-age=86400, stale-while-revalidate=600";
          let payload = body;
          const isGameLikePath = /^(?:\/casino\/|\/all-sports\/|\/game-details\/|\/(?:new)?mediaplayer\/)/i.test(
            pathname
          );

          if (isGameLikePath && isTextLikeResponse(contentType, ext) && body.length <= 512 * 1024) {
            const textBody = body.toString("utf8");
            if (looksLikeUnavailableMediaPayload(textBody) || looksLikeNotFoundHtml(textBody)) {
              return null;
            }
          }

          if (isHtmlResponse(contentType, ext)) {
            const html = body.toString("utf8");
            if ((looksLikeNotFoundHtml(html) || looksLikeUnavailableMediaPayload(html)) && isGameLikePath) {
              return null;
            }
            const rewritten = rewriteUpstreamHtmlToLocal(html);
            payload = Buffer.from(rewritten, "utf8");
            contentType = "text/html; charset=utf-8";
          }

          return {
            payload,
            contentType,
            cacheControl
          };
        })();
        pendingUpstreamAssetFetches.set(fetchTaskKey, fetchTask);
      }

      let fetched = null;
      try {
        fetched = await fetchTask;
      } finally {
        pendingUpstreamAssetFetches.delete(fetchTaskKey);
      }
      if (!fetched || !Buffer.isBuffer(fetched.payload)) {
        return false;
      }
      const payload = fetched.payload;
      const contentType = fetched.contentType;
      const cacheControl = fetched.cacheControl;

      const headers = {
        ...SECURITY_HEADERS,
        "Content-Type": contentType,
        "Cache-Control": cacheControl,
        "Content-Length": payload.length
      };

      putCachedUpstreamAsset(cacheKey, {
        payload,
        contentType,
        cacheControl
      });
      res.writeHead(200, headers);
      if (req.method === "HEAD") {
        res.end();
      } else {
        res.end(payload);
      }
      return true;
    } catch {
      return false;
    }
  }

  const normalized = pathname.replace(/^\/+/, "");
  const slashIndex = normalized.indexOf("/");
  const rootToken = (slashIndex >= 0 ? normalized.slice(0, slashIndex) : normalized).toLowerCase();
  if (rootToken && rootToken.includes(".") && MIRROR_HOST_DIRS.has(rootToken)) {
    const rest = slashIndex >= 0 ? normalized.slice(slashIndex) : "/";
    const directHostUrl = `https://${rootToken}${rest}${urlObj.search || ""}`;
    const served = await tryServeFrom(directHostUrl);
    if (served) {
      return true;
    }
  }

  for (const baseUrl of UPSTREAM_BASE_URLS) {
    const served = await tryServeFrom(`${baseUrl}${requestPath}`);
    if (served) {
      return true;
    }
  }

  return false;
}

module.exports = {
  fetchUpstreamAsset
};
