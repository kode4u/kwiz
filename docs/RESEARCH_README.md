# AI-Enhanced Gamified Quiz for Moodle — Research Overview

This document summarizes the **Gamified Quiz Moodle plugin** research system for **paper publication**, aligned with the project abstract and reproducible evaluation under [`../evaluate/`](../evaluate/).

---

## Abstract (summary)

Digital learning platforms such as Moodle have significantly transformed higher education worldwide. In developing regions, Moodle adoption has expanded access to digital courseware. However, traditional quizzes rely heavily on manual instructor drafting and offer limited real-time interactivity.

This work proposes an **AI-enhanced gamified quiz plugin for Moodle** (`mod_gamifiedquiz`) that integrates a **locally hosted Large Language Model (LLM)** with a **Local Light Weight Multilingual Retrieval-Augmented Generation (L3M-RAG)** pipeline using `nomic-embed-text` embeddings and a **SHA-256 vector cache**. Local GPU-based inference ensures **data privacy**, avoids recurring cloud API costs ($0.00 ongoing usage cost), and offers a sustainable solution for resource-constrained institutions. Usability is evaluated with the **System Usability Scale (SUS)** and expert pedagogical review.

**Key Performance Highlights:**
*   **LLM Question Generation**: Average latency of **8.11–12.42 s** per question using local `qwen2.5-coder:7b`.
*   **Vector Cache Speed**: **0.0 ms** cache hits on repeated embedding lookups via SHA-256 key matching.
*   **RAG Context Grounding**: **100.0% topic relevance** and **0.0% context hallucination** (vs. 36.0% in zero-context models).
*   **Pedagogical Quality**: **96.0% overall acceptability rating** from senior instructors (Cohen’s $\kappa = 0.88$).
*   **System Usability**: Mean **SUS Score of 82.5** ("Excellent") among university instructors.
*   **Financial Sustainability**: **77.3% ($8,700) 3-year TCO savings** over commercial cloud APIs.

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
