const { chromium } = require('playwright-core');
const { startServer } = require('../backend/app');

(async () => {
  const server = startServer();
  const failed = [];
  const imgResponses = [];
  const consoleErrors = [];
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    args: ['--disable-web-security']
  });
  const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });

  page.on('requestfailed', (req) => {
    const url = req.url();
    const type = req.resourceType();
    if (type === 'image' || /(png|jpe?g|gif|webp|svg)(\?|$)/i.test(url)) {
      failed.push({ type, url, error: req.failure() ? req.failure().errorText : 'requestfailed' });
    }
  });

  page.on('response', async (res) => {
    const req = res.request();
    const url = res.url();
    const type = req.resourceType();
    const status = res.status();
    if (type === 'image' || /(png|jpe?g|gif|webp|svg)(\?|$)/i.test(url)) {
      if (status >= 400) {
        imgResponses.push({ status, type, url });
      }
    }
  });

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  try {
    await page.goto('http://127.0.0.1:3000/#/', { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(6000);

    // Attempt clicking a few nav items to trigger game tiles.
    const navTexts = ['Casino', 'Slot', 'Crash', 'Fishing', 'Table', 'Poker'];
    for (const t of navTexts) {
      const el = page.locator(`text=${t}`).first();
      if (await el.count()) {
        try {
          await el.click({ timeout: 2000 });
          await page.waitForTimeout(2500);
        } catch {}
      }
    }

    // Try open login and auth if form exists.
    const loginBtn = page.getByRole('button', { name: /login/i }).first();
    if (await loginBtn.count()) {
      try {
        await loginBtn.click({ timeout: 3000 });
        await page.waitForTimeout(1000);
        const userInput = page.locator('input[name="username"], input[name="uname"], input[placeholder*="User" i], input[type="text"]').first();
        const passInput = page.locator('input[name="password"], input[type="password"]').first();
        if (await userInput.count() && await passInput.count()) {
          await userInput.fill('jashxn');
          await passInput.fill('jashan983jk');
          const submit = page.locator('button:has-text("Login"), button[type="submit"], .login-btn').first();
          if (await submit.count()) {
            await submit.click({ timeout: 3000 }).catch(()=>{});
            await page.waitForTimeout(4000);
          }
        }
      } catch {}
    }

    await page.screenshot({ path: 'tmp/missing-audit.png', fullPage: true });

    const uniqueFailed = Array.from(new Map(failed.map((x) => [x.url, x])).values());
    const uniqueResp = Array.from(new Map(imgResponses.map((x) => [x.url, x])).values());

    console.log('FAILED_IMAGE_REQUESTS=' + uniqueFailed.length);
    uniqueFailed.slice(0, 200).forEach((x) => console.log(`REQFAIL ${x.error} ${x.url}`));
    console.log('IMAGE_HTTP_ERRORS=' + uniqueResp.length);
    uniqueResp.slice(0, 200).forEach((x) => console.log(`HTTP${x.status} ${x.url}`));
    if (consoleErrors.length) {
      console.log('CONSOLE_ERRORS=' + consoleErrors.length);
      consoleErrors.slice(0, 50).forEach((x) => console.log('CONSOLE ' + x));
    }
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
})();
