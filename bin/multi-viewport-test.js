#!/usr/bin/env node
/**
 * Multi-Viewport Screenshot & Compare
 * Simple standalone tool for responsive design testing
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const VIEWPORTS = {
  mobile: { width: 375, height: 812, name: 'Mobile' },
  tablet: { width: 768, height: 1024, name: 'Tablet' },
  desktop: { width: 1440, height: 900, name: 'Desktop' },
  wide: { width: 1920, height: 1080, name: 'Wide' }
};

async function captureViewport(url, viewport, outputDir) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.setViewportSize({ width: viewport.width, height: viewport.height });
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000); // Let animations settle
  
  const filename = `${viewport.name.toLowerCase()}-${viewport.width}x${viewport.height}.png`;
  const filepath = path.join(outputDir, filename);
  
  await page.screenshot({ path: filepath, fullPage: false });
  await browser.close();
  
  return filepath;
}

async function main() {
  const args = process.argv.slice(2);
  const url = args.find((a, i) => args[i-1] === '--url');
  const outputDir = args.find((a, i) => args[i-1] === '--output') || './screenshots';
  
  if (!url) {
    console.log('Usage: node multi-viewport-test.js --url <url> [--output <dir>]');
    process.exit(1);
  }
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  console.log(`\n📸 Multi-Viewport Screenshot Test`);
  console.log(`URL: ${url}\n`);
  
  for (const [key, viewport] of Object.entries(VIEWPORTS)) {
    console.log(`📱 ${viewport.name} (${viewport.width}x${viewport.height})...`);
    const filepath = await captureViewport(url, viewport, outputDir);
    console.log(`   ✅ ${filepath}\n`);
  }
  
  console.log(`\n✅ Complete! Screenshots saved to: ${outputDir}`);
}

main().catch(console.error);
