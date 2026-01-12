<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

header('Content-Type: application/json');

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

try {
    require_once('../../../config.php');
    require_once($CFG->dirroot . '/mod/gamifiedquiz/lib.php');
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(array(
        'success' => false,
        'error' => 'Failed to load Moodle config: ' . $e->getMessage(),
        'file' => basename($e->getFile()),
        'line' => $e->getLine()
    ));
    exit;
}

global $DB, $CFG, $USER;

// Get parameters
$quizid = required_param('quizid', PARAM_INT);
$cmid = optional_param('cmid', 0, PARAM_INT);

// Get quiz instance
$gamifiedquiz = $DB->get_record('gamifiedquiz', array('id' => $quizid), '*', MUST_EXIST);

// Get course and context
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

// Ensure course is available
if (empty($course) || empty($course->id)) {
    http_response_code(500);
    echo json_encode(array(
        'success' => false,
        'error' => 'Course not found'
    ));
    exit;
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
    try {
        if (file_exists($CFG->dirroot . '/question/engine/bank.php')) {
            require_once($CFG->dirroot . '/question/engine/bank.php');
        }
        if (file_exists($CFG->dirroot . '/question/editlib.php')) {
            require_once($CFG->dirroot . '/question/editlib.php');
        }
        
        // Check if quiz has a specific question category set
        // Use property_exists to check if field exists (in case upgrade hasn't run)
        $categoryid = 0;
        if (property_exists($gamifiedquiz, 'question_category') && isset($gamifiedquiz->question_category) && $gamifiedquiz->question_category > 0) {
            $categoryid = $gamifiedquiz->question_category;
        } else {
            // Auto-create category if not set
            try {
                $categoryid = gamifiedquiz_get_question_category($course->id, $gamifiedquiz->id);
            } catch (Exception $cat_error) {
                error_log("Gamified Quiz: Error getting question category: " . $cat_error->getMessage());
                $categoryid = 0;
            }
        }
        
        if ($categoryid && $categoryid > 0) {
            $bank_questions = gamifiedquiz_load_question_bank_questions($categoryid);
            
            if (!empty($bank_questions) && is_array($bank_questions)) {
                echo json_encode(array(
                    'success' => true,
                    'questions' => $bank_questions,
                    'source' => 'question_bank',
                    'count' => count($bank_questions)
                ));
                exit;
            }
        }
    } catch (Exception $bank_error) {
        // If question bank loading fails, log and continue to fallback
        error_log("Gamified Quiz: Error loading from question bank: " . $bank_error->getMessage() . " in " . $bank_error->getFile() . ":" . $bank_error->getLine());
        // Continue to fallback
    } catch (Error $bank_error) {
        // Catch fatal errors too
        error_log("Gamified Quiz: Fatal error loading from question bank: " . $bank_error->getMessage());
        // Continue to fallback
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
    error_log("Gamified Quiz load_questions error: " . $e->getMessage() . " in " . $e->getFile() . ":" . $e->getLine());
    echo json_encode(array(
        'success' => false,
        'error' => $e->getMessage(),
        'file' => basename($e->getFile()),
        'line' => $e->getLine()
    ));
}

