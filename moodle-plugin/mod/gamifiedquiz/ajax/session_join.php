<?php
// Record student join in participants table

define('AJAX_SCRIPT', true);
require_once(__DIR__ . '/../../../config.php');

header('Content-Type: application/json');

try {
    require_login();
    
    $sessionid = required_param('sessionid', PARAM_TEXT);
    $userid = optional_param('userid', $USER->id, PARAM_INT);
    $username = optional_param('username', '', PARAM_TEXT);
    
    $session = $DB->get_record('gamifiedquiz_sessions', ['session_id' => $sessionid]);
    
    if (!$session) {
        throw new Exception('Session not found');
    }
    
    // Get username if not provided
    if (empty($username)) {
        $user = $DB->get_record('user', ['id' => $userid], 'id,username,firstname,lastname');
        if ($user) {
            $username = $user->username;
        }
    }
    
    // Check if participant already exists
    $existing = $DB->get_record('gamifiedquiz_participants', [
        'session_id' => $sessionid,
        'userid' => $userid
    ]);
    
    if (!$existing) {
        // Insert new participant record
        $participant = new stdClass();
        $participant->session_id = $sessionid;
        $participant->gamifiedquizid = $session->gamifiedquizid;
        $participant->userid = $userid;
        $participant->username = $username;
        $participant->timejoined = time();
        
        $DB->insert_record('gamifiedquiz_participants', $participant);
    }
    
    // Count total participants for this session
    $participantCount = $DB->count_records('gamifiedquiz_participants', ['session_id' => $sessionid]);
    
    // Update session participant count
    $session->participant_count = $participantCount;
    $DB->update_record('gamifiedquiz_sessions', $session);
    
    echo json_encode([
        'success' => true,
        'participantCount' => $participantCount,
        'joined' => !$existing
    ]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}

