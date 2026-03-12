# Gemini Design / Nano Banana — Skill

Vale's design ideation tool. Use Gemini (Google) for visual concepts, brand directions, moodboards, copy+design brainstorming, and image-generation-adjacent workflows.

## API Key
Stored in `.env.local` (not visible in this file for security)

Reference as: `${GOOGLE_API_KEY}`

## Verified Working Model
`models/gemini-2.5-flash`

## Basic Text / Design Ideation
```bash
curl -s -X POST \
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GOOGLE_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "contents": [{
      "parts": [{
        "text": "Create 3 polished visual directions for The Yellow Bird Company brand. Tone: playful, professional, boardroom-ready. Include color palette, layout feel, and image direction."
      }]
    }]
  }'
```

## Suggested Use Cases for Vale
- Generate brand concept directions
- Create moodboard descriptions
- Produce ad creative concepts
- Explore hero section visuals
- Brainstorm polished social/media design directions
- Iterate on Yellow Bird visual language before final execution

## Best Practice
Use Gemini to produce:
1. **Design directions** (concepts)
2. **Style prompts**
3. **Moodboard text**
4. **Creative briefs**

Then use those outputs with dashboard/UI work or later visual tools.

## Notes
- The older Gemini model names are inconsistent; `gemini-2.5-flash` is currently working
- If image-generation-specific endpoints are needed later, test `models/gemini-2.5-flash-image`
- This is a strong replacement for Canva for early-stage concept work
- API key is stored in `.env.local` and referenced via `${GOOGLE_API_KEY}`
