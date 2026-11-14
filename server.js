const fs = require("node:fs");
const path = require("node:path");

module.exports = (req, res) => {
  const out = { cwd: process.cwd(), node: process.version };
  try {
    const dir = path.join(__dirname, "backend");
    out.backendFiles = fs.readdirSync(dir).filter((f) => /^app/i.test(f));
    const appPath = path.join(dir, "app.js");
    out.appJsExists = fs.existsSync(appPath);
    out.appJsSize = out.appJsExists ? fs.statSync(appPath).size : null;
    out.resolved = require.resolve("./backend/app");
    const m = require("./backend/app");
    out.type = typeof m;
    out.keys = Object.keys(m || {});
  } catch (e) {
    out.error = String(e && e.stack ? e.stack : e).split("\n").slice(0, 8);
  }
  res.statusCode = 200;
  res.setHeader("content-type", "application/json");
  res.end(JSON.stringify(out, null, 2));
};