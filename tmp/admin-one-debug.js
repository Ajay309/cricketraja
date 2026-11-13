const { chromium } = require('playwright-core');
(async () => {
  const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true, args:['--no-sandbox'] });
  const page = await (await browser.newContext()).newPage();
  page.on('response', (res) => {
    if (res.status() >= 400) {
      console.log('HTTP', res.status(), res.url());
    }
  });
  page.on('requestfailed', (req) => {
    console.log('FAILED', req.url(), req.failure() && req.failure().errorText);
  });
  page.on('pageerror', (err) => {
    console.log('PAGEERROR', err.message);
    if (err.stack) console.log(err.stack);
  });
  await page.goto('http://127.0.0.1:3000/admin.99-exch.red/dashboard', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(7000);
  await browser.close();
})();
