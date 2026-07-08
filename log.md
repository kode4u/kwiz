# Evaluation metrics log

**Log file:** `logs/evaluation/metrics.jsonl` (one JSON object per line)

## Auto-run 125 questions

```bash
# Optional: poster hardware (edit to your machine)
# Linux/macOS:
export EVAL_GPU="RTX 3090"
export EVAL_CPU="Intel Core i7 12700KF"
export EVAL_RAM_GB="64"
export EVAL_OS="Window 11"
export OLLAMA_MODEL="deepseek-r1:8b"

docker compose up -d llmapi
python3 evaluate/llm-evaluation/run_batch_evaluation.py
```

```powershell
# Windows (PowerShell) — use python, not python3
$env:EVAL_GPU="RTX 3090"
$env:EVAL_CPU="Intel Core i7 12700KF"
$env:EVAL_RAM_GB="64"
$env:EVAL_OS="Windows 11"
$env:OLLAMA_MODEL="deepseek-r1:8b"

docker compose up -d llmapi
python evaluate/llm-evaluation/run_batch_evaluation.py
```

**125 questions** = 5 domains × **25 questions/domain** (5 subtopics × 5 each).

- Domains: `evaluate/llm-evaluation/DOMAINS.md`
- Full pipeline (metrics + 2 experts): `evaluate/llm-evaluation/README.md`
- Rubric: `evaluate/quality-expert/rubric_binary_mcq.md`
- Concurrent WebSocket: `evaluate/websocket-latency/README.md`

## Read results

```bash
python3 evaluate/llm-evaluation/summarize_metrics.py
tail -20 logs/evaluation/metrics.jsonl
```

```powershell
python evaluate/llm-evaluation/summarize_metrics.py
Get-Content logs/evaluation/metrics.jsonl -Tail 20
```

Full docs: [evaluate/llm-evaluation/README.md](evaluate/llm-evaluation/README.md)
