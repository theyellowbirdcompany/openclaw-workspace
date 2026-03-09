#!/usr/bin/env node
/**
 * CDP Auto-Fix — Self-Correcting CSS Engine
 * 
 * Integrates CDP Inspector with Design Entity:
 * 1. Runs CDP inspection
 * 2. Analyzes issues
 * 3. Generates CSS fixes
 * 4. Feeds findings to self-skill-writer
 * 
 * Usage:
 *   node cdp-auto-fix.js --url <url> --css-file <path>
 */

const fs = require('fs');
const { execSync } = require('child_process');

/**
 * Issue severity scoring
 */
const SEVERITY = {
  CRITICAL: 3,  // Invisible elements, layout collapse
  HIGH: 2,      // Z-index wars, font issues
  MEDIUM: 1,    // Scrollable overflow, minor layout
  LOW: 0        // Informational
};

/**
 * Analyze CDP inspection results
 */
function analyzeResults(results) {
  const issues = [];

  for (const [selector, data] of Object.entries(results)) {
    // Check for invisible elements
    if (data.layout?.issues?.invisible) {
      issues.push({
        selector,
        type: 'invisible-element',
        severity: SEVERITY.CRITICAL,
        message: `Element is invisible (0x0 dimensions)`,
        fix: 'Check display, opacity, or visibility properties',
        cssHint: `${selector} { display: block; /* or inline-block */ }`
      });
    }

    // Check for z-index wars
    if (data.zindex?.issues?.zIndexWar) {
      issues.push({
        selector,
        type: 'z-index-war',
        severity: SEVERITY.HIGH,
        message: 'Z-index conflict with overlapping elements',
        fix: 'Simplify z-index hierarchy or use stacking contexts',
        cssHint: `/* Review z-index values for ${selector} and siblings */`
      });
    }

    // Check for stacking context issues
    if (data.zindex?.issues?.noStackingContext && data.zindex?.overlapping?.length > 0) {
      issues.push({
        selector,
        type: 'no-stacking-context',
        severity: SEVERITY.MEDIUM,
        message: `Overlapping elements without stacking context`,
        fix: 'Add position: relative or create explicit stacking context',
        cssHint: `${selector} { position: relative; z-index: 1; }`
      });
    }

    // Check for font metric issues
    if (data.font?.issues?.unusualLineHeight) {
      issues.push({
        selector,
        type: 'unusual-line-height',
        severity: SEVERITY.HIGH,
        message: 'Line-height ratio is unusual (not ~1.5)',
        fix: 'Adjust line-height for better readability',
        cssHint: `${selector} { line-height: 1.5; }`
      });
    }

    if (data.font?.issues?.tightLetterSpacing) {
      issues.push({
        selector,
        type: 'tight-letter-spacing',
        severity: SEVERITY.MEDIUM,
        message: 'Letter-spacing is too tight (< -1px)',
        fix: 'Increase letter-spacing for readability',
        cssHint: `${selector} { letter-spacing: normal; }`
      });
    }

    // Check for layout shift
    if (data.shift?.hasShift && data.shift.cls > 0.001) {
      issues.push({
        selector,
        type: 'layout-shift',
        severity: SEVERITY.HIGH,
        message: `Layout shift detected (CLS: ${data.shift.cls.toFixed(4)})`,
        fix: 'Stabilize layout with explicit dimensions',
        cssHint: `${selector} { width: ${data.layout.dimensions.width}px; height: ${data.layout.dimensions.height}px; }`
      });
    }

    // Check for scrollable overflow (potential issue)
    if (data.layout?.issues?.scrollable) {
      issues.push({
        selector,
        type: 'scrollable-overflow',
        severity: SEVERITY.MEDIUM,
        message: 'Element has scrollable overflow',
        fix: 'Review if overflow should be visible or hidden',
        cssHint: `${selector} { overflow: auto; /* or hidden */ }`
      });
    }

    // Check for cascade conflicts
    if (data.cascade?.hasConflicts) {
      data.cascade.conflicts.forEach(conflict => {
        issues.push({
          selector,
          type: 'cascade-conflict',
          severity: SEVERITY.HIGH,
          message: `Property conflict: ${conflict.property}`,
          fix: `Inline (${conflict.inline}) overrides inherited (${conflict.inherited})`,
          cssHint: `/* Review specificity for ${conflict.property} on ${selector} */`
        });
      });
    }
  }

  return issues;
}

/**
 * Generate fix suggestions
 */
function generateFixReport(issues) {
  console.log('\n' + '='.repeat(60));
  console.log('CDP AUTO-FIX REPORT');
  console.log('='.repeat(60));

  if (issues.length === 0) {
    console.log('✅ No issues detected!');
    return;
  }

  // Group by severity
  const critical = issues.filter(i => i.severity === SEVERITY.CRITICAL);
  const high = issues.filter(i => i.severity === SEVERITY.HIGH);
  const medium = issues.filter(i => i.severity === SEVERITY.MEDIUM);
  const low = issues.filter(i => i.severity === SEVERITY.LOW);

  console.log(`\nTotal issues: ${issues.length}`);
  console.log(`  🔴 Critical: ${critical.length}`);
  console.log(`  🟠 High: ${high.length}`);
  console.log(`  🟡 Medium: ${medium.length}`);
  console.log(`  🟢 Low: ${low.length}`);

  // Print critical issues first
  if (critical.length > 0) {
    console.log('\n' + '='.repeat(60));
    console.log('🔴 CRITICAL ISSUES');
    console.log('='.repeat(60));
    critical.forEach(printIssue);
  }

  if (high.length > 0) {
    console.log('\n' + '='.repeat(60));
    console.log('🟠 HIGH PRIORITY ISSUES');
    console.log('='.repeat(60));
    high.forEach(printIssue);
  }

  if (medium.length > 0) {
    console.log('\n' + '='.repeat(60));
    console.log('🟡 MEDIUM PRIORITY ISSUES');
    console.log('='.repeat(60));
    medium.forEach(printIssue);
  }
}

function printIssue(issue) {
  console.log(`\n${issue.selector}`);
  console.log(`  Type: ${issue.type}`);
  console.log(`  Issue: ${issue.message}`);
  console.log(`  Fix: ${issue.fix}`);
  if (issue.cssHint) {
    console.log(`  Suggested CSS:\n    ${issue.cssHint}`);
  }
}

/**
 * Feed recurring issues to self-skill-writer
 */
function feedToSelfSkillWriter(issues, memoryPath) {
  // Log issues to MEMORY.md for pattern detection
  if (!fs.existsSync(memoryPath)) {
    console.log(`⚠️  Memory file not found: ${memoryPath}`);
    return;
  }

  const timestamp = new Date().toISOString();
  const entry = `\n## CDP Auto-Fix Run — ${timestamp}\n\n`;
  
  let log = entry;
  
  issues.forEach(issue => {
    log += `- **${issue.type}** on \`${issue.selector}\`: ${issue.message}\n`;
  });

  fs.appendFileSync(memoryPath, log);
  console.log(`\n📝 Logged ${issues.length} issue(s) to ${memoryPath}`);
  console.log('   Self-skill-writer will detect patterns after 3+ occurrences');
}

/**
 * Generate CSS patch file
 */
function generateCSSPatch(issues, outputPath) {
  let css = `/* CDP Auto-Fix Suggestions — ${new Date().toISOString()} */\n\n`;
  
  const critical = issues.filter(i => i.severity === SEVERITY.CRITICAL);
  const high = issues.filter(i => i.severity === SEVERITY.HIGH);

  if (critical.length > 0) {
    css += `/* CRITICAL FIXES (apply immediately) */\n\n`;
    critical.forEach(issue => {
      if (issue.cssHint) {
        css += `${issue.cssHint}\n\n`;
      }
    });
  }

  if (high.length > 0) {
    css += `/* HIGH PRIORITY FIXES */\n\n`;
    high.forEach(issue => {
      if (issue.cssHint) {
        css += `${issue.cssHint}\n\n`;
      }
    });
  }

  fs.writeFileSync(outputPath, css);
  console.log(`\n📄 CSS patch generated: ${outputPath}`);
  console.log('   Review and apply manually');
}

/**
 * Main CLI
 */
async function main() {
  const args = process.argv.slice(2);
  let url = null;
  let cssFile = null;
  let selectors = 'h1,h2,h3,p,button,a';
  const inspectionResults = 'cdp-inspection-results.json';
  const memoryPath = '/home/clawd/.openclaw/workspaces/Devan/MEMORY.md';

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--url' && args[i + 1]) {
      url = args[i + 1];
      i++;
    } else if (args[i] === '--css-file' && args[i + 1]) {
      cssFile = args[i + 1];
      i++;
    } else if (args[i] === '--selectors' && args[i + 1]) {
      selectors = args[i + 1];
      i++;
    }
  }

  if (!url) {
    console.log('Usage: node cdp-auto-fix.js --url <url> [--css-file <path>] [--selectors <sel>]');
    process.exit(1);
  }

  console.log('🔧 CDP Auto-Fix Engine');
  console.log(`   URL: ${url}`);
  console.log(`   Selectors: ${selectors}`);

  // Step 1: Run CDP inspection
  console.log('\n📊 Step 1: Running CDP inspection...');
  try {
    execSync(
      `node cdp-inspector.js --url "${url}" --selectors "${selectors}" --output "${inspectionResults}"`,
      { stdio: 'inherit' }
    );
  } catch (error) {
    console.error('❌ CDP inspection failed:', error.message);
    process.exit(1);
  }

  // Step 2: Load results
  console.log('\n📂 Step 2: Analyzing results...');
  const results = JSON.parse(fs.readFileSync(inspectionResults, 'utf-8'));
  const issues = analyzeResults(results);

  // Step 3: Generate report
  generateFixReport(issues);

  // Step 4: Generate CSS patch
  if (issues.length > 0) {
    const patchFile = cssFile ? cssFile : 'cdp-auto-fix.css';
    generateCSSPatch(issues, patchFile);

    // Step 5: Feed to self-skill-writer
    feedToSelfSkillWriter(issues, memoryPath);
  }

  console.log('\n✨ Auto-fix complete');
}

main().catch(console.error);
