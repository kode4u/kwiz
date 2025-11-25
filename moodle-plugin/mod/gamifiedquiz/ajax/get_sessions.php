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
            if ($decoded) {
                $results = $decoded;
            }
        }
        
        $sessionlist[] = array(
            'id' => $session->id,
            'session_id' => $session->session_id,
            'session_name' => $session->session_name,
            'teacher_name' => $teachername,
            'participants_count' => $session->participants_count,
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
