# LLM evaluation: generation metrics + expert quality analysis

End-to-end workflow for your **125-question** study (5 domains × **25 questions/domain**), file logging, and **two-expert** quality review.

| Step | Output |
|------|--------|
| 1. Generate | `logs/evaluation/metrics.jsonl`, `questions_export.json` |
| 2. Speed analysis | `summarize_metrics.py` → latency, seconds/question |
| 3. Expert sheets | `rating_sheet_expert1.csv`, `rating_sheet_expert2.csv` |
| 4. Expert analysis | `calculate_binary_rubric_scores.py` → acceptability %, κ |
| 5. Paper | Combine with hardware + references |

Domain list: [DOMAINS.md](DOMAINS.md)  
Expert rubric: [../quality-expert/rubric_binary_mcq.md](../quality-expert/rubric_binary_mcq.md)

---

## Study design (rechecked)

| | |
|---|---|
| Domains | 5 (C++, Python, Java, Data Structures, Database Systems) |
| Subtopics per domain | 5 |
| Questions per subtopic | 5 |
| **Questions per domain** | **25** |
| **Total** | **125** |
| Expert raters | **2** (independent → consensus on disagreement) |

> Your paper text may name a different fifth domain (e.g. *Flutter Development*). The JSON plan uses **Database Systems**; edit `batch_plan.example.json` if you regenerate for another domain.

---

## Part A — Automated generation & performance metrics

### A1. Hardware (for poster / paper)

Set real specs (Docker on Mac often mis-detects GPU):

```bash
export EVAL_GPU="NVIDIA RTX 3090 (24 GB VRAM)"
export EVAL_CPU="AMD Ryzen 9 5950X"
export EVAL_RAM_GB="64"
export EVAL_OS="Ubuntu 22.04"
export OLLAMA_MODEL="qwen3:8b"
export LLM_BACKEND=local
```

### A2. Run generation (125 questions)

```bash
docker compose up -d --build llmapi
python3 evaluate/llm-evaluation/run_batch_evaluation.py --dry-run   # verify 25/domain
python3 evaluate/llm-evaluation/run_batch_evaluation.py
```

**Outputs:**

| File | Purpose |
|------|---------|
| `logs/evaluation/metrics.jsonl` | All timing events (append-only) |
| `logs/evaluation/run_*.jsonl` | This run only |
| `logs/evaluation/questions_export.json` | All 125 MCQs for experts |

### A3. Analyze performance (final automated output)

```bash
python3 evaluate/llm-evaluation/summarize_metrics.py
```

Report in paper:

- Mean / median / p95 **seconds per question**
- Total generation time
- **Hardware environment** (from `hardware_environment` event or `EVAL_*` vars)
- Optional: breakdown by `domain` in log lines

Example paragraph:

> The local LLM was deployed using Ollama on a workstation with [GPU], [CPU], and [RAM] GB RAM running [OS]. Generating 125 MCQs across five domains took [T] minutes in total (mean [X] s per question).

---

## Part B — Expert evaluation (2 instructors)

### AI Question Quality Evaluation Rubric

Two instructors independently review all **125** generated MCQs. Disagreements are resolved by **discussion and consensus**.

#### Evaluation criteria (0 = Unacceptable, 1 = Acceptable)

1. **Topic relevance** — Matches requested domain and subtopic  
2. **Semantic correctness** — Technically and conceptually correct  
3. **Answer key correctness** — Designated correct answer is correct  
4. **Question clarity** — Readable and understandable  

**Overall acceptable:** recommend **1** only if all four criteria = **1**.

**Score (%)** = (Acceptable questions ÷ Total) × 100  

Example: 110 acceptable / 125 → **88%**.

Full rubric + example + references: [rubric_binary_mcq.md](../quality-expert/rubric_binary_mcq.md)

#### References

- Kurdi, S., Leo, J., & Parsia, D. (2020). *International Journal of Artificial Intelligence in Education*, 30, 121–204.  
- Du, X., Shao, J., & Cardie, C. (2017). *Proceedings of ACL 2017*.

### B1. Create rating sheets for Expert 1 and Expert 2

```bash
python3 evaluate/llm-evaluation/export_rating_sheets.py
```

Creates:

- `evaluate/quality-expert/rating_sheet_expert1.csv`
- `evaluate/quality-expert/rating_sheet_expert2.csv`

Each row = one question (pre-filled stem, choices, correct label). Experts fill:

`topic_relevance`, `semantic_correctness`, `answer_key_correctness`, `question_clarity`, `acceptable` (0 or 1).

### B2. Independent scoring

1. Expert 1 completes `rating_sheet_expert1.csv`  
2. Expert 2 completes `rating_sheet_expert2.csv`  
3. Do **not** discuss until both finish  

### B3. Analyze expert results

```bash
python3 evaluate/quality-expert/calculate_binary_rubric_scores.py \
  --csv evaluate/quality-expert/rating_sheet_expert1.csv \
  --csv evaluate/quality-expert/rating_sheet_expert2.csv
```

JSON for tables:

```bash
python3 evaluate/quality-expert/calculate_binary_rubric_scores.py \
  --csv evaluate/quality-expert/rating_sheet_expert1.csv \
  --csv evaluate/quality-expert/rating_sheet_expert2.csv \
  --json > evaluate/quality-expert/binary_quality_summary.json
```

**Report:**

| Metric | Source |
|--------|--------|
| Acceptability % (overall and per domain) | Per-rater CSV |
| Criterion pass rate % (each of 4) | Per-rater CSV |
| Inter-rater agreement % | Script output |
| Cohen's κ (acceptable) | Script output |
| Disagreement list | `disagreement_item_ids` → consensus meeting |

### B4. Consensus (after discussion)

For items where experts disagreed:

1. Meet and agree final 0/1 scores  
2. Save `evaluate/quality-expert/rating_sheet_consensus.csv` (same columns, one row per item)  
3. Use consensus file as **final quality outcome** for the paper  

---

## Part C — Final results table (paper / poster)

Combine automated + expert results:

| Domain | N | Acceptability % (consensus) | Mean s/question | Topic rel. % | Semantic % | Answer key % | Clarity % |
|--------|---|-----------------------------|-----------------|--------------|------------|--------------|-----------|
| C++ Programming | 25 | … | … | … | … | … | … |
| Python Programming | 25 | … | … | … | … | … | … |
| Java Programming | 25 | … | … | … | … | … | … |
| Data Structures | 25 | … | … | … | … | … | … |
| Database Systems | 25 | … | … | … | … | … | … |
| **Overall** | **125** | … | … | … | … | … | … |

- **Speed columns:** from `summarize_metrics.py` / `metrics.jsonl` (group by `domain`)  
- **Quality columns:** from consensus CSV or averaged expert scores  

Optional merge with SQL exports: [../quality-expert/merge_speed_quality.py](../quality-expert/merge_speed_quality.py)

---

## Log file reference

`logs/evaluation/metrics.jsonl` — one JSON per line:

```json
{"event":"generation","domain":"C++ Programming","subtopic":"Functions","seconds_per_question":4.2,"status":"success"}
```

Events: `hardware_environment`, `generation`, `moodle_job_complete`, `evaluation_run_start`, `evaluation_run_end`.

---

## Quick command checklist

```bash
# 1. Generate + export
python3 evaluate/llm-evaluation/run_batch_evaluation.py

# 2. Performance summary
python3 evaluate/llm-evaluation/summarize_metrics.py

# 3. Expert CSVs
python3 evaluate/llm-evaluation/export_rating_sheets.py

# 4. (Experts fill CSVs offline)

# 5. Analyze expert scores
python3 evaluate/quality-expert/calculate_binary_rubric_scores.py \
  --csv evaluate/quality-expert/rating_sheet_expert1.csv \
  --csv evaluate/quality-expert/rating_sheet_expert2.csv
```
