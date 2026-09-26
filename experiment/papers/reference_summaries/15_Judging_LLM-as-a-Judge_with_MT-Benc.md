# [15] Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena
* **Authors:** L. Zheng, W.-L. Chiang, Y. Sheng, S. Zhuang, Z. Wu, Y. Zhuang, Z. Lin, Z. Li, D. Li, E. P. Xing, H. Zhang, J. E. Gonzalez, & I. Stoica
* **Venue & Year:** Advances in Neural Information Processing Systems (NeurIPS 2023), 36, 46595–46623
* **Category:** `Automated Evaluation Protocol`
* **Associated Full Paper PDF:** `zheng_2023_judging_llm_as_a_judge.pdf`

---

### ⚡ 1-Minute Executive Takeaway
> **Key Finding:** The benchmark study validating LLM-as-a-Judge as a scientifically rigorous evaluation methodology matching human agreement.

---

### 🎯 Core Research Objective
To examine whether frontier large language models (such as GPT-4) can act as automated, scalable, and reliable evaluators for natural language generation benchmarks.

---

### 🔬 Methodology & Architecture
Benchmarked LLM judge agreement against human expert consensus across pairwise and Likert evaluations on MT-Bench and Chatbot Arena, analyzing position bias, verbosity bias, and self-enhancement bias.

---

### 📊 Key Empirical Findings & Evidence
Demonstrated that strong frontier LLM judges achieve >80% agreement with human experts, matching human-to-human inter-rater reliability levels.

---

### 🔗 Direct Relevance to Our Kwiz Paper
Methodological foundation for Section 4.2. We adopted Zheng et al.'s LLM-as-a-Judge framework (deploying GPT-4o and Gemini 2.5 Flash as multi-evaluators) alongside calibrated human faculty grading to evaluate our 100-item MCQ corpus across five dimensions.
