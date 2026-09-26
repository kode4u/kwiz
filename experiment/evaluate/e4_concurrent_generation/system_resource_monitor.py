#!/usr/bin/env python3
"""
Experiment 4 (E4): System Resource Monitor (Physical Sampler).
Continuous background sampler tracking:
- CPU utilization (%) via psutil
- Host Memory (RAM) utilization (Used GB, Total GB, %)
- GPU compute utilization (%) via nvidia-smi
- GPU VRAM utilization (Allocated MB, Reserved MB, Total MB) via nvidia-smi
Writes time-series records to system_resources.csv and computes real interval statistics.
"""

import os
import sys
import time
import csv
import argparse
import subprocess
import threading
try:
    import psutil
except ImportError:
    psutil = None

class SystemResourceMonitor:
    def __init__(self, output_csv: str = "system_resources.csv", interval_sec: float = 1.0):
        self.output_csv = output_csv
        self.interval_sec = interval_sec
        self.stop_event = threading.Event()
        self.thread = None
        self.samples = []
        self.lock = threading.Lock()

    def _sample_gpu(self) -> dict:
        gpu_info = {
            "gpu_util_percent": 0.0,
            "vram_used_mb": 0.0,
            "vram_total_mb": 0.0
        }
        try:
            cmd = ["nvidia-smi", "--query-gpu=utilization.gpu,memory.used,memory.total", "--format=csv,noheader,nounits"]
            out = subprocess.check_output(cmd, stderr=subprocess.DEVNULL, timeout=2).decode("utf-8").strip()
            if out:
                line = out.split("\n")[0]
                parts = [p.strip() for p in line.split(",")]
                if len(parts) >= 3:
                    gpu_info["gpu_util_percent"] = float(parts[0])
                    gpu_info["vram_used_mb"] = float(parts[1])
                    gpu_info["vram_total_mb"] = float(parts[2])
        except Exception:
            # Non-NVIDIA host or driver unavailable
            gpu_info["gpu_util_percent"] = 0.0
            gpu_info["vram_used_mb"] = 0.0
            gpu_info["vram_total_mb"] = 0.0
        return gpu_info

    def _monitor_loop(self):
        fieldnames = [
            "unix_time",
            "timestamp",
            "cpu_percent",
            "ram_used_gb",
            "ram_total_gb",
            "ram_percent",
            "gpu_util_percent",
            "vram_used_mb",
            "vram_total_mb"
        ]

        with open(self.output_csv, "w", newline="", encoding="utf-8") as f:
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writeheader()

            while not self.stop_event.is_set():
                now_epoch = time.time()
                now_str = time.strftime("%Y-%m-%d %H:%M:%S")

                if psutil is not None:
                    cpu_p = psutil.cpu_percent(interval=None)
                    mem = psutil.virtual_memory()
                    ram_used = round(mem.used / (1024**3), 2)
                    ram_total = round(mem.total / (1024**3), 2)
                    ram_perc = mem.percent
                else:
                    cpu_p = 0.0
                    ram_used = 0.0
                    ram_total = 0.0
                    ram_perc = 0.0

                gpu = self._sample_gpu()

                row = {
                    "unix_time": now_epoch,
                    "timestamp": now_str,
                    "cpu_percent": cpu_p,
                    "ram_used_gb": ram_used,
                    "ram_total_gb": ram_total,
                    "ram_percent": ram_perc,
                    "gpu_util_percent": gpu["gpu_util_percent"],
                    "vram_used_mb": gpu["vram_used_mb"],
                    "vram_total_mb": gpu["vram_total_mb"]
                }

                with self.lock:
                    self.samples.append(row)

                writer.writerow(row)
                f.flush()
                time.sleep(self.interval_sec)

    def get_interval_metrics(self, t_start_epoch: float, t_end_epoch: float) -> dict:
        with self.lock:
            interval_rows = [
                s for s in self.samples
                if t_start_epoch <= s["unix_time"] <= t_end_epoch
            ]

        if not interval_rows:
            return {
                "gpu_util_avg": 0.0,
                "vram_used_peak_gb": 0.0,
                "cpu_util_avg": 0.0,
                "ram_used_avg_gb": 0.0,
                "samples_count": 0
            }

        gpu_utils = [r["gpu_util_percent"] for r in interval_rows]
        vram_mbs = [r["vram_used_mb"] for r in interval_rows]
        cpu_utils = [r["cpu_percent"] for r in interval_rows]
        ram_gbs = [r["ram_used_gb"] for r in interval_rows]

        return {
            "gpu_util_avg": round(sum(gpu_utils) / len(gpu_utils), 1),
            "vram_used_peak_gb": round(max(vram_mbs) / 1024.0, 2),
            "cpu_util_avg": round(sum(cpu_utils) / len(cpu_utils), 1),
            "ram_used_avg_gb": round(sum(ram_gbs) / len(ram_gbs), 2),
            "samples_count": len(interval_rows)
        }

    def start(self):
        self.stop_event.clear()
        self.thread = threading.Thread(target=self._monitor_loop, daemon=True)
        self.thread.start()
        print(f"[ResourceMonitor] Started physical sampling every {self.interval_sec}s -> {self.output_csv}")

    def stop(self):
        if self.thread and self.thread.is_alive():
            self.stop_event.set()
            self.thread.join(timeout=3)
            print(f"[ResourceMonitor] Stopped sampling ({len(self.samples)} physical samples recorded).")

def main():
    parser = argparse.ArgumentParser(description="Run System Resource Monitor Standalone")
    parser.add_argument("--output", default="system_resources.csv", help="Output CSV path")
    parser.add_argument("--interval", type=float, default=1.0, help="Sampling interval in seconds")
    parser.add_argument("--duration", type=int, default=60, help="Monitoring duration in seconds (default: 60)")
    args = parser.parse_args()

    monitor = SystemResourceMonitor(args.output, args.interval)
    monitor.start()
    try:
        time.sleep(args.duration)
    except KeyboardInterrupt:
        pass
    finally:
        monitor.stop()

if __name__ == "__main__":
    main()
