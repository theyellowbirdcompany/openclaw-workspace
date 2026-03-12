#!/usr/bin/env node
/**
 * Advanced CDP Inspector — Real-Time CSS + Accessibility Diagnostics
 *
 * Inspects the Chrome DevTools Protocol (via Playwright page evaluate) to detect:
 * - Cascade conflicts (specificity wars)
 * - Layout shift (CLS)
 * - Font metric mismatches
 * - Z-index stacking issues
 * - Interactive accessibility issues (including interactive div audits)
 *
 * Usage:
 *   node cdp-inspector.js --url <url> --selector <selector>
 */

const { chromium } = require('playwright');

const DEFAULT_SELECTORS = [
  'h1', 'h2', 'h3', 'p', 'button', 'a',
  '[role="heading"]', '[role="button"]',
  'div[onclick]', 'div[tabindex]', 'div[role="button"]'
];

async function detectSpecificityConflicts(page, selector) {
  return page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return { error: 'Element not found' };

    const conflicts = [];
    const checkProps = [
      'color', 'background-color', 'font-size', 'line-height', 'padding',
      'margin', 'border', 'display', 'position', 'z-index', 'opacity'
    ];

    const equivalentCssValues = (a, b, prop, computed) => {
      const va = (a || '').trim();
      const vb = (b || '').trim();
      if (va === vb) return true;

      // line-height can be unitless inline but computed to px.
      if (prop === 'line-height') {
        const inlineUnitless = parseFloat(va);
        const computedPx = parseFloat(vb);
        const fontSizePx = parseFloat(computed.fontSize || '0');
        if (!Number.isNaN(inlineUnitless) && !Number.isNaN(computedPx) && fontSizePx > 0) {
          const inlineAsPx = inlineUnitless * fontSizePx;
          if (Math.abs(inlineAsPx - computedPx) < 0.1) return true;
        }
      }

      const na = parseFloat(va);
      const nb = parseFloat(vb);
      if (!Number.isNaN(na) && !Number.isNaN(nb) && Math.abs(na - nb) < 0.01) {
        return true;
      }

      return false;
    };

    checkProps.forEach(prop => {
      const computed = window.getComputedStyle(el);
      const value = computed.getPropertyValue(prop);
      const inline = el.style.getPropertyValue(prop);
      const inherited = el.parentElement ? getComputedStyle(el.parentElement).getPropertyValue(prop) : null;

      // Flag only when inline is present and appears to be overridden by cascade.
      if (inline && !equivalentCssValues(inline, value, prop, computed)) {
        conflicts.push({
          property: prop,
          inline: inline.trim(),
          inherited: inherited ? inherited.trim() : null,
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

async function detectLayoutShift(page, selector) {
  return page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return { error: 'Element not found' };

    const rect1 = el.getBoundingClientRect();
    // Force reflow
    void el.offsetHeight;
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
      cls: rect1.width > 0 && rect1.height > 0
        ? (shift.x * shift.y) / (rect1.width * rect1.height)
        : 0
    };
  }, selector);
}

async function detectFontMetrics(page, selector) {
  return page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return { error: 'Element not found' };

    const computed = window.getComputedStyle(el);
    const rect = el.getBoundingClientRect();

    const fontSize = parseFloat(computed.fontSize);
    const rawLineHeight = computed.lineHeight;
    const numericLineHeight = parseFloat(rawLineHeight);
    const hasNumericLineHeight = !Number.isNaN(numericLineHeight);
    const lineHeightRatio = hasNumericLineHeight && fontSize > 0 ? numericLineHeight / fontSize : null;

    // Buttons often look best around 1.2 - 1.6; text blocks can be larger.
    const tag = el.tagName.toLowerCase();
    const unusualLineHeight = hasNumericLineHeight
      ? (tag === 'button' ? (lineHeightRatio < 1.2 || lineHeightRatio > 1.6) : (lineHeightRatio < 1.1 || lineHeightRatio > 2.0))
      : false;

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
        lineCount: hasNumericLineHeight && numericLineHeight > 0
          ? Math.round(rect.height / numericLineHeight)
          : null,
        lineHeightRatio
      },
      issues: {
        missingFontFamily: computed.fontFamily === 'initial' || computed.fontFamily.trim() === '',
        unusualLineHeight,
        tightLetterSpacing: parseFloat(computed.letterSpacing) < -1,
        nonNumericLineHeightOnButton: tag === 'button' && !hasNumericLineHeight
      }
    };
  }, selector);
}

async function detectZIndexIssues(page, selector) {
  return page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return { error: 'Element not found' };

    const computed = window.getComputedStyle(el);
    const zIndex = computed.zIndex;
    const position = computed.position;

    const hasStackingContext =
      zIndex !== 'auto' ||
      position !== 'static' ||
      computed.opacity !== '1' ||
      computed.transform !== 'none';

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
        zIndex,
        position,
        hasStackingContext,
        opacity: computed.opacity,
        transform: computed.transform
      },
      overlapping,
      issues: {
        zIndexWar: overlapping.some(sib => sib.zIndex !== 'auto'),
        noStackingContext: !hasStackingContext && overlapping.length > 0
      }
    };
  }, selector);
}

async function detectLayoutIssues(page, selector) {
  return page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return { error: 'Element not found' };

    const computed = window.getComputedStyle(el);
    const rect = el.getBoundingClientRect();

    const effectivelyInvisible =
      rect.width === 0 ||
      rect.height === 0 ||
      computed.display === 'none' ||
      computed.visibility === 'hidden' ||
      parseFloat(computed.opacity) === 0;

    const overflowed = el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth;
    const allowsScroll = ['auto', 'scroll', 'overlay'].includes(computed.overflowY) || ['auto', 'scroll', 'overlay'].includes(computed.overflowX);
    const actionableScrollableIssue = overflowed && allowsScroll;

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
        visible: !effectivelyInvisible
      },
      overflow: {
        x: computed.overflowX,
        y: computed.overflowY,
        overflowed,
        scrollable: actionableScrollableIssue
      },
      issues: {
        invisible: effectivelyInvisible,
        hiddenOverflow: computed.overflow === 'hidden',
        scrollable: actionableScrollableIssue
      }
    };
  }, selector);
}

async function detectAccessibilityIssues(page, selector) {
  return page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return { error: 'Element not found' };

    const tag = el.tagName.toLowerCase();
    const role = (el.getAttribute('role') || '').toLowerCase();
    const tabIndexAttr = el.getAttribute('tabindex');
    const tabIndex = tabIndexAttr !== null ? Number(tabIndexAttr) : null;

    const hasOnClick = typeof el.onclick === 'function' || el.hasAttribute('onclick');
    const hasKeyboardHandler =
      typeof el.onkeydown === 'function' ||
      typeof el.onkeyup === 'function' ||
      typeof el.onkeypress === 'function' ||
      el.hasAttribute('onkeydown') ||
      el.hasAttribute('onkeyup') ||
      el.hasAttribute('onkeypress');

    const hasAriaLabel = !!el.getAttribute('aria-label') || !!el.getAttribute('aria-labelledby');

    const isNativeInteractive = ['button', 'a', 'input', 'select', 'textarea', 'summary'].includes(tag);
    const isInteractiveDiv = tag === 'div' && (hasOnClick || role === 'button' || tabIndex !== null);

    const issues = {
      interactiveDivMissingRole: isInteractiveDiv && !role,
      interactiveDivMissingTabIndex: isInteractiveDiv && tabIndex === null,
      interactiveDivMissingKeyboardSupport: isInteractiveDiv && !hasKeyboardHandler,
      interactiveNoAccessibleName:
        (isNativeInteractive || isInteractiveDiv) && !hasAriaLabel && !el.textContent?.trim(),
      buttonRoleUsedOnNonInteractiveElement: role === 'button' && !isNativeInteractive && tabIndex === null
    };

    return {
      selector: sel,
      accessibility: {
        tag,
        role: role || null,
        tabIndex,
        hasOnClick,
        hasKeyboardHandler,
        hasAriaLabel,
        isNativeInteractive,
        isInteractiveDiv
      },
      issues
    };
  }, selector);
}

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
    const fontIssues = Object.values(results.font.issues || {}).filter(Boolean).length;
    console.log('✅ Font metrics:', fontIssues > 0 ? `⚠️ ${fontIssues} issue(s)` : '✓ OK');

    results.zindex = await detectZIndexIssues(page, selector);
    const zIndexIssues = Object.values(results.zindex.issues || {}).filter(Boolean).length;
    console.log('✅ Z-index:', zIndexIssues > 0 ? `⚠️ ${zIndexIssues} issue(s)` : '✓ OK');

    results.layout = await detectLayoutIssues(page, selector);
    const layoutIssues = Object.values(results.layout.issues || {}).filter(Boolean).length;
    console.log('✅ Layout:', layoutIssues > 0 ? `⚠️ ${layoutIssues} issue(s)` : '✓ OK');

    results.a11y = await detectAccessibilityIssues(page, selector);
    const a11yIssues = Object.values(results.a11y.issues || {}).filter(Boolean).length;
    console.log('✅ Accessibility:', a11yIssues > 0 ? `⚠️ ${a11yIssues} issue(s)` : '✓ OK');
  } catch (error) {
    console.error(`❌ Error inspecting ${selector}:`, error.message);
    results.error = error.message;
  }

  return results;
}

function summarizeResults(results) {
  const summary = {
    selectors: Object.keys(results).length,
    totalIssues: 0,
    byCategory: {
      cascade: 0,
      shift: 0,
      font: 0,
      zindex: 0,
      layout: 0,
      a11y: 0
    }
  };

  for (const selector of Object.keys(results)) {
    const result = results[selector];
    if (!result || result.error) continue;

    if (result.cascade?.hasConflicts) summary.byCategory.cascade += result.cascade.conflicts.length;
    if (result.shift?.hasShift) summary.byCategory.shift += 1;
    if (result.font?.issues) summary.byCategory.font += Object.values(result.font.issues).filter(Boolean).length;
    if (result.zindex?.issues) summary.byCategory.zindex += Object.values(result.zindex.issues).filter(Boolean).length;
    if (result.layout?.issues) summary.byCategory.layout += Object.values(result.layout.issues).filter(Boolean).length;
    if (result.a11y?.issues) summary.byCategory.a11y += Object.values(result.a11y.issues).filter(Boolean).length;
  }

  summary.totalIssues = Object.values(summary.byCategory).reduce((a, b) => a + b, 0);
  return summary;
}

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
      selectors = args[i + 1].split(',').map(s => s.trim()).filter(Boolean);
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
  await page.waitForTimeout(1200);

  const results = {};
  for (const selector of selectors) {
    results[selector] = await inspectElement(page, selector);
  }

  const summary = summarizeResults(results);
  const finalPayload = { summary, results };

  if (outputFile) {
    const fs = require('fs');
    fs.writeFileSync(outputFile, JSON.stringify(finalPayload, null, 2));
    console.log(`\n📄 Results saved: ${outputFile}`);
  }

  console.log(`\n✨ Inspection complete — total issues: ${summary.totalIssues}`);
  console.log('   Breakdown:', summary.byCategory);

  await browser.close();
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
