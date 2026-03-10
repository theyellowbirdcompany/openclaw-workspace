# Task #008 Migration Guide

This document details the file structure reorganization and path updates performed as part of Task #008.

## File Structure Changes

**Old Location:**
`/home/clawd/.openclaw/workspace/openclaw-dashboard/`

**New Location:**
`/home/clawd/.openclaw/workspace/projects/command-center/`

The contents of `openclaw-dashboard/` were moved to `projects/command-center/`.

**New Directories Created:**
- `/home/clawd/.openclaw/workspace/projects/`
- `/home/clawd/.openclaw/workspace/projects/shared/design-assets/`
- `/home/clawd/.openclaw/workspace/projects/shared/brand/`
- `/home/clawd/.openclaw/workspace/projects/shared/credentials/`
- `/home/clawd/.openclaw/workspace/projects/docs/`
- `/home/clawd/.openclaw/workspace/projects/docs/architecture/`
- `/home/clawd/.openclaw/workspace/projects/docs/api/`

## Path Reference Updates

The following files had their paths updated:

### `BULLETIN_BOARD.md`
- Reference to `command-center-reference.jpg` updated from `openclaw-dashboard/` to `projects/command-center/`.
- Reference to Dashboad `.env` file updated from `openclaw-dashboard/.env` to `projects/command-center/.env`.

### `SUPABASE_CREDENTIALS.md`
- Reference to Dashboard `.env` file updated from `openclaw-dashboard/.env` to `projects/command-center/.env`.
- Reference to `SUPABASE_LIVE_DATA_INTEGRATION.md` updated from `openclaw-dashboard/SUPABASE_LIVE_DATA_INTEGRATION.md` to `projects/command-center/SUPABASE_LIVE_DATA_INTEGRATION.md`.

### `self-skill-writer.js`
- `DEFAULT_SRC` variable updated from `openclaw-dashboard/src/components` to `projects/command-center/src/components`.

## Visual File System Component

### New Component Created
- **File:** `/home/clawd/.openclaw/workspace/projects/command-center/src/components/FileSystemVisualizer.jsx`
- **Purpose:** Visualizes the workspace file system structure in the Command Center dashboard.
- **Features:**
  - Recursive rendering of project folder structure
  - Interactive file/folder selection
  - Display of file metadata (size, last modified date)
  - Copy-to-clipboard functionality for file paths
  - Yellow Bird branding with tech/holographic aesthetic
  - Syntax highlighting for usage examples

### Integration
- **Integrated Into:** `/home/clawd/.openclaw/workspace/projects/command-center/src/pages/CommandCenter.jsx`
- **Placement:** Added after the `ActivityFeed` component in the main layout
- **Import Statement:** `import FileSystemVisualizer from '../components/FileSystemVisualizer'`

### Dependencies Added
- `react-syntax-highlighter: ^15.5.0` — Added to `package.json` for code syntax highlighting in the component

### Build Status
- Project builds successfully with the new component integrated
- No breaking changes to existing components or functionality
