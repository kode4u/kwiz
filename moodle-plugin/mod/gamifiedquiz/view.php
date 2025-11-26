<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

require_once('../../config.php');
require_once($CFG->dirroot . '/mod/gamifiedquiz/lib.php');

$id = optional_param('id', 0, PARAM_INT); // Course_module ID
$n = optional_param('n', 0, PARAM_INT);  // gamifiedquiz instance ID

if ($id) {
    $cm = get_coursemodule_from_id('gamifiedquiz', $id, 0, false, MUST_EXIST);
    $course = $DB->get_record('course', array('id' => $cm->course), '*', MUST_EXIST);
    $gamifiedquiz = $DB->get_record('gamifiedquiz', array('id' => $cm->instance), '*', MUST_EXIST);
} else if ($n) {
    $gamifiedquiz = $DB->get_record('gamifiedquiz', array('id' => $n), '*', MUST_EXIST);
    $course = $DB->get_record('course', array('id' => $gamifiedquiz->course), '*', MUST_EXIST);
    $cm = get_coursemodule_from_instance('gamifiedquiz', $gamifiedquiz->id, $course->id, false, MUST_EXIST);
} else {
    error('You must specify a course_module ID or an instance ID');
}

require_login($course, true, $cm);

$context = context_module::instance($cm->id);
require_capability('mod/gamifiedquiz:view', $context);

// Determine if user is teacher or student
$is_teacher = has_capability('mod/gamifiedquiz:addinstance', $context);
$role = $is_teacher ? 'teacher' : 'student';

// Generate JWT token
$session_id = 'session_' . $gamifiedquiz->id . '_' . $cm->id;
$jwt_token = gamifiedquiz_generate_jwt($USER->id, $session_id, $role);

// Get WebSocket URL
$ws_url = get_config('mod_gamifiedquiz', 'websocket_url');
if (empty($ws_url)) {
    $ws_url = 'ws://localhost:3001';
}

$PAGE->set_url('/mod/gamifiedquiz/view.php', array('id' => $cm->id));
$PAGE->set_title($gamifiedquiz->name);
$PAGE->set_heading($course->fullname);
$PAGE->set_context($context);

// Include CSS file BEFORE header is printed
$PAGE->requires->css('/mod/gamifiedquiz/styles.css');

// Output starts here
echo $OUTPUT->header();

// Display intro if available
if (!empty($gamifiedquiz->intro)) {
    echo $OUTPUT->box(format_module_intro('gamifiedquiz', $gamifiedquiz, $cm->id), 'generalbox', 'intro');
}

// Get template and color palette
$template = isset($gamifiedquiz->template) ? $gamifiedquiz->template : 'default';
$color_palette = isset($gamifiedquiz->color_palette) ? $gamifiedquiz->color_palette : 'kahoot';

// Apply template and color palette classes
$container_class = 'gamifiedquiz-container gq-template-' . $template . ' gq-palette-' . $color_palette;

// Include CSS
echo '<style>
.gamifiedquiz-container { max-width: 1200px; margin: 20px auto; padding: 20px; }
.gamifiedquiz-teacher, .gamifiedquiz-student { background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0; }
.controls { margin: 20px 0; }
.controls button { margin: 5px 10px 5px 0; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; font-size: 14px; }
.btn-primary { background: #007bff; color: white; }
.btn-success { background: #28a745; color: white; }
.btn-danger { background: #dc3545; color: white; }
.btn-secondary { background: #6c757d; color: white; }
.controls button:disabled { opacity: 0.5; cursor: not-allowed; }
.questions-container { margin: 20px 0; }
.question-preview { background: white; padding: 15px; margin: 10px 0; border-radius: 4px; border-left: 4px solid #007bff; }
.question-preview h4 { margin-top: 0; color: #333; }
.question-preview ul { list-style: none; padding-left: 0; }
.question-preview li { padding: 5px 10px; margin: 5px 0; background: #f8f9fa; border-radius: 3px; }
.question-preview li.correct { background: #d4edda; border-left: 3px solid #28a745; }
.session-status { padding: 10px; margin: 10px 0; background: #d1ecf1; border-left: 4px solid #0c5460; border-radius: 4px; }
.waiting { text-align: center; padding: 40px; background: #fff3cd; border-radius: 4px; font-size: 18px; color: #856404; }
.question-container { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
.question-text { font-size: 20px; font-weight: bold; margin: 20px 0; color: #333; }
.timer { font-size: 18px; color: #dc3545; font-weight: bold; margin: 10px 0; }
.choices { margin: 20px 0; }
.choice-option { display: block; padding: 12px; margin: 8px 0; background: #f8f9fa; border: 2px solid #dee2e6; border-radius: 4px; cursor: pointer; transition: all 0.2s; }
.choice-option:hover { background: #e9ecef; border-color: #007bff; }
.choice-option input[type="radio"] { margin-right: 10px; }
.choice-option.selected { background: #cfe2ff; border-color: #007bff; }
.result-container { padding: 20px; margin: 20px 0; border-radius: 8px; text-align: center; }
.result.correct { background: #d4edda; border: 2px solid #28a745; }
.result.incorrect { background: #f8d7da; border: 2px solid #dc3545; }
.leaderboard-container { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
.leaderboard-container h3 { margin-top: 0; }
.leaderboard-container ol { padding-left: 20px; }
.leaderboard-container li { padding: 8px; margin: 5px 0; background: #f8f9fa; border-radius: 4px; }
.quiz-info { background: #e7f3ff; padding: 15px; border-radius: 4px; margin: 15px 0; }
.quiz-info strong { color: #0056b3; }
.question-editor-modal { display: none; position: fixed; z-index: 1000; left: 0; top: 0; width: 100%; height: 100%; overflow: auto; background-color: rgba(0,0,0,0.4); align-items: center; justify-content: center; }
.question-editor-content { background-color: #fefefe; margin: auto; padding: 20px; border: 1px solid #888; border-radius: 8px; width: 90%; max-width: 800px; max-height: 90vh; overflow-y: auto; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
.question-editor-close, .generate-questions-close { color: #aaa; float: right; font-size: 28px; font-weight: bold; cursor: pointer; }
.question-editor-close:hover, .question-editor-close:focus, .generate-questions-close:hover, .generate-questions-close:focus { color: #000; text-decoration: none; }
</style>';

// Get user's full name for display
$user_fullname = fullname($USER);

// Set config before loading JS - use inline script to ensure it's available
echo '<script>
window.GAMIFIED_QUIZ_CONFIG = {
    wsUrl: ' . json_encode($ws_url) . ',
    jwtToken: ' . json_encode($jwt_token) . ',
    sessionId: ' . json_encode($session_id) . ',
    role: ' . json_encode($role) . ',
    userId: ' . $USER->id . ',
    userName: ' . json_encode($USER->username) . ',
    fullName: ' . json_encode($user_fullname) . ',
    quizId: ' . $gamifiedquiz->id . ',
    cmId: ' . $cm->id . ',
    topic: ' . json_encode($gamifiedquiz->topic) . ',
    difficulty: ' . json_encode($gamifiedquiz->difficulty) . ',
    language: ' . json_encode($gamifiedquiz->language) . ',
    quizName: ' . json_encode($gamifiedquiz->name) . ',
    wwwroot: ' . json_encode($CFG->wwwroot) . ',
    sesskey: ' . json_encode(sesskey()) . ',
    template: ' . json_encode(isset($gamifiedquiz->template) ? $gamifiedquiz->template : 'default') . ',
    colorPalette: ' . json_encode(isset($gamifiedquiz->color_palette) ? $gamifiedquiz->color_palette : 'kahoot') . ',
    llmBackend: ' . json_encode(isset($gamifiedquiz->llm_backend) ? $gamifiedquiz->llm_backend : 'openai') . ',
    usePredefined: ' . (isset($gamifiedquiz->use_predefined) && $gamifiedquiz->use_predefined ? 'true' : 'false') . ',
    predefinedData: ' . json_encode(isset($gamifiedquiz->predefined_data) ? $gamifiedquiz->predefined_data : '') . ',
    questionsData: ' . json_encode(isset($gamifiedquiz->questions_data) ? $gamifiedquiz->questions_data : '') . ',
    timeLimitPerQuestion: ' . (isset($gamifiedquiz->time_limit_per_question) ? intval($gamifiedquiz->time_limit_per_question) : 60) . ',
    leaderboardTopN: ' . (isset($gamifiedquiz->leaderboard_top_n) ? intval($gamifiedquiz->leaderboard_top_n) : 3) . '
};
</script>';

// Display quiz info
echo '<div class="quiz-info">';
echo '<strong>' . get_string('topic', 'mod_gamifiedquiz') . ':</strong> ' . s($gamifiedquiz->topic) . ' | ';
echo '<strong>' . get_string('difficulty', 'mod_gamifiedquiz') . ':</strong> ' . ucfirst($gamifiedquiz->difficulty) . ' | ';
echo '<strong>' . get_string('language', 'mod_gamifiedquiz') . ':</strong> ' . strtoupper($gamifiedquiz->language);
echo '</div>';

if ($is_teacher) {
    // Teacher view
    echo '<div class="' . $container_class . '">';
    echo '<div class="gamifiedquiz-teacher">';
    echo '<h2>' . s($gamifiedquiz->name) . '</h2>';
    echo '<div class="controls">';
    echo '<button id="generate-questions-btn" class="btn btn-primary">' . get_string('generate_questions', 'mod_gamifiedquiz') . '</button>';
    echo '<button id="edit-questions-btn" class="btn btn-secondary">Edit Questions</button>';
    echo '<button id="start-session-btn" class="btn btn-success" disabled>' . get_string('start_session', 'mod_gamifiedquiz') . '</button>';
    echo '<button id="end-session-btn" class="btn btn-danger" disabled>End Session</button>';
    echo '<button id="next-question-btn" class="btn btn-secondary" disabled>Next Question</button>';
    echo '</div>';
    echo '<div id="session-status" class="session-status" style="display:none;"></div>';
    echo '<div id="questions-container" class="questions-container" style="display:none;"></div>';
    echo '<div id="active-question-display" style="display:none; background: white; padding: 30px; border-radius: 12px; margin: 20px 0; box-shadow: 0 4px 12px rgba(0,0,0,0.15); min-height: 400px;">';
    echo '<div id="active-question-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">';
    echo '<div id="active-question-number" style="font-size: 18px; color: #666; font-weight: bold;"></div>';
    echo '<div id="active-question-timer" style="font-size: 24px; font-weight: bold; color: #007bff; background: #e7f3ff; padding: 10px 20px; border-radius: 8px;"></div>';
    echo '</div>';
    echo '<div id="active-question-text" style="font-size: 32px; font-weight: bold; margin-bottom: 40px; color: #333; text-align: center; line-height: 1.4;"></div>';
    echo '<div id="active-question-choices" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-top: 20px;"></div>';
    echo '</div>';
    echo '<div id="question-results-display" style="display:none; background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;"></div>';
    echo '<div id="leaderboard-container" class="leaderboard-container"></div>';
    echo '<div id="final-leaderboard-container" style="display:none; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 12px; margin: 30px 0; color: white;"></div>';
    echo '</div>';
    echo '</div>';
} else {
    // Student view
    echo '<div class="' . $container_class . '">';
    echo '<div class="gamifiedquiz-student">';
    echo '<h2>' . s($gamifiedquiz->name) . '</h2>';
    echo '<div id="waiting-message" class="waiting">Waiting for teacher to start quiz session...</div>';
    echo '<div id="question-container" class="question-container" style="display:none; background: white; padding: 30px; border-radius: 12px; margin: 20px 0; box-shadow: 0 4px 12px rgba(0,0,0,0.15); min-height: 400px;">';
    echo '<div id="question-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">';
    echo '<div id="question-number" style="font-size: 18px; color: #666; font-weight: bold;"></div>';
    echo '<div id="timer" class="timer" style="font-size: 24px; font-weight: bold; color: #007bff; background: #e7f3ff; padding: 10px 20px; border-radius: 8px;"></div>';
    echo '</div>';
    echo '<div id="question-text" class="question-text" style="font-size: 32px; font-weight: bold; margin-bottom: 40px; color: #333; text-align: center; line-height: 1.4;"></div>';
    echo '<div id="choices" class="choices" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-top: 20px;"></div>';
    echo '</div>';
    echo '<div id="result-container" class="result-container" style="display:none;"></div>';
    echo '<div id="question-comparison-container" style="display:none; background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;"></div>';
    // No leaderboard container for students - only teachers see it
    echo '</div>';
    echo '</div>';
}

// Question Editor Modal
if ($is_teacher) {
    echo '<div id="question-editor-modal" class="question-editor-modal">';
    echo '<div class="question-editor-content">';
    echo '<span class="question-editor-close">&times;</span>';
    echo '<h2>Edit Questions</h2>';
    echo '<div id="question-editor-form" class="question-editor-form">';
    echo '<p>Question editor will be populated here</p>';
    echo '</div>';
    echo '<div style="margin-top: 20px;">';
    echo '<button id="save-questions-btn" class="btn btn-primary">Save Questions</button>';
    echo '<button id="cancel-edit-btn" class="btn btn-secondary">Cancel</button>';
    echo '</div>';
    echo '</div>';
    echo '</div>';
    
    // Generate Questions Dialog Modal
    echo '<div id="generate-questions-modal" class="question-editor-modal" style="display:none;">';
    echo '<div class="question-editor-content" style="max-width: 600px;">';
    echo '<span class="generate-questions-close" style="float: right; font-size: 28px; font-weight: bold; cursor: pointer; color: #aaa;">&times;</span>';
    echo '<h2>Generate Questions</h2>';
    echo '<form id="generate-questions-form">';
    echo '<div style="margin-bottom: 20px;">';
    echo '<label for="generate-prompt" style="display: block; margin-bottom: 5px; font-weight: bold;">Prompt/Topic:</label>';
    echo '<textarea id="generate-prompt" name="prompt" rows="3" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px;" placeholder="Enter topic or prompt for question generation (e.g., \'Mathematics: Algebra\')">' . s($gamifiedquiz->topic) . '</textarea>';
    echo '</div>';
    echo '<div style="margin-bottom: 20px;">';
    echo '<label for="generate-data" style="display: block; margin-bottom: 5px; font-weight: bold;">Data/Context (Optional):</label>';
    echo '<textarea id="generate-data" name="data" rows="5" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px;" placeholder="Enter additional context or predefined data for question generation"></textarea>';
    echo '</div>';
    echo '<div style="margin-bottom: 20px;">';
    echo '<label for="generate-difficulty" style="display: block; margin-bottom: 5px; font-weight: bold;">Difficulty Level:</label>';
    echo '<select id="generate-difficulty" name="difficulty" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px;">';
    echo '<option value="easy"' . ($gamifiedquiz->difficulty === 'easy' ? ' selected' : '') . '>Easy</option>';
    echo '<option value="medium"' . ($gamifiedquiz->difficulty === 'medium' ? ' selected' : '') . '>Medium</option>';
    echo '<option value="hard"' . ($gamifiedquiz->difficulty === 'hard' ? ' selected' : '') . '>Hard</option>';
    echo '</select>';
    echo '</div>';
    echo '<div style="margin-bottom: 20px;">';
    echo '<label for="generate-count" style="display: block; margin-bottom: 5px; font-weight: bold;">Number of Questions:</label>';
    echo '<select id="generate-count" name="count" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px;">';
    echo '<option value="3">3 Questions</option>';
    echo '<option value="5" selected>5 Questions</option>';
    echo '<option value="10">10 Questions</option>';
    echo '<option value="15">15 Questions</option>';
    echo '<option value="20">20 Questions</option>';
    echo '</select>';
    echo '</div>';
    echo '<div style="margin-top: 20px; text-align: right;">';
    echo '<button type="button" id="cancel-generate-btn" class="btn btn-secondary" style="margin-right: 10px;">Cancel</button>';
    echo '<button type="submit" id="submit-generate-btn" class="btn btn-primary">Generate</button>';
    echo '</div>';
    echo '</form>';
    echo '</div>';
    echo '</div>';
    
    // Loading Dialog Modal
    echo '<div id="loading-modal" class="question-editor-modal" style="display:none;">';
    echo '<div class="question-editor-content" style="max-width: 400px; text-align: center;">';
    echo '<div style="margin: 20px 0;">';
    echo '<div class="spinner" style="border: 4px solid #f3f3f3; border-top: 4px solid #007bff; border-radius: 50%; width: 50px; height: 50px; animation: spin 1s linear infinite; margin: 0 auto;"></div>';
    echo '</div>';
    echo '<h3 style="margin: 20px 0;">Generating Questions...</h3>';
    echo '<p style="color: #666;">Please wait while we generate your questions.</p>';
    echo '</div>';
    echo '</div>';
    
    // Add spinner animation CSS
    echo '<style>
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    </style>';
}

// Include Socket.IO from CDN if not available
echo '<script src="https://cdn.socket.io/4.5.4/socket.io.min.js"></script>';
// Include the app JavaScript
$PAGE->requires->js('/mod/gamifiedquiz/js/app.js');

echo $OUTPUT->footer();

