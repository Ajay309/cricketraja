const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { spawnSync } = require("child_process");

const DB_FILE = path.join(__dirname, "data", "hosting-db.json");
const ENABLE_SYSTEM_CMDS = /^(1|true|yes)$/i.test(
  String(process.env.MOTHERPANEL_ENABLE_SYSTEM_CMDS || "").trim()
);
const ENABLE_SSL = String(process.env.MOTHERPANEL_ENABLE_SSL || "1").trim() !== "0";
const WEB_ROOT = String(process.env.MOTHERPANEL_WEB_ROOT || "/var/www").trim() || "/var/www";
const NGINX_AVAILABLE =
  String(process.env.MOTHERPANEL_NGINX_SITES_AVAILABLE || "/etc/nginx/sites-available").trim() ||
  "/etc/nginx/sites-available";
const NGINX_ENABLED =
  String(process.env.MOTHERPANEL_NGINX_SITES_ENABLED || "/etc/nginx/sites-enabled").trim() ||
  "/etc/nginx/sites-enabled";
const PORT_START = Math.max(1025, Number(process.env.MOTHERPANEL_PORT_START || 3001));
const MIRROR_TARGET_PORT = Math.max(1, Number(process.env.MOTHERPANEL_MIRROR_TARGET_PORT || 3000));
const VPS_IP = String(process.env.MOTHERPANEL_VPS_IP || "").trim();
const CERTBOT_EMAIL = String(process.env.MOTHERPANEL_CERTBOT_EMAIL || "").trim();
const PRIMARY_WEBSITE = String(process.env.MOTHERPANEL_PRIMARY_WEBSITE || "1xbets.xyz").trim() || "1xbets.xyz";

const CF_API = "https://api.cloudflare.com/client/v4";
const CF_TOKEN = String(process.env.CLOUDFLARE_API_TOKEN || "").trim();
const CF_ACCOUNT_ID = String(process.env.CLOUDFLARE_ACCOUNT_ID || "").trim();
const CF_PROXIED = String(process.env.CLOUDFLARE_PROXIED || "0").trim() === "1";
const CF_TTL = Math.max(60, Number(process.env.CLOUDFLARE_TTL || 120));

const DOMAIN_RE =
  /^(?=.{1,253}$)(?!-)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/i;

function now() {
  return new Date().toISOString();
}

function makeId(prefix) {
  if (typeof crypto.randomUUID === "function") return `${prefix}_${crypto.randomUUID()}`;
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

function normalizeDomain(value = "") {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//i, "")
    .replace(/^www\./i, "")
    .replace(/\/.*$/, "")
    .replace(/\.+$/, "");
}

function isValidDomain(domain) {
  return DOMAIN_RE.test(String(domain || "").trim());
}

function toInt(value, fallback = 0) {
  const n = Number(String(value == null ? "" : value).trim());
  return Number.isInteger(n) ? n : fallback;
}

function processName(domain) {
  return String(domain || "")
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

function ensureDb() {
  const dir = path.dirname(DB_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(
      DB_FILE,
      JSON.stringify(
        {
          meta: { created_at: now(), updated_at: now() },
          domains: [],
          mirror_domains: [],
          node_apps: [],
          dns_records: []
        },
        null,
        2
      )
    );
  }
}

function readDb() {
  ensureDb();
  try {
    const parsed = JSON.parse(fs.readFileSync(DB_FILE, "utf8") || "{}");
    return {
      meta: parsed.meta && typeof parsed.meta === "object" ? parsed.meta : {},
      domains: Array.isArray(parsed.domains) ? parsed.domains : [],
      mirror_domains: Array.isArray(parsed.mirror_domains) ? parsed.mirror_domains : [],
      node_apps: Array.isArray(parsed.node_apps) ? parsed.node_apps : [],
      dns_records: Array.isArray(parsed.dns_records) ? parsed.dns_records : []
    };
  } catch {
    return { meta: {}, domains: [], mirror_domains: [], node_apps: [], dns_records: [] };
  }
}

function writeDb(state) {
  const next = {
    meta: {
      ...(state.meta && typeof state.meta === "object" ? state.meta : {}),
      updated_at: now()
    },
    domains: Array.isArray(state.domains) ? state.domains : [],
    mirror_domains: Array.isArray(state.mirror_domains) ? state.mirror_domains : [],
    node_apps: Array.isArray(state.node_apps) ? state.node_apps : [],
    dns_records: Array.isArray(state.dns_records) ? state.dns_records : []
  };
  fs.writeFileSync(DB_FILE, JSON.stringify(next, null, 2));
}

function run(command, args = [], options = {}) {
  const result = spawnSync(command, args, {
    encoding: "utf8",
    shell: false,
    stdio: ["ignore", "pipe", "pipe"],
    ...options
  });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    const stderr = String(result.stderr || "").trim();
    const stdout = String(result.stdout || "").trim();
    throw new Error(stderr || stdout || `${command} failed`);
  }
  return String(result.stdout || "").trim();
}

function pathsFor(domain) {
  const name = normalizeDomain(domain);
  return {
    root_path: path.posix.join(WEB_ROOT, name),
    app_path: path.posix.join(WEB_ROOT, name, "app"),
    nginx_path: path.posix.join(NGINX_AVAILABLE, name),
    nginx_link: path.posix.join(NGINX_ENABLED, name)
  };
}

function nginxConfig(domain, port) {
  const safeDomain = normalizeDomain(domain);
  return `server {
    listen 80;
    server_name ${safeDomain} www.${safeDomain};

    location / {
        proxy_pass http://localhost:${port};
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
`;
}

function mirrorNginxConfig(domain) {
  const safeDomain = normalizeDomain(domain);
  return `server {
    listen 80;
    server_name ${safeDomain} www.${safeDomain};

    location / {
        proxy_pass http://localhost:${MIRROR_TARGET_PORT};
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
`;
}

function pickPort(state, requestedPort) {
  const requested = toInt(requestedPort);
  const used = new Set(
    state.domains
      .map((item) => toInt(item.port))
      .filter((port) => port >= 1025 && port <= 65535)
  );
  if (requested >= 1025 && requested <= 65535 && !used.has(requested)) return requested;
  let next = PORT_START;
  while (used.has(next) && next < 65535) next += 1;
  if (next >= 65535) throw new Error("No free port available.");
  return next;
}

function findDomain(state, domain) {
  const normalized = normalizeDomain(domain);
  return state.domains.find((item) => normalizeDomain(item.domain_name) === normalized);
}

function findDomainIndex(state, domain) {
  const normalized = normalizeDomain(domain);
  return state.domains.findIndex((item) => normalizeDomain(item.domain_name) === normalized);
}

function findMirrorDomain(state, domain) {
  const normalized = normalizeDomain(domain);
  return (state.mirror_domains || []).find((item) => normalizeDomain(item.domain_name) === normalized);
}

function findMirrorIndex(state, domain) {
  const normalized = normalizeDomain(domain);
  return (state.mirror_domains || []).findIndex(
    (item) => normalizeDomain(item.domain_name) === normalized
  );
}

function findHostByDomain(state, domain) {
  return findDomain(state, domain) || findMirrorDomain(state, domain);
}

function createDefaultNodeApp(appPath, domain, port) {
  const appJs = `const http = require("http");
const port = Number(process.env.PORT || ${port});
http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end("<h1>${String(domain).replace(/"/g, "")}</h1><p>Node app is running.</p>");
}).listen(port, () => console.log("listening on " + port));
`;
  const pkg = {
    name: processName(domain) || "node-app",
    version: "1.0.0",
    private: true,
    scripts: { start: "node app.js" }
  };
  fs.writeFileSync(path.join(appPath, "app.js"), appJs);
  fs.writeFileSync(path.join(appPath, "package.json"), JSON.stringify(pkg, null, 2));
}

function provisionDomain(domainRow, payload) {
  if (!ENABLE_SYSTEM_CMDS) {
    return "System commands disabled; domain saved in local mode.";
  }
  const paths = pathsFor(domainRow.domain_name);
  fs.mkdirSync(paths.root_path, { recursive: true });
  fs.mkdirSync(paths.app_path, { recursive: true });
  if (payload.deploy_default_app === true || String(payload.deploy_default_app || "") === "1") {
    createDefaultNodeApp(paths.app_path, domainRow.domain_name, domainRow.port);
  }
  fs.writeFileSync(paths.nginx_path, nginxConfig(domainRow.domain_name, domainRow.port));
  run("ln", ["-sfn", paths.nginx_path, paths.nginx_link]);
  run("nginx", ["-t"]);
  run("systemctl", ["reload", "nginx"]);
  return "Nginx configured and reloaded.";
}

function provisionMirrorDomain(domainName) {
  if (!ENABLE_SYSTEM_CMDS) {
    return "System commands disabled; mirror domain saved in local mode.";
  }
  const p = pathsFor(domainName);
  fs.writeFileSync(p.nginx_path, mirrorNginxConfig(domainName));
  run("ln", ["-sfn", p.nginx_path, p.nginx_link]);
  run("nginx", ["-t"]);
  run("systemctl", ["reload", "nginx"]);
  return "Mirror domain nginx config created and reloaded.";
}

function disableMirrorDomain(domainName) {
  if (!ENABLE_SYSTEM_CMDS) {
    return "System commands disabled; mirror domain marked disabled only in panel.";
  }
  const p = pathsFor(domainName);
  spawnSync("rm", ["-f", p.nginx_link], { encoding: "utf8" });
  run("nginx", ["-t"]);
  run("systemctl", ["reload", "nginx"]);
  return "Mirror domain disabled in nginx.";
}

function deleteMirrorDomainFromServer(domainName) {
  if (!ENABLE_SYSTEM_CMDS) {
    return "System commands disabled; server cleanup skipped.";
  }
  const p = pathsFor(domainName);
  spawnSync("rm", ["-f", p.nginx_link], { encoding: "utf8" });
  spawnSync("rm", ["-f", p.nginx_path], { encoding: "utf8" });
  run("nginx", ["-t"]);
  run("systemctl", ["reload", "nginx"]);
  return "Mirror domain removed from nginx.";
}

async function cfRequest(method, endpoint, body) {
  if (!CF_TOKEN) throw new Error("Cloudflare token is not configured.");
  if (typeof fetch !== "function") throw new Error("Global fetch is unavailable.");
  const res = await fetch(`${CF_API}${endpoint}`, {
    method,
    headers: {
      Authorization: `Bearer ${CF_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: body ? JSON.stringify(body) : undefined
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json.success === false) {
    const msg =
      Array.isArray(json.errors) && json.errors.length
        ? json.errors.map((item) => item.message || "Cloudflare error").join("; ")
        : `Cloudflare request failed (${res.status})`;
    throw new Error(msg);
  }
  return json.result || {};
}

function cfRecordName(domain, name) {
  const safeName = String(name || "@").trim();
  if (!safeName || safeName === "@") return domain;
  if (safeName.includes(".")) return safeName;
  return `${safeName}.${domain}`;
}

async function setupCloudflare(state, domainRow) {
  if (!CF_TOKEN || !VPS_IP) return { message: "Cloudflare token or VPS IP missing.", skipped: true };
  if (!CF_ACCOUNT_ID) return { message: "Cloudflare account id missing.", skipped: true };
  const zone = await cfRequest("POST", "/zones", {
    name: domainRow.domain_name,
    account: { id: CF_ACCOUNT_ID },
    jump_start: false,
    type: "full"
  });
  const zoneId = String(zone.id || "");
  if (!zoneId) throw new Error("Cloudflare zone id missing.");
  const rec1 = await cfRequest("POST", `/zones/${zoneId}/dns_records`, {
    type: "A",
    name: cfRecordName(domainRow.domain_name, "@"),
    content: VPS_IP,
    ttl: CF_TTL,
    proxied: CF_PROXIED
  });
  const rec2 = await cfRequest("POST", `/zones/${zoneId}/dns_records`, {
    type: "A",
    name: cfRecordName(domainRow.domain_name, "www"),
    content: VPS_IP,
    ttl: CF_TTL,
    proxied: CF_PROXIED
  });
  state.dns_records.push({
    id: makeId("dns"),
    domain_id: domainRow.id,
    domain_name: domainRow.domain_name,
    type: "A",
    name: "@",
    value: VPS_IP,
    ttl: CF_TTL,
    proxied: CF_PROXIED,
    cloudflare_record_id: String(rec1.id || ""),
    created_at: now()
  });
  state.dns_records.push({
    id: makeId("dns"),
    domain_id: domainRow.id,
    domain_name: domainRow.domain_name,
    type: "A",
    name: "www",
    value: VPS_IP,
    ttl: CF_TTL,
    proxied: CF_PROXIED,
    cloudflare_record_id: String(rec2.id || ""),
    created_at: now()
  });
  return {
    message: "Cloudflare zone and DNS A records created.",
    skipped: false,
    zone_id: zoneId,
    nameservers: Array.isArray(zone.name_servers) ? zone.name_servers : []
  };
}

async function enableSsl(domain) {
  if (!ENABLE_SSL) return { skipped: true, message: "SSL automation disabled." };
  if (!ENABLE_SYSTEM_CMDS) return { skipped: true, message: "System commands disabled." };
  const args = ["--nginx", "-d", domain, "-d", `www.${domain}`, "--non-interactive", "--agree-tos"];
  if (CERTBOT_EMAIL) args.push("-m", CERTBOT_EMAIL);
  else args.push("--register-unsafely-without-email");
  run("certbot", args);
  return { skipped: false, message: "SSL installed with certbot." };
}

function clearDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    return;
  }
  for (const item of fs.readdirSync(dirPath)) {
    fs.rmSync(path.join(dirPath, item), { recursive: true, force: true });
  }
}

function detectEntry(appPath) {
  const pkgPath = path.join(appPath, "package.json");
  if (fs.existsSync(pkgPath)) {
    try {
      const parsed = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
      if (parsed && parsed.scripts && String(parsed.scripts.start || "").trim()) return { mode: "npm" };
    } catch {
      // ignore
    }
  }
  for (const fileName of ["app.js", "server.js", "index.js", "main.js"]) {
    if (fs.existsSync(path.join(appPath, fileName))) return { mode: "node", file: fileName };
  }
  return null;
}

function extractZip(zipPath, destPath) {
  if (process.platform === "win32") {
    run("powershell", [
      "-NoProfile",
      "-Command",
      `Expand-Archive -LiteralPath '${zipPath.replace(/'/g, "''")}' -DestinationPath '${destPath.replace(/'/g, "''")}' -Force`
    ]);
    return;
  }
  run("unzip", ["-o", zipPath, "-d", destPath]);
}

async function deployNode(state, payload, actorId) {
  const domainName = normalizeDomain(payload.domain || payload.domain_name);
  if (!isValidDomain(domainName)) return { status: 400, body: { success: false, message: "Invalid domain." } };
  const domain = findDomain(state, domainName);
  if (!domain) return { status: 404, body: { success: false, message: "Domain not found." } };
  if (!ENABLE_SYSTEM_CMDS) {
    return {
      status: 400,
      body: { success: false, message: "Enable MOTHERPANEL_ENABLE_SYSTEM_CMDS=1 on VPS to deploy." }
    };
  }

  const zipBase64 = String(payload.zip_base64 || "").trim();
  const zipPath = String(payload.zip_path || "").trim();
  if (!zipBase64 && !zipPath) {
    return { status: 400, body: { success: false, message: "zip_base64 or zip_path is required." } };
  }

  const paths = pathsFor(domain.domain_name);
  fs.mkdirSync(paths.app_path, { recursive: true });
  clearDir(paths.app_path);

  const tmpDir = path.join(path.dirname(DB_FILE), "tmp");
  fs.mkdirSync(tmpDir, { recursive: true });
  const tempZip = zipPath || path.join(tmpDir, `${processName(domain.domain_name)}-${Date.now()}.zip`);
  if (!zipPath) {
    const cleaned = zipBase64.replace(/^data:.*;base64,/i, "").replace(/\s+/g, "");
    fs.writeFileSync(tempZip, Buffer.from(cleaned, "base64"));
  }
  extractZip(tempZip, paths.app_path);
  if (!zipPath && fs.existsSync(tempZip)) fs.rmSync(tempZip, { force: true });

  const env = { ...process.env, PORT: String(domain.port) };
  run("npm", ["install", "--omit=dev"], { cwd: paths.app_path, env });
  spawnSync("pm2", ["delete", processName(domain.domain_name)], { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });

  const startFile = String(payload.start_file || "").trim();
  const entry = detectEntry(paths.app_path);
  if (startFile) run("pm2", ["start", startFile, "--name", processName(domain.domain_name)], { cwd: paths.app_path, env });
  else if (entry && entry.mode === "npm") run("pm2", ["start", "npm", "--name", processName(domain.domain_name), "--", "start"], { cwd: paths.app_path, env });
  else if (entry && entry.mode === "node") run("pm2", ["start", entry.file, "--name", processName(domain.domain_name)], { cwd: paths.app_path, env });
  else throw new Error("Entry file missing. Add app.js/server.js/index.js or scripts.start.");

  run("pm2", ["save"]);

  const appRow = {
    id: makeId("app"),
    domain_id: domain.id,
    domain_name: domain.domain_name,
    app_path: paths.app_path,
    port: domain.port,
    process_name: processName(domain.domain_name),
    status: "running",
    updated_by: String(actorId || ""),
    updated_at: now(),
    created_at: now()
  };
  const appIndex = state.node_apps.findIndex((item) => String(item.domain_id || "") === String(domain.id || ""));
  if (appIndex >= 0) state.node_apps[appIndex] = { ...state.node_apps[appIndex], ...appRow };
  else state.node_apps.push(appRow);
  const domainIndex = findDomainIndex(state, domain.domain_name);
  if (domainIndex >= 0) {
    state.domains[domainIndex] = {
      ...state.domains[domainIndex],
      status: "active",
      deploy_status: "running",
      updated_at: now(),
      message: "Node app deployed."
    };
  }
  writeDb(state);
  return { status: 200, body: { success: true, message: "Node app deployed.", data: appRow } };
}

async function handleHostingApiRoute({ route, method, payload, ctx }) {
  const cleanRoute = String(route || "").replace(/\/+$/, "") || "/";
  const httpMethod = String(method || "GET").toUpperCase();
  const state = readDb();
  const actorId =
    String(
      (ctx && ctx.actorProfile && (ctx.actorProfile.user_id || ctx.actorProfile.id)) ||
        (ctx && ctx.actor && ctx.actor.username) ||
        "admin"
    ).trim() || "admin";

  if (cleanRoute === "/hosting/domains") return { status: 302, redirect: "/admin/dashboard?hosting=domains" };
  if (cleanRoute === "/hosting/mirrors") return { status: 302, redirect: "/admin/dashboard?hosting=mirrors" };
  if (cleanRoute === "/hosting/deploy") return { status: 302, redirect: "/admin/dashboard?hosting=deploy" };
  if (cleanRoute === "/hosting/dns") return { status: 302, redirect: "/admin/dashboard?hosting=dns" };

  if (
    cleanRoute === "/api/mirror-domains" ||
    cleanRoute === "/api/mirror-domains/list" ||
    cleanRoute === "/api/mirror-domains/all"
  ) {
    return {
      status: 200,
      body: {
        success: true,
        primary_website: PRIMARY_WEBSITE,
        proxy_port: MIRROR_TARGET_PORT,
        data: state.mirror_domains || []
      }
    };
  }

  if (cleanRoute === "/api/mirror-domains/view" && httpMethod === "GET") {
    const domainName = normalizeDomain(payload.domain || payload.domain_name);
    const row = findMirrorDomain(state, domainName);
    if (!row) return { status: 404, body: { success: false, message: "Mirror domain not found." } };
    return {
      status: 200,
      body: {
        success: true,
        primary_website: PRIMARY_WEBSITE,
        proxy_port: MIRROR_TARGET_PORT,
        data: row
      }
    };
  }

  if (cleanRoute === "/api/mirror-domains/add" && (httpMethod === "POST" || httpMethod === "PUT")) {
    const domainName = normalizeDomain(payload.domain_name || payload.domain);
    if (!isValidDomain(domainName)) {
      return { status: 400, body: { success: false, message: "Invalid domain format." } };
    }
    if (findMirrorDomain(state, domainName) || findDomain(state, domainName)) {
      return { status: 409, body: { success: false, message: "Domain already exists." } };
    }
    const row = {
      id: makeId("mir"),
      domain_name: domainName,
      status: "pending",
      ssl_status: "disabled",
      cloudflare_zone_id: "",
      nameservers: [],
      created_at: now(),
      updated_at: now()
    };
    const notes = [];
    try {
      notes.push(provisionMirrorDomain(domainName));
      row.status = "active";
    } catch (error) {
      row.status = "error";
      notes.push(`Nginx failed: ${error.message}`);
    }
    try {
      const dnsResult = await setupCloudflare(state, { id: row.id, domain_name: row.domain_name });
      notes.push(dnsResult.message);
      if (!dnsResult.skipped) {
        row.cloudflare_zone_id = dnsResult.zone_id || "";
        row.nameservers = dnsResult.nameservers || [];
      }
    } catch (error) {
      notes.push(`Cloudflare failed: ${error.message}`);
    }
    const wantsSsl =
      String(payload.enable_ssl || "").trim() === "1" ||
      String(payload.ssl || "").trim() === "1" ||
      payload.enable_ssl === true;
    if (wantsSsl) {
      try {
        const sslResult = await enableSsl(domainName);
        notes.push(sslResult.message);
        row.ssl_status = sslResult.skipped ? "pending" : "enabled";
      } catch (error) {
        row.ssl_status = "failed";
        notes.push(`SSL failed: ${error.message}`);
      }
    }
    row.updated_at = now();
    row.message = notes.join(" | ");
    state.mirror_domains.push(row);
    writeDb(state);
    return {
      status: row.status === "error" ? 500 : 200,
      body: {
        success: row.status !== "error",
        message:
          row.status === "error"
            ? "Mirror domain saved but nginx setup failed."
            : "Mirror domain added successfully.",
        primary_website: PRIMARY_WEBSITE,
        proxy_port: MIRROR_TARGET_PORT,
        data: row
      }
    };
  }

  if (cleanRoute === "/api/mirror-domains/disable" && (httpMethod === "POST" || httpMethod === "PUT")) {
    const domainName = normalizeDomain(payload.domain_name || payload.domain);
    const idx = findMirrorIndex(state, domainName);
    if (idx < 0) return { status: 404, body: { success: false, message: "Mirror domain not found." } };
    try {
      const msg = disableMirrorDomain(domainName);
      state.mirror_domains[idx] = {
        ...state.mirror_domains[idx],
        status: "disabled",
        updated_at: now(),
        message: msg
      };
      writeDb(state);
      return { status: 200, body: { success: true, message: "Mirror domain disabled." } };
    } catch (error) {
      return { status: 500, body: { success: false, message: error.message || "Disable failed." } };
    }
  }

  if (cleanRoute === "/api/mirror-domains/delete" && (httpMethod === "POST" || httpMethod === "DELETE")) {
    const domainName = normalizeDomain(payload.domain_name || payload.domain);
    const idx = findMirrorIndex(state, domainName);
    if (idx < 0) return { status: 404, body: { success: false, message: "Mirror domain not found." } };
    const row = state.mirror_domains[idx];
    try {
      deleteMirrorDomainFromServer(domainName);
    } catch {
      // keep local cleanup even if server command fails
    }
    if (row.cloudflare_zone_id && CF_TOKEN) {
      try {
        await cfRequest("DELETE", `/zones/${row.cloudflare_zone_id}`);
      } catch {
        // ignore remote cleanup failure
      }
    }
    state.mirror_domains.splice(idx, 1);
    state.dns_records = state.dns_records.filter((record) => normalizeDomain(record.domain_name) !== domainName);
    writeDb(state);
    return { status: 200, body: { success: true, message: "Mirror domain deleted." } };
  }

  if (cleanRoute === "/api/domains" || cleanRoute === "/api/domains/list" || cleanRoute === "/api/domain/list") {
    const domainFilter = normalizeDomain(payload.domain || payload.domain_name);
    const rows = state.domains.filter((row) =>
      domainFilter ? normalizeDomain(row.domain_name) === domainFilter : true
    );
    return { status: 200, body: { success: true, data: rows } };
  }

  if (
    (cleanRoute === "/api/domains/add" || cleanRoute === "/api/domain/add") &&
    (httpMethod === "POST" || httpMethod === "PUT")
  ) {
    const domainName = normalizeDomain(payload.domain_name || payload.domain);
    if (!isValidDomain(domainName)) return { status: 400, body: { success: false, message: "Invalid domain format." } };
    if (findDomain(state, domainName)) return { status: 409, body: { success: false, message: "Domain already exists." } };

    const port = pickPort(state, payload.port);
    const domainPaths = pathsFor(domainName);
    const row = {
      id: makeId("dom"),
      domain_name: domainName,
      user_id: actorId,
      status: "pending",
      ssl_status: "disabled",
      port,
      root_path: domainPaths.root_path,
      app_path: domainPaths.app_path,
      cloudflare_zone_id: "",
      nameservers: [],
      deploy_status: "pending",
      dns_status: "pending",
      created_at: now(),
      updated_at: now()
    };
    state.domains.push(row);
    state.node_apps.push({
      id: makeId("app"),
      domain_id: row.id,
      domain_name: row.domain_name,
      app_path: row.app_path,
      port: row.port,
      process_name: processName(row.domain_name),
      status: "created",
      created_at: now(),
      updated_at: now()
    });
    const notes = [];
    try {
      notes.push(provisionDomain(row, payload));
      row.status = "active";
    } catch (error) {
      row.status = "error";
      notes.push(`Provision failed: ${error.message}`);
    }
    try {
      const dnsResult = await setupCloudflare(state, row);
      notes.push(dnsResult.message);
      row.dns_status = dnsResult.skipped ? "skipped" : "active";
      if (!dnsResult.skipped) {
        row.cloudflare_zone_id = dnsResult.zone_id || "";
        row.nameservers = dnsResult.nameservers || [];
      }
    } catch (error) {
      row.dns_status = "failed";
      notes.push(`Cloudflare failed: ${error.message}`);
    }
    const wantsSsl =
      String(payload.enable_ssl || "").trim() === "1" ||
      String(payload.ssl || "").trim() === "1" ||
      payload.enable_ssl === true;
    if (wantsSsl) {
      try {
        const sslResult = await enableSsl(row.domain_name);
        notes.push(sslResult.message);
        row.ssl_status = sslResult.skipped ? "pending" : "enabled";
      } catch (error) {
        row.ssl_status = "failed";
        notes.push(`SSL failed: ${error.message}`);
      }
    }
    row.updated_at = now();
    row.message = notes.join(" | ");
    writeDb(state);
    return {
      status: row.status === "error" ? 500 : 200,
      body: {
        success: row.status !== "error",
        message: row.status === "error" ? "Domain saved but provisioning failed." : "Domain added successfully.",
        data: row
      }
    };
  }

  if (
    (cleanRoute === "/api/domains/delete" || cleanRoute === "/api/domain/delete") &&
    (httpMethod === "POST" || httpMethod === "DELETE")
  ) {
    const domainName = normalizeDomain(payload.domain_name || payload.domain);
    if (!isValidDomain(domainName)) return { status: 400, body: { success: false, message: "Invalid domain format." } };
    const row = findDomain(state, domainName);
    if (!row) return { status: 404, body: { success: false, message: "Domain not found." } };

    if (ENABLE_SYSTEM_CMDS) {
      const p = pathsFor(row.domain_name);
      spawnSync("pm2", ["delete", processName(row.domain_name)], { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
      spawnSync("rm", ["-f", p.nginx_link], { encoding: "utf8" });
      spawnSync("rm", ["-f", p.nginx_path], { encoding: "utf8" });
      run("nginx", ["-t"]);
      run("systemctl", ["reload", "nginx"]);
      if (payload.remove_files === true || String(payload.remove_files || "").trim() === "1") {
        fs.rmSync(p.root_path, { recursive: true, force: true });
      }
    }

    if (row.cloudflare_zone_id && CF_TOKEN) {
      try {
        await cfRequest("DELETE", `/zones/${row.cloudflare_zone_id}`);
      } catch {
        // ignore remote cleanup errors
      }
    }

    state.domains = state.domains.filter((item) => normalizeDomain(item.domain_name) !== domainName);
    state.node_apps = state.node_apps.filter((item) => normalizeDomain(item.domain_name) !== domainName);
    state.dns_records = state.dns_records.filter((item) => normalizeDomain(item.domain_name) !== domainName);
    writeDb(state);
    return { status: 200, body: { success: true, message: "Domain deleted." } };
  }

  if (cleanRoute === "/api/deploy" && httpMethod === "POST") {
    try {
      return await deployNode(state, payload, actorId);
    } catch (error) {
      return { status: 500, body: { success: false, message: error.message || "Deploy failed." } };
    }
  }

  if ((cleanRoute === "/api/dns" || cleanRoute === "/api/dns/list") && httpMethod === "GET") {
    const domainFilter = normalizeDomain(payload.domain || payload.domain_name);
    const rows = state.dns_records.filter((item) =>
      domainFilter ? normalizeDomain(item.domain_name) === domainFilter : true
    );
    return { status: 200, body: { success: true, data: rows } };
  }

  if (cleanRoute === "/api/dns/add" && (httpMethod === "POST" || httpMethod === "PUT")) {
    const domainName = normalizeDomain(payload.domain || payload.domain_name);
    if (!isValidDomain(domainName)) return { status: 400, body: { success: false, message: "Invalid domain format." } };
    const domain = findHostByDomain(state, domainName);
    if (!domain) return { status: 404, body: { success: false, message: "Domain not found." } };
    const type = String(payload.type || "A").trim().toUpperCase();
    if (!["A", "AAAA", "CNAME", "TXT", "MX", "NS"].includes(type)) {
      return { status: 400, body: { success: false, message: "Unsupported DNS type." } };
    }
    const name = String(payload.name || "@").trim() || "@";
    const value = String(payload.value || payload.content || "").trim();
    if (!value) return { status: 400, body: { success: false, message: "DNS value is required." } };
    const ttl = Math.max(60, toInt(payload.ttl, CF_TTL));
    const proxied = String(payload.proxied || "").trim() === "1" || payload.proxied === true;
    const row = {
      id: makeId("dns"),
      domain_id: domain.id,
      domain_name: domain.domain_name,
      type,
      name,
      value,
      ttl,
      proxied,
      cloudflare_record_id: "",
      created_at: now()
    };
    if (domain.cloudflare_zone_id && CF_TOKEN) {
      try {
        const created = await cfRequest("POST", `/zones/${domain.cloudflare_zone_id}/dns_records`, {
          type: row.type,
          name: cfRecordName(domain.domain_name, row.name),
          content: row.value,
          ttl: row.ttl,
          proxied: row.proxied
        });
        row.cloudflare_record_id = String(created.id || "");
      } catch (error) {
        row.cloudflare_error = String(error.message || "");
      }
    }
    state.dns_records.push(row);
    writeDb(state);
    return { status: 200, body: { success: true, message: "DNS record added.", data: row } };
  }

  if (cleanRoute === "/api/dns/delete" && (httpMethod === "POST" || httpMethod === "DELETE")) {
    const id = String(payload.id || payload.record_id || "").trim();
    if (!id) return { status: 400, body: { success: false, message: "DNS record id is required." } };
    const index = state.dns_records.findIndex((item) => String(item.id || "") === id);
    if (index < 0) return { status: 404, body: { success: false, message: "DNS record not found." } };
    const row = state.dns_records[index];
    const domain = findHostByDomain(state, row.domain_name);
    if (domain && row.cloudflare_record_id && domain.cloudflare_zone_id && CF_TOKEN) {
      try {
        await cfRequest("DELETE", `/zones/${domain.cloudflare_zone_id}/dns_records/${row.cloudflare_record_id}`);
      } catch {
        // ignore remote delete failure
      }
    }
    state.dns_records.splice(index, 1);
    writeDb(state);
    return { status: 200, body: { success: true, message: "DNS record deleted." } };
  }

  return null;
}

module.exports = {
  handleHostingApiRoute
};
