# [2] Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks
* **Authors:** Patrick Lewis, Ethan Perez, Aleksandra Piktus, Fabio Petroni, Vladimir Karpukhin, Naman Goyal, Heinrich Küttler, Mike Lewis, Wen-tau Yih, Tim Rocktäschel, Sebastian Riedel, & Douwe Kiela
* **Venue & Year:** Advances in Neural Information Processing Systems (NeurIPS 2020), 33, 9459–9474
* **Category:** `Foundational RAG Architecture`
* **Associated Full Paper PDF:** `lewis_2020_rag.pdf`

---

### ⚡ 1-Minute Executive Takeaway
> **Key Finding:** The seminal paper establishing that external retrieval dramatically reduces hallucination in generative language models.

---

### 🎯 Core Research Objective
To develop a general-purpose hybrid architecture that combines parametric memory (pre-trained seq2seq models) with non-parametric memory (dense vector index of Wikipedia) for knowledge-intensive generation tasks.

---

### 🔬 Methodology & Architecture
Proposed RAG-Sequence and RAG-Token models using a dense passage retriever (DPR) coupled with a BART generator, fine-tuning retrieval and generation end-to-end.

---

### 📊 Key Empirical Findings & Evidence
RAG models achieved state-of-the-art results on open-domain question answering (Natural Questions, TriviaQA), substantially reducing factual hallucinations compared to purely parametric models.

---

### 🔗 Direct Relevance to Our Kwiz Paper
Foundational citation in Section 1 and Section 2.1. Our architecture adapts Lewis et al.'s retrieval-augmented paradigm specifically for educational courseware, using local dense retrieval (`nomic-embed-text`) to ground programming questions in instructor-uploaded slides.
