# Evaluation: SQL analytics for generation logs

## Purpose

Analyze Moodle plugin generation logs from `mdl_gamifiedquiz_generation_logs` for:

- LLM generation latency (`duration_ms`)
- Throughput (`questions_per_sec`)
- Success/error rate
- Model/backend comparison (Qwen, DeepSeek, etc.)

This module is for **paper/poster reporting** from production-like deployments.

## Data source

The table is populated by the Moodle endpoint:

- `mod/gamifiedquiz/ajax/generate.php`

Log schema was added in plugin version `2025010116`:

- `mod/gamifiedquiz/db/install.xml`
- `mod/gamifiedquiz/db/upgrade.php`

## Prerequisites

1. Upgrade Moodle plugin so `gamifiedquiz_generation_logs` exists.
2. Run real generation requests from teacher UI (or API usage through the plugin).
3. Confirm rows are being inserted in DB table.

## Where to run queries

Use either:

- phpMyAdmin (already in stack, usually `http://localhost:8081`)
- MySQL CLI inside your DB container
- Any SQL client connected to Moodle DB

## Files

- `generation_analysis.sql`: ready-to-run query pack
- `paper_tables_template.md`: copy/paste publication table templates
- `export_generation_csv.sh`: export key metrics directly to CSV files
- `plot_generation_charts.py`: build PNG charts from exported CSV files
- `run_all_sql_analysis.sh`: one-command pipeline (export CSV + generate charts)

## Important note: table prefix

Queries use `mdl_` prefix by default:

- `mdl_gamifiedquiz_generation_logs`

If your Moodle DB prefix differs, replace `mdl_` in the SQL file.

## Quick CSV export (recommended for poster workflow)

From repository root:

```bash
chmod +x evaluate/sql/export_generation_csv.sh
./evaluate/sql/export_generation_csv.sh
```

Default output:

- `evaluate/sql/exports/<timestamp>/latest_runs.csv`
- `evaluate/sql/exports/<timestamp>/overall_summary.csv`
- `evaluate/sql/exports/<timestamp>/status_breakdown.csv`
- `evaluate/sql/exports/<timestamp>/by_model_summary.csv`
- `evaluate/sql/exports/<timestamp>/daily_trend.csv`
- `evaluate/sql/exports/<timestamp>/recent_errors.csv`

### Custom options

```bash
./evaluate/sql/export_generation_csv.sh \
  --prefix mdl_ \
  --out-dir evaluate/sql/exports/manual_run_01 \
  --mysql-cmd "docker compose exec -T db mysql -umoodle -pmoodlepass moodle"
```

If not provided, the script auto-tries:

1. Docker command: `docker compose exec -T db mysql ...`
2. Local client: `mysql -h 127.0.0.1 -P 3307 ...`

## Generate poster charts (PNG)

After CSV export:

```bash
python3 evaluate/sql/plot_generation_charts.py
```

Default behavior:

- Uses latest export folder under `evaluate/sql/exports/`
- Writes charts to `<latest-export>/charts/`

Generated PNG files:

- `latency_mean_ms_by_model.png`
- `qps_mean_by_model.png`
- `error_rate_by_model.png`
- `daily_latency_trend.png`

Custom input/output:

```bash
python3 evaluate/sql/plot_generation_charts.py \
  --input-dir evaluate/sql/exports/manual_run_01 \
  --output-dir evaluate/sql/exports/manual_run_01/charts
```

If matplotlib is missing:

```bash
pip install matplotlib
```

## One-command full pipeline

Run export + charts together:

```bash
chmod +x evaluate/sql/run_all_sql_analysis.sh
./evaluate/sql/run_all_sql_analysis.sh
```

With custom DB command and output folder:

```bash
./evaluate/sql/run_all_sql_analysis.sh \
  --out-dir evaluate/sql/exports/paper_run_01 \
  --prefix mdl_ \
  --mysql-cmd "docker compose exec -T db mysql -umoodle -pmoodlepass moodle"
```

## Connect with expert quality module

After generating `by_model_summary.csv`, you can merge with expert ratings:

```bash
python3 evaluate/quality-expert/merge_speed_quality.py \
  --quality-json evaluate/quality-expert/en_quality_summary.json \
  --perf-csv evaluate/sql/exports/<run>/by_model_summary.csv \
  --out-csv evaluate/quality-expert/en_speed_quality_table.csv
```

## Fixed-resource experiment runs (Docker)

To keep experiments reproducible, run the stack with capped CPU/RAM:

1. Set limits in `docker/.env` using `EXP_*` variables (see `docker/env.template`).
2. Start with override file:

```bash
docker compose -f docker-compose.yml -f docker-compose.experiment.yml up -d
```

Check applied limits:

```bash
docker inspect jica-llmapi --format '{{json .HostConfig.NanoCpus}} {{.HostConfig.Memory}}'
docker stats --no-stream
```

Recommended practice:

- Keep the same `EXP_*` values across all model runs.
- Record `docker/.env` (or a redacted experiment profile) in your appendix.

## Migrating new generation log table

The table `gamifiedquiz_generation_logs` is created by plugin upgrade version `2025010116`.

### Option A: Moodle UI

1. Open **Site administration -> Notifications**.
2. Run pending plugin upgrades.
3. Confirm `mod_gamifiedquiz` upgrade completes.

### Option B: Moodle CLI (inside container)

```bash
docker compose exec moodle php admin/cli/upgrade.php --non-interactive
```

Validate table exists:

```bash
docker compose exec -T db mysql -umoodle -pmoodlepass moodle -e "SHOW TABLES LIKE 'mdl_gamifiedquiz_generation_logs';"
```

If your Moodle DB prefix is not `mdl_`, replace the table prefix in SQL checks and analytics queries.

## Query sections (in `generation_analysis.sql`)

1. **Sanity check (latest runs)**  
   Verify logs are captured correctly.

2. **Overall summary (successful runs)**  
   Mean/min/max latency and mean throughput.

3. **Success/failure rate**  
   Report system reliability.

4. **By backend + model**  
   Main comparison table for paper (recommended).

5. **Percentiles (p50/p95/p99)**  
   Uses `PERCENTILE_CONT` (MySQL 8+).

6. **Approximate p95 fallback**  
   Use if percentile function is unavailable.

7. **Daily trend**  
   Good for poster time-series chart.

8. **Failure detail**  
   Error analysis and qualitative troubleshooting.

## Suggested reporting for paper/poster

For each model/backend pair (e.g., Qwen, DeepSeek):

- `runs_total`, `runs_success`
- `error_rate_pct`
- `mean_duration_ms_success`
- `p50_ms`, `p95_ms`, `p99_ms`
- `mean_qps_success`

Convert milliseconds to seconds in figures/tables when needed:

- `seconds = duration_ms / 1000`

## Recommended reproducibility protocol

For fair model comparison:

1. Fix server spec and software versions.
2. Fix quiz generation settings:
   - same topic set
   - same language
   - same requested question count
3. Run each model with same number of requests.
4. Separate warmup runs from measured runs.
5. Report both central tendency (mean/p50) and tail latency (p95/p99).

## Example paper wording

"We instrumented the Moodle plugin to log per-request generation metadata, including start/end timestamps, duration (ms), generated question count, and derived throughput (questions/s). We executed each model under identical server and prompt conditions and compared latency percentiles and error rates using SQL analytics over the generation log table."
