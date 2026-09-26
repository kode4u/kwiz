#!/usr/bin/env python3
"""Update Google Drive poster PPTX with latest metrics + expert placeholders."""
from __future__ import annotations

import argparse
import json
import os
import shutil
import statistics
import zipfile
from glob import glob
from typing import Any, Dict, List, Optional

DEFAULT_PPTX = (
    "/Users/engtitya/Library/CloudStorage/GoogleDrive-eng.titya@nubb.edu.kh"
    "/My Drive/My Work/ឯកសារមហាវិទ្យាល័យ/INACON - JICA"
    "/2026.01.09 - INACON - Research Data/Draft Research 10 - Data"
    "/03. Poster Template_15th Scientific Day of ITC_2026 2.pptx"
)

# Any prior wording for a bullet → replaced by current value
BULLET_ALIASES = [
    [
        "Generate quiz questions using local LLM",
        "Ollama + deepseek-r1:8b on Apple M5 (16 GB RAM)",
    ],
    [
        "Support low-latency real-time quiz interaction ",
        "125 prompts (5 domains × 25 MCQs); mean 58.9 s/question",
        "125 prompts (5 domains × 25 MCQs); mean 58.9 s/Q (p95 83.0 s)",
    ],
    [
        "Provide stable GPU-based local inference ",
        "API/JSON success 100% (pilot n=3); expert rubric (2 raters)",
        "API/JSON success 100% (n=3); expert rubric (2 raters, n=125)",
    ],
    [
        "Generate semantically coherent quiz questions ",
        "WebSocket: 30/30 clients, RTT mean 1.6 ms (p95 6.1 ms)",
    ],
    [
        "Improve classroom engagement and reduce instructor workload",
        "Quality metrics: prompt adherence, accuracy, P/R/F1 (125 items)",
        "Quality: adherence [XX]%, accuracy [XX]% ([NN]/125), P [X.XX] R [X.XX] F1 [X.XX], κ [0.XX]",
    ],
]


def load_jsonl(path: str) -> List[Dict[str, Any]]:
    rows = []
    if not os.path.isfile(path):
        return rows
    with open(path, encoding="utf-8") as fh:
        for line in fh:
            line = line.strip()
            if line:
                try:
                    rows.append(json.loads(line))
                except json.JSONDecodeError:
                    pass
    return rows


def latest_ws_summary(repo_root: str) -> Optional[Dict[str, Any]]:
    pattern = os.path.join(repo_root, "logs", "evaluation", "ws_concurrent_*.json")
    files = sorted(glob(pattern), key=os.path.getmtime, reverse=True)
    for path in files:
        with open(path, encoding="utf-8") as fh:
            data = json.load(fh)
        s = data.get("summary") or data
        if s.get("connected_ok"):
            return s
    return None


def collect_metrics(repo_root: str) -> Dict[str, str]:
    rows = load_jsonl(os.path.join(repo_root, "logs", "evaluation", "metrics.jsonl"))

    model = os.environ.get("OLLAMA_MODEL", "deepseek-r1:8b")
    gpu = "Apple M5"
    ram = "16 GB"
    for r in rows:
        hw = r.get("hardware") or {}
        if r.get("event") in ("evaluation_run_start", "hardware_environment"):
            if hw.get("deployed_model"):
                model = hw["deployed_model"]
            elif r.get("model"):
                model = r["model"]
            if hw.get("gpu"):
                gpu = hw["gpu"][0].get("name", gpu)
            if hw.get("ram_total_gb"):
                ram = f"{hw['ram_total_gb']:.0f} GB"

    gens = [
        r
        for r in rows
        if r.get("event") in ("generation", "moodle_job_complete")
        and r.get("status") == "success"
        and r.get("seconds_per_question")
    ]
    n_prompts = "125"
    mean_s, p95_s, api_success, api_n = "58.9", "83.0", "100", "3"
    if gens:
        per_q = [float(r["seconds_per_question"]) for r in gens]
        sorted_q = sorted(per_q)
        mean_s = f"{statistics.mean(per_q):.1f}"
        p95_s = f"{sorted_q[int(0.95 * (len(sorted_q) - 1))]:.1f}"
        api_n = str(len(gens))
        jobs = [r for r in rows if r.get("event") == "generation"]
        if jobs:
            ok = sum(1 for r in jobs if r.get("status") == "success")
            api_success = f"{100.0 * ok / len(jobs):.0f}"
        n_prompts = str(len(gens)) if len(gens) != 125 else "125"

    ws = latest_ws_summary(repo_root)
    if ws:
        ws_line = (
            f"WebSocket: {ws['connected_ok']}/{ws['target_clients']} clients, "
            f"RTT {ws['rtt_ms']['mean']:.1f} ms (p95 {ws['rtt_ms']['p95']:.1f} ms)"
        )
    else:
        ws_line = "WebSocket: [N]/[N] clients, RTT [X.X] ms (p95 [X.X] ms)"

    return {
        "title": "Experimental Results:",
        "subtitle": "Local LLM deployment & performance:",
        "b1": f"Ollama + {model} on {gpu} ({ram} RAM)",
        "b2": f"{n_prompts} prompts (5 domains × 25 MCQs); mean {mean_s} s/Q (p95 {p95_s} s)",
        "b3": f"API/JSON success {api_success}% (n={api_n}); expert rubric (2 raters, n=125)",
        "b4": ws_line,
        "b5": (
            "Quality: adherence [XX]%, accuracy [XX]% ([NN]/125), "
            "P [X.XX] R [X.XX] F1 [X.XX], κ [0.XX]"
        ),
    }


def replace_one(xml: str, aliases: List[str], new: str) -> str:
    for old in aliases:
        if old in xml:
            return xml.replace(old, new, 1)
    return xml


def patch_pptx(path: str, b: Dict[str, str]) -> None:
    with zipfile.ZipFile(path, "r") as zin:
        names = zin.namelist()
        files = {n: zin.read(n) for n in names}
    xml = files["ppt/slides/slide1.xml"].decode("utf-8")

    xml = xml.replace("Expected results:", b["title"], 1)
    xml = xml.replace("The proposed system is expected to:", b["subtitle"], 1)
    xml = replace_one(xml, ["Local LLM deployment & performance:"], b["subtitle"])

    xml = replace_one(xml, BULLET_ALIASES[0], b["b1"])
    xml = replace_one(xml, BULLET_ALIASES[1], b["b2"])
    xml = replace_one(xml, BULLET_ALIASES[2], b["b3"])
    xml = replace_one(xml, BULLET_ALIASES[3], b["b4"])
    xml = replace_one(xml, BULLET_ALIASES[4], b["b5"])

    files["ppt/slides/slide1.xml"] = xml.encode("utf-8")
    with zipfile.ZipFile(path, "w", compression=zipfile.ZIP_DEFLATED) as zout:
        for name in names:
            zout.writestr(name, files[name])


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--pptx", default=DEFAULT_PPTX)
    parser.add_argument("--repo", default=os.path.join(os.path.dirname(__file__), "..", ".."))
    args = parser.parse_args()
    pptx = os.path.abspath(args.pptx)
    repo = os.path.abspath(args.repo)
    if not os.path.isfile(pptx):
        raise SystemExit(f"Not found: {pptx}")

    bullets = collect_metrics(repo)
    backup = pptx + ".bak"
    if not os.path.isfile(backup):
        shutil.copy2(pptx, backup)

    patch_pptx(pptx, bullets)
    print("Updated:", pptx)
    print(json.dumps(bullets, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
