#!/usr/bin/env python3
"""
Calculate expert quality metrics for AI-generated MCQs.

Input:
  CSV rating sheet with at least:
    item_id, language, model_name, rater_id,
    factual_correctness, question_clarity, distractor_quality,
    difficulty_alignment, language_quality, context_relevance,
    acceptable, hard_fail_fact_error, hard_fail_multi_correct_or_none,
    hard_fail_unreadable_language

Output:
  - Prints summary tables to console
  - Optional JSON output with --json
"""

from __future__ import annotations

import argparse
import csv
import json
import math
from collections import defaultdict
from typing import Dict, List, Tuple, Any


CRITERIA = [
    "factual_correctness",
    "question_clarity",
    "distractor_quality",
    "difficulty_alignment",
    "language_quality",
    "context_relevance",
]

HARD_FAIL_FLAGS = [
    "hard_fail_fact_error",
    "hard_fail_multi_correct_or_none",
    "hard_fail_unreadable_language",
]


def parse_int(value: str, field: str, row_idx: int, min_v: int = 0, max_v: int = 5) -> int:
    try:
        v = int(value)
    except Exception as exc:
        raise ValueError(f"Row {row_idx}: field '{field}' must be integer, got '{value}'") from exc
    if v < min_v or v > max_v:
        raise ValueError(f"Row {row_idx}: field '{field}' out of range [{min_v}, {max_v}], got {v}")
    return v


def mean(values: List[float]) -> float:
    if not values:
        return float("nan")
    return sum(values) / len(values)


def stdev(values: List[float]) -> float:
    if len(values) < 2:
        return 0.0
    m = mean(values)
    return math.sqrt(sum((x - m) ** 2 for x in values) / (len(values) - 1))


def cohen_kappa_binary(pairs: List[Tuple[int, int]]) -> float:
    """
    Cohen's kappa for binary labels 0/1.
    Returns NaN if not computable.
    """
    if not pairs:
        return float("nan")

    n = len(pairs)
    agree = sum(1 for a, b in pairs if a == b)
    p0 = agree / n

    # Marginals.
    pa1 = sum(1 for a, _ in pairs if a == 1) / n
    pa0 = 1.0 - pa1
    pb1 = sum(1 for _, b in pairs if b == 1) / n
    pb0 = 1.0 - pb1
    pe = pa1 * pb1 + pa0 * pb0

    if abs(1.0 - pe) < 1e-12:
        return float("nan")
    return (p0 - pe) / (1.0 - pe)


def load_rows(path: str) -> List[Dict[str, Any]]:
    rows: List[Dict[str, Any]] = []
    with open(path, "r", encoding="utf-8", newline="") as f:
        reader = csv.DictReader(f)
        required = {"item_id", "language", "model_name", "rater_id", "acceptable"}
        missing = required - set(reader.fieldnames or [])
        if missing:
            raise ValueError(f"Missing required columns: {sorted(missing)}")

        for idx, row in enumerate(reader, start=2):
            parsed = dict(row)
            for c in CRITERIA:
                parsed[c] = parse_int(row.get(c, ""), c, idx, 1, 5)
            parsed["acceptable"] = parse_int(row.get("acceptable", ""), "acceptable", idx, 0, 1)
            for h in HARD_FAIL_FLAGS:
                parsed[h] = parse_int(row.get(h, ""), h, idx, 0, 1)
            rows.append(parsed)
    return rows


def summarize(rows: List[Dict[str, Any]]) -> Dict[str, Any]:
    # Group by (language, model_name)
    groups: Dict[Tuple[str, str], List[Dict[str, Any]]] = defaultdict(list)
    for r in rows:
        groups[(r["language"], r["model_name"])].append(r)

    summaries = []
    for (language, model_name), grp in sorted(groups.items()):
        crit_vals = {c: [float(r[c]) for r in grp] for c in CRITERIA}
        overall_per_row = [mean([float(r[c]) for c in CRITERIA]) for r in grp]
        acceptable_vals = [float(r["acceptable"]) for r in grp]

        fail_any = [
            1.0 if any(int(r[h]) == 1 for h in HARD_FAIL_FLAGS) else 0.0
            for r in grp
        ]

        summary = {
            "language": language,
            "model_name": model_name,
            "n_ratings": len(grp),
            "criteria_mean": {c: round(mean(v), 4) for c, v in crit_vals.items()},
            "criteria_sd": {c: round(stdev(v), 4) for c, v in crit_vals.items()},
            "overall_mean": round(mean(overall_per_row), 4),
            "overall_sd": round(stdev(overall_per_row), 4),
            "acceptable_rate": round(mean(acceptable_vals), 4),
            "hard_fail_rate_any": round(mean(fail_any), 4),
            "hard_fail_rate_each": {
                h: round(mean([float(r[h]) for r in grp]), 4) for h in HARD_FAIL_FLAGS
            },
        }
        summaries.append(summary)

    # Cohen's kappa for acceptability: requires exactly two raters per item in each group.
    kappa_by_group = []
    item_groups: Dict[Tuple[str, str, str], List[Dict[str, Any]]] = defaultdict(list)
    for r in rows:
        item_groups[(r["language"], r["model_name"], r["item_id"])].append(r)

    tmp_pairs: Dict[Tuple[str, str], List[Tuple[int, int]]] = defaultdict(list)
    for (language, model_name, _item_id), raters in item_groups.items():
        if len(raters) != 2:
            continue
        a, b = raters[0], raters[1]
        tmp_pairs[(language, model_name)].append((int(a["acceptable"]), int(b["acceptable"])))

    for (language, model_name), pairs in sorted(tmp_pairs.items()):
        kappa_by_group.append(
            {
                "language": language,
                "model_name": model_name,
                "items_with_2_raters": len(pairs),
                "cohen_kappa_acceptable": round(cohen_kappa_binary(pairs), 4)
                if pairs
                else float("nan"),
            }
        )

    return {
        "summary_by_language_model": summaries,
        "agreement": kappa_by_group,
    }


def print_report(result: Dict[str, Any]) -> None:
    print("Expert quality summary by language/model")
    print("=" * 60)
    for s in result["summary_by_language_model"]:
        print(f"- {s['language']} | {s['model_name']} | n={s['n_ratings']}")
        print(
            f"  overall_mean={s['overall_mean']:.4f}, acceptable_rate={s['acceptable_rate']:.4f}, "
            f"hard_fail_any={s['hard_fail_rate_any']:.4f}"
        )
        print("  criteria_mean:", ", ".join(f"{k}={v:.3f}" for k, v in s["criteria_mean"].items()))
        print()

    if result["agreement"]:
        print("Inter-rater agreement (Cohen's kappa on acceptable)")
        print("=" * 60)
        for a in result["agreement"]:
            print(
                f"- {a['language']} | {a['model_name']} | items={a['items_with_2_raters']} "
                f"| kappa={a['cohen_kappa_acceptable']}"
            )


def main() -> int:
    parser = argparse.ArgumentParser(description="Calculate expert quality metrics")
    parser.add_argument("--csv", required=True, help="Input rating CSV")
    parser.add_argument("--json", action="store_true", help="Print JSON result")
    args = parser.parse_args()

    rows = load_rows(args.csv)
    result = summarize(rows)

    if args.json:
        print(json.dumps(result, ensure_ascii=False, indent=2))
    else:
        print_report(result)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
