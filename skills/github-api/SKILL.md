# GitHub API — Skill

Devan's repo management tool. Read/write repos, create branches, commit files, open PRs, manage issues — all programmatically.

## API Key
`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`

## Account
`theyellowbirdcompany`

## Base URL
`https://api.github.com`

## Common Operations

### List repos
```bash
curl -s -H "Authorization: token <KEY>" https://api.github.com/user/repos
```

### Get file content
```bash
curl -s -H "Authorization: token <KEY>" \
  "https://api.github.com/repos/OWNER/REPO/contents/PATH"
```

### Create or update a file
```bash
# Content must be base64 encoded
CONTENT=$(echo "file content here" | base64)
curl -s -X PUT "https://api.github.com/repos/OWNER/REPO/contents/PATH" \
  -H "Authorization: token <KEY>" \
  -H "Content-Type: application/json" \
  -d "{
    \"message\": \"commit message\",
    \"content\": \"$CONTENT\",
    \"sha\": \"EXISTING_FILE_SHA_OR_OMIT_FOR_NEW\"
  }"
```

### Create a branch
```bash
# Get base SHA first
SHA=$(curl -s -H "Authorization: token <KEY>" \
  "https://api.github.com/repos/OWNER/REPO/git/ref/heads/main" \
  | python3 -c "import sys,json; print(json.load(sys.stdin)['object']['sha'])")

curl -s -X POST "https://api.github.com/repos/OWNER/REPO/git/refs" \
  -H "Authorization: token <KEY>" \
  -H "Content-Type: application/json" \
  -d "{\"ref\": \"refs/heads/new-branch\", \"sha\": \"$SHA\"}"
```

### Create a Pull Request
```bash
curl -s -X POST "https://api.github.com/repos/OWNER/REPO/pulls" \
  -H "Authorization: token <KEY>" \
  -H "Content-Type: application/json" \
  -d "{
    \"title\": \"PR title\",
    \"body\": \"PR description\",
    \"head\": \"feature-branch\",
    \"base\": \"main\"
  }"
```

### Create an Issue
```bash
curl -s -X POST "https://api.github.com/repos/OWNER/REPO/issues" \
  -H "Authorization: token <KEY>" \
  -H "Content-Type: application/json" \
  -d "{\"title\": \"Issue title\", \"body\": \"Issue body\"}"
```

## Key Repos
- `theyellowbirdcompany/test` — OpenClaw Dashboard
- `FrozenCorn2113/OpenClaw_Dashboard` — original dashboard repo

## When to Use
- Committing code changes autonomously
- Creating feature branches for new work
- Opening PRs for review
- Reading existing code before making changes
- Managing issues as a task tracker
