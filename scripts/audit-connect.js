const fs = require("fs");
const path = require("path");

const { resolveStaticPath, resolveForcedFile } = require("../backend/static-store");
const { API_FRONT_DIR, MIRROR_HOST_TO_DIR, ROOT_DIR } = require("../backend/config");

const ROOT = path.resolve(__dirname, "..");
const SCAN_DIRS = ["site", "front", "theme"].map((dir) => path.join(ROOT, dir));
const TEXT_EXTENSIONS = new Set([
  ".html",
  ".htm",
  ".js",
  ".css",
  ".json",
  ".txt",
  ".svg",
  ".xml",
  ".map"
]);

const API_REGEX = /\/api\/front\/[a-zA-Z0-9_/-]+(?:\.html)?/g;
const HOST_REGEX =
  /\/(?:api\.ipify\.org|cdn\.jsdelivr\.net|cdnjs\.cloudflare\.com|code\.jquery\.com|dataobj\.ecoassetsservice\.com|fonts\.googleapis\.com|fonts\.gstatic\.com|sitethemedata\.com|versionobj\.ecoassetsservice\.com|wver\.sprintstaticdata\.com|www\.google\.com|www\.gstatic\.com|_DataURI)(?:\/[A-Za-z0-9._~%+\-@=,:;!?&()[\]{}$*\/]*|\b)/g;

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
    if (TEXT_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
      out.push(abs);
    }
  }
  return out;
}

function normalizeApiStem(endpoint) {
  return endpoint.endsWith(".html") ? endpoint.slice(0, -5) : endpoint;
}

function buildSnapshotSet() {
  const set = new Set();
  const stack = [API_FRONT_DIR];
  while (stack.length) {
    const dir = stack.pop();
    if (!fs.existsSync(dir)) {
      continue;
    }
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const abs = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        stack.push(abs);
        continue;
      }
      if (!entry.name.endsWith(".html")) {
        continue;
      }
      const rel = path.relative(API_FRONT_DIR, abs).replace(/\\/g, "/");
      set.add(`/api/front/${rel.replace(/\.html$/, "")}`);
    }
  }
  return set;
}

async function checkEndpoints(endpoints) {
  const loginRes = await fetch("http://127.0.0.1:3000/api/front/local-login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: "jashxn", password: "jashan983jk" })
  });
  const loginJson = await loginRes.json().catch(() => ({}));
  const token = loginJson && loginJson.data && loginJson.data.token ? loginJson.data.token : "";

  const payload = {
    token,
    uname: "jashxn",
    username: "jashxn",
    password: "jashan983jk",
    amount: 100,
    btype: "D",
    gType: "LC",
    mid: "1",
    sid: "1",
    wid: "1"
  };

  const bad = [];
  for (const endpoint of endpoints) {
    try {
      const res = await fetch(`http://127.0.0.1:3000${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(payload)
      });
      const body = await res.text();
      let parsed = null;
      try {
        parsed = JSON.parse(body);
      } catch {
        parsed = null;
      }

      if (![200, 300, 204].includes(res.status)) {
        bad.push({
          endpoint,
          status: res.status,
          reason: "unexpected_http_status"
        });
        continue;
      }

      if (!parsed || typeof parsed !== "object") {
        bad.push({
          endpoint,
          status: res.status,
          reason: "non_json_response"
        });
      }
    } catch (error) {
      bad.push({
        endpoint,
        status: 0,
        reason: String(error && error.message ? error.message : error)
      });
    }
  }
  return bad;
}

async function main() {
  const files = SCAN_DIRS.flatMap((dir) => walkFiles(dir));
  const endpoints = new Set();
  const hostPaths = new Set();

  for (const file of files) {
    const source = fs.readFileSync(file, "utf8");
    const apiMatches = source.match(API_REGEX) || [];
    for (const match of apiMatches) {
      endpoints.add(normalizeApiStem(match));
    }
    const hostMatches = source.match(HOST_REGEX) || [];
    for (const match of hostMatches) {
      hostPaths.add(match.split("?")[0].replace(/[\"'`)]$/, ""));
    }
  }

  const mapMissing = [];
  for (const [host, dirName] of MIRROR_HOST_TO_DIR.entries()) {
    if (!fs.existsSync(path.join(ROOT_DIR, dirName))) {
      mapMissing.push({ host, dirName });
    }
  }

  const hostMissing = [];
  for (const hostPath of hostPaths) {
    const forced = resolveForcedFile(hostPath);
    const resolved = forced ? forced.filePath : resolveStaticPath(hostPath);
    if (!resolved) {
      hostMissing.push(hostPath);
    }
  }

  const snapshots = buildSnapshotSet();
  const endpointWithoutSnapshot = [...endpoints].filter((ep) => !snapshots.has(ep));
  const endpointErrors = await checkEndpoints([...endpoints].sort());

  const report = {
    scannedFiles: files.length,
    endpointCount: endpoints.size,
    endpointErrors: endpointErrors.length,
    hostPathCount: hostPaths.size,
    hostPathMissing: hostMissing.length,
    mapMissing: mapMissing.length,
    endpointsWithoutSnapshot: endpointWithoutSnapshot.length,
    endpointErrorsSample: endpointErrors.slice(0, 25),
    hostPathMissingSample: hostMissing.slice(0, 25),
    mapMissingSample: mapMissing
  };

  console.log(JSON.stringify(report, null, 2));

  if (endpointErrors.length || hostMissing.length || mapMissing.length) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
