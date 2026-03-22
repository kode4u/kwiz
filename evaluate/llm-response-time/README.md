# Evaluation: LLM question-generation response time

## Purpose

Measure **end-to-end latency** of the LLM API `POST /generate` (Moodle plugin uses this path). Use results to report **mean, median, min, max, and percentiles** (e.g. p95) for your paper’s **Results** section.

> Abstract target: **~2.5–4.0 seconds per question** — your numbers depend on **model**, **GPU/CPU**, **n_questions**, and **network** (Docker host → Ollama).

## Methodology (Methods section)

1. **Warm-up:** 1–2 requests (discard or label separately).
2. **Runs:** e.g. **N = 30** successful requests per configuration (topic/level/n_questions/backend).
3. **Record:** wall-clock time from client send to full HTTP response received.
4. **Conditions:** document `LLM_BACKEND`, model name, `n_questions`, hardware, Ollama version.
5. **Failures:** log HTTP errors separately; do not mix with success latencies.

## Prerequisites

- LLM API reachable (e.g. `http://localhost:5001` from host, or `http://llmapi:5001` from another container).
- For **local** backend: Ollama running; model pulled.

## Usage

**Each `/generate` call can take 30s–several minutes** (Ollama loads the model on first use, then inference). The script prints **progress after each request** — if the first line pauses, it is **not stuck**, it is waiting for the LLM.

```bash
# From repository root (default: http://localhost:5001, local backend, 1 question)
python3 evaluate/llm-response-time/evaluate_llm_latency.py

# Quick check: 3 runs, no warmup (faster to start measuring)
python3 evaluate/llm-response-time/evaluate_llm_latency.py --runs 3 --warmup 0 --backend local

# Full batch (can take 30+ minutes for 30 runs × ~60s each — be patient)
export LLMAPI_URL=http://localhost:5001
python3 evaluate/llm-response-time/evaluate_llm_latency.py --runs 30 --n-questions 1 --backend local

# JSON output for plotting
python3 evaluate/llm-response-time/evaluate_llm_latency.py --runs 20 --json > llm_latencies.json
```

**Prerequisites:** Ollama running on the host; `docker compose up -d llmapi`; `curl http://localhost:5001/health` returns OK.

## Output

- Console summary: **count, mean, std, min, max, p50, p95, p99** (milliseconds and seconds).
- Optional `--json` for importing into Excel/Python/R.

## What to report in the paper

- **Setup:** API version, model, `n_questions`, hardware.
- **Table:** mean ± SD, median, p95, N.
- **Figure:** histogram or box plot of latencies (optional).

## Script

See `evaluate_llm_latency.py` in this folder.
