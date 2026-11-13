const { spawn } = require("child_process");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function req(url, options = {}) {
  try {
    const res = await fetch(url, options);
    const text = await res.text();
    return {
      status: res.status,
      location: res.headers.get("location") || "",
      body: text.slice(0, 120).replace(/\s+/g, " ").trim()
    };
  } catch (error) {
    return { error: error.message };
  }
}

async function run() {
  const server = spawn("node", ["server.js"], { cwd: process.cwd(), stdio: "ignore" });
  try {
    await sleep(2000);

    const root = await req("http://127.0.0.1:3000/admin", { redirect: "manual" });
    console.log("ADMIN_ROOT", JSON.stringify(root));

    const dash = await req("http://127.0.0.1:3000/admin/dashboard");
    console.log("ADMIN_DASH", JSON.stringify(dash));

    const api = await req("http://127.0.0.1:3000/admin/admin/dashboard/getDashboardData");
    console.log("ADMIN_API", JSON.stringify(api));
  } finally {
    server.kill("SIGTERM");
  }
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
