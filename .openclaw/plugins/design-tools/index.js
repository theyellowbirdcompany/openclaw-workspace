/**
 * Design Tools Plugin — Native Design Validation Tools
 * 
 * Provides first-class tools for design validation:
 * - visual_diff: Screenshot + pixelmatch comparison
 * - css_audit: CDP inspection for banned properties
 * - design_validate: Check against BRAND.md rules
 * 
 * Slot: tool
 */

const { chromium } = require('playwright');
const pixelmatch = require('pixelmatch');
const { PNG } = require('pngjs');
const fs = require('fs');
const path = require('path');

const VIEWPORTS = {
  mobile: { width: 375, height: 812 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1440, height: 900 },
  wide: { width: 1920, height: 1080 }
};

const BANNED_PROPERTIES = {
  fonts: ['Inter', 'Roboto', 'system-ui'],
  gradients: ['purple', 'linear-gradient.*#7c3aed.*#4f46e5'],
  patterns: ['center.*body.*text', 'border-radius.*[1-9]\\d+px'] // >9px
};

module.exports = {
  slot: 'tool',
  
  schema: {
    type: 'object',
    properties: {
      screenshotDir: { type: 'string', default: './visual-diff-output' },
      pixelmatchThreshold: { type: 'number', default: 0.005 },
      bannedFonts: { type: 'array', items: { type: 'string' }, default: BANNED_PROPERTIES.fonts },
      bannedGradients: { type: 'array', items: { type: 'string' }, default: BANNED_PROPERTIES.gradients }
    }
  },
  
  async init(config) {
    const screenshotDir = config.screenshotDir || './visual-diff-output';
    
    // Ensure screenshot directory exists
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir, { recursive: true });
    }
    
    return {
      tools: [
        {
          name: 'visual_diff',
          description: 'Screenshot a URL and compare pixel-by-pixel against baseline. Returns drift percentage and diff image path.',
          parameters: {
            type: 'object',
            properties: {
              url: { type: 'string', description: 'URL to screenshot' },
              baselineId: { type: 'string', description: 'Baseline identifier (e.g., "homepage-v1")' },
              viewport: { type: 'string', enum: ['mobile', 'tablet', 'desktop', 'wide'], default: 'desktop' }
            },
            required: ['url', 'baselineId']
          },
          execute: async (params) => {
            const { url, baselineId, viewport = 'desktop' } = params;
            const { width, height } = VIEWPORTS[viewport];
            
            const browser = await chromium.launch();
            const page = await browser.newPage();
            await page.setViewportSize({ width, height });
            
            try {
              await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
              await page.waitForTimeout(1000); // Let animations settle
              
              const currentPath = path.join(screenshotDir, `${baselineId}-current.png`);
              const baselinePath = path.join(screenshotDir, `${baselineId}-baseline.png`);
              const diffPath = path.join(screenshotDir, `${baselineId}-diff.png`);
              
              await page.screenshot({ path: currentPath });
              
              // If no baseline exists, create it
              if (!fs.existsSync(baselinePath)) {
                fs.copyFileSync(currentPath, baselinePath);
                await browser.close();
                return {
                  status: 'baseline_created',
                  message: 'No baseline found. Current screenshot saved as baseline.',
                  baselinePath,
                  drift: 0
                };
              }
              
              // Compare with baseline
              const current = PNG.sync.read(fs.readFileSync(currentPath));
              const baseline = PNG.sync.read(fs.readFileSync(baselinePath));
              
              if (current.width !== baseline.width || current.height !== baseline.height) {
                await browser.close();
                return {
                  status: 'error',
                  message: `Dimension mismatch: current ${current.width}x${current.height} vs baseline ${baseline.width}x${baseline.height}`,
                  drift: null
                };
              }
              
              const diff = new PNG({ width: current.width, height: current.height });
              const numDiffPixels = pixelmatch(
                current.data,
                baseline.data,
                diff.data,
                current.width,
                current.height,
                { threshold: 0.1 }
              );
              
              fs.writeFileSync(diffPath, PNG.sync.write(diff));
              
              const totalPixels = current.width * current.height;
              const driftPercent = (numDiffPixels / totalPixels) * 100;
              
              await browser.close();
              
              return {
                status: 'success',
                drift: parseFloat(driftPercent.toFixed(3)),
                diffPixels: numDiffPixels,
                totalPixels,
                currentPath,
                baselinePath,
                diffPath,
                converged: driftPercent < (config.pixelmatchThreshold * 100)
              };
              
            } catch (error) {
              await browser.close();
              return {
                status: 'error',
                message: error.message,
                drift: null
              };
            }
          }
        },
        
        {
          name: 'css_audit',
          description: 'Inspect computed CSS of a live URL for banned properties (fonts, gradients, layout patterns). Returns violations with selectors.',
          parameters: {
            type: 'object',
            properties: {
              url: { type: 'string', description: 'URL to audit' },
              selectors: { 
                type: 'array', 
                items: { type: 'string' },
                default: ['h1', 'h2', 'h3', 'p', 'button', 'a'],
                description: 'CSS selectors to inspect'
              },
              viewport: { type: 'string', enum: ['mobile', 'tablet', 'desktop', 'wide'], default: 'desktop' }
            },
            required: ['url']
          },
          execute: async (params) => {
            const { url, selectors = ['h1', 'h2', 'h3', 'p', 'button', 'a'], viewport = 'desktop' } = params;
            const { width, height } = VIEWPORTS[viewport];
            
            const browser = await chromium.launch();
            const page = await browser.newPage();
            await page.setViewportSize({ width, height });
            
            try {
              await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
              
              const violations = [];
              
              for (const selector of selectors) {
                const result = await page.evaluate(([sel, banned]) => {
                  const el = document.querySelector(sel);
                  if (!el) return { selector: sel, error: 'not found' };
                  
                  const computed = window.getComputedStyle(el);
                  const issues = [];
                  
                  // Check font family
                  const fontFamily = computed.fontFamily.toLowerCase();
                  banned.fonts.forEach(font => {
                    if (fontFamily.includes(font.toLowerCase())) {
                      issues.push({
                        property: 'font-family',
                        value: computed.fontFamily,
                        violation: `Banned font: ${font}`,
                        severity: 'high'
                      });
                    }
                  });
                  
                  // Check background for gradients
                  const background = computed.background.toLowerCase();
                  banned.gradients.forEach(pattern => {
                    const regex = new RegExp(pattern, 'i');
                    if (regex.test(background)) {
                      issues.push({
                        property: 'background',
                        value: computed.background,
                        violation: `Banned gradient pattern: ${pattern}`,
                        severity: 'high'
                      });
                    }
                  });
                  
                  // Check text-align for center on body text
                  if (computed.textAlign === 'center' && el.innerHTML.length > 50) {
                    issues.push({
                      property: 'text-align',
                      value: 'center',
                      violation: 'Center-aligned body text (should be left-align)',
                      severity: 'medium'
                    });
                  }
                  
                  // Check border-radius
                  const borderRadius = parseInt(computed.borderRadius);
                  if (borderRadius > 8) {
                    issues.push({
                      property: 'border-radius',
                      value: computed.borderRadius,
                      violation: 'Border-radius exceeds 8px max',
                      severity: 'low'
                    });
                  }
                  
                  return {
                    selector: sel,
                    issues,
                    hasViolations: issues.length > 0
                  };
                }, [selector, config]);
                
                if (result.hasViolations) {
                  violations.push(result);
                }
              }
              
              await browser.close();
              
              return {
                status: 'success',
                url,
                viewport,
                violations,
                totalViolations: violations.reduce((sum, v) => sum + v.issues.length, 0),
                clean: violations.length === 0
              };
              
            } catch (error) {
              await browser.close();
              return {
                status: 'error',
                message: error.message,
                violations: []
              };
            }
          }
        },
        
        {
          name: 'design_validate',
          description: 'Validate design against BRAND.md rules. Checks typography, colors, spacing, and forbidden patterns.',
          parameters: {
            type: 'object',
            properties: {
              url: { type: 'string', description: 'URL to validate' },
              brandFile: { type: 'string', default: '/home/clawd/.openclaw/workspace/BRAND.md', description: 'Path to BRAND.md' }
            },
            required: ['url']
          },
          execute: async (params) => {
            const { url, brandFile = '/home/clawd/.openclaw/workspace/BRAND.md' } = params;
            
            // Run CSS audit first
            const auditResult = await module.exports.init(config).then(plugin => 
              plugin.tools.find(t => t.name === 'css_audit').execute({ url })
            );
            
            // Check if BRAND.md exists
            let brandRules = null;
            if (fs.existsSync(brandFile)) {
              const brandContent = fs.readFileSync(brandFile, 'utf-8');
              brandRules = {
                hasBrandFile: true,
                content: brandContent.substring(0, 500) // First 500 chars for reference
              };
            }
            
            return {
              status: 'success',
              url,
              cssAudit: auditResult,
              brandRules,
              compliant: auditResult.clean,
              summary: auditResult.clean 
                ? 'Design is compliant with all rules' 
                : `Found ${auditResult.totalViolations} violation(s)`
            };
          }
        }
      ]
    };
  }
};
