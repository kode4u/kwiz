# [10] CacheBlend: Fast Large Language Model Serving for RAG with Cached Knowledge Fusion
* **Authors:** J. Yao, H. Li, Y. Liu, S. Ray, Y. Cheng, Q. Zhang, K. Du, S. Lu, & J. Jiang
* **Venue & Year:** Proceedings of the Twentieth European Conference on Computer Systems (EuroSys '25), pp. 94–109
* **Category:** `Inference KV-Cache Optimization`
* **Associated Full Paper PDF:** `yao_2025_cacheblend.pdf`

---

### ⚡ 1-Minute Executive Takeaway
> **Key Finding:** Demonstrates that caching intermediate representations in RAG prevents GPU bottlenecks, reinforcing our pipeline caching philosophy.

---

### 🎯 Core Research Objective
To eliminate the redundant prompt prefill computation in RAG systems by dynamically reusing and fusing precomputed Key-Value (KV) cache states of retrieved document chunks.

---

### 🔬 Methodology & Architecture
Developed CacheBlend, an inference-engine extension that selectively merges KV-cache activations of retrieved chunks, reducing prompt token prefill overhead on GPU memory.

---

### 📊 Key Empirical Findings & Evidence
Achieved 2.3× to 4.7× speedup in Time-to-First-Token (TTFT) and significantly reduced prefill compute for long-context RAG pipelines.

---

### 🔗 Direct Relevance to Our Kwiz Paper
Cited in Section 2.4 and Section 6.3. We distinguish our work from CacheBlend: whereas CacheBlend operates at the GPU inference layer (KV-cache fusion), Kwiz operates earlier in the pipeline (content hashing and embedding reuse during courseware indexing). We identify KV-cache fusion as the primary scaling path for future sub-second generation.
