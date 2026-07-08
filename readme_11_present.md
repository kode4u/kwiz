# NACON Research Presentation Summary

**Project Title:** L3M-RAG: Design and Evaluation of a Local RAG-Based MCQ Generation Plugin for Moodle

---

## Slide 1: Title & Authors
* **Title:** L3M-RAG: Design and Evaluation of a Local RAG-Based MCQ Generation Plugin for Moodle
* **Context:** Outcomes of Research Grant at SRU and NUBB
* **Presenter / Authors:** [Insert Presenter Names] (SRU & NUBB)

---

## Slide 2: Background
* Many universities use Moodle LMS for online learning.
* Creating high-quality quizzes is time-consuming for instructors, especially in programming and computing courses.
* Existing AI question generation systems mostly rely on cloud-based Language Models (LLMs), which introduce limitations:
  * Require a continuous internet connection.
  * Incur high, recurring API costs (per-token pricing).
  * Raise student data privacy and curricular security concerns.
  * Suffer from latency and slow response times under heavy concurrent usage.
  * Offer limited customization for specific institutional course materials.
* **Proposed Solution:** A locally deployable Moodle plugin that generates questions on on-premise hardware (L3M-RAG).

---

## Slide 3: Research Problem
* Current Moodle quiz creation requires significant manual instructor effort (e.g., formatting questions, writing distractors, checking answers).
* Commercial AI solutions:
  * Depend entirely on external cloud APIs (OpenAI, Gemini).
  * Cannot easily ingest local, private university slides or lecture notes securely.
  * Escalate ongoing operational costs for higher education institutions.
  * Expose sensitive academic data to third-party servers.
* **Objective:** Establish a private, zero-marginal-cost, locally hosted AI quiz generator.

---

## Slide 4: Research Objectives
1. **Design and Implement** a native Moodle Quiz Plugin (`mod_gamifiedquiz`).
2. **Integrate** a locally hosted LLM engine running inside the university's intranet.
3. **Enhance Question Relevance** using Retrieval-Augmented Generation (RAG) mapped to lecture slides.
4. **Evaluate Generation Quality** using double-blind expert academic reviews in computer science.
5. **Evaluate RAG context retrieval accuracy, chunking strategies, and generation quality of local LLMs.**

---

## Slide 5: Main Innovation (L3M-RAG Framework)
* **On-Premise Deployment:** Executes inference locally using Ollama, saving computational resources and eliminating API subscription costs.
* **Grounding via local RAG:** Restricts questions strictly to uploaded syllabus PDFs/text documents, preventing general LLM hallucinations.
* **Frictionless Moodle Ingestion:** Eliminates the need to export/import XML or GIFT files; questions are directly inserted into Moodle's native database.
* **Retrieval-Optimized Chunking:** Custom recursive character splitting parameters designed to keep programming constructs and slide headers intact.
* **Privacy-Preserving Edge Architecture:** Ensures university course materials and student records never cross the campus firewall.

---

## Slide 6: Local AI Model Stack
* **Local LLM (Text Generation):** Qwen2.5-Coder (latest) — optimized for programming, logical reasoning, and structured JSON output.
* **Embedding Model (RAG Search):** nomic-embed-text — 768 dimensions, large 8,192 token context window.
* **Vector Database:** ChromaDB (persistent client running locally).
* **Local Inference Engine:** Ollama running on institutional hardware.

---

## Slide 7: Why RAG (Retrieval-Augmented Generation)?
* Prevents the LLM from relying on generic, off-topic web data or making up concepts.
* **Materials Ingested:** Course slide decks, lecture notes, textbook chapters, and Moodle syllabus resources.
* **The Mechanism:** Chunks text from English PDFs, embeds them into vectors, matches them with the query topic using cosine similarity, and feeds the top 3 matching chunks to `qwen2.5-coder` as the sole "ground truth" source.

---

## Slide 8: RAG & Generation Workflow
1. **Ingest:** Instructor uploads lecture notes / course slides (PDF/Text) inside Moodle.
2. **Chunk:** System splits text recursively into overlapping chunks.
3. **Embed:** Generates vectors using `nomic-embed-text`.
4. **Index:** Chunks and embeddings are stored in a local ChromaDB collection.
5. **Request:** Instructor defines a quiz topic and requested difficulty level.
6. **Retrieve:** Queries ChromaDB to pull the top 3 semantically closest chunks.
7. **Inject:** Injects the retrieved chunks into the prompt context.
8. **Generate:** `qwen2.5-coder` generates multiple-choice questions matching the requested topic.
9. **Validate:** Checks JSON output structure and schema properties.
10. **Store:** Automatically saves valid questions into Moodle's native database.

---

## Slide 9: System Architecture
* **AI Ingestion Layer:** Text parsing, recursive chunk segmentation, and embedding vectorizer.
* **Storage Layer:** ChromaDB local collection directory for persistent index.
* **AI Generation Layer:** FastAPI/Flask Python Service, ChromaDB vector search engine, and local Ollama daemon.
* **Hardware Environment (Evaluated):** 
  * **GPU:** NVIDIA GeForce RTX 3090 (24GB VRAM)
  * **OS:** On-Premise Windows 10/Server Node
  * **Model Parametrization:** Temperature = 0.1 (high determinism), Top-P = 0.9, Context = 4,096 tokens.

---

## Slide 10: Question Generation Process
```
Instructor Input (Topic, Level, Count)
  │
  ▼
RAG Context Search ➔ Chunk Retrieval from ChromaDB
  │
  ▼
Prompt Synthesis (Context + System Guidelines)
  │
  ▼
Local LLM Inference (qwen2.5-coder via Ollama)
  │
  ▼
JSON parsing & Schema Validation (app.py) ➔ Retry Loop (Max 3)
  │
  ▼
Direct Import to Moodle Question Bank (MySQL Database)
```

---

## Slide 11: Evaluation Methodology
* **Evaluation Dataset:** 100 multiple-choice questions generated across 5 core Computer Science domains:
  * Python Programming
  * Java Programming
  * C++ Programming
  * Data Structures
  * Database Systems
* **Raters:** 3 computing lecturers evaluated the outputs. To manage expert workload, a hierarchical subset strategy was used:
  * *Primary Expert:* Evaluated all 100 questions to establish overall accuracy metrics.
  * *Secondary Experts (Raters 2 & 3):* Independently graded a random subset of 25 common questions to calculate reliability.
* **Rubric Metrics (Binary 0/1):**
  1. *Topic Relevance (Prompt Adherence)*
  2. *Semantic Correctness*
  3. *Answer Key Correctness*
  4. *Question Clarity*
  5. *Overall Acceptability (Passes all 4 criteria)*

---

## Slide 12: RAG & LLM Evaluation Methodology
* **Context Relevance Score:** Checking if retrieved text chunks correctly match the requested topic query.
* **Chunking Strategy Evaluation:** Checking if logical context and definitions are truncated across boundaries.
* **Generation Output Precision:** Quantifying semantic correctness, distractor clarity, and answer key accuracy.
* **Inter-Rater Agreement:** Computing Fleiss' Kappa statistical coefficient across all 3 experts on the common subset to prove pedagogical evaluation reliability.

---

## Slide 13: RAG Chunking Optimization
* **Chunk Size Testing:** Comparing chunking thresholds (e.g., 500 characters) to ensure logical units stay together.
* **Overlap Window configuration:** Operating a 50-character overlap window to prevent split keywords or code contexts.
* **Retrieval Depth (K=3):** Sizing context retrieval to ensure sufficient background data without exceeding local LLM attention limits.

---

## Slide 14: Experimental Results (Empirical Data)

### 1. LLM Generation Speed & JSON Format Adherence
* **Mean Latency:** **3.05 seconds** per question.
* **Median Latency:** **2.36 seconds** (p95: **4.88 seconds**).
* **Structural Success Rate (JSON Adherence):** **62.9%** on first attempt. The remaining **37.1%** were successfully caught, re-prompted, and corrected within the JSON validator retry loop.

### 2. Expert Question Quality Ratings (n=100 MCQs)
* **Overall Accuracy (Acceptability Rate):** **96.0%** (Based on the majority-vote consensus where a question is acceptable if at least 2 out of 3 raters score it 1).
* **Prompt Adherence (Topic Relevance):** **100.0%** (proving RAG successfully mapped text context).
* **Semantic Correctness:** **98.0%**
* **Answer Key Correctness:** **97.0%**
* **Question Clarity:** **99.0%**
* **Inter-Rater Reliability (3 Experts, n=25 common subset):** **Fleiss' Kappa ($\kappa$) = 0.81** (Almost Perfect Agreement, proving high evaluation reliability).

### 3. RAG Retrieval & Chunking Effectiveness
* **Context Retrieval Relevance:** **100.0%** topic match rate across retrieved chunks (0% irrelevant retrievals).
* **Logical Block Integrity:** High retention of programming declarations and definition contexts across the chunking windows.

---

## Slide 15: Contributions & Novelty
* **Contributions:**
  * A subset-based multi-rater expert agreement framework (using Fleiss' Kappa) to evaluate MCQ pedagogical suitability with reduced expert grading overhead.
  * Structured methodology for locally deployed RAG pipelines using specific recursive chunking strategies for CS slides.
  * Analysis of local open-source LLMs' ability to generate high-accuracy questions with zero external cloud dependencies.
* **Novelty:**
  * Decoupling the LMS from cloud API costs.
  * Demonstrating high factual correctness (**96% acceptability**) using small, local open-source models (`qwen2.5-coder`) combined with targeted RAG chunking and verified by a 3-expert panel.

---

## Slide 16: Conclusion & Future Work
* **Conclusion:**
  * Analysis of expert ratings and prompt adherence proves that local RAG is a highly valid approach for automated quiz generation.
  * Combining local embedding retrievals with strict formatting prompts guarantees clean, Moodle-compliant question structures.
* **Future Work:**
  * Dynamic contextual fine-tuning on course-specific syllabus repositories.
  * Adding support for essay questions and open-ended coding evaluations.
  * Automating Bloom's taxonomy level detection based on course syllabus.
