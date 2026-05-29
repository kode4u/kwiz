#!/usr/bin/env python3
"""Build empty expert rating CSVs from logs/evaluation/questions_export.json."""
from __future__ import annotations

import argparse
import csv
import json
import os
from typing import Any, Dict, List

RATING_COLUMNS = [
    "item_id",
    "domain",
    "subtopic",
    "topic",
    "difficulty",
    "model_name",
    "backend",
    "question_text",
    "choice_a",
    "choice_b",
    "choice_c",
    "choice_d",
    "correct_choice_label",
    "explanation",
    "rater_id",
    "topic_relevance",
    "semantic_correctness",
    "answer_key_correctness",
    "question_clarity",
    "acceptable",
    "notes",
]


def load_export(path: str) -> List[Dict[str, Any]]:
    with open(path, encoding="utf-8") as fh:
        doc = json.load(fh)
    return list(doc.get("questions") or [])


def write_sheet(path: str, questions: List[Dict[str, Any]], rater_id: str) -> None:
    os.makedirs(os.path.dirname(path) or ".", exist_ok=True)
    with open(path, "w", encoding="utf-8", newline="") as fh:
        writer = csv.DictWriter(fh, fieldnames=RATING_COLUMNS, extrasaction="ignore")
        writer.writeheader()
        for q in questions:
            row = dict(q)
            row["rater_id"] = rater_id
            for col in (
                "topic_relevance",
                "semantic_correctness",
                "answer_key_correctness",
                "question_clarity",
                "acceptable",
                "notes",
            ):
                row.setdefault(col, "")
            writer.writerow(row)


def main() -> int:
    repo = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
    default_export = os.path.join(repo, "logs", "evaluation", "questions_export.json")
    default_out = os.path.join(repo, "evaluate", "quality-expert")

    parser = argparse.ArgumentParser()
    parser.add_argument("--export", default=default_export)
    parser.add_argument("--out-dir", default=default_out)
    parser.add_argument("--rater1", default="Expert1")
    parser.add_argument("--rater2", default="Expert2")
    args = parser.parse_args()

    if not os.path.isfile(args.export):
        print(f"Missing {args.export}. Run batch evaluation first.")
        return 1

    questions = load_export(args.export)
    if not questions:
        print("No questions in export file.")
        return 1

    path1 = os.path.join(args.out_dir, "rating_sheet_expert1.csv")
    path2 = os.path.join(args.out_dir, "rating_sheet_expert2.csv")
    write_sheet(path1, questions, args.rater1)
    write_sheet(path2, questions, args.rater2)

    print(f"Exported {len(questions)} questions")
    print(f"  Expert 1: {path1}")
    print(f"  Expert 2: {path2}")
    print("Fill columns topic_relevance … acceptable with 0 or 1.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
