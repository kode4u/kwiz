#!/usr/bin/env python3
"""
Compute System Usability Scale (SUS) scores from CSV (q1..q10, Likert 1-5).
Stdlib only.
"""
from __future__ import annotations

import argparse
import csv
import sys


def sus_score_from_ten(values: list[int]) -> float:
    if len(values) != 10:
        raise ValueError("Need exactly 10 responses")
    converted = []
    for i, x in enumerate(values):
        if x < 1 or x > 5:
            raise ValueError(f"Item {i+1} must be 1-5, got {x}")
        # 0-4 scale
        if i % 2 == 0:  # odd items (1,3,5...) in questionnaire: 1-indexed odd
            converted.append(x - 1)
        else:
            converted.append(5 - x)
    total = sum(converted)
    return total * 2.5


def main() -> int:
    p = argparse.ArgumentParser()
    p.add_argument("--csv", required=True, help="CSV with columns participant_id,q1,...,q10")
    p.add_argument("--json", action="store_true", help="Output JSON lines")
    args = p.parse_args()

    rows_out = []
    with open(args.csv, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        fieldnames = reader.fieldnames or []
        qcols = [f"q{i}" for i in range(1, 11)]
        for row in reader:
            vals = [int(row[c]) for c in qcols]
            score = sus_score_from_ten(vals)
            pid = row.get("participant_id", row.get("id", "?"))
            rows_out.append({"participant_id": pid, "sus_score": round(score, 2)})

    if not rows_out:
        print("No rows found", file=sys.stderr)
        return 1

    scores = [r["sus_score"] for r in rows_out]
    mean = sum(scores) / len(scores)

    if args.json:
        import json
        print(json.dumps({"participants": rows_out, "mean_sus": round(mean, 2), "n": len(scores)}))
        return 0

    for r in rows_out:
        print(f"{r['participant_id']}: SUS = {r['sus_score']}")
    print(f"Mean SUS (n={len(scores)}): {mean:.2f}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
