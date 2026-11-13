const { chromium } = require('playwright-core');

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' });
  const context = await browser.newContext({ viewport: { width: 1366, height: 768 } });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4400/', { waitUntil: 'domcontentloaded' });
  await page.getByRole('button', { name: 'Login with demo ID' }).click();
  await page.waitForURL('**/home', { timeout: 15000 });
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(400);
  const state = await page.evaluate(() => {
    const userDetails = Array.from(document.querySelectorAll('.header-top .user-details, .top-header .user-details, .user-details')).map((n) => ({
      primary: n.getAttribute('data-local-user-primary'),
      display: getComputedStyle(n).display,
      vis: getComputedStyle(n).visibility,
      text: (n.innerText || '').replace(/\s+/g, ' ').trim()
    }));
    const visible = userDetails.filter((n) => n.display !== 'none' && n.vis !== 'hidden');
    return { userDetails, visibleCount: visible.length };
  });
  console.log(JSON.stringify(state, null, 2));
  await page.screenshot({ path: 'tmp-desktop-reload-after-fix.png', fullPage: true });
  await browser.close();
})();
