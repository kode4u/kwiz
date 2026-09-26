# Experiment 3 (E3): Curriculum Progression Scaling & Incremental Indexing Performance

Empirically measured Knowledge Base Indexing latency ($T_{KB}$) across curriculum progression stages and update ratios grounded in 100% authentic course materials.

### Table 3: Knowledge Base Indexing Latency ($T_{KB}$) Under Incremental Updates (Authentic Data)

| Curriculum Scope | Total Chunks | $U_0$ (0% Change) | $U_{10}$ (10% Update) | $U_{25}$ (25% Update) | $U_{50}$ (50% Revision) | $U_{100}$ (Cold Rebuild) | Speedup ($U_{100} / U_0$) |
|:-----------------|:------------:|:-----------------:|:---------------------:|:---------------------:|:-----------------------:|:-------------------------:|:-------------------------:|
| **1 Module (~2.7k tok)** | 20 | 0.09 ms | 53.7 ms | 135.2 ms | 217.6 ms | 442.9 ms | **4921.1×** |
| **3 Modules (~7.1k tok)** | 53 | 0.05 ms | 112.6 ms | 264.9 ms | 701.3 ms | 1393.7 ms | **27874.4×** |
| **5 Modules (~9.6k tok)** | 71 | 0.28 ms | 178.7 ms | 415.5 ms | 862.5 ms | 1868.5 ms | **6673.3×** |
| **7 Modules (~12.1k tok)** | 90 | 0.07 ms | 208.4 ms | 475.9 ms | 1060.0 ms | 2590.6 ms | **37008.4×** |

> **Empirical Finding**: Physical measurements confirm that steady-state course re-indexing ($U_0$) bypasses GPU embedding forward passes entirely via SHA-256 hash matching, converting an $O(N)$ dense tensor computation into a sub-millisecond CPU memory lookup across all curriculum progression stages.
