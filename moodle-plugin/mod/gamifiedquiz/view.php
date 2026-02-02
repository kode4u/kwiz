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

// CSS is now in styles.css - no inline styles needed

// Get user's full name for display
$user_fullname = fullname($USER);

// Compute question screen background from quiz setting
$background_image = isset($gamifiedquiz->background_image) ? trim($gamifiedquiz->background_image) : '';
$background_style = '';
if (!empty($background_image)) {
    if (strpos($background_image, 'predefined:') === 0) {
        $key = substr($background_image, strlen('predefined:'));
        $gradients = array(
            'gradient_blue' => 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'gradient_purple' => 'linear-gradient(135deg, #764ba2 0%, #f093fb 100%)',
            'gradient_green' => 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
            'gradient_orange' => 'linear-gradient(135deg, #f2994a 0%, #f2c94c 100%)',
            'gradient_teal' => 'linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%)'
        );
        if (isset($gradients[$key])) {
            $background_style = $gradients[$key];
        } else if (in_array($key, array('bg1', 'bg2', 'bg3', 'bg4', 'bg5'), true)) {
            $bgurl = $CFG->wwwroot . '/mod/gamifiedquiz/pix/backgrounds/' . $key . '.jpg';
            $background_style = 'url(' . s($bgurl) . ')';
        }
    } else if (strpos($background_image, 'http') === 0) {
        $background_style = 'url(' . s($background_image) . ')';
    }
}
if ($background_style) {
    $background_style = 'background-image: ' . $background_style . '; background-size: cover; background-position: center;';
}

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
    questionsData: ' . json_encode(isset($gamifiedquiz->questions_data) ? $gamifiedquiz->questions_data : '') . ',
    timeLimitPerQuestion: ' . (isset($gamifiedquiz->time_limit_per_question) ? intval($gamifiedquiz->time_limit_per_question) : 60) . ',
    leaderboardTopN: ' . (isset($gamifiedquiz->leaderboard_top_n) ? intval($gamifiedquiz->leaderboard_top_n) : 3) . ',
    questionBackgroundStyle: ' . json_encode($background_style) . '
};
</script>';

// Content is already inside Moodle's standard structure:
// #page-content > #region-main-box > #region-main
// No need to create duplicate wrappers


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
    echo '<button id="generate-questions-btn" class="btn btn-primary gq-btn gq-btn-primary" style="margin-left: 10px;">' . get_string('generate_questions', 'mod_gamifiedquiz') . '</button>';
    echo '<button id="edit-questions-btn" class="btn btn-info gq-btn gq-btn-info" style="margin-left: 10px;">Edit Questions</button>';
    echo '<button id="start-session-btn" class="btn btn-success gq-btn gq-btn-success" style="margin-left: 10px;" disabled>' . get_string('start_session', 'mod_gamifiedquiz') . '</button>';
    echo '<button id="next-question-btn" class="btn btn-secondary gq-btn gq-btn-secondary" style="margin-left: 10px;" disabled>Next Question</button>';
    echo '</div>';
    echo '<div id="session-status" class="session-status" style="display:none;"></div>';
    echo '<div id="questions-container" class="questions-container" style="display:none;"></div>';
    echo '<div id="active-question-display" class="gq-container-lg gq-question-screen" style="display:none; min-height: 400px; position: relative;">';
    echo '<button type="button" id="active-question-fullscreen-btn" class="gq-fullscreen-btn" title="Full screen" aria-label="Full screen" style="position: absolute; top: 10px; right: 10px; z-index: 10; padding: 8px 12px; border-radius: 8px; border: 1px solid #ddd; background: rgba(255,255,255,0.9); cursor: pointer; font-size: 18px;">⛶</button>';
    echo '<div id="active-question-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">';
    echo '<div id="active-question-number" style="font-size: 18px; color: #666; font-weight: bold;"></div>';
    echo '<div style="display: flex; align-items: center; gap: 10px;">';
    echo '<button type="button" id="start-question-timer-btn" class="gq-btn gq-btn-primary" style="display: none; padding: 10px 20px;">Start timer</button>';
    echo '<div id="active-question-timer" class="timer" style="font-size: 24px; font-weight: bold; color: #007bff; background: #e7f3ff; padding: 10px 20px; border-radius: 8px;"></div>';
    echo '</div>';
    echo '</div>';
    echo '<div id="active-question-image" style="text-align: center; margin-bottom: 15px;"></div>';
    echo '<div id="active-question-text" class="question-text" style="font-size: 32px; margin-bottom: 40px; text-align: center; line-height: 1.4;"></div>';
    echo '<div id="active-question-choices" class="choices" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-top: 20px;"></div>';
    echo '</div>';
    echo '<div id="question-results-display" class="gq-container gq-teacher-secondary" style="display:none;"></div>';
    echo '<div id="question-ranking-display" class="gq-container-lg gq-teacher-secondary" style="display:none; margin-top: 20px;">
        <h3 style="text-align: center; margin-bottom: 20px;">Current Rankings</h3>
        <div id="ranking-table-container"></div>
    </div>';
    echo '<div id="leaderboard-container" class="leaderboard-container gq-teacher-secondary" style="display:none;"></div>';
    echo '<div id="final-leaderboard-container" class="gq-container-lg gq-teacher-secondary" style="display:none; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;"></div>';
    echo '</div>';
    echo '</div>';
} else {
    // Student view
    echo '<div class="' . $container_class . '">';
    echo '<div class="gamifiedquiz-student">';
    echo '<h2>' . s($gamifiedquiz->name) . '</h2>';
    echo '<div id="waiting-message" class="waiting">Waiting for teacher to start quiz session...</div>';
    echo '<div id="question-container" class="question-container gq-container-lg gq-question-screen" style="display:none; min-height: 400px; position: relative;">';
    echo '<button type="button" id="question-fullscreen-btn" class="gq-fullscreen-btn" title="Full screen" aria-label="Full screen" style="position: absolute; top: 10px; right: 10px; z-index: 10; padding: 8px 12px; border-radius: 8px; border: 1px solid #ddd; background: rgba(255,255,255,0.9); cursor: pointer; font-size: 18px;">⛶</button>';
    echo '<div id="question-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">';
    echo '<div id="question-number" style="font-size: 18px; color: #666; font-weight: bold;"></div>';
    echo '<div id="timer" class="timer" style="font-size: 24px; font-weight: bold; color: #007bff; background: #e7f3ff; padding: 10px 20px; border-radius: 8px;"></div>';
    echo '</div>';
    echo '<div id="question-image-container" style="text-align: center; margin-bottom: 15px;"></div>';
    echo '<div id="question-text" class="question-text" style="font-size: 32px; margin-bottom: 40px; text-align: center; line-height: 1.4;"></div>';
    echo '<div id="choices" class="choices" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-top: 20px;"></div>';
    echo '</div>';
    echo '<div id="result-container" class="result-container" style="display:none;"></div>';
    echo '<div id="student-answer-results-container" class="gq-container" style="display:none;"></div>';
    echo '<div id="question-comparison-container" class="gq-container" style="display:none;"></div>';
    // Leaderboard container for students (shown after timeout)
    echo '<div id="student-leaderboard-container" class="gq-container-lg" style="display:none; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 12px; margin-top: 20px;"></div>';
    // Final leaderboard container for students
    echo '<div id="student-final-leaderboard-container" class="gq-container-lg" style="display:none; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 12px; margin-top: 20px;"></div>';
    echo '</div>';
    echo '</div>';
}

// Generate Questions Modal with Multi-Category Support
if ($is_teacher) {
    echo '<div id="generate-questions-modal" class="question-editor-modal" style="display:none;">';
    echo '<div class="question-editor-content" style="max-width: 900px; max-height: 90vh; overflow-y: auto;">';
    echo '<span class="generate-questions-close question-editor-close">&times;</span>';
    echo '<h2>Generate Questions</h2>';
    
    echo '<div id="categories-container" style="margin-bottom: 20px;">';
    echo '<h3>Categories</h3>';
    echo '<div id="category-list" style="margin-bottom: 15px;"></div>';
    echo '<button id="add-category-btn" class="btn btn-primary gq-btn gq-btn-primary" style="margin-top: 10px;">Add Category</button>';
    echo '</div>';
    
    echo '<div style="margin-top: 20px; text-align: right; border-top: 2px solid #ddd; padding-top: 15px;">';
    echo '<button id="generate-all-btn" class="btn btn-success gq-btn gq-btn-success">Generate All Questions</button>';
    echo '<button id="cancel-generate-btn" class="btn btn-secondary gq-btn gq-btn-secondary" style="margin-left: 10px;">Cancel</button>';
    echo '</div>';
    echo '</div>';
    echo '</div>';
    
    // Old generate modal (keep for backward compatibility, will be replaced)
    echo '<div id="generate-questions-modal-old" class="question-editor-modal" style="display:none;">';
    echo '<div class="question-editor-content" style="max-width: 600px;">';
    echo '<span class="generate-questions-close question-editor-close">&times;</span>';
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
    echo '<button type="button" id="cancel-generate-btn" class="btn btn-secondary gq-btn gq-btn-secondary">Cancel</button>';
    echo '<button type="submit" id="submit-generate-btn" class="btn btn-primary gq-btn gq-btn-primary">Generate</button>';
    echo '</div>';
    echo '</form>';
    echo '</div>';
    echo '</div>';
    
    // Question Editor Modal
    echo '<div id="question-editor-modal" class="question-editor-modal" style="display:none;">';
    echo '<div class="question-editor-content question-editor-content-with-footer">';
    echo '<div class="question-editor-header">';
    echo '<span class="question-editor-close" style="float: right; font-size: 28px; font-weight: bold; cursor: pointer; color: #aaa;">&times;</span>';
    echo '<h2>Edit Questions</h2>';
    echo '</div>';
    echo '<div class="question-editor-scroll">';
    echo '<div id="question-bank-section" style="margin-bottom: 30px; padding: 20px; background: #f8f9fa; border-radius: 8px;">';
    echo '<h3>Question Bank</h3>';
    echo '<div style="margin-bottom: 15px;">';
    echo '<label for="question-category-select" style="display: block; margin-bottom: 5px; font-weight: bold;">Category:</label>';
    echo '<select id="question-category-select" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px;"><option value="">Loading categories...</option></select>';
    echo '</div>';
    echo '<div id="question-bank-list" style="max-height: 200px; overflow-y: auto; border: 1px solid #ddd; padding: 10px; background: white; border-radius: 4px;"></div>';
    echo '</div>';
    echo '<form id="question-editor-form"></form>';
    echo '</div>';
    echo '<div class="question-editor-footer">';
    echo '<button id="add-new-question-btn" class="btn btn-primary gq-btn gq-btn-primary">Add New Question</button>';
    echo '<button id="save-questions-btn" class="btn btn-success gq-btn gq-btn-success" style="margin-left: 10px;">Save Questions</button>';
    echo '<button id="cancel-edit-btn" class="btn btn-secondary gq-btn gq-btn-secondary" style="margin-left: 10px;">Cancel</button>';
    echo '</div>';
    echo '</div>';
    echo '</div>';
    
    // Loading Dialog Modal
    echo '<div id="loading-modal" class="question-editor-modal" style="display:none;">';
    echo '<div class="question-editor-content gq-container" style="max-width: 400px; text-align: center;">';
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

