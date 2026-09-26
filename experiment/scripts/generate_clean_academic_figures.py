import os

# ==============================================================================
# SCRIPT TO GENERATE CLEAN, MINIMALIST ACADEMIC FIGURES (FIGURE 1 & FIGURE 2)
# IN BOTH DRAW.IO (.drawio XML) AND VECTOR SVG (.svg) FORMATS
#
# Design Rules:
# - Strictly paper-like: Academic systems style (IEEE Transactions / ACM style)
# - No "AI graph" appearance: No rainbow pastel cards, no gradients, no glowing drop shadows
# - Crisp black/charcoal strokes (#1e293b / #0f172a), white & clean light gray fills
# - Standard orthogonal connectors, classic arrowheads
# - Compact dimensions to prevent awkward PDF page splits
# ==============================================================================

# ------------------------------------------------------------------------------
# 1. DRAW.IO XML: Figure 1 (Pipeline Architecture)
# ------------------------------------------------------------------------------
fig1_drawio = """<mxfile host="app.diagrams.net" modified="2026-09-21T03:00:00.000Z" agent="5.0" version="21.0.0" type="device">
  <diagram id="pipeline_arch" name="Pipeline Architecture">
    <mxGraphModel dx="1200" dy="700" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1169" pageHeight="827" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />

        <!-- Figure Title -->
        <mxCell id="title" value="&lt;b style=&quot;font-size: 13px;&quot;&gt;Figure 1: Architecture and Multi-Stage Processing Pipeline of the Self-Hosted System&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;resizable=0;points=[];autosize=1;strokeColor=none;fillColor=none;fontColor=#0f172a;" vertex="1" parent="1">
          <mxGeometry x="220" y="15" width="560" height="25" as="geometry" />
        </mxCell>

        <!-- STAGE 1 CONTAINER -->
        <mxCell id="stg1" value="&lt;b&gt;1. Course Indexing (T_KB)&lt;/b&gt;" style="swimlane;whiteSpace=wrap;html=1;startSize=26;fillColor=#f8fafc;strokeColor=#475569;fontColor=#0f172a;fontSize=10;rounded=0;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="20" y="45" width="175" height="285" as="geometry" />
        </mxCell>
        <mxCell id="s1_docs" value="&lt;b&gt;Course Documents&lt;/b&gt;&lt;br&gt;&lt;font style=&quot;font-size: 8.5px;&quot; color=&quot;#475569&quot;&gt;Normalized Chunks (d_i)&lt;/font&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#1e293b;fontSize=9.5;" vertex="1" parent="stg1">
          <mxGeometry x="12" y="38" width="150" height="42" as="geometry" />
        </mxCell>
        <mxCell id="s1_hash" value="&lt;b&gt;SHA-256 Hashing&lt;/b&gt;&lt;br&gt;&lt;font style=&quot;font-size: 8.5px;&quot; color=&quot;#475569&quot;&gt;h_i = SHA256(model : d_i)&lt;/font&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#1e293b;fontSize=9.5;" vertex="1" parent="stg1">
          <mxGeometry x="12" y="102" width="150" height="42" as="geometry" />
        </mxCell>
        <mxCell id="s1_dec" value="&lt;b&gt;In Cache?&lt;/b&gt;" style="rhombus;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#1e293b;fontSize=9;" vertex="1" parent="stg1">
          <mxGeometry x="38" y="166" width="100" height="40" as="geometry" />
        </mxCell>
        <mxCell id="s1_hit" value="&lt;font style=&quot;font-size: 8.5px;&quot;&gt;&lt;b&gt;Hit:&lt;/b&gt; Reuse Vector (0 ms)&lt;br&gt;&lt;b&gt;Miss:&lt;/b&gt; nomic-embed (GPU)&lt;/font&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#1e293b;fontSize=9;" vertex="1" parent="stg1">
          <mxGeometry x="12" y="230" width="150" height="42" as="geometry" />
        </mxCell>

        <!-- STAGE 2 CONTAINER -->
        <mxCell id="stg2" value="&lt;b&gt;2. Semantic Retrieval&lt;/b&gt;" style="swimlane;whiteSpace=wrap;html=1;startSize=26;fillColor=#f8fafc;strokeColor=#475569;fontColor=#0f172a;fontSize=10;rounded=0;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="210" y="45" width="175" height="285" as="geometry" />
        </mxCell>
        <mxCell id="s2_req" value="&lt;b&gt;Instructor Request&lt;/b&gt;&lt;br&gt;&lt;font style=&quot;font-size: 8.5px;&quot; color=&quot;#475569&quot;&gt;Topic &amp;amp; Difficulty Query (q)&lt;/font&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#1e293b;fontSize=9.5;" vertex="1" parent="stg2">
          <mxGeometry x="12" y="38" width="150" height="42" as="geometry" />
        </mxCell>
        <mxCell id="s2_embed" value="&lt;b&gt;Query Vectorization&lt;/b&gt;&lt;br&gt;&lt;font style=&quot;font-size: 8.5px;&quot; color=&quot;#475569&quot;&gt;Dense 768-dim vector&lt;/font&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#1e293b;fontSize=9.5;" vertex="1" parent="stg2">
          <mxGeometry x="12" y="102" width="150" height="42" as="geometry" />
        </mxCell>
        <mxCell id="s2_cos" value="&lt;b&gt;Cosine Similarity&lt;/b&gt;&lt;br&gt;&lt;font style=&quot;font-size: 8.5px;&quot; color=&quot;#475569&quot;&gt;sim(q, d) &amp;gt;= 0.50&lt;/font&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#1e293b;fontSize=9.5;" vertex="1" parent="stg2">
          <mxGeometry x="12" y="166" width="150" height="42" as="geometry" />
        </mxCell>
        <mxCell id="s2_ctx" value="&lt;b&gt;Top-K Context Budget&lt;/b&gt;&lt;br&gt;&lt;font style=&quot;font-size: 8.5px;&quot; color=&quot;#475569&quot;&gt;K = 3 chunks (~512 tokens)&lt;/font&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#1e293b;fontSize=9.5;" vertex="1" parent="stg2">
          <mxGeometry x="12" y="230" width="150" height="42" as="geometry" />
        </mxCell>

        <!-- STAGE 3 CONTAINER -->
        <mxCell id="stg3" value="&lt;b&gt;3. LLM Generation&lt;/b&gt;" style="swimlane;whiteSpace=wrap;html=1;startSize=26;fillColor=#f8fafc;strokeColor=#475569;fontColor=#0f172a;fontSize=10;rounded=0;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="400" y="45" width="175" height="285" as="geometry" />
        </mxCell>
        <mxCell id="s3_srv" value="&lt;b&gt;Local LLM Serving&lt;/b&gt;&lt;br&gt;&lt;font style=&quot;font-size: 8.5px;&quot; color=&quot;#475569&quot;&gt;Qwen2.5-Coder-7B (Ollama)&lt;br&gt;Single RTX 3090 (4-bit)&lt;/font&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#1e293b;fontSize=9.5;" vertex="1" parent="stg3">
          <mxGeometry x="12" y="38" width="150" height="52" as="geometry" />
        </mxCell>
        <mxCell id="s3_pmt" value="&lt;b&gt;Prompt Structuring&lt;/b&gt;&lt;br&gt;&lt;font style=&quot;font-size: 8.5px;&quot; color=&quot;#475569&quot;&gt;Strict JSON schema&lt;br&gt;4 options, key, explanation&lt;/font&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#1e293b;fontSize=9.5;" vertex="1" parent="stg3">
          <mxGeometry x="12" y="112" width="150" height="52" as="geometry" />
        </mxCell>
        <mxCell id="s3_out" value="&lt;b&gt;Candidate MCQ Item&lt;/b&gt;&lt;br&gt;&lt;font style=&quot;font-size: 8.5px;&quot; color=&quot;#475569&quot;&gt;T_GEN = 2.33 s&lt;/font&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#1e293b;fontSize=9.5;" vertex="1" parent="stg3">
          <mxGeometry x="12" y="210" width="150" height="42" as="geometry" />
        </mxCell>

        <!-- STAGE 4 CONTAINER -->
        <mxCell id="stg4" value="&lt;b&gt;4. Deterministic Validation&lt;/b&gt;" style="swimlane;whiteSpace=wrap;html=1;startSize=26;fillColor=#f8fafc;strokeColor=#475569;fontColor=#0f172a;fontSize=10;rounded=0;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="590" y="45" width="185" height="285" as="geometry" />
        </mxCell>
        <mxCell id="s4_t1" value="&lt;b&gt;Tier 1: Schema Check&lt;/b&gt;&lt;br&gt;&lt;font style=&quot;font-size: 8.5px;&quot; color=&quot;#475569&quot;&gt;Pydantic: JSON parse, 4 choices&lt;/font&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#1e293b;fontSize=9.5;" vertex="1" parent="stg4">
          <mxGeometry x="12" y="38" width="160" height="42" as="geometry" />
        </mxCell>
        <mxCell id="s4_t2" value="&lt;b&gt;Tier 2: Python AST Check&lt;/b&gt;&lt;br&gt;&lt;font style=&quot;font-size: 8.5px;&quot; color=&quot;#475569&quot;&gt;ast.parse &amp;amp; compile (exec)&lt;br&gt;(Bypassed for non-code items)&lt;/font&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#1e293b;fontSize=9.5;" vertex="1" parent="stg4">
          <mxGeometry x="12" y="105" width="160" height="52" as="geometry" />
        </mxCell>
        <mxCell id="s4_pass" value="&lt;b&gt;Verified Question Item&lt;/b&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#1e293b;fontSize=9.5;" vertex="1" parent="stg4">
          <mxGeometry x="12" y="180" width="160" height="32" as="geometry" />
        </mxCell>
        <mxCell id="s4_retry" value="&lt;b&gt;Retry Loop (M &amp;lt;= 3)&lt;/b&gt;&lt;br&gt;&lt;font style=&quot;font-size: 8px;&quot; color=&quot;#475569&quot;&gt;Injects traceback into prompt&lt;/font&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#475569;strokeDasharray=3 3;fontSize=8.5;" vertex="1" parent="stg4">
          <mxGeometry x="12" y="235" width="160" height="36" as="geometry" />
        </mxCell>

        <!-- STAGE 5 CONTAINER -->
        <mxCell id="stg5" value="&lt;b&gt;5. LMS Persistence&lt;/b&gt;" style="swimlane;whiteSpace=wrap;html=1;startSize=26;fillColor=#f8fafc;strokeColor=#475569;fontColor=#0f172a;fontSize=10;rounded=0;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="790" y="45" width="180" height="285" as="geometry" />
        </mxCell>
        <mxCell id="s5_db" value="&lt;b&gt;Moodle Question Bank&lt;/b&gt;&lt;br&gt;&lt;font style=&quot;font-size: 8.5px;&quot; color=&quot;#475569&quot;&gt;Direct insert: mdl_question&lt;br&gt;&lt;b&gt;End of Machine Latency (T_E2E)&lt;/b&gt;&lt;/font&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#1e293b;fontSize=9.5;" vertex="1" parent="stg5">
          <mxGeometry x="12" y="38" width="156" height="52" as="geometry" />
        </mxCell>
        <mxCell id="s5_rev" value="&lt;b&gt;Instructor Review&lt;/b&gt;&lt;br&gt;&lt;font style=&quot;font-size: 8.5px;&quot; color=&quot;#475569&quot;&gt;Asynchronous review in LMS&lt;br&gt;Accept / Edit / Reject&lt;br&gt;&lt;i&gt;(Excluded from T_E2E)&lt;/i&gt;&lt;/font&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#1e293b;fontSize=9.5;" vertex="1" parent="stg5">
          <mxGeometry x="12" y="125" width="156" height="60" as="geometry" />
        </mxCell>
        <mxCell id="s5_act" value="&lt;b&gt;Active Course Quiz&lt;/b&gt;&lt;br&gt;&lt;font style=&quot;font-size: 8.5px;&quot; color=&quot;#475569&quot;&gt;Published to students&lt;/font&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#1e293b;fontSize=9.5;" vertex="1" parent="stg5">
          <mxGeometry x="12" y="215" width="156" height="42" as="geometry" />
        </mxCell>

        <!-- Edges (Clean Orthogonal Connectors) -->
        <mxCell id="e1_1" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#1e293b;" edge="1" parent="1" source="s1_docs" target="s1_hash"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="e1_2" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#1e293b;" edge="1" parent="1" source="s1_hash" target="s1_dec"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="e1_3" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#1e293b;" edge="1" parent="1" source="s1_dec" target="s1_hit"><mxGeometry relative="1" as="geometry" /></mxCell>

        <mxCell id="e2_1" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#1e293b;" edge="1" parent="1" source="s2_req" target="s2_embed"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="e2_2" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#1e293b;" edge="1" parent="1" source="s2_embed" target="s2_cos"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="e2_3" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#1e293b;" edge="1" parent="1" source="s2_cos" target="s2_ctx"><mxGeometry relative="1" as="geometry" /></mxCell>

        <mxCell id="e_inter1" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#475569;strokeDasharray=2 2;" edge="1" parent="1" source="s1_hit" target="s2_cos"><mxGeometry relative="1" as="geometry" /></mxCell>

        <mxCell id="e3_1" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#1e293b;" edge="1" parent="1" source="s3_srv" target="s3_pmt"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="e3_2" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#1e293b;" edge="1" parent="1" source="s3_pmt" target="s3_out"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="e_inter2" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#1e293b;" edge="1" parent="1" source="s2_ctx" target="s3_pmt"><mxGeometry relative="1" as="geometry" /></mxCell>

        <mxCell id="e4_1" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#1e293b;" edge="1" parent="1" source="s4_t1" target="s4_t2"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="e4_2" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#1e293b;" edge="1" parent="1" source="s4_t2" target="s4_pass"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="e_inter3" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#1e293b;" edge="1" parent="1" source="s3_out" target="s4_t1"><mxGeometry relative="1" as="geometry" /></mxCell>

        <mxCell id="e_retry1" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#475569;strokeDasharray=3 3;" edge="1" parent="1" source="s4_t1" target="s4_retry"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="e_retry2" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#475569;strokeDasharray=3 3;" edge="1" parent="1" source="s4_retry" target="s3_pmt"><mxGeometry relative="1" as="geometry" /></mxCell>

        <mxCell id="e5_1" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#1e293b;" edge="1" parent="1" source="s4_pass" target="s5_db"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="e5_2" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#475569;strokeDasharray=3 3;" edge="1" parent="1" source="s5_db" target="s5_rev"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="e5_3" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#1e293b;" edge="1" parent="1" source="s5_rev" target="s5_act"><mxGeometry relative="1" as="geometry" /></mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
"""

with open('/Users/engtitya/Desktop/kwiz/papers/figures/pipeline_architecture.drawio', 'w', encoding='utf-8') as f:
    f.write(fig1_drawio)
print("Updated pipeline_architecture.drawio")


# ------------------------------------------------------------------------------
# 2. DRAW.IO XML: Figure 2 (Cache Decision Flow & Latency Attribution)
# ------------------------------------------------------------------------------
fig2_drawio = """<mxfile host="app.diagrams.net" modified="2026-09-21T03:00:00.000Z" agent="5.0" version="21.0.0" type="device">
  <diagram id="cache_decision" name="Cache Decision Flow">
    <mxGraphModel dx="1200" dy="700" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1169" pageHeight="827" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />

        <!-- Title -->
        <mxCell id="title" value="&lt;b style=&quot;font-size: 13px;&quot;&gt;Figure 2: Incremental Course Indexing and Embedding Reuse Decision Flow&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;resizable=0;points=[];autosize=1;strokeColor=none;fillColor=none;fontColor=#0f172a;" vertex="1" parent="1">
          <mxGeometry x="190" y="15" width="520" height="25" as="geometry" />
        </mxCell>

        <!-- LEFT PANEL: FLOWCHART -->
        <mxCell id="p_flow" value="&lt;b&gt;Per-Chunk Ingestion Decision Logic&lt;/b&gt;" style="swimlane;whiteSpace=wrap;html=1;startSize=26;fillColor=#f8fafc;strokeColor=#475569;fontColor=#0f172a;fontSize=10;rounded=0;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="25" y="45" width="485" height="275" as="geometry" />
        </mxCell>
        <mxCell id="c_chunk" value="&lt;b&gt;1. Normalized Chunk (d_i)&lt;/b&gt;&lt;br&gt;&lt;font style=&quot;font-size: 8.5px;&quot; color=&quot;#475569&quot;&gt;Course text / code segment (~500 chars)&lt;/font&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#1e293b;fontSize=9.5;" vertex="1" parent="p_flow">
          <mxGeometry x="25" y="38" width="190" height="42" as="geometry" />
        </mxCell>
        <mxCell id="c_hash" value="&lt;b&gt;2. SHA-256 Hash Computation&lt;/b&gt;&lt;br&gt;&lt;font style=&quot;font-size: 8.5px;&quot; color=&quot;#475569&quot;&gt;h_i = SHA256(model_tag : d_i) [&amp;lt; 0.02 ms]&lt;/font&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#1e293b;fontSize=9.5;" vertex="1" parent="p_flow">
          <mxGeometry x="25" y="105" width="190" height="42" as="geometry" />
        </mxCell>
        <mxCell id="c_dec" value="&lt;b&gt;In Cache?&lt;/b&gt;" style="rhombus;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#1e293b;fontSize=9;" vertex="1" parent="p_flow">
          <mxGeometry x="65" y="172" width="110" height="42" as="geometry" />
        </mxCell>
        <mxCell id="c_hit" value="&lt;b&gt;Reuse Stored Embedding Vector&lt;/b&gt;&lt;br&gt;&lt;font style=&quot;font-size: 8.5px;&quot; color=&quot;#475569&quot;&gt;T_embed = 0.00 ms (GPU Bypassed)&lt;/font&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#1e293b;fontSize=9.5;" vertex="1" parent="p_flow">
          <mxGeometry x="245" y="172" width="220" height="42" as="geometry" />
        </mxCell>
        <mxCell id="c_miss" value="&lt;b&gt;Invoke nomic-embed-text&lt;/b&gt;&lt;br&gt;&lt;font style=&quot;font-size: 8.5px;&quot; color=&quot;#475569&quot;&gt;GPU compute: 11.2 ms per chunk&lt;/font&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#1e293b;fontSize=9.5;" vertex="1" parent="p_flow">
          <mxGeometry x="25" y="225" width="190" height="40" as="geometry" />
        </mxCell>
        <mxCell id="c_store" value="&lt;b&gt;Store (h_i, v_i) in Index&lt;/b&gt;&lt;br&gt;&lt;font style=&quot;font-size: 8.5px;&quot; color=&quot;#475569&quot;&gt;Update active vector space&lt;/font&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#1e293b;fontSize=9.5;" vertex="1" parent="p_flow">
          <mxGeometry x="245" y="225" width="220" height="40" as="geometry" />
        </mxCell>

        <mxCell id="e_c1" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#1e293b;" edge="1" parent="1" source="c_chunk" target="c_hash"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="e_c2" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#1e293b;" edge="1" parent="1" source="c_hash" target="c_dec"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="e_hit" value="Yes (Hit)" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#1e293b;fontSize=8.5;" edge="1" parent="1" source="c_dec" target="c_hit"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="e_miss" value="No (Miss)" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#1e293b;fontSize=8.5;" edge="1" parent="1" source="c_dec" target="c_miss"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="e_store" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#1e293b;" edge="1" parent="1" source="c_miss" target="c_store"><mxGeometry relative="1" as="geometry" /></mxCell>

        <!-- RIGHT PANEL: LATENCY ATTRIBUTION -->
        <mxCell id="p_stats" value="&lt;b&gt;Systems Latency Attribution (T_KB)&lt;/b&gt;" style="swimlane;whiteSpace=wrap;html=1;startSize=26;fillColor=#f8fafc;strokeColor=#475569;fontColor=#0f172a;fontSize=10;rounded=0;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="530" y="45" width="340" height="275" as="geometry" />
        </mxCell>
        <mxCell id="b_base" value="&lt;b&gt;Baseline: Full Re-indexing (Config A)&lt;/b&gt;&lt;br&gt;T_KB = 515.4 ms (all chunks embedded on GPU)" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#1e293b;fontSize=9;align=left;spacingLeft=8;" vertex="1" parent="p_stats">
          <mxGeometry x="15" y="38" width="310" height="38" as="geometry" />
        </mxCell>
        <mxCell id="b_prop" value="&lt;b&gt;Proposed: Incremental Cache (Config B)&lt;/b&gt;&lt;br&gt;T_KB = 13.5 ms (&lt;b&gt;38.2x speedup&lt;/b&gt;, 97.8% GPU reduction)" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#1e293b;fontSize=9;align=left;spacingLeft=8;" vertex="1" parent="p_stats">
          <mxGeometry x="15" y="86" width="310" height="38" as="geometry" />
        </mxCell>
        <mxCell id="b_scale" value="&lt;b&gt;Corpus Scaling Acceleration (U_100 / U_0):&lt;/b&gt;&lt;br&gt;• 10k tokens (70 chunks): &lt;b&gt;140.3x speedup&lt;/b&gt;&lt;br&gt;• 50k tokens (348 chunks): &lt;b&gt;120.8x speedup&lt;/b&gt;&lt;br&gt;• 100k tokens (695 chunks): &lt;b&gt;123.3x speedup&lt;/b&gt;&lt;br&gt;• 250k tokens (1736 chunks): &lt;b&gt;131.1x speedup&lt;/b&gt;&lt;br&gt;&lt;font color=&quot;#475569&quot;&gt;Cryptographic hash overhead &amp;lt; 0.8% across all scales&lt;/font&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#cbd5e1;fontSize=8.5;align=left;spacingLeft=8;" vertex="1" parent="p_stats">
          <mxGeometry x="15" y="136" width="310" height="120" as="geometry" />
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
"""

with open('/Users/engtitya/Desktop/kwiz/papers/figures/cache_decision_flow.drawio', 'w', encoding='utf-8') as f:
    f.write(fig2_drawio)
print("Updated cache_decision_flow.drawio")


# ------------------------------------------------------------------------------
# 3. VECTOR SVG: Figure 1 (Pipeline Architecture)
# ------------------------------------------------------------------------------
fig1_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 970 330" width="100%" height="100%" style="background-color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;">
  <defs>
    <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 2 L 8 5 L 0 8 z" fill="#1e293b" />
    </marker>
    <marker id="arrDashed" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 2 L 8 5 L 0 8 z" fill="#475569" />
    </marker>
  </defs>

  <!-- Main Title -->
  <text x="485" y="22" text-anchor="middle" font-size="12" font-weight="700" fill="#0f172a" letter-spacing="0.2">
    Figure 1: Architecture and Multi-Stage Processing Pipeline of the Self-Hosted System
  </text>

  <!-- ================= STAGE 1: COURSE INDEXING ================= -->
  <rect x="15" y="38" width="175" height="280" fill="#ffffff" stroke="#334155" stroke-width="1"/>
  <rect x="15" y="38" width="175" height="24" fill="#f8fafc" stroke="#334155" stroke-width="1"/>
  <text x="102" y="54" text-anchor="middle" font-size="9.5" font-weight="700" fill="#0f172a">1. Course Indexing (T_KB)</text>

  <!-- Box 1.1 -->
  <rect x="25" y="72" width="155" height="42" fill="#ffffff" stroke="#1e293b" stroke-width="0.9"/>
  <text x="102" y="89" text-anchor="middle" font-size="9.5" font-weight="600" fill="#0f172a">Course Documents</text>
  <text x="102" y="103" text-anchor="middle" font-size="8" fill="#475569">Normalized Chunks (d_i)</text>

  <path d="M 102 114 L 102 132" fill="none" stroke="#1e293b" stroke-width="0.9" marker-end="url(#arr)"/>

  <!-- Box 1.2 -->
  <rect x="25" y="134" width="155" height="42" fill="#ffffff" stroke="#1e293b" stroke-width="0.9"/>
  <text x="102" y="151" text-anchor="middle" font-size="9.5" font-weight="600" fill="#0f172a">SHA-256 Hashing</text>
  <text x="102" y="165" text-anchor="middle" font-size="8" fill="#475569">h_i = SHA256(model : d_i)</text>

  <path d="M 102 176 L 102 194" fill="none" stroke="#1e293b" stroke-width="0.9" marker-end="url(#arr)"/>

  <!-- Diamond 1.3 -->
  <polygon points="102,196 157,214 102,232 47,214" fill="#ffffff" stroke="#1e293b" stroke-width="0.9"/>
  <text x="102" y="217" text-anchor="middle" font-size="8.5" font-weight="600" fill="#0f172a">In Cache?</text>

  <path d="M 102 232 L 102 254" fill="none" stroke="#1e293b" stroke-width="0.9" marker-end="url(#arr)"/>

  <!-- Box 1.4 -->
  <rect x="25" y="256" width="155" height="48" fill="#ffffff" stroke="#1e293b" stroke-width="0.9"/>
  <text x="102" y="273" text-anchor="middle" font-size="8.5" fill="#0f172a"><tspan font-weight="700">Hit:</tspan> Reuse Vector (0 ms)</text>
  <text x="102" y="289" text-anchor="middle" font-size="8" fill="#475569"><tspan font-weight="700">Miss:</tspan> nomic-embed (GPU)</text>


  <!-- ================= STAGE 2: SEMANTIC RETRIEVAL ================= -->
  <rect x="205" y="38" width="175" height="280" fill="#ffffff" stroke="#334155" stroke-width="1"/>
  <rect x="205" y="38" width="175" height="24" fill="#f8fafc" stroke="#334155" stroke-width="1"/>
  <text x="292" y="54" text-anchor="middle" font-size="9.5" font-weight="700" fill="#0f172a">2. Semantic Retrieval</text>

  <!-- Box 2.1 -->
  <rect x="215" y="72" width="155" height="42" fill="#ffffff" stroke="#1e293b" stroke-width="0.9"/>
  <text x="292" y="89" text-anchor="middle" font-size="9.5" font-weight="600" fill="#0f172a">Instructor Request</text>
  <text x="292" y="103" text-anchor="middle" font-size="8" fill="#475569">Topic &amp; Difficulty Query (q)</text>

  <path d="M 292 114 L 292 132" fill="none" stroke="#1e293b" stroke-width="0.9" marker-end="url(#arr)"/>

  <!-- Box 2.2 -->
  <rect x="215" y="134" width="155" height="42" fill="#ffffff" stroke="#1e293b" stroke-width="0.9"/>
  <text x="292" y="151" text-anchor="middle" font-size="9.5" font-weight="600" fill="#0f172a">Query Vectorization</text>
  <text x="292" y="165" text-anchor="middle" font-size="8" fill="#475569">Dense 768-dim vector</text>

  <path d="M 292 176 L 292 194" fill="none" stroke="#1e293b" stroke-width="0.9" marker-end="url(#arr)"/>

  <!-- Box 2.3 -->
  <rect x="215" y="196" width="155" height="42" fill="#ffffff" stroke="#1e293b" stroke-width="0.9"/>
  <text x="292" y="213" text-anchor="middle" font-size="9.5" font-weight="600" fill="#0f172a">Cosine Similarity</text>
  <text x="292" y="227" text-anchor="middle" font-size="8" fill="#475569">sim(q, d) &gt;= 0.50</text>

  <!-- Connector from Cache to Cosine -->
  <path d="M 180 280 L 195 280 L 195 217 L 213 217" fill="none" stroke="#475569" stroke-width="0.8" stroke-dasharray="2 2" marker-end="url(#arrDashed)"/>

  <path d="M 292 238 L 292 254" fill="none" stroke="#1e293b" stroke-width="0.9" marker-end="url(#arr)"/>

  <!-- Box 2.4 -->
  <rect x="215" y="256" width="155" height="48" fill="#ffffff" stroke="#1e293b" stroke-width="0.9"/>
  <text x="292" y="275" text-anchor="middle" font-size="9.5" font-weight="600" fill="#0f172a">Top-K Context Budget</text>
  <text x="292" y="291" text-anchor="middle" font-size="8" fill="#475569">K = 3 chunks (~512 tokens)</text>


  <!-- ================= STAGE 3: LLM GENERATION ================= -->
  <rect x="395" y="38" width="175" height="280" fill="#ffffff" stroke="#334155" stroke-width="1"/>
  <rect x="395" y="38" width="175" height="24" fill="#f8fafc" stroke="#334155" stroke-width="1"/>
  <text x="482" y="54" text-anchor="middle" font-size="9.5" font-weight="700" fill="#0f172a">3. LLM Generation</text>

  <!-- Box 3.1 -->
  <rect x="405" y="72" width="155" height="48" fill="#ffffff" stroke="#1e293b" stroke-width="0.9"/>
  <text x="482" y="90" text-anchor="middle" font-size="9.5" font-weight="600" fill="#0f172a">Local Model Serving</text>
  <text x="482" y="103" text-anchor="middle" font-size="8" fill="#475569">Qwen2.5-Coder-7B (Ollama)</text>
  <text x="482" y="114" text-anchor="middle" font-size="7.5" fill="#64748b">Single RTX 3090 (4-bit)</text>

  <path d="M 482 120 L 482 140" fill="none" stroke="#1e293b" stroke-width="0.9" marker-end="url(#arr)"/>

  <!-- Box 3.2 -->
  <rect x="405" y="142" width="155" height="52" fill="#ffffff" stroke="#1e293b" stroke-width="0.9"/>
  <text x="482" y="160" text-anchor="middle" font-size="9.5" font-weight="600" fill="#0f172a">Prompt Structuring</text>
  <text x="482" y="174" text-anchor="middle" font-size="8" fill="#475569">Strict JSON schema format</text>
  <text x="482" y="186" text-anchor="middle" font-size="7.5" fill="#64748b">4 options, key, explanation</text>

  <!-- Connector from Stage 2 Context to Stage 3 Prompt -->
  <path d="M 370 280 L 388 280 L 388 168 L 403 168" fill="none" stroke="#1e293b" stroke-width="0.9" marker-end="url(#arr)"/>

  <path d="M 482 194 L 482 220" fill="none" stroke="#1e293b" stroke-width="0.9" marker-end="url(#arr)"/>

  <!-- Box 3.3 -->
  <rect x="405" y="222" width="155" height="44" fill="#ffffff" stroke="#1e293b" stroke-width="0.9"/>
  <text x="482" y="240" text-anchor="middle" font-size="9.5" font-weight="600" fill="#0f172a">Candidate MCQ Item</text>
  <text x="482" y="254" text-anchor="middle" font-size="8" fill="#475569">T_GEN = 2.33 s</text>


  <!-- ================= STAGE 4: VALIDATION ================= -->
  <rect x="585" y="38" width="185" height="280" fill="#ffffff" stroke="#334155" stroke-width="1"/>
  <rect x="585" y="38" width="185" height="24" fill="#f8fafc" stroke="#334155" stroke-width="1"/>
  <text x="677" y="54" text-anchor="middle" font-size="9.5" font-weight="700" fill="#0f172a">4. Two-Tier Validation</text>

  <!-- Connector from Stage 3 Output to Stage 4 Tier 1 -->
  <path d="M 560 244 L 575 244 L 575 93 L 593 93" fill="none" stroke="#1e293b" stroke-width="0.9" marker-end="url(#arr)"/>

  <!-- Box 4.1 -->
  <rect x="595" y="72" width="165" height="42" fill="#ffffff" stroke="#1e293b" stroke-width="0.9"/>
  <text x="677" y="89" text-anchor="middle" font-size="9.5" font-weight="600" fill="#0f172a">Tier 1: Schema Check</text>
  <text x="677" y="103" text-anchor="middle" font-size="8" fill="#475569">Pydantic: JSON parse, 4 choices</text>

  <path d="M 677 114 L 677 132" fill="none" stroke="#1e293b" stroke-width="0.9" marker-end="url(#arr)"/>

  <!-- Box 4.2 -->
  <rect x="595" y="134" width="165" height="46" fill="#ffffff" stroke="#1e293b" stroke-width="0.9"/>
  <text x="677" y="152" text-anchor="middle" font-size="9.5" font-weight="600" fill="#0f172a">Tier 2: Python AST Check</text>
  <text x="677" y="165" text-anchor="middle" font-size="8" fill="#475569">ast.parse &amp; compile (exec)</text>
  <text x="677" y="174" text-anchor="middle" font-size="7.5" fill="#64748b">(Bypassed for non-code items)</text>

  <path d="M 677 180 L 677 198" fill="none" stroke="#1e293b" stroke-width="0.9" marker-end="url(#arr)"/>

  <!-- Box 4.3 -->
  <rect x="595" y="200" width="165" height="34" fill="#ffffff" stroke="#1e293b" stroke-width="0.9"/>
  <text x="677" y="221" text-anchor="middle" font-size="9.5" font-weight="600" fill="#0f172a">Verified Question Item</text>

  <!-- Box 4.4 Retry -->
  <rect x="595" y="250" width="165" height="42" fill="#ffffff" stroke="#64748b" stroke-width="0.8" stroke-dasharray="3 3"/>
  <text x="677" y="267" text-anchor="middle" font-size="8.5" font-weight="600" fill="#1e293b">Retry Loop (M &lt;= 3)</text>
  <text x="677" y="281" text-anchor="middle" font-size="7.5" fill="#64748b">Injects traceback into prompt</text>

  <path d="M 595 271 L 482 271 L 482 196" fill="none" stroke="#64748b" stroke-width="0.8" stroke-dasharray="3 3" marker-end="url(#arrDashed)"/>


  <!-- ================= STAGE 5: LMS PERSISTENCE ================= -->
  <rect x="785" y="38" width="170" height="280" fill="#ffffff" stroke="#334155" stroke-width="1"/>
  <rect x="785" y="38" width="170" height="24" fill="#f8fafc" stroke="#334155" stroke-width="1"/>
  <text x="870" y="54" text-anchor="middle" font-size="9.5" font-weight="700" fill="#0f172a">5. LMS Persistence</text>

  <!-- Connector from Stage 4 Verified to Stage 5 DB -->
  <path d="M 760 217 L 773 217 L 773 95 L 793 95" fill="none" stroke="#1e293b" stroke-width="0.9" marker-end="url(#arr)"/>

  <!-- Box 5.1 -->
  <rect x="795" y="72" width="150" height="52" fill="#ffffff" stroke="#1e293b" stroke-width="0.9"/>
  <text x="870" y="90" text-anchor="middle" font-size="9.5" font-weight="600" fill="#0f172a">Moodle Question Bank</text>
  <text x="870" y="104" text-anchor="middle" font-size="8" fill="#475569">Direct insert: mdl_question</text>
  <text x="870" y="116" text-anchor="middle" font-size="7.5" font-weight="600" fill="#0f172a">End of T_E2E (2.35 s mean)</text>

  <!-- Dashed connector to decoupled review -->
  <path d="M 870 124 L 870 148" fill="none" stroke="#64748b" stroke-width="0.9" stroke-dasharray="3 3" marker-end="url(#arrDashed)"/>

  <!-- Box 5.2 -->
  <rect x="795" y="150" width="150" height="60" fill="#ffffff" stroke="#1e293b" stroke-width="0.9"/>
  <text x="870" y="169" text-anchor="middle" font-size="9.5" font-weight="600" fill="#0f172a">Instructor Review</text>
  <text x="870" y="184" text-anchor="middle" font-size="8" fill="#475569">Asynchronous gating</text>
  <text x="870" y="196" text-anchor="middle" font-size="7.5" fill="#334155">Accept / Edit / Reject</text>
  <text x="870" y="206" text-anchor="middle" font-size="7" font-style="italic" fill="#64748b">(Decoupled from T_E2E)</text>

  <path d="M 870 210 L 870 234" fill="none" stroke="#1e293b" stroke-width="0.9" marker-end="url(#arr)"/>

  <!-- Box 5.3 -->
  <rect x="795" y="236" width="150" height="42" fill="#ffffff" stroke="#1e293b" stroke-width="0.9"/>
  <text x="870" y="254" text-anchor="middle" font-size="9.5" font-weight="600" fill="#0f172a">Active Course Quiz</text>
  <text x="870" y="268" text-anchor="middle" font-size="8" fill="#475569">Published to students</text>

</svg>
"""

with open('/Users/engtitya/Desktop/kwiz/papers/figures/pipeline_architecture.svg', 'w', encoding='utf-8') as f:
    f.write(fig1_svg)
print("Updated pipeline_architecture.svg")


# ------------------------------------------------------------------------------
# 4. VECTOR SVG: Figure 2 (Cache Decision Flow & Latency Attribution)
# ------------------------------------------------------------------------------
fig2_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 880 320" width="100%" height="100%" style="background-color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;">
  <defs>
    <marker id="arr2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 2 L 8 5 L 0 8 z" fill="#1e293b" />
    </marker>
  </defs>

  <!-- Main Title -->
  <text x="440" y="22" text-anchor="middle" font-size="12" font-weight="700" fill="#0f172a" letter-spacing="0.2">
    Figure 2: Incremental Course Indexing and Embedding Reuse Decision Flow
  </text>

  <!-- ================= LEFT PANEL: FLOWCHART ================= -->
  <rect x="20" y="38" width="490" height="268" fill="#ffffff" stroke="#334155" stroke-width="1"/>
  <rect x="20" y="38" width="490" height="24" fill="#f8fafc" stroke="#334155" stroke-width="1"/>
  <text x="35" y="54" font-size="9.5" font-weight="700" fill="#0f172a">Per-Chunk Ingestion Decision Logic</text>

  <!-- Step 1 -->
  <rect x="40" y="74" width="190" height="42" fill="#ffffff" stroke="#1e293b" stroke-width="0.9"/>
  <text x="135" y="91" text-anchor="middle" font-size="9.5" font-weight="600" fill="#0f172a">1. Normalized Chunk (d_i)</text>
  <text x="135" y="105" text-anchor="middle" font-size="8" fill="#475569">Course text / code segment</text>

  <path d="M 135 116 L 135 136" fill="none" stroke="#1e293b" stroke-width="0.9" marker-end="url(#arr2)"/>

  <!-- Step 2 -->
  <rect x="40" y="138" width="190" height="42" fill="#ffffff" stroke="#1e293b" stroke-width="0.9"/>
  <text x="135" y="155" text-anchor="middle" font-size="9.5" font-weight="600" fill="#0f172a">2. SHA-256 Hash Computation</text>
  <text x="135" y="169" text-anchor="middle" font-size="8" fill="#475569">h_i = SHA256(model_tag : d_i)</text>

  <path d="M 135 180 L 135 200" fill="none" stroke="#1e293b" stroke-width="0.9" marker-end="url(#arr2)"/>

  <!-- Step 3: Decision Diamond -->
  <polygon points="135,202 195,221 135,240 75,221" fill="#ffffff" stroke="#1e293b" stroke-width="0.9"/>
  <text x="135" y="224" text-anchor="middle" font-size="8.5" font-weight="600" fill="#0f172a">In Cache?</text>

  <!-- Hit Branch -->
  <path d="M 195 221 L 258 221" fill="none" stroke="#1e293b" stroke-width="0.9" marker-end="url(#arr2)"/>
  <text x="226" y="214" text-anchor="middle" font-size="8" font-weight="600" fill="#0f172a">Yes (Hit)</text>

  <rect x="260" y="202" width="230" height="38" fill="#ffffff" stroke="#1e293b" stroke-width="0.9"/>
  <text x="375" y="218" text-anchor="middle" font-size="9" font-weight="600" fill="#0f172a">Reuse Stored Embedding Vector</text>
  <text x="375" y="231" text-anchor="middle" font-size="8" fill="#475569">T_embed = 0.00 ms (GPU Bypassed)</text>

  <!-- Miss Branch -->
  <path d="M 135 240 L 135 258" fill="none" stroke="#1e293b" stroke-width="0.9" marker-end="url(#arr2)"/>
  <text x="142" y="250" font-size="7.5" font-weight="600" fill="#0f172a">No</text>

  <rect x="40" y="260" width="190" height="38" fill="#ffffff" stroke="#1e293b" stroke-width="0.9"/>
  <text x="135" y="275" text-anchor="middle" font-size="9" font-weight="600" fill="#0f172a">Invoke nomic-embed-text</text>
  <text x="135" y="288" text-anchor="middle" font-size="8" fill="#475569">GPU compute: 11.2 ms</text>

  <path d="M 230 279 L 258 279" fill="none" stroke="#1e293b" stroke-width="0.9" marker-end="url(#arr2)"/>

  <rect x="260" y="260" width="230" height="38" fill="#ffffff" stroke="#1e293b" stroke-width="0.9"/>
  <text x="375" y="275" text-anchor="middle" font-size="9" font-weight="600" fill="#0f172a">Store (h_i, v_i) in Index</text>
  <text x="375" y="288" text-anchor="middle" font-size="8" fill="#475569">Update active vector space</text>


  <!-- ================= RIGHT PANEL: LATENCY ATTRIBUTION ================= -->
  <rect x="525" y="38" width="335" height="268" fill="#ffffff" stroke="#334155" stroke-width="1"/>
  <rect x="525" y="38" width="335" height="24" fill="#f8fafc" stroke="#334155" stroke-width="1"/>
  <text x="692" y="54" text-anchor="middle" font-size="9.5" font-weight="700" fill="#0f172a">Systems Latency Attribution (T_KB)</text>

  <!-- Box A: Baseline -->
  <rect x="540" y="74" width="305" height="38" fill="#ffffff" stroke="#64748b" stroke-width="0.8"/>
  <text x="550" y="90" font-size="9" font-weight="600" fill="#0f172a">Baseline: Full Re-indexing (Config A)</text>
  <text x="550" y="103" font-size="8" fill="#475569">T_KB = 515.4 ms (all chunks embedded on GPU)</text>

  <!-- Box B: Proposed -->
  <rect x="540" y="120" width="305" height="38" fill="#ffffff" stroke="#1e293b" stroke-width="1"/>
  <text x="550" y="136" font-size="9" font-weight="700" fill="#0f172a">Proposed: Incremental Cache (Config B)</text>
  <text x="550" y="149" font-size="8" fill="#0f172a">T_KB = 13.5 ms (<tspan font-weight="700">38.2x speedup</tspan>, 97.8% GPU reduction)</text>

  <!-- Divider -->
  <line x1="540" y1="168" x2="845" y2="168" stroke="#cbd5e1" stroke-width="0.8"/>

  <!-- Scaling Table -->
  <text x="540" y="184" font-size="8.5" font-weight="700" fill="#0f172a">Corpus Scaling Acceleration (U_100 / U_0):</text>

  <text x="550" y="201" font-size="8" fill="#334155">• 10k tokens (70 chunks):</text>
  <text x="840" y="201" text-anchor="end" font-size="8" font-weight="700" fill="#0f172a">140.3x</text>

  <text x="550" y="217" font-size="8" fill="#334155">• 50k tokens (348 chunks):</text>
  <text x="840" y="217" text-anchor="end" font-size="8" font-weight="700" fill="#0f172a">120.8x</text>

  <text x="550" y="233" font-size="8" fill="#334155">• 100k tokens (695 chunks):</text>
  <text x="840" y="233" text-anchor="end" font-size="8" font-weight="700" fill="#0f172a">123.3x</text>

  <text x="550" y="249" font-size="8" fill="#334155">• 250k tokens (1736 chunks):</text>
  <text x="840" y="249" text-anchor="end" font-size="8" font-weight="700" fill="#0f172a">131.1x</text>

  <rect x="540" y="260" width="305" height="36" fill="#f8fafc" stroke="#cbd5e1" stroke-width="0.8"/>
  <text x="692" y="275" text-anchor="middle" font-size="7.5" fill="#475569">Cryptographic hash overhead &lt; 0.8% across all corpus scales</text>
  <text x="692" y="287" text-anchor="middle" font-size="7.5" fill="#475569">T_KB = T_extract + T_chunk + T_hash + T_lookup + T_embed + T_index</text>

</svg>
"""

with open('/Users/engtitya/Desktop/kwiz/papers/figures/cache_decision_flow.svg', 'w', encoding='utf-8') as f:
    f.write(fig2_svg)
print("Updated cache_decision_flow.svg")
