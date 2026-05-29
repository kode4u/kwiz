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
from typing import Any, Callable, Dict, List, Optional, Tuple

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


def load_export_by_category(path: str) -> Dict[str, List[Dict[str, Any]]]:
    """Group existing export questions by category_name for --resume."""
    if not path or not os.path.isfile(path):
        return {}
    with open(path, encoding="utf-8") as fh:
        doc = json.load(fh)
    grouped: Dict[str, List[Dict[str, Any]]] = {}
    for q in doc.get("questions") or []:
        key = q.get("category_name") or f"{q.get('domain', '')}: {q.get('subtopic', '')}"
        grouped.setdefault(key, []).append(dict(q))
    return grouped


def renumber_questions(categories: List[Dict[str, Any]], by_category: Dict[str, List[Dict[str, Any]]]) -> List[Dict[str, Any]]:
    ordered: List[Dict[str, Any]] = []
    for cat in categories:
        name = cat.get("name", "")
        for qi, q in enumerate(by_category.get(name, [])):
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
) -> Tuple[int, List[Dict[str, Any]], str]:
    """Return (n_generated, exported_rows, error_message)."""
    if not res["ok"]:
        return 0, [], res["body"][:500]

    try:
        body = json.loads(res["body"])
    except json.JSONDecodeError:
        return 0, [], "Invalid JSON response"

    if body.get("error"):
        return 0, [], str(body["error"])[:500]

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
    return len(rows), rows, ""


def run_job_with_retries(
    job_i: int,
    cat: Dict[str, Any],
    needed: int,
    target: int,
    payload_base: Dict[str, Any],
    args: argparse.Namespace,
    run_id: str,
    log_event: Callable[[str, Dict[str, Any]], None],
    existing_rows: List[Dict[str, Any]],
) -> Tuple[Dict[str, Any], List[Dict[str, Any]]]:
    """Generate `needed` questions for one category; retry on error or partial batch."""
    name = cat.get("name", f"Category {job_i}")
    topic = cat.get("topic", "General topic")
    level = cat.get("difficulty", "medium")
    max_attempts = 1 + max(0, args.max_retries)

    all_rows = list(existing_rows)
    last_record: Dict[str, Any] = {}
    total_elapsed_ms = 0

    for attempt in range(1, max_attempts + 1):
        still_needed = target - len(all_rows)
        if still_needed <= 0:
            break

        request_uuid = str(uuid.uuid4())
        prefix = f"[{job_i}] {name}"
        if attempt > 1:
            print(f"{prefix}: retry {attempt - 1}/{args.max_retries} (need {still_needed} more) ...")
        else:
            print(f"[{job_i}/{args.jobs_total}] {name}: {still_needed} questions — {topic!r} ...")

        payload = {
            **payload_base,
            "topic": topic,
            "level": level,
            "n_questions": still_needed,
            "request_uuid": request_uuid,
        }

        res = post_generate(args.base_url, payload, args.timeout)
        total_elapsed_ms += int(res["elapsed_ms"])
        duration_s = res["elapsed_ms"] / 1000.0

        n_gen, new_rows, err = parse_questions_from_response(res, cat, name, topic, level, request_uuid, args)
        if new_rows:
            all_rows.extend(new_rows)

        complete = len(all_rows) >= target
        status = "success" if complete else "error"
        if not err and not complete:
            err = f"Partial batch: got {len(all_rows)}/{target} questions"

        sec_per_q = round((total_elapsed_ms / 1000.0) / len(all_rows), 4) if all_rows else None
        last_record = {
            "run_id": run_id,
            "request_uuid": request_uuid,
            "job_index": job_i,
            "domain": cat.get("domain", ""),
            "subtopic": cat.get("subtopic", ""),
            "category_name": name,
            "topic": topic,
            "difficulty": level,
            "n_questions_requested": target,
            "n_questions_generated": len(all_rows),
            "duration_ms": total_elapsed_ms,
            "duration_s": round(total_elapsed_ms / 1000.0, 3),
            "seconds_per_question": sec_per_q,
            "status": status,
            "error_message": err if not complete else "",
            "attempt": attempt,
            "attempts_max": max_attempts,
            "mode": "batch_evaluation",
        }
        log_event("generation", last_record)

        print(
            f"    -> attempt {attempt}: {status}: {len(all_rows)}/{target} questions"
            + (f" in {duration_s:.1f}s" if duration_s else "")
            + (f" — {err[:120]}" if err and not complete else "")
        )

        if complete:
            break
        if attempt < max_attempts and args.retry_delay > 0:
            time.sleep(args.retry_delay)

    return last_record, all_rows[:target]


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
    parser.add_argument("--max-retries", type=int, default=3, help="Retries per failed/partial job (default 3)")
    parser.add_argument("--retry-delay", type=int, default=10, help="Seconds between retries (default 10)")
    parser.add_argument(
        "--resume",
        nargs="?",
        const="auto",
        default="",
        metavar="EXPORT_JSON",
        help="Resume from questions_export.json (or path). Skips categories that already have enough questions.",
    )
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
    args.jobs_total = len(categories)

    resume_path = ""
    if args.resume:
        if args.resume == "auto":
            resume_path = os.path.join(os.path.dirname(log_path), "questions_export.json")
        else:
            resume_path = args.resume
    existing_by_category = load_export_by_category(resume_path)
    if existing_by_category:
        print(f"Resume: loaded {sum(len(v) for v in existing_by_category.values())} questions from {resume_path}")
        print()

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
            "max_retries": args.max_retries,
            "resume_from": resume_path or None,
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
    print(f"Max retries per job: {args.max_retries} | Retry delay: {args.retry_delay}s")
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
            have = len(existing_by_category.get(cat.get("name", ""), []))
            need = int(cat.get("count", 1)) - have
            status = "skip (complete)" if need <= 0 else f"generate {need}"
            print(f"    {cat.get('subtopic', cat['name'])}: {status} — {cat['topic'][:70]}...")
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
    by_category: Dict[str, List[Dict[str, Any]]] = dict(existing_by_category)

    for job_i, cat in enumerate(categories, start=1):
        name = cat.get("name", f"Category {job_i}")
        target = int(cat.get("count", 1))
        existing_rows = list(by_category.get(name, []))[:target]

        if len(existing_rows) >= target:
            print(f"[{job_i}/{len(categories)}] {name}: skip (already have {len(existing_rows)}/{target})")
            job_records.append({
                "run_id": run_id,
                "job_index": job_i,
                "category_name": name,
                "n_questions_requested": target,
                "n_questions_generated": len(existing_rows),
                "status": "success",
                "skipped_resume": True,
            })
            by_category[name] = existing_rows
            continue

        record, rows = run_job_with_retries(
            job_i,
            cat,
            target - len(existing_rows),
            target,
            payload_base,
            args,
            run_id,
            log_event,
            existing_rows,
        )
        by_category[name] = rows
        job_records.append(record)

    exported_questions = renumber_questions(categories, by_category)
    summary = summarize_run(job_records)
    summary["run_id"] = run_id
    summary["hardware"] = hardware
    summary["questions_exported"] = len(exported_questions)
    summary["questions_target"] = totals["total_questions"]
    summary["questions_missing"] = max(0, totals["total_questions"] - len(exported_questions))
    log_event("evaluation_run_end", summary)

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
    print(f"Questions export: {export_path} ({len(exported_questions)}/{totals['total_questions']} items)")
    if summary["questions_missing"] > 0:
        print(f"WARNING: {summary['questions_missing']} questions still missing. Re-run with:")
        print(f"  python evaluate/llm-evaluation/run_batch_evaluation.py --resume")
    print("Next: python evaluate/llm-evaluation/export_rating_sheets.py")
    return 0 if summary["questions_missing"] == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
