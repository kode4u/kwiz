# Project Start Guide: Local-First Setup (RAG + Ollama + Moodle)

This guide walks you through starting the JICA Moodle Quiz system completely locally using **Docker Compose** for the infrastructure and **Ollama** for local-first, zero-cost question generation.

---

## 📋 Prerequisites

Before starting, ensure you have the following installed on your host machine:
1. **Docker & Docker Compose** (Desktop or CLI).
2. **Ollama** installed on your host (Mac, Windows, or Linux) with a running instance (usually on `http://localhost:11434`).
3. At least **8GB RAM** (16GB+ recommended for running Ollama models alongside Docker).

---

## 🚀 Step-by-Step Launch Procedure

### Step 1: Prepare the Environment Config
Clone this repository, navigate to the project root, and copy the environment template:
```bash
cp docker/.env.example docker/.env
```

Open `docker/.env` in your editor and configure it for **local LLM mode**:
```ini
# Core LLM API Config
LLM_BACKEND=local
LOCAL_LLM_URL=http://host.docker.internal:11434
OLLAMA_MODEL=qwen2.5-coder:latest

# Webhooks and security (use defaults or customize)
JWT_SECRET=change-me-in-production
GENERATION_WORKER_SECRET=gamified-generation-secret
```

> [!NOTE]
> `host.docker.internal` allows the containerized LLM API service to connect out of the Docker sandbox and speak to the Ollama server running directly on your macOS/Windows host machine.

---

### Step 2: Download Local Models
Open a terminal on your host machine and pull the required models:
```bash
# Pull the text generation model (Qwen 2.5 Coder)
ollama pull qwen2.5-coder:latest

# Pull the vector search embedding model (Nomic Embed)
ollama pull nomic-embed-text
```

---

### Step 3: Spin Up Docker Services
From the root of your workspace (`kwiz/`), build and launch the containerized database, cache, Moodle, and WebSocket microservices in detached mode:
```bash
docker compose up -d
```

Verify that all five containers are up and healthy:
```bash
docker compose ps
```
You should see:
* `jica-mysql` (port 3307)
* `jica-redis` (port 6380)
* `jica-llmapi` (port 5001)
* `jica-websocket` (port 3001)
* `jica-moodle` (port 8080)

---

### Step 4: Complete Moodle Web Installation
1. Open your browser and navigate to **`http://localhost:8080`**.
2. Run through Moodle's quick installation wizard:
   * **Database Host:** `db`
   * **Database Name:** `moodle`
   * **Database User:** `moodle`
   * **Database Password:** `moodlepass`
   * **Database Port:** `3306` (Internal container port)
3. Set up your administrator credentials (e.g., Username: `admin`, Password: `Admin@123`).

---

### Step 5: Configure Moodle Plugin Settings
1. Log in as an administrator to Moodle.
2. Navigate to: **Site Administration ➔ Plugins ➔ Activity Modules ➔ Gamified Quiz**.
3. Fill in the connection settings:
   * **LLM API Endpoint:** `http://jica-llmapi:5001` (Internal Docker network address) or `http://localhost:5001` (if debugging).
   * **WebSocket Server:** `ws://localhost:3001` (Direct client communication address).
   * **JWT Secret:** (Must match the `JWT_SECRET` in your `docker/.env`).

---

## 🔍 Validation & Verification

### Test 1: Query the Health Endpoints
Verify that the Flask service can communicate with your local Ollama daemon:
```bash
curl http://localhost:5001/health
```
**Expected Response:**
```json
{
  "backend": "local",
  "service": "llmapi",
  "status": "healthy"
}
```

### Test 2: Synchronous Local RAG MCQ Generation
Send a mock request to generate a question based on a coding topic and text block:
```bash
curl -X POST http://localhost:5001/generate \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "Python functions",
    "level": "easy",
    "n_questions": 1,
    "language": "en",
    "context": "Functions in Python are declared using the def keyword, followed by the function name and parameters in parentheses."
  }'
```

**Expected Output (Valid JSON MCQ):**
```json
{
  "metadata": {
    "backend": "local",
    "count": 1,
    "language": "en",
    "topic": "Python functions"
  },
  "questions": [
    {
      "bloom_level": "comprehension",
      "choices": [
        {"is_correct": true, "text": "def"},
        {"is_correct": false, "text": "function"},
        {"is_correct": false, "text": "func"},
        {"is_correct": false, "text": "define"}
      ],
      "correct_index": 0,
      "difficulty": "easy",
      "explanation": "In Python, functions are defined using the 'def' keyword.",
      "question": "Which keyword is used to declare a function in Python?"
    }
  ]
}
```

---

## 🛑 Stopping the System

To halt the docker services and release VRAM/RAM:
```bash
# Normal shutdown
docker compose down

# Shutdown and wipe databases/volumes (resets installation)
docker compose down -v
```
