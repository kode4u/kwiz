<?php
// Moodle AJAX endpoint: upload a course file (PDF, PPTX, DOCX, TXT) and extract plain text via llmapi.

header('Content-Type: application/json');

require_once('../../../config.php');
require_once($CFG->dirroot . '/mod/gamifiedquiz/lib.php');

global $CFG, $USER;

try {
    require_login();
    require_sesskey();

    if (empty($_FILES['file']) || !is_uploaded_file($_FILES['file']['tmp_name'])) {
        throw new Exception('No uploaded file received');
    }

    $filename = $_FILES['file']['name'];
    $tmp_path = $_FILES['file']['tmp_name'];
    $file_bytes = file_get_contents($tmp_path);

    if (empty($file_bytes)) {
        throw new Exception('Uploaded file is empty');
    }

    $api_url = get_config('mod_gamifiedquiz', 'llmapi_url');
    if (empty($api_url)) {
        $api_url = 'http://llmapi:5001';
    }
    if (strpos($api_url, 'localhost') !== false || strpos($api_url, '127.0.0.1') !== false) {
        $api_url = str_replace(['localhost', '127.0.0.1'], 'llmapi', $api_url);
    }

    $payload = array(
        'filename' => $filename,
        'file_content_base64' => base64_encode($file_bytes),
    );

    $ch = curl_init(rtrim($api_url, '/') . '/extract_file');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
    curl_setopt($ch, CURLOPT_TIMEOUT, 90);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);

    $response = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curl_error = curl_error($ch);
    curl_close($ch);

    if ($curl_error) {
        throw new Exception('cURL error connecting to LLM API: ' . $curl_error);
    }

    if ($http_code !== 200) {
        $err = json_decode($response, true);
        $msg = $err['error'] ?? ('HTTP ' . $http_code . ': ' . substr((string)$response, 0, 200));
        throw new Exception('Extraction service error: ' . $msg);
    }

    $data = json_decode($response, true);
    if (empty($data['success']) || !isset($data['text'])) {
        throw new Exception('Invalid response from extraction service');
    }

    echo json_encode(array(
        'success' => true,
        'filename' => $filename,
        'text' => $data['text'],
        'characters' => $data['characters'] ?? strlen($data['text']),
        'approx_tokens' => $data['approx_tokens'] ?? intval(strlen($data['text']) / 4)
    ));
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(array(
        'success' => false,
        'error' => $e->getMessage()
    ));
}
