const { chromium } = require('playwright-core');
(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', args: ['--no-sandbox','--disable-dev-shm-usage'] });
  const page = await browser.newPage({ viewport: { width: 1365, height: 900 } });
  await page.goto('http://127.0.0.1:3000/casino/superover2?gid=mac-excite-lobby-749e6234', { waitUntil: 'domcontentloaded', timeout: 120000 });
  await page.waitForTimeout(6000);
  const out = await page.evaluate(() => ({
    url: location.href,
    hasHeader: !!document.querySelector('.header-top'),
    hasGameWrap: !!document.querySelector('.game-wrap,.market_area,.casino-video,.casino-detail-page,.table-responsive'),
    text: String(document.body && document.body.innerText || '').replace(/\s+/g,' ').trim().slice(0,300)
  }));
  console.log(JSON.stringify(out, null, 2));
  await page.screenshot({ path: 'tmp-direct-casino-superover2-gid.png', fullPage: false });
  await browser.close();
})();
