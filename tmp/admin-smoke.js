const { spawn } = require("child_process");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function req(url, options = {}) {
  try {
    const res = await fetch(url, options);
    const text = await res.text();
    const preview = text.slice(0, 140).replace(/\s+/g, " ").trim();
    return `${options.method || "GET"} ${url} -> ${res.status} body=${preview}`;
  } catch (err) {
    return `${options.method || "GET"} ${url} -> ERROR ${err.message}`;
  }
}

async function run() {
  const server = spawn("node", ["server.js"], { cwd: process.cwd(), stdio: "ignore" });
  try {
    await sleep(2000);
    const base = "http://127.0.0.1:3000/admin.99-exch.red";
    const checks = [
      req(`${base}/dashboard`),
      req(`${base}/admin/dashboard/getDashboardData`),
      req(`${base}/admin/dashboard/getDateWiseTransactionSummary`),
      req(`${base}/admin/dashboard/getDownlineBalance`),
      req(`${base}/admin/User/register_username_exists`, {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        body: "login=qa_test_user"
      }),
      req(`${base}/admin/User/adduser`, {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        body: "user_name=qa_test_user&password=123456&name=QA%20Test&deposite_bal=2500&user_type=User"
      }),
      req(`${base}/admin/user/listUsersData/0/User`, {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        body: "draw=1&start=0&length=10"
      }),
      req(`${base}/admin/Transactions/get_direct_all_transaction_history_admins`, {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        body: "status=Request&type=Deposit"
      }),
      req(`${base}/admin/Reports/filterAcStatement`, {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        body: "user_id=330885"
      }),
      req(`${base}/admin/Chip/update_user_chip`, {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        body: "chip_name[]=100&chip_value[]=100"
      }),
      req(`${base}/add-utr-numbers`, {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        body: "utrs=123456789012&type=deposit&amount=500"
      }),
      req(`${base}/update-utr-status`, {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        body: "id=1&status=used"
      }),
      req(`${base}/withdrawuser`)
    ];

    const results = await Promise.all(checks);
    for (const line of results) {
      console.log(line);
    }
  } finally {
    server.kill("SIGTERM");
  }
}

run().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
