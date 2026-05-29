#!/usr/bin/env python3
"""
Analyze expert ratings (binary rubric: 4 criteria + acceptable).

Supports two raters; reports per-domain scores, inter-rater agreement, and consensus needs.
"""
from __future__ import annotations

import argparse
import csv
import json
import math
from collections import defaultdict
from typing import Any, Dict, List, Tuple

CRITERIA = [
    "topic_relevance",
    "semantic_correctness",
    "answer_key_correctness",
    "question_clarity",
]


def parse01(value: str, field: str, row: int) -> int:
    v = str(value).strip()
    if v == "":
        raise ValueError(f"Row {row}: missing {field}")
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


def load_csv(path: str) -> List[Dict[str, Any]]:
    rows = []
    with open(path, encoding="utf-8", newline="") as fh:
        for idx, row in enumerate(csv.DictReader(fh), start=2):
            item = {
                "item_id": row["item_id"].strip(),
                "domain": row.get("domain", "").strip(),
                "subtopic": row.get("subtopic", "").strip(),
                "rater_id": row.get("rater_id", "").strip(),
            }
            for c in CRITERIA + ["acceptable"]:
                item[c] = parse01(row.get(c, ""), c, idx)
            rows.append(item)
    return rows


def pct_acceptable(rows: List[Dict[str, Any]]) -> float:
    if not rows:
        return float("nan")
    return 100.0 * sum(r["acceptable"] for r in rows) / len(rows)


def criterion_rates(rows: List[Dict[str, Any]]) -> Dict[str, float]:
    out = {}
    for c in CRITERIA:
        out[c] = 100.0 * sum(r[c] for r in rows) / len(rows) if rows else float("nan")
    return out


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--csv", action="append", required=True, help="Rating sheet(s), one per expert")
    parser.add_argument("--json", action="store_true")
    args = parser.parse_args()

    all_rows: List[Dict[str, Any]] = []
    by_rater: Dict[str, List[Dict[str, Any]]] = defaultdict(list)
    for path in args.csv:
        for row in load_csv(path):
            all_rows.append(row)
            by_rater[row["rater_id"]].append(row)

    # Per rater overall
    rater_summaries = {}
    for rid, rows in by_rater.items():
        by_domain: Dict[str, List[Dict[str, Any]]] = defaultdict(list)
        for r in rows:
            by_domain[r["domain"]].append(r)
        rater_summaries[rid] = {
            "n": len(rows),
            "acceptable_pct": round(pct_acceptable(rows), 2),
            "criteria_pct": {k: round(v, 2) for k, v in criterion_rates(rows).items()},
            "by_domain": {
                d: {
                    "n": len(drows),
                    "acceptable_pct": round(pct_acceptable(drows), 2),
                }
                for d, drows in sorted(by_domain.items())
            },
        }

    # Pairwise agreement (2 experts)
    agreement = {}
    rater_ids = list(by_rater.keys())
    if len(rater_ids) == 2:
        r1, r2 = rater_ids
        map1 = {r["item_id"]: r for r in by_rater[r1]}
        map2 = {r["item_id"]: r for r in by_rater[r2]}
        common = sorted(set(map1) & set(map2))
        pairs_acc = [(map1[i]["acceptable"], map2[i]["acceptable"]) for i in common]
        disagree = [i for i in common if map1[i]["acceptable"] != map2[i]["acceptable"]]
        agreement = {
            "raters": [r1, r2],
            "n_common": len(common),
            "acceptable_agreement_count": sum(1 for a, b in pairs_acc if a == b),
            "acceptable_agreement_pct": round(100.0 * sum(1 for a, b in pairs_acc if a == b) / len(common), 2) if common else None,
            "cohen_kappa_acceptable": round(cohen_kappa(pairs_acc), 4) if common else None,
            "disagreement_item_ids": disagree,
        }

    report = {
        "total_ratings": len(all_rows),
        "per_rater": rater_summaries,
        "inter_rater": agreement,
        "recommended_consensus": "Resolve disagreement_item_ids via discussion; save final scores to rating_sheet_consensus.csv",
    }

    if args.json:
        print(json.dumps(report, indent=2))
    else:
        print("=== Expert quality analysis (binary rubric) ===\n")
        for rid, s in rater_summaries.items():
            print(f"Rater {rid}: n={s['n']}  acceptable={s['acceptable_pct']}%")
            for c, v in s["criteria_pct"].items():
                print(f"  {c}: {v}% acceptable")
            print("  By domain:")
            for d, ds in s["by_domain"].items():
                print(f"    {d}: {ds['acceptable_pct']}% ({ds['n']} questions)")
            print()
        if agreement:
            print("Inter-rater (acceptable):")
            print(f"  Agreement: {agreement['acceptable_agreement_pct']}%")
            print(f"  Cohen's kappa: {agreement['cohen_kappa_acceptable']}")
            print(f"  Disagreements: {len(agreement['disagreement_item_ids'])} items")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
