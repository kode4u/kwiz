import os

svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1150 720" width="100%" height="100%" style="background-color: #ffffff; font-family: 'Helvetica Neue', Arial, sans-serif;">
  <defs>
    <!-- Drop Shadow Filter -->
    <filter id="shadow" x="-3%" y="-5%" width="106%" height="114%" filterUnits="userSpaceOnUse">
      <feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#0f172a" flood-opacity="0.07" />
    </filter>
    <filter id="boxShadow" x="-2%" y="-3%" width="104%" height="108%" filterUnits="userSpaceOnUse">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#0f172a" flood-opacity="0.05" />
    </filter>

    <!-- Marker Arrowheads -->
    <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#334155" />
    </marker>
    <marker id="arrowBlue" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#2563eb" />
    </marker>
    <marker id="arrowGreen" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#059669" />
    </marker>
    <marker id="arrowRed" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#dc2626" />
    </marker>
  </defs>

  <!-- Title Banner -->
  <text x="575" y="32" text-anchor="middle" font-size="16" font-weight="bold" fill="#0f172a" letter-spacing="0.5">
    FIGURE 1: END-TO-END SELF-HOSTED ASSESSMENT AUTHORING &amp; VALIDATION PIPELINE
  </text>
  <text x="575" y="52" text-anchor="middle" font-size="11" fill="#64748b">
    Multi-stage workflow operating under a single-GPU (RTX 3090, 24 GB VRAM) institutional constraint
  </text>

  <!-- ================= STAGE 1: KNOWLEDGE BASE & INCREMENTAL CACHE ================= -->
  <rect x="25" y="75" width="220" height="580" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5" filter="url(#shadow)"/>
  <rect x="25" y="75" width="220" height="38" rx="10" fill="#e2e8f0"/>
  <rect x="25" y="103" width="220" height="10" fill="#e2e8f0"/>
  <text x="135" y="99" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">1. Knowledge Base ($T_{KB}$)</text>

  <!-- Card 1.1: Course Docs -->
  <rect x="40" y="125" width="190" height="68" rx="6" fill="#ffffff" stroke="#94a3b8" stroke-width="1.2" filter="url(#boxShadow)"/>
  <text x="135" y="145" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">Course Materials</text>
  <text x="135" y="162" text-anchor="middle" font-size="9.5" fill="#475569">Python Syllabi, Slides, Code</text>
  <text x="135" y="177" text-anchor="middle" font-size="9" fill="#64748b">Extracted &amp; Chunked ($d_i$)</text>

  <!-- Arrow -->
  <path d="M 135 193 L 135 220" fill="none" stroke="#475569" stroke-width="1.5" marker-end="url(#arrow)"/>

  <!-- Card 1.2: SHA-256 Hashing -->
  <rect x="40" y="222" width="190" height="72" rx="6" fill="#eff6ff" stroke="#3b82f6" stroke-width="1.2" filter="url(#boxShadow)"/>
  <text x="135" y="242" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e40af">SHA-256 Chunk Hashing</text>
  <text x="135" y="258" text-anchor="middle" font-size="9.5" fill="#1e3a8a">$h_i = \text{hash}(\text{model} : d_i)$</text>
  <text x="135" y="274" text-anchor="middle" font-size="8.5" fill="#3b82f6">NIST FIPS PUB 180-4</text>
  <text x="135" y="287" text-anchor="middle" font-size="8.5" font-weight="bold" fill="#2563eb">Change Detection ($T_{hash}$ &lt; 1 ms)</text>

  <!-- Diamond Decision -->
  <path d="M 135 294 L 135 320" fill="none" stroke="#475569" stroke-width="1.5" marker-end="url(#arrow)"/>
  <polygon points="135,322 205,355 135,388 65,355" fill="#fffbeb" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="135" y="352" text-anchor="middle" font-size="9.5" font-weight="bold" fill="#92400e">Hash in Cache?</text>
  <text x="135" y="365" text-anchor="middle" font-size="8.5" fill="#b45309">($T_{lookup}$ ~0.04 ms)</text>

  <!-- Decision Branch YES: Cache Hit -->
  <path d="M 65 355 L 45 355 L 45 425 L 75 425" fill="none" stroke="#059669" stroke-width="1.5" marker-end="url(#arrowGreen)"/>
  <text x="40" y="390" text-anchor="middle" font-size="8.5" font-weight="bold" fill="#059669" transform="rotate(-90 40 390)">Hit (96%)</text>
  <rect x="75" y="405" width="145" height="42" rx="5" fill="#ecfdf5" stroke="#10b981" stroke-width="1.2"/>
  <text x="147" y="422" text-anchor="middle" font-size="9.5" font-weight="bold" fill="#065f46">Reuse Stored Vector</text>
  <text x="147" y="437" text-anchor="middle" font-size="8.5" fill="#047857">0 ms GPU | 38.2× Speedup</text>

  <!-- Decision Branch NO: Cache Miss -->
  <path d="M 205 355 L 225 355 L 225 470 L 195 470" fill="none" stroke="#dc2626" stroke-width="1.5" marker-end="url(#arrowRed)"/>
  <text x="230" y="415" text-anchor="middle" font-size="8.5" font-weight="bold" fill="#dc2626" transform="rotate(90 230 415)">Miss (4%)</text>
  <rect x="40" y="460" width="150" height="45" rx="5" fill="#fef2f2" stroke="#ef4444" stroke-width="1.2"/>
  <text x="115" y="477" text-anchor="middle" font-size="9" font-weight="bold" fill="#991b1b">Invoke Embedding</text>
  <text x="115" y="492" text-anchor="middle" font-size="8.5" fill="#b91c1c">nomic-embed-text (Ollama)</text>

  <!-- Card 1.3: Vector DB Index -->
  <path d="M 147 447 L 147 525" fill="none" stroke="#059669" stroke-width="1.5"/>
  <path d="M 115 505 L 115 525" fill="none" stroke="#dc2626" stroke-width="1.5"/>
  <path d="M 115 525 L 135 525 L 135 535" fill="none" stroke="#475569" stroke-width="1.5" marker-end="url(#arrow)"/>

  <rect x="40" y="537" width="190" height="98" rx="6" fill="#ffffff" stroke="#64748b" stroke-width="1.2" filter="url(#boxShadow)"/>
  <text x="135" y="556" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#0f172a">Dense Vector Cache</text>
  <text x="135" y="572" text-anchor="middle" font-size="9" fill="#334155">embeddings_cache.json</text>
  <text x="135" y="587" text-anchor="middle" font-size="8.5" fill="#475569">768-dim Dense Float Vectors</text>
  <text x="135" y="602" text-anchor="middle" font-size="8.5" fill="#475569">Isolated Course Namespaces</text>
  <text x="135" y="618" text-anchor="middle" font-size="8.5" font-weight="bold" fill="#059669">Steady-state: 13.5 ms</text>


  <!-- ================= STAGE 2: RETRIEVAL & CONTEXT CONTROL ================= -->
  <rect x="260" y="75" width="200" height="580" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5" filter="url(#shadow)"/>
  <rect x="260" y="75" width="200" height="38" rx="10" fill="#ede9fe"/>
  <rect x="260" y="103" width="200" height="10" fill="#ede9fe"/>
  <text x="360" y="99" text-anchor="middle" font-size="12" font-weight="bold" fill="#4c1d95">2. Context Retrieval</text>

  <!-- Instructor Query Input -->
  <rect x="275" y="125" width="170" height="70" rx="6" fill="#ffffff" stroke="#8b5cf6" stroke-width="1.2" filter="url(#boxShadow)"/>
  <text x="360" y="145" text-anchor="middle" font-size="11" font-weight="bold" fill="#5b21b6">Instructor Request</text>
  <text x="360" y="161" text-anchor="middle" font-size="9" fill="#475569">Topic, Count, Difficulty</text>
  <text x="360" y="176" text-anchor="middle" font-size="8.5" fill="#6d28d9">e.g., "Python Loops &amp; Lists"</text>
  <text x="360" y="189" text-anchor="middle" font-size="8" fill="#7c3aed">Triggered from Moodle UI</text>

  <!-- Arrow Query to Embed -->
  <path d="M 360 195 L 360 225" fill="none" stroke="#7c3aed" stroke-width="1.5" marker-end="url(#arrow)"/>

  <!-- Query Vectorization -->
  <rect x="275" y="227" width="170" height="60" rx="6" fill="#f5f3ff" stroke="#a78bfa" stroke-width="1.2"/>
  <text x="360" y="247" text-anchor="middle" font-size="10" font-weight="bold" fill="#5b21b6">Query Embedding</text>
  <text x="360" y="263" text-anchor="middle" font-size="8.5" fill="#6d28d9">nomic-embed-text</text>
  <text x="360" y="277" text-anchor="middle" font-size="8.5" fill="#4c1d95">Dense Representation $\mathbf{q}$</text>

  <!-- Connect Stage 1 Vector DB to Stage 2 Cosine Search -->
  <path d="M 230 580 L 250 580 L 250 355 L 270 355" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-dasharray="3 3" marker-end="url(#arrowBlue)"/>
  <path d="M 360 287 L 360 325" fill="none" stroke="#7c3aed" stroke-width="1.5" marker-end="url(#arrow)"/>

  <!-- Cosine Similarity Search -->
  <rect x="275" y="327" width="170" height="85" rx="6" fill="#ffffff" stroke="#8b5cf6" stroke-width="1.2" filter="url(#boxShadow)"/>
  <text x="360" y="347" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#4c1d95">Cosine Similarity</text>
  <text x="360" y="367" text-anchor="middle" font-size="9.5" fill="#1e293b">$\text{sim}(\mathbf{q}, \mathbf{d}) = \frac{\mathbf{q} \cdot \mathbf{d}}{\|\mathbf{q}\|_2 \|\mathbf{d}\|_2}$</text>
  <text x="360" y="388" text-anchor="middle" font-size="8.5" fill="#6d28d9">Similarity Threshold $\ge 0.50$</text>
  <text x="360" y="402" text-anchor="middle" font-size="8.5" font-weight="bold" fill="#059669">0% Cross-Course Bleed</text>

  <!-- Arrow to Bounded Context -->
  <path d="M 360 412 L 360 445" fill="none" stroke="#7c3aed" stroke-width="1.5" marker-end="url(#arrow)"/>

  <!-- Bounded Context Window Box -->
  <rect x="275" y="447" width="170" height="98" rx="6" fill="#ede9fe" stroke="#7c3aed" stroke-width="1.2"/>
  <text x="360" y="468" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#4c1d95">Context Budgeting</text>
  <text x="360" y="486" text-anchor="middle" font-size="9" fill="#5b21b6">Top-$K = 3$ Selected Chunks</text>
  <text x="360" y="502" text-anchor="middle" font-size="8.5" fill="#475569">Budget: ~512 input tokens</text>
  <text x="360" y="518" text-anchor="middle" font-size="8.5" fill="#1e293b">-72.2% Token Reduction</text>
  <text x="360" y="534" text-anchor="middle" font-size="8.5" font-weight="bold" fill="#059669">Accelerates TTFT</text>


  <!-- ================= STAGE 3: LOCAL LLM INFERENCE ================= -->
  <rect x="475" y="75" width="200" height="580" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5" filter="url(#shadow)"/>
  <rect x="475" y="75" width="200" height="38" rx="10" fill="#ccfbf1"/>
  <rect x="475" y="103" width="200" height="10" fill="#ccfbf1"/>
  <text x="575" y="99" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f766e">3. Local LLM Inference</text>

  <!-- Arrow Stage 2 to Stage 3 -->
  <path d="M 445 496 L 470 496" fill="none" stroke="#7c3aed" stroke-width="1.5" marker-end="url(#arrow)"/>

  <!-- Model Info Card -->
  <rect x="490" y="125" width="170" height="135" rx="6" fill="#ffffff" stroke="#0d9488" stroke-width="1.2" filter="url(#boxShadow)"/>
  <text x="575" y="145" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#0f766e">Qwen2.5-Coder-7B</text>
  <text x="575" y="161" text-anchor="middle" font-size="9" fill="#334155">Quantization: q4_K_M</text>
  <text x="575" y="177" text-anchor="middle" font-size="8.5" fill="#64748b">Serving: Ollama Local API</text>
  <path d="M 500 187 L 650 187" stroke="#e2e8f0" stroke-width="1"/>
  <text x="575" y="202" text-anchor="middle" font-size="8.5" fill="#0f766e">Temperature: $T = 0.2$</text>
  <text x="575" y="217" text-anchor="middle" font-size="8.5" fill="#0f766e">Top-p: $0.9$ | Rep. Penalty: 1.1</text>
  <text x="575" y="232" text-anchor="middle" font-size="8.5" fill="#0f766e">Context: $N_{\text{ctx}} = 4{,}096$</text>
  <text x="575" y="247" text-anchor="middle" font-size="8.5" font-weight="bold" fill="#0d9488">VRAM: 4.7 GB / 24 GB</text>

  <!-- Hardware Envelope Tag -->
  <rect x="490" y="275" width="170" height="52" rx="6" fill="#f0fdf4" stroke="#22c55e" stroke-width="1.2"/>
  <text x="575" y="293" text-anchor="middle" font-size="9.5" font-weight="bold" fill="#15803d">Single GPU Environment</text>
  <text x="575" y="308" text-anchor="middle" font-size="8.5" fill="#166534">NVIDIA GeForce RTX 3090</text>
  <text x="575" y="320" text-anchor="middle" font-size="8" fill="#166534">64 GB DDR4 | 12-core i7</text>

  <!-- Prompt Assembly Card -->
  <path d="M 575 260 L 575 273" fill="none" stroke="#475569" stroke-width="1.5"/>
  <path d="M 575 327 L 575 350" fill="none" stroke="#475569" stroke-width="1.5" marker-end="url(#arrow)"/>

  <rect x="490" y="352" width="170" height="150" rx="6" fill="#ffffff" stroke="#0d9488" stroke-width="1.2" filter="url(#boxShadow)"/>
  <text x="575" y="372" text-anchor="middle" font-size="10" font-weight="bold" fill="#0f766e">Strict Schema Prompting</text>
  <text x="575" y="390" text-anchor="middle" font-size="8.5" fill="#334155">Enforces Structured JSON:</text>
  <text x="502" y="410" font-size="8" fill="#475569">• <code>question</code> (w/ code block)</text>
  <text x="502" y="425" font-size="8" fill="#475569">• <code>choices</code> (exactly 4 unique)</text>
  <text x="502" y="440" font-size="8" fill="#475569">• <code>correct_index</code> (0 to 3)</text>
  <text x="502" y="455" font-size="8" fill="#475569">• <code>explanation</code> (pedagogical)</text>
  <text x="502" y="470" font-size="8" fill="#475569">• <code>difficulty</code> (calibrated)</text>
  <text x="502" y="485" font-size="8" fill="#475569">• <code>source_chunk_ids</code></text>

  <!-- LLM Generation Latency Tag -->
  <rect x="490" y="520" width="170" height="42" rx="5" fill="#f0fdfa" stroke="#14b8a6" stroke-width="1"/>
  <text x="575" y="537" text-anchor="middle" font-size="9" font-weight="bold" fill="#0f766e">Generation Latency ($T_{LLM}$)</text>
  <text x="575" y="551" text-anchor="middle" font-size="8.5" fill="#115e59">Mean: 2,298 ms | P95 &lt; 4.6s</text>


  <!-- ================= STAGE 4: TWO-TIER VALIDATION & RECOVERY ================= -->
  <rect x="690" y="75" width="225" height="580" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5" filter="url(#shadow)"/>
  <rect x="690" y="75" width="225" height="38" rx="10" fill="#fef3c7"/>
  <rect x="690" y="103" width="225" height="10" fill="#fef3c7"/>
  <text x="802" y="99" text-anchor="middle" font-size="12" font-weight="bold" fill="#92400e">4. Two-Tier Validation</text>

  <!-- Arrow Stage 3 to Stage 4 -->
  <path d="M 660 427 L 705 427 L 705 155 L 715 155" fill="none" stroke="#0d9488" stroke-width="1.5" marker-end="url(#arrow)"/>

  <!-- Tier 1: Schema Validation -->
  <rect x="705" y="125" width="195" height="98" rx="6" fill="#ffffff" stroke="#f59e0b" stroke-width="1.2" filter="url(#boxShadow)"/>
  <text x="802" y="145" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#b45309">Tier 1: Schema &amp; Structure</text>
  <text x="802" y="161" text-anchor="middle" font-size="8.5" fill="#78350f">Universal Filter (All Items)</text>
  <text x="715" y="179" font-size="8" fill="#475569">✓ JSON parseable &amp; complete</text>
  <text x="715" y="193" font-size="8" fill="#475569">✓ Exactly 4 options &amp; valid key</text>
  <text x="715" y="207" font-size="8" fill="#475569">✓ Source attribution verified</text>
  <text x="802" y="218" text-anchor="middle" font-size="7.5" font-weight="bold" fill="#059669">Pass: Conceptual / Definition Items</text>

  <!-- Arrow to Code Block Decision -->
  <path d="M 802 223 L 802 245" fill="none" stroke="#b45309" stroke-width="1.5" marker-end="url(#arrow)"/>

  <!-- Diamond Decision: Code Blocks? -->
  <polygon points="802,247 862,275 802,303 742,275" fill="#ffffff" stroke="#d97706" stroke-width="1.5"/>
  <text x="802" y="272" text-anchor="middle" font-size="8.5" font-weight="bold" fill="#92400e">Has Code</text>
  <text x="802" y="284" text-anchor="middle" font-size="8" fill="#b45309">Blocks? (```)</text>

  <!-- Branch NO: Definition items bypass -->
  <path d="M 862 275 L 890 275 L 890 475 L 835 475" fill="none" stroke="#059669" stroke-width="1.5" marker-end="url(#arrowGreen)"/>
  <text x="893" y="375" font-size="8" font-weight="bold" fill="#059669" transform="rotate(90 893 375)">No (Bypass AST &lt; 0.1 ms)</text>

  <!-- Branch YES: Tier 2 AST -->
  <path d="M 802 303 L 802 325" fill="none" stroke="#dc2626" stroke-width="1.5" marker-end="url(#arrow)"/>
  <text x="808" y="318" font-size="7.5" font-weight="bold" fill="#b45309">Yes</text>

  <!-- Tier 2: AST Validation Card -->
  <rect x="705" y="327" width="195" height="98" rx="6" fill="#fefce8" stroke="#ca8a04" stroke-width="1.2" filter="url(#boxShadow)"/>
  <text x="802" y="347" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#a16207">Tier 2: Compiler &amp; AST</text>
  <text x="802" y="362" text-anchor="middle" font-size="8.5" fill="#854d0e">Programming Items Only</text>
  <text x="715" y="380" font-size="8" fill="#475569">✓ <code>ast.parse(code)</code> (syntax tree)</text>
  <text x="715" y="394" font-size="8" fill="#475569">✓ <code>compile(code, 'exec')</code></text>
  <text x="715" y="408" font-size="8" fill="#475569">✓ Checks Stems &amp; Distractors</text>
  <text x="802" y="419" text-anchor="middle" font-size="8" font-weight="bold" fill="#15803d">100% Valid Executable Code</text>

  <!-- Pass Junction Box -->
  <path d="M 802 425 L 802 455" fill="none" stroke="#059669" stroke-width="1.5" marker-end="url(#arrowGreen)"/>
  <rect x="725" y="457" width="155" height="38" rx="5" fill="#ecfdf5" stroke="#10b981" stroke-width="1.2"/>
  <text x="802" y="474" text-anchor="middle" font-size="9" font-weight="bold" fill="#065f46">Validation Passed</text>
  <text x="802" y="487" text-anchor="middle" font-size="8" fill="#047857">$T_{validation} = 24.2\text{ ms}$</text>

  <!-- Error Recovery Loop ($M = 3$) -->
  <path d="M 705 174 L 685 174 L 685 570 L 720 570" fill="none" stroke="#dc2626" stroke-width="1.3" stroke-dasharray="3 3"/>
  <path d="M 705 376 L 685 376" fill="none" stroke="#dc2626" stroke-width="1.3" stroke-dasharray="3 3"/>

  <rect x="705" y="525" width="195" height="98" rx="6" fill="#fef2f2" stroke="#f87171" stroke-width="1.2"/>
  <text x="802" y="545" text-anchor="middle" font-size="10" font-weight="bold" fill="#991b1b">Error-Guided Recovery ($M \le 3$)</text>
  <text x="802" y="562" text-anchor="middle" font-size="8.5" fill="#b91c1c">Injects Compiler Traceback:</text>
  <text x="715" y="580" font-size="8" fill="#7f1d1d">• SyntaxError line/offset details</text>
  <text x="715" y="594" font-size="8" fill="#7f1d1d">• Schema key violation hints</text>
  <text x="802" y="612" text-anchor="middle" font-size="8" font-weight="bold" fill="#b91c1c">Self-Correction Feedback Loop</text>

  <!-- Loop back arrow to LLM -->
  <path d="M 705 575 L 575 575 L 575 505" fill="none" stroke="#dc2626" stroke-width="1.3" stroke-dasharray="3 3" marker-end="url(#arrowRed)"/>


  <!-- ================= STAGE 5: MOODLE QUESTION BANK & REVIEW ================= -->
  <rect x="930" y="75" width="195" height="580" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5" filter="url(#shadow)"/>
  <rect x="930" y="75" width="195" height="38" rx="10" fill="#d1fae5"/>
  <rect x="930" y="103" width="195" height="10" fill="#d1fae5"/>
  <text x="1027" y="99" text-anchor="middle" font-size="12" font-weight="bold" fill="#065f46">5. Moodle Integration</text>

  <!-- Arrow Stage 4 to Stage 5 -->
  <path d="M 880 476 L 945 476 L 945 165 L 955 165" fill="none" stroke="#059669" stroke-width="1.5" marker-end="url(#arrowGreen)"/>

  <!-- Automatic Persistence Card -->
  <rect x="945" y="125" width="165" height="110" rx="6" fill="#ffffff" stroke="#10b981" stroke-width="1.2" filter="url(#boxShadow)"/>
  <text x="1027" y="145" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#065f46">Direct DB Insertion</text>
  <text x="1027" y="161" text-anchor="middle" font-size="8.5" fill="#047857">Transactional Commit ($T_{insert}$)</text>
  <text x="955" y="180" font-size="8" fill="#334155">• <code>mdl_question</code></text>
  <text x="955" y="195" font-size="8" fill="#334155">• <code>mdl_question_answers</code></text>
  <text x="955" y="210" font-size="8" fill="#334155">• <code>mdl_quiz_slots</code></text>
  <text x="1027" y="226" text-anchor="middle" font-size="8" font-weight="bold" fill="#059669">Benchmarked in $T_{E2E}$</text>

  <!-- Benchmark Stopwatch Callout -->
  <rect x="945" y="255" width="165" height="75" rx="6" fill="#eff6ff" stroke="#3b82f6" stroke-width="1.2"/>
  <text x="1027" y="275" text-anchor="middle" font-size="9.5" font-weight="bold" fill="#1d4ed8">Machine Latency Bounds</text>
  <text x="1027" y="293" text-anchor="middle" font-size="9" fill="#1e40af">$T_{E2E} = T_{KB} + T_{GEN}$</text>
  <text x="1027" y="310" text-anchor="middle" font-size="8.5" font-weight="bold" fill="#2563eb">Mean E2E: 2,347.5 ms</text>
  <text x="1027" y="323" text-anchor="middle" font-size="7.5" fill="#475569">Throughput: up to 1,619 Q/min</text>

  <!-- Arrow to Review -->
  <path d="M 1027 330 L 1027 360" fill="none" stroke="#059669" stroke-width="1.5" marker-end="url(#arrowGreen)"/>

  <!-- Asynchronous Review Card -->
  <rect x="945" y="362" width="165" height="150" rx="6" fill="#ffffff" stroke="#10b981" stroke-width="1.2" filter="url(#boxShadow)"/>
  <text x="1027" y="382" text-anchor="middle" font-size="10" font-weight="bold" fill="#065f46">Asynchronous Review</text>
  <text x="1027" y="398" text-anchor="middle" font-size="8.5" fill="#475569">Course Review Category</text>
  <text x="1027" y="413" text-anchor="middle" font-size="8.5" fill="#334155">Instructor Gating (Moodle UI):</text>
  <text x="955" y="432" font-size="8" fill="#059669">✓ Accept As-Is (86.0%)</text>
  <text x="955" y="447" font-size="8" fill="#d97706">✓ Minor Revision (11.0%)</text>
  <text x="955" y="462" font-size="8" fill="#dc2626">✗ Major Rev. / Reject (3.0%)</text>
  <text x="1027" y="482" text-anchor="middle" font-size="8.5" font-weight="bold" fill="#1e3a8a">Overall Accept: 97.0%</text>
  <text x="1027" y="498" text-anchor="middle" font-size="7.5" font-style="italic" fill="#64748b">Human delay excluded from $T_{E2E}$</text>

  <!-- Live Student Quiz Deployment -->
  <path d="M 1027 512 L 1027 542" fill="none" stroke="#059669" stroke-width="1.5" marker-end="url(#arrowGreen)"/>
  <rect x="945" y="544" width="165" height="52" rx="6" fill="#ecfdf5" stroke="#059669" stroke-width="1.2"/>
  <text x="1027" y="563" text-anchor="middle" font-size="9.5" font-weight="bold" fill="#065f46">Active Student Quiz</text>
  <text x="1027" y="579" text-anchor="middle" font-size="8.5" fill="#047857">Formative &amp; Summative</text>
  <text x="1027" y="590" text-anchor="middle" font-size="8" fill="#047857">Exam Deployment</text>

  <!-- Bottom Global Footnote -->
  <rect x="25" y="670" width="1100" height="38" rx="6" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1"/>
  <text x="575" y="688" text-anchor="middle" font-size="9.5" fill="#334155">
    <tspan font-weight="bold">Legend &amp; Boundary:</tspan> Solid lines indicate computational dataflow. Dashed red lines denote error-guided feedback recovery loops. Human review is decoupled post-insertion to ensure reproducible machine latency benchmarks.
  </text>
  <text x="575" y="701" text-anchor="middle" font-size="8.5" fill="#64748b">
    All steps execute self-hosted on a dedicated institutional server (Intel i7-12700K, 64 GB RAM, NVIDIA RTX 3090 24GB).
  </text>
</svg>
"""

svg_path = '/Users/engtitya/Desktop/kwiz/papers/figures/pipeline_architecture.svg'
with open(svg_path, 'w', encoding='utf-8') as f:
    f.write(svg_content)

print(f"Generated {svg_path} ({len(svg_content)} bytes)")
