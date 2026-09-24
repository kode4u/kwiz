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

- **Batch Request Configuration**: In this experiment, each concurrent client request generates a standardized batch of 5 multiple-choice questions (MCQs) complete with code snippet, distractor rationales, and explanation (totaling 5 to 100 MCQs per test tier).
- **Throughput Saturation (0.80 to 0.83 Q/s / ~49 Q/min)**: Autoregressive decoding of the 7B parameter model (`Qwen2.5-Coder-7B`) on a single NVIDIA RTX 3090 is memory-bandwidth bound, generating ~1 complete question every ~1.22s to 1.25s. Consequently, aggregate system throughput stabilizes at ~0.80–0.83 Q/s (48.0–49.8 questions/min) across all concurrency tiers.
- **Interactive Operating Range ($C = 1$ to $5$)**: For single instructors ($C=1$), a 5-question quiz is generated in 6.28s. At $C=5$ (25 questions total across 5 simultaneous instructors), median batch latency is 25.51s (P95 = 29.74s) with GPU compute utilization reaching 98.0% and peak VRAM at 11.2 GB.
- **High Concurrency Serialization ($C = 10$ to $20$)**: At $C=10$ (50 questions) and $C=20$ (100 questions), the single-GPU compute engine reaches 100% saturation. Batch requests serialize through the local inference queue, resulting in median response times of 50.63s ($C=10$) and 97.68s ($C=20$, P95 = 119.26s).
- **Fault-Tolerance & Memory Safety**: Across all concurrency tiers, the pipeline achieved a 100.0% execution success rate with 0 dropped requests, 0 schema failures, and peak VRAM peaking at 15.6 GB (well within the 24 GB hardware ceiling). For institutions with higher simultaneous demand, deploying multiple inference workers or streaming question generation into the UI is recommended.
