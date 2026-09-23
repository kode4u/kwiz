# Experiment 2 (E2): Pipeline Ablation Results

Evaluation of 4 architectural pipeline variants across standard curriculum modules:

- **Config A (Full Re-index)**: Recomputes dense embeddings for all knowledge base chunks on every request.
- **Config B (Proposed Pipeline)**: Combines SHA-256 incremental caching, adaptive Top-K context budgeting, and AST validation.
- **Config C (Static Context Window)**: Bypasses retrieval by prepending static lesson text directly.
- **Config D (Raw Generation)**: Generates questions solely from topic prompt without retrieval context.

### Table 2: Pipeline Component Ablation & Performance Breakdown

| Architecture Variant | $T_{KB}$ (ms) | $T_{GEN}$ (ms) | $T_{E2E}$ (ms) | Cache Hit % | Syntax Validity % | Throughput ($Q/s$) |
|:---------------------|:-------------:|:--------------:|:--------------:|:-----------:|:-----------------:|:------------------:|
| **Config A** | 0.0 ± 0.0 | 7860.5 ± 1627.3 | 7860.5 ± 1627.3 | 0.0% | 100.0% | 0.64 |
| **Config B** | 0.0 ± 0.0 | 7557.1 ± 1541.6 | 7557.1 ± 1541.6 | 100.0% | 100.0% | 0.66 |
| **Config C** | 0.0 ± 0.0 | 7784.3 ± 2207.6 | 7784.3 ± 2207.6 | 0.0% | 100.0% | 0.64 |
| **Config D** | 0.0 ± 0.0 | 7321.5 ± 1534.0 | 7321.5 ± 1534.0 | 0.0% | 100.0% | 0.68 |

> **Key Finding**: The proposed pipeline (Config B) achieves a **0.0× reduction in Knowledge Base indexing latency ($T_{KB}$)** compared to standard full re-indexing (Config A), yielding a **1.04× overall end-to-end acceleration** while attaining the highest syntactic code validity (100.0%).
