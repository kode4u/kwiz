#!/usr/bin/env bash
# ==============================================================================
# Master Physical Experiment Runner for NVIDIA GPU Host (Strict Physical Mode)
# Grounded in Authentic Course Materials: data/courses/
# ZERO Mock | ZERO Sleep | ZERO Synthetic Estimation
#
# Usage:
#   ./run_real_nvidia_experiments.sh        # Runs E2, E3, E4 (benchmark pipeline)
#   ./run_real_nvidia_experiments.sh --e1   # Runs E1 (100 grounded questions & Table 1)
#   ./run_real_nvidia_experiments.sh --all  # Runs E1, E2, E3, and E4
# ==============================================================================

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

PYTHON_BIN="python3"
if [ -f "venv/bin/python3" ]; then
    PYTHON_BIN="venv/bin/python3"
elif [ -f "llmapi/venv/bin/python3" ]; then
    PYTHON_BIN="llmapi/venv/bin/python3"
fi

RUN_E1=false
RUN_E2=true
RUN_E3=true
RUN_E4=true

if [ "$1" == "--all" ]; then
    RUN_E1=true
    RUN_E2=true
    RUN_E3=true
    RUN_E4=true
elif [ "$1" == "--e1" ]; then
    RUN_E1=true
    RUN_E2=false
    RUN_E3=false
    RUN_E4=false
elif [ "$1" == "--benchmark" ] || [ "$1" == "--no-e1" ]; then
    RUN_E1=false
    RUN_E2=true
    RUN_E3=true
    RUN_E4=true
fi

echo "========================================================================"
echo "    INACON: Physical Assessment Pipeline Benchmark on NVIDIA GPU"
echo "    Python Binary: $($PYTHON_BIN --version) at $PYTHON_BIN"
echo "    Execution Mode: E1=$RUN_E1 | E2=$RUN_E2 | E3=$RUN_E3 | E4=$RUN_E4"
echo "========================================================================"

# Step 0: Pre-flight Checks
echo ""
echo "[Step 0] Checking GPU, Ollama, and Environment..."
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
OLLAMA_CMD="ollama"
if ! command -v ollama &> /dev/null; then
    if docker ps | grep -q qwen-ollama; then
        OLLAMA_CMD="docker exec qwen-ollama ollama"
    fi
fi

if [[ $MODELS != *"qwen2.5-coder:7b"* ]]; then
    echo "[OLLAMA] Pulling qwen2.5-coder:7b..."
    $OLLAMA_CMD pull qwen2.5-coder:7b
fi
if [[ $MODELS != *"nomic-embed-text"* ]]; then
    echo "[OLLAMA] Pulling nomic-embed-text..."
    $OLLAMA_CMD pull nomic-embed-text
fi
echo "[OLLAMA] All required models are ready."

# Check or start Flask API on port 5001 if E2 or E4 is enabled
API_STARTED=false
if [ "$RUN_E2" = true ] || [ "$RUN_E4" = true ]; then
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
echo "[Step 1] Extracting Authentic Course Documents from data/courses/..."
$PYTHON_BIN data/extract_courses.py

# Step E1: Run Experiment 1 (Authentic Question Generation, Retrieval Audit & 5-Dimension Evaluation)
if [ "$RUN_E1" = true ]; then
    echo ""
    echo "[Step E1] Executing Experiment 1: Course-Grounded Question Generation & Expert Evaluation (Table 1)..."
    $PYTHON_BIN evaluate/e1_expert_validation/generate_e1_questions.py \
        --corpus data/extracted/full_course_corpus.txt \
        --ollama-url http://localhost:11434 \
        --embed-model nomic-embed-text \
        --gen-model qwen2.5-coder:7b \
        --output-json evaluate/e1_expert_validation/e1_questions.json \
        --output-audit evaluate/e1_expert_validation/RETRIEVAL_CHUNKS_AUDIT.md

    $PYTHON_BIN evaluate/e1_expert_validation/evaluate_with_llm_judges.py \
        --questions evaluate/e1_expert_validation/e1_questions.json \
        --ollama-url http://localhost:11434 \
        --r1-backend "${R1_BACKEND:-auto}" \
        --r2-backend "${R2_BACKEND:-auto}" \
        --r3-backend "${R3_BACKEND:-auto}"

    $PYTHON_BIN evaluate/e1_expert_validation/compute_agreement_metrics.py
fi

# Step 2: Build Multi-Scale Corpora grounded in authentic modules
if [ "$RUN_E3" = true ]; then
    echo ""
    echo "[Step 2] Building Authentic Curriculum Progression Scales (Zero Duplication)..."
    $PYTHON_BIN evaluate/e3_corpus_scale/generate_corpora.py
fi

# Step 3: Run Experiment 2 - Pipeline Ablation (Physical Runs)
if [ "$RUN_E2" = true ]; then
    echo ""
    echo "[Step 3] Executing Experiment 2: Physical Pipeline Ablation (Table 2)..."
    rm -f llmapi/embeddings_cache.json
    $PYTHON_BIN evaluate/e2_pipeline_ablation/run_ablation_experiment.py \
        --api-url http://localhost:5001 \
        --backend local \
        --repeats 3 \
        --output ablation_results.jsonl
fi

# Step 4: Run Experiment 3 - Corpus Scaling & Incremental Hashing (Physical Runs)
if [ "$RUN_E3" = true ]; then
    echo ""
    echo "[Step 4] Executing Experiment 3: Physical Corpus Scale & Indexing (Table 3)..."
    $PYTHON_BIN evaluate/e3_corpus_scale/run_corpus_scale_experiment.py \
        --corpora-dir corpora \
        --ollama-url http://localhost:11434 \
        --embed-model nomic-embed-text \
        --output-jsonl corpus_scale_results.jsonl \
        --output-report e3_corpus_scale_results.md
fi

# Step 5: Run Experiment 4 - Concurrency & Single-GPU Envelope (Physical Runs)
if [ "$RUN_E4" = true ]; then
    echo ""
    echo "[Step 5] Executing Experiment 4: Physical Concurrency Operating Envelope (Table 4)..."
    $PYTHON_BIN evaluate/e4_concurrent_generation/run_concurrency_experiment.py \
        --api-url http://localhost:5001 \
        --backend local \
        --questions-per-req 1 \
        --output concurrency_envelope_results.jsonl
fi

# Rebuild evaluation dashboard HTML
$PYTHON_BIN scripts/build_evaluation_dashboard.py

# Compile and print Final Tables
echo ""
echo "========================================================================"
echo "    PHYSICAL EXPERIMENT SUMMARY TABLES (INACON / KWIZ)"
echo "========================================================================"
$PYTHON_BIN evaluate/compile_tables_for_paper.py

echo ""
echo "[DONE] Results logged in evaluate/ directories. Ready to update paper.md."
