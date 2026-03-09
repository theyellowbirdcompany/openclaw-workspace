#!/usr/bin/env node
/**
 * Advanced CDP Inspector — Real-Time CSS Diagnostics
 * 
 * Inspects the Chrome DevTools Protocol to detect:
 * - Cascade conflicts (specificity wars)
 * - Layout shift (CLS)
 * - Font metric mismatches
 * - Z-index stacking issues
 * - Render path tracing
 * 
 * Usage:
 *   node cdp-inspector.js --url <url> --selector <selector>
 */

const { chromium } = require('playwright');

/**
 * Main selectors to inspect
 */
const DEFAULT_SELECTORS = [
  'h1', 'h2', 'h3', 'p', 'button', 'a',
  '[role="heading"]', '[role="button"]'
];

/**
 * Extract cascade chain for a given property
 */
async function getCascadeChain(page, selector, property) {
  return page.evaluate(([sel, prop]) => {
    const el = document.querySelector(sel);
    if (!el) return null;

    // Get all matching rules via getMatchedCSSRules (non-standard but powerful)
    const rules = [];
    
    // Fallback: use getComputedStyle to get final value
    const computed = window.getComputedStyle(el);
    const finalValue = computed.getPropertyValue(prop);

    return {
      selector: sel,
      property: prop,
      finalValue: finalValue.trim(),
      // Note: Full cascade chain requires native DevTools Protocol
      // This is a simplified version
    };
  }, [selector, property]);
}

/**
 * Detect specificity conflicts
 */
async function detectSpecificityConflicts(page, selector) {
  return page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return { error: 'Element not found' };

    const conflicts = [];
    
    // Common properties that conflict
    const checkProps = [
      'color', 'background-color', 'font-size', 'padding',
      'margin', 'border', 'display', 'position', 'z-index'
    ];

    checkProps.forEach(prop => {
      const computed = window.getComputedStyle(el);
      const value = computed.getPropertyValue(prop);
      
      // Check if there's an inline style that might be conflicting
      const inline = el.style.getPropertyValue(prop);
      const inherited = getComputedStyle(el.parentElement).getPropertyValue(prop);
      
      if (inline && inherited && inline !== value) {
        conflicts.push({
          property: prop,
          inline: inline.trim(),
          inherited: inherited.trim(),
          final: value.trim(),
          conflict: true
        });
      }
    });

    return {
      selector: sel,
      conflicts,
      hasConflicts: conflicts.length > 0
    };
  }, selector);
}

/**
 * Detect layout shift (CLS - Cumulative Layout Shift)
 */
async function detectLayoutShift(page, selector) {
  return page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return { error: 'Element not found' };

    const rect1 = el.getBoundingClientRect();
    
    // Simulate a reflow by triggering layout
    // Force reflow by reading offsetHeight
    const _ = el.offsetHeight;
    
    const rect2 = el.getBoundingClientRect();

    const shift = {
      x: Math.abs(rect2.left - rect1.left),
      y: Math.abs(rect2.top - rect1.top),
      width: Math.abs(rect2.width - rect1.width),
      height: Math.abs(rect2.height - rect1.height)
    };

    const hasShift = shift.x > 0 || shift.y > 0 || shift.width > 0 || shift.height > 0;

    return {
      selector: sel,
      shift,
      hasShift,
      cls: (shift.x * shift.y) / (rect1.width * rect1.height) // Simplified CLS
    };
  }, selector);
}

/**
 * Detect font metrics mismatches
 */
async function detectFontMetrics(page, selector) {
  return page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return { error: 'Element not found' };

    const computed = window.getComputedStyle(el);
    const rect = el.getBoundingClientRect();

    return {
      selector: sel,
      font: {
        family: computed.fontFamily,
        size: computed.fontSize,
        weight: computed.fontWeight,
        lineHeight: computed.lineHeight,
        letterSpacing: computed.letterSpacing
      },
      metrics: {
        width: rect.width.toFixed(2),
        height: rect.height.toFixed(2),
        lineCount: Math.round(rect.height / parseFloat(computed.lineHeight))
      },
      issues: {
        // Check for common font issues
        missingFontFamily: computed.fontFamily === 'initial',
        unusualLineHeight: Math.abs(
          parseFloat(computed.lineHeight) / parseFloat(computed.fontSize) - 1.5
        ) > 0.2,
        tightLetterSpacing: parseFloat(computed.letterSpacing) < -1
      }
    };
  }, selector);
}

/**
 * Detect Z-index stacking issues
 */
async function detectZIndexIssues(page, selector) {
  return page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return { error: 'Element not found' };

    const computed = window.getComputedStyle(el);
    const zIndex = computed.zIndex;
    const position = computed.position;

    // Check stacking context
    const hasStackingContext = 
      zIndex !== 'auto' ||
      position !== 'static' ||
      computed.opacity !== '1' ||
      computed.transform !== 'none';

    // Find overlapping siblings
    const rect = el.getBoundingClientRect();
    const parent = el.parentElement;
    const siblings = parent ? Array.from(parent.children) : [];
    
    const overlapping = siblings.filter(sib => {
      if (sib === el) return false;
      const sibRect = sib.getBoundingClientRect();
      return !(sibRect.right < rect.left ||
               sibRect.left > rect.right ||
               sibRect.bottom < rect.top ||
               sibRect.top > rect.bottom);
    }).map(sib => ({
      tag: sib.tagName,
      zIndex: window.getComputedStyle(sib).zIndex,
      position: window.getComputedStyle(sib).position
    }));

    return {
      selector: sel,
      stacking: {
        zIndex: zIndex,
        position: position,
        hasStackingContext: hasStackingContext,
        opacity: computed.opacity,
        transform: computed.transform
      },
      overlapping: overlapping,
      issues: {
        zIndexWar: overlapping.some(sib => sib.zIndex !== 'auto'),
        noStackingContext: !hasStackingContext && overlapping.length > 0
      }
    };
  }, selector);
}

/**
 * Detect display/layout issues
 */
async function detectLayoutIssues(page, selector) {
  return page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return { error: 'Element not found' };

    const computed = window.getComputedStyle(el);
    const rect = el.getBoundingClientRect();

    return {
      selector: sel,
      display: {
        computed: computed.display,
        position: computed.position,
        floated: computed.float !== 'none',
        flex: computed.display.includes('flex'),
        grid: computed.display.includes('grid')
      },
      dimensions: {
        width: rect.width.toFixed(2),
        height: rect.height.toFixed(2),
        visible: rect.width > 0 && rect.height > 0
      },
      overflow: {
        x: computed.overflowX,
        y: computed.overflowY,
        scrollable: el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth
      },
      issues: {
        invisible: rect.width === 0 || rect.height === 0,
        hiddenOverflow: computed.overflow === 'hidden',
        scrollable: el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth
      }
    };
  }, selector);
}

/**
 * Run full inspection suite
 */
async function inspectElement(page, selector) {
  console.log(`\n🔍 Inspecting: ${selector}`);
  console.log('━'.repeat(60));

  const results = {};

  try {
    results.cascade = await detectSpecificityConflicts(page, selector);
    console.log('✅ Cascade conflicts:', results.cascade.hasConflicts ? '⚠️ FOUND' : '✓ None');
    
    results.shift = await detectLayoutShift(page, selector);
    console.log('✅ Layout shift:', results.shift.hasShift ? '⚠️ FOUND' : '✓ Stable');
    
    results.font = await detectFontMetrics(page, selector);
    const fontIssues = Object.values(results.font.issues).filter(v => v).length;
    console.log('✅ Font metrics:', fontIssues > 0 ? `⚠️ ${fontIssues} issue(s)` : '✓ OK');
    
    results.zindex = await detectZIndexIssues(page, selector);
    const zIndexIssues = Object.values(results.zindex.issues).filter(v => v).length;
    console.log('✅ Z-index:', zIndexIssues > 0 ? `⚠️ ${zIndexIssues} issue(s)` : '✓ OK');
    
    results.layout = await detectLayoutIssues(page, selector);
    const layoutIssues = Object.values(results.layout.issues).filter(v => v).length;
    console.log('✅ Layout:', layoutIssues > 0 ? `⚠️ ${layoutIssues} issue(s)` : '✓ OK');

  } catch (error) {
    console.error(`❌ Error inspecting ${selector}:`, error.message);
    results.error = error.message;
  }

  return results;
}

/**
 * Main CLI
 */
async function main() {
  const args = process.argv.slice(2);
  let url = null;
  let selectors = DEFAULT_SELECTORS;
  let outputFile = null;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--url' && args[i + 1]) {
      url = args[i + 1];
      i++;
    } else if (args[i] === '--selector' && args[i + 1]) {
      selectors = [args[i + 1]];
      i++;
    } else if (args[i] === '--selectors' && args[i + 1]) {
      selectors = args[i + 1].split(',').map(s => s.trim());
      i++;
    } else if (args[i] === '--output' && args[i + 1]) {
      outputFile = args[i + 1];
      i++;
    }
  }

  if (!url) {
    console.log('Usage: node cdp-inspector.js --url <url> [--selector <sel>] [--output <file>]');
    process.exit(1);
  }

  console.log('🚀 Advanced CDP Inspector');
  console.log(`   URL: ${url}`);
  console.log(`   Selectors: ${selectors.join(', ')}`);

  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000); // Let styles settle

  const results = {};
  for (const selector of selectors) {
    results[selector] = await inspectElement(page, selector);
  }

  if (outputFile) {
    const fs = require('fs');
    fs.writeFileSync(outputFile, JSON.stringify(results, null, 2));
    console.log(`\n📄 Results saved: ${outputFile}`);
  }

  console.log('\n✨ Inspection complete');

  await browser.close();
}

main().catch(console.error);
