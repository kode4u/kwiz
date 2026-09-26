#!/usr/bin/env python3
"""
Build poster-ready metrics from evaluation logs and expert CSVs.

Usage (after batch run + expert scoring):
  python3 evaluate/llm-evaluation/generate_poster_report.py
  python3 evaluate/llm-evaluation/generate_poster_report.py --markdown > poster_metrics.md

Optional WebSocket concurrent JSON:
  python3 evaluate/llm-evaluation/generate_poster_report.py \\
    --ws-json logs/evaluation/ws_concurrent_20260529.json
"""
from __future__ import annotations

import argparse
import json
import os
import statistics
from collections import defaultdict
from typing import Any, Dict, List, Optional, Tuple

from hardware_snapshot import collect_hardware, poster_table_markdown

REPO_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
DEFAULT_LOG = os.path.join(REPO_ROOT, "logs", "evaluation", "metrics.jsonl")
CRITERIA = [
    "topic_relevance",
    "semantic_correctness",
    "answer_key_correctness",
    "question_clarity",
]


def load_jsonl(path: str) -> List[Dict[str, Any]]:
    rows: List[Dict[str, Any]] = []
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


def prf(y_true: List[int], y_pred: List[int]) -> Dict[str, float]:
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


def load_expert_csv(path: str) -> List[Dict[str, Any]]:
    import csv

    rows = []
    with open(path, encoding="utf-8", newline="") as fh:
        for row in csv.DictReader(fh):
            item_id = row.get("item_id", "").strip()
            if not item_id:
                continue
            parsed: Dict[str, Any] = {
                "item_id": item_id,
                "domain": row.get("domain", "").strip(),
            }
            for c in CRITERIA + ["acceptable"]:
                v = str(row.get(c, "")).strip()
                if v == "":
                    parsed[c] = None
                else:
                    parsed[c] = int(v)
            rows.append(parsed)
    return rows


def summarize_latency(rows: List[Dict[str, Any]]) -> Dict[str, Any]:
    gens = [
        r
        for r in rows
        if r.get("event") in ("generation", "moodle_job_complete")
        and r.get("status") == "success"
        and r.get("seconds_per_question")
    ]
    all_jobs = [r for r in rows if r.get("event") == "generation"]
    ok_jobs = [r for r in all_jobs if r.get("status") == "success"]
    failed = len(all_jobs) - len(ok_jobs)

    out: Dict[str, Any] = {
        "n_successful_questions": len(gens),
        "generation_jobs_total": len(all_jobs),
        "generation_jobs_failed": failed,
        "structural_success_rate_pct": round(100.0 * len(ok_jobs) / len(all_jobs), 2) if all_jobs else None,
    }
    if gens:
        per_q = [float(r["seconds_per_question"]) for r in gens]
        sorted_q = sorted(per_q)
        p95_idx = int(0.95 * (len(sorted_q) - 1))
        out.update(
            {
                "seconds_per_question_mean": round(statistics.mean(per_q), 3),
                "seconds_per_question_median": round(statistics.median(per_q), 3),
                "seconds_per_question_p95": round(sorted_q[p95_idx], 3),
                "seconds_per_question_min": round(min(per_q), 3),
                "seconds_per_question_max": round(max(per_q), 3),
                "total_generation_time_min": round(sum(per_q) / 60.0, 2),
            }
        )
        by_domain: Dict[str, List[float]] = defaultdict(list)
        for r in gens:
            key = r.get("domain") or r.get("category_name") or "unknown"
            by_domain[key].append(float(r["seconds_per_question"]))
        out["by_domain_seconds_mean"] = {
            d: round(statistics.mean(v), 3) for d, v in sorted(by_domain.items())
        }
    return out


def summarize_experts(paths: List[str]) -> Dict[str, Any]:
    if not paths:
        return {}
    loaded = [(p, load_expert_csv(p)) for p in paths]
    loaded = [(p, r) for p, r in loaded if r and all(x.get("acceptable") is not None for x in r)]
    if not loaded:
        return {"note": "Expert CSVs missing or incomplete (fill 0/1 columns first)."}

    def rate(rows: List[Dict[str, Any]], field: str) -> float:
        vals = [r[field] for r in rows if r.get(field) is not None]
        return round(100.0 * sum(vals) / len(vals), 2) if vals else float("nan")

    report: Dict[str, Any] = {"files": [p for p, _ in loaded]}
    for path, rows in loaded:
        report[os.path.basename(path)] = {
            "n": len(rows),
            "acceptable_pct": rate(rows, "acceptable"),
            "criteria_pct": {c: rate(rows, c) for c in CRITERIA},
        }

    if len(loaded) == 1:
        rows = loaded[0][1]
        y = [r["acceptable"] for r in rows]
        acc_pct = rate(rows, "acceptable")
        report["primary_quality"] = {
            "n": len(rows),
            "acceptable_count": sum(y),
            "acceptable_pct": acc_pct,
            "accuracy": round(sum(y) / len(y), 4) if y else None,
            "prompt_adherence_pct": rate(rows, "topic_relevance"),
            "semantic_correct_pct": rate(rows, "semantic_correctness"),
            "answer_key_correct_pct": rate(rows, "answer_key_correctness"),
            "clarity_pct": rate(rows, "question_clarity"),
        }
        return report

    # Two experts: inter-rater PRF (rater A = reference, rater B = prediction)
    (_, rows_a), (_, rows_b) = loaded[0], loaded[1]
    map_a = {r["item_id"]: r for r in rows_a}
    map_b = {r["item_id"]: r for r in rows_b}
    common = sorted(set(map_a) & set(map_b))
    pairs_acc = [(map_a[i]["acceptable"], map_b[i]["acceptable"]) for i in common]
    pairs_topic = [(map_a[i]["topic_relevance"], map_b[i]["topic_relevance"]) for i in common]
    y_true = [a for a, _ in pairs_acc]
    y_pred = [b for _, b in pairs_acc]
    report["inter_rater_prf_acceptable"] = {
        "description": "Expert B vs Expert A on overall acceptable (reference=A)",
        "n": len(common),
        **prf(y_true, y_pred),
    }
    y_true_t = [a for a, _ in pairs_topic]
    y_pred_t = [b for _, b in pairs_topic]
    report["inter_rater_prf_topic_relevance"] = {
        "description": "Expert B vs Expert A on prompt/topic relevance",
        "n": len(common),
        **prf(y_true_t, y_pred_t),
    }
    # Consensus-style accuracy: average of both raters' acceptable
    avg_acc = []
    for i in common:
        avg_acc.append((map_a[i]["acceptable"] + map_b[i]["acceptable"]) / 2.0)
    report["mean_rater_acceptable_pct"] = round(100.0 * statistics.mean(avg_acc), 2)
    return report


def summarize_ws(path: str) -> Dict[str, Any]:
    if not path or not os.path.isfile(path):
        return {}
    with open(path, encoding="utf-8") as fh:
        data = json.load(fh)
    summary = data.get("summary") or data
    return {
        "clients_target": summary.get("clients_target"),
        "connected_ok": summary.get("connected_ok"),
        "failed": summary.get("failed"),
        "error_rate_pct": summary.get("error_rate_pct"),
        "connect_ms_p95": (summary.get("connect_ms") or {}).get("p95"),
        "rtt_ms_mean": (summary.get("rtt_ms") or {}).get("mean"),
        "rtt_ms_p95": (summary.get("rtt_ms") or {}).get("p95"),
    }


def markdown_report(data: Dict[str, Any]) -> str:
    lines = ["# Poster metrics (auto-generated)", ""]
    if data.get("hardware_table"):
        lines.append("## Local LLM deployment")
        lines.append(data["hardware_table"])
        lines.append("")
    lat = data.get("latency") or {}
    if lat.get("seconds_per_question_mean"):
        lines.append("## LLM generation performance")
        lines.append(f"- Questions logged: **{lat.get('n_successful_questions')}**")
        lines.append(f"- Mean latency: **{lat['seconds_per_question_mean']} s/question**")
        lines.append(f"- Median: **{lat['seconds_per_question_median']} s** | p95: **{lat['seconds_per_question_p95']} s**")
        if lat.get("structural_success_rate_pct") is not None:
            lines.append(f"- Structural/API success: **{lat['structural_success_rate_pct']}%**")
        lines.append("")
    exp = data.get("experts") or {}
    pq = exp.get("primary_quality") or {}
    if pq:
        lines.append("## Expert quality (125 MCQs)")
        lines.append(
            f"- Acceptable (all 4 criteria): **{pq['acceptable_count']}/{pq['n']}** ({pq.get('acceptable_pct', '—')}%)"
        )
        lines.append(f"- **Accuracy** (acceptable rate): **{100*pq['accuracy']:.1f}%**")
        lines.append(f"- **Prompt adherence** (topic relevance): **{pq['prompt_adherence_pct']}%**")
        lines.append(f"- Semantic correctness: **{pq['semantic_correct_pct']}%** | Answer key: **{pq['answer_key_correct_pct']}%** | Clarity: **{pq['clarity_pct']}%**")
        lines.append("")
    if exp.get("inter_rater_prf_acceptable"):
        prf_a = exp["inter_rater_prf_acceptable"]
        lines.append("## Inter-rater (Expert 1 vs Expert 2)")
        lines.append(
            f"- Agreement PRF on acceptable: P={prf_a['precision']}, R={prf_a['recall']}, F1={prf_a['f1']}, Acc={prf_a['accuracy']}"
        )
        lines.append("")
    ws = data.get("websocket") or {}
    if ws:
        lines.append("## Real-time WebSocket (concurrent)")
        lines.append(
            f"- Clients: **{ws.get('clients_target')}** | Connected: **{ws.get('connected_ok')}** | Error rate: **{ws.get('error_rate_pct')}%**"
        )
        lines.append(f"- RTT mean: **{ws.get('rtt_ms_mean')} ms** | p95: **{ws.get('rtt_ms_p95')} ms**")
        lines.append("")
    lines.append("_Regenerate after filling expert CSVs and re-running batch._")
    return "\n".join(lines)


def main() -> int:
    parser = argparse.ArgumentParser(description="Poster metrics report")
    parser.add_argument("--log", default=DEFAULT_LOG)
    parser.add_argument("--expert-csv", action="append", default=[])
    parser.add_argument(
        "--expert-default",
        action="store_true",
        help="Use rating_sheet_expert1.csv and expert2.csv if present",
    )
    parser.add_argument("--ws-json", default="")
    parser.add_argument("--markdown", action="store_true")
    args = parser.parse_args()

    expert_paths = list(args.expert_csv)
    if args.expert_default or not expert_paths:
        for name in ("rating_sheet_expert1.csv", "rating_sheet_expert2.csv", "rating_sheet_consensus.csv"):
            p = os.path.join(REPO_ROOT, "evaluate", "quality-expert", name)
            if os.path.isfile(p):
                expert_paths.append(p)

    rows = load_jsonl(args.log)
    hardware = collect_hardware(
        os.environ.get("LOCAL_LLM_URL", "http://host.docker.internal:11434"),
        os.environ.get("OLLAMA_MODEL", ""),
        os.environ.get("LLM_BACKEND", "local"),
    )
    for r in rows:
        if r.get("event") == "hardware_environment" and r.get("hardware"):
            hardware = r["hardware"]
            break
        if r.get("event") == "evaluation_run_start" and r.get("hardware"):
            hardware = r["hardware"]
            break

    report: Dict[str, Any] = {
        "hardware": hardware,
        "hardware_table": poster_table_markdown(hardware),
        "latency": summarize_latency(rows),
        "experts": summarize_experts(expert_paths),
        "websocket": summarize_ws(args.ws_json),
    }

    if args.markdown:
        print(markdown_report(report))
    else:
        print(json.dumps(report, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
