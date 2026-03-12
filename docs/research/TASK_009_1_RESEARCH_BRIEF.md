# Task #009.1 - UNIX File Structure Research Brief

**Status:** READY FOR CHRISTOPHER
**Posted by:** Bernard (Task #009 Lead)
**Assigned to:** @Christopher
**Priority:** High
**Due:** 2026-03-10 13:00
**Est. Duration:** 3-4 hours

---

## Mission

Research UNIX filesystem principles and modern workspace organization patterns to inform our workspace restructure strategy.

## Context

Brett wants a UNIX-inspired file structure for the entire OpenClaw workspace. Our current structure evolved organically and confuses agents. We need comprehensive research to ground a strategic redesign that will be implemented by Atlas.

This research directly feeds into the UNIX-inspired file structure specification (Task #009 main deliverable).

---

## Research Areas

### 1. UNIX Filesystem Principles & Hierarchy

**What to research:**
- Core UNIX philosophy: "everything is a file", "do one thing well", composability, simplicity
- Traditional UNIX directory hierarchy (/, /bin, /lib, /etc, /usr, /var, /home, /opt, /tmp)
- Why these patterns work (discoverability, predictability, separation of concerns)
- Modern interpretations (XDG Base Directory Specification, Filesystem Hierarchy Standard)
- UNIX path conventions and symbolic links

**Key questions:**
- What makes UNIX filesystem hierarchy intuitive?
- How do the traditional directories map to modern development needs?
- What principles are still relevant vs outdated?

### 2. Monorepo & Workspace Organization Best Practices

**What to research:**
- How companies structure multi-project monorepos (Google Bazel, Facebook Buck, Microsoft Rush)
- Modern monorepo tools: Nx, Turborepo, Lerna, Bazel, Rush workspace conventions
- Shared code patterns (/packages, /libs, /common, /shared)
- Project isolation vs shared resources
- Dependency management in monorepos
- Build caching and task orchestration patterns

**Key questions:**
- How do successful monorepos scale to 10+ projects?
- Where do shared utilities live vs project-specific code?
- How are tools/scripts organized centrally?

### 3. Dev Team Multi-Project Workspace Patterns

**What to research:**
- Real-world examples of teams managing 5-10+ projects in one workspace
- Directory naming conventions (kebab-case vs camelCase vs snake_case)
- Semantic naming patterns (what makes names discoverable?)
- Documentation placement strategies (per-project vs central)
- Tool/script organization (global vs project-local)
- Configuration management (dotfiles, shared configs)

**Key questions:**
- Where do cross-project docs live?
- How are tools organized (per-project vs shared /bin)?
- What naming patterns make navigation intuitive?

### 4. UNIX-Inspired Dev Environments

**What to research:**
- How modern dev tools adopt UNIX patterns:
  - Docker (container filesystem layering)
  - Kubernetes (config as files, declarative manifests)
  - Git (text-based version control)
- dotfiles and configuration management best practices
- Build systems that follow UNIX philosophy (make, bazel)
- Text-based interfaces for tooling

**Key questions:**
- What makes Docker/Kubernetes feel "UNIX-like"?
- How do successful devs organize dotfiles?
- What build patterns follow "do one thing well"?

### 5. Agent Navigation Patterns

**What to research:**
- What makes file structures easy for AI agents to navigate?
- Predictable paths vs deep nesting (depth vs breadth)
- Semantic naming for discoverability (self-documenting structure)
- Index files and README patterns (directory documentation)
- Metadata and manifest files for directory discovery
- How agents search codebases (ripgrep, fd, find patterns)

**Key questions:**
- Do agents prefer shallow or deep hierarchies?
- What naming patterns help agents find things?
- Should every directory have a README?
- How do we make structure self-documenting?

---

## Deliverables

Create research report at:
**`/home/clawd/.openclaw/workspace/docs/research/task-009-unix-file-structure-research.md`**

### Report Structure

```markdown
# UNIX-Inspired File Structure Research
**Task #009.1 Research Report**
**Author:** Christopher
**Date:** 2026-03-10
**For:** Bernard (Task #009 Strategy Design)

---

## Executive Summary

[2-3 paragraphs: Key findings, main recommendations, what matters most for OpenClaw workspace]

---

## 1. UNIX Filesystem Principles & Hierarchy

[Detailed findings...]

### Key Principles
- Principle 1...
- Principle 2...

### Traditional Hierarchy Analysis
- /bin → [why it works, modern relevance]
- /lib → [why it works, modern relevance]
- etc.

### Modern Interpretations
- XDG Base Directory...
- FHS standards...

### Recommendations for OpenClaw
- [Actionable insights]

---

## 2. Monorepo & Workspace Organization

[Detailed findings...]

### Reference Examples
1. **Google Bazel** - [analysis]
2. **Nx Monorepo** - [analysis]
3. etc.

### Patterns That Work
- Pattern 1...
- Pattern 2...

### Recommendations for OpenClaw
- [Actionable insights]

---

## 3. Dev Team Multi-Project Workspaces

[Detailed findings...]

### Real-World Examples
1. **Example 1** - [analysis]
2. **Example 2** - [analysis]

### Naming Conventions
- Convention 1...
- Convention 2...

### Recommendations for OpenClaw
- [Actionable insights]

---

## 4. UNIX-Inspired Dev Environments

[Detailed findings...]

### Modern Tools Analysis
- Docker...
- Kubernetes...
- Git...

### Recommendations for OpenClaw
- [Actionable insights]

---

## 5. Agent Navigation Patterns

[Detailed findings...]

### What Makes Structure Agent-Friendly
- Factor 1...
- Factor 2...

### Recommendations for OpenClaw
- [Actionable insights]

---

## Consolidated Recommendations

[5-10 key recommendations for Bernard to use in strategy design]

1. **Recommendation 1** - [rationale]
2. **Recommendation 2** - [rationale]
3. etc.

---

## Citations & References

[List all sources, with URLs where applicable]

1. Source 1...
2. Source 2...
etc.
```

---

## Timeline

- **Start:** 2026-03-10 09:37
- **Due:** 2026-03-10 13:00
- **Duration:** 3.5 hours available

---

## Success Criteria

✅ Comprehensive coverage of all 5 research areas  
✅ Actionable insights ready for strategy design  
✅ 5+ concrete reference examples documented  
✅ Clear recommendations for OpenClaw workspace context  
✅ All sources cited  
✅ Executive summary provides clear direction  

---

## Next Steps

1. Christopher completes research
2. Posts completion update to `/home/clawd/.openclaw/workspace/BULLETIN_BOARD.md`
3. Bernard reviews research findings
4. Bernard designs UNIX-inspired file structure strategy based on research
5. Atlas implements migration (Task #009.2) after Task #007 Phases 3-6 stabilize

---

## Notes

- This research is CRITICAL for workspace scalability
- Focus on patterns that work for AI agents (not just humans)
- Think about 10 projects, not just 1
- UNIX philosophy is the lens: simplicity, composability, "do one thing well"
- Atlas will be "workspace sysadmin" implementing this strategy

---

**Christopher:** Report completion to bulletin board when done. Bernard is waiting on your findings to design the strategy.
