#!/usr/bin/env bash
# ==============================================================================
# Master Physical Experiment Runner for NVIDIA GPU Host (Strict Physical Mode)
# Grounded in Authentic Course Materials: data/courses/
# ZERO Mock | ZERO Sleep | ZERO Synthetic Estimation
# ==============================================================================

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

PYTHON_BIN="python3"
if [ -f "llmapi/venv/bin/python3" ]; then
    PYTHON_BIN="llmapi/venv/bin/python3"
fi

echo "========================================================================"
echo "    INACON: Physical Assessment Pipeline Benchmark on NVIDIA GPU"
echo "    Python Binary: $($PYTHON_BIN --version) at $PYTHON_BIN"
echo "========================================================================"

# Step 0: Pre-flight Checks
echo ""
echo "[Step 0/5] Checking GPU, Ollama, and Environment..."
if command -v nvidia-smi &> /dev/null; then
    echo "[GPU] Detected NVIDIA GPU:"
    nvidia-smi --query-gpu=name,memory.total,driver_version --format=csv,noheader
else
    echo "[WARN] nvidia-smi not detected in PATH. Telemetry will record 0% GPU."
fi

# Check Ollama
if curl -s http://localhost:11434/api/tags > /dev/null; then
    echo "[OLLAMA] Ollama service is reachable on port 11434."
else
    echo "[ERROR] Ollama is not running on http://localhost:11434!"
    echo "Please start Ollama before running this script: 'ollama serve'"
    exit 1
fi

# Check required models in Ollama
echo "[OLLAMA] Verifying required models..."
MODELS=$(curl -s http://localhost:11434/api/tags)
if [[ $MODELS != *"qwen2.5-coder:7b"* ]]; then
    echo "[OLLAMA] Pulling qwen2.5-coder:7b..."
    ollama pull qwen2.5-coder:7b
fi
if [[ $MODELS != *"nomic-embed-text"* ]]; then
    echo "[OLLAMA] Pulling nomic-embed-text..."
    ollama pull nomic-embed-text
fi
echo "[OLLAMA] All required models are ready."

# Check or start Flask API on port 5001
API_STARTED=false
if curl -s http://localhost:5001/health > /dev/null; then
    echo "[API] Flask LLM API is already running on port 5001."
else
    echo "[API] Starting local Flask LLM API server on port 5001..."
    export LLM_BACKEND=local
    export LOCAL_LLM_URL=http://localhost:11434
    export OLLAMA_MODEL=qwen2.5-coder:7b
    export OLLAMA_EMBED_MODEL=nomic-embed-text
    export FLASK_PORT=5001
    
    $PYTHON_BIN llmapi/app.py > /tmp/llmapi_nvidia.log 2>&1 &
    API_PID=$!
    API_STARTED=true
    
    # Wait for API to become healthy
    for i in {1..30}; do
        if curl -s http://localhost:5001/health > /dev/null; then
            echo "[API] Flask API successfully initialized (PID: $API_PID)."
            break
        fi
        sleep 1
    done
fi

cleanup() {
    if [ "$API_STARTED" = true ] && [ -n "$API_PID" ]; then
        echo ""
        echo "[CLEANUP] Stopping background Flask API (PID: $API_PID)..."
        kill -9 $API_PID 2>/dev/null || true
    fi
}
trap cleanup EXIT

# Step 1: Extract authentic course files
echo ""
echo "[Step 1/5] Extracting Authentic Course Documents from data/courses/..."
$PYTHON_BIN data/extract_courses.py

# Step 2: Build Multi-Scale Corpora grounded in authentic modules
echo ""
echo "[Step 2/5] Building Authentic Curriculum Progression Scales (Zero Duplication)..."
$PYTHON_BIN evaluate/e3_corpus_scale/generate_corpora.py

# Step 3: Run Experiment 2 - Pipeline Ablation (Physical Runs)
echo ""
echo "[Step 3/5] Executing Experiment 2: Physical Pipeline Ablation (Table 2)..."
rm -f llmapi/embeddings_cache.json
$PYTHON_BIN evaluate/e2_pipeline_ablation/run_ablation_experiment.py \
    --api-url http://localhost:5001 \
    --backend local \
    --repeats 3 \
    --output ablation_results.jsonl

# Step 4: Run Experiment 3 - Corpus Scaling & Incremental Hashing (Physical Runs)
echo ""
echo "[Step 4/5] Executing Experiment 3: Physical Corpus Scale & Indexing (Table 3)..."
$PYTHON_BIN evaluate/e3_corpus_scale/run_corpus_scale_experiment.py \
    --corpora-dir corpora \
    --ollama-url http://localhost:11434 \
    --embed-model nomic-embed-text \
    --output-jsonl corpus_scale_results.jsonl \
    --output-report e3_corpus_scale_results.md

# Step 5: Run Experiment 4 - Concurrency & Single-GPU Envelope (Physical Runs)
echo ""
echo "[Step 5/5] Executing Experiment 4: Physical Concurrency Operating Envelope (Table 4)..."
$PYTHON_BIN evaluate/e4_concurrent_generation/run_concurrency_experiment.py \
    --api-url http://localhost:5001 \
    --backend local \
    --questions-per-req 1 \
    --output concurrency_envelope_results.jsonl

# Compile and print Final Tables
echo ""
echo "========================================================================"
echo "    ALL PHYSICAL EXPERIMENTS COMPLETED SUCCESSFULLY!"
echo "========================================================================"
$PYTHON_BIN evaluate/compile_tables_for_paper.py

echo ""
echo "[DONE] Results logged in evaluate/ directories. Ready to update paper.md."
