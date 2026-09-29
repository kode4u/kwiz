import os
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np

# Set publication-grade academic styling
plt.rcParams['font.family'] = 'sans-serif'
plt.rcParams['font.sans-serif'] = ['DejaVu Sans', 'Arial', 'Helvetica']
plt.rcParams['axes.edgecolor'] = '#1e293b'
plt.rcParams['axes.linewidth'] = 0.8
plt.rcParams['grid.color'] = '#e2e8f0'
plt.rcParams['grid.linestyle'] = '--'
plt.rcParams['grid.linewidth'] = 0.6

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FIGURES_DIRS = [
    os.path.join(BASE_DIR, 'papers', 'figures'),
    os.path.join(os.path.dirname(BASE_DIR), 'papers', 'figures')
]

for d in FIGURES_DIRS:
    os.makedirs(d, exist_ok=True)

def save_fig(fig, base_name):
    for d in FIGURES_DIRS:
        svg_path = os.path.join(d, f"{base_name}.svg")
        png_path = os.path.join(d, f"{base_name}.png")
        fig.savefig(svg_path, format='svg', bbox_inches='tight')
        fig.savefig(png_path, format='png', dpi=300, bbox_inches='tight')
    print(f"[OK] Generated {base_name}.svg and {base_name}.png in both figure directories")

# ==============================================================================
# FIGURE 3: Experiment 1 - Multi-Judge Pedagogical Quality & Inter-Rater Reliability
# ==============================================================================
def generate_figure3():
    fig = plt.figure(figsize=(12.5, 4.8), dpi=300)
    gs = fig.add_gridspec(1, 3, width_ratios=[1.3, 0.9, 1.4], wspace=0.30)

    # Panel A: 5-Point Likert Dimensions
    ax1 = fig.add_subplot(gs[0, 0])
    dimensions = [
        'Technical\nCorrectness\n(ICC: 0.98)',
        'Distractor\nPlausibility\n(ICC: 0.87)',
        'Pedagogical\nRelevance\n(ICC: 0.76)',
        'Code\nExecutability\n(ICC: 0.83)',
        'Context\nGroundedness\n(ICC: 0.95)'
    ]
    means = [4.24, 4.63, 4.86, 4.94, 4.11]
    stds = [1.36, 0.61, 0.37, 0.37, 0.98]
    colors = ['#1e40af', '#0284c7', '#0d9488', '#059669', '#6366f1']

    bars = ax1.bar(range(len(means)), means, yerr=stds, capsize=4, color=colors,
                   alpha=0.9, edgecolor='#0f172a', linewidth=0.8, width=0.58)
    ax1.axhline(4.0, color='#dc2626', linestyle='--', linewidth=1.2, label='Proficient Benchmark (4.0)')
    ax1.set_ylim(0, 6.2)
    ax1.set_xticks(range(len(means)))
    ax1.set_xticklabels(dimensions, fontsize=7.5)
    ax1.set_ylabel('Mean Likert Score (1–5)', fontsize=9, fontweight='bold', color='#0f172a')
    ax1.set_title('(a) Multi-Judge Rating Dimensions\n(GPT-4o, Gemini 2.5 Flash, Senior CS Faculty)', fontsize=9.5, fontweight='bold', pad=8)
    ax1.grid(axis='y', alpha=0.7)
    ax1.legend(loc='lower left', fontsize=7.5, framealpha=0.95)

    for i, bar in enumerate(bars):
        ax1.text(bar.get_x() + bar.get_width()/2.0, 2.0, f"{means[i]:.2f}",
                 ha='center', va='center', fontsize=9, fontweight='bold', color='#ffffff')

    # Panel B: Usability Classification Donut
    ax2 = fig.add_subplot(gs[0, 1])
    labels = ['Accept As-Is\n(80%)', 'Major Revision\n(9%)', 'Reject\n(11%)']
    sizes = [80, 9, 11]
    donut_colors = ['#059669', '#d97706', '#dc2626']
    explode = (0.02, 0.05, 0.05)

    wedges, texts = ax2.pie(sizes, labels=labels, colors=donut_colors, startangle=140,
                            explode=explode, textprops={'fontsize': 8, 'fontweight': 'bold', 'color': '#0f172a'},
                            wedgeprops=dict(width=0.45, edgecolor='#ffffff', linewidth=1.5))
    ax2.set_title('(b) Overall Usability\n(N = 100 Python MCQs)', fontsize=9.5, fontweight='bold', pad=8)
    ax2.text(0, 0, '80.0%\nAcceptable', ha='center', va='center', fontsize=9.5, fontweight='bold', color='#059669')

    # Panel C: Topic Breakdown
    ax3 = fig.add_subplot(gs[0, 2])
    topics = [
        'Conditionals &\nControl Flow',
        'Functions &\nScope',
        'Loops &\nIteration',
        'Data\nStructures',
        'Variables &\nTypes'
    ]
    tc_scores = [3.64, 4.68, 4.53, 4.43, 3.70]
    dp_scores = [4.31, 4.73, 4.60, 4.72, 4.67]
    pr_scores = [4.87, 4.87, 4.80, 4.81, 4.95]
    ce_scores = [4.93, 5.00, 4.82, 4.99, 4.93]

    x = np.arange(len(topics))
    width = 0.18
    ax3.bar(x - 1.5*width, tc_scores, width, label='Technical Correctness', color='#1e40af', edgecolor='#0f172a', linewidth=0.6)
    ax3.bar(x - 0.5*width, dp_scores, width, label='Distractor Plausibility', color='#0284c7', edgecolor='#0f172a', linewidth=0.6)
    ax3.bar(x + 0.5*width, pr_scores, width, label='Pedagogical Relevance', color='#0d9488', edgecolor='#0f172a', linewidth=0.6)
    ax3.bar(x + 1.5*width, ce_scores, width, label='Code Executability', color='#059669', edgecolor='#0f172a', linewidth=0.6)

    ax3.set_ylim(2.5, 5.6)
    ax3.set_xticks(x)
    ax3.set_xticklabels(topics, fontsize=7.5)
    ax3.set_ylabel('Mean Score (1–5)', fontsize=9, fontweight='bold', color='#0f172a')
    ax3.set_title('(c) Pedagogical Metrics Across Curriculum Topics', fontsize=9.5, fontweight='bold', pad=8)
    ax3.grid(axis='y', alpha=0.7)
    ax3.legend(loc='upper left', fontsize=7, framealpha=0.95, ncol=2)

    save_fig(fig, 'e1_quality_evaluation')
    plt.close(fig)

# ==============================================================================
# FIGURE 4: Experiment 2 - Pipeline Component Ablation & Latency Decomposition
# ==============================================================================
def generate_figure4():
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(11.5, 4.5), dpi=300, gridspec_kw={'width_ratios': [1.35, 1.0], 'wspace': 0.28})

    # Panel A: Latency Decomposition
    configs = [
        'Config A\n(Full Re-index)',
        'Config B\n(Proposed: INACON)',
        'Config C\n(Static Context)',
        'Config D\n(Zero-Shot)'
    ]
    t_kb = [53.7, 0.1, 0.0, 0.0]
    t_llm = [1497.3, 1462.6, 1375.7, 1419.3]
    t_valid = [0.0, 24.2, 0.0, 0.0]

    y_pos = np.arange(len(configs))
    bar_height = 0.5

    p1 = ax1.barh(y_pos, t_kb, bar_height, label='KB Indexing / Maintenance ($T_{KB}$)', color='#f59e0b', edgecolor='#0f172a', linewidth=0.7)
    p2 = ax1.barh(y_pos, t_llm, bar_height, left=t_kb, label='LLM Generation ($T_{LLM}$)', color='#2563eb', edgecolor='#0f172a', linewidth=0.7)
    left_valid = np.array(t_kb) + np.array(t_llm)
    p3 = ax1.barh(y_pos, t_valid, bar_height, left=left_valid, label='AST Validation ($T_{validation}$)', color='#10b981', edgecolor='#0f172a', linewidth=0.7)

    totals = [1551.0, 1462.7, 1375.7, 1419.3]
    for i, total in enumerate(totals):
        ax1.text(total + 25, i, f"{total:.1f} ms\n({total/1000:.2f} s)", va='center', fontsize=8, fontweight='bold', color='#1e293b')

    # Amdahl's Law annotation positioned cleanly
    ax1.annotate("Amdahl's Law Bottleneck:\nLocal LLM decoding accounts for >96.5%\nof runtime; KB caching preserves GPU\ncompute cores rather than single-item E2E.",
                 xy=(750, 1.0), xytext=(280, 2.5),
                 arrowprops=dict(arrowstyle="->", color="#0f172a", lw=1.0),
                 bbox=dict(boxstyle="round,pad=0.4", fc="#f8fafc", ec="#475569", lw=0.8),
                 fontsize=7.5, color="#0f172a")

    ax1.set_xlim(0, 1850)
    ax1.set_yticks(y_pos)
    ax1.set_yticklabels(configs, fontsize=8.5, fontweight='bold')
    ax1.invert_yaxis()
    ax1.set_xlabel('Latency Breakdown (milliseconds)', fontsize=9, fontweight='bold', color='#0f172a')
    ax1.set_title('(a) Component-Level Latency Decomposition ($T_{E2E}$)', fontsize=9.5, fontweight='bold', pad=8)
    ax1.grid(axis='x', alpha=0.7)
    ax1.legend(loc='lower left', fontsize=7.2, framealpha=0.95)

    # Panel B: Context Tokens vs Cache Hit Rate
    x_idx = np.arange(len(configs))
    ctx_tokens = [1840, 512, 1840, 0]
    cache_hits = [0.0, 96.0, 0.0, 0.0]

    color1 = '#0284c7'
    color2 = '#059669'

    ax2_twin = ax2.twinx()

    b1 = ax2.bar(x_idx - 0.18, ctx_tokens, width=0.35, color=color1, edgecolor='#0f172a', linewidth=0.7, label='Context Budget (Tokens)')
    b2 = ax2_twin.bar(x_idx + 0.18, cache_hits, width=0.35, color=color2, edgecolor='#0f172a', linewidth=0.7, label='Cache Hit Rate (%)')

    ax2.set_ylabel('Mean Prompt Context (Tokens)', fontsize=9, fontweight='bold', color=color1)
    ax2_twin.set_ylabel('SHA-256 Embedding Cache Hit Rate (%)', fontsize=9, fontweight='bold', color=color2)
    ax2.set_xticks(x_idx)
    ax2.set_xticklabels(['Config A\nBaseline', 'Config B\nProposed', 'Config C\nStatic', 'Config D\nZero-Shot'], fontsize=8)
    ax2.set_ylim(0, 2400)
    ax2_twin.set_ylim(0, 115)
    ax2.set_title('(b) Context Budgeting & Embedding Reuse', fontsize=9.5, fontweight='bold', pad=8)
    ax2.grid(axis='y', alpha=0.5)

    # Value callouts
    ax2.text(1 - 0.18, 512 + 60, '512 tok\n(-72%)', ha='center', va='bottom', fontsize=7.5, fontweight='bold', color=color1)
    ax2_twin.text(1 + 0.18, 96.0 + 3, '96.0%', ha='center', va='bottom', fontsize=7.5, fontweight='bold', color=color2)

    save_fig(fig, 'e2_pipeline_ablation')
    plt.close(fig)

# ==============================================================================
# FIGURE 5: Experiment 3 - Knowledge Base Indexing Scalability & Cache Acceleration
# ==============================================================================
def generate_figure5():
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(11.5, 4.5), dpi=300, gridspec_kw={'width_ratios': [1.25, 0.95], 'wspace': 0.28})

    scales = ['1 Module\n(20 chunks)', '3 Modules\n(53 chunks)', '5 Modules\n(71 chunks)', '7 Modules\n(90 chunks)']

    u0 = [0.09, 0.05, 0.28, 0.07]
    u10 = [53.7, 112.6, 178.7, 208.4]
    u25 = [135.2, 264.9, 415.5, 475.9]
    u50 = [217.6, 701.3, 862.5, 1060.0]
    u100 = [442.9, 1393.7, 1868.5, 2590.6]
    speedups = [4921.1, 27874.4, 6673.3, 37008.4]

    # Panel A: Latency curves (Logarithmic)
    x = np.arange(len(scales))
    ax1.plot(x, u100, marker='s', markersize=6, linewidth=1.8, color='#dc2626', label='$U_{100}$: Cold Rebuild (100% change)')
    ax1.plot(x, u50, marker='^', markersize=6, linewidth=1.5, color='#ea580c', label='$U_{50}$: 50% Revision')
    ax1.plot(x, u25, marker='d', markersize=6, linewidth=1.5, color='#d97706', label='$U_{25}$: 25% Update')
    ax1.plot(x, u10, marker='v', markersize=6, linewidth=1.5, color='#0284c7', label='$U_{10}$: 10% Update')
    ax1.plot(x, u0, marker='o', markersize=7, linewidth=2.0, color='#059669', label='$U_0$: Steady State (0% change / SHA-256 Hit)')

    ax1.set_yscale('log')
    ax1.set_xticks(x)
    ax1.set_xticklabels(scales, fontsize=8)
    ax1.set_xlabel('Curriculum Progression Scope', fontsize=9, fontweight='bold', color='#0f172a')
    ax1.set_ylabel('KB Indexing Latency $T_{KB}$ (ms, Log Scale)', fontsize=9, fontweight='bold', color='#0f172a')
    ax1.set_title('(a) Indexing Latency Under Incremental Syllabus Updates', fontsize=9.5, fontweight='bold', pad=8)
    ax1.grid(True, which="both", ls="--", alpha=0.5)
    ax1.legend(loc='center left', fontsize=7.5, framealpha=0.95)

    ax1.annotate('Sub-millisecond steady-state:\n$T_{KB} \\leq 0.28$ ms via SHA-256 reuse',
                 xy=(3, 0.07), xytext=(1.8, 0.4),
                 arrowprops=dict(arrowstyle="->", color="#059669", lw=1.2),
                 bbox=dict(boxstyle="round,pad=0.3", fc="#ecfdf5", ec="#059669", lw=0.8),
                 fontsize=7.5, fontweight='bold', color="#065f46")

    # Panel B: Speedup Factor
    bars = ax2.bar(x, speedups, width=0.55, color='#1e40af', edgecolor='#0f172a', linewidth=0.7)
    ax2.set_yscale('log')
    ax2.set_xticks(x)
    ax2.set_xticklabels(['1 Mod\n(~2.7k tok)', '3 Mods\n(~7.1k tok)', '5 Mods\n(~9.6k tok)', '7 Mods\n(~12.1k tok)'], fontsize=8)
    ax2.set_ylabel('Indexing Acceleration Factor ($U_{100} / U_0$)', fontsize=9, fontweight='bold', color='#0f172a')
    ax2.set_title('(b) Acceleration vs. Cold Index Rebuild', fontsize=9.5, fontweight='bold', pad=8)
    ax2.grid(True, which="both", ls="--", alpha=0.5)

    for i, bar in enumerate(bars):
        yval = bar.get_height()
        ax2.text(bar.get_x() + bar.get_width()/2.0, yval * 1.15, f"{speedups[i]:,.1f}×",
                 ha='center', va='bottom', fontsize=7.5, fontweight='bold', color='#1e293b')
    ax2.set_ylim(1000, 95000)

    save_fig(fig, 'e3_indexing_scalability')
    plt.close(fig)

# ==============================================================================
# FIGURE 6: Experiment 4 - Single-GPU Concurrency Operating Envelope
# ==============================================================================
def generate_figure6():
    fig = plt.figure(figsize=(12.5, 4.5), dpi=300)
    gs = fig.add_gridspec(1, 3, width_ratios=[1.05, 1.15, 0.95], wspace=0.32)

    concurrency = [1, 2, 5, 10, 20]
    c_labels = ['C=1', 'C=2', 'C=5', 'C=10', 'C=20']
    throughput_qmin = [43.8, 48.0, 49.2, 45.0, 45.6]
    throughput_qs = [0.73, 0.80, 0.82, 0.75, 0.76]
    p50_lat = [1.36, 1.88, 3.56, 6.76, 13.95]
    p95_lat = [1.36, 2.43, 5.91, 12.75, 25.00]
    gpu_util = [90.0, 72.0, 85.8, 81.0, 88.3]
    vram_peak = [13.44, 13.44, 13.44, 13.44, 13.44]

    x = np.arange(len(concurrency))

    # Panel A: Throughput (Clean, single-axis)
    ax1 = fig.add_subplot(gs[0, 0])
    ax1.plot(x, throughput_qmin, marker='o', color='#0284c7', linewidth=2.0, markersize=7)
    ax1.set_xticks(x)
    ax1.set_xticklabels(c_labels, fontsize=8.5)
    ax1.set_ylabel('Aggregate Throughput (Questions / min)', fontsize=9, fontweight='bold', color='#0284c7')
    ax1.set_ylim(38, 54)
    ax1.set_title('(a) MCQ Generation Throughput\n(N=5 Questions/Request Batches)', fontsize=9.5, fontweight='bold', pad=8)
    ax1.grid(axis='y', alpha=0.7)

    for i in range(len(x)):
        ax1.text(x[i], throughput_qmin[i] + 0.7, f"{throughput_qmin[i]:.1f} Q/m\n({throughput_qs[i]:.2f} Q/s)",
                 ha='center', va='bottom', fontsize=7.2, fontweight='bold', color='#0f172a')

    # Panel B: Latency Scaling (P50 vs P95)
    ax2 = fig.add_subplot(gs[0, 1])
    ax2.plot(x, p50_lat, marker='o', color='#059669', linewidth=2.0, markersize=6, label='Median Latency (P50)')
    ax2.plot(x, p95_lat, marker='^', color='#dc2626', linewidth=2.0, markersize=6, label='Tail Latency (P95)')
    ax2.axvspan(-0.5, 2.3, color='#f0fdf4', alpha=0.6, label='Interactive Zone (C <= 5)')
    ax2.axvspan(2.3, 4.5, color='#fff7ed', alpha=0.6, label='Queued Batch Zone (C >= 10)')

    ax2.set_xticks(x)
    ax2.set_xticklabels(c_labels, fontsize=8.5)
    ax2.set_ylabel('Turnaround Latency (seconds)', fontsize=9, fontweight='bold', color='#0f172a')
    ax2.set_ylim(-1.0, 28)
    ax2.set_title('(b) Latency Scaling & Operating Envelope', fontsize=9.5, fontweight='bold', pad=8)
    ax2.grid(axis='y', alpha=0.7)
    ax2.legend(loc='upper left', fontsize=7, framealpha=0.95)

    for i in range(len(x)):
        if abs(p95_lat[i] - p50_lat[i]) < 0.1:
            ax2.text(x[i], p95_lat[i] + 0.9, f"{p50_lat[i]:.2f}s\n(P50=P95)", ha='center', va='bottom', fontsize=6.8, color='#0f172a', fontweight='bold')
        else:
            ax2.text(x[i], p95_lat[i] + 0.8, f"{p95_lat[i]:.1f}s", ha='center', va='bottom', fontsize=7, color='#dc2626', fontweight='bold')
            ax2.text(x[i], p50_lat[i] - 1.3, f"{p50_lat[i]:.1f}s", ha='center', va='top', fontsize=7, color='#059669', fontweight='bold')

    # Panel C: Hardware Resource Footprint
    ax3 = fig.add_subplot(gs[0, 2])
    width = 0.35
    ax3.bar(x - width/2, gpu_util, width=width, color='#3b82f6', edgecolor='#0f172a', linewidth=0.7, label='GPU Compute Util (%)')
    ax3.set_ylabel('Mean GPU Compute Util (%)', fontsize=9, fontweight='bold', color='#3b82f6')
    ax3.set_ylim(0, 105)
    ax3.set_xticks(x)
    ax3.set_xticklabels(c_labels, fontsize=8)

    ax3_twin = ax3.twinx()
    ax3_twin.plot(x, vram_peak, marker='s', color='#7c3aed', linewidth=2.0, markersize=6, label='Peak VRAM (GB)')
    ax3_twin.axhline(24.0, color='#dc2626', linestyle='--', linewidth=1.0, label='Physical VRAM Ceiling (24 GB)')
    ax3_twin.set_ylabel('Peak VRAM Allocation (GB)', fontsize=9, fontweight='bold', color='#7c3aed')
    ax3_twin.set_ylim(0, 26)

    ax3.set_title('(c) GPU Compute & Memory Headroom', fontsize=9.5, fontweight='bold', pad=8)
    ax3.grid(axis='y', alpha=0.5)

    # Combined legend
    lines1, labels1 = ax3.get_legend_handles_labels()
    lines2, labels2 = ax3_twin.get_legend_handles_labels()
    ax3.legend(lines1 + lines2, labels1 + labels2, loc='lower center', fontsize=6.8, framealpha=0.95)

    save_fig(fig, 'e4_concurrency_envelope')
    plt.close(fig)

if __name__ == '__main__':
    print("Generating refined academic publication graphs...")
    generate_figure3()
    generate_figure4()
    generate_figure5()
    generate_figure6()
    print("All figures successfully created!")
