# AI-Enhanced Gamified Quiz for Moodle — Research Overview

This document summarizes the **Gamified Quiz Moodle plugin** research system for **paper publication**, aligned with the project abstract and reproducible evaluation under [`../evaluate/`](../evaluate/).

---

## Abstract (summary)

Digital learning platforms such as Moodle have significantly transformed higher education worldwide. In Cambodia and other developing regions, Moodle adoption has expanded access to MOOCs and self-paced learning. Traditional quizzes often rely heavily on instructor input and offer limited interactivity.

This work proposes an **AI-enhanced gamified quiz plugin for Moodle** that integrates a **locally hosted Large Language Model (LLM)** with **real-time interaction** via **WebSocket** technology. The system supports live classroom sessions with synchronized timers, leaderboards, and instant feedback. **Local GPU-based inference** supports **data privacy**, avoids recurring cloud API costs, and offers a sustainable option for institutions. **Usability** is evaluated with the **System Usability Scale (SUS)**.

**Preliminary performance:** LLM question generation achieves **~2.5–4.0 s** per question (context-dependent); WebSocket communication maintains **latency below ~150 ms** under typical LAN conditions. **Scalability** is assessed via classroom deployment and **Apache JMeter** load tests (e.g. up to **200 concurrent users** under controlled conditions).

The contribution is a **scalable, cost-effective, privacy-preserving** approach to AI-enhanced real-time assessment in **resource-constrained** educational environments.

---

## System architecture (for Methods section)

| Component | Role |
|-----------|------|
| **Moodle plugin** (`moodle-plugin/mod/gamifiedquiz`) | Activity module, quiz UI, teacher/student flows, question bank integration |
| **LLM API** (`llmapi/`) | Flask service: `/generate`, `/models/ollama`, `/health`; backends: OpenAI, Gemini, **local Ollama** |
| **WebSocket server** (`websocket-server/`) | Socket.IO, Redis, JWT; live sessions, leaderboards, timers |
| **Docker** (`docker-compose.yml`) | Orchestrates Moodle, DB, Redis, LLM API, WebSocket |

---

## How to cite reproducibility

Point reviewers and readers to:

- **This file** — high-level research description.
- **[`evaluate/README.md`](../evaluate/README.md)** — index of all evaluation protocols and scripts.
- **Per-metric folders** under `evaluate/<topic>/` — README + runnable scripts where applicable.

---

## Ethics & data privacy (paper checklist)

- Local LLM routing keeps **prompts and generated content** on the operator’s infrastructure when using Ollama + `LOCAL_LLM_URL`.
- **SUS** and classroom studies should follow **institutional IRB/ethics** approval where required.
- **No student PII** should appear in public repositories; use anonymized logs for JMeter and latency exports.

---

## Quick start (for replication)

```bash
# From repository root
docker compose up -d
```

Configure `.env` / `docker/env.template` for LLM backend and URLs. See project `README.md` and `QUICKSTART.md`.

---

## Evaluation suite (for Results section)

| Claim in abstract | Where to evaluate |
|-------------------|-------------------|
| LLM response time 2.5–4.0 s | [`evaluate/llm-response-time/`](../evaluate/llm-response-time/) |
| WebSocket latency &lt; 150 ms | [`evaluate/websocket-latency/`](../evaluate/websocket-latency/) |
| SUS usability | [`evaluate/sus-usability/`](../evaluate/sus-usability/) |
| JMeter / 200 users | [`evaluate/load-testing-jmeter/`](../evaluate/load-testing-jmeter/) |
| Classroom deployment | [`evaluate/classroom-deployment/`](../evaluate/classroom-deployment/) |

---

## Versioning for publication

Record **Git commit hash**, **Docker image tags**, **Ollama model names**, and **hardware** (GPU/CPU, RAM) in your paper’s experimental setup section.

---

## License

Follow the repository’s license. Moodle plugin code follows GPL v3 as required by Moodle.
