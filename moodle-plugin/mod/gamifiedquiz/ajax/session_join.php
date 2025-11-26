<?php
// Update participant count when student joins

define('AJAX_SCRIPT', true);
require_once(__DIR__ . '/../../../config.php');

header('Content-Type: application/json');

try {
    require_login();
    
    $sessionid = required_param('sessionid', PARAM_TEXT);
    
    $session = $DB->get_record('gamifiedquiz_sessions', ['session_id' => $sessionid]);
    
    if ($session) {
        $session->participant_count = $session->participant_count + 1;
        $DB->update_record('gamifiedquiz_sessions', $session);
        
        echo json_encode([
            'success' => true,
            'participantCount' => $session->participant_count
        ]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Session not found']);
    }
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}

