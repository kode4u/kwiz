#!/usr/bin/env python3
"""
Evaluate expert review CSVs (binary rubric) for L3M-RAG study.
Supports 1, 2, or 3+ expert rating sheets dynamically.

Expected layout inside reviews directory (e.g., data/reviews/):
  rating_sheet_expert1.csv
  rating_sheet_expert2.csv
  rating_sheet_expert3.csv

Usage:
  python3 data/check_validity.py
  python3 data/check_validity.py --reviews-dir data/reviews --target 100
  python3 data/check_validity.py --json > data/reviews/quality_summary.json
"""
from __future__ import annotations

import argparse
import csv
import json
import os
import re
import statistics
import sys
from collections import Counter, defaultdict
from typing import Any, Dict, List, Optional, Tuple

CRITERIA = [
    "topic_relevance",
    "semantic_correctness",
    "answer_key_correctness",
    "question_clarity",
]

REPO_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
DEFAULT_REVIEWS = os.path.join(os.path.dirname(__file__), "reviews")
DEFAULT_EXPORT = os.path.join(REPO_ROOT, "logs", "evaluation", "questions_export.json")
DEFAULT_METRICS = os.path.join(REPO_ROOT, "logs", "evaluation", "metrics.jsonl")


def parse01(value: str, field: str, row: int, required: bool = True) -> Optional[int]:
    v = str(value).strip()
    if v == "":
        if required:
            raise ValueError(f"Row {row}: missing {field}")
        return None
    try:
        n = int(v)
    except ValueError as exc:
        raise ValueError(f"Row {row}: {field} must be 0 or 1, got {value!r}") from exc
    if n not in (0, 1):
        raise ValueError(f"Row {row}: {field} must be 0 or 1, got {n}")
    return n


def cohen_kappa(pairs: List[Tuple[int, int]]) -> float:
    """Compute Cohen's Kappa for 2 raters."""
    if not pairs:
        return float("nan")
    n = len(pairs)
    p0 = sum(1 for a, b in pairs if a == b) / n
    pa1 = sum(1 for a, _ in pairs if a == 1) / n
    pb1 = sum(1 for _, b in pairs if b == 1) / n
    pe = pa1 * pb1 + (1 - pa1) * (1 - pb1)
    if abs(1.0 - pe) < 1e-12:
        return 0.0
    return (p0 - pe) / (1.0 - pe)


def fleiss_kappa(ratings_matrix: List[List[int]], num_categories: int = 2) -> float:
    """
    Compute Fleiss' Kappa for any number of raters (n >= 2).
    ratings_matrix: List of lists, where each list contains category counts for item i.
                    e.g., [[count_cat0, count_cat1], [count_cat0, count_cat1], ...]
    """
    N = len(ratings_matrix)
    if N == 0:
        return float("nan")
    n = sum(ratings_matrix[0])  # Number of raters
    if n <= 1:
        return float("nan")

    # Calculate pj (proportion of all assignments to category j)
    pj = [0.0] * num_categories
    for j in range(num_categories):
        pj[j] = sum(row[j] for row in ratings_matrix) / (N * n)

    # Calculate Pi (agreement extent for each subject i)
    Pi = [0.0] * N
    for i in range(N):
        sum_sq = sum(count * count for count in ratings_matrix[i])
        Pi[i] = (sum_sq - n) / (n * (n - 1))

    P_bar = sum(Pi) / N
    Pe_bar = sum(p * p for p in pj)

    if abs(1.0 - Pe_bar) < 1e-12:
        return 0.0
    return (P_bar - Pe_bar) / (1.0 - Pe_bar)


def prf(y_true: List[int], y_pred: List[int]) -> Dict[str, Any]:
    tp = sum(1 for t, p in zip(y_true, y_pred) if t == 1 and p == 1)
    fp = sum(1 for t, p in zip(y_true, y_pred) if t == 0 and p == 1)
    fn = sum(1 for t, p in zip(y_true, y_pred) if t == 1 and p == 0)
    tn = sum(1 for t, p in zip(y_true, y_pred) if t == 0 and p == 0)
    precision = tp / (tp + fp) if (tp + fp) else 0.0
    recall = tp / (tp + fn) if (tp + fn) else 0.0
    f1 = 2 * precision * recall / (precision + recall) if (precision + recall) else 0.0
    accuracy = (tp + tn) / len(y_true) if y_true else 0.0
    return {
        "tp": tp,
        "fp": fp,
        "fn": fn,
        "tn": tn,
        "precision": round(precision, 4),
        "recall": round(recall, 4),
        "f1": round(f1, 4),
        "accuracy": round(accuracy, 4),
    }


def find_review_files(reviews_dir: str) -> List[str]:
    """Find all CSV expert sheets sorted by name/number."""
    if not os.path.isdir(reviews_dir):
        return []
    csvs = sorted(
        f
        for f in os.listdir(reviews_dir)
        if f.lower().endswith(".csv") and not f.startswith(".")
    )
    return [os.path.join(reviews_dir, name) for name in csvs]


def load_rating_csv(path: str) -> List[Dict[str, Any]]:
    rows: List[Dict[str, Any]] = []
    with open(path, encoding="utf-8-sig", newline="") as fh:
        for idx, row in enumerate(csv.DictReader(fh), start=2):
            item_id = (row.get("item_id") or "").strip()
            if not item_id:
                continue
            item: Dict[str, Any] = {
                "item_id": item_id,
                "domain": (row.get("domain") or "").strip(),
                "subtopic": (row.get("subtopic") or "").strip(),
                "topic": (row.get("topic") or "").strip(),
                "rater_id": (row.get("rater_id") or "").strip(),
                "question_text": (row.get("question_text") or "").strip(),
                "choice_a": (row.get("choice_a") or "").strip(),
                "choice_b": (row.get("choice_b") or "").strip(),
                "choice_c": (row.get("choice_c") or "").strip(),
                "choice_d": (row.get("choice_d") or "").strip(),
                "correct_choice_label": (row.get("correct_choice_label") or "").strip().upper(),
            }
            scores: Dict[str, Optional[int]] = {}
            for c in CRITERIA + ["acceptable"]:
                scores[c] = parse01(row.get(c, ""), c, idx, required=True)
            item.update(scores)
            derived = 1 if all(scores[c] == 1 for c in CRITERIA) else 0
            item["acceptable_derived"] = derived
            item["acceptable_mismatch"] = derived != scores["acceptable"]
            rows.append(item)
    return rows


def structural_valid(row: Dict[str, Any]) -> bool:
    if len(row.get("question_text", "")) < 10:
        return False
    choices = [row.get("choice_a"), row.get("choice_b"), row.get("choice_c"), row.get("choice_d")]
    if not all(choices):
        return False
    label = row.get("correct_choice_label", "")
    return label in {"A", "B", "C", "D"}


def summarize_rater(rows: List[Dict[str, Any]], label: str) -> Dict[str, Any]:
    n = len(rows)
    acceptable = sum(r["acceptable"] for r in rows)
    by_domain: Dict[str, List[Dict[str, Any]]] = defaultdict(list)
    for r in rows:
        by_domain[r["domain"]].append(r)

    criteria_pct = {
        c: round(100.0 * sum(r[c] for r in rows) / n, 2) if n else float("nan")
        for c in CRITERIA
    }
    structural_ok = sum(1 for r in rows if structural_valid(r))

    return {
        "label": label,
        "n_reviewed": n,
        "acceptable_count": acceptable,
        "accuracy_pct": round(100.0 * acceptable / n, 2) if n else float("nan"),
        "prompt_adherence_pct": criteria_pct["topic_relevance"],
        "criteria_pct": criteria_pct,
        "semantic_correctness_pct": criteria_pct["semantic_correctness"],
        "answer_key_correctness_pct": criteria_pct["answer_key_correctness"],
        "question_clarity_pct": criteria_pct["question_clarity"],
        "acceptable_mismatch_rows": sum(1 for r in rows if r["acceptable_mismatch"]),
        "structural_valid_pct": round(100.0 * structural_ok / n, 2) if n else float("nan"),
        "by_domain": {
            d: {
                "n": len(drows),
                "accuracy_pct": round(100.0 * sum(x["acceptable"] for x in drows) / len(drows), 2),
                "prompt_adherence_pct": round(
                    100.0 * sum(x["topic_relevance"] for x in drows) / len(drows), 2
                ),
            }
            for d, drows in sorted(by_domain.items())
        },
    }


def load_export_ids(path: str) -> List[str]:
    if not os.path.isfile(path):
        return []
    with open(path, encoding="utf-8") as fh:
        doc = json.load(fh)
    return [q.get("item_id", "") for q in (doc.get("questions") or []) if q.get("item_id")]


def latency_from_metrics(path: str) -> Dict[str, Any]:
    if not os.path.isfile(path):
        return {}
    per_q: List[float] = []
    for line in open(path, encoding="utf-8"):
        line = line.strip()
        if not line:
            continue
        try:
            r = json.loads(line)
        except json.JSONDecodeError:
            continue
        if r.get("event") in ("generation", "moodle_job_complete") and r.get("status") == "success":
            if r.get("seconds_per_question"):
                per_q.append(float(r["seconds_per_question"]))
    if not per_q:
        return {}
    s = sorted(per_q)
    return {
        "n_samples": len(per_q),
        "mean_s": round(statistics.mean(per_q), 3),
        "median_s": round(statistics.median(per_q), 3),
        "p95_s": round(s[int(0.95 * (len(s) - 1))], 3),
    }


def study_design_advice(
    n_reviewed: int,
    target: int,
    export_n: int,
    domains: Counter,
) -> Dict[str, Any]:
    missing = target - n_reviewed
    export_gap = max(0, target - export_n) if export_n else missing

    if n_reviewed >= target:
        use_verdict = "ok_full"
        message = f"You have {n_reviewed} expert-rated items (target {target}). Report metrics on all {target}."
    elif n_reviewed >= 80:
        use_verdict = "ok_partial_report"
        message = (
            f"You have {n_reviewed}/{target} rated MCQs ({missing} short). "
            f"For the paper you can report metrics on this reviewed set (n={n_reviewed})."
        )
    else:
        use_verdict = "insufficient"
        message = f"Only {n_reviewed}/{target} rated — please complete more expert reviews."

    return {
        "target_n": target,
        "reviewed_n": n_reviewed,
        "missing_for_target": max(0, missing),
        "export_n": export_n or None,
        "verdict": use_verdict,
        "message": message,
        "recommendation": "Proceed to consensus and report statistics." if missing <= 0 else "Fill evaluation gaps.",
    }


def build_consensus_multi(
    expert_data: List[List[Dict[str, Any]]], expert_labels: List[str]
) -> Tuple[List[Dict[str, Any]], Dict[str, Any]]:
    """Build consensus using majority vote across all loaded experts."""
    # Build maps of item_id -> row
    maps = [{r["item_id"]: r for r in rows} for rows in expert_data]
    # Find common item_ids
    common = set(maps[0].keys())
    for m in maps[1:]:
        common = common & set(m.keys())
    common_sorted = sorted(common)

    num_raters = len(expert_data)
    consensus_rows = []
    
    # Track pairs for pairwise kappa (if exactly 2 experts) or Fleiss' Kappa matrix
    fleiss_matrix_acc = []
    fleiss_matrix_top = []

    for iid in common_sorted:
        votes_acc = [m[iid]["acceptable"] for m in maps]
        votes_top = [m[iid]["topic_relevance"] for m in maps]

        # Majority Vote Consensus
        acc_consensus = 1 if sum(votes_acc) > (num_raters / 2.0) else 0
        top_consensus = 1 if sum(votes_top) > (num_raters / 2.0) else 0

        consensus_rows.append(
            {
                "item_id": iid,
                "domain": maps[0][iid]["domain"],
                "acceptable": acc_consensus,
                "topic_relevance": top_consensus,
            }
        )

        # Build category count lists for Fleiss Kappa: [count_of_0, count_of_1]
        fleiss_matrix_acc.append([votes_acc.count(0), votes_acc.count(1)])
        fleiss_matrix_top.append([votes_top.count(0), votes_top.count(1)])

    # Inter-rater agreement statistics
    agreement_acc = fleiss_kappa(fleiss_matrix_acc, 2)
    agreement_top = fleiss_kappa(fleiss_matrix_top, 2)

    stats = {
        "n_common": len(common_sorted),
        "raters_count": num_raters,
        "raters_labels": expert_labels,
        "fleiss_kappa_acceptable": round(agreement_acc, 4) if not float("nan") else None,
        "fleiss_kappa_topic_relevance": round(agreement_top, 4) if not float("nan") else None,
        "consensus_accuracy_pct": round(
            100.0 * sum(r["acceptable"] for r in consensus_rows) / len(consensus_rows), 2
        ) if consensus_rows else None,
        "consensus_prompt_adherence_pct": round(
            100.0 * sum(r["topic_relevance"] for r in consensus_rows) / len(consensus_rows), 2
        ) if consensus_rows else None,
    }

    # If exactly two experts, calculate pairwise Cohen's Kappa & PRF for backwards compatibility
    if num_raters == 2:
        pairs_acc = [(maps[0][i]["acceptable"], maps[1][i]["acceptable"]) for i in common_sorted]
        pairs_top = [(maps[0][i]["topic_relevance"], maps[1][i]["topic_relevance"]) for i in common_sorted]
        stats.update({
            "cohen_kappa_acceptable": round(cohen_kappa(pairs_acc), 4),
            "cohen_kappa_topic_relevance": round(cohen_kappa(pairs_top), 4),
            "acceptable_agreement_pct": round(100.0 * sum(1 for a, b in pairs_acc if a == b) / len(common_sorted), 2),
            "inter_rater_prf_acceptable_expert2_vs_expert1": prf(
                [a for a, _ in pairs_acc], [b for _, b in pairs_acc]
            )
        })

    return consensus_rows, stats


def print_report(report: Dict[str, Any]) -> None:
    print("=" * 60)
    print("L3M-RAG EXPERT REVIEW EVALUATION")
    print("=" * 60)

    adv = report["study_design"]
    print("\n## Study Design Advice")
    print(adv["message"])
    print("Recommendation:", adv["recommendation"])

    cov = report["coverage"]
    print("\n## Evaluation Coverage")
    print(f"  Target Size: {cov['target_n']} questions")
    print(f"  Expert Sheets Loaded: {cov['expert_sheets_count']}")
    for name, count in cov["expert_item_counts"].items():
        print(f"    - {name}: {count} items")

    lat = report.get("latency") or {}
    if lat:
        print("\n## Generation Latency (Metrics Log)")
        print(f"  Mean: {lat.get('mean_s')} s | Median: {lat.get('median_s')} s | p95: {lat.get('p95_s')} s (n={lat.get('n_samples')} requests)")

    # Print individual experts
    for exp in report.get("experts", []):
        print(f"\n## Expert: {exp['label']}")
        print(f"  n reviewed:          {exp['n_reviewed']}")
        print(f"  Accuracy (acceptable): {exp['accuracy_pct']}%  ({exp['acceptable_count']}/{exp['n_reviewed']})")
        print(f"  Prompt adherence:      {exp['prompt_adherence_pct']}%  (topic relevance)")
        print(f"  Semantic correctness:  {exp['semantic_correctness_pct']}%")
        print(f"  Answer key check:      {exp['answer_key_correctness_pct']}%")
        print(f"  Question clarity:      {exp['question_clarity_pct']}%")

    # Consensus & Agreement
    cons = report.get("consensus")
    if cons:
        print(f"\n## Consensus ({cons['raters_count']} Experts Majority Vote)")
        print(f"  n common questions:   {cons['n_common']}")
        print(f"  Consensus Accuracy:   {cons['consensus_accuracy_pct']}%")
        print(f"  Consensus Adherence:  {cons['consensus_prompt_adherence_pct']}%")
        
        print("\n## Inter-Rater Reliability Agreement")
        if cons["raters_count"] > 2:
            print(f"  Fleiss' Kappa (Acceptability):     {cons['fleiss_kappa_acceptable']}")
            print(f"  Fleiss' Kappa (Topic Relevance):   {cons['fleiss_kappa_topic_relevance']}")
        else:
            print(f"  Cohen's Kappa (Acceptability):     {cons.get('cohen_kappa_acceptable')}")
            print(f"  Cohen's Kappa (Topic Relevance):   {cons.get('cohen_kappa_topic_relevance')}")
            print(f"  Direct Percent Agreement:          {cons.get('acceptable_agreement_pct')}%")

    print("\n" + "=" * 60)


def main() -> int:
    parser = argparse.ArgumentParser(description="Evaluate expert review CSVs")
    parser.add_argument("--reviews-dir", default=DEFAULT_REVIEWS)
    parser.add_argument("--export", default=DEFAULT_EXPORT, help="questions_export.json")
    parser.add_argument("--metrics", default=DEFAULT_METRICS, help="metrics.jsonl for latency")
    parser.add_argument("--target", type=int, default=100, help="Planned study size")
    parser.add_argument("--json", action="store_true")
    parser.add_argument("--write-consensus", default="", help="Write consensus CSV path")
    args = parser.parse_args()

    # Find all sheets inside review directory
    expert_paths = find_review_files(args.reviews_dir)
    if not expert_paths:
        print(f"No rating CSV sheets found in {args.reviews_dir}", file=sys.stderr)
        print("Add your expert review sheets to: data/reviews/", file=sys.stderr)
        return 1

    expert_data = []
    expert_labels = []
    for path in expert_paths:
        label = os.path.basename(path)
        expert_labels.append(label)
        expert_data.append(load_rating_csv(path))

    export_ids = load_export_ids(args.export)
    domains = Counter(r["domain"] for r in expert_data[0])

    report: Dict[str, Any] = {
        "expert_files": expert_paths,
        "study_design": study_design_advice(
            n_reviewed=len(expert_data[0]),
            target=args.target,
            export_n=len(export_ids),
            domains=domains,
        ),
        "coverage": {
            "target_n": args.target,
            "expert_sheets_count": len(expert_data),
            "expert_item_counts": {label: len(data) for label, data in zip(expert_labels, expert_data)},
            "export_n": len(export_ids) if export_ids else None,
        },
        "latency": latency_from_metrics(args.metrics),
        "experts": [summarize_rater(data, label) for data, label in zip(expert_data, expert_labels)],
    }

    if len(expert_data) >= 2:
        consensus_rows, cons_stats = build_consensus_multi(expert_data, expert_labels)
        report["consensus"] = cons_stats
        
        if args.write_consensus:
            os.makedirs(os.path.dirname(args.write_consensus) or ".", exist_ok=True)
            with open(args.write_consensus, "w", encoding="utf-8", newline="") as fh:
                w = csv.DictWriter(
                    fh,
                    fieldnames=["item_id", "domain", "topic_relevance", "acceptable"],
                )
                w.writeheader()
                w.writerows(consensus_rows)
            report["consensus_csv"] = args.write_consensus

    if args.json:
        print(json.dumps(report, indent=2, ensure_ascii=False))
    else:
        print_report(report)

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
