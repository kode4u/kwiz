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
    // Parse questions JSON
    $questions = json_decode($questions_json, true);
    
    // Debug log
    error_log('save_questions.php - Received JSON: ' . $questions_json);
    error_log('save_questions.php - Parsed questions count: ' . (is_array($questions) ? count($questions) : 'not array'));
    
    if (!is_array($questions)) {
        throw new Exception('Invalid questions data');
    }
    
    // Validate questions (only if not empty)
    foreach ($questions as $q) {
        if (empty($q['question']) || empty($q['choices']) || count($q['choices']) < 2) {
            throw new Exception('Each question must have text and at least 2 choices');
        }
    }
    
    // Save questions_data to quiz instance
    $record = new stdClass();
    $record->id = $gamifiedquiz->id;
    $record->questions_data = json_encode($questions);
    $record->timemodified = time();
    
    $DB->update_record('gamifiedquiz', $record);
    
    echo json_encode(array(
        'success' => true,
        'questions' => $questions,
        'count' => count($questions),
        'message' => 'Questions saved successfully'
    ));
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(array(
        'success' => false,
        'error' => $e->getMessage()
    ));
}

