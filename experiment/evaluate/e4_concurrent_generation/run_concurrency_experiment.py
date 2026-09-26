#!/usr/bin/env python3
"""
Experiment 4 (E4): Concurrent Generation & Single-GPU Operating Envelope (Strict Physical Mode).
Tests concurrency levels C in {1, 2, 5, 10, 20} simultaneous instructor generation requests.
Measures:
- Latency percentiles: P50 (median), P95, P99, Max latency
- Aggregate throughput: Questions/sec (Q/s) and Requests/min
- System resource saturation (GPU VRAM peak, GPU compute % avg, RAM, CPU)
- Error and timeout rates

ZERO mock, ZERO sleep, ZERO synthetic calculation.
All requests are submitted concurrently over HTTP and hardware metrics are sampled live via nvidia-smi.
"""

import os
import sys
import json
import time
import math
import argparse
from concurrent.futures import ThreadPoolExecutor, as_completed
import requests

try:
    from system_resource_monitor import SystemResourceMonitor
except ImportError:
    sys.path.append(os.path.dirname(os.path.abspath(__file__)))
    from system_resource_monitor import SystemResourceMonitor

CONCURRENCY_LEVELS = [1, 2, 5, 10, 20]

AUTHENTIC_TOPICS = [
    "Python Installation and Setup",
    "Python Programming Introduction",
    "Python Data Structures",
    "Python Conditional Statements",
    "Python For and While Loops",
    "Python Functions"
]

def load_authentic_course_corpus() -> str:
    base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    extracted_corpus = os.path.join(base_dir, "data", "extracted", "full_course_corpus.txt")
    if not os.path.isfile(extracted_corpus):
        raise FileNotFoundError(f"Authentic course corpus not found at {extracted_corpus}. Run data/extract_courses.py first.")
    with open(extracted_corpus, "r", encoding="utf-8") as f:
        return f.read()

def execute_single_request(client_id: int, topic: str, api_url: str, backend: str, course_text: str, questions_count: int = 1) -> dict:
    t_start = time.perf_counter()
    payload = {
        "topic": topic,
        "level": "medium",
        "n_questions": questions_count,
        "backend": backend,
        "context": course_text,
        "pipeline_mode": "INACON",
        "enable_incremental_cache": True,
        "top_k": 3
    }

    try:
        resp = requests.post(
            f"{api_url}/generate",
            json=payload,
            timeout=600
        )
        elapsed = time.perf_counter() - t_start

        if resp.status_code == 200:
            data = resp.json()
            qs = data.get("questions", [])
            return {
                "client_id": client_id,
                "latency_sec": round(elapsed, 3),
                "questions_count": len(qs),
                "status": "success",
                "error": None
            }
        else:
            return {
                "client_id": client_id,
                "latency_sec": round(elapsed, 3),
                "questions_count": 0,
                "status": "error",
                "error": f"HTTP {resp.status_code}: {resp.text[:150]}"
            }
    except Exception as exc:
        elapsed = time.perf_counter() - t_start
        return {
            "client_id": client_id,
            "latency_sec": round(elapsed, 3),
            "questions_count": 0,
            "status": "error",
            "error": str(exc)
        }

def calculate_percentiles(values: list[float]) -> dict:
    if not values:
        return {"p50": 0.0, "p95": 0.0, "p99": 0.0, "max": 0.0, "mean": 0.0}
    sorted_vals = sorted(values)
    n = len(sorted_vals)

    def p(perc):
        k = (n - 1) * (perc / 100.0)
        f = math.floor(k)
        c = math.ceil(k)
        if f == c:
            return sorted_vals[int(k)]
        d0 = sorted_vals[int(f)] * (c - k)
        d1 = sorted_vals[int(c)] * (k - f)
        return d0 + d1

    return {
        "p50": round(p(50), 2),
        "p95": round(p(95), 2),
        "p99": round(p(99), 2),
        "max": round(max(sorted_vals), 2),
        "mean": round(sum(sorted_vals) / n, 2)
    }

def run_concurrency_batch(
    c: int,
    api_url: str,
    backend: str,
    course_text: str,
    monitor: SystemResourceMonitor,
    questions_per_req: int = 1
) -> dict:
    print(f"\n=================== Concurrency C = {c} Concurrent Clients ===================")
    t_start_epoch = time.time()
    batch_start = time.perf_counter()

    results = []
    with ThreadPoolExecutor(max_workers=c) as executor:
        futures = []
        for i in range(c):
            topic = AUTHENTIC_TOPICS[i % len(AUTHENTIC_TOPICS)]
            f = executor.submit(
                execute_single_request,
                i,
                topic,
                api_url,
                backend,
                course_text,
                questions_per_req
            )
            futures.append(f)

        for f in as_completed(futures):
            res = f.result()
            results.append(res)
            print(f"  [Client {res['client_id']:2d}] Finished in {res['latency_sec']:6.2f}s ({res['status']})")

    batch_duration = time.perf_counter() - batch_start
    t_end_epoch = time.time()

    successful = [r for r in results if r["status"] == "success"]
    failed = [r for r in results if r["status"] != "success"]
    latencies = [r["latency_sec"] for r in successful]
    total_questions = sum(r["questions_count"] for r in successful)

    pcts = calculate_percentiles(latencies)
    throughput_qps = total_questions / batch_duration if batch_duration > 0 else 0.0
    throughput_rpm = (len(successful) / batch_duration) * 60.0 if batch_duration > 0 else 0.0

    # Retrieve live telemetry measured by nvidia-smi & psutil during this batch
    telemetry = monitor.get_interval_metrics(t_start_epoch, t_end_epoch)

    summary = {
        "concurrency": c,
        "total_requests": c,
        "successful_requests": len(successful),
        "failed_requests": len(failed),
        "success_rate_percent": round((len(successful) / c) * 100.0, 1),
        "batch_duration_sec": round(batch_duration, 2),
        "throughput_questions_per_sec": round(throughput_qps, 2),
        "throughput_requests_per_min": round(throughput_rpm, 1),
        "latency_p50_sec": pcts["p50"],
        "latency_p95_sec": pcts["p95"],
        "latency_p99_sec": pcts["p99"],
        "latency_max_sec": pcts["max"],
        "latency_mean_sec": pcts["mean"],
        "gpu_util_percent": telemetry["gpu_util_avg"],
        "vram_used_gb": telemetry["vram_used_peak_gb"],
        "cpu_util_percent": telemetry["cpu_util_avg"],
        "ram_used_gb": telemetry["ram_used_avg_gb"],
        "individual_results": results
    }

    print(f"\n[SUMMARY C={c}] Duration: {batch_duration:.1f}s | Throughput: {throughput_qps:.2f} Q/s | P50: {pcts['p50']}s | P95: {pcts['p95']}s | GPU: {telemetry['gpu_util_avg']}% | VRAM: {telemetry['vram_used_peak_gb']} GB")
    return summary

def main():
    parser = argparse.ArgumentParser(description="Run Strict Physical E4 Concurrency Experiment")
    parser.add_argument("--api-url", default="http://localhost:5001", help="LLM API base URL")
    parser.add_argument("--backend", default="local", help="Backend (must be 'local' for physical GPU run)")
    parser.add_argument("--questions-per-req", type=int, default=1, help="Questions per request (default: 1)")
    parser.add_argument("--output", default="concurrency_envelope_results.jsonl", help="Output JSONL path")
    args = parser.parse_args()

    course_text = load_authentic_course_corpus()
    print(f"[DATA] Loaded authentic course corpus ({len(course_text):,} chars).")

    base_dir = os.path.dirname(os.path.abspath(__file__))
    out_file = os.path.join(base_dir, args.output)
    resource_csv = os.path.join(base_dir, "system_resources.csv")

    monitor = SystemResourceMonitor(output_csv=resource_csv, interval_sec=1.0)
    monitor.start()

    print("=== Running Strict Physical Experiment 4: Concurrent Generation Operating Envelope ===")
    print(f"Target: {args.api_url} | Backend: {args.backend} | Concurrency Tiers: {CONCURRENCY_LEVELS}")

    summaries = []
    try:
        with open(out_file, "w", encoding="utf-8") as f:
            for c in CONCURRENCY_LEVELS:
                summary = run_concurrency_batch(
                    c,
                    args.api_url,
                    args.backend,
                    course_text,
                    monitor,
                    questions_per_req=args.questions_per_req
                )
                summaries.append(summary)
                f.write(json.dumps(summary, ensure_ascii=False) + "\n")
                f.flush()
    finally:
        monitor.stop()

    print(f"\n[OK] Physical concurrency benchmark completed.")
    print(f"Envelope results written to: {out_file}")
    print(f"Continuous physical telemetry written to: {resource_csv}")

if __name__ == "__main__":
    main()
