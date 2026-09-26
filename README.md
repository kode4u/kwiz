# Kwiz: Toward Efficient Course-Grounded Programming MCQ Generation

This repository contains the software and research evaluation artifacts for **Kwiz**, an end-to-end self-hosted RAG pipeline integrated into Moodle (`mod_gamifiedquiz`).

The repository is organized into two primary directories:

```
kwiz/
├── kwiz/                 # 🚀 PRODUCTION & DEPLOYMENT (Install plugin, Docker backend, WebSocket)
└── experiment/           # 🔬 RESEARCH & BENCHMARKS (Reproduce E1-E4, paper drafts, datasets)
```

---

## 1. 🚀 `kwiz/` — Production Deployment & Moodle Plugin

If you are an **instructor, system administrator, or developer** wanting to use Kwiz:

👉 **[Go to the `kwiz/` Directory](kwiz/)**

* **Moodle Activity Plugin** (`kwiz/moodle-plugin/mod/gamifiedquiz`): Ready to install into Moodle.
* **One-Command Docker Deployment** (`kwiz/docker-compose.yml`):
  ```bash
  cd kwiz
  cp .env.example .env
  docker compose up -d
  ```
* **Services Launched**:
  * Python LLM & AST Validation API (`http://localhost:5001`) with automatic PDF/PPTX/DOCX extraction.
  * Real-Time Multiplayer WebSocket Server (`http://localhost:3001`).
  * Bundled Moodle LMS with plugin pre-mounted (`http://localhost:8080`).
  * MySQL 8.0 & Redis 7.
* **Moodle Connection Instructions**: How to configure Moodle Site Administration to connect to the Docker container by IP and port.

---

## 2. 🔬 `experiment/` — Research Evaluation & Paper Reproduction

If you are a **peer reviewer or researcher** seeking to inspect the methodology or reproduce benchmark results:

👉 **[Go to the `experiment/` Directory](experiment/)**

* **Research Paper Drafts**:
  * Markdown: [`experiment/papers/paper.md`](experiment/papers/paper.md)
  * Microsoft Word: [`experiment/papers/paper.docx`](experiment/papers/paper.docx)
* **Empirical Benchmarks (E1 – E4)**:
  * **E1**: Quality & Inter-Rater Agreement (`evaluate/e1_expert_validation/`) — 100 questions, Fleiss' $\kappa$, ICC.
  * **E2**: Pipeline Component Ablation (`evaluate/e2_pipeline_ablation/`) — Config A, B, C, D latencies.
  * **E3**: Corpus Scaling & Incremental Indexing (`evaluate/e3_corpus_scale/`) — 10k–250k token caching speedups.
  * **E4**: Single-GPU Concurrency Stress-Test (`evaluate/e4_concurrent_generation/`) — Multi-instructor envelopes.
* **Authentic Course Datasets**: 6 university Python slide decks (PDF, PPTX) and extracted text corpora in `experiment/data/`.
* **Automated Runner**:
  ```bash
  cd experiment
  bash run_real_nvidia_experiments.sh
  ```