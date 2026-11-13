const { chromium } = require('playwright-core');

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto('http://127.0.0.1:4400/home', { waitUntil: 'networkidle' });
  console.log('URL=', page.url());
  const title = await page.title();
  const bodyText = await page.evaluate(() => (document.body ? document.body.innerText : '').slice(0, 400));
  console.log('TITLE=', title);
  console.log('BODY=', bodyText.replace(/\s+/g, ' ').trim());
  await page.screenshot({ path: 'tmp-home-current-390.png', fullPage: true });
  await browser.close();
})();
