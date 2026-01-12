<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * AJAX endpoint for retrieving quiz session history
 *
 * @package    mod_gamifiedquiz
 * @copyright  2025 JICA Research Project
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

define('AJAX_SCRIPT', true);

require_once(__DIR__ . '/../../../config.php');
require_once($CFG->dirroot . '/mod/gamifiedquiz/lib.php');

// Check if user is logged in
require_login();

// Set content type
header('Content-Type: application/json');

try {
    // Get parameters
    $quizid = required_param('quizid', PARAM_INT);

    // Verify quiz exists and user has permission
    $gamifiedquiz = $DB->get_record('gamifiedquiz', array('id' => $quizid), '*', MUST_EXIST);
    $course = $DB->get_record('course', array('id' => $gamifiedquiz->course), '*', MUST_EXIST);
    $cm = get_coursemodule_from_instance('gamifiedquiz', $gamifiedquiz->id, $course->id, false, MUST_EXIST);

    // Check permissions
    $context = context_module::instance($cm->id);
    require_capability('mod/gamifiedquiz:manage', $context);

    // Get all sessions for this quiz, ordered by most recent first
    $sessions = $DB->get_records('gamifiedquiz_sessions', 
        array('gamifiedquizid' => $quizid), 
        'timecreated DESC'
    );

    $sessionlist = array();
    foreach ($sessions as $session) {
        // Get teacher name
        $teacher = $DB->get_record('user', array('id' => $session->teacherid), 'id,firstname,lastname,username');
        $teachername = $teacher ? fullname($teacher) : 'Unknown Teacher';
        
        // Parse session results if available
        $results = array();
        if (!empty($session->session_results)) {
            $decoded = json_decode($session->session_results, true);
            if ($decoded && is_array($decoded)) {
                $results = $decoded;
            }
        }
        
        // Always calculate participant count from participants table (tracks all students who joined)
        $participantCount = $DB->count_records('gamifiedquiz_participants', 
            array('session_id' => $session->session_id)
        );
        
        // Fallback to session participants_count if count is 0
        if ($participantCount == 0) {
            $participantCount = $session->participants_count;
        }
        
        // Get all responses for this session (for leaderboard building)
        $allResponses = $DB->get_records('gamifiedquiz_responses', 
            array('session_id' => $session->session_id),
            'timecreated ASC'
        );
        
        // If session ended but no results stored in session_results field, build leaderboard from responses
        if ($session->timeended && (empty($results) || !is_array($results) || count($results) === 0)) {
            if ($allResponses && count($allResponses) > 0) {
                $userScores = array();
                $userNames = array();
                foreach ($allResponses as $response) {
                    $userid = $response->userid;
                    if (!isset($userScores[$userid])) {
                        $userScores[$userid] = 0;
                        $userNames[$userid] = $response->username;
                    }
                    $userScores[$userid] += $response->score;
                }
                $results = array(); // Reset results array
                foreach ($userScores as $userid => $totalScore) {
                    $results[] = array(
                        'userId' => (int)$userid,
                        'user_id' => (int)$userid,
                        'userid' => (int)$userid,
                        'id' => (int)$userid,
                        'username' => $userNames[$userid],
                        'score' => (int)$totalScore
                    );
                }
                usort($results, function($a, $b) {
                    return $b['score'] - $a['score'];
                });
            }
        }
        
        $sessionlist[] = array(
            'id' => $session->id,
            'session_id' => $session->session_id,
            'session_name' => $session->session_name,
            'teacher_name' => $teachername,
            'participants_count' => $participantCount,
            'total_questions' => $session->total_questions,
            'started' => $session->started,
            'timecreated' => $session->timecreated,
            'timeended' => $session->timeended,
            'session_results' => $results,
            'created_formatted' => userdate($session->timecreated, get_string('strftimedatetimeshort')),
            'ended_formatted' => $session->timeended ? userdate($session->timeended, get_string('strftimedatetimeshort')) : null
        );
    }

    echo json_encode(array(
        'success' => true,
        'sessions' => $sessionlist
    ));

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(array(
        'success' => false,
        'error' => $e->getMessage()
    ));
}
