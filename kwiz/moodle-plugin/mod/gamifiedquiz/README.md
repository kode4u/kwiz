# Moodle Gamified Quiz Plugin

Moodle activity module for AI-enhanced real-time gamified quizzes.

## Features

- Integration with Moodle user management
- Teacher dashboard for quiz management
- Real-time student participation
- AI-powered question generation
- Leaderboard and scoring
- JWT-based authentication

## Installation

### Method 1: Docker (Recommended)

The plugin is automatically mounted in the Docker Compose setup. After starting Moodle:

1. Login as admin
2. Go to Site administration → Notifications
3. Complete the plugin installation

### Method 2: Manual Installation

1. Copy the `gamifiedquiz` folder to your Moodle installation:
   ```bash
   cp -r moodle-plugin/mod/gamifiedquiz /path/to/moodle/mod/
   ```

2. Run Moodle upgrade:
   ```bash
   php admin/cli/upgrade.php
   ```

3. Configure plugin settings:
   - Site administration → Plugins → Activity modules → Gamified Quiz
   - Set WebSocket Server URL
   - Set LLM API URL
   - Set JWT Secret (must match WebSocket server)

## Configuration

### Plugin Settings

1. **WebSocket Server URL**: URL of the WebSocket server
   - Development: `ws://localhost:3001`
   - Production: `wss://your-domain.com`

2. **LLM API URL**: URL of the LLM API service
   - Development: `http://localhost:5001`
   - Production: `https://your-domain.com/api`

3. **JWT Secret**: Secret key for JWT token generation
   - Must match the `JWT_SECRET` in WebSocket server
   - Use a strong random key in production

## Usage

### Creating a Quiz

1. Go to your course
2. Click "Add an activity or resource"
3. Select "Gamified Quiz"
4. Fill in:
   - Quiz name
   - Topic (for question generation)
   - Difficulty level
   - Language
5. Save and display

### Teacher Workflow

1. Open the quiz activity
2. Click "Generate Questions" (calls LLM API)
3. Review generated questions
4. Click "Start Session" to begin quiz
5. Questions are pushed to students in real-time
6. Monitor leaderboard
7. Click "End Session" when done

### Student Workflow

1. Open the quiz activity
2. Wait for teacher to start session
3. Answer questions as they appear
4. View immediate feedback
5. See leaderboard updates

## Database Schema

The plugin creates the following tables:

- `mdl_gamifiedquiz` - Quiz instances
- `mdl_gamifiedquiz_sessions` - Active sessions
- `mdl_gamifiedquiz_questions` - Generated questions
- `mdl_gamifiedquiz_responses` - Student answers

## API Functions

### `gamifiedquiz_generate_jwt($userid, $sessionid, $role)`

Generates JWT token for WebSocket authentication.

### `gamifiedquiz_generate_questions($topic, $level, $n_questions, $language)`

Calls LLM API to generate questions.

## Frontend

The plugin includes a JavaScript application (`js/app.js`) that:

- Connects to WebSocket server
- Handles teacher/student interactions
- Displays questions and leaderboard
- Manages real-time updates

## Development

### File Structure

```
mod/gamifiedquiz/
├── version.php          # Plugin version
├── lib.php              # Core functions
├── view.php             # Activity view
├── mod_form.php         # Activity form
├── settings.php         # Plugin settings
├── db/
│   └── install.xml      # Database schema
├── lang/
│   └── en/
│       └── gamifiedquiz.php  # Language strings
└── js/
    └── app.js           # Frontend application
```

### Adding Features

1. Add database fields in `db/install.xml`
2. Update `lib.php` with new functions
3. Modify `view.php` for UI changes
4. Update JavaScript in `js/app.js`
5. Add language strings in `lang/en/gamifiedquiz.php`

## Troubleshooting

### Plugin not appearing

- Check plugin is in correct directory
- Run `php admin/cli/upgrade.php`
- Clear Moodle cache

### WebSocket connection fails

- Verify WebSocket URL in settings
- Check JWT secret matches WebSocket server
- Check browser console for errors

### Questions not generating

- Verify LLM API URL in settings
- Check LLM API is running
- Check API key is configured

## License

GPL v3 (Moodle compatibility)

