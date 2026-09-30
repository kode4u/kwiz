<?php
// End session and save final results

define('AJAX_SCRIPT', true);
require_once(__DIR__ . '/../../../config.php');

header('Content-Type: application/json');

try {
    require_login();
    
    $sessionid = required_param('sessionid', PARAM_TEXT);
    $resultsdata = optional_param('resultsdata', '', PARAM_RAW);
    
    $session = $DB->get_record('kwiz_sessions', ['session_id' => $sessionid]);
    
    if (!$session) {
        throw new Exception('Session not found');
    }
    
    $cm = get_coursemodule_from_instance('kwiz', $session->kwizid, 0, false, MUST_EXIST);
    $context = context_module::instance($cm->id);
    require_capability('mod/kwiz:manage', $context);
    
    // Count participants from participants table (tracks all students who joined)
    $tableExists = $DB->get_manager()->table_exists('kwiz_participants');
    $participantCount = 0;
    
    if ($tableExists) {
        $participantCount = $DB->count_records('kwiz_participants', 
            array('session_id' => $sessionid)
        );
    }
    
    // Fallback: if no participants recorded, count from responses
    if ($participantCount == 0) {
        $allResponses = $DB->get_records('kwiz_responses', 
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
    
    // Final fallback: use existing participant_count from session
    if ($participantCount == 0) {
        $participantCount = $session->participants_count;
    }
    
    $session->timeended = time();
    $session->results_data = $resultsdata;
    $session->participants_count = $participantCount; // Update participant count
    $DB->update_record('kwiz_sessions', $session);
    
    // Calculate and update grades for all participants
    $grades = kwiz_get_session_grades($sessionid, $session->kwizid);
    $updated_count = 0;
    
    foreach ($grades as $grade_data) {
        try {
            kwiz_update_gradebook(
                $session->kwizid,
                $grade_data['userid'],
                $grade_data['percentage'],
                $cm->id
            );
            $updated_count++;
        } catch (Exception $e) {
            error_log("Kwiz: Error updating grade for user {$grade_data['userid']}: " . $e->getMessage());
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

