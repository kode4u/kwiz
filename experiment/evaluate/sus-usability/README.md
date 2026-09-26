# Evaluation: System Usability Scale (SUS)

## Purpose

Collect **quantitative usability** data for your paper using the **System Usability Scale** (Brooke, 1996; standard 10-item questionnaire, Likert 1–5).

## Procedure

1. **Participants:** define N (e.g. teachers, students), inclusion criteria, and consent (IRB if required).
2. **Context:** task list (e.g. “start a session”, “generate questions”, “join as student”) — keep tasks identical across participants.
3. **Instrument:** use the **standard SUS items** (10 statements; odd items positive, even items negative).
4. **Scoring:** convert responses to 0–4 points per item, apply odd/even formulas, multiply total by 2.5 → **SUS score 0–100**.
5. **Interpretation:** industry benchmark often cites **>68** as “above average” (context-dependent; cite literature).

## Files in this folder

| File | Description |
|------|-------------|
| `sus_questionnaire_template.md` | Copy into appendix or supplementary material |
| `sus_score_calculator.py` | Compute SUS from a CSV of 10 columns (1–5 Likert) |

## CSV format for calculator

One row per participant, columns `q1` … `q10` (values **1–5**):

```csv
participant_id,q1,q2,q3,q4,q5,q6,q7,q8,q9,q10
P01,4,2,5,3,4,2,5,3,4,5
```

From the **repository root** (`kwiz/`), not from `evaluate/websocket-latency/`:

```bash
cd /path/to/kwiz   # or: cd ~/Desktop/kwiz
python3 evaluate/sus-usability/sus_score_calculator.py --csv evaluate/sus-usability/example_responses.csv
```

If you are already inside `evaluate/sus-usability/`:

```bash
python3 sus_score_calculator.py --csv example_responses.csv
```

## What to report

- N, demographics (if ethics allows), mean SUS, SD, min–max, and qualitative comments (optional).
- Compare to baseline (e.g. standard Moodle quiz) if part of your study design.

## References (add to paper)

- Brooke, J. (1996). SUS: A “quick and dirty” usability scale. *Usability Evaluation in Industry*.
- Bangor, A., Kortum, P., & Miller, J. (2008). An empirical evaluation of the System Usability Scale. *Intl Journal of Human–Computer Interaction*.
