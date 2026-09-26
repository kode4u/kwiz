#!/usr/bin/env bash
# Run JMeter in non-GUI mode (example). Requires a .jmx file and JMeter on PATH or JMETER_HOME.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# Usage: ./run_jmeter_example.sh [jmx-filename]
# Default: gamified-quiz-load-test.jmx (smoke). For 200 concurrent users use: gamified-quiz-200-concurrent-health.jmx
JMX_NAME="${1:-gamified-quiz-load-test.jmx}"
JMX="${SCRIPT_DIR}/${JMX_NAME}"
OUT="${SCRIPT_DIR}/jmeter-results"

resolve_jmeter() {
  if [[ -n "${JMETER_HOME:-}" && -x "${JMETER_HOME}/bin/jmeter" ]]; then
    echo "${JMETER_HOME}/bin/jmeter"
    return
  fi
  if command -v jmeter >/dev/null 2>&1; then
    command -v jmeter
    return
  fi
  echo ""
}

JMETER_BIN="$(resolve_jmeter)"
if [[ -z "$JMETER_BIN" ]]; then
  echo "JMeter not found. Either:"
  echo "  1) Install Apache JMeter and add it to PATH, e.g. macOS: brew install jmeter"
  echo "  2) Or set JMETER_HOME to the JMeter folder (must contain bin/jmeter):"
  echo "       export JMETER_HOME=/path/to/apache-jmeter-5.x"
  exit 1
fi

if [[ ! -f "$JMX" ]]; then
  echo "Missing JMX file: $JMX"
  echo "Create a test plan in JMeter GUI and save it as gamified-quiz-load-test.jmx in this folder."
  echo "See README.md in this directory for steps."
  exit 1
fi

mkdir -p "$OUT"
REPORT_DIR="${OUT}/html-report-${JMX_NAME%.jmx}"
mkdir -p "$REPORT_DIR"
JTL="${OUT}/${JMX_NAME%.jmx}.jtl"
"$JMETER_BIN" -n -t "$JMX" -l "$JTL" -e -o "$REPORT_DIR"
echo "Done. Plan: $JMX_NAME"
echo "Report: $REPORT_DIR/index.html"
echo "Open in a browser: file://$REPORT_DIR/index.html"
