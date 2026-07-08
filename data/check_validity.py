#!/usr/bin/env python3
"""
Evaluate expert review CSVs (binary rubric) for the 125-MCQ study.

Expected layout:
  data/reviews/rating_sheet_expert1.csv
  data/reviews/rating_sheet_expert2.csv

Usage:
  python3 data/check_validity.py
  python3 data/check_validity.py --reviews-dir data/reviews --target 125
  python3 data/check_validity.py --json > data/reviews/quality_summary.json

Poster / reviewer metrics:
  - Prompt adherence  = topic_relevance pass rate (%)
  - Accuracy          = acceptable pass rate (%)
  - Per-criterion pass rates
  - Precision / Recall / F1 (inter-rater on 'acceptable', or vs consensus)
  - Cohen's kappa (two experts)
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
    if not pairs:
        return float("nan")
    n = len(pairs)
    p0 = sum(1 for a, b in pairs if a == b) / n
    pa1 = sum(1 for a, _ in pairs if a == 1) / n
    pb1 = sum(1 for _, b in pairs if b == 1) / n
    pe = pa1 * pb1 + (1 - pa1) * (1 - pb1)
    if abs(1.0 - pe) < 1e-12:
        return float("nan")
    return (p0 - pe) / (1.0 - pe)


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


def find_review_files(reviews_dir: str) -> Tuple[Optional[str], Optional[str]]:
    if not os.path.isdir(reviews_dir):
        return None, None
    csvs = sorted(
        f
        for f in os.listdir(reviews_dir)
        if f.lower().endswith(".csv") and not f.startswith(".")
    )
    expert1 = expert2 = None
    for name in csvs:
        low = name.lower()
        path = os.path.join(reviews_dir, name)
        if re.search(r"expert\s*1|expert1|rater\s*1", low):
            expert1 = path
        elif re.search(r"expert\s*2|expert2|rater\s*2", low):
            expert2 = path
    # Fallback: first two CSVs by name
    if not expert1 and csvs:
        expert1 = os.path.join(reviews_dir, csvs[0])
    if not expert2 and len(csvs) > 1:
        for name in csvs:
            path = os.path.join(reviews_dir, name)
            if path != expert1:
                expert2 = path
                break
    return expert1, expert2


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
            # Rubric: acceptable should equal all-four AND
            derived = 1 if all(scores[c] == 1 for c in CRITERIA) else 0
            item["acceptable_derived"] = derived
            item["acceptable_mismatch"] = derived != scores["acceptable"]
            rows.append(item)
    return rows


def structural_valid(row: Dict[str, Any]) -> bool:
    """Automated MCQ shape check (not semantic quality)."""
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
        "note": "From full metrics.jsonl; prefer one clean batch run for poster.",
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
    elif n_reviewed >= 100:
        use_verdict = "ok_partial_report"
        message = (
            f"You have {n_reviewed}/{target} rated MCQs ({missing} short). "
            "For the poster you MAY report metrics on the reviewed set (state n clearly, e.g. "
            f"'{n_reviewed} prompts across 5 domains'). For a strict '125 prompts' claim, "
            "generate and rate the missing items."
        )
    elif n_reviewed >= 80:
        use_verdict = "partial_recommend_more"
        message = (
            f"Only {n_reviewed}/{target} rated. Usable for pilot analysis; "
            "reviewers expect ~100+ with clear n — add generation + expert review for gaps."
        )
    else:
        use_verdict = "insufficient"
        message = f"Only {n_reviewed}/{target} rated — add more LLM output and expert scores before poster."

    sparse_domains = [d for d, c in domains.items() if c < 20 and target == 125]
    return {
        "target_n": target,
        "reviewed_n": n_reviewed,
        "missing_for_target": max(0, missing),
        "export_n": export_n or None,
        "missing_from_export": export_gap if export_n else None,
        "verdict": use_verdict,
        "message": message,
        "domains_below_25": sparse_domains,
        "recommendation": (
            "Generate missing subtopics (re-run batch or fill gaps), then "
            "python3 evaluate/llm-evaluation/export_rating_sheets.py and complete expert CSVs."
            if missing > 0
            else "Proceed to consensus and poster numbers."
        ),
    }


def build_consensus(
    rows1: List[Dict[str, Any]], rows2: List[Dict[str, Any]]
) -> Tuple[List[Dict[str, Any]], Dict[str, Any]]:
    m1 = {r["item_id"]: r for r in rows1}
    m2 = {r["item_id"]: r for r in rows2}
    common = sorted(set(m1) & set(m2))
    consensus_rows = []
    for iid in common:
        a, b = m1[iid], m2[iid]
        acc = 1 if (a["acceptable"] + b["acceptable"]) >= 2 else 0  # both must be 1
        # Strict consensus: both agree acceptable=1
        if a["acceptable"] == 1 and b["acceptable"] == 1:
            acc = 1
        else:
            acc = 0
        topic = 1 if (a["topic_relevance"] + b["topic_relevance"]) >= 2 else 0
        if a["topic_relevance"] == 1 and b["topic_relevance"] == 1:
            topic = 1
        else:
            topic = 0
        consensus_rows.append(
            {
                "item_id": iid,
                "domain": a["domain"],
                "acceptable": acc,
                "topic_relevance": topic,
            }
        )

    pairs_acc = [(m1[i]["acceptable"], m2[i]["acceptable"]) for i in common]
    pairs_top = [(m1[i]["topic_relevance"], m2[i]["topic_relevance"]) for i in common]
    y_ref = [a for a, _ in pairs_acc]
    y_pred = [b for _, b in pairs_acc]

    return consensus_rows, {
        "n_common": len(common),
        "only_expert1": sorted(set(m1) - set(m2)),
        "only_expert2": sorted(set(m2) - set(m1)),
        "acceptable_agreement_pct": round(100.0 * sum(1 for a, b in pairs_acc if a == b) / len(common), 2)
        if common
        else None,
        "cohen_kappa_acceptable": round(cohen_kappa(pairs_acc), 4) if common else None,
        "cohen_kappa_topic_relevance": round(cohen_kappa(pairs_top), 4) if common else None,
        "inter_rater_prf_acceptable_expert2_vs_expert1": {
            **prf(y_ref, y_pred),
            "description": "Expert 2 predicted, Expert 1 reference (acceptable)",
        },
        "consensus_accuracy_pct": round(
            100.0 * sum(r["acceptable"] for r in consensus_rows) / len(consensus_rows), 2
        )
        if consensus_rows
        else None,
        "consensus_prompt_adherence_pct": round(
            100.0 * sum(r["topic_relevance"] for r in consensus_rows) / len(consensus_rows), 2
        )
        if consensus_rows
        else None,
    }


def print_report(report: Dict[str, Any]) -> None:
    print("=" * 60)
    print("EXPERT REVIEW EVALUATION")
    print("=" * 60)

    adv = report["study_design"]
    print("\n## Study design")
    print(adv["message"])
    print("Recommendation:", adv["recommendation"])
    if adv.get("domains_below_25"):
        print("Domains with <25 items in reviews:", ", ".join(adv["domains_below_25"]))

    cov = report["coverage"]
    print("\n## Coverage")
    print(f"  Target:     {cov['target_n']}")
    print(f"  Expert 1:   {cov.get('expert1_n', 0)} items")
    print(f"  Expert 2:   {cov.get('expert2_n', '—')}")
    print(f"  Export file:{cov.get('export_n', '—')} items")
    if cov.get("only_expert1"):
        print(f"  Only in expert1 ({len(cov['only_expert1'])}):", ", ".join(cov["only_expert1"][:5]), "...")

    lat = report.get("latency") or {}
    if lat:
        print("\n## LLM latency (from metrics log)")
        print(f"  mean {lat.get('mean_s')} s | median {lat.get('median_s')} s | p95 {lat.get('p95_s')} s (n={lat.get('n_samples')})")

    for key in ("expert1", "expert2", "consensus"):
        block = report.get(key)
        if not block:
            continue
        print(f"\n## {block['label']}")
        print(f"  n reviewed:          {block['n_reviewed']}")
        print(f"  Accuracy (acceptable): {block['accuracy_pct']}%  ({block['acceptable_count']}/{block['n_reviewed']})")
        print(f"  Prompt adherence:      {block['prompt_adherence_pct']}%  (topic relevance)")
        print(f"  Semantic correctness:{block['semantic_correctness_pct']}%")
        print(f"  Answer key:            {block['answer_key_correctness_pct']}%")
        print(f"  Clarity:               {block['question_clarity_pct']}%")
        if block.get("acceptable_mismatch_rows"):
            print(f"  WARNING: {block['acceptable_mismatch_rows']} rows where acceptable != all-four-criteria")

    ir = report.get("inter_rater")
    if ir:
        print("\n## Inter-rater (2 experts)")
        print(f"  Common items:     {ir['n_common']}")
        print(f"  Agreement:        {ir['acceptable_agreement_pct']}%")
        print(f"  Cohen κ (acceptable): {ir['cohen_kappa_acceptable']}")
        prf_a = ir["inter_rater_prf_acceptable_expert2_vs_expert1"]
        print(
            f"  P/R/F1 (acceptable): {prf_a['precision']} / {prf_a['recall']} / {prf_a['f1']} "
            f"(accuracy {prf_a['accuracy']})"
        )
        if ir.get("only_expert1"):
            print(f"  Items only expert1 rated: {len(ir['only_expert1'])}")
        if ir.get("only_expert2"):
            print(f"  Items only expert2 rated: {len(ir['only_expert2'])}")

    poster = report.get("poster_snippet")
    if poster:
        print("\n## Poster bullets (copy)")
        for line in poster:
            print(" ", line)

    print("\n" + "=" * 60)


def main() -> int:
    parser = argparse.ArgumentParser(description="Evaluate expert review CSVs")
    parser.add_argument("--reviews-dir", default=DEFAULT_REVIEWS)
    parser.add_argument("--expert1", default="", help="Override expert1 CSV path")
    parser.add_argument("--expert2", default="", help="Override expert2 CSV path")
    parser.add_argument("--export", default=DEFAULT_EXPORT, help="questions_export.json")
    parser.add_argument("--metrics", default=DEFAULT_METRICS, help="metrics.jsonl for latency")
    parser.add_argument("--target", type=int, default=125, help="Planned study size")
    parser.add_argument("--json", action="store_true")
    parser.add_argument("--write-consensus", default="", help="Write consensus CSV path")
    args = parser.parse_args()

    expert1_path = args.expert1
    expert2_path = args.expert2
    if not expert1_path or not expert2_path:
        f1, f2 = find_review_files(args.reviews_dir)
        expert1_path = expert1_path or f1 or ""
        expert2_path = expert2_path or f2 or ""

    if not expert1_path or not os.path.isfile(expert1_path):
        print(f"No expert1 CSV in {args.reviews_dir}", file=sys.stderr)
        print("Add: data/reviews/rating_sheet_expert1.csv", file=sys.stderr)
        return 1

    rows1 = load_rating_csv(expert1_path)
    rows2 = load_rating_csv(expert2_path) if expert2_path and os.path.isfile(expert2_path) else []

    export_ids = load_export_ids(args.export)
    domains = Counter(r["domain"] for r in rows1)

    report: Dict[str, Any] = {
        "expert1_file": expert1_path,
        "expert2_file": expert2_path or None,
        "study_design": study_design_advice(
            n_reviewed=len(rows1),
            target=args.target,
            export_n=len(export_ids),
            domains=domains,
        ),
        "coverage": {
            "target_n": args.target,
            "expert1_n": len(rows1),
            "expert2_n": len(rows2) if rows2 else None,
            "export_n": len(export_ids) if export_ids else None,
            "export_missing_vs_target": max(0, args.target - len(export_ids)) if export_ids else None,
        },
        "latency": latency_from_metrics(args.metrics),
        "expert1": summarize_rater(rows1, os.path.basename(expert1_path)),
    }

    if rows2:
        report["expert2"] = summarize_rater(rows2, os.path.basename(expert2_path))
        consensus_rows, ir = build_consensus(rows1, rows2)
        report["inter_rater"] = ir
        report["coverage"]["only_expert1"] = ir.get("only_expert1", [])
        report["coverage"]["only_expert2"] = ir.get("only_expert2", [])
        n_cons = len(consensus_rows)
        acc_c = sum(r["acceptable"] for r in consensus_rows)
        top_c = sum(r["topic_relevance"] for r in consensus_rows)
        report["consensus"] = {
            "label": "Consensus (both experts acceptable=1)",
            "n_reviewed": n_cons,
            "acceptable_count": acc_c,
            "accuracy_pct": round(100.0 * acc_c / n_cons, 2) if n_cons else float("nan"),
            "prompt_adherence_pct": round(100.0 * top_c / n_cons, 2) if n_cons else float("nan"),
            "criteria_pct": {},
            "semantic_correctness_pct": None,
            "answer_key_correctness_pct": None,
            "question_clarity_pct": None,
            "acceptable_mismatch_rows": 0,
            "structural_valid_pct": None,
            "by_domain": {},
        }
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

    # Poster snippet from best available summary
    primary = report.get("consensus") or report["expert1"]
    n = primary["n_reviewed"]
    lat = report.get("latency") or {}
    mean_s = lat.get("mean_s", "[X.X]")
    report["poster_snippet"] = [
        f"Ollama + [model] on [GPU]",
        f"{n} prompts (5 domains); mean {mean_s} s/Q",
        f"Prompt adherence {primary['prompt_adherence_pct']}% | Accuracy {primary['accuracy_pct']}%",
        "WebSocket: [N] clients, RTT [X] ms (p95 [X] ms)",
    ]
    if rows2 and report.get("inter_rater"):
        ir = report["inter_rater"]
        p = ir["inter_rater_prf_acceptable_expert2_vs_expert1"]
        report["poster_snippet"].append(
            f"P {p['precision']} R {p['recall']} F1 {p['f1']} | κ {ir['cohen_kappa_acceptable']}"
        )

    if args.json:
        print(json.dumps(report, indent=2, ensure_ascii=False))
    else:
        print_report(report)

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
