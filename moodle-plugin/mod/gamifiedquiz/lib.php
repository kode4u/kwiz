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
        case FEATURE_MOD_INTRO:
            return true;
        case FEATURE_BACKUP_MOODLE2:
            return true;
        case FEATURE_SHOW_DESCRIPTION:
            return true;
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

    $gamifiedquiz->timecreated = time();
    $gamifiedquiz->timemodified = $gamifiedquiz->timecreated;

    $id = $DB->insert_record('gamifiedquiz', $gamifiedquiz);
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

    $gamifiedquiz->timemodified = time();
    $gamifiedquiz->id = $gamifiedquiz->instance;

    return $DB->update_record('gamifiedquiz', $gamifiedquiz);
}

/**
 * Removes an instance of the gamifiedquiz from the database
 *
 * @param int $id Id of the module instance
 * @return boolean Success/Fail
 */
function gamifiedquiz_delete_instance($id) {
    global $DB;

    if (!$gamifiedquiz = $DB->get_record('gamifiedquiz', array('id' => $id))) {
        return false;
    }

    $DB->delete_records('gamifiedquiz', array('id' => $gamifiedquiz->id));
    return true;
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
    // Auto-sync JWT secret from .env file
    $secret = mod_gamifiedquiz_auto_sync_jwt_secret();
    
    // If still empty, use default
    if (empty($secret)) {
        $secret = 'change-me-in-production-use-strong-random-key';
    }

    $payload = array(
        'user_id' => $userid,
        'session_id' => $sessionid,
        'role' => $role,
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
 * Call LLM API to generate questions
 *
 * @param string $topic Topic for questions
 * @param string $level Difficulty level
 * @param int $n_questions Number of questions
 * @param string $language Language code
 * @param string $backend LLM backend (openai, gemini, local)
 * @param string $predefined_data Optional predefined data/context for question generation
 * @return array|false Generated questions or false on error
 */
function gamifiedquiz_generate_questions($topic, $level = 'medium', $n_questions = 5, $language = 'en', $backend = 'openai', $predefined_data = '') {
    $api_url = get_config('mod_gamifiedquiz', 'llmapi_url');
    if (empty($api_url)) {
        // Default: use Docker service name when running in Docker, localhost otherwise
        $api_url = 'http://llmapi:5000';
    }
    
    // If URL contains localhost and we're in Docker, try to use service name
    // This handles cases where user sets localhost in settings
    if (strpos($api_url, 'localhost') !== false || strpos($api_url, '127.0.0.1') !== false) {
        // Try Docker service name first
        $docker_url = str_replace(['localhost', '127.0.0.1'], 'llmapi', $api_url);
        // Fallback to original if Docker URL doesn't work
        $api_url = $docker_url;
    }

    $data = array(
        'topic' => $topic,
        'level' => $level,
        'n_questions' => $n_questions,
        'language' => $language,
        'backend' => $backend
    );
    
    // Add predefined data if provided
    if (!empty($predefined_data)) {
        $data['predefined_data'] = $predefined_data;
    }

    $ch = curl_init($api_url . '/generate');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
    curl_setopt($ch, CURLOPT_TIMEOUT, 60); // 60 second timeout
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10); // 10 second connection timeout

    $response = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curl_error = curl_error($ch);
    curl_close($ch);

    if ($curl_error) {
        error_log("Gamified Quiz: cURL error: " . $curl_error);
        return false;
    }

    if ($http_code === 200) {
        $result = json_decode($response, true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            error_log("Gamified Quiz: JSON decode error: " . json_last_error_msg());
            error_log("Gamified Quiz: Response: " . substr($response, 0, 500));
            return array('error' => 'Invalid JSON response from LLM API');
        }
        
        // Handle both response formats
        if (isset($result['questions']) && is_array($result['questions'])) {
            return $result['questions'];
        } elseif (isset($result['error'])) {
            error_log("Gamified Quiz API error: " . $result['error']);
            return array('error' => $result['error']);
        } else {
            error_log("Gamified Quiz: Unexpected response format: " . print_r($result, true));
            return array('error' => 'Unexpected response format from LLM API');
        }
    } else {
        $error_msg = "HTTP error " . $http_code;
        $error_data = json_decode($response, true);
        if (isset($error_data['error'])) {
            $error_msg .= ": " . $error_data['error'];
        } else {
            $error_msg .= ": " . substr($response, 0, 200);
        }
        error_log("Gamified Quiz: " . $error_msg);
        return array('error' => $error_msg);
    }
}

