# Evaluation domains (125 questions)

## Totals (rechecked)

| | Count |
|---|--------|
| Domains | **5** |
| Subtopics per domain | **5** |
| Questions per subtopic | **5** |
| **Questions per domain** | **5 × 5 = 25** |
| **Grand total** | **5 × 25 = 125** |

```
C++ Programming          → 25 questions
Python Programming       → 25 questions
Java Programming         → 25 questions
Data Structures          → 25 questions
Database Systems         → 25 questions
─────────────────────────────────
TOTAL                    → 125 questions
```

Each subtopic = **one LLM job** generating **5** MCQs → **25 jobs** for the full study.

## Domain / subtopic table

| Domain | Subtopic 1 | Subtopic 2 | Subtopic 3 | Subtopic 4 | Subtopic 5 |
|--------|------------|------------|------------|------------|------------|
| **C++ Programming** | Variables & Data Types (5) | Control Structures (5) | Functions (5) | Arrays & Strings (5) | OOP (5) |
| **Python Programming** | Variables & Data Types (5) | Conditions & Loops (5) | Functions (5) | Lists & Dictionaries (5) | OOP (5) |
| **Java Programming** | Variables & Data Types (5) | Control Structures (5) | Classes & Objects (5) | Inheritance (5) | Collections (5) |
| **Data Structures** | Arrays (5) | Linked Lists (5) | Stacks & Queues (5) | Trees (5) | Hash Tables (5) |
| **Database Systems** | ER Model (5) | Primary/Foreign Keys (5) | Normalization (5) | SQL Queries (5) | Joins (5) |

Numbers in parentheses = MCQs generated for that subtopic.

## Config file

`batch_plan.example.json`:

```json
"questions_per_domain": 25,
"questions_per_subtopic": 5
```

## Run (no scaling — exact 125)

```bash
python3 evaluate/llm-evaluation/run_batch_evaluation.py --dry-run
python3 evaluate/llm-evaluation/run_batch_evaluation.py
```

`--dry-run` prints per-domain totals before calling the API.

Only use `--total-questions 125` if you need to force scaling; default **`--total-questions 0`** uses the plan exactly.

## Logs

- **category_name:** `Domain: Subtopic`
- **domain** / **subtopic** fields on each `generation` event (batch script)
