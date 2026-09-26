# Empirical Research Evaluation Suite & Paper Reproduction

This directory contains the complete reproduction package for the research paper:  
**"Toward Efficient Course-Grounded Programming MCQ Generation: An End-to-End Self-Hosted RAG Pipeline for Moodle"**

---

## 📁 Directory Structure

```
experiment/
├── papers/                      # Full paper manuscript (paper.md, paper.docx, figures)
├── evaluate/                    # All benchmark experiment suites (E1 - E4)
│   ├── e1_expert_validation/    # 100 benchmark MCQs & inter-rater agreement (Table 1)
│   ├── e2_pipeline_ablation/    # Component ablation experiment (Table 2)
│   ├── e3_corpus_scale/         # Corpus scaling & SHA-256 caching speedups (Table 3)
│   ├── e4_concurrent_generation/# Single-GPU concurrency stress-test (Table 4)
│   └── compile_tables_for_paper.py
├── data/                        # Authentic university course slides (PDFs, PPTX, extracted corpora)
│   ├── courses/                 # 6 lecture slides from Python CS curriculum
│   ├── extracted/               # Normalized text corpora (10k, 50k, 100k, 250k tokens)
│   └── extract_courses.py       # Multi-format document text extractor
├── experiment.md                # Detailed execution manual
├── run_real_nvidia_experiments.sh # Automated sequential execution script for GPU servers
└── run_e1_experiment.sh         # Dedicated E1 benchmark runner
```

---

## 🚀 Quick Reproduction Guide

### Prerequisites
1. Ensure your GPU host has **Ollama** running with:
   ```bash
   ollama pull qwen2.5-coder:7b
   ollama pull nomic-embed-text
   ```
2. Start the Kwiz Python LLM service (from `../kwiz/llmapi` or via Docker on port `5001`).

### Running All Benchmarks in One Command
```bash
bash run_real_nvidia_experiments.sh
```

---

## 🔬 Individual Experiment Execution

### 1. Experiment 2 (E2): Pipeline Component Ablation (Table 2)
Compares Config A (Full Re-indexing), Config B (Proposed Pipeline), Config C (Static Prompt Bloat), and Config D (Zero-Shot):
```bash
python3 evaluate/e2_pipeline_ablation/run_ablation_experiment.py --api-url http://localhost:5001 --backend local --repeats 3
python3 evaluate/e2_pipeline_ablation/analyze_ablation_results.py
```
* Raw logs: `evaluate/e2_pipeline_ablation/ablation_results.jsonl`

### 2. Experiment 3 (E3): Corpus Scale & Incremental Indexing (Table 3)
Measures cache speedup and embedding reuse across 10k–250k token scales:
```bash
python3 evaluate/e3_corpus_scale/generate_corpora.py
python3 evaluate/e3_corpus_scale/run_corpus_scale_experiment.py
```
* Raw logs: `evaluate/e3_corpus_scale/corpus_scale_results.jsonl`

### 3. Experiment 4 (E4): Concurrency Operating Envelope (Table 4)
Stress-tests the host under $C \in \{1, 2, 5, 10, 20\}$ concurrent requests:
```bash
python3 evaluate/e4_concurrent_generation/run_concurrency_experiment.py --api-url http://localhost:5001 --backend local
python3 evaluate/e4_concurrent_generation/plot_concurrency_envelope.py
```
* Raw logs: `evaluate/e4_concurrent_generation/concurrency_envelope_results.jsonl`

### 4. Experiment 1 (E1): Expert Quality Validation (Table 1)
Generates 100 questions and computes Fleiss' $\kappa$ and ICC:
```bash
python3 evaluate/e1_expert_validation/generate_e1_questions.py --api-url http://localhost:5001 --backend local
python3 evaluate/e1_expert_validation/compute_agreement_metrics.py
```
* Generated items: `evaluate/e1_expert_validation/e1_questions.json`

---

## 📄 Manuscript Files
* Markdown Draft: [`papers/paper.md`](papers/paper.md)
* Microsoft Word Manuscript: [`papers/paper.docx`](papers/paper.docx)
* Architectural Diagrams: [`papers/figures/`](papers/figures/)
