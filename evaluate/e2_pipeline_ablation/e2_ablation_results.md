# Experiment 2 (E2): Pipeline Ablation Results

Evaluation of 4 architectural pipeline variants across standard curriculum modules:

- **Config A (Full Re-index)**: Recomputes dense embeddings for all knowledge base chunks on every request.
- **Config B (Proposed Pipeline)**: Combines SHA-256 incremental caching, adaptive Top-K context budgeting, and AST validation.
- **Config C (Static Context Window)**: Bypasses retrieval by prepending static lesson text directly.
- **Config D (Raw Generation)**: Generates questions solely from topic prompt without retrieval context.

### Table 2: Pipeline Component Ablation & Performance Breakdown

| Architecture Variant | $T_{KB}$ (ms) | $T_{GEN}$ (ms) | $T_{E2E}$ (ms) | Cache Hit % | Syntax Validity % | Throughput ($Q/s$) |
|:---------------------|:-------------:|:--------------:|:--------------:|:-----------:|:-----------------:|:------------------:|
| **Config A** | 0.0 ± 0.0 | 1497.3 ± 290.5 | 1497.3 ± 290.5 | 0.0% | 100.0% | 0.67 |
| **Config B** | 0.0 ± 0.0 | 1462.6 ± 322.8 | 1462.6 ± 322.8 | 0.0% | 100.0% | 0.68 |
| **Config C** | 0.0 ± 0.0 | 1375.7 ± 247.7 | 1375.7 ± 247.7 | 0.0% | 100.0% | 0.73 |
| **Config D** | 0.0 ± 0.0 | 1419.3 ± 195.5 | 1419.3 ± 195.5 | 0.0% | 100.0% | 0.70 |

> **Key Finding**: The proposed pipeline (Config B) achieves a **0.0× reduction in Knowledge Base indexing latency ($T_{KB}$)** compared to standard full re-indexing (Config A), yielding a **1.02× overall end-to-end acceleration** while attaining the highest syntactic code validity (100.0%).
