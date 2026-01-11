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

// New fields
$string['llm_backend'] = 'LLM Backend';
$string['llm_backend_help'] = 'Select the AI model to use for question generation';
$string['use_predefined'] = 'Use Predefined Questions';
$string['use_predefined_desc'] = 'Check to use predefined questions instead of generating with AI';
$string['predefined_data'] = 'Predefined Questions';
$string['predefined_data_help'] = 'Enter questions as a JSON array. Each question must have: question (text), choices (array with text and is_correct boolean). The correct_index will be auto-calculated from is_correct. Optional fields: difficulty, explanation. See the format example above.';
$string['template'] = 'Template';
$string['template_help'] = 'Select a visual template for the quiz';
$string['template_default'] = 'Default';
$string['template_kahoot'] = 'Kahoot Style';
$string['template_minimal'] = 'Minimal';
$string['template_modern'] = 'Modern';
$string['color_palette'] = 'Color Palette';
$string['color_palette_help'] = 'Select a color scheme for the quiz';
$string['palette_kahoot'] = 'Kahoot (Blue/Red)';
$string['palette_blue'] = 'Blue';
$string['palette_green'] = 'Green';
$string['palette_purple'] = 'Purple';
$string['palette_orange'] = 'Orange';
$string['palette_red'] = 'Red';
$string['palette_custom'] = 'Custom';

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
$string['time_limit_per_question'] = 'Time Limit Per Question (seconds)';
$string['time_limit_per_question_help'] = 'Maximum time allowed for students to answer each question';
$string['leaderboard_top_n'] = 'Leaderboard Top N';
$string['leaderboard_top_n_help'] = 'Number of top students to display in final leaderboard (3, 5, or 10)';
$string['question_result'] = 'Question Result';
$string['correct'] = 'Correct!';
$string['incorrect'] = 'Incorrect';
$string['previous_score'] = 'Previous Score';
$string['current_score'] = 'Current Score';
$string['score_change'] = 'Score Change';
$string['final_leaderboard'] = 'Final Leaderboard';
$string['rank'] = 'Rank';
$string['score'] = 'Score';
$string['next_question'] = 'Next Question';
$string['end_quiz'] = 'End Quiz';
$string['questionbank'] = 'Question Bank';
$string['questioncategory'] = 'Question Category';
$string['questioncategory_help'] = 'Select a question category to use questions from the question bank. Questions generated will be added to this category.';
$string['defaultcategory'] = 'Use default category (Gamified Quiz #X)';

