# Test Local LLM (Ollama) Connection
Write-Host "Testing Local LLM Connection..." -ForegroundColor Cyan
Write-Host ""

# 1. Check if Ollama is running
Write-Host "1. Checking Ollama service..." -ForegroundColor Yellow
try {
    $ollamaResponse = Invoke-RestMethod -Uri "http://localhost:11434/api/tags" -ErrorAction Stop
    Write-Host "   [OK] Ollama is running on port 11434" -ForegroundColor Green
    Write-Host "   Available models:" -ForegroundColor Gray
    foreach ($model in $ollamaResponse.models) {
        Write-Host "     - $($model.name)" -ForegroundColor Gray
    }
} catch {
    Write-Host "   [ERROR] Ollama is not accessible: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

Write-Host ""

# 2. Check LLM API health
Write-Host "2. Checking LLM API service..." -ForegroundColor Yellow
try {
    $apiHealth = Invoke-RestMethod -Uri "http://localhost:5000/health" -ErrorAction Stop
    if ($apiHealth.status -eq "healthy") {
        Write-Host "   [OK] LLM API is healthy" -ForegroundColor Green
        Write-Host "   Current backend: $($apiHealth.backend)" -ForegroundColor Gray
    } else {
        Write-Host "   [ERROR] LLM API is not healthy" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "   [ERROR] LLM API is not accessible: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

Write-Host ""

# 3. Test question generation with local LLM
Write-Host "3. Testing question generation with local LLM..." -ForegroundColor Yellow
$testRequest = @{
    topic = "Python programming"
    level = "easy"
    n_questions = 1
    language = "en"
    backend = "local"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "http://localhost:5000/generate" `
        -Method POST `
        -ContentType "application/json" `
        -Body $testRequest `
        -TimeoutSec 60
    
    if ($response.questions -and $response.questions.Count -gt 0) {
        Write-Host "   [OK] Question generated successfully!" -ForegroundColor Green
        Write-Host ""
        Write-Host "   Generated Question:" -ForegroundColor Cyan
        Write-Host "   $($response.questions[0].question)" -ForegroundColor White
        Write-Host ""
        Write-Host "   Choices:" -ForegroundColor Cyan
        for ($i = 0; $i -lt $response.questions[0].choices.Count; $i++) {
            $choice = $response.questions[0].choices[$i]
            $marker = if ($choice.is_correct) { "[OK]" } else { "   " }
            $color = if ($choice.is_correct) { "Green" } else { "White" }
            Write-Host "   $marker [$i] $($choice.text)" -ForegroundColor $color
        }
        Write-Host ""
        Write-Host "   Backend used: $($response.metadata.backend)" -ForegroundColor Gray
    } else {
        Write-Host "   [ERROR] No questions generated" -ForegroundColor Red
    }
} catch {
    Write-Host "   [ERROR] Error: $($_.Exception.Message)" -ForegroundColor Red
    
    # Try to get more details from the error response
    if ($_.Exception.Response) {
        try {
            $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
            $responseBody = $reader.ReadToEnd()
            Write-Host "   Response: $responseBody" -ForegroundColor Yellow
        } catch {
            # Ignore if we can't read the response
        }
    }
    
    Write-Host ""
    Write-Host "   Troubleshooting:" -ForegroundColor Yellow
    Write-Host "   1. Check if LOCAL_LLM_URL is set correctly in docker/.env (should be http://host.docker.internal:11434 for Windows)" -ForegroundColor Gray
    Write-Host "   2. Ensure Ollama is running on Windows host (not in Docker)" -ForegroundColor Gray
    Write-Host "   3. Check LLM API logs: docker-compose logs llmapi --tail 50" -ForegroundColor Gray
    Write-Host "   4. Restart LLM API container: docker-compose restart llmapi" -ForegroundColor Gray
    exit 1
}

Write-Host ""
Write-Host "[OK] All tests passed! Local LLM is working." -ForegroundColor Green

