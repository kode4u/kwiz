# Research Experiment Execution Guide

This guide provides instructions for running the complete empirical evaluation suite for the research paper:  
**"Toward Efficient Course-Grounded Programming MCQ Generation: An End-to-End Self-Hosted RAG Pipeline for Moodle"** ([`papers/paper.md`](papers/paper.md)).

---

## 1. Prerequisites & GPU Verification (Ubuntu Server)

### 1.1 Verify NVIDIA GPU & Driver
Ensure that the NVIDIA driver and CUDA toolkit are operational:
```bash
nvidia-smi
```
*Verify that the GPU (e.g., NVIDIA GeForce RTX 3090, 24 GB VRAM) is detected with appropriate driver versions.*

### 1.2 Ollama Service Setup
Check if the Ollama service is active:
```bash
curl http://localhost:11434/
```
If not running, launch it in the background or verify systemd:
```bash
ollama serve &
```

### 1.3 Download Required Models
Pull both the primary programming generation LLM and the dense embedding model:
```bash
# 1. Primary generation model (Qwen 2.5 Coder 7B)
ollama pull qwen2.5-coder:7b

# 2. Dense embedding model for course retrieval
ollama pull nomic-embed-text
```

### 1.4 GPU Offloading Smoke-Test
Verify that the model loads into GPU memory without errors:
```bash
ollama run qwen2.5-coder:7b "def fibonacci(n):"
```
*(In a secondary terminal, verify with `nvidia-smi` that ~4.5–5.5 GB of VRAM is allocated).*

---

## 2. Launch Kwiz LLM API Service (`llmapi`)

The evaluation harness interacts with the self-hosted Flask API on port `5001`.

```bash
# 1. Navigate to the llmapi directory
cd ~/Desktop/kwiz/llmapi

# 2. Create and activate Python virtual environment
python3 -m venv venv
source venv/bin/activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Set environment variables for local GPU serving
export LLM_BACKEND=local
export LOCAL_LLM_URL=http://localhost:11434
export OLLAMA_MODEL=qwen2.5-coder:7b
export OLLAMA_EMBED_MODEL=nomic-embed-text
export FLASK_PORT=5001

# 5. Start the service
python3 app.py
```

In a separate terminal, confirm the service is healthy:
```bash
curl http://localhost:5001/health
```
Expected output:
```json
{"status": "healthy", "backend": "local", "service": "llmapi"}
```

> **Telemetry Dashboard:**  
> Access `http://localhost:5001/dashboard` in your browser for real-time waterfall execution latencies ($T_{\text{KB}}$, $T_{\text{GEN}}$, $T_{\text{E2E}}$), token counts, and AST code compilation verifications.

---

## 3. Running Primary Experiments (E1 – E4)

Open a new terminal, activate your virtual environment, and navigate to the project root:
```bash
cd ~/Desktop/kwiz
```

---

### Experiment 2 (E2): Pipeline Component Ablation (Table 2)
Compares four architectural pipeline configurations:
- **Config A:** Full Re-index Baseline (No cache, full re-indexing per query)
- **Config B:** Proposed Pipeline (SHA-256 Incremental Caching + Top-$K$ Retrieval + AST Verification)
- **Config C:** Static Context Window (Prompt text bloat)
- **Config D:** Raw Zero-Shot Generation (No retrieval)

```bash
# Run ablation benchmark against local GPU
python3 evaluate/e2_pipeline_ablation/run_ablation_experiment.py \
    --api-url http://localhost:5001 \
    --backend local \
    --repeats 3

# Compute mean +/- SD and format Table 2
python3 evaluate/e2_pipeline_ablation/analyze_ablation_results.py
```
* **Raw Logs:** [`evaluate/e2_pipeline_ablation/ablation_results.jsonl`](evaluate/e2_pipeline_ablation/ablation_results.jsonl)
* **Summary Report:** [`evaluate/e2_pipeline_ablation/e2_ablation_results.md`](evaluate/e2_pipeline_ablation/e2_ablation_results.md)

---

### Experiment 3 (E3): Corpus Scale & Incremental Indexing (Table 3)
Evaluates indexing efficiency and cache speedup across 4 corpus scales ($10\text{k}, 50\text{k}, 100\text{k}, 250\text{k}$ tokens) and 5 update ratios ($U_0, U_{10}, U_{25}, U_{50}, U_{100}$):

```bash
# 1. Generate standard evaluation corpora (if not already generated)
python3 evaluate/e3_corpus_scale/generate_corpora.py

# 2. Benchmark incremental indexing latency & speedup
python3 evaluate/e3_corpus_scale/run_corpus_scale_experiment.py

# 3. (Optional) Run GPU compute contention & CPU offloading interference test
python3 evaluate/e3_corpus_scale/run_interference_test.py
```
* **Raw Logs:** [`evaluate/e3_corpus_scale/corpus_scale_results.jsonl`](evaluate/e3_corpus_scale/corpus_scale_results.jsonl)
* **Summary Report:** [`evaluate/e3_corpus_scale/e3_corpus_scale_results.md`](evaluate/e3_corpus_scale/e3_corpus_scale_results.md)

---

### Experiment 4 (E4): Single-GPU Concurrency Operating Envelope (Table 4)
Stress-tests the host under multi-instructor concurrency ($C \in \{1, 2, 5, 10, 20\}$ concurrent requests) while recording throughput, $P50/P95$ latency, and VRAM envelope:

```bash
# (Optional) Monitor GPU utilization in a side terminal:
watch -n 0.5 nvidia-smi

# Execute concurrency benchmark
python3 evaluate/e4_concurrent_generation/run_concurrency_experiment.py \
    --api-url http://localhost:5001 \
    --backend local

# Generate concurrency curve plots and summary report
python3 evaluate/e4_concurrent_generation/plot_concurrency_envelope.py
```
* **Raw Logs:** [`evaluate/e4_concurrent_generation/concurrency_envelope_results.jsonl`](evaluate/e4_concurrent_generation/concurrency_envelope_results.jsonl)
* **Summary Report:** [`evaluate/e4_concurrent_generation/e4_concurrency_envelope_results.md`](evaluate/e4_concurrent_generation/e4_concurrency_envelope_results.md)

---

### Experiment 1 (E1): Expert Quality Validation & Inter-Rater Agreement (Table 1)
Generates 100 benchmark MCQs across 10 curriculum modules and computes Fleiss' $\kappa$ and Intraclass Correlation Coefficient (ICC):

```bash
# 1. Generate 100 questions using local LLM
python3 evaluate/e1_expert_validation/generate_e1_questions.py \
    --api-url http://localhost:5001 \
    --backend local

# 2. Generate blind evaluation rating sheets
python3 evaluate/e1_expert_validation/rating_sheet_generator.py

# 3. Compute inter-rater agreement (Fleiss' Kappa, ICC) and descriptive statistics
python3 evaluate/e1_expert_validation/compute_agreement_metrics.py
```
* **Generated Questions:** [`evaluate/e1_expert_validation/e1_questions.json`](evaluate/e1_expert_validation/e1_questions.json)
* **Summary Report:** [`evaluate/e1_expert_validation/e1_quality_validation_results.md`](evaluate/e1_expert_validation/e1_quality_validation_results.md)

---

## 4. Run Everything in Sequence (Automated Run Script)

To execute all benchmarks sequentially:

```bash
cd ~/Desktop/kwiz

# Run E2 Ablation
python3 evaluate/e2_pipeline_ablation/run_ablation_experiment.py --api-url http://localhost:5001 --backend local --repeats 3
python3 evaluate/e2_pipeline_ablation/analyze_ablation_results.py

# Run E3 Corpus Scaling
python3 evaluate/e3_corpus_scale/generate_corpora.py
python3 evaluate/e3_corpus_scale/run_corpus_scale_experiment.py

# Run E4 Concurrency Envelope
python3 evaluate/e4_concurrent_generation/run_concurrency_experiment.py --api-url http://localhost:5001 --backend local
python3 evaluate/e4_concurrent_generation/plot_concurrency_envelope.py

# Run E1 Quality Validation
python3 evaluate/e1_expert_validation/generate_e1_questions.py --api-url http://localhost:5001 --backend local
python3 evaluate/e1_expert_validation/compute_agreement_metrics.py
```

---

## 5. Experiment-to-Paper Mapping

| Experiment | Execution Script | Results File | Paper Section & Output |
|:---|:---|:---|:---|
| **E1** | `generate_e1_questions.py` | `e1_quality_validation_results.md` | **Section 5.1 & Table 1** (Quality & Agreement) |
| **E2** | `run_ablation_experiment.py` | `e2_ablation_results.md` | **Section 5.2, 5.3 & Table 2** (Ablation & Breakdown) |
| **E3** | `run_corpus_scale_experiment.py` | `e3_corpus_scale_results.md` | **Section 5.4 & Table 3** (Corpus Scaling & Updates) |
| **E4** | `run_concurrency_experiment.py` | `e4_concurrency_envelope_results.md` | **Section 5.5 & Table 4** (Concurrency & Single-GPU Envelope) |
