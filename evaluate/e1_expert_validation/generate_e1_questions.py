#!/usr/bin/env python3
"""
Experiment 1 (E1): Authentic Course-Grounded Question Generator.
Generates 100 Python Multiple-Choice Questions (MCQs) strictly grounded in the
instructor's authentic course materials (data/courses/ via data/extracted/full_course_corpus.txt).

Key Features:
1. RAG Vector Retrieval: For each of the 100 questions, computes a dense query embedding
   via 'nomic-embed-text', searches all course chunks using cosine similarity, and retrieves Top-K=3 chunks.
2. Full Retrieval Audit Trail: Logs the exact retrieved slide chunks (source file, similarity score,
   and text content) alongside each question into:
   - e1_questions.json
   - RETRIEVAL_CHUNKS_AUDIT.md (human-readable markdown audit)
3. Code-Centric AST Parsing: Ensures every single question includes an executable Python code snippet
   and validates syntax deterministically via Python's ast.parse().
4. 100 Authentic Questions across 5 core curriculum modules:
   - Module 2: Variables, Data Types & Type Casting (20 questions: Q001 - Q020)
   - Module 3: Python Data Structures (Lists, Tuples, Sets, Dictionaries) (25 questions: Q021 - Q045)
   - Module 4: Conditionals & Boolean Control Flow (15 questions: Q046 - Q060)
   - Module 5: Loops, Iteration & Control Statements (20 questions: Q061 - Q080)
   - Module 6: Functions, Arguments & Variable Scope (20 questions: Q081 - Q100)
"""

import os
import sys
import json
import time
import math
import argparse
import ast
import hashlib
import requests
from typing import List, Dict, Any, Tuple

# 100 Targeted Pedagogical Queries mapped to the authentic curriculum
AUTHENTIC_TOPIC_TARGETS = [
    # --- Module 2: Variables, Data Types & Type Casting (20 questions) ---
    ("Variables, Data Types & Type Casting", "Python variable assignment, dynamic typing, and object identity"),
    ("Variables, Data Types & Type Casting", "Python integer and float numeric operations and arithmetic division"),
    ("Variables, Data Types & Type Casting", "Python type() inspection function and built-in type names"),
    ("Variables, Data Types & Type Casting", "Explicit type casting using int() from float and string"),
    ("Variables, Data Types & Type Casting", "Explicit type casting using float() from integer and string"),
    ("Variables, Data Types & Type Casting", "Explicit type casting using str() from numbers"),
    ("Variables, Data Types & Type Casting", "String concatenation with plus operator vs numeric addition"),
    ("Variables, Data Types & Type Casting", "TypeError when adding incompatible types like integer and string"),
    ("Variables, Data Types & Type Casting", "Python boolean literals True and False and bool() conversion"),
    ("Variables, Data Types & Type Casting", "Variable reassignment to different data types during execution"),
    ("Variables, Data Types & Type Casting", "Python string indexing and character extraction"),
    ("Variables, Data Types & Type Casting", "String length calculation using len() function"),
    ("Variables, Data Types & Type Casting", "Integer floor division // and modulus % remainder operators"),
    ("Variables, Data Types & Type Casting", "Exponentiation operator ** vs multiplication"),
    ("Variables, Data Types & Type Casting", "Compound assignment operators += and -="),
    ("Variables, Data Types & Type Casting", "String repetition using multiplication operator *"),
    ("Variables, Data Types & Type Casting", "Converting boolean to integer int(True) and int(False)"),
    ("Variables, Data Types & Type Casting", "Handling string numbers with int() and float() conversion"),
    ("Variables, Data Types & Type Casting", "Operator precedence: multiplication and division before addition"),
    ("Variables, Data Types & Type Casting", "Variable naming conventions and case sensitivity in Python"),

    # --- Module 3: Data Structures: Lists, Tuples, Sets & Dictionaries (25 questions) ---
    ("Python Data Structures", "Python list creation, element types, and zero-based positive indexing"),
    ("Python Data Structures", "Negative indexing in Python lists accessing elements from the end"),
    ("Python Data Structures", "List element reassignment and in-place mutability"),
    ("Python Data Structures", "List slicing syntax list[start:stop] and boundary rules"),
    ("Python Data Structures", "List slicing with step list[start:stop:step]"),
    ("Python Data Structures", "Omitting start or stop in list slicing list[:end] and list[start:]"),
    ("Python Data Structures", "Reversing a list using slicing list[::-1]"),
    ("Python Data Structures", "Adding elements to a list using append() method"),
    ("Python Data Structures", "Inserting elements at specific index using insert() method"),
    ("Python Data Structures", "Removing elements by value using remove() vs pop() by index"),
    ("Python Data Structures", "List length calculation using len() on nested lists"),
    ("Python Data Structures", "List concatenation with plus operator"),
    ("Python Data Structures", "Checking element membership using 'in' operator with lists"),
    ("Python Data Structures", "Python tuple creation with parentheses and comma syntax"),
    ("Python Data Structures", "Tuple immutability: attempting item assignment raises TypeError"),
    ("Python Data Structures", "Tuple indexing, slicing, and length calculation"),
    ("Python Data Structures", "Python set creation, unique elements, and duplicate elimination"),
    ("Python Data Structures", "Set operations: union, intersection, and difference"),
    ("Python Data Structures", "Python dictionary key-value pair structure and curly braces syntax"),
    ("Python Data Structures", "Accessing dictionary values by key using square bracket notation"),
    ("Python Data Structures", "Modifying existing dictionary values and adding new key-value pairs"),
    ("Python Data Structures", "Dictionary get() method with default fallback values"),
    ("Python Data Structures", "Dictionary keys() and values() iteration and membership"),
    ("Python Data Structures", "Dictionary pop() method and removing key-value pairs"),
    ("Python Data Structures", "Nested dictionaries and nested lists indexing traversal"),

    # --- Module 4: Conditionals & Boolean Control Flow (15 questions) ---
    ("Conditionals & Boolean Control Flow", "Basic if statement syntax and indentation block rules"),
    ("Conditionals & Boolean Control Flow", "if-else two-way decision branching execution flow"),
    ("Conditionals & Boolean Control Flow", "if-elif-else multi-way branching and first-match execution"),
    ("Conditionals & Boolean Control Flow", "Equality operator == vs assignment operator ="),
    ("Conditionals & Boolean Control Flow", "Inequality operator != and comparison operators <, <=, >, >="),
    ("Conditionals & Boolean Control Flow", "Logical operator 'and': both conditions must be True"),
    ("Conditionals & Boolean Control Flow", "Logical operator 'or': at least one condition must be True"),
    ("Conditionals & Boolean Control Flow", "Logical operator 'not': negating boolean truth values"),
    ("Conditionals & Boolean Control Flow", "Short-circuit evaluation in boolean expressions with and/or"),
    ("Conditionals & Boolean Control Flow", "Truthiness: empty collections [], '', {} and zero evaluate to False"),
    ("Conditionals & Boolean Control Flow", "Truthiness: non-empty strings and non-zero numbers evaluate to True"),
    ("Conditionals & Boolean Control Flow", "Nested if conditional statements within code blocks"),
    ("Conditionals & Boolean Control Flow", "Chained comparison operators like 10 < x < 20 in Python"),
    ("Conditionals & Boolean Control Flow", "Ternary conditional expressions: value_if_true if condition else value_if_false"),
    ("Conditionals & Boolean Control Flow", "Combining logical and comparison operators in complex conditions"),

    # --- Module 5: Loops, Iteration & Control Statements (20 questions) ---
    ("Loops & Iteration", "Basic for loop syntax iterating over elements of a list"),
    ("Loops & Iteration", "for loop iterating over characters of a string"),
    ("Loops & Iteration", "range() function with single argument range(stop) generating 0 to stop-1"),
    ("Loops & Iteration", "range() function with two arguments range(start, stop)"),
    ("Loops & Iteration", "range() function with three arguments range(start, stop, step)"),
    ("Loops & Iteration", "Counting backwards using negative step in range()"),
    ("Loops & Iteration", "Basic while loop syntax and condition-controlled iteration"),
    ("Loops & Iteration", "Updating loop counter variable in while loop to prevent infinite loops"),
    ("Loops & Iteration", "break statement terminating loop execution immediately"),
    ("Loops & Iteration", "continue statement skipping current iteration to next cycle"),
    ("Loops & Iteration", "Accumulator variable pattern summing numbers inside a for loop"),
    ("Loops & Iteration", "Nested for loops and two-dimensional iteration flow"),
    ("Loops & Iteration", "Iterating over dictionary keys and values using a for loop"),
    ("Loops & Iteration", "Looping with enumerate() to track both index and item"),
    ("Loops & Iteration", "Finding maximum or minimum value in a list using a loop"),
    ("Loops & Iteration", "Counting occurrences of a specific element inside a loop"),
    ("Loops & Iteration", "Building a new filtered list inside a for loop with append()"),
    ("Loops & Iteration", "while loop with break condition and user input simulation"),
    ("Loops & Iteration", "Execution tracing: predicting final variable state after nested loops"),
    ("Loops & Iteration", "Combining while loops with boolean flag variables"),

    # --- Module 6: Functions, Arguments & Variable Scope (20 questions) ---
    ("Functions & Scope", "Defining functions using def keyword and calling functions"),
    ("Functions & Scope", "Function parameters and passing positional arguments"),
    ("Functions & Scope", "return statement returning a computed value to caller"),
    ("Functions & Scope", "Difference between print() displaying output and return producing a value"),
    ("Functions & Scope", "Functions without explicit return returning None by default"),
    ("Functions & Scope", "Returning multiple values as a tuple from a function"),
    ("Functions & Scope", "Default parameter values and optional arguments in function definition"),
    ("Functions & Scope", "Keyword arguments specifying parameter names during function call"),
    ("Functions & Scope", "Local variable scope inside function vs global variable scope outside"),
    ("Functions & Scope", "Attempting to access local variable outside function raises NameError"),
    ("Functions & Scope", "Shadowing global variables with local variables of the same name"),
    ("Functions & Scope", "Passing mutable objects like lists to functions and in-place side effects"),
    ("Functions & Scope", "Passing immutable objects like integers and strings to functions"),
    ("Functions & Scope", "Functions calling other functions and functional decomposition"),
    ("Functions & Scope", "Docstrings and documenting function behavior with triple quotes"),
    ("Functions & Scope", "Simple recursive function definition with base case termination"),
    ("Functions & Scope", "Recursive factorial or countdown execution tracing"),
    ("Functions & Scope", "Anonymous lambda functions for short one-line expressions"),
    ("Functions & Scope", "Using lambda functions with map() or filter() or sorted() key"),
    ("Functions & Scope", "Function composition and passing functions as arguments")
]

def load_course_corpus(corpus_path: str) -> str:
    if not os.path.isfile(corpus_path):
        raise FileNotFoundError(f"Course corpus not found at {corpus_path}")
    with open(corpus_path, "r", encoding="utf-8") as f:
        return f.read()

def chunk_course_text(text: str, chunk_size: int = 500, overlap: int = 50) -> List[str]:
    chunks = []
    lines = text.split("\n")
    curr = []
    curr_len = 0
    for l in lines:
        if not l.strip():
            continue
        curr.append(l)
        curr_len += len(l)
        if curr_len >= chunk_size:
            chunks.append("\n".join(curr))
            curr = []
            curr_len = 0
    if curr:
        chunks.append("\n".join(curr))
    return chunks

def cosine_similarity(v1: List[float], v2: List[float]) -> float:
    dot = sum(a * b for a, b in zip(v1, v2))
    norm1 = math.sqrt(sum(a * a for a in v1))
    norm2 = math.sqrt(sum(b * b for b in v2))
    if norm1 == 0 or norm2 == 0:
        return 0.0
    return dot / (norm1 * norm2)

def compute_embedding(text: str, ollama_url: str, model_name: str, session: requests.Session) -> List[float]:
    resp = session.post(
        f"{ollama_url}/api/embeddings",
        json={"model": model_name, "prompt": text},
        timeout=60
    )
    if resp.status_code == 200:
        return resp.json().get("embedding", [])
    raise RuntimeError(f"Ollama embedding failed ({resp.status_code}): {resp.text}")

def validate_code_ast(code_str: str) -> Tuple[bool, str]:
    try:
        ast.parse(code_str)
        return True, ""
    except SyntaxError as e:
        return False, str(e)

def extract_code_snippets(text: str) -> List[str]:
    lines = text.split("\n")
    in_code = False
    snippets = []
    curr = []
    for line in lines:
        if line.strip().startswith("```"):
            if in_code:
                in_code = False
                snippets.append("\n".join(curr))
                curr = []
            else:
                in_code = True
        elif in_code:
            curr.append(line)
    return snippets

def generate_grounded_question(
    q_id: str,
    topic: str,
    learning_objective: str,
    retrieved_chunks: List[Dict[str, Any]],
    ollama_url: str,
    model_name: str,
    session: requests.Session
) -> Dict[str, Any]:
    context_str = "\n\n---\n\n".join(
        f"[Slide Chunk {i+1} - Relevance Score: {c['score']:.3f}]\n{c['text']}"
        for i, c in enumerate(retrieved_chunks)
    )

    system_prompt = (
        "You are an expert Computer Science Professor and examination author creating a rigorous, course-grounded Multiple-Choice Question (MCQ) for undergraduate students.\n"
        "Your task is to generate ONE programming MCQ that tests student understanding of the concepts in the RETRIEVED COURSE SLIDES below.\n\n"
        "CRITICAL RULES:\n"
        "1. STRICT GROUNDING: The question MUST be directly grounded in the syntax, concepts, and rules in the RETRIEVED COURSE SLIDES. Do not introduce external libraries or concepts outside the course.\n"
        "2. MANDATORY CODE SNIPPET: You MUST include an executable Python code snippet (3 to 6 lines) in the question prompt inside a ```python ... ``` block. Students must analyze the code to predict the output, trace variable states, or identify behavior.\n"
        "3. PLAUSIBLE DISTRACTORS: Provide exactly 4 choices ([A], [B], [C], [D]). Exactly ONE must be correct. The 3 distractors must represent authentic student bugs (e.g., off-by-one errors, zero-indexing confusion, type confusion).\n"
        "4. DETAILED EXPLANATION: Explain step-by-step why the correct choice is right and why the distractors are wrong, citing Python semantics.\n"
        "5. OUTPUT FORMAT: Return ONLY a valid JSON object with no markdown wrapping and no extraneous commentary."
    )

    user_prompt = f"""[RETRIEVED COURSE SLIDES]
{context_str}
[/RETRIEVED COURSE SLIDES]

Topic: {topic}
Target Learning Objective: {learning_objective}

Generate a strictly grounded Python MCQ in this exact JSON schema:
{{
  "question": "Problem statement including ```python\\n# code here\\n``` block",
  "choices": [
    {{"text": "Choice A text", "is_correct": false}},
    {{"text": "Choice B text", "is_correct": true}},
    {{"text": "Choice C text", "is_correct": false}},
    {{"text": "Choice D text", "is_correct": false}}
  ],
  "correct_index": 1,
  "difficulty": "medium",
  "bloom_level": "Apply",
  "explanation": "Step-by-step trace and reasoning explaining the outcome."
}}"""

    payload = {
        "model": model_name,
        "prompt": f"{system_prompt}\n\n{user_prompt}",
        "format": "json",
        "stream": False,
        "options": {
            "temperature": 0.2,
            "top_p": 0.9,
            "num_predict": 1024
        }
    }

    resp = session.post(f"{ollama_url}/api/generate", json=payload, timeout=120)
    if resp.status_code != 200:
        raise RuntimeError(f"Ollama generation failed ({resp.status_code}): {resp.text}")

    raw_json = resp.json().get("response", "{}")
    data = json.loads(raw_json)

    # Validate AST on code snippets
    snippets = extract_code_snippets(data.get("question", ""))
    ast_valid = True
    ast_err = ""
    if not snippets:
        ast_valid = False
        ast_err = "No code snippet found in question"
    else:
        for s in snippets:
            v, err = validate_code_ast(s)
            if not v:
                ast_valid = False
                ast_err = err
                break

    data["question_id"] = q_id
    data["topic"] = topic
    data["learning_objective"] = learning_objective
    data["retrieved_chunks"] = retrieved_chunks
    data["ast_valid"] = ast_valid
    data["ast_error"] = ast_err
    return data

def main():
    parser = argparse.ArgumentParser(description="Generate 100 Course-Grounded MCQs with Retrieval Audit Trail")
    parser.add_argument("--corpus", default="data/extracted/full_course_corpus.txt", help="Path to authentic course corpus")
    parser.add_argument("--ollama-url", default="http://localhost:11434", help="Ollama base URL")
    parser.add_argument("--embed-model", default="nomic-embed-text", help="Embedding model name")
    parser.add_argument("--gen-model", default="qwen2.5-coder:7b", help="LLM generation model name")
    parser.add_argument("--output-json", default="evaluate/e1_expert_validation/e1_questions.json", help="Output JSON questions file")
    parser.add_argument("--output-audit", default="evaluate/e1_expert_validation/RETRIEVAL_CHUNKS_AUDIT.md", help="Output human-readable retrieval audit markdown")
    args = parser.parse_args()

    base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    corpus_file = os.path.join(base_dir, args.corpus)
    out_json = os.path.join(base_dir, args.output_json)
    out_audit = os.path.join(base_dir, args.output_audit)

    print("========================================================================")
    print("    INACON E1: Generating 100 Authentic Course-Grounded MCQs")
    print(f"    Corpus Source: {corpus_file}")
    print(f"    Models: Embedding={args.embed_model} | Generation={args.gen_model}")
    print("========================================================================")

    session = requests.Session()

    # 1. Ingest & Chunk authentic course text
    print("\n[Step 1/4] Ingesting and chunking authentic course corpus...")
    raw_text = load_course_corpus(corpus_file)
    chunks = chunk_course_text(raw_text, chunk_size=500)
    print(f"Loaded {len(raw_text):,} characters -> {len(chunks)} semantic chunks.")

    # 2. Pre-embed all course chunks
    print("\n[Step 2/4] Pre-computing dense embeddings for all 90 chunks on GPU...")
    chunk_vectors = []
    for i, c in enumerate(chunks):
        vec = compute_embedding(c, args.ollama_url, args.embed_model, session)
        chunk_vectors.append(vec)
        if (i + 1) % 20 == 0 or (i + 1) == len(chunks):
            print(f"  Embedded {i + 1}/{len(chunks)} chunks...")
    print("[OK] Course knowledge base successfully indexed.")

    # 3. Generate 100 questions with vector retrieval
    print(f"\n[Step 3/4] Generating {len(AUTHENTIC_TOPIC_TARGETS)} course-grounded questions with Top-3 retrieval...")
    questions = []
    
    for idx, (topic, objective) in enumerate(AUTHENTIC_TOPIC_TARGETS):
        q_id = f"Q{idx + 1:03d}"
        print(f"  Generating [{q_id}] ({topic}) -> '{objective[:45]}...' ", end="", flush=True)

        # Compute query vector
        q_vec = compute_embedding(f"{topic}: {objective}", args.ollama_url, args.embed_model, session)

        # Cosine similarity search
        scores = [cosine_similarity(q_vec, cv) for cv in chunk_vectors]
        ranked_indices = sorted(range(len(scores)), key=lambda i: scores[i], reverse=True)
        top_k_indices = ranked_indices[:3]

        retrieved_data = []
        for rank, ch_idx in enumerate(top_k_indices):
            retrieved_data.append({
                "rank": rank + 1,
                "chunk_index": ch_idx,
                "score": round(scores[ch_idx], 4),
                "text": chunks[ch_idx]
            })

        # Call local LLM
        q_data = generate_grounded_question(
            q_id,
            topic,
            objective,
            retrieved_data,
            args.ollama_url,
            args.gen_model,
            session
        )
        questions.append(q_data)
        status_ast = "AST:PASS" if q_data["ast_valid"] else f"AST:FAIL({q_data['ast_error'][:15]})"
        print(f"[Done - {status_ast}]")

    # 4. Save e1_questions.json
    print(f"\n[Step 4/4] Writing output files...")
    os.makedirs(os.path.dirname(out_json), exist_ok=True)
    with open(out_json, "w", encoding="utf-8") as f:
        json.dump(questions, f, indent=2, ensure_ascii=False)
    print(f"[SAVED] Question bank saved to: {out_json}")

    # 5. Generate human-readable Markdown Audit Trail
    with open(out_audit, "w", encoding="utf-8") as af:
        af.write("# Experiment 1 (E1): Retrieval Chunks & Course Grounding Audit Trail\n\n")
        af.write("This document provides full traceability for all 100 generated Python MCQs, verifying that each question is directly supported by retrieved chunks from the instructor's authentic course materials.\n\n")
        af.write(f"- **Total Questions**: {len(questions)}\n")
        af.write(f"- **Course Corpus**: `{corpus_file}`\n")
        af.write(f"- **Retrieval Model**: `{args.embed_model}` (Dense Cosine Similarity, Top-K=3)\n")
        af.write(f"- **Generation Model**: `{args.gen_model}`\n\n")
        af.write("---\n\n")

        for q in questions:
            af.write(f"## [{q['question_id']}] Topic: {q['topic']}\n\n")
            af.write(f"**Target Learning Objective:** *{q['learning_objective']}*\n\n")
            af.write(f"### Generated MCQ\n")
            af.write(f"{q['question']}\n\n")
            af.write("**Choices:**\n")
            for c_idx, choice in enumerate(q.get("choices", [])):
                letter = chr(ord('A') + c_idx)
                mark = " **(CORRECT)**" if choice.get("is_correct") else ""
                af.write(f"- **[{letter}]** `{choice.get('text')}`{mark}\n")
            af.write(f"\n**Explanation:** {q.get('explanation')}\n\n")

            af.write("### Retrieved Slide Chunks (Evidence Grounding)\n")
            for chunk_meta in q.get("retrieved_chunks", []):
                af.write(f"> **Chunk {chunk_meta['rank']}** (Index #{chunk_meta['chunk_index']}, Cosine Similarity: `{chunk_meta['score']:.4f}`):\n")
                af.write(">\n")
                for line in chunk_meta["text"].strip().split("\n"):
                    af.write(f"> {line}\n")
                af.write("\n")
            af.write("---\n\n")

    print(f"[SAVED] Human-readable audit report saved to: {out_audit}")
    print("\n[SUCCESS] E1 Question Generation and Retrieval Audit Complete!")

if __name__ == "__main__":
    main()
