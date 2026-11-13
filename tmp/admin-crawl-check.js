const { chromium } = require('playwright-core');

const pagesToCheck = [
  '/admin.99-exch.red/dashboard',
  '/admin.99-exch.red/all-deposit-requests',
  '/admin.99-exch.red/all-withdraw-requests',
  '/admin.99-exch.red/admin/chip',
  '/admin.99-exch.red/admin/users/hypersupermaster',
  '/admin.99-exch.red/news',
  '/admin.99-exch.red/admin/number',
  '/admin.99-exch.red/admin/blockmarket',
  '/admin.99-exch.red/utr-numbers-list',
  '/admin.99-exch.red/admin/acStatement',
  '/admin.99-exch.red/admin/bettings/listmarkets',
  '/admin.99-exch.red/admin/manual/new-event',
  '/admin.99-exch.red/addfunds',
  '/admin.99-exch.red/withdrawuser'
];

(async () => {
  const browser = await chromium.launch({
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    headless: true,
    args: ['--no-sandbox']
  });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });

  const failures = new Map();

  for (const pagePath of pagesToCheck) {
    const page = await context.newPage();

    page.on('requestfailed', (req) => {
      const key = `${pagePath} -> FAILED ${req.url()} :: ${req.failure() ? req.failure().errorText : 'unknown'}`;
      failures.set(key, true);
    });

    page.on('response', async (res) => {
      const status = res.status();
      if (status >= 400) {
        const req = res.request();
        const key = `${pagePath} -> HTTP ${status} ${req.method()} ${req.url()}`;
        failures.set(key, true);
      }
    });

    page.on('pageerror', (err) => {
      const key = `${pagePath} -> PAGEERROR ${err.message}`;
      failures.set(key, true);
    });

    try {
      await page.goto(`http://127.0.0.1:3000${pagePath}`, { waitUntil: 'domcontentloaded', timeout: 60000 });
      await page.waitForTimeout(6000);
    } catch (e) {
      const key = `${pagePath} -> NAV_ERROR ${e.message}`;
      failures.set(key, true);
    }

    await page.close();
  }

  console.log('FAIL_COUNT=' + failures.size);
  for (const key of failures.keys()) {
    console.log(key);
  }

  await browser.close();
})();
