# Executive Compendium of Related Literature
## An Annotated Guide to Key References for Course-Grounded Assessment Generation in Moodle
**Companion Research Dossier for Manuscript Submission to *Education and Information Technologies* (EAIT)**

---

### Executive Overview

This compendium synthesizes the **19 core foundational and contemporary research works** informing the architecture, empirical methodology, and systems evaluation of our self-hosted RAG assessment pipeline for Moodle (**Kwiz**). 

For rapid manual reading and verification, each entry below provides:
1. **Bibliographic Metadata & Local PDF Filename** in `experiment/papers/reference_pdfs/`
2. **Core Research Objective & Methodology**
3. **Key Findings & Quantitative Benchmarks**
4. **Direct Relevance to Our Manuscript** (what gap it left, how our work compares, and why it is cited)
5. **1-Minute Quick-Scan Takeaway**

---

## [1] Automatic Multiple-Choice Question Generation and Evaluation Systems Based on LLM: A Study Case with University Resolutions
* **Authors:** S. S. Mucciaccia, T. M. Paixão, F. W. Mutz, C. S. Badue, A. F. de Souza, & T. Oliveira-Santos
* **Venue & Year:** Proceedings of the 31st International Conference on Computational Linguistics (COLING 2025), pp. 2246–2260
* **Category:** `MCQ Generation & Evaluation`
* **Associated File:** `mucciaccia_2025_mcq_coling.pdf` in `reference_pdfs/`

> **1-Minute Quick-Scan Takeaway:**  
> Proves LLM-based MCQ generation is pedagogically feasible for institutional texts, but highlights the necessity of deterministic verification and grounding.

* **Core Research Objective:** To investigate automated multiple-choice question generation and multi-dimensional LLM evaluation systems grounded in institutional regulatory documents (university resolutions).
* **Methodology & Architecture:** Constructed an automated question generation pipeline using large language models conditioned on official administrative texts. Employed automated LLM evaluators to score questions across factual consistency, relevance, and distractor plausibility.
* **Key Findings & Evidence:** Demonstrated that instruction-tuned LLMs can reliably generate multiple-choice questions from institutional corpora, but naive generation frequently introduces subtle distractor ambiguities or hallucinations without strict grounding constraints.
* **Direct Relevance to Our Kwiz Paper:** Directly cited in Section 1 and Section 2.1 as foundational precedent establishing LLM-based MCQ generation. We extend Mucciaccia et al. by shifting from administrative university texts to programming-specific code generation with deterministic Python AST syntax compilation and Moodle Question Bank integration.

---

## [2] Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks
* **Authors:** Patrick Lewis, Ethan Perez, Aleksandra Piktus, Fabio Petroni, Vladimir Karpukhin, Naman Goyal, Heinrich Küttler, Mike Lewis, Wen-tau Yih, Tim Rocktäschel, Sebastian Riedel, & Douwe Kiela
* **Venue & Year:** Advances in Neural Information Processing Systems (NeurIPS 2020), 33, 9459–9474
* **Category:** `Foundational RAG Architecture`
* **Associated File:** `lewis_2020_rag.pdf` in `reference_pdfs/`

> **1-Minute Quick-Scan Takeaway:**  
> The seminal paper establishing that external retrieval dramatically reduces hallucination in generative language models.

* **Core Research Objective:** To develop a general-purpose hybrid architecture that combines parametric memory (pre-trained seq2seq models) with non-parametric memory (dense vector index of Wikipedia) for knowledge-intensive generation tasks.
* **Methodology & Architecture:** Proposed RAG-Sequence and RAG-Token models using a dense passage retriever (DPR) coupled with a BART generator, fine-tuning retrieval and generation end-to-end.
* **Key Findings & Evidence:** RAG models achieved state-of-the-art results on open-domain question answering (Natural Questions, TriviaQA), substantially reducing factual hallucinations compared to purely parametric models.
* **Direct Relevance to Our Kwiz Paper:** Foundational citation in Section 1 and Section 2.1. Our architecture adapts Lewis et al.'s retrieval-augmented paradigm specifically for educational courseware, using local dense retrieval (`nomic-embed-text`) to ground programming questions in instructor-uploaded slides.

---

## [3] Retrieval-Augmented Generation for Educational Application: A Systematic Survey
* **Authors:** Z. Li, Z. Wang, W. Wang, K. Hung, H. Xie, & F. L. Wang
* **Venue & Year:** Computers and Education: Artificial Intelligence (2025), 8, 100417
* **Category:** `Educational RAG Survey`
* **Associated File:** `li_2025_educational_rag_survey.pdf` in `reference_pdfs/`

> **1-Minute Quick-Scan Takeaway:**  
> Highlights that computational cost and dynamic knowledge updating are the primary barriers to deploying educational RAG.

* **Core Research Objective:** To systematically survey the emerging landscape of retrieval-augmented generation applications across educational contexts, identifying pedagogical opportunities, technical architectures, and open challenges.
* **Methodology & Architecture:** Systematic literature review covering interactive learning companions, automated assessment systems, content curation pipelines, and institutional tutoring platforms across K-12 and higher education.
* **Key Findings & Evidence:** Identified knowledge-base updating latency, computational resource constraints in educational institutions, and curricular hallucinations as the three foremost technical bottlenecks impeding widespread RAG adoption in schools and universities.
* **Direct Relevance to Our Kwiz Paper:** Key motivating literature in Section 1, Section 2.1, and Section 2.5. Our Kwiz paper directly resolves the exact challenges identified by Li et al. by proposing incremental SHA-256 chunk caching and a single-GPU self-hosted architecture for Moodle.

---

## [4] Retrieval-Augmented Generation for Multiple-Choice Questions and Answers Generation
* **Authors:** N. Pradeesh, T. Remya, M. G. Thushara, K. A. Krishna, & V. Pranav
* **Venue & Year:** Procedia Computer Science (2025), 259, 504–511
* **Category:** `LMS Question Generation`
* **Associated File:** `Reference [4] (Procedia Computer Science)` in `reference_pdfs/`

> **1-Minute Quick-Scan Takeaway:**  
> Validates PDF-to-quiz generation in an LMS, establishing the baseline workflow that Kwiz optimizes.

* **Core Research Objective:** To investigate automated multiple-choice question generation from PDF course resources and integrate question delivery within the Ample Learning Management System.
* **Methodology & Architecture:** Extracted text from lecture PDFs, chunked content into passages, embedded text into a vector database, and prompted an LLM to generate questions and corresponding options.
* **Key Findings & Evidence:** Confirmed that grounding generation on PDF textbooks significantly improves topical alignment, but full re-indexing of course documents upon each upload introduces noticeable server delays.
* **Direct Relevance to Our Kwiz Paper:** Cited in Section 1 and Section 2.2 to demonstrate that LMS-integrated RAG question generation has precedent. We advance beyond Pradeesh et al. by introducing incremental content-hash caching, programming code execution validation, and native Moodle Question Bank persistence.

---

## [5] Leveraging Large Language Models to Generate Course-Specific Semantically Annotated Learning Objects
* **Authors:** D. Lohr, M. Berges, A. Chugh, M. Kohlhase, & D. Müller
* **Venue & Year:** Journal of Computer Assisted Learning (2025), 41(1), e13101
* **Category:** `Computer Science Education`
* **Associated File:** `Reference [5] (JCAL Wiley)` in `reference_pdfs/`

> **1-Minute Quick-Scan Takeaway:**  
> Shows that automated CS question generation still needs human instructor oversight, justifying our asynchronous Moodle staging design.

* **Core Research Objective:** To evaluate the feasibility and quality of LLM-generated computer science assessment objects grounded in university course materials.
* **Methodology & Architecture:** Evaluated generated programming learning objects using computer science education faculty raters across multiple cognitive complexity levels.
* **Key Findings & Evidence:** Found that while LLMs generate syntactically plausible items, approximately 15–25% of generated computer science questions still require manual human intervention due to subtle conceptual errors or misaligned distractors.
* **Direct Relevance to Our Kwiz Paper:** Directly cited in Section 1, Section 2.2, and Section 3.4. Lohr et al.'s finding that expert intervention remains necessary directly motivated our asynchronous human-in-the-loop workflow: generated items are staged in Moodle for instructor review rather than published directly to active student quizzes.

---

## [6] Enhancing RAG-Based MCQ Generation for Java Programming Education: A Modular Evaluation of Chunking, Retrieval and LLM Performance
* **Authors:** E. Olibo
* **Venue & Year:** Bachelor's Thesis, Kristianstad University (2025)
* **Category:** `Programming-Specific RAG`
* **Associated File:** `Reference [6] (Kristianstad DiVA)` in `reference_pdfs/`

> **1-Minute Quick-Scan Takeaway:**  
> Confirms code-specialized LLMs outperform general LLMs for programming MCQs, justifying our selection of Qwen2.5-Coder.

* **Core Research Objective:** To conduct an extensive modular evaluation comparing various text chunking strategies, vector retrieval top-K configurations, and instruction-tuned LLMs for generating Java programming MCQs.
* **Methodology & Architecture:** Benchmarked multiple embedding models and open-weight LLMs across diverse chunking sizes (256, 512, 1024 tokens) and evaluated question quality across syntax, distractors, and difficulty.
* **Key Findings & Evidence:** Demonstrated that programming MCQ generation requires specialized instruction-tuned code models (such as Qwen-Coder or CodeLlama) and that bounded context windows prevent retrieval noise from corrupting code syntax.
* **Direct Relevance to Our Kwiz Paper:** Cited in Section 2.2 as closely related domain work. Because Olibo thoroughly explored hyperparameter sweeps for Java, our study fixes a single optimal deployment configuration (`Qwen2.5-Coder-7B-Instruct` + `nomic-embed-text`) and investigates operational systems metrics: latency, caching, and concurrency.

---

## [7] Self-Hosted Lecture-to-Quiz: Local LLM MCQ Generation with Deterministic Quality Control
* **Authors:** S. A. Shintani
* **Venue & Year:** arXiv preprint arXiv:2603.08729 (2026)
* **Category:** `Self-Hosted Assessment Tool`
* **Associated File:** `Reference [7] (arXiv:2603.08729)` in `reference_pdfs/`

> **1-Minute Quick-Scan Takeaway:**  
> Demonstrated local, self-hosted question generation is feasible, but lacked vector retrieval, incremental caching, and LMS database integration.

* **Core Research Objective:** To develop an API-free, self-hosted lecture-to-quiz authoring tool that runs locally on commodity hardware with deterministic quality verification.
* **Methodology & Architecture:** Fed raw lecture slide transcripts directly into a locally hosted LLM without vector retrieval, applying heuristic rule-based checks and exporting questions as static Google Forms CSV files.
* **Key Findings & Evidence:** Demonstrated that local inference avoids recurring commercial API costs and protects institutional privacy. However, feeding entire lectures directly into the prompt without retrieval causes severe context token bloat and limits scalability.
* **Direct Relevance to Our Kwiz Paper:** Cited in Section 1 and Section 2.3. Kwiz improves upon Shintani's architecture by: (1) incorporating dense vector retrieval (RAG) rather than injecting full slides, (2) adding SHA-256 incremental embedding reuse, (3) validating code via Python AST, and (4) integrating dynamically into Moodle's relational database instead of static CSV exports.

---

## [8] A Course-Specific Agentic RAG Chatbot for IT Student Support: Architecture, Local Deployment, and Preliminary Evaluation
* **Authors:** H. V. Tran, P. V. Nguyen, T. T. N. Vu, H. P. Luong, & D.-N. Le
* **Venue & Year:** Next-Generation Computing Systems and Technologies (2026), 2(2), 21–34
* **Category:** `On-Premise University RAG`
* **Associated File:** `Reference [8] (NGCST 2026)` in `reference_pdfs/`

> **1-Minute Quick-Scan Takeaway:**  
> Confirms on-premise university RAG satisfies privacy and compliance, but underscores the need for hardware-efficient inference.

* **Core Research Objective:** To design, deploy, and evaluate an on-premise agentic RAG chatbot for course-specific IT student tutoring at Hai Phong University.
* **Methodology & Architecture:** Deployed an open-weight language model on a local institutional server, indexing syllabus and lecture documents to support student Q&A interactions.
* **Key Findings & Evidence:** Proved that local institutional deployments effectively resolve student data privacy concerns and institutional compliance mandates, but identified high server response latency during peak student usage hours.
* **Direct Relevance to Our Kwiz Paper:** Cited in Section 2.3. While Tran et al. focused on conversational student Q&A, our study focuses on instructor-facing structured assessment generation, deterministic schema compilation, and concurrent batch generation.

---

## [9] Towards Sustainable AI Knowledge-Base Assistants in Computer Science Education: On-Premise Deployment and Optimization with Open Educational Resources
* **Authors:** X. Shen, L. Feng, S. Hua, D. Liu, Z. Xie, & B. Liu
* **Venue & Year:** Frontiers in Psychology (2026), 17, 1843444
* **Category:** `Sustainable On-Premise AI`
* **Associated File:** `shen_2026_sustainable_ai_assistant.pdf` in `reference_pdfs/`

> **1-Minute Quick-Scan Takeaway:**  
> Validates that a single 24 GB consumer GPU (RTX 3090) is the optimal, sustainable hardware sweet spot for university AI deployment.

* **Core Research Objective:** To evaluate the sustainability, financial feasibility, and operational envelope of deploying local LLM assistants using consumer-grade GPUs in computer science education.
* **Methodology & Architecture:** Deployed open-source models on consumer-grade NVIDIA graphics cards (RTX 3090/4090), measuring power consumption, VRAM occupancy, and response turnaround across open educational resource (OER) corpora.
* **Key Findings & Evidence:** Showed that a single 24 GB GPU can sustainably host 7B–14B quantized models for educational workloads, eliminating cloud subscription fees while maintaining acceptable response times under low-to-moderate concurrency.
* **Direct Relevance to Our Kwiz Paper:** Directly cited in Section 1 and Section 2.3. Shen et al. validate our hardware constraint (a single dedicated RTX 3090 host). We build on their systems analysis by evaluating an assessment authoring pipeline with incremental caching and multi-request instructor load testing.

---

## [10] CacheBlend: Fast Large Language Model Serving for RAG with Cached Knowledge Fusion
* **Authors:** J. Yao, H. Li, Y. Liu, S. Ray, Y. Cheng, Q. Zhang, K. Du, S. Lu, & J. Jiang
* **Venue & Year:** Proceedings of the Twentieth European Conference on Computer Systems (EuroSys '25), pp. 94–109
* **Category:** `Inference KV-Cache Optimization`
* **Associated File:** `yao_2025_cacheblend.pdf` in `reference_pdfs/`

> **1-Minute Quick-Scan Takeaway:**  
> Demonstrates that caching intermediate representations in RAG prevents GPU bottlenecks, reinforcing our pipeline caching philosophy.

* **Core Research Objective:** To eliminate the redundant prompt prefill computation in RAG systems by dynamically reusing and fusing precomputed Key-Value (KV) cache states of retrieved document chunks.
* **Methodology & Architecture:** Developed CacheBlend, an inference-engine extension that selectively merges KV-cache activations of retrieved chunks, reducing prompt token prefill overhead on GPU memory.
* **Key Findings & Evidence:** Achieved 2.3× to 4.7× speedup in Time-to-First-Token (TTFT) and significantly reduced prefill compute for long-context RAG pipelines.
* **Direct Relevance to Our Kwiz Paper:** Cited in Section 2.4 and Section 6.3. We distinguish our work from CacheBlend: whereas CacheBlend operates at the GPU inference layer (KV-cache fusion), Kwiz operates earlier in the pipeline (content hashing and embedding reuse during courseware indexing). We identify KV-cache fusion as the primary scaling path for future sub-second generation.

---

## [11] TurboRAG: Accelerating Retrieval-Augmented Generation with Precomputed KV Caches for Chunked Text
* **Authors:** S. Lu, H. Wang, Y. Rong, Z. Chen, & Y. Tang
* **Venue & Year:** Proceedings of the 2025 Conference on Empirical Methods in Natural Language Processing (EMNLP 2025), pp. 6588–6601
* **Category:** `RAG Acceleration & KV-Cache`
* **Associated File:** `lu_2025_turborag.pdf` in `reference_pdfs/`

> **1-Minute Quick-Scan Takeaway:**  
> Proves that avoiding repeated text encoding is the key to high-throughput RAG systems.

* **Core Research Objective:** To accelerate RAG response generation by offline precomputing and caching Key-Value states for static knowledge base chunks.
* **Methodology & Architecture:** Pre-processes text chunks through LLM attention layers offline and stores KV tensors, retrieving and concatenating KV representations at query time to bypass token prefill.
* **Key Findings & Evidence:** TurboRAG reduced prompt processing latency by up to 80% with minimal degradation in generation accuracy.
* **Direct Relevance to Our Kwiz Paper:** Cited in Section 2.4 and Section 6.3 alongside CacheBlend. We cite TurboRAG to contextualize where caching occurs in modern RAG literature and clarify that Kwiz's contribution lies in workload-level courseware lifecycle reuse rather than algorithmic KV-cache manipulation.

---

## [12] Developing a Computer-Based Tutor Utilizing Generative Artificial Intelligence (GAI) and Retrieval-Augmented Generation (RAG)
* **Authors:** Youngjin Lee
* **Venue & Year:** Education and Information Technologies (EAIT 2025), 30(6), 7841–7862
* **Category:** `EAIT Journal Precedent`
* **Associated File:** `Reference [14] (EAIT Springer)` in `reference_pdfs/`

> **1-Minute Quick-Scan Takeaway:**  
> Direct EAIT precedent confirming that RAG is essential for curriculum grounding and eliminating AI inaccuracies in higher education.

* **Core Research Objective:** To design, implement, and evaluate an intelligent computer-based tutor utilizing generative AI and RAG to support personalized statistics education while curbing hallucinations.
* **Methodology & Architecture:** Integrated external textbook and curriculum resources into a RAG framework, evaluating student interaction logs, conceptual learning gains, and factual response accuracy.
* **Key Findings & Evidence:** Demonstrated that grounding LLM responses in curricular texts significantly enhances conceptual accuracy, mitigates hallucination, and fosters student trust in automated tutoring systems.
* **Direct Relevance to Our Kwiz Paper:** Crucial precedent published in EAIT (our target journal). Lee (2025) proves EAIT's active interest in educational RAG. Our work directly complements Lee by addressing the instructor-facing assessment authoring counterpart (generating verified questions for the LMS Question Bank).

---

## [13] Qwen2.5-Coder Technical Report
* **Authors:** B. Hui, J. Yang, Z. Cui, X. Yang, D. Liu, L. Zhang, & J. Lin
* **Venue & Year:** arXiv preprint arXiv:2409.12186 (2024)
* **Category:** `Foundation Code LLM`
* **Associated File:** `hui_2024_qwen2.5_coder.pdf` in `reference_pdfs/`

> **1-Minute Quick-Scan Takeaway:**  
> Establishes Qwen2.5-Coder-7B as the premier open-weight model for local code generation, making single-GPU hosting possible.

* **Core Research Objective:** To report the architecture, pre-training corpus, instruction tuning, and code benchmark performance of the open-weight Qwen2.5-Coder series.
* **Methodology & Architecture:** Pre-trained on 5.5 trillion tokens of code, mathematical reasoning, and technical text, followed by multi-stage instruction tuning and reinforcement learning from code execution feedback.
* **Key Findings & Evidence:** Qwen2.5-Coder-7B-Instruct matched or outperformed proprietary models (including GPT-4o-mini and Claude-3.5-Haiku) on Python code generation benchmarks (HumanEval: 88.4%, MBPP: 82.2%).
* **Direct Relevance to Our Kwiz Paper:** Cited in Section 1, Section 3.3, and Section 4.8. Explains why we chose `Qwen2.5-Coder-7B-Instruct` as our production model: it provides state-of-the-art Python syntax accuracy while operating within the 24 GB VRAM envelope under 4-bit quantization (~4.7 GB).

---

## [14] Nomic Embed: Training a Reproducible Long-Context Text Embedder
* **Authors:** Z. Nussbaum, J. X. Morris, B. Dinh, & A. Mostern
* **Venue & Year:** arXiv preprint arXiv:2402.01613 (2024)
* **Category:** `Dense Text Embeddings`
* **Associated File:** `nussbaum_2024_nomic_embed.pdf` in `reference_pdfs/`

> **1-Minute Quick-Scan Takeaway:**  
> Validates nomic-embed-text as a high-accuracy, 8k-context open-weight embedding model for document retrieval.

* **Core Research Objective:** To train and release a high-performance, fully reproducible, open-weight text embedding model with an extended context window (8,192 tokens).
* **Methodology & Architecture:** Multi-stage contrastive pre-training and fine-tuning on diverse text retrieval pairs, producing 768-dimensional dense vector embeddings optimized for sentence and paragraph similarity.
* **Key Findings & Evidence:** Achieved top-tier retrieval performance on the MTEB benchmark, outperforming OpenAI `text-embedding-ada-002` while supporting long-context document chunks.
* **Direct Relevance to Our Kwiz Paper:** Cited in Section 3.1 and Section 4.8. `nomic-embed-text` is the dedicated embedding backbone of Kwiz, enabling semantic retrieval over curriculum slide chunks with sub-millisecond similarity computation.

---

## [15] Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena
* **Authors:** L. Zheng, W.-L. Chiang, Y. Sheng, S. Zhuang, Z. Wu, Y. Zhuang, Z. Lin, Z. Li, D. Li, E. P. Xing, H. Zhang, J. E. Gonzalez, & I. Stoica
* **Venue & Year:** Advances in Neural Information Processing Systems (NeurIPS 2023), 36, 46595–46623
* **Category:** `Automated Evaluation Protocol`
* **Associated File:** `zheng_2023_judging_llm_as_a_judge.pdf` in `reference_pdfs/`

> **1-Minute Quick-Scan Takeaway:**  
> The benchmark study validating LLM-as-a-Judge as a scientifically rigorous evaluation methodology matching human agreement.

* **Core Research Objective:** To examine whether frontier large language models (such as GPT-4) can act as automated, scalable, and reliable evaluators for natural language generation benchmarks.
* **Methodology & Architecture:** Benchmarked LLM judge agreement against human expert consensus across pairwise and Likert evaluations on MT-Bench and Chatbot Arena, analyzing position bias, verbosity bias, and self-enhancement bias.
* **Key Findings & Evidence:** Demonstrated that strong frontier LLM judges achieve >80% agreement with human experts, matching human-to-human inter-rater reliability levels.
* **Direct Relevance to Our Kwiz Paper:** Methodological foundation for Section 4.2. We adopted Zheng et al.'s LLM-as-a-Judge framework (deploying GPT-4o and Gemini 2.5 Flash as multi-evaluators) alongside calibrated human faculty grading to evaluate our 100-item MCQ corpus across five dimensions.

---

## [16] Survey of Hallucination in Natural Language Generation
* **Authors:** Z. Ji, N. Lee, R. Frieske, T. Yu, D. Su, Y. Xu, E. Ishii, Y. J. Yeung, A. Del Luceno, & P. Fung
* **Venue & Year:** ACM Computing Surveys (2023), 55(12), 1–38
* **Category:** `Hallucination & Grounding`
* **Associated File:** `ji_2023_hallucination_survey.pdf` in `reference_pdfs/`

> **1-Minute Quick-Scan Takeaway:**  
> Comprehensive taxonomy defining intrinsic and extrinsic hallucination and establishing retrieval as the primary countermeasure.

* **Core Research Objective:** To provide a comprehensive taxonomy, detection methodology, and mitigation survey of hallucinations in natural language generation.
* **Methodology & Architecture:** Categorized hallucinations into intrinsic (conflicting with source evidence) and extrinsic (unverifiable from source text), surveying retrieval-based, decoding-based, and post-processing mitigation techniques.
* **Key Findings & Evidence:** Concluded that conditioning generation on retrieved evidence chunks and enforcing structured schema constraints are among the most effective mechanisms to curb factual fabrication.
* **Direct Relevance to Our Kwiz Paper:** Cited in Section 4.2 for our Context Groundedness (CG) evaluation rubric. Used to formally define factual hallucination against course slide chunks and justify our two-tier validation engine.

---

## [17] Measuring Nominal Scale Agreement Among Many Raters & Intraclass Correlation Coefficients for Reliability
* **Authors:** J. L. Fleiss (1971) & T. K. Koo & M. Y. Li (2016)
* **Venue & Year:** Psychological Bulletin (1971), 76(5), 378–382; Journal of Chiropractic Medicine (2016), 15(2), 155–163
* **Category:** `Psychometrics & Statistical Reliability`
* **Associated File:** `Reference [12] & [13]` in `reference_pdfs/`

> **1-Minute Quick-Scan Takeaway:**  
> Provides the formal mathematical criteria and benchmark thresholds for our inter-rater reliability results.

* **Core Research Objective:** To provide formal mathematical formulations and interpretation benchmarks for multi-rater agreement (Fleiss' kappa for categorical data) and intraclass correlation (ICC(2,k) for continuous ordinal ratings).
* **Methodology & Architecture:** Formulated statistical estimators that account for chance agreement across multi-judge evaluation panels.
* **Key Findings & Evidence:** Established standard interpretative thresholds: kappa 0.61–0.80 denotes substantial agreement; ICC 0.75–0.90 denotes good reliability, and >0.90 denotes excellent reliability.
* **Direct Relevance to Our Kwiz Paper:** Methodological citations in Section 4.9 and Section 5.1. Guided our statistical analysis: our evaluation achieved Fleiss' kappa = 0.610 (substantial agreement) and ICC(2,k) = 0.764–0.981 across five dimensions.

---

## [18] Moodle: Using Learning Communities to Create an Open Source Course Management System
* **Authors:** Martin Dougiamas & Peter C. Taylor
* **Venue & Year:** Proceedings of the ED-MEDIA 2003 Conference, pp. 171–178
* **Category:** `LMS Platform Architecture`
* **Associated File:** `Reference [19] (ED-MEDIA 2003)` in `reference_pdfs/`

> **1-Minute Quick-Scan Takeaway:**  
> The foundational paper defining Moodle's modular database architecture and Question Bank design.

* **Core Research Objective:** To present the educational philosophy (social constructionist pedagogy), software architecture, and modular database schema of Moodle.
* **Methodology & Architecture:** Documented the modular course architecture, relational question bank structures, and assessment slot management mechanisms in Moodle.
* **Key Findings & Evidence:** Showed that a modular, open-source LMS architecture fosters collaborative learning, customizable workflows, and extensible database hooks for automated plugins.
* **Direct Relevance to Our Kwiz Paper:** Cited in Section 3.4 and Section 4.1. Kwiz directly integrates into Moodle's core relational database schema (`mdl_question`, `mdl_question_answers`, and `mdl_quiz_slots`), allowing generated programming MCQs to become persistent, native learning assets.

---

## [19] Secure Hash Standard (SHS)
* **Authors:** National Institute of Standards and Technology (NIST)
* **Venue & Year:** Federal Information Processing Standards Publication (FIPS PUB 180-4, 2015)
* **Category:** `Cryptographic Content Hashing`
* **Associated File:** `nist_2015_sha256_fips180-4.pdf` in `reference_pdfs/`

> **1-Minute Quick-Scan Takeaway:**  
> The official standard for SHA-256, providing the cryptographic foundation for Kwiz's 549x cache speedup.

* **Core Research Objective:** To specify secure hash algorithms (SHA-1, SHA-224, SHA-256, SHA-384, SHA-512) for computing a condensed representation of electronic data.
* **Methodology & Architecture:** Defined mathematical bitwise operations, padding constants, and compression functions guaranteeing collision resistance.
* **Key Findings & Evidence:** SHA-256 generates a deterministic 256-bit cryptographic message digest with negligible collision probability, making it the industry standard for content integrity verification.
* **Direct Relevance to Our Kwiz Paper:** Cited in Section 3.1 and Section 4.5. Kwiz computes SHA-256 hashes for each normalized course chunk, using the hash as an immutable cache lookup key to detect unchanged syllabus content and bypass redundant embedding computation.

---
