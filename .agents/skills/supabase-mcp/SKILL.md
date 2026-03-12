# Supabase MCP Skill

**Purpose:** Execute SQL operations on Supabase databases using the MCP server.

## When to Use

Use this skill when you need to:
- Execute SQL migrations
- Run database queries
- Perform CRUD operations on Supabase tables
- List tables in the database
- Update RLS policies or database functions

## Configuration

The Supabase MCP server is configured in `/home/clawd/.openclaw/workspace/.mcp/supabase-mcp.json` with:
- **URL:** `https://jcfsmpgugqqsasfrswyw.supabase.co`
- **Auth:** Using anon key (which also serves as service role key in this project)

## Available Operations

The MCP provides these tools:

1. **queryDatabase** - Query data with filters
   ```javascript
   // Parameters:
   // - table: string (table name)
   // - select: string (columns, default "*")
   // - query: object (filter conditions)
   ```

2. **insertData** - Insert new records
   ```javascript
   // Parameters:
   // - table: string (table name)
   // - data: object or array (data to insert)
   ```

3. **updateData** - Update existing records
   ```javascript
   // Parameters:
   // - table: string (table name)
   // - data: object (data to update)
   // - query: object (filter conditions)
   ```

4. **deleteData** - Delete records
   ```javascript
   // Parameters:
   // - table: string (table name)
   // - query: object (filter conditions)
   ```

5. **listTables** - List all tables in the database

## Executing SQL Migrations

**Important:** The MCP doesn't have a direct "execute raw SQL" command. For complex migrations like RLS policy updates, you have two options:

### Option 1: Use Browser Tool (Recommended for Migrations)

```bash
# Navigate to Supabase SQL Editor
browser(action="open", url="https://supabase.com/dashboard/project/jcfsmpgugqqsasfrswyw/sql/new")

# Authenticate if needed (credentials in SUPABASE_CREDENTIALS.md)
# Paste and execute SQL from migration files
```

### Option 2: Break Migration into MCP Operations

For simple operations, you can use the MCP tools:
- Use `updateData` for table updates
- Use `queryDatabase` to verify changes
- For RLS/function changes, you MUST use the browser tool

## Example: Verifying Security Warnings

```javascript
// Check if RLS policies still have issues
queryDatabase({
  table: "pg_policies",
  select: "schemaname, tablename, policyname, qual",
  query: { schemaname: "public" }
})

// List all tables
listTables()
```

## Security Notes

- The anon key has limited permissions (by design)
- For admin operations (migrations, RLS changes), use the browser tool
- Always verify changes after execution
- Test migrations in development first (if possible)

## Related Files

- Credentials: `/home/clawd/.openclaw/workspace/SUPABASE_CREDENTIALS.md`
- MCP Config: `/home/clawd/.openclaw/workspace/.mcp/supabase-mcp.json`
- Migration Files: `/home/clawd/.openclaw/workspace/projects/command-center/supabase/migrations/`

## Common Workflow

1. **Read migration SQL** from files
2. **Use browser tool** to execute in Supabase SQL Editor
3. **Use MCP queryDatabase** to verify changes
4. **Document results** in bulletin board

---

**Note:** This MCP server uses stdio transport (supabase-mcp-claude), not HTTP. It's designed for agent-to-database operations via Claude's MCP protocol.
