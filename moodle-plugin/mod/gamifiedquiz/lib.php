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

    // Prefer custom URL over predefined background
    if (!empty($gamifiedquiz->background_image_url)) {
        $gamifiedquiz->background_image = trim($gamifiedquiz->background_image_url);
    }
    unset($gamifiedquiz->background_image_url);

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
        $api_url = 'http://llmapi:5001';
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
    curl_setopt($ch, CURLOPT_TIMEOUT, 180); // 180 second timeout (local LLM can be slow)
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10); // 10 second connection timeout

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
        error_log("Gamified Quiz: " . $error_msg . " (API URL: " . $api_url . ")");
        return array('error' => $error_msg);
    }
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
