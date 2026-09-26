#!/usr/bin/env python3
"""
Evaluate LLM API /generate latency for research publication.
Uses urllib (stdlib) only — no pip dependencies required.
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
from typing import Any, Dict, List


def percentile(sorted_vals: List[float], p: float) -> float:
    if not sorted_vals:
        return float("nan")
    k = (len(sorted_vals) - 1) * p / 100.0
    f = int(k)
    c = min(f + 1, len(sorted_vals) - 1)
    if f == c:
        return sorted_vals[f]
    return sorted_vals[f] + (sorted_vals[c] - sorted_vals[f]) * (k - f)


def post_generate(url: str, payload: Dict[str, Any], timeout: int) -> tuple[float, int, str]:
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
            return elapsed_ms, resp.status, body
    except urllib.error.HTTPError as e:
        elapsed_ms = (time.perf_counter() - t0) * 1000.0
        body = e.read().decode("utf-8", errors="replace") if e.fp else ""
        return elapsed_ms, e.code, body
    except Exception as e:
        elapsed_ms = (time.perf_counter() - t0) * 1000.0
        return elapsed_ms, -1, str(e)


def main() -> int:
    parser = argparse.ArgumentParser(description="Measure /generate latency")
    parser.add_argument(
        "--base-url",
        default=os.environ.get("LLMAPI_URL", "http://localhost:5001"),
        help="LLM API base URL (no trailing slash)",
    )
    parser.add_argument("--runs", type=int, default=10, help="Number of successful runs to collect")
    parser.add_argument("--warmup", type=int, default=1, help="Warmup requests (not counted)")
    parser.add_argument("--n-questions", type=int, default=1, help="n_questions in payload")
    parser.add_argument("--backend", default="local", choices=["local", "openai", "gemini"])
    parser.add_argument("--topic", default="Sample topic for evaluation")
    parser.add_argument("--level", default="medium")
    parser.add_argument("--language", default="en")
    parser.add_argument("--model", default="", help="Optional model override for local backend")
    parser.add_argument("--timeout", type=int, default=300, help="HTTP timeout seconds")
    parser.add_argument("--json", action="store_true", help="Print JSON summary only")
    parser.add_argument(
        "--quiet",
        action="store_true",
        help="Suppress progress lines (still prints errors to stderr)",
    )
    args = parser.parse_args()

    url = args.base_url.rstrip("/") + "/generate"
    payload: Dict[str, Any] = {
        "topic": args.topic,
        "level": args.level,
        "n_questions": args.n_questions,
        "language": args.language,
        "backend": args.backend,
    }
    if args.model:
        payload["model"] = args.model

    def log(msg: str) -> None:
        if not args.json and not args.quiet:
            print(msg, flush=True)

    log(f"POST {url}")
    log(
        "Local LLM /generate can take **minutes per request** (model load + inference). "
        f"This will do {args.warmup} warmup(s) + up to {args.runs} successful measurements."
    )
    log("If nothing prints for a while, the first request is still running — wait or Ctrl+C.\n")

    for w in range(args.warmup):
        log(f"Warmup {w + 1}/{args.warmup} ... (no output until HTTP completes)")
        t0 = time.perf_counter()
        ms, code, body = post_generate(url, payload, args.timeout)
        elapsed_s = (time.perf_counter() - t0)
        if code == 200:
            log(f"  Warmup done in {elapsed_s:.1f}s ({ms:.0f} ms client-reported)\n")
        else:
            log(f"  Warmup FAILED HTTP {code}: {body[:300]}\n")
            print("ERROR: Warmup failed. Is Ollama running? Is llmapi up? Try: curl http://localhost:5001/health", file=sys.stderr)
            return 1

    latencies_ms: List[float] = []
    errors: List[str] = []

    attempt = 0
    while len(latencies_ms) < args.runs and attempt < args.runs * 3:
        attempt += 1
        n = len(latencies_ms) + 1
        log(f"Measurement {n}/{args.runs} (attempt {attempt}) ...")
        ms, code, body = post_generate(url, payload, args.timeout)
        if code == 200:
            latencies_ms.append(ms)
            log(f"  OK in {ms / 1000.0:.2f}s\n")
        else:
            err = f"attempt {attempt}: HTTP {code} — {body[:200]}"
            errors.append(err)
            log(f"  FAILED: {err}\n")

    if len(latencies_ms) < args.runs:
        print("ERROR: Not enough successful runs.", file=sys.stderr)
        for e in errors[:5]:
            print(e, file=sys.stderr)
        return 1

    latencies_ms.sort()
    mean = statistics.mean(latencies_ms)
    stdev = statistics.stdev(latencies_ms) if len(latencies_ms) > 1 else 0.0

    summary = {
        "endpoint": url,
        "runs": len(latencies_ms),
        "payload": payload,
        "latency_ms": {
            "mean": round(mean, 2),
            "stdev": round(stdev, 2),
            "min": round(latencies_ms[0], 2),
            "max": round(latencies_ms[-1], 2),
            "p50": round(percentile(latencies_ms, 50), 2),
            "p95": round(percentile(latencies_ms, 95), 2),
            "p99": round(percentile(latencies_ms, 99), 2),
        },
        "latency_s_per_request": {
            "mean": round(mean / 1000.0, 3),
            "p95": round(percentile(latencies_ms, 95) / 1000.0, 3),
        },
        "errors": errors,
    }

    if args.json:
        print(json.dumps(summary, indent=2))
        return 0

    print("LLM /generate latency evaluation")
    print("=" * 50)
    print(f"URL: {url}")
    print(f"Runs (success): {summary['runs']}")
    print(json.dumps(payload, indent=2))
    print()
    print("Latency (ms):", summary["latency_ms"])
    print("Latency (s), mean / p95 per request:", summary["latency_s_per_request"])
    return 0


if __name__ == "__main__":
    sys.exit(main())
