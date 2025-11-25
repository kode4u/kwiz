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
 * AJAX endpoint for saving quiz session results
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
    $sessionid = required_param('sessionid', PARAM_TEXT);
    $sessionname = optional_param('sessionname', '', PARAM_TEXT);
    $questionsdata = optional_param('questionsdata', '', PARAM_RAW);
    $participantscount = optional_param('participantscount', 0, PARAM_INT);
    $totalquestions = optional_param('totalquestions', 0, PARAM_INT);
    $sessionresults = optional_param('sessionresults', '', PARAM_RAW);
    $startedat = optional_param('startedat', 0, PARAM_INT);
    $endedat = optional_param('endedat', 0, PARAM_INT);

    // Verify quiz exists and user has permission
    $gamifiedquiz = $DB->get_record('gamifiedquiz', array('id' => $quizid), '*', MUST_EXIST);
    $course = $DB->get_record('course', array('id' => $gamifiedquiz->course), '*', MUST_EXIST);
    $cm = get_coursemodule_from_instance('gamifiedquiz', $gamifiedquiz->id, $course->id, false, MUST_EXIST);

    // Check permissions
    $context = context_module::instance($cm->id);
    require_capability('mod/gamifiedquiz:manage', $context);

    // Check if session already exists
    $existingsession = $DB->get_record('gamifiedquiz_sessions', array(
        'gamifiedquizid' => $quizid,
        'session_id' => $sessionid
    ));

    $sessionrecord = new stdClass();
    $sessionrecord->gamifiedquizid = $quizid;
    $sessionrecord->session_id = $sessionid;
    $sessionrecord->teacherid = $USER->id;
    $sessionrecord->session_name = empty($sessionname) ? 'Session ' . date('Y-m-d H:i:s', time()) : $sessionname;
    $sessionrecord->questions_data = $questionsdata;
    $sessionrecord->participants_count = $participantscount;
    $sessionrecord->total_questions = $totalquestions;
    $sessionrecord->session_results = $sessionresults;
    $sessionrecord->timemodified = time();

    if ($existingsession) {
        // Update existing session
        $sessionrecord->id = $existingsession->id;
        $sessionrecord->timecreated = $existingsession->timecreated;
        
        // Update started_at and ended_at if provided
        if ($startedat > 0) {
            $sessionrecord->started = 1;
            if (empty($existingsession->timecreated) || $existingsession->timecreated == 0) {
                $sessionrecord->timecreated = $startedat;
            }
        }
        if ($endedat > 0) {
            $sessionrecord->timeended = $endedat;
        }
        
        $DB->update_record('gamifiedquiz_sessions', $sessionrecord);
        $sessionid_db = $sessionrecord->id;
    } else {
        // Create new session
        $sessionrecord->started = ($startedat > 0) ? 1 : 0;
        $sessionrecord->timecreated = ($startedat > 0) ? $startedat : time();
        if ($endedat > 0) {
            $sessionrecord->timeended = $endedat;
        }
        
        $sessionid_db = $DB->insert_record('gamifiedquiz_sessions', $sessionrecord);
    }

    echo json_encode(array(
        'success' => true,
        'session_id' => $sessionid_db,
        'message' => 'Session saved successfully'
    ));

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(array(
        'success' => false,
        'error' => $e->getMessage()
    ));
}
