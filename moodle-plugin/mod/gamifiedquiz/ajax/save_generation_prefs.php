<?php
// Save multi-category generation form (categories + lesson text) on the quiz instance.

header('Content-Type: application/json');

require_once('../../../config.php');
require_once($CFG->dirroot . '/mod/gamifiedquiz/lib.php');

global $DB, $USER;

$quizid = required_param('quizid', PARAM_INT);
$cmid = optional_param('cmid', 0, PARAM_INT);
$prefsjson = required_param('prefs', PARAM_RAW);

$gamifiedquiz = $DB->get_record('gamifiedquiz', array('id' => $quizid), '*', MUST_EXIST);

if ($cmid) {
    $cm = get_coursemodule_from_id('gamifiedquiz', $cmid, 0, false, MUST_EXIST);
    $course = $DB->get_record('course', array('id' => $cm->course), '*', MUST_EXIST);
    require_login($course, true, $cm);
    $context = context_module::instance($cm->id);
} else {
    $course = $DB->get_record('course', array('id' => $gamifiedquiz->course), '*', MUST_EXIST);
    require_login($course);
    $context = context_course::instance($course->id);
}
require_capability('mod/gamifiedquiz:addinstance', $context);
require_sesskey();

try {
    $prefs = json_decode($prefsjson, true);
    if (!is_array($prefs)) {
        throw new Exception('Invalid preferences JSON');
    }

    $categories = isset($prefs['categories']) && is_array($prefs['categories']) ? $prefs['categories'] : array();
    $lesson = isset($prefs['lesson']) ? (string)$prefs['lesson'] : '';

    gamifiedquiz_save_generation_preferences($gamifiedquiz->id, $categories, $lesson);

    echo json_encode(array(
        'success' => true,
        'message' => 'Generation preferences saved',
    ));
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(array(
        'success' => false,
        'error' => $e->getMessage(),
    ));
}
