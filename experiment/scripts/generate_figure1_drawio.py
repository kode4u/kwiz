import os

drawio_content = """<mxfile host="app.diagrams.net" modified="2026-09-21T02:00:00.000Z" agent="5.0" version="21.0.0" type="device">
  <diagram id="pipeline_arch" name="End-to-End Pipeline Architecture">
    <mxGraphModel dx="1422" dy="860" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1169" pageHeight="827" math="1" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />

        <!-- Top Title -->
        <mxCell id="title" value="&lt;b style=&quot;font-size: 16px;&quot;&gt;FIGURE 1: END-TO-END SELF-HOSTED ASSESSMENT AUTHORING &amp;amp; VALIDATION PIPELINE&lt;/b&gt;&lt;br&gt;&lt;font color=&quot;#64748b&quot; style=&quot;font-size: 11px;&quot;&gt;Multi-stage workflow operating under a single-GPU (RTX 3090, 24 GB VRAM) institutional constraint&lt;/font&gt;" style="text;html=1;align=center;verticalAlign=middle;resizable=0;points=[];autosize=1;strokeColor=none;fillColor=none;" vertex="1" parent="1">
          <mxGeometry x="250" y="20" width="670" height="40" as="geometry" />
        </mxCell>

        <!-- STAGE 1 CONTAINER -->
        <mxCell id="stage1" value="&lt;b&gt;1. Knowledge Base (T_KB)&lt;/b&gt;" style="swimlane;whiteSpace=wrap;html=1;startSize=30;fillColor=#f8fafc;strokeColor=#cbd5e1;fontColor=#1e293b;rounded=1;arcSize=4;" vertex="1" parent="1">
          <mxGeometry x="30" y="70" width="200" height="580" as="geometry" />
        </mxCell>
        <mxCell id="s1_docs" value="&lt;b&gt;Course Materials&lt;/b&gt;&lt;br&gt;&lt;font style=&quot;font-size: 10px;&quot; color=&quot;#475569&quot;&gt;Python Syllabi, Slides, Code&lt;br&gt;Normalized Chunks (d_i)&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#94a3b8;" vertex="1" parent="stage1">
          <mxGeometry x="15" y="45" width="170" height="60" as="geometry" />
        </mxCell>
        <mxCell id="s1_hash" value="&lt;b&gt;SHA-256 Chunk Hashing&lt;/b&gt;&lt;br&gt;&lt;font style=&quot;font-size: 9px;&quot; color=&quot;#1e40af&quot;&gt;h_i = hash(model : d_i)&lt;br&gt;NIST FIPS PUB 180-4&lt;br&gt;T_hash &amp;lt; 1 ms&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#eff6ff;strokeColor=#3b82f6;" vertex="1" parent="stage1">
          <mxGeometry x="15" y="130" width="170" height="65" as="geometry" />
        </mxCell>
        <mxCell id="s1_dec" value="&lt;b&gt;Hash in&lt;br&gt;Cache?&lt;/b&gt;" style="rhombus;whiteSpace=wrap;html=1;fillColor=#fffbeb;strokeColor=#f59e0b;fontColor=#92400e;fontSize=10;" vertex="1" parent="stage1">
          <mxGeometry x="50" y="220" width="100" height="60" as="geometry" />
        </mxCell>
        <mxCell id="s1_hit" value="&lt;b&gt;Reuse Stored Vector&lt;/b&gt;&lt;br&gt;&lt;font style=&quot;font-size: 9px;&quot; color=&quot;#047857&quot;&gt;Cache Hit (96%)&lt;br&gt;0 ms GPU | 38.2x Speedup&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ecfdf5;strokeColor=#10b981;" vertex="1" parent="stage1">
          <mxGeometry x="15" y="305" width="170" height="45" as="geometry" />
        </mxCell>
        <mxCell id="s1_miss" value="&lt;b&gt;Invoke Embedding&lt;/b&gt;&lt;br&gt;&lt;font style=&quot;font-size: 9px;&quot; color=&quot;#b91c1c&quot;&gt;Cache Miss (4%)&lt;br&gt;nomic-embed-text (Ollama)&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#fef2f2;strokeColor=#ef4444;" vertex="1" parent="stage1">
          <mxGeometry x="15" y="375" width="170" height="45" as="geometry" />
        </mxCell>
        <mxCell id="s1_db" value="&lt;b&gt;Dense Vector Cache&lt;/b&gt;&lt;br&gt;&lt;font style=&quot;font-size: 9px;&quot; color=&quot;#334155&quot;&gt;embeddings_cache.json&lt;br&gt;768-dim Dense Vectors&lt;br&gt;Steady-State: 13.5 ms&lt;/font&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=10;fillColor=#ffffff;strokeColor=#64748b;" vertex="1" parent="stage1">
          <mxGeometry x="25" y="445" width="150" height="90" as="geometry" />
        </mxCell>

        <!-- STAGE 2 CONTAINER -->
        <mxCell id="stage2" value="&lt;b&gt;2. Context Retrieval&lt;/b&gt;" style="swimlane;whiteSpace=wrap;html=1;startSize=30;fillColor=#f8fafc;strokeColor=#cbd5e1;fontColor=#4c1d95;rounded=1;arcSize=4;" vertex="1" parent="1">
          <mxGeometry x="250" y="70" width="200" height="580" as="geometry" />
        </mxCell>
        <mxCell id="s2_query" value="&lt;b&gt;Instructor Request&lt;/b&gt;&lt;br&gt;&lt;font style=&quot;font-size: 9px;&quot; color=&quot;#475569&quot;&gt;Topic, Count, Difficulty&lt;br&gt;e.g. 'Python Loops &amp;amp; Lists'&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#8b5cf6;" vertex="1" parent="stage2">
          <mxGeometry x="15" y="45" width="170" height="60" as="geometry" />
        </mxCell>
        <mxCell id="s2_qembed" value="&lt;b&gt;Query Embedding&lt;/b&gt;&lt;br&gt;&lt;font style=&quot;font-size: 9px;&quot; color=&quot;#6d28d9&quot;&gt;nomic-embed-text&lt;br&gt;Dense Vector q&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#f5f3ff;strokeColor=#a78bfa;" vertex="1" parent="stage2">
          <mxGeometry x="15" y="135" width="170" height="55" as="geometry" />
        </mxCell>
        <mxCell id="s2_cosine" value="&lt;b&gt;Cosine Similarity&lt;/b&gt;&lt;br&gt;&lt;font style=&quot;font-size: 9px;&quot; color=&quot;#1e293b&quot;&gt;sim(q, d) = (q · d) / (||q|| ||d||)&lt;br&gt;Threshold &amp;gt;= 0.50&lt;br&gt;100% Isolation Precision&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#8b5cf6;" vertex="1" parent="stage2">
          <mxGeometry x="15" y="225" width="170" height="75" as="geometry" />
        </mxCell>
        <mxCell id="s2_context" value="&lt;b&gt;Context Budgeting&lt;/b&gt;&lt;br&gt;&lt;font style=&quot;font-size: 9px;&quot; color=&quot;#475569&quot;&gt;Top-K = 3 Bounded Chunks&lt;br&gt;~512 Input Tokens&lt;br&gt;-72.2% Token Reduction&lt;br&gt;&lt;b color=&quot;#059669&quot;&gt;Accelerates TTFT&lt;/b&gt;&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ede9fe;strokeColor=#7c3aed;" vertex="1" parent="stage2">
          <mxGeometry x="15" y="335" width="170" height="90" as="geometry" />
        </mxCell>

        <!-- STAGE 3 CONTAINER -->
        <mxCell id="stage3" value="&lt;b&gt;3. Local LLM Inference&lt;/b&gt;" style="swimlane;whiteSpace=wrap;html=1;startSize=30;fillColor=#f8fafc;strokeColor=#cbd5e1;fontColor=#0f766e;rounded=1;arcSize=4;" vertex="1" parent="1">
          <mxGeometry x="470" y="70" width="200" height="580" as="geometry" />
        </mxCell>
        <mxCell id="s3_model" value="&lt;b&gt;Qwen2.5-Coder-7B&lt;/b&gt;&lt;br&gt;&lt;font style=&quot;font-size: 9px;&quot; color=&quot;#334155&quot;&gt;q4_K_M via Ollama&lt;br&gt;T = 0.2, top-p = 0.9&lt;br&gt;Context N_ctx = 4,096&lt;br&gt;Max tokens N_out = 2,048&lt;br&gt;VRAM: 4.7 GB / 24 GB&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#0d9488;" vertex="1" parent="stage3">
          <mxGeometry x="15" y="45" width="170" height="110" as="geometry" />
        </mxCell>
        <mxCell id="s3_gpu" value="&lt;b&gt;Physical Hardware&lt;/b&gt;&lt;br&gt;&lt;font style=&quot;font-size: 9px;&quot; color=&quot;#166534&quot;&gt;NVIDIA RTX 3090 (24GB)&lt;br&gt;Intel i7-12700K | 64GB RAM&lt;br&gt;Single GPU Constraint&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#f0fdf4;strokeColor=#22c55e;" vertex="1" parent="stage3">
          <mxGeometry x="15" y="175" width="170" height="60" as="geometry" />
        </mxCell>
        <mxCell id="s3_prompt" value="&lt;b&gt;Strict Schema Prompt&lt;/b&gt;&lt;br&gt;&lt;font style=&quot;font-size: 8.5px;&quot; color=&quot;#475569&quot;&gt;Enforces 6 Fields:&lt;br&gt;1. question (markdown)&lt;br&gt;2. choices (4 unique)&lt;br&gt;3. correct_index (0..3)&lt;br&gt;4. explanation&lt;br&gt;5. difficulty&lt;br&gt;6. source_chunk_ids&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#0d9488;" vertex="1" parent="stage3">
          <mxGeometry x="15" y="255" width="170" height="140" as="geometry" />
        </mxCell>
        <mxCell id="s3_latency" value="&lt;b&gt;Generation Latency (T_LLM)&lt;/b&gt;&lt;br&gt;&lt;font style=&quot;font-size: 9px;&quot; color=&quot;#115e59&quot;&gt;Mean: 2,298 ms&lt;br&gt;P95 &amp;lt; 4.6 s&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#f0fdfa;strokeColor=#14b8a6;" vertex="1" parent="stage3">
          <mxGeometry x="15" y="420" width="170" height="50" as="geometry" />
        </mxCell>

        <!-- STAGE 4 CONTAINER -->
        <mxCell id="stage4" value="&lt;b&gt;4. Two-Tier Validation&lt;/b&gt;" style="swimlane;whiteSpace=wrap;html=1;startSize=30;fillColor=#f8fafc;strokeColor=#cbd5e1;fontColor=#92400e;rounded=1;arcSize=4;" vertex="1" parent="1">
          <mxGeometry x="690" y="70" width="220" height="580" as="geometry" />
        </mxCell>
        <mxCell id="s4_t1" value="&lt;b&gt;Tier 1: Schema &amp;amp; Structure&lt;/b&gt;&lt;br&gt;&lt;font style=&quot;font-size: 8.5px;&quot; color=&quot;#475569&quot;&gt;Universal Filter (All Items)&lt;br&gt;JSON parseable &amp;amp; valid fields&lt;br&gt;4 distinct choices &amp;amp; valid key&lt;br&gt;&lt;b color=&quot;#059669&quot;&gt;Pass: Definition Items&lt;/b&gt;&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#f59e0b;" vertex="1" parent="stage4">
          <mxGeometry x="15" y="45" width="190" height="85" as="geometry" />
        </mxCell>
        <mxCell id="s4_dec" value="&lt;b&gt;Has Code&lt;br&gt;Blocks?&lt;/b&gt;" style="rhombus;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#d97706;fontColor=#92400e;fontSize=10;" vertex="1" parent="stage4">
          <mxGeometry x="60" y="150" width="100" height="50" as="geometry" />
        </mxCell>
        <mxCell id="s4_t2" value="&lt;b&gt;Tier 2: Compiler &amp;amp; AST&lt;/b&gt;&lt;br&gt;&lt;font style=&quot;font-size: 8.5px;&quot; color=&quot;#475569&quot;&gt;Programming Items Only&lt;br&gt;ast.parse(code)&lt;br&gt;compile(code, &#39;exec&#39;)&lt;br&gt;Checks Stems &amp;amp; Distractors&lt;br&gt;&lt;b color=&quot;#15803d&quot;&gt;100% Executable Code&lt;/b&gt;&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#fefce8;strokeColor=#ca8a04;" vertex="1" parent="stage4">
          <mxGeometry x="15" y="225" width="190" height="100" as="geometry" />
        </mxCell>
        <mxCell id="s4_pass" value="&lt;b&gt;Validation Passed&lt;/b&gt;&lt;br&gt;&lt;font style=&quot;font-size: 9px;&quot; color=&quot;#047857&quot;&gt;T_validation = 24.2 ms&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ecfdf5;strokeColor=#10b981;" vertex="1" parent="stage4">
          <mxGeometry x="25" y="345" width="170" height="40" as="geometry" />
        </mxCell>
        <mxCell id="s4_recovery" value="&lt;b&gt;Error-Guided Recovery (M &amp;lt;= 3)&lt;/b&gt;&lt;br&gt;&lt;font style=&quot;font-size: 8.5px;&quot; color=&quot;#7f1d1d&quot;&gt;Injects Compiler Traceback:&lt;br&gt;• SyntaxError line / column info&lt;br&gt;• Schema violation hints&lt;br&gt;&lt;b&gt;Self-Correction Loop&lt;/b&gt;&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#fef2f2;strokeColor=#f87171;" vertex="1" parent="stage4">
          <mxGeometry x="15" y="415" width="190" height="85" as="geometry" />
        </mxCell>

        <!-- STAGE 5 CONTAINER -->
        <mxCell id="stage5" value="&lt;b&gt;5. Moodle Integration&lt;/b&gt;" style="swimlane;whiteSpace=wrap;html=1;startSize=30;fillColor=#f8fafc;strokeColor=#cbd5e1;fontColor=#065f46;rounded=1;arcSize=4;" vertex="1" parent="1">
          <mxGeometry x="930" y="70" width="200" height="580" as="geometry" />
        </mxCell>
        <mxCell id="s5_db" value="&lt;b&gt;Direct DB Insertion&lt;/b&gt;&lt;br&gt;&lt;font style=&quot;font-size: 8.5px;&quot; color=&quot;#047857&quot;&gt;Transactional Commit (T_insert)&lt;br&gt;• mdl_question&lt;br&gt;• mdl_question_answers&lt;br&gt;• mdl_quiz_slots&lt;br&gt;&lt;b&gt;Measured in T_E2E&lt;/b&gt;&lt;/font&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=10;fillColor=#ffffff;strokeColor=#10b981;" vertex="1" parent="stage5">
          <mxGeometry x="15" y="45" width="170" height="105" as="geometry" />
        </mxCell>
        <mxCell id="s5_bounds" value="&lt;b&gt;Machine Latency Bounds&lt;/b&gt;&lt;br&gt;&lt;font style=&quot;font-size: 9px;&quot; color=&quot;#1e40af&quot;&gt;T_E2E = T_KB + T_GEN&lt;br&gt;&lt;b&gt;Mean E2E: 2,347.5 ms&lt;/b&gt;&lt;br&gt;Throughput: 1,619 Q/min&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#eff6ff;strokeColor=#3b82f6;" vertex="1" parent="stage5">
          <mxGeometry x="15" y="170" width="170" height="65" as="geometry" />
        </mxCell>
        <mxCell id="s5_review" value="&lt;b&gt;Asynchronous Review&lt;/b&gt;&lt;br&gt;&lt;font style=&quot;font-size: 8.5px;&quot; color=&quot;#334155&quot;&gt;Course Review Category&lt;br&gt;Instructor Gating (Moodle UI):&lt;br&gt;✓ Accept As-Is (86.0%)&lt;br&gt;✓ Minor Revision (11.0%)&lt;br&gt;✗ Major / Reject (3.0%)&lt;br&gt;&lt;b color=&quot;#1e3a8a&quot;&gt;Overall Accept: 97.0%&lt;/b&gt;&lt;br&gt;&lt;i color=&quot;#64748b&quot;&gt;Excluded from T_E2E&lt;/i&gt;&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#10b981;" vertex="1" parent="stage5">
          <mxGeometry x="15" y="255" width="170" height="145" as="geometry" />
        </mxCell>
        <mxCell id="s5_quiz" value="&lt;b&gt;Active Student Quiz&lt;/b&gt;&lt;br&gt;&lt;font style=&quot;font-size: 9px;&quot; color=&quot;#047857&quot;&gt;Formative &amp;amp; Summative&lt;br&gt;Exam Deployment&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ecfdf5;strokeColor=#059669;" vertex="1" parent="stage5">
          <mxGeometry x="15" y="425" width="170" height="55" as="geometry" />
        </mxCell>

        <!-- CONNECTING ARROWS -->
        <!-- Stage 1 -> Stage 1 internal -->
        <mxCell id="e_1_1" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#475569;" edge="1" parent="1" source="s1_docs" target="s1_hash">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="e_1_2" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#475569;" edge="1" parent="1" source="s1_hash" target="s1_dec">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="e_1_hit" value="Yes (96%)" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#059669;fontColor=#059669;fontSize=9;" edge="1" parent="1" source="s1_dec" target="s1_hit">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="e_1_miss" value="No (4%)" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#dc2626;fontColor=#dc2626;fontSize=9;" edge="1" parent="1" source="s1_dec" target="s1_miss">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="195" y="320" />
              <mxPoint x="195" y="445" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- Stage 2 Query to Embed -->
        <mxCell id="e_2_1" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#7c3aed;" edge="1" parent="1" source="s2_query" target="s2_qembed">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="e_2_2" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#7c3aed;" edge="1" parent="1" source="s2_qembed" target="s2_cosine">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="e_2_3" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#7c3aed;" edge="1" parent="1" source="s2_cosine" target="s2_context">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <!-- Stage 1 Cache to Cosine Search -->
        <mxCell id="e_db_cosine" value="Stored Vectors" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#3b82f6;dashed=1;fontSize=9;fontColor=#2563eb;" edge="1" parent="1" source="s1_db" target="s2_cosine">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="240" y="560" />
              <mxPoint x="240" y="332" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- Stage 2 Context to Stage 3 Model Prompt -->
        <mxCell id="e_ctx_llm" value="Top-3 Context" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#7c3aed;fontSize=9;fontColor=#6d28d9;" edge="1" parent="1" source="s2_context" target="s3_prompt">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Stage 3 Prompt to Latency -->
        <mxCell id="e_3_1" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0d9488;" edge="1" parent="1" source="s3_prompt" target="s3_latency">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Stage 3 to Stage 4 Validation -->
        <mxCell id="e_llm_val" value="Generated MCQ JSON" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0d9488;fontSize=9;fontColor=#0f766e;" edge="1" parent="1" source="s3_latency" target="s4_t1">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="680" y="515" />
              <mxPoint x="680" y="157" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- Stage 4 Internal Validation Flow -->
        <mxCell id="e_4_1" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#b45309;" edge="1" parent="1" source="s4_t1" target="s4_dec">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="e_4_yes" value="Yes" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#b45309;fontSize=9;" edge="1" parent="1" source="s4_dec" target="s4_t2">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="e_4_no" value="No (Bypass &lt; 0.1ms)" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#059669;fontSize=8.5;fontColor=#059669;" edge="1" parent="1" source="s4_dec" target="s4_pass">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="895" y="245" />
              <mxPoint x="895" y="435" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="e_4_t2_pass" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#059669;" edge="1" parent="1" source="s4_t2" target="s4_pass">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Recovery Loop back to LLM -->
        <mxCell id="e_4_fail" value="Error Traceback" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#dc2626;dashed=1;fontSize=8.5;fontColor=#dc2626;" edge="1" parent="1" source="s4_recovery" target="s3_prompt">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="680" y="530" />
              <mxPoint x="680" y="395" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- Stage 4 to Stage 5 Persistence -->
        <mxCell id="e_pass_db" value="Validated Items" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#059669;fontSize=9;fontColor=#059669;" edge="1" parent="1" source="s4_pass" target="s5_db">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="920" y="435" />
              <mxPoint x="920" y="167" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="e_5_1" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#10b981;" edge="1" parent="1" source="s5_db" target="s5_bounds">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="e_5_2" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#059669;" edge="1" parent="1" source="s5_bounds" target="s5_review">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="e_5_3" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#059669;" edge="1" parent="1" source="s5_review" target="s5_quiz">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Bottom Legend -->
        <mxCell id="legend" value="&lt;b&gt;Legend &amp;amp; Boundary:&lt;/b&gt; Solid lines indicate computational dataflow. Dashed red lines denote error-guided feedback recovery loops. Human review is decoupled post-insertion to ensure reproducible machine latency benchmarks. All steps execute self-hosted on a dedicated institutional server (Intel i7-12700K, 64 GB RAM, NVIDIA RTX 3090 24GB)." style="rounded=1;whiteSpace=wrap;html=1;fillColor=#f1f5f9;strokeColor=#cbd5e1;fontSize=10;fontColor=#334155;" vertex="1" parent="1">
          <mxGeometry x="30" y="665" width="1100" height="35" as="geometry" />
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
"""

drawio_path = '/Users/engtitya/Desktop/kwiz/papers/figures/pipeline_architecture.drawio'
with open(drawio_path, 'w', encoding='utf-8') as f:
    f.write(drawio_content)

print(f"Generated {drawio_path} ({len(drawio_content)} bytes)")
