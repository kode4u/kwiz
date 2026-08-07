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
 */
function mod_gamifiedquiz_auto_sync_jwt_secret() {
    global $CFG;
    
    // Only sync if config is empty or matches default
    $current_secret = get_config('mod_gamifiedquiz', 'jwt_secret');
    $default_secret = 'change-me-in-production-use-strong-random-key';
    
    // If empty or still using default, try to sync from .env
    if (empty($current_secret) || $current_secret === 'change-me-in-production' || $current_secret === $default_secret) {
        $env_secret = null;
        
        // Try environment variable first (set by Docker)
        $env_secret = getenv('JWT_SECRET');
        
        // Try docker/.env file (single source of truth)
        if (empty($env_secret)) {
            $env_file = $CFG->dirroot . '/../docker/.env';
            if (file_exists($env_file)) {
                $lines = file($env_file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
                foreach ($lines as $line) {
                    $line = trim($line);
                    if (strpos($line, '#') === 0) continue; // Skip comments
                    if (strpos($line, 'JWT_SECRET=') === 0) {
                        $env_secret = trim(substr($line, strlen('JWT_SECRET=')));
                        break;
                    }
                }
            }
        }
        
        // If found, save to config
        if (!empty($env_secret)) {
            set_config('jwt_secret', $env_secret, 'mod_gamifiedquiz');
            return $env_secret;
        }
    }
    
    return $current_secret;
}

/**
 * Returns the information on whether the module supports a feature
 *
 * @param string $feature FEATURE_xx constant for requested feature
 * @return mixed true if the feature is supported, null if unknown
 */
function gamifiedquiz_supports($feature) {
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
 * Saves a new instance of the gamifiedquiz into the database
 *
 * @param stdClass $gamifiedquiz An object from the form in mod_form.php
 * @param mod_gamifiedquiz_mod_form $mform
 * @return int id of newly inserted record
 */
function gamifiedquiz_add_instance($gamifiedquiz, $mform = null) {
    global $DB;

    // Store per-user API keys in user preferences (not in activity table).
    gamifiedquiz_save_user_llm_api_keys_from_form($gamifiedquiz);

    // Prefer custom URL over predefined background
    if (!empty($gamifiedquiz->background_image_url)) {
        $gamifiedquiz->background_image = trim($gamifiedquiz->background_image_url);
    }
    unset($gamifiedquiz->background_image_url);

    if (!isset($gamifiedquiz->difficulty) || empty($gamifiedquiz->difficulty)) {
        $gamifiedquiz->difficulty = 'medium';
    }

    $gamifiedquiz->timecreated = time();
    $gamifiedquiz->timemodified = $gamifiedquiz->timecreated;

    $id = $DB->insert_record('gamifiedquiz', $gamifiedquiz);
    
    // Post-processing after add
    $gamifiedquiz->id = $id;
    // Update grade item for the new quiz instance
    gamifiedquiz_grade_item_update($gamifiedquiz);
    
    return $id;
}

/**
 * Updates an instance of the gamifiedquiz in the database
 *
 * @param stdClass $gamifiedquiz An object from the form in mod_form.php
 * @param mod_gamifiedquiz_mod_form $mform
 * @return boolean Success/Fail
 */
function gamifiedquiz_update_instance($gamifiedquiz, $mform = null) {
    global $DB;

    // Store per-user API keys in user preferences (not in activity table).
    gamifiedquiz_save_user_llm_api_keys_from_form($gamifiedquiz);

    // Prefer custom URL over predefined background
    if (!empty($gamifiedquiz->background_image_url)) {
        $gamifiedquiz->background_image = trim($gamifiedquiz->background_image_url);
    }
    unset($gamifiedquiz->background_image_url);

    $gamifiedquiz->timemodified = time();
    $gamifiedquiz->id = $gamifiedquiz->instance;

    $result = $DB->update_record('gamifiedquiz', $gamifiedquiz);
    
    // Update grade item after update
    if ($result) {
        gamifiedquiz_grade_item_update($gamifiedquiz);
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
function gamifiedquiz_save_user_llm_api_keys_from_form($formdata) {
    global $USER;

    if (isset($formdata->openai_user_api_key)) {
        $key = trim((string)$formdata->openai_user_api_key);
        set_user_preference('mod_gamifiedquiz_openai_api_key', $key, $USER->id);
        unset($formdata->openai_user_api_key);
    }

    if (isset($formdata->gemini_user_api_key)) {
        $key = trim((string)$formdata->gemini_user_api_key);
        set_user_preference('mod_gamifiedquiz_gemini_api_key', $key, $USER->id);
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
function gamifiedquiz_get_user_llm_api_key($backend, $userid = null) {
    global $USER;
    $uid = $userid ?: $USER->id;

    if ($backend === 'openai') {
        return (string)get_user_preferences('mod_gamifiedquiz_openai_api_key', '', $uid);
    }
    if ($backend === 'gemini') {
        return (string)get_user_preferences('mod_gamifiedquiz_gemini_api_key', '', $uid);
    }
    return '';
}

/**
 * Removes an instance of the gamifiedquiz from the database
 *
 * @param int $id Id of the module instance
 * @return boolean Success/Fail
 */
function gamifiedquiz_delete_instance($id) {
    global $DB, $CFG;
    
    require_once($CFG->dirroot . '/lib/gradelib.php');

    if (!$gamifiedquiz = $DB->get_record('gamifiedquiz', array('id' => $id))) {
        return false;
    }

    // Delete grade item
    gamifiedquiz_grade_item_delete($gamifiedquiz);
    
    $DB->delete_records('gamifiedquiz', array('id' => $gamifiedquiz->id));
    return true;
}

/**
 * Update/create grade item for quiz
 *
 * @param stdClass $gamifiedquiz Quiz instance
 * @return int Grade item ID
 */
function gamifiedquiz_grade_item_update($gamifiedquiz) {
    global $CFG, $DB;
    require_once($CFG->dirroot . '/lib/gradelib.php');
    
    // Calculate total marks from slots if sumgrades is not set
    $sumgrades = isset($gamifiedquiz->sumgrades) ? $gamifiedquiz->sumgrades : 0;
    if ($sumgrades == 0) {
        $slots = $DB->get_records('gamifiedquiz_slots', array('gamifiedquizid' => $gamifiedquiz->id));
        foreach ($slots as $slot) {
            $sumgrades += $slot->maxmark;
        }
        // Update quiz record with calculated sumgrades
        if ($sumgrades > 0) {
            $gamifiedquiz->sumgrades = $sumgrades;
            $DB->update_record('gamifiedquiz', $gamifiedquiz);
        }
    }
    
    // Use sumgrades as maximum grade, default to 100 if no questions
    $grademax = $sumgrades > 0 ? $sumgrades : 100;
    
    $params = array(
        'itemname' => $gamifiedquiz->name,
        'idnumber' => $gamifiedquiz->id,
        'gradetype' => GRADE_TYPE_VALUE,
        'grademax' => $grademax,
        'grademin' => 0
    );
    
    return grade_update('mod/gamifiedquiz', $gamifiedquiz->course, 'mod', 'gamifiedquiz', $gamifiedquiz->id, 0, null, $params);
}

/**
 * Delete grade item for quiz
 *
 * @param stdClass $gamifiedquiz Quiz instance
 * @return bool Success
 */
function gamifiedquiz_grade_item_delete($gamifiedquiz) {
    global $CFG;
    
    require_once($CFG->dirroot . '/lib/gradelib.php');
    
    return grade_update('mod/gamifiedquiz', $gamifiedquiz->course, 'mod', 'gamifiedquiz', $gamifiedquiz->id, 0, null, array('deleted' => 1));
}

/**
 * Generate JWT token for WebSocket authentication
 *
 * @param int $userid User ID
 * @param int $sessionid Session ID
 * @param string $role 'teacher' or 'student'
 * @return string JWT token
 */
function gamifiedquiz_generate_jwt($userid, $sessionid, $role) {
    global $DB;
    
    // Auto-sync JWT secret from .env file
    $secret = mod_gamifiedquiz_auto_sync_jwt_secret();
    
    // If still empty, use default
    if (empty($secret)) {
        $secret = 'change-me-in-production-use-strong-random-key';
    }

    // Get user's full name
    $user = $DB->get_record('user', array('id' => $userid), 'firstname, lastname, username');
    $username = '';
    if ($user) {
        $username = trim($user->firstname . ' ' . $user->lastname);
        if (empty($username)) {
            $username = $user->username;
        }
    }

    $payload = array(
        'user_id' => $userid,
        'session_id' => $sessionid,
        'role' => $role,
        'username' => $username,
        'exp' => time() + 3600 // 1 hour
    );

    // JWT encoding with URL-safe base64 (required for JWT standard)
    // Convert standard base64 to URL-safe base64
    function base64url_encode($data) {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }

    $header = base64url_encode(json_encode(['typ' => 'JWT', 'alg' => 'HS256']));
    $payload_encoded = base64url_encode(json_encode($payload));
    $signature = hash_hmac('sha256', "$header.$payload_encoded", $secret, true);
    $signature_encoded = base64url_encode($signature);

    return "$header.$payload_encoded.$signature_encoded";
}

/**
 * Fetch list of available Ollama model names from the LLM API.
 * Uses same URL resolution and native curl as gamifiedquiz_generate_questions.
 *
 * @return array Associative array model_name => model_name for dropdown options
 */
function gamifiedquiz_fetch_ollama_models() {
    $api_url = get_config('mod_gamifiedquiz', 'llmapi_url');
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
            error_log("Gamified Quiz: Failed to fetch Ollama models from {$url}. cURL error: " . ($curl_error ?: 'Unknown error'));
        } else {
            error_log("Gamified Quiz: Failed to fetch Ollama models from {$url}. HTTP {$http_code}. Response: " . substr($response, 0, 200));
        }
        return array();
    }
    $data = json_decode($response, true);
    if (!isset($data['models']) || !is_array($data['models'])) {
        error_log("Gamified Quiz: Invalid response format from {$url}. Expected 'models' array. Got: " . substr($response, 0, 200));
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
function gamifiedquiz_generation_timeout($backend) {
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
function gamifiedquiz_local_generation_batch_size() {
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
function gamifiedquiz_generate_questions_request($topic, $level, $n_questions, $language, $backend, $predefined_data, $llmmodel, $userapikey, $learning_outcomes = '') {
    $api_url = get_config('mod_gamifiedquiz', 'llmapi_url');
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

    $timeout = gamifiedquiz_generation_timeout($backend);

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
        error_log("Gamified Quiz: " . $error_msg);
        return array('error' => $error_msg . ". Please check if LLM API is accessible at " . $api_url);
    }

    if ($http_code === 200) {
        $result = json_decode($response, true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            error_log("Gamified Quiz: JSON decode error: " . json_last_error_msg());
            return array('error' => 'Invalid JSON response from LLM API');
        }

        if (isset($result['questions']) && is_array($result['questions'])) {
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
    error_log("Gamified Quiz: " . $error_msg . " (API URL: " . $api_url . ")");
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
 * @return array|false Generated questions or false on error
 */
function gamifiedquiz_generate_questions($topic, $level = 'medium', $n_questions = 5, $language = 'en', $backend = 'openai', $predefined_data = '', $llmmodel = '', $userapikey = '', $learning_outcomes = '') {
    $batchsize = gamifiedquiz_local_generation_batch_size();
    if ($backend === 'local' && $n_questions > $batchsize) {
        $all = array();
        $remaining = (int)$n_questions;
        while ($remaining > 0) {
            $batch = min($batchsize, $remaining);
            $chunk = gamifiedquiz_generate_questions_request(
                $topic, $level, $batch, $language, $backend, $predefined_data, $llmmodel, $userapikey, $learning_outcomes
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

    return gamifiedquiz_generate_questions_request(
        $topic, $level, $n_questions, $language, $backend, $predefined_data, $llmmodel, $userapikey, $learning_outcomes
    );
}

/**
 * Shared secret for background generation worker callbacks.
 *
 * @return string
 */
function gamifiedquiz_worker_token() {
    $token = getenv('GAMIFIEDQUIZ_WORKER_TOKEN');
    if (!empty($token)) {
        return $token;
    }
    $token = get_config('mod_gamifiedquiz', 'worker_token');
    return !empty($token) ? $token : '';
}

/**
 * Append one JSON line to the evaluation metrics log (research / poster).
 *
 * @param string $event Event name (e.g. generation, moodle_job_complete)
 * @param array $data Additional fields
 */
function gamifiedquiz_append_metrics_log($event, array $data = array()) {
    $path = getenv('GAMIFIEDQUIZ_METRICS_LOG');
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
function gamifiedquiz_moodle_internal_base_url() {
    $url = get_config('mod_gamifiedquiz', 'moodle_internal_url');
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
function gamifiedquiz_generation_webhook_url() {
    return gamifiedquiz_moodle_internal_base_url() . '/mod/gamifiedquiz/ajax/complete_generation_job.php';
}

/**
 * WebSocket server base URL for internal enqueue API.
 *
 * @return string
 */
function gamifiedquiz_websocket_internal_url() {
    $url = get_config('mod_gamifiedquiz', 'websocket_internal_url');
    if (!empty($url)) {
        return rtrim($url, '/');
    }
    return 'http://websocket-server:3001';
}

/**
 * Create a new UUID for jobs/batches.
 *
 * @return string
 */
function gamifiedquiz_new_uuid() {
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
 * Save LLM-generated questions to gamifiedquiz_questions.
 *
 * @param int $gamifiedquizid Quiz instance id
 * @param array $questions Question payloads from LLM
 * @param string $categoryname Category label
 * @param string $sessionid Session id for this job/batch
 * @param string $difficulty Difficulty stored on rows
 * @param string $topic Generation topic/prompt
 * @return int Number saved
 */
function gamifiedquiz_save_generated_questions($gamifiedquizid, $questions, $categoryname, $sessionid, $difficulty, $topic = '') {
    global $DB;

    $saved = 0;
    foreach ($questions as $question) {
        $questiontext = $question['question'] ?? $question['question_text'] ?? '';
        $choices = $question['choices'] ?? array();

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

        $choicesjson = @json_encode($choices, JSON_UNESCAPED_UNICODE | JSON_INVALID_UTF8_SUBSTITUTE);
        if ($choicesjson === false) {
            $choicesjson = json_encode($choices);
        }

        $record = new stdClass();
        $record->gamifiedquizid = $gamifiedquizid;
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
        $DB->insert_record('gamifiedquiz_questions', $record);
        $saved++;
    }

    return $saved;
}

/**
 * Persist multi-category generation form (categories + optional lesson text).
 *
 * @param int $gamifiedquizid Quiz instance id
 * @param array $categories Category rows from UI
 * @param string $lessoncontent Optional lesson paste
 */
function gamifiedquiz_save_generation_preferences($gamifiedquizid, array $categories, $lessoncontent = '') {
    global $DB;

    $payload = array(
        'categories' => array_values($categories),
        'lesson' => (string)$lessoncontent,
    );

    $record = new stdClass();
    $record->id = $gamifiedquizid;
    $record->categories_data = json_encode($payload);
    $record->timemodified = time();
    $DB->update_record('gamifiedquiz', $record);
}

/**
 * Replace the quiz question set in gamifiedquiz_questions (and mirror to questions_data).
 * Removes rows not present in the saved list; updates by id when provided.
 *
 * @param int $gamifiedquizid Quiz instance id
 * @param array $questions Question payloads from the editor
 * @return array Saved questions (with ids)
 */
function gamifiedquiz_sync_questions($gamifiedquizid, $questions) {
    global $DB;

    $transaction = $DB->start_delegated_transaction();

    $existing = $DB->get_records('gamifiedquiz_questions', array('gamifiedquizid' => $gamifiedquizid), '', 'id');
    $keptids = array();
    $defaultsession = 'editor_' . $gamifiedquizid;
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
        $record->gamifiedquizid = $gamifiedquizid;
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

        $questionid = !empty($question['id']) ? (int) $question['id'] : 0;
        if ($questionid && isset($existing[$questionid])) {
            $record->id = $questionid;
            $record->session_id = $existing[$questionid]->session_id ?: $defaultsession;
            if (empty($record->category_name) && !empty($existing[$questionid]->category_name)) {
                $record->category_name = $existing[$questionid]->category_name;
            }
            if (empty($record->topic) && !empty($existing[$questionid]->topic)) {
                $record->topic = $existing[$questionid]->topic;
            }
            $DB->update_record('gamifiedquiz_questions', $record);
            $keptids[] = $questionid;
            $question['id'] = $questionid;
        } else {
            $record->session_id = $defaultsession;
            $record->timecreated = time();
            $newid = $DB->insert_record('gamifiedquiz_questions', $record);
            $keptids[] = $newid;
            $question['id'] = $newid;
        }
        $savedforjson[] = $question;
    }

    foreach (array_keys($existing) as $oldid) {
        if (!in_array($oldid, $keptids)) {
            $DB->delete_records('gamifiedquiz_responses', array('questionid' => $oldid));
            $DB->delete_records('gamifiedquiz_questions', array('id' => $oldid));
        }
    }

    $gq = new stdClass();
    $gq->id = $gamifiedquizid;
    $gq->questions_data = json_encode($savedforjson);
    $gq->timemodified = time();
    $DB->update_record('gamifiedquiz', $gq);

    $transaction->allow_commit();

    return $savedforjson;
}

/**
 * Queue a background generation job (DB row + Redis via WebSocket server).
 *
 * @param stdClass $gamifiedquiz Quiz instance
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
function gamifiedquiz_enqueue_generation_job($gamifiedquiz, $userid, $cmid, $topic, $level, $count, $language,
        $backend, $lessoncontext, $llmmodel, $userapikey, $categoryname, $batchid, $learning_outcomes = '') {
    global $DB;

    $apiurl = get_config('mod_gamifiedquiz', 'llmapi_url');
    if (empty($apiurl)) {
        $apiurl = 'http://llmapi:5001';
    }
    if (strpos($apiurl, 'localhost') !== false || strpos($apiurl, '127.0.0.1') !== false) {
        $apiurl = str_replace(array('localhost', '127.0.0.1'), 'llmapi', $apiurl);
    }

    $requestuuid = gamifiedquiz_new_uuid();
    $sessionid = 'genjob_' . $requestuuid;
    $now = time();

    $log = new stdClass();
    $log->gamifiedquizid = $gamifiedquiz->id;
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
    $logid = $DB->insert_record('gamifiedquiz_generation_logs', $log);

    $dispatch = gamifiedquiz_dispatch_llm_async_job(
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
        $DB->update_record('gamifiedquiz_generation_logs', $fail);
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
function gamifiedquiz_dispatch_llm_async_job($logid, $requestuuid, $apiurl, $topic, $level, $count, $language,
        $backend, $lessoncontext, $llmmodel, $userapikey, $learning_outcomes = '') {
    global $DB;

    $token = gamifiedquiz_worker_token();
    if (empty($token)) {
        return array('error' => 'Generation worker token is not configured (GAMIFIEDQUIZ_WORKER_TOKEN).');
    }

    $payload = array(
        'request_uuid' => $requestuuid,
        'topic' => $topic,
        'level' => $level,
        'n_questions' => (int)$count,
        'language' => $language,
        'backend' => $backend,
        'webhook_url' => gamifiedquiz_generation_webhook_url(),
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
    $DB->update_record('gamifiedquiz_generation_logs', $update);

    return array('status' => 'sent');
}

/**
 * Push a generation job onto the Redis queue via the WebSocket server.
 *
 * @param array $payload Job payload
 * @return array Empty on success or error array
 */
function gamifiedquiz_push_generation_queue(array $payload) {
    $token = gamifiedquiz_worker_token();
    if (empty($token)) {
        return array('error' => 'Generation worker token is not configured (GAMIFIEDQUIZ_WORKER_TOKEN).');
    }

    $url = gamifiedquiz_websocket_internal_url() . '/internal/generation/enqueue';
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/json',
        'X-Worker-Token: ' . $token,
    ));
    curl_setopt($ch, CURLOPT_TIMEOUT, 15);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);

    $response = curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlerror = curl_error($ch);
    curl_close($ch);

    if ($curlerror) {
        return array('error' => 'Failed to enqueue generation job: ' . $curlerror);
    }
    if ($code < 200 || $code >= 300) {
        return array('error' => 'Failed to enqueue generation job (HTTP ' . $code . '): ' . substr((string)$response, 0, 200));
    }

    return array();
}

/**
 * Load generated questions for a completed job.
 *
 * @param string $sessionid Job session id
 * @return array Normalized question list
 */
function gamifiedquiz_load_questions_for_session($sessionid) {
    global $DB;

    $records = $DB->get_records('gamifiedquiz_questions', array('session_id' => $sessionid), 'id ASC');
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
function gamifiedquiz_format_generation_job_status($log) {
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
    $statuslabel = gamifiedquiz_generation_status_label($status);

    $out = array(
        'job_id' => $log->request_uuid,
        'batch_id' => $log->batch_id ?? null,
        'category_name' => $log->category_name ?? '',
        'topic' => $log->topic ?? '',
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
        $out['questions'] = gamifiedquiz_load_questions_for_session($log->session_id);
    }

    return $out;
}

/**
 * Human-readable generation status for UI polling.
 *
 * @param string $status Status code
 * @return string
 */
function gamifiedquiz_generation_status_label($status) {
    $map = array(
        'queued' => get_string('generation_status_queued', 'mod_gamifiedquiz'),
        'sent' => get_string('generation_status_sent', 'mod_gamifiedquiz'),
        'processing' => get_string('generation_status_processing', 'mod_gamifiedquiz'),
        'running' => get_string('generation_status_processing', 'mod_gamifiedquiz'),
        'success' => get_string('generation_status_success', 'mod_gamifiedquiz'),
        'error' => get_string('generation_status_error', 'mod_gamifiedquiz'),
    );
    return $map[$status] ?? $status;
}

/**
 * Create a question in Moodle's question bank
 *
 * @param string $questiontext Question text
 * @param array $choices Array of choices with text and is_correct
 * @param int $categoryid Question category ID
 * @param int $courseid Course ID
 * @param string $difficulty Difficulty level
 * @return int|false Question ID on success, false on failure
 */
/**
 * Create a question in Moodle's question bank using question_bank::create_question()
 * Similar to how quiz module creates questions
 *
 * @param string $questiontext Question text
 * @param array $choices Array of choices with text and is_correct
 * @param int $categoryid Question category ID
 * @param int $courseid Course ID
 * @param string $difficulty Difficulty level
 * @return int|false Question ID on success, false on failure
 */
function gamifiedquiz_create_question_bank_question($questiontext, $choices, $categoryid, $courseid, $difficulty = 'medium') {
    global $DB, $CFG, $USER;
    
    require_once($CFG->dirroot . '/question/type/multichoice/questiontype.php');
    require_once($CFG->dirroot . '/question/engine/bank.php');
    require_once($CFG->dirroot . '/question/editlib.php');
    
    try {
        // Get or create question category
        if (empty($categoryid)) {
            // Get default category for course
            $context = context_course::instance($courseid);
            $category = $DB->get_record_sql(
                "SELECT * FROM {question_categories} 
                 WHERE contextid = ? AND parent = 0 
                 ORDER BY sortorder ASC 
                 LIMIT 1",
                array($context->id)
            );
            if (!$category) {
                // Create default category if it doesn't exist
                $category = new stdClass();
                $category->name = 'Default';
                $category->contextid = $context->id;
                $category->info = '';
                $category->infoformat = FORMAT_HTML;
                $category->stamp = make_unique_id_code();
                $category->parent = 0;
                $category->sortorder = 999;
                $category->idnumber = null;
                $category->id = $DB->insert_record('question_categories', $category);
            }
            $categoryid = $category->id;
        }
        
        // Get category to ensure it exists
        $category = $DB->get_record('question_categories', array('id' => $categoryid), '*', MUST_EXIST);
        
        // Create question object (direct database insertion like Moodle question import)
        $question = new stdClass();
        $question->category = $categoryid;
        $question->parent = 0;
        $question->name = shorten_text(strip_tags($questiontext), 80);
        $question->questiontext = $questiontext;
        $question->questiontextformat = FORMAT_HTML;
        $question->generalfeedback = '';
        $question->generalfeedbackformat = FORMAT_HTML;
        $question->defaultmark = 1.0;
        $question->penalty = 0.3333333;
        $question->qtype = 'multichoice';
        $question->length = 1;
        $question->stamp = make_unique_id_code();
        $question->version = make_unique_id_code();
        $question->hidden = 0;
        $question->timecreated = time();
        $question->timemodified = $question->timecreated;
        $question->createdby = $USER->id;
        $question->modifiedby = $USER->id;
        $question->idnumber = null;
        
        // Insert question
        $question->id = $DB->insert_record('question', $question);
        
        if (!$question->id) {
            error_log("Gamified Quiz: Failed to insert question into question table");
            return false;
        }
        
        // Create question bank entry (Moodle 4.0+)
        $tablemanager = $DB->get_manager();
        if ($tablemanager->table_exists('question_bank_entries')) {
            try {
                // Check if entry already exists for this question
                $existingversion = $DB->get_record('question_versions', array('questionid' => $question->id), '*');
                if (!$existingversion) {
                    $entry = new stdClass();
                    $entry->questioncategoryid = $categoryid;
                    $entry->idnumber = null;
                    $entry->ownerid = $USER->id;
                    $entry->id = $DB->insert_record('question_bank_entries', $entry);
                    
                    if ($entry->id) {
                        // Link question to entry via question_versions
                        $version = new stdClass();
                        $version->questionbankentryid = $entry->id;
                        $version->questionid = $question->id;
                        $version->version = 1;
                        $version->status = 'ready';
                        $version->id = $DB->insert_record('question_versions', $version);
                        
                        error_log("Gamified Quiz: Created question bank entry {$entry->id} and version {$version->id} for question {$question->id}");
                    } else {
                        error_log("Gamified Quiz: Failed to create question bank entry for question {$question->id}");
                    }
                } else {
                    error_log("Gamified Quiz: Question version already exists for question {$question->id}");
                }
            } catch (Exception $e) {
                error_log("Gamified Quiz: Error creating question bank entry: " . $e->getMessage() . " in " . $e->getFile() . ":" . $e->getLine());
                // Continue anyway - question is still created
            }
        } else {
            error_log("Gamified Quiz: question_bank_entries table does not exist (older Moodle version?)");
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
        $mc->showstandardinstruction = 0;
        
        $DB->insert_record('qtype_multichoice_options', $mc);
        
        // Find correct answer index
        $correctindex = 0;
        foreach ($choices as $idx => $choice) {
            if (is_array($choice) && isset($choice['is_correct']) && $choice['is_correct']) {
                $correctindex = $idx;
                break;
            }
        }
        
        // Create answer options
        foreach ($choices as $idx => $choice) {
            $answer = new stdClass();
            $answer->question = $question->id;
            $answer->answer = is_array($choice) ? $choice['text'] : $choice;
            $answer->answerformat = FORMAT_HTML;
            $answer->fraction = ($idx == $correctindex) ? 1.0 : 0.0;
            $answer->feedback = '';
            $answer->feedbackformat = FORMAT_HTML;
            
            $DB->insert_record('question_answers', $answer);
        }
        
        return $question->id;
        
    } catch (Exception $e) {
        error_log("Gamified Quiz: Error creating question: " . $e->getMessage() . " in " . $e->getFile() . ":" . $e->getLine());
        return false;
    }
}

/**
 * Load questions from Moodle's question bank
 *
 * @param int $categoryid Question category ID
 * @param int $limit Limit number of questions
 * @return array Array of questions
 */
function gamifiedquiz_load_question_bank_questions($categoryid, $limit = 0) {
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
        error_log("Gamified Quiz: Error loading question bank questions: " . $e->getMessage());
        return array(); // Return empty array on error
    } catch (Error $e) {
        error_log("Gamified Quiz: Fatal error loading question bank questions: " . $e->getMessage());
        return array(); // Return empty array on fatal error
    }
}

/**
 * Get or create question category for gamified quiz
 *
 * @param int $courseid Course ID
 * @param int $quizid Quiz instance ID
 * @return int Category ID
 */
function gamifiedquiz_get_question_category($courseid, $quizid) {
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
            error_log("Gamified Quiz: Course {$courseid} not found");
            return 0;
        }
        
        // Get or create context
        try {
            $context = context_course::instance($courseid);
        } catch (Exception $ctx_error) {
            error_log("Gamified Quiz: Error creating context for course {$courseid}: " . $ctx_error->getMessage());
            return 0;
        }
        
        if (!$context || !$context->id) {
            error_log("Gamified Quiz: Invalid context for course {$courseid}");
            return 0;
        }
        
        $categoryname = "Gamified Quiz #{$quizid}";
        
        // Try to find existing category
        $category = $DB->get_record('question_categories', array(
            'contextid' => $context->id,
            'name' => $categoryname
        ));
        
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
        error_log("Gamified Quiz: Error getting question category: " . $e->getMessage() . " in " . $e->getFile() . ":" . $e->getLine());
        return 0; // Return 0 on error
    } catch (Error $e) {
        error_log("Gamified Quiz: Fatal error getting question category: " . $e->getMessage());
        return 0; // Return 0 on fatal error
    }
}

/**
 * Add a question to gamified quiz (similar to quiz_add_quiz_question)
 *
 * @param int $questionid Question ID from question bank
 * @param stdClass $gamifiedquiz Quiz instance
 * @param int $page Page number (0 = add to end)
 * @param float $maxmark Maximum mark for this question
 * @return int|false Slot ID on success, false on failure
 */
function gamifiedquiz_add_quiz_question($questionid, $gamifiedquiz, $page = 0, $maxmark = null) {
    global $DB;
    
    if (!isset($gamifiedquiz->cmid)) {
        $cm = get_coursemodule_from_instance('gamifiedquiz', $gamifiedquiz->id, $gamifiedquiz->course);
        $gamifiedquiz->cmid = $cm->id;
    }
    
    $trans = $DB->start_delegated_transaction();
    
    // Check if question already exists in this quiz
    $sql = "SELECT slot.id
              FROM {gamifiedquiz_slots} slot
              JOIN {question_references} qr ON qr.itemid = slot.id
              JOIN {question_bank_entries} qbe ON qbe.id = qr.questionbankentryid
             WHERE slot.gamifiedquizid = ?
               AND qr.component = ?
               AND qr.questionarea = ?
               AND qr.usingcontextid = ?";
    
    $questionslots = $DB->get_records_sql($sql, [$gamifiedquiz->id, 'mod_gamifiedquiz', 'slot',
            context_module::instance($gamifiedquiz->cmid)->id]);
    
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
    $slots = $DB->get_records('gamifiedquiz_slots', 
        array('gamifiedquizid' => $gamifiedquiz->id), 
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
        $slot->gamifiedquizid = $gamifiedquiz->id;
        
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
                $DB->set_field('gamifiedquiz_slots', 'slot', $otherslot->slot + 1, array('id' => $otherslot->id));
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
    
    $slotid = $DB->insert_record('gamifiedquiz_slots', $slot);
    
    // Update quiz sumgrades after adding question
    $sumgrades = $DB->get_field_sql(
        "SELECT COALESCE(SUM(maxmark), 0) FROM {gamifiedquiz_slots} WHERE gamifiedquizid = ?",
        array($gamifiedquiz->id)
    );
    $DB->set_field('gamifiedquiz', 'sumgrades', $sumgrades, array('id' => $gamifiedquiz->id));
    
    // Update grade item
    $gamifiedquiz->sumgrades = $sumgrades;
    gamifiedquiz_grade_item_update($gamifiedquiz);
    
    // Create question reference (like quiz module)
    $questionreferences = new stdClass();
    $questionreferences->usingcontextid = context_module::instance($gamifiedquiz->cmid)->id;
    $questionreferences->component = 'mod_gamifiedquiz';
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
function gamifiedquiz_calculate_grade($quizid, $userid, $sessionid, $cmid) {
    global $DB;
    
    // Get all responses for this user in this session
    $responses = $DB->get_records('gamifiedquiz_responses', array(
        'userid' => $userid,
        'session_id' => $sessionid
    ));
    
    if (empty($responses)) {
        return 0.0;
    }
    
    // Get quiz instance to calculate sumgrades
    $gamifiedquiz = $DB->get_record('gamifiedquiz', array('id' => $quizid), '*', MUST_EXIST);
    
    // Get total possible marks from slots
    $slots = $DB->get_records('gamifiedquiz_slots', array('gamifiedquizid' => $quizid));
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
        $question = $DB->get_record('gamifiedquiz_questions', array('id' => $response->questionid));
        if ($question) {
            // Find slot for this question
            $slot = $DB->get_record_sql(
                "SELECT s.* FROM {gamifiedquiz_slots} s
                 JOIN {question_references} qr ON qr.itemid = s.id
                 JOIN {question_bank_entries} qbe ON qbe.id = qr.questionbankentryid
                 JOIN {question_versions} qv ON qv.questionbankentryid = qbe.id
                 WHERE s.gamifiedquizid = ? AND qv.questionid = ?",
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
    
    // Store grade in gamifiedquiz_grades table (like quiz_grades)
    $grade_record = $DB->get_record('gamifiedquiz_grades', array(
        'gamifiedquizid' => $quizid,
        'userid' => $userid
    ));
    
    if ($grade_record) {
        $grade_record->grade = $percentage;
        $grade_record->timemodified = time();
        $DB->update_record('gamifiedquiz_grades', $grade_record);
    } else {
        $grade_record = new stdClass();
        $grade_record->gamifiedquizid = $quizid;
        $grade_record->userid = $userid;
        $grade_record->grade = $percentage;
        $grade_record->timemodified = time();
        $DB->insert_record('gamifiedquiz_grades', $grade_record);
    }
    
    // Store grade in gradebook
    gamifiedquiz_update_gradebook($quizid, $userid, $percentage, $cmid);
    
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
function gamifiedquiz_update_gradebook($quizid, $userid, $grade, $cmid) {
    global $CFG, $DB;
    
    require_once($CFG->dirroot . '/lib/gradelib.php');
    require_once($CFG->dirroot . '/mod/gamifiedquiz/lib.php');
    
    // Get quiz instance
    $gamifiedquiz = $DB->get_record('gamifiedquiz', array('id' => $quizid), '*', MUST_EXIST);
    
    // Get course module
    if (empty($cmid)) {
        $cm = get_coursemodule_from_instance('gamifiedquiz', $quizid, $gamifiedquiz->course, false, MUST_EXIST);
        $cmid = $cm->id;
    }
    
    // Get total marks (sumgrades) from quiz or calculate from slots
    $sumgrades = isset($gamifiedquiz->sumgrades) ? $gamifiedquiz->sumgrades : 0;
    if ($sumgrades == 0) {
        // Calculate from slots
        $slots = $DB->get_records('gamifiedquiz_slots', array('gamifiedquizid' => $quizid));
        foreach ($slots as $slot) {
            $sumgrades += $slot->maxmark;
        }
        // Update quiz record
        if ($sumgrades > 0) {
            $DB->set_field('gamifiedquiz', 'sumgrades', $sumgrades, array('id' => $quizid));
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
    $result = grade_update('mod/gamifiedquiz', $gamifiedquiz->course, 'mod', 'gamifiedquiz', $quizid, 0, $grade_data);
    
    return ($result == GRADE_UPDATE_OK);
}

/**
 * Get student's grade for a quiz
 *
 * @param int $quizid Quiz instance ID
 * @param int $userid User ID
 * @return float|null Grade or null if not found
 */
function gamifiedquiz_get_student_grade($quizid, $userid) {
    global $CFG, $DB;
    
    require_once($CFG->dirroot . '/lib/gradelib.php');
    
    // Get quiz instance
    $gamifiedquiz = $DB->get_record('gamifiedquiz', array('id' => $quizid), '*', MUST_EXIST);
    
    // Get grade from gradebook
    $grades = grade_get_grades($gamifiedquiz->course, 'mod', 'gamifiedquiz', $quizid, array($userid));
    
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
function gamifiedquiz_get_session_grades($sessionid, $quizid) {
    global $DB;
    
    // Get all unique users who responded in this session
    $sql = "SELECT DISTINCT userid, username, 
            SUM(score) as total_score,
            SUM(is_correct) as correct_count,
            COUNT(*) as total_questions
            FROM {gamifiedquiz_responses}
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
 * Add random questions to gamified quiz (similar to quiz_add_random_questions)
 *
 * @param stdClass $gamifiedquiz Quiz instance
 * @param int $addonpage Page number to add questions
 * @param int $categoryid Category ID
 * @param int $randomcount Number of random questions
 * @param bool $recurse Include subcategories
 * @return void
 */
function gamifiedquiz_add_random_questions($gamifiedquiz, $addonpage, $categoryid, $randomcount, $recurse = false) {
    global $DB;
    
    if (!isset($gamifiedquiz->cmid)) {
        $cm = get_coursemodule_from_instance('gamifiedquiz', $gamifiedquiz->id, $gamifiedquiz->course);
        $gamifiedquiz->cmid = $cm->id;
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
        gamifiedquiz_add_quiz_question($question->id, $gamifiedquiz, $addonpage, 1.0);
    }
    
    // Update grade item after adding all random questions
    gamifiedquiz_grade_item_update($gamifiedquiz);
}

/**
 * Output fragment for question bank (similar to mod_quiz_output_fragment_quiz_question_bank)
 *
 * @param array $args Fragment arguments
 * @return string Rendered HTML
 */
function mod_gamifiedquiz_output_fragment_question_bank($args): string {
    global $PAGE;
    
    // Retrieve params
    $params = [];
    $extraparams = [];
    $querystring = parse_url($args['querystring'], PHP_URL_QUERY);
    parse_str($querystring, $params);
    
    $viewclass = \mod_gamifiedquiz\question\bank\custom_view::class;
    $extraparams['view'] = $viewclass;
    
    // Build required parameters (use quiz's function)
    if (function_exists('build_required_parameters_for_custom_view')) {
        [$contexts, $thispageurl, $cm, $pagevars, $extraparams] =
            build_required_parameters_for_custom_view($params, $extraparams);
    } else {
        // Fallback: use question_edit_setup
        list($thispageurl, $contexts, $cmid, $cm, $module, $pagevars) =
            question_edit_setup('editq', '/mod/gamifiedquiz/edit.php', true);
    }
    
    $course = get_course($cm->course);
    require_capability('mod/gamifiedquiz:addinstance', $contexts->lowest());
    
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
function gamifiedquiz_get_module_text_content($cmid, $topic_id = 0, $subitem_id = 0) {
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
            }
        } else if ($cm->modname === 'lesson') {
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
                    if (!$file->is_directory() && ($file->get_mimetype() === 'text/plain' || $file->get_mimetype() === 'text/html')) {
                        $content .= $file->get_content() . "\n\n";
                    }
                }
            }
        }
        
        if (!empty($content)) {
            return html_to_text($content, 0, false);
        }
    } catch (Exception $e) {
        error_log("Gamified Quiz RAG: Failed to retrieve content for cmid {$cmid}: " . $e->getMessage());
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
function gamifiedquiz_get_section_text_content($courseid, $sectionnum) {
    $modinfo = get_fast_modinfo($courseid);
    if (!isset($modinfo->sections[$sectionnum])) {
        return '';
    }
    
    $aggregated_content = '';
    foreach ($modinfo->sections[$sectionnum] as $cmid) {
        $cm_item = $modinfo->cms[$cmid];
        if ($cm_item->uservisible && in_array($cm_item->modname, ['page', 'lesson', 'book', 'resource'])) {
            $content = gamifiedquiz_get_module_text_content($cmid);
            if (!empty($content)) {
                $aggregated_content .= "=== Activity: " . $cm_item->name . " ===\n";
                $aggregated_content .= $content . "\n\n";
            }
        }
    }
    return $aggregated_content;
}



/**
 * Find the course module ID of the page/lesson/book activity preceding this quiz in the course.
 *
 * @param int $current_cmid The course module ID of the gamified quiz
 * @return int|null Preceding module ID or null if none
 */
function gamifiedquiz_get_preceding_activity_cmid($current_cmid) {
    global $DB;
    
    $current_cm = get_coursemodule_from_id('gamifiedquiz', $current_cmid, 0, false, IGNORE_MISSING);
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
        if (in_array($prev_cm->modname, ['page', 'lesson', 'book', 'resource'])) {
            return $prev_cmid;
        }
    }
    
    return null;
}
