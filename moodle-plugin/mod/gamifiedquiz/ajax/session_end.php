<?php
// End session and save final results

define('AJAX_SCRIPT', true);
require_once(__DIR__ . '/../../../config.php');

header('Content-Type: application/json');

try {
    require_login();
    
    $sessionid = required_param('sessionid', PARAM_TEXT);
    $resultsdata = optional_param('resultsdata', '', PARAM_RAW);
    
    $session = $DB->get_record('gamifiedquiz_sessions', ['session_id' => $sessionid]);
    
    if (!$session) {
        throw new Exception('Session not found');
    }
    
    $cm = get_coursemodule_from_instance('gamifiedquiz', $session->gamifiedquizid, 0, false, MUST_EXIST);
    $context = context_module::instance($cm->id);
    require_capability('mod/gamifiedquiz:manage', $context);
    
    $session->timeended = time();
    $session->results_data = $resultsdata;
    $DB->update_record('gamifiedquiz_sessions', $session);
    
    echo json_encode([
        'success' => true,
        'message' => 'Session ended'
    ]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}

