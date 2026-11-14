const { chromium } = require('playwright-core');
(async () => {
  const failed = [];
  const httpErr = [];
  const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
  const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
  page.on('requestfailed', (req) => {
    const u=req.url();
    if (req.resourceType()==='image' || /(png|jpe?g|gif|webp|svg)(\?|$)/i.test(u)) failed.push(`${req.failure()?.errorText || 'failed'} ${u}`);
  });
  page.on('response', (res) => {
    const u=res.url();
    if ((res.request().resourceType()==='image' || /(png|jpe?g|gif|webp|svg)(\?|$)/i.test(u)) && res.status()>=400) httpErr.push(`${res.status()} ${u}`);
  });
  await page.goto('https://cricketraja.vercel.app/#/', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(5000);
  await page.screenshot({ path: 'tmp/missing-audit-after-fix.png', fullPage: true });
  await browser.close();
  console.log('FAILED=' + failed.length);
  failed.slice(0,50).forEach(x=>console.log(x));
  console.log('HTTPERR=' + httpErr.length);
  httpErr.slice(0,50).forEach(x=>console.log(x));
})();
