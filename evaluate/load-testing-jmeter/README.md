# Evaluation: Load testing (Apache JMeter)

## Purpose

Demonstrate **scalability** under concurrent users (e.g. **up to ~200 concurrent users** under controlled lab conditions, as in your abstract). Use this for the **Results** section and to justify deployment parameters.

---

## Abstract claims vs measurements (read this)

| What you claim in the paper | What it measures | Where to measure | Typical magnitude |
|-----------------------------|------------------|------------------|-------------------|
| **2.5–4.0 s** per question | **LLM inference** + JSON generation (`POST /generate`) | [`evaluate/llm-response-time/evaluate_llm_latency.py`](../llm-response-time/evaluate_llm_latency.py) | **Seconds** |
| **&lt; 150 ms** WebSocket | Real-time **Socket.IO** round-trip (not JMeter HTTP) | [`evaluate/websocket-latency/`](../websocket-latency/) | **Milliseconds** |
| **200 concurrent users** (JMeter) | **HTTP** load (e.g. `/health` or Moodle page) — **not** 200 LLM generations/sec | This folder (`JMeter`) | Response times for **light** endpoints are often **1–20 ms** on localhost |

**Why JMeter showed ~2 ms:** the default test calls **`GET /health`** only. That endpoint returns a tiny JSON payload and **does not run the LLM**. So **low milliseconds are expected and correct** for `/health`. They do **not** replace the **2.5–4.0 s** LLM generation metric.

**How to report:**  
- “LLM question generation latency: **X s** (mean/p95), measured with `evaluate_llm_latency.py` on `/generate`.”  
- “WebSocket latency: **Y ms** (…), measured with …”  
- “HTTP scalability: JMeter with **200 concurrent threads** against **`/health`** (or Moodle URL): **error rate Z%**, throughput **T** req/s, latency **…**”

---

## Scope

Typical load scenarios:

1. **HTTP:** Moodle login page, quiz view, or LLM API `/health` (baseline).
2. **WebSocket:** many concurrent connections (often requires **distributed JMeter** or **custom scripts** — document limits).

> Full Socket.IO load is **not** identical to plain HTTP; for publication, state clearly what was tested (HTTP vs WS).

## Prerequisites

- [Apache JMeter](https://jmeter.apache.org/) 5.x installed locally **or** on your `PATH` (e.g. macOS: `brew install jmeter`).
- Staging environment matching production sizing (CPU, RAM, Docker limits).
- Your stack running if you load-test it (e.g. `docker compose up -d`).

---

## How to run (step by step)

### 1. Install JMeter

- **macOS (Homebrew):** `brew install jmeter`  
  Then check: `jmeter --version`
- **Manual:** Download from [jmeter.apache.org](https://jmeter.apache.org/download_jmeter.cgi), unpack, then either:
  - add `bin/` to `PATH`, or  
  - `export JMETER_HOME=/path/to/apache-jmeter-5.x`

### 2. Test plan (`.jmx`)

**Default (already in repo):** `gamified-quiz-load-test.jmx` hits the **LLM API** at `http://localhost:5001/health`. You can run `./evaluate/load-testing-jmeter/run_jmeter_example.sh` immediately after starting `llmapi`.

**Custom plan (optional):** Open JMeter GUI, build your **Thread Group** + **HTTP Request** (e.g. Moodle on port `8080`), add listeners if you like, then **Save** over `gamified-quiz-load-test.jmx` in this folder.

> URLs live **inside** the `.jmx` file; the shell script does not set `TARGET_URL`.

### 3. Run the helper script (non-GUI, HTML report)

From the **repository root**:

```bash
cd /path/to/kwiz
chmod +x evaluate/load-testing-jmeter/run_jmeter_example.sh
./evaluate/load-testing-jmeter/run_jmeter_example.sh
```

- Uses `jmeter` from `PATH`, or `$JMETER_HOME/bin/jmeter` if set.
- Writes results under `evaluate/load-testing-jmeter/jmeter-results/`:
  - `results.jtl` — raw samples  
  - `html-report/index.html` — open this in a browser for charts/tables.

### 4. View the report

```bash
open evaluate/load-testing-jmeter/jmeter-results/html-report/index.html   # macOS
# or open the file manually in a browser
```

---

## Quick start (what to put in the HTTP Request)

| Target | Example host | Port | Path |
|--------|----------------|------|------|
| Moodle | `localhost` | `8080` | `/` or your course URL path |
| LLM API health | `localhost` | `5001` | `/health` |
| WebSocket HTTP health | `localhost` | `3001` | `/health` |

Start Docker first if those ports are served by containers.

## What to report

- Thread count, ramp-up, duration, **error %**, **throughput**, **latency percentiles** (from JMeter reports).
- Server specs, Docker resource limits, network topology.
- If you did **not** load-test WebSockets, say so explicitly.

## Ethics & safety

- Run load tests only on **systems you own** or with **written permission**.
- Do not overload production Moodle without approval.

## Files

| File | Description |
|------|-------------|
| `run_jmeter_example.sh` | Non-GUI JMeter runner; optional argument: JMX filename |
| `gamified-quiz-load-test.jmx` | Smoke test — **20** threads, **10** loops, **GET** `/health` → **200** samples total |
| `gamified-quiz-200-concurrent-health.jmx` | **200** threads, ramp **60 s**, **1** loop each → **200 concurrent virtual users** hitting `/health` (matches “200 users” in abstract for **HTTP** layer) |

**200 concurrent users (paper):**

```bash
./evaluate/load-testing-jmeter/run_jmeter_example.sh gamified-quiz-200-concurrent-health.jmx
```

**Warning:** Do **not** point 200 concurrent threads at `/generate` unless you have a strong GPU and accept long runs; Ollama will queue. Use `/health` or Moodle static pages for **scalability** smoke tests; use `/generate` only at **low** concurrency (e.g. 1–5 threads) or use the Python latency script.

**Before running:** start the stack so port **5001** answers (e.g. `docker compose up -d llmapi`). For Moodle instead, open the `.jmx` in JMeter and change **Server / Port / Path** (e.g. `localhost`, `8080`, `/`).


RUN TEST
python3 evaluate/llm-response-time/evaluate_llm_latency.py --runs 3 --warmup 0 --backend local --n-questions 1