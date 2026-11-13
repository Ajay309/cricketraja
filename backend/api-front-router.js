const { API_ALIAS_STEMS, DEFAULT_NEWS_MESSAGE } = require("./config");
const {
  sendJson,
  parseRequestPayload,
  pickFirstValue,
  normalizeApiStem
} = require("./http-utils");
const { wrapEncryptedPayload, decryptPayload } = require("./crypto");
const mock = require("./mock-content");
const { fetchUpstreamEnvelope } = require("./upstream-live");
const { fetchApiGamesEnvelope } = require("./api-games-live");
const { fetchMatkaEnvelope } = require("./matka-live");
const { resolveExternalIframeLaunch } = require("./external-iframe-games");
const {
  fetchOddsApiMatches,
  fetchOddsApiOdds,
  fetchOddsApiMatchDetail
} = require("./odds-api");

// etid -> sport name (The Odds API adapter ke liye)
const ODDS_SPORT_BY_ETID = { "4": "cricket", "1": "soccer", "2": "tennis" };

const BET_ENDPOINTS = new Set([
  "/api/front/placebet",
  "/api/front/placebetbadla",
  "/api/front/placebetcasino",
  "/api/front/placebetroulette11dtl",
  "/api/front/placebetroulette11rep",
  "/api/front/placebetroulettedtl",
  "/api/front/placebetworlidtl"
]);

const BOOK_ENDPOINTS = new Set([
  "/api/front/userbook",
  "/api/front/casino/book",
  "/api/front/vcasino/book"
]);

const OPEN_BET_LIST_ENDPOINTS = new Set(["/api/front/currentbets", "/api/front/tpcurrentbets"]);

const FANCY_BOOK_ENDPOINTS = new Set(["/api/front/fancybookdata", "/api/front/fancybookpopup"]);

const STATEMENT_ENDPOINT_MODES = new Map([
  ["/api/front/accountstatement", "all"],
  ["/api/front/deposit-statement", "deposit"],
  ["/api/front/withdraw-statement", "withdraw"],
  ["/api/front/activity", "all"]
]);

const SUPAGO_STATEMENT_ENDPOINT_MODES = new Map([
  ["/api/front/supago-deposit-statement", "deposit"],
  ["/api/front/supago-withdraw-statement", "withdraw"]
]);

const DEPOSIT_ENDPOINTS = new Set([
  "/api/front/deposite-with-image",
  "/api/front/depositautolink",
  "/api/front/supago/deposite-with-image",
  "/api/front/supago/deposite-with-utr"
]);

const WITHDRAW_ENDPOINTS = new Set([
  "/api/front/add-withdraw-request",
  "/api/front/supago-add-withdraw-request"
]);

const MULTIPART_PLAIN_ENDPOINTS = new Set([
  "/api/front/deposite-with-image",
  "/api/front/supago/deposite-with-image",
  "/api/front/supago/deposite-with-utr",
  "/api/front/ocr"
]);

const LOCAL_FIRST_ENDPOINTS = new Set([
  "/api/front/login",
  "/api/front/demo-login",
  "/api/front/local-login",
  "/api/front/register",
  "/api/front/logout",
  "/api/front/userdata",
  "/api/front/local-userdata",
  "/api/front/userdata-plain",
  "/api/front/passwordupdate",
  "/api/front/checkun",
  "/api/front/checkphno",
  "/api/front/sendotp",
  "/api/front/verifyotp",
  "/api/front/verifycode",
  "/api/front/checksms",
  "/api/front/userchecktele",
  "/api/front/genotptele",
  "/api/front/getauth",
  "/api/front/authon",
  "/api/front/authontele",
  "/api/front/authoff",
  "/api/front/acceptrules",
  "/api/front/rules",
  "/api/front/rule",
  "/api/front/getrules",
  "/api/front/get_rules",
  "/api/front/casinorules",
  "/api/front/casino/rules",
  "/api/front/fantact/rules",
  "/api/front/userbuttonlist",
  "/api/front/buttonlist",
  "/api/front/buttonlistcs",
  "/api/front/buttonupdate",
  "/api/front/buttonupdatecs",
  "/api/front/repeatplacebet",
  "/api/front/deleteplacebet",
  "/api/front/marketanalysis",
  "/api/front/local-payment-settings",
  "/api/front/local-payment-utr",
  "/api/front/local-withdraw-details",
  "/api/front/local-withdraw-add-detail",
  "/api/front/local-withdraw-update-detail",
  "/api/front/local-withdraw-delete-detail"
]);

function isSportsOddsEndpoint(endpointStem = "") {
  return (
    endpointStem === "/api/front/highlighthome" ||
    endpointStem === "/api/front/get_highlight_open_data" ||
    endpointStem === "/api/front/highlighthomePrivate" ||
    endpointStem.startsWith("/api/front/highlighthomePrivate-") ||
    endpointStem === "/api/front/gamedetailPrivate" ||
    endpointStem === "/api/front/game_detail_open" ||
    endpointStem === "/api/front/gamedetail" ||
    endpointStem.startsWith("/api/front/gamedetailPrivate-") ||
    endpointStem === "/api/front/gamedataPrivate" ||
    endpointStem === "/api/front/game_data_open" ||
    endpointStem === "/api/front/gamedata" ||
    endpointStem.startsWith("/api/front/gamedataPrivate-")
  );
}

function shouldPreferLocalProcessing(endpointStem = "") {
  // ODDS_API_KEY set ho to sports odds endpoints pehle local (The Odds API) se serve honge,
  // upstream (diamondexch99) ko pehle try nahi kiya jayega.
  if (process.env.ODDS_API_KEY && isSportsOddsEndpoint(endpointStem)) {
    return true;
  }
  return (
    LOCAL_FIRST_ENDPOINTS.has(endpointStem) ||
    BET_ENDPOINTS.has(endpointStem) ||
    BOOK_ENDPOINTS.has(endpointStem) ||
    OPEN_BET_LIST_ENDPOINTS.has(endpointStem) ||
    FANCY_BOOK_ENDPOINTS.has(endpointStem) ||
    DEPOSIT_ENDPOINTS.has(endpointStem) ||
    WITHDRAW_ENDPOINTS.has(endpointStem) ||
    STATEMENT_ENDPOINT_MODES.has(endpointStem) ||
    SUPAGO_STATEMENT_ENDPOINT_MODES.has(endpointStem) ||
    MULTIPART_PLAIN_ENDPOINTS.has(endpointStem)
  );
}

function shouldPreferApiGamesProcessing(endpointStem = "") {
  return (
    endpointStem === "/api/front/casino/alllist" ||
    endpointStem === "/api/front/get_casino_list" ||
    endpointStem === "/api/front/casino/catlist" ||
    endpointStem === "/api/front/cat_list_open" ||
    endpointStem === "/api/front/casino/providerlist" ||
    endpointStem === "/api/front/provider_list_open" ||
    endpointStem === "/api/front/casino/slotlist" ||
    endpointStem === "/api/front/slot_list_open" ||
    endpointStem === "/api/front/casino/other" ||
    endpointStem === "/api/front/other_open" ||
    endpointStem === "/api/front/casino/tablist" ||
    endpointStem === "/api/front/get_casino_tab_list" ||
    endpointStem === "/api/front/casino/tablelist" ||
    endpointStem === "/api/front/get_casino_table_list" ||
    endpointStem === "/api/front/casino/data2" ||
    endpointStem === "/api/front/vcasino/data2" ||
    endpointStem === "/api/front/casino/launch" ||
    endpointStem === "/api/front/casino/launchother"
  );
}

const PRIMARY_CASINO_TYPES = new Set(["lc", "vc", "slot", "xgame", "live", "virtual"]);
const LEGACY_CASINO_MARKET_TYPES = new Set([
  "superover2",
  "superover3",
  "teen20",
  "teen20v1",
  "teen20c",
  "teen62",
  "teen41",
  "teen42",
  "teen33",
  "teenunique",
  "dt20",
  "vteen20",
  "vdt20",
  "baccarat",
  "roulette11",
  "roulette12",
  "roulette13",
  "ourroullete",
  "worli3",
  "matka",
  "matkamarket",
  "dragon",
  "tiger",
  "andarbahar",
  "lucky7",
  "lucky5",
  "poker",
  "aviator",
  "crash",
  "mines",
  "tv"
]);

const CASINO_ROWS_ENDPOINTS = new Set([
  "/api/front/casino/alllist",
  "/api/front/get_casino_list",
  "/api/front/casino/catlist",
  "/api/front/cat_list_open",
  "/api/front/casino/providerlist",
  "/api/front/provider_list_open",
  "/api/front/casino/slotlist",
  "/api/front/slot_list_open",
  "/api/front/casino/other",
  "/api/front/other_open",
  "/api/front/casino/tablist",
  "/api/front/get_casino_tab_list",
  "/api/front/casino/tablelist",
  "/api/front/get_casino_table_list",
  "/api/front/casino/data2",
  "/api/front/vcasino/data2",
  "/api/front/casino/tabdata"
]);

const CASINO_REQUIRED_ROWS_ENDPOINTS = new Set([
  "/api/front/casino/alllist",
  "/api/front/get_casino_list",
  "/api/front/casino/tablelist",
  "/api/front/get_casino_table_list",
  "/api/front/casino/data2",
  "/api/front/vcasino/data2"
]);

function normalizeLegacyToken(value = "") {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

function sanitizeMemberAccount(value = "") {
  return String(value || "")
    .trim()
    .replace(/[^a-zA-Z0-9_-]/g, "")
    .slice(0, 32)
    .toLowerCase();
}

function normalizeCreditAmount(value = "") {
  const numeric = Number(value);
  if (!Number.isFinite(numeric) || numeric <= 0) {
    return "";
  }
  return numeric.toFixed(2);
}

function buildCasinoRowKey(row = {}, index = 0) {
  const gid = String(
    row && (row.gid || row.gmid || row.mid || row.game_uid || row.id)
      ? row.gid || row.gmid || row.mid || row.game_uid || row.id
      : ""
  )
    .trim()
    .toLowerCase();
  const gameName = String(row && (row.gname || row.name || row.cname || row.ename) ? row.gname || row.name || row.cname || row.ename : "")
    .trim()
    .toLowerCase();
  const image = String(
    row && (row.img || row.imgurl || row.icon || row.image || row.poster)
      ? row.img || row.imgurl || row.icon || row.image || row.poster
      : ""
  )
    .trim()
    .toLowerCase();
  if (gid) {
    return `gid:${gid}`;
  }
  if (gameName && image) {
    return `name:${gameName}|img:${image}`;
  }
  if (gameName) {
    return `name:${gameName}`;
  }
  return `row:${index}`;
}

function dedupeCasinoRows(rows = []) {
  if (!Array.isArray(rows) || rows.length <= 1) {
    return rows;
  }
  const seen = new Set();
  const output = [];
  for (let index = 0; index < rows.length; index += 1) {
    const row = rows[index];
    const key = buildCasinoRowKey(row, index);
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    output.push(row);
  }
  return output;
}

function normalizeCasinoRowsPayload(payload = {}) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return { changed: false, rowCount: 0 };
  }
  let changed = false;
  let rowCount = 0;

  function dedupeAt(container, key) {
    if (!container || typeof container !== "object" || !Array.isArray(container[key])) {
      return;
    }
    rowCount = Math.max(rowCount, container[key].length);
    const deduped = dedupeCasinoRows(container[key]);
    if (deduped.length !== container[key].length) {
      container[key] = deduped;
      changed = true;
    }
  }

  if (Array.isArray(payload.data)) {
    rowCount = Math.max(rowCount, payload.data.length);
    const dedupedData = dedupeCasinoRows(payload.data);
    if (dedupedData.length !== payload.data.length) {
      payload.data = dedupedData;
      changed = true;
    }
  } else if (payload.data && typeof payload.data === "object") {
    dedupeAt(payload.data, "t1");
    dedupeAt(payload.data, "rows");
    dedupeAt(payload.data, "list");
  }

  dedupeAt(payload, "t1");
  dedupeAt(payload, "rows");
  dedupeAt(payload, "list");

  return { changed, rowCount };
}

function normalizeCasinoEnvelope(endpointStem = "", envelope = null) {
  if (!CASINO_ROWS_ENDPOINTS.has(endpointStem) || !envelope || typeof envelope !== "object") {
    return envelope;
  }

  const requireRows = CASINO_REQUIRED_ROWS_ENDPOINTS.has(endpointStem);
  let decodedPayload = null;
  let encryptedEnvelope = false;

  if (typeof envelope.data === "string") {
    try {
      decodedPayload = decryptPayload(envelope.data);
      encryptedEnvelope = true;
    } catch {
      return envelope;
    }
  } else {
    decodedPayload = envelope;
  }

  if (!decodedPayload || typeof decodedPayload !== "object") {
    return envelope;
  }

  const normalized = normalizeCasinoRowsPayload(decodedPayload);
  if (requireRows && normalized.rowCount <= 0) {
    return null;
  }

  if (!normalized.changed) {
    return envelope;
  }

  if (encryptedEnvelope) {
    return wrapEncryptedPayload(decodedPayload);
  }
  return decodedPayload;
}

function isMatkaMarketType(value = "") {
  const raw = String(value || "").trim().toLowerCase();
  if (!raw) {
    return false;
  }
  return raw === "worli3" || raw === "matka" || raw === "matkamarket" || /^worli3_/i.test(raw);
}

function shouldSkipEarlyUpstreamForApiGames(endpointStem = "", payload = {}) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return false;
  }

  if (endpointStem === "/api/front/casino/data2" || endpointStem === "/api/front/vcasino/data2") {
    const rawType = pickFirstValue(payload, ["type", "ctype", "gtype", "gType"], "");
    const normalizedType = normalizeLegacyToken(rawType);
    if (!normalizedType) {
      return false;
    }
    return !PRIMARY_CASINO_TYPES.has(normalizedType);
  }

  if (endpointStem === "/api/front/casino/launch" || endpointStem === "/api/front/casino/launchother") {
    const strongLaunchId = pickFirstValue(
      payload,
      ["gid", "mid", "gmid", "oldgmid", "game_uid", "gameID", "ename"],
      ""
    );
    if (strongLaunchId) {
      return false;
    }
    const requested = pickFirstValue(
      payload,
      ["id", "game", "gType", "gtype"],
      ""
    );
    const normalizedRequested = normalizeLegacyToken(requested);
    if (!normalizedRequested) {
      return false;
    }
    return LEGACY_CASINO_MARKET_TYPES.has(normalizedRequested);
  }

  if (
    endpointStem === "/api/front/casino/lastresultsnew" ||
    endpointStem === "/api/front/vcasino/lastresultsnew" ||
    endpointStem === "/api/front/tpcasinoresult"
  ) {
    const requestedType = pickFirstValue(payload, ["gType", "type", "queryType"], "");
    const normalizedType = normalizeLegacyToken(requestedType);
    if (!normalizedType) {
      return false;
    }
    if (/^worli3/.test(normalizedType)) {
      return true;
    }
    return LEGACY_CASINO_MARKET_TYPES.has(normalizedType);
  }

  return false;
}

function sendEncrypted(res, payload, statusCode = 200) {
  sendJson(res, statusCode, wrapEncryptedPayload(payload));
}

function sendPlain(res, payload, statusCode = 200) {
  sendJson(res, statusCode, payload);
}

function decodeRequestPayload(parsedPayload = {}) {
  if (
    parsedPayload &&
    typeof parsedPayload === "object" &&
    typeof parsedPayload.data === "string"
  ) {
    try {
      const decrypted = decryptPayload(parsedPayload.data);
      if (decrypted && typeof decrypted === "object" && !Array.isArray(decrypted)) {
        return { ...parsedPayload, ...decrypted };
      }
    } catch {
      return parsedPayload;
    }
  }
  return parsedPayload;
}

function normalizeLiveProxyPayload(payload = {}) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return payload;
  }

  const normalized = { ...payload };

  const etid = pickFirstValue(normalized, ["etid", "etId", "eid", "sportId"], "");
  if (etid !== "") {
    if (normalized.etid === undefined || normalized.etid === null || String(normalized.etid) === "") {
      normalized.etid = etid;
    }
    if (normalized.eid === undefined || normalized.eid === null || String(normalized.eid) === "") {
      normalized.eid = etid;
    }
  }

  const gmid = pickFirstValue(normalized, ["gmid", "oldgmid", "mid", "gid", "gameId"], "");
  if (gmid !== "") {
    if (normalized.gmid === undefined || normalized.gmid === null || String(normalized.gmid) === "") {
      normalized.gmid = gmid;
    }
    if (
      normalized.oldgmid === undefined ||
      normalized.oldgmid === null ||
      String(normalized.oldgmid) === ""
    ) {
      normalized.oldgmid = gmid;
    }
  }

  return normalized;
}

function getFallbackPayload(endpointStem) {
  const name = endpointStem.split("/").pop() || "unknown";
  const isObjectResponse = /login|check|verify|auth|otp|password|deposit|withdraw|placebet|bonus|logout|rules|save-subscription/i.test(
    name
  );
  return {
    status: 200,
    msg: "offline snapshot",
    data: isObjectResponse ? {} : []
  };
}

function sanitizeAuthToken(rawValue = "") {
  const raw = String(rawValue == null ? "" : rawValue).trim();
  if (!raw) {
    return "";
  }
  try {
    const parsed = JSON.parse(raw);
    if (typeof parsed === "string") {
      return String(parsed || "").trim();
    }
  } catch {
    // ignore parse failures and return raw string fallback
  }
  return raw.replace(/^"+|"+$/g, "").trim();
}

function getAuthToken(req, payload) {
  const authHeader = sanitizeAuthToken(req.headers.authorization || "");
  if (/^bearer\s+/i.test(authHeader)) {
    return sanitizeAuthToken(authHeader.replace(/^bearer\s+/i, "").trim());
  }
  const directAuth = sanitizeAuthToken(authHeader);
  if (directAuth) {
    return directAuth;
  }
  const headerToken = sanitizeAuthToken(
    pickFirstValue(
      {
        x_access: req.headers["x-access-token"] || "",
        x_auth: req.headers["x-auth-token"] || "",
        x_token: req.headers["x-token"] || "",
        token_header: req.headers.token || ""
      },
      ["x_access", "x_auth", "x_token", "token_header"],
      ""
    )
  );
  if (headerToken) {
    return headerToken;
  }
  return sanitizeAuthToken(
    pickFirstValue(
    { ...payload, token_header: req.headers["x-access-token"] || "" },
    ["token", "auth", "access_token", "token_header", "authorization"],
    ""
  ));
}

function normalizeAmount(payload) {
  const amount = Number(pickFirstValue(payload, ["amount", "amt"], "0"));
  return Number.isFinite(amount) && amount > 0 ? amount : 100;
}

function normalizeExternalPlayerGame(value = "") {
  const raw = String(value || "").trim().toLowerCase();
  if (!raw) {
    return "worli3";
  }
  if (raw === "tv" || /^worli3_/i.test(raw)) {
    return "worli3";
  }
  const sanitized = raw.replace(/[^a-z0-9_-]/g, "");
  return sanitized || "worli3";
}

function looksLikeProviderCatalogRouteId(value = "") {
  const raw = String(value || "").trim();
  if (!raw) {
    return false;
  }
  return /-[a-f0-9]{6,16}$/i.test(raw);
}

function buildLocalExternalPlayerUrl(externalLaunch, fallbackGame = "worli3") {
  const externalUrl =
    externalLaunch && externalLaunch.url ? String(externalLaunch.url || "").trim() : "";
  if (!externalUrl) {
    return "";
  }
  const normalizedGame = normalizeExternalPlayerGame(
    (externalLaunch && externalLaunch.game) || fallbackGame
  );
  return `/newmediaplayer/${normalizedGame}/index.html?ext=${encodeURIComponent(externalUrl)}`;
}

function buildLegacyPaymentList() {
  return [
    {
      psid: 1,
      pname: "UPI",
      ptype: "UPI",
      title: "UPI Payment",
      bname: "UPI ID",
      bdetail: "",
      svalid: false
    },
    {
      psid: 2,
      pname: "Bank Transfer",
      ptype: "BANK",
      title: "IMPS / NEFT",
      bname: "Account",
      bdetail: "Account Holder - 1234567890",
      svalid: false
    }
  ];
}

function buildSectionPanaPayload(payload) {
  const sid = Number(pickFirstValue(payload, ["sid", "sectionId"], "1")) || 1;
  const urate = Number(pickFirstValue(payload, ["urate", "uRate"], "1")) || 1;
  return {
    success: true,
    msg: "success",
    status: 200,
    data: {
      t1: [{ sid, tcnt: 1 }],
      t2: [
        {
          sid,
          subtype: "single",
          nat: "1",
          b: urate,
          min: 10,
          max: 10000
        }
      ]
    }
  };
}

function buildWorliSectionPayload(payload) {
  const sid = Number(pickFirstValue(payload, ["sid"], "1")) || 1;
  const gType = pickFirstValue(payload, ["gType", "type"], "worli");
  return {
    success: true,
    msg: "success",
    status: 200,
    data: {
      Table: [
        {
          sid,
          gType,
          msg: "No active result found.",
          rows: []
        }
      ]
    }
  };
}

function buildWorliCalendarPayload(payload) {
  return {
    success: true,
    msg: "success",
    status: 200,
    data: {
      mid: pickFirstValue(payload, ["mid"], "0"),
      fdt: pickFirstValue(payload, ["fdt"], ""),
      tdt: pickFirstValue(payload, ["tdt"], ""),
      results: []
    }
  };
}

function buildSearchResults(snapshots, query) {
  const keyword = String(query || "").toLowerCase().trim();
  if (!keyword) {
    return [];
  }

  const tableSnapshot = snapshots.readDecryptedSnapshot("/api/front/casino/tablelist");
  const baseRows =
    tableSnapshot &&
    tableSnapshot.data &&
    Array.isArray(tableSnapshot.data.t1)
      ? tableSnapshot.data.t1
      : [];

  return baseRows
    .filter((row) => String(row.gname || "").toLowerCase().includes(keyword))
    .slice(0, 50);
}

function buildRuleRows(typeLabel = "General") {
  // Disable rules popup content completely for local mirror.
  return [];
}

function buildBonusDepositPayload() {
  const now = new Date().toLocaleString("en-US", { hour12: true });
  return {
    success: true,
    status: 200,
    msg: "success",
    data: {
      t1: [
        {
          aid: 1,
          amt: 500,
          txnid: "TXN-BONUS-1",
          edt: now
        }
      ],
      t2: [
        {
          copid: 1,
          title: "5% Bonus",
          min: 100,
          max: 5000
        }
      ]
    }
  };
}

async function handleApiFrontRequest(req, res, urlObj, services) {
  const { db, snapshots } = services;
  const endpointStem = normalizeApiStem(urlObj.pathname);
  const rawPayload = await parseRequestPayload(req, urlObj);
  const payload = decodeRequestPayload(rawPayload);
  if (payload && typeof payload === "object" && !Array.isArray(payload)) {
    const requestedUser = pickFirstValue(
      payload,
      ["uname", "username", "user_name", "login", "userId", "userid", "name", "Name"],
      ""
    );
    if (!requestedUser) {
      const headerUser = pickFirstValue(
        {
          x_user_name: req.headers["x-user-name"] || "",
          x_username: req.headers["x-username"] || "",
          x_uname: req.headers["x-uname"] || ""
        },
        ["x_user_name", "x_username", "x_uname"],
        ""
      );
      if (headerUser) {
        payload.uname = headerUser;
        payload.username = headerUser;
      }
    }
  }
  const token = getAuthToken(req, payload);
  const liveProxyPayload = normalizeLiveProxyPayload(payload);
  const isCasinoLaunchEndpoint =
    endpointStem === "/api/front/casino/launch" || endpointStem === "/api/front/casino/launchother";
  const sessionUser =
    (db &&
      typeof db.resolveUser === "function" &&
      db.resolveUser(liveProxyPayload, token, { allowPrimaryFallback: false })) ||
    (db && typeof db.getUserFromToken === "function" ? db.getUserFromToken(token) : null);
  if (sessionUser && typeof liveProxyPayload === "object" && !Array.isArray(liveProxyPayload)) {
    const username = String(sessionUser.username || "").trim().toLowerCase();
    const balanceValue = Number(sessionUser.balance || 0).toFixed(2);
    if (isCasinoLaunchEndpoint) {
      // Force launch on current logged-in wallet so provider does not receive stale demo/player values.
      liveProxyPayload.member_account = username;
      liveProxyPayload.username = username;
      liveProxyPayload.uname = username;
      liveProxyPayload.user_name = username;
      liveProxyPayload.credit_amount = balanceValue;
      liveProxyPayload.wallet_balance = balanceValue;
      liveProxyPayload.user_balance = balanceValue;
      liveProxyPayload.balance = balanceValue;
      liveProxyPayload.amount = balanceValue;
    } else {
      if (!pickFirstValue(liveProxyPayload, ["member_account", "username", "uname"], "")) {
        liveProxyPayload.member_account = username;
        liveProxyPayload.username = username;
        liveProxyPayload.uname = username;
      }
      if (
        !pickFirstValue(
          liveProxyPayload,
          ["credit_amount", "wallet_balance", "user_balance", "balance", "amount"],
          ""
        )
      ) {
        liveProxyPayload.credit_amount = balanceValue;
        liveProxyPayload.wallet_balance = balanceValue;
        liveProxyPayload.user_balance = balanceValue;
      }
    }
  }
  const preferLocalProcessing = shouldPreferLocalProcessing(endpointStem);
  const preferApiGamesProcessing = shouldPreferApiGamesProcessing(endpointStem);
  if (isCasinoLaunchEndpoint && sessionUser && sessionUser.isDemoUser) {
    sendEncrypted(res, {
      success: false,
      status: 300,
      msg: "Games are locked for demo users. Please login with real ID.",
      data: {}
    });
    return true;
  }

  if (!preferLocalProcessing) {
    if (preferApiGamesProcessing) {
      const apiGamesEnvelope = await fetchApiGamesEnvelope(endpointStem, liveProxyPayload);
      const normalizedApiGamesEnvelope = normalizeCasinoEnvelope(endpointStem, apiGamesEnvelope);
      if (normalizedApiGamesEnvelope) {
        sendPlain(res, normalizedApiGamesEnvelope);
        return true;
      }

      const skipEarlyUpstream = shouldSkipEarlyUpstreamForApiGames(endpointStem, liveProxyPayload);
      if (!skipEarlyUpstream) {
        const upstreamEnvelope = await fetchUpstreamEnvelope(endpointStem, liveProxyPayload);
        const normalizedUpstreamEnvelope = normalizeCasinoEnvelope(endpointStem, upstreamEnvelope);
        if (normalizedUpstreamEnvelope) {
          sendPlain(res, normalizedUpstreamEnvelope);
          return true;
        }
      }
    } else {
      const skipEarlyUpstream = shouldSkipEarlyUpstreamForApiGames(endpointStem, liveProxyPayload);
      if (!skipEarlyUpstream) {
        const upstreamEnvelope = await fetchUpstreamEnvelope(endpointStem, liveProxyPayload);
        const normalizedUpstreamEnvelope = normalizeCasinoEnvelope(endpointStem, upstreamEnvelope);
        if (normalizedUpstreamEnvelope) {
          sendPlain(res, normalizedUpstreamEnvelope);
          return true;
        }
      }

      const apiGamesEnvelope = await fetchApiGamesEnvelope(endpointStem, liveProxyPayload);
      const normalizedApiGamesEnvelope = normalizeCasinoEnvelope(endpointStem, apiGamesEnvelope);
      if (normalizedApiGamesEnvelope) {
        sendPlain(res, normalizedApiGamesEnvelope);
        return true;
      }
    }
  }

  if (endpointStem === "/api/front/save-subscription") {
    const response = db.saveSubscription(payload);
    sendPlain(res, response);
    return true;
  }

  if (MULTIPART_PLAIN_ENDPOINTS.has(endpointStem)) {
    if (endpointStem === "/api/front/ocr") {
      sendPlain(res, {
        status: 200,
        msg: "success",
        totalAmount: normalizeAmount(payload),
        receiptNumber: `RCPT-${Date.now()}`
      });
      return true;
    }

    const amount = normalizeAmount(payload);
    const depositResult = db.applyDeposit(
      token,
      { ...payload, amount },
      endpointStem.includes("/supago/")
        ? "Supago deposit request"
        : "Deposit request"
    );
    sendPlain(res, {
      success: Boolean(depositResult.success),
      status: Number(depositResult.status || 200),
      msg: depositResult.msg || "success",
      data: depositResult.data || null
    });
    return true;
  }

  if (endpointStem === "/api/front/login" || endpointStem === "/api/front/demo-login") {
    const loginResult = db.login(payload, endpointStem === "/api/front/demo-login");
    sendEncrypted(res, loginResult.payload);
    return true;
  }

  if (endpointStem === "/api/front/local-login") {
    const loginResult = db.login(payload, false);
    if (!loginResult.ok) {
      sendPlain(res, loginResult.payload, Number(loginResult.status || 300));
      return true;
    }
    const userData = db.getUserData(loginResult.token, payload);
    sendPlain(res, {
      status: 200,
      msg: "success",
      data: {
        ...loginResult.payload.data,
        profile: userData && userData.data ? userData.data : {}
      }
    });
    return true;
  }

  if (endpointStem === "/api/front/register") {
    const result = db.register(payload);
    sendEncrypted(res, result.payload);
    return true;
  }

  if (endpointStem === "/api/front/checkun") {
    const username = pickFirstValue(payload, ["uname", "username"], "");
    const available = db.checkUsername(username);
    sendEncrypted(
      res,
      available
        ? { status: 200, success: true, msg: "Username available." }
        : { status: 300, success: false, msg: "Username already exists." }
    );
    return true;
  }

  if (endpointStem === "/api/front/checkphno") {
    const mobile = pickFirstValue(payload, ["mobile", "phone"], "");
    const available = db.checkMobile(mobile);
    sendEncrypted(
      res,
      available
        ? { status: 200, success: true, msg: "Mobile number is available." }
        : { status: 300, success: false, msg: "Mobile number already registered." }
    );
    return true;
  }

  if (
    endpointStem === "/api/front/sendotp" ||
    endpointStem === "/api/front/verifyotp" ||
    endpointStem === "/api/front/verifycode" ||
    endpointStem === "/api/front/checksms" ||
    endpointStem === "/api/front/userchecktele" ||
    endpointStem === "/api/front/genotptele"
  ) {
    sendEncrypted(res, { status: 200, success: true, msg: "success", data: "123456" });
    return true;
  }

  if (endpointStem === "/api/front/getauth") {
    sendEncrypted(res, db.getAuthState());
    return true;
  }

  if (endpointStem === "/api/front/authon") {
    sendEncrypted(res, db.enableAuth("app", payload));
    return true;
  }

  if (endpointStem === "/api/front/authontele") {
    sendEncrypted(res, db.enableAuth("tele", payload));
    return true;
  }

  if (endpointStem === "/api/front/authoff") {
    sendEncrypted(res, db.disableAuth());
    return true;
  }

  if (endpointStem === "/api/front/passwordupdate") {
    sendEncrypted(res, db.updatePassword(token, payload));
    return true;
  }

  if (
    endpointStem === "/api/front/acceptrules" ||
    endpointStem === "/api/front/rulesaccept" ||
    endpointStem === "/api/front/rules-accept"
  ) {
    sendEncrypted(res, { status: 200, success: true, msg: "Rules accepted." });
    return true;
  }

  if (
    endpointStem === "/api/front/rules" ||
    endpointStem === "/api/front/rule" ||
    endpointStem === "/api/front/getrules" ||
    endpointStem === "/api/front/get_rules" ||
    endpointStem === "/api/front/casino/rules" ||
    endpointStem === "/api/front/casinorules" ||
    endpointStem === "/api/front/fantact/rules"
  ) {
    sendEncrypted(res, { success: true, status: 200, msg: "success", data: buildRuleRows("General") });
    return true;
  }

  if (endpointStem === "/api/front/logout") {
    db.logout(token);
    sendEncrypted(res, { status: 200, success: true, msg: "Logout successful." });
    return true;
  }

  if (endpointStem === "/api/front/userdata") {
    sendEncrypted(res, db.getUserData(token, payload));
    return true;
  }

  if (endpointStem === "/api/front/local-userdata" || endpointStem === "/api/front/userdata-plain") {
    sendPlain(res, db.getUserData(token, payload));
    return true;
  }

  if (endpointStem === "/api/front/local-currentbets") {
    sendPlain(res, db.listOpenBets(token, payload));
    return true;
  }

  if (endpointStem === "/api/front/getdata") {
    sendEncrypted(res, {
      success: true,
      msg: DEFAULT_NEWS_MESSAGE,
      status: 200
    });
    return true;
  }

  if (endpointStem === "/api/front/checkserver") {
    sendEncrypted(res, mock.getCheckServer());
    return true;
  }

  if (endpointStem === "/api/front/welcomebanners") {
    sendEncrypted(res, mock.asSuccess(mock.getWelcomeBanners()));
    return true;
  }

  if (endpointStem === "/api/front/tablist") {
    sendEncrypted(res, mock.asSuccess(mock.getTabList()));
    return true;
  }

  if (endpointStem === "/api/front/get_latest_events") {
    sendEncrypted(res, mock.asSuccess(mock.getLatestEvents()));
    return true;
  }

  if (endpointStem === "/api/front/highlightproduct") {
    sendEncrypted(res, mock.asSuccess(mock.getHighlightProduct()));
    return true;
  }

  if (endpointStem === "/api/front/treedata") {
    sendEncrypted(res, mock.asSuccess(mock.getTreeData()));
    return true;
  }

  if (
    endpointStem === "/api/front/highlighthome" ||
    endpointStem === "/api/front/get_highlight_open_data" ||
    endpointStem === "/api/front/highlighthomePrivate" ||
    endpointStem.startsWith("/api/front/highlighthomePrivate-")
  ) {
    const etid = pickFirstValue(payload, ["etid", "eid"], "4");
    if (process.env.ODDS_API_KEY) {
      const oddsSport = ODDS_SPORT_BY_ETID[String(etid)];
      if (oddsSport) {
        const oddsMatches = await fetchOddsApiMatches(oddsSport);
        if (oddsMatches && oddsMatches.length) {
          sendEncrypted(
            res,
            mock.asSuccess({
              t1: oddsMatches.filter((m) => m.iplay),
              t2: oddsMatches.filter((m) => !m.iplay)
            })
          );
          return true;
        }
      }
    }
    sendEncrypted(res, mock.asSuccess(mock.getHighlightHome(etid)));
    return true;
  }

  if (
    endpointStem === "/api/front/gamedetailPrivate" ||
    endpointStem === "/api/front/game_detail_open" ||
    endpointStem === "/api/front/gamedetail" ||
    endpointStem.startsWith("/api/front/gamedetailPrivate-")
  ) {
    const etid = pickFirstValue(payload, ["etid"], "4");
    const gmid = pickFirstValue(payload, ["gmid", "oldgmid", "mid"], "100101");
    if (process.env.ODDS_API_KEY) {
      const oddsSport = ODDS_SPORT_BY_ETID[String(etid)];
      const detail = oddsSport ? await fetchOddsApiMatchDetail(oddsSport, gmid) : null;
      if (detail) {
        sendEncrypted(res, mock.asSuccess(detail));
        return true;
      }
    }
    sendEncrypted(res, mock.asSuccess(mock.getGameDetail(etid, gmid)));
    return true;
  }

  if (
    endpointStem === "/api/front/gamedataPrivate" ||
    endpointStem === "/api/front/game_data_open" ||
    endpointStem === "/api/front/gamedata" ||
    endpointStem.startsWith("/api/front/gamedataPrivate-")
  ) {
    const etid = pickFirstValue(payload, ["etid"], "4");
    const gmid = pickFirstValue(payload, ["gmid", "oldgmid", "mid"], "100101");
    if (process.env.ODDS_API_KEY) {
      const oddsSport = ODDS_SPORT_BY_ETID[String(etid)];
      const oddsData = oddsSport ? await fetchOddsApiOdds(oddsSport, gmid) : null;
      if (oddsData) {
        sendEncrypted(res, mock.asSuccess(oddsData));
        return true;
      }
    }
    sendEncrypted(res, mock.asSuccess(mock.getGameData(etid, gmid)));
    return true;
  }

  if (endpointStem === "/api/front/tablelist") {
    sendEncrypted(res, mock.asSuccess(mock.getTableList()));
    return true;
  }

  if (endpointStem === "/api/front/casinoresults") {
    sendEncrypted(res, mock.asSuccess(mock.getCasinoResults(payload)));
    return true;
  }

  if (
    endpointStem === "/api/front/casino/alllist" ||
    endpointStem === "/api/front/get_casino_list"
  ) {
    sendEncrypted(res, mock.asSuccess(mock.getCasinoAllList()));
    return true;
  }

  if (endpointStem === "/api/front/casino/catlist" || endpointStem === "/api/front/cat_list_open") {
    sendEncrypted(res, mock.asSuccess(mock.getCasinoCatList()));
    return true;
  }

  if (
    endpointStem === "/api/front/casino/providerlist" ||
    endpointStem === "/api/front/provider_list_open"
  ) {
    sendEncrypted(res, mock.asSuccess(mock.getCasinoProviderList()));
    return true;
  }

  if (
    endpointStem === "/api/front/casino/slotlist" ||
    endpointStem === "/api/front/slot_list_open"
  ) {
    sendEncrypted(res, mock.asSuccess(mock.getCasinoSlotList()));
    return true;
  }

  if (endpointStem === "/api/front/casino/other" || endpointStem === "/api/front/other_open") {
    sendEncrypted(res, mock.asSuccess(mock.getCasinoOtherList()));
    return true;
  }

  if (
    endpointStem === "/api/front/casino/tablist" ||
    endpointStem === "/api/front/get_casino_tab_list"
  ) {
    const type = pickFirstValue(payload, ["type", "ctype"], "lc");
    sendEncrypted(res, mock.asSuccess({ t1: mock.getCasinoTabList(type) }));
    return true;
  }

  if (
    endpointStem === "/api/front/casino/tablelist" ||
    endpointStem === "/api/front/get_casino_table_list"
  ) {
    const gmid = pickFirstValue(payload, ["gmid"], "35");
    const type = pickFirstValue(payload, ["type", "ctype"], "");
    const livePayload = { ...payload, gmid };
    if (type && !livePayload.type && !livePayload.ctype) {
      livePayload.type = type;
    }
    const liveEnvelope = await fetchUpstreamEnvelope(endpointStem, livePayload);
    const normalizedLiveEnvelope = normalizeCasinoEnvelope(endpointStem, liveEnvelope);
    if (normalizedLiveEnvelope) {
      sendPlain(res, normalizedLiveEnvelope);
      return true;
    }
    sendEncrypted(res, mock.asSuccess({ t1: mock.getCasinoTableList(gmid, type) }));
    return true;
  }

  if (
    endpointStem === "/api/front/casino/data2" ||
    endpointStem === "/api/front/vcasino/data2" ||
    endpointStem.startsWith("/api/front/casino/data2-")
  ) {
    const queryType = urlObj.searchParams.get("type") || "";
    const queryGtype = urlObj.searchParams.get("gtype") || "";
    const worliType = String(
      pickFirstValue(
        {
          ...payload,
          queryType,
          queryGtype
        },
        ["type", "gType", "queryType", "queryGtype"],
        ""
      )
    ).trim();
    const nonMarketTypes = new Set(["lc", "vc", "slot", "xgame"]);
    const normalizedWorliType = worliType.toLowerCase();

    if (worliType && !nonMarketTypes.has(normalizedWorliType) && isMatkaMarketType(worliType)) {
      const matkaType = /^worli3_/i.test(worliType) ? "worli3" : worliType;
      const matkaEnvelope = await fetchMatkaEnvelope(
        `/api/front/casino/data2?type=${encodeURIComponent(matkaType)}`,
        {
          type: matkaType,
          gType: matkaType
        }
      );
      if (matkaEnvelope) {
        sendPlain(res, matkaEnvelope);
        return true;
      }
    }

    const livePayload = { ...payload };
    if (queryType && !livePayload.type) {
      livePayload.type = queryType;
    }
    if (queryGtype && !livePayload.gtype) {
      livePayload.gtype = queryGtype;
    }
    if (queryGtype && !livePayload.type && !livePayload.gType) {
      livePayload.type = queryGtype;
    }
    if (worliType && !livePayload.type && !livePayload.gType && !livePayload.gtype) {
      livePayload.type = worliType;
    }
    const shouldSkipData2Upstream = Boolean(worliType) && !nonMarketTypes.has(normalizedWorliType);
    if (!shouldSkipData2Upstream) {
      const liveEnvelope = await fetchUpstreamEnvelope(endpointStem, livePayload);
      const normalizedLiveEnvelope = normalizeCasinoEnvelope(endpointStem, liveEnvelope);
      if (normalizedLiveEnvelope) {
        sendPlain(res, normalizedLiveEnvelope);
        return true;
      }
    }

    if (/^worli3_/i.test(worliType)) {
      const matkaEnvelope = await fetchMatkaEnvelope(
        `/api/front/casino/data2?gtype=${encodeURIComponent(worliType)}`,
        { type: worliType }
      );
      if (matkaEnvelope) {
        sendPlain(res, matkaEnvelope);
        return true;
      }
      sendEncrypted(res, mock.asSuccess(mock.getWorli3Data2(worliType)));
      return true;
    }

    if (worliType && !nonMarketTypes.has(worliType.toLowerCase())) {
      if (!isMatkaMarketType(worliType)) {
        sendEncrypted(res, mock.asSuccess(mock.getCasinoData2()));
        return true;
      }
      const midToken = String(worliType).split("_")[1] || "194260227210211";
      sendEncrypted(res, mock.asSuccess(mock.getWorli3Data2(`worli3_${midToken}`)));
      return true;
    }

    sendEncrypted(res, mock.asSuccess(mock.getCasinoData2()));
    return true;
  }

  if (
    endpointStem === "/api/front/casino/lastresultsnew" ||
    endpointStem === "/api/front/vcasino/lastresultsnew" ||
    endpointStem === "/api/front/tpcasinoresult"
  ) {
    const queryType = urlObj.searchParams.get("type") || "";
    const gType = pickFirstValue(
      { ...payload, queryType },
      ["gType", "type", "queryType"],
      "teen20"
    );
    const normalizedGType = String(gType || "").trim();
    const genericCasinoTypes = new Set([
      "teen20",
      "dt20",
      "baccarat",
      "roulette11",
      "vteen20",
      "vdt20",
      "andarbahar",
      "lucky7"
    ]);

    if (
      normalizedGType &&
      !genericCasinoTypes.has(normalizedGType.toLowerCase()) &&
      isMatkaMarketType(normalizedGType)
    ) {
      const matkaType = /^worli3_/i.test(normalizedGType) ? "worli3" : normalizedGType;
      const matkaEnvelope = await fetchMatkaEnvelope("/api/front/casino/lastresultsnew", {
        gType: matkaType,
        type: matkaType
      });
      if (matkaEnvelope) {
        sendPlain(res, matkaEnvelope);
        return true;
      }
    }

    const livePayload = { ...payload };
    if (!livePayload.gType && !livePayload.type && gType) {
      livePayload.gType = gType;
    }
    const shouldSkipLastResultsUpstream = shouldSkipEarlyUpstreamForApiGames(endpointStem, {
      ...livePayload,
      type: livePayload.type || gType,
      gType: livePayload.gType || gType
    });
    if (!shouldSkipLastResultsUpstream) {
      const liveEnvelope = await fetchUpstreamEnvelope(endpointStem, livePayload);
      if (liveEnvelope) {
        sendPlain(res, liveEnvelope);
        return true;
      }
    }

    if (/^worli3$/i.test(String(gType || "").trim())) {
      const matkaEnvelope = await fetchMatkaEnvelope("/api/front/casino/lastresultsnew", {
        gType: "worli3"
      });
      if (matkaEnvelope) {
        sendPlain(res, matkaEnvelope);
        return true;
      }
      sendEncrypted(res, mock.asSuccess(mock.getWorli3LastResults()));
      return true;
    }
    if (!genericCasinoTypes.has(String(gType || "").trim().toLowerCase())) {
      const worliResults = mock.getWorli3LastResults();
      if (worliResults && worliResults.res1) {
        worliResults.res1.cname = String(gType || "Matka Market").toUpperCase();
      }
      sendEncrypted(res, mock.asSuccess(worliResults));
      return true;
    }

    sendEncrypted(res, mock.asSuccess(mock.getCasinoLastResults(gType)));
    return true;
  }

  if (endpointStem === "/api/front/casino/check") {
    sendEncrypted(res, {
      success: true,
      msg: "Success",
      status: 200,
      data: {
        vs: true
      }
    });
    return true;
  }

  if (
    endpointStem === "/api/front/casino/launch" ||
    endpointStem === "/api/front/casino/launchother"
  ) {
    const strongLaunchId = pickFirstValue(
      payload,
      ["gid", "mid", "gmid", "oldgmid", "game_uid", "gameID", "ename"],
      ""
    );
    const legacyLaunchId = pickFirstValue(payload, ["id", "game", "gType", "gtype"], "teen20");
    let resolvedId = String(strongLaunchId || legacyLaunchId || "teen20").trim();

    const tableSnapshot = snapshots.readDecryptedSnapshot("/api/front/casino/tablelist");
    const tableRows =
      tableSnapshot &&
      tableSnapshot.data &&
      Array.isArray(tableSnapshot.data.t1)
        ? tableSnapshot.data.t1
        : [];
    if (tableRows.length) {
      const lowered = resolvedId.toLowerCase();
      const matched = tableRows.find((row) => {
        const values = [
          String(row && row.ename ? row.ename : ""),
          String(row && row.mid ? row.mid : ""),
          String(row && row.gmid ? row.gmid : ""),
          String(row && row.id ? row.id : ""),
          String(row && row.gname ? row.gname : "")
        ]
          .map((value) => value.trim().toLowerCase())
          .filter(Boolean);
        return values.includes(lowered);
      });
      if (matched && matched.ename) {
        resolvedId = String(matched.ename);
      }
    }

    const normalizedLegacyLaunchId = normalizeLegacyToken(legacyLaunchId);
    const providerStyleLegacyId =
      !!normalizedLegacyLaunchId &&
      normalizedLegacyLaunchId !== "tv" &&
      !LEGACY_CASINO_MARKET_TYPES.has(normalizedLegacyLaunchId);
    const shouldUseProviderLaunchPath =
      !!strongLaunchId || looksLikeProviderCatalogRouteId(resolvedId) || providerStyleLegacyId;

    if (shouldUseProviderLaunchPath && resolvedId) {
      const fallbackMember = sanitizeMemberAccount(
        pickFirstValue(
          {
            ...payload,
            session_member: sessionUser && sessionUser.username ? sessionUser.username : ""
          },
          ["session_member", "member_account", "username", "uname", "user_name", "uid"],
          ""
        )
      );
      const fallbackAmount = normalizeCreditAmount(
        pickFirstValue(
          {
            ...payload,
            session_balance: sessionUser && sessionUser.balance != null ? sessionUser.balance : ""
          },
          [
            "session_balance",
            "credit_amount",
            "wallet_balance",
            "user_balance",
            "balance",
            "amount",
            "amt"
          ],
          ""
        )
      );
      const fallbackProviderPath = `/provider-game?gid=${encodeURIComponent(resolvedId)}${
        fallbackMember ? `&member=${encodeURIComponent(fallbackMember)}` : ""
      }${fallbackAmount ? `&amount=${encodeURIComponent(fallbackAmount)}` : ""}`;
      sendEncrypted(res, mock.asSuccess({ url: fallbackProviderPath }));
      return true;
    }

    const externalLaunch = resolveExternalIframeLaunch({
      gameId: resolvedId,
      rawId: String(legacyLaunchId || ""),
      username: pickFirstValue(payload, ["username", "uname", "un", "uid"], ""),
      token
    });
    if (externalLaunch && externalLaunch.url) {
      const localPlayerUrl = buildLocalExternalPlayerUrl(externalLaunch, resolvedId);
      sendEncrypted(res, mock.asSuccess({ url: localPlayerUrl || externalLaunch.url }));
      return true;
    }

    if (
      endpointStem === "/api/front/casino/launchother" &&
      !strongLaunchId &&
      /^tv$/i.test(String(legacyLaunchId || "").trim())
    ) {
      const liveEnvelope = await fetchMatkaEnvelope("/api/front/casino/launchother", { id: "tv" });
      if (liveEnvelope) {
        sendPlain(res, liveEnvelope);
        return true;
      }
    }

    sendEncrypted(res, mock.asSuccess(mock.getCasinoLaunchPayload(resolvedId)));
    return true;
  }

  if (endpointStem === "/api/front/cricketvdata2" || endpointStem === "/api/front/gettv") {
    const externalLaunch = resolveExternalIframeLaunch({
      gameId: "cricketv2",
      rawId: "cricketv2",
      username: pickFirstValue(payload, ["username", "uname", "un", "uid"], ""),
      token
    });
    if (externalLaunch && externalLaunch.url) {
      const localPlayerUrl = buildLocalExternalPlayerUrl(externalLaunch, "cricketv2");
      sendEncrypted(res, mock.asSuccess({ url: localPlayerUrl || externalLaunch.url }));
      return true;
    }
    sendEncrypted(res, mock.asSuccess(mock.getCricketTvPayload()));
    return true;
  }

  if (endpointStem === "/api/front/get_tree_open_data") {
    sendEncrypted(res, mock.asSuccess(mock.getTreeData()));
    return true;
  }

  if (endpointStem === "/api/front/userbuttonlist") {
    sendEncrypted(res, db.getUserButtonList(pickFirstValue(payload, ["btype"], "D")));
    return true;
  }

  if (endpointStem === "/api/front/buttonlist" || endpointStem === "/api/front/buttonlistcs") {
    if (endpointStem === "/api/front/buttonlistcs") {
      const liveEnvelope = await fetchMatkaEnvelope("/api/front/buttonlistcs", {});
      if (liveEnvelope) {
        sendPlain(res, liveEnvelope);
        return true;
      }
    }
    const mode = endpointStem === "/api/front/buttonlistcs" ? "casino" : "game";
    sendEncrypted(res, mock.asSuccess(mock.getButtonList(mode)));
    return true;
  }

  if (endpointStem === "/api/front/buttonupdate" || endpointStem === "/api/front/buttonupdatecs") {
    db.updateButtonSettings(payload, endpointStem === "/api/front/buttonupdatecs" ? "casino" : "game");
    sendEncrypted(res, { success: true, msg: "Update Button Value", status: 200 });
    return true;
  }

  if (OPEN_BET_LIST_ENDPOINTS.has(endpointStem)) {
    sendEncrypted(res, db.listOpenBets(token, payload));
    return true;
  }

  if (BOOK_ENDPOINTS.has(endpointStem)) {
    sendEncrypted(res, db.listBookData(token, payload));
    return true;
  }

  if (FANCY_BOOK_ENDPOINTS.has(endpointStem)) {
    sendEncrypted(res, { success: true, status: 200, msg: "success", data: [] });
    return true;
  }

  if (endpointStem === "/api/front/marketanalysis") {
    sendEncrypted(res, db.listMarketAnalysis(token, payload));
    return true;
  }

  if (BET_ENDPOINTS.has(endpointStem)) {
    sendEncrypted(res, db.placeBet(token, payload, endpointStem));
    return true;
  }

  if (endpointStem === "/api/front/repeatplacebet") {
    sendEncrypted(res, db.repeatBet(token, payload));
    return true;
  }

  if (endpointStem === "/api/front/deleteplacebet") {
    sendEncrypted(res, db.deleteBet(token, payload));
    return true;
  }

  if (STATEMENT_ENDPOINT_MODES.has(endpointStem)) {
    sendEncrypted(res, db.listStatements(token, payload, STATEMENT_ENDPOINT_MODES.get(endpointStem)));
    return true;
  }

  if (SUPAGO_STATEMENT_ENDPOINT_MODES.has(endpointStem)) {
    sendEncrypted(
      res,
      db.listSupagoStatements(token, payload, SUPAGO_STATEMENT_ENDPOINT_MODES.get(endpointStem))
    );
    return true;
  }

  if (endpointStem === "/api/front/depositautolink") {
    const amount = normalizeAmount(payload);
    sendEncrypted(res, {
      success: true,
      msg: "success",
      status: 200,
      data: {
        t1: {
          url: `/payment/success?amount=${encodeURIComponent(amount)}`
        }
      }
    });
    return true;
  }

  if (DEPOSIT_ENDPOINTS.has(endpointStem)) {
    const amount = normalizeAmount(payload);
    sendEncrypted(res, db.applyDeposit(token, { ...payload, amount }, "Deposit request"));
    return true;
  }

  if (WITHDRAW_ENDPOINTS.has(endpointStem)) {
    sendEncrypted(res, db.applyWithdraw(token, payload, "Withdraw request"));
    return true;
  }

  if (endpointStem === "/api/front/paymentlist") {
    sendEncrypted(res, {
      success: true,
      msg: "success",
      status: 200,
      data: {
        t1: buildLegacyPaymentList()
      }
    });
    return true;
  }

  if (endpointStem === "/api/front/local-payment-settings") {
    if (req.method === "POST" || req.method === "PUT" || req.method === "PATCH") {
      const actor = db.resolveUser(payload, token, { allowPrimaryFallback: false });
      const ownerLogin = String(db.getOwnerUsername() || "").trim().toLowerCase();
      const actorLogin = String(actor && actor.username ? actor.username : "")
        .trim()
        .toLowerCase();
      if (!actorLogin || actorLogin !== ownerLogin) {
        sendPlain(res, {
          success: false,
          status: 403,
          msg: "Only owner admin can update payment settings."
        }, 403);
        return true;
      }
      sendPlain(res, db.updatePaymentSettings(payload));
      return true;
    }
    sendPlain(res, {
      success: true,
      status: 200,
      msg: "success",
      data: db.getPaymentSettings()
    });
    return true;
  }

  if (endpointStem === "/api/front/local-payment-utr") {
    if (req.method !== "POST") {
      sendPlain(res, {
        success: false,
        status: 405,
        msg: "Method not allowed."
      }, 405);
      return true;
    }
    const result = db.savePaymentUtr(token, payload);
    sendPlain(res, result, Number(result.status || 200));
    return true;
  }

  if (endpointStem === "/api/front/local-withdraw-details") {
    if (req.method !== "POST") {
      sendPlain(res, {
        success: false,
        status: 405,
        msg: "Method not allowed."
      }, 405);
      return true;
    }
    const result = db.listWithdrawBankDetails(token, payload);
    sendPlain(res, result, Number(result.status || 200));
    return true;
  }

  if (endpointStem === "/api/front/local-withdraw-add-detail") {
    if (req.method !== "POST") {
      sendPlain(res, {
        success: false,
        status: 405,
        msg: "Method not allowed."
      }, 405);
      return true;
    }
    const result = db.addWithdrawBankDetail(token, payload);
    sendPlain(res, result, Number(result.status || 200));
    return true;
  }

  if (endpointStem === "/api/front/local-withdraw-request") {
    if (req.method !== "POST") {
      sendPlain(res, {
        success: false,
        status: 405,
        msg: "Method not allowed."
      }, 405);
      return true;
    }
    const result = db.applyWithdraw(token, payload, "Withdraw request");
    sendPlain(res, result, Number(result.status || 200));
    return true;
  }

  if (endpointStem === "/api/front/m-payment-list") {
    sendEncrypted(res, {
      success: true,
      msg: "success",
      status: 200,
      data: buildLegacyPaymentList()
    });
    return true;
  }

  if (endpointStem === "/api/front/supago/paymentlist") {
    sendEncrypted(res, {
      success: true,
      msg: "success",
      status: 200,
      data: db.listSupagoPaymentList()
    });
    return true;
  }

  if (endpointStem === "/api/front/supago/paymenttype") {
    sendEncrypted(res, db.getSupagoPaymentType(payload));
    return true;
  }

  if (endpointStem === "/api/front/get-withdraw-payment-types") {
    sendEncrypted(res, db.getWithdrawPaymentTypes());
    return true;
  }

  if (endpointStem === "/api/front/get-withdraw-types") {
    sendEncrypted(res, db.getWithdrawTypes());
    return true;
  }

  if (endpointStem === "/api/front/withdraw-bank-details") {
    sendEncrypted(res, db.listWithdrawBankDetails(token, payload));
    return true;
  }

  if (endpointStem === "/api/front/load-withdraw-form") {
    sendEncrypted(res, db.getWithdrawForm(payload));
    return true;
  }

  if (endpointStem === "/api/front/withdraw-add-new-details") {
    sendEncrypted(res, db.addWithdrawBankDetail(token, payload));
    return true;
  }

  if (endpointStem === "/api/front/supago/withdraw-add-new-details") {
    sendEncrypted(res, db.addSupagoWithdrawDetail(payload));
    return true;
  }

  if (
    endpointStem === "/api/front/supago-withdraw-details" ||
    endpointStem === "/api/front/supago/withdraw-details"
  ) {
    sendEncrypted(res, db.listSupagoWithdrawDetails());
    return true;
  }

  if (endpointStem === "/api/front/supago/delete-withdraw-detail") {
    sendEncrypted(res, db.deleteSupagoWithdrawDetail(payload));
    return true;
  }

  if (endpointStem === "/api/front/sectionpana") {
    sendEncrypted(res, buildSectionPanaPayload(payload));
    return true;
  }

  if (endpointStem === "/api/front/worlisectiondata") {
    const sectionPayload = {
      sid: Number(pickFirstValue(payload, ["sid"], "14")) || 14,
      gType: pickFirstValue(payload, ["gType", "type"], "worli3")
    };
    const liveEnvelope = await fetchMatkaEnvelope("/api/front/worlisectiondata", sectionPayload);
    if (liveEnvelope) {
      sendPlain(res, liveEnvelope);
      return true;
    }

    sendEncrypted(res, buildWorliSectionPayload(payload));
    return true;
  }

  if (endpointStem === "/api/front/worli3calendar") {
    const calendarPayload = {
      mid: pickFirstValue(payload, ["mid"], "0"),
      fdt: pickFirstValue(payload, ["fdt"], ""),
      tdt: pickFirstValue(payload, ["tdt"], "")
    };
    const liveEnvelope = await fetchMatkaEnvelope("/api/front/worli3calendar", calendarPayload);
    if (liveEnvelope) {
      sendPlain(res, liveEnvelope);
      return true;
    }

    sendEncrypted(res, buildWorliCalendarPayload(payload));
    return true;
  }

  if (endpointStem === "/api/front/tpcasinolist") {
    const rows = mock.getCasinoTableList(pickFirstValue(payload, ["gmid"], "35"));
    sendEncrypted(res, { success: true, msg: "success", status: 200, data: { t1: rows, t2: [] } });
    return true;
  }

  if (endpointStem === "/api/front/tpcasinosoda") {
    sendEncrypted(res, { success: true, msg: "success", status: 200, data: [] });
    return true;
  }

  if (endpointStem === "/api/front/searchgame") {
    const keyword = pickFirstValue(payload, ["search", "keyword", "query", "name"], "");
    const rows = mock.searchGames(keyword);
    sendEncrypted(res, { success: true, msg: "success", status: 200, data: rows });
    return true;
  }

  if (endpointStem === "/api/front/get-bonus-depo") {
    sendEncrypted(res, buildBonusDepositPayload());
    return true;
  }

  if (endpointStem === "/api/front/get-bonus-coupon") {
    sendEncrypted(res, {
      success: true,
      status: 200,
      msg: "success",
      data: [
        {
          copid: 1,
          title: "5% Coupon",
          bonus: 5
        }
      ]
    });
    return true;
  }

  if (endpointStem === "/api/front/activate-bonus-coupon") {
    sendEncrypted(res, {
      success: true,
      status: 200,
      msg: "Coupon activated successfully."
    });
    return true;
  }

  if (endpointStem === "/api/front/get_currency_list") {
    sendEncrypted(res, {
      success: true,
      status: 200,
      msg: "success",
      data: db.getCurrencyList()
    });
    return true;
  }

  if (endpointStem === "/api/front/ipdetail") {
    const ip = pickFirstValue(payload, ["ip"], "127.0.0.1");
    sendEncrypted(res, {
      success: true,
      status: 200,
      msg: "success",
      data: {
        status: "success",
        query: ip,
        country: "India",
        countryCode: "IN",
        city: "Mumbai",
        isp: "Localhost ISP"
      }
    });
    return true;
  }

  if (endpointStem === "/api/front/casino/checkvip") {
    sendEncrypted(res, { success: true, status: 200, msg: "success" });
    return true;
  }

  if (endpointStem === "/api/front/casino/gettokenvip") {
    sendEncrypted(res, {
      success: true,
      status: 200,
      msg: "success",
      data: {
        apiKey: "rdx_6d19426d155043b6fb814e4491543bf5f052baf3325c5873",
        token: "rdxs_45357d3025d045c0c1765b379493df0740b313f63bd42e06334a230e12cc1f34"
      }
    });
    return true;
  }

  if (endpointStem === "/api/front/casino/tabdata") {
    const tabType = String(
      pickFirstValue(
        {
          ...payload,
          queryType: urlObj.searchParams.get("type") || ""
        },
        ["type", "ctype", "queryType"],
        "lc"
      )
    ).trim();
    const normalizedTabType = tabType.toLowerCase();
    const isCustomMarketType = Boolean(
      tabType && !["lc", "vc", "slot", "xgame"].includes(normalizedTabType)
    );

    if (isCustomMarketType) {
      const matkaType = /^worli3_/i.test(tabType) ? "worli3" : tabType;
      const matkaEnvelope = await fetchMatkaEnvelope(
        `/api/front/casino/tabdata?type=${encodeURIComponent(matkaType)}`,
        { type: matkaType }
      );
      if (matkaEnvelope) {
        sendPlain(res, matkaEnvelope);
        return true;
      }
    }

    const livePayload = { ...payload };
    if (tabType && !livePayload.type && !livePayload.ctype) {
      livePayload.type = tabType;
    }
    const liveEnvelope = await fetchUpstreamEnvelope(endpointStem, livePayload);
    const normalizedLiveEnvelope = normalizeCasinoEnvelope(endpointStem, liveEnvelope);
    if (normalizedLiveEnvelope) {
      sendPlain(res, normalizedLiveEnvelope);
      return true;
    }

    if (/^worli3$/i.test(tabType)) {
      const matkaEnvelope = await fetchMatkaEnvelope(
        `/api/front/casino/tabdata?type=${encodeURIComponent(tabType)}`,
        { type: tabType }
      );
      if (matkaEnvelope) {
        sendPlain(res, matkaEnvelope);
        return true;
      }
      sendEncrypted(res, mock.asSuccess(mock.getWorli3TabData()));
      return true;
    }

    if (isCustomMarketType) {
      sendEncrypted(res, mock.asSuccess(mock.getWorli3TabData()));
      return true;
    }

    const apiTabEnvelope = await fetchApiGamesEnvelope("/api/front/casino/tablist", {
      type: normalizedTabType || "lc"
    });
    if (apiTabEnvelope && typeof apiTabEnvelope.data === "string") {
      try {
        const decoded = decryptPayload(apiTabEnvelope.data);
        const tabRows = Array.isArray(decoded && decoded.data && decoded.data.t1)
          ? decoded.data.t1
          : [];
        if (tabRows.length) {
          const rows = tabRows.map((row) => ({
            mid: String(row && (row.gmid || row.mid || row.id) ? row.gmid || row.mid || row.id : ""),
            mtype: "ALL",
            mname: String(row && (row.cname || row.name) ? row.cname || row.name : "Games")
          }));
          sendEncrypted(res, { success: true, status: 200, msg: "success", data: rows });
          return true;
        }
      } catch {
        // ignore decode errors and continue fallback flow
      }
    }

    const rows = mock.getCasinoTabList(tabType).map((row) => ({
      mid: String(row.gmid),
      mtype: "ALL",
      mname: row.cname
    }));
    sendEncrypted(res, { success: true, status: 200, msg: "success", data: rows });
    return true;
  }

  if (endpointStem === "/api/front/accstatepopup") {
    sendEncrypted(res, { success: false, msg: "No Record Found.", status: 300 });
    return true;
  }

  // Last live fallback: if endpoint is still unhandled locally, try direct
  // upstream mirror so new sports/casino APIs keep working without mock drift.
  if (endpointStem.startsWith("/api/front/")) {
    const liveFallbackEnvelope = await fetchUpstreamEnvelope(endpointStem, liveProxyPayload, {
      allowDirect: true
    });
    const normalizedLiveFallbackEnvelope = normalizeCasinoEnvelope(endpointStem, liveFallbackEnvelope);
    if (normalizedLiveFallbackEnvelope) {
      sendPlain(res, normalizedLiveFallbackEnvelope);
      return true;
    }
  }

  const snapshotPayload = snapshots.readWrappedSnapshot(endpointStem);
  if (snapshotPayload) {
    sendPlain(res, snapshotPayload);
    return true;
  }

  const aliasStem = API_ALIAS_STEMS.get(endpointStem);
  if (aliasStem) {
    const aliasSnapshotPayload = snapshots.readWrappedSnapshot(aliasStem);
    if (aliasSnapshotPayload) {
      sendPlain(res, aliasSnapshotPayload);
      return true;
    }
  }

  sendEncrypted(res, getFallbackPayload(endpointStem));
  return true;
}

module.exports = {
  handleApiFrontRequest
};