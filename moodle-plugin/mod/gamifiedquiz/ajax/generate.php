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
// Must match llmapi MAX_QUESTIONS (docker-compose / .env).
$maxquestionsperrequest = 20;
$count = min(max(1, (int)$count), $maxquestionsperrequest);

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

// Track generation request lifecycle for research analytics.
$requeststart = microtime(true);
$requestuuid = sprintf(
    '%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
    mt_rand(0, 0xffff), mt_rand(0, 0xffff),
    mt_rand(0, 0xffff),
    mt_rand(0, 0x0fff) | 0x4000,
    mt_rand(0, 0x3fff) | 0x8000,
    mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff)
);
$startedat = time();
$generationlogid = null;

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
    $llmmodel = property_exists($gamifiedquiz, 'llm_model') ? $gamifiedquiz->llm_model : '';
    $userapikey = gamifiedquiz_get_user_llm_api_key($backend, $USER->id);

    // Insert initial log row before calling LLM service.
    $logrecord = new stdClass();
    $logrecord->gamifiedquizid = $gamifiedquiz->id;
    $logrecord->userid = $USER->id;
    $logrecord->cmid = $cmid ?: null;
    $logrecord->request_uuid = $requestuuid;
    $logrecord->topic = core_text::substr((string)$topic, 0, 255);
    $logrecord->difficulty = core_text::substr((string)$level, 0, 20);
    $logrecord->language = core_text::substr((string)$gamifiedquiz->language, 0, 10);
    $logrecord->backend = core_text::substr((string)$backend, 0, 20);
    $logrecord->llm_model = !empty($llmmodel) ? core_text::substr((string)$llmmodel, 0, 100) : null;
    $logrecord->api_url = core_text::substr((string)$api_url, 0, 255);
    $logrecord->requested_count = max(0, (int)$count);
    $logrecord->generated_count = 0;
    $logrecord->saved_count = 0;
    $logrecord->started_at = $startedat;
    $logrecord->status = 'started';
    $logrecord->timecreated = $startedat;
    $logrecord->timemodified = $startedat;
    $generationlogid = $DB->insert_record('gamifiedquiz_generation_logs', $logrecord);
    
    $questions = gamifiedquiz_generate_questions(
        $topic,
        $level,
        $count, // Number of questions from form
        $gamifiedquiz->language,
        $backend,
        $predefined_data,
        $llmmodel,
        $userapikey
    );

    // Check if result contains an error
    if (is_array($questions) && isset($questions['error'])) {
        if (!empty($generationlogid)) {
            $now = time();
            $durationms = (int)round((microtime(true) - $requeststart) * 1000);
            $updatelog = new stdClass();
            $updatelog->id = $generationlogid;
            $updatelog->ended_at = $now;
            $updatelog->duration_ms = $durationms;
            $updatelog->status = 'error';
            $updatelog->error_message = core_text::substr((string)$questions['error'], 0, 1333);
            $updatelog->timemodified = $now;
            $DB->update_record('gamifiedquiz_generation_logs', $updatelog);
        }
        http_response_code(500);
        echo json_encode(array(
            'success' => false,
            'error' => $questions['error'],
            'api_url' => $api_url,
            'request_uuid' => $requestuuid
        ));
        exit;
    }
    
    if ($questions === false || empty($questions) || !is_array($questions)) {
        if (!empty($generationlogid)) {
            $now = time();
            $durationms = (int)round((microtime(true) - $requeststart) * 1000);
            $updatelog = new stdClass();
            $updatelog->id = $generationlogid;
            $updatelog->ended_at = $now;
            $updatelog->duration_ms = $durationms;
            $updatelog->status = 'error';
            $updatelog->error_message = 'No valid questions returned from LLM API';
            $updatelog->timemodified = $now;
            $DB->update_record('gamifiedquiz_generation_logs', $updatelog);
        }
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
            'api_url' => $api_url,
            'request_uuid' => $requestuuid
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

    $generatedcount = count($questions);
    $durationms = (int)round((microtime(true) - $requeststart) * 1000);
    $durationsec = $durationms > 0 ? ($durationms / 1000.0) : 0.0;
    $questionspersec = ($durationsec > 0 && $generatedcount > 0) ? ($generatedcount / $durationsec) : null;

    if (!empty($generationlogid)) {
        $now = time();
        $updatelog = new stdClass();
        $updatelog->id = $generationlogid;
        $updatelog->session_id = $session_id;
        $updatelog->generated_count = $generatedcount;
        $updatelog->saved_count = $saved_count;
        $updatelog->ended_at = $now;
        $updatelog->duration_ms = $durationms;
        $updatelog->questions_per_sec = $questionspersec;
        $updatelog->status = 'success';
        $updatelog->timemodified = $now;
        $DB->update_record('gamifiedquiz_generation_logs', $updatelog);
    }
    
    echo json_encode(array(
        'success' => true,
        'questions' => $questions,
        'session_id' => $session_id,
        'count' => $saved_count,
        'category_name' => $category_name,
        'message' => 'Generated ' . $saved_count . ' questions for category: ' . ($category_name ?: 'Default'),
        'request_uuid' => $requestuuid,
        'metrics' => array(
            'duration_ms' => $durationms,
            'generated_count' => $generatedcount,
            'saved_count' => $saved_count,
            'questions_per_sec' => $questionspersec
        )
    ));
    
} catch (Exception $e) {
    if (!empty($generationlogid)) {
        try {
            $now = time();
            $durationms = (int)round((microtime(true) - $requeststart) * 1000);
            $updatelog = new stdClass();
            $updatelog->id = $generationlogid;
            $updatelog->ended_at = $now;
            $updatelog->duration_ms = $durationms;
            $updatelog->status = 'error';
            $updatelog->error_message = core_text::substr((string)$e->getMessage(), 0, 1333);
            $updatelog->timemodified = $now;
            $DB->update_record('gamifiedquiz_generation_logs', $updatelog);
        } catch (Throwable $logexception) {
            error_log('Gamified Quiz logging update failed: ' . $logexception->getMessage());
        }
    }
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
        'trace' => explode("\n", $e->getTraceAsString()),
        'request_uuid' => $requestuuid
    ));
} catch (Error $e) {
    if (!empty($generationlogid)) {
        try {
            $now = time();
            $durationms = (int)round((microtime(true) - $requeststart) * 1000);
            $updatelog = new stdClass();
            $updatelog->id = $generationlogid;
            $updatelog->ended_at = $now;
            $updatelog->duration_ms = $durationms;
            $updatelog->status = 'error';
            $updatelog->error_message = core_text::substr((string)$e->getMessage(), 0, 1333);
            $updatelog->timemodified = $now;
            $DB->update_record('gamifiedquiz_generation_logs', $updatelog);
        } catch (Throwable $logerror) {
            error_log('Gamified Quiz logging update failed: ' . $logerror->getMessage());
        }
    }
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
        'trace' => explode("\n", $e->getTraceAsString()),
        'request_uuid' => $requestuuid
    ));
} catch (Throwable $e) {
    if (!empty($generationlogid)) {
        try {
            $now = time();
            $durationms = (int)round((microtime(true) - $requeststart) * 1000);
            $updatelog = new stdClass();
            $updatelog->id = $generationlogid;
            $updatelog->ended_at = $now;
            $updatelog->duration_ms = $durationms;
            $updatelog->status = 'error';
            $updatelog->error_message = core_text::substr((string)$e->getMessage(), 0, 1333);
            $updatelog->timemodified = $now;
            $DB->update_record('gamifiedquiz_generation_logs', $updatelog);
        } catch (Throwable $logthrowable) {
            error_log('Gamified Quiz logging update failed: ' . $logthrowable->getMessage());
        }
    }
    http_response_code(500);
    header('Content-Type: application/json');
    
    error_log('Gamified Quiz Throwable: ' . $e->getMessage());
    
    echo json_encode(array(
        'success' => false,
        'error' => 'Error: ' . $e->getMessage(),
        'type' => get_class($e),
        'request_uuid' => $requestuuid
    ));
}

