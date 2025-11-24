<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

defined('MOODLE_INTERNAL') || die();

$string['modulename'] = 'Gamified Quiz';
$string['modulenameplural'] = 'Gamified Quizzes';
$string['modulename_help'] = 'AI-enhanced real-time gamified quiz with leaderboards and instant feedback.';
$string['pluginname'] = 'Gamified Quiz';
$string['pluginadministration'] = 'Gamified Quiz administration';
$string['gamifiedquiz:addinstance'] = 'Add a new Gamified Quiz';
$string['gamifiedquiz:view'] = 'View Gamified Quiz';
$string['gamifiedquiz:attempt'] = 'Attempt Gamified Quiz';

// Settings
$string['websocket_url'] = 'WebSocket Server URL';
$string['websocket_url_desc'] = 'URL of the WebSocket server (e.g., ws://localhost:3001 or wss://example.com)';
$string['llmapi_url'] = 'LLM API URL';
$string['llmapi_url_desc'] = 'URL of the LLM API service (e.g., http://localhost:5000)';
$string['jwt_secret'] = 'JWT Secret';
$string['jwt_secret_desc'] = 'Secret key for JWT token generation (must match WebSocket server)';

// Activity form
$string['name'] = 'Quiz Name';
$string['topic'] = 'Topic';
$string['topic_help'] = 'Main topic for question generation';
$string['difficulty'] = 'Difficulty Level';
$string['difficulty_easy'] = 'Easy';
$string['difficulty_medium'] = 'Medium';
$string['difficulty_hard'] = 'Hard';
$string['language'] = 'Language';
$string['language_en'] = 'English';
$string['language_km'] = 'Khmer';

// View
$string['start_session'] = 'Start Quiz Session';
$string['generate_questions'] = 'Generate Questions';
$string['current_question'] = 'Question {no}';
$string['submit_answer'] = 'Submit Answer';
$string['leaderboard'] = 'Leaderboard';
$string['your_score'] = 'Your Score';
$string['session_ended'] = 'Quiz Session Ended';
$string['waiting_for_question'] = 'Waiting for question...';
$string['time_remaining'] = 'Time Remaining: {time}s';

