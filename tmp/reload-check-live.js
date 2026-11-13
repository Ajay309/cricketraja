const { chromium } = require('playwright-core');

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  });
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();

  await page.goto('http://127.0.0.1:4400/', { waitUntil: 'domcontentloaded' });
  await page.getByRole('button', { name: 'Login with demo ID' }).click();
  await page.waitForURL('**/home', { timeout: 15000 });
  await page.waitForTimeout(800);

  await page.reload({ waitUntil: 'domcontentloaded' });
  const checkpoints = [120, 250, 400, 650, 900, 1300, 1800, 2600];
  const start = Date.now();

  function normalize(s) {
    return String(s || '').replace(/\s+/g, ' ').trim();
  }

  for (const ms of checkpoints) {
    const now = Date.now();
    const wait = ms - (now - start);
    if (wait > 0) await page.waitForTimeout(wait);

    const state = await page.evaluate(() => {
      const balNodes = Array.from(document.querySelectorAll('.user-balance')).map((n) => (n.innerText || n.textContent || '').trim());
      const primaryNodes = Array.from(document.querySelectorAll('[data-local-user-primary]')).map((n) => ({
        primary: n.getAttribute('data-local-user-primary'),
        text: (n.innerText || n.textContent || '').trim(),
        display: getComputedStyle(n).display,
        vis: getComputedStyle(n).visibility
      }));
      const headerText = (document.querySelector('.header-top')?.innerText || '').trim();
      return { balNodes, primaryNodes, headerText };
    });

    const hasOld = state.balNodes.some((t) => /exp\s*:\s*demo_user/i.test(t));
    const hasNew = state.balNodes.some((t) => /exposure\s*:\s*0/i.test(t)) && state.balNodes.some((t) => /available\s*:\s*1500/i.test(t));
    console.log(
      JSON.stringify({
        at: ms,
        hasOld,
        hasNew,
        balNodes: state.balNodes.map(normalize),
        primaryNodes: state.primaryNodes.map((x) => ({ primary: x.primary, display: x.display, vis: x.vis, text: normalize(x.text).slice(0, 120) }))
      })
    );
  }

  await page.screenshot({ path: 'tmp-reload-flash-live-before-fix.png', fullPage: true });
  await browser.close();
})();
