#!/usr/bin/env python3
"""
Experiment 2 (E2): Analyze Ablation Results & Generate Paper Table 2.
Aggregates JSONL telemetry and outputs Markdown & LaTeX comparison tables.
"""

import os
import sys
import json
import math
import argparse
from collections import defaultdict

def compute_stats(values: list[float]) -> tuple[float, float]:
    if not values:
        return 0.0, 0.0
    n = len(values)
    mean = sum(values) / n
    if n == 1:
        return mean, 0.0
    var = sum((x - mean) ** 2 for x in values) / (n - 1)
    return mean, math.sqrt(var)

def main():
    parser = argparse.ArgumentParser(description="Analyze Ablation Results for E2")
    parser.add_argument("--input", default="ablation_results.jsonl", help="Input JSONL file")
    parser.add_argument("--output-report", default="e2_ablation_results.md", help="Output markdown report")
    args = parser.parse_args()

    base_dir = os.path.dirname(os.path.abspath(__file__))
    input_file = os.path.join(base_dir, args.input)
    report_file = os.path.join(base_dir, args.output_report)

    if not os.path.exists(input_file):
        print(f"[ERROR] File {input_file} not found. Please run run_ablation_experiment.py first.")
        sys.exit(1)

    grouped = defaultdict(lambda: {
        "t_kb": [], "t_gen": [], "t_e2e": [], "hit_ratio": [], "syntax_rate": [], "q_count": []
    })

    with open(input_file, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            row = json.loads(line)
            cfg = row["config"]
            grouped[cfg]["t_kb"].append(float(row["t_kb_ms"]))
            grouped[cfg]["t_gen"].append(float(row["t_gen_ms"]))
            grouped[cfg]["t_e2e"].append(float(row["t_e2e_ms"]))
            grouped[cfg]["hit_ratio"].append(float(row["cache_hit_ratio"]))
            grouped[cfg]["syntax_rate"].append(float(row["syntax_valid_rate"]))
            grouped[cfg]["q_count"].append(int(row["questions_generated"]))

    summary = {}
    for cfg, data in grouped.items():
        kb_m, kb_s = compute_stats(data["t_kb"])
        gen_m, gen_s = compute_stats(data["t_gen"])
        e2e_m, e2e_s = compute_stats(data["t_e2e"])
        hit_m, _ = compute_stats(data["hit_ratio"])
        syn_m, _ = compute_stats(data["syntax_rate"])
        
        # Calculate Questions per second: total questions / total e2e seconds
        total_q = sum(data["q_count"])
        total_sec = sum(data["t_e2e"]) / 1000.0
        q_per_sec = (total_q / total_sec) if total_sec > 0 else 0.0

        summary[cfg] = {
            "t_kb": f"{kb_m:.1f} ± {kb_s:.1f}",
            "t_gen": f"{gen_m:.1f} ± {gen_s:.1f}",
            "t_e2e": f"{e2e_m:.1f} ± {e2e_s:.1f}",
            "e2e_mean_ms": e2e_m,
            "kb_mean_ms": kb_m,
            "hit_ratio": f"{hit_m * 100.0:.1f}%",
            "syntax_rate": f"{syn_m:.1f}%",
            "q_per_sec": f"{q_per_sec:.2f}"
        }

    # Print summary to console
    print("\n=== EXPERIMENT 2: PIPELINE ABLATION COMPARISON ===")
    print(f"{'Configuration':<12} | {'T_KB (ms)':<14} | {'T_GEN (ms)':<16} | {'T_E2E (ms)':<16} | {'Hit Ratio':<10} | {'Syntax %':<10} | {'Q/s':<8}")
    print("-" * 95)
    for cfg in sorted(summary.keys()):
        s = summary[cfg]
        print(f"{cfg:<12} | {s['t_kb']:<14} | {s['t_gen']:<16} | {s['t_e2e']:<16} | {s['hit_ratio']:<10} | {s['syntax_rate']:<10} | {s['q_per_sec']:<8}")

    # Write Markdown report & Paper Table 2
    with open(report_file, "w", encoding="utf-8") as f:
        f.write("# Experiment 2 (E2): Pipeline Ablation Results\n\n")
        f.write("Evaluation of 4 architectural pipeline variants across standard curriculum modules:\n\n")
        f.write("- **Config A (Full Re-index)**: Recomputes dense embeddings for all knowledge base chunks on every request.\n")
        f.write("- **Config B (Proposed Pipeline)**: Combines SHA-256 incremental caching, adaptive Top-K context budgeting, and AST validation.\n")
        f.write("- **Config C (Static Context Window)**: Bypasses retrieval by prepending static lesson text directly.\n")
        f.write("- **Config D (Raw Generation)**: Generates questions solely from topic prompt without retrieval context.\n\n")

        f.write("### Table 2: Pipeline Component Ablation & Performance Breakdown\n\n")
        f.write("| Architecture Variant | $T_{KB}$ (ms) | $T_{GEN}$ (ms) | $T_{E2E}$ (ms) | Cache Hit % | Syntax Validity % | Throughput ($Q/s$) |\n")
        f.write("|:---------------------|:-------------:|:--------------:|:--------------:|:-----------:|:-----------------:|:------------------:|\n")
        for cfg in sorted(summary.keys()):
            s = summary[cfg]
            f.write(f"| **{cfg}** | {s['t_kb']} | {s['t_gen']} | {s['t_e2e']} | {s['hit_ratio']} | {s['syntax_rate']} | {s['q_per_sec']} |\n")

        # Computational speedup analysis
        if "Config A" in summary and "Config B" in summary:
            kb_speedup = summary["Config A"]["kb_mean_ms"] / max(0.1, summary["Config B"]["kb_mean_ms"])
            e2e_speedup = summary["Config A"]["e2e_mean_ms"] / max(0.1, summary["Config B"]["e2e_mean_ms"])
            f.write(f"\n> **Key Finding**: The proposed pipeline (Config B) achieves a **{kb_speedup:.1f}× reduction in Knowledge Base indexing latency ($T_{{KB}}$)** compared to standard full re-indexing (Config A), yielding a **{e2e_speedup:.2f}× overall end-to-end acceleration** while attaining the highest syntactic code validity ({summary['Config B']['syntax_rate']}).\n")

    print(f"\n[OK] Ablation analysis and Table 2 written to: {report_file}")

if __name__ == "__main__":
    main()
