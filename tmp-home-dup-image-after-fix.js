const { chromium } = require('playwright-core');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    args: ['--no-sandbox', '--disable-dev-shm-usage']
  });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });

  function collectHomeStats() {
    const lists = Array.from(document.querySelectorAll('.home-page .casino-list, .center-main-container .casino-list'));
    const cards = Array.from(document.querySelectorAll('.home-page .casino-list-item, .center-main-container .casino-list-item'));
    const sigs = cards.map((card) => {
      const a = card.querySelector('a[href]');
      const href = a ? String(a.getAttribute('href') || '').trim().toLowerCase() : '';
      const n = card.querySelector('.casino-list-name,.nm,.casino-name');
      const name = n ? String(n.textContent || '').replace(/\s+/g, ' ').trim().toLowerCase() : '';
      return `${href}|${name}`;
    }).filter(Boolean);
    const seen = new Set();
    let dup = 0;
    for (const s of sigs) {
      if (seen.has(s)) dup += 1;
      else seen.add(s);
    }
    const banners = cards.map((card) => card.querySelector('.casino-list-item-banner')).filter(Boolean);
    let missingBg = 0;
    for (const banner of banners) {
      const bg = String((banner.style && banner.style.backgroundImage) || getComputedStyle(banner).backgroundImage || '');
      const isMissing = !bg || bg === 'none' || /default\.(jpg|jpeg|png)/i.test(bg);
      if (isMissing) missingBg += 1;
    }
    return { listCount: lists.length, cardCount: cards.length, uniqueCount: seen.size, duplicateCount: dup, missingBg };
  }

  await page.goto('http://127.0.0.1:3000/home', { waitUntil: 'domcontentloaded', timeout: 120000 });
  await page.waitForTimeout(1200);
  const demoBtn = page.locator('button:has-text("Login with demo ID"), a:has-text("Login with demo ID")').first();
  if (await demoBtn.count()) {
    await demoBtn.click({ timeout: 20000 });
    await page.waitForTimeout(4500);
  }

  const before = await page.evaluate(collectHomeStats);
  await page.evaluate(() => window.scrollTo(0, 900));
  await page.waitForTimeout(2000);
  const scrolled = await page.evaluate(collectHomeStats);

  const firstCard = page.locator('.casino-list .casino-list-item a[href]').first();
  if (await firstCard.count()) {
    await firstCard.click({ timeout: 20000 });
    await page.waitForTimeout(6000);
  }
  const gameUrl = page.url();

  await page.goto('http://127.0.0.1:3000/home', { waitUntil: 'domcontentloaded', timeout: 120000 });
  await page.waitForTimeout(3000);
  const afterBack = await page.evaluate(collectHomeStats);

  const out = { before, scrolled, gameUrl, afterBack };
  fs.writeFileSync('tmp-home-dup-image-after-fix.json', JSON.stringify(out, null, 2));
  await page.screenshot({ path: 'tmp-home-dup-image-after-fix.png', fullPage: false });
  await browser.close();
})();
