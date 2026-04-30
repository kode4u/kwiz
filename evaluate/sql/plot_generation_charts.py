#!/usr/bin/env python3
"""
Generate poster-ready PNG charts from CSV exports.

Input folder is expected to contain:
  - by_model_summary.csv
  - daily_trend.csv

Output PNG files:
  - latency_mean_ms_by_model.png
  - qps_mean_by_model.png
  - error_rate_by_model.png
  - daily_latency_trend.png
"""

from __future__ import annotations

import argparse
import csv
import os
from datetime import datetime
from typing import List, Dict, Any

try:
    import matplotlib.pyplot as plt
except ImportError as exc:
    raise SystemExit(
        "matplotlib is required. Install with: pip install matplotlib"
    ) from exc


def parse_float(value: str, default: float = 0.0) -> float:
    try:
        return float(value)
    except (TypeError, ValueError):
        return default


def read_csv(path: str) -> List[Dict[str, str]]:
    with open(path, "r", encoding="utf-8", newline="") as f:
        return list(csv.DictReader(f))


def ensure_dir(path: str) -> None:
    os.makedirs(path, exist_ok=True)


def detect_latest_export(exports_root: str) -> str:
    if not os.path.isdir(exports_root):
        raise FileNotFoundError(f"Exports folder not found: {exports_root}")
    candidates = [
        os.path.join(exports_root, d)
        for d in os.listdir(exports_root)
        if os.path.isdir(os.path.join(exports_root, d))
    ]
    if not candidates:
        raise FileNotFoundError(f"No export run directories found in: {exports_root}")
    return max(candidates, key=os.path.getmtime)


def plot_by_model(by_model_rows: List[Dict[str, str]], out_dir: str) -> None:
    labels = [
        f"{r.get('backend', '')}\n{r.get('llm_model', '')}"
        for r in by_model_rows
    ]
    mean_latency = [parse_float(r.get("mean_duration_ms_success")) for r in by_model_rows]
    mean_qps = [parse_float(r.get("mean_qps_success")) for r in by_model_rows]
    error_rate = [parse_float(r.get("error_rate_pct")) for r in by_model_rows]

    fig, ax = plt.subplots(figsize=(10, 5))
    ax.bar(labels, mean_latency)
    ax.set_title("Mean Generation Latency by Model")
    ax.set_ylabel("Latency (ms)")
    ax.set_xlabel("Backend / Model")
    ax.grid(axis="y", alpha=0.3)
    fig.tight_layout()
    fig.savefig(os.path.join(out_dir, "latency_mean_ms_by_model.png"), dpi=200)
    plt.close(fig)

    fig, ax = plt.subplots(figsize=(10, 5))
    ax.bar(labels, mean_qps)
    ax.set_title("Mean Throughput by Model")
    ax.set_ylabel("Questions per second")
    ax.set_xlabel("Backend / Model")
    ax.grid(axis="y", alpha=0.3)
    fig.tight_layout()
    fig.savefig(os.path.join(out_dir, "qps_mean_by_model.png"), dpi=200)
    plt.close(fig)

    fig, ax = plt.subplots(figsize=(10, 5))
    ax.bar(labels, error_rate)
    ax.set_title("Error Rate by Model")
    ax.set_ylabel("Error rate (%)")
    ax.set_xlabel("Backend / Model")
    ax.grid(axis="y", alpha=0.3)
    fig.tight_layout()
    fig.savefig(os.path.join(out_dir, "error_rate_by_model.png"), dpi=200)
    plt.close(fig)


def plot_daily_trend(daily_rows: List[Dict[str, str]], out_dir: str) -> None:
    # Group by model for line chart.
    grouped: Dict[str, List[Dict[str, Any]]] = {}
    for row in daily_rows:
        key = f"{row.get('backend', '')} / {row.get('llm_model', '')}"
        grouped.setdefault(key, []).append(
            {
                "date": datetime.strptime(row["run_date"], "%Y-%m-%d"),
                "latency": parse_float(row.get("mean_duration_ms_success")),
            }
        )

    fig, ax = plt.subplots(figsize=(10, 5))
    for model_key, points in grouped.items():
        points = sorted(points, key=lambda x: x["date"])
        ax.plot(
            [p["date"] for p in points],
            [p["latency"] for p in points],
            marker="o",
            label=model_key,
        )

    ax.set_title("Daily Mean Latency Trend (Success Runs)")
    ax.set_ylabel("Latency (ms)")
    ax.set_xlabel("Date")
    ax.grid(alpha=0.3)
    ax.legend(fontsize=8)
    fig.autofmt_xdate()
    fig.tight_layout()
    fig.savefig(os.path.join(out_dir, "daily_latency_trend.png"), dpi=200)
    plt.close(fig)


def main() -> int:
    parser = argparse.ArgumentParser(description="Generate charts from generation CSV exports")
    parser.add_argument(
        "--input-dir",
        default="",
        help="CSV export folder (defaults to latest under evaluate/sql/exports)",
    )
    parser.add_argument(
        "--output-dir",
        default="",
        help="Output folder for PNG charts (default: <input-dir>/charts)",
    )
    args = parser.parse_args()

    script_dir = os.path.dirname(os.path.abspath(__file__))
    exports_root = os.path.join(script_dir, "exports")

    input_dir = args.input_dir or detect_latest_export(exports_root)
    output_dir = args.output_dir or os.path.join(input_dir, "charts")
    ensure_dir(output_dir)

    by_model_csv = os.path.join(input_dir, "by_model_summary.csv")
    daily_csv = os.path.join(input_dir, "daily_trend.csv")

    if not os.path.exists(by_model_csv):
        raise FileNotFoundError(f"Missing CSV: {by_model_csv}")
    if not os.path.exists(daily_csv):
        raise FileNotFoundError(f"Missing CSV: {daily_csv}")

    by_model_rows = read_csv(by_model_csv)
    daily_rows = read_csv(daily_csv)

    if not by_model_rows:
        raise RuntimeError("by_model_summary.csv has no rows.")
    if not daily_rows:
        raise RuntimeError("daily_trend.csv has no rows.")

    plot_by_model(by_model_rows, output_dir)
    plot_daily_trend(daily_rows, output_dir)

    print(f"Charts generated in: {output_dir}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
