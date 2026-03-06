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
    // Use the latest response per question to handle duplicates/updates
    $userResponses = array(); // userid => array(questionid => latest_response)
    $userNames = array();
    
    foreach ($responses as $response) {
        $userid = $response->userid;
        $questionid = $response->questionid;
        
        // Store username
        if (!isset($userNames[$userid])) {
            $userNames[$userid] = $response->username;
        }
        
        // Keep only the latest response per question per user (in case of duplicates)
        $key = "{$userid}_{$questionid}";
        if (!isset($userResponses[$key]) || 
            $response->timecreated > $userResponses[$key]->timecreated) {
            $userResponses[$key] = $response;
        }
    }
    
    // Calculate total scores per user from deduplicated responses
    $userScores = array();
    foreach ($userResponses as $key => $response) {
        $userid = $response->userid;
        
        // Initialize user score if not exists
        if (!isset($userScores[$userid])) {
            $userScores[$userid] = 0;
        }
        
        // Accumulate score (ensure score is numeric and >= 0)
        $score = isset($response->score) ? (int)$response->score : 0;
        if ($score < 0) $score = 0; // Ensure non-negative
        $userScores[$userid] += $score;
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
    
    // Log for debugging (only if error logging is enabled)
    if (function_exists('error_log')) {
        error_log("Gamified Quiz: Calculated scores for session {$sessionid}. Users: " . count($userScores) . ", Total responses: " . count($responses) . ", Unique responses: " . count($userResponses));
    }
    
    // Sort by score descending
    usort($leaderboard, function($a, $b) {
        return $b['score'] - $a['score'];
    });
    
    echo json_encode(array(
        'success' => true,
        'leaderboard' => $leaderboard,
        'total_responses' => count($responses),
        'unique_responses' => count($userResponses), // Deduplicated count
        'debug_info' => array(
            'session_id' => $sessionid,
            'total_records' => count($responses),
            'unique_user_questions' => count($userResponses),
            'unique_users' => count($userScores)
        )
    ));
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(array(
        'success' => false,
        'error' => $e->getMessage()
    ));
}
