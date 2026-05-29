#!/usr/bin/env python3
"""Append JSONL lines to evaluation metrics log."""
from __future__ import annotations

import json
import os
from datetime import datetime, timezone
from typing import Any, Dict, Optional


def default_log_path() -> str:
    repo_root = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
    return os.environ.get(
        "METRICS_LOG_PATH",
        os.path.join(repo_root, "logs", "evaluation", "metrics.jsonl"),
    )


def append_event(
    event: str,
    data: Optional[Dict[str, Any]] = None,
    log_path: Optional[str] = None,
) -> None:
    path = log_path or default_log_path()
    directory = os.path.dirname(path)
    if directory:
        os.makedirs(directory, exist_ok=True)
    row = {
        "event": event,
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "source": "batch_evaluation",
    }
    if data:
        row.update(data)
    with open(path, "a", encoding="utf-8") as fh:
        fh.write(json.dumps(row, ensure_ascii=False) + "\n")
