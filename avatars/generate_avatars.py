#!/usr/bin/env python3
import json, base64, subprocess, time, os

API_KEY = "AIzaSyCC9UNmrbVutdSbblloGl7EIH0eJ0Ax-QQ"
API_URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp-image-generation:generateContent?key={API_KEY}"
OUTPUT_DIR = "/home/clawd/.openclaw/workspace/avatars"

STYLE_SUFFIX = (
    "stylized character illustration, soft warm lighting, clean gradient background, "
    "full body portrait, Yellow Bird Company mascot style, polished illustration, "
    "professional but playful, humanoid bird standing upright, clear silhouette readable at small sizes"
)

agents = [
    {
        "name": "claw",
        "prompt": (
            "A stylized humanoid raven character in professional attire, jet black iridescent feathers, "
            "wearing an elegant black top hat, sharp tailored black suit with subtle purple shimmer, "
            "commanding expression, arms crossed confidently, orchestrator of an AI company. " + STYLE_SUFFIX
        )
    },
    {
        "name": "bernard",
        "prompt": (
            "A stylized humanoid owl character in professional attire, brown and grey feathers, "
            "wearing a sharp professional blazer, a distinguished monocle over one large yellow eye, "
            "wise and authoritative expression, Chief of Staff of an AI company. " + STYLE_SUFFIX
        )
    },
    {
        "name": "christopher",
        "prompt": (
            "A stylized humanoid crane character in professional attire, white and grey feathers, "
            "elegant long neck, wearing a crisp white lab coat, holding a magnifying glass, "
            "curious and intelligent expression, Research Intelligence specialist at an AI company. " + STYLE_SUFFIX
        )
    },
    {
        "name": "devan",
        "prompt": (
            "A stylized humanoid woodpecker character in professional attire, bright red crest on head, "
            "black and white feathers, wearing a sturdy tool belt with gadgets, energetic dynamic pose, "
            "enthusiastic expression, Technical Builder at an AI company. " + STYLE_SUFFIX
        )
    },
    {
        "name": "vale",
        "prompt": (
            "A stylized humanoid peacock character in professional attire, iridescent teal and blue-green feathers, "
            "magnificent fanned tail with eye-spots visible, wearing a small elegant crown, "
            "holding a sleek tablet with charts, confident charismatic expression, Growth Strategist at an AI company. " + STYLE_SUFFIX
        )
    },
    {
        "name": "scribe",
        "prompt": (
            "A stylized humanoid flamingo character in professional attire, beautiful pink feathers, "
            "elegant graceful posture, wearing a stylish scarf, holding a large ornate quill pen, "
            "sophisticated and expressive expression, Communications Specialist at an AI company. " + STYLE_SUFFIX
        )
    },
    {
        "name": "atlas",
        "prompt": (
            "A stylized humanoid heron character in professional attire, grey-blue feathers, "
            "tall stoic posture, wearing a clean professional vest, holding a clipboard with organized charts, "
            "calm focused determined expression, Operations Manager at an AI company. " + STYLE_SUFFIX
        )
    },
]

results = []

for agent in agents:
    print(f"\n🎨 Generating avatar for: {agent['name']}...")
    
    payload = {
        "contents": [{"parts": [{"text": agent["prompt"]}]}],
        "generationConfig": {"responseModalities": ["IMAGE", "TEXT"]}
    }
    
    result = subprocess.run(
        ['curl', '-s', '-X', 'POST', API_URL,
         '-H', 'Content-Type: application/json',
         '-d', json.dumps(payload)],
        capture_output=True, text=True, timeout=120
    )
    
    if result.returncode != 0:
        print(f"  ❌ curl error: {result.stderr}")
        results.append({"name": agent["name"], "status": "failed", "reason": result.stderr})
        continue
    
    try:
        d = json.loads(result.stdout)
    except json.JSONDecodeError as e:
        print(f"  ❌ JSON parse error: {e}")
        print(f"  Raw output: {result.stdout[:500]}")
        results.append({"name": agent["name"], "status": "failed", "reason": f"JSON error: {e}"})
        continue
    
    # Check for errors in response
    if "error" in d:
        print(f"  ❌ API error: {d['error']}")
        results.append({"name": agent["name"], "status": "failed", "reason": str(d["error"])})
        continue
    
    saved = False
    text_response = ""
    
    if "candidates" not in d or not d["candidates"]:
        print(f"  ❌ No candidates in response")
        print(f"  Response: {json.dumps(d)[:500]}")
        results.append({"name": agent["name"], "status": "failed", "reason": "No candidates"})
        continue
    
    for part in d["candidates"][0]["content"]["parts"]:
        if "inlineData" in part:
            img_data = base64.b64decode(part["inlineData"]["data"])
            filepath = os.path.join(OUTPUT_DIR, f"{agent['name']}-avatar.png")
            with open(filepath, "wb") as f:
                f.write(img_data)
            print(f"  ✅ Saved: {filepath} ({len(img_data):,} bytes)")
            saved = True
        elif "text" in part:
            text_response = part["text"]
    
    if saved:
        results.append({"name": agent["name"], "status": "success", "text": text_response})
    else:
        print(f"  ⚠️ No image data found in response")
        print(f"  Response parts: {json.dumps(d['candidates'][0]['content']['parts'])[:500]}")
        results.append({"name": agent["name"], "status": "failed", "reason": "No image data in response"})
    
    # Rate limiting — be gentle with the API
    time.sleep(3)

print("\n\n📊 RESULTS SUMMARY:")
print("=" * 50)
for r in results:
    status = "✅" if r["status"] == "success" else "❌"
    print(f"{status} {r['name']}: {r['status']}")
    if r["status"] == "failed":
        print(f"   Reason: {r.get('reason', 'unknown')}")

success_count = sum(1 for r in results if r["status"] == "success")
print(f"\n{success_count}/{len(agents)} avatars generated successfully.")
