const {
  API_GAMES_IMAGE_PROXY_ENABLED,
  API_GAMES_IMAGE_ALLOWLIST,
  SECURITY_HEADERS
} = require("./config");
const { sendText } = require("./http-utils");

const IMAGE_CACHE_TTL_MS = Math.max(
  60 * 1000,
  Number(process.env.API_GAMES_IMAGE_CACHE_TTL_MS || 10 * 60 * 1000)
);
const IMAGE_CACHE_MAX_ENTRIES = Math.max(
  20,
  Number(process.env.API_GAMES_IMAGE_CACHE_MAX_ENTRIES || 220)
);
const IMAGE_CACHE_MAX_BYTES = Math.max(
  8 * 1024 * 1024,
  Number(process.env.API_GAMES_IMAGE_CACHE_MAX_BYTES || 72 * 1024 * 1024)
);
const IMAGE_CACHE_MAX_ENTRY_BYTES = Math.max(
  128 * 1024,
  Number(process.env.API_GAMES_IMAGE_CACHE_MAX_ENTRY_BYTES || 3 * 1024 * 1024)
);
const imageCache = new Map();
const pendingImageFetches = new Map();
let imageCacheBytes = 0;

function pruneImageCache(now = Date.now()) {
  for (const [key, entry] of imageCache.entries()) {
    if (!entry || now - Number(entry.at || 0) > IMAGE_CACHE_TTL_MS) {
      imageCache.delete(key);
      imageCacheBytes -= Number(entry && entry.size ? entry.size : 0);
    }
  }
  if (imageCacheBytes < 0) {
    imageCacheBytes = 0;
  }
  while (imageCache.size > IMAGE_CACHE_MAX_ENTRIES || imageCacheBytes > IMAGE_CACHE_MAX_BYTES) {
    const oldestKey = imageCache.keys().next().value;
    if (typeof oldestKey === "undefined") {
      break;
    }
    const oldest = imageCache.get(oldestKey);
    imageCache.delete(oldestKey);
    imageCacheBytes -= Number(oldest && oldest.size ? oldest.size : 0);
    if (imageCacheBytes < 0) {
      imageCacheBytes = 0;
    }
  }
}

function getCachedImage(cacheKey = "", now = Date.now()) {
  if (!cacheKey) {
    return null;
  }
  const entry = imageCache.get(cacheKey);
  if (!entry) {
    return null;
  }
  if (now - Number(entry.at || 0) > IMAGE_CACHE_TTL_MS) {
    imageCache.delete(cacheKey);
    imageCacheBytes -= Number(entry.size || 0);
    if (imageCacheBytes < 0) {
      imageCacheBytes = 0;
    }
    return null;
  }
  imageCache.delete(cacheKey);
  imageCache.set(cacheKey, entry);
  return entry;
}

function putCachedImage(cacheKey = "", payload = null, contentType = "", cacheControl = "") {
  if (!cacheKey || !payload || !Buffer.isBuffer(payload)) {
    return;
  }
  if (!Number.isFinite(payload.length) || payload.length <= 0 || payload.length > IMAGE_CACHE_MAX_ENTRY_BYTES) {
    return;
  }
  const existing = imageCache.get(cacheKey);
  if (existing) {
    imageCache.delete(cacheKey);
    imageCacheBytes -= Number(existing.size || 0);
  }
  const entry = {
    at: Date.now(),
    size: payload.length,
    payload,
    contentType: String(contentType || "application/octet-stream"),
    cacheControl: String(cacheControl || "public, max-age=21600")
  };
  imageCache.set(cacheKey, entry);
  imageCacheBytes += payload.length;
  pruneImageCache(Date.now());
}

function parseProxyTarget(urlObj) {
  const raw = urlObj.searchParams.get("u") || urlObj.searchParams.get("url") || "";
  if (!raw) {
    return null;
  }
  try {
    const parsed = new URL(raw);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function hostAllowed(hostname = "") {
  if (!API_GAMES_IMAGE_ALLOWLIST.length) {
    return true;
  }
  return API_GAMES_IMAGE_ALLOWLIST.includes(String(hostname || "").toLowerCase());
}

async function fetchImageFromUpstream(targetUrl = "") {
  const key = String(targetUrl || "").trim();
  if (!key) {
    throw new Error("Invalid upstream image target");
  }
  if (pendingImageFetches.has(key)) {
    return pendingImageFetches.get(key);
  }

  const task = (async () => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 9000);
    try {
      const upstream = await fetch(key, {
        method: "GET",
        headers: {
          "user-agent": "allpanelex-local-mirror/1.0"
        },
        signal: controller.signal
      });
      if (!upstream.ok) {
        const error = new Error(`Upstream image error (${upstream.status})`);
        error.statusCode = 502;
        throw error;
      }
      const payload = Buffer.from(await upstream.arrayBuffer());
      return {
        payload,
        contentType: upstream.headers.get("content-type") || "application/octet-stream",
        cacheControl: upstream.headers.get("cache-control") || "public, max-age=21600"
      };
    } finally {
      clearTimeout(timeout);
      pendingImageFetches.delete(key);
    }
  })();

  pendingImageFetches.set(key, task);
  return task;
}

async function handleImageProxy(req, res, urlObj) {
  if (!API_GAMES_IMAGE_PROXY_ENABLED) {
    sendText(res, 403, "Image proxy disabled");
    return true;
  }

  const target = parseProxyTarget(urlObj);
  if (!target) {
    sendText(res, 400, "Invalid image url");
    return true;
  }
  if (!hostAllowed(target.hostname)) {
    sendText(res, 403, "Image host blocked");
    return true;
  }

  const cacheKey = target.toString();
  const cached = getCachedImage(cacheKey, Date.now());
  if (cached) {
    res.writeHead(200, {
      ...SECURITY_HEADERS,
      "Content-Type": cached.contentType,
      "Content-Length": cached.payload.length,
      "Cache-Control": cached.cacheControl
    });
    res.end(cached.payload);
    return true;
  }

  try {
    const fetched = await fetchImageFromUpstream(target.toString());
    const payload = fetched.payload;
    const contentType = fetched.contentType;
    const cacheControl = fetched.cacheControl;

    putCachedImage(cacheKey, payload, contentType, cacheControl);
    res.writeHead(200, {
      ...SECURITY_HEADERS,
      "Content-Type": contentType,
      "Content-Length": payload.length,
      "Cache-Control": cacheControl
    });
    res.end(payload);
    return true;
  } catch (error) {
    if (error && Number(error.statusCode || 0) === 502 && error.message) {
      sendText(res, 502, error.message);
      return true;
    }
    sendText(res, 502, "Image fetch failed");
    return true;
  }
}

module.exports = {
  handleImageProxy
};
