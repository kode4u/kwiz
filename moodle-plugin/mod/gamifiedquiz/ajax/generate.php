<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// Enable error reporting for debugging (remove in production)
error_reporting(E_ALL);
ini_set('display_errors', 0); // Don't display, but log
ini_set('log_errors', 1);

// Set JSON header early to ensure proper output
header('Content-Type: application/json');

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

// Ensure we have database access
global $DB, $CFG, $USER;

// Get parameters
$quizid = required_param('quizid', PARAM_INT);
$cmid = optional_param('cmid', 0, PARAM_INT);
$prompt = optional_param('prompt', '', PARAM_TEXT);
$data = optional_param('data', '', PARAM_TEXT);
$difficulty = optional_param('difficulty', '', PARAM_TEXT);
$count = optional_param('count', 5, PARAM_INT);

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
    $api_url = get_config('mod_gamifiedquiz', 'llmapi_url');
    if (empty($api_url)) {
        $api_url = 'http://localhost:5001';
    }
    
    // Get LLM backend from quiz instance, default to 'local' (Ollama)
    $backend = isset($gamifiedquiz->llm_backend) ? $gamifiedquiz->llm_backend : 'local';
    
    // Use provided prompt/data/difficulty, or fall back to quiz instance values
    $topic = !empty($prompt) ? $prompt : $gamifiedquiz->topic;
    $level = !empty($difficulty) ? $difficulty : $gamifiedquiz->difficulty;
    $predefined_data = !empty($data) ? $data : '';
    
    $questions = gamifiedquiz_generate_questions(
        $topic,
        $level,
        $count, // Number of questions from form
        $gamifiedquiz->language,
        $backend,
        $predefined_data
    );

    // Check if result contains an error
    if (is_array($questions) && isset($questions['error'])) {
        http_response_code(500);
        echo json_encode(array(
            'success' => false,
            'error' => $questions['error'],
            'api_url' => $api_url
        ));
        exit;
    }
    
    if ($questions === false || empty($questions) || !is_array($questions)) {
        http_response_code(500);
        $error_msg = 'Failed to generate questions. ';
        $error_msg .= 'Please check:\n';
        $error_msg .= '1. LLM API is running at: ' . $api_url . '\n';
        $error_msg .= '2. LLM API URL is correct in plugin settings\n';
        $error_msg .= '3. OpenAI API key is configured (if using OpenAI backend)\n';
        $error_msg .= '4. Check Moodle error logs for details';
        
        echo json_encode(array(
            'success' => false,
            'error' => $error_msg,
            'api_url' => $api_url
        ));
        exit;
    }

    // Get category name (optional parameter)
    $category_name = optional_param('category_name', '', PARAM_TEXT);
    
    // Save questions to gamifiedquiz_questions table only
    $session_id = 'session_' . $gamifiedquiz->id . '_' . ($cmid ?: time());
    $saved_count = 0;
    
    foreach ($questions as $index => $question) {
        // Handle different question formats
        $question_text = $question['question'] ?? $question['question_text'] ?? '';
        $choices = $question['choices'] ?? array();
        
        if (empty($question_text) || empty($choices)) {
            continue; // Skip invalid questions
        }
        
        // Auto-calculate correct_index from is_correct if not provided
        $correct_index = $question['correct_index'] ?? null;
        if ($correct_index === null) {
            foreach ($choices as $idx => $choice) {
                if (is_array($choice) && isset($choice['is_correct']) && $choice['is_correct'] === true) {
                    $correct_index = $idx;
                    break;
                }
            }
            if ($correct_index === null) {
                $correct_index = 0;
            }
        }
        
        // Save to gamifiedquiz_questions table
        $record = new stdClass();
        $record->gamifiedquizid = $gamifiedquiz->id;
        $record->session_id = $session_id;
        $record->question_text = $question_text;
        $record->choices = json_encode($choices);
        $record->correct_index = $correct_index;
        $record->difficulty = $gamifiedquiz->difficulty;
        $record->category_name = $category_name; // Store category name
        $record->timecreated = time();
        
        $DB->insert_record('gamifiedquiz_questions', $record);
        $saved_count++;
    }
    
    echo json_encode(array(
        'success' => true,
        'questions' => $questions,
        'session_id' => $session_id,
        'count' => $saved_count,
        'category_name' => $category_name,
        'message' => 'Generated ' . $saved_count . ' questions for category: ' . ($category_name ?: 'Default')
    ));
    
} catch (Exception $e) {
    http_response_code(500);
    header('Content-Type: application/json');
    
    // Log the full error for debugging
    $error_msg = 'Gamified Quiz AJAX Error: ' . $e->getMessage();
    $error_msg .= ' in ' . $e->getFile() . ':' . $e->getLine();
    error_log($error_msg);
    error_log('Stack trace: ' . $e->getTraceAsString());
    
    // Return detailed error (for debugging - remove sensitive info in production)
    echo json_encode(array(
        'success' => false,
        'error' => 'Error generating questions: ' . $e->getMessage(),
        'file' => basename($e->getFile()),
        'line' => $e->getLine(),
        'trace' => explode("\n", $e->getTraceAsString())
    ));
} catch (Error $e) {
    http_response_code(500);
    header('Content-Type: application/json');
    
    $error_msg = 'Gamified Quiz Fatal Error: ' . $e->getMessage();
    $error_msg .= ' in ' . $e->getFile() . ':' . $e->getLine();
    error_log($error_msg);
    error_log('Stack trace: ' . $e->getTraceAsString());
    
    echo json_encode(array(
        'success' => false,
        'error' => 'Fatal error: ' . $e->getMessage(),
        'file' => basename($e->getFile()),
        'line' => $e->getLine(),
        'trace' => explode("\n", $e->getTraceAsString())
    ));
} catch (Throwable $e) {
    http_response_code(500);
    header('Content-Type: application/json');
    
    error_log('Gamified Quiz Throwable: ' . $e->getMessage());
    
    echo json_encode(array(
        'success' => false,
        'error' => 'Error: ' . $e->getMessage(),
        'type' => get_class($e)
    ));
}

