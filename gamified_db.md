# Gamified Quiz Database Structure

## Overview

The plugin uses 4 main tables in Moodle's database (prefixed with `mdl_`):

```
┌─────────────────────┐
│   gamifiedquiz      │ ─── Main quiz instances (activity settings)
└─────────────────────┘
          │
          │ 1:N
          ▼
┌─────────────────────┐
│ gamifiedquiz_sessions│ ─── Quiz play sessions (each time teacher starts)
└─────────────────────┘
          │
          │ 1:N
          ▼
┌─────────────────────┐     ┌─────────────────────┐
│ gamifiedquiz_questions│◄───│ gamifiedquiz_responses│ ─── Student answers
└─────────────────────┘     └─────────────────────┘
```

---

## Table: `mdl_gamifiedquiz`

Main quiz activity instances (one per activity created in Moodle).

| Column | Type | Description |
|--------|------|-------------|
| `id` | INT(10) PK | Auto-increment ID |
| `course` | INT(10) FK | Course ID |
| `name` | VARCHAR(255) | Quiz name |
| `intro` | TEXT | Introduction/description |
| `introformat` | INT(4) | Intro text format |
| `topic` | VARCHAR(255) | Quiz topic for AI generation |
| `difficulty` | VARCHAR(20) | Default: 'medium' |
| `language` | VARCHAR(10) | Default: 'en' |
| `llm_backend` | VARCHAR(20) | 'openai', 'gemini', or 'deepseek' |
| `template` | VARCHAR(50) | UI template |
| `color_palette` | VARCHAR(50) | Default: 'kahoot' |
| `use_predefined` | INT(1) | Use predefined data flag |
| `predefined_data` | TEXT | Predefined context for AI |
| `questions_data` | TEXT | **JSON array of questions** |
| `time_limit_per_question` | INT(10) | Seconds per question (default: 60) |
| `leaderboard_top_n` | INT(2) | Top N for leaderboard (default: 3) |
| `timecreated` | INT(10) | Unix timestamp |
| `timemodified` | INT(10) | Unix timestamp |

### `questions_data` JSON Format:
```json
[
  {
    "question": "What is 2+2?",
    "choices": [
      {"text": "3", "is_correct": false},
      {"text": "4", "is_correct": true},
      {"text": "5", "is_correct": false}
    ],
    "correct_index": 1,
    "difficulty": "easy"
  }
]
```

---

## Table: `mdl_gamifiedquiz_sessions`

Each time a teacher starts a quiz session.

| Column | Type | Description |
|--------|------|-------------|
| `id` | INT(10) PK | Auto-increment ID |
| `gamifiedquizid` | INT(10) FK | Quiz instance ID |
| `session_id` | VARCHAR(100) UNIQUE | Unique session identifier (e.g., `5_1732637000000`) |
| `teacherid` | INT(10) FK | Teacher's user ID |
| `started` | INT(1) | Session started flag |
| `timecreated` | INT(10) | Session start timestamp |
| `timeended` | INT(10) | Session end timestamp |

---

## Table: `mdl_gamifiedquiz_questions`

Questions generated per session (for historical tracking).

| Column | Type | Description |
|--------|------|-------------|
| `id` | INT(10) PK | Auto-increment ID |
| `gamifiedquizid` | INT(10) FK | Quiz instance ID |
| `session_id` | VARCHAR(100) | Session identifier |
| `question_text` | TEXT | Question text |
| `choices` | TEXT | JSON array of choices |
| `correct_index` | INT(2) | Index of correct answer |
| `difficulty` | VARCHAR(20) | Question difficulty |
| `bloom_level` | VARCHAR(50) | Bloom's taxonomy level |
| `timecreated` | INT(10) | Unix timestamp |

---

## Table: `mdl_gamifiedquiz_responses`

Student answers during sessions.

| Column | Type | Description |
|--------|------|-------------|
| `id` | INT(10) PK | Auto-increment ID |
| `session_id` | VARCHAR(100) | Session identifier |
| `questionid` | INT(10) FK | Question ID |
| `userid` | INT(10) FK | Moodle user ID |
| `answer_index` | INT(2) | Selected answer index |
| `is_correct` | INT(1) | 1=correct, 0=incorrect |
| `score` | INT(10) | Points earned (base + speed bonus) |
| `time_spent` | INT(10) | Seconds to answer |
| `timecreated` | INT(10) | Unix timestamp |

**Index:** `session_user` on (`session_id`, `userid`)

---

## Redis (Temporary - Active Session Only)

During an active session, Redis stores real-time data:

| Key Pattern | Type | Description |
|-------------|------|-------------|
| `session:{instanceId}:leaderboard` | Sorted Set | User scores (member=userId, score=points) |
| `session:{instanceId}:answers` | List | JSON answer records |
| `session:{instanceId}:students` | Set | Connected student user IDs |

**Note:** Redis data is cleared when a new session starts. Permanent data is saved to Moodle DB.

---

## Data Flow

### 1. Teacher Creates Quiz
- Record created in `gamifiedquiz`
- `questions_data` populated via AI or manual edit

### 2. Teacher Starts Session
- New record in `gamifiedquiz_sessions`
- Redis keys created for real-time tracking
- `instanceId` = `{quizId}_{timestamp}`

### 3. Student Answers
- Score calculated in WebSocket server
- Stored temporarily in Redis leaderboard
- Emitted to teacher for DB save via `response:save` event
- Saved to `gamifiedquiz_responses`

### 4. Session Ends
- Final leaderboard saved to `gamifiedquiz_sessions`
- Redis keys can be cleared
- Historical data persists in Moodle DB

---

## Scoring Formula

```
Base Score: 400 points (if correct)
Speed Bonus: remainingSeconds × 20 (if correct)
Total: Base + Speed Bonus (max ~1600 for 60s timer)
```

