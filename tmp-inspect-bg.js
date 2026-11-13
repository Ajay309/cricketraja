const { chromium } = require('playwright-core');
(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    args: ['--no-sandbox', '--disable-dev-shm-usage']
  });
  const page = await browser.newPage({ viewport: { width: 1700, height: 950 } });
  await page.goto('http://localhost:4400/home', { waitUntil: 'domcontentloaded', timeout: 120000 });
  const demoBtn = page.locator('button:has-text("Login with demo ID"), a:has-text("Login with demo ID")').first();
  if (await demoBtn.count()) {
    await demoBtn.click({ timeout: 20000 });
  }
  await page.waitForTimeout(9000);

  const info = await page.evaluate(() => {
    const targetTexts = ['MAC EXCITE LOBBY', 'CASINO WAR', 'AK47 TEENPATTI', 'TEENPATTI ONE DAY'];
    const out = [];
    for (const txt of targetTexts) {
      const node = Array.from(document.querySelectorAll('*')).find((el) => String(el.textContent || '').trim() === txt);
      if (!node) {
        out.push({ txt, found: false });
        continue;
      }
      const chain = [];
      let cur = node;
      for (let i = 0; i < 6 && cur; i++) {
        const cs = window.getComputedStyle(cur);
        chain.push({
          tag: cur.tagName,
          cls: cur.className,
          id: cur.id,
          bg: cs.backgroundImage,
          bgc: cs.backgroundColor,
          inline: cur.getAttribute('style') || ''
        });
        cur = cur.parentElement;
      }
      out.push({ txt, found: true, chain });
    }

    const bgNodes = Array.from(document.querySelectorAll('*')).filter((el) => {
      const cs = window.getComputedStyle(el);
      const bg = String(cs.backgroundImage || '');
      return bg && bg !== 'none' && /default\.jpg|casino|sitethemedata|spade|lc\//i.test(bg);
    }).slice(0, 80).map((el) => {
      const cs = window.getComputedStyle(el);
      return {
        tag: el.tagName,
        cls: el.className,
        id: el.id,
        text: String(el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 80),
        bg: cs.backgroundImage,
        inline: el.getAttribute('style') || ''
      };
    });

    return { out, bgNodesCount: bgNodes.length, bgNodes };
  });

  require('fs').writeFileSync('tmp-bg-inspect.json', JSON.stringify(info, null, 2));
  await browser.close();
})();
