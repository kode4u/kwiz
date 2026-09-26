<?php
// Poll background generation job status (single job or whole batch).

header('Content-Type: application/json');

require_once('../../../config.php');
require_once($CFG->dirroot . '/mod/gamifiedquiz/lib.php');

global $DB, $USER;

$quizid = required_param('quizid', PARAM_INT);
$cmid = optional_param('cmid', 0, PARAM_INT);
$jobid = optional_param('job_id', '', PARAM_TEXT);
$batchid = optional_param('batch_id', '', PARAM_TEXT);

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

if (!empty($batchid)) {
    $logs = $DB->get_records('gamifiedquiz_generation_logs', array(
        'batch_id' => $batchid,
        'gamifiedquizid' => $gamifiedquiz->id,
        'userid' => $USER->id,
    ), 'id ASC');

    if (empty($logs)) {
        echo json_encode(array('success' => false, 'error' => 'Batch not found'));
        exit;
    }

    $jobs = array();
    $allquestions = array();
    $total = count($logs);
    $done = 0;
    $failed = 0;
    $running = 0;
    $queued = 0;

    foreach ($logs as $log) {
        $job = gamifiedquiz_format_generation_job_status($log);
        $jobs[] = $job;
        if ($job['status'] === 'success') {
            $done++;
            if (!empty($job['questions'])) {
                foreach ($job['questions'] as $q) {
                    $allquestions[] = $q;
                }
            }
        } else if ($job['status'] === 'error') {
            $failed++;
            $done++;
        } else if (in_array($job['status'], array('processing', 'running'), true)) {
            $running++;
        } else if (in_array($job['status'], array('queued', 'sent'), true)) {
            $queued++;
        } else {
            $queued++;
        }
    }

    $complete = ($done >= $total);
    echo json_encode(array(
        'success' => true,
        'batch_id' => $batchid,
        'complete' => $complete,
        'total' => $total,
        'completed' => $done,
        'failed' => $failed,
        'running' => $running,
        'queued' => $queued,
        'jobs' => $jobs,
        'questions' => $complete && $failed < $total ? $allquestions : array(),
    ), JSON_UNESCAPED_UNICODE);
    exit;
}

if (empty($jobid)) {
    echo json_encode(array('success' => false, 'error' => 'job_id or batch_id required'), JSON_UNESCAPED_UNICODE);
    exit;
}

$log = $DB->get_record('gamifiedquiz_generation_logs', array(
    'request_uuid' => $jobid,
    'gamifiedquizid' => $gamifiedquiz->id,
), '*', MUST_EXIST);

if ((int)$log->userid !== (int)$USER->id) {
    require_capability('mod/gamifiedquiz:addinstance', $context);
}

$job = gamifiedquiz_format_generation_job_status($log);
echo json_encode(array_merge(array('success' => true), $job), JSON_UNESCAPED_UNICODE);
