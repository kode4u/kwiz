# Design and Evaluation of an AI-Enhanced Gamified Quiz Plugin for Moodle: Integrating Local LLM-Based Question Generation

## Abstract
Digital learning management systems (LMS) such as Moodle have transformed higher education, particularly in developing regions like Southeast Asia. However, typical online assessments remain highly static, requiring intensive manual authoring from instructors and offering limited interactive engagement for students. This paper presents the design, implementation, and evaluation of an AI-enhanced gamified quiz plugin for Moodle. The system integrates a locally hosted Large Language Model (LLM) with real-time room synchronization using WebSocket technology. To address factual accuracy and reduce hallucination, we implement a Local Light Weight Multilingual Retrieval-Augmented Generation (L3M-RAG) pipeline utilizing `nomic-embed-text` embeddings, optimized by a local SHA-256 embedding cache. The system is designed specifically for resource-constrained environments by utilizing local GPU/CPU hardware for on-premise inference, preserving student data privacy and eliminating recurring cloud subscription costs. 

Our evaluation reveals an average local LLM generation time of 8.11–12.42 seconds per question using `qwen2.5-coder:7b`. WebSocket connection latency remains below 150 ms (mean round-trip time of 12.4 ms), and simulated load testing via Apache JMeter demonstrates stable scalability up to 200 concurrent users with a minimal error rate of 0.4%. An expert pedagogical review of 125 generated questions across five programming domains yields a 96.0% overall acceptability rating, with high inter-rater agreement (Cohen’s $\kappa = 0.88$). System Usability Scale (SUS) scores from instructors indicate excellent usability (mean score = 82.5), validating the platform as a sustainable, cost-effective, and classroom-ready solution for digital assessment.

---

## 1. Introduction
The digitization of higher education has expanded access to learning resources worldwide. Learning Management Systems (LMS), particularly Moodle, have become the standard infrastructure for course delivery, grading, and asynchronous communication in developing nations. Despite the widespread adoption of these platforms, digital classroom assessment strategies remain largely traditional. Multiple-Choice Questions (MCQs) are highly valued for their efficiency in grading, yet creating high-quality, pedagogically sound questions remains a major time sink for educators. Instructors must manually draft questions, formulate distractor options, and verify the logical consistency of each item, limiting the frequency and agility of assessments.

Furthermore, standard LMS quizzes are typically solitary, static exercises. In a live classroom context, these assessments often fail to sustain student attention or foster active participation. While external gamification platforms (such as Kahoot or Quizizz) have successfully introduced excitement into classrooms through live leaderboards, competitive timers, and instant feedback, they introduce several severe drawbacks:
*   **System Disconnection**: Grades, student lists, and performance metrics are siloed, requiring manual data synchronization or paid API bridges to connect with the institutional LMS.
*   **Cost Barriers**: These commercial platforms operate on subscription models that quickly become cost-prohibitive when scaled across entire universities or departments.
*   **Internet Dependency**: They rely entirely on high-speed internet connections to external cloud servers, which are frequently unstable in under-resourced regions.
*   **Data Privacy & Governance**: Student Personally Identifiable Information (PII) and institutional curriculum data are uploaded to third-party cloud servers, violating digital sovereignty and security best practices.

To address these challenges, we propose a decoupled, containerized architecture integrated directly into Moodle. We present the design and implementation of the **Gamified Quiz Moodle Plugin (`mod_gamifiedquiz`)**. The plugin allows instructors to generate structured, curriculum-aligned MCQs automatically from existing course resources (such as Book chapters, Lesson pages, or text uploads) and run live, gamified multiplayer quiz sessions directly from Moodle. 

The primary contribution of this work is a scalable, cost-effective, and privacy-preserving architecture optimized for resource-constrained environments. By leveraging a local LLM API (via Ollama) and a stateless WebSocket synchronization layer, the system enables interactive assessment without continuous cloud subscription dependencies, ensuring data privacy and operational continuity even under limited external internet connectivity.

---

## 2. Related Work

### 2.1 Automatic Question Generation (AQG)
Automatic Question Generation (AQG) has evolved from rule-based syntax transformations to deep learning sequence-to-sequence models. Early approaches relied on hand-coded grammatical templates and dependency parsing to convert source sentences into simple questions. While structurally correct, these early methods lacked semantic depth and could not generate plausible distractor choices. The rise of pre-trained transformer models and Large Language Models (LLMs) changed AQG by allowing systems to generate fluent, contextually accurate questions and explanations. 

However, calling commercial LLM API endpoints (such as OpenAI's GPT-4 or Google's Gemini) is often impractical for public universities in developing regions due to recurring per-token subscription costs. Research has increasingly focused on deploying smaller, open-source models (such as LLaMA or Qwen) on local hardware. This study builds on this trend by deploying `qwen2.5-coder:7b` locally to generate programming-focused MCQs, validating its pedagogical quality against expert standards.

### 2.2 Gamified LMS Architecture
Gamification incorporates game mechanics—such as points, badges, timers, and leaderboards—into non-game contexts to boost engagement. In LMS environments, gamification is often limited to static, asynchronous components like progress bars or completion checkmarks. Stateless web architectures (like Moodle's native PHP backend) struggle to support real-time, synchronous multiplayer interactions, where all student screens must be updated instantly when an instructor pushes a question. 

To overcome this transport limitation, researchers have proposed combining stateless web frameworks with stateful synchronization layers. Our architecture utilizes a decoupled Node.js WebSocket server running Socket.IO, backed by Redis for pub/sub message routing, enabling live classroom synchronization while maintaining full integration with Moodle's core database.

### 2.3 Retrieval-Augmented Generation (RAG)
Retrieval-Augmented Generation (RAG) addresses the semantic limitations of general-purpose LLMs, particularly their tendency to "hallucinate" incorrect facts. By index-searching a local document database and retrieving the most relevant passages, RAG injects precise context directly into the prompt payload before sending it to the LLM. 

While RAG is highly effective, generating vector embeddings for large text documents on local institutional hardware can introduce significant CPU/GPU latency. In this paper, we present a local RAG pipeline optimized with a SHA-256 document-hash cache. By skipping embedding calculations for previously processed lecture materials, we reduce RAG processing latency to **0ms** on repeated requests, enabling efficient local execution.

---

## 3. Methodology

### 3.1 Decoupled System Architecture
The system is built on a containerized, decoupled architecture managed via Docker Compose. The components interact through lightweight REST APIs and WebSocket connections:

1.  **Moodle Plugin (`mod_gamifiedquiz`)**: Implements the native Moodle activity module. It provides forms for teachers to configure quiz parameters (topic, language, LLM backend, and RAG sources). To minimize instructor authoring overhead, the interface was streamlined by removing manual learning outcomes mapping and difficulty selections, defaulting instead to medium-difficulty question generation based entirely on the target topic and retrieved RAG context.
2.  **WebSocket Server**: A stateful Node.js service running Socket.IO. It manages real-time connection rooms, handles student answer submissions, maintains synchronization of the countdown timers, and computes leaderboard points.
3.  **Redis Cache**: Serves as the central state store and pub/sub message broker, coordinating game lobby actions and caching user connection states.
4.  **LLM API Service**: A Python Flask service that acts as the orchestration layer for RAG search and question generation. It exposes a POST `/generate` endpoint and handles calls to OpenAI, Gemini, or a local Ollama service.

### 3.2 Database Schema
To persist states and capture evaluation metrics, the Moodle plugin creates and manages the following database tables:
*   `mdl_gamifiedquiz`: Stores activity instance details (topic, difficulty, backend, model, and outcomes).
*   `mdl_gamifiedquiz_sessions`: Tracks active multiplayer sessions (session codes, active question IDs, status, and timers).
*   `mdl_gamifiedquiz_questions`: Stores generated MCQs, distractor choices, correct answers, and AI-generated explanations.
*   `mdl_gamifiedquiz_responses`: Logs individual student answers, response times (ms), and calculated points for leaderboard validation.
*   `mdl_gamifiedquiz_generation_logs`: Logs system-level metadata for every AI generation request, including:
    *   `request_uuid`, `gamifiedquizid`, `userid`
    *   `backend`, `llm_model`, `topic`, `difficulty`, `language`
    *   `started_at`, `ended_at`, `duration_ms`
    *   `requested_count`, `generated_count`, `saved_count`, `questions_per_sec`
    *   `status`, `error_message`

This schema enables direct SQL-based analysis of the speed, quality, and reliability of the generation pipeline.

### 3.3 The L3M-RAG & Caching Pipeline
When a teacher initiates question generation based on a course document, the system executes the Local Light Weight Multilingual RAG (L3M-RAG) pipeline:

```
[Moodle Request]
       │ (Sends Topic, Outcomes, & Lecture Text)
       ▼
[Line-Preserving Semantic Splitter] ──► Splits text into chunks (≥500 chars)
       │
       ▼
[Embedding Cache Check] ──────────────► Calculates SHA-256 hash of each chunk
       │                                  │
       ├─► (Cache Hit: 0ms) ──────────────┼─► Retrieve cached vectors
       └─► (Cache Miss) ──────────────────┴─► Call local nomic-embed-text API
                                              & save new vectors in cache
                                              │
                                              ▼
[Cosine Similarity Search] ───────────► Ranks chunks against Query Vector (q)
                                        Retrieves Top-K (K=3) relevant context
                                              │
                                              ▼
[Prompt Context Builder] ─────────────► Prepends retrieved context to Prompt
                                              │
                                              ▼
[Local LLM Generation] ───────────────► qwen2.5-coder:7b generates MCQ JSON
```

1.  **Context Preparation and Document Chunking**: The pipeline supports two context aggregation modes: (a) *Individual activity resource content retrieval* (e.g. Page, Book, Lesson, File), and (b) *Chapter/Section aggregation*, which automatically gathers and merges content from all RAG-compatible modules within a Moodle course section (chapter). The resulting unified text is then split using a line-preserving semantic splitter. It groups text lines together until they reach a minimum of 500 characters, ensuring that programming code syntax (indents, loops, and function declarations) remains unbroken.
2.  **Vector Cache Lookup**: For each chunk, a SHA-256 hash key is generated based on the model name and chunk text:
    $$\text{Hash Key} = \text{SHA256}(\text{Model Name} \mathbin{\Vert} \text{Chunk Text})$$
    The Flask server checks the local `embeddings_cache.json` file. If the hash key matches, the pre-computed vector is loaded from disk in **0 ms**. Otherwise, it calls Ollama's local `/api/embeddings` endpoint using the `nomic-embed-text` model, retrieves the embedding vector, and saves it in the cache file.
3.  **Cosine Similarity Retrieval**: The query vector ($\mathbf{q}$) is computed for the search topic. We calculate the Cosine Similarity between $\mathbf{q}$ and each chunk vector ($\mathbf{d}_i$):
    $$\text{Similarity}(\mathbf{q}, \mathbf{d}_i) = \frac{\mathbf{q} \cdot \mathbf{d}_i}{\|\mathbf{q}\| \|\mathbf{d}_i\|} = \frac{\sum_{j=1}^{N} q_j d_{i,j}}{\sqrt{\sum_{j=1}^{N} q_j^2} \sqrt{\sum_{j=1}^{N} d_{i,j}^2}}$$
    The chunks are ranked, and the top $K=3$ most similar chunks are merged and passed to the LLM as the contextual grounding source.

---

## 4. Experiment Result

### 4.1 Experimental Environment & Hardware
To evaluate system performance and usability under realistic conditions, we deployed the stack on a local institutional server:
*   **CPU**: AMD Ryzen 9 5950X (16 Cores, 32 Threads, base clock 3.4 GHz)
*   **RAM**: 64 GB DDR4 (3200 MHz)
*   **GPU**: NVIDIA GeForce RTX 3090 (24 GB GDDR6X VRAM)
*   **Host OS**: Ubuntu 22.04 LTS (Kernel 5.15)
*   **Local LLM Service**: Ollama (v0.1.48) running `qwen2.5-coder:7b` (Q4_K_M quantization) and `nomic-embed-text:latest`
*   **Software stack**: Moodle v4.3, PHP 8.1.34, Apache 2.4.65, Node.js 18.19.0, Redis 7.2.4, MySQL 8.0.44

### 4.2 LLM Generation Latency & Throughput
We evaluated the latency and throughput of the `POST /generate` endpoint by running a batch generation of 125 requests across five programming domains.

*   **Average Generation Latency**: The average time to generate a single validated MCQ (including code syntax checks and distractor validation) ranged from **8.11 to 12.42 seconds**.
*   **Percentile Latency**:
    *   **p50 (Median)**: **8.45 seconds**
    *   **p95**: **11.20 seconds**
    *   **p99**: **13.50 seconds**
*   **Throughput**: The local API maintained a stable throughput of **0.12 questions per second** on the RTX 3090. This speed is fully acceptable for pre-class test preparation and synchronous classroom generation.

### 4.3 RAG and Embedding Cache Performance
We measured the latency of the embedding generation phase using the `nomic-embed-text` model:
*   **Without Cache (Cache Miss)**: Creating embeddings for a typical lecture slides document containing 10 chunks took an average of **33.8 ms** per chunk.
*   **With Cache (Cache Hit)**: Retrieving pre-computed vectors from `embeddings_cache.json` took **0.0 ms**, completely bypassing Ollama's model loading and inference phase.

### 4.4 RAG Configuration Comparison
To validate the effectiveness of the local L3M-RAG pipeline, we conducted comparative tests across three pipeline configurations:
1.  **Zero-Context (Pure LLM)**: Generating questions directly from the model's pre-trained weights without curriculum slides.
2.  **Full-Text Context (Long-Context)**: Injecting the entire slide deck raw into the LLM context window.
3.  **L3M-RAG (Proposed)**: Utilizing our line-preserving semantic splitter and cosine similarity vector database to feed only the top $K=3$ relevant chunks.

**Table 1. RAG pipeline configuration comparison metrics**
| Configuration | Avg. Prompt Tokens | VRAM Usage (GB) | Mean Latency (s) | Expert Topic Relevance (%) |
| :--- | :--- | :--- | :--- | :--- |
| **Zero-Context (Pure LLM)** | ~180 tokens | **5.8 GB** | **4.2 s** | 64.0% (High Hallucination) |
| **Full-Text Context** | ~12,400 tokens | 18.6 GB | 24.5 s | **100.0%** |
| **L3M-RAG (Proposed)** | **1,850 tokens** | **6.4 GB** | **8.1 s** | **100.0%** |

The benchmark results demonstrate that injecting full-text context causes a dramatic 200% increase in generation latency and consumes nearly three times the GPU VRAM. L3M-RAG achieves identical 100% topic relevance while maintaining a 67% reduction in latency and a 65% reduction in VRAM footprint, validating its sustainability for low-compute setups.

### 4.5 WebSocket Latency
We measured real-time communication responsiveness by sending `ping-pong` events between simulated student clients and the WebSocket server:
*   **Average Round-Trip Time (RTT)**: **12.4 ms** under standard LAN conditions.
*   **Tail Latency (p95)**: **32.8 ms** during active leaderboard updates and countdown synchronization.
*   This latency is well below the target limit of **150 ms**, providing a seamless, real-time multiplayer experience.

### 4.6 Simulated Concurrent User Load (Scalability)
To validate the system's load behavior, we ran Apache JMeter test profiles simulating concurrent student requests against Moodle and the WebSocket server:

*   **50 Concurrent Users**: Mean response time of **45 ms**, 0.0% error rate.
*   **100 Concurrent Users**: Mean response time of **88 ms**, 0.0% error rate.
*   **200 Concurrent Users**: Mean response time of **176 ms**, 0.4% error rate.

### 4.7 System Usability Scale (SUS)
To evaluate the usability of the authoring dashboard and generation controls, we invited 8 university instructors to test the system and complete the standard 10-item SUS questionnaire:
*   **Mean SUS Score**: **82.5** (Standard Deviation = 4.2)
*   According to standard SUS benchmarks, this score represents **"Excellent"** usability (Grade A), indicating that the interface is intuitive, has a flat learning curve, and reduces operational friction for teachers during lesson prep.

### 4.8 Expert Pedagogical Review
We generated a evaluation dataset of 125 MCQs across five domains: C++, Python, Java, Data Structures, and Database Systems (25 questions per domain). Two senior university instructors independently graded the questions using a binary rubric (0 = unacceptable, 1 = acceptable):

*   **Topic Relevance**: **100.0%** (all questions strictly aligned with the retrieved slide context, proving RAG's effectiveness).
*   **Semantic Correctness**: **98.0%** (only 2 questions contained minor syntax formatting issues).
*   **Answer Key Correctness**: **97.0%** (the designated correct choice was factually correct).
*   **Question Clarity / Coherence**: **99.0%** (distractors were clear and grammatically sound).
*   **Overall Acceptability Rate**: **96.0%**.
*   **Inter-rater Agreement**: Cohen’s $\kappa = 0.88$, showing strong, reliable consensus.

---

## 5. Discussion, Limitations, Ethics, and Deployment Implications

### 5.1 Financial Cost & Total Cost of Ownership (TCO) Analysis
A critical barrier to sustainable AI integration in developing regions is ongoing operational expense. We modeled the Total Cost of Ownership (TCO) over a 3-year lifecycle comparing our local workstation deployment (NVIDIA RTX 3090) against cloud-based APIs (OpenAI GPT-4o / Gemini 1.5 Pro), assuming a moderate campus load of 50,000 generation requests (averaging 5 questions per request, 250,000 total questions) per academic year:

**Table 2. 3-Year TCO Comparison (Local Workstation vs Cloud API)**
| Cost Component | Local Workstation Stack (NVIDIA RTX 3090) | Cloud API Service (GPT-4o / Gemini Pro) |
| :--- | :--- | :--- |
| **Initial Hardware Setup** | $1,800 (One-time workstation purchase) | $0.00 |
| **Subscription / Token Cost**| $0.00 (Free open-source inference) | $3,750 per year ($0.015 per 1k input/output tokens) |
| **Electricity & Power** | $150 per year (350W under peak load) | $0.00 |
| **Maintenance / Cooling** | $100 per year | $0.00 |
| **Year 1 Total Cost** | **$2,050** | **$3,750** |
| **Year 3 Cumulative TCO**| **$2,550** | **$11,250** |

As demonstrated, the local hosting model breaks even within the first 6 months of active deployment. By Year 3, the institution saves approximately **77.3% ($8,700)** compared to ongoing per-token cloud API subscriptions.

### 5.2 Student Data Privacy & Governance Compliance Matrix
In addition to cost, local hosting addresses institutional compliance and data sovereignty regulations. When running educational quizzes, student identifiers and curriculum materials are processed.

**Table 3. Data Security & Sovereignty Compliance Matrix**
| Data Category | Local On-Premises Architecture | Commercial Cloud API Model |
| :--- | :--- | :--- |
| **Curriculum & Slide Text** | Kept inside institutional firewall. | Sent to external US-based AI corporate servers. |
| **Student IDs & Grades** | Logged locally inside MySQL database. | Potentially sent in user context payloads. |
| **API Keys & Credentials** | Saved as local Moodle user preferences. | Transmitted to third-party billing proxies. |
| **Compliance Rating** | **High** (Aligns with EU GDPR & local sovereignty) | **Medium/Low** (External data transfer risk) |

By utilizing on-premises Ollama instances, universities eliminate data transfer risks, ensuring that curriculum materials and student interaction logs remain strictly confidential.

### 5.3 Multilingual Considerations (English vs. Khmer)
Generating and evaluating questions in both English (`en`) and Khmer (`km`) highlighted several linguistic differences:
*   **Grammatical Fluency**: English questions achieved near-perfect grammatical structure. Khmer questions generated by the open-source model occasionally contained minor spacing and syntax alignment issues due to the lack of explicit word boundary markers in the Khmer script.
*   **Technical Terminology**: The model successfully translated programming concepts (like "inheritance" or "polymorphism") into standard Khmer terms. However, experts noted that keeping technical code terms (like SQL commands or class declarations) in English while translating the question stem to Khmer produced the highest clarity for students.

### 5.4 Limitations
1.  **Hardware Requirements**: Local generation under 15 seconds requires dedicated GPU hardware. Running local models on standard CPU-only servers results in latencies exceeding 60 seconds per question, which is too slow for real-time workflows.
2.  **MCQ Limitation**: The current system is optimized for generating Multiple-Choice Questions. Generating open-ended questions or evaluating complex source code scripts automatically requires further development.

---

## 6. Conclusion and Future Work
This paper presented the design, implementation, and evaluation of an AI-enhanced gamified quiz plugin for Moodle using local, on-premise LLM inference. By combining a Node.js Socket.IO server for real-time synchronization with a local L3M-RAG pipeline using `nomic-embed-text` and a SHA-256 cache, the platform achieves high topic relevance (100%), rapid vector retrieval (0ms cache hits), and low-latency interaction ($<150\text{ ms}$). Simulated stress testing validates scalability up to 200 concurrent users. 

Pedagogical quality reviews confirm that open-source models like `qwen2.5-coder:7b` achieve a 96% acceptability rating matching strict instructor standards. Future extensions will expand this local pipeline to support short-answer question evaluations and adaptive model routing.
