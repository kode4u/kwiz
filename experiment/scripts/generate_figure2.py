import os

svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 950 560" width="100%" height="100%" style="background-color: #ffffff; font-family: 'Helvetica Neue', Arial, sans-serif;">
  <defs>
    <filter id="shadow2" x="-4%" y="-5%" width="108%" height="114%" filterUnits="userSpaceOnUse">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#0f172a" flood-opacity="0.06" />
    </filter>
    <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#334155" />
    </marker>
    <marker id="arrGreen" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#059669" />
    </marker>
    <marker id="arrRed" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#dc2626" />
    </marker>
  </defs>

  <!-- Title -->
  <text x="475" y="30" text-anchor="middle" font-size="15" font-weight="bold" fill="#0f172a" letter-spacing="0.5">
    FIGURE 2: INCREMENTAL COURSE INDEXING &amp; SHA-256 EMBEDDING REUSE DECISION FLOW
  </text>
  <text x="475" y="48" text-anchor="middle" font-size="10.5" fill="#64748b">
    Decomposition of Knowledge Base refresh latency ($T_{KB}$) under course syllabus revisions
  </text>

  <!-- Main Flowchart Box Left -->
  <rect x="30" y="70" width="560" height="440" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5" filter="url(#shadow2)"/>
  <text x="50" y="95" font-size="12" font-weight="bold" fill="#1e293b">Per-Chunk Processing Pipeline ($d_i \in D$)</text>

  <!-- Step 1: Input Chunk -->
  <rect x="60" y="115" width="220" height="52" rx="6" fill="#ffffff" stroke="#94a3b8" stroke-width="1.2"/>
  <text x="170" y="136" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#0f172a">1. Normalized Chunk ($d_i$)</text>
  <text x="170" y="152" text-anchor="middle" font-size="8.5" fill="#64748b">Text / Code Segment ($\sim 500$ chars)</text>

  <!-- Arrow -->
  <path d="M 170 167 L 170 195" fill="none" stroke="#475569" stroke-width="1.5" marker-end="url(#arr)"/>

  <!-- Step 2: Compute Hash -->
  <rect x="60" y="197" width="220" height="58" rx="6" fill="#eff6ff" stroke="#3b82f6" stroke-width="1.2"/>
  <text x="170" y="217" text-anchor="middle" font-size="10" font-weight="bold" fill="#1d4ed8">2. Compute SHA-256 Hash</text>
  <text x="170" y="233" text-anchor="middle" font-size="8.5" fill="#1e40af">$h_i = \text{SHA256}(\text{model\_tag} : d_i)$</text>
  <text x="170" y="246" text-anchor="middle" font-size="8" fill="#2563eb">Hash Time: $T_{hash} \le 0.02\text{ ms}$</text>

  <!-- Arrow to Diamond -->
  <path d="M 170 255 L 170 285" fill="none" stroke="#475569" stroke-width="1.5" marker-end="url(#arr)"/>

  <!-- Diamond: In Cache? -->
  <polygon points="170,287 250,320 170,353 90,320" fill="#fffbeb" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="170" y="316" text-anchor="middle" font-size="9.5" font-weight="bold" fill="#92400e">Hash in Cache?</text>
  <text x="170" y="330" text-anchor="middle" font-size="8" fill="#b45309">Lookup ($T_{lookup} \sim 0.04\text{ ms}$)</text>

  <!-- Branch YES: Cache Hit -->
  <path d="M 250 320 L 320 320" fill="none" stroke="#059669" stroke-width="1.5" marker-end="url(#arrGreen)"/>
  <text x="285" y="312" text-anchor="middle" font-size="8.5" font-weight="bold" fill="#059669">YES (Hit)</text>

  <rect x="322" y="295" width="240" height="58" rx="6" fill="#ecfdf5" stroke="#10b981" stroke-width="1.2"/>
  <text x="442" y="315" text-anchor="middle" font-size="10" font-weight="bold" fill="#065f46">Reuse Stored Embedding Vector</text>
  <text x="442" y="331" text-anchor="middle" font-size="8.5" fill="#047857">GPU Computation: $T_{embed} = 0.00\text{ ms}$</text>
  <text x="442" y="344" text-anchor="middle" font-size="8" font-weight="bold" fill="#059669">38.2× to 140.3× Indexing Speedup</text>

  <!-- Branch NO: Cache Miss -->
  <path d="M 170 353 L 170 410" fill="none" stroke="#dc2626" stroke-width="1.5" marker-end="url(#arrRed)"/>
  <text x="180" y="380" font-size="8.5" font-weight="bold" fill="#dc2626">NO (Miss)</text>

  <rect x="60" y="412" width="220" height="65" rx="6" fill="#fef2f2" stroke="#ef4444" stroke-width="1.2"/>
  <text x="170" y="432" text-anchor="middle" font-size="10" font-weight="bold" fill="#991b1b">Invoke Embedding Engine</text>
  <text x="170" y="448" text-anchor="middle" font-size="8.5" fill="#b91c1c">nomic-embed-text on RTX 3090</text>
  <text x="170" y="462" text-anchor="middle" font-size="8" fill="#7f1d1d">Generates 768-dim vector ($11.2\text{ ms}$)</text>

  <!-- Save to Cache -->
  <path d="M 280 445 L 360 445" fill="none" stroke="#dc2626" stroke-width="1.5" marker-end="url(#arrRed)"/>
  <rect x="362" y="418" width="200" height="52" rx="6" fill="#ffffff" stroke="#64748b" stroke-width="1.2"/>
  <text x="462" y="438" text-anchor="middle" font-size="9.5" font-weight="bold" fill="#1e293b">Write to Cache &amp; Index</text>
  <text x="462" y="454" text-anchor="middle" font-size="8.5" fill="#475569">Store key $h_i \to \mathbf{v}_i$ ($T_{index} \sim 1.2\text{ ms}$)</text>

  <!-- Performance Comparison Right Panel -->
  <rect x="610" y="70" width="310" height="440" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5" filter="url(#shadow2)"/>
  <text x="765" y="95" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Latency Attribution ($T_{KB}$)</text>

  <!-- Baseline Bar -->
  <text x="630" y="130" font-size="10" font-weight="bold" fill="#334155">Full Re-index Baseline (Config A)</text>
  <rect x="630" y="140" width="270" height="34" rx="4" fill="#fee2e2" stroke="#ef4444" stroke-width="1"/>
  <rect x="630" y="140" width="260" height="34" rx="4" fill="#f87171"/>
  <text x="760" y="161" text-anchor="middle" font-size="9" font-weight="bold" fill="#ffffff">T_embed(all) = 502.8 ms (97.6%)</text>
  <text x="630" y="188" font-size="8.5" fill="#64748b">Total KB Refresh: <tspan font-weight="bold" fill="#dc2626">515.4 ms</tspan></text>

  <!-- Proposed Pipeline Bar -->
  <text x="630" y="225" font-size="10" font-weight="bold" fill="#334155">Proposed Pipeline (Config B)</text>
  <rect x="630" y="235" width="270" height="34" rx="4" fill="#dcfce7" stroke="#22c55e" stroke-width="1"/>
  <rect x="630" y="235" width="18" height="34" rx="4" fill="#22c55e"/>
  <text x="690" y="256" font-size="9" font-weight="bold" fill="#15803d">13.5 ms</text>
  <text x="630" y="283" font-size="8.5" fill="#64748b">Total KB Refresh: <tspan font-weight="bold" fill="#15803d">13.5 ms (38.2× faster)</tspan></text>

  <!-- Quantitative Box -->
  <rect x="625" y="305" width="280" height="185" rx="6" fill="#ffffff" stroke="#e2e8f0" stroke-width="1"/>
  <text x="765" y="325" text-anchor="middle" font-size="10" font-weight="bold" fill="#0f172a">Corpus Scaling Speedup ($U_{100} / U_0$)</text>

  <path d="M 640 335 L 890 335" stroke="#f1f5f9" stroke-width="1"/>
  <text x="640" y="355" font-size="8.5" fill="#334155">• 10k tokens (70 chunks):</text>
  <text x="880" y="355" text-anchor="end" font-size="8.5" font-weight="bold" fill="#2563eb">140.3× speedup</text>

  <text x="640" y="375" font-size="8.5" fill="#334155">• 50k tokens (348 chunks):</text>
  <text x="880" y="375" text-anchor="end" font-size="8.5" font-weight="bold" fill="#2563eb">120.8× speedup</text>

  <text x="640" y="395" font-size="8.5" fill="#334155">• 100k tokens (695 chunks):</text>
  <text x="880" y="395" text-anchor="end" font-size="8.5" font-weight="bold" fill="#2563eb">123.3× speedup</text>

  <text x="640" y="415" font-size="8.5" fill="#334155">• 250k tokens (1736 chunks):</text>
  <text x="880" y="415" text-anchor="end" font-size="8.5" font-weight="bold" fill="#2563eb">131.1× speedup</text>

  <path d="M 640 430 L 890 430" stroke="#f1f5f9" stroke-width="1"/>
  <text x="765" y="450" text-anchor="middle" font-size="8.5" fill="#059669" font-weight="bold">Hashing overhead &lt; 0.8% across all scales</text>
  <text x="765" y="468" text-anchor="middle" font-size="8" fill="#64748b">Eliminates 97.8% of GPU embedding computation</text>

  <!-- Bottom Global Footnote -->
  <rect x="30" y="520" width="890" height="28" rx="4" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="0.8"/>
  <text x="475" y="538" text-anchor="middle" font-size="8.5" fill="#475569">
    Equation: $T_{KB} = T_{extract} + T_{chunk} + T_{hash} + T_{lookup} + T_{embed}(changed) + T_{index}$. Unchanged chunks bypass GPU inference.
  </text>
</svg>
"""

svg_path = '/Users/engtitya/Desktop/kwiz/papers/figures/cache_decision_flow.svg'
with open(svg_path, 'w', encoding='utf-8') as f:
    f.write(svg_content)

print(f"Generated {svg_path} ({len(svg_content)} bytes)")

drawio_content = """<mxfile host="app.diagrams.net" modified="2026-09-21T02:00:00.000Z" agent="5.0" version="21.0.0" type="device">
  <diagram id="cache_decision" name="Cache Decision Flow">
    <mxGraphModel dx="1200" dy="700" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1169" pageHeight="827" math="1" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />

        <mxCell id="title" value="&lt;b style=&quot;font-size: 15px;&quot;&gt;FIGURE 2: INCREMENTAL COURSE INDEXING &amp;amp; SHA-256 EMBEDDING REUSE DECISION FLOW&lt;/b&gt;&lt;br&gt;&lt;font color=&quot;#64748b&quot; style=&quot;font-size: 11px;&quot;&gt;Decomposition of Knowledge Base refresh latency (T_KB) under course syllabus revisions&lt;/font&gt;" style="text;html=1;align=center;verticalAlign=middle;resizable=0;points=[];autosize=1;strokeColor=none;fillColor=none;" vertex="1" parent="1">
          <mxGeometry x="150" y="20" width="670" height="40" as="geometry" />
        </mxCell>

        <mxCell id="p_flow" value="&lt;b&gt;Per-Chunk Processing Pipeline (d_i)&lt;/b&gt;" style="swimlane;whiteSpace=wrap;html=1;startSize=25;fillColor=#f8fafc;strokeColor=#cbd5e1;fontColor=#1e293b;rounded=1;arcSize=4;" vertex="1" parent="1">
          <mxGeometry x="40" y="70" width="540" height="430" as="geometry" />
        </mxCell>
        <mxCell id="c_chunk" value="&lt;b&gt;1. Normalized Chunk (d_i)&lt;/b&gt;&lt;br&gt;&lt;font style=&quot;font-size: 9px;&quot; color=&quot;#64748b&quot;&gt;Text / Code Segment (~500 chars)&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#94a3b8;" vertex="1" parent="p_flow">
          <mxGeometry x="30" y="45" width="200" height="50" as="geometry" />
        </mxCell>
        <mxCell id="c_hash" value="&lt;b&gt;2. Compute SHA-256 Hash&lt;/b&gt;&lt;br&gt;&lt;font style=&quot;font-size: 9px;&quot; color=&quot;#1e40af&quot;&gt;h_i = SHA256(model_tag : d_i)&lt;br&gt;T_hash &amp;lt;= 0.02 ms&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#eff6ff;strokeColor=#3b82f6;" vertex="1" parent="p_flow">
          <mxGeometry x="30" y="125" width="200" height="55" as="geometry" />
        </mxCell>
        <mxCell id="c_dec" value="&lt;b&gt;Hash in&lt;br&gt;Cache?&lt;/b&gt;&lt;br&gt;&lt;font style=&quot;font-size: 8px;&quot; color=&quot;#b45309&quot;&gt;T_lookup ~0.04 ms&lt;/font&gt;" style="rhombus;whiteSpace=wrap;html=1;fillColor=#fffbeb;strokeColor=#f59e0b;fontColor=#92400e;fontSize=10;" vertex="1" parent="p_flow">
          <mxGeometry x="70" y="210" width="120" height="60" as="geometry" />
        </mxCell>
        <mxCell id="c_hit" value="&lt;b&gt;Reuse Stored Embedding Vector&lt;/b&gt;&lt;br&gt;&lt;font style=&quot;font-size: 9px;&quot; color=&quot;#047857&quot;&gt;GPU Computation: T_embed = 0.00 ms&lt;br&gt;&lt;b&gt;38.2x to 140.3x Indexing Speedup&lt;/b&gt;&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ecfdf5;strokeColor=#10b981;" vertex="1" parent="p_flow">
          <mxGeometry x="270" y="215" width="240" height="50" as="geometry" />
        </mxCell>
        <mxCell id="c_miss" value="&lt;b&gt;Invoke Embedding Engine&lt;/b&gt;&lt;br&gt;&lt;font style=&quot;font-size: 9px;&quot; color=&quot;#b91c1c&quot;&gt;nomic-embed-text on RTX 3090&lt;br&gt;Generates 768-dim vector (11.2 ms)&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#fef2f2;strokeColor=#ef4444;" vertex="1" parent="p_flow">
          <mxGeometry x="30" y="305" width="200" height="55" as="geometry" />
        </mxCell>
        <mxCell id="c_write" value="&lt;b&gt;Write to Cache &amp;amp; Index&lt;/b&gt;&lt;br&gt;&lt;font style=&quot;font-size: 9px;&quot; color=&quot;#475569&quot;&gt;Store key h_i -&amp;gt; v_i (T_index ~ 1.2 ms)&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#64748b;" vertex="1" parent="p_flow">
          <mxGeometry x="270" y="307" width="240" height="50" as="geometry" />
        </mxCell>

        <!-- Panel Right: Attribution -->
        <mxCell id="p_stats" value="&lt;b&gt;Latency Attribution (T_KB)&lt;/b&gt;" style="swimlane;whiteSpace=wrap;html=1;startSize=25;fillColor=#f8fafc;strokeColor=#cbd5e1;fontColor=#1e293b;rounded=1;arcSize=4;" vertex="1" parent="1">
          <mxGeometry x="610" y="70" width="310" height="430" as="geometry" />
        </mxCell>
        <mxCell id="bar_base" value="&lt;b&gt;Full Re-index Baseline (Config A)&lt;/b&gt;&lt;br&gt;T_embed(all) = 502.8 ms (97.6%)&lt;br&gt;&lt;b color=&quot;#dc2626&quot;&gt;Total: 515.4 ms&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#fee2e2;strokeColor=#ef4444;fontSize=9.5;" vertex="1" parent="p_stats">
          <mxGeometry x="15" y="45" width="280" height="60" as="geometry" />
        </mxCell>
        <mxCell id="bar_prop" value="&lt;b&gt;Proposed Pipeline (Config B)&lt;/b&gt;&lt;br&gt;Embedding reuse on 96% of chunks&lt;br&gt;&lt;b color=&quot;#15803d&quot;&gt;Total: 13.5 ms (38.2x faster)&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dcfce7;strokeColor=#22c55e;fontSize=9.5;" vertex="1" parent="p_stats">
          <mxGeometry x="15" y="125" width="280" height="60" as="geometry" />
        </mxCell>
        <mxCell id="box_scale" value="&lt;b&gt;Corpus Scaling Speedup (U_100 / U_0):&lt;/b&gt;&lt;br&gt;• 10k tokens: &lt;b color=&quot;#2563eb&quot;&gt;140.3x speedup&lt;/b&gt;&lt;br&gt;• 50k tokens: &lt;b color=&quot;#2563eb&quot;&gt;120.8x speedup&lt;/b&gt;&lt;br&gt;• 100k tokens: &lt;b color=&quot;#2563eb&quot;&gt;123.3x speedup&lt;/b&gt;&lt;br&gt;• 250k tokens: &lt;b color=&quot;#2563eb&quot;&gt;131.1x speedup&lt;/b&gt;&lt;br&gt;&lt;br&gt;&lt;font color=&quot;#059669&quot;&gt;&lt;b&gt;Hashing overhead &amp;lt; 0.8% across all scales&lt;/b&gt;&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#e2e8f0;fontSize=9;align=left;spacingLeft=10;" vertex="1" parent="p_stats">
          <mxGeometry x="15" y="205" width="280" height="150" as="geometry" />
        </mxCell>

        <!-- Edges -->
        <mxCell id="e_c1" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#475569;" edge="1" parent="1" source="c_chunk" target="c_hash">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="e_c2" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#475569;" edge="1" parent="1" source="c_hash" target="c_dec">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="e_hit" value="YES (Hit)" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#059669;fontColor=#059669;fontSize=9;" edge="1" parent="1" source="c_dec" target="c_hit">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="e_miss" value="NO (Miss)" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#dc2626;fontColor=#dc2626;fontSize=9;" edge="1" parent="1" source="c_dec" target="c_miss">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="e_write" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#dc2626;" edge="1" parent="1" source="c_miss" target="c_write">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
"""

drawio_path = '/Users/engtitya/Desktop/kwiz/papers/figures/cache_decision_flow.drawio'
with open(drawio_path, 'w', encoding='utf-8') as f:
    f.write(drawio_content)

print(f"Generated {drawio_path} ({len(drawio_content)} bytes)")
