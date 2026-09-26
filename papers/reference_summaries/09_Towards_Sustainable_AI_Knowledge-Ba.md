# [9] Towards Sustainable AI Knowledge-Base Assistants in Computer Science Education: On-Premise Deployment and Optimization with Open Educational Resources
* **Authors:** X. Shen, L. Feng, S. Hua, D. Liu, Z. Xie, & B. Liu
* **Venue & Year:** Frontiers in Psychology (2026), 17, 1843444
* **Category:** `Sustainable On-Premise AI`
* **Associated Full Paper PDF:** `shen_2026_sustainable_ai_assistant.pdf`

---

### ⚡ 1-Minute Executive Takeaway
> **Key Finding:** Validates that a single 24 GB consumer GPU (RTX 3090) is the optimal, sustainable hardware sweet spot for university AI deployment.

---

### 🎯 Core Research Objective
To evaluate the sustainability, financial feasibility, and operational envelope of deploying local LLM assistants using consumer-grade GPUs in computer science education.

---

### 🔬 Methodology & Architecture
Deployed open-source models on consumer-grade NVIDIA graphics cards (RTX 3090/4090), measuring power consumption, VRAM occupancy, and response turnaround across open educational resource (OER) corpora.

---

### 📊 Key Empirical Findings & Evidence
Showed that a single 24 GB GPU can sustainably host 7B–14B quantized models for educational workloads, eliminating cloud subscription fees while maintaining acceptable response times under low-to-moderate concurrency.

---

### 🔗 Direct Relevance to Our Kwiz Paper
Directly cited in Section 1 and Section 2.3. Shen et al. validate our hardware constraint (a single dedicated RTX 3090 host). We build on their systems analysis by evaluating an assessment authoring pipeline with incremental caching and multi-request instructor load testing.
