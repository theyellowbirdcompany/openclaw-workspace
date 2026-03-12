const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const base = 'https://test-mu-beryl-17.vercel.app';
const routes = ['/', '/agents', '/command-center', '/queue'];
const outDir = path.resolve('output/playwright/Christopher');
fs.mkdirSync(outDir, { recursive: true });

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const results = [];

  for (const route of routes) {
    const page = await context.newPage();
    const consoleMessages = [];
    const pageErrors = [];
    const requestFailures = [];
    let mainResponse = null;

    page.on('console', msg => {
      const type = msg.type();
      const text = msg.text();
      if (['error', 'warning'].includes(type)) consoleMessages.push({ type, text });
    });
    page.on('pageerror', err => pageErrors.push(String(err)));
    page.on('requestfailed', req => requestFailures.push({ url: req.url(), failure: req.failure() }));

    const url = new URL(route, base).toString();
    let navError = null;
    try {
      mainResponse = await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    } catch (e) {
      navError = String(e);
    }

    await page.waitForTimeout(1500).catch(() => {});

    const shotName = route === '/' ? 'root' : route.replace(/^\//, '').replace(/\//g, '-');
    const screenshotPath = path.join(outDir, `${shotName}.png`);
    try {
      await page.screenshot({ path: screenshotPath, fullPage: true });
    } catch {}

    const assessment = await page.evaluate(() => {
      const bodyText = (document.body?.innerText || '').trim();
      const bodyHTML = document.body?.innerHTML || '';
      const visibleTextLen = bodyText.length;
      const hasAppContent = visibleTextLen > 40;
      const possible404 = /404|not found|page not found/i.test(bodyText);
      const blankish = visibleTextLen < 20 && bodyHTML
        .replace(/<script[\s\S]*?<\/script>/gi, '')
        .replace(/<style[\s\S]*?<\/style>/gi, '')
        .replace(/<[^>]+>/g, '')
        .trim().length < 20;
      return {
        title: document.title,
        visibleTextLen,
        hasAppContent,
        possible404,
        blankish,
        bodySnippet: bodyText.slice(0, 400)
      };
    }).catch(err => ({ evalError: String(err) }));

    results.push({
      route,
      url,
      status: mainResponse ? mainResponse.status() : null,
      ok: mainResponse ? mainResponse.ok() : false,
      finalUrl: page.url(),
      navError,
      screenshotPath,
      consoleMessages,
      pageErrors,
      requestFailures,
      assessment
    });

    await page.close();
  }

  const reportPath = path.join(outDir, 'report.json');
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
  await browser.close();
  console.log(reportPath);
})();
