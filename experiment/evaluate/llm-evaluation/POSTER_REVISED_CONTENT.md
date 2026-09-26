# Revised poster content (15th Scientific Day of ITC 2026)

**Poster ID:** SD150191  
**Deadline:** 29 May 2026 — submit PDF via [Google Form](https://forms.gle/1rGRQXesdkXCufLZ8)

Use the official template: `03. Poster Template_15th Scientific Day of ITC_2026 2.pptx`.  
Replace **“Expected results”** with **“Experimental results”** and add the sections below.

---

## How to fill numbers (run once)

```bash
# 1) LLM batch (125 questions = 5 domains × 25)
export EVAL_GPU="your GPU" EVAL_CPU="your CPU" EVAL_RAM_GB="64" EVAL_OS="macOS / Ubuntu"
export OLLAMA_MODEL="deepseek-coder:latest"   # or qwen3:8b, etc.
docker compose up -d llmapi
python3 evaluate/llm-evaluation/run_batch_evaluation.py

# 2) Latency summary
python3 evaluate/llm-evaluation/summarize_metrics.py

# 3) Expert sheets → instructors fill 0/1 → consensus CSV
python3 evaluate/llm-evaluation/export_rating_sheets.py
# … after scoring …
python3 evaluate/quality-expert/calculate_binary_rubric_scores.py \
  --csv evaluate/quality-expert/rating_sheet_expert1.csv \
  --csv evaluate/quality-expert/rating_sheet_expert2.csv

# 4) WebSocket concurrent test
cd evaluate/websocket-latency && npm install
export WS_URL=http://localhost:3001 JWT_SECRET=<from docker-compose>
node measure_concurrent_websocket.js --clients 50 --ramp-sec 10 --hold-sec 5

# 5) One combined poster report
python3 evaluate/llm-evaluation/generate_poster_report.py --expert-default --markdown
```

Paste printed values into the poster blocks below.

---

## ABSTRACT (revised — ~150 words)

This study presents a **privacy-preserving AI-enhanced gamified quiz** for Moodle that combines **locally hosted LLM inference** with **WebSocket-based real-time classroom interaction**. Question generation uses **Ollama** on institutional hardware (no cloud API), with structured prompts across **five CS domains** (**125 MCQs**: 25 per domain). Two instructors evaluated output quality with a **binary rubric** (topic relevance, semantic correctness, answer key, clarity). We report **generation latency (s/question)**, **prompt-adherence rate**, **overall acceptability (accuracy)**, and **real-time service metrics** (Socket.IO connect/RTT under concurrent students). Results show that local LLMs can produce curriculum-aligned MCQs at measurable speed while the gamification service maintains **low WebSocket latency** suitable for synchronized quizzes. The open-source plugin offers a **cost-effective, data-sovereign** alternative for resource-constrained universities.

---

## PROBLEM STATEMENT (keep short)

- Manual Moodle quiz authoring is time-consuming.  
- Cloud LLM APIs raise **cost** and **data privacy** risks.  
- Standard Moodle quizzes lack **synchronized, gamified** live sessions.

---

## METHODOLOGY (add evaluation box — reviewer request)

**System:** Moodle plugin → LLM API (Flask) → **Ollama** (local) → JSON MCQs → DB; **Socket.IO** + Redis for live sessions.

**Local LLM deployment (state explicitly on poster):**

| Item | Your run (example — replace) |
|------|------------------------------|
| Runtime | **Ollama** (on-premise; alternatives: SEALLM, llama.cpp — we used Ollama for reproducibility) |
| Model | e.g. **deepseek-coder:latest** or **qwen3:8b** |
| GPU / CPU / RAM | From `summarize_metrics.py` / `EVAL_*` env |
| Backend flag | `LLM_BACKEND=local`, `LOCAL_LLM_URL=host.docker.internal:11434` |

**Evaluation protocol**

| Track | N | Method | Metrics |
|-------|---|--------|---------|
| **A. LLM generation** | **125 prompts** (5 domains × 5 subtopics × 5 Q) | `run_batch_evaluation.py` | Mean/median/**p95 latency (s)**, job success % |
| **B. Question quality** | Same 125 MCQs | 2 experts, binary rubric [4] | **Accuracy**, prompt adherence, criterion pass %, Cohen’s κ |
| **C. Real-time service** | 50–200 virtual students | `measure_concurrent_websocket.js` | Connect success %, **RTT mean/p95 (ms)** |

**Reviewer mapping (what each metric means)**

| Reviewer term | Our measure |
|---------------|-------------|
| “Does the generated problem respond to the prompt?” | **Topic relevance** criterion (% pass) — e.g. “Data Structures: hash tables” → question must be on hash tables |
| “Among 100+ prompts, how many correct?” | **Acceptable** = all four criteria = 1 → **Accuracy** = acceptable ÷ 125 |
| Precision / Recall / F1 | On **consensus** labels: treat acceptable=1 as positive class; report **Accuracy** = (TP+TN)/N; optional **inter-rater F1** between two experts |
| Average latency (s) | `seconds_per_question` from metrics log |

**Example (algorithm complexity prompt):**  
Prompt: *“Data Structures: trees — binary tree traversal (in-order)”* → Expert scores **topic relevance = 1** only if the stem targets tree traversal; **semantic + answer key = 1** if content and keyed answer are correct.

---

## EXPERIMENTAL RESULTS (on poster — Google Drive PPTX)

**Slide bullets (current on Drive):**

1. Ollama + **deepseek-r1:8b** on **Apple M5** (16 GB RAM)  
2. **125** prompts (5 domains × 25 MCQs); mean **58.9** s/Q (p95 **83.0** s) — *update after full batch*  
3. API/JSON success **100%** (n=3); expert rubric (2 raters, n=125)  
4. WebSocket: **30/30** clients, RTT **1.6** ms (p95 **6.1** ms)  
5. Quality: adherence **[XX]%**, accuracy **[XX]%** ([NN]/125), P **[X.XX]** R **[X.XX]** F1 **[X.XX]**, κ **[0.XX]**

Re-apply after new measurements:

```bash
python3 evaluate/llm-evaluation/edit_poster_results.py
```

### Table 1 — LLM generation performance

| Metric | Result |
|--------|--------|
| Total prompts / MCQs | **125** |
| Domains | C++, Python, Java, Data Structures, Database Systems |
| Mean latency | **[X.XX] s/question** |
| Median / p95 | **[X.XX] / [X.XX] s** |
| Total generation time | **[XX] min** |
| Structural success (API + JSON) | **[XX]%** |

### Table 2 — Expert quality (125 MCQs, 2 raters → consensus)

| Metric | Result |
|--------|--------|
| **Accuracy** (acceptable ÷ 125) | **[XX]%** ([NN]/125) |
| **Prompt adherence** (topic relevance) | **[XX]%** |
| Semantic correctness | **[XX]%** |
| Answer key correctness | **[XX]%** |
| Question clarity | **[XX]%** |
| Inter-rater agreement (acceptable) | **[XX]%** |
| Cohen’s κ | **[0.XX]** |

*Optional footnote:* Precision = TP/(TP+FP), Recall = TP/(TP+FN), F1 = harmonic mean — computed on binary **acceptable** labels after consensus (`generate_poster_report.py`).

### Table 3 — Real-time gamification (WebSocket)

| Metric | 50 clients | 200 clients (lab) |
|--------|------------|-------------------|
| Connected / target | **[49]/50** | **[…]/200** |
| Error rate | **[X]%** | **[X]%** |
| RTT mean (ms) | **[XX]** | **[XX]** |
| RTT p95 (ms) | **[XX]** | **[XX]** |

*Note for reviewers:* JMeter **200 users** = HTTP `/health` scalability; **WebSocket table** = actual gamified session transport.

---

## RESULTS — one sentence bullets (for narrow columns)

- Local **Ollama** model **[name]** generated **125** MCQs in **[T]** min (mean **[X]** s/question).  
- **Prompt adherence:** **[XX]%** of items matched domain/subtopic prompts (topic relevance).  
- **Overall quality (accuracy):** **[XX]%** expert-acceptable MCQs.  
- **Real-time layer:** **[XX] ms** mean RTT at **[N]** concurrent Socket.IO clients; **[XX]%** connection success.

---

## CONCLUSION (revised)

We demonstrated an **AI-enhanced gamified Moodle quiz** using **local Ollama LLMs** and **WebSocket** synchronization, with **quantitative** generation latency, **expert-validated** MCQ quality (**125 prompts**), and **concurrent real-time** performance. The approach supports **privacy-preserving**, **low-cost** assessment in developing higher-education contexts. Future work: full live-quiz load (teacher push + mass `submit_answer`), classroom SUS study.

---

## REFERENCES (add if missing)

[7] S. Kurdi, J. Leo, and D. Parsia, “Automatic Question Generation for Education,” *IJAIED*, 2020.  
[8] X. Du, J. Shao, and C. Cardie, “Learning to Ask,” *ACL*, 2017.

(Keep [1]–[6] from your current poster.)

---

## Poster layout checklist (ITC template)

- [ ] Title + authors + emails unchanged  
- [ ] **Poster ID** SD150191 visible  
- [ ] New box: **Local LLM: Ollama + [model name]**  
- [ ] Replace “Expected results” → **Experimental results** + **3 tables**  
- [ ] Small workflow diagram (keep existing architecture graphic)  
- [ ] Export **PDF** only for submission  
- [ ] All numbers match `logs/evaluation/metrics.jsonl` and expert CSVs  

---

## If batch is not finished yet (deadline pressure)

Use **pilot numbers** only if clearly labeled “preliminary”:

1. Run **10-question pilot**: `python3 evaluate/llm-evaluation/run_batch_evaluation.py --total-questions 10`  
2. Run WebSocket script with `--clients 20`  
3. Complete **expert review on pilot** + state “full 125-Q study in progress”  

For final poster, **do not mix** pilot and full-run numbers.
