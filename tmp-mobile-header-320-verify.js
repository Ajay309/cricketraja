const { chromium } = require('playwright-core');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    args: ['--no-sandbox', '--disable-dev-shm-usage']
  });
  const page = await browser.newPage({ viewport: { width: 320, height: 844 } });
  await page.goto('http://localhost:4400/home', { waitUntil: 'domcontentloaded', timeout: 120000 });
  await page.waitForTimeout(1200);
  const demoBtn = page.locator('button:has-text("Login with demo ID"), a:has-text("Login with demo ID")').first();
  if ((await demoBtn.count()) > 0) {
    await demoBtn.click({ timeout: 20000 });
    await page.waitForTimeout(4000);
  }
  const accept = page.locator('button:has-text("Accept"), .rules-modal .btn-success').first();
  if ((await accept.count()) > 0) {
    await accept.click({ timeout: 8000 }).catch(() => {});
    await page.waitForTimeout(1200);
  }

  const snap = await page.evaluate(() => {
    function pick(selector) {
      const el = document.querySelector(selector);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { cls: el.className, x: r.x, y: r.y, w: r.width, h: r.height, txt: String(el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 100) };
    }
    return {
      header: pick('.header-top'),
      logo: pick('.header-top .logo-header'),
      right: pick('.header-top .local-mobile-header-right, .header-top .user-details, .header-top .user-balance'),
      search: pick('.header-top .local-mobile-header-search, .header-top .search-box-container, .header-top .search-box'),
      news: pick('.header-top .local-mobile-header-news, .header-top .news')
    };
  });

  fs.writeFileSync('tmp-mobile-header-320-verify.json', JSON.stringify(snap, null, 2));
  await page.screenshot({ path: 'tmp-mobile-header-320-verify.png', fullPage: false });
  await browser.close();
})();
