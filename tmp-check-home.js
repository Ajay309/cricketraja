const { chromium } = require('playwright-core');
(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    args: ['--no-sandbox', '--disable-dev-shm-usage']
  });
  const page = await browser.newPage({ viewport: { width: 1700, height: 950 } });
  await page.goto('http://localhost:4400/home', { waitUntil: 'domcontentloaded', timeout: 120000 });
  await page.waitForTimeout(7000);
  await page.screenshot({ path: 'tmp-home-after-zip-fix.png', fullPage: false });
  await browser.close();
})();
