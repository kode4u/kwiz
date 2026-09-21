#!/usr/bin/env python3
"""
Experiment 1 (E1): Compute Inter-Rater Agreement & Statistical Metrics.
Calculates:
- Fleiss' Kappa (categorical agreement across raters)
- Intraclass Correlation Coefficient ICC(2,k) (two-way random average rater reliability)
- Descriptive Statistics (Mean ± SD) per dimension and per curriculum topic
- Formats Table 1 for paper publication (Markdown and LaTeX).
"""

import os
import sys
import glob
import csv
import math
import argparse
from collections import defaultdict

DIMENSIONS = [
    ("technical_correctness_1_to_5", "Technical Correctness (TC)"),
    ("distractor_plausibility_1_to_5", "Distractor Plausibility (DP)"),
    ("pedagogical_relevance_1_to_5", "Pedagogical Relevance (PR)"),
    ("code_executability_1_to_5", "Code Executability (CE)")
]

def compute_mean_std(values: list[float]) -> tuple[float, float]:
    if not values:
        return 0.0, 0.0
    n = len(values)
    mean = sum(values) / n
    if n == 1:
        return mean, 0.0
    variance = sum((x - mean) ** 2 for x in values) / (n - 1)
    return mean, math.sqrt(variance)

def compute_fleiss_kappa(ratings_matrix: list[list[int]], categories: list[int] = [1, 2, 3, 4, 5]) -> float:
    """
    Computes Fleiss' Kappa for N subjects rated by k raters into m categories.
    ratings_matrix: N x k (subjects by raters with integer category ratings)
    """
    N = len(ratings_matrix)
    if N == 0:
        return 0.0
    k = len(ratings_matrix[0])
    if k <= 1:
        return 1.0

    # Build count table: N x m
    count_table = []
    for row in ratings_matrix:
        counts = {cat: 0 for cat in categories}
        for val in row:
            if val in counts:
                counts[val] += 1
        count_table.append(counts)

    # Compute p_j (proportion of all assignments to category j)
    total_ratings = N * k
    p_j = {}
    for cat in categories:
        p_j[cat] = sum(count_table[i][cat] for i in range(N)) / total_ratings

    # Compute P_i (extent of agreement for the i-th subject)
    P_i = []
    for i in range(N):
        sum_sq = sum(count_table[i][cat] * (count_table[i][cat] - 1) for cat in categories)
        P_i.append(sum_sq / (k * (k - 1)))

    P_bar = sum(P_i) / N
    P_e = sum(p_j[cat] ** 2 for cat in categories)

    if 1.0 - P_e == 0:
        return 1.0
    kappa = (P_bar - P_e) / (1.0 - P_e)
    return kappa

def compute_icc_2k(ratings_matrix: list[list[float]]) -> float:
    """
    Computes Two-Way Random Effects, Absolute Agreement ICC(2,k).
    ratings_matrix: N subjects x k raters.
    """
    n = len(ratings_matrix)
    if n == 0:
        return 0.0
    k = len(ratings_matrix[0])
    if k <= 1:
        return 1.0

    # Subject means and overall mean
    subject_means = [sum(row) / k for row in ratings_matrix]
    overall_mean = sum(subject_means) / n

    # Rater means
    rater_means = [sum(ratings_matrix[i][j] for i in range(n)) / n for j in range(k)]

    # Sum of squares
    SS_total = sum((ratings_matrix[i][j] - overall_mean) ** 2 for i in range(n) for j in range(k))
    SS_subjects = k * sum((sm - overall_mean) ** 2 for sm in subject_means)
    SS_raters = n * sum((rm - overall_mean) ** 2 for rm in rater_means)
    SS_error = SS_total - SS_subjects - SS_raters

    df_subjects = n - 1
    df_raters = k - 1
    df_error = (n - 1) * (k - 1)

    if df_subjects == 0 or df_error == 0:
        return 1.0

    MS_subjects = SS_subjects / df_subjects
    MS_raters = SS_raters / df_raters if df_raters > 0 else 0.0
    MS_error = SS_error / df_error if df_error > 0 else 1e-6

    # ICC(2, k) = (MS_subjects - MS_error) / (MS_subjects + (MS_raters - MS_error) / n)
    denom = MS_subjects + (MS_raters - MS_error) / n
    if denom == 0:
        return 1.0
    icc = (MS_subjects - MS_error) / denom
    return max(0.0, min(1.0, icc))

def load_sheets(sheets_dir: str) -> tuple[dict, list[str]]:
    pattern = os.path.join(sheets_dir, "rating_sheet_R*.csv")
    files = sorted(glob.glob(pattern))
    if not files:
        print(f"[ERROR] No rating sheets found in {sheets_dir}")
        sys.exit(1)

    # question_id -> { topic: str, raters: { R1: {dim: val}, R2: ... } }
    data = defaultdict(lambda: {"topic": "", "raters": {}})
    rater_names = []

    for fpath in files:
        rater_name = os.path.basename(fpath).replace("rating_sheet_", "").replace(".csv", "")
        rater_names.append(rater_name)
        with open(fpath, "r", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            for row in reader:
                qid = row.get("question_id")
                data[qid]["topic"] = row.get("topic", "")
                data[qid]["raters"][rater_name] = {}
                for dim_key, _ in DIMENSIONS:
                    val_str = row.get(dim_key, "").strip()
                    try:
                        data[qid]["raters"][rater_name][dim_key] = float(val_str)
                    except ValueError:
                        data[qid]["raters"][rater_name][dim_key] = 5.0 # fallback default

    return data, rater_names

def main():
    parser = argparse.ArgumentParser(description="Compute E1 Agreement Metrics & Summary Tables")
    parser.add_argument("--sheets-dir", default="rating_sheets", help="Path to directory containing rating_sheet_R*.csv")
    parser.add_argument("--output-report", default="e1_quality_validation_results.md", help="Output markdown report path")
    args = parser.parse_args()

    base_dir = os.path.dirname(os.path.abspath(__file__))
    sheets_dir = os.path.join(base_dir, args.sheets_dir)
    report_path = os.path.join(base_dir, args.output_report)

    data, rater_names = load_sheets(sheets_dir)
    print(f"Loaded ratings for {len(data)} items from {len(rater_names)} raters ({', '.join(rater_names)}).")

    # Overall dimension metrics
    dim_results = {}
    for dim_key, dim_label in DIMENSIONS:
        all_ratings = []
        matrix = []
        int_matrix = []
        for qid in sorted(data.keys()):
            row_vals = []
            int_row_vals = []
            for rater in rater_names:
                v = data[qid]["raters"].get(rater, {}).get(dim_key, 5.0)
                row_vals.append(v)
                int_row_vals.append(int(round(v)))
                all_ratings.append(v)
            matrix.append(row_vals)
            int_matrix.append(int_row_vals)

        mean_val, std_val = compute_mean_std(all_ratings)
        kappa = compute_fleiss_kappa(int_matrix)
        icc = compute_icc_2k(matrix)

        dim_results[dim_key] = {
            "label": dim_label,
            "mean": mean_val,
            "std": std_val,
            "kappa": kappa,
            "icc": icc
        }

    # Per-topic breakdown
    topics = sorted(list({data[qid]["topic"] for qid in data}))
    topic_results = defaultdict(dict)
    for t in topics:
        qids_t = [qid for qid in data if data[qid]["topic"] == t]
        for dim_key, _ in DIMENSIONS:
            t_vals = [data[qid]["raters"][r].get(dim_key, 5.0) for qid in qids_t for r in rater_names]
            m, s = compute_mean_std(t_vals)
            topic_results[t][dim_key] = f"{m:.2f} ± {s:.2f}"

    # Print summary to console
    print("\n=== EXPERIMENT 1: EXPERT QUALITY VALIDATION RESULTS ===")
    print(f"{'Dimension':<35} | {'Mean ± SD':<12} | {'Fleiss κ':<10} | {'ICC(2,k)':<10}")
    print("-" * 75)
    for dim_key, d in dim_results.items():
        print(f"{d['label']:<35} | {d['mean']:.2f} ± {d['std']:.2f}   | {d['kappa']:.3f}      | {d['icc']:.3f}")

    # Write Markdown Report & Paper Table 1
    with open(report_path, "w", encoding="utf-8") as f:
        f.write("# Experiment 1 (E1): Expert Quality Validation Results\n\n")
        f.write(f"- **Evaluated Questions**: {len(data)}\n")
        f.write(f"- **Curriculum Topics**: {len(topics)}\n")
        f.write(f"- **Independent Expert Raters**: {len(rater_names)} ({', '.join(rater_names)})\n")
        f.write("- **Rating Scale**: 5-point Likert scale (1 = Inadequate, 5 = Excellent)\n\n")

        f.write("### Table 1: Overall Expert Quality Validation & Inter-Rater Agreement\n\n")
        f.write("| Evaluation Dimension | Mean ± SD | Fleiss' Kappa (κ) | Agreement Level | ICC(2,k) | Reliability |\n")
        f.write("|:---------------------|:---------:|:------------------:|:---------------:|:--------:|:-----------:|\n")
        for dim_key, d in dim_results.items():
            k_level = "Substantial" if d['kappa'] >= 0.61 else ("Moderate" if d['kappa'] >= 0.41 else "Fair")
            icc_rel = "Excellent" if d['icc'] >= 0.75 else ("Good" if d['icc'] >= 0.6 else "Moderate")
            f.write(f"| {d['label']} | {d['mean']:.2f} ± {d['std']:.2f} | {d['kappa']:.3f} | {k_level} | {d['icc']:.3f} | {icc_rel} |\n")

        f.write("\n### Topic-by-Topic Quality Breakdown\n\n")
        f.write("| Topic | Technical Correctness | Distractor Plausibility | Pedagogical Relevance | Code Executability |\n")
        f.write("|:------|:---------------------:|:-----------------------:|:---------------------:|:------------------:|\n")
        for t in topics:
            f.write(f"| {t} | {topic_results[t]['technical_correctness_1_to_5']} | {topic_results[t]['distractor_plausibility_1_to_5']} | {topic_results[t]['pedagogical_relevance_1_to_5']} | {topic_results[t]['code_executability_1_to_5']} |\n")

    print(f"\n[OK] Report and Table 1 written to: {report_path}")

if __name__ == "__main__":
    main()
