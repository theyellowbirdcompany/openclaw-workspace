#!/usr/bin/env node
/**
 * Self-Skill-Writer — Autonomous Rule Generation
 *
 * Detects repeated violations in MEMORY.md and source code,
 * then auto-generates permanent skills.
 *
 * Usage:
 *   node self-skill-writer.js --detect             # Scan for patterns (MEMORY + source)
 *   node self-skill-writer.js --detect --src <dir> # Scan source directory for inline styles
 *   node self-skill-writer.js --generate           # Create skills from detected patterns
 *   node self-skill-writer.js --report             # Print violation summary without generating
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ─── Config ──────────────────────────────────────────────────────────────────

const MEMORY_PATH  = '/home/clawd/.openclaw/workspaces/Devan/MEMORY.md';
const SKILLS_DIR   = '/home/clawd/.openclaw/workspaces/Devan/.agents/skills';
const AGENTS_PATH  = '/home/clawd/.openclaw/workspaces/Devan/AGENTS.md';
const DEFAULT_SRC  = '/home/clawd/.openclaw/workspace/projects/command-center/src/components';
const THRESHOLD    = 3;  // Pattern must appear this many times to auto-generate

// ─── MEMORY.md violation patterns ────────────────────────────────────────────

const MEMORY_PATTERNS = [
  {
    signature: /Inter|Roboto/gi,
    category: 'typography',
    violation: 'forbidden-font-family',
    rule: 'Never use Inter or Roboto — Space Mono (headings) + IBM Plex Sans (body) only.'
  },
  {
    signature: /purple.*gradient|gradient.*purple/gi,
    category: 'color',
    violation: 'purple-gradient-usage',
    rule: 'Purple-to-blue gradients are banned — use Navy/Gold palette from BRAND.md.'
  },
  {
    signature: /text-align:\s*center|centered.*body|center.*align.*body/gi,
    category: 'layout',
    violation: 'center-aligned-body-text',
    rule: 'Never center-align body copy — left-align for readability.'
  },
  {
    signature: /border-radius:\s*(9|[1-9]\d+)px/gi,
    category: 'styling',
    violation: 'excessive-border-radius',
    rule: 'Max 8px border-radius — sharp corners preferred per BRAND.md.'
  },
];

// ─── Source code inline-style patterns ───────────────────────────────────────

const SOURCE_PATTERNS = [
  {
    signature: /style\s*=\s*\{\{/g,
    category: 'inline-styles',
    violation: 'inline-style-block',
    rule: 'Inline style blocks (style={{...}}) should be refactored to Tailwind utility classes or CSS modules to keep design-system rules enforceable.'
  },
  {
    // Any style={{ ... fontFamily ... }} in JSX/TSX
    signature: /style=\{\{[^}]*fontFamily[^}]*\}\}/g,
    category: 'inline-styles',
    violation: 'inline-fontFamily',
    rule: 'fontFamily should never be set via inline style. Use Tailwind font-* classes or a CSS module.'
  },
  {
    signature: /style=\{\{[^}]*fontSize[^}]*\}\}/g,
    category: 'inline-styles',
    violation: 'inline-fontSize',
    rule: 'fontSize should be a Tailwind text-* class, not an inline style. Inline font sizes break design system scale enforcement.'
  },
  {
    signature: /style=\{\{[^}]*animation[^}]*\}\}/g,
    category: 'inline-styles',
    violation: 'inline-animation',
    rule: 'Animations should be declared in CSS/keyframes or Framer Motion variants, not inline styles. Inline animations cannot be overridden by prefers-reduced-motion media queries.'
  },
  {
    signature: /style=\{\{[^}]*lineHeight[^}]*\}\}/g,
    category: 'inline-styles',
    violation: 'inline-lineHeight',
    rule: 'lineHeight should be a Tailwind leading-* class. Inline line-heights create inconsistent typography across the system.'
  },
  {
    signature: /style=\{\{[^}]*background(?:Color)?[^}]*\}\}/g,
    category: 'inline-styles',
    violation: 'inline-background',
    rule: 'Background colors should use Tailwind bg-* classes or CSS variables. Inline background values cannot be audited by the CSS linter.'
  },
  {
    signature: /style=\{\{[^}]*transform[^}]*\}\}/g,
    category: 'inline-styles',
    violation: 'inline-transform',
    rule: 'CSS transforms should use Tailwind transform utilities or Framer Motion. Inline transforms are invisible to the style auditor.'
  },
];

// ─── File scanner ─────────────────────────────────────────────────────────────

function getSourceFiles(dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...getSourceFiles(full));
    } else if (/\.(jsx?|tsx?)$/.test(entry.name)) {
      results.push(full);
    }
  }
  return results;
}

function scanSource(dir) {
  const files = getSourceFiles(dir);
  const counts = {};  // violation -> { count, files: Set }

  for (const pattern of SOURCE_PATTERNS) {
    counts[pattern.violation] = { ...pattern, count: 0, fileSet: new Set() };
  }

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf-8');
    for (const pattern of SOURCE_PATTERNS) {
      const matches = content.match(pattern.signature) || [];
      if (matches.length > 0) {
        counts[pattern.violation].count += matches.length;
        counts[pattern.violation].fileSet.add(path.relative(dir, file));
      }
    }
  }

  return Object.values(counts).map(c => ({
    ...c,
    files: [...c.fileSet],
  }));
}

// ─── MEMORY scanner ───────────────────────────────────────────────────────────

function scanMemory() {
  if (!fs.existsSync(MEMORY_PATH)) {
    console.log('⚠️  MEMORY.md not found — skipping memory scan');
    return [];
  }

  const memory = fs.readFileSync(MEMORY_PATH, 'utf-8');
  return MEMORY_PATTERNS.map(p => ({
    ...p,
    count: (memory.match(p.signature) || []).length,
    files: ['MEMORY.md'],
  })).filter(p => p.count > 0);
}

// ─── Skill creation ───────────────────────────────────────────────────────────

function skillExists(violation) {
  const skillPath = path.join(SKILLS_DIR, `auto-${violation}`, 'SKILL.md');
  return fs.existsSync(skillPath);
}

function generateSkillContent(pattern) {
  return `# Auto-Generated Skill: ${pattern.violation}

**Category:** ${pattern.category}
**Generated:** ${new Date().toISOString()}
**Trigger:** Pattern detected ${pattern.count}x in ${pattern.files.join(', ')}

---

## Violation Pattern

\`\`\`
${pattern.signature.source}
\`\`\`

---

## Rule

${pattern.rule}

---

## Auto-Enforcement

This skill was automatically generated by the self-skill-writer after detecting repeated violations.

When triggered during design work:
1. Scan code/CSS for violation pattern
2. Alert agent immediately
3. Prevent shipping if violation detected
4. Run \`node css-linter.js <file>\` to verify after fix
5. Log to MEMORY.md for pattern tracking

---

## Affected Files (at time of generation)

${pattern.files.map(f => `- ${f}`).join('\n')}

---

## Integration

Add to Devan's AGENTS.md under "Auto-Generated Rules":

\`\`\`markdown
### ${pattern.violation}
- **Trigger:** \`${pattern.signature.source}\`
- **Action:** Block and alert
- **Skill:** auto-${pattern.violation}
\`\`\`

---

## Maintenance

If this rule changes or becomes obsolete:
1. Update SOUL.md with new conviction
2. Archive this skill (move to \`.archived/\`)
3. Re-run \`--generate\` to create updated skill

Self-skill-writer will detect the change and regenerate.

---

*Auto-generated by self-skill-writer.js v2 — ${new Date().toISOString()}*
`;
}

function createSkill(pattern) {
  const skillName = `auto-${pattern.violation}`;
  const skillDir  = path.join(SKILLS_DIR, skillName);
  const skillPath = path.join(skillDir, 'SKILL.md');

  fs.mkdirSync(skillDir, { recursive: true });
  fs.writeFileSync(skillPath, generateSkillContent(pattern));

  console.log(`✅ Created skill: ${skillName}`);
  return { skillName, skillPath };
}

function registerSkill(skillName, pattern) {
  if (!fs.existsSync(AGENTS_PATH)) {
    console.log('⚠️  AGENTS.md not found — skill created but not registered');
    return;
  }

  let agents = fs.readFileSync(AGENTS_PATH, 'utf-8');

  if (!agents.includes('## Auto-Generated Rules')) {
    agents += '\n\n---\n\n## Auto-Generated Rules\n\nSkills automatically created by self-skill-writer when patterns are detected.\n\n';
  }

  // Avoid duplicate entries
  if (agents.includes(`### ${pattern.violation}`)) {
    console.log(`   (already registered in AGENTS.md)`);
    return;
  }

  const entry = `\n### ${pattern.violation}\n- **Trigger:** \`${pattern.signature.source}\`\n- **Rule:** ${pattern.rule}\n- **Skill:** ${skillName}\n- **Generated:** ${new Date().toISOString()}\n`;
  agents += entry;
  fs.writeFileSync(AGENTS_PATH, agents);
  console.log(`   Registered in AGENTS.md`);
}

// ─── CLI ──────────────────────────────────────────────────────────────────────

function main() {
  const args = process.argv.slice(2);
  const action = args[0];
  const srcIdx = args.indexOf('--src');
  const srcDir = srcIdx >= 0 ? args[srcIdx + 1] : DEFAULT_SRC;

  if (!action || action === '--detect' || action === '--report') {
    const isReport = action === '--report';
    console.log('🔍 Scanning for repeated violation patterns…\n');

    const memoryHits  = scanMemory();
    const sourceHits  = scanSource(srcDir);
    const allHits     = [...memoryHits, ...sourceHits];
    const aboveThreshold = allHits.filter(h => h.count >= THRESHOLD);

    console.log(`📂 Source directory: ${srcDir}`);
    console.log(`📝 MEMORY.md: ${MEMORY_PATH}\n`);

    if (allHits.length === 0) {
      console.log('✅ No violations detected.');
      return;
    }

    console.log(`Found ${allHits.length} pattern(s) — ${aboveThreshold.length} above threshold (${THRESHOLD}+):\n`);

    allHits.forEach((h, i) => {
      const flag = h.count >= THRESHOLD ? '⚠️ ' : '   ';
      console.log(`${flag}${i + 1}. [${h.category}] ${h.violation}`);
      console.log(`       Count: ${h.count} | Threshold: ${THRESHOLD} | Skill exists: ${skillExists(h.violation) ? '✅' : '❌'}`);
      console.log(`       Files: ${h.files.slice(0, 3).join(', ')}${h.files.length > 3 ? ` (+${h.files.length - 3} more)` : ''}`);
      console.log('');
    });

    if (!isReport && aboveThreshold.length > 0) {
      console.log('Run with --generate to create skills for new violations.');
    }

  } else if (action === '--generate') {
    console.log('🤖 Auto-generating skills from detected patterns…\n');

    const memoryHits = scanMemory();
    const sourceHits = scanSource(srcDir);
    const allHits    = [...memoryHits, ...sourceHits].filter(h => h.count >= THRESHOLD);

    let created = 0;

    for (const pattern of allHits) {
      if (!skillExists(pattern.violation)) {
        const { skillName } = createSkill(pattern);
        registerSkill(skillName, pattern);
        created++;
      } else {
        console.log(`⏭️  Skipped: ${pattern.violation} (skill already exists)`);
      }
    }

    if (created > 0) {
      console.log(`\n✅ Created ${created} new skill(s) in ${SKILLS_DIR}`);
    } else if (allHits.length === 0) {
      console.log('✅ No patterns above threshold — nothing to generate.');
    } else {
      console.log('\n✅ All detected patterns already have skills.');
    }

  } else {
    console.log('Usage:');
    console.log('  node self-skill-writer.js --detect             # Scan for patterns');
    console.log('  node self-skill-writer.js --detect --src <dir> # Scan specific source dir');
    console.log('  node self-skill-writer.js --generate           # Create skills');
    console.log('  node self-skill-writer.js --report             # Summary only');
  }
}

main();
