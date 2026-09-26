<?php
// Create new session when teacher starts

define('AJAX_SCRIPT', true);
require_once(__DIR__ . '/../../../config.php');

header('Content-Type: application/json');

try {
    require_login();
    
    $quizid = required_param('quizid', PARAM_INT);
    $questionsdata = optional_param('questionsdata', '', PARAM_RAW);
    
    $gamifiedquiz = $DB->get_record('gamifiedquiz', ['id' => $quizid], '*', MUST_EXIST);
    $cm = get_coursemodule_from_instance('gamifiedquiz', $quizid, 0, false, MUST_EXIST);
    $context = context_module::instance($cm->id);
    require_capability('mod/gamifiedquiz:manage', $context);
    
    // Generate unique session ID
    $sessionId = $quizid . '_' . time() . '_' . random_string(6);
    
    // Delete any old responses for this session (reset scores to zero)
    // This ensures a fresh start when teacher clicks start
    $DB->delete_records('gamifiedquiz_responses', array('session_id' => $sessionId));
    
    // Create session record
    $session = new stdClass();
    $session->gamifiedquizid = $quizid;
    $session->session_id = $sessionId;
    $session->teacherid = $USER->id;
    $session->started = 1;
    $session->participant_count = 0;
    $session->questions_data = $questionsdata ?: $gamifiedquiz->questions_data;
    $session->results_data = json_encode([]);
    $session->timecreated = time();
    
    $dbSessionId = $DB->insert_record('gamifiedquiz_sessions', $session);
    
    echo json_encode([
        'success' => true,
        'sessionId' => $sessionId,
        'dbId' => $dbSessionId
    ]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}

