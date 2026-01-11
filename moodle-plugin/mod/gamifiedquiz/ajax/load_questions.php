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

// Get quiz instance
$gamifiedquiz = $DB->get_record('gamifiedquiz', array('id' => $quizid), '*', MUST_EXIST);

if ($cmid) {
    $cm = get_coursemodule_from_id('gamifiedquiz', $cmid, 0, false, MUST_EXIST);
    $course = $DB->get_record('course', array('id' => $cm->course), '*', MUST_EXIST);
    $context = context_module::instance($cm->id);
    require_login($course, true, $cm);
} else {
    $course = $DB->get_record('course', array('id' => $gamifiedquiz->course), '*', MUST_EXIST);
    require_login($course);
    $context = context_course::instance($course->id);
}

try {
    // First check questions_data field (edited questions)
    if (!empty($gamifiedquiz->questions_data)) {
        $questions = json_decode($gamifiedquiz->questions_data, true);
        if (is_array($questions) && count($questions) > 0) {
            echo json_encode(array(
                'success' => true,
                'questions' => $questions,
                'source' => 'questions_data'
            ));
            exit;
        }
    }
    
    // Try to load from question bank
    require_once($CFG->dirroot . '/question/engine/bank.php');
    require_once($CFG->dirroot . '/question/editlib.php');
    $categoryid = gamifiedquiz_get_question_category($course->id, $gamifiedquiz->id);
    $bank_questions = gamifiedquiz_load_question_bank_questions($categoryid);
    
    if (!empty($bank_questions)) {
        echo json_encode(array(
            'success' => true,
            'questions' => $bank_questions,
            'source' => 'question_bank',
            'count' => count($bank_questions)
        ));
        exit;
    }
    
    // Fallback: load from database (gamifiedquiz_questions table)
    $session_id = 'session_' . $gamifiedquiz->id . '_' . ($cmid ?: 0);
    $db_questions = $DB->get_records('gamifiedquiz_questions', 
        array('gamifiedquizid' => $gamifiedquiz->id),
        'timecreated ASC'
    );
    
    if ($db_questions) {
        $questions = array();
        foreach ($db_questions as $q) {
            $choices = json_decode($q->choices, true);
            $questions[] = array(
                'id' => $q->id,
                'question' => $q->question_text,
                'question_text' => $q->question_text,
                'choices' => $choices,
                'correct_index' => $q->correct_index,
                'difficulty' => $q->difficulty
            );
        }
        
        echo json_encode(array(
            'success' => true,
            'questions' => $questions,
            'source' => 'database',
            'count' => count($questions)
        ));
    } else {
        echo json_encode(array(
            'success' => true,
            'questions' => array(),
            'source' => 'none',
            'message' => 'No questions found'
        ));
    }
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(array(
        'success' => false,
        'error' => $e->getMessage()
    ));
}

