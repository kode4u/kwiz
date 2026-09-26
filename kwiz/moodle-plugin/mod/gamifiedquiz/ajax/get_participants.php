<?php
// Get participant count for a session

define('AJAX_SCRIPT', true);
require_once(__DIR__ . '/../../../config.php');

header('Content-Type: application/json');

try {
    require_login();
    
    $sessionid = required_param('sessionid', PARAM_TEXT);
    $quizid = optional_param('quizid', 0, PARAM_INT);
    
    // Check if participants table exists
    $tableExists = $DB->get_manager()->table_exists('gamifiedquiz_participants');
    $participantCount = 0;
    
    if ($tableExists) {
        // Count from participants table
        $participantCount = $DB->count_records('gamifiedquiz_participants', 
            array('session_id' => $sessionid)
        );
    }
    
    // Fallback: count from responses if table doesn't exist or count is 0
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
    
    echo json_encode(array(
        'success' => true,
        'count' => $participantCount
    ));
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(array(
        'success' => false,
        'error' => $e->getMessage(),
        'count' => 0
    ));
}
