#!/usr/bin/env python3
"""
Experiment 3 (E3): Build Curriculum Progression Scales from 100% Authentic Course Materials.
ZERO looping, ZERO duplication, ZERO synthetic text.
Constructs 4 authentic curricular scales representing progressive course stages:
- Scale 1: Single Module (Module 1: Setup & Environment) ~2.6k tokens
- Scale 2: Fundamentals (Modules 1-3: Setup, Syntax, Data Structures) ~6.9k tokens
- Scale 3: Control Flow (Modules 1-5: Adding Conditionals & Loops) ~9.3k tokens
- Scale 4: Full Course (All 7 Lecture Modules) ~12.1k tokens
"""

import os
import sys

ORDERED_MODULES = [
    ("1_python_installation_and_vs_code_setup_on_windows.txt", "Module 1: Python Installation & VS Code Setup"),
    ("2_python_programming_introduction.txt", "Module 2: Python Programming Introduction"),
    ("3_python_data_structures_lists_tuples_sets_&_dictionaries.txt", "Module 3: Python Data Structures"),
    ("4_python_conditional_statements_for_beginners.txt", "Module 4: Conditional Statements"),
    ("5_python_for_and_while_loops.txt", "Module 5: For and While Loops"),
    ("6_python_functions.txt", "Module 6: Python Functions"),
    ("file.txt", "Module 7: Course Summary & Review")
]

SCALES = [
    ("scale_1_module1", "Single Module (Week 1 Quiz)", 1),
    ("scale_2_modules1_3", "Course Fundamentals (Unit Quiz)", 3),
    ("scale_3_modules1_5", "Control Flow Sequence (Midterm Scope)", 5),
    ("scale_4_full_course", "Complete Course Curriculum (Final Assessment)", 7)
]

def main():
    base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    extracted_dir = os.path.join(base_dir, "data", "extracted")
    corpora_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "corpora")
    os.makedirs(corpora_dir, exist_ok=True)

    # Clean old corpora files
    for old_f in os.listdir(corpora_dir):
        if old_f.endswith(".txt"):
            try:
                os.remove(os.path.join(corpora_dir, old_f))
            except Exception:
                pass

    print("=== Generating Authentic Curriculum Progression Scales (Zero Duplication) ===")

    for scale_id, label, count in SCALES:
        modules_slice = ORDERED_MODULES[:count]
        combined = []
        header = f"# NUBB AUTHENTIC COURSE CURRICULUM: {label.upper()}\n"
        header += f"# Contains {count} authentic lecture modules. Zero synthetic text.\n\n"
        combined.append(header)

        for fname, mod_title in modules_slice:
            fpath = os.path.join(extracted_dir, fname)
            if not os.path.isfile(fpath):
                raise FileNotFoundError(f"Missing authentic module file: {fpath}")
            with open(fpath, "r", encoding="utf-8") as f:
                content = f.read().strip()
            section = f"\n\n{'='*70}\n{mod_title.upper()}\n{'='*70}\n\n{content}\n"
            combined.append(section)

        full_scale_text = "".join(combined)
        out_path = os.path.join(corpora_dir, f"{scale_id}.txt")
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(full_scale_text)

        chars = len(full_scale_text)
        approx_tokens = chars // 4
        print(f"[BUILT] {scale_id}.txt ({label}): {chars:,} chars (~{approx_tokens:,} authentic tokens, {count} modules)")

    print("\n[SUCCESS] All authentic progression scales generated cleanly.")

if __name__ == "__main__":
    main()
