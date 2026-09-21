<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

header('Content-Type: application/json');

try {
    require_once('../../../config.php');
    require_once($CFG->dirroot . '/mod/gamifiedquiz/lib.php');
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(array(
        'success' => false,
        'error' => 'Failed to load Moodle config: ' . $e->getMessage()
    ));
    exit;
}

global $DB, $CFG, $USER;

// Get parameters
$quizid = required_param('quizid', PARAM_INT);
$cmid = optional_param('cmid', 0, PARAM_INT);
$questions_json = required_param('questions', PARAM_RAW);
$category_id = optional_param('category_id', 0, PARAM_INT);
$category_name = optional_param('category_name', '', PARAM_TEXT);
$standard_quiz_id = optional_param('standard_quiz_id', 0, PARAM_INT);
$new_quiz_name = optional_param('new_quiz_name', '', PARAM_TEXT);

// Get quiz instance
$gamifiedquiz = $DB->get_record('gamifiedquiz', array('id' => $quizid), '*', MUST_EXIST);

if ($cmid) {
    $cm = get_coursemodule_from_id('gamifiedquiz', $cmid, 0, false, MUST_EXIST);
    $course = $DB->get_record('course', array('id' => $cm->course), '*', MUST_EXIST);
    $context = context_module::instance($cm->id);
    require_login($course, true, $cm);
    require_capability('mod/gamifiedquiz:addinstance', $context);
} else {
    $course = $DB->get_record('course', array('id' => $gamifiedquiz->course), '*', MUST_EXIST);
    require_login($course);
    $context = context_course::instance($course->id);
    require_capability('mod/gamifiedquiz:addinstance', $context);
}

// Validate sesskey
require_sesskey();

try {
    $questions = json_decode($questions_json, true);

    if (!is_array($questions)) {
        throw new Exception('Invalid questions data');
    }

    foreach ($questions as $q) {
        if (empty($q['question']) || empty($q['choices']) || count($q['choices']) < 2) {
            throw new Exception('Each question must have text and at least 2 choices');
        }
    }

    $saved = gamifiedquiz_sync_questions(
        $gamifiedquiz->id,
        $questions,
        $category_id,
        $category_name,
        $standard_quiz_id,
        $new_quiz_name
    );

    // Fetch updated standard quiz link if available
    $stdquiz = null;
    if ($standard_quiz_id > 0) {
        $stdquiz = $DB->get_record('quiz', array('id' => $standard_quiz_id));
    } else if (!empty($new_quiz_name)) {
        $stdquiz = $DB->get_record('quiz', array('name' => $new_quiz_name, 'course' => $course->id));
    } else {
        $stdquiz = gamifiedquiz_get_or_create_standard_quiz($gamifiedquiz);
    }
    $stdquiz_cmid = 0;
    if ($stdquiz) {
        $cm_rec = get_coursemodule_from_instance('quiz', $stdquiz->id, $course->id);
        $stdquiz_cmid = $cm_rec ? $cm_rec->id : 0;
    }

    echo json_encode(array(
        'success' => true,
        'questions' => $saved,
        'count' => count($saved),
        'quiz_id' => $stdquiz ? (int)$stdquiz->id : 0,
        'quiz_cmid' => (int)$stdquiz_cmid,
        'quiz_url' => $stdquiz_cmid ? (new moodle_url('/mod/quiz/view.php', array('id' => $stdquiz_cmid)))->out(false) : '',
        'message' => 'Questions saved successfully to Question Bank and Standard Quiz'
    ));

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(array(
        'success' => false,
        'error' => $e->getMessage()
    ));
}
