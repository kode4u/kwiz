#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TS="$(date +%Y%m%d_%H%M%S)"
OUT_DIR="${SCRIPT_DIR}/exports/${TS}"
PREFIX="mdl_"
MYSQL_CMD=""

print_help() {
  cat <<'EOF'
Export Gamified Quiz generation analytics to CSV.

Usage:
  ./evaluate/sql/export_generation_csv.sh [options]

Options:
  --out-dir <path>      Output directory (default: evaluate/sql/exports/<timestamp>)
  --prefix <prefix>     Moodle DB table prefix (default: mdl_)
  --mysql-cmd <cmd>     MySQL command used to execute SQL
                        Example (Docker):
                        docker compose exec -T db mysql -umoodle -pmoodlepass moodle
                        Example (local MySQL):
                        mysql -h 127.0.0.1 -P 3307 -umoodle -pmoodlepass moodle
  -h, --help            Show help

Output files:
  - latest_runs.csv
  - overall_summary.csv
  - status_breakdown.csv
  - by_model_summary.csv
  - daily_trend.csv
  - recent_errors.csv
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --out-dir)
      OUT_DIR="$2"
      shift 2
      ;;
    --prefix)
      PREFIX="$2"
      shift 2
      ;;
    --mysql-cmd)
      MYSQL_CMD="$2"
      shift 2
      ;;
    -h|--help)
      print_help
      exit 0
      ;;
    *)
      echo "Unknown option: $1"
      print_help
      exit 1
      ;;
  esac
done

if [[ -z "${MYSQL_CMD}" ]]; then
  if command -v docker >/dev/null 2>&1; then
    MYSQL_CMD="docker compose exec -T db mysql -umoodle -pmoodlepass moodle"
  elif command -v mysql >/dev/null 2>&1; then
    MYSQL_CMD="mysql -h 127.0.0.1 -P 3307 -umoodle -pmoodlepass moodle"
  else
    echo "Could not auto-detect MySQL command."
    echo "Use --mysql-cmd \"...\""
    exit 1
  fi
fi

TABLE="${PREFIX}gamifiedquiz_generation_logs"
mkdir -p "${OUT_DIR}"

run_export() {
  local name="$1"
  local sql="$2"
  local outfile="${OUT_DIR}/${name}.csv"
  local tmpfile
  tmpfile="$(mktemp)"
  printf '%s\n' "${sql}" > "${tmpfile}"

  # mysql --batch --raw outputs tab-separated rows with header.
  eval "${MYSQL_CMD} --batch --raw --default-character-set=utf8mb4" < "${tmpfile}" \
    | python3 -c 'import sys,csv; r=csv.reader(sys.stdin, delimiter="\t"); w=csv.writer(sys.stdout); [w.writerow(row) for row in r]' \
    > "${outfile}"

  rm -f "${tmpfile}"
  echo "Exported: ${outfile}"
}

run_export "latest_runs" "
SELECT
  id,
  request_uuid,
  backend,
  COALESCE(NULLIF(llm_model, ''), '(default)') AS llm_model,
  requested_count,
  generated_count,
  saved_count,
  duration_ms,
  questions_per_sec,
  status,
  FROM_UNIXTIME(started_at) AS started_at_dt,
  FROM_UNIXTIME(ended_at) AS ended_at_dt
FROM ${TABLE}
ORDER BY id DESC
LIMIT 200;
"

run_export "overall_summary" "
SELECT
  COUNT(*) AS runs_success,
  ROUND(AVG(duration_ms), 2) AS mean_duration_ms,
  ROUND(MIN(duration_ms), 2) AS min_duration_ms,
  ROUND(MAX(duration_ms), 2) AS max_duration_ms,
  ROUND(AVG(questions_per_sec), 4) AS mean_questions_per_sec,
  ROUND(AVG(generated_count), 2) AS mean_generated_count,
  ROUND(AVG(saved_count), 2) AS mean_saved_count
FROM ${TABLE}
WHERE status = 'success';
"

run_export "status_breakdown" "
SELECT
  status,
  COUNT(*) AS runs,
  ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 2) AS pct
FROM ${TABLE}
GROUP BY status
ORDER BY runs DESC;
"

run_export "by_model_summary" "
SELECT
  backend,
  COALESCE(NULLIF(llm_model, ''), '(default)') AS llm_model,
  COUNT(*) AS runs_total,
  SUM(CASE WHEN status = 'success' THEN 1 ELSE 0 END) AS runs_success,
  ROUND(SUM(CASE WHEN status = 'error' THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 2) AS error_rate_pct,
  ROUND(AVG(CASE WHEN status = 'success' THEN duration_ms END), 2) AS mean_duration_ms_success,
  ROUND(AVG(CASE WHEN status = 'success' THEN questions_per_sec END), 4) AS mean_qps_success
FROM ${TABLE}
GROUP BY backend, COALESCE(NULLIF(llm_model, ''), '(default)')
ORDER BY runs_total DESC;
"

run_export "daily_trend" "
SELECT
  DATE(FROM_UNIXTIME(timecreated)) AS run_date,
  backend,
  COALESCE(NULLIF(llm_model, ''), '(default)') AS llm_model,
  COUNT(*) AS runs,
  ROUND(AVG(CASE WHEN status = 'success' THEN duration_ms END), 2) AS mean_duration_ms_success,
  ROUND(AVG(CASE WHEN status = 'success' THEN questions_per_sec END), 4) AS mean_qps_success,
  ROUND(SUM(CASE WHEN status = 'error' THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 2) AS error_rate_pct
FROM ${TABLE}
GROUP BY DATE(FROM_UNIXTIME(timecreated)), backend, COALESCE(NULLIF(llm_model, ''), '(default)')
ORDER BY run_date DESC, backend, llm_model;
"

run_export "recent_errors" "
SELECT
  id,
  request_uuid,
  backend,
  COALESCE(NULLIF(llm_model, ''), '(default)') AS llm_model,
  topic,
  requested_count,
  generated_count,
  saved_count,
  duration_ms,
  error_message,
  FROM_UNIXTIME(timecreated) AS created_dt
FROM ${TABLE}
WHERE status = 'error'
ORDER BY id DESC
LIMIT 500;
"

echo ""
echo "Done. CSV exports are in: ${OUT_DIR}"
