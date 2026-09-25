#!/usr/bin/env python3
"""
Compile empirical physical results from E2, E3, and E4 into formatted paper tables.
Reads:
- evaluate/e2_pipeline_ablation/ablation_results.jsonl
- evaluate/e3_corpus_scale/corpus_scale_results.jsonl
- evaluate/e4_concurrent_generation/concurrency_envelope_results.jsonl
Outputs markdown and LaTeX formatted tables.
"""

import os
import json
import statistics
from collections import defaultdict

def compile_e1():
    path = os.path.join(os.path.dirname(__file__), "e1_expert_validation", "e1_quality_validation_results.md")
    if not os.path.isfile(path):
        print(f"[INFO] E1 results not yet compiled at {path}")
        return

    print("\n" + "="*80)
    print("TABLE 1: Expert Quality Validation & Inter-Rater Agreement (E1)")
    print("="*80)
    with open(path, "r", encoding="utf-8") as f:
        in_table = False
        for line in f:
            if "Table 1:" in line:
                in_table = True
                continue
            if in_table:
                if line.startswith("###") or (line.strip() == "" and in_table and "---" not in line):
                    if line.startswith("###"):
                        break
                print(line.rstrip())

def compile_e2():
    path = os.path.join(os.path.dirname(__file__), "e2_pipeline_ablation", "ablation_results.jsonl")
    if not os.path.isfile(path):
        print(f"[WARN] E2 results not found at {path}")
        return

    data = defaultdict(lambda: {"t_kb": [], "t_gen": [], "t_e2e": [], "hit_ratio": [], "ast": []})
    with open(path, "r", encoding="utf-8") as f:
        for line in f:
            if not line.strip():
                continue
            r = json.loads(line)
            cfg = r["config"]
            data[cfg]["t_kb"].append(r["t_kb_ms"])
            data[cfg]["t_gen"].append(r["t_gen_ms"])
            data[cfg]["t_e2e"].append(r["t_e2e_ms"])
            data[cfg]["hit_ratio"].append(r.get("cache_hit_ratio", 0.0))
            data[cfg]["ast"].append(r.get("syntax_valid_rate", 100.0))

    print("\n" + "="*80)
    print("TABLE 2: Empirical Pipeline Ablation Results (Physical Measurements)")
    print("="*80)
    print(f"| {'Configuration':<35} | {'T_KB (ms)':<15} | {'T_gen (ms)':<15} | {'T_E2E (ms)':<15} | {'Cache Hit %':<12} | {'Syntax AST %':<12} |")
    print(f"|{'-'*37}|{'-'*17}|{'-'*17}|{'-'*17}|{'-'*14}|{'-'*14}|")

    for cfg, vals in data.items():
        kb_mean = statistics.mean(vals["t_kb"])
        kb_std = statistics.stdev(vals["t_kb"]) if len(vals["t_kb"]) > 1 else 0.0
        gen_mean = statistics.mean(vals["t_gen"])
        gen_std = statistics.stdev(vals["t_gen"]) if len(vals["t_gen"]) > 1 else 0.0
        e2e_mean = statistics.mean(vals["t_e2e"])
        e2e_std = statistics.stdev(vals["t_e2e"]) if len(vals["t_e2e"]) > 1 else 0.0
        hit_pct = statistics.mean(vals["hit_ratio"]) * 100.0
        ast_pct = statistics.mean(vals["ast"])

        print(f"| {cfg:<35} | {kb_mean:7.1f} ± {kb_std:4.1f} | {gen_mean:7.1f} ± {gen_std:4.1f} | {e2e_mean:7.1f} ± {e2e_std:4.1f} | {hit_pct:10.1f}% | {ast_pct:10.1f}% |")

def compile_e3():
    path = os.path.join(os.path.dirname(__file__), "e3_corpus_scale", "corpus_scale_results.jsonl")
    if not os.path.isfile(path):
        print(f"[WARN] E3 results not found at {path}")
        return

    matrix = defaultdict(dict)
    with open(path, "r", encoding="utf-8") as f:
        for line in f:
            if not line.strip():
                continue
            r = json.loads(line)
            matrix[r["scale"]][r["update_label"]] = r

    print("\n" + "="*80)
    print("TABLE 3: Knowledge Base Indexing Latency Under Incremental Updates (Authentic Data)")
    print("="*80)
    print(f"| {'Curriculum Scope':<25} | {'Chunks':<8} | {'U0 (0% Change)':<15} | {'U10 (10%)':<12} | {'U25 (25%)':<12} | {'U50 (50%)':<12} | {'U100 (Rebuild)':<15} | {'Speedup':<10} |")
    print(f"|{'-'*27}|{'-'*10}|{'-'*17}|{'-'*14}|{'-'*14}|{'-'*14}|{'-'*17}|{'-'*12}|")

    for scale, updates in matrix.items():
        if "U0" not in updates:
            continue
        desc = updates["U0"].get("scale_desc", scale)
        chunks = updates["U0"]["total_chunks"]
        u0 = updates.get("U0", {}).get("t_kb_ms", 0.0)
        u10 = updates.get("U10", {}).get("t_kb_ms", 0.0)
        u25 = updates.get("U25", {}).get("t_kb_ms", 0.0)
        u50 = updates.get("U50", {}).get("t_kb_ms", 0.0)
        u100 = updates.get("U100", {}).get("t_kb_ms", 0.0)
        speedup = u100 / max(0.01, u0)

        print(f"| {desc:<25} | {chunks:<8} | {u0:13.2f} ms | {u10:10.1f} ms | {u25:10.1f} ms | {u50:10.1f} ms | {u100:13.1f} ms | {speedup:8.1f}× |")

def compile_e4():
    path = os.path.join(os.path.dirname(__file__), "e4_concurrent_generation", "concurrency_envelope_results.jsonl")
    if not os.path.isfile(path):
        print(f"[WARN] E4 results not found at {path}")
        return

    print("\n" + "="*80)
    print("TABLE 4: System Performance and Resource Envelope Under Concurrent Load")
    print("="*80)
    print(f"| {'Concurrency':<12} | {'Throughput (Q/s)':<18} | {'P50 (sec)':<12} | {'P95 (sec)':<12} | {'Success %':<10} | {'GPU Util %':<12} | {'VRAM (GB)':<12} |")
    print(f"|{'-'*14}|{'-'*20}|{'-'*14}|{'-'*14}|{'-'*12}|{'-'*14}|{'-'*14}|")

    with open(path, "r", encoding="utf-8") as f:
        for line in f:
            if not line.strip():
                continue
            r = json.loads(line)
            c = r["concurrency"]
            qps = r["throughput_questions_per_sec"]
            p50 = r["latency_p50_sec"]
            p95 = r["latency_p95_sec"]
            succ = r["success_rate_percent"]
            gpu = r.get("gpu_util_percent", 0.0)
            vram = r.get("vram_used_gb", 0.0)

            print(f"| C = {c:<8} | {qps:16.2f} | {p50:10.2f} | {p95:10.2f} | {succ:8.1f}% | {gpu:10.1f}% | {vram:10.2f} |")

def main():
    compile_e1()
    compile_e2()
    compile_e3()
    compile_e4()

if __name__ == "__main__":
    main()
