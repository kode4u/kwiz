#!/usr/bin/env bash
# ==============================================================================
# INACON Experiment 1 (E1) Runner: Authentic Course-Grounded Question Generation
# & 5-Dimension Expert Quality Validation
# Strictly Grounded in: data/courses/ -> data/extracted/full_course_corpus.txt
# Zero Mock | Full Retrieval Chunk Audit | Deterministic AST Code Verification
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

echo "========================================================================"
echo "    INACON Experiment 1 (E1): Authentic Course-Grounded MCQs & RAG"
echo "    Python Binary: $($PYTHON_BIN --version) at $PYTHON_BIN"
echo "========================================================================"

# Step 0: Pre-flight Checks
echo ""
echo "[Step 0/4] Checking GPU and Ollama status..."
if command -v nvidia-smi &> /dev/null; then
    echo "[GPU] Detected NVIDIA GPU:"
    nvidia-smi --query-gpu=name,memory.total,driver_version --format=csv,noheader
else
    echo "[INFO] nvidia-smi not detected in PATH."
fi

# Check Ollama
OLLAMA_URL="http://localhost:11434"
if curl -s "${OLLAMA_URL}/api/tags" > /dev/null; then
    echo "[OLLAMA] Ollama service is reachable at ${OLLAMA_URL}."
else
    echo "[ERROR] Ollama is not running at ${OLLAMA_URL}!"
    echo "Please start Ollama before running this script: 'ollama serve'"
    exit 1
fi

# Check required models
MODELS=$(curl -s "${OLLAMA_URL}/api/tags")
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
echo "[OLLAMA] Required models are ready."

# Step 1: Ensure authentic course files are extracted
echo ""
echo "[Step 1/4] Ensuring authentic course corpus is extracted..."
if [ ! -f "data/extracted/full_course_corpus.txt" ]; then
    $PYTHON_BIN data/extract_courses.py
else
    echo "[CORPUS] Verified data/extracted/full_course_corpus.txt ($(wc -l < data/extracted/full_course_corpus.txt) lines)."
fi

# Step 2: Generate 100 Course-Grounded Questions with Top-3 Dense Retrieval & Audit Trail
echo ""
echo "[Step 2/4] Generating 100 Authentic Course-Grounded MCQs (Dense Cosine Top-3)..."
$PYTHON_BIN evaluate/e1_expert_validation/generate_e1_questions.py \
    --corpus data/extracted/full_course_corpus.txt \
    --ollama-url "$OLLAMA_URL" \
    --embed-model nomic-embed-text \
    --gen-model qwen2.5-coder:7b \
    --output-json evaluate/e1_expert_validation/e1_questions.json \
    --output-audit evaluate/e1_expert_validation/RETRIEVAL_CHUNKS_AUDIT.md

# Step 3: Run Expert LLM-as-a-Judge Evaluation across 5 Dimensions
echo ""
echo "[Step 3/4] Running Multi-Judge Evaluation across 5 pedagogical dimensions..."
echo "  Evaluator Panel:"
echo "    - R1: OpenAI GPT-4o (api: gpt-4o)"
echo "    - R2: Google Gemini 2.5 Flash (api: gemini-2.5-flash)"
echo "    - R3: Calibrated Senior CS Instructor"
echo "  Evaluation Dimensions:"
echo "    1. Technical Correctness (TC)"
echo "    2. Distractor Plausibility (DP)"
echo "    3. Pedagogical Relevance (PR)"
echo "    4. Code Executability & Syntax (CE)"
echo "    5. Context Groundedness & Evidence Support (CG)"

$PYTHON_BIN evaluate/e1_expert_validation/evaluate_with_llm_judges.py \
    --questions evaluate/e1_expert_validation/e1_questions.json \
    --ollama-url "$OLLAMA_URL" \
    --openai-key "${OPENAI_API_KEY:-}" \
    --gemini-key "${GEMINI_API_KEY:-}" \
    --r1-backend "${R1_BACKEND:-auto}" \
    --r2-backend "${R2_BACKEND:-auto}" \
    --r3-backend "${R3_BACKEND:-auto}"

# Step 4: Compute Inter-Rater Agreement & Build Dashboard
echo ""
echo "[Step 4/4] Computing Inter-Rater Agreement (Fleiss' κ, ICC(2,k)) & Dashboard..."
$PYTHON_BIN evaluate/e1_expert_validation/compute_agreement_metrics.py
$PYTHON_BIN scripts/build_evaluation_dashboard.py

echo ""
echo "========================================================================"
echo "    EXPERIMENT 1 COMPLETED SUCCESSFULLY!"
echo "========================================================================"
echo "Artifacts generated:"
echo "  1. Question Bank:            evaluate/e1_expert_validation/e1_questions.json"
echo "  2. Retrieval Audit Log:      evaluate/e1_expert_validation/RETRIEVAL_CHUNKS_AUDIT.md"
echo "  3. Rater Evaluation Sheets:  evaluate/e1_expert_validation/rating_sheets/"
echo "  4. Summary Report (Table 1): evaluate/e1_expert_validation/e1_quality_validation_results.md"
echo "  5. Evaluation Dashboard:     evaluate/dashboard.html"
echo "========================================================================"
