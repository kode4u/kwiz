<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

require_once('../../../config.php');
require_once($CFG->dirroot . '/mod/gamifiedquiz/lib.php');

// Get parameters
$quizid = required_param('quizid', PARAM_INT);
$cmid = optional_param('cmid', 0, PARAM_INT);

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

// Generate questions
try {
    $questions = gamifiedquiz_generate_questions(
        $gamifiedquiz->topic,
        $gamifiedquiz->difficulty,
        5, // Number of questions
        $gamifiedquiz->language
    );

    header('Content-Type: application/json');

    if ($questions === false || empty($questions)) {
        http_response_code(500);
        echo json_encode(array(
            'success' => false,
            'error' => 'Failed to generate questions. Please check LLM API configuration and ensure the API is running at: ' . get_config('mod_gamifiedquiz', 'llmapi_url')
        ));
        exit;
    }

    // Save questions to database
    $session_id = 'session_' . $gamifiedquiz->id . '_' . ($cmid ?: time());
    
    foreach ($questions as $index => $question) {
        // Handle different question formats
        $question_text = $question['question'] ?? $question['question_text'] ?? '';
        $choices = $question['choices'] ?? array();
        $correct_index = $question['correct_index'] ?? 0;
        
        if (empty($question_text) || empty($choices)) {
            continue; // Skip invalid questions
        }
        
        $record = new stdClass();
        $record->gamifiedquizid = $gamifiedquiz->id;
        $record->session_id = $session_id;
        $record->question_text = $question_text;
        $record->choices = json_encode($choices);
        $record->correct_index = $correct_index;
        $record->difficulty = $gamifiedquiz->difficulty;
        $record->timecreated = time();
        
        $DB->insert_record('gamifiedquiz_questions', $record);
    }
    
    echo json_encode(array(
        'success' => true,
        'questions' => $questions,
        'session_id' => $session_id,
        'count' => count($questions)
    ));
    
} catch (Exception $e) {
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode(array(
        'success' => false,
        'error' => 'Error generating questions: ' . $e->getMessage()
    ));
}

