const fs = require("node:fs");
const path = require("node:path");

const envPath = path.join(__dirname, ".env");
if (fs.existsSync(envPath) && typeof process.loadEnvFile === "function") {
  process.loadEnvFile(envPath);
}
if (!process.env.NODE_ENV) process.env.NODE_ENV = "production";

// local: backend/app.js | Vercel build: backend/app.cjs
const backendDir = path.join(__dirname, "backend");
const appFile = ["app.js", "app.cjs"].find((f) =>
  fs.existsSync(path.join(backendDir, f))
);

let loaded = {};
let loadError = null;
try {
  loaded = require(path.join(backendDir, appFile));
} catch (e) {
  loadError = e;
}

function findApi(m, depth = 0) {
  if (!m || depth > 3) return null;
  if (typeof m.createAppServer === "function") return m;
  for (const k of Object.getOwnPropertyNames(m)) {
    let v;
    try { v = m[k]; } catch { continue; }
    if (v && (typeof v === "object" || typeof v === "function")) {
      const found = findApi(v, depth + 1);
      if (found) return found;
    }
  }
  return null;
}

const api = findApi(loaded);

// Local: node server.js
if (require.main === module && api) api.startServer();

// Vercel: request handler
let server;
module.exports = (req, res) => {
  if (!api) {
    res.statusCode = 200;
    res.setHeader("content-type", "application/json");
    res.end(JSON.stringify({
      appFile,
      loadError: loadError ? String(loadError.stack).split("\n").slice(0, 10) : null,
      keys: Object.getOwnPropertyNames(loaded),
      defaultKeys: loaded.default ? Object.getOwnPropertyNames(loaded.default) : null
    }, null, 2));
    return;
  }
  if (!server) server = api.createAppServer();
  server.emit("request", req, res);
};