#!/usr/bin/env python3
"""
Merge expert quality summaries with SQL performance summaries.

Inputs:
  1) Quality JSON from calculate_quality_scores.py --json
  2) Performance CSV by_model_summary.csv from evaluate/sql exports

Output:
  - Combined CSV for paper table and plotting.
"""

from __future__ import annotations

import argparse
import csv
import json
from typing import Dict, Any, List, Tuple


def norm(v: str) -> str:
    return (v or "").strip().lower()


def load_quality(path: str) -> Dict[Tuple[str, str], Dict[str, Any]]:
    with open(path, "r", encoding="utf-8") as f:
        data = json.load(f)

    out: Dict[Tuple[str, str], Dict[str, Any]] = {}
    for row in data.get("summary_by_language_model", []):
        key = (norm(row.get("language", "")), norm(row.get("model_name", "")))
        out[key] = row
    return out


def load_perf(path: str) -> Dict[str, Dict[str, Any]]:
    out: Dict[str, Dict[str, Any]] = {}
    with open(path, "r", encoding="utf-8", newline="") as f:
        reader = csv.DictReader(f)
        for row in reader:
            model = norm(row.get("llm_model", ""))
            # Keep first occurrence per model. If needed, can extend by backend.
            if model and model not in out:
                out[model] = row
    return out


def to_float(v: Any, default: float = 0.0) -> float:
    try:
        return float(v)
    except Exception:
        return default


def merge_rows(
    quality_map: Dict[Tuple[str, str], Dict[str, Any]],
    perf_map: Dict[str, Dict[str, Any]],
) -> List[Dict[str, Any]]:
    rows: List[Dict[str, Any]] = []
    for (language, model), q in sorted(quality_map.items()):
        p = perf_map.get(model)
        row = {
            "language": language,
            "model_name": model,
            "quality_overall_mean": q.get("overall_mean"),
            "quality_overall_sd": q.get("overall_sd"),
            "acceptable_rate": q.get("acceptable_rate"),
            "hard_fail_rate_any": q.get("hard_fail_rate_any"),
            "n_ratings": q.get("n_ratings"),
            "factual_correctness_mean": q.get("criteria_mean", {}).get("factual_correctness"),
            "question_clarity_mean": q.get("criteria_mean", {}).get("question_clarity"),
            "distractor_quality_mean": q.get("criteria_mean", {}).get("distractor_quality"),
            "difficulty_alignment_mean": q.get("criteria_mean", {}).get("difficulty_alignment"),
            "language_quality_mean": q.get("criteria_mean", {}).get("language_quality"),
            "context_relevance_mean": q.get("criteria_mean", {}).get("context_relevance"),
            "backend": p.get("backend") if p else "",
            "runs_total": to_float(p.get("runs_total")) if p else "",
            "runs_success": to_float(p.get("runs_success")) if p else "",
            "error_rate_pct": to_float(p.get("error_rate_pct")) if p else "",
            "mean_duration_ms_success": to_float(p.get("mean_duration_ms_success")) if p else "",
            "mean_duration_s_success": round(to_float(p.get("mean_duration_ms_success")) / 1000.0, 4) if p else "",
            "mean_qps_success": to_float(p.get("mean_qps_success")) if p else "",
            "speed_quality_index": "",
        }

        # Optional composite indicator (higher is better): quality / latency_seconds.
        if p and to_float(p.get("mean_duration_ms_success")) > 0:
            latency_s = to_float(p.get("mean_duration_ms_success")) / 1000.0
            row["speed_quality_index"] = round(to_float(q.get("overall_mean")) / latency_s, 4)
        rows.append(row)
    return rows


def write_csv(path: str, rows: List[Dict[str, Any]]) -> None:
    if not rows:
        raise ValueError("No rows to write")
    fields = list(rows[0].keys())
    with open(path, "w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=fields)
        writer.writeheader()
        writer.writerows(rows)


def main() -> int:
    parser = argparse.ArgumentParser(description="Merge quality and speed metrics")
    parser.add_argument("--quality-json", required=True, help="Quality JSON file from calculate_quality_scores.py --json")
    parser.add_argument("--perf-csv", required=True, help="Performance CSV file (by_model_summary.csv)")
    parser.add_argument("--out-csv", required=True, help="Output merged CSV file")
    args = parser.parse_args()

    quality_map = load_quality(args.quality_json)
    perf_map = load_perf(args.perf_csv)
    rows = merge_rows(quality_map, perf_map)
    write_csv(args.out_csv, rows)
    print(f"Wrote merged table: {args.out_csv}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
