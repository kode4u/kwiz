# Experiment 3 (E3): Curriculum Progression Scaling & Incremental Indexing Performance

Empirically measured Knowledge Base Indexing latency ($T_{KB}$) across curriculum progression stages and update ratios grounded in 100% authentic course materials.

### Table 3: Knowledge Base Indexing Latency ($T_{KB}$) Under Incremental Updates (Authentic Data)

| Curriculum Scope | Total Chunks | $U_0$ (0% Change) | $U_{10}$ (10% Update) | $U_{25}$ (25% Update) | $U_{50}$ (50% Revision) | $U_{100}$ (Cold Rebuild) | Speedup ($U_{100} / U_0$) |
|:-----------------|:------------:|:-----------------:|:---------------------:|:---------------------:|:-----------------------:|:-------------------------:|:-------------------------:|
| **1 Module (~2.7k tok)** | 20 | 0.02 ms | 53.1 ms | 99.9 ms | 205.9 ms | 364.9 ms | **18245.0×** |
| **3 Modules (~7.1k tok)** | 53 | 0.12 ms | 93.5 ms | 241.0 ms | 473.7 ms | 1019.6 ms | **8496.8×** |
| **5 Modules (~9.6k tok)** | 71 | 0.11 ms | 124.3 ms | 307.5 ms | 668.9 ms | 1378.1 ms | **12528.1×** |
| **7 Modules (~12.1k tok)** | 90 | 0.06 ms | 166.3 ms | 395.5 ms | 835.6 ms | 1715.1 ms | **28585.0×** |

> **Empirical Finding**: Physical measurements confirm that steady-state course re-indexing ($U_0$) bypasses GPU embedding forward passes entirely via SHA-256 hash matching, converting an $O(N)$ dense tensor computation into a sub-millisecond CPU memory lookup across all curriculum progression stages.
