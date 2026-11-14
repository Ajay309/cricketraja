const fs = require("node:fs");
const path = require("node:path");

const envPath = path.join(__dirname, ".env");
if (fs.existsSync(envPath) && typeof process.loadEnvFile === "function") {
  process.loadEnvFile(envPath);
}
if (!process.env.NODE_ENV) process.env.NODE_ENV = "production";

const loaded = require("./backend/app");

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

if (require.main === module && api) api.startServer();

let server;
module.exports = (req, res) => {
  if (!api) {
    const d = {};
    try {
      d.type = typeof loaded;
      d.names = Object.getOwnPropertyNames(loaded);
      d.defaultType = typeof loaded.default;
      d.defaultNames = loaded.default ? Object.getOwnPropertyNames(loaded.default) : null;
      d.protoNames = Object.getOwnPropertyNames(Object.getPrototypeOf(loaded) || {});
    } catch (e) { d.err = String(e); }
    res.statusCode = 200;
    res.setHeader("content-type", "application/json");
    res.end(JSON.stringify(d, null, 2));
    return;
  }
  if (!server) server = api.createAppServer();
  server.emit("request", req, res);
};