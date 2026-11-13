const { chromium } = require('playwright-core');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    args: ['--no-sandbox', '--disable-dev-shm-usage']
  });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto('http://localhost:4400/home', { waitUntil: 'domcontentloaded', timeout: 120000 });
  await page.waitForTimeout(1200);
  const demoBtn = page.locator('button:has-text("Login with demo ID"), a:has-text("Login with demo ID")').first();
  const demoCount = await demoBtn.count();
  if (demoCount > 0) {
    await demoBtn.click({ timeout: 20000 });
    await page.waitForTimeout(6000);
  }

  const data = await page.evaluate(() => {
    const header = document.querySelector('.header-top');
    const childInfo = header
      ? Array.from(header.children).map((el) => ({
          cls: el.className,
          txt: String(el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 120),
          rect: (() => {
            const r = el.getBoundingClientRect();
            return { x: r.x, y: r.y, w: r.width, h: r.height };
          })()
        }))
      : [];

    function pick(selector) {
      const el = document.querySelector(selector);
      if (!el) {
        return null;
      }
      const r = el.getBoundingClientRect();
      return {
        cls: el.className,
        txt: String(el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 120),
        x: r.x,
        y: r.y,
        w: r.width,
        h: r.height
      };
    }

    return {
      headerClass: header ? header.className : null,
      childInfo,
      logo: pick('.header-top .logo-header'),
      right: pick('.header-top .local-mobile-header-right, .header-top .user-details, .header-top .user-balance'),
      search: pick('.header-top .local-mobile-header-search, .header-top .search-box-container, .header-top .search-box'),
      news: pick('.header-top .local-mobile-header-news, .header-top .news')
    };
  });

  fs.writeFileSync('tmp-mobile-header-layout-after-fix.json', JSON.stringify(data, null, 2));
  await page.screenshot({ path: 'tmp-mobile-header-layout-after-fix.png', fullPage: false });
  await browser.close();
})();
