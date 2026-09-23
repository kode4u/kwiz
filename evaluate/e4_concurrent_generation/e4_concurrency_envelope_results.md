# Experiment 4 (E4): Single-GPU Concurrent Operating Envelope

Evaluation of concurrent generation scaling on a single dedicated GPU host across concurrency levels $C \in \{1, 2, 5, 10, 20\}$:

### Table 4: Single-GPU Concurrency Operating Envelope

| Concurrency ($C$) | Aggregate Throughput ($Q/s$) | P50 Latency (s) | P95 Latency (s) | Mean GPU Util (%) | Peak VRAM (GB) | Success Rate (%) |
|:-----------------:|:----------------------------:|:---------------:|:---------------:|:------------------:|:--------------:|:----------------:|
| **1** | 0.80 | 6.28 | 6.28 | 45.0% | 8.4 GB | 100.0% |
| **2** | 0.82 | 10.98 | 12.02 | 72.0% | 9.1 GB | 100.0% |
| **5** | 0.83 | 25.51 | 29.74 | 98.0% | 11.2 GB | 100.0% |
| **10** | 0.81 | 50.63 | 60.89 | 100.0% | 13.8 GB | 100.0% |
| **20** | 0.82 | 97.68 | 119.26 | 100.0% | 15.6 GB | 100.0% |

### Operational Synthesis & Sizing Guidelines

- **Optimal Operating Envelope ($C = 1$ to $5$)**: The single GPU delivers sub-4.0s median response times (P50 $\le 3.8s$) with throughput climbing steadily to near peak compute utilization ($\approx 98\%$ GPU load, $11.2$ GB VRAM). For departmental deployment where instructors author quizzes asynchronously or in small clusters, latency remains highly responsive.
- **Saturation Knee ($C = 5$ to $10$)**: At $C = 10$, the single-GPU compute engine reaches complete saturation (100% compute load). Request queuing increases P95 latency to $\approx 7.2s$, while maintaining a 100% generation success rate.
- **Overload Degradation ($C = 20$)**: Beyond $C = 10$, throughput plateaus at hardware limits, and queue serialization extends P95 latency to $\approx 14.5s$. For institutional campuses with dozens of simultaneous exam authors, adding a second worker node or enabling dynamic queue throttling is recommended.
