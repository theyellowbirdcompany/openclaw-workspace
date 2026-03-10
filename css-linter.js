#!/usr/bin/env node

/**
 * CSS / JSX Style Linter for Design System Compliance
 * Checks forbidden style patterns from BRAND.md and detects inline-style violations.
 */

const fs = require('fs');
const path = require('path');

const BANNED_PATTERNS = {
  fonts: {
    inter: { pattern: /font-family\s*:\s*['"]*inter/i, message: 'Banned font: Inter. Use Space Mono + IBM Plex Sans.' },
    roboto: { pattern: /font-family\s*:\s*['"]*roboto/i, message: 'Banned font: Roboto. Use Space Mono + IBM Plex Sans.' },
    systemui: { pattern: /font-family\s*:\s*['"]*system-ui/i, message: 'Banned font: system-ui. Use Space Mono + IBM Plex Sans.' },
  },
  gradients: {
    purpleblue: {
      pattern: /gradient\s*\([^)]*(?:#7c3aed|purple)[^)]*(?:#4f46e5|blue)|gradient\s*\([^)]*(?:#4f46e5|blue)[^)]*(?:#7c3aed|purple)/i,
      message: 'Banned gradient: Purple-to-blue. Use Navy/Gold palette from BRAND.md.'
    },
  },
  layout: {
    centeredtext: {
      pattern: /text-align\s*:\s*center/i,
      message: 'Center-aligned text detected. Body copy should be left-aligned or asymmetric.'
    },
  },
  spacing: {
    largeborderradius: {
      pattern: /border-radius\s*:\s*(9|[1-9][0-9]+)px/i,
      message: 'Border-radius >8px detected. Maximum 8px unless badge element.'
    },
    pilledcorners: {
      pattern: /border-radius\s*:\s*(50%|9999px)/i,
      message: 'Fully rounded corners (pill shape) detected. Only allowed on badges.'
    },
  },
  animation: {
    bounceeasing: {
      pattern: /ease(?:-in-out)?-bounce|\bbounce\b/i,
      message: 'Banned animation: Bounce easing. Use linear, ease, or custom cubic-bezier.'
    },
    continuousspin: {
      pattern: /animation\s*:[^;]*spin[^;]*infinite|@keyframes\s+spin/i,
      message: 'Continuous spin animation detected. Only allowed for loading indicators.'
    },
  },
};

const INTERACTIVE_TAGS = new Set([
  'button', 'a', 'input', 'select', 'textarea', 'summary', 'option', 'label'
]);

const INLINE_STYLE_BANNED_KEYS = new Set([
  'fontFamily',
  'fontSize',
  'lineHeight',
  'letterSpacing',
  'animation',
  'transition',
  'transform',
  'borderRadius',
  'boxShadow',
  'background',
  'backgroundColor',
  'color'
]);

class CSSLinter {
  constructor(filePath) {
    this.filePath = filePath;
    this.content = fs.readFileSync(filePath, 'utf-8');
    this.ext = path.extname(filePath).toLowerCase();
    this.warnings = [];
    this.errors = [];
  }

  lint() {
    // Check all banned patterns
    for (const category in BANNED_PATTERNS) {
      for (const patternName in BANNED_PATTERNS[category]) {
        const { pattern, message } = BANNED_PATTERNS[category][patternName];

        if (pattern.test(this.content)) {
          this.errors.push({
            category,
            pattern: patternName,
            message,
            severity: 'error'
          });
        }
      }
    }

    // Additional heuristic checks
    this.checkTypography();
    this.checkLayout();
    this.checkMotion();

    if (this.isCodeFile()) {
      this.checkInlineStyles();
    }

    return {
      file: this.filePath,
      passed: this.errors.length === 0,
      errors: this.errors,
      warnings: this.warnings,
      summary: `${this.errors.length} errors, ${this.warnings.length} warnings`
    };
  }

  isCodeFile() {
    return ['.js', '.jsx', '.ts', '.tsx'].includes(this.ext);
  }

  checkInlineStyles() {
    const elementStyleRegex = /<([A-Za-z][\w.]*)\b([^>]*?)\bstyle\s*=\s*\{\{([\s\S]*?)\}\}([^>]*)>/g;
    let match;
    let inlineStyleCount = 0;

    while ((match = elementStyleRegex.exec(this.content)) !== null) {
      inlineStyleCount += 1;

      const tagName = (match[1] || '').toLowerCase();
      const before = match[2] || '';
      const styleObject = match[3] || '';
      const after = match[4] || '';
      const attrs = `${before} ${after}`;

      const keys = [...styleObject.matchAll(/([A-Za-z_$][\w$]*)\s*:/g)].map(m => m[1]);
      const bannedKeys = keys.filter(k => INLINE_STYLE_BANNED_KEYS.has(k));
      const interactiveByTag = INTERACTIVE_TAGS.has(tagName);
      const interactiveByAttrs = /\bonClick\s*=|\bonKeyDown\s*=|\bonKeyUp\s*=|\bonKeyPress\s*=|\btabIndex\s*=|\brole\s*=\s*["']button["']/i.test(attrs);
      const interactiveDiv = tagName === 'div' && interactiveByAttrs;
      const interactive = interactiveByTag || interactiveDiv;

      if (interactive) {
        this.errors.push({
          category: 'inlineStyles',
          pattern: 'interactive-inline-style',
          severity: 'error',
          message: `Inline style on interactive element <${tagName}> detected. Move styling to className/Tailwind for maintainability and accessibility consistency.`
        });
      }

      if (bannedKeys.length > 0) {
        this.errors.push({
          category: 'inlineStyles',
          pattern: 'banned-inline-style-keys',
          severity: 'error',
          message: `Inline style uses banned keys (${[...new Set(bannedKeys)].join(', ')}). Move these styles to CSS/Tailwind classes.`
        });
      }
    }

    if (inlineStyleCount > 0) {
      this.warnings.push({
        severity: 'warning',
        message: `${inlineStyleCount} inline style block(s) detected. Prefer utility classes/CSS modules for design-system compliance.`
      });
    }

    // Catch unresolved style= prop even if regex above misses complex expressions
    const genericInlineStyleUsages = (this.content.match(/\bstyle\s*=\s*\{\{/g) || []).length;
    if (genericInlineStyleUsages > inlineStyleCount) {
      this.warnings.push({
        severity: 'warning',
        message: `Detected ${genericInlineStyleUsages - inlineStyleCount} additional complex inline style expression(s). Review manually.`
      });
    }
  }

  checkTypography() {
    // Check font families are from approved list
    const fontFamilies = this.content.match(/font-family\s*:\s*([^;]+)/gi) || [];
    const approvedFonts = ['Space Mono', 'IBM Plex Sans', 'IBM Plex Mono'];

    fontFamilies.forEach(decl => {
      const fonts = decl.split(':')[1].split(',').map(f => f.trim());
      const hasApproved = fonts.some(f =>
        approvedFonts.some(af => f.toLowerCase().includes(af.toLowerCase()))
      );

      if (!hasApproved) {
        this.warnings.push({
          message: `Font declaration uses non-standard fonts: ${fonts.join(', ')}. Prefer Space Mono + IBM Plex Sans.`,
          severity: 'warning'
        });
      }
    });
  }

  checkLayout() {
    // Check for centered layouts
    const centerAligns = (this.content.match(/text-align\s*:\s*center/gi) || []).length;
    if (centerAligns > 0) {
      this.warnings.push({
        message: `${centerAligns} instance(s) of center alignment. Use left-align or asymmetric layout for body content.`,
        severity: 'warning'
      });
    }

    // Check for hero sections (heuristic)
    if (this.content.includes('hero') || this.content.includes('banner')) {
      if (/margin\s*:\s*0\s+auto|display\s*:\s*flex.*justify-content\s*:\s*center/i.test(this.content)) {
        this.warnings.push({
          message: 'Hero/banner section appears centered. Consider asymmetric layout for visual interest.',
          severity: 'warning'
        });
      }
    }
  }

  checkMotion() {
    // Check animation durations
    const animationDurations = this.content.match(/animation\s*:[^;]*(\d+(?:\.\d+)?)(m?s)/gi) || [];
    animationDurations.forEach(anim => {
      const ms = anim.match(/(\d+(?:\.\d+)?)(m?s)/i);
      if (ms) {
        const value = parseFloat(ms[1]);
        const unit = ms[2].toLowerCase();
        const duration = unit === 'ms' ? value : value * 1000;

        // Check against BRAND.md approved timings
        const approvedTimings = {
          micro: 100,
          fast: 250,
          standard: [300, 400],
          entrance: [800, 1200],
          pulse: 1500
        };

        const isApproved = Object.values(approvedTimings).some(t => {
          if (Array.isArray(t)) return duration >= t[0] && duration <= t[1];
          return duration === t;
        });

        if (!isApproved) {
          this.warnings.push({
            message: `Animation duration ${Math.round(duration)}ms may not follow BRAND.md timing tokens. Approved: Micro(100ms), Fast(250ms), Standard(300-400ms), Entrance(800-1200ms), Pulse(1500ms).`,
            severity: 'warning'
          });
        }
      }
    });
  }
}

// CLI usage
if (require.main === module) {
  const filePath = process.argv[2];

  if (!filePath) {
    console.error('Usage: css-linter.js <file-path>');
    process.exit(1);
  }

  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
  }

  const linter = new CSSLinter(filePath);
  const results = linter.lint();

  // Output results as JSON
  console.log(JSON.stringify(results, null, 2));

  // Exit with error code if violations found
  process.exit(results.errors.length > 0 ? 1 : 0);
}

module.exports = CSSLinter;
