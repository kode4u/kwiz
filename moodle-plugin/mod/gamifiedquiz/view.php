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
</style>';

// Set config before loading JS - use inline script to ensure it's available
echo '<script>
window.GAMIFIED_QUIZ_CONFIG = {
    wsUrl: ' . json_encode($ws_url) . ',
    jwtToken: ' . json_encode($jwt_token) . ',
    sessionId: ' . json_encode($session_id) . ',
    role: ' . json_encode($role) . ',
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
    questionsData: ' . json_encode(isset($gamifiedquiz->questions_data) ? $gamifiedquiz->questions_data : '') . '
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
    echo '<div id="questions-container" class="questions-container"></div>';
    echo '<div id="current-question-display" style="display:none; background: white; padding: 15px; border-radius: 4px; margin: 15px 0;">';
    echo '<h3>Current Question</h3>';
    echo '<div id="current-question-text"></div>';
    echo '</div>';
    echo '<div id="leaderboard-container" class="leaderboard-container"></div>';
    echo '</div>';
    echo '</div>';
} else {
    // Student view
    echo '<div class="' . $container_class . '">';
    echo '<div class="gamifiedquiz-student">';
    echo '<h2>' . s($gamifiedquiz->name) . '</h2>';
    echo '<div id="waiting-message" class="waiting">Waiting for teacher to start quiz session...</div>';
    echo '<div id="question-container" class="question-container" style="display:none;">';
    echo '<div id="question-number" style="font-size: 14px; color: #666; margin-bottom: 10px;"></div>';
    echo '<div id="question-text" class="question-text"></div>';
    echo '<div id="timer" class="timer"></div>';
    echo '<div id="choices" class="choices"></div>';
    echo '<button id="submit-btn" class="btn btn-primary" disabled>' . get_string('submit_answer', 'mod_gamifiedquiz') . '</button>';
    echo '</div>';
    echo '<div id="result-container" class="result-container" style="display:none;"></div>';
    echo '<div id="leaderboard-container" class="leaderboard-container"></div>';
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
}

// Include Socket.IO from CDN if not available
echo '<script src="https://cdn.socket.io/4.5.4/socket.io.min.js"></script>';
// Include the app JavaScript
$PAGE->requires->js('/mod/gamifiedquiz/js/app.js');

echo $OUTPUT->footer();

