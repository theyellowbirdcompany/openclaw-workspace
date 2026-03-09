# Tavily Web Search — Skill

Christopher's primary research tool. Use for any task requiring live web search, news, trends, or competitive intelligence.

## API Key
`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`

## Endpoint
`POST https://api.tavily.com/search`

## Basic Search
```bash
curl -s -X POST "https://api.tavily.com/search" \
  -H "Content-Type: application/json" \
  -d '{
    "api_key": "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",
    "query": "YOUR QUERY HERE",
    "max_results": 5
  }'
```

## With Full Content (deeper research)
```bash
curl -s -X POST "https://api.tavily.com/search" \
  -H "Content-Type: application/json" \
  -d '{
    "api_key": "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",
    "query": "YOUR QUERY HERE",
    "max_results": 5,
    "include_raw_content": true,
    "search_depth": "advanced"
  }'
```

## Response Fields
- `results[].title` — page title
- `results[].url` — source URL
- `results[].content` — snippet/summary
- `results[].raw_content` — full page content (when include_raw_content=true)
- `results[].score` — relevance score

## When to Use
- Any research task requiring current information
- Competitive analysis
- Trend monitoring
- Fact-checking
- Market research
- News monitoring

## Notes
- `search_depth: "advanced"` costs more API credits but returns richer results
- Use `include_raw_content: true` when you need full article text
- Max results: up to 10 per query
