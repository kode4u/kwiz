# Kwiz Moodle Activity Module (`mod_kwiz`)

An AI-assisted, curriculum-grounded assessment authoring activity module for Moodle. Kwiz allows instructors to automatically generate high-quality, Bloom-aligned multiple-choice questions (MCQs) directly from course lecture materials (PDF, PPTX, DOCX, text) using local or cloud LLMs with deterministic AST syntax validation.

---

## Features

- **Course Material RAG Grounding**: Extract course slides (PDF, PPTX, DOCX) and ground questions in authentic curriculum content.
- **On-Premise Privacy & Speed**: Direct integration with local Ollama LLMs (`qwen2.5-coder:7b`) and local embeddings (`nomic-embed-text`).
- **Deterministic AST Syntax Validation**: Automated compilation checking of all generated code snippets before presentation to instructors.
- **Direct Moodle Question Bank Integration**: Seamlessly saves generated questions into Moodle's native Question Bank categories.
- **Standard Moodle Quiz Generation**: Instantly exports approved question sets into standard Moodle Quiz activities for examinations.
- **Bloom's Taxonomy & Difficulty Control**: Configure targeted cognitive levels (Remembering, Understanding, Applying, Analyzing) and difficulty tiers.
- **Audit & Research Telemetry**: Complete logging of generation latency, prompt token counts, and hit rates (`mdl_kwiz_generation_logs`).

---

## Installation

### Method 1: Docker (Included in Kwiz Setup)

When using the repository's `docker-compose.yml`, the plugin is pre-mounted into Moodle at `/var/www/html/mod/kwiz`.
After starting containers, log in as administrator and complete the upgrade notification:

```bash
docker compose exec moodle php admin/cli/upgrade.php
```

### Method 2: Manual Installation on Existing Moodle Server

1. Copy the `kwiz` directory into your Moodle installation's `mod/` directory:
   ```bash
   cp -r moodle-plugin/mod/kwiz /path/to/moodle/mod/
   ```

2. Run the Moodle CLI upgrade command:
   ```bash
   php admin/cli/upgrade.php
   ```

3. Configure the plugin in Site Administration:
   - Navigate to: **Site administration -> Plugins -> Activity modules -> Kwiz**
   - Set **LLM API URL** to your LLM API endpoint (e.g., `http://llmapi:5001` or `http://localhost:5001`).
   - Select the default backend (e.g., `local` for Ollama).

---

## Configuration

### Plugin Settings (`settings.php`)

| Setting | Configuration Key | Default Value | Description |
|---|---|---|---|
| **LLM API URL** | `mod_kwiz/llmapi_url` | `http://llmapi:5001` | Base URL of the Kwiz LLM & AST validation service |
| **Default Backend** | `mod_kwiz/llm_backend` | `local` | Primary LLM backend (`local`, `openai`, `gemini`) |

---

## Instructor Workflow

1. **Add Activity**: In your Moodle course, turn editing on and add a **Kwiz** activity.
2. **Attach Course Content**: Upload lecture slides (PDF, PPTX) or paste course text into the RAG context box.
3. **Configure Generation**:
   - Choose topic and target Bloom's taxonomy level.
   - Set question count and difficulty (easy, medium, hard).
4. **Generate**: Click **Generate Questions**. The plugin communicates synchronously with the LLM API to retrieve context, generate distractors, and validate Python syntax.
5. **Review & Publish**: Inspect questions in the interactive editor and export them directly to the Moodle Question Bank or create an assessment quiz.

---

## Database Architecture

The plugin defines and manages the following database tables:

- `mdl_kwiz`: Main activity instances and course module configuration.
- `mdl_kwiz_questions`: Cached generated question candidates with answer choices and explanations.
- `mdl_kwiz_slots`: Question slot mappings for activity sessions.
- `mdl_kwiz_sessions`: Active test delivery sessions.
- `mdl_kwiz_responses`: Student response logs and submission timestamps.
- `mdl_kwiz_grades`: Final aggregated student scores.
- `mdl_kwiz_participants`: Session participation registry.
- `mdl_kwiz_generation_logs`: Detailed empirical generation telemetry (latencies, token counts, error status).

---

## Troubleshooting

### Plugin Upgrade / Installation
If the plugin is not detected, clear the Moodle cache and run upgrade:
```bash
php admin/cli/purge_caches.php
php admin/cli/upgrade.php
```

### Connection Issues with LLM API
- Verify the LLM API container is healthy:
  ```bash
  curl http://localhost:5001/health
  ```
- If running Moodle in Docker, verify `http://llmapi:5001/health` is reachable from within the Moodle container.

---

## License

GNU General Public License v3.0 (GPL-3.0) - Compatible with Moodle core.
