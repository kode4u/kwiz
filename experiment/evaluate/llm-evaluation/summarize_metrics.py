#!/usr/bin/env python3
"""Summarize logs/evaluation/metrics.jsonl for poster / paper tables."""
from __future__ import annotations

import argparse
import json
import os
import statistics
from collections import defaultdict
from typing import Any, Dict, List


def load_jsonl(path: str) -> List[Dict[str, Any]]:
    rows = []
    if not os.path.isfile(path):
        return rows
    with open(path, encoding="utf-8") as fh:
        for line in fh:
            line = line.strip()
            if not line:
                continue
            try:
                rows.append(json.loads(line))
            except json.JSONDecodeError:
                continue
    return rows


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--log",
        default=os.path.join(
            os.path.dirname(__file__), "..", "..", "logs", "evaluation", "metrics.jsonl"
        ),
    )
    args = parser.parse_args()
    path = os.path.abspath(args.log)
    rows = load_jsonl(path)
    if not rows:
        print(f"No data in {path}")
        return 1

    hardware = None
    for r in rows:
        if r.get("event") == "hardware_environment":
            hardware = r.get("hardware")
            break
        if r.get("event") == "evaluation_run_start" and r.get("hardware"):
            hardware = r["hardware"]
            break

    gens = [
        r
        for r in rows
        if r.get("event") in ("generation", "moodle_job_complete")
        and r.get("status") == "success"
        and r.get("seconds_per_question")
    ]

    print(f"Metrics log: {path}")
    print(f"Total lines: {len(rows)}")
    print()

    if hardware:
        print("=== Hardware environment ===")
        print(json.dumps(hardware, indent=2))
        print()

    if gens:
        per_q = [float(r["seconds_per_question"]) for r in gens]
        by_cat: Dict[str, List[float]] = defaultdict(list)
        for r in gens:
            by_cat[r.get("category_name") or "unknown"].append(float(r["seconds_per_question"]))

        print("=== Generation latency (seconds per question) ===")
        print(f"  Samples: {len(per_q)}")
        print(f"  Mean:    {statistics.mean(per_q):.4f}s")
        print(f"  Median:  {statistics.median(per_q):.4f}s")
        print(f"  Min:     {min(per_q):.4f}s")
        print(f"  Max:     {max(per_q):.4f}s")
        if len(per_q) > 1:
            print(f"  Stdev:   {statistics.stdev(per_q):.4f}s")
        print()
        print("By category:")
        for cat, vals in sorted(by_cat.items()):
            print(f"  {cat}: mean {statistics.mean(vals):.4f}s (n={len(vals)})")
    else:
        print("No successful generation events with seconds_per_question found.")

    runs = [r for r in rows if r.get("event") == "evaluation_run_end"]
    if runs:
        print()
        print("=== Batch evaluation runs ===")
        for r in runs[-5:]:
            print(json.dumps(r, indent=2))

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
