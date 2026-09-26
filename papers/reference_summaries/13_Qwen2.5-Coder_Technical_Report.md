# [13] Qwen2.5-Coder Technical Report
* **Authors:** B. Hui, J. Yang, Z. Cui, X. Yang, D. Liu, L. Zhang, & J. Lin
* **Venue & Year:** arXiv preprint arXiv:2409.12186 (2024)
* **Category:** `Foundation Code LLM`
* **Associated Full Paper PDF:** `hui_2024_qwen2.5_coder.pdf`

---

### ⚡ 1-Minute Executive Takeaway
> **Key Finding:** Establishes Qwen2.5-Coder-7B as the premier open-weight model for local code generation, making single-GPU hosting possible.

---

### 🎯 Core Research Objective
To report the architecture, pre-training corpus, instruction tuning, and code benchmark performance of the open-weight Qwen2.5-Coder series.

---

### 🔬 Methodology & Architecture
Pre-trained on 5.5 trillion tokens of code, mathematical reasoning, and technical text, followed by multi-stage instruction tuning and reinforcement learning from code execution feedback.

---

### 📊 Key Empirical Findings & Evidence
Qwen2.5-Coder-7B-Instruct matched or outperformed proprietary models (including GPT-4o-mini and Claude-3.5-Haiku) on Python code generation benchmarks (HumanEval: 88.4%, MBPP: 82.2%).

---

### 🔗 Direct Relevance to Our Kwiz Paper
Cited in Section 1, Section 3.3, and Section 4.8. Explains why we chose `Qwen2.5-Coder-7B-Instruct` as our production model: it provides state-of-the-art Python syntax accuracy while operating within the 24 GB VRAM envelope under 4-bit quantization (~4.7 GB).
