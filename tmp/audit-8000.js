const { chromium } = require('playwright-core');
(async()=>{
  const b=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
  const p=await b.newPage({viewport:{width:1600,height:900}});
  const bad=[];
  p.on('response',r=>{const u=r.url(); if((r.request().resourceType()==='image'||/(png|jpe?g|gif|webp|svg)(\?|$)/i.test(u))&&r.status()>=400) bad.push(`${r.status()} ${u}`);});
  await p.goto('http://127.0.0.1:8000/#/',{waitUntil:'networkidle',timeout:60000});
  await p.waitForTimeout(4000);
  await p.screenshot({path:'tmp/missing-audit-8000.png',fullPage:true});
  await b.close();
  console.log('IMAGE_HTTP_ERRORS='+bad.length);
  bad.slice(0,30).forEach(x=>console.log(x));
})();
