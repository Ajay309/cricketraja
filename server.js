const fs = require("node:fs");
const path = require("node:path");

const envPath = path.join(__dirname, ".env");
if (fs.existsSync(envPath)) {
  if (typeof process.loadEnvFile !== "function") {
    throw new Error("Loading the local .env file requires Node.js 20.6 or newer.");
  }
  process.loadEnvFile(envPath);
}

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = "production";
}

const appModule = require("./backend/app");

module.exports = (req, res) => {
  res.statusCode = 200;
  res.setHeader("content-type", "application/json");
  res.end(JSON.stringify({
    resolved: require.resolve("./backend/app"),
    type: typeof appModule,
    keys: Object.keys(appModule || {}),
    cwd: process.cwd(),
    node: process.version
  }, null, 2));
};

// Local: `node server.cjs` -> normal listen()
if (require.main === module) {
  appModule.startServer();
}

// Vercel: listen() nahi, sirf request handler export
let server;
module.exports = (req, res) => {
  if (!server) {
    server = appModule.createAppServer();
  }
  server.emit("request", req, res);
};