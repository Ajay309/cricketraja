const { chromium } = require('playwright-core');

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });

  await page.goto('http://127.0.0.1:4400/', { waitUntil: 'domcontentloaded' });
  await page.getByRole('button', { name: 'Login with demo ID' }).click();
  await page.waitForURL('**/home', { timeout: 15000 });
  await page.waitForTimeout(1200);

  const detail = await page.evaluate(() => {
    const ub = document.querySelector('.user-balance');
    if (!ub) return { found: false };
    const rows = Array.from(ub.querySelectorAll('div')).map((row) => ({
      html: row.outerHTML,
      text: (row.innerText || row.textContent || '').replace(/\s+/g, ' ').trim(),
      children: Array.from(row.children).map((c) => ({ tag: c.tagName, text: (c.innerText || c.textContent || '').trim(), cls: c.className || '', disp: getComputedStyle(c).display }))
    }));
    return {
      found: true,
      ubHtml: ub.outerHTML,
      ubText: (ub.innerText || ub.textContent || '').replace(/\s+/g, ' ').trim(),
      rows,
      fullHeader: ((document.querySelector('.header-top') || document.querySelector('.top-header'))?.outerHTML || '').slice(0, 3000)
    };
  });

  console.log(JSON.stringify(detail, null, 2));
  await page.screenshot({ path: 'tmp-header-debug-no-available-values.png', fullPage: true });
  await browser.close();
})();
