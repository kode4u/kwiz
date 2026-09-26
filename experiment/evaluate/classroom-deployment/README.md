# Evaluation: Real classroom deployment

## Purpose

Support **qualitative and usage-based** claims for your paper: adoption in real teaching contexts (e.g. Cambodia / developing regions), alignment with Moodle workflows, and observed issues.

This is **not** a single automated script; use the **checklist** and **observation template** for structured data collection.

## Before deployment

- [ ] Ethics / IRB approval (if required by your institution).
- [ ] Instructor briefing (how to run sessions, fallback if LLM offline).
- [ ] Student consent / information sheet.
- [ ] Technical checklist: Ollama + LLM API + WebSocket + Moodle plugin versions recorded.
- [ ] Backup plan: non-AI predefined questions if generation fails.

## During deployment

- **Sessions:** number of sessions, participants, duration.
- **Incidents:** disconnections, latency complaints, LLM errors (anonymized).
- **Artifacts:** export **anonymized** logs only (no PII in public repos).

## After deployment

- Short **structured interview** or **survey** (SUS is in `../sus-usability/`).
- **Thematic analysis** of open comments (optional).

## Files

| File | Description |
|------|-------------|
| `classroom_observation_template.md` | Session log + observations |

## What to report

- Setting (course level, discipline, N students, sessions).
- Summary of **technical reliability** and **pedagogical observations** (with quotes anonymized).
- Limitations (selection bias, single institution, etc.).
