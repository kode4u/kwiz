<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

defined('MOODLE_INTERNAL') || die();

/**
 * Auto-sync JWT secret from docker/.env file on first load
 * Uses docker/.env as the single source of truth
 * This ensures the secret is always in sync
function mod_kwiz_auto_sync_jwt_secret() {
    return '';
}

/**
 * Returns the information on whether the module supports a feature
 *
 * @param string $feature FEATURE_xx constant for requested feature
 * @return mixed true if the feature is supported, null if unknown
 */
function kwiz_supports($feature) {
    switch($feature) {
        case FEATURE_GROUPS:
            return true;
        case FEATURE_GROUPINGS:
            return true;
        case FEATURE_MOD_INTRO:
            return true;
        case FEATURE_COMPLETION_TRACKS_VIEWS:
            return true;
        case FEATURE_COMPLETION_HAS_RULES:
            return true;
        case FEATURE_GRADE_HAS_GRADE:
            return true;
        case FEATURE_GRADE_OUTCOMES:
            return true;
        case FEATURE_BACKUP_MOODLE2:
            return true;
        case FEATURE_SHOW_DESCRIPTION:
            return true;
        case FEATURE_CONTROLS_GRADE_VISIBILITY:
            return true;
        case FEATURE_USES_QUESTIONS:
            return true;
        case FEATURE_MOD_PURPOSE:
            return MOD_PURPOSE_ASSESSMENT;
        default:
            return null;
    }
}

/**
 * Saves a new instance of the kwiz into the database
 *
 * @param stdClass $kwiz An object from the form in mod_form.php
 * @param mod_kwiz_mod_form $mform
 * @return int id of newly inserted record
 */
function kwiz_add_instance($kwiz, $mform = null) {
    global $DB;

    // Store per-user API keys in user preferences (not in activity table).
    kwiz_save_user_llm_api_keys_from_form($kwiz);

    // Prefer custom URL over predefined background
    if (!empty($kwiz->background_image_url)) {
        $kwiz->background_image = trim($kwiz->background_image_url);
    }
    unset($kwiz->background_image_url);

    if (empty($kwiz->template)) {
        $kwiz->template = 'default';
    }
    if (empty($kwiz->color_palette)) {
        $kwiz->color_palette = 'default';
    }
    if (!isset($kwiz->time_limit_per_question)) {
        $kwiz->time_limit_per_question = 60;
    }
    if (!isset($kwiz->leaderboard_top_n)) {
        $kwiz->leaderboard_top_n = 3;
    }

    if (!isset($kwiz->difficulty) || empty($kwiz->difficulty)) {
        $kwiz->difficulty = 'medium';
    }

    $kwiz->timecreated = time();
    $kwiz->timemodified = $kwiz->timecreated;

    $id = $DB->insert_record('kwiz', $kwiz);
    
    // Post-processing after add
    $kwiz->id = $id;
    // Update grade item for the new quiz instance
    kwiz_grade_item_update($kwiz);
    
    return $id;
}

/**
 * Updates an instance of the kwiz in the database
 *
 * @param stdClass $kwiz An object from the form in mod_form.php
 * @param mod_kwiz_mod_form $mform
 * @return boolean Success/Fail
 */
function kwiz_update_instance($kwiz, $mform = null) {
    global $DB;

    // Store per-user API keys in user preferences (not in activity table).
    kwiz_save_user_llm_api_keys_from_form($kwiz);

    // Preserve existing database defaults for fields removed from form
    $existing = $DB->get_record('kwiz', array('id' => $kwiz->instance));
    if ($existing) {
        if (!isset($kwiz->template)) {
            $kwiz->template = $existing->template;
        }
        if (!isset($kwiz->color_palette)) {
            $kwiz->color_palette = $existing->color_palette;
        }
        if (!isset($kwiz->time_limit_per_question)) {
            $kwiz->time_limit_per_question = $existing->time_limit_per_question;
        }
        if (!isset($kwiz->leaderboard_top_n)) {
            $kwiz->leaderboard_top_n = $existing->leaderboard_top_n;
        }
    }

    // Prefer custom URL over predefined background
    if (!empty($kwiz->background_image_url)) {
        $kwiz->background_image = trim($kwiz->background_image_url);
    }
    unset($kwiz->background_image_url);

    $kwiz->timemodified = time();
    $kwiz->id = $kwiz->instance;

    $result = $DB->update_record('kwiz', $kwiz);
    
    // Update grade item after update
    if ($result) {
        kwiz_grade_item_update($kwiz);
    }
    
    return $result;
}

/**
 * Persist LLM API keys from form object into user preferences.
 * Keys are user-specific and never saved on the quiz instance record.
 *
 * @param stdClass $formdata
 * @return void
 */
function kwiz_save_user_llm_api_keys_from_form($formdata) {
    global $USER;

    if (isset($formdata->openai_user_api_key)) {
        $key = trim((string)$formdata->openai_user_api_key);
        set_user_preference('mod_kwiz_openai_api_key', $key, $USER->id);
        unset($formdata->openai_user_api_key);
    }

    if (isset($formdata->gemini_user_api_key)) {
        $key = trim((string)$formdata->gemini_user_api_key);
        set_user_preference('mod_kwiz_gemini_api_key', $key, $USER->id);
        unset($formdata->gemini_user_api_key);
    }
}

/**
 * Get user-specific API key by backend.
 *
 * @param string $backend
 * @param int|null $userid
 * @return string
 */
function kwiz_get_user_llm_api_key($backend, $userid = null) {
    global $USER;
    $uid = $userid ?: $USER->id;

    if ($backend === 'openai') {
        return (string)get_user_preferences('mod_kwiz_openai_api_key', '', $uid);
    }
    if ($backend === 'gemini') {
        return (string)get_user_preferences('mod_kwiz_gemini_api_key', '', $uid);
    }
    return '';
}

/**
 * Removes an instance of the kwiz from the database
 *
 * @param int $id Id of the module instance
 * @return boolean Success/Fail
 */
function kwiz_delete_instance($id) {
    global $DB, $CFG;
    
    require_once($CFG->dirroot . '/lib/gradelib.php');

    if (!$kwiz = $DB->get_record('kwiz', array('id' => $id))) {
        return false;
    }

    // Delete grade item
    kwiz_grade_item_delete($kwiz);
    
    $DB->delete_records('kwiz', array('id' => $kwiz->id));
    return true;
}

/**
 * Update/create grade item for quiz
 *
 * @param stdClass $kwiz Quiz instance
 * @return int Grade item ID
 */
function kwiz_grade_item_update($kwiz) {
    global $CFG, $DB;
    require_once($CFG->dirroot . '/lib/gradelib.php');
    
    // Calculate total marks from slots if sumgrades is not set
    $sumgrades = isset($kwiz->sumgrades) ? $kwiz->sumgrades : 0;
    if ($sumgrades == 0) {
        $slots = $DB->get_records('kwiz_slots', array('kwizid' => $kwiz->id));
        foreach ($slots as $slot) {
            $sumgrades += $slot->maxmark;
        }
        // Update quiz record with calculated sumgrades
        if ($sumgrades > 0) {
            $kwiz->sumgrades = $sumgrades;
            $DB->update_record('kwiz', $kwiz);
        }
    }
    
    // Use sumgrades as maximum grade, default to 100 if no questions
    $grademax = $sumgrades > 0 ? $sumgrades : 100;
    
    $params = array(
        'itemname' => $kwiz->name,
        'idnumber' => $kwiz->id,
        'gradetype' => GRADE_TYPE_VALUE,
        'grademax' => $grademax,
        'grademin' => 0
    );
    
    return grade_update('mod/kwiz', $kwiz->course, 'mod', 'kwiz', $kwiz->id, 0, null, $params);
}

/**
 * Delete grade item for quiz
 *
 * @param stdClass $kwiz Quiz instance
 * @return bool Success
 */
function kwiz_grade_item_delete($kwiz) {
    global $CFG;
    
    require_once($CFG->dirroot . '/lib/gradelib.php');
    
    return grade_update('mod/kwiz', $kwiz->course, 'mod', 'kwiz', $kwiz->id, 0, null, array('deleted' => 1));
}

/**
 * Generate JWT token for WebSocket authentication
 *
 * @param int $userid User ID
 * @param int $sessionid Session ID
 * @param string $role 'teacher' or 'student'
 * @return string JWT token
 */
function kwiz_generate_jwt($userid, $sessionid, $role) {
    return '';
}

/**
 * Fetch list of available Ollama model names from the LLM API.
 * Uses same URL resolution and native curl as kwiz_generate_questions.
 *
 * @return array Associative array model_name => model_name for dropdown options
 */
function kwiz_fetch_ollama_models() {
    $api_url = get_config('mod_kwiz', 'llmapi_url');
    if (empty($api_url)) {
        $api_url = 'http://llmapi:5001';
    }
    if (strpos($api_url, 'localhost') !== false || strpos($api_url, '127.0.0.1') !== false) {
        $api_url = str_replace(['localhost', '127.0.0.1'], 'llmapi', $api_url);
    }
    $url = rtrim($api_url, '/') . '/models/ollama';

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
    $response = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curl_error = curl_error($ch);
    curl_close($ch);

    if ($response === false || $http_code !== 200) {
        // Log error for debugging (only if error logging is enabled)
        if ($response === false) {
            error_log("Kwiz: Failed to fetch Ollama models from {$url}. cURL error: " . ($curl_error ?: 'Unknown error'));
        } else {
            error_log("Kwiz: Failed to fetch Ollama models from {$url}. HTTP {$http_code}. Response: " . substr($response, 0, 200));
        }
        return array();
    }
    $data = json_decode($response, true);
    if (!isset($data['models']) || !is_array($data['models'])) {
        error_log("Kwiz: Invalid response format from {$url}. Expected 'models' array. Got: " . substr($response, 0, 200));
        return array();
    }
    $names = array();
    foreach ($data['models'] as $model) {
        $name = !empty($model['name']) ? $model['name'] : (isset($model['model']) ? $model['model'] : null);
        if ($name) {
            $names[$name] = $name;
        }
    }
    return $names;
}

/**
 * HTTP timeout (seconds) for one LLM /generate call.
 *
 * @param string $backend LLM backend id
 * @return int
 */
function kwiz_generation_timeout($backend) {
    if ($backend === 'local') {
        return 600;
    }
    return 180;
}

/**
 * Batch size for local (Ollama) generation — smaller requests avoid timeouts.
 *
 * @return int
 */
function kwiz_local_generation_batch_size() {
    return 3;
}

/**
 * Call LLM API to generate questions (single request).
 *
 * @param string $topic Topic for questions
 * @param string $level Difficulty level
 * @param int $n_questions Number of questions
 * @param string $language Language code
 * @param string $backend LLM backend (openai, gemini, local)
 * @param string $predefined_data Optional lesson/context text
 * @param string $llmmodel Optional local LLM model name (for backend = local)
 * @param string $userapikey Optional per-user API key
 * @return array Generated questions or array with 'error' key
 */
function kwiz_generate_questions_request($topic, $level, $n_questions, $language, $backend, $predefined_data, $llmmodel, $userapikey, $learning_outcomes = '', $question_type = 'code') {
    $api_url = get_config('mod_kwiz', 'llmapi_url');
    if (empty($api_url)) {
        $api_url = 'http://llmapi:5001';
    }

    if (strpos($api_url, 'localhost') !== false || strpos($api_url, '127.0.0.1') !== false) {
        $api_url = str_replace(['localhost', '127.0.0.1'], 'llmapi', $api_url);
    }

    $data = array(
        'topic' => $topic,
        'level' => $level,
        'n_questions' => $n_questions,
        'language' => $language,
        'backend' => $backend,
        'question_type' => $question_type,
    );

    if (!empty($learning_outcomes)) {
        $data['learning_outcomes'] = $learning_outcomes;
    }

    if (!empty($predefined_data)) {
        $data['context'] = $predefined_data;
    }

    if ($backend === 'local' && !empty($llmmodel)) {
        $data['model'] = $llmmodel;
    }

    if ($backend === 'openai' && !empty($userapikey)) {
        $data['openai_api_key'] = $userapikey;
    } else if ($backend === 'gemini' && !empty($userapikey)) {
        $data['gemini_api_key'] = $userapikey;
    }

    $timeout = kwiz_generation_timeout($backend);

    $ch = curl_init($api_url . '/generate');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
    curl_setopt($ch, CURLOPT_TIMEOUT, $timeout);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 15);

    $response = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curl_error = curl_error($ch);
    curl_close($ch);

    if ($curl_error) {
        $error_msg = "cURL error: " . $curl_error;
        error_log("Kwiz: " . $error_msg);
        return array('error' => $error_msg . ". Please check if LLM API is accessible at " . $api_url);
    }

    if ($http_code === 200) {
        $result = json_decode($response, true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            error_log("Kwiz: JSON decode error: " . json_last_error_msg());
            return array('error' => 'Invalid JSON response from LLM API');
        }

        if (isset($result['questions']) && is_array($result['questions'])) {
            if (isset($result['metadata'])) {
                $GLOBALS['LAST_LLM_METADATA'] = $result['metadata'];
            }
            return $result['questions'];
        }
        if (isset($result['error'])) {
            return array('error' => $result['error']);
        }
        return array('error' => 'Unexpected response format from LLM API');
    }

    $error_msg = "HTTP error " . $http_code;
    $error_data = json_decode($response, true);
    if (isset($error_data['error'])) {
        $error_msg .= ": " . $error_data['error'];
    } else {
        $error_msg .= ": " . substr((string)$response, 0, 200);
    }
    error_log("Kwiz: " . $error_msg . " (API URL: " . $api_url . ")");
    return array('error' => $error_msg);
}

/**
 * Call LLM API to generate questions (batches local/Ollama requests when needed).
 *
 * @param string $topic Topic for questions
 * @param string $level Difficulty level
 * @param int $n_questions Number of questions
 * @param string $language Language code
 * @param string $backend LLM backend (openai, gemini, local)
 * @param string $predefined_data Optional predefined data/context for question generation
 * @param string $llmmodel Optional local LLM model name (for backend = local)
 * @param string $userapikey Optional per-user API key
 * @param string $learning_outcomes Optional target learning outcomes
 * @param string $question_type Optional question modality: code, mixed, conceptual
 * @return array|false Generated questions or false on error
 */
function kwiz_generate_questions($topic, $level = 'medium', $n_questions = 5, $language = 'en', $backend = 'openai', $predefined_data = '', $llmmodel = '', $userapikey = '', $learning_outcomes = '', $question_type = 'code') {
    $batchsize = kwiz_local_generation_batch_size();
    if ($backend === 'local' && $n_questions > $batchsize) {
        $all = array();
        $remaining = (int)$n_questions;
        while ($remaining > 0) {
            $batch = min($batchsize, $remaining);
            $chunk = kwiz_generate_questions_request(
                $topic, $level, $batch, $language, $backend, $predefined_data, $llmmodel, $userapikey, $learning_outcomes, $question_type
            );
            if (isset($chunk['error'])) {
                if (!empty($all)) {
                    $chunk['error'] .= ' (' . count($all) . ' of ' . $n_questions . ' questions were generated before this error.)';
                }
                return $chunk;
            }
            $all = array_merge($all, $chunk);
            $remaining -= $batch;
        }
        return $all;
    }

    return kwiz_generate_questions_request(
        $topic, $level, $n_questions, $language, $backend, $predefined_data, $llmmodel, $userapikey, $learning_outcomes, $question_type
    );
}

/**
 * Shared secret for background generation worker callbacks.
 *
 * @return string
 */
function kwiz_worker_token() {
    $token = getenv('KWIZ_WORKER_TOKEN');
    if (!empty($token)) {
        return $token;
    }
    $token = get_config('mod_kwiz', 'worker_token');
    return !empty($token) ? $token : '';
}

/**
 * Append one JSON line to the evaluation metrics log (research / poster).
 *
 * @param string $event Event name (e.g. generation, moodle_job_complete)
 * @param array $data Additional fields
 */
function kwiz_append_metrics_log($event, array $data = array()) {
    $path = getenv('KWIZ_METRICS_LOG');
    if (empty($path)) {
        return;
    }
    $dir = dirname($path);
    if (!is_dir($dir)) {
        @mkdir($dir, 0775, true);
    }
    $row = array_merge(array(
        'event' => $event,
        'timestamp' => gmdate('c'),
        'source' => 'moodle',
    ), $data);
    @file_put_contents($path, json_encode($row, JSON_UNESCAPED_UNICODE) . "\n", FILE_APPEND | LOCK_EX);
}

/**
 * Moodle base URL reachable from Docker (llmapi / websocket containers).
 *
 * @return string
 */
function kwiz_moodle_internal_base_url() {
    $url = get_config('mod_kwiz', 'moodle_internal_url');
    if (!empty($url)) {
        return rtrim($url, '/');
    }
    return 'http://moodle';
}

/**
 * Webhook callback URL for LLM async completion.
 *
 * @return string
 */
function kwiz_generation_webhook_url() {
    return kwiz_moodle_internal_base_url() . '/mod/kwiz/ajax/complete_generation_job.php';
}

/**
 * WebSocket server base URL for internal enqueue API.
 *
 * @return string
 */
function kwiz_websocket_internal_url() {
    return '';
}

/**
 * Create a new UUID for jobs/batches.
 *
 * @return string
 */
function kwiz_new_uuid() {
    return sprintf(
        '%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
        mt_rand(0, 0xffff),
        mt_rand(0, 0xffff),
        mt_rand(0, 0xffff),
        mt_rand(0, 0x0fff) | 0x4000,
        mt_rand(0, 0x3fff) | 0x8000,
        mt_rand(0, 0xffff),
        mt_rand(0, 0xffff),
        mt_rand(0, 0xffff)
    );
}

/**
 * Save LLM-generated questions to kwiz_questions.
 *
 * @param int $kwizid Quiz instance id
 * @param array $questions Question payloads from LLM
 * @param string $categoryname Category label
 * @param string $sessionid Session id for this job/batch
 * @param string $difficulty Difficulty stored on rows
 * @param string $topic Generation topic/prompt
 * @return int Number saved
 */
function kwiz_save_generated_questions($kwizid, $questions, $categoryname, $sessionid, $difficulty, $topic = '', $categoryid = 0, $standardquizid = 0, $newquizname = '') {
    global $DB, $CFG;

    $kwiz = $DB->get_record('kwiz', array('id' => $kwizid));
    $courseid = $kwiz ? (int)$kwiz->course : 2;

    // 1. Resolve / create category in Question Bank
    if (!empty($categoryid) && (int)$categoryid > 0) {
        $categoryid = (int)$categoryid;
    } else {
        $targetcatname = !empty($categoryname) ? $categoryname : ($kwiz ? $kwiz->name : 'AI Questions');
        $categoryid = kwiz_get_or_create_question_category($courseid, $targetcatname);
    }

    // 2. Resolve / create standard mod_quiz instance in this course
    $standardquiz = null;
    if (!empty($standardquizid) && (int)$standardquizid > 0) {
        $std_rec = $DB->get_record('quiz', array('id' => (int)$standardquizid));
        if ($std_rec) {
            $cm = get_coursemodule_from_instance('quiz', $std_rec->id, $courseid);
            $std_rec->cmid = $cm ? $cm->id : 0;
            $standardquiz = $std_rec;
        }
    } else if (!empty($newquizname)) {
        $standardquiz = kwiz_create_standard_quiz_named($courseid, $newquizname);
    } else if ($kwiz) {
        try {
            $standardquiz = kwiz_get_or_create_standard_quiz($kwiz);
        } catch (Throwable $e) {
            error_log("Kwiz: could not get/create standard quiz: " . $e->getMessage());
        }
    }

    $saved = 0;
    foreach ($questions as $question) {
        $questiontext = $question['question'] ?? $question['question_text'] ?? $question['prompt'] ?? '';
        $choices = $question['choices'] ?? $question['options'] ?? array();
        $explanation = $question['explanation'] ?? '';
        $sourcechunks = $question['source_chunk_ids'] ?? $question['source'] ?? '';

        if (is_string($choices)) {
            $decoded = json_decode($choices, true);
            if (is_array($decoded)) {
                $choices = $decoded;
            }
        }

        if (empty($questiontext) || empty($choices) || !is_array($choices)) {
            continue;
        }

        $correctindex = $question['correct_index'] ?? null;
        if ($correctindex === null) {
            foreach ($choices as $idx => $choice) {
                if (is_array($choice) && !empty($choice['is_correct'])) {
                    $correctindex = $idx;
                    break;
                }
            }
            if ($correctindex === null) {
                $correctindex = 0;
            }
        }

        // Format choices properly for question bank helper
        $normalizedchoices = array();
        foreach ($choices as $idx => $choice) {
            if (is_string($choice)) {
                $normalizedchoices[] = array('text' => $choice, 'is_correct' => ($idx == $correctindex));
            } else if (is_array($choice)) {
                $txt = $choice['text'] ?? $choice['answer'] ?? $choice['option'] ?? '';
                $iscorr = isset($choice['is_correct']) ? !empty($choice['is_correct']) : ($idx == $correctindex);
                $normalizedchoices[] = array('text' => $txt, 'is_correct' => $iscorr);
            }
        }

        // 1. Create in native Moodle Question Bank
        $qbank_qid = kwiz_create_question_bank_question(
            $questiontext,
            $normalizedchoices,
            $categoryid,
            $courseid,
            $difficulty,
            $explanation,
            $sourcechunks
        );

        // 2. Add to Moodle's native mod_quiz
        if ($standardquiz && $qbank_qid) {
            try {
                require_once($CFG->dirroot . '/mod/quiz/locallib.php');
                quiz_add_quiz_question($qbank_qid, $standardquiz);
            } catch (Throwable $sqe) {
                error_log("Kwiz: Error linking question {$qbank_qid} to standard quiz: " . $sqe->getMessage());
            }
        }

        // 3. Add to kwiz slots
        if ($kwiz && $qbank_qid) {
            try {
                kwiz_add_quiz_question($qbank_qid, $kwiz);
            } catch (Throwable $gqe) {
                error_log("Kwiz: Error linking question {$qbank_qid} to kwiz slots: " . $gqe->getMessage());
            }
        }

        // 4. Save to kwiz_questions (backward compatibility)
        $choicesjson = @json_encode($normalizedchoices, JSON_UNESCAPED_UNICODE | JSON_INVALID_UTF8_SUBSTITUTE);
        if ($choicesjson === false) {
            $choicesjson = json_encode($normalizedchoices);
        }

        $record = new stdClass();
        $record->kwizid = $kwizid;
        $record->session_id = $sessionid;
        $record->question_text = $questiontext;
        $record->choices = $choicesjson ?: '[]';
        $record->correct_index = (int)$correctindex;
        $record->difficulty = $difficulty;
        $record->category_name = core_text::substr((string)$categoryname, 0, 255);
        $record->topic = core_text::substr((string)($topic ?: ($question['topic'] ?? '')), 0, 255);
        if (!empty($question['bloom_level'])) {
            $record->bloom_level = core_text::substr((string)$question['bloom_level'], 0, 50);
        }
        $record->timecreated = time();
        $DB->insert_record('kwiz_questions', $record);
        $saved++;
    }

    // Recompute sumgrades so the quiz has a valid non-zero grade and can be attempted without cannotstartgradesmismatch!
    if ($standardquiz) {
        try {
            require_once($CFG->dirroot . '/mod/quiz/locallib.php');
            \mod_quiz\quiz_settings::create($standardquiz->id)->get_grade_calculator()->recompute_quiz_sumgrades();
        } catch (Throwable $rse) {
            error_log("Kwiz: Error recomputing quiz sumgrades: " . $rse->getMessage());
        }
    }

    return $saved;
}

/**
 * Persist multi-category generation form (categories + optional lesson text).
 *
 * @param int $kwizid Quiz instance id
 * @param array $categories Category rows from UI
 * @param string $lessoncontent Optional lesson paste
 */
function kwiz_save_generation_preferences($kwizid, array $categories, $lessoncontent = '') {
    global $DB;

    $payload = array(
        'categories' => array_values($categories),
        'lesson' => (string)$lessoncontent,
    );

    $record = new stdClass();
    $record->id = $kwizid;
    $record->categories_data = json_encode($payload);
    $record->timemodified = time();
    $DB->update_record('kwiz', $record);
}

/**
 * Replace the quiz question set in kwiz_questions (and mirror to questions_data).
 * Removes rows not present in the saved list; updates by id when provided.
 *
 * @param int $kwizid Quiz instance id
 * @param array $questions Question payloads from the editor
 * @param int $targetcategoryid Target question category id
 * @param string $targetcategoryname Target question category name
 * @param int $targetquizid Target standard quiz id
 * @param string $newquizname New standard quiz name to create
 * @return array Saved questions (with ids)
 */
function kwiz_sync_questions($kwizid, $questions, $targetcategoryid = 0, $targetcategoryname = '', $targetquizid = 0, $newquizname = '') {
    global $DB, $CFG;

    $transaction = $DB->start_delegated_transaction();

    $existing = $DB->get_records('kwiz_questions', array('kwizid' => $kwizid), '', 'id');
    $keptids = array();
    $defaultsession = 'editor_' . $kwizid;
    $savedforjson = array();

    foreach ($questions as $question) {
        $questiontext = trim($question['question'] ?? $question['question_text'] ?? '');
        if ($questiontext === '') {
            continue;
        }

        $choices = $question['choices'] ?? array();
        $correctindex = isset($question['correct_index']) ? (int) $question['correct_index'] : null;
        $normalized = array();
        foreach ($choices as $idx => $choice) {
            if (is_string($choice)) {
                $normalized[] = array('text' => $choice, 'is_correct' => ($correctindex === $idx));
            } else {
                $text = trim($choice['text'] ?? '');
                if ($text === '') {
                    continue;
                }
                $normalized[] = array(
                    'text' => $text,
                    'is_correct' => !empty($choice['is_correct']),
                );
            }
        }
        if (count($normalized) < 2) {
            continue;
        }
        if ($correctindex === null) {
            foreach ($normalized as $idx => $choice) {
                if (!empty($choice['is_correct'])) {
                    $correctindex = $idx;
                    break;
                }
            }
        }
        if ($correctindex === null) {
            $correctindex = 0;
        }

        $choicesjson = @json_encode($normalized, JSON_UNESCAPED_UNICODE | JSON_INVALID_UTF8_SUBSTITUTE);
        if ($choicesjson === false) {
            $choicesjson = json_encode($normalized);
        }
        $record = new stdClass();
        $record->kwizid = $kwizid;
        $record->question_text = $questiontext;
        $record->choices = $choicesjson ?: '[]';
        $record->correct_index = $correctindex;
        $record->difficulty = $question['difficulty'] ?? 'medium';
        if (!empty($question['category_name'])) {
            $record->category_name = $question['category_name'];
        }
        if (!empty($question['topic'])) {
            $record->topic = core_text::substr((string)$question['topic'], 0, 255);
        }
        $record->timemodified = time();

        $qid = isset($question['id']) ? (int) $question['id'] : 0;
        if ($qid > 0 && isset($existing[$qid])) {
            $record->id = $qid;
            $record->session_id = $existing[$qid]->session_id ?: $defaultsession;
            if (empty($record->category_name) && !empty($existing[$qid]->category_name)) {
                $record->category_name = $existing[$qid]->category_name;
            }
            if (empty($record->topic) && !empty($existing[$qid]->topic)) {
                $record->topic = $existing[$qid]->topic;
            }
            $DB->update_record('kwiz_questions', $record);
            $keptids[] = $qid;
            $question['id'] = $qid;
        } else {
            $record->session_id = $defaultsession;
            $record->timecreated = time();
            $newid = $DB->insert_record('kwiz_questions', $record);
            $keptids[] = $newid;
            $question['id'] = $newid;
        }
        $savedforjson[] = $question;
    }

    foreach (array_keys($existing) as $oldid) {
        if (!in_array($oldid, $keptids)) {
            $DB->delete_records('kwiz_responses', array('questionid' => $oldid));
            $DB->delete_records('kwiz_questions', array('id' => $oldid));
        }
    }

    $gq = new stdClass();
    $gq->id = $kwizid;
    $gq->questions_data = json_encode($savedforjson);
    $gq->timemodified = time();
    $DB->update_record('kwiz', $gq);

    // Sync questions into Moodle native Question Bank and standard mod_quiz
    $gq_record = $DB->get_record('kwiz', array('id' => $kwizid));
    if ($gq_record) {
        $courseid = (int)$gq_record->course;

        // Resolve target standard quiz
        $stdquiz = null;
        if (!empty($targetquizid) && (int)$targetquizid > 0) {
            $std_rec = $DB->get_record('quiz', array('id' => (int)$targetquizid));
            if ($std_rec) {
                $cm = get_coursemodule_from_instance('quiz', $std_rec->id, $courseid);
                $std_rec->cmid = $cm ? $cm->id : 0;
                $stdquiz = $std_rec;
            }
        } else if (!empty($newquizname)) {
            $stdquiz = kwiz_create_standard_quiz_named($courseid, $newquizname);
        } else {
            $stdquiz = kwiz_get_or_create_standard_quiz($gq_record);
        }

        // Resolve target Question Bank category
        if (!empty($targetcategoryid) && (int)$targetcategoryid > 0) {
            $catid = (int)$targetcategoryid;
        } else if (!empty($targetcategoryname)) {
            $catid = kwiz_get_or_create_question_category($courseid, $targetcategoryname);
        } else {
            $catid = kwiz_get_or_create_question_category($courseid, $gq_record->name);
        }

        foreach ($savedforjson as $sq) {
            $qtext = trim($sq['question'] ?? $sq['question_text'] ?? '');
            $qchoices = $sq['choices'] ?? array();
            $qdiff = $sq['difficulty'] ?? 'medium';
            $qexpl = $sq['explanation'] ?? '';
            $qsource = $sq['source_chunk_ids'] ?? '';
            $qbank_qid = kwiz_create_question_bank_question(
                $qtext,
                $qchoices,
                $catid,
                $courseid,
                $qdiff,
                $qexpl,
                $qsource
            );
            if ($stdquiz && $qbank_qid) {
                try {
                    require_once($CFG->dirroot . '/mod/quiz/locallib.php');
                    quiz_add_quiz_question($qbank_qid, $stdquiz);
                } catch (Throwable $sqe) {
                    error_log("Kwiz: Error syncing question to quiz: " . $sqe->getMessage());
                }
            }
        }

        // Recompute sumgrades so the quiz has a valid non-zero grade and can be attempted without cannotstartgradesmismatch!
        if ($stdquiz) {
            try {
                require_once($CFG->dirroot . '/mod/quiz/locallib.php');
                \mod_quiz\quiz_settings::create($stdquiz->id)->get_grade_calculator()->recompute_quiz_sumgrades();
            } catch (Throwable $rse) {
                error_log("Kwiz: Error recomputing quiz sumgrades: " . $rse->getMessage());
            }
        }
    }

    $transaction->allow_commit();

    return $savedforjson;
}

/**
 * Queue a background generation job (DB row + Redis via WebSocket server).
 *
 * @param stdClass $kwiz Quiz instance
 * @param int $userid User who requested generation
 * @param int $cmid Course module id
 * @param string $topic Topic/prompt
 * @param string $level Difficulty
 * @param int $count Question count
 * @param string $language Language code
 * @param string $backend LLM backend
 * @param string $lessoncontext Optional lesson text
 * @param string $llmmodel Local model name
 * @param string $userapikey User API key for cloud backends
 * @param string $categoryname Category label
 * @param string $batchid Batch id grouping multiple categories
 * @return array Job info with request_uuid or error
 */
function kwiz_enqueue_generation_job($kwiz, $userid, $cmid, $topic, $level, $count, $language,
        $backend, $lessoncontext, $llmmodel, $userapikey, $categoryname, $batchid, $learning_outcomes = '') {
    global $DB;

    $apiurl = get_config('mod_kwiz', 'llmapi_url');
    if (empty($apiurl)) {
        $apiurl = 'http://llmapi:5001';
    }
    if (strpos($apiurl, 'localhost') !== false || strpos($apiurl, '127.0.0.1') !== false) {
        $apiurl = str_replace(array('localhost', '127.0.0.1'), 'llmapi', $apiurl);
    }

    $requestuuid = kwiz_new_uuid();
    $sessionid = 'genjob_' . $requestuuid;
    $now = time();

    $log = new stdClass();
    $log->kwizid = $kwiz->id;
    $log->userid = $userid;
    $log->cmid = $cmid ?: null;
    $log->session_id = $sessionid;
    $log->request_uuid = $requestuuid;
    $log->batch_id = $batchid ?: null;
    $log->category_name = core_text::substr((string)$categoryname, 0, 255);
    $log->topic = core_text::substr((string)$topic, 0, 255);
    $log->difficulty = core_text::substr((string)$level, 0, 20);
    $log->language = core_text::substr((string)$language, 0, 10);
    $log->backend = core_text::substr((string)$backend, 0, 20);
    $log->llm_model = !empty($llmmodel) ? core_text::substr((string)$llmmodel, 0, 100) : null;
    $log->api_url = core_text::substr((string)$apiurl, 0, 255);
    $log->requested_count = max(0, (int)$count);
    $log->generated_count = 0;
    $log->saved_count = 0;
    $log->started_at = $now;
    $log->status = 'queued';
    $log->timecreated = $now;
    $log->timemodified = $now;
    $logid = $DB->insert_record('kwiz_generation_logs', $log);

    $dispatch = kwiz_dispatch_llm_async_job(
        $logid,
        $requestuuid,
        $apiurl,
        $topic,
        $level,
        $count,
        $language,
        $backend,
        $lessoncontext,
        $llmmodel,
        $userapikey,
        $learning_outcomes
    );
    if (isset($dispatch['error'])) {
        $fail = new stdClass();
        $fail->id = $logid;
        $fail->status = 'error';
        $fail->error_message = core_text::substr($dispatch['error'], 0, 1333);
        $fail->ended_at = time();
        $fail->timemodified = time();
        $DB->update_record('kwiz_generation_logs', $fail);
        return array('error' => $dispatch['error']);
    }

    return array(
        'job_id' => $requestuuid,
        'batch_id' => $batchid,
        'log_id' => $logid,
        'session_id' => $sessionid,
        'status' => $dispatch['status'],
    );
}

/**
 * Send async generation request to LLM API (webhook back to Moodle when done).
 *
 * @param int $logid Generation log row id
 * @param string $requestuuid Job uuid
 * @param string $apiurl LLM API base URL
 * @param string $topic Topic
 * @param string $level Difficulty
 * @param int $count Question count
 * @param string $language Language
 * @param string $backend Backend id
 * @param string $lessoncontext Optional lesson text
 * @param string $llmmodel Local model name
 * @param string $userapikey Cloud API key
 * @param string $learning_outcomes Optional learning outcomes
 * @return array status or error
 */
function kwiz_dispatch_llm_async_job($logid, $requestuuid, $apiurl, $topic, $level, $count, $language,
        $backend, $lessoncontext, $llmmodel, $userapikey, $learning_outcomes = '') {
    global $DB;

    $token = kwiz_worker_token();
    if (empty($token)) {
        return array('error' => 'Generation worker token is not configured (KWIZ_WORKER_TOKEN).');
    }

    $payload = array(
        'request_uuid' => $requestuuid,
        'topic' => $topic,
        'level' => $level,
        'n_questions' => (int)$count,
        'language' => $language,
        'backend' => $backend,
        'webhook_url' => kwiz_generation_webhook_url(),
        'webhook_token' => $token,
    );
    if (!empty($learning_outcomes)) {
        $payload['learning_outcomes'] = $learning_outcomes;
    }
    if (!empty($lessoncontext)) {
        $payload['context'] = $lessoncontext;
    }
    if ($backend === 'local' && !empty($llmmodel)) {
        $payload['model'] = $llmmodel;
    }
    if ($backend === 'openai' && !empty($userapikey)) {
        $payload['openai_api_key'] = $userapikey;
    } else if ($backend === 'gemini' && !empty($userapikey)) {
        $payload['gemini_api_key'] = $userapikey;
    }

    $url = rtrim($apiurl, '/') . '/generate/async';
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);

    $response = curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlerror = curl_error($ch);
    curl_close($ch);

    if ($curlerror) {
        return array('error' => 'Failed to send request to LLM API: ' . $curlerror);
    }

    $data = json_decode($response, true);
    if ($code < 200 || $code >= 300) {
        $msg = is_array($data) && isset($data['error']) ? $data['error'] : substr((string)$response, 0, 200);
        return array('error' => 'LLM API rejected async job (HTTP ' . $code . '): ' . $msg);
    }

    $now = time();
    $update = new stdClass();
    $update->id = $logid;
    $update->status = 'sent';
    $update->timemodified = $now;
    $DB->update_record('kwiz_generation_logs', $update);

    return array('status' => 'sent');
}

/**
 * Push a generation job onto the Redis queue via the WebSocket server.
 *
 * @param array $payload Job payload
 * @return array Empty on success or error array
 */
function kwiz_push_generation_queue(array $payload) {
    return array('error' => 'WebSocket background queue disabled; Kwiz runs in direct synchronous RAG mode.');
}

/**
 * Load generated questions for a completed job.
 *
 * @param string $sessionid Job session id
 * @return array Normalized question list
 */
function kwiz_load_questions_for_session($sessionid) {
    global $DB;

    $records = $DB->get_records('kwiz_questions', array('session_id' => $sessionid), 'id ASC');
    $questions = array();
    foreach ($records as $q) {
        $choices = json_decode($q->choices, true);
        $questions[] = array(
            'question' => $q->question_text,
            'choices' => is_array($choices) ? $choices : array(),
            'correct_index' => (int)$q->correct_index,
            'difficulty' => $q->difficulty,
            'category_name' => $q->category_name ?? '',
            'topic' => $q->topic ?? '',
        );
    }
    return $questions;
}

/**
 * Format a generation log row for status API / UI polling.
 *
 * @param stdClass $log DB row
 * @return array
 */
function kwiz_format_generation_job_status($log) {
    $status = $log->status;
    $now = time();
    $lasttouch = !empty($log->timemodified) ? (int)$log->timemodified : (int)$log->timecreated;
    // Early states should move quickly; processing may take many minutes (local LLM).
    if (in_array($status, array('queued', 'sent'), true)) {
        $staleafter = 120;
    } else if (in_array($status, array('processing', 'running', 'started'), true)) {
        $staleafter = 1200;
    } else {
        $staleafter = 900;
    }

    if (in_array($status, array('queued', 'sent', 'processing', 'running', 'started'), true) &&
            ($now - $lasttouch) > $staleafter) {
        $status = 'error';
        $log->error_message = 'Generation timed out or LLM did not respond in time.';
    }

    $complete = in_array($status, array('success', 'error'), true);
    $statuslabel = kwiz_generation_status_label($status);

    $out = array(
        'job_id' => $log->request_uuid,
        'batch_id' => $log->batch_id ?? null,
        'category_name' => $log->category_name ?? '',
        'topic' => $log->topic ?? '',
        'backend' => $log->backend ?? 'local',
        'llm_model' => $log->llm_model ?? 'qwen2.5-coder:7b',
        'duration_ms' => isset($log->duration_ms) ? (int)$log->duration_ms : null,
        'questions_per_sec' => isset($log->questions_per_sec) ? (float)$log->questions_per_sec : null,
        'status' => $status,
        'status_label' => $statuslabel,
        'complete' => $complete,
        'requested_count' => (int)$log->requested_count,
        'generated_count' => (int)$log->generated_count,
        'saved_count' => (int)$log->saved_count,
        'error' => $log->error_message ?? null,
        'questions' => array(),
    );

    if ($status === 'success' && !empty($log->session_id)) {
        $out['questions'] = kwiz_load_questions_for_session($log->session_id);
    }

    return $out;
}

/**
 * Human-readable generation status for UI polling.
 *
 * @param string $status Status code
 * @return string
 */
function kwiz_generation_status_label($status) {
    $map = array(
        'queued' => get_string('generation_status_queued', 'mod_kwiz'),
        'sent' => get_string('generation_status_sent', 'mod_kwiz'),
        'processing' => get_string('generation_status_processing', 'mod_kwiz'),
        'running' => get_string('generation_status_processing', 'mod_kwiz'),
        'success' => get_string('generation_status_success', 'mod_kwiz'),
        'error' => get_string('generation_status_error', 'mod_kwiz'),
    );
    return $map[$status] ?? $status;
}

/**
 * Get or create question category in Moodle's core Question Bank for a course.
 *
 * @param int $courseid Course ID
 * @param string $categoryname Desired category name (optional)
 * @return int Category ID
 */
function kwiz_get_or_create_question_category($courseid, $categoryname = '') {
    global $DB, $CFG;

    require_once($CFG->dirroot . '/question/editlib.php');

    $context = context_course::instance($courseid);
    $defaultcat = question_make_default_categories(array($context));

    $categoryname = trim((string)$categoryname);
    if (empty($categoryname) || $categoryname === 'Default') {
        return (int)$defaultcat->id;
    }

    // Check if category already exists under this context
    $existing = $DB->get_record('question_categories', array(
        'contextid' => $context->id,
        'name' => $categoryname
    ));

    if ($existing) {
        return (int)$existing->id;
    }

    // Create subcategory under default category
    $newcat = new stdClass();
    $newcat->name = $categoryname;
    $newcat->contextid = $context->id;
    $newcat->info = 'Generated by AI Assessment System';
    $newcat->infoformat = FORMAT_HTML;
    $newcat->stamp = make_unique_id_code();
    $newcat->parent = $defaultcat->id;
    $newcat->sortorder = 999;
    $newcat->idnumber = null;

    return (int)$DB->insert_record('question_categories', $newcat);
}

/**
 * Find or automatically create a standard Moodle Quiz (mod_quiz) in the course.
 *
 * @param stdClass $kwiz Gamified quiz instance
 * @return stdClass Standard quiz record with ->cmid
 */
function kwiz_get_or_create_standard_quiz($kwiz) {
    global $DB, $CFG;

    require_once($CFG->dirroot . '/mod/quiz/lib.php');
    require_once($CFG->dirroot . '/mod/quiz/locallib.php');
    require_once($CFG->dirroot . '/course/lib.php');

    $courseid = (int)$kwiz->course;
    $quizname = trim((string)$kwiz->name);
    if (empty($quizname)) {
        $quizname = 'Quiz ' . $kwiz->id;
    }

    // Look for existing standard quiz in this course with the same name
    $sql = "SELECT q.*, cm.id AS cmid 
              FROM {quiz} q
              JOIN {course_modules} cm ON cm.instance = q.id
              JOIN {modules} m ON m.id = cm.module
             WHERE m.name = 'quiz' AND q.course = ? AND q.name = ?";
    $existing = $DB->get_record_sql($sql, array($courseid, $quizname));
    if ($existing) {
        return $existing;
    }

    // Create course module entry for mod_quiz
    $module = $DB->get_record('modules', array('name' => 'quiz'), '*', MUST_EXIST);
    $cm = new stdClass();
    $cm->course = $courseid;
    $cm->module = $module->id;
    $cm->section = 1;
    $cm->added = time();
    $cmid = add_course_module($cm);

    // Create standard mod_quiz instance
    $quiz = new stdClass();
    $quiz->course = $courseid;
    $quiz->name = $quizname;
    $quiz->intro = !empty($kwiz->intro) ? $kwiz->intro : ('<p>' . s($quizname) . '</p>');
    $quiz->introformat = FORMAT_HTML;
    $quiz->coursemodule = $cmid;
    $quiz->timeopen = 0;
    $quiz->timeclose = 0;
    $quiz->timelimit = 0;
    $quiz->overduehandling = 'autosubmit';
    $quiz->graceperiod = 0;
    $quiz->preferredbehaviour = 'deferredfeedback';
    $quiz->canredoquestions = 0;
    $quiz->attempts = 0;
    $quiz->attemptonlast = 0;
    $quiz->grademethod = 1;
    $quiz->decimalpoints = 2;
    $quiz->questiondecimalpoints = -1;
    $quiz->reviewattempt = 69888;
    $quiz->reviewcorrectness = 4352;
    $quiz->reviewmarks = 4352;
    $quiz->reviewspecificfeedback = 4352;
    $quiz->reviewgeneralfeedback = 4352;
    $quiz->reviewrightanswer = 4352;
    $quiz->reviewoverallfeedback = 4352;
    $quiz->questionsperpage = 1;
    $quiz->navmethod = 'free';
    $quiz->shuffleanswers = 1;
    $quiz->sumgrades = 0;
    $quiz->grade = 10.0;
    $quiz->timecreated = time();
    $quiz->timemodified = time();
    $quiz->quizpassword = '';
    $quiz->subnet = '';
    $quiz->browsersecurity = '-';
    $quiz->delay1 = 0;
    $quiz->delay2 = 0;
    $quiz->showuserpicture = 0;
    $quiz->showblocks = 0;
    $quiz->completionattemptsexhausted = 0;
    $quiz->completionminattempts = 0;
    $quiz->allowofflineattempts = 0;

    $quizid = quiz_add_instance($quiz);
    $DB->set_field('course_modules', 'instance', $quizid, array('id' => $cmid));
    course_add_cm_to_section($courseid, $cmid, 1);
    rebuild_course_cache($courseid, true);

    $createdquiz = $DB->get_record('quiz', array('id' => $quizid));
    $createdquiz->cmid = $cmid;
    return $createdquiz;
}

/**
 * Create or retrieve a named standard mod_quiz instance in a course.
 *
 * @param int $courseid Course ID
 * @param string $quizname Quiz title
 * @return stdClass Standard quiz record with cmid
 */
function kwiz_create_standard_quiz_named($courseid, $quizname) {
    global $DB, $CFG;

    require_once($CFG->dirroot . '/mod/quiz/lib.php');
    require_once($CFG->dirroot . '/mod/quiz/locallib.php');
    require_once($CFG->dirroot . '/course/lib.php');

    $quizname = trim((string)$quizname);
    if (empty($quizname)) {
        $quizname = 'Quiz ' . date('Y-m-d H:i');
    }

    $sql = "SELECT q.*, cm.id AS cmid 
              FROM {quiz} q
              JOIN {course_modules} cm ON cm.instance = q.id
              JOIN {modules} m ON m.id = cm.module
             WHERE m.name = 'quiz' AND q.course = ? AND q.name = ?";
    $existing = $DB->get_record_sql($sql, array($courseid, $quizname));
    if ($existing) {
        return $existing;
    }

    $module = $DB->get_record('modules', array('name' => 'quiz'), '*', MUST_EXIST);
    $cm = new stdClass();
    $cm->course = $courseid;
    $cm->module = $module->id;
    $cm->section = 1;
    $cm->added = time();
    $cmid = add_course_module($cm);

    $quiz = new stdClass();
    $quiz->course = $courseid;
    $quiz->name = $quizname;
    $quiz->intro = '<p>' . s($quizname) . '</p>';
    $quiz->introformat = FORMAT_HTML;
    $quiz->coursemodule = $cmid;
    $quiz->timeopen = 0;
    $quiz->timeclose = 0;
    $quiz->timelimit = 0;
    $quiz->overduehandling = 'autosubmit';
    $quiz->graceperiod = 0;
    $quiz->preferredbehaviour = 'deferredfeedback';
    $quiz->canredoquestions = 0;
    $quiz->attempts = 0;
    $quiz->attemptonlast = 0;
    $quiz->grademethod = 1;
    $quiz->decimalpoints = 2;
    $quiz->questiondecimalpoints = -1;
    $quiz->reviewattempt = 69888;
    $quiz->reviewcorrectness = 4352;
    $quiz->reviewmarks = 4352;
    $quiz->reviewspecificfeedback = 4352;
    $quiz->reviewgeneralfeedback = 4352;
    $quiz->reviewrightanswer = 4352;
    $quiz->reviewoverallfeedback = 4352;
    $quiz->questionsperpage = 1;
    $quiz->navmethod = 'free';
    $quiz->shuffleanswers = 1;
    $quiz->sumgrades = 0;
    $quiz->grade = 10.0;
    $quiz->timecreated = time();
    $quiz->timemodified = time();
    $quiz->quizpassword = '';
    $quiz->subnet = '';
    $quiz->browsersecurity = '-';
    $quiz->delay1 = 0;
    $quiz->delay2 = 0;
    $quiz->showuserpicture = 0;
    $quiz->showblocks = 0;
    $quiz->completionattemptsexhausted = 0;
    $quiz->completionminattempts = 0;
    $quiz->allowofflineattempts = 0;

    $quizid = quiz_add_instance($quiz);
    $DB->set_field('course_modules', 'instance', $quizid, array('id' => $cmid));
    course_add_cm_to_section($courseid, $cmid, 1);
    rebuild_course_cache($courseid, true);

    $createdquiz = $DB->get_record('quiz', array('id' => $quizid));
    $createdquiz->cmid = $cmid;
    return $createdquiz;
}

/**
 * Convert Markdown code blocks and formatting into styled HTML suitable for Moodle questions.
 *
 * @param string $text Markdown or plain text
 * @return string Styled HTML
 */
function kwiz_format_markdown_to_moodle_html($text) {
    if (empty($text)) {
        return '';
    }
    if (strpos($text, '<pre') !== false) {
        return $text;
    }
    $formatted = preg_replace_callback('/```([a-zA-Z0-9_\+\-]*)\s*\n?([\s\S]*?)\s*```/', function($matches) {
        $lang = !empty($matches[1]) ? htmlspecialchars($matches[1], ENT_QUOTES, 'UTF-8') : 'python';
        $code = htmlspecialchars($matches[2], ENT_QUOTES, 'UTF-8');
        return '<pre style="background: #0f172a; color: #38bdf8; padding: 12px; border-radius: 4px; font-family: monospace; font-size: 0.9rem; overflow-x: auto; margin: 10px 0;"><code class="language-' . $lang . '">' . $code . '</code></pre>';
    }, $text);
    $formatted = preg_replace_callback('/`([^`\n]+)`/', function($matches) {
        return '<code style="background: #f1f5f9; color: #0f172a; padding: 2px 5px; border-radius: 3px; font-family: monospace;">' . htmlspecialchars($matches[1], ENT_QUOTES, 'UTF-8') . '</code>';
    }, $formatted);
    $parts = explode('<pre', $formatted);
    $result = nl2br($parts[0]);
    for ($i = 1; $i < count($parts); $i++) {
        $subparts = explode('</pre>', $parts[$i], 2);
        $result .= '<pre' . $subparts[0] . '</pre>';
        if (isset($subparts[1])) {
            $result .= nl2br($subparts[1]);
        }
    }
    return $result;
}

/**
 * Create a question in Moodle's native question bank (Moodle 4.0+ compliant).
 * Inserts into {question}, {question_bank_entries}, {question_versions},
 * {qtype_multichoice_options}, and {question_answers}.
 *
 * @param string $questiontext Question text
 * @param array $choices Array of choices with text and is_correct
 * @param int $categoryid Question category ID
 * @param int $courseid Course ID
 * @param string $difficulty Difficulty level
 * @param string $explanation Optional answer explanation
 * @param string $source_chunk_ids Optional source chunk reference
 * @return int|false Question ID on success, false on failure
 */
function kwiz_create_question_bank_question($questiontext, $choices, $categoryid, $courseid, $difficulty = 'medium', $explanation = '', $source_chunk_ids = '') {
    global $DB, $CFG, $USER;

    require_once($CFG->dirroot . '/question/type/multichoice/questiontype.php');
    require_once($CFG->dirroot . '/question/engine/bank.php');
    require_once($CFG->dirroot . '/question/editlib.php');

    try {
        if (empty($categoryid)) {
            $categoryid = kwiz_get_or_create_question_category($courseid);
        }

        // Verify category exists
        $category = $DB->get_record('question_categories', array('id' => $categoryid), '*', MUST_EXIST);

        $nameprefix = !empty($source_chunk_ids) ? ("[" . $source_chunk_ids . "] ") : "";
        $qname = shorten_text($nameprefix . strip_tags($questiontext), 80);

        // Check if question already exists in this category to prevent duplicate questions (Moodle 4.0+ schema)
        $sql = "SELECT q.id 
                  FROM {question} q
                  JOIN {question_versions} qv ON qv.questionid = q.id
                  JOIN {question_bank_entries} qbe ON qbe.id = qv.questionbankentryid
                 WHERE qbe.questioncategoryid = ? AND q.name = ?";
        $existingid = $DB->get_field_sql($sql, array($categoryid, $qname));
        if ($existingid) {
            return (int)$existingid;
        }

        $userid = (!empty($USER) && !empty($USER->id)) ? $USER->id : 2; // Default to admin if CLI / webhook

        $formatted_questiontext = kwiz_format_markdown_to_moodle_html($questiontext);

        // Create core question record (Moodle 4.0+ schema)
        $question = new stdClass();
        $question->parent = 0;
        $question->name = $qname;
        $question->questiontext = $formatted_questiontext;
        $question->questiontextformat = FORMAT_HTML;
        $question->generalfeedback = !empty($explanation) ? $explanation : '';
        $question->generalfeedbackformat = FORMAT_HTML;
        $question->defaultmark = 1.0;
        $question->penalty = 0.3333333;
        $question->qtype = 'multichoice';
        $question->length = 1;
        $question->stamp = make_unique_id_code();
        $question->timecreated = time();
        $question->timemodified = $question->timecreated;
        $question->createdby = $userid;
        $question->modifiedby = $userid;

        $question->id = $DB->insert_record('question', $question);
        if (!$question->id) {
            error_log("Kwiz: Failed to insert question into question table");
            return false;
        }

        // Create question bank entry and version (Moodle 4.0+ architecture)
        $tablemanager = $DB->get_manager();
        if ($tablemanager->table_exists('question_bank_entries')) {
            $entry = new stdClass();
            $entry->questioncategoryid = $categoryid;
            $entry->idnumber = null;
            $entry->ownerid = $userid;
            $entry->id = $DB->insert_record('question_bank_entries', $entry);

            if ($entry->id) {
                $version = new stdClass();
                $version->questionbankentryid = $entry->id;
                $version->questionid = $question->id;
                $version->version = 1;
                $version->status = 'ready';
                $DB->insert_record('question_versions', $version);
            }
        }

        // Create multichoice options
        $mc = new stdClass();
        $mc->questionid = $question->id;
        $mc->layout = 0; // Vertical layout
        $mc->single = 1; // Single answer
        $mc->shuffleanswers = 1;
        $mc->correctfeedback = get_string('correctansweris', 'qtype_multichoice');
        $mc->correctfeedbackformat = FORMAT_HTML;
        $mc->partiallycorrectfeedback = '';
        $mc->partiallycorrectfeedbackformat = FORMAT_HTML;
        $mc->incorrectfeedback = get_string('incorrectansweris', 'qtype_multichoice');
        $mc->incorrectfeedbackformat = FORMAT_HTML;
        $mc->answernumbering = 'abc';
        $mc->shownumcorrect = 0;
        $mc->showstandardinstruction = 0;
        $DB->insert_record('qtype_multichoice_options', $mc);

        // Determine correct answer index
        $correctindex = 0;
        foreach ($choices as $idx => $choice) {
            if (is_array($choice) && !empty($choice['is_correct'])) {
                $correctindex = $idx;
                break;
            }
        }

        // Create answer options in {question_answers}
        foreach ($choices as $idx => $choice) {
            $answer = new stdClass();
            $answer->question = $question->id;
            $answer->answer = is_array($choice) ? ($choice['text'] ?? '') : $choice;
            $answer->answerformat = FORMAT_HTML;
            $iscorrect = ($idx == $correctindex);
            $answer->fraction = $iscorrect ? 1.0 : 0.0;
            $answer->feedback = ($iscorrect && !empty($explanation)) ? $explanation : '';
            $answer->feedbackformat = FORMAT_HTML;

            $DB->insert_record('question_answers', $answer);
        }

        return (int)$question->id;

    } catch (Exception $e) {
        $info = ($e instanceof dml_exception) ? (" | Debug: " . $e->debuginfo) : "";
        error_log("Kwiz: Error creating question in question bank: " . $e->getMessage() . $info . " in " . $e->getFile() . ":" . $e->getLine());
        return false;
    }
}

/**
 * Batch migrate all legacy questions from kwiz_questions into Question Bank and standard mod_quiz.
 *
 * @return array Summary of migrated questions and quizzes
 */
function kwiz_migrate_legacy_questions() {
    global $DB, $CFG;

    require_once($CFG->dirroot . '/mod/quiz/locallib.php');

    $allquestions = $DB->get_records('kwiz_questions', null, 'id ASC');
    $migrated = 0;
    $quizzes_updated = array();

    foreach ($allquestions as $q) {
        $kwiz = $DB->get_record('kwiz', array('id' => $q->kwizid));
        $courseid = $kwiz ? (int)$kwiz->course : 2;

        $catname = !empty($q->category_name) ? $q->category_name : ($kwiz ? $kwiz->name : 'General');
        $catid = kwiz_get_or_create_question_category($courseid, $catname);

        $choices = json_decode($q->choices, true);
        if (!is_array($choices)) {
            continue;
        }

        $qid = kwiz_create_question_bank_question(
            $q->question_text,
            $choices,
            $catid,
            $courseid,
            $q->difficulty
        );

        if ($qid) {
            $migrated++;
            if ($kwiz) {
                try {
                    $stdquiz = kwiz_get_or_create_standard_quiz($kwiz);
                    if ($stdquiz) {
                        quiz_add_quiz_question($qid, $stdquiz);
                        $quizzes_updated[$stdquiz->id] = $stdquiz->name;
                    }
                    kwiz_add_quiz_question($qid, $kwiz);
                } catch (Throwable $e) {
                    error_log("Migration error linking to quiz: " . $e->getMessage());
                }
            }
        }
    }

    return array(
        'total' => count($allquestions),
        'migrated' => $migrated,
        'quizzes' => $quizzes_updated
    );
}

/**
 * Load questions from Moodle's question bank
 *
 * @param int $categoryid Question category ID
 * @param int $limit Limit number of questions
 * @return array Array of questions
 */
function kwiz_load_question_bank_questions($categoryid, $limit = 0) {
    global $DB, $CFG;
    
    try {
        if (file_exists($CFG->dirroot . '/question/engine/bank.php')) {
            require_once($CFG->dirroot . '/question/engine/bank.php');
        }
        
        if (empty($categoryid)) {
            return array();
        }
        
        // Verify category exists
        $category = $DB->get_record('question_categories', array('id' => $categoryid));
        if (!$category) {
            return array();
        }
        
        // Get questions from category
        $sql = "SELECT q.*, qc.name as categoryname
                FROM {question} q
                JOIN {question_categories} qc ON q.category = qc.id
                WHERE q.category = ? AND q.hidden = 0 AND q.qtype = 'multichoice'
                ORDER BY q.timecreated DESC";
        
        $params = array($categoryid);
        if ($limit > 0) {
            $sql .= " LIMIT ?";
            $params[] = $limit;
        }
        
        $questions = $DB->get_records_sql($sql, $params);
        $result = array();
        
        foreach ($questions as $q) {
            // Get answers
            $answers = $DB->get_records('question_answers', array('question' => $q->id), 'id ASC');
            
            if (empty($answers)) {
                continue; // Skip questions without answers
            }
            
            $choices = array();
            $correctindex = 0;
            foreach ($answers as $idx => $answer) {
                $choices[] = array(
                    'text' => $answer->answer,
                    'is_correct' => ($answer->fraction > 0)
                );
                if ($answer->fraction > 0) {
                    $correctindex = $idx;
                }
            }
            
            $result[] = array(
                'id' => $q->id,
                'question' => $q->questiontext,
                'question_text' => $q->questiontext,
                'choices' => $choices,
                'correct_index' => $correctindex,
                'difficulty' => 'medium' // Default, could be stored in question tags
            );
        }
        
        return $result;
    } catch (Exception $e) {
        error_log("Kwiz: Error loading question bank questions: " . $e->getMessage());
        return array(); // Return empty array on error
    } catch (Error $e) {
        error_log("Kwiz: Fatal error loading question bank questions: " . $e->getMessage());
        return array(); // Return empty array on fatal error
    }
}

/**
 * Get or create question category for Kwiz
 *
 * @param int $courseid Course ID
 * @param int $quizid Quiz instance ID
 * @return int Category ID
 */
function kwiz_get_question_category($courseid, $quizid) {
    global $DB, $CFG;
    
    try {
        if (file_exists($CFG->dirroot . '/question/engine/bank.php')) {
            require_once($CFG->dirroot . '/question/engine/bank.php');
        }
        if (file_exists($CFG->dirroot . '/question/editlib.php')) {
            require_once($CFG->dirroot . '/question/editlib.php');
        }
        
        // Verify course exists
        $course = $DB->get_record('course', array('id' => $courseid));
        if (!$course) {
            error_log("Kwiz: Course {$courseid} not found");
            return 0;
        }
        
        // Get or create context
        try {
            $context = context_course::instance($courseid);
        } catch (Exception $ctx_error) {
            error_log("Kwiz: Error creating context for course {$courseid}: " . $ctx_error->getMessage());
            return 0;
        }
        
        if (!$context || !$context->id) {
            error_log("Kwiz: Invalid context for course {$courseid}");
            return 0;
        }
        
        $categoryname = "Kwiz #{$quizid}";
        
        // Try to find existing category (support both Kwiz and legacy name)
        $category = $DB->get_record('question_categories', array(
            'contextid' => $context->id,
            'name' => $categoryname
        ));
        if (!$category) {
            $category = $DB->get_record('question_categories', array(
                'contextid' => $context->id,
                'name' => "Gamified Quiz #{$quizid}"
            ));
        }
        
        if ($category) {
            return $category->id;
        }
        
        // Get default category for the context
        // Try to get the top-level category for this context
        $defaultcategory = $DB->get_record_sql(
            "SELECT * FROM {question_categories} 
             WHERE contextid = ? AND parent = 0 
             ORDER BY sortorder ASC 
             LIMIT 1",
            array($context->id)
        );
        
        if (!$defaultcategory) {
            // If no default category exists, create one
            $defaultcategory = new stdClass();
            $defaultcategory->name = 'Default';
            $defaultcategory->contextid = $context->id;
            $defaultcategory->info = '';
            $defaultcategory->infoformat = FORMAT_HTML;
            $defaultcategory->stamp = make_unique_id_code();
            $defaultcategory->parent = 0;
            $defaultcategory->sortorder = 999;
            $defaultcategory->idnumber = null;
            $defaultcategory->id = $DB->insert_record('question_categories', $defaultcategory);
        }
        
        // Create new category
        $category = new stdClass();
        $category->name = $categoryname;
        $category->contextid = $context->id;
        $category->info = '';
        $category->infoformat = FORMAT_HTML;
        $category->stamp = make_unique_id_code();
        $category->parent = $defaultcategory->id;
        $category->sortorder = 999;
        $category->idnumber = null;
        
        return $DB->insert_record('question_categories', $category);
    } catch (Exception $e) {
        error_log("Kwiz: Error getting question category: " . $e->getMessage() . " in " . $e->getFile() . ":" . $e->getLine());
        return 0; // Return 0 on error
    } catch (Error $e) {
        error_log("Kwiz: Fatal error getting question category: " . $e->getMessage());
        return 0; // Return 0 on fatal error
    }
}

/**
 * Add a question to Kwiz (similar to quiz_add_quiz_question)
 *
 * @param int $questionid Question ID from question bank
 * @param stdClass $kwiz Quiz instance
 * @param int $page Page number (0 = add to end)
 * @param float $maxmark Maximum mark for this question
 * @return int|false Slot ID on success, false on failure
 */
function kwiz_add_quiz_question($questionid, $kwiz, $page = 0, $maxmark = null) {
    global $DB;
    
    if (!isset($kwiz->cmid)) {
        $cm = get_coursemodule_from_instance('kwiz', $kwiz->id, $kwiz->course);
        $kwiz->cmid = $cm->id;
    }
    
    $trans = $DB->start_delegated_transaction();
    
    // Check if question already exists in this quiz
    $sql = "SELECT slot.id
              FROM {kwiz_slots} slot
              JOIN {question_references} qr ON qr.itemid = slot.id
              JOIN {question_bank_entries} qbe ON qbe.id = qr.questionbankentryid
             WHERE slot.kwizid = ?
               AND qr.component = ?
               AND qr.questionarea = ?
               AND qr.usingcontextid = ?";
    
    $questionslots = $DB->get_records_sql($sql, [$kwiz->id, 'mod_kwiz', 'slot',
            context_module::instance($kwiz->cmid)->id]);
    
    // Get question bank entry for this question (similar to quiz module)
    // Use helper function if available, otherwise query directly
    if (function_exists('get_question_bank_entry')) {
        $currententry = get_question_bank_entry($questionid);
    } else {
        $entrysql = "SELECT qbe.id
                      FROM {question} q
                      JOIN {question_versions} qv ON q.id = qv.questionid
                      JOIN {question_bank_entries} qbe ON qbe.id = qv.questionbankentryid
                     WHERE q.id = ?
                     ORDER BY qv.version DESC LIMIT 1";
        $currententry = $DB->get_record_sql($entrysql, array($questionid));
    }
    
    if ($currententry && array_key_exists($currententry->id, $questionslots)) {
        $trans->allow_commit();
        return false; // Question already in quiz
    }
    
    // Get existing slots to determine next slot number
    $slots = $DB->get_records('kwiz_slots', 
        array('kwizid' => $kwiz->id), 
        'slot ASC'
    );
    
    $maxpage = 1;
    $numonlastpage = 0;
    foreach ($slots as $slot) {
        if ($slot->page > $maxpage) {
            $maxpage = $slot->page;
            $numonlastpage = 1;
        } else {
            $numonlastpage += 1;
        }
    }
    
        // Create new slot
        $slot = new stdClass();
        $slot->kwizid = $kwiz->id;
        
        if ($maxmark !== null) {
            $slot->maxmark = $maxmark;
        } else {
            // Get default mark from question, default to 1.0 if not found
            $defaultmark = $DB->get_field('question', 'defaultmark', array('id' => $questionid));
            $slot->maxmark = $defaultmark !== false ? $defaultmark : 1.0;
        }
        
    if (is_int($page) && $page >= 1) {
        // Adding on a specific page
        $lastslotbefore = 0;
        foreach (array_reverse($slots) as $otherslot) {
            if ($otherslot->page > $page) {
                $DB->set_field('kwiz_slots', 'slot', $otherslot->slot + 1, array('id' => $otherslot->id));
            } else {
                $lastslotbefore = $otherslot->slot;
                break;
            }
        }
        $slot->slot = $lastslotbefore + 1;
        $slot->page = min($page, $maxpage + 1);
    } else {
        // Add to end
        $lastslot = end($slots);
        if ($lastslot) {
            $slot->slot = $lastslot->slot + 1;
        } else {
            $slot->slot = 1;
        }
        $slot->page = $maxpage;
    }
    
    $slotid = $DB->insert_record('kwiz_slots', $slot);
    
    // Update quiz sumgrades after adding question
    $sumgrades = $DB->get_field_sql(
        "SELECT COALESCE(SUM(maxmark), 0) FROM {kwiz_slots} WHERE kwizid = ?",
        array($kwiz->id)
    );
    $DB->set_field('kwiz', 'sumgrades', $sumgrades, array('id' => $kwiz->id));
    
    // Update grade item
    $kwiz->sumgrades = $sumgrades;
    kwiz_grade_item_update($kwiz);
    
    // Create question reference (like quiz module)
    $questionreferences = new stdClass();
    $questionreferences->usingcontextid = context_module::instance($kwiz->cmid)->id;
    $questionreferences->component = 'mod_kwiz';
    $questionreferences->questionarea = 'slot';
    $questionreferences->itemid = $slotid;
    // Get question bank entry ID (similar to quiz module)
    if (function_exists('get_question_bank_entry')) {
        $entry = get_question_bank_entry($questionid);
    } else {
        $entrysql = "SELECT qbe.id
                      FROM {question} q
                      JOIN {question_versions} qv ON q.id = qv.questionid
                      JOIN {question_bank_entries} qbe ON qbe.id = qv.questionbankentryid
                     WHERE q.id = ?
                     ORDER BY qv.version DESC LIMIT 1";
        $entry = $DB->get_record_sql($entrysql, array($questionid));
    }
    
    if (!$entry || !isset($entry->id)) {
        $trans->rollback();
        return false;
    }
    
    $questionreferences->questionbankentryid = $entry->id;
    $questionreferences->version = null; // Always latest
    $DB->insert_record('question_references', $questionreferences);
    
    $trans->allow_commit();
    
    return $slotid;
}

/**
 * Calculate and store grade for a student's quiz attempt (similar to quiz module)
 *
 * @param int $quizid Quiz instance ID
 * @param int $userid User ID
 * @param string $sessionid Session ID
 * @param int $cmid Course module ID
 * @return float Grade (0-100)
 */
function kwiz_calculate_grade($quizid, $userid, $sessionid, $cmid) {
    global $DB;
    
    // Get all responses for this user in this session
    $responses = $DB->get_records('kwiz_responses', array(
        'userid' => $userid,
        'session_id' => $sessionid
    ));
    
    if (empty($responses)) {
        return 0.0;
    }
    
    // Get quiz instance to calculate sumgrades
    $kwiz = $DB->get_record('kwiz', array('id' => $quizid), '*', MUST_EXIST);
    
    // Get total possible marks from slots
    $slots = $DB->get_records('kwiz_slots', array('kwizid' => $quizid));
    $sumgrades = 0;
    foreach ($slots as $slot) {
        $sumgrades += $slot->maxmark;
    }
    
    if ($sumgrades == 0) {
        // Fallback: count questions
        $sumgrades = count($responses);
    }
    
    // Calculate total score
    $total_score = 0;
    foreach ($responses as $response) {
        // Get question's maxmark from slot
        $question = $DB->get_record('kwiz_questions', array('id' => $response->questionid));
        if ($question) {
            // Find slot for this question
            $slot = $DB->get_record_sql(
                "SELECT s.* FROM {kwiz_slots} s
                 JOIN {question_references} qr ON qr.itemid = s.id
                 JOIN {question_bank_entries} qbe ON qbe.id = qr.questionbankentryid
                 JOIN {question_versions} qv ON qv.questionbankentryid = qbe.id
                 WHERE s.kwizid = ? AND qv.questionid = ?",
                array($quizid, $response->questionid)
            );
            
            if ($slot && $response->is_correct) {
                $total_score += $slot->maxmark;
            }
        } else {
            // Fallback: simple count
            if ($response->is_correct) {
                $total_score += 1;
            }
        }
    }
    
    // Calculate percentage grade (0-100)
    $percentage = ($sumgrades > 0) ? ($total_score / $sumgrades) * 100 : 0;
    
    // Store grade in kwiz_grades table (like quiz_grades)
    $grade_record = $DB->get_record('kwiz_grades', array(
        'kwizid' => $quizid,
        'userid' => $userid
    ));
    
    if ($grade_record) {
        $grade_record->grade = $percentage;
        $grade_record->timemodified = time();
        $DB->update_record('kwiz_grades', $grade_record);
    } else {
        $grade_record = new stdClass();
        $grade_record->kwizid = $quizid;
        $grade_record->userid = $userid;
        $grade_record->grade = $percentage;
        $grade_record->timemodified = time();
        $DB->insert_record('kwiz_grades', $grade_record);
    }
    
    // Store grade in gradebook
    kwiz_update_gradebook($quizid, $userid, $percentage, $cmid);
    
    return $percentage;
}

/**
 * Update Moodle gradebook with quiz grade
 *
 * @param int $quizid Quiz instance ID
 * @param int $userid User ID
 * @param float $grade Grade (0-100)
 * @param int $cmid Course module ID
 * @return bool Success
 */
function kwiz_update_gradebook($quizid, $userid, $grade, $cmid) {
    global $CFG, $DB;
    
    require_once($CFG->dirroot . '/lib/gradelib.php');
    require_once($CFG->dirroot . '/mod/kwiz/lib.php');
    
    // Get quiz instance
    $kwiz = $DB->get_record('kwiz', array('id' => $quizid), '*', MUST_EXIST);
    
    // Get course module
    if (empty($cmid)) {
        $cm = get_coursemodule_from_instance('kwiz', $quizid, $kwiz->course, false, MUST_EXIST);
        $cmid = $cm->id;
    }
    
    // Get total marks (sumgrades) from quiz or calculate from slots
    $sumgrades = isset($kwiz->sumgrades) ? $kwiz->sumgrades : 0;
    if ($sumgrades == 0) {
        // Calculate from slots
        $slots = $DB->get_records('kwiz_slots', array('kwizid' => $quizid));
        foreach ($slots as $slot) {
            $sumgrades += $slot->maxmark;
        }
        // Update quiz record
        if ($sumgrades > 0) {
            $DB->set_field('kwiz', 'sumgrades', $sumgrades, array('id' => $quizid));
        }
    }
    
    // Prepare grade data
    // Grade is already a percentage (0-100), convert to raw grade based on total marks
    $grade_data = new stdClass();
    $grade_data->userid = $userid;
    // Convert percentage to raw grade: if grade is 80% and sumgrades is 10, rawgrade = 8
    $grade_data->rawgrade = ($sumgrades > 0) ? ($grade / 100) * $sumgrades : $grade;
    $grade_data->rawgrademax = $sumgrades > 0 ? $sumgrades : 100;
    $grade_data->rawgrademin = 0;
    $grade_data->dategraded = time();
    $grade_data->datesubmitted = time();
    
    // Update gradebook
    $result = grade_update('mod/kwiz', $kwiz->course, 'mod', 'kwiz', $quizid, 0, $grade_data);
    
    return ($result == GRADE_UPDATE_OK);
}

/**
 * Get student's grade for a quiz
 *
 * @param int $quizid Quiz instance ID
 * @param int $userid User ID
 * @return float|null Grade or null if not found
 */
function kwiz_get_student_grade($quizid, $userid) {
    global $CFG, $DB;
    
    require_once($CFG->dirroot . '/lib/gradelib.php');
    
    // Get quiz instance
    $kwiz = $DB->get_record('kwiz', array('id' => $quizid), '*', MUST_EXIST);
    
    // Get grade from gradebook
    $grades = grade_get_grades($kwiz->course, 'mod', 'kwiz', $quizid, array($userid));
    
    if (isset($grades->items[0]->grades[$userid])) {
        $grade_item = $grades->items[0]->grades[$userid];
        if ($grade_item->grade !== null) {
            return (float)$grade_item->grade;
        }
    }
    
    return null;
}

/**
 * Get all student grades for a quiz session
 *
 * @param string $sessionid Session ID
 * @param int $quizid Quiz instance ID
 * @return array Array of grades with userid and grade
 */
function kwiz_get_session_grades($sessionid, $quizid) {
    global $DB;
    
    // Get all unique users who responded in this session
    $sql = "SELECT DISTINCT userid, username, 
            SUM(score) as total_score,
            SUM(is_correct) as correct_count,
            COUNT(*) as total_questions
            FROM {kwiz_responses}
            WHERE session_id = ?
            GROUP BY userid, username
            ORDER BY total_score DESC";
    
    $results = $DB->get_records_sql($sql, array($sessionid));
    $grades = array();
    
    foreach ($results as $result) {
        // Calculate percentage
        $percentage = $result->total_questions > 0 
            ? ($result->correct_count / $result->total_questions) * 100 
            : 0;
        
        $grades[] = array(
            'userid' => $result->userid,
            'username' => $result->username,
            'score' => $result->total_score,
            'correct' => $result->correct_count,
            'total' => $result->total_questions,
            'percentage' => round($percentage, 2)
        );
    }
    
    return $grades;
}

/**
 * Add random questions to Kwiz (similar to quiz_add_random_questions)
 *
 * @param stdClass $kwiz Quiz instance
 * @param int $addonpage Page number to add questions
 * @param int $categoryid Category ID
 * @param int $randomcount Number of random questions
 * @param bool $recurse Include subcategories
 * @return void
 */
function kwiz_add_random_questions($kwiz, $addonpage, $categoryid, $randomcount, $recurse = false) {
    global $DB;
    
    if (!isset($kwiz->cmid)) {
        $cm = get_coursemodule_from_instance('kwiz', $kwiz->id, $kwiz->course);
        $kwiz->cmid = $cm->id;
    }
    
    // Get questions from category
    $category = $DB->get_record('question_categories', array('id' => $categoryid), '*', MUST_EXIST);
    
    // Build SQL to get questions from category (and subcategories if recurse)
    if ($recurse) {
        // Get all subcategories
        $subcategories = $DB->get_records_sql(
            "SELECT id FROM {question_categories} 
             WHERE contextid = ? AND (id = ? OR " . $DB->sql_like('path', '?') . ")",
            array($category->contextid, $categoryid, '%/' . $categoryid . '/%')
        );
        $categoryids = array_keys($subcategories);
    } else {
        $categoryids = array($categoryid);
    }
    
    // Get multichoice questions from categories
    list($insql, $inparams) = $DB->get_in_or_equal($categoryids);
    $questions = $DB->get_records_sql(
        "SELECT DISTINCT q.id 
         FROM {question} q
         WHERE q.category $insql 
           AND q.qtype = 'multichoice' 
           AND q.hidden = 0
         ORDER BY RAND()",
        $inparams
    );
    
    // Limit to requested count
    $questions = array_slice($questions, 0, $randomcount);
    
    // Add questions to quiz
    foreach ($questions as $question) {
        kwiz_add_quiz_question($question->id, $kwiz, $addonpage, 1.0);
    }
    
    // Update grade item after adding all random questions
    kwiz_grade_item_update($kwiz);
}

/**
 * Output fragment for question bank (similar to mod_quiz_output_fragment_quiz_question_bank)
 *
 * @param array $args Fragment arguments
 * @return string Rendered HTML
 */
function mod_kwiz_output_fragment_question_bank($args): string {
    global $PAGE;
    
    // Retrieve params
    $params = [];
    $extraparams = [];
    $querystring = parse_url($args['querystring'], PHP_URL_QUERY);
    parse_str($querystring, $params);
    
    $viewclass = \mod_kwiz\question\bank\custom_view::class;
    $extraparams['view'] = $viewclass;
    
    // Build required parameters (use quiz's function)
    if (function_exists('build_required_parameters_for_custom_view')) {
        [$contexts, $thispageurl, $cm, $pagevars, $extraparams] =
            build_required_parameters_for_custom_view($params, $extraparams);
    } else {
        // Fallback: use question_edit_setup
        list($thispageurl, $contexts, $cmid, $cm, $module, $pagevars) =
            question_edit_setup('editq', '/mod/kwiz/edit.php', true);
    }
    
    $course = get_course($cm->course);
    require_capability('mod/kwiz:addinstance', $contexts->lowest());
    
    // Custom View
    $questionbank = new $viewclass($contexts, $thispageurl, $course, $cm, $pagevars, $extraparams);
    
    // Output using core question bank renderer
    $renderer = $PAGE->get_renderer('core_question', 'bank');
    return $renderer->render($questionbank);
}

/**
 * Retrieve text content of a Moodle course module (page, lesson, book) for RAG.
 *
 * @param int $cmid Course module ID
 * @return string Plain text content of the module
 */
function kwiz_get_module_text_content($cmid, $topic_id = 0, $subitem_id = 0) {
    global $DB;
    
    try {
        $cm = get_coursemodule_from_id('', $cmid, 0, false, IGNORE_MISSING);
        if (!$cm) {
            return '';
        }
        
        $content = '';
        
        if ($cm->modname === 'page') {
            $page = $DB->get_record('page', array('id' => $cm->instance));
            if ($page) {
                $content = $page->content;
                if (!empty($page->intro)) {
                    $content = $page->intro . "\n\n" . $content;
                }
            }
        } else if ($cm->modname === 'lesson') {
            $lesson = $DB->get_record('lesson', array('id' => $cm->instance));
            if ($topic_id > 0) {
                $page = $DB->get_record('lesson_pages', array('id' => $topic_id));
                if ($page) {
                    $content = $page->contents;
                }
            } else {
                $pages = $DB->get_records('lesson_pages', array('lessonid' => $cm->instance));
                if ($pages) {
                    foreach ($pages as $p) {
                        $content .= $p->contents . "\n\n";
                    }
                }
                if ($lesson && !empty($lesson->intro)) {
                    $content = $lesson->intro . "\n\n" . $content;
                }
            }
        } else if ($cm->modname === 'book') {
            if ($subitem_id > 0) {
                $chapter = $DB->get_record('book_chapters', array('id' => $subitem_id));
                if ($chapter) {
                    $content = $chapter->content;
                }
            } else if ($topic_id > 0) {
                $chapter = $DB->get_record('book_chapters', array('id' => $topic_id));
                if ($chapter) {
                    $content = $chapter->content . "\n\n";
                    // Also gather subchapters of this chapter
                    $chapters = $DB->get_records('book_chapters', array('bookid' => $cm->instance), 'pagenum ASC');
                    $collect = false;
                    foreach ($chapters as $ch) {
                        if ($ch->id == $topic_id) {
                            $collect = true;
                            continue;
                        }
                        if ($collect) {
                            if (!$ch->subchapter) {
                                break;
                            }
                            $content .= $ch->content . "\n\n";
                        }
                    }
                }
            } else {
                $chapters = $DB->get_records('book_chapters', array('bookid' => $cm->instance));
                if ($chapters) {
                    foreach ($chapters as $ch) {
                        $content .= $ch->content . "\n\n";
                    }
                }
            }
        } else if ($cm->modname === 'resource') {
            $context = context_module::instance($cm->id);
            $fs = get_file_storage();
            $files = $fs->get_area_files($context->id, 'mod_resource', 'content', 0, 'sortorder', false);
            if ($files) {
                foreach ($files as $file) {
                    if (!$file->is_directory()) {
                        $mimetype = $file->get_mimetype();
                        $filename = $file->get_filename();
                        $ext = strtolower(pathinfo($filename, PATHINFO_EXTENSION));

                        if ($mimetype === 'text/plain' || $mimetype === 'text/html' || in_array($ext, ['txt', 'md', 'html', 'htm', 'py', 'c', 'cpp', 'java', 'json', 'csv'])) {
                            $content .= "=== File: " . $filename . " ===\n" . $file->get_content() . "\n\n";
                        } else if (in_array($ext, ['pdf', 'pptx', 'ppt', 'docx', 'doc', 'png', 'jpg', 'jpeg', 'webp'])) {
                            $extracted = kwiz_extract_file_content_via_api($file);
                            if (!empty($extracted)) {
                                $content .= "=== File: " . $filename . " ===\n" . $extracted . "\n\n";
                            }
                        }
                    }
                }
            }
        } else if ($cm->modname === 'folder') {
            $context = context_module::instance($cm->id);
            $fs = get_file_storage();
            $files = $fs->get_area_files($context->id, 'mod_folder', 'content', 0, 'sortorder', false);
            if ($files) {
                foreach ($files as $file) {
                    if (!$file->is_directory()) {
                        $filename = $file->get_filename();
                        $ext = strtolower(pathinfo($filename, PATHINFO_EXTENSION));
                        $mimetype = $file->get_mimetype();
                        if ($mimetype === 'text/plain' || $mimetype === 'text/html' || in_array($ext, ['txt', 'md', 'html', 'htm', 'py', 'c', 'cpp', 'java', 'json', 'csv'])) {
                            $content .= "=== File: " . $filename . " ===\n" . $file->get_content() . "\n\n";
                        } else if (in_array($ext, ['pdf', 'pptx', 'ppt', 'docx', 'doc', 'png', 'jpg', 'jpeg', 'webp'])) {
                            $extracted = kwiz_extract_file_content_via_api($file);
                            if (!empty($extracted)) {
                                $content .= "=== File: " . $filename . " ===\n" . $extracted . "\n\n";
                            }
                        }
                    }
                }
            }
        } else if ($cm->modname === 'label') {
            $label = $DB->get_record('label', array('id' => $cm->instance));
            if ($label && !empty($label->intro)) {
                // 1. Text from label intro (including alt text in images)
                $content .= "=== Course Note / Label ===\n" . $label->intro . "\n\n";

                // 2. Extract media/images attached to the label file area
                $context = context_module::instance($cm->id);
                $fs = get_file_storage();
                $files = $fs->get_area_files($context->id, 'mod_label', 'intro', 0, 'sortorder', false);
                if ($files) {
                    foreach ($files as $file) {
                        if (!$file->is_directory()) {
                            $filename = $file->get_filename();
                            $ext = strtolower(pathinfo($filename, PATHINFO_EXTENSION));
                            if (in_array($ext, ['png', 'jpg', 'jpeg', 'webp', 'pdf', 'docx', 'pptx'])) {
                                $extracted = kwiz_extract_file_content_via_api($file);
                                if (!empty($extracted)) {
                                    $content .= "=== Attached Media: " . $filename . " ===\n" . $extracted . "\n\n";
                                }
                            }
                        }
                    }
                }
            }
        }
        
        if (!empty($content)) {
            return html_to_text($content, 0, false);
        }
    } catch (Exception $e) {
        error_log("Kwiz RAG: Failed to retrieve content for cmid {$cmid}: " . $e->getMessage());
    }
    
    return '';
}

/**
 * Extract plain text from PDF, PPTX, or DOCX file via LLM API /extract_file endpoint.
 *
 * @param stored_file $file Moodle stored_file object
 * @return string Extracted text
 */
function kwiz_extract_file_content_via_api($file) {
    $api_url = get_config('mod_kwiz', 'llmapi_url');
    if (empty($api_url)) {
        $api_url = 'http://llmapi:5001';
    }
    if (strpos($api_url, 'localhost') !== false || strpos($api_url, '127.0.0.1') !== false) {
        $api_url = str_replace(['localhost', '127.0.0.1'], 'llmapi', $api_url);
    }

    try {
        $file_content = $file->get_content();
        if (empty($file_content)) {
            return '';
        }

        $payload = array(
            'filename' => $file->get_filename(),
            'file_content_base64' => base64_encode($file_content),
        );

        $ch = curl_init(rtrim($api_url, '/') . '/extract_file');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
        curl_setopt($ch, CURLOPT_TIMEOUT, 90);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);

        $response = curl_exec($ch);
        $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($http_code === 200 && !empty($response)) {
            $data = json_decode($response, true);
            if (!empty($data['success']) && !empty($data['text'])) {
                return $data['text'];
            }
        }
    } catch (Exception $e) {
        error_log("Kwiz: File extraction error for " . $file->get_filename() . ": " . $e->getMessage());
    }
    return '';
}


/**
 * Get aggregated text content of all RAG-compatible modules in a section.
 *
 * @param int $courseid The course ID
 * @param int $sectionnum The section number
 * @return string Aggregated text content
 */
function kwiz_get_section_text_content($courseid, $sectionnum) {
    $modinfo = get_fast_modinfo($courseid);
    if (!isset($modinfo->sections[$sectionnum])) {
        return '';
    }
    
    $aggregated_content = '';
    foreach ($modinfo->sections[$sectionnum] as $cmid) {
        $cm_item = $modinfo->cms[$cmid];
        if ($cm_item->uservisible && in_array($cm_item->modname, ['page', 'lesson', 'book', 'resource', 'folder', 'label'])) {
            $content = kwiz_get_module_text_content($cmid);
            if (!empty($content)) {
                $aggregated_content .= "=== Activity: " . $cm_item->name . " ===\n";
                $aggregated_content .= $content . "\n\n";
            }
        }
    }
    return $aggregated_content;
}



/**
 * Find the course module ID of the page/lesson/book/resource/label activity preceding this quiz in the course.
 *
 * @param int $current_cmid The course module ID of the Kwiz
 * @return int|null Preceding module ID or null if none
 */
function kwiz_get_preceding_activity_cmid($current_cmid) {
    global $DB;
    
    $current_cm = get_coursemodule_from_id('kwiz', $current_cmid, 0, false, IGNORE_MISSING);
    if (!$current_cm) {
        return null;
    }
    
    $modinfo = get_fast_modinfo($current_cm->course);
    $sectionmodules = $modinfo->sections;
    
    $all_cmids = [];
    foreach ($sectionmodules as $section) {
        foreach ($section as $cmid) {
            $all_cmids[] = $cmid;
        }
    }
    
    $idx = array_search($current_cmid, $all_cmids);
    if ($idx === false || $idx === 0) {
        return null;
    }
    
    for ($i = $idx - 1; $i >= 0; $i--) {
        $prev_cmid = $all_cmids[$i];
        if (!isset($modinfo->cms[$prev_cmid])) {
            continue;
        }
        $prev_cm = $modinfo->cms[$prev_cmid];
        if (in_array($prev_cm->modname, ['page', 'lesson', 'book', 'resource', 'folder', 'label'])) {
            return $prev_cmid;
        }
    }
    
    return null;
}
