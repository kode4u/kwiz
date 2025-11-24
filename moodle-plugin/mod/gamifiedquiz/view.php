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

// Output starts here
echo $OUTPUT->header();

// Include JavaScript for WebSocket connection
$PAGE->requires->js_init_code("
    window.GAMIFIED_QUIZ_CONFIG = {
        wsUrl: " . json_encode($ws_url) . ",
        jwtToken: " . json_encode($jwt_token) . ",
        sessionId: " . json_encode($session_id) . ",
        role: " . json_encode($role) . ",
        quizId: " . $gamifiedquiz->id . ",
        cmId: " . $cm->id . "
    };
");

if ($is_teacher) {
    // Teacher view
    echo $OUTPUT->heading($gamifiedquiz->name);
    echo html_writer::div('', '', array('id' => 'gamifiedquiz-teacher-app'));
} else {
    // Student view
    echo $OUTPUT->heading($gamifiedquiz->name);
    echo html_writer::div('', '', array('id' => 'gamifiedquiz-student-app'));
}

// Include React/Vue app or vanilla JS
$PAGE->requires->js('/mod/gamifiedquiz/js/app.js');

echo $OUTPUT->footer();

