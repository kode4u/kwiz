"""
Append structured evaluation metrics to a JSONL log file (research / poster).
"""

from __future__ import annotations

import json
import os
import platform
import socket
import time
from datetime import datetime, timezone
from typing import Any, Dict, Optional

import requests
import threading

METRICS_LOG_PATH = os.getenv(
    "METRICS_LOG_PATH",
    os.path.join(os.path.dirname(os.path.dirname(__file__)), "logs", "evaluation", "metrics.jsonl"),
)

ITERATION_STATE_PATH = os.getenv(
    "ITERATION_STATE_PATH",
    os.path.join(os.path.dirname(os.path.dirname(__file__)), "logs", "evaluation", "iteration_state.json"),
)

ITERATIONS_DIR = os.getenv(
    "ITERATIONS_DIR",
    os.path.join(os.path.dirname(os.path.dirname(__file__)), "logs", "evaluation", "iterations"),
)

ITERATIONS_INDEX_PATH = os.getenv(
    "ITERATIONS_INDEX_PATH",
    os.path.join(os.path.dirname(os.path.dirname(__file__)), "logs", "evaluation", "iterations_index.json"),
)

_iteration_lock = threading.Lock()


def _ensure_log_dir(path: str) -> None:
    directory = os.path.dirname(path)
    if directory:
        os.makedirs(directory, exist_ok=True)


def append_metric(event: str, data: Optional[Dict[str, Any]] = None) -> None:
    path = METRICS_LOG_PATH
    if not path:
        return
    try:
        _ensure_log_dir(path)
        row = {
            "event": event,
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "source": "llmapi",
        }
        if data:
            row.update(data)
        with open(path, "a", encoding="utf-8") as fh:
            fh.write(json.dumps(row, ensure_ascii=False) + "\n")
    except OSError as exc:
        import logging
        logging.getLogger(__name__).warning("Could not write metrics log: %s", exc)


def collect_hardware_snapshot(
    local_llm_url: str,
    ollama_model: str,
    llm_backend: str,
) -> Dict[str, Any]:
    """Best-effort hardware + runtime environment for publication tables."""
    snap: Dict[str, Any] = {
        "hostname": socket.gethostname(),
        "os": platform.platform(),
        "os_release": platform.release(),
        "python_version": platform.python_version(),
        "cpu_model": platform.processor() or "unknown",
        "cpu_count_logical": os.cpu_count(),
        "ram_total_gb": None,
        "gpu": [],
        "llm_framework": "Ollama" if llm_backend == "local" else llm_backend,
        "llm_backend": llm_backend,
        "deployed_model": ollama_model,
        "local_llm_url": local_llm_url,
        "ollama_models": [],
    }

    # RAM (Linux /proc; macOS sysctl via subprocess not available in all containers)
    try:
        if os.path.exists("/proc/meminfo"):
            with open("/proc/meminfo", encoding="utf-8") as fh:
                for line in fh:
                    if line.startswith("MemTotal:"):
                        kb = int(line.split()[1])
                        snap["ram_total_gb"] = round(kb / (1024 * 1024), 2)
                        break
    except OSError:
        pass

    # NVIDIA GPUs (when nvidia-smi is available on host, rarely inside slim container)
    try:
        import subprocess
        out = subprocess.run(
            ["nvidia-smi", "--query-gpu=name,memory.total", "--format=csv,noheader"],
            capture_output=True,
            text=True,
            timeout=5,
        )
        if out.returncode == 0 and out.stdout.strip():
            for line in out.stdout.strip().splitlines():
                parts = [p.strip() for p in line.split(",")]
                snap["gpu"].append(
                    {"name": parts[0], "vram": parts[1] if len(parts) > 1 else ""}
                )
    except (OSError, subprocess.SubprocessError):
        pass

    # Allow operator to inject poster-ready specs when auto-detect fails (Docker on Mac)
    for key, env in (
        ("gpu_override", "EVAL_GPU"),
        ("cpu_override", "EVAL_CPU"),
        ("ram_override_gb", "EVAL_RAM_GB"),
        ("os_override", "EVAL_OS"),
    ):
        val = os.getenv(env, "").strip()
        if val:
            snap[key.replace("_override", "_reported")] = val

    if local_llm_url:
        try:
            resp = requests.get(f"{local_llm_url.rstrip('/')}/api/tags", timeout=10)
            if resp.ok:
                tags = resp.json().get("models") or []
                snap["ollama_models"] = [m.get("name") for m in tags if m.get("name")]
        except requests.RequestException:
            pass

    return snap


def log_hardware_once(local_llm_url: str, ollama_model: str, llm_backend: str) -> None:
    """Write hardware snapshot at most once per process (per day file is fine to repeat)."""
    global _hardware_logged
    if getattr(log_hardware_once, "_done", False):
        return
    snap = collect_hardware_snapshot(local_llm_url, ollama_model, llm_backend)
    append_metric("hardware_environment", {"hardware": snap})
    log_hardware_once._done = True  # type: ignore[attr-defined]


def log_generation(
    *,
    request_uuid: str,
    mode: str,
    backend: str,
    model: Optional[str],
    topic: str,
    level: str,
    language: str,
    category_name: str = "",
    n_questions_requested: int,
    n_questions_generated: int,
    duration_ms: int,
    status: str,
    error_message: str = "",
    batch_index: int = 0,
    batch_total: int = 0,
    has_lesson_context: bool = False,
) -> None:
    duration_s = duration_ms / 1000.0 if duration_ms else 0.0
    per_q = (
        round(duration_s / n_questions_generated, 4)
        if n_questions_generated > 0 and duration_s > 0
        else None
    )
    append_metric(
        "generation",
        {
            "request_uuid": request_uuid,
            "mode": mode,
            "backend": backend,
            "model": model or "",
            "topic": topic[:255],
            "category_name": category_name[:255],
            "difficulty": level,
            "language": language,
            "n_questions_requested": n_questions_requested,
            "n_questions_generated": n_questions_generated,
            "duration_ms": duration_ms,
            "duration_s": round(duration_s, 3),
            "seconds_per_question": per_q,
            "status": status,
            "error_message": error_message[:500] if error_message else "",
            "batch_index": batch_index,
            "batch_total": batch_total,
            "has_lesson_context": has_lesson_context,
        },
    )


def log_inacon_metrics(
    *,
    request_uuid: str,
    pipeline_mode: str = "INACON",
    backend: str = "local",
    model: Optional[str] = None,
    topic: str = "",
    category_name: str = "",
    corpus_tokens: int = 0,
    change_ratio: float = 0.0,
    top_k: int = 3,
    t_extract_ms: float = 0.0,
    t_chunk_ms: float = 0.0,
    t_hash_ms: float = 0.0,
    t_lookup_ms: float = 0.0,
    t_embed_ms: float = 0.0,
    t_index_ms: float = 0.0,
    t_kb_ms: float = 0.0,
    t_query_embed_ms: float = 0.0,
    t_retrieval_ms: float = 0.0,
    t_prompt_ms: float = 0.0,
    t_llm_ms: float = 0.0,
    t_validation_ms: float = 0.0,
    t_retry_ms: float = 0.0,
    t_gen_ms: float = 0.0,
    t_e2e_ms: float = 0.0,
    cache_hits: int = 0,
    cache_misses: int = 0,
    hit_ratio: float = 0.0,
    n_questions_requested: int = 5,
    n_questions_generated: int = 0,
    validation_passed: int = 0,
    validation_failed: int = 0,
    retries_count: int = 0,
    status: str = "success",
    error_message: str = "",
) -> None:
    """Logs decomposed RAG pipeline metrics for research experiments."""
    append_metric(
        "inacon_decomposition",
        {
            "request_uuid": request_uuid,
            "pipeline_mode": pipeline_mode,
            "backend": backend,
            "model": model or "",
            "topic": topic[:255],
            "category_name": category_name[:255],
            "corpus_tokens": corpus_tokens,
            "change_ratio": change_ratio,
            "top_k": top_k,
            # KB Indexing Phase Breakdown
            "t_extract_ms": round(t_extract_ms, 2),
            "t_chunk_ms": round(t_chunk_ms, 2),
            "t_hash_ms": round(t_hash_ms, 2),
            "t_lookup_ms": round(t_lookup_ms, 2),
            "t_embed_ms": round(t_embed_ms, 2),
            "t_index_ms": round(t_index_ms, 2),
            "t_kb_ms": round(t_kb_ms, 2),
            # Generation Phase Breakdown
            "t_query_embed_ms": round(t_query_embed_ms, 2),
            "t_retrieval_ms": round(t_retrieval_ms, 2),
            "t_prompt_ms": round(t_prompt_ms, 2),
            "t_llm_ms": round(t_llm_ms, 2),
            "t_validation_ms": round(t_validation_ms, 2),
            "t_retry_ms": round(t_retry_ms, 2),
            "t_gen_ms": round(t_gen_ms, 2),
            # End-to-End Latency
            "t_e2e_ms": round(t_e2e_ms, 2),
            # Caching and Validation Telemetry
            "cache_hits": cache_hits,
            "cache_misses": cache_misses,
            "hit_ratio": round(hit_ratio, 4),
            "n_questions_requested": n_questions_requested,
            "n_questions_generated": n_questions_generated,
            "validation_passed": validation_passed,
            "validation_failed": validation_failed,
            "retries_count": retries_count,
            "status": status,
            "error_message": error_message[:500] if error_message else "",
        },
    )


def get_next_iteration_number() -> int:
    """Safely increments and returns the next sequential iteration number."""
    with _iteration_lock:
        _ensure_log_dir(ITERATION_STATE_PATH)
        current = 0
        if os.path.exists(ITERATION_STATE_PATH):
            try:
                with open(ITERATION_STATE_PATH, "r", encoding="utf-8") as fh:
                    data = json.load(fh)
                    current = int(data.get("current_iteration", 0))
            except Exception:
                current = 0
        next_iter = current + 1
        try:
            with open(ITERATION_STATE_PATH, "w", encoding="utf-8") as fh:
                json.dump({
                    "current_iteration": next_iter,
                    "last_updated": datetime.now(timezone.utc).isoformat()
                }, fh, indent=2)
        except Exception as e:
            import logging
            logging.getLogger(__name__).warning("Failed to save iteration state: %s", e)
        return next_iter


def get_current_iteration_number() -> int:
    """Returns current iteration number without incrementing."""
    if os.path.exists(ITERATION_STATE_PATH):
        try:
            with open(ITERATION_STATE_PATH, "r", encoding="utf-8") as fh:
                data = json.load(fh)
                return int(data.get("current_iteration", 0))
        except Exception:
            pass
    return 0


def reset_iteration_number(start: int = 1) -> int:
    """Resets the iteration counter to a specific start value."""
    with _iteration_lock:
        _ensure_log_dir(ITERATION_STATE_PATH)
        try:
            with open(ITERATION_STATE_PATH, "w", encoding="utf-8") as fh:
                json.dump({
                    "current_iteration": start - 1,
                    "last_updated": datetime.now(timezone.utc).isoformat()
                }, fh, indent=2)
        except Exception:
            pass
        return start - 1


def log_evaluation_iteration(
    iteration_number: int,
    *,
    request_uuid: str,
    topic: str,
    difficulty: str,
    language: str,
    backend: str,
    model: str,
    category_name: str = "",
    corpus_tokens: int = 0,
    chunk_count: int = 0,
    top_k: int = 3,
    timing_metrics: Dict[str, Any],
    cache_hits: int = 0,
    cache_misses: int = 0,
    hit_ratio: float = 0.0,
    n_questions_requested: int = 5,
    n_questions_generated: int = 0,
    validation_passed: int = 0,
    validation_failed: int = 0,
    retries_count: int = 0,
    questions: Optional[List[Dict[str, Any]]] = None,
    status: str = "success",
    error_message: str = "",
) -> Dict[str, Any]:
    """Logs complete evaluation data for a distinct iteration.
    
    Writes to:
    1. metrics.jsonl (event='evaluation_iteration')
    2. logs/evaluation/iterations/iteration_{iter_num:04d}.json (standalone file)
    3. logs/evaluation/iterations_index.json (fast dashboard index)
    """
    hw_snap = {}
    try:
        import psutil
        hw_snap["cpu_percent"] = psutil.cpu_percent(interval=None)
        mem = psutil.virtual_memory()
        hw_snap["ram_used_mb"] = round((mem.total - mem.available) / (1024 * 1024), 1)
        hw_snap["ram_total_mb"] = round(mem.total / (1024 * 1024), 1)
        hw_snap["ram_percent"] = mem.percent
    except Exception:
        pass

    ast_rate = round(validation_passed / max(1, n_questions_generated), 4) if n_questions_generated > 0 else (1.0 if status == "success" else 0.0)
    t_e2e = timing_metrics.get("t_e2e_ms", 0.0)
    dur_s = round(t_e2e / 1000.0, 3)
    q_per_sec = round(n_questions_generated / max(0.001, dur_s), 2) if n_questions_generated > 0 and dur_s > 0 else 0.0

    record = {
        "iteration_number": iteration_number,
        "iteration_id": f"iter_{iteration_number:04d}",
        "iteration_name": f"Iteration #{iteration_number}: {topic}",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "request_uuid": request_uuid,
        "topic": topic,
        "category_name": category_name,
        "difficulty": difficulty,
        "language": language,
        "backend": backend,
        "model": model,
        "corpus_tokens": corpus_tokens,
        "chunk_count": chunk_count,
        "top_k": top_k,
        "timings": {
            "t_extract_ms": round(timing_metrics.get("t_extract_ms", 0.0), 2),
            "t_chunk_ms": round(timing_metrics.get("t_chunk_ms", 0.0), 2),
            "t_hash_ms": round(timing_metrics.get("t_hash_ms", 0.0), 2),
            "t_lookup_ms": round(timing_metrics.get("t_lookup_ms", 0.0), 2),
            "t_embed_ms": round(timing_metrics.get("t_embed_ms", 0.0), 2),
            "t_index_ms": round(timing_metrics.get("t_index_ms", 0.0), 2),
            "t_kb_ms": round(timing_metrics.get("t_kb_ms", 0.0), 2),
            "t_query_embed_ms": round(timing_metrics.get("t_query_embed_ms", 0.0), 2),
            "t_retrieval_ms": round(timing_metrics.get("t_retrieval_ms", 0.0), 2),
            "t_prompt_ms": round(timing_metrics.get("t_prompt_ms", 0.0), 2),
            "t_llm_ms": round(timing_metrics.get("t_llm_ms", 0.0), 2),
            "t_validation_ms": round(timing_metrics.get("t_validation_ms", 0.0), 2),
            "t_retry_ms": round(timing_metrics.get("t_retry_ms", 0.0), 2),
            "t_gen_ms": round(timing_metrics.get("t_gen_ms", 0.0), 2),
            "t_e2e_ms": round(t_e2e, 2),
            "duration_s": dur_s,
            "questions_per_second": q_per_sec,
        },
        "cache": {
            "cache_hits": cache_hits,
            "cache_misses": cache_misses,
            "hit_ratio": round(hit_ratio, 4),
        },
        "validation": {
            "n_requested": n_questions_requested,
            "n_generated": n_questions_generated,
            "validation_passed": validation_passed,
            "validation_failed": validation_failed,
            "ast_pass_rate": ast_rate,
            "retries_count": retries_count,
        },
        "hardware": hw_snap,
        "questions": questions or [],
        "status": status,
        "error_message": error_message,
    }

    # 1. Append to primary metrics.jsonl
    append_metric("evaluation_iteration", record)

    # 2. Write dedicated single iteration file for zero-lag dashboard loading
    try:
        os.makedirs(ITERATIONS_DIR, exist_ok=True)
        iter_file = os.path.join(ITERATIONS_DIR, f"iteration_{iteration_number:04d}.json")
        with open(iter_file, "w", encoding="utf-8") as fh:
            json.dump(record, fh, indent=2, ensure_ascii=False)
    except Exception as ie:
        import logging
        logging.getLogger(__name__).warning("Could not write iteration file: %s", ie)

    # 3. Update iterations index
    try:
        _ensure_log_dir(ITERATIONS_INDEX_PATH)
        summary_entry = {
            "iteration_number": iteration_number,
            "iteration_id": f"iter_{iteration_number:04d}",
            "iteration_name": f"Iteration #{iteration_number}: {topic}",
            "timestamp": record["timestamp"],
            "topic": topic,
            "category_name": category_name,
            "difficulty": difficulty,
            "language": language,
            "backend": backend,
            "model": model,
            "n_questions": n_questions_generated,
            "t_e2e_ms": round(t_e2e, 2),
            "t_kb_ms": round(timing_metrics.get("t_kb_ms", 0.0), 2),
            "t_llm_ms": round(timing_metrics.get("t_llm_ms", 0.0), 2),
            "hit_ratio": round(hit_ratio, 4),
            "ast_pass_rate": ast_rate,
            "status": status,
        }

        existing_index = []
        if os.path.exists(ITERATIONS_INDEX_PATH):
            try:
                with open(ITERATIONS_INDEX_PATH, "r", encoding="utf-8") as fh:
                    existing_index = json.load(fh)
                    if not isinstance(existing_index, list):
                        existing_index = []
            except Exception:
                existing_index = []

        # Filter out if this iteration already exists, then prepend
        updated_index = [item for item in existing_index if item.get("iteration_number") != iteration_number]
        updated_index.insert(0, summary_entry)

        with open(ITERATIONS_INDEX_PATH, "w", encoding="utf-8") as fh:
            json.dump(updated_index, fh, indent=2, ensure_ascii=False)
    except Exception as idx_err:
        import logging
        logging.getLogger(__name__).warning("Could not update iterations index: %s", idx_err)

    return record


def get_all_iterations_summary(limit: int = 200) -> List[Dict[str, Any]]:
    """Returns list of iteration summaries for the dashboard selector and table."""
    if os.path.exists(ITERATIONS_INDEX_PATH):
        try:
            with open(ITERATIONS_INDEX_PATH, "r", encoding="utf-8") as fh:
                items = json.load(fh)
                if isinstance(items, list):
                    return items[:limit]
        except Exception:
            pass

    # Fallback: scan iterations directory
    results = []
    if os.path.exists(ITERATIONS_DIR):
        try:
            files = sorted(os.listdir(ITERATIONS_DIR), reverse=True)
            for fname in files:
                if fname.startswith("iteration_") and fname.endswith(".json"):
                    fpath = os.path.join(ITERATIONS_DIR, fname)
                    with open(fpath, "r", encoding="utf-8") as fh:
                        rec = json.load(fh)
                        results.append({
                            "iteration_number": rec.get("iteration_number", 0),
                            "iteration_id": rec.get("iteration_id", ""),
                            "iteration_name": rec.get("iteration_name", ""),
                            "timestamp": rec.get("timestamp", ""),
                            "topic": rec.get("topic", ""),
                            "category_name": rec.get("category_name", ""),
                            "difficulty": rec.get("difficulty", ""),
                            "language": rec.get("language", ""),
                            "backend": rec.get("backend", ""),
                            "model": rec.get("model", ""),
                            "n_questions": rec.get("validation", {}).get("n_generated", 0),
                            "t_e2e_ms": rec.get("timings", {}).get("t_e2e_ms", 0.0),
                            "t_kb_ms": rec.get("timings", {}).get("t_kb_ms", 0.0),
                            "t_llm_ms": rec.get("timings", {}).get("t_llm_ms", 0.0),
                            "hit_ratio": rec.get("cache", {}).get("hit_ratio", 0.0),
                            "ast_pass_rate": rec.get("validation", {}).get("ast_pass_rate", 1.0),
                            "status": rec.get("status", "success"),
                        })
                        if len(results) >= limit:
                            break
        except Exception:
            pass
    return results


def get_iteration_details(iteration_number: int) -> Optional[Dict[str, Any]]:
    """Loads and returns complete details for a single iteration."""
    iter_file = os.path.join(ITERATIONS_DIR, f"iteration_{iteration_number:04d}.json")
    if os.path.exists(iter_file):
        try:
            with open(iter_file, "r", encoding="utf-8") as fh:
                return json.load(fh)
        except Exception:
            pass
    return None


def get_evaluation_dashboard_stats() -> Dict[str, Any]:
    """Computes global aggregates across all recorded iterations."""
    summaries = get_all_iterations_summary(limit=1000)
    total_iterations = len(summaries)
    if total_iterations == 0:
        return {
            "total_iterations": 0,
            "total_questions": 0,
            "avg_t_e2e_ms": 0.0,
            "avg_t_kb_ms": 0.0,
            "avg_t_llm_ms": 0.0,
            "avg_ast_pass_rate": 1.0,
            "avg_hit_ratio": 0.0,
            "success_rate": 1.0,
            "latest_iteration": 0,
        }

    total_q = sum(s.get("n_questions", 0) for s in summaries)
    avg_e2e = round(sum(s.get("t_e2e_ms", 0.0) for s in summaries) / total_iterations, 2)
    avg_kb = round(sum(s.get("t_kb_ms", 0.0) for s in summaries) / total_iterations, 2)
    avg_llm = round(sum(s.get("t_llm_ms", 0.0) for s in summaries) / total_iterations, 2)
    avg_ast = round(sum(s.get("ast_pass_rate", 1.0) for s in summaries) / total_iterations, 4)
    avg_hit = round(sum(s.get("hit_ratio", 0.0) for s in summaries) / total_iterations, 4)
    successes = sum(1 for s in summaries if s.get("status") == "success")

    return {
        "total_iterations": total_iterations,
        "total_questions": total_q,
        "avg_t_e2e_ms": avg_e2e,
        "avg_t_kb_ms": avg_kb,
        "avg_t_llm_ms": avg_llm,
        "avg_ast_pass_rate": avg_ast,
        "avg_hit_ratio": avg_hit,
        "success_rate": round(successes / total_iterations, 4),
        "latest_iteration": summaries[0].get("iteration_number", 0) if summaries else 0,
    }
