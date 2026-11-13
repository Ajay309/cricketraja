const fs = require("fs");
const path = require("path");
const {
  parseRequestPayload,
  sendJson,
  sendText,
  pickFirstValue,
  toNumber
} = require("./http-utils");
const { handleHostingApiRoute } = require("./hosting-service");
const { ROOT_DIR } = require("./config");

const ADMIN_PREFIX = "/admin.99-exch.red";
const ADMIN_CANONICAL_PREFIX = "/admin";
const ADMIN_SESSION_COOKIE = "admin_session";
const ADMIN_SESSION_MAX_AGE_SECONDS = 315360000; // 10 years
const ADMIN_DEFAULT_USERNAME = "admin";
const ADMIN_DEFAULT_PASSWORD = "admin00";
const ADMIN_DEFAULT_DISPLAY_NAME = "Admin";
const ADMIN_LOGIN_USERNAME = String(process.env.ADMIN_LOGIN_USERNAME || ADMIN_DEFAULT_USERNAME)
  .trim()
  .toLowerCase();
const ADMIN_LOGIN_PASSWORD = String(process.env.ADMIN_LOGIN_PASSWORD || ADMIN_DEFAULT_PASSWORD);
const ADMIN_DISPLAY_NAME =
  String(process.env.ADMIN_DISPLAY_NAME || ADMIN_DEFAULT_DISPLAY_NAME).trim() ||
  ADMIN_DEFAULT_DISPLAY_NAME;
const VIEWINFO_TEMPLATE_PATH = path.join(
  ROOT_DIR,
  "admin.99-exch.red",
  "admin",
  "viewinfo",
  "330885.html"
);

const ADMIN_PUBLIC_EXACT = new Set([
  ADMIN_CANONICAL_PREFIX,
  `${ADMIN_CANONICAL_PREFIX}/index.html`,
  `${ADMIN_CANONICAL_PREFIX}/login`,
  `${ADMIN_CANONICAL_PREFIX}/login.html`,
  `${ADMIN_CANONICAL_PREFIX}/login/Admin/check_user_login`,
  `${ADMIN_CANONICAL_PREFIX}/login/Admin/get_register_Data`,
  `${ADMIN_CANONICAL_PREFIX}/spinner.gif`,
  `${ADMIN_CANONICAL_PREFIX}/logout`,
  `${ADMIN_CANONICAL_PREFIX}/logout.html`
]);

function normalizeAdminPath(pathname = "/") {
  const clean = decodeURIComponent(pathname || "/").replace(/\/+$/, "") || "/";
  if (clean === ADMIN_PREFIX || clean === `${ADMIN_PREFIX}/`) {
    return ADMIN_CANONICAL_PREFIX;
  }
  if (clean.startsWith(`${ADMIN_PREFIX}/`)) {
    return `${ADMIN_CANONICAL_PREFIX}${clean.slice(ADMIN_PREFIX.length)}`;
  }
  return clean;
}

function isAdminPublicPath(pathname = "/", method = "GET") {
  const clean = normalizeAdminPath(pathname);
  if (ADMIN_PUBLIC_EXACT.has(clean)) {
    return true;
  }

  const httpMethod = String(method || "GET").toUpperCase();
  if (clean === `${ADMIN_CANONICAL_PREFIX}/login` && httpMethod === "POST") {
    return true;
  }

  return (
    clean.startsWith(`${ADMIN_CANONICAL_PREFIX}/assets/`) ||
    clean.startsWith(`${ADMIN_CANONICAL_PREFIX}/_ext/`) ||
    clean.startsWith(`${ADMIN_CANONICAL_PREFIX}/_DataURI/`)
  );
}

function parseCookies(req) {
  const raw = String(req.headers.cookie || "");
  const out = {};
  for (const chunk of raw.split(";")) {
    const item = String(chunk || "").trim();
    if (!item) continue;
    const eqIndex = item.indexOf("=");
    const key = eqIndex >= 0 ? item.slice(0, eqIndex).trim() : item;
    if (!key) continue;
    const val = eqIndex >= 0 ? item.slice(eqIndex + 1).trim() : "";
    try {
      out[key] = decodeURIComponent(val);
    } catch {
      out[key] = val;
    }
  }
  return out;
}

function getAdminSessionToken(req) {
  const cookies = parseCookies(req);
  return String(cookies[ADMIN_SESSION_COOKIE] || "").trim();
}

function isAdminAuthenticated(req, db) {
  const token = getAdminSessionToken(req);
  if (!token) return false;
  return Boolean(db.getUserFromToken(token));
}

function buildSessionCookie(token) {
  return `${ADMIN_SESSION_COOKIE}=${encodeURIComponent(
    token
  )}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${ADMIN_SESSION_MAX_AGE_SECONDS}`;
}

function clearSessionCookie() {
  return `${ADMIN_SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}

function normalizeRoute(pathname = "/") {
  const clean = decodeURIComponent(pathname || "/").replace(/\/+$/, "") || "/";
  if (clean === ADMIN_PREFIX || clean === `${ADMIN_PREFIX}/`) {
    return "/";
  }
  if (!clean.startsWith(`${ADMIN_PREFIX}/`)) {
    return null;
  }
  const inner = clean.slice(ADMIN_PREFIX.length) || "/";
  return inner.endsWith(".html") ? inner.slice(0, -5) : inner;
}

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escJs(value = "") {
  return String(value).replace(/\\/g, "\\\\").replace(/'/g, "\\'");
}

function fmt(value = 0) {
  return Number(toNumber(value, 0)).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function exposureRisk(value = 0) {
  return Number(Math.max(0, Math.abs(toNumber(value, 0))).toFixed(2));
}

function exposureDisplay(value = 0) {
  return Number((-exposureRisk(value)).toFixed(2));
}

function availableBalanceValue(balance = 0, exposure = 0) {
  return Number((toNumber(balance, 0) - exposureRisk(exposure)).toFixed(2));
}

function normalizeStatus(value = "") {
  const raw = String(value || "").trim().toLowerCase();
  if (raw === "confirm") return "Confirm";
  if (raw === "process") return "Process";
  if (raw === "reject") return "Reject";
  return "Request";
}

const ROLE_LEVELS = Object.freeze({
  User: 1,
  Master: 2,
  Admin: 3,
  "Super Master": 3,
  "Hyper Super Master": 4
});

const OWNER_ONLY_PAYMENT_ROUTES = new Set([
  "/payment-methods",
  "/add-payment-method",
  "/all-deposit-requests",
  "/all-withdraw-requests",
  "/utr-numbers-list"
]);

const OWNER_ONLY_SECTION_ROUTES = new Set([
  "/addfunds",
  "/admin/my_market",
  "/admin/acStatement",
  "/gameclientbet",
  "/profitloss",
  "/bethistory",
  "/transaction-history-admin",
  "/income-report",
  "/clientpl",
  "/sportspl",
  "/new_chipsummary"
]);

function normalizeUserType(value = "", fallback = "User") {
  const raw = String(value || "").trim().toLowerCase();
  if (!raw) {
    return fallback;
  }
  if (
    raw.includes("hyper") ||
    raw === "super admin" ||
    raw === "super senior" ||
    raw === "supersenior" ||
    raw === "owner" ||
    raw === "sba"
  ) {
    return "Hyper Super Master";
  }
  if (
    raw.includes("super master") ||
    raw === "supermaster" ||
    raw === "smdl"
  ) {
    return "Super Master";
  }
  if (raw === "admin" || raw === "subadmin" || raw === "sadmin") {
    return "Admin";
  }
  if (raw === "master" || raw === "mdl" || raw === "agent") {
    return "Master";
  }
  if (raw === "user" || raw === "player" || raw === "dl" || raw === "client") {
    return "User";
  }
  return fallback;
}

function roleLevel(value = "") {
  return ROLE_LEVELS[normalizeUserType(value, "User")] || ROLE_LEVELS.User;
}

function isOwnerProfile(profile) {
  return Boolean(profile) && String(profile.master_id || "") === "0";
}

function hasGlobalVisibility(ctx) {
  if (!ctx || !ctx.actorProfile) {
    return false;
  }
  return Boolean(ctx.isOwner);
}

function ensureProfilesForAllUsers(db) {
  for (const username of Object.keys(db.state.users || {})) {
    db.ensureAdminUserProfile(username, "User");
  }
}

function primaryUser(db) {
  ensureProfilesForAllUsers(db);
  const preferred = [ADMIN_LOGIN_USERNAME].filter(Boolean);
  let user = null;
  for (const candidate of preferred) {
    user = db.findUserByUsername(candidate);
    if (user) {
      break;
    }
  }
  if (!user) {
    const ownerUsername = ADMIN_LOGIN_USERNAME || ADMIN_DEFAULT_USERNAME;
    user = db.createUser({
      username: ownerUsername,
      password: ADMIN_LOGIN_PASSWORD,
      displayName: ADMIN_DISPLAY_NAME,
      startingBalance: 5000
    });
  }
  const profile = db.ensureAdminUserProfile(user.username, "Hyper Super Master");
  if (profile) {
    profile.user_type = "Hyper Super Master";
    profile.master_id = "0";
  }
  return user;
}

function getActorContext(req, db) {
  const panel = db.ensureAdminPanelState();
  const owner = primaryUser(db);
  const ownerProfile = db.ensureAdminUserProfile(owner.username, "Hyper Super Master");
  const token = getAdminSessionToken(req);
  let actor = db.getUserFromToken(token);
  if (!actor) {
    actor = owner;
  }
  const actorFallbackType =
    ownerProfile && String(actor.username || "").toLowerCase() === String(owner.username || "").toLowerCase()
      ? "Hyper Super Master"
      : "User";
  const actorProfile = db.ensureAdminUserProfile(actor.username, actorFallbackType);
  const isOwner =
    Boolean(actorProfile && ownerProfile) &&
    (String(actorProfile.user_id) === String(ownerProfile.user_id) || isOwnerProfile(actorProfile));
  return {
    token,
    panel,
    actor,
    actorProfile,
    owner,
    ownerProfile,
    isOwner
  };
}

function canAccessProfile(ctx, profileOrId, { includeSelf = true } = {}) {
  if (!ctx || !ctx.panel || !ctx.actorProfile) {
    return false;
  }
  if (hasGlobalVisibility(ctx)) {
    return true;
  }

  const actorId = String(ctx.actorProfile.user_id || "").trim();
  if (!actorId) {
    return false;
  }

  const targetId = String(
    typeof profileOrId === "object" && profileOrId !== null
      ? profileOrId.user_id || ""
      : profileOrId || ""
  ).trim();
  if (!targetId) {
    return false;
  }
  if (targetId === actorId) {
    return includeSelf;
  }

  let current = ctx.panel.userProfiles[targetId] || null;
  const visited = new Set();
  let guard = 0;
  while (current && guard < 200) {
    const parentId = String(current.master_id || "").trim();
    if (!parentId || parentId === "0") {
      return false;
    }
    if (parentId === actorId) {
      return true;
    }
    if (visited.has(parentId)) {
      return false;
    }
    visited.add(parentId);
    current = ctx.panel.userProfiles[parentId] || null;
    guard += 1;
  }

  return false;
}

function getAccessibleProfileIdSet(ctx, { includeSelf = false } = {}) {
  const ids = new Set();
  if (!ctx || !ctx.panel) {
    return ids;
  }
  if (hasGlobalVisibility(ctx)) {
    for (const profile of Object.values(ctx.panel.userProfiles || {})) {
      ids.add(String(profile.user_id));
    }
    return ids;
  }
  for (const profile of Object.values(ctx.panel.userProfiles || {})) {
    if (canAccessProfile(ctx, profile, { includeSelf })) {
      ids.add(String(profile.user_id));
    }
  }
  return ids;
}

function filterTransactionsByScope(rows = [], ctx, includeSelf = false) {
  if (!ctx || hasGlobalVisibility(ctx) || hasPaymentAuthority(ctx)) {
    return rows;
  }
  const allowed = getAccessibleProfileIdSet(ctx, { includeSelf });
  return rows.filter((row) => allowed.has(String(row.user_id || "")));
}

function buildDashboardData(db, ctx) {
  const actor = (ctx && ctx.actor) || primaryUser(db);
  const profile =
    (ctx && ctx.actorProfile) || db.ensureAdminUserProfile(actor.username, "Hyper Super Master");
  const panel = db.ensureAdminPanelState();
  const actorId = String(profile && profile.user_id ? profile.user_id : "");
  const actorBalance = Number(toNumber(actor && actor.balance, 0));
  const creditLimitValue = Number(
    toNumber(
      (profile && profile.credit_limit) || (actor && actor.exposureLimit) || 0,
      0
    )
  );

  // Downline = all descendants (super masters, masters, users) under current admin.
  const downlineProfiles = Object.values(panel.userProfiles || {}).filter((candidate) => {
    if (!candidate) return false;
    const candidateId = String(candidate.user_id || "").trim();
    if (!candidateId || candidateId === actorId) return false;
    if (ctx && hasGlobalVisibility(ctx)) {
      return true;
    }
    return canAccessProfile(ctx, candidate, { includeSelf: false });
  });

  const downlineBalanceValue = downlineProfiles.reduce((sum, candidate) => {
    const downlineUser = db.findUserByUsername(candidate.username);
    if (!downlineUser) return sum;
    return sum + toNumber(downlineUser.balance, 0);
  }, 0);

  // Winnings tile tracks current logged-in account wallet snapshot.
  const winningsValue = actorBalance;
  // Requested formula: Total = website winnings + downline balance + credit limit.
  const totalBalanceValue = winningsValue + downlineBalanceValue + creditLimitValue;

  return {
    credit_limit: fmt(creditLimitValue),
    winnings: fmt(winningsValue),
    total_balance: fmt(totalBalanceValue),
    balance: fmt(actorBalance),
    downline_balance: Number(downlineBalanceValue.toFixed(2))
  };
}

function summarizeTransactions(db, filters = {}, ctx) {
  const rows = filterTransactionsByScope(db.listAdminTransactions(filters), ctx, false);
  const out = {
    deposit_total_count: 0,
    deposit_total_sum: 0,
    deposit_confirm_count: 0,
    deposit_confirm_sum: 0,
    deposit_reject_count: 0,
    deposit_reject_sum: 0,
    deposit_pending_count: 0,
    deposit_pending_sum: 0,
    withdraw_total_count: 0,
    withdraw_total_sum: 0,
    withdraw_confirm_count: 0,
    withdraw_confirm_sum: 0,
    withdraw_reject_count: 0,
    withdraw_reject_sum: 0,
    withdraw_pending_count: 0,
    withdraw_pending_sum: 0
  };

  for (const row of rows) {
    const type = String(row.payment_type || "").toLowerCase();
    const status = String(row.status || "").toLowerCase();
    const amount = toNumber(row.amount, 0);
    if (type === "deposit") {
      out.deposit_total_count += 1;
      out.deposit_total_sum += amount;
      if (status === "confirm") {
        out.deposit_confirm_count += 1;
        out.deposit_confirm_sum += amount;
      } else if (status === "reject") {
        out.deposit_reject_count += 1;
        out.deposit_reject_sum += amount;
      } else {
        out.deposit_pending_count += 1;
        out.deposit_pending_sum += amount;
      }
    }
    if (type === "withdraw") {
      out.withdraw_total_count += 1;
      out.withdraw_total_sum += amount;
      if (status === "confirm") {
        out.withdraw_confirm_count += 1;
        out.withdraw_confirm_sum += amount;
      } else if (status === "reject") {
        out.withdraw_reject_count += 1;
        out.withdraw_reject_sum += amount;
      } else {
        out.withdraw_pending_count += 1;
        out.withdraw_pending_sum += amount;
      }
    }
  }

  for (const key of Object.keys(out)) {
    out[key] = Number(out[key].toFixed(2));
  }
  return out;
}

function txActions(row, index) {
  const id = Number(row.id);
  const userId = escapeHtml(row.user_id);
  const amount = Number(toNumber(row.amount, 0).toFixed(2));
  const status = String(row.status || "Request");
  const remarksId = `remarks_${index}`;
  if (String(row.payment_type || "").toLowerCase() === "deposit") {
    if (status === "Request") {
      return `
        <button type="button" class="btn btn-success btn-xs" id="confirmButton_${id}" onclick="confirmDeposit('${id}','${userId}','${amount}','${index}')">Confirm</button>
        <button type="button" class="btn btn-danger btn-xs" id="remarks_link${index}" onclick="rejectDeposit('Reject','${id}','${remarksId}','${index}')">Reject</button>
      `;
    }
    if (status === "Confirm") return `<span class="text-success">Completed</span>`;
    if (status === "Reject") return `<span class="text-danger">Rejected</span>`;
    return `<span>${escapeHtml(status)}</span>`;
  }

  if (status === "Request" || status === "Process") {
    return `
      <div id="action_${id}">
        <input type="hidden" id="${remarksId}" value="${escapeHtml(row.remark || "Done")}">
        <button type="button" class="btn btn-success btn-xs withdraw-action-accept" id="confirmButton_${id}" onclick="confirmWithdraw('${remarksId}','${id}','${index}')">Accept</button>
        <button type="button" class="btn btn-danger btn-xs withdraw-action-reject" id="remarks_link${index}_reject" onclick="rejectDeposit('Reject','${id}','${remarksId}','${index}')">Reject</button>
      </div>
    `;
  }
  if (status === "Confirm") return `<div id="action_${id}"><span style="color:green">Completed</span></div>`;
  if (status === "Reject") return `<div id="action_${id}"><span class="text-danger">Rejected</span></div>`;
  return `<div id="action_${id}"><span>${escapeHtml(status)}</span></div>`;
}

function txHistoryHtml(db, payload = {}, ctx) {
  const rows = filterTransactionsByScope(db.listAdminTransactions(payload), ctx, false);
  let html = `
    <table class="table table-striped table-bordered" style="text-align:center;width:100%" id="example">
      <thead>
        <tr>
          <th>No</th><th>Domain</th><th>User Name</th><th>Amount</th><th>Total</th>
          <th>Status</th><th>UTR</th><th>Date</th><th>Remark</th><th>User Id</th><th>Type</th><th>Action</th>
        </tr>
      </thead>
      <tbody>
  `;
  if (!rows.length) {
    return `${html}<tr><td colspan="12">No record found!</td></tr></tbody></table>`;
  }
  rows.forEach((row, index) => {
    const user = db.findUserByUsername(row.login);
    const total = user ? toNumber(user.balance, 0) : 0;
    html += `
      <tr id="row_${row.id}">
        <td>${index + 1}</td>
        <td>${escapeHtml(row.domain || "CRICKETRAJA")}</td>
        <td>${escapeHtml(row.username || row.login || "")}</td>
        <td>${fmt(row.amount)}</td>
        <td>${fmt(total)}</td>
        <td id="status_${row.id}">${escapeHtml(row.status || "Request")}</td>
        <td>${escapeHtml(row.utrNumber || "-")}</td>
        <td>${escapeHtml(row.created_at || "")}</td>
        <td>${escapeHtml(row.remark || "-")}</td>
        <td>${escapeHtml(row.user_id || "")}</td>
        <td>${escapeHtml(row.payment_type || "")}</td>
        <td>${txActions(row, index)}</td>
      </tr>
    `;
  });
  return `${html}</tbody></table>`;
}

function pendingDepositRows(db, ctx) {
  const rows = filterTransactionsByScope(
    db.listAdminTransactions({
      payment_type: "Deposit",
      status: "Request"
    }),
    ctx,
    false
  );
  return rows.map((row) => {
    const user = db.findUserByUsername(row.login);
    const profile = db.getAdminProfileById(row.user_id);
    const totalBalance = toNumber(user ? user.balance : 0, 0);
    const exposure = exposureDisplay(user ? user.exposure : 0);
    const availableBalance = availableBalanceValue(totalBalance, user ? user.exposure : 0);
    const creditLimit = toNumber(
      profile && typeof profile.credit_limit !== "undefined"
        ? profile.credit_limit
        : user
          ? user.exposureLimit
          : 0,
      0
    );
    return {
      id: String(row.id || ""),
      user_id: String(row.user_id || ""),
      username: String(row.username || row.login || ""),
      amount: Number(toNumber(row.amount, 0).toFixed(2)),
      utrNumber: String(row.utrNumber || "-"),
      type: String(row.source || "Deposit"),
      totalBalance: Number(totalBalance.toFixed(2)),
      availableBalance: Number(availableBalance.toFixed(2)),
      creditLimit: Number(creditLimit.toFixed(2)),
      winnings: Number(Math.max(0, totalBalance).toFixed(2)),
      exposure: Number(exposure.toFixed(2)),
      remark: String(row.remark || "-"),
      requestTime: String(row.created_at || ""),
      domain: String(row.domain || "CRICKETRAJA")
    };
  });
}

function pendingWithdrawRows(db, ctx) {
  const rows = filterTransactionsByScope(
    db.listAdminTransactions({
      payment_type: "Withdraw",
      status: "Request"
    }),
    ctx,
    false
  );
  return rows.map((row) => {
    const user = db.findUserByUsername(row.login);
    const profile = db.getAdminProfileById(row.user_id);
    const totalBalance = toNumber(user ? user.balance : 0, 0);
    const exposure = exposureDisplay(user ? user.exposure : 0);
    const availableBalance = availableBalanceValue(totalBalance, user ? user.exposure : 0);
    const creditLimit = toNumber(
      profile && typeof profile.credit_limit !== "undefined"
        ? profile.credit_limit
        : user
          ? user.exposureLimit
          : 0,
      0
    );
    const metadata = row && row.metadata && typeof row.metadata === "object" ? row.metadata : {};
    const detailRows = Array.isArray(metadata.withdrawDetail) ? metadata.withdrawDetail : [];
    const detailMap = {};
    for (const detailRow of detailRows) {
      if (!detailRow || typeof detailRow !== "object") continue;
      const key = String(detailRow.label || "").trim().toLowerCase();
      if (!key) continue;
      detailMap[key] = String(detailRow.value || "").trim();
    }
    const accountNumber =
      detailMap["account number"] ||
      detailMap["account no"] ||
      detailMap["a c number"] ||
      "";
    const upiId = detailMap["upi id"] || detailMap["upi"] || "";
    return {
      id: String(row.id || ""),
      user_id: String(row.user_id || ""),
      username: String(row.username || row.login || ""),
      amount: Number(toNumber(row.amount, 0).toFixed(2)),
      status: String(row.status || "Request"),
      type: String(row.source || "Withdraw"),
      totalBalance: Number(totalBalance.toFixed(2)),
      availableBalance: Number(availableBalance.toFixed(2)),
      creditLimit: Number(creditLimit.toFixed(2)),
      winnings: Number(Math.max(0, totalBalance).toFixed(2)),
      exposure: Number(exposure.toFixed(2)),
      accountOrUpi: upiId || accountNumber || "-",
      holderName: detailMap["account holder name"] || "-",
      bankName: detailMap["bank name"] || "-",
      ifsc: detailMap["ifsc code"] || detailMap.ifsc || "-",
      remark: String(row.remark || "-"),
      requestTime: String(row.created_at || ""),
      domain: String(row.domain || "CRICKETRAJA")
    };
  });
}

function statementTable(db, payload = {}, ctx) {
  const userId = pickFirstValue(payload, ["user_id"], "");
  let user = null;
  if (userId) {
    const profile = db.getAdminProfileById(userId);
    if (profile && (!ctx || canAccessProfile(ctx, profile, { includeSelf: true }))) {
      user = db.findUserByUsername(profile.username);
    }
  }
  if (!user && ctx && ctx.actor) {
    user = ctx.actor;
  }
  if (!user) {
    user = primaryUser(db);
  }
  const key = user ? user.username : "";
  const rows = [...(db.state.statements[key] || [])].reverse();
  let html = `
    <table class="table table-bordered" id="example" style="width:100%">
      <thead><tr><th>S. No.</th><th>Date</th><th>Description</th><th>Credit</th><th>Debit</th><th>Balance</th></tr></thead>
      <tbody>
  `;
  if (!rows.length) {
    return `${html}<tr><td colspan="6">No record found!</td></tr></tbody></table>`;
  }
  rows.slice(0, 300).forEach((row, index) => {
    const amount = toNumber(row.amt, 0);
    html += `
      <tr>
        <td>${index + 1}</td>
        <td>${escapeHtml(row.edt || "")}</td>
        <td>${escapeHtml(row.rem || "-")}</td>
        <td>${amount >= 0 ? fmt(amount) : "0.00"}</td>
        <td>${amount < 0 ? fmt(Math.abs(amount)) : "0.00"}</td>
        <td>${fmt(row.amt)}</td>
      </tr>
    `;
  });
  return `${html}</tbody></table>`;
}

function userTypeFromPath(raw = "") {
  return normalizeUserType(raw, "User");
}

function userTypeToPathSegment(type = "User") {
  const normalized = normalizeUserType(type, "User");
  if (normalized === "Hyper Super Master") return "hypersupermaster";
  if (normalized === "Admin") return "admin";
  if (normalized === "Super Master") return "supermaster";
  if (normalized === "Master") return "master";
  return "user";
}

function allowedListingTypes(ctx) {
  if (!ctx || !ctx.actorProfile) {
    return [];
  }
  const actorRole = normalizeUserType(ctx.actorProfile.user_type, "User");
  if (ctx.isOwner) {
    return ["Admin", "Super Master", "Master", "User"];
  }
  if (actorRole === "Admin" || actorRole === "Super Master") {
    return ["Master", "User"];
  }
  if (actorRole === "Master") {
    return ["User"];
  }
  return [];
}

function loadViewInfoTemplate() {
  try {
    return fs.readFileSync(VIEWINFO_TEMPLATE_PATH, "utf8");
  } catch {
    return "";
  }
}

function renderViewInfoPage(template, profile, user) {
  const userId = String(profile.user_id || "");
  const masterId = String(profile.master_id || "330885");
  const displayName = String(profile.user_name || user.displayName || user.username || "");
  const username = String(user.username || profile.username || "");
  const creditLimit = Number(toNumber(profile.credit_limit, user.exposureLimit || 0)).toFixed(2);
  const currentBalance = Number(toNumber(user.balance, 0)).toFixed(2);
  const generalSettings =
    profile && profile.general_settings && typeof profile.general_settings === "object"
      ? profile.general_settings
      : {};
  const marketSettings =
    profile && profile.market_settings && typeof profile.market_settings === "object"
      ? profile.market_settings
      : {};

  if (!template) {
    return `
      <!doctype html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>User View Info</title>
        <style>
          body { font-family: Arial, sans-serif;background: #f5f5f5; padding: 20px; }
          .card { max-width: 720px;background: #fff; border-radius: 8px; padding: 18px; margin: 0 auto; }
          h2 { margin: 0 0 10px; }
          p { margin: 8px 0; }
          a {color: #6B3E1E; }
        </style>
      </head>
      <body>
        <div class="card">
          <h2>User Info</h2>
          <p><strong>User ID:</strong> ${escapeHtml(userId)}</p>
          <p><strong>Username:</strong> ${escapeHtml(username)}</p>
          <p><strong>Name:</strong> ${escapeHtml(displayName)}</p>
          <p><strong>Credit Limit:</strong> ${escapeHtml(creditLimit)}</p>
          <p><a href="${ADMIN_CANONICAL_PREFIX}/admin/users/hypersupermaster">Back to Client Listing</a></p>
        </div>
      </body>
      </html>
    `;
  }

  let html = String(template);
  html = html.replace(/(\/admin\/admin\/viewinfo\/)\d+/gi, `$1${userId}`);
  html = html.replace(/(name="user_id"\s+value=")[^"]*(")/gi, `$1${escapeHtml(userId)}$2`);
  html = html.replace(
    /(id="master_name"[^>]*value=")[^"]*(")/i,
    `$1${escapeHtml(displayName)}$2`
  );
  html = html.replace(
    /(id="FromDate"[^>]*value=")[^"]*(")/i,
    `$1${escapeHtml(displayName)}$2`
  );
  html = html.replace(
    /(name="master_id"\s+id="master_id"\s+value=")[^"]*(")/i,
    `$1${escapeHtml(masterId)}$2`
  );
  html = html.replace(
    /(name="master_id_tmp"\s+id="master_id_tmp"\s+value=")[^"]*(")/i,
    `$1${escapeHtml(masterId)}$2`
  );

  const injected = `
    <script>
      (function () {
        var data = ${JSON.stringify({
          user_id: userId,
          user_name: displayName,
          username,
          master_id: masterId,
          credit_limit: creditLimit,
          current_balance: currentBalance,
          general_settings: generalSettings,
          market_settings: marketSettings
        })};
        function normalizeBool(value) {
          var raw = String(value == null ? '' : value).trim().toLowerCase();
          return raw === '1' || raw === 'yes' || raw === 'true' || raw === 'on';
        }
        function setInput(selector, value) {
          var nodes = document.querySelectorAll(selector);
          nodes.forEach(function (node) { node.value = value; });
        }
        function setCheckbox(selector, checked) {
          var nodes = document.querySelectorAll(selector);
          nodes.forEach(function (node) { node.checked = Boolean(checked); });
        }
        function applyMarketSettings() {
          var map = data.market_settings || {};
          var forms = document.querySelectorAll('form[id$="_setting"]');
          forms.forEach(function (form) {
            var sportNode = form.querySelector('input[name="sport_id"]');
            if (!sportNode) return;
            var sportId = String(sportNode.value || '').trim();
            if (!sportId || !Object.prototype.hasOwnProperty.call(map, sportId)) return;
            var values = map[sportId] || {};
            Object.keys(values).forEach(function (key) {
              var field = form.querySelector('[name="' + key + '"]');
              if (!field) return;
              if (field.type === 'checkbox') {
                field.checked = normalizeBool(values[key]);
                return;
              }
              field.value = values[key];
            });
          });
        }
        function applyGeneralSettings() {
          var settings = data.general_settings || {};
          if (Object.prototype.hasOwnProperty.call(settings, 'is_update_from_gen')) {
            setCheckbox('input[name="user[is_update_from_gen]"]', normalizeBool(settings.is_update_from_gen));
          }
        }
        setInput('input[name="user_id"]', data.user_id);
        setInput('input[name="uid"]', data.user_id);
        setInput('input[name="Name"]', data.user_name);
        setInput('input[name="userId"]', data.user_name);
        setInput('input[name="user_name"]', data.username);
        setInput('input[name="master_id"]', data.master_id);
        setInput('input[name="master_id_tmp"]', data.master_id);
        setInput('input[name="credit_limit"]', data.credit_limit);
        applyGeneralSettings();
        applyMarketSettings();

        var masterName = document.getElementById('master_name');
        if (masterName) masterName.value = data.user_name;
        var fromDate = document.getElementById('FromDate');
        if (fromDate) fromDate.value = data.user_name;
        function formatAmount(value) {
          var num = Number(value);
          if (!Number.isFinite(num)) return '0.00';
          return num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }
        function setCurrentBalance(value) {
          var node = document.getElementById('manage-balance-current');
          if (!node) return;
          node.textContent = 'â‚¹' + formatAmount(value);
        }
        var balanceRefreshTimer = null;
        function refreshCurrentBalance() {
          var body = new URLSearchParams({
            user_id: data.user_id,
            _ts: String(Date.now())
          }).toString();
          fetch('/admin/getUserBalance', {
            method: 'POST',
            cache: 'no-store',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
              'Cache-Control': 'no-cache, no-store, must-revalidate',
              'Pragma': 'no-cache'
            },
            body: body
          })
            .then(function (response) { return response.text(); })
            .then(function (text) {
              var num = Number(String(text || '').replace(/[^\\d.-]/g, ''));
              if (Number.isFinite(num)) {
                data.current_balance = num;
                setCurrentBalance(num);
              }
            })
            .catch(function () {});
        }
        function startCurrentBalancePolling() {
          if (balanceRefreshTimer) return;
          balanceRefreshTimer = window.setInterval(function () {
            refreshCurrentBalance();
          }, 2000);
        }
        function stopCurrentBalancePolling() {
          if (!balanceRefreshTimer) return;
          window.clearInterval(balanceRefreshTimer);
          balanceRefreshTimer = null;
        }
        function notifyBalanceResult(ok, msg) {
          if (typeof window.PNotify === 'function') {
            new PNotify({
              title: ok ? 'Success' : 'Error',
              text: msg || (ok ? 'Balance updated successfully.' : 'Unable to update balance.'),
              type: ok ? 'success' : 'error',
              styling: 'bootstrap3',
              delay: 2200
            });
            return;
          }
          window.alert(msg || (ok ? 'Balance updated successfully.' : 'Unable to update balance.'));
        }
        window.manage_user_balance = function manage_user_balance(type) {
          var amountNode = document.getElementById('manage-balance-amount');
          var rawAmount = String(amountNode && amountNode.value ? amountNode.value : '').trim();
          var cleaned = rawAmount.replace(/,/g, '').replace(/[^\\d.-]/g, '');
          var amount = Number(cleaned);
          if (!Number.isFinite(amount) || amount <= 0) {
            notifyBalanceResult(false, 'Please enter a valid amount.');
            return false;
          }
          var requestedType = String(type || 'S').toUpperCase();
          var opType = requestedType === 'W' ? 'W' : (requestedType === 'D' ? 'D' : 'S');
          fetch('/admin/User/chip_update', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
            body: new URLSearchParams({
              user_id: data.user_id,
              type: opType,
              ChipsValue: String(amount)
            }).toString()
          })
            .then(function (response) { return response.json(); })
            .then(function (parsed) {
              var ok = parsed && parsed.success;
              var msg = (parsed && parsed.message)
                ? parsed.message
                : (ok ? (opType === 'S' ? 'Balance set successfully.' : 'Balance updated successfully.') : 'Unable to update balance.');
              notifyBalanceResult(ok, msg);
              if (ok) {
                if (amountNode) amountNode.value = '';
                refreshCurrentBalance();
              }
            })
            .catch(function () {
              notifyBalanceResult(false, 'Unable to update balance right now.');
            });
          return false;
        };
        function injectManageBalancePanel() {
          if (document.getElementById('manage-balance-panel')) return;
          var form = document.getElementById('update_user');
          if (!form) return;
          var holder = document.createElement('div');
          holder.id = 'manage-balance-panel';
          holder.style.margin = '0 0 14px';
          holder.style.padding = '12px';
          holder.style.background = '#F5E6D3';
          holder.style.border = '1px solid #F5E6D3';
          holder.style.borderRadius = '8px';
          holder.innerHTML =
            '<div style="display:flex;flex-wrap:wrap;align-items:flex-end;gap:10px;">' +
              '<div style="min-width:190px;"><label style="display:block;margin-bottom:4px;font-weight:700;color: #6B3E1E;">Current Balance</label><div id="manage-balance-current" style="font-size:22px;font-weight:700;color: #0e7b31;">â‚¹0.00</div></div>' +
              '<div style="min-width:200px;flex:1;"><label for="manage-balance-amount" style="display:block;margin-bottom:4px;font-weight:700;color: #444;">Amount</label><input id="manage-balance-amount" type="number" min="0" step="0.01" class="form-control" placeholder="Enter amount"></div>' +
              '<div style="display:flex;gap:8px;flex-wrap:wrap;">' +
                '<button type="button" id="manage-balance-add" class="btn btn-success">Set Balance</button>' +
                '<button type="button" id="manage-balance-subtract" class="btn btn-danger">Subtract Balance</button>' +
              '</div>' +
            '</div>' +
            '<div style="margin-top:8px;font-size:12px;color: #666;">Set exact wallet balance or subtract amount directly from this user.</div>';
          form.insertBefore(holder, form.firstChild);
          var addBtn = document.getElementById('manage-balance-add');
          var subBtn = document.getElementById('manage-balance-subtract');
          if (addBtn) addBtn.addEventListener('click', function () { window.manage_user_balance('S'); });
          if (subBtn) subBtn.addEventListener('click', function () { window.manage_user_balance('W'); });
          setCurrentBalance(data.current_balance);
          refreshCurrentBalance();
          startCurrentBalancePolling();
          if (typeof document !== 'undefined' && typeof document.addEventListener === 'function') {
            document.addEventListener('visibilitychange', function () {
              if (document.hidden) {
                stopCurrentBalancePolling();
              } else {
                refreshCurrentBalance();
                startCurrentBalancePolling();
              }
            });
          }
          if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
            window.addEventListener('beforeunload', stopCurrentBalancePolling);
          }
        }
        injectManageBalancePanel();

        window.update_gen_setting = function update_gen_setting() {
          var form = document.getElementById('update_user');
          if (!form) return false;

          var payload = {};
          if (typeof window.jQuery !== 'undefined' && typeof window.jQuery.fn.serializeJSON === 'function') {
            payload = window.jQuery(form).serializeJSON();
          } else {
            var fd = new FormData(form);
            fd.forEach(function (value, key) { payload[key] = value; });
          }

          var generalBox = form.querySelector('input[name="user[is_update_from_gen]"]');
          payload['is_update_from_gen'] = generalBox && generalBox.checked ? '1' : '0';

          if (typeof window.jQuery !== 'undefined') {
            window.jQuery.ajax({
              type: 'post',
              url: '/admin/User/updateviewinfo',
              data: payload,
              cache: false,
              success: function (output) {
                var parsed = output;
                if (typeof output === 'string') {
                  try { parsed = JSON.parse(output); } catch {}
                }
                var ok = parsed && parsed.success;
                var msg = (parsed && parsed.message) ? parsed.message : (ok ? 'Updated successfully.' : 'Unable to update.');
                if (typeof window.PNotify === 'function') {
                  new PNotify({
                    title: ok ? 'Success' : 'Error',
                    text: msg,
                    type: ok ? 'success' : 'error',
                    styling: 'bootstrap3',
                    delay: 2000
                  });
                }
              }
            });
            return false;
          }

          fetch('/admin/User/updateviewinfo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
            body: new URLSearchParams(payload).toString()
          }).catch(function () {});
          return false;
        };
      })();
    </script>
  `;

  if (html.includes("</body>")) {
    html = html.replace("</body>", `${injected}</body>`);
  } else {
    html += injected;
  }
  return html;
}

function usersDatatable(db, payload = {}, { closedOnly = false, type = "User", types = null } = {}, ctx) {
  ensureProfilesForAllUsers(db);
  const panel = db.ensureAdminPanelState();
  const draw = Number(payload.draw || payload.sEcho || 1);
  const start = Number(payload.start || payload.iDisplayStart || 0);
  const length = Number(payload.length || payload.iDisplayLength || 10);
  const search = String(payload["search[value]"] || payload.sSearch || "").toLowerCase();
  const requestedTypes = Array.isArray(types)
    ? [...new Set(types.map((entry) => normalizeUserType(entry, "User")))]
    : [normalizeUserType(type, "User")];
  const parentId = pickFirstValue(
    payload,
    ["parent_id", "upline_id", "master_id_filter", "parent_user_id"],
    ""
  ).trim();
  const parentProfile = parentId ? panel.userProfiles[parentId] || null : null;
  const parentScopeDenied =
    Boolean(parentId) &&
    (!parentProfile || (ctx && !ctx.isOwner && !canAccessProfile(ctx, parentProfile, { includeSelf: true })));
  const allowedIds = ctx && !ctx.isOwner
    ? getAccessibleProfileIdSet(ctx, { includeSelf: false })
    : null;
  const includeLegacySuperMasterRows =
    requestedTypes.length === 1 && requestedTypes[0] === "Super Master";

  const countDirectDownlines = (uplineId, childType) => {
    const upline = String(uplineId || "").trim();
    if (!upline) {
      return 0;
    }
    const expected = normalizeUserType(childType, "User");
    return Object.values(panel.userProfiles || {}).reduce((count, profile) => {
      if (!profile) return count;
      if (String(profile.master_id || "").trim() !== upline) return count;
      const profileType = normalizeUserType(profile.user_type, "User");
      return profileType === expected ? count + 1 : count;
    }, 0);
  };

  const list = Object.values(panel.userProfiles || {})
    .map((profile) => ({ profile, user: db.findUserByUsername(profile.username) }))
    .filter((row) => row.user)
    .filter((row) => {
      if (parentScopeDenied) return false;
      if (parentId && String(row.profile.master_id || "").trim() !== parentId) return false;
      const rowType = normalizeUserType(row.profile.user_type, "User");
      if (!requestedTypes.includes(rowType)) {
        // Backward compatibility for old rows that were stored as Hyper Super Master.
        if (!(includeLegacySuperMasterRows && rowType === "Hyper Super Master" && !isOwnerProfile(row.profile))) {
          return false;
        }
      }
      if (allowedIds && !allowedIds.has(String(row.profile.user_id || ""))) return false;
      const isClosed = row.user.active === false || row.profile.closed;
      if (closedOnly && !isClosed) return false;
      if (!closedOnly && isClosed) return false;
      if (search) {
        const hay = `${row.profile.user_name} ${row.profile.username} ${row.profile.user_id}`.toLowerCase();
        return hay.includes(search);
      }
      return true;
    })
    .sort((a, b) => Number(b.profile.user_id) - Number(a.profile.user_id));

  const paged = list.slice(start, start + Math.max(10, length));
  const aaData = paged.map(({ profile, user }) => {
    const rowType = normalizeUserType(profile.user_type, "User");
    const userId = escapeHtml(profile.user_id);
    const rawUserId = String(profile.user_id || "");
    const masterIdJs = escJs(String(profile.master_id || "330885"));
    const jsName = escJs(profile.user_name || user.displayName || user.username);
    const userNameRaw = profile.user_name || user.username;
    const userNameEscaped = escapeHtml(userNameRaw);
    const canOpenMasters =
      rowType === "Admin" ||
      rowType === "Super Master" ||
      (rowType === "Hyper Super Master" && !isOwnerProfile(profile));
    const canOpenUsers = rowType === "Master";
    const mastersHref = `${ADMIN_CANONICAL_PREFIX}/admin/users/master?parent_id=${encodeURIComponent(rawUserId)}`;
    const usersHref = `${ADMIN_CANONICAL_PREFIX}/admin/users/user?parent_id=${encodeURIComponent(rawUserId)}`;
    let userNameCell = userNameEscaped;
    if (canOpenMasters) {
      const mastersCount = countDirectDownlines(rawUserId, "Master");
      userNameCell = `<a href="${mastersHref}" style="font-weight:600;">${userNameEscaped}</a><div style="font-size:11px;color: #6c757d;">Masters: ${mastersCount}</div>`;
    } else if (canOpenUsers) {
      const usersCount = countDirectDownlines(rawUserId, "User");
      userNameCell = `<a href="${usersHref}" style="font-weight:600;">${userNameEscaped}</a><div style="font-size:11px;color: #6c757d;">Users: ${usersCount}</div>`;
    }
    const drilldownAction = canOpenMasters
      ? `<li><a href="${mastersHref}"><span>View Masters</span></a></li>`
      : canOpenUsers
        ? `<li><a href="${usersHref}"><span>View Users</span></a></li>`
        : "";
    const checkbox = `<div align="left"><input type="checkbox" name="user_id[]" class="user_ids" value="${userId}" style="margin:10px 5px;" /></div>`;
    const created = String(user.createdAt || profile.created_at || "").slice(0, 10);
    const exposureValue = exposureDisplay(user.exposure);
    const availableBalance = availableBalanceValue(user.balance, user.exposure);
    const view = `
      <div align="left"><span class="dropdown">
      <a href="#" style="color:#fff;" class="new-view dropdown-toggle btn btn-xs btn-success" data-toggle="dropdown" role="button">View More <span class="caret"></span></a>
      <ul class="dropdown-menu" style="left:0;">
        ${drilldownAction}
        <li><a target="_blank" href="${ADMIN_CANONICAL_PREFIX}/admin/acStatement?user_id=${rawUserId}"><span>Ac Statement</span></a></li>
        <li><a target="_blank" href="${ADMIN_CANONICAL_PREFIX}/admin/viewinfo/${rawUserId}"><span>View Info</span></a></li>
        <li><a href="javascript:;" onclick="free_chips_in_outs(${userId},'${masterIdJs}','${jsName}','D');"><span>Manage Balance</span></a></li>
        <li><a href="javascript:;" onclick="free_chips_in_outs(${userId},'${masterIdJs}','${jsName}','W');"><span>Manage Balance (Withdraw)</span></a></li>
        <li><a href="javascript:;" onclick="changePasswordModel(${userId},'${jsName}');"><span>Change Password</span></a></li>
      </ul></span></div>
    `;
    if (closedOnly) {
      return [
        checkbox,
        `<div align="left">${escapeHtml(profile.user_name || user.username)}</div>`,
        `<div align="left">0.00</div>`,
        `<div align="left">${fmt(profile.credit_limit || 0)}</div>`,
        `<div align="left"><a href="${ADMIN_CANONICAL_PREFIX}/gameclientbet" target="_blank">${fmt(exposureValue)}</a></div>`,
        `<div align="left">${fmt(user.balance)}</div>`,
        `<div align="left">%</div>`
      ];
    }
      return [
        checkbox,
        view,
        `<div align="left">${userNameCell}</div>`,
        `<div align="left">${fmt(profile.credit_limit || user.exposureLimit || 0)}</div>`,
        `<div align="left"><span style="color:green">0.00</span></div>`,
        `<div align="left">${fmt(user.balance)}</div>`,
        `<div align="left">${fmt(availableBalance)}</div>`,
      `<div align="left"><a href="${ADMIN_CANONICAL_PREFIX}/gameclientbet" target="_blank">${fmt(exposureValue)}</a></div>`,
      `<div align="left">${escapeHtml(created)}</div>`
    ];
  });

  return {
    draw,
    sEcho: draw,
    content: "",
    iTotalRecords: String(list.length),
    iTotalDisplayRecords: String(list.length),
    aaData
  };
}

function resolveTargetProfile(db, payload = {}) {
  const directId = pickFirstValue(payload, ["user_id", "uid", "id", "edit_user_id", "master_user_id_1"], "")
    .trim();
  if (directId) {
    const profile = db.getAdminProfileById(directId);
    if (profile) {
      const user = db.findUserByUsername(profile.username);
      if (user) {
        return { profile, user };
      }
    }
  }

  const loginHint = pickFirstValue(
    payload,
    ["user_name", "username", "login", "Name", "name", "userId", "edit_user_name", "master_user_name"],
    ""
  ).trim();
  if (!loginHint) {
    return { profile: null, user: null };
  }
  let user = db.findUserByUsername(loginHint);
  if (!user) {
    const lowered = String(loginHint).toLowerCase();
    user =
      Object.values(db.state.users || {}).find(
        (row) => String(row.displayName || "").toLowerCase() === lowered
      ) || null;
  }
  if (!user) {
    return { profile: null, user: null };
  }
  const profile = db.ensureAdminUserProfile(user.username, "User");
  return { profile, user };
}

function canCreateDownlineRole(ctx, requestedRole) {
  const nextRole = normalizeUserType(requestedRole, "User");
  if (!ctx || !ctx.actorProfile) {
    return false;
  }
  const actorRole = normalizeUserType(ctx.actorProfile.user_type, "User");
  if (ctx.isOwner) {
    return (
      nextRole === "Admin" ||
      nextRole === "Super Master" ||
      nextRole === "Master" ||
      nextRole === "User"
    );
  }
  if (actorRole === "Admin" || actorRole === "Super Master") {
    return nextRole === "Master" || nextRole === "User";
  }
  if (actorRole === "Master") {
    return nextRole === "User";
  }
  return false;
}

function defaultDownlineRole(ctx) {
  if (!ctx || !ctx.actorProfile) {
    return null;
  }
  if (ctx.isOwner) {
    return "Admin";
  }
  const actorRole = normalizeUserType(ctx.actorProfile.user_type, "User");
  if (actorRole === "Admin" || actorRole === "Super Master") {
    return "Master";
  }
  if (actorRole === "Master") {
    return "User";
  }
  return null;
}

function hasTopAuthority(ctx) {
  return Boolean(ctx && ctx.isOwner);
}

function hasPaymentAuthority(ctx) {
  if (!ctx || !ctx.actorProfile) {
    return false;
  }
  if (ctx.isOwner) {
    return true;
  }
  return roleLevel(ctx.actorProfile.user_type) >= ROLE_LEVELS.Admin;
}

function resolveParentProfileForCreate(db, ctx, payload = {}) {
  const fallback = ctx.actorProfile;
  const parentId = pickFirstValue(payload, ["master_id_tmp", "master_id"], "").trim();
  const parent = parentId ? db.getAdminProfileById(parentId) : null;
  if (!parent) {
    return fallback;
  }
  if (ctx.isOwner) {
    return parent;
  }
  if (canAccessProfile(ctx, parent, { includeSelf: true })) {
    return parent;
  }
  return fallback;
}

function canOperateTransaction(db, ctx, transactionId) {
  if (!hasPaymentAuthority(ctx)) {
    return { ok: false, message: "Only authorized admin can process payment requests." };
  }
  const row = db.findAdminTransactionById(transactionId);
  if (!row) {
    return { ok: false, message: "Request not found." };
  }
  return { ok: true, row };
}

function canManagePaymentSettings(ctx) {
  return hasPaymentAuthority(ctx);
}

function buildPaymentMethodRows(db) {
  const settings = db.getPaymentSettings();
  const deposit = settings && settings.deposit && typeof settings.deposit === "object"
    ? settings.deposit
    : {};
  const rows = [];

  const upiId = String(deposit.upiId || "").trim();
  const upiHolderName = String(deposit.upiHolderName || "").trim();
  if (upiId) {
    rows.push({
      type: "UPI",
      vendor: "UPI",
      account: upiId,
      holder: upiHolderName || "-",
      ifsc: "-",
      status: "Active"
    });
  }

  const bank = deposit.bank && typeof deposit.bank === "object" ? deposit.bank : {};
  const bankAccount = String(bank.accountNumber || "").trim();
  const bankHolder = String(bank.accountHolderName || "").trim();
  const bankName = String(bank.bankName || "").trim();
  const bankIfsc = String(bank.ifscCode || "").trim();
  if (bankAccount || bankHolder || bankName || bankIfsc) {
    rows.push({
      type: "Bank",
      vendor: bankName || "Bank",
      account: bankAccount || "-",
      holder: bankHolder || "-",
      ifsc: bankIfsc || "-",
      status: "Active"
    });
  }

  const qrImage = String(deposit.qrImage || "").trim();
  if (qrImage) {
    rows.push({
      type: "QRCODE",
      vendor: "QR",
      account: qrImage.startsWith("data:image/") ? "Uploaded QR Image" : qrImage,
      holder: "-",
      ifsc: "-",
      status: "Active"
    });
  }

  return rows;
}

function sendJsonText(res, payload) {
  sendText(res, 200, JSON.stringify(payload), "text/plain; charset=utf-8");
}

async function handleAdminRequest(req, res, urlObj, services) {
  const route = normalizeRoute(urlObj.pathname);
  if (route === null) {
    return false;
  }

  const { db } = services;
  db.ensureAdminPanelState();
  const payload = await parseRequestPayload(req, urlObj);
  const ctx = getActorContext(req, db);

  const hostingResponse = await handleHostingApiRoute({
    route,
    method: req.method,
    payload,
    ctx
  });
  if (hostingResponse) {
    if (hostingResponse.redirect) {
      sendText(res, hostingResponse.status || 302, "", "text/plain; charset=utf-8", {
        Location: hostingResponse.redirect
      });
      return true;
    }
    sendJson(res, hostingResponse.status || 200, hostingResponse.body || {});
    return true;
  }

  if (OWNER_ONLY_PAYMENT_ROUTES.has(route) && !canManagePaymentSettings(ctx)) {
    sendText(res, 302, "", "text/plain; charset=utf-8", {
      Location: `${ADMIN_CANONICAL_PREFIX}/dashboard`
    });
    return true;
  }
  if (OWNER_ONLY_SECTION_ROUTES.has(route) && !ctx.isOwner) {
    sendText(res, 302, "", "text/plain; charset=utf-8", {
      Location: `${ADMIN_CANONICAL_PREFIX}/dashboard`
    });
    return true;
  }

  if (route === "/login" && req.method === "POST") {
    const loginUsername = pickFirstValue(
      payload,
      ["login_username", "username", "user_name", "login", "userId", "userid"],
      ""
    )
      .trim()
      .toLowerCase();
    const loginPassword = pickFirstValue(payload, ["login_password", "password", "pass"], "");
    const authUser = db.findUserByLoginHint(loginUsername);
    if (authUser && authUser.active !== false && String(authUser.password || "") === String(loginPassword || "")) {
      const profile = db.ensureAdminUserProfile(authUser.username, "User");
      if (!profile || profile.closed) {
        sendJson(res, 200, { success: false, message: "Account is locked." });
        return true;
      }
      const sessionToken = db.createSession(authUser.username);
      sendJson(
        res,
        200,
        { success: true, message: "Login successful." },
        { "Set-Cookie": buildSessionCookie(sessionToken) }
      );
      return true;
    }

    if (loginUsername === ADMIN_LOGIN_USERNAME && String(loginPassword || "") === ADMIN_LOGIN_PASSWORD) {
      const owner = primaryUser(db);
      const sessionToken = db.createSession(owner.username);
      sendJson(
        res,
        200,
        { success: true, message: "Login successful." },
        { "Set-Cookie": buildSessionCookie(sessionToken) }
      );
      return true;
    }

    sendJson(res, 200, { success: false, message: "Invalid login credentials." });
    return true;
  }

  if (route === "/login/Admin/get_register_Data") {
    const listingTypes = allowedListingTypes(ctx);
    sendJson(res, 200, {
      user_list: {
        is_demo: isAdminAuthenticated(req, db) ? "No" : "Yes",
        username: ctx.actor ? ctx.actor.username : "",
        display_name: ctx.actor ? String(ctx.actor.displayName || ctx.actor.username || "") : "",
        balance: ctx.actor ? Number(toNumber(ctx.actor.balance, 0).toFixed(2)) : 0,
        user_type: ctx.actorProfile ? normalizeUserType(ctx.actorProfile.user_type, "User") : "User",
        user_id: ctx.actorProfile ? String(ctx.actorProfile.user_id || "") : "",
        is_owner: Boolean(ctx.isOwner),
        allowed_listing_types: listingTypes,
        default_downline_role: defaultDownlineRole(ctx) || ""
      }
    });
    return true;
  }
  if (route === "/login/Admin/check_user_login") {
    sendJson(res, 200, !isAdminAuthenticated(req, db));
    return true;
  }
  if (route === "/logout") {
    const token = getAdminSessionToken(req);
    if (token) {
      db.logout(token);
    }
    sendText(res, 302, "", "text/plain; charset=utf-8", {
      Location: `${ADMIN_CANONICAL_PREFIX}`,
      "Set-Cookie": clearSessionCookie()
    });
    return true;
  }
  if (route === "/withdrawuser" || route === "/withdraw-requests") {
    if (!canManagePaymentSettings(ctx)) {
      sendText(res, 302, "", "text/plain; charset=utf-8", {
        Location: `${ADMIN_CANONICAL_PREFIX}/dashboard`
      });
      return true;
    }
    sendText(res, 302, "", "text/plain; charset=utf-8", {
      Location: `${ADMIN_CANONICAL_PREFIX}/all-withdraw-requests`
    });
    return true;
  }
  if (route === "/deposituser" || route === "/deposit-requests") {
    if (!canManagePaymentSettings(ctx)) {
      sendText(res, 302, "", "text/plain; charset=utf-8", {
        Location: `${ADMIN_CANONICAL_PREFIX}/dashboard`
      });
      return true;
    }
    sendText(res, 302, "", "text/plain; charset=utf-8", {
      Location: `${ADMIN_CANONICAL_PREFIX}/all-deposit-requests`
    });
    return true;
  }
  if (route === "/all-utr-numbers-list") {
    if (!canManagePaymentSettings(ctx)) {
      sendText(res, 302, "", "text/plain; charset=utf-8", {
        Location: `${ADMIN_CANONICAL_PREFIX}/dashboard`
      });
      return true;
    }
    sendText(res, 302, "", "text/plain; charset=utf-8", {
      Location: `${ADMIN_CANONICAL_PREFIX}/utr-numbers-list`
    });
    return true;
  }
  if (route === "/homepage/admin") {
    sendText(res, 302, "", "text/plain; charset=utf-8", {
      Location: `${ADMIN_CANONICAL_PREFIX}/dashboard`
    });
    return true;
  }
  if (route === "/admin/manual/event-types") {
    sendText(res, 302, "", "text/plain; charset=utf-8", {
      Location: `${ADMIN_CANONICAL_PREFIX}/admin/manual/new-event`
    });
    return true;
  }

  if (route === "/payment-methods-data") {
    if (!canManagePaymentSettings(ctx)) {
      sendJson(res, 200, { success: false, message: "Only authorized admin can access payment setup." });
      return true;
    }
    sendJson(res, 200, {
      success: true,
      settings: db.getPaymentSettings(),
      data: buildPaymentMethodRows(db)
    });
    return true;
  }

  if (route === "/payment-settings") {
    if (!canManagePaymentSettings(ctx)) {
      sendJson(res, 200, { success: false, message: "Only authorized admin can manage payment setup." });
      return true;
    }
    if (req.method === "POST" || req.method === "PUT" || req.method === "PATCH") {
      const result = db.updatePaymentSettings(payload);
      sendJson(res, 200, result);
      return true;
    }
    sendJson(res, 200, { success: true, data: db.getPaymentSettings() });
    return true;
  }

  if (route === "/add-payment-method" && req.method === "POST") {
    if (!canManagePaymentSettings(ctx)) {
      sendText(res, 302, "", "text/plain; charset=utf-8", {
        Location: `${ADMIN_CANONICAL_PREFIX}/payment-methods`
      });
      return true;
    }

    const current = db.getPaymentSettings();
    const next = {
      deposit: {
        ...(current && current.deposit && typeof current.deposit === "object" ? current.deposit : {})
      }
    };
    const type = String(pickFirstValue(payload, ["type"], "")).trim().toUpperCase();
    const qrImageValue = String(
      pickFirstValue(
        payload,
        ["qr_image_data", "qrImageData", "qrImage", "qr_image_url", "qr_url", "qrcode_url"],
        ""
      )
    ).trim();
    if (qrImageValue) {
      next.deposit.qrImage = qrImageValue;
    }

    if (type === "BANK") {
      const bankName = String(pickFirstValue(payload, ["bank_name"], "")).trim();
      const accountHolderName = String(pickFirstValue(payload, ["account_holder_name"], "")).trim();
      const accountNumber = String(pickFirstValue(payload, ["account_number"], ""))
        .replace(/\s+/g, "")
        .trim();
      const ifscCode = String(pickFirstValue(payload, ["ifsc"], ""))
        .replace(/\s+/g, "")
        .trim()
        .toUpperCase();
      next.deposit.bank = {
        bankName,
        accountHolderName,
        accountNumber,
        ifscCode
      };
    } else if (type === "QRCODE") {
      // QR is already handled from qr_image_data / qrImage fields above.
    } else if (type) {
      const upiId = String(
        pickFirstValue(payload, ["other_account_no", "account_number", "upiId", "upi_id"], "")
      )
        .replace(/\s+/g, "")
        .trim();
      const upiHolderName = String(
        pickFirstValue(
          payload,
          ["other_account_holder_name", "upi_holder_name", "upiHolderName", "account_holder_name"],
          ""
        )
      ).trim();
      if (upiId) {
        next.deposit.upiId = upiId;
      }
      if (upiHolderName) {
        next.deposit.upiHolderName = upiHolderName;
      }
    }

    db.updatePaymentSettings(next);
    sendText(res, 302, "", "text/plain; charset=utf-8", {
      Location: `${ADMIN_CANONICAL_PREFIX}/payment-methods`
    });
    return true;
  }

  const usersPageMatch = route.match(/^\/admin\/users\/([^/]+)$/i);
  if (usersPageMatch) {
    const requestedType = userTypeFromPath(decodeURIComponent(usersPageMatch[1] || ""));
    const allowedTypes = allowedListingTypes(ctx);
    if (!allowedTypes.length) {
      sendText(res, 302, "", "text/plain; charset=utf-8", {
        Location: `${ADMIN_CANONICAL_PREFIX}/dashboard`
      });
      return true;
    }
    if (!allowedTypes.includes(requestedType)) {
      sendText(res, 302, "", "text/plain; charset=utf-8", {
        Location: `${ADMIN_CANONICAL_PREFIX}/admin/users/${userTypeToPathSegment(allowedTypes[0])}`
      });
      return true;
    }
  }

  const closedUsersPageMatch = route.match(/^\/admin\/closedusers\/([^/]+)$/i);
  if (closedUsersPageMatch) {
    const requestedType = userTypeFromPath(decodeURIComponent(closedUsersPageMatch[1] || ""));
    const allowedTypes = allowedListingTypes(ctx);
    if (!allowedTypes.length) {
      sendText(res, 302, "", "text/plain; charset=utf-8", {
        Location: `${ADMIN_CANONICAL_PREFIX}/dashboard`
      });
      return true;
    }
    if (!allowedTypes.includes(requestedType)) {
      sendText(res, 302, "", "text/plain; charset=utf-8", {
        Location: `${ADMIN_CANONICAL_PREFIX}/admin/closedusers/${userTypeToPathSegment(allowedTypes[0])}`
      });
      return true;
    }
  }

  const viewInfoMatch = route.match(/^\/admin\/viewinfo\/([^/]+)$/i);
  if (viewInfoMatch) {
    const targetId = decodeURIComponent(viewInfoMatch[1] || "").trim();
    ensureProfilesForAllUsers(db);
    const profile = db.getAdminProfileById(targetId);
    const user = profile ? db.findUserByUsername(profile.username) : null;
    if (profile && !canAccessProfile(ctx, profile, { includeSelf: true })) {
      sendText(
        res,
        403,
        "<html><body style='font-family:Arial;padding:20px;'><h3>403</h3><p>You are not allowed to view this user.</p></body></html>",
        "text/html; charset=utf-8"
      );
      return true;
    }
    if (!profile || !user) {
      sendText(
        res,
        404,
        "<html><body style='font-family:Arial;padding:20px;'><h3>User not found</h3><p>The selected user profile does not exist.</p></body></html>",
        "text/html; charset=utf-8"
      );
      return true;
    }
    const template = loadViewInfoTemplate();
    const html = renderViewInfoPage(template, profile, user);
    sendText(res, 200, html, "text/html; charset=utf-8");
    return true;
  }

  if (
    route === "/gameclientbet" ||
    route === "/profitloss" ||
    route === "/bethistory" ||
    route === "/transaction-history-admin" ||
    route === "/income-report" ||
    route === "/clientpl" ||
    route === "/sportspl" ||
    route === "/new_chipsummary"
  ) {
    sendText(
      res,
      200,
      "<html><body style='font-family:Arial;padding:20px;'><h3>Section Coming Soon</h3><p>This section is available in live admin and is not part of the saved static bundle.</p></body></html>",
      "text/html; charset=utf-8"
    );
    return true;
  }

  if (route === "/admin/dashboard/getDashboardData") {
    const data = buildDashboardData(db, ctx);
    sendJson(res, 200, {
      credit_limit: data.credit_limit,
      winnings: data.winnings,
      total_balance: data.total_balance,
      balance: data.balance,
      downline_balance: data.downline_balance
    });
    return true;
  }
  if (route === "/admin/dashboard/getDateWiseTransactionSummary") {
    sendJson(res, 200, summarizeTransactions(db, payload, ctx));
    return true;
  }
  if (route === "/admin/dashboard/getDownlineBalance") {
    sendJson(res, 200, { downline_balance: buildDashboardData(db, ctx).downline_balance });
    return true;
  }

  if (route === "/admin/Transactions/get_direct_all_transaction_history_admins") {
    sendText(res, 200, txHistoryHtml(db, payload, ctx), "text/html; charset=utf-8");
    return true;
  }

  if (route === "/deposit/live-requests") {
    if (!canManagePaymentSettings(ctx)) {
      sendJson(res, 403, { success: false, message: "Only authorized admin can access deposit requests." });
      return true;
    }
    sendJson(res, 200, {
      success: true,
      data: pendingDepositRows(db, ctx)
    });
    return true;
  }

  if (route === "/withdraw/live-requests") {
    if (!canManagePaymentSettings(ctx)) {
      sendJson(res, 403, { success: false, message: "Only authorized admin can access withdraw requests." });
      return true;
    }
    sendJson(res, 200, {
      success: true,
      data: pendingWithdrawRows(db, ctx)
    });
    return true;
  }

  const depConfirm = route.match(/^\/confirm-deposit-ajax\/([^/]+)\/([^/]+)\/([^/]+)$/i);
  if (depConfirm) {
    const access = canOperateTransaction(db, ctx, depConfirm[1]);
    if (!access.ok) {
      sendJson(res, 200, { status: false, message: access.message });
      return true;
    }
    const result = db.approveDepositTransaction(depConfirm[1]);
    sendJson(res, 200, { status: Boolean(result.success), message: result.message });
    return true;
  }

  const depStatus = route.match(/^\/change-deposit-request-status-ajax\/([^/]+)\/([^/]+)(?:\/(.*))?$/i);
  if (depStatus) {
    const access = canOperateTransaction(db, ctx, depStatus[2]);
    if (!access.ok) {
      sendJson(res, 200, { status: false, message: access.message });
      return true;
    }
    const status = normalizeStatus(depStatus[1]);
    const id = depStatus[2];
    const remarks = decodeURIComponent(depStatus[3] || "").replace(/-/g, " ");
    const result =
      status === "Confirm"
        ? db.approveDepositTransaction(id)
        : db.rejectTransaction(id, remarks);
    sendJson(res, 200, { status: Boolean(result.success), message: result.message });
    return true;
  }

  const wdProcess = route.match(/^\/process-withdraw-request-status-ajax\/process\/([^/]+)$/i);
  if (wdProcess) {
    const access = canOperateTransaction(db, ctx, wdProcess[1]);
    if (!access.ok) {
      sendJson(res, 200, { status: false, message: access.message });
      return true;
    }
    const result = db.processWithdrawTransaction(wdProcess[1]);
    sendJson(res, 200, { status: Boolean(result.success), message: result.message });
    return true;
  }

  const wdStatus = route.match(/^\/change-withdraw-request-status-ajax\/([^/]+)\/([^/]+)(?:\/(.*))?$/i);
  if (wdStatus) {
    const access = canOperateTransaction(db, ctx, wdStatus[2]);
    if (!access.ok) {
      sendJson(res, 200, { status: false, message: access.message });
      return true;
    }
    const status = normalizeStatus(wdStatus[1]);
    const id = wdStatus[2];
    const remarks = decodeURIComponent(wdStatus[3] || "").replace(/-/g, " ");
    let result;
    if (status === "Confirm") result = db.approveWithdrawTransaction(id, remarks || "Done");
    else if (status === "Process") result = db.processWithdrawTransaction(id);
    else result = db.rejectTransaction(id, remarks);
    sendJson(res, 200, { status: Boolean(result.success), message: result.message });
    return true;
  }

  if (route === "/add-utr-numbers") {
    if (!hasTopAuthority(ctx)) {
      sendJson(res, 200, { success: false, message: "Access denied." });
      return true;
    }
    const created = db.addAdminUtrs(payload.utrs, payload.type, payload.amount);
    sendJson(res, 200, {
      success: created.length > 0,
      message: created.length ? `${created.length} UTR number(s) added successfully.` : "No new UTR numbers were added."
    });
    return true;
  }
  if (route === "/update-utr-status") {
    if (!hasTopAuthority(ctx)) {
      sendJson(res, 200, { success: false, message: "Access denied." });
      return true;
    }
    sendJson(res, 200, db.updateAdminUtrStatus(payload.id, payload.status));
    return true;
  }

  if (route === "/admin/User/free_chip_in_out") {
    const targetProfile = db.getAdminProfileById(payload.user_id);
    const user = targetProfile ? db.findUserByUsername(targetProfile.username) : null;
    if (!targetProfile || !user || !canAccessProfile(ctx, targetProfile, { includeSelf: false })) {
      sendJson(res, 200, { admin_chip: 0, user_chip: 0, message: "Access denied." });
      return true;
    }
    const admin = ctx.actor || primaryUser(db);
    sendJson(res, 200, {
      admin_chip: Number(toNumber(admin.balance, 0).toFixed(2)),
      user_chip: Number(toNumber(user.balance, 0).toFixed(2))
    });
    return true;
  }

  if (route === "/admin/User/chip_update" || route === "/User/chip_update") {
    const type = String(payload.type || "D").toUpperCase();
    const amount = Number(toNumber(payload.ChipsValue || 0, 0));
    const targetProfile = db.getAdminProfileById(payload.user_id);
    const user = targetProfile ? db.findUserByUsername(targetProfile.username) : null;
    const admin = ctx.actor || primaryUser(db);
    const isUnlimitedAdmin = Boolean(ctx && ctx.isOwner);
    if (!targetProfile || !user || !canAccessProfile(ctx, targetProfile, { includeSelf: false })) {
      sendJson(res, 200, { success: false, message: "Access denied." });
      return true;
    }
    if (!user || amount <= 0) {
      sendJson(res, 200, { success: false, message: "Invalid chip request." });
      return true;
    }
    if (type === "D") {
      if (!isUnlimitedAdmin && amount > toNumber(admin.balance, 0)) {
        sendJson(res, 200, { success: false, message: "Insufficient admin balance." });
        return true;
      }
      if (!isUnlimitedAdmin) {
        admin.balance = Number((toNumber(admin.balance, 0) - amount).toFixed(2));
      }
      user.balance = Number((toNumber(user.balance, 0) + amount).toFixed(2));
    } else if (type === "S") {
      const current = Number(toNumber(user.balance, 0));
      const delta = Number((amount - current).toFixed(2));
      if (delta > 0) {
        if (!isUnlimitedAdmin && delta > toNumber(admin.balance, 0)) {
          sendJson(res, 200, { success: false, message: "Insufficient admin balance." });
          return true;
        }
        if (!isUnlimitedAdmin) {
          admin.balance = Number((toNumber(admin.balance, 0) - delta).toFixed(2));
        }
      } else if (delta < 0) {
        if (!isUnlimitedAdmin) {
          admin.balance = Number((toNumber(admin.balance, 0) + Math.abs(delta)).toFixed(2));
        }
      }
      user.balance = Number(amount.toFixed(2));
    } else {
      if (amount > toNumber(user.balance, 0)) {
        sendJson(res, 200, { success: false, message: "Insufficient user balance." });
        return true;
      }
      if (!isUnlimitedAdmin) {
        admin.balance = Number((toNumber(admin.balance, 0) + amount).toFixed(2));
      }
      user.balance = Number((toNumber(user.balance, 0) - amount).toFixed(2));
    }
    db.save();
    sendJson(res, 200, { success: true, message: "Chip updated successfully." });
    return true;
  }

  if (route === "/admin/User/add_balance") {
    if (!hasTopAuthority(ctx)) {
      sendJson(res, 200, { success: false, error: "Access denied." });
      return true;
    }
    const admin = ctx.actor || primaryUser(db);
    const amount = Number(toNumber(payload.amount, 0));
    if (amount <= 0) {
      sendJson(res, 200, { success: false, error: "Invalid amount." });
      return true;
    }
    admin.balance = Number((toNumber(admin.balance, 0) + amount).toFixed(2));
    db.save();
    sendJson(res, 200, { success: true, message: "Balance added successfully." });
    return true;
  }

  if (route === "/getUserBalance") {
    const targetProfile = db.getAdminProfileById(payload.user_id);
    const user = targetProfile ? db.findUserByUsername(targetProfile.username) : null;
    if (!targetProfile || !user || !canAccessProfile(ctx, targetProfile, { includeSelf: true })) {
      sendText(res, 200, "0");
      return true;
    }
    sendText(res, 200, String(Number(toNumber(user.balance, 0).toFixed(2))));
    return true;
  }

  if (route === "/admin/User/get_user") {
    const profile = db.getAdminProfileById(payload.user_id);
    const user = profile ? db.findUserByUsername(profile.username) : null;
    if (!profile || !user || !canAccessProfile(ctx, profile, { includeSelf: true })) {
      sendJson(res, 200, {});
      return true;
    }
    sendJson(res, 200, user ? {
      user_id: profile.user_id,
      user_name: profile.user_name,
      partnership: 0,
      master_commision: 0,
      sessional_commision: 0
    } : {});
    return true;
  }

  if (route === "/admin/User/set_action") {
    const users = Array.isArray(payload.users) ? payload.users : [payload.users];
    const action = String(payload.useraction || "").trim().toLowerCase();
    for (const id of users.filter(Boolean)) {
      const profile = db.getAdminProfileById(id);
      const user = profile ? db.findUserByUsername(profile.username) : null;
      if (!profile || !user) continue;
      if (!canAccessProfile(ctx, profile, { includeSelf: false })) continue;
      if (action === "lock_betting") profile.lock_betting = true;
      if (action === "open_betting") profile.lock_betting = false;
      if (action === "lock_user") user.active = false;
      if (action === "unlock_user") {
        user.active = true;
        profile.closed = false;
      }
      if (action === "close_user") {
        user.active = false;
        profile.closed = true;
      }
    }
    db.save();
    sendJson(res, 200, { success: true, message: "Action applied successfully." });
    return true;
  }

  if (route === "/admin/User/register_username_exists") {
    const login = pickFirstValue(payload, ["login", "user_name", "username"], "");
    sendJson(res, 200, db.checkUsername(login));
    return true;
  }

  if (route === "/admin/User/adduser") {
    const username = pickFirstValue(payload, ["user_name", "username", "name"], "");
    const fallbackType = defaultDownlineRole(ctx);
    let requestedType = normalizeUserType(
      pickFirstValue(payload, ["user_type", "type", "role"], fallbackType || ""),
      fallbackType || "User"
    );
    // Old owner listing pages still post "Hyper Super Master"; map it to downline Super Master.
    if (ctx.isOwner && requestedType === "Hyper Super Master") {
      requestedType = "Super Master";
    }
    if (!requestedType || !canCreateDownlineRole(ctx, requestedType)) {
      sendJson(res, 200, { success: false, errorMessage: "You cannot create this role." });
      return true;
    }
    if (!username) {
      sendJson(res, 200, { success: false, errorMessage: "Username is required." });
      return true;
    }
    if (!db.checkUsername(username)) {
      sendJson(res, 200, { success: false, errorMessage: "User already exists." });
      return true;
    }
    const openingBalanceRaw = pickFirstValue(
      payload,
      [
        "deposite_bal",
        "deposit_bal",
        "opening_balance",
        "open_balance",
        "starting_balance",
        "wallet_balance",
        "available_balance",
        "credit_limit",
        "chips",
        "chip",
        "chip_balance",
        "admin_chip_val",
        "user_chip_val",
        "balance",
        "amount"
      ],
      "0"
    );
    const startingBalance = Number(
      toNumber(String(openingBalanceRaw || "").replace(/[^\d.-]/g, ""), 0)
    );
    const user = db.createUser({
      username,
      password: pickFirstValue(
        payload,
        ["password", "login_password", "master_password", "edit_password"],
        "123456"
      ),
      displayName: pickFirstValue(payload, ["name", "user_name"], username),
      startingBalance
    });
    if (user && Number.isFinite(startingBalance) && startingBalance >= 0) {
      const normalizedBalance = Number(startingBalance.toFixed(2));
      if (Math.abs(toNumber(user.balance, 0) - normalizedBalance) > 0.0001) {
        user.balance = normalizedBalance;
        db.addStatement(user.username, {
          amount: normalizedBalance,
          remark: "Opening balance from admin panel",
          dserver: "a"
        });
      }
    }
    let parentProfile = ctx.isOwner
      ? resolveParentProfileForCreate(db, ctx, payload)
      : ctx.actorProfile;
    if (!parentProfile || roleLevel(parentProfile.user_type) <= roleLevel(requestedType)) {
      parentProfile = ctx.actorProfile || parentProfile;
    }
    const profile = db.ensureAdminUserProfile(user.username, requestedType);
    profile.user_type = requestedType;
    profile.master_id = String((parentProfile && parentProfile.user_id) || "0");
    profile.closed = false;
    user.active = true;
    db.save();
    sendJson(res, 200, { success: true, message: "User created successfully." });
    return true;
  }

  if (route === "/admin/User/updateuser") {
    sendJson(res, 200, { success: true, message: "User updated successfully." });
    return true;
  }

  if (route === "/admin/User/changePassword" || route === "/admin/User/changeMasterPassword") {
    const { profile, user } = resolveTargetProfile(db, payload);
    if (!profile || !user || !canAccessProfile(ctx, profile, { includeSelf: true })) {
      sendJson(res, 200, { success: false, message: "User not found." });
      return true;
    }
    user.password = String(payload.password || "");
    db.save();
    sendJson(res, 200, { success: true, message: "Password changed successfully." });
    return true;
  }

  if (route === "/admin/User/themeUpdate") {
    if (!hasTopAuthority(ctx)) {
      sendJson(res, 200, { success: false, message: "Access denied." });
      return true;
    }
    const panel = db.ensureAdminPanelState();
    panel.themeId = Number(toNumber(payload.theme_id, 1));
    db.save();
    sendJson(res, 200, { success: true, message: "Theme updated successfully." });
    return true;
  }

  if (route === "/admin/User/updateviewinfo" || route === "/User/updateviewinfo") {
    const idFromPayload = pickFirstValue(payload, ["user_id", "uid", "id"], "").trim();
    let profile = idFromPayload ? db.getAdminProfileById(idFromPayload) : null;
    let user = profile ? db.findUserByUsername(profile.username) : null;

    if (!profile || !user) {
      const nameHint = pickFirstValue(
        payload,
        ["user_name", "username", "Name", "name", "userId"],
        ""
      ).trim();
      if (nameHint) {
        const direct = db.findUserByUsername(nameHint);
        if (direct) {
          user = direct;
        } else {
          const lowered = nameHint.toLowerCase();
          user =
            Object.values(db.state.users || {}).find(
              (row) => String(row.displayName || "").toLowerCase() === lowered
            ) || null;
        }
        if (user) {
          profile = db.ensureAdminUserProfile(user.username, "User");
        }
      }
    }

    if (!profile || !user) {
      sendJsonText(res, { success: false, message: "User profile not found." });
      return true;
    }
    if (!canAccessProfile(ctx, profile, { includeSelf: true })) {
      sendJsonText(res, { success: false, message: "Access denied." });
      return true;
    }

    const parseToggle = (value, fallback = false) => {
      if (value === null || value === undefined) {
        return fallback;
      }
      const raw = String(value).trim().toLowerCase();
      if (!raw) {
        return fallback;
      }
      return raw === "1" || raw === "yes" || raw === "true" || raw === "on" || raw === "y";
    };

    const updatedName = pickFirstValue(payload, ["Name", "name"], "").trim();
    const updatedLogin = pickFirstValue(payload, ["user_name", "username"], "").trim();
    const creditLimitRaw = pickFirstValue(
      payload,
      ["credit_limit", "credit_limits", "exposure_limit", "max_credit"],
      ""
    );
    const isLockedBet = pickFirstValue(payload, ["lock_bet"], "");
    const fancyActive = pickFirstValue(payload, ["is_fancy_active"], "");
    const oddsActive = pickFirstValue(payload, ["is_odds_active"], "");
    const bookActive = pickFirstValue(payload, ["is_bookmaker_active"], "");

    if (updatedName) {
      user.displayName = updatedName;
      profile.user_name = updatedName;
    }
    if (updatedLogin && updatedLogin !== user.username && db.checkUsername(updatedLogin)) {
      const oldUsername = user.username;
      user.username = updatedLogin;
      profile.username = updatedLogin.toLowerCase();
      db.state.users[updatedLogin] = user;
      delete db.state.users[oldUsername];
      if (db.state.bets && db.state.bets[oldUsername]) {
        db.state.bets[updatedLogin] = db.state.bets[oldUsername];
        delete db.state.bets[oldUsername];
      }
      if (db.state.statements && db.state.statements[oldUsername]) {
        db.state.statements[updatedLogin] = db.state.statements[oldUsername];
        delete db.state.statements[oldUsername];
      }
      const panel = db.ensureAdminPanelState();
      if (panel.usernameToId) {
        delete panel.usernameToId[String(oldUsername).toLowerCase()];
        panel.usernameToId[String(updatedLogin).toLowerCase()] = String(profile.user_id);
      }
    }
    if (String(creditLimitRaw).trim() !== "") {
      const creditLimit = Number(toNumber(creditLimitRaw, profile.credit_limit || 0));
      profile.credit_limit = creditLimit;
      user.exposureLimit = creditLimit;
    }
    if (String(isLockedBet).trim() !== "") {
      profile.lock_betting = parseToggle(isLockedBet, false);
    }

    const generalUpdateRaw =
      Object.prototype.hasOwnProperty.call(payload, "is_update_from_gen")
        ? payload.is_update_from_gen
        : payload["user[is_update_from_gen]"];
    if (generalUpdateRaw !== undefined) {
      profile.general_settings = {
        ...(profile.general_settings && typeof profile.general_settings === "object"
          ? profile.general_settings
          : {}),
        is_update_from_gen: parseToggle(generalUpdateRaw, false),
        updated_at: new Date().toISOString()
      };
    }

    const sportId = pickFirstValue(payload, ["sport_id"], "").trim();
    if (sportId) {
      const scalarKeys = [
        "setting_id",
        "info_id",
        "min_stake",
        "max_stake",
        "max_profit",
        "max_loss",
        "bet_delay",
        "pre_inplay_profit",
        "pre_inplay_stake",
        "min_odds",
        "max_odds"
      ];
      const boolKeys = [
        "unmatch_bet",
        "lock_bet",
        "is_odds_active",
        "is_fancy_active",
        "is_bookmaker_active"
      ];
      const currentMap =
        profile.market_settings && typeof profile.market_settings === "object"
          ? profile.market_settings
          : {};
      const previous =
        currentMap[sportId] && typeof currentMap[sportId] === "object" ? currentMap[sportId] : {};
      const next = { ...previous, sport_id: sportId };
      for (const key of scalarKeys) {
        if (!Object.prototype.hasOwnProperty.call(payload, key)) {
          continue;
        }
        const value = String(payload[key] || "").trim();
        if (value !== "") {
          next[key] = value;
        }
      }
      for (const key of boolKeys) {
        if (!Object.prototype.hasOwnProperty.call(payload, key)) {
          continue;
        }
        next[key] = parseToggle(payload[key], false);
      }
      next.updated_at = new Date().toISOString();
      profile.market_settings = {
        ...currentMap,
        [sportId]: next
      };
    }

    profile.view_settings = {
      ...(profile.view_settings && typeof profile.view_settings === "object" ? profile.view_settings : {}),
      ...payload,
      updated_at: new Date().toISOString()
    };
    if (String(fancyActive).trim() !== "") {
      profile.view_settings.is_fancy_active = String(fancyActive).toLowerCase() === "yes";
    }
    if (String(oddsActive).trim() !== "") {
      profile.view_settings.is_odds_active = String(oddsActive).toLowerCase() === "yes";
    }
    if (String(bookActive).trim() !== "") {
      profile.view_settings.is_bookmaker_active = String(bookActive).toLowerCase() === "yes";
    }

    db.save();
    sendJsonText(res, { success: true, message: "Settings updated successfully." });
    return true;
  }

  if (route === "/admin/Chip/update_user_chip" || route === "/admin/Chip/updateAllChips" || route === "/admin/Chip/upadateChipsForAll") {
    if (!hasTopAuthority(ctx)) {
      sendJson(res, 200, { success: false, message: "Access denied." });
      return true;
    }
    sendJson(res, 200, { success: true, message: "Chip settings updated successfully." });
    return true;
  }

  if (route === "/admin/Chip/addchip" || route === "/admin/Chip/deletechip") {
    if (!hasTopAuthority(ctx)) {
      sendJson(res, 200, { success: false, message: "Access denied." });
      return true;
    }
    sendJson(res, 200, { success: true, message: "Chip updated successfully." });
    return true;
  }

  if (route === "/admin/News/addnews" || route === "/admin/News/deletenews") {
    if (!hasTopAuthority(ctx)) {
      sendJson(res, 200, { success: false, message: "Access denied." });
      return true;
    }
    sendJson(res, 200, { success: true, message: "News updated successfully." });
    return true;
  }

  if (route === "/admin/Number/addnumbers" || route === "/admin/Number/deletenumber") {
    if (!hasTopAuthority(ctx)) {
      sendJson(res, 200, { success: false, message: "Access denied." });
      return true;
    }
    sendJson(res, 200, { success: true, message: "Number updated successfully." });
    return true;
  }

  if (route === "/admin/BlockMarket/block_market_update") {
    if (!hasTopAuthority(ctx)) {
      sendJson(res, 200, { success: false, message: "Access denied." });
      return true;
    }
    sendJson(res, 200, { success: true, message: "Market status updated successfully." });
    return true;
  }

  if (route === "/users/settogglenavigation") {
    const panel = db.ensureAdminPanelState();
    panel.navigationToggle = pickFirstValue(payload, ["setdefaulttoggle"], panel.navigationToggle);
    db.save();
    sendJson(res, 200, { success: true });
    return true;
  }

  if (route === "/admin/Reports/filterAcStatement" || route === "/admin/Reports/user_wco_ledger_new") {
    if (!ctx.isOwner) {
      sendJson(res, 403, { success: false, message: "Only owner admin can access reports." });
      return true;
    }
    sendJson(res, 200, statementTable(db, payload, ctx));
    return true;
  }

  if (/^\/admin\/Reports\/profitLossDetail\//i.test(route)) {
    if (!ctx.isOwner) {
      sendText(res, 302, "", "text/plain; charset=utf-8", {
        Location: `${ADMIN_CANONICAL_PREFIX}/dashboard`
      });
      return true;
    }
    sendText(
      res,
      200,
      "<html><body style='font-family:Arial;padding:20px;'><h3>Profit/Loss Detail</h3><p>Data is not available in local mode.</p></body></html>",
      "text/html; charset=utf-8"
    );
    return true;
  }
  if (/^\/admin\/Reports\/fancyStack/i.test(route)) {
    if (!ctx.isOwner) {
      sendText(res, 302, "", "text/plain; charset=utf-8", {
        Location: `${ADMIN_CANONICAL_PREFIX}/dashboard`
      });
      return true;
    }
    sendText(
      res,
      200,
      "<html><body style='font-family:Arial;padding:20px;'><h3>Fancy Stack</h3><p>Data is not available in local mode.</p></body></html>",
      "text/html; charset=utf-8"
    );
    return true;
  }

  if (/^\/admin\/user\/listUsersData\//i.test(route)) {
    const requestedType = userTypeFromPath(decodeURIComponent(route.split("/").pop() || "User"));
    const allowedTypes = allowedListingTypes(ctx);
    const selectedTypes =
      allowedTypes.length && allowedTypes.includes(requestedType)
        ? [requestedType]
        : allowedTypes.length
          ? [allowedTypes[0]]
          : [];
    sendJson(res, 200, usersDatatable(db, payload, { closedOnly: false, types: selectedTypes }, ctx));
    return true;
  }

  if (/^\/admin\/user\/listClosedUsersData\//i.test(route)) {
    const allowedTypes = allowedListingTypes(ctx);
    sendJson(res, 200, usersDatatable(db, payload, { closedOnly: true, types: allowedTypes }, ctx));
    return true;
  }

  if (/^\/admin\/bettings\/list_betting_data\//i.test(route)) {
    sendJson(res, 200, {
      content: "",
      iTotalRecords: "0",
      iTotalDisplayRecords: "0",
      aaData: []
    });
    return true;
  }

  if (route === "/admin/bettings/ajxdeletebet_new") {
    sendJson(res, 200, { success: true, message: "Bet deleted successfully." });
    return true;
  }

  if (route === "/admin/Manual/addEventsNew" || route === "/admin/Manual/eventStatusChange") {
    sendJson(res, 200, { success: true, message: "Updated successfully." });
    return true;
  }

  return false;
}

module.exports = {
  handleAdminRequest,
  isAdminAuthenticated,
  isAdminPublicPath
};




