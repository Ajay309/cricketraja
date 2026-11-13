const { chromium } = require('playwright-core');

async function runCase(name, contextOptions) {
  const browser = await chromium.launch({
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    headless: true,
    args: ['--no-sandbox']
  });

  const context = await browser.newContext(contextOptions || {});
  const page = await context.newPage();
  const logs = [];

  page.on('console', (msg) => logs.push({ type: msg.type(), text: msg.text() }));
  page.on('pageerror', (err) => logs.push({ type: 'pageerror', text: err.message }));

  const response = await page.goto('http://127.0.0.1:3000/', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await page.waitForTimeout(7000);

  const state = await page.evaluate(() => {
    const root = document.querySelector('#root');
    const bodyStyle = window.getComputedStyle(document.body);
    return {
      href: window.location.href,
      title: document.title,
      rootExists: Boolean(root),
      rootChildCount: root ? root.childElementCount : -1,
      rootTextLen: root ? root.textContent.length : -1,
      rootHtmlLen: root ? root.innerHTML.length : -1,
      bodyDisplay: bodyStyle.display,
      bodyVisibility: bodyStyle.visibility,
      bodyOpacity: bodyStyle.opacity
    };
  });

  const errorLike = logs.filter(
    (entry) =>
      entry.type === 'error' ||
      entry.type === 'pageerror' ||
      /failed|error|blocked|exception/i.test(entry.text)
  );

  console.log(`CASE:${name}`);
  console.log(`STATUS:${response ? response.status() : 'none'}`);
  console.log(`STATE:${JSON.stringify(state)}`);
  console.log(`ERRORS:${JSON.stringify(errorLike.slice(0, 30))}`);

  await browser.close();
}

(async () => {
  await runCase('desktop-default', {});

  await runCase('mobile-iphone', {
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: 3,
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1'
  });

  await runCase('mobile-desktop-mode', {
    viewport: { width: 980, height: 844 },
    isMobile: false,
    hasTouch: true,
    deviceScaleFactor: 2,
    userAgent:
      'Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Mobile Safari/537.36'
  });
})();
