# Safe File Editing Protocol

**For agents: Use this protocol to avoid edit failures and token waste.**

---

## The Problem

`edit` tool failures happen when:
- Whitespace doesn't match exactly
- Line breaks differ
- Text has changed since you last read it

**Each failed edit wastes ~500 tokens and frustrates the workflow.**

---

## The Solution: 3-Strike Rule

### Strike 1: Try Edit (After Read)
```
1. Read file first with read tool
2. Copy EXACT text (including all whitespace)
3. Attempt edit with oldText/newText
```

### Strike 2: Use Exec + Sed
```bash
# If edit fails, use sed for surgical changes
sed -i 's/old text/new text/g' /path/to/file

# Or for line-specific changes:
sed -i '10s/old/new/' /path/to/file

# Or append to end:
echo "new content" >> /path/to/file
```

### Strike 3: Write New File
```
If sed also fails or is too complex:
1. Read entire file
2. Make changes in memory
3. Write complete new version
4. Overwrite original
```

### Never Do Strike 4
**Stop after 3 attempts.** If you've tried edit + sed + rewrite and still failing:
- The file might be locked
- Permissions issue
- OR the change isn't actually needed

Ask the user for help rather than burning more tokens.

---

## Examples

### Good: Read First, Edit Once
```javascript
// 1. Read the file
const content = await read('/path/to/file.js');

// 2. Verify exact text exists
if (content.includes('const API_KEY =')) {
  // 3. Edit with exact match
  await edit({
    path: '/path/to/file.js',
    oldText: 'const API_KEY = "old-key";',
    newText: 'const API_KEY = "new-key";'
  });
}
```

### Bad: Blind Edit (Fails Often)
```javascript
// ❌ Never do this - you don't know the exact text
await edit({
  path: '/path/to/file.js',
  oldText: 'const API_KEY = "old-key"',  // Missing semicolon? Extra space?
  newText: 'const API_KEY = "new-key";'
});
```

### Better: Use Sed for Simple Replacements
```bash
# If edit failed once, switch to sed
sed -i 's/const API_KEY = .*/const API_KEY = "new-key";/' /path/to/file.js
```

### Best: Append When Possible
```bash
# Instead of editing middle of file, append to end
echo "\nconst NEW_CONSTANT = 'value';" >> /path/to/file.js
```

---

## Special Cases

### Adding to Arrays/Objects
```javascript
// Instead of editing the array directly:
// BAD: edit tool to insert into middle of array

// GOOD: Read, modify, write
const content = await read('config.json');
const config = JSON.parse(content);
config.items.push('new-item');
await write('config.json', JSON.stringify(config, null, 2));
```

### Modifying YAML/JSON
**Always use read → parse → modify → write**

Never use edit tool on structured data.

### Modifying Large Files
**Use sed with line numbers:**
```bash
# Insert at line 50
sed -i '50i new line content' /path/to/file

# Replace line 100
sed -i '100s/.*/new content/' /path/to/file

# Delete lines 20-30
sed -i '20,30d' /path/to/file
```

---

## When to Skip Edits Entirely

Don't edit when you can:
- Create new file (templates, components)
- Append to end (adding functions, exports)
- Use exec to run a script that does the editing
- Ask user to edit (if it's a one-time config change)

---

## Token Cost Comparison

| Method | Success Rate | Tokens/Attempt | Max Attempts |
|--------|-------------|----------------|--------------|
| Edit (blind) | 40% | 500 | 1 |
| Edit (after read) | 85% | 600 | 1 |
| Sed | 95% | 200 | 1 |
| Read+Write | 99% | 800 | 1 |
| Multiple edit retries | 60% | 500 | 3-5 |

**Lesson:** One successful sed (200 tokens) beats three failed edits (1,500 tokens).

---

## Summary

1. **Read first** - Know the exact text
2. **Edit once** - One attempt with exact match
3. **Sed if failed** - Surgical changes via shell
4. **Rewrite if desperate** - Last resort
5. **Stop at 3** - Don't waste tokens

**Save tokens. Ship faster. Frustrate less.** ✅
