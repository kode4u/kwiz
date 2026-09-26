# [7] Self-Hosted Lecture-to-Quiz: Local LLM MCQ Generation with Deterministic Quality Control
* **Authors:** S. A. Shintani
* **Venue & Year:** arXiv preprint arXiv:2603.08729 (2026)
* **Category:** `Self-Hosted Assessment Tool`
* **Associated Full Paper PDF:** `Reference [7] (arXiv:2603.08729)`

---

### ⚡ 1-Minute Executive Takeaway
> **Key Finding:** Demonstrated local, self-hosted question generation is feasible, but lacked vector retrieval, incremental caching, and LMS database integration.

---

### 🎯 Core Research Objective
To develop an API-free, self-hosted lecture-to-quiz authoring tool that runs locally on commodity hardware with deterministic quality verification.

---

### 🔬 Methodology & Architecture
Fed raw lecture slide transcripts directly into a locally hosted LLM without vector retrieval, applying heuristic rule-based checks and exporting questions as static Google Forms CSV files.

---

### 📊 Key Empirical Findings & Evidence
Demonstrated that local inference avoids recurring commercial API costs and protects institutional privacy. However, feeding entire lectures directly into the prompt without retrieval causes severe context token bloat and limits scalability.

---

### 🔗 Direct Relevance to Our Kwiz Paper
Cited in Section 1 and Section 2.3. Kwiz improves upon Shintani's architecture by: (1) incorporating dense vector retrieval (RAG) rather than injecting full slides, (2) adding SHA-256 incremental embedding reuse, (3) validating code via Python AST, and (4) integrating dynamically into Moodle's relational database instead of static CSV exports.
