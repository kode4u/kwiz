#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OUT_DIR=""
PREFIX="mdl_"
MYSQL_CMD=""

print_help() {
  cat <<'EOF'
Run full SQL analysis pipeline:
  1) Export CSV metrics from generation logs
  2) Generate PNG charts from exported CSV files

Usage:
  ./evaluate/sql/run_all_sql_analysis.sh [options]

Options:
  --out-dir <path>      Output directory for CSV/charts
  --prefix <prefix>     Moodle DB prefix (default: mdl_)
  --mysql-cmd <cmd>     MySQL command to run queries
  -h, --help            Show help
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

EXPORT_CMD=("${SCRIPT_DIR}/export_generation_csv.sh" "--prefix" "${PREFIX}")
if [[ -n "${OUT_DIR}" ]]; then
  EXPORT_CMD+=("--out-dir" "${OUT_DIR}")
fi
if [[ -n "${MYSQL_CMD}" ]]; then
  EXPORT_CMD+=("--mysql-cmd" "${MYSQL_CMD}")
fi

echo "[1/2] Exporting CSV metrics..."
"${EXPORT_CMD[@]}"

if [[ -z "${OUT_DIR}" ]]; then
  LATEST_EXPORT="$(ls -1dt "${SCRIPT_DIR}/exports"/*/ | head -n 1)"
  OUT_DIR="${LATEST_EXPORT%/}"
fi

echo "[2/2] Generating charts..."
python3 "${SCRIPT_DIR}/plot_generation_charts.py" --input-dir "${OUT_DIR}" --output-dir "${OUT_DIR}/charts"

echo ""
echo "Done."
echo "CSV folder: ${OUT_DIR}"
echo "Charts: ${OUT_DIR}/charts"
