# Kwiz — AI-Powered Assessment System for Moodle

Welcome to **Kwiz**, an end-to-end self-hosted system that brings course-grounded AI question generation and real-time gamified quizzes directly into Moodle.

---

## 📁 What is in this Folder?

* **`moodle-plugin/mod/gamifiedquiz/`**: The complete Moodle activity module.
* **`llmapi/`**: The self-hosted Python service (Flask + Ollama + AST compiler validation + PDF/PPTX/DOCX extractor).
* **`websocket-server/`**: Node.js real-time multiplayer session server (Socket.IO + Redis).
* **`docker/`**: Container configurations and Moodle build files.
* **`docker-compose.yml`**: One-command Docker orchestration.
* **`.env.example`**: Configuration template.

---

## 🚀 Quick Start: Deploy Backend with Docker

### Step 1: Clone and Enter `kwiz/`
```bash
git clone https://github.com/kode4u/kwiz.git
cd kwiz/kwiz
```

### Step 2: Prepare Environment File
```bash
cp .env.example .env
```
*(If you have an NVIDIA GPU or local Ollama on your host machine, ensure `.env` has:)*
```ini
LLM_BACKEND=local
LOCAL_LLM_URL=http://host.docker.internal:11434
OLLAMA_MODEL=qwen2.5-coder:7b
OLLAMA_EMBED_MODEL=nomic-embed-text
```

### Step 3: Ensure Ollama is Running
On your host or GPU server:
```bash
# Pull required models
ollama pull qwen2.5-coder:7b
ollama pull nomic-embed-text

# Start Ollama service (if not already running)
ollama serve &
```

### Step 4: Start All Services
```bash
docker compose up -d
```

Verify containers are running:
```bash
docker compose ps
```

Your services are now active:
* **LLM API Service**: `http://<SERVER_IP>:5001` (Health check: `http://<SERVER_IP>:5001/health`)
* **WebSocket Server**: `http://<SERVER_IP>:3001` (Health check: `http://<SERVER_IP>:3001/health`)
* **Bundled Moodle LMS** (optional): `http://<SERVER_IP>:8080`
* **phpMyAdmin**: `http://<SERVER_IP>:8081`

---

## 🔌 Installing the Plugin in Moodle

### If using the bundled Docker Moodle:
The plugin is **already pre-installed and mounted** at `http://localhost:8080`! Simply log in and start using it.

### If installing into an EXISTING Moodle server:

#### Option A: Copy Folder (Fastest)
Copy the plugin folder into your Moodle's `mod/` directory:
```bash
cp -r moodle-plugin/mod/gamifiedquiz /path/to/your/moodle/mod/
```

#### Option B: Zip and Upload
1. Zip the `moodle-plugin/mod/gamifiedquiz` folder so that `gamifiedquiz.zip` contains `gamifiedquiz/version.php` at its root.
2. Log in to your Moodle as an Administrator.
3. Navigate to: **Site Administration → Plugins → Install plugins**.
4. Upload `gamifiedquiz.zip` and follow the on-screen upgrade prompts.

---

## ⚙️ Connecting Moodle Plugin to the Docker Backend

Once the plugin is installed in Moodle:

1. Log in as **Administrator**.
2. Go to: **Site Administration → Plugins → Activity modules → Gamified Quiz**  
   *(Direct URL: `http://your-moodle.com/admin/settings.php?section=modsettinggamifiedquiz`)*
3. Configure the connection fields:
   * **LLM API URL**: Set to the IP and port of your Docker host:
     * If Moodle and Docker run on the same machine: `http://localhost:5001`
     * If Moodle is inside the Docker compose network: `http://llmapi:5001`
     * If Moodle is on a different server: `http://<DOCKER_SERVER_IP>:5001`
   * **WebSocket URL**:
     * `http://<DOCKER_SERVER_IP>:3001` (or `ws://<DOCKER_SERVER_IP>:3001`)
   * **Default LLM Backend**: Select `local` (Ollama).
4. Click **Save changes**.

---

## 🎓 How to Generate Questions in Moodle

1. Enter any course and turn **Edit mode** ON.
2. Click **Add an activity or resource** → Select **Gamified Quiz**.
3. In the activity, click **"AI Question Generator"**:
   * **Select from Course**: Choose any Moodle **Lesson**, **Book**, **Page**, or **File Resource** from the dropdown.
   * **Direct File Upload**: Click **"📁 Or upload course material directly"** and pick any `.pdf`, `.pptx`, `.docx`, or `.txt` slide deck. The system extracts the text automatically!
   * **Specify Topics & Difficulty**: Add categories, pick difficulty (`easy`, `medium`, `hard`), and set question count.
4. Click **"Generate All Questions"**:
   * The Python backend performs SHA-256 chunk caching, dense retrieval, local LLM generation, and Two-Tier AST compilation validation.
   * Validated questions are automatically inserted into the **Moodle Question Bank** (`mdl_question`).
5. **Review & Publish**: Instructors can review, edit distractors/explanations inline, and publish them to quizzes!
