import json
try:
    with open("runs.json", encoding="utf-16") as f:
        data = json.load(f)
    for r in data.get("workflow_runs", [])[:5]:
        print(f"Workflow: {r.get('name')} | Updated: {r.get('updated_at')} | Conclusion: {r.get('conclusion')}")
except Exception as e:
    print(f"Error: {e}")
