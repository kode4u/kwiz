# How to Test Local LLM (Ollama)

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
   curl http://localhost:5000/health
   ```

3. **Test question generation with local LLM:**
   ```powershell
   $body = @{
       topic = "Python programming"
       level = "easy"
       n_questions = 1
       backend = "local"
   } | ConvertTo-Json
   
   Invoke-RestMethod -Uri "http://localhost:5000/generate" `
       -Method POST `
       -ContentType "application/json" `
       -Body $body `
       -TimeoutSec 120
   ```

### Method 3: Using curl (if available)

```bash
curl -X POST http://localhost:5000/generate \
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

### 1. Connection Refused Error

**Problem:** `Connection refused` when trying to use local LLM

**Solution:**
- Ensure Ollama is running: `docker ps | findstr ollama`
- Check if `LOCAL_LLM_URL` is set correctly in the container:
  ```powershell
  docker exec jica-llmapi env | findstr LOCAL_LLM
  ```
- Should show: `LOCAL_LLM_URL=http://host.docker.internal:11434`

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

