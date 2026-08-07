<?php
// Background worker callback: save generated questions and update job status.

define('AJAX_SCRIPT', true);
define('NO_MOODLE_COOKIES', true);
define('NO_DEBUG_DISPLAY', true);

// Called from worker at http://moodle — align host with $CFG->wwwroot to avoid redirecterrordetected.
$configfile = __DIR__ . '/../../../config.php';
$wwwroot = getenv('MOODLE_HOST');
if (file_exists($configfile)) {
    $content = file_get_contents($configfile);
    if (preg_match('/\$CFG->wwwroot\s*=\s*[\'"]([^\'"]+)[\'"]/', $content, $matches)) {
        $wwwroot = $matches[1];
    }
}
if (empty($wwwroot)) {
    $wwwroot = 'http://localhost:8080';
}
$parts = parse_url($wwwroot);
if (!empty($parts['host'])) {
    $hostheader = $parts['host'];
    if (!empty($parts['port'])) {
        $hostheader .= ':' . $parts['port'];
    }
    $_SERVER['HTTP_HOST'] = $hostheader;
    $_SERVER['SERVER_NAME'] = $parts['host'];
    if (!empty($parts['port'])) {
        $_SERVER['SERVER_PORT'] = (string)$parts['port'];
    }
}

require_once('../../../config.php');
require_once($CFG->dirroot . '/mod/gamifiedquiz/lib.php');

header('Content-Type: application/json');

global $DB;

$token = $_SERVER['HTTP_X_WORKER_TOKEN'] ?? '';
$expected = gamifiedquiz_worker_token();
if (empty($expected) || !hash_equals($expected, $token)) {
    http_response_code(403);
    echo json_encode(array('success' => false, 'error' => 'Forbidden'));
    exit;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(array('success' => false, 'error' => 'Invalid JSON body'));
    exit;
}

$requestuuid = $data['request_uuid'] ?? '';
$status = $data['status'] ?? '';
$errormessage = $data['error_message'] ?? '';
$questions = $data['questions'] ?? array();
$durationms = isset($data['duration_ms']) ? (int)$data['duration_ms'] : null;
$generatedcount = isset($data['generated_count']) ? (int)$data['generated_count'] : 0;

if (empty($requestuuid)) {
    http_response_code(400);
    echo json_encode(array('success' => false, 'error' => 'request_uuid required'));
    exit;
}

$log = $DB->get_record('gamifiedquiz_generation_logs', array('request_uuid' => $requestuuid), '*', MUST_EXIST);
$gamifiedquiz = $DB->get_record('gamifiedquiz', array('id' => $log->gamifiedquizid), '*', MUST_EXIST);

$now = time();
$update = new stdClass();
$update->id = $log->id;
$update->timemodified = $now;

if ($status === 'sent') {
    $update->status = 'sent';
    $DB->update_record('gamifiedquiz_generation_logs', $update);
    echo json_encode(array('success' => true, 'status' => 'sent'));
    exit;
}

if ($status === 'processing' || $status === 'running') {
    $update->status = 'processing';
    if (empty($log->started_at)) {
        $update->started_at = $now;
    }
    $DB->update_record('gamifiedquiz_generation_logs', $update);
    echo json_encode(array('success' => true, 'status' => 'processing'));
    exit;
}

$update->ended_at = $now;
if ($durationms !== null) {
    $update->duration_ms = $durationms;
    $durationsec = $durationms > 0 ? ($durationms / 1000.0) : 0.0;
    if ($durationsec > 0 && $generatedcount > 0) {
        $update->questions_per_sec = $generatedcount / $durationsec;
    }
}

if ($status === 'error') {
    $update->status = 'error';
    $update->error_message = core_text::substr((string)$errormessage, 0, 1333);
    $DB->update_record('gamifiedquiz_generation_logs', $update);
    gamifiedquiz_append_metrics_log('moodle_job_complete', array(
        'request_uuid' => $requestuuid,
        'gamifiedquizid' => (int) $gamifiedquiz->id,
        'category_name' => $log->category_name ?? '',
        'topic' => $log->topic ?? '',
        'duration_ms' => $durationms !== null ? $durationms : 0,
        'status' => 'error',
        'error_message' => core_text::substr((string)$errormessage, 0, 500),
    ));
    echo json_encode(array('success' => true, 'status' => 'error'));
    exit;
}

if ($status !== 'success' || !is_array($questions)) {
    http_response_code(400);
    echo json_encode(array('success' => false, 'error' => 'Invalid success payload'));
    exit;
}

$sessionid = $log->session_id ?: ('genjob_' . $requestuuid);
$categoryname = $log->category_name ?? '';
$topic = $log->topic ?? '';
$difficulty = $log->difficulty ?: $gamifiedquiz->difficulty;

try {
    $saved = gamifiedquiz_save_generated_questions(
        $gamifiedquiz->id,
        $questions,
        $categoryname,
        $sessionid,
        $difficulty,
        $topic
    );
} catch (Exception $e) {
    $update->status = 'error';
    $update->error_message = core_text::substr('Failed to save questions: ' . $e->getMessage(), 0, 1333);
    $DB->update_record('gamifiedquiz_generation_logs', $update);
    http_response_code(500);
    echo json_encode(array('success' => false, 'error' => $update->error_message));
    exit;
}

$update->session_id = $sessionid;
$update->generated_count = count($questions);
$update->saved_count = $saved;
$update->status = 'success';
$DB->update_record('gamifiedquiz_generation_logs', $update);

$durationms = $durationms !== null ? $durationms : 0;
$gencount = count($questions);
gamifiedquiz_append_metrics_log('moodle_job_complete', array(
    'request_uuid' => $requestuuid,
    'gamifiedquizid' => (int) $gamifiedquiz->id,
    'category_name' => $categoryname,
    'topic' => $log->topic ?? '',
    'difficulty' => $difficulty,
    'backend' => $log->backend ?? '',
    'llm_model' => $log->llm_model ?? '',
    'n_questions_requested' => (int) $log->requested_count,
    'n_questions_generated' => $gencount,
    'n_questions_saved' => (int) $saved,
    'duration_ms' => $durationms,
    'duration_s' => round($durationms / 1000.0, 3),
    'seconds_per_question' => ($gencount > 0 && $durationms > 0)
        ? round(($durationms / 1000.0) / $gencount, 4) : null,
    'status' => 'success',
));

echo json_encode(array(
    'success' => true,
    'status' => 'success',
    'saved_count' => $saved,
    'session_id' => $sessionid,
    'request_uuid' => $requestuuid,
));
