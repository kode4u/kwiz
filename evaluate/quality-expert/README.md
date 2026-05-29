# Evaluation: Expert quality assessment (Khmer + English)

## Purpose

Evaluate generated MCQ quality with expert raters for publication.
This module complements system metrics (latency, throughput, errors).

## 125-question study (2 experts, binary rubric)

For the main evaluation (**5 domains × 25 questions = 125**):

1. Generate: [../llm-evaluation/README.md](../llm-evaluation/README.md)  
2. Export sheets: `python3 evaluate/llm-evaluation/export_rating_sheets.py`  
3. Rubric (4 criteria, 0/1): [rubric_binary_mcq.md](rubric_binary_mcq.md)  
4. Analyze: `calculate_binary_rubric_scores.py` on `rating_sheet_expert1.csv` + `rating_sheet_expert2.csv`  
5. Consensus: resolve disagreements → `rating_sheet_consensus.csv`  

## Files

- `rubric_template.md`: scoring rubric and rating instructions
- `rating_sheet_en.csv`: template for English evaluation
- `rating_sheet_km.csv`: template for Khmer evaluation
- `calculate_quality_scores.py`: compute summary metrics and agreement
- `merge_speed_quality.py`: merge quality summary with SQL performance metrics

## Recommended protocol

1. Prepare a fixed benchmark set:
   - same topics
   - same difficulties
   - same number of generated questions per model
2. Generate for each model (e.g., Qwen, DeepSeek) and language (`en`, `km`).
3. Blind model names (set `model_name=REDACTED` for rating stage, map later).
4. Have at least 2 experts score independently.

## Rating sheet columns

Mandatory scoring columns (per row):

- `factual_correctness` (1-5)
- `question_clarity` (1-5)
- `distractor_quality` (1-5)
- `difficulty_alignment` (1-5)
- `language_quality` (1-5)
- `context_relevance` (1-5)
- `acceptable` (0/1)
- `hard_fail_fact_error` (0/1)
- `hard_fail_multi_correct_or_none` (0/1)
- `hard_fail_unreadable_language` (0/1)

## Run scoring

From repository root:

```bash
python3 evaluate/quality-expert/calculate_quality_scores.py --csv evaluate/quality-expert/rating_sheet_en.csv
python3 evaluate/quality-expert/calculate_quality_scores.py --csv evaluate/quality-expert/rating_sheet_km.csv
```

JSON output (for later analysis/plots):

```bash
python3 evaluate/quality-expert/calculate_quality_scores.py \
  --csv evaluate/quality-expert/rating_sheet_en.csv \
  --json > evaluate/quality-expert/en_quality_summary.json
```

## Merge quality + speed metrics (for final paper table)

1. Export performance CSV from SQL module:

```bash
./evaluate/sql/export_generation_csv.sh
```

2. Produce quality JSON (example for EN and KM separately):

```bash
python3 evaluate/quality-expert/calculate_quality_scores.py \
  --csv evaluate/quality-expert/rating_sheet_en.csv \
  --json > evaluate/quality-expert/en_quality_summary.json

python3 evaluate/quality-expert/calculate_quality_scores.py \
  --csv evaluate/quality-expert/rating_sheet_km.csv \
  --json > evaluate/quality-expert/km_quality_summary.json
```

3. Merge (example for EN):

```bash
python3 evaluate/quality-expert/merge_speed_quality.py \
  --quality-json evaluate/quality-expert/en_quality_summary.json \
  --perf-csv evaluate/sql/exports/<run>/by_model_summary.csv \
  --out-csv evaluate/quality-expert/en_speed_quality_table.csv
```

Output includes:

- quality metrics (overall mean, acceptability, hard-fail rates)
- performance metrics (latency, qps, error rate)
- `speed_quality_index` (optional composite = quality / latency_seconds)

## Report in paper/poster

For each language and model, report:

- overall mean quality score (and SD)
- criterion-level means
- acceptability rate
- hard-fail rate
- Cohen's kappa (acceptability) where 2-rater pairs exist

Then compare with system logs (`evaluate/sql/`) for speed-quality tradeoff.
