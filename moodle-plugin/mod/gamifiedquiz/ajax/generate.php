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

// Local LLM generation can take several minutes (especially with lesson text).
@set_time_limit(600);

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

// Check for action
$action = optional_param('action', '', PARAM_ALPHAEXT);
if ($action === 'get_structure') {
    try {
        require_login();
        $target_cmid = required_param('target_cmid', PARAM_INT);
        $cm = get_coursemodule_from_id('', $target_cmid, 0, false, MUST_EXIST);
        
        $structure = [];
        if ($cm->modname === 'book') {
            $chapters = $DB->get_records('book_chapters', array('bookid' => $cm->instance), 'pagenum ASC');
            if ($chapters) {
                $structure_list = [];
                foreach ($chapters as $ch) {
                    $structure_list[] = array(
                        'id' => (int)$ch->id,
                        'title' => $ch->title,
                        'subchapter' => (int)$ch->subchapter,
                        'subitems' => []
                    );
                }
                
                $nested = [];
                $last_main_idx = -1;
                foreach ($structure_list as $item) {
                    if (!$item['subchapter']) {
                        $nested[] = $item;
                        $last_main_idx = count($nested) - 1;
                    } else {
                        if ($last_main_idx >= 0) {
                            $nested[$last_main_idx]['subitems'][] = array(
                                'id' => $item['id'],
                                'title' => $item['title']
                            );
                        } else {
                            $nested[] = $item;
                        }
                    }
                }
                $structure = $nested;
            }
        } else if ($cm->modname === 'lesson') {
            $pages = $DB->get_records('lesson_pages', array('lessonid' => $cm->instance), 'id ASC');
            if ($pages) {
                foreach ($pages as $p) {
                    $structure[] = array(
                        'id' => (int)$p->id,
                        'title' => $p->title,
                        'subitems' => []
                    );
                }
            }
        }
        
        echo json_encode(array(
            'success' => true,
            'structure' => $structure
        ));
        exit;
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(array(
            'success' => false,
            'error' => $e->getMessage()
        ));
        exit;
    }
}

// Get parameters
$quizid = required_param('quizid', PARAM_INT);
$cmid = optional_param('cmid', 0, PARAM_INT);
$prompt = optional_param('prompt', '', PARAM_TEXT);
$data = optional_param('data', '', PARAM_TEXT);
$difficulty = optional_param('difficulty', '', PARAM_TEXT);
$count = optional_param('count', 5, PARAM_INT);
$async = optional_param('async', 1, PARAM_INT);
$batchid = optional_param('batch_id', '', PARAM_TEXT);
$categoryname = optional_param('category_name', '', PARAM_TEXT);
$learning_outcomes = optional_param('learning_outcomes', '', PARAM_TEXT);
$rag_source = optional_param('rag_source', '', PARAM_TEXT);
$rag_topic_id = optional_param('rag_topic_id', 0, PARAM_INT);
$rag_subitem_id = optional_param('rag_subitem_id', 0, PARAM_INT);

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
    $learning_outcomes = !empty($learning_outcomes) ? $learning_outcomes : (isset($gamifiedquiz->learning_outcomes) ? $gamifiedquiz->learning_outcomes : '');

    // Fetch RAG content if requested
    if (!empty($rag_source)) {
        $rag_text = '';
        if ($rag_source === 'auto') {
            $preceding_cmid = gamifiedquiz_get_preceding_activity_cmid($cmid ?: $quizid);
            if ($preceding_cmid) {
                $rag_text = gamifiedquiz_get_module_text_content($preceding_cmid);
            }
        } else if (strpos($rag_source, 'cmid_') === 0) {
            $source_cmid = (int) substr($rag_source, 5);
            if ($source_cmid > 0) {
                $rag_text = gamifiedquiz_get_module_text_content($source_cmid, $rag_topic_id, $rag_subitem_id);
            }
        } else if (strpos($rag_source, 'section_') === 0) {
            $section_num = (int) substr($rag_source, 8);
            $rag_text = gamifiedquiz_get_section_text_content($course->id, $section_num);
        }
        if (!empty($rag_text)) {
            $predefined_data = $rag_text;
        }
    }

    $llmmodel = property_exists($gamifiedquiz, 'llm_model') ? $gamifiedquiz->llm_model : '';
    $userapikey = gamifiedquiz_get_user_llm_api_key($backend, $USER->id);

    // Background generation (default): queue job and return immediately.
    if ($async) {
        if (empty($batchid)) {
            $batchid = gamifiedquiz_new_uuid();
        }
        $queued = gamifiedquiz_enqueue_generation_job(
            $gamifiedquiz,
            $USER->id,
            $cmid,
            $topic,
            $level,
            $count,
            $gamifiedquiz->language,
            $backend,
            $predefined_data,
            $llmmodel,
            $userapikey,
            $categoryname,
            $batchid,
            $learning_outcomes
        );
        if (isset($queued['error'])) {
            http_response_code(500);
            echo json_encode(array(
                'success' => false,
                'error' => $queued['error'],
                'batch_id' => $batchid,
            ));
            exit;
        }
        echo json_encode(array(
            'success' => true,
            'async' => true,
            'job_id' => $queued['job_id'],
            'batch_id' => $batchid,
            'status' => $queued['status'],
            'status_label' => gamifiedquiz_generation_status_label($queued['status']),
            'message' => get_string('generation_sent', 'mod_gamifiedquiz'),
        ));
        exit;
    }

    // Insert initial log row before calling LLM service (synchronous path).
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
        $userapikey,
        $learning_outcomes
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

    $category_name = $categoryname;
    $session_id = 'session_' . $gamifiedquiz->id . '_' . ($cmid ?: time());
    $saved_count = gamifiedquiz_save_generated_questions(
        $gamifiedquiz->id,
        $questions,
        $category_name,
        $session_id,
        $level,
        $topic
    );

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

