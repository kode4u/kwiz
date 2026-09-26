# [11] TurboRAG: Accelerating Retrieval-Augmented Generation with Precomputed KV Caches for Chunked Text
* **Authors:** S. Lu, H. Wang, Y. Rong, Z. Chen, & Y. Tang
* **Venue & Year:** Proceedings of the 2025 Conference on Empirical Methods in Natural Language Processing (EMNLP 2025), pp. 6588–6601
* **Category:** `RAG Acceleration & KV-Cache`
* **Associated Full Paper PDF:** `lu_2025_turborag.pdf`

---

### ⚡ 1-Minute Executive Takeaway
> **Key Finding:** Proves that avoiding repeated text encoding is the key to high-throughput RAG systems.

---

### 🎯 Core Research Objective
To accelerate RAG response generation by offline precomputing and caching Key-Value states for static knowledge base chunks.

---

### 🔬 Methodology & Architecture
Pre-processes text chunks through LLM attention layers offline and stores KV tensors, retrieving and concatenating KV representations at query time to bypass token prefill.

---

### 📊 Key Empirical Findings & Evidence
TurboRAG reduced prompt processing latency by up to 80% with minimal degradation in generation accuracy.

---

### 🔗 Direct Relevance to Our Kwiz Paper
Cited in Section 2.4 and Section 6.3 alongside CacheBlend. We cite TurboRAG to contextualize where caching occurs in modern RAG literature and clarify that Kwiz's contribution lies in workload-level courseware lifecycle reuse rather than algorithmic KV-cache manipulation.
