const fs = require("fs");
const { chromium } = require("playwright-core");
const { MATKA_LIVE_ENABLED, MATKA_UPSTREAM_BASE_URL, MATKA_BROWSER_PATH } = require("./config");
const { encryptPayload, decryptPayload } = require("./crypto");

const COOKIE_REFRESH_MS = Number(process.env.MATKA_COOKIE_REFRESH_MS || 20 * 60 * 1000);
const SESSION_WARMUP_MS = Number(process.env.MATKA_SESSION_WARMUP_MS || 8000);
const DEMO_CLICK_WAIT_MS = Number(process.env.MATKA_DEMO_CLICK_WAIT_MS || 7000);

const sessionCache = {
  cookieHeader: "",
  createdAt: 0,
  expiresAt: 0,
  inflight: null
};

function baseUrl() {
  return String(MATKA_UPSTREAM_BASE_URL || "").replace(/\/+$/, "");
}

function buildCookieHeader(cookies = []) {
  return cookies
    .filter((cookie) => cookie && cookie.name && typeof cookie.value === "string")
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");
}

function pickBrowserExecutablePath() {
  const envPath = String(MATKA_BROWSER_PATH || "").trim();
  if (envPath && fs.existsSync(envPath)) {
    return envPath;
  }

  const candidates = [
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\BraveSoftware\\Brave-Browser\\Application\\brave.exe"
  ];
  return candidates.find((candidate) => fs.existsSync(candidate)) || "";
}

function shouldRefreshSession(force = false) {
  if (force) {
    return true;
  }
  if (!sessionCache.cookieHeader) {
    return true;
  }
  const now = Date.now();
  return now >= sessionCache.expiresAt;
}

async function createSession() {
  const executablePath = pickBrowserExecutablePath();
  if (!executablePath) {
    return null;
  }

  const browser = await chromium.launch({
    headless: true,
    executablePath,
    args: ["--disable-blink-features=AutomationControlled"]
  });

  try {
    const context = await browser.newContext({
      userAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
        "(KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36"
    });
    const page = await context.newPage();
    const host = baseUrl();

    await page.goto(`${host}/`, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForTimeout(SESSION_WARMUP_MS);

    const demoButton = page.locator("text=/login with demo id/i").first();
    const count = await demoButton.count();
    if (count > 0) {
      await demoButton.click({ timeout: 8000 }).catch(() => {});
      await page.waitForTimeout(DEMO_CLICK_WAIT_MS);
    }

    const cookies = await context.cookies(host);
    const cookieHeader = buildCookieHeader(cookies);
    if (!cookieHeader) {
      return null;
    }

    const now = Date.now();
    const cloudflareCookie = cookies.find((cookie) => cookie.name === "cf_clearance");
    let expiresAt = now + COOKIE_REFRESH_MS;
    if (cloudflareCookie && Number.isFinite(Number(cloudflareCookie.expires))) {
      const cfExpiresMs = Number(cloudflareCookie.expires) * 1000;
      if (cfExpiresMs > now + 120000) {
        expiresAt = Math.min(expiresAt, cfExpiresMs - 120000);
      }
    }

    return {
      cookieHeader,
      createdAt: now,
      expiresAt
    };
  } finally {
    await browser.close();
  }
}

async function ensureSession(force = false) {
  if (!MATKA_LIVE_ENABLED) {
    return null;
  }

  if (!shouldRefreshSession(force)) {
    return {
      cookieHeader: sessionCache.cookieHeader,
      createdAt: sessionCache.createdAt,
      expiresAt: sessionCache.expiresAt
    };
  }

  if (!force && sessionCache.inflight) {
    return sessionCache.inflight;
  }

  const refreshPromise = createSession()
    .then((nextSession) => {
      if (!nextSession) {
        return null;
      }
      sessionCache.cookieHeader = nextSession.cookieHeader;
      sessionCache.createdAt = nextSession.createdAt;
      sessionCache.expiresAt = nextSession.expiresAt;
      return nextSession;
    })
    .catch(() => null)
    .finally(() => {
      if (sessionCache.inflight === refreshPromise) {
        sessionCache.inflight = null;
      }
    });

  sessionCache.inflight = refreshPromise;
  return refreshPromise;
}

function needsAuthRefresh(payload) {
  if (!payload || typeof payload !== "object") {
    return true;
  }
  const status = Number(payload.status || 0);
  const msg = String(payload.msg || "").toLowerCase();
  if (status === 401) {
    return true;
  }
  if (msg.includes("please login") || msg.includes("suspicious activity")) {
    return true;
  }
  return false;
}

async function callMatkaApi(endpointPath, payload, cookieHeader) {
  const host = baseUrl();
  if (!host || !cookieHeader) {
    return null;
  }

  const pickGameSlug = () => {
    const raw = String(
      (payload && (payload.type || payload.gType || payload.gtype || payload.id || payload.game)) || "worli3"
    )
      .trim()
      .toLowerCase();
    if (!raw) {
      return "worli3";
    }
    if (raw === "tv") {
      return "worli3";
    }
    if (/^worli3_/i.test(raw)) {
      return "worli3";
    }
    return raw.replace(/[^a-z0-9_-]/g, "") || "worli3";
  };

  const refererGameSlug = pickGameSlug();

  const body = new URLSearchParams({
    data: encryptPayload(payload || {})
  }).toString();

  const response = await fetch(`${host}${endpointPath}`, {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      "x-requested-with": "XMLHttpRequest",
      origin: host,
      referer: `${host}/casino/${refererGameSlug}`,
      cookie: cookieHeader
    },
    body
  });

  if (!response.ok) {
    return null;
  }

  const parsed = await response.json().catch(() => null);
  if (!parsed || typeof parsed.data !== "string") {
    return null;
  }

  return decryptPayload(parsed.data);
}

async function fetchMatkaEnvelope(endpointPath, payload = {}) {
  if (!MATKA_LIVE_ENABLED) {
    return null;
  }

  const session = await ensureSession(false);
  if (!session || !session.cookieHeader) {
    return null;
  }

  let decoded = await callMatkaApi(endpointPath, payload, session.cookieHeader).catch(() => null);
  if (needsAuthRefresh(decoded)) {
    const refreshed = await ensureSession(true);
    if (!refreshed || !refreshed.cookieHeader) {
      return null;
    }
    decoded = await callMatkaApi(endpointPath, payload, refreshed.cookieHeader).catch(() => null);
  }

  if (!decoded || typeof decoded !== "object") {
    return null;
  }

  // Upstream can return non-200 envelopes for expired/invalid sessions.
  // In that case, caller should use local fallback instead of surfacing
  // remote errors inside the UI.
  if (Number(decoded.status || 0) !== 200) {
    return null;
  }

  // Upstream launchother returns `url` like ` tv/<token>` which local routes
  // cannot resolve. Avoid `/casino/<same>` recursion by forcing media fallback.
  if (
    endpointPath.startsWith("/api/front/casino/launchother") &&
    Number(decoded.status || 0) === 200 &&
    decoded.data &&
    typeof decoded.data === "object"
  ) {
    const requestedGame = String(
      (payload && (payload.id || payload.game || payload.gType || payload.type || payload.gtype)) || "worli3"
    )
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, "");
    decoded.data.url = `/newmediaplayer/${
      requestedGame === "tv" || !requestedGame ? "worli3" : requestedGame
    }/index.html`;
  }

  return { data: encryptPayload(decoded) };
}

module.exports = {
  fetchMatkaEnvelope
};
