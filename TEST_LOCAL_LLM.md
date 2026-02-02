# How to Test Local LLM (Ollama)

## Quick fix: 500 "Cannot connect to Ollama" when generating questions

1. **Run Ollama on your computer** (not in Docker): install from [ollama.ai](https://ollama.ai), then start it and pull a model, e.g. `ollama pull deepseek-coder`.
2. **Set local LLM in `.env`** (project root or `docker/.env`):
   ```env
   LLM_BACKEND=local
   LOCAL_LLM_URL=http://host.docker.internal:11434
   OLLAMA_MODEL=deepseek-coder:latest
   ```
3. **Restart the LLM API:** `docker-compose restart llmapi`
4. **Check from host:** `curl http://localhost:11434/api/tags` should list models.

See [Troubleshooting → Connection Refused](#1-connection-refused-500--cannot-connect-to-ollama-at-) below for more detail.

---

## Quick Test

### Method 1: Using PowerShell Script

```powershell
.\test_local_llm.ps1
```

### Method 2: Manual Test with curl/PowerShell

1. **Check Ollama is running:**
   ```powershell
   curl http://localhost:11434/api/tags
   ```

2. **Check LLM API health:**
   ```powershell
   curl http://localhost:5001/health
   ```

3. **Test question generation with local LLM:**
   ```powershell
   $body = @{
       topic = "Python programming"
       level = "easy"
       n_questions = 1
       backend = "local"
   } | ConvertTo-Json
   
   Invoke-RestMethod -Uri "http://localhost:5001/generate" `
       -Method POST `
       -ContentType "application/json" `
       -Body $body `
       -TimeoutSec 120
   ```

### Method 3: Using curl (if available)

```bash
curl -X POST http://localhost:5001/generate \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "Python programming",
    "level": "easy",
    "n_questions": 1,
    "backend": "local"
  }'
```

## Configuration

### Environment Variables

The LLM API is configured to use Ollama via `host.docker.internal:11434` (Windows Docker).

**Available models in Ollama:**
- Check available models: `curl http://localhost:11434/api/tags`
- Current default: `deepseek-coder:latest` (can be changed via `OLLAMA_MODEL` env var)

### Update Model

To use a different Ollama model, set the environment variable in `docker-compose.yml`:

```yaml
llmapi:
  environment:
    OLLAMA_MODEL: "deepseek-r1:1.5b"  # or your preferred model
```

Then restart:
```powershell
docker-compose restart llmapi
```

## Troubleshooting

### 1. Connection Refused (500 – "Cannot connect to Ollama at ...")

**Problem:** `Connection refused` or `Failed to establish a new connection` when generating questions with local LLM.

**Cause:** The LLM API runs inside Docker and tries to reach Ollama at `host.docker.internal:11434`. Ollama must run **on your host machine**, not in Docker.

**Solution:**

1. **Install Ollama on your host** (if not already): https://ollama.ai  
   - Windows/Mac: download and run the installer.  
   - Linux: `curl -fsSL https://ollama.ai/install.sh | sh`

2. **Start Ollama and pull a model on your host:**
   ```bash
   ollama serve          # usually starts automatically; if not, run this
   ollama pull deepseek-coder   # or another model you want
   ```
   Check it’s reachable on the host:
   ```bash
   curl http://localhost:11434/api/tags
   ```

3. **Use local backend and correct URL:**
   - In project root `.env` (or `docker/.env`), set:
     ```env
     LLM_BACKEND=local
     LOCAL_LLM_URL=http://host.docker.internal:11434
     OLLAMA_MODEL=deepseek-coder:latest
     ```
   - `docker-compose.yml` already uses `extra_hosts` so `host.docker.internal` works on Linux too.

4. **Restart the LLM API container:**
   ```bash
   docker-compose restart llmapi
   ```

5. **Verify from inside the container (optional):**
   ```bash
   docker exec jica-llmapi env | grep LOCAL_LLM
   docker exec jica-llmapi curl -s http://host.docker.internal:11434/api/tags
   ```

**Linux note:** If `host.docker.internal` still doesn’t work, set `LOCAL_LLM_URL=http://172.17.0.1:11434` (Docker bridge IP) in `.env` and restart `llmapi`.

### 2. Model Not Found

**Problem:** Error about model not being available

**Solution:**
- List available models: `curl http://localhost:11434/api/tags`
- Update `OLLAMA_MODEL` in docker-compose.yml to match an available model
- Restart container: `docker-compose restart llmapi`

### 3. Timeout Errors

**Problem:** Request times out

**Solution:**
- Local LLMs can be slow. Increase timeout in your request
- Check Ollama logs: `docker logs quiz-llm`
- Ensure Ollama has enough resources (CPU/RAM)

### 4. Check Logs

```powershell
# LLM API logs
docker-compose logs llmapi --tail 50

# Ollama logs  
docker logs quiz-llm --tail 50
```

## Expected Response

A successful response should look like:

```json
{
  "questions": [
    {
      "question": "What is a variable in Python?",
      "choices": [
        {"text": "A container for storing data", "is_correct": true},
        {"text": "A function", "is_correct": false},
        {"text": "A class", "is_correct": false},
        {"text": "A module", "is_correct": false}
      ],
      "correct_index": 0,
      "difficulty": "easy",
      "bloom_level": "comprehension",
      "explanation": "..."
    }
  ],
  "metadata": {
    "topic": "Python programming",
    "language": "en",
    "count": 1,
    "backend": "local"
  }
}
```

## Verify from Container

Test connectivity from inside the LLM API container:

```powershell
docker exec jica-llmapi python -c "import requests; r = requests.get('http://host.docker.internal:11434/api/tags'); print(r.json())"
```

This should list available Ollama models.

