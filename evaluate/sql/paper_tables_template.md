# Paper/Poster Tables Template (Generation Logs)

Use these templates with results from:

- `evaluate/sql/generation_analysis.sql`
- table `mdl_gamifiedquiz_generation_logs` (replace prefix if needed)

---

## Table 1. Experimental Setup

| Item | Value |
|------|-------|
| Deployment target | [Cloud VM / On-prem / Bare metal] |
| CPU | [model, cores, threads] |
| RAM | [GB] |
| GPU | [model, VRAM] |
| Storage | [SSD/NVMe + capacity] |
| OS | [name + version] |
| Docker / Compose | [version] |
| Moodle version | [version] |
| Plugin version | `mod_gamifiedquiz` [version] |
| Ollama version | [version] |
| Test period | [date range] |
| Git commit hash | [hash] |

**Caption suggestion:**  
"Server and software configuration used for all generation experiments."

---

## Table 2. Generation Latency by Backend/Model

| Backend | Model | Runs total | Runs success | Error rate (%) | Mean (ms) | P50 (ms) | P95 (ms) | P99 (ms) |
|---------|-------|------------|--------------|----------------|-----------|----------|----------|----------|
| local | qwen... | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| local | deepseek... | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| local | [other] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |

**Populate from:** sections 3 and 4 in `generation_analysis.sql`  
**Caption suggestion:**  
"Latency distribution and reliability per LLM model under identical generation settings."

---

## Table 3. Throughput and Output Volume

| Backend | Model | Requested questions/run | Mean generated count | Mean saved count | Mean questions/sec |
|---------|-------|--------------------------|----------------------|------------------|--------------------|
| local | qwen... | [ ] | [ ] | [ ] | [ ] |
| local | deepseek... | [ ] | [ ] | [ ] | [ ] |
| local | [other] | [ ] | [ ] | [ ] | [ ] |

**Populate from:** section 3 in `generation_analysis.sql`  
**Caption suggestion:**  
"Generation throughput and persistence outcomes by model."

---

## Table 4. Daily Stability Trend

| Date | Backend | Model | Runs | Mean duration (ms, success only) | Mean QPS (success only) | Error rate (%) |
|------|---------|-------|------|----------------------------------|--------------------------|----------------|
| [YYYY-MM-DD] | local | qwen... | [ ] | [ ] | [ ] | [ ] |
| [YYYY-MM-DD] | local | deepseek... | [ ] | [ ] | [ ] | [ ] |

**Populate from:** section 6 in `generation_analysis.sql`  
**Caption suggestion:**  
"Day-to-day performance stability and failure behavior."

---

## Table 5. Failure Taxonomy (Qualitative Error Analysis)

| Error category | Count | % of all errors | Typical message snippet | Affected model(s) | Mitigation |
|----------------|-------|------------------|--------------------------|-------------------|------------|
| Timeout | [ ] | [ ] | [ ] | [ ] | [ ] |
| Invalid JSON | [ ] | [ ] | [ ] | [ ] | [ ] |
| API/connection error | [ ] | [ ] | [ ] | [ ] | [ ] |
| Empty/invalid question payload | [ ] | [ ] | [ ] | [ ] | [ ] |

**Populate from:** section 7 in `generation_analysis.sql` + manual coding  
**Caption suggestion:**  
"Error-type breakdown with representative failure modes."

---

## Table 6. Speed-Quality Tradeoff (Optional but recommended)

Combine SQL speed metrics with your human rubric scores.

| Model | Mean latency (s) | P95 latency (s) | Mean QPS | Valid output rate (%) | Factual score (1-5) | Clarity score (1-5) | Overall quality score |
|-------|-------------------|-----------------|----------|------------------------|---------------------|---------------------|-----------------------|
| qwen... | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| deepseek... | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |

**Caption suggestion:**  
"Tradeoff between generation efficiency and pedagogical quality."

---

## Poster Figure Suggestions

1. **Boxplot:** latency distribution per model (`duration_ms`).
2. **Bar chart:** mean QPS per model.
3. **Stacked bar:** success vs error counts per model.
4. **Scatter plot:** mean latency vs quality score.

---

## Reporting Checklist (for manuscript consistency)

- Same prompt set for all models.
- Same requested count (`requested_count`) and language.
- Same server/software setup across runs.
- Warmup runs excluded from reported results.
- Report both central tendency and tail latency (mean + p95/p99).
- Separate system performance from pedagogical quality scoring.
