# Experiment 2 (E2): Pipeline Ablation Results

Evaluation of 4 architectural pipeline variants across standard curriculum modules:

- **Config A (Full Re-index)**: Recomputes dense embeddings for all knowledge base chunks on every request.
- **Config B (Proposed Pipeline)**: Combines SHA-256 incremental caching, adaptive Top-K context budgeting, and two-tier validation (schema + conditional AST).
- **Config C (Static Context Window)**: Bypasses retrieval by prepending static lesson text directly.
- **Config D (Raw Generation)**: Generates questions solely from topic prompt without retrieval context.

### Table 2: Pipeline Component Ablation & Performance Breakdown

| Architecture Variant | $T_{KB}$ (ms) | $T_{GEN}$ (ms) | $T_{E2E}$ (ms) | Cache Hit % | Syntax Validity % | Throughput ($Q/s$) |
|:---------------------|:-------------:|:--------------:|:--------------:|:-----------:|:-----------------:|:------------------:|
| **Config A** | 515.4 ± 8.7 | 2374.0 ± 45.5 | 2889.4 ± 42.7 | 0.0% | 94.2% | 1.73 |
| **Config B** | 13.5 ± 1.0 | 2334.0 ± 26.4 | 2347.5 ± 27.0 | 96.0% | 98.6% | 2.13 |
| **Config C** | 1.2 ± 0.0 | 3984.0 ± 55.8 | 3985.2 ± 55.8 | 0.0% | 91.0% | 1.25 |
| **Config D** | 0.0 ± 0.0 | 2004.0 ± 25.9 | 2004.0 ± 25.9 | 0.0% | 87.5% | 2.50 |

> **Key Finding**: The proposed pipeline (Config B) achieves a **38.2× reduction in Knowledge Base indexing latency ($T_{KB}$)** compared to standard full re-indexing (Config A), yielding a **1.23× overall end-to-end acceleration** while attaining the highest syntactic code validity (98.6%).
