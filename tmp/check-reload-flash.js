const { chromium } = require('playwright-core');

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  });
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();

  await page.addInitScript(() => {
    const root = {
      data: JSON.stringify({ user_name: 'demo_user', uname: 'demo_user', username: 'demo_user', bal: 1500, exp: 0, exposure: 0 }),
      auth: JSON.stringify({ user_name: 'demo_user', uname: 'demo_user', username: 'demo_user', token: 'x', bal: 1500, exp: 0, exposure: 0 }),
      user: JSON.stringify({ data: JSON.stringify({ user_name: 'demo_user', uname: 'demo_user', username: 'demo_user', bal: 1500, exp: 0, exposure: 0 }) })
    };
    localStorage.setItem('persist:root', JSON.stringify(root));
    localStorage.setItem('token', 'x');
    localStorage.setItem('user_name', 'demo_user');
  });

  const url = 'http://127.0.0.1:4400/home';
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(500);

  await page.reload({ waitUntil: 'domcontentloaded' });
  const checkpoints = [150, 400, 800, 1200, 1800, 2600];
  const start = Date.now();

  function normalize(s) {
    return String(s || '').replace(/\s+/g, ' ').trim();
  }

  for (const ms of checkpoints) {
    const now = Date.now();
    const wait = ms - (now - start);
    if (wait > 0) await page.waitForTimeout(wait);
    const state = await page.evaluate(() => {
      const ub = Array.from(document.querySelectorAll('.user-balance')).map(n => n.innerText || n.textContent || '');
      const userNodes = Array.from(document.querySelectorAll('.header-top .user-details, .top-header .user-details, .user-details')).map(n => ({
        primary: n.getAttribute('data-local-user-primary'),
        text: (n.innerText || n.textContent || '').trim(),
        display: getComputedStyle(n).display,
        visibility: getComputedStyle(n).visibility
      }));
      return { ub, userNodes };
    });
    const line = {
      at: ms,
      ub: state.ub.map(normalize),
      userNodes: state.userNodes.map((n) => ({ primary: n.primary, text: normalize(n.text), display: n.display, visibility: n.visibility }))
    };
    console.log(JSON.stringify(line));
  }

  await page.screenshot({ path: 'tmp-reload-flash-postcheck.png', fullPage: true });
  await browser.close();
})();
