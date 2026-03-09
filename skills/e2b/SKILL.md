# E2B Code Interpreter — Skill

Devan's code execution sandbox. Run Python, JavaScript, bash, and more in a secure isolated environment. Purpose-built for AI agents. 150ms startup time.

## API Key
`e2b_de5ade11f9a25fc44fa49bc915f797150fb6af4b`

## Base URL
`https://api.e2b.dev`

## Quick Start — Create a Sandbox
```bash
SANDBOX=$(curl -s -X POST "https://api.e2b.dev/sandboxes" \
  -H "X-API-Key: e2b_de5ade11f9a25fc44fa49bc915f797150fb6af4b" \
  -H "Content-Type: application/json" \
  -d '{"templateID": "base"}' | python3 -c "import sys,json; print(json.load(sys.stdin).get('sandboxID',''))")
echo "Sandbox: $SANDBOX"
```

## Run Code in Sandbox
```bash
# Execute Python code
curl -s -X POST "https://api.e2b.dev/sandboxes/$SANDBOX/process" \
  -H "X-API-Key: e2b_de5ade11f9a25fc44fa49bc915f797150fb6af4b" \
  -H "Content-Type: application/json" \
  -d '{
    "cmd": "python3",
    "args": ["-c", "print(2 + 2)"]
  }'
```

## Kill Sandbox When Done
```bash
curl -s -X DELETE "https://api.e2b.dev/sandboxes/$SANDBOX" \
  -H "X-API-Key: e2b_de5ade11f9a25fc44fa49bc915f797150fb6af4b"
```

## Python SDK (preferred for complex tasks)
```python
from e2b_code_interpreter import Sandbox

sandbox = Sandbox(api_key="e2b_de5ade11f9a25fc44fa49bc915f797150fb6af4b")
execution = sandbox.run_code("print('Hello from Devan')")
print(execution.text)
sandbox.kill()
```

Install: `pip install e2b-code-interpreter`

## When to Use
- Testing code before committing
- Running data analysis scripts
- Validating build outputs
- Any task that requires actually executing code, not just writing it

## Notes
- Sandboxes have a 24-hour session limit
- Always kill the sandbox when done to conserve resources
- Supports Python, Node.js, bash, and more via templateID
