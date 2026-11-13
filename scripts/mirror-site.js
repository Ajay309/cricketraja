const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const { ROOT_DIR, SITE_HOST, MIRROR_HOST_TO_DIR } = require("../backend/config");

const HOST_TO_DIR = new Map(
  [...MIRROR_HOST_TO_DIR.entries()].filter(([host]) => host !== "_DataURI")
);

const ALLOWED_HOSTS = new Set(HOST_TO_DIR.keys());
const START_URLS = [`https://${SITE_HOST}/`, `https://${SITE_HOST}/index.html`];
const MAX_REQUESTS = Number(process.env.MIRROR_MAX_REQUESTS || 8000);
const CONCURRENCY = Number(process.env.MIRROR_CONCURRENCY || 6);
const REQUEST_TIMEOUT_MS = Number(process.env.MIRROR_TIMEOUT_MS || 25000);
const MAX_TEXT_PARSE_BYTES = Number(process.env.MIRROR_MAX_TEXT_BYTES || 2 * 1024 * 1024);
const USER_AGENT =
  process.env.MIRROR_USER_AGENT ||
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
    "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

const SOURCE_HOST_REGEX = /^(?:https?:)?\/\/allpanelexch9\.co(?=[/?#]|$)/gi;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function sha1(buffer) {
  return crypto.createHash("sha1").update(buffer).digest("hex");
}

function ensureInside(baseDir, targetPath) {
  const absBase = path.resolve(baseDir);
  const absTarget = path.resolve(targetPath);
  return absTarget === absBase || absTarget.startsWith(absBase + path.sep);
}

function walkFiles(dir, out = []) {
  if (!fs.existsSync(dir)) {
    return out;
  }
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkFiles(abs, out);
      continue;
    }
    out.push(abs);
  }
  return out;
}

function canonicalKey(urlObj) {
  const clean = new URL(urlObj.toString());
  clean.search = "";
  clean.hash = "";
  let pathname = decodeURIComponent(clean.pathname || "/").replace(/\/+/g, "/");
  if (!pathname) {
    pathname = "/";
  }
  if (pathname.length > 1 && pathname.endsWith("/")) {
    pathname = pathname.slice(0, -1);
  }
  return `${clean.hostname}${pathname}`;
}

function normalizeCandidate(rawValue) {
  const value = String(rawValue || "").trim();
  if (!value) {
    return "";
  }
  if (
    value.startsWith("#") ||
    value.startsWith("data:") ||
    value.startsWith("javascript:") ||
    value.startsWith("mailto:") ||
    value.startsWith("tel:") ||
    value.startsWith("blob:")
  ) {
    return "";
  }
  return value;
}

function isTextLike(contentType = "") {
  const type = String(contentType).toLowerCase();
  return (
    type.includes("text/") ||
    type.includes("json") ||
    type.includes("javascript") ||
    type.includes("ecmascript") ||
    type.includes("xml") ||
    type.includes("svg")
  );
}

function looksLikeHtmlDocument(bodyBuffer) {
  if (!bodyBuffer || !bodyBuffer.length) {
    return false;
  }
  const probe = bodyBuffer
    .subarray(0, Math.min(bodyBuffer.length, 2048))
    .toString("utf8")
    .trimStart()
    .toLowerCase();
  return probe.startsWith("<!doctype html") || probe.startsWith("<html");
}

function shouldSkipSave(urlObj, bodyBuffer) {
  if (urlObj.hostname !== SITE_HOST) {
    return false;
  }
  if (!urlObj.pathname.startsWith("/api/front/")) {
    return false;
  }
  // If API endpoint resolves to a full HTML page, it is usually a bot/challenge/redirect page.
  return looksLikeHtmlDocument(bodyBuffer);
}

function queueExtractedUrls(text, baseUrl, enqueue) {
  const source = String(text || "");
  const patterns = [
    /(?:src|href|action|poster|data-src|data-href)\s*=\s*["']([^"']+)["']/gi,
    /url\((['"]?)([^)'"]+)\1\)/gi,
    /(https?:\/\/[^\s"'`<>]+)/gi,
    /(?:^|[\s"'`(])(\/[A-Za-z0-9._~%+/@?&=,:;!$*\-()[\]{}#]+)(?=$|[\s"'`)<>])/g
  ];

  for (const regex of patterns) {
    let match;
    while ((match = regex.exec(source)) !== null) {
      const candidate = normalizeCandidate(match[2] || match[1] || match[0]);
      if (!candidate) {
        continue;
      }
      try {
        const resolved = candidate.startsWith("//")
          ? new URL(`https:${candidate}`)
          : new URL(candidate, baseUrl);
        if (!["http:", "https:"].includes(resolved.protocol)) {
          continue;
        }
        if (!ALLOWED_HOSTS.has(resolved.hostname)) {
          continue;
        }
        enqueue(resolved.toString(), "discovered");
      } catch {
        // ignore malformed URL fragments
      }
    }
  }
}

function getSavePath(urlObj, contentType) {
  const mappedDir = HOST_TO_DIR.get(urlObj.hostname);
  if (!mappedDir) {
    return null;
  }

  let pathname = decodeURIComponent(urlObj.pathname || "/")
    .replace(/\/+/g, "/")
    .replace(/\0/g, "");

  if (!pathname.startsWith("/")) {
    pathname = `/${pathname}`;
  }

  if (pathname === "/") {
    pathname = "/index.html";
  } else if (pathname.endsWith("/")) {
    pathname = `${pathname}index.html`;
  }

  const ext = path.posix.extname(pathname);
  const forceHtmlLike =
    pathname.startsWith("/api/front/") ||
    String(contentType).toLowerCase().includes("text/html") ||
    String(contentType).toLowerCase().includes("application/json");

  if (!ext) {
    pathname += forceHtmlLike ? ".html" : ".txt";
  }

  const rel = pathname.replace(/^\/+/, "");
  const baseDir = path.join(ROOT_DIR, mappedDir);
  const abs = path.join(baseDir, ...rel.split("/"));
  if (!ensureInside(baseDir, abs)) {
    return null;
  }
  return abs;
}

function queueExistingCapturedFiles(enqueue) {
  for (const [host, dirName] of HOST_TO_DIR.entries()) {
    const hostDir = path.join(ROOT_DIR, dirName);
    if (!fs.existsSync(hostDir)) {
      continue;
    }
    const files = walkFiles(hostDir);
    for (const file of files) {
      const rel = path.relative(hostDir, file).replace(/\\/g, "/");
      if (!rel) {
        continue;
      }

      if (host === SITE_HOST) {
        if (rel === "index.html") {
          enqueue(`https://${host}/`, "existing");
          enqueue(`https://${host}/index.html`, "existing");
          continue;
        }
        enqueue(`https://${host}/${rel}`, "existing");
        if (rel.endsWith(".html")) {
          enqueue(`https://${host}/${rel.slice(0, -5)}`, "existing");
        }
        continue;
      }

      enqueue(`https://${host}/${rel}`, "existing");
      if (rel.endsWith(".html")) {
        enqueue(`https://${host}/${rel.slice(0, -5)}`, "existing");
      }
    }
  }
}

async function fetchWithTimeout(url, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "User-Agent": USER_AGENT,
        Accept: "*/*",
        Referer: `https://${SITE_HOST}/`
      }
    });
  } finally {
    clearTimeout(timer);
  }
}

async function main() {
  const queue = [];
  const seen = new Set();

  const stats = {
    queued: 0,
    fetched: 0,
    savedNew: 0,
    savedUpdated: 0,
    unchanged: 0,
    skippedStatus: 0,
    skippedApiHtml: 0,
    failed: 0,
    discovered: 0
  };

  function enqueue(rawUrl, reason) {
    try {
      const parsed = new URL(rawUrl);
      if (!["http:", "https:"].includes(parsed.protocol)) {
        return;
      }
      if (!ALLOWED_HOSTS.has(parsed.hostname)) {
        return;
      }
      const key = canonicalKey(parsed);
      if (seen.has(key)) {
        return;
      }
      seen.add(key);
      const normalized = new URL(parsed.toString());
      normalized.search = "";
      normalized.hash = "";
      queue.push(normalized.toString());
      stats.queued += 1;
      if (reason === "discovered") {
        stats.discovered += 1;
      }
    } catch {
      // ignore malformed URLs
    }
  }

  for (const startUrl of START_URLS) {
    enqueue(startUrl, "seed");
  }
  queueExistingCapturedFiles(enqueue);

  let cursor = 0;
  let active = 0;
  const errors = [];

  async function processOne(url) {
    if (stats.fetched >= MAX_REQUESTS) {
      return;
    }

    stats.fetched += 1;
    const target = new URL(url);
    target.search = "";
    target.hash = "";

    let response;
    try {
      response = await fetchWithTimeout(target.toString(), REQUEST_TIMEOUT_MS);
    } catch (error) {
      stats.failed += 1;
      errors.push({ url: target.toString(), error: String(error.message || error) });
      return;
    }

    if (!response.ok) {
      stats.skippedStatus += 1;
      return;
    }

    const contentType = response.headers.get("content-type") || "";
    let bodyBuffer;
    try {
      bodyBuffer = Buffer.from(await response.arrayBuffer());
    } catch (error) {
      stats.failed += 1;
      errors.push({ url: target.toString(), error: `read_body_failed: ${String(error.message || error)}` });
      return;
    }

    if (shouldSkipSave(target, bodyBuffer)) {
      stats.skippedApiHtml += 1;
      return;
    }

    const savePath = getSavePath(target, contentType);
    if (!savePath) {
      return;
    }

    fs.mkdirSync(path.dirname(savePath), { recursive: true });

    if (fs.existsSync(savePath)) {
      const oldBuffer = fs.readFileSync(savePath);
      if (sha1(oldBuffer) === sha1(bodyBuffer)) {
        stats.unchanged += 1;
      } else {
        fs.writeFileSync(savePath, bodyBuffer);
        stats.savedUpdated += 1;
      }
    } else {
      fs.writeFileSync(savePath, bodyBuffer);
      stats.savedNew += 1;
    }

    if (isTextLike(contentType) && bodyBuffer.length <= MAX_TEXT_PARSE_BYTES) {
      let text = bodyBuffer.toString("utf8");
      if (target.hostname === SITE_HOST) {
        text = text.replace(SOURCE_HOST_REGEX, "");
      }
      queueExtractedUrls(text, target, enqueue);
    }
  }

  while ((cursor < queue.length || active > 0) && stats.fetched < MAX_REQUESTS) {
    while (active < CONCURRENCY && cursor < queue.length && stats.fetched < MAX_REQUESTS) {
      const url = queue[cursor++];
      active += 1;
      processOne(url)
        .catch((error) => {
          stats.failed += 1;
          errors.push({ url, error: String(error.message || error) });
        })
        .finally(() => {
          active -= 1;
        });
    }
    await sleep(40);
  }

  const report = {
    ...stats,
    queueFinalSize: queue.length,
    errors: errors.slice(0, 50)
  };
  console.log(JSON.stringify(report, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
