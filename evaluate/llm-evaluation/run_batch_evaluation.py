#!/usr/bin/env python3
"""
Automated LLM evaluation: generate N questions across categories, log metrics to JSONL.

Run from repository root:
  python3 evaluate/llm-evaluation/run_batch_evaluation.py --total-questions 125

Log file (default): logs/evaluation/metrics.jsonl
Also writes: logs/evaluation/run_<timestamp>.jsonl (copy of this run only)

Set hardware for poster (when auto-detect is wrong, e.g. Mac + Docker):
  export EVAL_GPU="NVIDIA RTX 3090 24 GB"
  export EVAL_CPU="AMD Ryzen 9 5950X"
  export EVAL_RAM_GB="64"
  export EVAL_OS="macOS 14 / Ubuntu 22.04"
"""
from __future__ import annotations

import argparse
import json
import os
import statistics
import sys
import time
import urllib.error
import urllib.request
import uuid
from typing import Any, Dict, List

# Allow imports from same package directory
sys.path.insert(0, os.path.dirname(__file__))
from evaluation_logger import append_event, default_log_path
from hardware_snapshot import collect_hardware, poster_table_markdown


def post_generate(base_url: str, payload: Dict[str, Any], timeout: int) -> Dict[str, Any]:
    url = base_url.rstrip("/") + "/generate"
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        url,
        data=data,
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    t0 = time.perf_counter()
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            body = resp.read().decode("utf-8", errors="replace")
            elapsed_ms = (time.perf_counter() - t0) * 1000.0
            return {
                "ok": resp.status == 200,
                "status": resp.status,
                "elapsed_ms": elapsed_ms,
                "body": body,
            }
    except urllib.error.HTTPError as e:
        elapsed_ms = (time.perf_counter() - t0) * 1000.0
        body = e.read().decode("utf-8", errors="replace") if e.fp else ""
        return {"ok": False, "status": e.code, "elapsed_ms": elapsed_ms, "body": body}
    except Exception as e:
        elapsed_ms = (time.perf_counter() - t0) * 1000.0
        return {"ok": False, "status": -1, "elapsed_ms": elapsed_ms, "body": str(e)}


def load_plan(path: str) -> List[Dict[str, Any]]:
    with open(path, encoding="utf-8") as fh:
        doc = json.load(fh)
    if doc.get("categories"):
        return list(doc["categories"])
    per_domain = int(doc.get("questions_per_domain", 0))
    default_per_sub = int(doc.get("questions_per_subtopic", 5))
    categories: List[Dict[str, Any]] = []
    for block in doc.get("domains") or []:
        domain = block.get("domain", "General")
        subtopics = list(block.get("subtopics") or [])
        n_sub = len(subtopics) or 1
        if per_domain > 0:
            base, rem = divmod(per_domain, n_sub)
            per_counts = [base + (1 if i < rem else 0) for i in range(n_sub)]
        else:
            per_counts = [default_per_sub] * n_sub
        for i, sub in enumerate(subtopics):
            subname = sub.get("name", "Subtopic")
            count = int(sub.get("count", per_counts[i]))
            categories.append({
                "name": f"{domain}: {subname}",
                "domain": domain,
                "subtopic": subname,
                "topic": sub.get("topic", f"{domain}: {subname}"),
                "difficulty": sub.get("difficulty", "medium"),
                "count": count,
            })
    return categories


def plan_totals(categories: List[Dict[str, Any]]) -> Dict[str, Any]:
    by_domain: Dict[str, int] = {}
    for c in categories:
        d = c.get("domain") or "unknown"
        by_domain[d] = by_domain.get(d, 0) + int(c.get("count", 0))
    return {
        "domains": len(by_domain),
        "jobs": len(categories),
        "total_questions": sum(int(c.get("count", 0)) for c in categories),
        "per_domain": by_domain,
    }


def scale_plan(categories: List[Dict[str, Any]], total: int) -> List[Dict[str, Any]]:
    current = sum(int(c.get("count", 0)) for c in categories)
    if current <= 0:
        return categories
    if total <= 0 or total == current:
        return categories
    ratio = total / current
    scaled = []
    assigned = 0
    for i, cat in enumerate(categories):
        c = dict(cat)
        if i == len(categories) - 1:
            c["count"] = max(1, total - assigned)
        else:
            n = max(1, int(round(int(cat.get("count", 1)) * ratio)))
            c["count"] = n
            assigned += n
        scaled.append(c)
    return scaled


def summarize_run(records: List[Dict[str, Any]]) -> Dict[str, Any]:
    ok = [r for r in records if r.get("status") == "success"]
    per_q = [r["seconds_per_question"] for r in ok if r.get("seconds_per_question")]
    durations = [r["duration_s"] for r in ok if r.get("duration_s")]
    return {
        "jobs_total": len(records),
        "jobs_success": len(ok),
        "jobs_failed": len(records) - len(ok),
        "questions_generated": sum(r.get("n_questions_generated", 0) for r in ok),
        "seconds_per_question": {
            "mean": round(statistics.mean(per_q), 4) if per_q else None,
            "min": round(min(per_q), 4) if per_q else None,
            "max": round(max(per_q), 4) if per_q else None,
            "p95": round(sorted(per_q)[int(0.95 * (len(per_q) - 1))], 4) if len(per_q) > 1 else (per_q[0] if per_q else None),
        },
        "duration_s_per_job": {
            "mean": round(statistics.mean(durations), 3) if durations else None,
            "total": round(sum(durations), 3) if durations else None,
        },
    }


def main() -> int:
    parser = argparse.ArgumentParser(description="Batch LLM evaluation with file metrics log")
    parser.add_argument("--base-url", default=os.environ.get("LLMAPI_URL", "http://localhost:5001"))
    parser.add_argument("--plan", default=os.path.join(os.path.dirname(__file__), "batch_plan.example.json"))
    parser.add_argument(
        "--total-questions",
        type=int,
        default=0,
        help="If > 0, scale all counts to this total. Default 0 = use plan as-is (125 = 5 domains × 25).",
    )
    parser.add_argument("--backend", default=os.environ.get("LLM_BACKEND", "local"))
    parser.add_argument("--model", default=os.environ.get("OLLAMA_MODEL", ""))
    parser.add_argument("--language", default="en")
    parser.add_argument("--timeout", type=int, default=1200)
    parser.add_argument("--warmup", type=int, default=1, help="Warmup requests (1 question each)")
    parser.add_argument("--log", default="", help="Override metrics log path")
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    log_path = args.log or default_log_path()
    run_path = os.path.join(
        os.path.dirname(log_path),
        f"run_{time.strftime('%Y%m%d_%H%M%S')}.jsonl",
    )

    def log_event(event: str, data: Dict[str, Any]) -> None:
        append_event(event, data, log_path)
        append_event(event, data, run_path)

    hardware = collect_hardware(
        os.environ.get("LOCAL_LLM_URL", "http://host.docker.internal:11434"),
        args.model,
        args.backend,
    )

    categories = load_plan(args.plan)
    totals = plan_totals(categories)
    if args.total_questions > 0 and args.total_questions != totals["total_questions"]:
        categories = scale_plan(categories, args.total_questions)
        totals = plan_totals(categories)
    run_id = str(uuid.uuid4())

    log_event(
        "evaluation_run_start",
        {
            "run_id": run_id,
            "total_questions_target": totals["total_questions"],
            "questions_per_domain": totals["per_domain"],
            "categories": categories,
            "base_url": args.base_url,
            "backend": args.backend,
            "model": args.model,
            "hardware": hardware,
            "poster_table_markdown": poster_table_markdown(hardware),
        },
    )

    print("=== Experimental environment (for poster) ===")
    print(poster_table_markdown(hardware))
    print()
    print(f"Log file: {log_path}")
    print(f"This run only: {run_path}")
    print(f"Domains: {totals['domains']} | LLM jobs: {totals['jobs']} | Total questions: {totals['total_questions']}")
    print("Questions per domain:")
    for domain, n in totals["per_domain"].items():
        print(f"  - {domain}: {n}")
    print()

    if args.dry_run:
        current_domain = None
        for cat in categories:
            if cat.get("domain") != current_domain:
                current_domain = cat.get("domain")
                domain_total = totals["per_domain"].get(current_domain, 0)
                print(f"\n[{current_domain}] — {domain_total} questions total")
            print(f"    {cat.get('subtopic', cat['name'])}: {cat['count']} questions — {cat['topic'][:70]}...")
        return 0

    payload_base: Dict[str, Any] = {
        "backend": args.backend,
        "language": args.language,
    }
    if args.model:
        payload_base["model"] = args.model

    for w in range(args.warmup):
        print(f"Warmup {w + 1}/{args.warmup}...")
        payload = {
            **payload_base,
            "topic": "Warmup evaluation topic",
            "level": "medium",
            "n_questions": 1,
        }
        res = post_generate(args.base_url, payload, args.timeout)
        if not res["ok"]:
            print("Warmup failed:", res["body"][:300], file=sys.stderr)
            return 1

    job_records: List[Dict[str, Any]] = []
    question_index = 0
    exported_questions: List[Dict[str, Any]] = []

    for job_i, cat in enumerate(categories, start=1):
        name = cat.get("name", f"Category {job_i}")
        topic = cat.get("topic", "General topic")
        level = cat.get("difficulty", "medium")
        count = int(cat.get("count", 1))
        request_uuid = str(uuid.uuid4())

        print(f"[{job_i}/{len(categories)}] {name}: {count} questions — {topic!r} ...")

        payload = {
            **payload_base,
            "topic": topic,
            "level": level,
            "n_questions": count,
            "request_uuid": request_uuid,
        }

        res = post_generate(args.base_url, payload, args.timeout)
        elapsed_ms = res["elapsed_ms"]
        duration_s = elapsed_ms / 1000.0

        n_gen = 0
        status = "error"
        err = ""
        if res["ok"]:
            try:
                body = json.loads(res["body"])
                qlist = body.get("questions") or []
                n_gen = len(qlist)
                status = "success"
                for qi, q in enumerate(qlist):
                    choices = q.get("choices") or []
                    labels = ["A", "B", "C", "D", "E", "F"]
                    choice_texts = []
                    correct_label = ""
                    for ci, ch in enumerate(choices[:6]):
                        text = ch.get("text", ch) if isinstance(ch, dict) else str(ch)
                        choice_texts.append(text)
                        if isinstance(ch, dict) and ch.get("is_correct"):
                            correct_label = labels[ci]
                    if not correct_label and q.get("correct_index") is not None:
                        idx = int(q["correct_index"])
                        if 0 <= idx < len(labels):
                            correct_label = labels[idx]
                    exported_questions.append({
                        "item_id": f"Q{question_index + qi + 1:03d}",
                        "domain": cat.get("domain", ""),
                        "subtopic": cat.get("subtopic", ""),
                        "category_name": name,
                        "topic": topic,
                        "difficulty": level,
                        "request_uuid": request_uuid,
                        "language": args.language,
                        "model_name": args.model or os.environ.get("OLLAMA_MODEL", ""),
                        "backend": args.backend,
                        "question_text": q.get("question", ""),
                        "choice_a": choice_texts[0] if len(choice_texts) > 0 else "",
                        "choice_b": choice_texts[1] if len(choice_texts) > 1 else "",
                        "choice_c": choice_texts[2] if len(choice_texts) > 2 else "",
                        "choice_d": choice_texts[3] if len(choice_texts) > 3 else "",
                        "correct_choice_label": correct_label,
                        "explanation": q.get("explanation", "") or "",
                    })
            except json.JSONDecodeError:
                err = "Invalid JSON response"
        else:
            err = res["body"][:500]

        sec_per_q = round(duration_s / n_gen, 4) if n_gen > 0 else None
        record = {
            "run_id": run_id,
            "request_uuid": request_uuid,
            "job_index": job_i,
            "domain": cat.get("domain", ""),
            "subtopic": cat.get("subtopic", ""),
            "category_name": name,
            "topic": topic,
            "difficulty": level,
            "n_questions_requested": count,
            "n_questions_generated": n_gen,
            "duration_ms": int(elapsed_ms),
            "duration_s": round(duration_s, 3),
            "seconds_per_question": sec_per_q,
            "status": status,
            "error_message": err,
            "question_index_start": question_index + 1,
            "question_index_end": question_index + n_gen,
        }
        question_index += n_gen
        job_records.append(record)

        log_event("generation", {**record, "mode": "batch_evaluation"})
        print(
            f"    -> {status}: {n_gen}/{count} questions in {duration_s:.1f}s"
            + (f" ({sec_per_q}s/question)" if sec_per_q else "")
        )

    summary = summarize_run(job_records)
    summary["run_id"] = run_id
    summary["hardware"] = hardware
    summary["questions_exported"] = len(exported_questions)
    log_event("evaluation_run_end", summary)

    export_path = os.path.join(os.path.dirname(log_path), "questions_export.json")
    with open(export_path, "w", encoding="utf-8") as fh:
        json.dump(
            {
                "run_id": run_id,
                "model": args.model or os.environ.get("OLLAMA_MODEL", ""),
                "backend": args.backend,
                "total_questions": len(exported_questions),
                "questions": exported_questions,
            },
            fh,
            ensure_ascii=False,
            indent=2,
        )

    print()
    print("=== Run summary ===")
    print(json.dumps(summary, indent=2))
    print()
    print(f"Questions export: {export_path} ({len(exported_questions)} items)")
    print("Next: python3 evaluate/llm-evaluation/export_rating_sheets.py")
    print("      (creates expert rating CSVs for 2 instructors)")
    return 0 if summary["jobs_failed"] == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
