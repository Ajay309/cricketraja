const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { LOCAL_DB_FILE } = require("./config");
const { toNumber, pickFirstValue } = require("./http-utils");
const mock = require("./mock-content");

const OWNER_DEFAULT_USERNAME = "admin";
const OWNER_DEFAULT_PASSWORD = "admin00";
const OWNER_DEFAULT_DISPLAY_NAME = "Admin";
const OWNER_USERNAME = String(process.env.ADMIN_LOGIN_USERNAME || OWNER_DEFAULT_USERNAME)
  .trim()
  .toLowerCase();
const OWNER_PASSWORD = String(process.env.ADMIN_LOGIN_PASSWORD || OWNER_DEFAULT_PASSWORD);
const OWNER_DISPLAY_NAME =
  String(process.env.ADMIN_DISPLAY_NAME || OWNER_DEFAULT_DISPLAY_NAME).trim() ||
  OWNER_DEFAULT_DISPLAY_NAME;
const MIN_DEPOSIT_AMOUNT = 100;
const DEMO_USER_FIXED_BALANCE = Number(
  Math.max(0, toNumber(process.env.DEMO_USER_FIXED_BALANCE, 1500)).toFixed(2)
);
const AUTO_CREATE_LOCAL_LOGIN_USER =
  String(process.env.AUTO_CREATE_LOCAL_LOGIN_USER || "1").trim() !== "0";
const LEGACY_SEED_USERNAMES = new Set(["demo_user", "jashxn", "qa_test_user"]);
const DB_SAVE_DEBOUNCE_MS = Math.max(20, Number(process.env.DB_SAVE_DEBOUNCE_MS || 80));
const DEMO_LOGIN_USERNAMES = ["demo"];
const DEMO_LOGIN_USERNAME_SET = new Set(DEMO_LOGIN_USERNAMES);

function makeId(prefix = "id") {
  if (typeof crypto.randomUUID === "function") {
    return `${prefix}_${crypto.randomUUID()}`;
  }
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

function parseDateTime(str) {
  if (!str || typeof str !== "string") {
    return new Date();
  }
  const cleanStr = str.replace(/[,]$/, ""); // Remove trailing comma if present
  const parts = cleanStr.split(/\s+/);
  const datePart = parts[0];
  const timePart = parts[1] || "00:00:00";

  if (datePart.includes("/")) {
    const dParts = datePart.split("/");
    if (dParts.length === 3) {
      const p0 = parseInt(dParts[0], 10);
      const p1 = parseInt(dParts[1], 10);
      const p2 = parseInt(dParts[2], 10);
      
      let day, month, year;
      // Detection: if p1 > 12, then p1 must be day, so order is MM/DD/YYYY
      // If p0 > 12, then p0 must be day, so order is DD/MM/YYYY
      if (p1 > 12) {
        day = p1; month = p0 - 1; year = p2; // MM/DD/YYYY
      } else if (p0 > 12) {
        day = p0; month = p1 - 1; year = p2; // DD/MM/YYYY
      } else {
        // Ambiguous, assume DD/MM/YYYY (common in India/Plesk)
        day = p0; month = p1 - 1; year = p2;
      }
      
      const tParts = timePart.split(":");
      const hour = parseInt(tParts[0] || "0", 10);
      const min = parseInt(tParts[1] || "0", 10);
      const sec = parseInt(tParts[2] || "0", 10);
      const d = new Date(year, month, day, hour, min, sec);
      if (!isNaN(d.getTime())) {
        return d;
      }
    }
  }

  const d = new Date(str);
  if (!isNaN(d.getTime())) {
    return d;
  }
  return new Date();
}

function formatDateTime(date = new Date()) {
  const d = new Date(date);
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}



function shallowClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function normalizeLabel(value = "") {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeBetSide(value = "") {
  const raw = String(value || "").trim().toLowerCase();
  if (raw.includes("lay")) {
    return "lay";
  }
  return "back";
}

function resolveBetOutcome(bet) {
  const token = String(
    bet && (
      bet.is_winning ||
      bet.isWinning ||
      bet.winning ||
      bet.result ||
      bet.settlement_result ||
      bet.outcome ||
      ""
    )
  )
    .trim()
    .toLowerCase();
  if (!token) {
    return null;
  }
  if (token.includes("win")) {
    return true;
  }
  if (token.includes("loss") || token.includes("lose") || token.includes("lost")) {
    return false;
  }
  return null;
}

function resolveLiveOddsFromMock(bet, betSide) {
  if (!bet || !mock || typeof mock.getGameData !== "function") {
    return null;
  }
  const selection = String(
    bet.nation ||
    bet.selection ||
    bet.selectionName ||
    bet.runner ||
    bet.team ||
    bet.player ||
    bet.nat ||
    bet.sname ||
    ""
  ).trim();
  if (!selection) {
    return null;
  }
  const rawMid = String(
    bet.mid ||
    bet.marketId ||
    bet.gmid ||
    bet.oldgmid ||
    bet.game_mid ||
    bet.gameId ||
    ""
  ).trim();
  if (!rawMid) {
    return null;
  }
  let gmid = Number(rawMid);
  let marketId = "";
  if (!Number.isFinite(gmid) || gmid <= 0) {
    if (rawMid.includes("-m")) {
      marketId = rawMid;
      const gmidToken = rawMid.split("-")[0];
      gmid = Number(gmidToken);
    }
  }
  if (!Number.isFinite(gmid) || gmid <= 0) {
    return null;
  }
  const markets = mock.getGameData(4, gmid);
  if (!Array.isArray(markets) || !markets.length) {
    return null;
  }
  let market = null;
  if (marketId) {
    market = markets.find((row) => String(row.mid || "") === marketId);
  }
  if (!market) {
    const marketHint = String(
      bet.marketName || bet.mname || bet.market || bet.marketType || bet.matchType || ""
    ).trim();
    if (marketHint) {
      const hint = normalizeLabel(marketHint);
      market = markets.find((row) => normalizeLabel(row.mname || row.marketName || "") === hint);
    }
  }
  if (!market) {
    market = markets[0];
  }
  if (!market || !Array.isArray(market.nation) || !market.nation.length) {
    return null;
  }
  const selectionLabel = normalizeLabel(selection);
  const runner =
    market.nation.find((row) => normalizeLabel(row.nat || row.nation || "") === selectionLabel) || null;
  if (!runner) {
    return null;
  }
  const liveOdds = betSide === "lay" ? runner.l1 || runner.b1 : runner.b1 || runner.l1;
  const normalized = Number(toNumber(liveOdds, NaN));
  return Number.isFinite(normalized) && normalized > 0 ? normalized : null;
}

function resolveLiveOdds(bet, betSide) {
  const rawLive = bet && (
    bet.current_odds ||
    bet.currentOdds ||
    bet.live_odds ||
    bet.liveOdds ||
    bet.market_odds ||
    bet.marketOdds ||
    bet.odds_now ||
    bet.oddsNow ||
    bet.price_now ||
    bet.priceNow
  );
  const direct = Number(toNumber(rawLive, NaN));
  if (Number.isFinite(direct) && direct > 0) {
    return direct;
  }
  return resolveLiveOddsFromMock(bet, betSide);
}

function computeBetProfitLoss(bet) {
  const betSide = normalizeBetSide(bet && (bet.btype || bet.betType || bet.type || ""));
  const odds = Number(
    toNumber(
      bet && (
        bet.urate != null
          ? bet.urate
          : bet.uRate != null
            ? bet.uRate
            : bet.odds != null
              ? bet.odds
              : bet.rate != null
                ? bet.rate
                : bet.price != null
                  ? bet.price
                  : 0
      ),
      0
    )
  );
  const stake = Number(
    toNumber(
      bet && (
        bet.amount != null
          ? bet.amount
          : bet.stake != null
            ? bet.stake
            : bet.bet_amount != null
              ? bet.bet_amount
              : bet.risk != null
                ? bet.risk
                : bet.liability != null
                  ? bet.liability
                  : 0
      ),
      0
    )
  );
  const liability = Number(
    toNumber(
      bet && (bet.liability != null ? bet.liability : bet.risk != null ? bet.risk : 0),
      0
    )
  );
  const potentialWin = betSide === "lay"
    ? stake
    : Number((stake * Math.max(odds - 1, 0)).toFixed(2));
  const potentialLoss = betSide === "lay"
    ? Number((-Math.max(liability || stake * Math.max(odds - 1, 0), 0)).toFixed(2))
    : Number((-stake).toFixed(2));

  let isWinning = resolveBetOutcome(bet);
  let currentOdds = null;
  if (isWinning === null && Number.isFinite(odds) && odds > 0) {
    currentOdds = resolveLiveOdds(bet, betSide);
    if (Number.isFinite(currentOdds) && currentOdds > 0) {
      if (betSide === "lay") {
        if (currentOdds > odds) isWinning = true;
        else if (currentOdds < odds) isWinning = false;
      } else {
        if (currentOdds < odds) isWinning = true;
        else if (currentOdds > odds) isWinning = false;
      }
    }
  }

  let profitLoss = potentialLoss;
  if (isWinning === true) {
    profitLoss = potentialWin;
  } else if (isWinning === false) {
    profitLoss = potentialLoss;
  }

  return {
    profitLoss: Number(Number(profitLoss || 0).toFixed(2)),
    potentialWin: Number(Number(potentialWin || 0).toFixed(2)),
    potentialLoss: Number(Number(potentialLoss || 0).toFixed(2)),
    isWinning,
    currentOdds: Number.isFinite(currentOdds) ? Number(currentOdds.toFixed(2)) : null
  };
}

function computeOpenBetsProfitLoss(openBets = []) {
  const rows = [];
  let total = 0;
  for (const bet of Array.isArray(openBets) ? openBets : []) {
    const computed = computeBetProfitLoss(bet || {});
    total = Number((total + Number(computed.profitLoss || 0)).toFixed(2));
    const edt = bet && bet.edt ? String(bet.edt) : formatDateTime();
    const [datePart, timePart] = edt.split(" ");

    const pad = (n) => String(n).padStart(2, "0");
    const d = (() => {
      if (bet && bet.ts) return new Date(bet.ts);
      if (bet && bet.edt) return parseDateTime(bet.edt);
      return new Date();
    })();
    const isoDate = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
    const ts = d.getTime();
    const sport = bet.sportName || (bet.sportId == 4 ? "Cricket" : bet.sportId == 1 ? "Soccer" : bet.sportId == 2 ? "Tennis" : "Others");

    rows.push({

      ...(bet ? shallowClone(bet) : {}),
      // Sports
      sportName: sport,

      sport: sport,
      etype: sport,
      sport_name: sport,
      
      // Event Name
      eventName: bet.eventName || bet.matchName || "Match",
      matchName: bet.eventName || bet.matchName || "Match",
      ename: bet.eventName || bet.matchName || "Match",
      event_name: bet.eventName || bet.matchName || "Match",
      
      // Market Name
      marketName: bet.marketName || "Odds",
      bname: bet.marketName || "Odds",
      market_name: bet.marketName || "Odds",
      mname: bet.marketName || "Odds",

      // Nation / Selection
      nation: bet.nation || "Selection",
      nat: bet.nation || "Selection",
      n: bet.nation || "Selection",
      selectionName: bet.nation || "Selection",
      selection: bet.nation || "Selection",

      // Amount
      amount: bet.amount || 0,
      stake: bet.amount || 0,
      amt: bet.amount || 0,
      
      // Odds / Rate
      urate: bet.urate || bet.odds || 0,
      odds: bet.urate || bet.odds || 0,
      orate: bet.urate || bet.odds || 0,
      bhav: bet.urate || bet.odds || 0,

      // Date / Time
      placeDate: isoDate,
      date: isoDate,
      pdt: isoDate,

      matched_at: isoDate,
      created_at: isoDate,
      updatetime: isoDate,
      edt: edt.replace(/,$/, ""), // Keep DD/MM/YYYY for activity log if needed
      time: timePart || "",
      placeTime: timePart || "",
      match_date: datePart ? datePart.replace(/,$/, "") : "",
      matchDate: isoDate,
      place_date: isoDate,
      updatetime_ts: ts,
      ts: ts,
      update_time: isoDate,
      ptime: isoDate,
      pdate: isoDate,
      placed_at: isoDate,
      placedAt: isoDate,
      bet_date: isoDate,
      betDate: isoDate,



      
      // P/L
      profit_loss: computed.profitLoss,
      profitLoss: computed.profitLoss,
      potential_profit: computed.potentialWin,
      potential_loss: computed.potentialLoss,
      is_winning: computed.isWinning,
      current_odds: computed.currentOdds
    });


  }
  return { total: Number(total.toFixed(2)), rows };
}


function sanitizeText(value = "", maxLength = 120) {
  return String(value == null ? "" : value)
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function sanitizeDigits(value = "", maxLength = 30) {
  return String(value == null ? "" : value)
    .replace(/\D/g, "")
    .slice(0, maxLength);
}

function sanitizeIfsc(value = "") {
  return String(value == null ? "" : value)
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 16);
}

function sanitizeUpi(value = "") {
  return String(value == null ? "" : value)
    .replace(/\s+/g, "")
    .trim()
    .slice(0, 80);
}

function pickDetailValue(rows = [], matcher) {
  const fn =
    typeof matcher === "function"
      ? matcher
      : () => false;
  for (const row of rows) {
    const label = normalizeLabel(row && (row.label || row.key || ""));
    if (!label || !fn(label)) {
      continue;
    }
    const value = sanitizeText(row && row.value, 150);
    if (value) {
      return value;
    }
  }
  return "";
}

function maskAccountNumber(value = "") {
  const digits = sanitizeDigits(value, 24);
  if (!digits) {
    return "";
  }
  if (digits.length <= 4) {
    return digits;
  }
  return `${"*".repeat(Math.max(0, digits.length - 4))}${digits.slice(-4)}`;
}

function maskPhoneNumber(value = "") {
  const digits = sanitizeDigits(value, 15);
  if (!digits) {
    return "";
  }
  if (digits.length <= 4) {
    return digits;
  }
  return `${digits.slice(0, 2)}${"*".repeat(Math.max(0, digits.length - 4))}${digits.slice(-2)}`;
}

function extractWithdrawFields(detailRows = [], payload = {}) {
  const bankName =
    sanitizeText(
      pickFirstValue(payload, ["bank_name", "bankName"], "") ||
      pickDetailValue(detailRows, (label) => label.includes("bank name") || label === "bank"),
      80
    );
  const accountHolderName =
    sanitizeText(
      pickFirstValue(payload, ["account_holder_name", "accountHolderName", "holder_name"], "") ||
      pickDetailValue(detailRows, (label) =>
        label.includes("account holder") ||
        label === "account name" ||
        label === "holder name"
      ),
      80
    );
  const accountNumber =
    sanitizeDigits(
      pickFirstValue(payload, ["account_number", "accountNumber", "ac_no"], "") ||
      pickDetailValue(detailRows, (label) =>
        label.includes("account number") ||
        label.includes("account no") ||
        label.includes("a c number")
      ),
      24
    );
  const ifscCode =
    sanitizeIfsc(
      pickFirstValue(payload, ["ifsc", "ifsc_code", "ifscCode"], "") ||
      pickDetailValue(detailRows, (label) => label.includes("ifsc")),
      16
    );
  const phoneNumber =
    sanitizeDigits(
      pickFirstValue(payload, ["phone", "phone_number", "mobile", "mobile_number"], "") ||
      pickDetailValue(detailRows, (label) => label.includes("phone") || label.includes("mobile")),
      15
    );
  const upiId =
    sanitizeUpi(
      pickFirstValue(payload, ["upi", "upi_id", "upiId"], "") ||
      pickDetailValue(detailRows, (label) => label.includes("upi")),
      80
    );

  return {
    bankName,
    accountHolderName,
    accountNumber,
    ifscCode,
    phoneNumber,
    upiId
  };
}

function buildWithdrawDetailRows(wsid = 1, fields = {}) {
  if (Number(wsid) === 2) {
    return [{ label: "UPI ID", value: sanitizeUpi(fields.upiId) }].filter((row) => row.value);
  }
  return [
    { label: "Bank Name", value: sanitizeText(fields.bankName, 80) },
    { label: "Account Holder Name", value: sanitizeText(fields.accountHolderName, 80) },
    { label: "Account Number", value: sanitizeDigits(fields.accountNumber, 24) },
    { label: "IFSC Code", value: sanitizeIfsc(fields.ifscCode) },
    { label: "Phone Number", value: sanitizeDigits(fields.phoneNumber, 15) }
  ].filter((row) => row.value);
}

function buildWithdrawSummary(detail = null) {
  if (!detail || typeof detail !== "object") {
    return "";
  }
  const wsid = Number(detail.wsid || 1) || 1;
  const fields = extractWithdrawFields(Array.isArray(detail.detail) ? detail.detail : [], {});
  if (wsid === 2) {
    if (!fields.upiId) {
      return "";
    }
    return `UPI ${fields.upiId}`;
  }
  const chunks = [];
  if (fields.bankName) chunks.push(fields.bankName);
  if (fields.accountHolderName) chunks.push(fields.accountHolderName);
  if (fields.accountNumber) chunks.push(`A/C ${maskAccountNumber(fields.accountNumber)}`);
  if (fields.ifscCode) chunks.push(`IFSC ${fields.ifscCode}`);
  if (fields.phoneNumber) chunks.push(`Phone ${maskPhoneNumber(fields.phoneNumber)}`);
  return chunks.join(" | ");
}

function buildDefaultUserButtons() {
  return {
    D: [100, 200, 500, 1000, 2000].map((value) => ({
      buttontext: String(value),
      buttonval: value
    })),
    W: [100, 500, 1000, 2000, 5000].map((value) => ({
      buttontext: String(value),
      buttonval: value
    }))
  };
}

function normalizeStakeButtonLabel(rawLabel, fallbackAmount = 0) {
  const cleaned = String(rawLabel == null ? "" : rawLabel).trim().replace(/^\++\s*/, "");
  if (cleaned) {
    return cleaned;
  }
  const amount = toNumber(fallbackAmount, 0);
  if (!Number.isFinite(amount) || amount <= 0) {
    return "0";
  }
  return Number.isInteger(amount) ? String(amount) : String(Number(amount.toFixed(2)));
}

function normalizeStakeButtons(rows = [], defaults = []) {
  const source = Array.isArray(rows) && rows.length
    ? rows
    : defaults.map((value) => ({ buttonval: value, buttontext: String(value) }));
  return source
    .map((row) => {
      const amount = Number(
        toNumber(
          pickFirstValue(
            row && typeof row === "object" ? row : {},
            ["buttonval", "bval", "chip_value", "value"],
            row
          ),
          0
        )
      );
      if (!Number.isFinite(amount) || amount <= 0) {
        return null;
      }
      const label = normalizeStakeButtonLabel(
        pickFirstValue(
          row && typeof row === "object" ? row : {},
          ["buttontext", "btxt", "chip_name", "text"],
          amount
        ),
        amount
      );
      return {
        ...(row && typeof row === "object" ? row : {}),
        buttonval: amount,
        bval: amount,
        buttontext: label,
        btxt: label
      };
    })
    .filter(Boolean);
}

function buildDefaultWithdrawState() {
  return {
    paymentTypes: [
      { wid: 1, wtype: "Bank" },
      { wid: 2, wtype: "UPI" }
    ],
    types: [
      { wid: 1, wtype: "Standard" },
      { wid: 2, wtype: "Fast" }
    ],
    forms: {
      "1": [
        { label: "Bank Name", type: "text", value: "" },
        { label: "Account Holder Name", type: "text", value: "" },
        { label: "Account Number", type: "text", value: "" },
        { label: "IFSC Code", type: "text", value: "" },
        { label: "Phone Number", type: "text", value: "" }
      ],
      "2": [{ label: "UPI ID", type: "text", value: "" }]
    },
    details: [
      {
        wsid: 1,
        wid: 101,
        login: OWNER_USERNAME || OWNER_DEFAULT_USERNAME,
        username: OWNER_DISPLAY_NAME,
        detail: [
          { label: "Bank Name", value: "State Bank of India" },
          { label: "Account Holder Name", value: "Account Holder" },
          { label: "Account Number", value: "XXXXXX1234" },
          { label: "IFSC Code", value: "SBIN0000001" },
          { label: "Phone Number", value: "9999999999" }
        ]
      },
      {
        wsid: 2,
        wid: 201,
        login: OWNER_USERNAME || OWNER_DEFAULT_USERNAME,
        username: OWNER_DISPLAY_NAME,
        detail: [{ label: "UPI ID", value: "" }]
      }
    ],
    nextDetailId: 1000
  };
}

function buildDefaultSupagoState() {
  return {
    paymentMethods: [
      {
        pmuniqueid: "pm_upi_1",
        pmmid: "pm_upi",
        paymenttype: "upi",
        ptype: 0,
        isfront: 0,
        pmticon: "",
        mainjson: JSON.stringify({
          name: "UPI",
          desc: "Pay instantly using UPI",
          remark: "Use any UPI app"
        }),
        accjson: JSON.stringify({
          upi: {
            name: "UPI ID",
            upiId: ""
          }
        })
      },
      {
        pmuniqueid: "pm_bank_1",
        pmmid: "pm_bank",
        paymenttype: "bank",
        ptype: 0,
        isfront: 0,
        pmticon: "",
        mainjson: JSON.stringify({
          name: "Bank Transfer",
          desc: "Transfer via IMPS/NEFT",
          remark: "Account details below"
        }),
        accjson: JSON.stringify({
          bank: {
            name: "Account",
            accountName: "Account Holder",
            accountNo: "1234567890",
            ifsc: "SBIN0000001"
          }
        })
      }
    ],
    withdrawMethods: [
      {
        pmmid: "pmw_upi",
        paymenttype: "upi",
        mainjson: JSON.stringify({
          name: "UPI Withdraw",
          desc: "Withdraw to UPI",
          remark: "UPI required"
        }),
        accjson: JSON.stringify([
          { key: "UPI ID", type: "text", value: "", caps: false }
        ])
      },
      {
        pmmid: "pmw_bank",
        paymenttype: "bank",
        mainjson: JSON.stringify({
          name: "Bank Withdraw",
          desc: "Withdraw to bank account",
          remark: "Bank details required"
        }),
        accjson: JSON.stringify([
          { key: "Account Name", type: "text", value: "", caps: true },
          { key: "Account Number", type: "text", value: "", caps: false },
          { key: "IFSC", type: "text", value: "", caps: true }
        ])
      }
    ],
    withdrawDetails: [
      {
        pmmid: "pmw_upi",
        pmuniqueid: "wd_1",
        paymenttype: "upi",
        accjson: JSON.stringify([{ key: "UPI ID", value: "" }]),
        cryptorate: 0
      }
    ],
    nextWithdrawDetailId: 2
  };
}

function buildDefaultPaymentSettings() {
  return {
    deposit: {
      amount: 100,
      upiId: "",
      upiHolderName: "",
      qrImage: "/local/payment-qr.svg",
      note: "Pay exact amount, then submit 12-digit UTR for balance update."
    },
    withdraw: {
      minAmount: 500,
      maxAmount: 100000,
      processingTime: "5-30 minutes",
      note: "Withdrawals are processed to your saved bank/UPI details."
    }
  };
}

function buildDefaultAdminPanelState() {
  return {
    nextUserId: 330900,
    nextTransactionId: 1000,
    nextUtrId: 1,
    usernameToId: {},
    userProfiles: {},
    transactions: [],
    utrNumbers: [],
    chips: [100, 200, 500, 1000, 2000].map((value, index) => ({
      chip_id: String(index + 1),
      chip_name: String(value),
      chip_value: Number(value)
    })),
    news: [],
    numbers: [],
    blockMarket: {},
    themeId: 1,
    navigationToggle: "sidebar-collapse"
  };
}

function buildDefaultState() {
  const createdAt = formatDateTime();
  const ownerUser = {
    id: "u_owner_1",
    username: OWNER_USERNAME || OWNER_DEFAULT_USERNAME,
    password: OWNER_PASSWORD,
    displayName: OWNER_DISPLAY_NAME,
    userType: 1,
    code: String(Math.floor(Math.random() * 9e10 + 1e10)),
    mobile: "",
    currency: "INR",
    isDemoUser: false,
    balance: 0,
    exposure: 0,
    exposureLimit: 1000,
    active: true,
    createdAt
  };

  return {
    meta: {
      createdAt,
      updatedAt: createdAt
    },
    users: {
      [ownerUser.username]: ownerUser
    },
    sessions: {},
    bets: {
      [ownerUser.username]: []
    },
    statements: {
      [ownerUser.username]: [
        {
          gmid: 0,
          mid: "0",
          amt: 0,
          rem: "User creation",
          edt: createdAt,
          rpopup: false,
          dserver: "a",
          gtype: ""
        }
      ]
    },
    subscriptions: [],
    buttonSettings: {
      game: {},
      casino: {}
    },
    userButtons: buildDefaultUserButtons(),
    paymentSettings: buildDefaultPaymentSettings(),
    paymentUtrs: [],
    withdraw: buildDefaultWithdrawState(),
    supago: buildDefaultSupagoState(),
    adminPanel: buildDefaultAdminPanelState(),
    providerCallbacks: {
      processed: {},
      rows: []
    },
    auth: {
      type: 0,
      secret: "",
      enabled: false
    }
  };
}

class LocalDatabase {
  constructor(filePath = LOCAL_DB_FILE) {
    this.filePath = filePath;
    this.state = buildDefaultState();
    this.loginHintIndex = new Map();
    this.loginHintIndexDirty = true;
    this.saveTimer = null;
    this.savePending = false;
    this.isFlushing = false;
    this.lastFlushAt = 0;
    this.load();
    this.installProcessFlushHooks();
  }

  installProcessFlushHooks() {
    if (this._processFlushHookInstalled) {
      return;
    }
    this._processFlushHookInstalled = true;
    const flush = () => {
      try {
        this.flushToDiskNow();
      } catch { }
    };
    process.once("beforeExit", flush);
    process.once("SIGINT", () => {
      flush();
      process.exit(0);
    });
    process.once("SIGTERM", () => {
      flush();
      process.exit(0);
    });
  }

  markLoginHintIndexDirty() {
    this.loginHintIndexDirty = true;
  }

  rebuildLoginHintIndex() {
    const next = new Map();
    const users = this.state && this.state.users && typeof this.state.users === "object"
      ? this.state.users
      : {};
    for (const [username, user] of Object.entries(users)) {
      const key = String(username || "").trim().toLowerCase();
      if (key) {
        next.set(key, key);
      }
      const display = String(user && user.displayName ? user.displayName : "")
        .trim()
        .toLowerCase();
      if (display && !next.has(display)) {
        next.set(display, key);
      }
      const code = String(user && user.code ? user.code : "")
        .trim()
        .toLowerCase();
      if (code && !next.has(code)) {
        next.set(code, key);
      }
    }

    const panel = this.ensureAdminPanelState();
    for (const profile of Object.values(panel.userProfiles || {})) {
      if (!profile) {
        continue;
      }
      const profileUsername = String(profile.username || "").trim().toLowerCase();
      const mappedUsername =
        profileUsername && users[profileUsername] ? profileUsername : "";
      if (!mappedUsername) {
        continue;
      }
      const hints = [
        profileUsername,
        String(profile.user_name || "").trim().toLowerCase(),
        String(profile.user_id || "").trim().toLowerCase()
      ];
      for (const hint of hints) {
        if (hint && !next.has(hint)) {
          next.set(hint, mappedUsername);
        }
      }
    }

    this.loginHintIndex = next;
    this.loginHintIndexDirty = false;
  }

  ensureLoginHintIndex() {
    if (!this.loginHintIndexDirty && this.loginHintIndex && this.loginHintIndex.size) {
      return;
    }
    this.rebuildLoginHintIndex();
  }

  load() {
    try {
      if (!fs.existsSync(this.filePath)) {
        this.state = buildDefaultState();
        this.ensureIntegrity();
        return;
      }
      const raw = fs.readFileSync(this.filePath, "utf8");
      const parsed = JSON.parse(String(raw || "").replace(/^\uFEFF/, ""));
      this.state = { ...buildDefaultState(), ...parsed };
      this.ensureIntegrity();
    } catch {
      this.state = buildDefaultState();
      this.ensureIntegrity();
    }
  }

  ensureIntegrity() {
    this.state.meta = this.state.meta || {};
    this.state.meta.createdAt = this.state.meta.createdAt || formatDateTime();
    this.state.meta.updatedAt = this.state.meta.updatedAt || formatDateTime();
    this.state.users = this.state.users || {};
    this.state.sessions = this.state.sessions || {};
    this.state.bets = this.state.bets || {};
    this.state.statements = this.state.statements || {};
    this.state.subscriptions = Array.isArray(this.state.subscriptions)
      ? this.state.subscriptions
      : [];
    this.state.buttonSettings = this.state.buttonSettings || { game: {}, casino: {} };
    this.state.userButtons = this.state.userButtons || buildDefaultUserButtons();
    this.state.paymentSettings = this.state.paymentSettings || buildDefaultPaymentSettings();
    this.state.paymentUtrs = Array.isArray(this.state.paymentUtrs) ? this.state.paymentUtrs : [];
    this.state.withdraw = this.state.withdraw || buildDefaultWithdrawState();
    this.state.supago = this.state.supago || buildDefaultSupagoState();
    this.state.adminPanel = this.state.adminPanel || buildDefaultAdminPanelState();
    this.state.providerCallbacks =
      this.state.providerCallbacks && typeof this.state.providerCallbacks === "object"
        ? this.state.providerCallbacks
        : { processed: {}, rows: [] };
    this.state.providerCallbacks.processed =
      this.state.providerCallbacks.processed && typeof this.state.providerCallbacks.processed === "object"
        ? this.state.providerCallbacks.processed
        : {};
    this.state.providerCallbacks.rows = Array.isArray(this.state.providerCallbacks.rows)
      ? this.state.providerCallbacks.rows
      : [];
    this.state.auth = this.state.auth || { type: 0, secret: "", enabled: false };

    if (!Array.isArray(this.state.userButtons.D) || !this.state.userButtons.D.length) {
      this.state.userButtons.D = buildDefaultUserButtons().D;
    }
    if (!Array.isArray(this.state.userButtons.W) || !this.state.userButtons.W.length) {
      this.state.userButtons.W = buildDefaultUserButtons().W;
    }
    this.state.userButtons.D = normalizeStakeButtons(this.state.userButtons.D, [100, 200, 500, 1000, 2000]);
    this.state.userButtons.W = normalizeStakeButtons(this.state.userButtons.W, [100, 500, 1000, 2000, 5000]);

    this.state.withdraw.paymentTypes = Array.isArray(this.state.withdraw.paymentTypes)
      ? this.state.withdraw.paymentTypes
      : buildDefaultWithdrawState().paymentTypes;
    this.state.withdraw.types = Array.isArray(this.state.withdraw.types)
      ? this.state.withdraw.types
      : buildDefaultWithdrawState().types;
    this.state.withdraw.forms =
      this.state.withdraw.forms && typeof this.state.withdraw.forms === "object"
        ? this.state.withdraw.forms
        : buildDefaultWithdrawState().forms;
    this.state.withdraw.details = Array.isArray(this.state.withdraw.details)
      ? this.state.withdraw.details
      : buildDefaultWithdrawState().details;
    const ownerLogin = this.getOwnerUsername();
    this.state.withdraw.details = this.state.withdraw.details
      .map((row) => {
        if (!row || typeof row !== "object") {
          return null;
        }
        const wsid = Number(toNumber(row.wsid, 1)) || 1;
        const wid = Number(toNumber(row.wid, 0));
        const login = String(row.login || row.username || ownerLogin || "").trim().toLowerCase();
        const detailRows = this.normalizeDetailInput(row.detail).map((entry) => ({
          label: entry.label,
          value: entry.value
        }));
        const fields = extractWithdrawFields(detailRows, row);
        const normalizedRows = detailRows.length ? detailRows : buildWithdrawDetailRows(wsid, fields);
        if (!login || !normalizedRows.length || !Number.isFinite(wid) || wid <= 0) {
          return null;
        }
        return {
          wsid,
          wid,
          login,
          username: String(row.username || login),
          created_at: row.created_at || formatDateTime(),
          detail: normalizedRows
        };
      })
      .filter(Boolean)
      .sort((left, right) => Number(right.wid || 0) - Number(left.wid || 0));
    this.state.withdraw.nextDetailId = Number(this.state.withdraw.nextDetailId || 1000);
    for (const row of this.state.withdraw.details) {
      this.state.withdraw.nextDetailId = Math.max(
        Number(this.state.withdraw.nextDetailId || 1000),
        Number(toNumber(row.wid, 0))
      );
    }

    this.state.supago.paymentMethods = Array.isArray(this.state.supago.paymentMethods)
      ? this.state.supago.paymentMethods
      : buildDefaultSupagoState().paymentMethods;
    this.state.supago.withdrawMethods = Array.isArray(this.state.supago.withdrawMethods)
      ? this.state.supago.withdrawMethods
      : buildDefaultSupagoState().withdrawMethods;
    this.state.supago.withdrawDetails = Array.isArray(this.state.supago.withdrawDetails)
      ? this.state.supago.withdrawDetails
      : buildDefaultSupagoState().withdrawDetails;
    this.state.supago.nextWithdrawDetailId = Number(this.state.supago.nextWithdrawDetailId || 2);
    this.state.auth = { type: 0, enabled: false, secret: "" };

    const paymentDefaults = buildDefaultPaymentSettings();
    if (!this.state.paymentSettings || typeof this.state.paymentSettings !== "object") {
      this.state.paymentSettings = buildDefaultPaymentSettings();
    }
    if (!this.state.paymentSettings.deposit || typeof this.state.paymentSettings.deposit !== "object") {
      this.state.paymentSettings.deposit = {};
    }
    if (
      !this.state.paymentSettings.withdraw ||
      typeof this.state.paymentSettings.withdraw !== "object"
    ) {
      this.state.paymentSettings.withdraw = {};
    }
    this.state.paymentSettings.deposit = {
      ...paymentDefaults.deposit,
      ...this.state.paymentSettings.deposit
    };
    this.state.paymentSettings.withdraw = {
      ...paymentDefaults.withdraw,
      ...this.state.paymentSettings.withdraw
    };

    this.ensureAdminPanelState();
    this.removeLegacySeedUsers(this.getOwnerUsername());

    const ownerUsername = this.getOwnerUsername();
    let ownerUser = this.findUserByUsername(ownerUsername);
    if (!ownerUser) {
      ownerUser = this.createUser({
        username: ownerUsername,
        password: OWNER_PASSWORD,
        displayName: OWNER_DISPLAY_NAME,
        mobile: "",
        currency: "INR",
        startingBalance: 0,
        isDemoUser: false
      });
    } else {
      ownerUser.password = OWNER_PASSWORD;
      ownerUser.displayName = OWNER_DISPLAY_NAME;
      ownerUser.active = true;
    }

    this.ensureDemoLoginUsers();

    for (const username of Object.keys(this.state.users)) {
      this.ensureUserCollections(username);
      this.ensureAdminUserProfile(username, "User");
      this.migrateLegacyDebitedOpenBets(username);
      this.recalculateUserExposure(username);
    }

    const ownerProfile = this.ensureAdminUserProfile(ownerUsername, "Hyper Super Master");
    if (ownerProfile) {
      ownerProfile.user_type = "Hyper Super Master";
      ownerProfile.master_id = "0";
      const ownerId = String(ownerProfile.user_id || "0");
      const panel = this.ensureAdminPanelState();
      for (const profile of Object.values(panel.userProfiles || {})) {
        if (!profile || String(profile.user_id || "") === ownerId) {
          continue;
        }
        const masterId = String(profile.master_id || "").trim();
        if (!masterId || masterId === "0" || !panel.userProfiles[masterId]) {
          profile.master_id = ownerId;
        }
      }
    }

    this.markLoginHintIndexDirty();
    this.save();
  }

  save() {
    this.enforceDemoUsersState();
    this.markLoginHintIndexDirty();
    this.state.meta.updatedAt = formatDateTime();
    this.schedulePersistToDisk();
  }

  schedulePersistToDisk() {
    if (this.saveTimer) {
      this.savePending = true;
      return;
    }
    const elapsed = Date.now() - Number(this.lastFlushAt || 0);
    const delay = elapsed >= DB_SAVE_DEBOUNCE_MS ? 0 : DB_SAVE_DEBOUNCE_MS - elapsed;
    this.saveTimer = setTimeout(() => {
      this.saveTimer = null;
      this.flushToDiskNow();
    }, delay);
  }

  flushToDiskNow() {
    if (this.isFlushing) {
      this.savePending = true;
      return;
    }
    this.isFlushing = true;
    try {
      const dir = path.dirname(this.filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      const payload = JSON.stringify(this.state, null, 2);
      const tmpFile = `${this.filePath}.tmp`;
      fs.writeFileSync(tmpFile, payload, "utf8");
      try {
        fs.renameSync(tmpFile, this.filePath);
      } catch {
        fs.writeFileSync(this.filePath, payload, "utf8");
        try {
          fs.unlinkSync(tmpFile);
        } catch { }
      }
      this.lastFlushAt = Date.now();
    } finally {
      this.isFlushing = false;
      if (this.savePending) {
        this.savePending = false;
        this.schedulePersistToDisk();
      }
    }
  }

  flushNow() {
    if (this.saveTimer) {
      clearTimeout(this.saveTimer);
      this.saveTimer = null;
    }
    this.savePending = false;
    this.enforceDemoUsersState();
    this.markLoginHintIndexDirty();
    this.state.meta.updatedAt = formatDateTime();
    this.flushToDiskNow();
  }

  getDemoUserFixedBalance() {
    return Number(toNumber(DEMO_USER_FIXED_BALANCE, 1500).toFixed(2));
  }

  getDemoLoginUsernames() {
    return [...DEMO_LOGIN_USERNAMES];
  }

  isDemoLoginUsername(username = "") {
    const normalized = String(username || "").trim().toLowerCase();
    return DEMO_LOGIN_USERNAME_SET.has(normalized);
  }

  pickNextDemoLoginUsername(preferred = "") {
    const normalizedPreferred = String(preferred || "").trim().toLowerCase();
    if (this.isDemoLoginUsername(normalizedPreferred)) {
      return normalizedPreferred;
    }
    this.state.meta = this.state.meta && typeof this.state.meta === "object" ? this.state.meta : {};
    const cursor = Number(toNumber(this.state.meta.demoLoginCursor, 0));
    const safeCursor = Number.isFinite(cursor) && cursor >= 0 ? Math.floor(cursor) : 0;
    const username = DEMO_LOGIN_USERNAMES[safeCursor % DEMO_LOGIN_USERNAMES.length] || DEMO_LOGIN_USERNAMES[0];
    this.state.meta.demoLoginCursor = (safeCursor + 1) % DEMO_LOGIN_USERNAMES.length;
    return username;
  }

  ensureDemoLoginUsers() {
    const fixedBalance = this.getDemoUserFixedBalance();
    for (const demoUsername of DEMO_LOGIN_USERNAMES) {
      let user = this.findUserByUsername(demoUsername);
      if (!user) {
        user = this.createUser({
          username: demoUsername,
          password: "demo123",
          displayName: demoUsername,
          mobile: "",
          currency: "INR",
          startingBalance: fixedBalance,
          isDemoUser: true
        });
      }
      if (!user) {
        continue;
      }
      user.isDemoUser = true;
      user.active = true;
      user.password = String(user.password || "demo123");
      this.enforceDemoUserBalance(user);
    }
  }

  enforceDemoUserBalance(user) {
    if (!user || !Boolean(user.isDemoUser)) {
      return false;
    }
    const balance = Number(toNumber(user.balance, NaN));
    if (Number.isFinite(balance) && balance >= 0) {
      return false;
    }
    user.balance = this.getDemoUserFixedBalance();
    return true;
  }

  enforceDemoUsersState() {
    let changed = false;
    for (const user of Object.values(this.state.users || {})) {
      if (this.enforceDemoUserBalance(user)) {
        changed = true;
      }
    }
    return changed;
  }

  ensureUserCollections(username) {
    if (!Array.isArray(this.state.bets[username])) {
      this.state.bets[username] = [];
    }
    if (!Array.isArray(this.state.statements[username])) {
      this.state.statements[username] = [];
    }
  }

  migrateLegacyDebitedOpenBets(username) {
    const user = this.findUserByUsername(username);
    if (!user) {
      return { refunded: 0, migrated: 0 };
    }
    this.ensureUserCollections(user.username);
    const bets = this.state.bets[user.username] || [];
    let refunded = 0;
    let migrated = 0;
    for (const bet of bets) {
      if (!bet || String(bet.status || "").toUpperCase() !== "OPEN") {
        continue;
      }
      const hadLegacyDebit = bet.walletDebited === true || typeof bet.walletDebited === "undefined";
      if (hadLegacyDebit) {
        refunded += this.normalizeExposureRisk(bet.amount);
        bet.walletDebited = false;
        migrated += 1;
      }
      bet.risk = this.resolveBetRisk(bet);
      if (bet.liability == null || String(bet.liability).trim() === "") {
        bet.liability = bet.risk;
      }
    }
    if (refunded > 0) {
      user.balance = Number((toNumber(user.balance, 0) + refunded).toFixed(2));
      this.addStatement(user.username, {
        amount: user.balance,
        remark: `Exposure wallet migration credit (+${Number(refunded.toFixed(2))})`,
        dserver: "a"
      });
    }
    return {
      refunded: Number(refunded.toFixed(2)),
      migrated
    };
  }

  normalizeExposureRisk(value = 0) {
    const parsed = Number(toNumber(value, 0));
    if (!Number.isFinite(parsed)) {
      return 0;
    }
    return Number(Math.max(0, Math.abs(parsed)).toFixed(2));
  }

  toExposureDisplay(value = 0) {
    const risk = this.normalizeExposureRisk(value);
    if (!risk) {
      return 0;
    }
    const exposure = Number((-risk).toFixed(2));
    return Math.abs(exposure) < 0.005 ? 0 : exposure;
  }

  getAvailableBalance(user) {
    const balance = Number(toNumber(user && user.balance, 0));
    const exposure = Number(toNumber(user && user.exposure, 0));
    if (!Number.isFinite(balance) || !Number.isFinite(exposure)) {
      return 0;
    }
    const available = Number((balance + exposure).toFixed(2));
    return Math.abs(available) < 0.005 ? 0 : available;
  }

  syncUserExposureWithBalance(user) {
    if (!user || typeof user !== "object") {
      return 0;
    }
    const safeBalance = Number(Math.max(0, toNumber(user.balance, 0)).toFixed(2));
    user.balance = safeBalance;
    const username = String(user.username || "").trim().toLowerCase();
    this.ensureUserCollections(username);
    const openBets = (this.state.bets[username] || []).filter(
      (bet) => bet && String(bet.status || "").toUpperCase() === "OPEN"
    );
    let totalRisk = 0;
    for (const bet of openBets) {
      totalRisk += this.resolveBetRisk(bet);
    }
    user.exposure = this.toExposureDisplay(totalRisk);
    return Number(toNumber(user.exposure, 0).toFixed(2));
  }

  isLayBetType(value = "") {
    const raw = String(value == null ? "" : value).trim().toLowerCase();
    if (!raw) {
      return false;
    }
    return raw === "lay" || raw === "l" || raw === "against" || raw === "liability";
  }

  shouldUseBookmakerRatePointsLayOdds(rawOdds = "", safeOdds = 0, context = {}) {
    if (!Number.isFinite(safeOdds) || safeOdds <= 1) {
      return false;
    }
    const oddsText = String(rawOdds == null ? "" : rawOdds).trim();
    const normalizedOddsText = oddsText.toLowerCase();
    const contextHints = [
      context && context.mname,
      context && context.marketName,
      context && context.market_name,
      context && context.marketType,
      context && context.market_type,
      context && context.gtype,
      context && context.type,
      context && context.source,
      context && context.rem
    ]
      .map((value) => String(value == null ? "" : value).toLowerCase())
      .join(" ");

    // Sports bookmaker/fancy payloads often send lay odds as points (e.g. 120 => 1.20).
    if (/(bookmaker|\bbm\b|fancy|session)/i.test(contextHints) && safeOdds >= 10) {
      return true;
    }

    // Fallback heuristic: integer lay odds in the 20-1000 range with no decimal separator
    // are usually point-format prices from sportsbook/bookmaker feeds.
    if (/^\d+$/.test(normalizedOddsText) && safeOdds >= 20 && safeOdds <= 1000) {
      return true;
    }

    return false;
  }

  calculateBetRisk(stake = 0, odds = 0, betType = "back", context = {}) {
    const safeStake = this.normalizeExposureRisk(stake);
    if (safeStake <= 0) {
      return 0;
    }
    if (!this.isLayBetType(betType)) {
      return safeStake;
    }
    const safeOdds = Number(toNumber(odds, 0));
    if (!Number.isFinite(safeOdds) || safeOdds <= 1) {
      return safeStake;
    }
    const rawOdds = pickFirstValue(context || {}, ["rawOdds", "uRate", "urate", "odds", "bhav", "rate", "price"], "");
    const useRatePoints = this.shouldUseBookmakerRatePointsLayOdds(rawOdds, safeOdds, context || {});
    const effectiveOdds = useRatePoints ? 1 + safeOdds / 100 : safeOdds;
    return Number((safeStake * Math.max(effectiveOdds - 1, 0)).toFixed(2));
  }

  resolveBetRisk(bet = {}) {
    if (!bet || typeof bet !== "object") {
      return 0;
    }
    if (bet.risk != null && String(bet.risk).trim() !== "") {
      return this.normalizeExposureRisk(bet.risk);
    }
    if (bet.liability != null && String(bet.liability).trim() !== "") {
      return this.normalizeExposureRisk(bet.liability);
    }
    return this.calculateBetRisk(
      pickFirstValue(bet, ["amount", "stake", "amt", "sdata"], 0),
      pickFirstValue(bet, ["urate", "uRate", "odds", "rate", "price"], 0),
      pickFirstValue(bet, ["btype", "betType", "type"], "back"),
      { ...bet, rawOdds: pickFirstValue(bet, ["rawOdds", "uRate", "urate", "odds", "rate", "price"], "") }
    );
  }

  recalculateUserExposure(username) {
    const user = this.findUserByUsername(username);
    if (!user) {
      return 0;
    }
    this.ensureUserCollections(user.username);
    if (Boolean(user.isDemoUser)) {
      this.enforceDemoUserBalance(user);
    }
    return this.syncUserExposureWithBalance(user);
  }

  ensureAdminPanelState() {
    const defaults = buildDefaultAdminPanelState();
    if (!this.state.adminPanel || typeof this.state.adminPanel !== "object") {
      this.state.adminPanel = buildDefaultAdminPanelState();
    }

    const panel = this.state.adminPanel;
    panel.nextUserId = Number(panel.nextUserId || defaults.nextUserId);
    if (!Number.isFinite(panel.nextUserId) || panel.nextUserId < 330885) {
      panel.nextUserId = defaults.nextUserId;
    }
    panel.nextTransactionId = Number(panel.nextTransactionId || defaults.nextTransactionId);
    if (!Number.isFinite(panel.nextTransactionId) || panel.nextTransactionId < 1) {
      panel.nextTransactionId = defaults.nextTransactionId;
    }
    panel.nextUtrId = Number(panel.nextUtrId || defaults.nextUtrId);
    if (!Number.isFinite(panel.nextUtrId) || panel.nextUtrId < 1) {
      panel.nextUtrId = defaults.nextUtrId;
    }
    panel.usernameToId =
      panel.usernameToId && typeof panel.usernameToId === "object" ? panel.usernameToId : {};
    panel.userProfiles =
      panel.userProfiles && typeof panel.userProfiles === "object" ? panel.userProfiles : {};
    panel.transactions = Array.isArray(panel.transactions) ? panel.transactions : [];
    panel.utrNumbers = Array.isArray(panel.utrNumbers) ? panel.utrNumbers : [];
    panel.chips =
      Array.isArray(panel.chips) && panel.chips.length
        ? panel.chips
        : shallowClone(defaults.chips);
    panel.news = Array.isArray(panel.news) ? panel.news : [];
    panel.numbers = Array.isArray(panel.numbers) ? panel.numbers : [];
    panel.blockMarket =
      panel.blockMarket && typeof panel.blockMarket === "object" ? panel.blockMarket : {};
    panel.themeId = Number(panel.themeId || 1);
    panel.navigationToggle = String(panel.navigationToggle || "sidebar-collapse");

    for (const [id, profile] of Object.entries(panel.userProfiles)) {
      if (!profile || typeof profile !== "object") {
        continue;
      }
      profile.user_id = String(profile.user_id || id);
      profile.username = String(profile.username || "").trim().toLowerCase();
      if (profile.username) {
        panel.usernameToId[profile.username] = profile.user_id;
      }
    }

    let maxUserId = panel.nextUserId;
    for (const key of Object.keys(panel.userProfiles)) {
      const parsed = Number(key);
      if (Number.isFinite(parsed) && parsed > maxUserId) {
        maxUserId = parsed;
      }
    }
    panel.nextUserId = maxUserId;

    let maxTxnId = panel.nextTransactionId;
    for (const row of panel.transactions) {
      const parsed = Number(row && row.id);
      if (Number.isFinite(parsed) && parsed > maxTxnId) {
        maxTxnId = parsed;
      }
    }
    panel.nextTransactionId = maxTxnId;

    let maxUtrId = panel.nextUtrId;
    for (const row of panel.utrNumbers) {
      const parsed = Number(row && row.id);
      if (Number.isFinite(parsed) && parsed > maxUtrId) {
        maxUtrId = parsed;
      }
    }
    panel.nextUtrId = maxUtrId;
    return panel;
  }

  getOwnerUsername() {
    return OWNER_USERNAME || OWNER_DEFAULT_USERNAME;
  }

  getOwnerAdminId(panel = null) {
    const currentPanel = panel || this.ensureAdminPanelState();
    const ownerUsername = this.getOwnerUsername();
    const mapped = String(currentPanel.usernameToId?.[ownerUsername] || "").trim();
    if (mapped && currentPanel.userProfiles?.[mapped]) {
      return mapped;
    }
    for (const [id, profile] of Object.entries(currentPanel.userProfiles || {})) {
      if (String(profile?.username || "").trim().toLowerCase() === ownerUsername) {
        currentPanel.usernameToId[ownerUsername] = String(id);
        return String(id);
      }
    }
    return "";
  }

  getPrimaryUser() {
    const owner = this.findUserByUsername(this.getOwnerUsername());
    if (owner) {
      return owner;
    }
    const users = Object.values(this.state.users || {});
    const active = users.find((row) => row && row.active !== false);
    if (active) {
      return active;
    }
    return users[0] || null;
  }

  removeLegacySeedUsers(ownerUsername = this.getOwnerUsername()) {
    const removeUsers = [...LEGACY_SEED_USERNAMES].filter((name) => name !== ownerUsername);
    if (!removeUsers.length) {
      return;
    }

    for (const username of removeUsers) {
      delete this.state.users[username];
      delete this.state.bets[username];
      delete this.state.statements[username];
    }

    for (const token of Object.keys(this.state.sessions || {})) {
      const session = this.state.sessions[token];
      const uname = String(session && session.username ? session.username : "")
        .trim()
        .toLowerCase();
      if (removeUsers.includes(uname)) {
        delete this.state.sessions[token];
      }
    }

    if (Array.isArray(this.state.paymentUtrs)) {
      this.state.paymentUtrs = this.state.paymentUtrs.filter((row) => {
        const uname = String(row && row.username ? row.username : "")
          .trim()
          .toLowerCase();
        return !removeUsers.includes(uname);
      });
    }

    const panel = this.ensureAdminPanelState();
    const removedProfileIds = new Set();

    for (const username of removeUsers) {
      const mappedId = String(panel.usernameToId?.[username] || "").trim();
      if (mappedId) {
        removedProfileIds.add(mappedId);
      }
      delete panel.usernameToId[username];
    }

    for (const [id, profile] of Object.entries(panel.userProfiles || {})) {
      const uname = String(profile && profile.username ? profile.username : "")
        .trim()
        .toLowerCase();
      if (removeUsers.includes(uname)) {
        removedProfileIds.add(String(id));
        delete panel.userProfiles[id];
      }
    }

    panel.transactions = (panel.transactions || []).filter((row) => {
      const login = String(row && row.login ? row.login : "")
        .trim()
        .toLowerCase();
      const uname = String(row && row.username ? row.username : "")
        .trim()
        .toLowerCase();
      const rowUserId = String(row && row.user_id ? row.user_id : "").trim();
      if (removedProfileIds.has(rowUserId)) {
        return false;
      }
      return !removeUsers.includes(login) && !removeUsers.includes(uname);
    });

    for (const key of Object.keys(this.state.buttonSettings || {})) {
      const section = this.state.buttonSettings[key];
      if (!section || typeof section !== "object") {
        continue;
      }
      const uname = String(section.uname || "").trim().toLowerCase();
      const username = String(section.username || "").trim().toLowerCase();
      if (removeUsers.includes(uname)) {
        section.uname = ownerUsername;
      }
      if (removeUsers.includes(username)) {
        section.username = ownerUsername;
      }
      section.password = "";
      const sectionToken = String(section.token || "").trim();
      if (sectionToken && this.state.sessions && !this.state.sessions[sectionToken]) {
        section.token = "";
      }
    }

    for (const profile of Object.values(panel.userProfiles || {})) {
      if (!profile) {
        continue;
      }
      if (removedProfileIds.has(String(profile.master_id || ""))) {
        profile.master_id = "0";
      }
    }
  }

  ensureAdminUserProfile(username, preferredType = "User") {
    const user = this.findUserByUsername(username);
    if (!user) {
      return null;
    }

    const panel = this.ensureAdminPanelState();
    const key = String(user.username || "").trim().toLowerCase();
    const ownerUsername = this.getOwnerUsername();
    const isOwnerUser = key === ownerUsername;
    let userId = panel.usernameToId[key];
    if (!userId) {
      if (isOwnerUser && !panel.userProfiles["330885"]) {
        userId = "330885";
      } else {
        let next = Number(panel.nextUserId || 330900);
        while (panel.userProfiles[String(next)]) {
          next += 1;
        }
        panel.nextUserId = next;
        userId = String(next);
      }
      panel.usernameToId[key] = userId;
    }

    const fallbackType = isOwnerUser ? "Hyper Super Master" : preferredType;
    const ownerAdminId = this.getOwnerAdminId(panel);
    const defaultMasterId = isOwnerUser ? "0" : String(ownerAdminId || "0");
    const profile = panel.userProfiles[userId] || {
      user_id: userId,
      username: key,
      user_name: user.displayName || user.username,
      user_type: fallbackType,
      master_id: defaultMasterId,
      credit_limit: Number(user.exposureLimit || 100000),
      lock_betting: false,
      closed: false,
      created_at: formatDateTime(user.createdAt || new Date())
    };

    profile.user_id = String(userId);
    profile.username = key;
    profile.user_name = user.displayName || user.username;
    profile.user_type = String(profile.user_type || fallbackType);
    profile.master_id = String(profile.master_id || defaultMasterId);
    if (!isOwnerUser && (!profile.master_id || profile.master_id === "0")) {
      profile.master_id = defaultMasterId;
    }
    profile.credit_limit = Number(toNumber(profile.credit_limit, user.exposureLimit || 100000));
    profile.lock_betting = Boolean(profile.lock_betting);
    profile.closed = Boolean(profile.closed) || user.active === false;
    profile.created_at = profile.created_at || formatDateTime(user.createdAt || new Date());

    panel.userProfiles[userId] = profile;
    panel.usernameToId[key] = userId;
    return profile;
  }

  getAdminProfileById(userId) {
    if (!userId && userId !== 0) {
      return null;
    }
    const panel = this.ensureAdminPanelState();
    return panel.userProfiles[String(userId)] || null;
  }

  getUserByAdminId(userId) {
    const profile = this.getAdminProfileById(userId);
    if (!profile) {
      return null;
    }
    return this.findUserByUsername(profile.username);
  }

  createAdminTransaction({
    paymentType = "Deposit",
    username = "",
    userId = "",
    amount = 0,
    status = "Request",
    remark = "",
    utrNumber = "",
    source = "frontend",
    metadata = null
  } = {}) {
    const panel = this.ensureAdminPanelState();
    let targetUser = null;
    let profile = null;
    if (userId) {
      targetUser = this.getUserByAdminId(userId);
      profile = this.getAdminProfileById(userId);
    }
    if (!targetUser && username) {
      targetUser = this.findUserByUsername(username);
      profile = this.ensureAdminUserProfile(username, "User");
    }
    if (!targetUser) {
      return null;
    }
    if (!profile) {
      profile = this.ensureAdminUserProfile(targetUser.username, "User");
    }
    if (!profile) {
      return null;
    }

    const nextId = Number(panel.nextTransactionId || 1000) + 1;
    panel.nextTransactionId = nextId;
    const normalizedAmount = Number(toNumber(amount, 0).toFixed(2));
    const createdAt = new Date();
    const row = {
      id: nextId,
      payment_type: String(paymentType || "Deposit"),
      status: String(status || "Request"),
      amount: normalizedAmount,
      username: targetUser.displayName || targetUser.username,
      login: targetUser.username,
      user_id: String(profile.user_id),
      site_code: "P1004",
      domain: "CRICKETRAJA",
      remark: String(remark || ""),
      utrNumber: String(utrNumber || ""),
      source: String(source || "frontend"),
      walletApplied: false,
      created_at: formatDateTime(createdAt),
      created_at_iso: createdAt.toISOString(),
      updated_at_iso: createdAt.toISOString()
    };
    if (metadata && typeof metadata === "object") {
      row.metadata = shallowClone(metadata);
    }

    panel.transactions.unshift(row);
    return row;
  }

  findAdminTransactionById(id) {
    const panel = this.ensureAdminPanelState();
    const targetId = Number(id);
    if (!Number.isFinite(targetId)) {
      return null;
    }
    return panel.transactions.find((row) => Number(row.id) === targetId) || null;
  }

  listAdminTransactions(filters = {}) {
    const panel = this.ensureAdminPanelState();
    const paymentType = String(filters.payment_type || filters.paymentType || "")
      .trim()
      .toLowerCase();
    const statusFilter = String(filters.status || filters.dropdown2 || "")
      .trim()
      .toLowerCase();
    const search = String(filters.search || "").trim().toLowerCase();
    const siteCode = String(filters.dropdown1 || "").trim().toLowerCase();
    const fromDate = String(filters.fdate || "").trim();
    const toDate = String(filters.tdate || "").trim();

    return panel.transactions.filter((row) => {
      if (paymentType && paymentType !== "all") {
        if (String(row.payment_type || "").toLowerCase() !== paymentType) {
          return false;
        }
      }

      if (statusFilter && statusFilter !== "all") {
        if (String(row.status || "").toLowerCase() !== statusFilter) {
          return false;
        }
      }

      if (siteCode && siteCode !== "all") {
        if (String(row.site_code || "").toLowerCase() !== siteCode) {
          return false;
        }
      }

      if (fromDate || toDate) {
        const ymd = String(row.created_at_iso || "").slice(0, 10);
        if (fromDate && ymd < fromDate) {
          return false;
        }
        if (toDate && ymd > toDate) {
          return false;
        }
      }

      if (search) {
        const haystack = [
          row.id,
          row.username,
          row.login,
          row.user_id,
          row.remark,
          row.utrNumber,
          row.status,
          row.metadata ? JSON.stringify(row.metadata) : ""
        ]
          .map((value) => String(value || "").toLowerCase())
          .join(" ");
        if (!haystack.includes(search)) {
          return false;
        }
      }

      return true;
    });
  }

  approveDepositTransaction(id) {
    const row = this.findAdminTransactionById(id);
    if (!row || String(row.payment_type).toLowerCase() !== "deposit") {
      return { success: false, status: 404, message: "Deposit request not found." };
    }
    const user = this.findUserByUsername(row.login);
    if (!user) {
      return { success: false, status: 404, message: "User not found." };
    }

    if (!row.walletApplied) {
      user.balance = Number((toNumber(user.balance, 0) + toNumber(row.amount, 0)).toFixed(2));
      row.walletApplied = true;
      this.addStatement(user.username, {
        amount: user.balance,
        remark: `Deposit approved (+${row.amount})`,
        dserver: "d"
      });
    }

    row.status = "Confirm";
    row.updated_at_iso = new Date().toISOString();
    this.save();
    return {
      success: true,
      status: 200,
      message: "Deposit request confirmed successfully."
    };
  }

  processWithdrawTransaction(id) {
    const row = this.findAdminTransactionById(id);
    if (!row || String(row.payment_type).toLowerCase() !== "withdraw") {
      return { success: false, status: 404, message: "Withdraw request not found." };
    }
    row.status = "Process";
    row.updated_at_iso = new Date().toISOString();
    this.save();
    return {
      success: true,
      status: 200,
      message: "Withdraw request moved to process state."
    };
  }

  approveWithdrawTransaction(id, remarks = "") {
    const row = this.findAdminTransactionById(id);
    if (!row || String(row.payment_type).toLowerCase() !== "withdraw") {
      return { success: false, status: 404, message: "Withdraw request not found." };
    }
    if (String(row.status || "").toLowerCase() === "reject") {
      return { success: false, status: 300, message: "Rejected withdraw request cannot be confirmed." };
    }
    const user = this.findUserByUsername(row.login);
    if (!user) {
      return { success: false, status: 404, message: "User not found." };
    }

    const amount = toNumber(row.amount, 0);
    let balanceTouched = false;
    if (!row.walletApplied) {
      if (amount > toNumber(user.balance, 0)) {
        return { success: false, status: 300, message: "Insufficient user balance." };
      }
      user.balance = Number((toNumber(user.balance, 0) - amount).toFixed(2));
      row.walletApplied = true;
      row.walletReverted = false;
      balanceTouched = true;
      this.addStatement(user.username, {
        amount: user.balance,
        remark: `Withdraw approved (-${amount})`,
        dserver: "w"
      });
    }
    if (!balanceTouched && !row.approvalLogged) {
      this.addStatement(user.username, {
        amount: user.balance,
        remark: "Withdraw approved (request settled)",
        dserver: "w"
      });
    }

    row.status = "Confirm";
    row.remark = String(remarks || row.remark || "");
    row.approvalLogged = true;
    row.updated_at_iso = new Date().toISOString();
    this.save();
    return {
      success: true,
      status: 200,
      message: "Withdraw request confirmed successfully."
    };
  }

  rejectTransaction(id, remarks = "") {
    const row = this.findAdminTransactionById(id);
    if (!row) {
      return { success: false, status: 404, message: "Request not found." };
    }
    const paymentType = String(row.payment_type || "").toLowerCase();
    if (paymentType === "withdraw" && row.walletApplied && !row.walletReverted) {
      const user = this.findUserByUsername(row.login);
      if (user) {
        const refundAmount = Number(toNumber(row.amount, 0).toFixed(2));
        user.balance = Number((toNumber(user.balance, 0) + refundAmount).toFixed(2));
        row.walletApplied = false;
        row.walletReverted = true;
        this.addStatement(user.username, {
          amount: user.balance,
          remark: `Withdraw rejected refund (+${refundAmount})`,
          dserver: "w"
        });
      }
    }
    row.status = "Reject";
    row.remark = String(remarks || row.remark || "");
    row.updated_at_iso = new Date().toISOString();
    this.save();
    return {
      success: true,
      status: 200,
      message: "Request rejected successfully."
    };
  }

  addAdminUtrs(utrs = "", type = "", amount = 0) {
    const panel = this.ensureAdminPanelState();
    const values = Array.isArray(utrs)
      ? utrs
      : String(utrs || "")
        .split(/[\s,]+/)
        .filter(Boolean);

    const created = [];
    for (const raw of values) {
      const normalized = String(raw).replace(/\D/g, "");
      if (normalized.length < 12) {
        continue;
      }
      const exists = panel.utrNumbers.some((row) => String(row.utr) === normalized);
      if (exists) {
        continue;
      }
      const nextId = Number(panel.nextUtrId || 1) + 1;
      panel.nextUtrId = nextId;
      created.push({
        id: nextId,
        utr: normalized,
        amount: Number(toNumber(amount, 0).toFixed(2)),
        uploadedBy: String(type || "Manual"),
        used: false,
        status: "Unused",
        created_at: formatDateTime(),
        created_at_iso: new Date().toISOString()
      });
    }

    if (created.length) {
      panel.utrNumbers.unshift(...created);
      this.save();
    }

    return created;
  }

  updateAdminUtrStatus(id, status) {
    const panel = this.ensureAdminPanelState();
    const targetId = Number(id);
    const row = panel.utrNumbers.find((item) => Number(item.id) === targetId);
    if (!row) {
      return { success: false, message: "UTR record not found." };
    }
    const nextStatus = String(status || "").trim() || "Unused";
    row.status = nextStatus;
    row.used = /used|confirm/i.test(nextStatus);
    row.updated_at_iso = new Date().toISOString();
    this.save();
    return { success: true, message: "UTR status updated successfully." };
  }

  findUserByUsername(username) {
    if (!username) {
      return null;
    }
    const key = String(username).trim().toLowerCase();
    return this.state.users[key] || null;
  }

  findUserByLoginHint(loginHint) {
    if (!loginHint) {
      return null;
    }
    const hint = String(loginHint).trim();
    if (!hint) {
      return null;
    }
    const lowered = hint.toLowerCase();

    const exact = this.findUserByUsername(lowered);
    if (exact) {
      return exact;
    }

    this.ensureLoginHintIndex();
    const indexedUsername = String(this.loginHintIndex.get(lowered) || "").trim().toLowerCase();
    if (indexedUsername) {
      const indexed = this.findUserByUsername(indexedUsername);
      if (indexed) {
        return indexed;
      }
    }

    for (const user of Object.values(this.state.users || {})) {
      if (!user) {
        continue;
      }
      const display = String(user.displayName || "").trim().toLowerCase();
      const code = String(user.code || "").trim().toLowerCase();
      if ((display && display === lowered) || (code && code === lowered)) {
        return user;
      }
    }

    const panel = this.ensureAdminPanelState();
    const mappedProfileId = String(panel.usernameToId?.[lowered] || "").trim();
    if (mappedProfileId) {
      const profile = panel.userProfiles?.[mappedProfileId];
      if (profile && profile.username) {
        const mappedUser = this.findUserByUsername(profile.username);
        if (mappedUser) {
          return mappedUser;
        }
      }
    }

    for (const profile of Object.values(panel.userProfiles || {})) {
      if (!profile) {
        continue;
      }
      const profileUsername = String(profile.username || "").trim().toLowerCase();
      const profileName = String(profile.user_name || "").trim().toLowerCase();
      const profileId = String(profile.user_id || "").trim().toLowerCase();
      if (lowered !== profileUsername && lowered !== profileName && lowered !== profileId) {
        continue;
      }
      const mapped = this.findUserByUsername(profileUsername);
      if (mapped) {
        return mapped;
      }
    }

    return null;
  }

  findUserByMobile(mobile) {
    if (!mobile) {
      return null;
    }
    const value = String(mobile).trim();
    for (const user of Object.values(this.state.users)) {
      if (String(user.mobile || "") === value) {
        return user;
      }
    }
    return null;
  }

  createUser({
    username,
    password,
    displayName,
    mobile = "",
    currency = "INR",
    startingBalance = 5000,
    isDemoUser = false
  }) {
    const normalized = String(username || "").trim().toLowerCase();
    if (!normalized) {
      return null;
    }
    if (this.state.users[normalized]) {
      return this.state.users[normalized];
    }

    const createdAt = formatDateTime();
    const demoUser = Boolean(isDemoUser);
    const normalizedStartingBalance = demoUser
      ? this.getDemoUserFixedBalance()
      : toNumber(startingBalance, 0);
    const user = {
      id: makeId("u"),
      username: normalized,
      password: String(password || "123456"),
      displayName: displayName || normalized,
      userType: 1,
      code: String(Math.floor(Math.random() * 9e10 + 1e10)),
      mobile: String(mobile || ""),
      currency: String(currency || "INR").toUpperCase(),
      isDemoUser: demoUser,
      balance: normalizedStartingBalance,
      exposure: 0,
      exposureLimit: 1000,
      active: true,
      createdAt
    };

    this.state.users[normalized] = user;
    this.ensureUserCollections(normalized);
    this.addStatement(normalized, {
      amount: user.balance,
      remark: "User creation",
      dserver: "a"
    });
    this.ensureAdminUserProfile(normalized, "User");
    this.save();
    return user;
  }

  createSession(username) {
    const normalizedUsername = String(username || "").trim().toLowerCase();
    for (const existingToken of Object.keys(this.state.sessions || {})) {
      const existingSession = this.state.sessions[existingToken];
      if (!existingSession) {
        continue;
      }
      const existingUsername = String(existingSession.username || "").trim().toLowerCase();
      if (existingUsername && existingUsername === normalizedUsername) {
        delete this.state.sessions[existingToken];
      }
    }
    const token = makeId("tk");
    this.state.sessions[token] = {
      username: normalizedUsername || String(username || "").trim(),
      createdAt: formatDateTime()
    };
    this.save();
    return token;
  }

  getUserFromToken(token) {
    if (!token) {
      return null;
    }
    const session = this.state.sessions[String(token)] || null;
    if (!session) {
      return null;
    }
    return this.findUserByUsername(session.username);
  }

  resolveUser(payload = {}, token = "", options = {}) {
    const allowPrimaryFallback = options.allowPrimaryFallback !== false;
    const fromToken = this.getUserFromToken(token);
    if (fromToken) {
      return fromToken;
    }

    const requested = pickFirstValue(
      payload,
      ["uname", "username", "user_name", "login", "userId", "userid", "uid", "un", "name", "Name"],
      ""
    );
    if (requested) {
      const found = this.findUserByUsername(requested);
      if (found) {
        return found;
      }
      // Frontend often sends display-name style identifiers in `uname/user_name`.
      // Accept those aliases too so betting/auth flows do not fail after admin-created users login.
      const hinted = this.findUserByLoginHint(requested);
      if (hinted) {
        return hinted;
      }
    }

    if (!allowPrimaryFallback) {
      return null;
    }
    return this.getPrimaryUser();
  }

  login(payload = {}, useDemoFlow = false) {
    let username = pickFirstValue(
      payload,
      ["username", "uname", "user_name", "login", "login_username", "userId", "userid"],
      ""
    );
    const password = pickFirstValue(payload, ["password", "pass", "login_password"], "");
    const invalidLoginResponse = {
      ok: false,
      status: 300,
      payload: { status: 300, msg: "Incorrect ID or Password", data: { login: false } }
    };

    if (useDemoFlow) {
      const requestedDemo = String(username || "").trim().toLowerCase();
      username = this.pickNextDemoLoginUsername(requestedDemo);
    } else {
      username = String(username || "").trim().toLowerCase();
      if (!username || !String(password || "").trim()) {
        return invalidLoginResponse;
      }
    }

    let user = this.findUserByLoginHint(username);
    if (!user) {
      if (!useDemoFlow && AUTO_CREATE_LOCAL_LOGIN_USER) {
        user = this.createUser({
          username,
          password: String(password || "123456"),
          displayName: username,
          mobile: pickFirstValue(payload, ["mobile", "phone"], ""),
          currency: pickFirstValue(payload, ["selectedCurrency", "currency"], "INR"),
          startingBalance: 5000,
          isDemoUser: false
        });
      } else if (!useDemoFlow) {
        return invalidLoginResponse;
      }
      if (!user && useDemoFlow) {
        user = this.createUser({
          username,
          password: password || "123456",
          displayName: username,
          mobile: pickFirstValue(payload, ["mobile", "phone"], ""),
          currency: pickFirstValue(payload, ["selectedCurrency", "currency"], "INR"),
          startingBalance: this.getDemoUserFixedBalance(),
          isDemoUser: true
        });
      }
    } else if (useDemoFlow && !user.isDemoUser) {
      user.isDemoUser = true;
      this.enforceDemoUserBalance(user);
      this.save();
    }

    if (useDemoFlow && user) {
      this.enforceDemoUserBalance(user);
    }

    if (!useDemoFlow && String(user.password || "") !== String(password || "")) {
      return invalidLoginResponse;
    }

    const token = this.createSession(user.username);
    this.recalculateUserExposure(user.username);
    const safeBalance = Number(toNumber(user.balance, 0).toFixed(2));
    const safeExposureRisk = this.normalizeExposureRisk(user.exposure);
    const safeExposure = this.toExposureDisplay(safeExposureRisk);
    const safeExposureLimit = Number(toNumber(user.exposureLimit, 0).toFixed(2));
    const safeAvailableBalance = this.getAvailableBalance(user);
    const openProfitLoss = computeOpenBetsProfitLoss(
      (this.state.bets[user.username] || []).filter((bet) => bet.status === "OPEN")
    ).total;
    return {
      ok: true,
      status: 200,
      token,
      user,
      payload: {
        status: 200,
        msg: "success",
        data: {
          token,
          uname: user.displayName || user.username,
          user_name: user.displayName || user.username,
          username: user.username,
          bal: safeBalance,
          exp: safeExposure,
          exposure: safeExposure,
          exp_pl: openProfitLoss,
          exposure_pl: openProfitLoss,
          available_balance: safeAvailableBalance,
          availableBalance: safeAvailableBalance,
          exposure_limit: safeExposureLimit,
          bcode: user.code,
          ptype: user.userType,
          login: true,
          rdisplay: true,
          ipop: true,
          auth: 0,
          agmno: "",
          agmno1: ""
        }
      }
    };
  }

  logout(token) {
    if (token && this.state.sessions[token]) {
      delete this.state.sessions[token];
      this.save();
    }
  }

  register(payload = {}) {
    const username = pickFirstValue(payload, ["username", "uname"], "");
    if (!username) {
      return { ok: false, payload: { status: 300, msg: "Username is required." } };
    }
    if (this.findUserByUsername(username)) {
      return { ok: false, payload: { status: 300, msg: "Username already exists." } };
    }

    const user = this.createUser({
      username,
      password: pickFirstValue(payload, ["password", "pass"], "123456"),
      displayName: username,
      mobile: pickFirstValue(payload, ["mobile", "phone"], ""),
      currency: pickFirstValue(payload, ["selectedCurrency", "currency"], "INR"),
      startingBalance: 5000,
      isDemoUser: false
    });

    return {
      ok: true,
      payload: {
        status: 200,
        success: true,
        msg: "Registration successful.",
        data: {
          uname: user.displayName
        }
      }
    };
  }

  checkUsername(username) {
    return !this.findUserByUsername(username);
  }

  checkMobile(mobile) {
    return !this.findUserByMobile(mobile);
  }

  updatePassword(token, payload = {}) {
    const user = this.resolveUser(payload, token);
    const nextPassword = pickFirstValue(payload, ["newpassword", "password"], "");
    if (!nextPassword) {
      return { status: 300, msg: "Password is required." };
    }
    user.password = nextPassword;
    this.save();
    return { status: 200, success: true, msg: "Password updated successfully." };
  }

  getUserData(token, payload = {}) {
    const user = this.resolveUser(payload, token, { allowPrimaryFallback: false });
    if (!user) {
      return {
        success: false,
        msg: "Please login again.",
        status: 300,
        data: {}
      };
    }
    this.recalculateUserExposure(user.username);
    const safeBalance = Number(toNumber(user.balance, 0).toFixed(2));
    const safeExposureRisk = this.normalizeExposureRisk(user.exposure);
    const safeExposure = this.toExposureDisplay(safeExposureRisk);
    const safeExposureLimit = Number(toNumber(user.exposureLimit, 0).toFixed(2));
    const safeAvailableBalance = this.getAvailableBalance(user);
    const openProfitLoss = computeOpenBetsProfitLoss(
      (this.state.bets[user.username] || []).filter((bet) => bet.status === "OPEN")
    ).total;
    const regDate = user.createdAt ? formatDateTime(user.createdAt) : formatDateTime();
    return {
      success: true,
      msg: "success",
      status: 200,
      data: {
        bal: safeBalance,
        bcode: user.code,
        exp: safeExposure,
        exposure: safeExposure,
        exp_pl: openProfitLoss,
        exposure_pl: openProfitLoss,
        available_balance: safeAvailableBalance,
        availableBalance: safeAvailableBalance,
        exposure_limit: safeExposureLimit,
        uname: user.displayName || user.username,
        user_name: user.displayName || user.username,
        username: user.username,
        ptype: user.userType,
        isDemoUser: Boolean(user.isDemoUser),
        
        // Dates
        created_at: regDate,
        createdAt: regDate,
        updated_at: formatDateTime(),
        updatedAt: formatDateTime(),
        pdt: regDate,
        date: regDate,
        join_date: regDate,
        last_login: formatDateTime()
      }
    };
  }

  addStatement(
    username,
    {
      amount = 0,
      remark = "",
      marketId = "0",
      gameMarketId = 0,
      dserver = "a",
      gtype = "",
      rpopup = false
    } = {}
  ) {
    this.ensureUserCollections(username);
    this.state.statements[username].push({
      gmid: gameMarketId,
      mid: String(marketId),
      amt: Number(toNumber(amount, 0).toFixed(2)),
      rem: remark,
      edt: formatDateTime(),
      rpopup: Boolean(rpopup),
      dserver,
      gtype
    });
  }

  listStatements(token, payload = {}, mode = "all") {
    const user = this.resolveUser(payload, token, { allowPrimaryFallback: false });
    if (!user) {
      return {
        success: false,
        msg: "Please login again.",
        status: 300,
        data: { t1: { ope: 0 }, t2: [] }
      };
    }
    const rows = [...(this.state.statements[user.username] || [])].reverse();

    const filtered =
      mode === "deposit"
        ? rows.filter((item) => /deposit/i.test(item.rem))
        : mode === "withdraw"
          ? rows.filter((item) => /withdraw/i.test(item.rem))
          : rows;

    const data = filtered.map((row) => {
      const pad = (n) => String(n).padStart(2, "0");
      const d = (() => {
        if (row && row.ts) return new Date(row.ts);
        if (row && row.edt) return parseDateTime(row.edt);
        return new Date();
      })();
      const isoDate = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
      const legacyDate = `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
      const ts = d.getTime();

      return {
        ...row,
        username: user.username,
        uname: user.username,
        login: user.username,
        login_name: user.username,
        display_name: user.displayName || user.username,
        ip: "127.0.0.1",
        ip_address: "127.0.0.1",
        ipAddress: "127.0.0.1",
        ip_addr: "127.0.0.1",

        // Multiple date field support
        date: isoDate,
        placeDate: isoDate,
        created_at: legacyDate,
        createdAt: legacyDate,
        pdt: isoDate,
        isoDate: isoDate,
        legacyDate: legacyDate,
        ts: ts,
        update_time: isoDate,
        updatetime: isoDate,
        pdate: legacyDate,
        ptime: legacyDate,
        placed_at: legacyDate,
        placedAt: legacyDate,
        bet_date: legacyDate,
        betDate: legacyDate,
        place_date: legacyDate,
        matched_at: legacyDate,
        match_date: legacyDate,
        matchDate: legacyDate,
        updatetime_ts: ts,
        edt: legacyDate
      };
    });

    return {
      success: true,
      msg: "success",
      status: 200,
      data: data,
      t1: {
        ope: 0,
        opening_balance: 0
      },
      t2: data,
      opening_balance: 0,
      openingBalance: 0
    };

  }



  listOpenBets(token, payload = {}) {
    const user = this.resolveUser(payload, token, { allowPrimaryFallback: false });
    if (!user) {
      return { success: false, msg: "Please login again.", status: 300 };
    }
    this.recalculateUserExposure(user.username);
    const open = (this.state.bets[user.username] || []).filter((bet) => bet.status === "OPEN");

    if (!open.length) {
      return { success: true, msg: "No Record Found.", status: 200, data: [], exp_pl: 0 };
    }

    const computed = computeOpenBetsProfitLoss(open);
    return {
      success: true,
      msg: "success",
      status: 200,
      exp_pl: computed.total,
      data: computed.rows,
      t1: computed.rows,
      t2: computed.rows

    };
  }

  placeBet(token, payload = {}, source = "regular") {
    const user = this.resolveUser(payload, token, { allowPrimaryFallback: false });
    if (!user) {
      return { success: false, status: 300, msg: "Please login again." };
    }
    this.ensureUserCollections(user.username);


    const amount = toNumber(
      pickFirstValue(
        payload,
        ["amount", "stake", "amt", "sdata", "bet_amount", "stake_amount", "chip", "chips", "value"],
        "0"
      ),
      0
    );
    this.recalculateUserExposure(user.username);
    if (amount <= 0) {
      return { success: false, status: 300, msg: "Invalid stake amount." };
    }

    const rawOdds = pickFirstValue(payload, ["uRate", "urate", "odds", "bhav", "rate", "price"], "0");
    const odds = toNumber(rawOdds, 0);
    const betType = pickFirstValue(payload, ["betType", "btype", "type"], "back");
    const explicitRisk = this.normalizeExposureRisk(
      toNumber(
        pickFirstValue(
          payload,
          ["liability", "risk", "max_loss", "maxLoss", "required_exposure", "requiredExposure"],
          "0"
        ),
        0
      )
    );
    const risk =
      explicitRisk > 0
        ? explicitRisk
        : this.calculateBetRisk(amount, odds, betType, { ...payload, source, rawOdds });
    if (risk <= 0) {
      return { success: false, status: 300, msg: "Invalid stake amount." };
    }
    const availableBalance = this.getAvailableBalance(user);
    if (availableBalance + 1e-9 < risk) {
      return { success: false, status: 300, msg: "Insufficient balance." };
    }
    const mid = pickFirstValue(payload, ["mid", "marketId", "gmid", "oldgmid"], "0");
    const gtype = pickFirstValue(payload, ["gtype", "gType"], "");
    const selectionId = pickFirstValue(payload, ["selectionId", "sid", "selection_id", "runnerId", "runner_id", "s_id"], "");
    let nation = pickFirstValue(
      payload,
      ["nation", "nat", "selection", "selectionName", "selection_name", "sname", "sName", "runnerName", "runner_name", "teamName", "team_name", "runner", "team", "player", "vname", "vName", "name", "n", "s", "item", "label", "sdata", "selection_data"],
      ""
    ).trim();
    const gameUid = pickFirstValue(payload, ["game_uid", "gameid", "game_id", "gid", "event_id", "eventId", "eid", "eId"], "");
    const roundId = pickFirstValue(payload, ["game_round", "round_id", "match_id", "matchid", "rid", "matchId", "event_id", "eventId", "eid", "eId"], "");
    let eventName = sanitizeText(
      pickFirstValue(payload, ["eventName", "event_name", "ename", "matchName", "match_name", "match", "event", "eName", "game_name", "gname"], ""),
      140
    );
    let marketName = sanitizeText(
      pickFirstValue(payload, ["marketName", "mname", "market", "matchType", "marketType", "mName", "bname", "market_name"], ""),
      140
    );

    // Smart Fallbacks for generic names
    if (!nation && /fancy/i.test(marketName)) {
      nation = marketName;
    }
    if (eventName && (eventName.toLowerCase() === "match_odds" || eventName.toLowerCase() === "match odds")) {
       eventName = ""; // Force fallback to other keys if current is generic
    }
    if (!eventName) {
       eventName = pickFirstValue(payload, ["matchName", "match", "event", "mname", "marketName"], "Match");
    }

    const sportId = String(pickFirstValue(payload, ["etid", "sportId", "eventTypeId", "sportsId", "eid"], "4")).trim();
    const eventTypeRaw = pickFirstValue(payload, ["eventType", "sport", "gtype", "gameType", "category", "type"], "match");
    
    const bet = {
      bid: makeId("bet"),
      mid,
      gtype,
      sid: selectionId,
      selectionId: selectionId,
      sportId: sportId,
      eventType: eventTypeRaw,
      nation,
      eventName: eventName || "",
      matchName: eventName || "",
      marketName: marketName || "",
      sportName: sportId == 4 ? "Cricket" : sportId == 1 ? "Soccer" : sportId == 2 ? "Tennis" : "Others",

      game_uid: String(gameUid || "").trim(),
      game_round: String(roundId || "").trim(),
      match_id: String(roundId || gameUid || "").trim(), // Explicit match_id for frontend
      btype: betType,
      urate: odds,
      amount: Number(amount.toFixed(2)),
      risk: risk,
      liability: risk,
      pnl: Number((amount * Math.max(odds - 1, 0)).toFixed(2)),
      status: "OPEN",
      walletDebited: false,
      source,
      edt: formatDateTime()
    };

    this.state.bets[user.username].push(bet);
    this.recalculateUserExposure(user.username);
    this.addStatement(user.username, {
      amount: user.balance,
      remark: `Bet placed (${bet.bid}) | Exposure blocked ${risk.toFixed(2)}`,
      marketId: mid,
      dserver: "b",
      gtype
    });
    this.save();

    const openProfitLoss = computeOpenBetsProfitLoss(
      (this.state.bets[user.username] || []).filter((row) => row.status === "OPEN")
    ).total;

    return {
      success: true,
      status: 200,
      msg: "Bet placed successfully.",
      data: {
        bid: bet.bid,
        bal: user.balance,
        exp: this.toExposureDisplay(user.exposure),
        exp_pl: openProfitLoss,
        available_balance: this.getAvailableBalance(user)
      }
    };
  }

  settleBet(bid = "", isWinning = true) {
    let foundBet = null;
    let foundUsername = null;
    for (const [username, bets] of Object.entries(this.state.bets)) {
      const match = bets.find(b => b.bid === bid);
      if (match) {
        foundBet = match;
        foundUsername = username;
        break;
      }
    }

    if (!foundBet || foundBet.status !== "OPEN") {
      return { success: false, msg: "Bet not found or already settled." };
    }

    const user = this.state.users[foundUsername];
    if (!user) return { success: false, msg: "User not found." };

    const risk = this.resolveBetRisk(foundBet);
    const amount = foundBet.amount;
    const odds = foundBet.urate;
    const profit = isWinning ? (foundBet.btype === "lay" ? amount : amount * (odds - 1)) : 0;
    const loss = !isWinning ? (foundBet.btype === "lay" ? amount * (odds - 1) : amount) : 0;

    foundBet.status = "SETTLED";
    foundBet.settledAt = formatDateTime();
    foundBet.isWinning = isWinning;
    foundBet.pnl = isWinning ? Number(profit.toFixed(2)) : Number((-loss).toFixed(2));
    
    // Update user balance
    if (isWinning) {
      user.balance = Number((user.balance + profit).toFixed(2));
    } else {
      user.balance = Number((user.balance - loss).toFixed(2));
    }
    
    this.recalculateUserExposure(foundUsername);
    this.addStatement(foundUsername, {
      amount: user.balance,
      remark: `Bet Settled (${bid}) | Result: ${isWinning ? "WIN" : "LOSS"} | P/L: ${foundBet.pnl}`,
      marketId: foundBet.mid,
      dserver: "s",
      gtype: foundBet.gtype
    });

    this.save();
    console.log(`[Database] Settle bet ${bid} for ${foundUsername}: ${isWinning ? "WIN" : "LOSS"}`);
    return { success: true, msg: "Bet settled." };
  }


  repeatBet(token, payload = {}) {
    const user = this.resolveUser(payload, token, { allowPrimaryFallback: false });
    if (!user) {
      return { success: false, status: 300, msg: "Please login again." };
    }
    const mid = pickFirstValue(payload, ["mid"], "");
    const gtype = pickFirstValue(payload, ["gtype"], "");
    const bets = this.state.bets[user.username] || [];

    const source = [...bets]
      .reverse()
      .find(
        (item) =>
          item &&
          item.status === "OPEN" &&
          (!mid || String(item.mid) === String(mid)) &&
          (!gtype || String(item.gtype) === String(gtype))
      );

    if (!source) {
      return { success: false, status: 300, msg: "No previous bet found." };
    }

    return this.placeBet(
      token,
      {
        amount: source.amount,
        uRate: source.urate,
        betType: source.btype,
        mid: source.mid,
        gtype: source.gtype,
        nation: source.nation
      },
      "repeat"
    );
  }

  deleteBet(token, payload = {}) {
    const user = this.resolveUser(payload, token, { allowPrimaryFallback: false });
    if (!user) {
      return { success: false, status: 300, msg: "Please login again." };
    }
    this.ensureUserCollections(user.username);
    this.recalculateUserExposure(user.username);

    const type = pickFirstValue(payload, ["type"], "");
    const mid = pickFirstValue(payload, ["mid"], "");
    const gtype = pickFirstValue(payload, ["gtype"], "");
    const bets = this.state.bets[user.username];

    let releasedExposure = 0;
    let refunded = 0;
    if (String(type).toLowerCase() === "all") {
      for (const bet of bets) {
        if (bet.status !== "OPEN") {
          continue;
        }
        if (mid && String(bet.mid) !== String(mid)) {
          continue;
        }
        if (gtype && String(bet.gtype) !== String(gtype)) {
          continue;
        }
        releasedExposure += this.resolveBetRisk(bet);
        const wasWalletDebited = bet.walletDebited === true || typeof bet.walletDebited === "undefined";
        if (wasWalletDebited) {
          refunded += this.normalizeExposureRisk(bet.amount);
        }
        bet.status = "CANCELLED";
        bet.walletDebited = false;
      }
    } else {
      const target = bets.find(
        (bet) =>
          bet.status === "OPEN" &&
          (String(bet.bid) === String(type) || (!type && (!mid || String(bet.mid) === String(mid))))
      );
      if (target) {
        releasedExposure += this.resolveBetRisk(target);
        const wasWalletDebited = target.walletDebited === true || typeof target.walletDebited === "undefined";
        if (wasWalletDebited) {
          refunded += this.normalizeExposureRisk(target.amount);
        }
        target.status = "CANCELLED";
        target.walletDebited = false;
      }
    }

    if (releasedExposure <= 0 && refunded <= 0) {
      return { success: false, status: 300, msg: "No open bet found." };
    }

    if (refunded > 0) {
      user.balance = Number((toNumber(user.balance, 0) + refunded).toFixed(2));
    }
    this.recalculateUserExposure(user.username);
    this.addStatement(user.username, {
      amount: user.balance,
      remark:
        refunded > 0
          ? `Bet cancelled | Exposure released ${releasedExposure.toFixed(2)} | Legacy refund ${refunded.toFixed(2)}`
          : `Bet cancelled | Exposure released ${releasedExposure.toFixed(2)}`,
      dserver: "b",
      gtype
    });
    this.save();

    return {
      success: true,
      status: 200,
      msg: "Bet removed successfully.",
      data: {
        refunded: Number(refunded.toFixed(2)),
        releasedExposure: Number(releasedExposure.toFixed(2)),
        bal: user.balance,
        exp: this.toExposureDisplay(user.exposure),
        exp_pl: computeOpenBetsProfitLoss(
          (this.state.bets[user.username] || []).filter((row) => row.status === "OPEN")
        ).total,
        available_balance: this.getAvailableBalance(user)
      }
    };
  }

  getGameData(token, payload = {}) {
    const user = this.resolveUser(payload, token, { allowPrimaryFallback: true });
    const etid = pickFirstValue(payload, ["etid"], "4");
    const gmid = pickFirstValue(payload, ["gmid", "oldgmid", "mid"], "100101");
    const response = mock.getGameData(etid, gmid);
    const markets = Array.isArray(response) ? response : (response && response.t1) || [];
    if (!user || !Array.isArray(markets) || !markets.length) {
      return response;
    }

    const username = String(user.username || "").trim().toLowerCase();
    const gmidStr = String(gmid).trim();
    const openBets = (this.state.bets[username] || []).filter((bet) => {
      if (!bet || bet.status !== "OPEN") return false;
      const bMid = String(bet.mid || "").trim();
      const bGuid = String(bet.game_uid || "").trim();
      const bRid = String(bet.match_id || bet.game_round || "").trim();
      
      return bMid === gmidStr || 
             bMid.startsWith(gmidStr + ".") || 
             bGuid === gmidStr || 
             bRid === gmidStr;
    });

    for (const market of markets) {
      const marketId = String(market.mid || "");
      const marketBets = openBets.filter((bet) => {
        const betMid = String(bet.mid || "");
        return betMid === marketId ||
          betMid === String(gmid) ||
          (marketId.startsWith(betMid) && betMid.length > 5) ||
          (betMid.startsWith(marketId) && marketId.length > 5) ||
          (market.mname && bet.marketName && market.mname.toLowerCase() === bet.marketName.toLowerCase());
      });

      if (Array.isArray(market.nation)) {
        for (const runner of market.nation) {
          const runnerName = normalizeLabel(runner.nat || runner.nation || "");
          const runnerSid = String(runner.sid || runner.selectionId || "");
          let pl = 0;
          for (const bet of marketBets) {
            const betSelection = normalizeLabel(bet.nation || bet.selectionName || "");
            const betSid = String(bet.sid || bet.selectionId || "");
            const betSide = normalizeBetSide(bet.btype || bet.type || "back");
            const odds = Number(toNumber(bet.urate || bet.odds || bet.rate, 0));
            const stake = Number(toNumber(bet.amount || bet.stake || bet.amt, 0));

            const isMatch = (betSid && runnerSid && betSid === runnerSid) ||
              (betSelection && runnerName && (betSelection === runnerName || runnerName.includes(betSelection) || betSelection.includes(runnerName)));

            if (isMatch) {
              if (betSide === "back") {
                pl += stake * (odds - 1);
              } else {
                pl -= (stake * (odds - 1));
              }
            } else {
              if (betSide === "back") {
                pl -= stake;
              } else {
                pl += stake;
              }
            }
          }
          const finalPl = Number(pl.toFixed(2));
          runner.pl = finalPl;
          runner.exp = finalPl;
          runner.pnl = finalPl;
          runner.amt = finalPl;
          runner.profit_loss = finalPl;
          // Some templates want a sign for zero too
          if (finalPl === 0) {
            runner.pl = "0";
            runner.exp = "0";
          }
        }
      }
    }

    return response;
  }

  applyDeposit(token, payload = {}, source = "Deposit request") {
    const user = this.resolveUser(payload, token, { allowPrimaryFallback: false });
    if (!user) {
      return { success: false, status: 300, msg: "User not found. Please login again." };
    }
    const amount = toNumber(pickFirstValue(payload, ["amount", "amt"], "0"), 0);
    if (amount <= 0) {
      return { success: false, status: 300, msg: "Invalid deposit amount." };
    }
    if (amount < MIN_DEPOSIT_AMOUNT) {
      return {
        success: false,
        status: 300,
        msg: `Minimum deposit amount is ${MIN_DEPOSIT_AMOUNT}.`
      };
    }
    const utrNumber = pickFirstValue(payload, ["utr", "utrNumber", "utr_id"], "");
    const requestRow = this.createAdminTransaction({
      paymentType: "Deposit",
      username: user.username,
      amount,
      status: "Request",
      remark: `${source} pending`,
      utrNumber,
      source
    });
    if (!requestRow) {
      return { success: false, status: 500, msg: "Unable to create deposit request." };
    }
    this.addStatement(user.username, {
      amount: user.balance,
      remark: `${source} pending (+${amount})`,
      dserver: "d"
    });
    this.save();
    return {
      success: true,
      status: 200,
      msg: "Deposit request submitted successfully.",
      data: {
        bal: user.balance,
        exp: this.toExposureDisplay(user.exposure),
        available_balance: this.getAvailableBalance(user),
        requestId: requestRow ? requestRow.id : null
      }
    };
  }

  applyWithdraw(token, payload = {}, source = "Withdraw request") {
    const user = this.resolveUser(payload, token, { allowPrimaryFallback: false });
    if (!user) {
      return { success: false, status: 300, msg: "User not found. Please login again." };
    }
    this.recalculateUserExposure(user.username);
    const amount = toNumber(pickFirstValue(payload, ["amount", "amt"], "0"), 0);
    if (amount <= 0) {
      return { success: false, status: 300, msg: "Invalid withdraw amount." };
    }
    const paymentSettings = this.getPaymentSettings();
    const minAmount = Number(toNumber(paymentSettings?.withdraw?.minAmount, 0));
    const maxAmount = Number(toNumber(paymentSettings?.withdraw?.maxAmount, 0));
    if (minAmount > 0 && amount < minAmount) {
      return {
        success: false,
        status: 300,
        msg: `Minimum withdraw amount is ${minAmount}.`
      };
    }
    if (maxAmount > 0 && amount > maxAmount) {
      return {
        success: false,
        status: 300,
        msg: `Maximum withdraw amount is ${maxAmount}.`
      };
    }
    const availableBalance = this.getAvailableBalance(user);
    if (amount > availableBalance) {
      return { success: false, status: 300, msg: "Insufficient available balance." };
    }

    const selectedDetail = this.resolveWithdrawDetailForUser(user, payload);
    if (!selectedDetail) {
      return {
        success: false,
        status: 300,
        msg: "Please add bank details before requesting withdraw."
      };
    }
    const withdrawSummary = buildWithdrawSummary(selectedDetail);
    const requestRow = this.createAdminTransaction({
      paymentType: "Withdraw",
      username: user.username,
      amount,
      status: "Request",
      remark: withdrawSummary ? `${source} pending | ${withdrawSummary}` : `${source} pending`,
      source,
      metadata: {
        withdrawDetailId: selectedDetail.wid,
        withdrawMethod: selectedDetail.wsid,
        withdrawSummary,
        withdrawDetail: shallowClone(selectedDetail.detail || [])
      }
    });
    if (!requestRow) {
      return { success: false, status: 500, msg: "Unable to create withdraw request." };
    }
    this.addStatement(user.username, {
      amount: user.balance,
      remark: `${source} pending (-${amount})`,
      dserver: "w"
    });
    this.save();
    return {
      success: true,
      status: 200,
      msg: "Withdraw request submitted successfully.",
      data: {
        bal: user.balance,
        exp: this.toExposureDisplay(user.exposure),
        available_balance: this.getAvailableBalance(user),
        requestId: requestRow ? requestRow.id : null,
        withdrawDetailId: selectedDetail ? selectedDetail.wid : null
      }
    };
  }

  getUserButtonList(type = "D") {
    const key = String(type || "D").toUpperCase() === "W" ? "W" : "D";
    const defaults =
      key === "W" ? [100, 500, 1000, 2000, 5000] : [100, 200, 500, 1000, 2000];
    const normalized = normalizeStakeButtons(this.state.userButtons[key], defaults);
    this.state.userButtons[key] = normalized;
    return {
      success: true,
      status: 200,
      msg: "success",
      data: {
        t1: shallowClone(normalized),
        t2: []
      }
    };
  }

  normalizeDetailInput(detailInput = []) {
    let rows = detailInput;
    if (typeof rows === "string") {
      try {
        rows = JSON.parse(rows);
      } catch {
        rows = [];
      }
    }
    if (!Array.isArray(rows)) {
      rows = [];
    }
    return rows
      .map((row) => {
        if (!row || typeof row !== "object") {
          return null;
        }
        const label = String(row.label || row.key || "").trim();
        const value = String(row.value || "").trim();
        const type = String(row.type || "text").trim() || "text";
        if (!label) {
          return null;
        }
        return {
          label,
          key: label,
          value,
          type,
          caps: Boolean(row.caps)
        };
      })
      .filter(Boolean);
  }

  getUserWithdrawDetails(userOrLogin = "") {
    const login =
      typeof userOrLogin === "object" && userOrLogin
        ? String(userOrLogin.username || "").trim().toLowerCase()
        : String(userOrLogin || "").trim().toLowerCase();
    if (!login) {
      return [];
    }
    return (this.state.withdraw.details || []).filter(
      (row) => String(row.login || row.username || "").trim().toLowerCase() === login
    );
  }

  normalizeWithdrawDetailPayload(payload = {}, wsid = 1) {
    const parsedRows = this.normalizeDetailInput(payload.detail).map((row) => ({
      label: row.label,
      value: row.value
    }));
    const fields = extractWithdrawFields(parsedRows, payload);
    const normalizedRows = buildWithdrawDetailRows(wsid, fields);
    if (!normalizedRows.length) {
      return { rows: [], fields };
    }
    return {
      rows: normalizedRows,
      fields
    };
  }

  resolveWithdrawDetailForUser(user, payload = {}) {
    const rows = this.getUserWithdrawDetails(user).sort(
      (left, right) => Number(toNumber(right.wid, 0)) - Number(toNumber(left.wid, 0))
    );
    if (!rows.length) {
      return null;
    }

    const explicitDetailId = pickFirstValue(
      payload,
      ["withdraw_detail_id", "detail_id", "bank_id", "withdraw_bank_id", "wdid"],
      ""
    );
    if (explicitDetailId) {
      const target = rows.find((row) => String(row.wid) === String(explicitDetailId));
      if (target) {
        return target;
      }
    }

    const wsid = Number(toNumber(pickFirstValue(payload, ["wsid", "method_id"], 0), 0));
    if (wsid > 0) {
      const targetByMethod = rows.find((row) => Number(toNumber(row.wsid, 0)) === wsid);
      if (targetByMethod) {
        return targetByMethod;
      }
    }

    return rows[0];
  }

  getWithdrawPaymentTypes() {
    return {
      success: true,
      status: 200,
      msg: "success",
      data: {
        t1: shallowClone(this.state.withdraw.paymentTypes || [])
      }
    };
  }

  getWithdrawTypes() {
    return {
      success: true,
      status: 200,
      msg: "success",
      data: {
        t1: shallowClone(this.state.withdraw.types || [])
      }
    };
  }

  getWithdrawForm(payload = {}) {
    const wid = String(pickFirstValue(payload, ["wid"], "1"));
    const formRows = shallowClone(
      this.state.withdraw.forms[wid] || this.state.withdraw.forms["1"] || []
    );
    return {
      success: true,
      status: 200,
      msg: "success",
      data: {
        t1: [
          {
            wid: Number(wid) || 1,
            detail: formRows
          }
        ]
      }
    };
  }

  listWithdrawBankDetails(token = "", payload = {}) {
    const user = this.resolveUser(payload, token, { allowPrimaryFallback: false });
    if (!user) {
      return {
        success: false,
        status: 300,
        msg: "Please login to view withdraw details.",
        data: { t1: [] }
      };
    }
    return {
      success: true,
      status: 200,
      msg: "success",
      data: {
        t1: shallowClone(this.getUserWithdrawDetails(user))
      }
    };
  }

  addWithdrawBankDetail(token = "", payload = {}) {
    const user = this.resolveUser(payload, token, { allowPrimaryFallback: false });
    if (!user) {
      return { success: false, status: 300, msg: "Please login before adding bank details." };
    }
    const wsid = Number(pickFirstValue(payload, ["wid"], "1")) || 1;
    const normalized = this.normalizeWithdrawDetailPayload(payload, wsid);
    if (!normalized.rows.length) {
      return { success: false, status: 300, msg: "Invalid details." };
    }

    this.state.withdraw.nextDetailId += 1;
    const entry = {
      wsid,
      wid: this.state.withdraw.nextDetailId,
      login: String(user.username || "").trim().toLowerCase(),
      username: String(user.displayName || user.username || "").trim(),
      created_at: formatDateTime(),
      detail: normalized.rows
    };
    this.state.withdraw.details.unshift(entry);
    this.save();
    return {
      success: true,
      status: 200,
      msg: "Detail added successfully.",
      data: {
        wid: entry.wid
      }
    };
  }

  listSupagoPaymentList() {
    return shallowClone(this.state.supago.paymentMethods || []);
  }

  getSupagoPaymentType(payload = {}) {
    const id = pickFirstValue(payload, ["id"], "");
    const rows = this.state.supago.paymentMethods || [];
    const selected =
      rows.find((item) => String(item.pmuniqueid) === String(id)) || rows[0] || null;
    if (!selected) {
      return { success: false, status: 300, msg: "Payment type unavailable." };
    }
    return {
      success: true,
      status: 200,
      msg: "success",
      data: {
        puid: 0,
        url: "",
        t1: shallowClone(selected)
      }
    };
  }

  listSupagoWithdrawDetails() {
    return {
      success: true,
      status: 200,
      msg: "success",
      data: {
        t1: shallowClone(this.state.supago.withdrawMethods || []),
        t2: shallowClone(this.state.supago.withdrawDetails || [])
      }
    };
  }

  addSupagoWithdrawDetail(payload = {}) {
    const pmmid = pickFirstValue(payload, ["wid"], "");
    const inputRows = this.normalizeDetailInput(payload.detail).map((row) => ({
      key: row.key,
      value: row.value
    }));

    if (!pmmid || !inputRows.length) {
      return { success: false, status: 300, msg: "Invalid details." };
    }

    const meta =
      (this.state.supago.withdrawMethods || []).find(
        (row) => String(row.pmmid) === String(pmmid)
      ) || {};

    const nextId = Number(this.state.supago.nextWithdrawDetailId || 1);
    this.state.supago.nextWithdrawDetailId = nextId + 1;
    this.state.supago.withdrawDetails.push({
      pmmid: String(pmmid),
      pmuniqueid: `wd_${nextId}`,
      paymenttype: String(meta.paymenttype || "bank"),
      accjson: JSON.stringify(inputRows),
      cryptorate: 0
    });
    this.save();
    return { success: true, status: 200, msg: "Detail added successfully." };
  }

  deleteSupagoWithdrawDetail(payload = {}) {
    const id = pickFirstValue(payload, ["id"], "");
    if (!id) {
      return { success: false, status: 300, msg: "Invalid request." };
    }
    const before = this.state.supago.withdrawDetails.length;
    this.state.supago.withdrawDetails = this.state.supago.withdrawDetails.filter(
      (row) => String(row.pmuniqueid) !== String(id)
    );
    if (this.state.supago.withdrawDetails.length === before) {
      return { success: false, status: 300, msg: "Record not found." };
    }
    this.save();
    return { success: true, status: 200, msg: "Detail deleted successfully." };
  }

  listBookData(token, payload = {}) {
    const user = this.resolveUser(payload, token, { allowPrimaryFallback: false });
    if (!user) {
      return { success: false, status: 300, msg: "Please login again.", data: { bet: [], fancy: [], sportbet: [] } };
    }
    this.recalculateUserExposure(user.username);
    const open = (this.state.bets[user.username] || []).filter((bet) => bet.status === "OPEN");
    const requestedMid = String(
      pickFirstValue(payload, ["mid", "gmid", "oldgmid", "marketId"], "")
    ).trim();
    const scopedOpen = requestedMid
      ? open.filter((bet) => {
          if (!bet) return false;
          const mid = String(bet.mid != null ? bet.mid : "").trim();
          const guid = String(bet.game_uid || "").trim();
          const rId = String(bet.match_id || bet.game_round || "").trim();
          
          return mid === requestedMid || 
                 mid.startsWith(requestedMid + ".") || 
                 guid === requestedMid || 
                 rId === requestedMid;
        })
      : open;
    const rows = scopedOpen.map((bet, idx) => {
      const amount = Number(
        toNumber(
          bet && (bet.amount != null ? bet.amount : bet.risk != null ? bet.risk : bet.liability),
          0
        ).toFixed(2)
      );
      return {
        ...(bet ? shallowClone(bet) : {}),
        sid: String(idx + 1),
        subid: String(idx + 1),
        mid: String(bet && bet.mid != null ? bet.mid : requestedMid || "0"),
        nat: String(bet && (bet.nation || bet.nat || bet.selectionName || "")),
        nation: String(bet && (bet.nation || bet.nat || bet.selectionName || "")),
        amt: amount,
        sdata: amount,
        btype: String(bet && (bet.btype || bet.betType || "back")),
        urate: Number(toNumber(bet && (bet.urate || bet.odds || bet.rate), 0).toFixed(2))
      };
    });

    // Some legacy templates index directly into [0] and [1] book rows.
    // Keep the shape safe when only one open row exists for the market.
    if (rows.length === 1) {
      const current = rows[0];
      rows.push({
        sid: "2",
        subid: "2",
        mid: String(current.mid || requestedMid || "0"),
        nat: "",
        nation: "",
        amt: 0,
        sdata: 0,
        btype: current.btype === "lay" ? "back" : "lay",
        urate: 0
      });
    }

    const sportbet = rows.map((row, idx) => ({
      sid: String(idx + 1),
      subid: String(idx + 1),
      mid: String(row.mid || requestedMid || "0"),
      amt: Number(toNumber(row.amt, 0).toFixed(2)),
      sdata: Number(toNumber(row.sdata, row.amt).toFixed(2)),
      btype: String(row.btype || "back"),
      urate: Number(toNumber(row.urate, 0).toFixed(2))
    }));
    const matchedBets = rows.map((row) => ({
      ...row,
      sdata: Array.isArray(row.sdata) ? row.sdata : null
    }));
    return {
      success: true,
      status: 200,
      msg: "success",
      data: {
        bet: shallowClone(matchedBets),
        fancy: [],
        sportbet,
        book: shallowClone(rows)
      }
    };
  }

  listMarketAnalysis(token, payload = {}) {
    const user = this.resolveUser(payload, token, { allowPrimaryFallback: false });
    if (!user) {
      return { success: false, status: 300, msg: "Please login again.", data: { t1: [] } };
    }
    this.recalculateUserExposure(user.username);
    const open = (this.state.bets[user.username] || []).filter((bet) => bet.status === "OPEN");
    return {
      success: true,
      status: 200,
      msg: "success",
      data: {
        t1: open.map((bet) => ({
          ename: bet.nation || "Market",
          etype: bet.gtype || "Sports",
          mid: bet.mid,
          amt: bet.amount,
          urate: bet.urate
        }))
      }
    };
  }

  listSupagoStatements(token, payload = {}, mode = "deposit") {
    const statementMode = mode === "withdraw" ? "withdraw" : "deposit";
    const rows = this.listStatements(token, payload, statementMode);
    const list = Array.isArray(rows?.data?.t2) ? rows.data.t2 : [];

    return {
      success: true,
      status: 200,
      msg: "success",
      data: list.map((row, index) => ({
        txnid: `TXN${index + 1}`,
        edt: row.edt,
        rem: row.rem,
        amt: row.amt,
        status: "SUCCESS",
        accjson: JSON.stringify([
          {
            key: mode === "withdraw" ? "Withdraw Method" : "Payment Method",
            value: mode === "withdraw" ? "BANK" : "UPI"
          }
        ])
      }))
    };
  }

  getCurrencyList() {
    return [
      { currency: "INR", name: "Indian Rupee", symbol: "Rs" },
      { currency: "USD", name: "US Dollar", symbol: "$" }
    ];
  }

  getPaymentSettings() {
    return shallowClone(this.state.paymentSettings || buildDefaultPaymentSettings());
  }

  updatePaymentSettings(payload = {}) {
    let input = payload;
    if (payload && typeof payload.data === "string") {
      try {
        const parsed = JSON.parse(payload.data);
        if (parsed && typeof parsed === "object") {
          input = { ...payload, ...parsed };
        }
      } catch { }
    }

    const current = this.getPaymentSettings();
    const next = {
      deposit: { ...current.deposit },
      withdraw: { ...current.withdraw }
    };

    if (input.deposit && typeof input.deposit === "object") {
      next.deposit = {
        ...next.deposit,
        ...input.deposit
      };
    }
    if (input.withdraw && typeof input.withdraw === "object") {
      next.withdraw = {
        ...next.withdraw,
        ...input.withdraw
      };
    }

    if (typeof input.upiId === "string") {
      next.deposit.upiId = input.upiId;
    }
    if (typeof input.upiHolderName === "string") {
      next.deposit.upiHolderName = input.upiHolderName;
    } else if (typeof input.upi_holder_name === "string") {
      next.deposit.upiHolderName = input.upi_holder_name;
    }
    if (typeof input.qrImage === "string") {
      next.deposit.qrImage = input.qrImage;
    } else if (typeof input.qrImageData === "string") {
      next.deposit.qrImage = input.qrImageData;
    } else if (typeof input.qr_image_data === "string") {
      next.deposit.qrImage = input.qr_image_data;
    }
    if (typeof input.amount !== "undefined") {
      next.deposit.amount = input.amount;
    }
    if (typeof input.depositAmount !== "undefined") {
      next.deposit.amount = input.depositAmount;
    }
    if (typeof input.depositNote === "string") {
      next.deposit.note = input.depositNote;
    }
    if (typeof input.withdrawNote === "string") {
      next.withdraw.note = input.withdrawNote;
    }
    if (typeof input.processingTime === "string") {
      next.withdraw.processingTime = input.processingTime;
    }
    if (typeof input.minAmount !== "undefined") {
      const min = toNumber(input.minAmount, next.withdraw.minAmount);
      next.withdraw.minAmount = min > 0 ? min : next.withdraw.minAmount;
    }
    if (typeof input.maxAmount !== "undefined") {
      const max = toNumber(input.maxAmount, next.withdraw.maxAmount);
      next.withdraw.maxAmount = max > 0 ? max : next.withdraw.maxAmount;
    }

    next.deposit.upiId = String(next.deposit.upiId || "").trim();
    next.deposit.upiHolderName = String(next.deposit.upiHolderName || "").trim();
    next.deposit.qrImage = String(next.deposit.qrImage || "").trim() || "/local/payment-qr.svg";
    next.deposit.amount = toNumber(next.deposit.amount, 100);
    if (!Number.isFinite(next.deposit.amount) || next.deposit.amount <= 0) {
      next.deposit.amount = 100;
    }
    next.deposit.note = String(next.deposit.note || "").trim();
    next.withdraw.processingTime = String(next.withdraw.processingTime || "").trim();
    next.withdraw.note = String(next.withdraw.note || "").trim();
    next.withdraw.minAmount = toNumber(next.withdraw.minAmount, 500);
    next.withdraw.maxAmount = toNumber(next.withdraw.maxAmount, 100000);

    this.state.paymentSettings = next;
    this.save();
    return {
      success: true,
      status: 200,
      msg: "Payment settings updated.",
      data: this.getPaymentSettings()
    };
  }

  savePaymentUtr(token = "", payload = {}) {
    const user = this.resolveUser(payload, token, { allowPrimaryFallback: false });
    if (!user) {
      return {
        success: false,
        status: 401,
        msg: "Please login again before submitting UTR."
      };
    }
    const utr = String(pickFirstValue(payload, ["utr", "utrNumber", "utr_id"], ""))
      .replace(/\D/g, "")
      .slice(0, 12);
    if (!/^\d{12}$/.test(utr)) {
      return { success: false, status: 300, msg: "UTR must be exactly 12 digits." };
    }

    if (!Array.isArray(this.state.paymentUtrs)) {
      this.state.paymentUtrs = [];
    }
    const exists = this.state.paymentUtrs.some((row) => String(row.utr || "") === utr);
    if (exists) {
      return { success: false, status: 300, msg: "This UTR is already submitted." };
    }

    const amount = toNumber(pickFirstValue(payload, ["amount", "amt"], "0"), 0);
    if (amount < MIN_DEPOSIT_AMOUNT) {
      return {
        success: false,
        status: 300,
        msg: `Minimum deposit amount is ${MIN_DEPOSIT_AMOUNT}.`
      };
    }
    const orderId = String(pickFirstValue(payload, ["orderId", "order_id"], makeId("ord")));
    const upiId = String(pickFirstValue(payload, ["upiId", "upi_id"], ""));
    const record = {
      id: makeId("utr"),
      utr,
      amount: Number.isFinite(amount) ? Number(amount.toFixed(2)) : 0,
      orderId,
      upiId,
      username: user ? user.username : "",
      status: "PENDING",
      createdAt: formatDateTime()
    };

    this.state.paymentUtrs.unshift(record);
    this.createAdminTransaction({
      paymentType: "Deposit",
      username: user ? user.username : "",
      amount,
      status: "Request",
      remark: "Deposit UTR submitted. Awaiting owner approval.",
      utrNumber: utr,
      source: "local-payment-utr",
      metadata: {
        orderId,
        upiId
      }
    });
    if (user) {
      this.addStatement(user.username, {
        amount: user.balance,
        remark: `Deposit UTR submitted (${utr})`,
        dserver: "d"
      });
    }
    this.save();
    return {
      success: true,
      status: 200,
      msg: "UTR submitted successfully.",
      data: {
        id: record.id,
        utr: record.utr,
        orderId: record.orderId,
        status: record.status
      }
    };
  }

  settleOpenBetsFromCallback(user, payload = {}, serialNumber = "", betAmount = 0, winAmount = 0, isVoid = false) {
    if (!user || typeof user !== "object") {
      return { settledCount: 0, releasedExposure: 0, settledBetIds: [] };
    }
    this.ensureUserCollections(user.username);
    const bets = this.state.bets[user.username] || [];
    const openBets = bets.filter((bet) => bet && String(bet.status || "").toUpperCase() === "OPEN");
    if (!openBets.length) {
      return { settledCount: 0, releasedExposure: 0, settledBetIds: [] };
    }

    const callbackGameUid = String(
      pickFirstValue(payload, ["game_uid", "gameid", "gid", "provider_game_uid"], "")
    )
      .trim()
      .toLowerCase();
    const callbackMid = String(pickFirstValue(payload, ["mid", "marketId", "gmid", "oldgmid"], ""))
      .trim()
      .toLowerCase();
    const callbackRound = String(pickFirstValue(payload, ["game_round", "round_id"], "")).trim();
    const callbackBetAmount = this.normalizeExposureRisk(betAmount);

    let candidates = openBets;
    if (callbackGameUid) {
      const matchedByGame = openBets.filter((bet) => {
        const gameUid = String(
          pickFirstValue(bet, ["game_uid", "gid", "provider_game_uid"], "")
        )
          .trim()
          .toLowerCase();
        return gameUid && gameUid === callbackGameUid;
      });
      if (matchedByGame.length) {
        candidates = matchedByGame;
      }
    }
    if (callbackMid) {
      const matchedByMarket = (candidates || openBets).filter(
        (bet) => String(bet.mid || "").trim().toLowerCase() === callbackMid
      );
      if (matchedByMarket.length) {
        candidates = matchedByMarket;
      }
    }
    if (callbackBetAmount > 0) {
      const matchedByAmount = (candidates || openBets).filter((bet) => {
        const stake = this.normalizeExposureRisk(bet.amount);
        const liability = this.resolveBetRisk(bet);
        return (
          Math.abs(stake - callbackBetAmount) <= 0.01 || Math.abs(liability - callbackBetAmount) <= 0.01
        );
      });
      if (matchedByAmount.length) {
        candidates = matchedByAmount;
      }
    }
    if (!candidates || !candidates.length) {
      candidates = openBets;
    }

    const selected = [];
    let remaining = callbackBetAmount;
    for (const bet of candidates) {
      if (!bet || String(bet.status || "").toUpperCase() !== "OPEN") {
        continue;
      }
      selected.push(bet);
      if (callbackBetAmount <= 0) {
        break;
      }
      remaining -= this.normalizeExposureRisk(bet.amount);
      if (remaining <= 0.01) {
        break;
      }
    }
    if (!selected.length && openBets.length) {
      selected.push(openBets[0]);
    }

    let releasedExposure = 0;
    const settledBetIds = [];
    const settledAt = formatDateTime();
    for (const bet of selected) {
      if (!bet || String(bet.status || "").toUpperCase() !== "OPEN") {
        continue;
      }
      releasedExposure += this.resolveBetRisk(bet);
      bet.status = isVoid ? "VOID" : "SETTLED";
      bet.walletDebited = false;
      bet.settledAt = settledAt;
      bet.settlement_result = isVoid ? "VOID" : winAmount > 0 ? "WIN" : "LOSS";
      bet.callback_serial_number = String(serialNumber || "").trim();
      bet.callback_game_round = callbackRound;
      bet.callback_bet_amount = Number(this.normalizeExposureRisk(betAmount).toFixed(2));
      bet.callback_win_amount = Number(this.normalizeExposureRisk(winAmount).toFixed(2));
      settledBetIds.push(String(bet.bid || ""));
    }

    return {
      settledCount: settledBetIds.length,
      releasedExposure: Number(releasedExposure.toFixed(2)),
      settledBetIds
    };
  }

  ensureProviderCallbackState() {
    this.state.providerCallbacks =
      this.state.providerCallbacks && typeof this.state.providerCallbacks === "object"
        ? this.state.providerCallbacks
        : { processed: {}, rows: [] };
    this.state.providerCallbacks.processed =
      this.state.providerCallbacks.processed && typeof this.state.providerCallbacks.processed === "object"
        ? this.state.providerCallbacks.processed
        : {};
    this.state.providerCallbacks.rows = Array.isArray(this.state.providerCallbacks.rows)
      ? this.state.providerCallbacks.rows
      : [];
    return this.state.providerCallbacks;
  }

  applyProviderCallback(payload = {}) {
    const callbacks = this.ensureProviderCallbackState();
    const serialNumber = sanitizeText(
      pickFirstValue(payload, ["serial_number", "serialNumber", "txnid", "txn_id"], ""),
      120
    );
    if (!serialNumber) {
      return { success: false, status: 300, message: "serial_number is required." };
    }

    if (callbacks.processed[serialNumber]) {
      return {
        success: true,
        status: 200,
        duplicate: true,
        message: "Duplicate callback ignored."
      };
    }

    const memberAccount = String(
      sanitizeText(
        pickFirstValue(payload, ["member_account", "member", "username", "uname", "user_id"], ""),
        64
      )
    )
      .trim()
      .toLowerCase();
    if (!memberAccount) {
      return { success: false, status: 300, message: "member_account is required." };
    }

    const user = this.findUserByLoginHint(memberAccount);
    if (!user) {
      return {
        success: false,
        status: 404,
        message: `User not found for member_account ${memberAccount}.`
      };
    }

    const oldBalance = Number(toNumber(user.balance, 0).toFixed(2));
    const betAmount = Math.max(0, Number(toNumber(payload.bet_amount, 0).toFixed(2)));
    const winAmount = Math.max(0, Number(toNumber(payload.win_amount, 0).toFixed(2)));
    const settlementStatus = String(
      pickFirstValue(payload, ["status", "result", "settlement_status"], "")
    )
      .trim()
      .toLowerCase();
    const isVoid =
      settlementStatus === "void" ||
      settlementStatus === "cancel" ||
      settlementStatus === "cancelled" ||
      settlementStatus === "canceled" ||
      settlementStatus === "refund" ||
      settlementStatus === "refunded" ||
      Number(toNumber(pickFirstValue(payload, ["is_void", "isVoid", "void"], 0), 0)) === 1;

    const settledMeta = this.settleOpenBetsFromCallback(
      user,
      payload,
      serialNumber,
      betAmount,
      winAmount,
      isVoid
    );
    let nextBalance = isVoid
      ? oldBalance
      : Number((oldBalance - betAmount + winAmount).toFixed(2));
    if (!Number.isFinite(nextBalance)) {
      nextBalance = oldBalance;
    }
    if (nextBalance < 0) {
      nextBalance = 0;
    }

    user.balance = nextBalance;
    if (this.enforceDemoUserBalance(user)) {
      nextBalance = Number(toNumber(user.balance, oldBalance).toFixed(2));
    }
    this.recalculateUserExposure(user.username);
    const record = {
      id: makeId("pcb"),
      serial_number: serialNumber,
      game_round: sanitizeText(pickFirstValue(payload, ["game_round", "round_id"], ""), 120),
      member_account: user.username,
      game_uid: sanitizeText(pickFirstValue(payload, ["game_uid", "gameid"], ""), 120),
      bet_amount: betAmount,
      win_amount: winAmount,
      ggr_amount: Number(toNumber(payload.ggr_amount, 0).toFixed(2)),
      old_balance: oldBalance,
      new_balance: nextBalance,
      settled_count: settledMeta.settledCount,
      released_exposure: settledMeta.releasedExposure,
      currency: sanitizeText(pickFirstValue(payload, ["currency"], "INR"), 10) || "INR",
      callback_timestamp: String(
        pickFirstValue(payload, ["timestamp"], String(Date.now()))
      ).trim(),
      processed_at: new Date().toISOString()
    };

    callbacks.rows.unshift(record);
    callbacks.processed[serialNumber] = {
      id: record.id,
      processed_at: record.processed_at
    };
    if (callbacks.rows.length > 5000) {
      callbacks.rows.length = 5000;
    }

    this.addStatement(user.username, {
      amount: user.balance,
      remark: isVoid
        ? `Provider callback void | Exposure released ${settledMeta.releasedExposure.toFixed(2)}`
        : `Provider callback bet ${betAmount} / win ${winAmount} | Exposure released ${settledMeta.releasedExposure.toFixed(2)}`,
      dserver: "b"
    });
    this.save();

    return {
      success: true,
      status: 200,
      message: "Success",
      duplicate: false,
      data: {
        serial_number: serialNumber,
        member_account: user.username,
        old_balance: oldBalance,
        new_balance: nextBalance,
        exp: this.toExposureDisplay(user.exposure),
        available_balance: this.getAvailableBalance(user),
        settled_count: settledMeta.settledCount
      }
    };
  }

  saveSubscription(payload = {}) {
    const token = pickFirstValue(payload, ["token", "endpoint"], "");
    if (!token) {
      return { status: 300, msg: "token is required", data: null };
    }
    if (this.state.subscriptions.includes(token)) {
      return { status: 200, msg: "token already exist", data: null };
    }
    this.state.subscriptions.push(token);
    this.save();
    return { status: 200, msg: "token saved", data: null };
  }

  updateButtonSettings(payload = {}, type = "game") {
    this.state.buttonSettings[type] = {
      ...this.state.buttonSettings[type],
      ...payload
    };
    this.save();
  }

  getAuthState() {
    return {
      status: 200,
      msg: "success",
      data: Number(this.state.auth.type || 0)
    };
  }

  enableAuth(mode = "app", payload = {}) {
    const secret = Math.random().toString(36).slice(2, 8).toUpperCase();
    this.state.auth = {
      type: mode === "tele" ? 2 : 1,
      enabled: true,
      secret
    };
    this.save();
    return {
      status: 200,
      msg: "success",
      data: secret
    };
  }

  disableAuth() {
    this.state.auth = {
      type: 0,
      enabled: false,
      secret: ""
    };
    this.save();
    return {
      status: 200,
      msg: "success",
      data: ""
    };
  }
}

module.exports = {
  LocalDatabase
};




