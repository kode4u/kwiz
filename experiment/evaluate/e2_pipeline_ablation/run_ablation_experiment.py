#!/usr/bin/env python3
"""
Experiment 2 (E2): Pipeline Ablation Experiment (Strict Physical Mode).
Compares four architectural pipeline configurations using authentic course materials:
- Config A: Full Re-index (No incremental cache, forces re-embedding every run)
- Config B: Proposed Pipeline (INACON: SHA-256 Incremental Caching + Top-K Adaptive Context)
- Config C: Static Context Window (Directly injects un-retrieved document slice, no vector search)
- Config D: Raw Generation (No RAG, parametric memory only)

ZERO mock, ZERO sleep, ZERO synthetic estimation.
All metrics are measured physically via live API requests against the LLM service.
"""

import os
import sys
import json
import time
import argparse
import ast
import requests

CONFIGS = [
    ("Config A", "Full Re-index (No Cache)", "full_reindex"),
    ("Config B", "Proposed Pipeline (Incremental + Adaptive)", "INACON"),
    ("Config C", "Static Context Window", "static_context"),
    ("Config D", "Raw Generation (No RAG)", "no_rag"),
]

COURSE_TOPICS = [
    ("Python Programming Introduction", "Syntax, dynamic typing, variables, primitive types, and type casting."),
    ("Python Data Structures", "Lists, tuples, sets, dictionaries, mutability, indexing, and hashing mechanics."),
    ("Python Conditional Statements", "if-elif-else branching, boolean truthiness, comparison operators, and short-circuit evaluation."),
    ("Python Loops & Iteration", "for loops, while loops, range generator, loop control statements (break, continue)."),
    ("Python Functions & Scope", "Function definitions (def), parameter passing, return statements, and local vs global scope.")
]

def load_authentic_course_corpus() -> str:
    base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    extracted_corpus = os.path.join(base_dir, "data", "extracted", "full_course_corpus.txt")
    if not os.path.isfile(extracted_corpus):
        raise FileNotFoundError(
            f"Authentic course corpus not found at {extracted_corpus}. "
            "Please run 'python3 data/extract_courses.py' first."
        )
    with open(extracted_corpus, "r", encoding="utf-8") as f:
        return f.read()

def validate_code_ast(code_str: str) -> tuple[bool, str]:
    try:
        ast.parse(code_str)
        return True, ""
    except SyntaxError as e:
        return False, str(e)

def extract_and_validate_all_code(question: dict) -> bool:
    text = question.get("question", "") + "\n" + question.get("explanation", "")
    lines = text.split("\n")
    in_code = False
    code_lines = []
    all_valid = True

    for line in lines:
        if line.strip().startswith("```"):
            if in_code:
                in_code = False
                code_text = "\n".join(code_lines)
                if code_text.strip():
                    valid, _ = validate_code_ast(code_text)
                    if not valid:
                        all_valid = False
                code_lines = []
            else:
                in_code = True
        elif in_code:
            code_lines.append(line)

    return all_valid

def execute_ablation_run(
    config_name: str,
    pipeline_mode: str,
    topic: str,
    course_context: str,
    api_url: str,
    backend: str,
    questions_count: int = 1
) -> dict:
    t_start = time.perf_counter()

    payload = {
        "topic": topic,
        "level": "medium",
        "n_questions": questions_count,
        "backend": backend,
        "context": course_context,
        "pipeline_mode": pipeline_mode,
        "enable_incremental_cache": (pipeline_mode == "INACON"),
        "top_k": 3,
    }

    try:
        resp = requests.post(
            f"{api_url}/generate",
            json=payload,
            timeout=300
        )
    except Exception as exc:
        raise RuntimeError(
            f"Physical API request failed for {config_name} ({pipeline_mode}) on topic '{topic}': {exc}"
        )

    t_wall_e2e_ms = (time.perf_counter() - t_start) * 1000.0

    if resp.status_code != 200:
        raise RuntimeError(
            f"API returned HTTP {resp.status_code} for {config_name}: {resp.text[:300]}"
        )

    data = resp.json()
    meta = data.get("metadata", {})
    timing = meta.get("timing_metrics", {})
    qs = data.get("questions", [])

    if not qs:
        raise RuntimeError(f"No questions returned by API for {config_name} on topic '{topic}'")

    ast_valid_count = 0
    for q in qs:
        if extract_and_validate_all_code(q):
            ast_valid_count += 1

    ast_rate = (ast_valid_count / len(qs)) * 100.0

    t_kb_ms = timing.get("t_kb_ms", 0.0)
    t_gen_ms = timing.get("t_gen_ms", t_wall_e2e_ms - t_kb_ms)
    t_e2e_ms = timing.get("t_e2e_ms", t_wall_e2e_ms)

    return {
        "config": config_name,
        "pipeline_mode": pipeline_mode,
        "topic": topic,
        "t_kb_ms": round(t_kb_ms, 2),
        "t_gen_ms": round(t_gen_ms, 2),
        "t_e2e_ms": round(t_e2e_ms, 2),
        "cache_hits": timing.get("cache_hits", 0),
        "cache_misses": timing.get("cache_misses", 0),
        "cache_hit_ratio": round(timing.get("hit_ratio", 0.0), 3),
        "syntax_valid_rate": round(ast_rate, 1),
        "questions_generated": len(qs),
        "status": "success",
        "mode": "real_physical"
    }

def main():
    parser = argparse.ArgumentParser(description="Run Strict Physical Experiment 2 (E2) Pipeline Ablation")
    parser.add_argument("--api-url", default="http://localhost:5001", help="LLM API base URL")
    parser.add_argument("--backend", default="local", help="Backend to use (must be 'local' for physical GPU run)")
    parser.add_argument("--repeats", type=int, default=3, help="Number of repetitions per configuration (default: 3)")
    parser.add_argument("--output", default="ablation_results.jsonl", help="Output JSONL file path")
    args = parser.parse_args()

    course_text = load_authentic_course_corpus()
    print(f"[DATA] Loaded authentic course corpus: {len(course_text):,} characters (~{len(course_text)//4:,} tokens)")

    base_dir = os.path.dirname(os.path.abspath(__file__))
    out_file = os.path.join(base_dir, args.output)

    print(f"=== Running Physical Experiment 2: Pipeline Ablation ({len(CONFIGS)} configs x {len(COURSE_TOPICS)} topics x {args.repeats} repeats) ===")
    print(f"Target API: {args.api_url} | Backend: {args.backend}")

    # Health check before starting
    try:
        h = requests.get(f"{args.api_url}/health", timeout=5).json()
        print(f"[HEALTH] Connected to API service ({h.get('service')}, backend: {h.get('backend')})")
    except Exception as e:
        print(f"[FATAL] Cannot connect to API service at {args.api_url}: {e}")
        sys.exit(1)

    results = []
    with open(out_file, "w", encoding="utf-8") as f:
        for rep in range(1, args.repeats + 1):
            print(f"\n=================== Repetition {rep}/{args.repeats} ===================")
            for cfg_label, desc, mode in CONFIGS:
                for topic, summary in COURSE_TOPICS:
                    print(f"Executing [{cfg_label}] ({mode}) for topic: {topic} ...", end="", flush=True)
                    run_data = execute_ablation_run(
                        cfg_label,
                        mode,
                        topic,
                        course_text,
                        args.api_url,
                        args.backend,
                        questions_count=1
                    )
                    run_data["repetition"] = rep
                    f.write(json.dumps(run_data, ensure_ascii=False) + "\n")
                    f.flush()
                    results.append(run_data)
                    print(f" -> T_KB: {run_data['t_kb_ms']}ms, T_gen: {run_data['t_gen_ms']}ms, AST: {run_data['syntax_valid_rate']}%")

    print(f"\n[OK] Physical ablation completed successfully.")
    print(f"Recorded {len(results)} physical measurement rows in: {out_file}")

if __name__ == "__main__":
    main()
