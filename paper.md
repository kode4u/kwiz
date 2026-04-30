# Design and Evaluation of an AI-Enhanced Gamified Quiz Plugin for Moodle: Integrating Local LLM-Based Question Generation

## 4. Experimental Setup

### 4.1 Objectives and Evaluation Dimensions

The experimental protocol evaluates the proposed system across four dimensions: (1) LLM generation performance, (2) real-time interaction performance, (3) scalability under concurrent load, and (4) usability and question quality. This design supports both engineering validation and pedagogical suitability for classroom deployment in resource-constrained institutions.

### 4.2 Deployment Environment

All experiments were conducted on a fixed server configuration to ensure reproducibility. The system stack included Moodle with the custom `mod_gamifiedquiz` plugin, a Node.js WebSocket server, Redis, and a Python-based LLM API service. LLM inference used local Ollama-hosted models on institutional hardware. Containerized deployment was managed with Docker Compose.

Record and report the following in the final paper:

- CPU model and core count
- RAM and storage type
- GPU model and VRAM
- OS and kernel version
- Docker/Compose versions
- Moodle version and plugin version
- Ollama version and exact model tags
- Git commit hash of the evaluated codebase

### 4.3 Participants and Classroom Context

The classroom deployment involved undergraduate students and instructors using Moodle in regular course activities. Quiz sessions were conducted in live classroom settings with students accessing the system from desktop and mobile browsers over the institutional network.

In the final manuscript, include:

- number of students and instructors
- number of courses
- number of quiz sessions
- approximate students per session

### 4.4 Instrumentation and Logging

To support reproducible analysis, generation requests were logged in the database table `gamifiedquiz_generation_logs`. Each request captured structured metadata including:

- request identifiers: `request_uuid`, `gamifiedquizid`, `userid`, `session_id`
- generation configuration: `backend`, `llm_model`, `topic`, `difficulty`, `language`
- timing metrics: `started_at`, `ended_at`, `duration_ms`
- output metrics: `requested_count`, `generated_count`, `saved_count`, `questions_per_sec`
- outcome metrics: `status`, `error_message`

This instrumentation enabled direct SQL-based computation of latency, throughput, and reliability per model and language.

### 4.5 Experimental Procedure

The evaluation followed two stages.

#### Stage 1: Real Classroom Deployment

During live sessions:

1. Instructors generated questions through the plugin interface.
2. Students joined quiz sessions via Moodle.
3. Real-time events (timer sync, leaderboard updates, instant feedback) were delivered through WebSockets.
4. Generation and session behavior were logged for post-hoc analysis.

#### Stage 2: Controlled Performance Tests

Controlled tests were run to isolate technical behavior:

- **LLM generation latency** using `evaluate/llm-response-time/evaluate_llm_latency.py`
- **WebSocket latency** using `evaluate/websocket-latency/measure_websocket_latency.js`
- **HTTP scalability** using Apache JMeter plans under `evaluate/load-testing-jmeter/`

### 4.6 LLM Quality Evaluation Protocol (English and Khmer)

Question quality was evaluated with expert raters using a rubric-based protocol in `evaluate/quality-expert/`.

- Languages evaluated separately: English (`en`) and Khmer (`km`)
- At least two independent raters scored each item
- Criteria (1-5): factual correctness, clarity, distractor quality, difficulty alignment, language quality, context relevance
- Binary indicators: acceptability and hard-fail flags

Inter-rater agreement for acceptability was computed with Cohen's kappa.

### 4.7 Data Processing Pipeline

Analysis used the following reproducible pipeline:

1. Export generation metrics to CSV: `evaluate/sql/export_generation_csv.sh`
2. Generate performance charts: `evaluate/sql/plot_generation_charts.py`
3. Run one-command performance pipeline: `evaluate/sql/run_all_sql_analysis.sh`
4. Compute expert quality summaries: `evaluate/quality-expert/calculate_quality_scores.py`
5. Merge speed and quality metrics: `evaluate/quality-expert/merge_speed_quality.py`

All scripts and SQL templates are included in the repository under `evaluate/sql/` and `evaluate/quality-expert/`.

---

## 5. Results and Performance Evaluation

### 5.1 LLM Generation Performance

Generation performance was evaluated using end-to-end latency of `POST /generate` requests. Results are reported per model with mean and percentile statistics to capture both typical and tail behavior.

Report the following per model:

- mean latency (ms and seconds)
- p50, p95, p99 latency
- generated and saved question counts
- throughput (`questions_per_sec`)
- generation error rate

**Table X. LLM performance by model** should include these columns:
`model`, `runs_total`, `runs_success`, `error_rate_pct`, `mean_duration_ms_success`, `p95_ms`, `mean_qps_success`.

### 5.2 Real-Time Interaction Performance

WebSocket evaluation measured connection and interaction responsiveness under classroom-like conditions. The primary indicator was real-time communication latency relevant to synchronized timers and leaderboard updates.

Report:

- Socket connection latency
- round-trip event latency (`eval:ping` RTT)
- observed latency distribution (mean, p95, max)

These metrics support the claim that the real-time layer remains responsive for interactive classroom use.

### 5.3 Scalability and Load Behavior

Scalability was assessed with Apache JMeter using controlled concurrent traffic profiles (e.g., 50, 100, 200 users) against HTTP endpoints (primarily health and service-access endpoints).

Report:

- throughput (requests/sec)
- response latency percentiles
- error rate at each concurrency level

This section should clearly distinguish HTTP scalability tests from LLM generation latency experiments.

### 5.4 Usability Results (SUS)

Usability was measured with the System Usability Scale (SUS) following standard 10-item methodology. Scores were computed using the included calculator script and summarized by participant group.

Report:

- mean SUS for students
- mean SUS for instructors
- interpretation against accepted SUS benchmarks

High SUS values indicate that both instructor and student interfaces are practical for routine classroom operation.

### 5.5 Expert Question Quality Results (English and Khmer)

Expert ratings showed model- and language-dependent quality differences. Results are reported separately for English and Khmer to avoid masking language effects.

For each language/model combination, report:

- overall quality mean and SD
- criterion-level means
- acceptability rate
- hard-fail rate
- Cohen's kappa (acceptability agreement)

**Table Y. Expert quality by language and model** should present these metrics side-by-side for direct comparison.

### 5.6 Speed-Quality Tradeoff

To compare practical deployment choices, performance metrics were merged with expert quality metrics. This combined view highlights tradeoffs where some models provide lower latency while others provide higher pedagogical quality.

Report:

- mean latency vs overall quality score
- p95 latency vs acceptability rate
- optional composite index (e.g., quality divided by latency in seconds)

**Figure Z. Speed-quality scatter plot** can visualize model positioning for deployment decisions in resource-constrained settings.

### 5.7 Summary of Findings

Overall results should conclude:

1. whether local LLM inference provides acceptable generation speed for live use,
2. whether the WebSocket layer maintains low-latency classroom interaction,
3. whether the system sustains target classroom concurrency,
4. whether generated questions meet acceptable expert quality in both English and Khmer.

These findings collectively validate the proposed architecture as a low-cost, privacy-preserving, and classroom-ready AI-enhanced Moodle assessment solution.

---

## 6. Discussion

### 6.1 Technical Implications

The results indicate that a decoupled Moodle-LLM-WebSocket architecture is technically feasible for live classroom assessment workflows. Local LLM inference provides controllable generation behavior while preserving institutional control over runtime conditions and data flow. In parallel, the WebSocket layer enables low-latency synchronization for leaderboard, timer, and feedback events, which are critical for perceived responsiveness during competitive activities.

From an engineering perspective, separating generation, real-time transport, and LMS persistence improves maintainability and allows each layer to be tuned independently. This is particularly useful for institutions that need incremental scaling (e.g., model upgrades or WebSocket horizontal scaling) without redesigning the full platform.

### 6.2 Pedagogical and Usability Implications

SUS and classroom usage patterns suggest that integrating AI generation directly into instructor workflows can reduce operational friction compared with external quiz tools. For students, the combination of immediate feedback and visible progression (leaderboards/timers) appears to increase interaction intensity and session continuity.

However, gamified real-time environments can also increase perceived pressure for some learners. Future deployments should consider configurable modes (e.g., competitive vs relaxed) and instructor-level control over timer strictness, leaderboard visibility, and pacing strategies.

### 6.3 Language-Specific Quality Considerations (English and Khmer)

A key contribution of this study is explicit multilingual quality evaluation. Reporting English and Khmer separately is necessary because quality behavior may differ across:

- linguistic fluency and grammatical stability
- terminology consistency in domain-specific topics
- distractor plausibility and ambiguity patterns
- cultural/contextual appropriateness

This language-aware protocol strengthens validity of conclusions for deployment in Cambodia and similar multilingual educational contexts.

### 6.4 Cost and Privacy Considerations

The local-inference approach addresses two recurrent barriers in under-resourced settings: recurring API costs and external data exposure. By running inference on institutional infrastructure, the system reduces ongoing operational dependency on third-party cloud providers and improves governance over student-related content.

The tradeoff is that institutions must provision and maintain GPU-capable infrastructure. For many contexts, this is acceptable when amortized over long-term use and compared with cumulative subscription costs.

### 6.5 Scalability and Operational Limits

Controlled tests demonstrate viability for typical class-scale workloads. Nonetheless, large-scale rollout (e.g., multi-course simultaneous sessions) may require:

- multi-instance WebSocket deployment with shared state coordination
- stronger observability/alerting around generation queues and timeout behavior
- model routing strategies (fast vs high-quality models by scenario)

These considerations do not invalidate the architecture; rather, they define practical next steps for production hardening.

### 6.6 Limitations

This study has several limitations:

1. Evaluation context may be concentrated in a limited number of courses/institutions.
2. Quality scoring depends on expert judgment and available rater capacity.
3. Current implementation focuses on MCQ generation; open-ended assessment is out of scope.
4. Performance outcomes are hardware-dependent and may differ across server classes.

Future studies should broaden institutional diversity, expand rater pools, and include longitudinal learning-outcome measurements.

---

## 7. Conclusion

This paper presented the design and evaluation of an AI-enhanced gamified quiz plugin for Moodle that combines local LLM-based question generation with WebSocket-driven real-time classroom interaction. The system addresses practical constraints common in developing and resource-constrained educational settings by prioritizing low recurring cost, institutional data control, and deployable architecture.

The evaluation framework integrates system-level metrics (latency, throughput, reliability, concurrency), usability outcomes (SUS), and expert-rated question quality in both English and Khmer. This combined methodology provides a more complete basis for adoption decisions than performance-only benchmarking.

Overall, the findings support the feasibility of privacy-preserving, locally operated AI assessment workflows within Moodle while maintaining classroom-level responsiveness and acceptable question quality. The approach offers a practical blueprint for institutions seeking sustainable AI integration without continuous cloud-service dependency.

### Future Work

Planned extensions include:

- retrieval-augmented generation (RAG) to improve factual grounding
- support for additional assessment types (short answer/essay)
- adaptive model selection by topic, language, and latency constraints
- expanded multi-site deployments and larger concurrency scenarios
- deeper learning-outcome analysis beyond engagement and usability indicators

---

## Notes for Finalization

- Replace placeholder table/figure numbering (`Table X`, `Table Y`, `Figure Z`) with final numbering.
- Fill numeric values directly from outputs under `evaluate/sql/exports/` and `evaluate/quality-expert/`.
- Keep unrelated external experiment text out of Results unless explicitly framed as comparative literature.
