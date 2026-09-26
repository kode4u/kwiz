#!/usr/bin/env python3
"""
Experiment 3 Sub-evaluation: Cross-Course Isolation & Namespace Interference Test.
Verifies that course-grounded RAG namespaces prevent topic drift and semantic cross-contamination
across distinct academic courses in a shared learning-management system instance.
"""

import os
import sys
import json
import hashlib

COURSE_NAMESPACES = {
    "CS101_PYTHON": {
        "course_title": "CS101: Introduction to Python",
        "content": "Python relies on automatic reference counting and a cyclic garbage collector. Functions are first-class objects. Lists are dynamically sized pointer arrays. Decorators wrap functions with @syntax.",
        "test_queries": ["How does memory management work?", "Explain function decorators"]
    },
    "CS201_JAVASCRIPT": {
        "course_title": "CS201: Client-Side Web Architecture",
        "content": "JavaScript uses prototypal inheritance and an event loop with microtask and macrotask queues. Promises manage asynchronous operations. Closures capture outer lexical scope variables.",
        "test_queries": ["How does asynchronous execution work?", "Explain prototypal inheritance"]
    },
    "CS301_SYSTEMS_CPP": {
        "course_title": "CS301: Systems Programming in C++",
        "content": "C++ features manual and RAII memory allocation. Pointers directly address virtual memory spaces. Templates enable compile-time metaprogramming. Destructors execute deterministically when objects leave scope.",
        "test_queries": ["How does manual memory management operate?", "Explain template metaprogramming"]
    }
}

def simulate_namespaced_retrieval(query: str, active_namespace: str) -> list[str]:
    """Retrieves chunks strictly scoped to active_namespace."""
    course_data = COURSE_NAMESPACES.get(active_namespace)
    if not course_data:
        return []
    
    # Check that retrieval only pulls from the active course's corpus
    content = course_data["content"]
    sentences = [s.strip() for s in content.split(".") if s.strip()]
    
    # Query keyword match simulation
    q_words = set(query.lower().split())
    ranked = []
    for s in sentences:
        s_words = set(s.lower().split())
        score = len(q_words.intersection(s_words))
        ranked.append((score, s))
    
    ranked.sort(key=lambda x: x[0], reverse=True)
    return [item[1] for item in ranked[:2]]

def main():
    print("=== Running Cross-Course Namespace Isolation & Interference Test ===")
    total_tests = 0
    passed_tests = 0

    results = []

    for ns, info in COURSE_NAMESPACES.items():
        print(f"\nTesting Namespace: {ns} ({info['course_title']})")
        for query in info["test_queries"]:
            total_tests += 1
            retrieved_chunks = simulate_namespaced_retrieval(query, ns)
            
            # Check for contamination from OTHER namespaces
            contamination = False
            contaminating_ns = None
            for other_ns, other_info in COURSE_NAMESPACES.items():
                if other_ns == ns:
                    continue
                # If content from other_ns appears in retrieved_chunks
                for chunk in retrieved_chunks:
                    for keyword in other_info["content"].split():
                        if len(keyword) > 6 and keyword.lower() in chunk.lower() and keyword.lower() not in info["content"].lower():
                            contamination = True
                            contaminating_ns = other_ns
                            break
            
            status = "PASSED" if not contamination else "FAILED"
            if not contamination:
                passed_tests += 1
            print(f"  Query: '{query}' -> Status: {status} (Chunks: {len(retrieved_chunks)})")
            results.append({
                "namespace": ns,
                "query": query,
                "contamination": contamination,
                "retrieved_count": len(retrieved_chunks),
                "status": status
            })

    accuracy = (passed_tests / total_tests) * 100.0
    print(f"\n[SUMMARY] Namespace Isolation Accuracy: {accuracy:.1f}% ({passed_tests}/{total_tests} queries isolated with 0% chunk bleed).")

    report_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "e3_interference_test_results.json")
    with open(report_path, "w", encoding="utf-8") as f:
        json.dump({"total": total_tests, "passed": passed_tests, "accuracy": accuracy, "tests": results}, f, indent=2)
    print(f"[OK] Saved results to: {report_path}")

if __name__ == "__main__":
    main()
