# [4] Retrieval-Augmented Generation for Multiple-Choice Questions and Answers Generation
* **Authors:** N. Pradeesh, T. Remya, M. G. Thushara, K. A. Krishna, & V. Pranav
* **Venue & Year:** Procedia Computer Science (2025), 259, 504–511
* **Category:** `LMS Question Generation`
* **Associated Full Paper PDF:** `Reference [4] (Procedia Computer Science)`

---

### ⚡ 1-Minute Executive Takeaway
> **Key Finding:** Validates PDF-to-quiz generation in an LMS, establishing the baseline workflow that Kwiz optimizes.

---

### 🎯 Core Research Objective
To investigate automated multiple-choice question generation from PDF course resources and integrate question delivery within the Ample Learning Management System.

---

### 🔬 Methodology & Architecture
Extracted text from lecture PDFs, chunked content into passages, embedded text into a vector database, and prompted an LLM to generate questions and corresponding options.

---

### 📊 Key Empirical Findings & Evidence
Confirmed that grounding generation on PDF textbooks significantly improves topical alignment, but full re-indexing of course documents upon each upload introduces noticeable server delays.

---

### 🔗 Direct Relevance to Our Kwiz Paper
Cited in Section 1 and Section 2.2 to demonstrate that LMS-integrated RAG question generation has precedent. We advance beyond Pradeesh et al. by introducing incremental content-hash caching, programming code execution validation, and native Moodle Question Bank persistence.
