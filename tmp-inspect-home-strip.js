const { chromium } = require('playwright-core');
(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    args: ['--no-sandbox', '--disable-dev-shm-usage']
  });
  const page = await browser.newPage({ viewport: { width: 1700, height: 950 } });
  const hits = [];
  page.on('response', async (res) => {
    const url = res.url();
    if (/\/api\/front\//i.test(url) && /(casino|slot|table|game|data2|tablist|alllist|provider|other|open)/i.test(url)) {
      hits.push({ status: res.status(), url });
    }
  });

  await page.goto('http://localhost:4400/home', { waitUntil: 'domcontentloaded', timeout: 120000 });
  const demoBtn = page.locator('button:has-text("Login with demo ID"), a:has-text("Login with demo ID")').first();
  if (await demoBtn.count()) {
    await demoBtn.click({ timeout: 20000 });
  }
  await page.waitForTimeout(9000);

  const cards = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('img[src]'));
    const filtered = imgs.filter((img) => {
      const src = String(img.getAttribute('src') || img.src || '');
      return /casino|card|lobby|sitethemedata\.com|default|spade/i.test(src);
    });
    return filtered.slice(0, 40).map((img) => {
      const src = String(img.getAttribute('src') || img.src || '');
      const parent = img.closest('a,div,li,td,tr') || img.parentElement;
      const txt = parent ? String(parent.textContent || '').replace(/\s+/g, ' ').trim() : '';
      return { src, text: txt.slice(0, 120) };
    });
  });

  const out = {
    apiHits: hits,
    cards
  };
  require('fs').writeFileSync('tmp-home-dom-inspect.json', JSON.stringify(out, null, 2));
  await browser.close();
})();
