#!/usr/bin/env node
/**
 * Multi-Viewport Visual Regression Testing
 * 
 * Extends visual-diff-loop to test across multiple breakpoints simultaneously.
 * Catches responsive design issues automatically.
 * 
 * Usage:
 *   node visual-diff-multiview.js --url <url> --baseline <path>
 *   node visual-diff-multiview.js --url <url> --baseline <path> --viewports mobile,tablet,desktop
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Standard viewport definitions
const VIEWPORTS = {
  mobile: { width: 375, height: 812, label: 'Mobile (iPhone 13)' },
  mobileLarge: { width: 428, height: 926, label: 'Mobile Large (iPhone 13 Pro Max)' },
  tablet: { width: 768, height: 1024, label: 'Tablet (iPad)' },
  desktop: { width: 1440, height: 900, label: 'Desktop (Standard)' },
  desktopLarge: { width: 1920, height: 1080, label: 'Desktop (Full HD)' },
  ultrawide: { width: 2560, height: 1440, label: 'Ultrawide (2K)' }
};

const DEFAULT_VIEWPORTS = ['mobile', 'tablet', 'desktop'];
const DRIFT_THRESHOLD = 0.5; // Alert if drift > 0.5%
const OUTPUT_DIR = '/home/clawd/.openclaw/workspace/visual-diff-loop.archive';

/**
 * Parse CLI arguments
 */
function parseArgs() {
  const args = process.argv.slice(2);
  const config = {
    url: null,
    baseline: null,
    viewports: DEFAULT_VIEWPORTS,
    threshold: DRIFT_THRESHOLD,
    outputDir: OUTPUT_DIR
  };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--url' && args[i + 1]) {
      config.url = args[i + 1];
      i++;
    } else if (args[i] === '--baseline' && args[i + 1]) {
      config.baseline = args[i + 1];
      i++;
    } else if (args[i] === '--viewports' && args[i + 1]) {
      config.viewports = args[i + 1].split(',').map(v => v.trim());
      i++;
    } else if (args[i] === '--threshold' && args[i + 1]) {
      config.threshold = parseFloat(args[i + 1]);
      i++;
    } else if (args[i] === '--output' && args[i + 1]) {
      config.outputDir = args[i + 1];
      i++;
    }
  }

  if (!config.url) {
    console.error('❌ Missing required argument: --url');
    process.exit(1);
  }

  return config;
}

/**
 * Validate viewport names
 */
function validateViewports(viewports) {
  const invalid = viewports.filter(v => !VIEWPORTS[v]);
  if (invalid.length > 0) {
    console.error(`❌ Invalid viewport(s): ${invalid.join(', ')}`);
    console.error(`   Available: ${Object.keys(VIEWPORTS).join(', ')}`);
    process.exit(1);
  }
}

/**
 * Run visual-diff-loop for a single viewport
 */
function runViewportTest(url, viewport, config) {
  const { width, height, label } = VIEWPORTS[viewport];
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const screenshotPath = path.join(config.outputDir, `${viewport}-${timestamp}.png`);
  
  console.log(`\n📱 Testing ${label} (${width}x${height})...`);

  try {
    // Create screenshot using CDP via visual-diff-loop
    const cmd = `node /home/clawd/.openclaw/workspace/visual-diff-loop.js \
      --url "${url}" \
      --width ${width} \
      --height ${height} \
      --output "${screenshotPath}" \
      ${config.baseline ? `--baseline "${config.baseline}-${viewport}.png"` : ''} \
      --threshold ${config.threshold}`;

    const output = execSync(cmd, { encoding: 'utf-8' });
    
    // Parse output for drift percentage
    const driftMatch = output.match(/Drift:\s*([\d.]+)%/);
    const drift = driftMatch ? parseFloat(driftMatch[1]) : null;

    return {
      viewport,
      label,
      width,
      height,
      screenshotPath,
      drift,
      passed: drift !== null && drift <= config.threshold,
      output
    };

  } catch (error) {
    return {
      viewport,
      label,
      width,
      height,
      screenshotPath: null,
      drift: null,
      passed: false,
      error: error.message
    };
  }
}

/**
 * Generate summary report
 */
function generateReport(results, config) {
  console.log('\n' + '='.repeat(60));
  console.log('MULTI-VIEWPORT VISUAL REGRESSION REPORT');
  console.log('='.repeat(60));
  console.log(`URL: ${config.url}`);
  console.log(`Threshold: ${config.threshold}%`);
  console.log(`Tested: ${results.length} viewport(s)`);
  console.log('');

  const passed = results.filter(r => r.passed).length;
  const failed = results.filter(r => !r.passed).length;

  // Results table
  console.log('Viewport          | Resolution    | Drift    | Status');
  console.log('------------------|---------------|----------|--------');
  
  results.forEach(r => {
    const viewport = r.label.padEnd(16);
    const resolution = `${r.width}x${r.height}`.padEnd(12);
    const drift = r.drift !== null ? `${r.drift.toFixed(2)}%`.padEnd(7) : 'N/A'.padEnd(7);
    const status = r.passed ? '✅ PASS' : '❌ FAIL';
    console.log(`${viewport} | ${resolution} | ${drift} | ${status}`);
  });

  console.log('');
  console.log(`✅ Passed: ${passed} / ${results.length}`);
  console.log(`❌ Failed: ${failed} / ${results.length}`);

  // Detailed failures
  if (failed > 0) {
    console.log('\n' + '='.repeat(60));
    console.log('FAILURES');
    console.log('='.repeat(60));
    
    results.filter(r => !r.passed).forEach(r => {
      console.log(`\n❌ ${r.label} (${r.width}x${r.height})`);
      if (r.error) {
        console.log(`   Error: ${r.error}`);
      } else if (r.drift > config.threshold) {
        console.log(`   Drift: ${r.drift.toFixed(2)}% (threshold: ${config.threshold}%)`);
        console.log(`   Screenshot: ${r.screenshotPath}`);
      }
    });
  }

  // Save JSON report
  const reportPath = path.join(config.outputDir, `report-${Date.now()}.json`);
  fs.writeFileSync(reportPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    url: config.url,
    threshold: config.threshold,
    results,
    summary: {
      total: results.length,
      passed,
      failed
    }
  }, null, 2));

  console.log(`\n📄 Report saved: ${reportPath}`);
  
  return failed === 0;
}

/**
 * Main execution
 */
async function main() {
  const config = parseArgs();
  
  console.log('🔍 Multi-Viewport Visual Regression Testing');
  console.log(`   URL: ${config.url}`);
  console.log(`   Viewports: ${config.viewports.join(', ')}`);
  console.log(`   Threshold: ${config.threshold}%`);

  // Validate viewports
  validateViewports(config.viewports);

  // Ensure output directory exists
  if (!fs.existsSync(config.outputDir)) {
    fs.mkdirSync(config.outputDir, { recursive: true });
  }

  // Run tests for each viewport
  const results = [];
  for (const viewport of config.viewports) {
    const result = runViewportTest(config.url, viewport, config);
    results.push(result);
  }

  // Generate report
  const allPassed = generateReport(results, config);

  // Exit with appropriate code
  process.exit(allPassed ? 0 : 1);
}

main().catch(error => {
  console.error('❌ Fatal error:', error.message);
  process.exit(1);
});
