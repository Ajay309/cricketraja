const { chromium } = require('playwright-core');

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });

  await page.goto('http://127.0.0.1:4400/', { waitUntil: 'domcontentloaded' });
  await page.getByRole('button', { name: 'Login with demo ID' }).click();
  await page.waitForURL('**/home', { timeout: 15000 });
  await page.waitForTimeout(700);

  const state = await page.evaluate(() => {
    const userBalanceTexts = Array.from(document.querySelectorAll('.user-balance')).map((n) => (n.innerText || n.textContent || '').replace(/\s+/g, ' ').trim());
    const hasAvailableWord = /available\s*:/i.test((document.body && document.body.innerText) || '');
    const headerText = ((document.querySelector('.header-top') || document.querySelector('.top-header'))?.innerText || '').replace(/\s+/g, ' ').trim();
    return { userBalanceTexts, hasAvailableWord, headerText };
  });

  console.log(JSON.stringify(state, null, 2));
  await page.screenshot({ path: 'tmp-header-no-available-mobile.png', fullPage: true });
  await browser.close();
})();
