# Evaluation metrics log

**Log file:** `logs/evaluation/metrics.jsonl` (one JSON object per line)

## Auto-run 125 questions

```bash
# Optional: poster hardware (edit to your machine)
export EVAL_GPU="your GPU"
export EVAL_CPU="your CPU"
export EVAL_RAM_GB="64"
export EVAL_OS="your OS"
export OLLAMA_MODEL="deepseek-r1:8b"

docker compose up -d llmapi
python3 evaluate/llm-evaluation/run_batch_evaluation.py
```

**125 questions** = 5 domains × **25 questions/domain** (5 subtopics × 5 each).

- Domains: `evaluate/llm-evaluation/DOMAINS.md`
- Full pipeline (metrics + 2 experts): `evaluate/llm-evaluation/README.md`
- Rubric: `evaluate/quality-expert/rubric_binary_mcq.md`

## Read results

```bash
python3 evaluate/llm-evaluation/summarize_metrics.py
tail -20 logs/evaluation/metrics.jsonl
```

Full docs: [evaluate/llm-evaluation/README.md](evaluate/llm-evaluation/README.md)
