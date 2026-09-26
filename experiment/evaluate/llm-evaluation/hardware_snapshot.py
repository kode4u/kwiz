#!/usr/bin/env python3
"""Collect hardware / runtime environment for LLM evaluation logs."""
from __future__ import annotations

import json
import os
import platform
import socket
import subprocess
import sys
from typing import Any, Dict, List


def _run(cmd: List[str], timeout: int = 8) -> str:
    try:
        out = subprocess.run(cmd, capture_output=True, text=True, timeout=timeout)
        if out.returncode == 0:
            return out.stdout.strip()
    except (OSError, subprocess.SubprocessError):
        pass
    return ""


def collect_hardware(
    local_llm_url: str = "",
    model: str = "",
    backend: str = "local",
) -> Dict[str, Any]:
    snap: Dict[str, Any] = {
        "hostname": socket.gethostname(),
        "os": platform.platform(),
        "os_release": platform.release(),
        "machine": platform.machine(),
        "python_version": platform.python_version(),
        "cpu_model": platform.processor() or _run(["sysctl", "-n", "machdep.cpu.brand_string"]) or "unknown",
        "cpu_count_logical": os.cpu_count(),
        "ram_total_gb": None,
        "gpu": [],
        "llm_framework": "Ollama" if backend == "local" else backend,
        "llm_backend": backend,
        "deployed_model": model or os.environ.get("OLLAMA_MODEL", ""),
        "local_llm_url": local_llm_url or os.environ.get("LOCAL_LLM_URL", "http://localhost:11434"),
        "ollama_models": [],
    }

    # macOS RAM
    mem = _run(["sysctl", "-n", "hw.memsize"])
    if mem.isdigit():
        snap["ram_total_gb"] = round(int(mem) / (1024**3), 2)

    # Linux RAM
    if snap["ram_total_gb"] is None and os.path.exists("/proc/meminfo"):
        try:
            with open("/proc/meminfo", encoding="utf-8") as fh:
                for line in fh:
                    if line.startswith("MemTotal:"):
                        kb = int(line.split()[1])
                        snap["ram_total_gb"] = round(kb / (1024 * 1024), 2)
                        break
        except OSError:
            pass

    nvidia = _run(
        ["nvidia-smi", "--query-gpu=name,memory.total", "--format=csv,noheader"]
    )
    if nvidia:
        for line in nvidia.splitlines():
            parts = [p.strip() for p in line.split(",")]
            snap["gpu"].append({"name": parts[0], "vram": parts[1] if len(parts) > 1 else ""})

    # macOS: no nvidia-smi — use Apple Silicon note
    if not snap["gpu"] and sys.platform == "darwin":
        chip = _run(["sysctl", "-n", "machdep.cpu.brand_string"]) or platform.processor()
        snap["gpu"].append({"name": chip or "Apple Silicon (integrated)", "vram": "shared system RAM"})

    for env, key in (
        ("EVAL_GPU", "gpu_reported"),
        ("EVAL_CPU", "cpu_reported"),
        ("EVAL_RAM_GB", "ram_reported_gb"),
        ("EVAL_OS", "os_reported"),
    ):
        val = os.environ.get(env, "").strip()
        if val:
            snap[key] = val

    url = snap["local_llm_url"].rstrip("/")
    if url:
        try:
            import urllib.request

            with urllib.request.urlopen(f"{url}/api/tags", timeout=10) as resp:
                data = json.loads(resp.read().decode("utf-8"))
                snap["ollama_models"] = [
                    m.get("name") for m in (data.get("models") or []) if m.get("name")
                ]
        except Exception:
            pass

    return snap


def poster_table_markdown(snap: Dict[str, Any]) -> str:
    gpu = snap.get("gpu_reported") or (
        snap["gpu"][0]["name"] + " " + snap["gpu"][0].get("vram", "")
        if snap.get("gpu")
        else "N/A"
    )
    cpu = snap.get("cpu_reported") or snap.get("cpu_model") or "N/A"
    ram = snap.get("ram_reported_gb") or snap.get("ram_total_gb") or "N/A"
    osname = snap.get("os_reported") or snap.get("os") or "N/A"
    rows = [
        ("GPU", gpu),
        ("CPU", cpu),
        ("RAM", f"{ram} GB" if ram != "N/A" else "N/A"),
        ("OS", osname),
        ("LLM runtime", snap.get("llm_framework", "Ollama")),
        ("Model", snap.get("deployed_model") or "N/A"),
    ]
    lines = ["| Item | Specification |", "|------|---------------|"]
    for k, v in rows:
        lines.append(f"| {k} | {v} |")
    return "\n".join(lines)


if __name__ == "__main__":
    snap = collect_hardware(
        os.environ.get("LOCAL_LLM_URL", "http://localhost:11434"),
        os.environ.get("OLLAMA_MODEL", ""),
        os.environ.get("LLM_BACKEND", "local"),
    )
    print(json.dumps(snap, indent=2))
    print()
    print(poster_table_markdown(snap))
