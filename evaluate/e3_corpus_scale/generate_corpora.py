#!/usr/bin/env python3
"""
Experiment 3 (E3): Generate Multi-Scale Curricular Corpora.
Generates synthetic/modular programming course materials across 4 token sizes:
- 10k tokens (~40,000 characters)
- 50k tokens (~200,000 characters)
- 100k tokens (~400,000 characters)
- 250k tokens (~1,000,000 characters)
Each corpus contains distinct modules, chapters, code examples, and theoretical discussions.
"""

import os
import sys
import argparse

MODULE_TEMPLATES = [
    ("Module {m}: Control Flow and Logic in Python", """
    In this module, we examine structured programming constructs including conditional branching,
    iteration protocols, and loop optimizations. Python employs the 'if-elif-else' hierarchy for multi-way
    decision logic. The interpreter evaluates expressions lazily through boolean short-circuit mechanics:
    in 'A and B', if A is falsy, B is never evaluated; in 'A or B', if A is truthy, B is skipped.
    
    ```python
    def evaluate_flow(val):
        if val > 100:
            return 'high'
        elif val > 50:
            return 'medium'
        else:
            return 'low'
    ```
    Iterators adhere to the protocol requiring '__iter__()' returning an iterator and '__next__()' raising StopIteration.
    """),
    ("Module {m}: Data Structures and Computational Complexity", """
    This chapter explores abstract data types (ADTs) and their concrete implementations in CPython.
    Lists are implemented as dynamically resizing arrays of pointers (compact flat arrays of object pointers).
    Amortized complexity for append is O(1), whereas arbitrary insertions at index 0 require O(n) memory shifts.
    
    ```python
    def collect_squares(limit):
        return [i * i for i in range(limit) if i % 2 == 0]
    ```
    Dictionaries and sets are implemented as open-addressing hash tables utilizing perturb-based probing.
    Lookups average O(1) time complexity provided key hash distributions minimize collision frequency.
    """),
    ("Module {m}: Object-Oriented Software Design and Encapsulation", """
    Object-oriented paradigms model domain entities via classes containing state and behavior.
    Encapsulation is achieved by scoping conventions. While languages like C++ and Java enforce access control
    via private/protected specifiers at compilation, Python relies on name mangling for leading double-underscore attributes.
    
    ```python
    class BankAccount:
        def __init__(self, owner, balance=0.0):
            self.owner = owner
            self._balance = balance
            
        def deposit(self, amount):
            if amount > 0:
                self._balance += amount
                return True
            return False
    ```
    Multiple inheritance resolves method ambiguity through C3 Linearization, accessible via the '__mro__' attribute.
    """),
    ("Module {m}: Concurrency, Asynchronous I/O, and the Global Interpreter Lock", """
    CPython execution is constrained by the Global Interpreter Lock (GIL), a mutual exclusion lock
    preventing multiple native threads from executing Python bytecodes concurrently within a single process.
    CPU-bound multi-threading does not yield linear parallel speedups; instead, multiprocessing or C-extension offloading is mandated.
    
    ```python
    import asyncio

    async def fetch_coroutine(cid):
        await asyncio.sleep(0.01)
        return f'item_{cid}'
    ```
    For I/O-bound operations, asynchronous coroutines cooperatively yield control via an event loop.
    """)
]

def generate_corpus_file(target_tokens: int, output_path: str):
    # Approximate ratio: 1 token ~= 4 characters / 0.75 words
    target_chars = target_tokens * 4
    content = [f"# COURSE SYLLABUS AND COMPREHENSIVE TEXTBOOK ({target_tokens // 1000}k Tokens)\n"]
    
    module_idx = 1
    current_len = sum(len(c) for c in content)
    
    while current_len < target_chars:
        title_tpl, body_tpl = MODULE_TEMPLATES[(module_idx - 1) % len(MODULE_TEMPLATES)]
        title = title_tpl.replace("{m}", str(module_idx))
        body = body_tpl.replace("{m}", str(module_idx))
        block = f"\n## {title}\n{body}\n"
        content.append(block)
        current_len += len(block)
        module_idx += 1

    final_text = "".join(content)
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(final_text)

    actual_tokens = len(final_text) // 4
    print(f"[OK] Generated {output_path}: {len(final_text):,} chars (~{actual_tokens:,} tokens, {module_idx} sections)")

def main():
    parser = argparse.ArgumentParser(description="Generate Corpora for E3 Corpus Scaling")
    parser.add_argument("--output-dir", default="corpora", help="Output directory for generated corpora")
    args = parser.parse_args()

    base_dir = os.path.dirname(os.path.abspath(__file__))
    out_dir = os.path.join(base_dir, args.output_dir)
    os.makedirs(out_dir, exist_ok=True)

    token_sizes = [10_000, 50_000, 100_000, 250_000]
    for size in token_sizes:
        label = f"{size // 1000}k"
        fpath = os.path.join(out_dir, f"corpus_{label}.txt")
        generate_corpus_file(size, fpath)

if __name__ == "__main__":
    main()
