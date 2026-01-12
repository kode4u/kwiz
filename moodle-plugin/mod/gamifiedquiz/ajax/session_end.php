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
    
    // Count participants from participants table (tracks all students who joined)
    $participantCount = $DB->count_records('gamifiedquiz_participants', 
        array('session_id' => $sessionid)
    );
    
    // Fallback: if no participants recorded, count from responses
    if ($participantCount == 0) {
        $allResponses = $DB->get_records('gamifiedquiz_responses', 
            array('session_id' => $sessionid)
        );
        if ($allResponses && count($allResponses) > 0) {
            $uniqueUserIds = array();
            foreach ($allResponses as $response) {
                if (!in_array($response->userid, $uniqueUserIds)) {
                    $uniqueUserIds[] = $response->userid;
                }
            }
            $participantCount = count($uniqueUserIds);
        }
    }
    
    $session->timeended = time();
    $session->results_data = $resultsdata;
    $session->participants_count = $participantCount; // Update participant count
    $DB->update_record('gamifiedquiz_sessions', $session);
    
    // Calculate and update grades for all participants
    $grades = gamifiedquiz_get_session_grades($sessionid, $session->gamifiedquizid);
    $updated_count = 0;
    
    foreach ($grades as $grade_data) {
        try {
            gamifiedquiz_update_gradebook(
                $session->gamifiedquizid,
                $grade_data['userid'],
                $grade_data['percentage'],
                $cm->id
            );
            $updated_count++;
        } catch (Exception $e) {
            error_log("Gamified Quiz: Error updating grade for user {$grade_data['userid']}: " . $e->getMessage());
        }
    }
    
    echo json_encode([
        'success' => true,
        'message' => 'Session ended',
        'grades_updated' => $updated_count,
        'total_participants' => $participantCount
    ]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}

