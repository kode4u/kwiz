# Experiment 4 (E4): Single-GPU Concurrent Operating Envelope

Evaluation of concurrent generation scaling on a single dedicated GPU host across concurrency levels $C \in \{1, 2, 5, 10, 20\}$:

### Table 4: Single-GPU Concurrency Operating Envelope

| Concurrency ($C$) | Aggregate Throughput ($Q/s$) | P50 Latency (s) | P95 Latency (s) | Mean GPU Util (%) | Peak VRAM (GB) | Success Rate (%) |
|:-----------------:|:----------------------------:|:---------------:|:---------------:|:------------------:|:--------------:|:----------------:|
| **1** | 0.73 | 1.36 | 1.36 | 90.0% | 13.4 GB | 100.0% |
| **2** | 0.80 | 1.88 | 2.43 | 72.0% | 13.4 GB | 100.0% |
| **5** | 0.82 | 3.56 | 5.91 | 85.8% | 13.4 GB | 100.0% |
| **10** | 0.75 | 6.76 | 12.75 | 81.0% | 13.4 GB | 100.0% |
| **20** | 0.76 | 13.95 | 25.00 | 88.3% | 13.4 GB | 100.0% |

### Operational Synthesis & Sizing Guidelines

- **Optimal Operating Envelope ($C = 1$ to $5$)**: The single GPU delivers sub-3.6s median response times (P50 = 1.36s to 3.56s, P95 $\le 5.91$s) with aggregate throughput stabilizing between 0.73 and 0.82 Q/s (43.8 to 49.2 Q/min) and peak VRAM safely contained at 13.44 GB (56.0% of the 24 GB hardware ceiling). For departmental deployments where instructors author quizzes interactively, latency remains highly responsive.
- **Saturation Knee ($C = 5$ to $10$)**: At $C = 10$, the single-GPU compute engine reaches sustained GPU compute saturation (81.0% utilization). Sequential request queuing through Ollama extends median latency to 6.76s (P95 = 12.75s), while maintaining a 100.0% generation success rate with zero unhandled exceptions.
- **Overload Operating Point ($C = 20$)**: Under heavy concurrent saturation ($C = 20$), throughput remains stable at 0.76 Q/s (45.6 Q/min), with queue serialization extending median latency to 13.95s (P95 = 25.00s) and peak VRAM held safely at 13.44 GB. For institutions supporting dozens of simultaneous exam authors, adding a secondary inference worker node or providing streaming token previews in the LMS UI offers an effective scaling path.
