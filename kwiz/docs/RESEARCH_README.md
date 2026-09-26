# Toward Efficient Course-Grounded Programming MCQ Generation: An End-to-End Self-Hosted RAG Pipeline for Moodle — Research Overview

This document summarizes the research publication system aligned with [`papers/paper.md`](../papers/paper.md) and the four reproducible empirical experiments under [`../evaluate/`](../evaluate/).

---

## Abstract Summary

Large language models (LLMs) and retrieval-augmented generation (RAG) are increasingly used to generate educational assessments. The key challenge addressed in this research is **operational rather than algorithmic**: how to make repeated, course-grounded programming MCQ generation sufficiently responsive, reliable, and resource-efficient for practical institutional use within Moodle under a **single-GPU constraint**.

The proposed pipeline combines:
1. **Incremental Course Indexing**: SHA-256 content hashing and vector embedding reuse to eliminate redundant re-embedding.
2. **Context Bounding**: Controlled Top-$K$ retrieval context to minimize prompt token bloat and accelerate Time-To-First-Token (TTFT).
3. **Local LLM Inference**: Self-hosted `qwen2.5-coder:7b` via Ollama, ensuring 100% data privacy and zero cloud API fees.
4. **Two-Tier Deterministic Validation**:
   - *Tier 1 (Schema & Structure)*: Enforces JSON compliance, 4 unique options, and unambiguous answer keys for all questions (including definitions).
   - *Tier 2 (Conditional AST Verification)*: Compiles code blocks via Python `ast.parse` and bytecode execution, guaranteeing 100% executable syntax while bypassing non-code conceptual questions.
5. **Moodle Question Bank Integration**: Transactional persistence directly into `mdl_question` and `mdl_quiz_slots`.

**Key Performance Highlights:**
* **Indexing Acceleration**: **38.2× reduction** in knowledge-base refresh latency ($T_{KB}$) via incremental SHA-256 reuse (up to **140.3×** on 10k–250k token scales).
* **Pedagogical Acceptance**: **97.0% expert acceptance** (86.0% accept as-is, 11.0% with minor revision) with **100% structural and execution validity**.
* **Source Grounding**: **94.0% fully supported** by retrieved course materials, 6.0% partially supported, **0.0% unsupported/hallucinated**.
* **Single-GPU Concurrency**: Sustains up to **1,619 questions/min** throughput across $C=1\text{--}20$ concurrent requests on a single NVIDIA RTX 3090 (24 GB VRAM) with **100% reliability**.

---

## System Architecture

| Component | Role |
|-----------|------|
| **Moodle Plugin** (`moodle-plugin/mod/gamifiedquiz`) | Instructor question authoring UI, course syllabus upload, and Moodle Question Bank integration |
| **LLM & RAG API** (`llmapi/`) | FastAPI service: SHA-256 embedding cache, vector search, two-tier AST validator, Ollama client |
| **Local Inference Host** | Local Ollama instance serving `qwen2.5-coder:7b` and `nomic-embed-text` |
| **Evaluation Suite** (`evaluate/`) | Reproducible benchmarking scripts for E1 (Quality), E2 (Ablation), E3 (Scale), and E4 (Concurrency) |

---

## Four Controlled Evaluation Experiments

| Experiment | Focus & Research Question | Location |
|------------|---------------------------|----------|
| **E1: Expert Quality Validation** | 3 independent instructors evaluating 100 MCQs across 4 dimensions (TC, DP, PR, CE) with Fleiss' $\kappa$ and ICC | [`evaluate/e1_expert_validation/`](../evaluate/e1_expert_validation/) |
| **E2: Pipeline Component Ablation** | 4-way architectural comparison (Config A: Full Re-index, Config B: Proposed Pipeline, Config C: Static Context, Config D: Raw) | [`evaluate/e2_pipeline_ablation/`](../evaluate/e2_pipeline_ablation/) |
| **E3: Corpus Scale & Incremental Updates** | Knowledge-base indexing latency ($T_{KB}$) across 10k–250k token corpora under 0%, 10%, 25%, 50%, and 100% update ratios | [`evaluate/e3_corpus_scale/`](../evaluate/e3_corpus_scale/) |
| **E4: Single-GPU Concurrency Envelope** | Stress-testing multi-instructor concurrency ($C \in \{1, 2, 5, 10, 20\}$) measuring P50/P95 latency, throughput, and VRAM | [`evaluate/e4_concurrent_generation/`](../evaluate/e4_concurrent_generation/) |

---

## Reproducibility & Environment

* **Hardware**: Dedicated server with Intel Core i7-12700K, 64 GB DDR4 RAM, NVIDIA GeForce RTX 3090 (24 GB GDDR6X).
* **OS / Software**: Ubuntu 22.04.4 LTS, Docker Engine 26.1.1, Python 3.10+, Moodle 4.3.11+.
* **Models**: `qwen2.5-coder:7b-instruct-q4_K_M`, `nomic-embed-text:latest`.
* **Publication Artifacts**: Manuscript in [`papers/paper.md`](../papers/paper.md), HTML preview in [`papers/paper.html`](../papers/paper.html), and compiled PDF in [`papers/paper.pdf`](../papers/paper.pdf).
* **Publication Figures (Vector SVG & Editable Draw.io)**:
  - **Figure 1: End-to-End Pipeline Architecture**: Vector SVG [`papers/figures/pipeline_architecture.svg`](../papers/figures/pipeline_architecture.svg) | Draw.io XML [`papers/figures/pipeline_architecture.drawio`](../papers/figures/pipeline_architecture.drawio)
  - **Figure 2: Incremental Cache Decision Flow**: Vector SVG [`papers/figures/cache_decision_flow.svg`](../papers/figures/cache_decision_flow.svg) | Draw.io XML [`papers/figures/cache_decision_flow.drawio`](../papers/figures/cache_decision_flow.drawio)
