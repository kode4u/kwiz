# [14] Nomic Embed: Training a Reproducible Long-Context Text Embedder
* **Authors:** Z. Nussbaum, J. X. Morris, B. Dinh, & A. Mostern
* **Venue & Year:** arXiv preprint arXiv:2402.01613 (2024)
* **Category:** `Dense Text Embeddings`
* **Associated Full Paper PDF:** `nussbaum_2024_nomic_embed.pdf`

---

### ⚡ 1-Minute Executive Takeaway
> **Key Finding:** Validates nomic-embed-text as a high-accuracy, 8k-context open-weight embedding model for document retrieval.

---

### 🎯 Core Research Objective
To train and release a high-performance, fully reproducible, open-weight text embedding model with an extended context window (8,192 tokens).

---

### 🔬 Methodology & Architecture
Multi-stage contrastive pre-training and fine-tuning on diverse text retrieval pairs, producing 768-dimensional dense vector embeddings optimized for sentence and paragraph similarity.

---

### 📊 Key Empirical Findings & Evidence
Achieved top-tier retrieval performance on the MTEB benchmark, outperforming OpenAI `text-embedding-ada-002` while supporting long-context document chunks.

---

### 🔗 Direct Relevance to Our Kwiz Paper
Cited in Section 3.1 and Section 4.8. `nomic-embed-text` is the dedicated embedding backbone of Kwiz, enabling semantic retrieval over curriculum slide chunks with sub-millisecond similarity computation.
