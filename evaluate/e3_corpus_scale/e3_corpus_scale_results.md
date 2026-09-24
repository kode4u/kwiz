# Experiment 3 (E3): Curriculum Progression Scaling & Incremental Indexing Performance

Empirically measured Knowledge Base Indexing latency ($T_{KB}$) across curriculum progression stages and update ratios grounded in 100% authentic course materials.

### Table 3: Knowledge Base Indexing Latency ($T_{KB}$) Under Incremental Updates (Authentic Data)

| Curriculum Scope | Total Chunks | $U_0$ (0% Change) | $U_{10}$ (10% Update) | $U_{25}$ (25% Update) | $U_{50}$ (50% Revision) | $U_{100}$ (Cold Rebuild) | Speedup ($U_{100} / U_0$) |
|:-----------------|:------------:|:-----------------:|:---------------------:|:---------------------:|:-----------------------:|:-------------------------:|:-------------------------:|
| **1 Module (~2.7k tok)** | 20 | 0.08 ms | 46.9 ms | 104.8 ms | 228.4 ms | 454.2 ms | **5677.0×** |
| **3 Modules (~7.1k tok)** | 53 | 0.11 ms | 100.9 ms | 271.4 ms | 557.4 ms | 1435.3 ms | **13048.3×** |
| **5 Modules (~9.6k tok)** | 71 | 0.10 ms | 144.2 ms | 446.4 ms | 872.8 ms | 1944.5 ms | **19445.2×** |
| **7 Modules (~12.1k tok)** | 90 | 0.18 ms | 240.6 ms | 587.5 ms | 1079.7 ms | 2244.0 ms | **12466.6×** |

> **Empirical Finding**: Physical measurements confirm that steady-state course re-indexing ($U_0$) bypasses GPU embedding forward passes entirely via SHA-256 hash matching, converting an $O(N)$ dense tensor computation into a sub-millisecond CPU memory lookup across all curriculum progression stages.
