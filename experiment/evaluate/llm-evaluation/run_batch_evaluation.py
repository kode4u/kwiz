#!/usr/bin/env python3
"""
Automated LLM evaluation: generate N questions across categories, log metrics to JSONL.

Run from repository root:
  python evaluate/llm-evaluation/run_batch_evaluation.py

Plan default: 5 domains × 5 subtopics × 5 questions = 125 MCQs.
Failed or partial jobs are run once more automatically at the end (no multi-retry loop).

Log file (default): logs/evaluation/metrics.jsonl
Also writes: logs/evaluation/run_<timestamp>.jsonl (copy of this run only)
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
from typing import Any, Callable, Dict, List, Tuple

sys.path.insert(0, os.path.dirname(__file__))
from evaluation_logger import append_event, default_log_path
from hardware_snapshot import collect_hardware, poster_table_markdown

QUESTIONS_PER_SUBTOPIC = 5


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
    per_sub = int(doc.get("questions_per_subtopic", QUESTIONS_PER_SUBTOPIC))
    if doc.get("categories"):
        categories = []
        for cat in doc["categories"]:
            c = dict(cat)
            c["count"] = int(c.get("count", per_sub))
            categories.append(c)
        return categories

    per_domain = int(doc.get("questions_per_domain", 0))
    categories: List[Dict[str, Any]] = []
    for block in doc.get("domains") or []:
        domain = block.get("domain", "General")
        subtopics = list(block.get("subtopics") or [])
        n_sub = len(subtopics) or 1
        if per_domain > 0:
            base, rem = divmod(per_domain, n_sub)
            per_counts = [base + (1 if i < rem else 0) for i in range(n_sub)]
        else:
            per_counts = [per_sub] * n_sub
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
    if current <= 0 or total <= 0 or total == current:
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


def renumber_questions(categories: List[Dict[str, Any]], by_category: Dict[str, List[Dict[str, Any]]]) -> List[Dict[str, Any]]:
    ordered: List[Dict[str, Any]] = []
    for cat in categories:
        name = cat.get("name", "")
        for q in by_category.get(name, []):
            row = dict(q)
            row["item_id"] = f"Q{len(ordered) + 1:03d}"
            ordered.append(row)
    return ordered


def parse_questions_from_response(
    res: Dict[str, Any],
    cat: Dict[str, Any],
    name: str,
    topic: str,
    level: str,
    request_uuid: str,
    args: argparse.Namespace,
) -> Tuple[List[Dict[str, Any]], str]:
    if not res["ok"]:
        return [], res["body"][:500]

    try:
        body = json.loads(res["body"])
    except json.JSONDecodeError:
        return [], "Invalid JSON response"

    if body.get("error"):
        return [], str(body["error"])[:500]

    qlist = body.get("questions") or []
    rows: List[Dict[str, Any]] = []
    labels = ["A", "B", "C", "D", "E", "F"]
    for q in qlist:
        choices = q.get("choices") or []
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
        rows.append({
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
    return rows, ""


def run_one_job(
    job_i: int,
    cat: Dict[str, Any],
    n_questions: int,
    target: int,
    payload_base: Dict[str, Any],
    args: argparse.Namespace,
    run_id: str,
    log_event: Callable[[str, Dict[str, Any]], None],
    phase: str,
    jobs_total: int,
) -> Tuple[Dict[str, Any], List[Dict[str, Any]]]:
    name = cat.get("name", f"Category {job_i}")
    topic = cat.get("topic", "General topic")
    level = cat.get("difficulty", "medium")
    request_uuid = str(uuid.uuid4())

    label = "regenerate" if phase == "regenerate" else "generate"
    print(f"[{job_i}/{jobs_total}] {name} ({label}, need {n_questions}): {topic!r} ...")

    payload = {
        **payload_base,
        "topic": topic,
        "level": level,
        "n_questions": n_questions,
        "request_uuid": request_uuid,
    }

    res = post_generate(args.base_url, payload, args.timeout)
    duration_s = res["elapsed_ms"] / 1000.0
    new_rows, err = parse_questions_from_response(res, cat, name, topic, level, request_uuid, args)

    complete = len(new_rows) >= n_questions
    status = "success" if complete and not err else "error"
    if not err and not complete:
        err = f"Partial batch: got {len(new_rows)}/{n_questions} questions"
    if err and len(new_rows) > 0 and len(new_rows) < n_questions:
        status = "error"

    sec_per_q = round(duration_s / len(new_rows), 4) if new_rows else None
    record = {
        "run_id": run_id,
        "request_uuid": request_uuid,
        "job_index": job_i,
        "domain": cat.get("domain", ""),
        "subtopic": cat.get("subtopic", ""),
        "category_name": name,
        "topic": topic,
        "difficulty": level,
        "n_questions_requested": n_questions,
        "n_questions_generated": len(new_rows),
        "n_questions_target_category": target,
        "duration_ms": int(res["elapsed_ms"]),
        "duration_s": round(duration_s, 3),
        "seconds_per_question": sec_per_q,
        "status": status,
        "error_message": err,
        "phase": phase,
        "mode": "batch_evaluation",
    }
    log_event("generation", record)

    if err:
        log_event(
            "generation_error",
            {
                "run_id": run_id,
                "job_index": job_i,
                "category_name": name,
                "topic": topic,
                "phase": phase,
                "error_message": err,
                "http_status": res.get("status"),
            },
        )
        print(f"    -> ERROR: {err[:200]}", file=sys.stderr)
    else:
        print(f"    -> ok: {len(new_rows)} question(s) in {duration_s:.1f}s")

    return record, new_rows


def main() -> int:
    parser = argparse.ArgumentParser(description="Batch LLM evaluation with file metrics log")
    parser.add_argument("--base-url", default=os.environ.get("LLMAPI_URL", "http://localhost:5001"))
    parser.add_argument("--plan", default=os.path.join(os.path.dirname(__file__), "batch_plan.example.json"))
    parser.add_argument(
        "--total-questions",
        type=int,
        default=125,
        help="Target total questions (default 125). Use 0 to keep plan counts as-is.",
    )
    parser.add_argument("--backend", default=os.environ.get("LLM_BACKEND", "local"))
    parser.add_argument("--model", default=os.environ.get("OLLAMA_MODEL", ""))
    parser.add_argument("--language", default="en")
    parser.add_argument("--timeout", type=int, default=1200)
    parser.add_argument("--warmup", type=int, default=1)
    parser.add_argument("--log", default="", help="Override metrics log path")
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    log_path = args.log or default_log_path()
    run_path = os.path.join(os.path.dirname(log_path), f"run_{time.strftime('%Y%m%d_%H%M%S')}.jsonl")

    def log_event(event: str, data: Dict[str, Any]) -> None:
        append_event(event, data, log_path)
        append_event(event, data, run_path)

    hardware = collect_hardware(
        os.environ.get("LOCAL_LLM_URL", "http://host.docker.internal:11434"),
        args.model,
        args.backend,
    )

    categories = load_plan(args.plan)
    if args.total_questions > 0:
        current = plan_totals(categories)["total_questions"]
        if current != args.total_questions:
            categories = scale_plan(categories, args.total_questions)
    totals = plan_totals(categories)
    run_id = str(uuid.uuid4())
    jobs_total = len(categories)

    log_event(
        "evaluation_run_start",
        {
            "run_id": run_id,
            "total_questions_target": totals["total_questions"],
            "questions_per_subtopic": QUESTIONS_PER_SUBTOPIC,
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
    print(f"Domains: {totals['domains']} | Subtopics: {totals['jobs']} | Total: {totals['total_questions']} questions")
    print("(5 questions per subtopic × 5 subtopics × 5 domains = 125)")
    print("Questions per domain:")
    for domain, n in totals["per_domain"].items():
        print(f"  - {domain}: {n}")
    print()

    if args.dry_run:
        for cat in categories:
            print(f"  {cat['count']} — {cat['name']}")
        return 0

    payload_base: Dict[str, Any] = {"backend": args.backend, "language": args.language}
    if args.model:
        payload_base["model"] = args.model

    for w in range(args.warmup):
        print(f"Warmup {w + 1}/{args.warmup}...")
        res = post_generate(
            args.base_url,
            {**payload_base, "topic": "Warmup evaluation topic", "level": "medium", "n_questions": 1},
            args.timeout,
        )
        if not res["ok"]:
            print("Warmup failed:", res["body"][:300], file=sys.stderr)
            return 1

    job_records: List[Dict[str, Any]] = []
    by_category: Dict[str, List[Dict[str, Any]]] = {cat["name"]: [] for cat in categories}

    print("=== Pass 1: initial generation ===")
    for job_i, cat in enumerate(categories, start=1):
        target = int(cat.get("count", QUESTIONS_PER_SUBTOPIC))
        record, rows = run_one_job(
            job_i, cat, target, target, payload_base, args, run_id, log_event, "initial", jobs_total
        )
        by_category[cat["name"]] = rows[:target]
        job_records.append(record)

    incomplete = [
        (job_i, cat)
        for job_i, cat in enumerate(categories, start=1)
        if len(by_category[cat["name"]]) < int(cat.get("count", QUESTIONS_PER_SUBTOPIC))
    ]
    if incomplete:
        print()
        print(f"=== Pass 2: regenerate {len(incomplete)} incomplete subtopic(s) ===")
        for job_i, cat in incomplete:
            name = cat["name"]
            target = int(cat.get("count", QUESTIONS_PER_SUBTOPIC))
            have = len(by_category[name])
            need = target - have
            record, rows = run_one_job(
                job_i, cat, need, target, payload_base, args, run_id, log_event, "regenerate", jobs_total
            )
            job_records.append(record)
            if rows:
                by_category[name] = (by_category[name] + rows)[:target]

    exported_questions = renumber_questions(categories, by_category)
    still_missing = [
        cat["name"]
        for cat in categories
        if len(by_category[cat["name"]]) < int(cat.get("count", QUESTIONS_PER_SUBTOPIC))
    ]

    summary = summarize_run(job_records)
    summary["run_id"] = run_id
    summary["hardware"] = hardware
    summary["questions_exported"] = len(exported_questions)
    summary["questions_target"] = totals["total_questions"]
    summary["questions_missing"] = max(0, totals["total_questions"] - len(exported_questions))
    summary["incomplete_categories"] = still_missing
    log_event("evaluation_run_end", summary)

    if still_missing:
        log_event(
            "evaluation_run_incomplete",
            {"run_id": run_id, "incomplete_categories": still_missing, "questions_missing": summary["questions_missing"]},
        )

    export_path = os.path.join(os.path.dirname(log_path), "questions_export.json")
    with open(export_path, "w", encoding="utf-8") as fh:
        json.dump(
            {
                "run_id": run_id,
                "model": args.model or os.environ.get("OLLAMA_MODEL", ""),
                "backend": args.backend,
                "total_questions": len(exported_questions),
                "questions_target": totals["total_questions"],
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
    print(f"Questions export: {export_path} ({len(exported_questions)}/{totals['total_questions']})")
    if still_missing:
        print("Still incomplete after regenerate pass:")
        for name in still_missing:
            have = len(by_category[name])
            target = next(int(c["count"]) for c in categories if c["name"] == name)
            print(f"  - {name}: {have}/{target}")
        print("Check logs/evaluation/metrics.jsonl for generation_error events.")
    print("Next: python evaluate/llm-evaluation/export_rating_sheets.py")
    return 0 if not still_missing else 1


if __name__ == "__main__":
    sys.exit(main())
