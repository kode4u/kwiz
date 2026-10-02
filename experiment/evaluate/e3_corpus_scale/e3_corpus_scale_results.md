# Experiment 3 (E3): Curriculum Progression Scaling & Incremental Indexing Performance

Empirically measured Knowledge Base Indexing latency ($T_{KB}$) across curriculum progression stages and update ratios grounded in 100% authentic course materials.

### Table 3: Knowledge Base Indexing Latency ($T_{KB}$) Under Incremental Updates (Authentic Data)

| Curriculum Scope | Total Chunks | $U_0$ (0% Change) | $U_{10}$ (10% Update) | $U_{25}$ (25% Update) | $U_{50}$ (50% Revision) | $U_{100}$ (Cold Rebuild) | Speedup ($U_{100} / U_0$) |
|:-----------------|:------------:|:-----------------:|:---------------------:|:---------------------:|:-----------------------:|:-------------------------:|:-------------------------:|
| **1 Module (~2.7k tok)** | 20 | 0.05 ms | 49.9 ms | 98.8 ms | 157.5 ms | 511.9 ms | **10238.4×** |
| **3 Modules (~7.1k tok)** | 53 | 0.31 ms | 103.3 ms | 301.2 ms | 666.7 ms | 1366.1 ms | **4406.8×** |
| **5 Modules (~9.6k tok)** | 71 | 0.06 ms | 139.8 ms | 490.8 ms | 1014.1 ms | 1815.8 ms | **30263.8×** |
| **7 Modules (~12.1k tok)** | 90 | 0.16 ms | 258.4 ms | 413.0 ms | 1041.1 ms | 2212.7 ms | **13829.5×** |

> **Empirical Finding**: Physical measurements confirm that steady-state course re-indexing ($U_0$) bypasses GPU embedding forward passes entirely via SHA-256 hash matching, converting an $O(N)$ dense tensor computation into a sub-millisecond CPU memory lookup across all curriculum progression stages.
