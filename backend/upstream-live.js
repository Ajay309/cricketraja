const { encryptPayload, decryptPayload } = require("./crypto");
const { UPSTREAM_BASE_URLS, UPSTREAM_LIVE_FEED } = require("./config");

const LIVE_ENDPOINT_MAP = new Map([
  ["/api/front/tablist", "/api/front/tablist"],
  ["/api/front/get_latest_events", "/api/front/get_latest_events"],
  ["/api/front/highlightproduct", "/api/front/highlightproduct"],
  ["/api/front/treedata", "/api/front/get_tree_open_data"],
  ["/api/front/get_tree_open_data", "/api/front/get_tree_open_data"],
  ["/api/front/tablelist", "/api/front/tablelist"],
  ["/api/front/highlighthome", "/api/front/get_highlight_open_data"],
  ["/api/front/get_highlight_open_data", "/api/front/get_highlight_open_data"],
  ["/api/front/highlighthomePrivate", "/api/front/get_highlight_open_data"],
  ["/api/front/gamedetail", "/api/front/game_detail_open"],
  ["/api/front/game_detail_open", "/api/front/game_detail_open"],
  ["/api/front/gamedetailPrivate", "/api/front/game_detail_open"],
  ["/api/front/gamedata", "/api/front/game_data_open"],
  ["/api/front/game_data_open", "/api/front/game_data_open"],
  ["/api/front/gamedataPrivate", "/api/front/game_data_open"],
  ["/api/front/casinoresults", "/api/front/casinoresults"],
  ["/api/front/tpcasinoresult", "/api/front/tpcasinoresult"],
  ["/api/front/casino/tabdata", "/api/front/casino/tabdata"],
  ["/api/front/tpcasinolist", "/api/front/tpcasinolist"],
  ["/api/front/tpcasinosoda", "/api/front/tpcasinosoda"],
  ["/api/front/searchgame", "/api/front/searchgame"],
  ["/api/front/cricketvdata2", "/api/front/cricketvdata2"],
  ["/api/front/gettv", "/api/front/gettv"],
  ["/api/front/casino/alllist", "/api/front/get_casino_list"],
  ["/api/front/get_casino_list", "/api/front/get_casino_list"],
  ["/api/front/casino/catlist", "/api/front/cat_list_open"],
  ["/api/front/cat_list_open", "/api/front/cat_list_open"],
  ["/api/front/casino/providerlist", "/api/front/provider_list_open"],
  ["/api/front/provider_list_open", "/api/front/provider_list_open"],
  ["/api/front/casino/slotlist", "/api/front/slot_list_open"],
  ["/api/front/slot_list_open", "/api/front/slot_list_open"],
  ["/api/front/casino/other", "/api/front/other_open"],
  ["/api/front/other_open", "/api/front/other_open"],
  ["/api/front/casino/tablist", "/api/front/get_casino_tab_list"],
  ["/api/front/get_casino_tab_list", "/api/front/get_casino_tab_list"],
  ["/api/front/casino/tablelist", "/api/front/get_casino_table_list"],
  ["/api/front/get_casino_table_list", "/api/front/get_casino_table_list"],
  ["/api/front/casino/data2", "/api/front/vcasino/data2"],
  ["/api/front/vcasino/data2", "/api/front/vcasino/data2"],
  ["/api/front/casino/lastresultsnew", "/api/front/vcasino/lastresultsnew"],
  ["/api/front/vcasino/lastresultsnew", "/api/front/vcasino/lastresultsnew"]
]);

const STRICT_MARKET_ENDPOINTS = new Set(["/api/front/game_detail_open", "/api/front/game_data_open"]);

const CACHE_TTL_MS = 5000;
const PER_UPSTREAM_TIMEOUT_MS = 6000;
const UPSTREAM_FAIL_COOLDOWN_MS = 15000;
const cache = new Map();
const upstreamFailUntil = new Map();

function normalizeEventRow(row) {
  const next = { ...(row || {}) };
  const etid = Number(next.etid ?? next.etId ?? next.eid ?? next.sportId ?? 0) || 0;
  next.etid = etid || next.etid;
  next.etId = next.etId ?? etid;
  next.sportId = next.sportId ?? etid;
  next.id = next.id ?? next.gmid ?? next.mid;
  next.gameId = next.gameId ?? next.gmid ?? next.id ?? next.mid;
  next.name = next.name ?? next.ename ?? "";
  next.fname = next.fname ?? next.name ?? next.ename ?? "";
  next.ename = next.ename ?? next.name ?? "";
  next.gtype = String(next.gtype ?? "game");
  next.iscc = next.iscc ?? 0;
  return next;
}

function normalizePayloadByEndpoint(mappedEndpoint, payload) {
  if (!payload || typeof payload !== "object") {
    return payload;
  }

  const next = { ...payload };
  if (typeof next.msg === "string" && next.msg.toLowerCase() === "success") {
    next.msg = "success";
  }
  if (Number(next.status) === 200 && typeof next.success !== "boolean") {
    next.success = true;
  }

  if (mappedEndpoint === "/api/front/tablist" && Array.isArray(next.data)) {
    next.data = next.data.map((row) => {
      const item = { ...(row || {}) };
      const eid = Number(item.eid ?? item.etid ?? item.etId ?? 0) || 0;
      item.eid = eid || item.eid;
      item.etid = item.etid ?? eid;
      item.etId = item.etId ?? eid;
      item.ename = item.ename ?? item.name ?? "";
      return item;
    });
    return next;
  }

  if (mappedEndpoint === "/api/front/get_latest_events" && Array.isArray(next.data)) {
    next.data = next.data.map((row) => normalizeEventRow(row));
    return next;
  }

  if (mappedEndpoint === "/api/front/highlightproduct" && Array.isArray(next.data)) {
    next.data = next.data.map((row) => {
      const item = { ...(row || {}) };
      item.ename = item.ename ?? item.name ?? "worli3";
      item.fname = item.fname ?? item.ename ?? "Matka";
      item.gtype = String(item.gtype ?? "Casino");
      item.etid = Number(item.etid ?? item.eid ?? 0) || 0;
      return item;
    });
    return next;
  }

  if (mappedEndpoint === "/api/front/get_tree_open_data" && next.data && typeof next.data === "object") {
    if (Array.isArray(next.data.t1)) {
      next.data.t1 = next.data.t1.map((row) => {
        const item = { ...(row || {}) };
        const eid = Number(item.eid ?? item.etid ?? item.etId ?? 0) || 0;
        item.eid = item.eid ?? eid;
        item.etid = item.etid ?? eid;
        item.etId = item.etId ?? eid;
        return item;
      });
    }
    if (Array.isArray(next.data.t2)) {
      next.data.t2 = next.data.t2.map((row) => {
        const item = { ...(row || {}) };
        const etid = Number(item.etid ?? item.eid ?? item.etId ?? 0) || 0;
        item.etid = item.etid ?? etid;
        item.eid = item.eid ?? etid;
        item.etId = item.etId ?? etid;
        if (Array.isArray(item.children)) {
          item.children = item.children.map((child) => normalizeEventRow(child));
        }
        return item;
      });
    }
    return next;
  }

  if (mappedEndpoint === "/api/front/get_highlight_open_data" && next.data && typeof next.data === "object") {
    if (Array.isArray(next.data.t1)) {
      next.data.t1 = next.data.t1.map((row) => normalizeEventRow(row));
    }
    if (Array.isArray(next.data.t2)) {
      next.data.t2 = next.data.t2.map((row) => normalizeEventRow(row));
    }
    return next;
  }

  if (mappedEndpoint === "/api/front/game_detail_open" && Array.isArray(next.data)) {
    next.data = next.data.map((row) => {
      const item = normalizeEventRow(row);
      item.oldgmid = item.oldgmid ?? item.gmid;
      return item;
    });
    return next;
  }

  return next;
}

function hasText(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function countHighlightRows(rows) {
  if (!Array.isArray(rows) || !rows.length) {
    return 0;
  }
  return rows.reduce((count, row) => {
    const item = row && typeof row === "object" ? row : {};
    if (Array.isArray(item.children)) {
      return count + item.children.length;
    }
    if (hasText(item.ename || item.name || item.gname || item.cname)) {
      return count + 1;
    }
    return count;
  }, 0);
}

function isUsablePayload(mappedEndpoint, payload) {
  if (!payload || typeof payload !== "object") {
    return false;
  }

  const status = Number(payload.status || 0);
  if (status !== 200) {
    const message = String(payload.msg || payload.message || "").toLowerCase();
    const isNoRecordResponse =
      (status === 300 || status === 400 || status === 404) &&
      /(no\s*record|not\s*found|no\s*match|no\s*event)/i.test(message);
    if (isNoRecordResponse) {
      // For match detail/data endpoints, no-record responses lead to blank/404
      // screen in the UI. Let local fallback build a usable market response.
      if (STRICT_MARKET_ENDPOINTS.has(mappedEndpoint)) {
        return false;
      }
      return true;
    }
    return false;
  }

  if (STRICT_MARKET_ENDPOINTS.has(mappedEndpoint)) {
    const rows = payload.data;
    if (rows === null || rows === undefined) {
      return false;
    }
    if (Array.isArray(rows) && rows.length === 0) {
      return false;
    }
    if (!Array.isArray(rows) && typeof rows === "object" && Object.keys(rows).length === 0) {
      return false;
    }
  }

  // Keep live envelope for non-market endpoints even when rows are empty so
  // local mock does not override real upstream "no data yet" states.
  return true;
}

function mapEndpoint(endpointStem = "", allowDirect = false) {
  if (LIVE_ENDPOINT_MAP.has(endpointStem)) {
    return LIVE_ENDPOINT_MAP.get(endpointStem);
  }
  if (endpointStem.startsWith("/api/front/casino/data2-")) {
    return "/api/front/vcasino/data2";
  }
  if (endpointStem.startsWith("/api/front/casino/lastresultsnew-")) {
    return "/api/front/vcasino/lastresultsnew";
  }
  if (endpointStem.startsWith("/api/front/highlighthomePrivate-")) {
    return "/api/front/get_highlight_open_data";
  }
  if (endpointStem.startsWith("/api/front/gamedetailPrivate-")) {
    return "/api/front/game_detail_open";
  }
  if (endpointStem.startsWith("/api/front/gamedataPrivate-")) {
    return "/api/front/game_data_open";
  }
  if (allowDirect && endpointStem.startsWith("/api/front/")) {
    return endpointStem;
  }
  return "";
}

function buildCacheKey(mappedEndpoint, payload) {
  const sortedKeys = Object.keys(payload || {}).sort();
  const normalized = {};
  for (const key of sortedKeys) {
    normalized[key] = payload[key];
  }
  return `${mappedEndpoint}|${JSON.stringify(normalized)}`;
}

function shouldSkipUpstream(baseUrl) {
  const failUntil = Number(upstreamFailUntil.get(baseUrl) || 0);
  return failUntil > Date.now();
}

function markUpstreamFailure(baseUrl) {
  upstreamFailUntil.set(baseUrl, Date.now() + UPSTREAM_FAIL_COOLDOWN_MS);
}

function clearUpstreamFailure(baseUrl) {
  upstreamFailUntil.delete(baseUrl);
}

async function fetchFromUpstream(baseUrl, mappedEndpoint, body) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), PER_UPSTREAM_TIMEOUT_MS);

  try {
    const response = await fetch(`${baseUrl}${mappedEndpoint}`, {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "x-requested-with": "XMLHttpRequest",
        accept: "application/json, text/plain, */*",
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        origin: baseUrl,
        referer: `${baseUrl}/all-sports/4`
      },
      body,
      signal: controller.signal
    });

    if (!response.ok) {
      return { envelope: null, hardFailure: false };
    }

    const parsed = await response.json();
    if (!parsed || typeof parsed !== "object") {
      return { envelope: null, hardFailure: true };
    }

    let finalEnvelope = parsed;
    if (typeof parsed.data === "string") {
      try {
        const decrypted = decryptPayload(parsed.data);
        const normalized = normalizePayloadByEndpoint(mappedEndpoint, decrypted);
        if (!isUsablePayload(mappedEndpoint, normalized)) {
          return { envelope: null, hardFailure: false };
        }
        finalEnvelope = { data: encryptPayload(normalized) };
      } catch {
        finalEnvelope = parsed;
      }
    } else {
      const normalized = normalizePayloadByEndpoint(mappedEndpoint, parsed);
      if (!isUsablePayload(mappedEndpoint, normalized)) {
        return { envelope: null, hardFailure: false };
      }
      finalEnvelope = { data: encryptPayload(normalized) };
    }

    return { envelope: finalEnvelope, hardFailure: false };
  } catch {
    return { envelope: null, hardFailure: true };
  } finally {
    clearTimeout(timeout);
  }
}

function normalizeRawFormPayload(rawPayload = {}) {
  const formPayload = {};
  for (const [key, value] of Object.entries(rawPayload || {})) {
    if (value === undefined || value === null) {
      continue;
    }
    formPayload[key] = Array.isArray(value)
      ? String(value[value.length - 1] ?? "")
      : String(value);
  }
  return formPayload;
}

async function fetchRawFromUpstream(baseUrl, mappedEndpoint, rawPayload) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), PER_UPSTREAM_TIMEOUT_MS);

  try {
    const formPayload = normalizeRawFormPayload(rawPayload);
    const body = new URLSearchParams(formPayload).toString();
    const response = await fetch(`${baseUrl}${mappedEndpoint}`, {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "x-requested-with": "XMLHttpRequest",
        accept: "application/json, text/plain, */*",
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        origin: baseUrl,
        referer: `${baseUrl}/all-sports/4`
      },
      body,
      signal: controller.signal
    });

    if (!response.ok) {
      return { envelope: null, hardFailure: false };
    }

    const parsed = await response.json().catch(() => null);
    if (!parsed || typeof parsed !== "object") {
      return { envelope: null, hardFailure: true };
    }

    if (typeof parsed.data === "string") {
      return { envelope: parsed, hardFailure: false };
    }
    if (Number(parsed.status || 0) === 200 || parsed.success === true) {
      return { envelope: parsed, hardFailure: false };
    }
    return { envelope: null, hardFailure: false };
  } catch {
    return { envelope: null, hardFailure: true };
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchUpstreamEnvelope(endpointStem, payload = {}, options = {}) {
  if (!UPSTREAM_LIVE_FEED) {
    return null;
  }

  const allowDirect = Boolean(options && options.allowDirect);
  const mappedEndpoint = mapEndpoint(endpointStem, allowDirect);
  if (!mappedEndpoint) {
    return null;
  }

  const cacheKey = buildCacheKey(mappedEndpoint, payload);
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.at <= CACHE_TTL_MS) {
    return cached.value;
  }

  const body = new URLSearchParams({
    data: encryptPayload(payload)
  }).toString();

  for (const baseUrl of UPSTREAM_BASE_URLS) {
    if (shouldSkipUpstream(baseUrl)) {
      continue;
    }

    const result = await fetchFromUpstream(baseUrl, mappedEndpoint, body);
    if (result.envelope) {
      clearUpstreamFailure(baseUrl);
      cache.set(cacheKey, { at: Date.now(), value: result.envelope });
      return result.envelope;
    }

    if (result.hardFailure) {
      markUpstreamFailure(baseUrl);
    }
  }

  return null;
}

async function fetchUpstreamRawEnvelope(endpointStem, rawPayload = {}, options = {}) {
  if (!UPSTREAM_LIVE_FEED) {
    return null;
  }

  const allowDirect = options && Object.prototype.hasOwnProperty.call(options, "allowDirect")
    ? Boolean(options.allowDirect)
    : true;
  const mappedEndpoint = mapEndpoint(endpointStem, allowDirect);
  if (!mappedEndpoint) {
    return null;
  }

  const normalizedRaw = normalizeRawFormPayload(rawPayload);
  const cacheKey = `raw|${buildCacheKey(mappedEndpoint, normalizedRaw)}`;
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.at <= CACHE_TTL_MS) {
    return cached.value;
  }

  for (const baseUrl of UPSTREAM_BASE_URLS) {
    if (shouldSkipUpstream(baseUrl)) {
      continue;
    }

    const result = await fetchRawFromUpstream(baseUrl, mappedEndpoint, normalizedRaw);
    if (result.envelope) {
      clearUpstreamFailure(baseUrl);
      cache.set(cacheKey, { at: Date.now(), value: result.envelope });
      return result.envelope;
    }

    if (result.hardFailure) {
      markUpstreamFailure(baseUrl);
    }
  }

  return null;
}

module.exports = {
  fetchUpstreamEnvelope,
  fetchUpstreamRawEnvelope
};
