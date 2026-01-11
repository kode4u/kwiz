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
        'total_participants' => count($grades)
    ]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}

