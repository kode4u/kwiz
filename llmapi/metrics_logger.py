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

METRICS_LOG_PATH = os.getenv(
    "METRICS_LOG_PATH",
    os.path.join(os.path.dirname(os.path.dirname(__file__)), "logs", "evaluation", "metrics.jsonl"),
)


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
