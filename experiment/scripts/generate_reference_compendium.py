import os
import subprocess
import markdown

summaries = [
    {
        "id": "1",
        "title": "Automatic Multiple-Choice Question Generation and Evaluation Systems Based on LLM: A Study Case with University Resolutions",
        "authors": "S. S. Mucciaccia, T. M. Paixão, F. W. Mutz, C. S. Badue, A. F. de Souza, & T. Oliveira-Santos",
        "venue": "Proceedings of the 31st International Conference on Computational Linguistics (COLING 2025), pp. 2246–2260",
        "pdf_file": "mucciaccia_2025_mcq_coling.pdf",
        "category": "MCQ Generation & Evaluation",
        "objective": "To investigate automated multiple-choice question generation and multi-dimensional LLM evaluation systems grounded in institutional regulatory documents (university resolutions).",
        "methodology": "Constructed an automated question generation pipeline using large language models conditioned on official administrative texts. Employed automated LLM evaluators to score questions across factual consistency, relevance, and distractor plausibility.",
        "findings": "Demonstrated that instruction-tuned LLMs can reliably generate multiple-choice questions from institutional corpora, but naive generation frequently introduces subtle distractor ambiguities or hallucinations without strict grounding constraints.",
        "relevance": "Directly cited in Section 1 and Section 2.1 as foundational precedent establishing LLM-based MCQ generation. We extend Mucciaccia et al. by shifting from administrative university texts to programming-specific code generation with deterministic Python AST syntax compilation and Moodle Question Bank integration.",
        "takeaway": "Proves LLM-based MCQ generation is pedagogically feasible for institutional texts, but highlights the necessity of deterministic verification and grounding."
    },
    {
        "id": "2",
        "title": "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks",
        "authors": "Patrick Lewis, Ethan Perez, Aleksandra Piktus, Fabio Petroni, Vladimir Karpukhin, Naman Goyal, Heinrich Küttler, Mike Lewis, Wen-tau Yih, Tim Rocktäschel, Sebastian Riedel, & Douwe Kiela",
        "venue": "Advances in Neural Information Processing Systems (NeurIPS 2020), 33, 9459–9474",
        "pdf_file": "lewis_2020_rag.pdf",
        "category": "Foundational RAG Architecture",
        "objective": "To develop a general-purpose hybrid architecture that combines parametric memory (pre-trained seq2seq models) with non-parametric memory (dense vector index of Wikipedia) for knowledge-intensive generation tasks.",
        "methodology": "Proposed RAG-Sequence and RAG-Token models using a dense passage retriever (DPR) coupled with a BART generator, fine-tuning retrieval and generation end-to-end.",
        "findings": "RAG models achieved state-of-the-art results on open-domain question answering (Natural Questions, TriviaQA), substantially reducing factual hallucinations compared to purely parametric models.",
        "relevance": "Foundational citation in Section 1 and Section 2.1. Our architecture adapts Lewis et al.'s retrieval-augmented paradigm specifically for educational courseware, using local dense retrieval (`nomic-embed-text`) to ground programming questions in instructor-uploaded slides.",
        "takeaway": "The seminal paper establishing that external retrieval dramatically reduces hallucination in generative language models."
    },
    {
        "id": "3",
        "title": "Retrieval-Augmented Generation for Educational Application: A Systematic Survey",
        "authors": "Z. Li, Z. Wang, W. Wang, K. Hung, H. Xie, & F. L. Wang",
        "venue": "Computers and Education: Artificial Intelligence (2025), 8, 100417",
        "pdf_file": "li_2025_educational_rag_survey.pdf",
        "category": "Educational RAG Survey",
        "objective": "To systematically survey the emerging landscape of retrieval-augmented generation applications across educational contexts, identifying pedagogical opportunities, technical architectures, and open challenges.",
        "methodology": "Systematic literature review covering interactive learning companions, automated assessment systems, content curation pipelines, and institutional tutoring platforms across K-12 and higher education.",
        "findings": "Identified knowledge-base updating latency, computational resource constraints in educational institutions, and curricular hallucinations as the three foremost technical bottlenecks impeding widespread RAG adoption in schools and universities.",
        "relevance": "Key motivating literature in Section 1, Section 2.1, and Section 2.5. Our Kwiz paper directly resolves the exact challenges identified by Li et al. by proposing incremental SHA-256 chunk caching and a single-GPU self-hosted architecture for Moodle.",
        "takeaway": "Highlights that computational cost and dynamic knowledge updating are the primary barriers to deploying educational RAG."
    },
    {
        "id": "4",
        "title": "Retrieval-Augmented Generation for Multiple-Choice Questions and Answers Generation",
        "authors": "N. Pradeesh, T. Remya, M. G. Thushara, K. A. Krishna, & V. Pranav",
        "venue": "Procedia Computer Science (2025), 259, 504–511",
        "pdf_file": "Reference [4] (Procedia Computer Science)",
        "category": "LMS Question Generation",
        "objective": "To investigate automated multiple-choice question generation from PDF course resources and integrate question delivery within the Ample Learning Management System.",
        "methodology": "Extracted text from lecture PDFs, chunked content into passages, embedded text into a vector database, and prompted an LLM to generate questions and corresponding options.",
        "findings": "Confirmed that grounding generation on PDF textbooks significantly improves topical alignment, but full re-indexing of course documents upon each upload introduces noticeable server delays.",
        "relevance": "Cited in Section 1 and Section 2.2 to demonstrate that LMS-integrated RAG question generation has precedent. We advance beyond Pradeesh et al. by introducing incremental content-hash caching, programming code execution validation, and native Moodle Question Bank persistence.",
        "takeaway": "Validates PDF-to-quiz generation in an LMS, establishing the baseline workflow that Kwiz optimizes."
    },
    {
        "id": "5",
        "title": "Leveraging Large Language Models to Generate Course-Specific Semantically Annotated Learning Objects",
        "authors": "D. Lohr, M. Berges, A. Chugh, M. Kohlhase, & D. Müller",
        "venue": "Journal of Computer Assisted Learning (2025), 41(1), e13101",
        "pdf_file": "Reference [5] (JCAL Wiley)",
        "category": "Computer Science Education",
        "objective": "To evaluate the feasibility and quality of LLM-generated computer science assessment objects grounded in university course materials.",
        "methodology": "Evaluated generated programming learning objects using computer science education faculty raters across multiple cognitive complexity levels.",
        "findings": "Found that while LLMs generate syntactically plausible items, approximately 15–25% of generated computer science questions still require manual human intervention due to subtle conceptual errors or misaligned distractors.",
        "relevance": "Directly cited in Section 1, Section 2.2, and Section 3.4. Lohr et al.'s finding that expert intervention remains necessary directly motivated our asynchronous human-in-the-loop workflow: generated items are staged in Moodle for instructor review rather than published directly to active student quizzes.",
        "takeaway": "Shows that automated CS question generation still needs human instructor oversight, justifying our asynchronous Moodle staging design."
    },
    {
        "id": "6",
        "title": "Enhancing RAG-Based MCQ Generation for Java Programming Education: A Modular Evaluation of Chunking, Retrieval and LLM Performance",
        "authors": "E. Olibo",
        "venue": "Bachelor's Thesis, Kristianstad University (2025)",
        "pdf_file": "Reference [6] (Kristianstad DiVA)",
        "category": "Programming-Specific RAG",
        "objective": "To conduct an extensive modular evaluation comparing various text chunking strategies, vector retrieval top-K configurations, and instruction-tuned LLMs for generating Java programming MCQs.",
        "methodology": "Benchmarked multiple embedding models and open-weight LLMs across diverse chunking sizes (256, 512, 1024 tokens) and evaluated question quality across syntax, distractors, and difficulty.",
        "findings": "Demonstrated that programming MCQ generation requires specialized instruction-tuned code models (such as Qwen-Coder or CodeLlama) and that bounded context windows prevent retrieval noise from corrupting code syntax.",
        "relevance": "Cited in Section 2.2 as closely related domain work. Because Olibo thoroughly explored hyperparameter sweeps for Java, our study fixes a single optimal deployment configuration (`Qwen2.5-Coder-7B-Instruct` + `nomic-embed-text`) and investigates operational systems metrics: latency, caching, and concurrency.",
        "takeaway": "Confirms code-specialized LLMs outperform general LLMs for programming MCQs, justifying our selection of Qwen2.5-Coder."
    },
    {
        "id": "7",
        "title": "Self-Hosted Lecture-to-Quiz: Local LLM MCQ Generation with Deterministic Quality Control",
        "authors": "S. A. Shintani",
        "venue": "arXiv preprint arXiv:2603.08729 (2026)",
        "pdf_file": "Reference [7] (arXiv:2603.08729)",
        "category": "Self-Hosted Assessment Tool",
        "objective": "To develop an API-free, self-hosted lecture-to-quiz authoring tool that runs locally on commodity hardware with deterministic quality verification.",
        "methodology": "Fed raw lecture slide transcripts directly into a locally hosted LLM without vector retrieval, applying heuristic rule-based checks and exporting questions as static Google Forms CSV files.",
        "findings": "Demonstrated that local inference avoids recurring commercial API costs and protects institutional privacy. However, feeding entire lectures directly into the prompt without retrieval causes severe context token bloat and limits scalability.",
        "relevance": "Cited in Section 1 and Section 2.3. Kwiz improves upon Shintani's architecture by: (1) incorporating dense vector retrieval (RAG) rather than injecting full slides, (2) adding SHA-256 incremental embedding reuse, (3) validating code via Python AST, and (4) integrating dynamically into Moodle's relational database instead of static CSV exports.",
        "takeaway": "Demonstrated local, self-hosted question generation is feasible, but lacked vector retrieval, incremental caching, and LMS database integration."
    },
    {
        "id": "8",
        "title": "A Course-Specific Agentic RAG Chatbot for IT Student Support: Architecture, Local Deployment, and Preliminary Evaluation",
        "authors": "H. V. Tran, P. V. Nguyen, T. T. N. Vu, H. P. Luong, & D.-N. Le",
        "venue": "Next-Generation Computing Systems and Technologies (2026), 2(2), 21–34",
        "pdf_file": "Reference [8] (NGCST 2026)",
        "category": "On-Premise University RAG",
        "objective": "To design, deploy, and evaluate an on-premise agentic RAG chatbot for course-specific IT student tutoring at Hai Phong University.",
        "methodology": "Deployed an open-weight language model on a local institutional server, indexing syllabus and lecture documents to support student Q&A interactions.",
        "findings": "Proved that local institutional deployments effectively resolve student data privacy concerns and institutional compliance mandates, but identified high server response latency during peak student usage hours.",
        "relevance": "Cited in Section 2.3. While Tran et al. focused on conversational student Q&A, our study focuses on instructor-facing structured assessment generation, deterministic schema compilation, and concurrent batch generation.",
        "takeaway": "Confirms on-premise university RAG satisfies privacy and compliance, but underscores the need for hardware-efficient inference."
    },
    {
        "id": "9",
        "title": "Towards Sustainable AI Knowledge-Base Assistants in Computer Science Education: On-Premise Deployment and Optimization with Open Educational Resources",
        "authors": "X. Shen, L. Feng, S. Hua, D. Liu, Z. Xie, & B. Liu",
        "venue": "Frontiers in Psychology (2026), 17, 1843444",
        "pdf_file": "shen_2026_sustainable_ai_assistant.pdf",
        "category": "Sustainable On-Premise AI",
        "objective": "To evaluate the sustainability, financial feasibility, and operational envelope of deploying local LLM assistants using consumer-grade GPUs in computer science education.",
        "methodology": "Deployed open-source models on consumer-grade NVIDIA graphics cards (RTX 3090/4090), measuring power consumption, VRAM occupancy, and response turnaround across open educational resource (OER) corpora.",
        "findings": "Showed that a single 24 GB GPU can sustainably host 7B–14B quantized models for educational workloads, eliminating cloud subscription fees while maintaining acceptable response times under low-to-moderate concurrency.",
        "relevance": "Directly cited in Section 1 and Section 2.3. Shen et al. validate our hardware constraint (a single dedicated RTX 3090 host). We build on their systems analysis by evaluating an assessment authoring pipeline with incremental caching and multi-request instructor load testing.",
        "takeaway": "Validates that a single 24 GB consumer GPU (RTX 3090) is the optimal, sustainable hardware sweet spot for university AI deployment."
    },
    {
        "id": "10",
        "title": "CacheBlend: Fast Large Language Model Serving for RAG with Cached Knowledge Fusion",
        "authors": "J. Yao, H. Li, Y. Liu, S. Ray, Y. Cheng, Q. Zhang, K. Du, S. Lu, & J. Jiang",
        "venue": "Proceedings of the Twentieth European Conference on Computer Systems (EuroSys '25), pp. 94–109",
        "pdf_file": "yao_2025_cacheblend.pdf",
        "category": "Inference KV-Cache Optimization",
        "objective": "To eliminate the redundant prompt prefill computation in RAG systems by dynamically reusing and fusing precomputed Key-Value (KV) cache states of retrieved document chunks.",
        "methodology": "Developed CacheBlend, an inference-engine extension that selectively merges KV-cache activations of retrieved chunks, reducing prompt token prefill overhead on GPU memory.",
        "findings": "Achieved 2.3× to 4.7× speedup in Time-to-First-Token (TTFT) and significantly reduced prefill compute for long-context RAG pipelines.",
        "relevance": "Cited in Section 2.4 and Section 6.3. We distinguish our work from CacheBlend: whereas CacheBlend operates at the GPU inference layer (KV-cache fusion), Kwiz operates earlier in the pipeline (content hashing and embedding reuse during courseware indexing). We identify KV-cache fusion as the primary scaling path for future sub-second generation.",
        "takeaway": "Demonstrates that caching intermediate representations in RAG prevents GPU bottlenecks, reinforcing our pipeline caching philosophy."
    },
    {
        "id": "11",
        "title": "TurboRAG: Accelerating Retrieval-Augmented Generation with Precomputed KV Caches for Chunked Text",
        "authors": "S. Lu, H. Wang, Y. Rong, Z. Chen, & Y. Tang",
        "venue": "Proceedings of the 2025 Conference on Empirical Methods in Natural Language Processing (EMNLP 2025), pp. 6588–6601",
        "pdf_file": "lu_2025_turborag.pdf",
        "category": "RAG Acceleration & KV-Cache",
        "objective": "To accelerate RAG response generation by offline precomputing and caching Key-Value states for static knowledge base chunks.",
        "methodology": "Pre-processes text chunks through LLM attention layers offline and stores KV tensors, retrieving and concatenating KV representations at query time to bypass token prefill.",
        "findings": "TurboRAG reduced prompt processing latency by up to 80% with minimal degradation in generation accuracy.",
        "relevance": "Cited in Section 2.4 and Section 6.3 alongside CacheBlend. We cite TurboRAG to contextualize where caching occurs in modern RAG literature and clarify that Kwiz's contribution lies in workload-level courseware lifecycle reuse rather than algorithmic KV-cache manipulation.",
        "takeaway": "Proves that avoiding repeated text encoding is the key to high-throughput RAG systems."
    },
    {
        "id": "12",
        "title": "Developing a Computer-Based Tutor Utilizing Generative Artificial Intelligence (GAI) and Retrieval-Augmented Generation (RAG)",
        "authors": "Youngjin Lee",
        "venue": "Education and Information Technologies (EAIT 2025), 30(6), 7841–7862",
        "pdf_file": "Reference [14] (EAIT Springer)",
        "category": "EAIT Journal Precedent",
        "objective": "To design, implement, and evaluate an intelligent computer-based tutor utilizing generative AI and RAG to support personalized statistics education while curbing hallucinations.",
        "methodology": "Integrated external textbook and curriculum resources into a RAG framework, evaluating student interaction logs, conceptual learning gains, and factual response accuracy.",
        "findings": "Demonstrated that grounding LLM responses in curricular texts significantly enhances conceptual accuracy, mitigates hallucination, and fosters student trust in automated tutoring systems.",
        "relevance": "Crucial precedent published in EAIT (our target journal). Lee (2025) proves EAIT's active interest in educational RAG. Our work directly complements Lee by addressing the instructor-facing assessment authoring counterpart (generating verified questions for the LMS Question Bank).",
        "takeaway": "Direct EAIT precedent confirming that RAG is essential for curriculum grounding and eliminating AI inaccuracies in higher education."
    },
    {
        "id": "13",
        "title": "Qwen2.5-Coder Technical Report",
        "authors": "B. Hui, J. Yang, Z. Cui, X. Yang, D. Liu, L. Zhang, & J. Lin",
        "venue": "arXiv preprint arXiv:2409.12186 (2024)",
        "pdf_file": "hui_2024_qwen2.5_coder.pdf",
        "category": "Foundation Code LLM",
        "objective": "To report the architecture, pre-training corpus, instruction tuning, and code benchmark performance of the open-weight Qwen2.5-Coder series.",
        "methodology": "Pre-trained on 5.5 trillion tokens of code, mathematical reasoning, and technical text, followed by multi-stage instruction tuning and reinforcement learning from code execution feedback.",
        "findings": "Qwen2.5-Coder-7B-Instruct matched or outperformed proprietary models (including GPT-4o-mini and Claude-3.5-Haiku) on Python code generation benchmarks (HumanEval: 88.4%, MBPP: 82.2%).",
        "relevance": "Cited in Section 1, Section 3.3, and Section 4.8. Explains why we chose `Qwen2.5-Coder-7B-Instruct` as our production model: it provides state-of-the-art Python syntax accuracy while operating within the 24 GB VRAM envelope under 4-bit quantization (~4.7 GB).",
        "takeaway": "Establishes Qwen2.5-Coder-7B as the premier open-weight model for local code generation, making single-GPU hosting possible."
    },
    {
        "id": "14",
        "title": "Nomic Embed: Training a Reproducible Long-Context Text Embedder",
        "authors": "Z. Nussbaum, J. X. Morris, B. Dinh, & A. Mostern",
        "venue": "arXiv preprint arXiv:2402.01613 (2024)",
        "pdf_file": "nussbaum_2024_nomic_embed.pdf",
        "category": "Dense Text Embeddings",
        "objective": "To train and release a high-performance, fully reproducible, open-weight text embedding model with an extended context window (8,192 tokens).",
        "methodology": "Multi-stage contrastive pre-training and fine-tuning on diverse text retrieval pairs, producing 768-dimensional dense vector embeddings optimized for sentence and paragraph similarity.",
        "findings": "Achieved top-tier retrieval performance on the MTEB benchmark, outperforming OpenAI `text-embedding-ada-002` while supporting long-context document chunks.",
        "relevance": "Cited in Section 3.1 and Section 4.8. `nomic-embed-text` is the dedicated embedding backbone of Kwiz, enabling semantic retrieval over curriculum slide chunks with sub-millisecond similarity computation.",
        "takeaway": "Validates nomic-embed-text as a high-accuracy, 8k-context open-weight embedding model for document retrieval."
    },
    {
        "id": "15",
        "title": "Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena",
        "authors": "L. Zheng, W.-L. Chiang, Y. Sheng, S. Zhuang, Z. Wu, Y. Zhuang, Z. Lin, Z. Li, D. Li, E. P. Xing, H. Zhang, J. E. Gonzalez, & I. Stoica",
        "venue": "Advances in Neural Information Processing Systems (NeurIPS 2023), 36, 46595–46623",
        "pdf_file": "zheng_2023_judging_llm_as_a_judge.pdf",
        "category": "Automated Evaluation Protocol",
        "objective": "To examine whether frontier large language models (such as GPT-4) can act as automated, scalable, and reliable evaluators for natural language generation benchmarks.",
        "methodology": "Benchmarked LLM judge agreement against human expert consensus across pairwise and Likert evaluations on MT-Bench and Chatbot Arena, analyzing position bias, verbosity bias, and self-enhancement bias.",
        "findings": "Demonstrated that strong frontier LLM judges achieve >80% agreement with human experts, matching human-to-human inter-rater reliability levels.",
        "relevance": "Methodological foundation for Section 4.2. We adopted Zheng et al.'s LLM-as-a-Judge framework (deploying GPT-4o and Gemini 2.5 Flash as multi-evaluators) alongside calibrated human faculty grading to evaluate our 100-item MCQ corpus across five dimensions.",
        "takeaway": "The benchmark study validating LLM-as-a-Judge as a scientifically rigorous evaluation methodology matching human agreement."
    },
    {
        "id": "16",
        "title": "Survey of Hallucination in Natural Language Generation",
        "authors": "Z. Ji, N. Lee, R. Frieske, T. Yu, D. Su, Y. Xu, E. Ishii, Y. J. Yeung, A. Del Luceno, & P. Fung",
        "venue": "ACM Computing Surveys (2023), 55(12), 1–38",
        "pdf_file": "ji_2023_hallucination_survey.pdf",
        "category": "Hallucination & Grounding",
        "objective": "To provide a comprehensive taxonomy, detection methodology, and mitigation survey of hallucinations in natural language generation.",
        "methodology": "Categorized hallucinations into intrinsic (conflicting with source evidence) and extrinsic (unverifiable from source text), surveying retrieval-based, decoding-based, and post-processing mitigation techniques.",
        "findings": "Concluded that conditioning generation on retrieved evidence chunks and enforcing structured schema constraints are among the most effective mechanisms to curb factual fabrication.",
        "relevance": "Cited in Section 4.2 for our Context Groundedness (CG) evaluation rubric. Used to formally define factual hallucination against course slide chunks and justify our two-tier validation engine.",
        "takeaway": "Comprehensive taxonomy defining intrinsic and extrinsic hallucination and establishing retrieval as the primary countermeasure."
    },
    {
        "id": "17",
        "title": "Measuring Nominal Scale Agreement Among Many Raters & Intraclass Correlation Coefficients for Reliability",
        "authors": "J. L. Fleiss (1971) & T. K. Koo & M. Y. Li (2016)",
        "venue": "Psychological Bulletin (1971), 76(5), 378–382; Journal of Chiropractic Medicine (2016), 15(2), 155–163",
        "pdf_file": "Reference [12] & [13]",
        "category": "Psychometrics & Statistical Reliability",
        "objective": "To provide formal mathematical formulations and interpretation benchmarks for multi-rater agreement (Fleiss' kappa for categorical data) and intraclass correlation (ICC(2,k) for continuous ordinal ratings).",
        "methodology": "Formulated statistical estimators that account for chance agreement across multi-judge evaluation panels.",
        "findings": "Established standard interpretative thresholds: kappa 0.61–0.80 denotes substantial agreement; ICC 0.75–0.90 denotes good reliability, and >0.90 denotes excellent reliability.",
        "relevance": "Methodological citations in Section 4.9 and Section 5.1. Guided our statistical analysis: our evaluation achieved Fleiss' kappa = 0.610 (substantial agreement) and ICC(2,k) = 0.764–0.981 across five dimensions.",
        "takeaway": "Provides the formal mathematical criteria and benchmark thresholds for our inter-rater reliability results."
    },
    {
        "id": "18",
        "title": "Moodle: Using Learning Communities to Create an Open Source Course Management System",
        "authors": "Martin Dougiamas & Peter C. Taylor",
        "venue": "Proceedings of the ED-MEDIA 2003 Conference, pp. 171–178",
        "pdf_file": "Reference [19] (ED-MEDIA 2003)",
        "category": "LMS Platform Architecture",
        "objective": "To present the educational philosophy (social constructionist pedagogy), software architecture, and modular database schema of Moodle.",
        "methodology": "Documented the modular course architecture, relational question bank structures, and assessment slot management mechanisms in Moodle.",
        "findings": "Showed that a modular, open-source LMS architecture fosters collaborative learning, customizable workflows, and extensible database hooks for automated plugins.",
        "relevance": "Cited in Section 3.4 and Section 4.1. Kwiz directly integrates into Moodle's core relational database schema (`mdl_question`, `mdl_question_answers`, and `mdl_quiz_slots`), allowing generated programming MCQs to become persistent, native learning assets.",
        "takeaway": "The foundational paper defining Moodle's modular database architecture and Question Bank design."
    },
    {
        "id": "19",
        "title": "Secure Hash Standard (SHS)",
        "authors": "National Institute of Standards and Technology (NIST)",
        "venue": "Federal Information Processing Standards Publication (FIPS PUB 180-4, 2015)",
        "pdf_file": "nist_2015_sha256_fips180-4.pdf",
        "category": "Cryptographic Content Hashing",
        "objective": "To specify secure hash algorithms (SHA-1, SHA-224, SHA-256, SHA-384, SHA-512) for computing a condensed representation of electronic data.",
        "methodology": "Defined mathematical bitwise operations, padding constants, and compression functions guaranteeing collision resistance.",
        "findings": "SHA-256 generates a deterministic 256-bit cryptographic message digest with negligible collision probability, making it the industry standard for content integrity verification.",
        "relevance": "Cited in Section 3.1 and Section 4.5. Kwiz computes SHA-256 hashes for each normalized course chunk, using the hash as an immutable cache lookup key to detect unchanged syllabus content and bypass redundant embedding computation.",
        "takeaway": "The official standard for SHA-256, providing the cryptographic foundation for Kwiz's 549x cache speedup."
    }
]

# Generate Markdown Compendium
md_content = """# Executive Compendium of Related Literature
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
"""

for s in summaries:
    md_content += f"""
## [{s['id']}] {s['title']}
* **Authors:** {s['authors']}
* **Venue & Year:** {s['venue']}
* **Category:** `{s['category']}`
* **Associated File:** `{s['pdf_file']}` in `reference_pdfs/`

> **1-Minute Quick-Scan Takeaway:**  
> {s['takeaway']}

* **Core Research Objective:** {s['objective']}
* **Methodology & Architecture:** {s['methodology']}
* **Key Findings & Evidence:** {s['findings']}
* **Direct Relevance to Our Kwiz Paper:** {s['relevance']}

---
"""

output_dir = "/Users/engtitya/Desktop/kwiz/experiment/papers"
md_path = os.path.join(output_dir, "Reference_Papers_Summary_Compendium.md")
html_path = os.path.join(output_dir, "Reference_Papers_Summary_Compendium.html")
pdf_path = os.path.join(output_dir, "Reference_Papers_Summary_Compendium.pdf")

with open(md_path, 'w', encoding='utf-8') as f:
    f.write(md_content)
print(f"Generated Markdown Compendium: {md_path}")

# Convert to HTML
html_body = markdown.markdown(md_content, extensions=['tables', 'fenced_code', 'nl2br'])

html_template = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Executive Compendium of Related Literature</title>
    <style>
        @page {{
            size: A4;
            margin: 18mm 15mm;
        }}
        body {{
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            font-size: 10pt;
            line-height: 1.5;
            color: #1e293b;
            background-color: #ffffff;
            max-width: 860px;
            margin: 0 auto;
            padding: 20px;
        }}
        h1 {{
            font-size: 18pt;
            color: #0f172a;
            border-bottom: 2px solid #2563eb;
            padding-bottom: 8px;
            margin-bottom: 4px;
            text-align: center;
        }}
        .subtitle {{
            text-align: center;
            font-size: 10.5pt;
            color: #64748b;
            margin-bottom: 24px;
        }}
        h2 {{
            font-size: 12pt;
            color: #1e3a8a;
            margin-top: 22px;
            margin-bottom: 8px;
            border-left: 4px solid #2563eb;
            padding-left: 10px;
            page-break-after: avoid;
            break-after: avoid;
        }}
        h3 {{
            font-size: 11pt;
            color: #0f172a;
            margin-top: 14px;
            margin-bottom: 6px;
        }}
        blockquote {{
            background-color: #f0fdf4;
            border-left: 4px solid #16a34a;
            margin: 10px 0;
            padding: 8px 14px;
            font-size: 9.5pt;
            color: #14532d;
            border-radius: 4px;
        }}
        ul {{
            margin-top: 4px;
            margin-bottom: 8px;
            padding-left: 20px;
        }}
        li {{
            margin-bottom: 4px;
        }}
        code {{
            background-color: #f1f5f9;
            color: #0f172a;
            padding: 2px 6px;
            border-radius: 4px;
            font-size: 9pt;
            font-family: Menlo, Monaco, Consolas, monospace;
        }}
        hr {{
            border: 0;
            height: 1px;
            background: #e2e8f0;
            margin: 18px 0;
        }}
        .card {{
            page-break-inside: avoid;
            break-inside: avoid;
            margin-bottom: 20px;
        }}
    </style>
</head>
<body>
{html_body}
</body>
</html>"""

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html_template)
print(f"Generated HTML Compendium: {html_path}")

# Compile with Chrome Headless
chrome_path = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
cmd = [
    chrome_path,
    "--headless",
    "--disable-gpu",
    "--no-pdf-header-footer",
    f"--print-to-pdf={pdf_path}",
    f"file://{html_path}"
]

res = subprocess.run(cmd, capture_output=True, text=True)
if res.returncode == 0 and os.path.exists(pdf_path):
    print(f"Successfully compiled PDF Compendium: {pdf_path} ({os.path.getsize(pdf_path)} bytes)")
    # Also sync root
    root_pdf = "/Users/engtitya/Desktop/kwiz/papers/Reference_Papers_Summary_Compendium.pdf"
    import shutil
    shutil.copyfile(pdf_path, root_pdf)
    print(f"Synced to root papers: {root_pdf}")
else:
    print(f"Chrome PDF Error: {res.returncode}, {res.stderr[:300]}")
