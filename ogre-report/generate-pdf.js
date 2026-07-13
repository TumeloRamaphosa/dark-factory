const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  let browser;
  try {
    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    const html = fs.readFileSync('/workspace/ogre-report/report.html', 'utf8');
    await page.setContent(html, { waitUntil: 'networkidle', timeout: 30000 });
    await page.pdf({
      path: '/workspace/ogre-report/OGRE-Computer-Skills-Report.pdf',
      format: 'A4',
      printBackground: true,
      margin: { top: '15mm', bottom: '15mm', left: '12mm', right: '12mm' }
    });
    console.log('SUCCESS: PDF written');
  } catch(e) {
    console.error('ERROR:', e.message);
  } finally {
    if (browser) await browser.close();
  }
})();
