# Research Evaluation Suite

This directory contains the reproducible evaluation suite for the paper:  
**"Toward Efficient Course-Grounded Programming MCQ Generation: An End-to-End Self-Hosted RAG Pipeline for Moodle"** ([`../papers/paper.md`](../papers/paper.md)).

---

## Primary Paper Experiments (E1 – E4)

These four experiments directly generate the primary data tables and figures in the publication:

| Experiment | Directory | Validates | Manuscript Output |
|:---|:---|:---|:---|
| **E1: Expert Quality Validation** | [`e1_expert_validation/`](e1_expert_validation/) | 100 Python MCQs evaluated by 3 independent instructors across 4 dimensions (TC, DP, PR, CE) with Fleiss' $\kappa$ and ICC | **Table 1** (Quality & Agreement) |
| **E2: Pipeline Component Ablation** | [`e2_pipeline_ablation/`](e2_pipeline_ablation/) | 4-way architectural comparison: Config A (Full Re-index), Config B (Proposed Pipeline), Config C (Static Context), Config D (Raw Generation) | **Table 2** (Ablation & Component Contribution) |
| **E3: Corpus Scale & Updates** | [`e3_corpus_scale/`](e3_corpus_scale/) | Knowledge base refresh latency ($T_{KB}$) across 10k–250k token scales and 0%–100% update ratios | **Table 3** (Indexing Latency & Speedup) |
| **E4: Concurrency Operating Envelope** | [`e4_concurrent_generation/`](e4_concurrent_generation/) | Single-GPU stress test under multi-instructor concurrency ($C \in \{1, 2, 5, 10, 20\}$) | **Table 4** (Throughput, P95, VRAM Envelope) |

---

## Running the Primary Experiments

Run all evaluation scripts from the **repository root** (`kwiz/`):

```bash
# E1: Generate rating sheets and analyze expert ratings
python3 evaluate/e1_expert_validation/rating_sheet_generator.py
python3 evaluate/e1_expert_validation/analyze_expert_ratings.py

# E2: Run architectural ablation
python3 evaluate/e2_pipeline_ablation/run_ablation_experiment.py
python3 evaluate/e2_pipeline_ablation/analyze_ablation_results.py

# E3: Benchmark corpus scaling and incremental update speedup
python3 evaluate/e3_corpus_scale/run_corpus_scale_benchmark.py
python3 evaluate/e3_corpus_scale/analyze_corpus_scale_results.py

# E4: Benchmark single-GPU multi-instructor concurrency
python3 evaluate/e4_concurrent_generation/benchmark_concurrency_envelope.py
python3 evaluate/e4_concurrent_generation/analyze_concurrency_results.py
```

---

## Supplementary & Diagnostic Tools

* [`sql/`](sql/): SQL analytics over Moodle generation telemetry logs (`mdl_gamifiedquiz_metrics`).
* [`llm-response-time/`](llm-response-time/): Raw micro-benchmarks for Ollama `/api/generate` latency.
* [`quality-expert/`](quality-expert/): Historical 2-rater evaluation archive.
