const { chromium } = require('playwright-core');

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto('http://127.0.0.1:4400/', { waitUntil: 'domcontentloaded' });
  const buttons = await page.evaluate(() => {
    const nodes = Array.from(document.querySelectorAll('button, a, div[role="button"], span'));
    return nodes.map(n => ({tag:n.tagName, text:(n.innerText||n.textContent||'').trim(), cls:n.className||'', id:n.id||''})).filter(x => x.text && /demo|login/i.test(x.text)).slice(0,40);
  });
  console.log(JSON.stringify(buttons, null, 2));
  await browser.close();
})();
