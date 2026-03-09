# Jina Reader — Skill

Christopher's deep reading tool. Use after a Tavily search to read the full content of any URL. Converts any webpage to clean markdown — works on JS-heavy sites, articles, and complex pages that web_fetch can't handle.

## API Key
`jina_22bc94e06bbc40cebd8c88a19e3790cdMmmzGtGPgzcKcxiJHIvyvXtAGa5G`

## Usage
Prefix any URL with `https://r.jina.ai/`:

```bash
curl -s -H "Authorization: Bearer jina_22bc94e06bbc40cebd8c88a19e3790cdMmmzGtGPgzcKcxiJHIvyvXtAGa5G" \
  "https://r.jina.ai/https://example.com/article"
```

## Response
Returns clean markdown with:
- Title
- URL source
- Published time (if available)
- Full page content as markdown

## When to Use
- After Tavily finds a URL — use Jina to read the full article
- JS-heavy sites that web_fetch can't render
- Competitor pages, product pages, news articles
- Any time you need the full content, not just a snippet

## Workflow (Tavily → Jina)
1. Search with Tavily to find relevant URLs
2. Use Jina Reader to read the full content of the most relevant results
3. Synthesize into your research output
