# Expert review files

Place two completed rating sheets here:

| File | Rater |
|------|--------|
| `rating_sheet_expert1.csv` | Expert 1 |
| `rating_sheet_expert2.csv` | Expert 2 |

Columns (0/1): `topic_relevance`, `semantic_correctness`, `answer_key_correctness`, `question_clarity`, `acceptable`.

## Analyze

```bash
python3 data/check_validity.py
python3 data/check_validity.py --json > data/reviews/quality_summary.json
```

## Charts (Jupyter)

From `data/reviews/`:

```bash
pip install pandas matplotlib jupyter
jupyter notebook expert_quality_charts.ipynb   # Expert 1 rubric graphs
jupyter notebook llm_metrics_charts.ipynb      # LLM latency (excludes bad 125 run)
```

| Notebook | Data |
|----------|------|
| `expert_quality_charts.ipynb` | `rating_sheet_expert1.csv` |
| `llm_metrics_charts.ipynb` | `metrics.jsonl` (cleaned; early runs removed) |

## 95–110 vs 125 questions

| Situation | Poster / paper |
|-----------|----------------|
| **≥100 rated**, state **n** clearly | OK: e.g. “*n*=95 prompts, 5 domains” |
| **Strict “125 prompts”** claim | Generate + rate the **missing** subtopics |
| **Two experts** | Both must rate the **same** `item_id` set for κ and P/R/F1 |

Export sheets from LLM output:

```bash
python3 evaluate/llm-evaluation/export_rating_sheets.py
# Copy outputs into data/reviews/ and rename to expert1 / expert2
```
