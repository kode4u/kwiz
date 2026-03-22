# Research evaluation suite

This folder contains **separate evaluation modules** for the paper: each subfolder has its own **README** (methodology, reporting) and **scripts** (where applicable) so you can **reproduce metrics** for publication.

**Working directory:** run commands that start with `evaluate/...` from the **repository root** (`kwiz/`), not from inside `evaluate/websocket-latency/` or other subfolders — otherwise paths will not resolve.

## Index

| Folder | What it validates | Paper claim |
|--------|-------------------|-------------|
| [`llm-response-time/`](llm-response-time/) | LLM API end-to-end latency for `/generate` | ~2.5–4.0 s per question (report mean, min, max, percentiles) |
| [`websocket-latency/`](websocket-latency/) | Round-trip / server responsiveness | &lt; 150 ms under your network |
| [`sus-usability/`](sus-usability/) | System Usability Scale (survey + score) | SUS score and interpretation |
| [`load-testing-jmeter/`](load-testing-jmeter/) | Apache JMeter load & scalability | Up to ~200 concurrent users (your environment) |
| [`classroom-deployment/`](classroom-deployment/) | Field study protocol & checklist | Real classroom deployment narrative |

## Recommended order

1. **LLM response time** — baseline AI performance (local Ollama vs cloud if compared).
2. **WebSocket latency** — real-time layer.
3. **Load testing** — controlled lab conditions.
4. **SUS** — after stable prototype with representative users.
5. **Classroom deployment** — qualitative + usage logs aligned with ethics approval.

## Reporting for your manuscript

For each module, copy **environment** (hardware, OS, Docker, model name, commit hash) into your **Experimental setup**. Export script outputs to CSV/plots and reference them in **Results**.

## Prerequisites (global)

- Services running as in project `README.md` / `docker-compose.yml` (or document host-only runs).
- Python 3.8+ for Python scripts; Node.js 18+ for WebSocket script.

**Abstract claims use different tools:** LLM **seconds** → `llm-response-time/`; WebSocket **&lt;150 ms** → `websocket-latency/`; JMeter **200 users** → `load-testing-jmeter/` (HTTP, e.g. `/health` — not the same as LLM generation time). See [`load-testing-jmeter/README.md`](load-testing-jmeter/README.md).

---

**Main research narrative:** see [`../docs/RESEARCH_README.md`](../docs/RESEARCH_README.md).
