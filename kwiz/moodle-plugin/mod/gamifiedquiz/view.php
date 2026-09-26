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

// Find RAG sources and Labels in the current course
$modinfo = get_fast_modinfo($course->id);
$rag_sources = [];
$course_labels = [];
foreach ($modinfo->cms as $cm_item) {
    if ($cm_item->uservisible) {
        if (in_array($cm_item->modname, ['page', 'lesson', 'book', 'resource'])) {
            $rag_sources[] = array(
                'id' => $cm_item->id,
                'name' => $cm_item->name,
                'type' => $cm_item->modname
            );
        } else if ($cm_item->modname === 'label') {
            $label_rec = $DB->get_record('label', array('id' => $cm_item->instance));
            if ($label_rec && !empty($label_rec->intro)) {
                $clean_text = html_to_text($label_rec->intro, 0, false);
                $clean_text = trim(preg_replace('/\s+/', ' ', $clean_text));
                if (!empty($clean_text)) {
                    $display_name = strlen($clean_text) > 60 ? substr($clean_text, 0, 60) . '...' : $clean_text;
                    $course_labels[] = array(
                        'id' => $cm_item->id,
                        'name' => $display_name . ' (Label)',
                        'content' => $clean_text
                    );
                }
            }
        }
    }
}

// Find RAG sections/chapters
$rag_sections = [];
foreach ($modinfo->sections as $sectionnum => $cmids) {
    $section_has_rag = false;
    foreach ($cmids as $sec_cmid) {
        if (isset($modinfo->cms[$sec_cmid])) {
            $cm_item = $modinfo->cms[$sec_cmid];
            if ($cm_item->uservisible && in_array($cm_item->modname, ['page', 'lesson', 'book', 'resource'])) {
                $section_has_rag = true;
                break;
            }
        }
    }
    if ($section_has_rag) {
        $sectioninfo = $modinfo->get_section_info($sectionnum);
        $name = '';
        if ($sectioninfo && !empty($sectioninfo->name)) {
            $name = $sectioninfo->name;
        } else {
            $name = 'Section ' . $sectionnum;
        }
        $rag_sections[] = array(
            'number' => $sectionnum,
            'name' => $name
        );
    }
}

// Fetch grade outcomes
$course_outcomes = [];
require_once($CFG->libdir . '/gradelib.php');
if (class_exists('grade_outcome')) {
    $outcomes = grade_outcome::fetch_all_available($course->id);
    if (!empty($outcomes)) {
        foreach ($outcomes as $outcome) {
            $course_outcomes[] = array(
                'id' => $outcome->id,
                'name' => $outcome->fullname . ' (Outcome)',
                'content' => $outcome->fullname
            );
        }
    }
}

$course_outcomes_options = array_merge($course_labels, $course_outcomes);

// Resolve standard mod_quiz and Question Bank category
$standard_quiz = gamifiedquiz_get_or_create_standard_quiz($gamifiedquiz);
$coursecontext = context_course::instance($course->id);
$default_qbank_catid = gamifiedquiz_get_or_create_question_category($course->id, $gamifiedquiz->name);
$std_quiz_url = new moodle_url('/mod/quiz/view.php', array('id' => $standard_quiz->cmid));
$std_quiz_edit_url = new moodle_url('/mod/quiz/edit.php', array('cmid' => $standard_quiz->cmid));
$qbank_url = new moodle_url('/question/edit.php', array('courseid' => $course->id, 'cat' => $default_qbank_catid . ',' . $coursecontext->id));

// Fetch all course question categories for selection
$course_categories = $DB->get_records_sql(
    "SELECT qc.id, qc.name, COUNT(qbe.id) AS qcount
       FROM {question_categories} qc
  LEFT JOIN {question_bank_entries} qbe ON qbe.questioncategoryid = qc.id
      WHERE qc.contextid = :contextid AND qc.name != :top
   GROUP BY qc.id, qc.name
   ORDER BY qc.name ASC",
    array('contextid' => $coursecontext->id, 'top' => 'top')
);

// Fetch all standard quizzes in course for selection
$course_standard_quizzes = $DB->get_records_sql(
    "SELECT q.id, q.name, cm.id AS cmid, q.sumgrades
       FROM {quiz} q
       JOIN {course_modules} cm ON cm.instance = q.id
       JOIN {modules} m ON m.id = cm.module
      WHERE m.name = :modname AND q.course = :courseid
   ORDER BY q.name ASC",
    array('modname' => 'quiz', 'courseid' => $course->id)
);

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
    courseId: ' . (int)$course->id . ',
    quizId: ' . $gamifiedquiz->id . ',
    cmId: ' . $cm->id . ',
    defaultCategoryId: ' . (int)$default_qbank_catid . ',
    standardQuizId: ' . (int)$standard_quiz->id . ',
    standardQuizCmId: ' . (int)$standard_quiz->cmid . ',
    standardQuizUrl: ' . json_encode($std_quiz_url->out(false)) . ',
    standardQuizEditUrl: ' . json_encode($std_quiz_edit_url->out(false)) . ',
    questionBankUrl: ' . json_encode($qbank_url->out(false)) . ',
    topic: ' . json_encode($gamifiedquiz->topic) . ',
    learningOutcomes: ' . json_encode(isset($gamifiedquiz->learning_outcomes) ? $gamifiedquiz->learning_outcomes : '') . ',
    difficulty: ' . json_encode($gamifiedquiz->difficulty) . ',
    language: ' . json_encode($gamifiedquiz->language) . ',
    quizName: ' . json_encode($gamifiedquiz->name) . ',
    wwwroot: ' . json_encode($CFG->wwwroot) . ',
    sesskey: ' . json_encode(sesskey()) . ',
    template: ' . json_encode(isset($gamifiedquiz->template) ? $gamifiedquiz->template : 'default') . ',
    colorPalette: ' . json_encode(isset($gamifiedquiz->color_palette) ? $gamifiedquiz->color_palette : 'kahoot') . ',
    llmBackend: ' . json_encode(isset($gamifiedquiz->llm_backend) ? $gamifiedquiz->llm_backend : 'openai') . ',
    questionsData: ' . json_encode(isset($gamifiedquiz->questions_data) ? $gamifiedquiz->questions_data : '') . ',
    categoriesData: ' . json_encode(isset($gamifiedquiz->categories_data) ? $gamifiedquiz->categories_data : '') . ',
    timeLimitPerQuestion: ' . (isset($gamifiedquiz->time_limit_per_question) ? intval($gamifiedquiz->time_limit_per_question) : 60) . ',
    leaderboardTopN: ' . (isset($gamifiedquiz->leaderboard_top_n) ? intval($gamifiedquiz->leaderboard_top_n) : 3) . ',
    questionBackgroundStyle: ' . json_encode($background_style) . ',
    ragSources: ' . json_encode($rag_sources) . ',
    courseOutcomesOptions: ' . json_encode($course_outcomes_options) . '
};
</script>';

// Content is already inside Moodle's standard structure:
// #page-content > #region-main-box > #region-main
// No need to create duplicate wrappers

if ($is_teacher) {
    // Teacher view - AI Assessment & Generation Studio
    echo '<div class="' . $container_class . '">';
    echo '<div class="gamifiedquiz-teacher">';

    // Studio Card with unified sleek Top Appbar
    echo '<div class="card shadow-sm border-0 mb-4" style="border-radius: 12px; border: 1px solid #e2e8f0; overflow: visible;">';
    echo '  <div class="card-header py-3 px-4" style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: #fff; border-top-left-radius: 12px; border-top-right-radius: 12px; position: relative;">';
    echo '    <div style="display: flex; justify-content: space-between; align-items: center; gap: 16px;">';
    echo '      <div>';
    echo '        <h4 style="margin: 0; color: #ffffff; font-size: 1.25rem; font-weight: 700; display: flex; align-items: center; gap: 8px;">';
    echo '          <span style="color: #f59e0b;">⚡</span> AI Question Generation Studio';
    echo '        </h4>';
    echo '        <div style="color: #94a3b8; font-size: 0.82rem; margin-top: 3px;">';
    echo '          Self-Hosted RAG Pipeline &bull; Python AST Verification &bull; Native Question Bank &amp; Standard Quiz Integration';
    echo '        </div>';
    echo '      </div>';
    echo '      <div style="position: relative;">';
    echo '        <button type="button" id="studio-appbar-settings-btn" title="Settings &amp; Tools" style="background: rgba(255, 255, 255, 0.12); border: 1px solid rgba(255, 255, 255, 0.25); color: #ffffff; border-radius: 8px; width: 40px; height: 40px; display: inline-flex; align-items: center; justify-content: center; font-size: 1.25rem; cursor: pointer; transition: all 0.2s ease; outline: none;">';
    echo '          ⚙️';
    echo '        </button>';
    echo '        <div id="studio-appbar-dropdown" style="display: none; position: absolute; right: 0; top: calc(100% + 8px); background: #ffffff; min-width: 320px; border-radius: 10px; box-shadow: 0 12px 28px rgba(0,0,0,0.18); border: 1px solid #e2e8f0; z-index: 1050; padding: 12px; color: #1e293b; font-family: -apple-system, BlinkMacSystemFont, sans-serif;">';
    echo '          <div style="font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #64748b; margin-bottom: 8px;">Course Quiz &amp; Question Bank</div>';
    echo '          <a id="header-open-quiz-btn" href="' . $std_quiz_url->out() . '" target="_blank" style="display: flex; align-items: center; gap: 10px; padding: 8px 10px; border-radius: 6px; text-decoration: none; color: #1e293b; font-weight: 600; font-size: 0.88rem; transition: background 0.15s;" onmouseover="this.style.background=\'#f1f5f9\'" onmouseout="this.style.background=\'transparent\'">';
    echo '            <span style="font-size: 1.1rem;">📝</span> Open Standard Quiz';
    echo '          </a>';
    echo '          <a id="header-manage-quiz-btn" href="' . $std_quiz_edit_url->out() . '" target="_blank" style="display: flex; align-items: center; gap: 10px; padding: 8px 10px; border-radius: 6px; text-decoration: none; color: #1e293b; font-size: 0.88rem; transition: background 0.15s;" onmouseover="this.style.background=\'#f1f5f9\'" onmouseout="this.style.background=\'transparent\'">';
    echo '            <span style="font-size: 1.1rem;">⚙️</span> Manage Quiz Questions &amp; Slots';
    echo '          </a>';
    echo '          <a id="header-qbank-btn" href="' . $qbank_url->out() . '" target="_blank" style="display: flex; align-items: center; gap: 10px; padding: 8px 10px; border-radius: 6px; text-decoration: none; color: #1e293b; font-size: 0.88rem; transition: background 0.15s;" onmouseover="this.style.background=\'#f1f5f9\'" onmouseout="this.style.background=\'transparent\'">';
    echo '            <span style="font-size: 1.1rem;">📚</span> Browse Question Bank';
    echo '          </a>';
    echo '          <div style="height: 1px; background: #e2e8f0; margin: 10px 0;"></div>';
    echo '          <div style="font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #64748b; margin-bottom: 8px;">Telemetry &amp; Evaluation</div>';
    echo '          <a href="http://localhost:5001/dashboard" target="_blank" style="display: flex; align-items: center; gap: 10px; padding: 8px 10px; border-radius: 6px; text-decoration: none; color: #0284c7; font-weight: 600; font-size: 0.88rem; background: #f0f9ff; transition: background 0.15s;" onmouseover="this.style.background=\'#e0f2fe\'" onmouseout="this.style.background=\'#f0f9ff\'">';
    echo '            <span style="font-size: 1.1rem;">📊</span> Evaluation Dashboard';
    echo '          </a>';
    echo '          <div style="height: 1px; background: #e2e8f0; margin: 10px 0;"></div>';
    echo '          <div style="font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #64748b; margin-bottom: 6px;">Quiz Parameters &amp; Engine</div>';
    echo '          <div style="font-size: 0.82rem; color: #475569; padding: 2px 10px;"><strong>Topic:</strong> ' . s($gamifiedquiz->topic) . '</div>';
    echo '          <div style="font-size: 0.82rem; color: #475569; padding: 2px 10px;"><strong>Difficulty:</strong> ' . ucfirst($gamifiedquiz->difficulty) . ' &bull; <strong>Lang:</strong> ' . strtoupper($gamifiedquiz->language) . '</div>';
    echo '          <div style="font-size: 0.82rem; color: #475569; padding: 2px 10px;"><strong>Model:</strong> Qwen2.5-Coder-7B (Local)</div>';
    echo '          <div style="font-size: 0.82rem; color: #16a34a; padding: 2px 10px; font-weight: 600;">✓ AST Code Verified</div>';
    echo '        </div>';
    echo '      </div>';
    echo '    </div>';
    echo '  </div>';
    echo '<script>
    document.addEventListener("DOMContentLoaded", function() {
        var sBtn = document.getElementById("studio-appbar-settings-btn");
        var sMenu = document.getElementById("studio-appbar-dropdown");
        if (sBtn && sMenu) {
            sBtn.addEventListener("click", function(e) {
                e.stopPropagation();
                sMenu.style.display = (sMenu.style.display === "block") ? "none" : "block";
            });
            document.addEventListener("click", function(e) {
                if (!sMenu.contains(e.target) && e.target !== sBtn) {
                    sMenu.style.display = "none";
                }
            });
        }
    });
    </script>';

    echo '  <div class="card-body p-4" style="background: #ffffff;">';

    // Step 1: Target Destination (Category & Quiz)
    echo '    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 18px; margin-bottom: 22px;">';
    echo '      <h6 style="color: #475569; font-weight: 700; text-transform: uppercase; font-size: 0.8rem; letter-spacing: 0.5px; margin-bottom: 14px;">';
    echo '        📍 1. Target Destination in Moodle';
    echo '      </h6>';
    echo '      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">';

    // Category dropdown
    echo '        <div>';
    echo '          <label for="studio-category-select" style="display: block; font-weight: 600; color: #1e293b; margin-bottom: 6px;">Question Bank Category:</label>';
    echo '          <select id="studio-category-select" class="form-select form-control" style="width: 100%; border-radius: 8px; font-size: 0.95rem; padding: 8px 12px;">';
    foreach ($course_categories as $cat) {
        $sel = ($cat->id == $default_qbank_catid) ? ' selected' : '';
        echo '            <option value="' . (int)$cat->id . '"' . $sel . '>📁 ' . s($cat->name) . ' (' . (int)$cat->qcount . ' questions)</option>';
    }
    echo '            <option value="__new__">➕ [Create New Category...]</option>';
    echo '          </select>';
    echo '          <div id="studio-new-category-wrapper" style="display: none; margin-top: 8px;">';
    echo '            <input type="text" id="studio-new-category-name" class="form-control" placeholder="Enter new category name (e.g., Python Control Flow)..." style="width: 100%; border-radius: 8px; padding: 8px 12px; border: 1px solid #4f46e5;">';
    echo '          </div>';
    echo '          <small style="color: #64748b; font-size: 0.82rem; display: block; margin-top: 4px;">Saved questions are placed in this Moodle Question Bank category.</small>';
    echo '        </div>';

    // Standard Quiz dropdown
    echo '        <div>';
    echo '          <label for="studio-quiz-select" style="display: block; font-weight: 600; color: #1e293b; margin-bottom: 6px;">Target Standard Quiz (mod_quiz):</label>';
    echo '          <select id="studio-quiz-select" class="form-select form-control" style="width: 100%; border-radius: 8px; font-size: 0.95rem; padding: 8px 12px;">';
    foreach ($course_standard_quizzes as $q) {
        $sel = ($q->id == $standard_quiz->id) ? ' selected' : '';
        echo '            <option value="' . (int)$q->id . '" data-cmid="' . (int)$q->cmid . '"' . $sel . '>📝 ' . s($q->name) . ' (sumgrades: ' . (float)$q->sumgrades . ')</option>';
    }
    echo '            <option value="__new__">➕ [Create New Standard Quiz...]</option>';
    echo '          </select>';
    echo '          <div id="studio-new-quiz-wrapper" style="display: none; margin-top: 8px;">';
    echo '            <input type="text" id="studio-new-quiz-name" class="form-control" placeholder="Enter new quiz name (e.g., Midterm Python Quiz)..." style="width: 100%; border-radius: 8px; padding: 8px 12px; border: 1px solid #4f46e5;">';
    echo '          </div>';
    echo '          <small style="color: #64748b; font-size: 0.82rem; display: block; margin-top: 4px;">Questions are added as active slots with automatic sumgrades calculation.</small>';
    echo '        </div>';

    echo '      </div>';
    echo '    </div>';

    // Step 2: Generation Setup
    echo '    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 18px; margin-bottom: 22px;">';
    echo '      <h6 style="color: #475569; font-weight: 700; text-transform: uppercase; font-size: 0.8rem; letter-spacing: 0.5px; margin-bottom: 14px;">';
    echo '        ⚙️ 2. Generation Parameters';
    echo '      </h6>';

    // RAG source
    echo '      <div style="margin-bottom: 14px;">';
    echo '        <label for="studio-rag-source" style="display: block; font-weight: 600; color: #1e293b; margin-bottom: 6px;">Course Context (RAG Grounding):</label>';
    echo '        <select id="studio-rag-source" class="form-select form-control" style="width: 100%; border-radius: 8px; font-size: 0.95rem; padding: 8px 12px;">';
    echo '          <option value="">-- No RAG (Generate from topic / learning outcomes only) --</option>';
    echo '          <option value="auto">Auto-detect (Current / Preceding Course Activity)</option>';
    if (!empty($rag_sections)) {
        echo '          <optgroup label="Course Chapters / Sections">';
        foreach ($rag_sections as $sec) {
            echo '            <option value="section_' . (int)$sec['number'] . '">Full Chapter: ' . s($sec['name']) . '</option>';
        }
        echo '          </optgroup>';
    }
    if (!empty($rag_sources)) {
        echo '          <optgroup label="Individual Course Activities / Files">';
        foreach ($rag_sources as $src) {
            $type_label = ucfirst($src['type']);
            echo '            <option value="cmid_' . (int)$src['id'] . '">' . s($src['name']) . ' (' . $type_label . ')</option>';
        }
        echo '          </optgroup>';
    }
    echo '        </select>';
    echo '      </div>';

    // Topic input
    echo '      <div style="margin-bottom: 14px;">';
    echo '        <label for="studio-topic-input" style="display: block; font-weight: 600; color: #1e293b; margin-bottom: 6px;">Programming Topic / Target Concepts:</label>';
    echo '        <input type="text" id="studio-topic-input" class="form-control" style="width: 100%; border-radius: 8px; font-size: 0.95rem; padding: 8px 12px;" value="' . s($gamifiedquiz->topic) . '" placeholder="e.g. Python Loops, While, Range, Break/Continue">';
    echo '      </div>';

    // Row: Count, Difficulty, Language
    echo '      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; margin-bottom: 14px;">';
    echo '        <div>';
    echo '          <label for="studio-count-select" style="display: block; font-weight: 600; color: #1e293b; margin-bottom: 6px;">Number of Questions:</label>';
    echo '          <select id="studio-count-select" class="form-select form-control" style="width: 100%; border-radius: 8px; padding: 8px 12px;">';
    echo '            <option value="1">1 Question (Quick test)</option>';
    echo '            <option value="3">3 Questions</option>';
    echo '            <option value="5" selected>5 Questions</option>';
    echo '            <option value="10">10 Questions</option>';
    echo '            <option value="15">15 Questions</option>';
    echo '            <option value="20">20 Questions</option>';
    echo '          </select>';
    echo '        </div>';
    echo '        <div>';
    echo '          <label for="studio-difficulty-select" style="display: block; font-weight: 600; color: #1e293b; margin-bottom: 6px;">Difficulty Level:</label>';
    echo '          <select id="studio-difficulty-select" class="form-select form-control" style="width: 100%; border-radius: 8px; padding: 8px 12px;">';
    echo '            <option value="easy"' . ($gamifiedquiz->difficulty === 'easy' ? ' selected' : '') . '>Easy (Knowledge & Syntax)</option>';
    echo '            <option value="medium"' . ($gamifiedquiz->difficulty === 'medium' ? ' selected' : '') . '>Medium (Tracing & Output)</option>';
    echo '            <option value="hard"' . ($gamifiedquiz->difficulty === 'hard' ? ' selected' : '') . '>Hard (Edge Cases & Reasoning)</option>';
    echo '          </select>';
    echo '        </div>';
    echo '        <div>';
    echo '          <label for="studio-language-select" style="display: block; font-weight: 600; color: #1e293b; margin-bottom: 6px;">Language:</label>';
    echo '          <select id="studio-language-select" class="form-select form-control" style="width: 100%; border-radius: 8px; padding: 8px 12px;">';
    echo '            <option value="en"' . ($gamifiedquiz->language === 'en' ? ' selected' : '') . '>English</option>';
    echo '            <option value="km"' . ($gamifiedquiz->language === 'km' ? ' selected' : '') . '>Khmer (ភាសាខ្មែរ)</option>';
    echo '          </select>';
    echo '        </div>';
    echo '      </div>';

    // Collapsible custom snippet
    echo '      <div style="margin-top: 10px;">';
    echo '        <button type="button" id="studio-toggle-custom-content" class="btn btn-link btn-sm" style="padding: 0; color: #4f46e5; text-decoration: none; font-weight: 600; font-size: 0.88rem;">';
    echo '          ▶ Add Custom Code Snippet or Syllabus Notes (Optional)';
    echo '        </button>';
    echo '        <div id="studio-custom-content-wrapper" style="display: none; margin-top: 8px;">';
    echo '          <textarea id="studio-custom-content" class="form-control" rows="4" placeholder="Paste custom Python code snippet, syllabus notes, or specific problem requirements..." style="font-family: monospace; font-size: 0.88rem; border-radius: 8px; padding: 10px;"></textarea>';
    echo '        </div>';
    echo '      </div>';

    // Action Button
    echo '      <div style="text-align: center; margin-top: 22px;">';
    echo '        <button id="studio-generate-btn" type="button" class="btn btn-primary btn-lg" style="background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); border: none; font-weight: 600; padding: 14px 38px; border-radius: 8px; box-shadow: 0 4px 14px rgba(79, 70, 229, 0.35); font-size: 1.05rem; cursor: pointer;">';
    echo '          ✨ Generate Questions';
    echo '        </button>';
    echo '      </div>';
    echo '    </div>';

    // Progress box
    echo '    <div id="studio-progress-box" style="display: none; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 20px; margin-bottom: 22px;">';
    echo '      <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 12px;">';
    echo '        <div class="spinner" style="border: 4px solid #dcfce7; border-top: 4px solid #16a34a; border-radius: 50%; width: 32px; height: 32px; animation: spin 1s linear infinite; flex-shrink: 0;"></div>';
    echo '        <div style="flex-grow: 1;">';
    echo '          <h5 id="studio-progress-title" style="margin: 0; color: #166534; font-weight: 700; font-size: 1.1rem;">Generating Course-Grounded Questions...</h5>';
    echo '          <span id="studio-progress-timer" style="font-size: 0.85rem; color: #15803d;">Elapsed: 00:00</span>';
    echo '        </div>';
    echo '        <span id="studio-progress-percent" style="font-size: 1.1rem; font-weight: 700; color: #166534;">0%</span>';
    echo '      </div>';
    echo '      <div style="width: 100%; height: 10px; background: #e2e8f0; border-radius: 5px; overflow: hidden; margin-bottom: 8px;">';
    echo '        <div id="studio-progress-bar" style="width: 10%; height: 100%; background: linear-gradient(90deg, #22c55e, #16a34a); transition: width 0.4s ease; border-radius: 5px;"></div>';
    echo '      </div>';
    echo '      <div style="display: flex; justify-content: space-between; align-items: center;">';
    echo '        <span id="studio-progress-status" style="font-size: 0.85rem; color: #475569;">Extracting course materials and querying local LLM (Qwen2.5-Coder-7B)...</span>';
    echo '        <button type="button" id="studio-toggle-log-btn" class="btn btn-sm btn-outline-secondary" style="font-size: 0.75rem; padding: 2px 8px; border-radius: 4px;">Show Logs</button>';
    echo '      </div>';
    echo '      <div id="studio-log-console" style="display: none; margin-top: 12px; height: 130px; overflow-y: auto; background: #0f172a; color: #38bdf8; font-family: monospace; font-size: 0.78rem; padding: 10px 12px; border-radius: 6px; white-space: pre-wrap; line-height: 1.4;"></div>';
    echo '    </div>';

    // Preview & AST validation section
    echo '    <div id="studio-preview-section" style="display: none; margin-bottom: 22px;">';
    echo '      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 2px solid #e2e8f0;">';
    echo '        <div>';
    echo '          <div style="display: flex; align-items: center; gap: 8px;">';
    echo '            <h5 style="margin: 0; color: #1e293b; font-weight: 700; font-size: 1.15rem;">📋 Generated Questions Review (<span id="studio-preview-count">0</span>)</h5>';
    echo '            <span id="studio-iteration-badge" class="badge" style="background: #4338ca; color: #fff; font-size: 0.82rem; padding: 4px 8px; border-radius: 6px; display: none;">Iteration #0</span>';
    echo '            <a id="studio-iteration-dashboard-btn" href="http://localhost:5001/dashboard" target="_blank" class="btn btn-sm btn-outline-primary" style="display: none; padding: 3px 8px; font-size: 0.78rem; border-radius: 6px; text-decoration: none;">📊 View Dashboard</a>';
    echo '          </div>';
    echo '          <div style="font-size: 0.85rem; color: #64748b; margin-top: 2px;">Inspect questions, verified by Python AST validation. Click below to push directly into Moodle Question Bank &amp; Quiz.</div>';
    echo '        </div>';
    echo '        <div style="display: flex; gap: 8px;">';
    echo '          <button type="button" id="studio-push-btn" class="btn btn-success" style="font-weight: 600; padding: 9px 22px; border-radius: 8px; background: #16a34a; border-color: #15803d;">🚀 Save &amp; Push to Question Bank &amp; Quiz</button>';
    echo '          <button type="button" id="studio-discard-btn" class="btn btn-outline-secondary" style="border-radius: 8px;">Discard</button>';
    echo '        </div>';
    echo '      </div>';
    echo '      <div id="studio-questions-list"></div>';
    echo '      <div style="text-align: right; margin-top: 18px;">';
    echo '        <button type="button" id="studio-push-btn-bottom" class="btn btn-success btn-lg" style="font-weight: 600; padding: 12px 32px; border-radius: 8px; background: #16a34a; border-color: #15803d;">🚀 Save &amp; Push to Question Bank &amp; Quiz</button>';
    echo '      </div>';
    echo '    </div>';

    // Success confirmation box
    echo '    <div id="studio-success-box" style="display: none; background: #f0fdf4; border: 1px solid #86efac; border-radius: 12px; padding: 22px; margin-bottom: 22px;">';
    echo '      <div style="display: flex; align-items: flex-start; gap: 16px;">';
    echo '        <div style="font-size: 2.2rem; line-height: 1;">🎉</div>';
    echo '        <div style="flex-grow: 1;">';
    echo '          <h5 style="color: #15803d; font-weight: 700; margin: 0 0 6px 0; font-size: 1.2rem;">Questions Successfully Saved &amp; Linked!</h5>';
    echo '          <p id="studio-success-message" style="margin: 0 0 16px 0; color: #334155; font-size: 0.95rem; line-height: 1.5;">';
    echo '            The questions have been permanently stored in Moodle\'s Question Bank and added as active slots in your Quiz module. All question grades and sumgrades were recomputed automatically.';
    echo '          </p>';
    echo '          <div style="display: flex; gap: 10px; flex-wrap: wrap;">';
    echo '            <a id="studio-success-quiz-link" href="' . $std_quiz_url->out() . '" class="btn btn-primary" style="background-color: #4f46e5; border-color: #4338ca; font-weight: 600; border-radius: 8px; padding: 8px 18px;">📝 Open &amp; Attempt Quiz</a>';
    echo '            <a id="studio-success-edit-link" href="' . $std_quiz_edit_url->out() . '" class="btn btn-outline-primary" style="color: #4f46e5; border-color: #4f46e5; font-weight: 600; border-radius: 8px; padding: 8px 18px;">⚙️ Manage Quiz Questions</a>';
    echo '            <a id="studio-success-qbank-link" href="' . $qbank_url->out() . '" class="btn btn-outline-secondary" style="font-weight: 600; border-radius: 8px; padding: 8px 18px;">📚 View in Question Bank</a>';
    echo '            <a id="studio-success-dashboard-link" href="http://localhost:5001/dashboard" target="_blank" class="btn btn-outline-info" style="font-weight: 600; border-radius: 8px; padding: 8px 18px;">📊 View Iteration Logs in Dashboard</a>';
    echo '          </div>';
    echo '        </div>';
    echo '      </div>';
    echo '    </div>';

    echo '  </div>'; // .card-body
    echo '</div>'; // .card

    // Hidden legacy controls so any existing scripts do not break
    echo '<div style="display: none;">';
    echo '<button id="generate-questions-btn">Generate</button>';
    echo '<button id="edit-questions-btn">Edit</button>';
    echo '<button id="start-session-btn">Start</button>';
    echo '<button id="next-question-btn">Next</button>';
    echo '<div id="session-status"></div>';
    echo '<div id="questions-container"></div>';
    echo '<div id="active-question-display"></div>';
    echo '<div id="question-results-display"></div>';
    echo '<div id="question-ranking-display"></div>';
    echo '<div id="leaderboard-container"></div>';
    echo '<div id="final-leaderboard-container"></div>';
    echo '</div>';
    echo '</div>';
    echo '</div>';
} else {
    // Student view - direct assessment access (no gamification lobby)
    echo '<div class="' . $container_class . '">';
    echo '<div class="gamifiedquiz-student">';
    echo '<h2>' . s($gamifiedquiz->name) . '</h2>';
    echo '<div class="card p-4 my-4 text-center" style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 12px; max-width: 620px; margin: 20px auto; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.07);">';
    echo '  <div style="font-size: 3.5rem; margin-bottom: 15px;">📝</div>';
    echo '  <h3 style="color: #1e293b; font-weight: 700; margin-bottom: 12px;">Standard Course Quiz</h3>';
    echo '  <p style="color: #64748b; font-size: 1.05rem; line-height: 1.5; margin-bottom: 25px;">';
    echo '    This assessment is configured as a standard Moodle Quiz module. You can start or resume your assessment attempt directly below.';
    echo '  </p>';
    echo '  <div>';
    echo '    <a href="' . $std_quiz_url->out() . '" class="btn btn-primary btn-lg" style="padding: 12px 36px; font-size: 1.15rem; font-weight: 600; border-radius: 8px; background: #4f46e5; border-color: #4338ca; text-decoration: none; display: inline-block;">';
    echo '      Attempt Quiz Now ➜';
    echo '    </a>';
    echo '  </div>';
    echo '</div>';
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

    echo '<div id="lesson-content-section" style="margin-bottom: 20px; padding: 15px; background: #f8f9fa; border-radius: 8px; border: 1px solid #ddd;">';
    echo '<label for="generate-rag-source" style="display: block; margin-bottom: 5px; font-weight: bold;">RAG Context (Course Materials):</label>';
    echo '<select id="generate-rag-source" name="rag_source" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px; margin-bottom: 15px;">';
    echo '<option value="">-- Do not use RAG (generate from topic/outcomes only) --</option>';
    echo '<option value="auto">Auto-detect (Current/Preceding Activity)</option>';
    
    if (!empty($rag_sections)) {
        echo '<optgroup label="Chapters / Sections (Aggregated)">';
        foreach ($rag_sections as $sec) {
            echo '<option value="section_' . $sec['number'] . '">Full Chapter: ' . s($sec['name']) . '</option>';
        }
        echo '</optgroup>';
    }
    
    if (!empty($rag_sources)) {
        echo '<optgroup label="Individual Activities / Files">';
        foreach ($rag_sources as $src) {
            $type_label = ucfirst($src['type']);
            echo '<option value="cmid_' . $src['id'] . '">' . s($src['name']) . ' (' . $type_label . ')</option>';
        }
        echo '</optgroup>';
    }
    echo '</select>';
    echo '<div id="rag-nested-selection-container" style="display: none; margin-bottom: 15px; padding: 10px; background: #e9ecef; border-radius: 6px; border: 1px solid #ced4da; flex-direction: row; gap: 10px;">';
    echo '  <div style="flex: 1;">';
    echo '    <label for="rag-topic-select" style="display: block; margin-bottom: 5px; font-weight: bold; font-size: 13px;">Topic / Page:</label>';
    echo '    <select id="rag-topic-select" style="width: 100%; padding: 6px; border: 1px solid #ddd; border-radius: 4px; font-size: 13px;"><option value="">-- All Topics --</option></select>';
    echo '  </div>';
    echo '  <div id="rag-subitem-wrapper" style="flex: 1; display: none;">';
    echo '    <label for="rag-subitem-select" style="display: block; margin-bottom: 5px; font-weight: bold; font-size: 13px;">Subitem / Subchapter:</label>';
    echo '    <select id="rag-subitem-select" style="width: 100%; padding: 6px; border: 1px solid #ddd; border-radius: 4px; font-size: 13px;"><option value="">-- All Subitems --</option></select>';
    echo '  </div>';
    echo '</div>';
    echo '<div style="margin-bottom: 12px; padding: 10px; background: #ffffff; border: 1px dashed #cbd5e1; border-radius: 6px;">';
    echo '  <label for="generate-file-upload" style="display: block; margin-bottom: 4px; font-weight: bold; font-size: 13px;">📁 Or upload course material directly (PDF, PPTX, DOCX, TXT):</label>';
    echo '  <input type="file" id="generate-file-upload" accept=".pdf,.pptx,.ppt,.docx,.doc,.txt,.md" style="font-size: 13px;">';
    echo '  <div id="file-upload-status" style="font-size: 12px; color: #0284c7; margin-top: 4px; display: none;"></div>';
    echo '</div>';
    echo '<label for="generate-lesson-content" style="display: block; margin-bottom: 5px; font-weight: bold;">Or paste custom lesson content: <span style="font-weight: normal; color: #666;">(' . get_string('optional', 'core') . ')</span></label>';
    echo '<textarea id="generate-lesson-content" name="lesson" rows="6" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px; resize: vertical;" placeholder="' . s(get_string('lesson_content_placeholder', 'mod_gamifiedquiz')) . '"></textarea>';
    echo '<p style="margin: 8px 0 0; font-size: 13px; color: #666;">' . get_string('lesson_content_help', 'mod_gamifiedquiz') . '</p>';
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
    echo '<label for="generate-data" style="display: block; margin-bottom: 5px; font-weight: bold;">' . get_string('lesson_content', 'mod_gamifiedquiz') . ' <span style="font-weight: normal; color: #666;">(' . get_string('optional', 'core') . ')</span></label>';
    echo '<textarea id="generate-data" name="data" rows="8" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px; resize: vertical;" placeholder="' . s(get_string('lesson_content_placeholder', 'mod_gamifiedquiz')) . '"></textarea>';
    echo '<p style="margin: 8px 0 0; font-size: 13px; color: #666;">' . get_string('lesson_content_help', 'mod_gamifiedquiz') . '</p>';
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
    
    // Enhanced Loading Dialog Modal
    echo '<div id="loading-modal" class="question-editor-modal" style="display:none; align-items: center; justify-content: center;">';
    echo '<div class="question-editor-content gq-container" style="max-width: 580px; width: 90%; text-align: left; padding: 25px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.25); position: relative;">';
    echo '<div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">';
    echo '<div class="spinner" style="border: 4px solid #f3f3f3; border-top: 4px solid #007bff; border-radius: 50%; width: 36px; height: 36px; animation: spin 1s linear infinite; flex-shrink: 0;"></div>';
    echo '<div style="flex-grow: 1;">';
    echo '<h3 style="margin: 0; font-size: 1.25rem; font-weight: 700; color: #1e293b;">Generating Questions...</h3>';
    echo '<span id="gen-timer-text" style="font-size: 0.85rem; color: #64748b;">Elapsed: 00:00</span>';
    echo '</div>';
    echo '</div>';
    
    // Progress Bar
    echo '<div style="margin-bottom: 12px;">';
    echo '<div style="display: flex; justify-content: space-between; font-size: 0.85rem; font-weight: 600; margin-bottom: 6px; color: #334155;">';
    echo '<span id="loading-status">Initializing LLM generation...</span>';
    echo '<span id="gen-progress-percent">0%</span>';
    echo '</div>';
    echo '<div style="width: 100%; height: 10px; background: #e2e8f0; border-radius: 5px; overflow: hidden;">';
    echo '<div id="gen-progress-bar-inner" style="width: 0%; height: 100%; background: linear-gradient(90deg, #3b82f6, #1d4ed8); transition: width 0.4s ease; border-radius: 5px;"></div>';
    echo '</div>';
    echo '</div>';

    // Toggle Log Console Button
    echo '<div style="display: flex; justify-content: space-between; align-items: center; margin-top: 15px;">';
    echo '<button id="toggle-gen-logs-btn" type="button" class="btn btn-sm btn-outline-secondary" style="font-size: 0.8rem; padding: 4px 10px; border-radius: 6px; cursor: pointer;">Show LLM Logs 📜</button>';
    echo '<span style="font-size: 0.75rem; color: #94a3b8;">Local GPU / RAG Worker Active</span>';
    echo '</div>';

    // Log Console Container
    echo '<div id="gen-log-console-wrap" style="display: none; margin-top: 12px;">';
    echo '<div id="gen-log-console" style="height: 150px; overflow-y: auto; background: #0f172a; color: #38bdf8; font-family: monospace; font-size: 0.78rem; padding: 10px 12px; border-radius: 6px; border: 1px solid #334155; white-space: pre-wrap; line-height: 1.4;"></div>';
    echo '</div>';

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
// Cache-bust app.js when the file changes (do not require version.php — $plugin is unset outside upgrade).
$appjspath = $CFG->dirroot . '/mod/gamifiedquiz/js/app.js';
$appjsver = is_readable($appjspath) ? filemtime($appjspath) : time();
$PAGE->requires->js('/mod/gamifiedquiz/js/app.js?v=' . $appjsver);

echo $OUTPUT->footer();

