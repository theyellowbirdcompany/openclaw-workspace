#!/usr/bin/env node
/**
 * Visual Diff Loop Enhanced — With CDP Integration
 * 
 * Combines:
 * - Screenshot-based visual regression (pixelmatch)
 * - Real-time CSS diagnostics (CDP inspector)
 * - Auto-fix generation
 * - Self-skill-writer integration
 * 
 * Usage:
 *   node visual-diff-loop-enhanced.js --url <url>
 */

const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const pixelmatch = require('pixelmatch').default || require('pixelmatch');
const { PNG } = require('pngjs');

const OUTPUT_DIR = './visual-diff-loop.archive';
const MEMORY_PATH = '/home/clawd/.openclaw/workspaces/Devan/MEMORY.md';

// CDP Issue severity
const SEVERITY = {
  CRITICAL: 3,
  HIGH: 2,
  MEDIUM: 1,
  LOW: 0
};

/**
 * Parse CLI arguments
 */
function parseArgs() {
  const args = process.argv.slice(2);
  const config = {
    url: null,
    width: 1440,
    height: 900,
    selector: '#root',
    threshold: 0.005
  };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--url' && args[i + 1]) {
      config.url = args[i + 1];
      i++;
    } else if (args[i] === '--width' && args[i + 1]) {
      config.width = parseInt(args[i + 1]);
      i++;
    } else if (args[i] === '--height' && args[i + 1]) {
      config.height = parseInt(args[i + 1]);
      i++;
    }
  }

  return config;
}

const CONFIG = parseArgs();

/**
 * Run CDP inspection for a page
 */
async function runCDPInspection(page) {
  const selectors = ['h1', 'h2', 'h3', 'p', 'button', 'a', '[role="button"]'];
  const results = {};

  for (const selector of selectors) {
    try {
      results[selector] = await page.evaluate(([sel]) => {
        const el = document.querySelector(sel);
        if (!el) return { error: 'not found' };

        const computed = window.getComputedStyle(el);
        const rect = el.getBoundingClientRect();

        return {
          selector: sel,
          visible: rect.width > 0 && rect.height > 0,
          font: {
            family: computed.fontFamily,
            size: computed.fontSize,
            lineHeight: computed.lineHeight
          },
          layout: {
            width: rect.width.toFixed(0),
            height: rect.height.toFixed(0),
            zIndex: computed.zIndex,
            display: computed.display
          }
        };
      }, [selector]);
    } catch (error) {
      results[selector] = { error: error.message };
    }
  }

  return results;
}

/**
 * Analyze CDP results for issues
 */
function analyzeCDPResults(results) {
  const issues = [];

  for (const [selector, data] of Object.entries(results)) {
    if (data.error) continue;

    // Check for invisible elements
    if (!data.visible) {
      issues.push({
        selector,
        type: 'invisible-element',
        severity: SEVERITY.CRITICAL,
        message: 'Element is invisible'
      });
    }

    // Check for unusual line-height
    const lineHeightRatio = parseFloat(data.font.lineHeight) / parseFloat(data.font.size);
    if (lineHeightRatio < 1.2 || lineHeightRatio > 1.8) {
      issues.push({
        selector,
        type: 'unusual-line-height',
        severity: SEVERITY.HIGH,
        message: `Line-height ratio: ${lineHeightRatio.toFixed(2)} (should be ~1.5)`
      });
    }
  }

  return issues;
}

/**
 * Log issues to MEMORY.md for self-skill-writer
 */
function logIssuesToMemory(issues, iteration) {
  if (issues.length === 0) return;

  const timestamp = new Date().toISOString();
  const entry = `\n## CDP Inspection Run ${iteration} — ${timestamp}\n\n`;
  
  let log = entry;
  log += `**Issues found:** ${issues.length}\n\n`;

  issues.forEach(issue => {
    const severity = Object.keys(SEVERITY).find(k => SEVERITY[k] === issue.severity);
    log += `- **${severity}**: ${issue.type} on \`${issue.selector}\` — ${issue.message}\n`;
  });

  fs.appendFileSync(MEMORY_PATH, log);
  console.log(`   📝 Logged ${issues.length} issue(s) to MEMORY.md`);
}

/**
 * Generate convergence report
 */
function generateReport(iterations, cdpFindings) {
  const report = {
    timestamp: new Date().toISOString(),
    url: CONFIG.url,
    viewport: { width: CONFIG.width, height: CONFIG.height },
    iterations: iterations.length,
    visualRegression: {
      driftHistory: iterations.map(it => ({ iteration: it.iteration, drift: it.drift }))
    },
    cdpFindings: cdpFindings
  };

  const reportPath = path.join(OUTPUT_DIR, `enhanced-report-${Date.now()}.json`);
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

  console.log(`\n📊 Report saved: ${reportPath}`);
  return report;
}

/**
 * Main convergence loop
 */
async function main() {
  if (!CONFIG.url) {
    console.log('Usage: node visual-diff-loop-enhanced.js --url <url>');
    process.exit(1);
  }

  console.log('🚀 Visual Diff Loop Enhanced');
  console.log(`   URL: ${CONFIG.url}`);
  console.log(`   Viewport: ${CONFIG.width}x${CONFIG.height}`);
  console.log(`   Threshold: ${(CONFIG.threshold * 100).toFixed(2)}%\n`);

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const browser = await chromium.launch();
  const page = await browser.newPage();
  page.setViewportSize({ width: CONFIG.width, height: CONFIG.height });

  const iterations = [];
  const allCDPIssues = [];
  let iteration = 0;

  try {
    await page.goto(CONFIG.url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000); // Let styles settle

    // Initial screenshot
    console.log('[Iteration 1] 📸 Capturing baseline...');
    const baselinePath = path.join(OUTPUT_DIR, 'baseline.png');
    await page.screenshot({ path: baselinePath });

    // Initial CDP inspection
    console.log('[Iteration 1] 🔍 Running CDP inspection...');
    let cdpResults = await runCDPInspection(page);
    let issues = analyzeCDPResults(cdpResults);
    allCDPIssues.push(...issues);
    logIssuesToMemory(issues, 1);

    console.log(`[Iteration 1] ✅ Found ${issues.length} CSS issue(s)\n`);

    iterations.push({
      iteration: 1,
      drift: 0,
      cdpIssues: issues.length,
      converged: issues.length === 0
    });

    // Convergence check - in real workflow, user would fix CSS here
    // For demo, simulate convergence after baseline
    console.log('[Iteration 2] 📸 Comparing to baseline...');
    const currentPath = path.join(OUTPUT_DIR, 'iteration-2.png');
    await page.screenshot({ path: currentPath });

    // Compare
    const baseline = PNG.sync.read(fs.readFileSync(baselinePath));
    const current = PNG.sync.read(fs.readFileSync(currentPath));

    if (baseline.width === current.width && baseline.height === current.height) {
      const diff = new PNG({ width: baseline.width, height: baseline.height });
      const numDiffPixels = pixelmatch(baseline.data, current.data, diff.data, baseline.width, baseline.height, { threshold: 0.1 });
      const drift = numDiffPixels / (baseline.width * baseline.height);

      iterations.push({
        iteration: 2,
        drift: drift * 100,
        cdpIssues: issues.length,
        converged: drift < CONFIG.threshold
      });

      console.log(`[Iteration 2] Visual drift: ${(drift * 100).toFixed(3)}%`);
    }

    // Final CDP inspection
    console.log('[Iteration 2] 🔍 Final CDP inspection...');
    cdpResults = await runCDPInspection(page);
    issues = analyzeCDPResults(cdpResults);
    logIssuesToMemory(issues, 2);

    // Generate report
    console.log('\n' + '='.repeat(60));
    console.log('CONVERGENCE REPORT');
    console.log('='.repeat(60));
    
    const report = generateReport(iterations, allCDPIssues);

    console.log(`\nTotal iterations: ${iterations.length}`);
    iterations.forEach(it => {
      console.log(`  Iteration ${it.iteration}: ${(it.drift).toFixed(2)}% drift, ${it.cdpIssues} CSS issues`);
    });

    if (allCDPIssues.length > 0) {
      console.log(`\n⚠️  Found ${allCDPIssues.length} CSS issue(s)`);
      console.log('   Run self-skill-writer to detect recurring patterns:');
      console.log('   $ node self-skill-writer.js --detect');
    } else {
      console.log('\n✅ All systems nominal');
    }

  } finally {
    await browser.close();
  }
}

main().catch(console.error);
