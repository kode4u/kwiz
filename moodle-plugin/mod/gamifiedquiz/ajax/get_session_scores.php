<?php
// Get session scores from database for leaderboard restoration

define('AJAX_SCRIPT', true);
require_once(__DIR__ . '/../../../config.php');

header('Content-Type: application/json');

try {
    require_login();
    
    $sessionid = required_param('sessionid', PARAM_TEXT);
    $quizid = optional_param('quizid', 0, PARAM_INT);
    
    // Get all responses for this session
    $responses = $DB->get_records('gamifiedquiz_responses', 
        array('session_id' => $sessionid),
        'timecreated ASC'
    );
    
    // Calculate total scores per user
    $userScores = array();
    $userNames = array();
    
    foreach ($responses as $response) {
        $userid = $response->userid;
        
        // Initialize user score if not exists
        if (!isset($userScores[$userid])) {
            $userScores[$userid] = 0;
            $userNames[$userid] = $response->username;
        }
        
        // Accumulate score
        $userScores[$userid] += $response->score;
    }
    
    // Build leaderboard array
    $leaderboard = array();
    foreach ($userScores as $userid => $totalScore) {
        $leaderboard[] = array(
            'userId' => (int)$userid,
            'user_id' => (int)$userid,
            'userid' => (int)$userid,
            'id' => (int)$userid,
            'username' => $userNames[$userid],
            'score' => (int)$totalScore
        );
    }
    
    // Sort by score descending
    usort($leaderboard, function($a, $b) {
        return $b['score'] - $a['score'];
    });
    
    echo json_encode(array(
        'success' => true,
        'leaderboard' => $leaderboard,
        'total_responses' => count($responses)
    ));
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(array(
        'success' => false,
        'error' => $e->getMessage()
    ));
}
