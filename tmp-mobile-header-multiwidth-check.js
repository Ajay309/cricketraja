const { chromium } = require('playwright-core');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    args: ['--no-sandbox', '--disable-dev-shm-usage']
  });

  const widths = [320, 375, 425, 768];
  const results = [];

  for (const width of widths) {
    const page = await browser.newPage({ viewport: { width, height: 844 } });
    await page.goto('http://localhost:4400/home', { waitUntil: 'domcontentloaded', timeout: 120000 });
    await page.waitForTimeout(1200);

    const demoBtn = page.locator('button:has-text("Login with demo ID"), a:has-text("Login with demo ID")').first();
    const demoCount = await demoBtn.count();
    if (demoCount > 0) {
      await demoBtn.click({ timeout: 20000 });
      await page.waitForTimeout(4000);
    }

    const data = await page.evaluate(() => {
      function rect(selector) {
        const el = document.querySelector(selector);
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), cls: el.className };
      }
      const logo = rect('.header-top .logo-header');
      const right = rect('.header-top .local-mobile-header-right, .header-top .user-details, .header-top .user-balance');
      const search = rect('.header-top .local-mobile-header-search, .header-top .search-box-container, .header-top .search-box');
      const news = rect('.header-top .local-mobile-header-news, .header-top .news');
      const row2 = rect('.header-top .local-mobile-header-row2');
      return {
        headerClass: (document.querySelector('.header-top') || {}).className || '',
        logo,
        right,
        search,
        news,
        row2,
        checks: {
          topRowAligned: !!(logo && right && Math.abs(logo.y - right.y) <= 2),
          secondRowAligned: !!(search && news && Math.abs(search.y - news.y) <= 2),
          searchLeftOfNews: !!(search && news && search.x < news.x),
          secondRowBelowTop: !!(logo && news && news.y > logo.y)
        }
      };
    });

    await page.screenshot({ path: `tmp-mobile-header-${width}-after-fix.png`, fullPage: false });
    results.push({ width, data });
    await page.close();
  }

  fs.writeFileSync('tmp-mobile-header-multiwidth-check.json', JSON.stringify(results, null, 2));
  await browser.close();
})();
