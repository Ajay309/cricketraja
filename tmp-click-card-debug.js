const { chromium } = require('playwright-core');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    args: ['--no-sandbox', '--disable-dev-shm-usage']
  });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const logs = [];
  page.on('request', req => {
    const u = req.url();
    if (u.includes('/api/front/casino/') || u.includes('/provider-game') || u.includes('/casino/')) {
      logs.push({ t: 'req', m: req.method(), u });
    }
  });
  page.on('response', async res => {
    const u = res.url();
    if (u.includes('/api/front/casino/') || u.includes('/provider-game') || u.includes('/casino/')) {
      logs.push({ t: 'res', s: res.status(), u });
    }
  });

  await page.goto('https://cricketraja.vercel.app/home', { waitUntil: 'domcontentloaded', timeout: 120000 });
  await page.waitForTimeout(1500);

  const demoBtn = page.locator('button:has-text("Login with demo ID"), a:has-text("Login with demo ID")').first();
  if (await demoBtn.count()) {
    await demoBtn.click({ timeout: 20000 });
    await page.waitForTimeout(4000);
  }

  const before = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('.casino-list .casino-list-item')).slice(0, 20);
    return cards.map((card, i) => {
      const a = card.querySelector('a[href]');
      const nameNode = card.querySelector('.casino-list-name,.nm,.casino-name');
      const banner = card.querySelector('.casino-list-item-banner');
      const styleBg = banner && banner.style ? banner.style.backgroundImage : '';
      const csBg = banner ? getComputedStyle(banner).backgroundImage : '';
      return {
        i,
        href: a ? a.getAttribute('href') : '',
        name: nameNode ? String(nameNode.textContent || '').trim() : '',
        styleBg,
        csBg,
      };
    });
  });

  const firstClickable = page.locator('.casino-list .casino-list-item a[href]').first();
  const firstHref = await firstClickable.getAttribute('href').catch(() => null);
  const startUrl = page.url();

  if (await firstClickable.count()) {
    await Promise.race([
      firstClickable.click({ timeout: 20000 }),
      page.waitForTimeout(20000)
    ]);
  }

  await page.waitForTimeout(3500);

  const after = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('.casino-list .casino-list-item')).slice(0, 20);
    return cards.map((card, i) => {
      const a = card.querySelector('a[href]');
      const nameNode = card.querySelector('.casino-list-name,.nm,.casino-name');
      const banner = card.querySelector('.casino-list-item-banner');
      const styleBg = banner && banner.style ? banner.style.backgroundImage : '';
      const csBg = banner ? getComputedStyle(banner).backgroundImage : '';
      return {
        i,
        href: a ? a.getAttribute('href') : '',
        name: nameNode ? String(nameNode.textContent || '').trim() : '',
        styleBg,
        csBg,
      };
    });
  });

  const out = {
    startUrl,
    firstHref,
    endUrl: page.url(),
    before,
    after,
    logs: logs.slice(-200)
  };
  fs.writeFileSync('tmp-click-card-debug.json', JSON.stringify(out, null, 2));
  await page.screenshot({ path: 'tmp-click-card-debug.png', fullPage: false });
  await browser.close();
})();
