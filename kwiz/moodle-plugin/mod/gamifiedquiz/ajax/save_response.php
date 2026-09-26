<?php
// Save student response to database

define('AJAX_SCRIPT', true);

require_once(__DIR__ . '/../../../config.php');

header('Content-Type: application/json');

try {
    $sessionid = required_param('sessionid', PARAM_TEXT);
    $userid = required_param('userid', PARAM_INT);
    $username = required_param('username', PARAM_TEXT);
    $questionid = required_param('questionid', PARAM_INT);
    $questiontext = optional_param('questiontext', '', PARAM_TEXT);
    $answerindex = required_param('answerindex', PARAM_INT);
    $iscorrect = required_param('iscorrect', PARAM_INT);
    $score = required_param('score', PARAM_INT);
    $timespent = optional_param('timespent', 0, PARAM_INT);
    $quizid = required_param('quizid', PARAM_INT);

    // Check if response already exists for this session/question/user
    $existing = $DB->get_record('gamifiedquiz_responses', array(
        'session_id' => $sessionid,
        'questionid' => $questionid,
        'userid' => $userid
    ));

    $response = new stdClass();
    $response->session_id = $sessionid;
    $response->questionid = $questionid;
    $response->userid = $userid;
    $response->username = $username;
    $response->answer_index = $answerindex;
    $response->is_correct = $iscorrect;
    $response->score = $score;
    $response->time_spent = $timespent;
    $response->timecreated = time();

    if ($existing) {
        $response->id = $existing->id;
        $DB->update_record('gamifiedquiz_responses', $response);
        $responseid = $existing->id;
    } else {
        $responseid = $DB->insert_record('gamifiedquiz_responses', $response);
    }
    
    // Calculate and update grade after saving response
    try {
        $cm = get_coursemodule_from_instance('gamifiedquiz', $quizid, 0, false, MUST_EXIST);
        $grade = gamifiedquiz_calculate_grade($quizid, $userid, $sessionid, $cm->id);
        
        echo json_encode(array(
            'success' => true,
            'responseid' => $responseid,
            'grade' => $grade
        ));
    } catch (Exception $grade_error) {
        // If grade calculation fails, still return success for the response save
        error_log("Gamified Quiz: Error calculating grade: " . $grade_error->getMessage());
        echo json_encode(array(
            'success' => true,
            'responseid' => $responseid,
            'grade_error' => $grade_error->getMessage()
        ));
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(array(
        'success' => false,
        'error' => $e->getMessage()
    ));
}

