<?php
// Moodle AJAX endpoint: check embedding cache status and recompute SHA-256 embeddings via llmapi.

header('Content-Type: application/json');

require_once('../../../config.php');
require_once($CFG->dirroot . '/mod/gamifiedquiz/lib.php');

global $CFG, $USER, $DB;

try {
    require_login();
    require_sesskey();

    $action = optional_param('action', 'status', PARAM_ALPHA);
    $content = optional_param('content', '', PARAM_RAW);
    $sources = optional_param('sources', '', PARAM_TEXT);
    $courseid = optional_param('courseid', 0, PARAM_INT);

    $api_url = get_config('mod_gamifiedquiz', 'llmapi_url');
    if (empty($api_url)) {
        $api_url = 'http://llmapi:5001';
    }
    if (strpos($api_url, 'localhost') !== false || strpos($api_url, '127.0.0.1') !== false) {
        $api_url = str_replace(['localhost', '127.0.0.1'], 'llmapi', $api_url);
    }
    $api_url = rtrim($api_url, '/');

    // If sources requested, resolve composite text from Moodle course sections/modules
    if (!empty($sources)) {
        $source_items = explode(',', $sources);
        $combined_parts = [];
        foreach ($source_items as $s) {
            $s = trim($s);
            if (empty($s)) continue;
            if (strpos($s, 'section_') === 0 && !empty($courseid)) {
                $sec_num = (int)substr($s, 8);
                $stxt = gamifiedquiz_get_section_text_content($courseid, $sec_num);
                if (!empty($stxt)) {
                    $combined_parts[] = "[Chapter / Section $sec_num]\n" . $stxt;
                }
            } else if (strpos($s, 'cmid_') === 0) {
                $cm_id = (int)substr($s, 5);
                $mtxt = gamifiedquiz_get_module_text_content($cm_id);
                if (!empty($mtxt)) {
                    $combined_parts[] = "[Course Activity $cm_id]\n" . $mtxt;
                }
            } else if ($s === 'auto') {
                $cmid = optional_param('cmid', 0, PARAM_INT);
                if ($cmid) {
                    $preceding_cmid = gamifiedquiz_get_preceding_activity_cmid($cmid);
                    if ($preceding_cmid) {
                        $atxt = gamifiedquiz_get_module_text_content($preceding_cmid);
                        if (!empty($atxt)) {
                            $combined_parts[] = "[Preceding Course Material]\n" . $atxt;
                        }
                    }
                }
            }
        }
        if (!empty($combined_parts)) {
            $extracted_context = implode("\n\n", $combined_parts);
            if (!empty($content)) {
                $content = $extracted_context . "\n\n" . $content;
            } else {
                $content = $extracted_context;
            }
        }
    }

    if ($action === 'get_rag_text') {
        echo json_encode(array(
            'success' => true,
            'content' => $content,
            'length' => strlen($content)
        ));
        exit;
    }

    $target_endpoint = ($action === 'reindex') ? '/cache/reindex' : '/cache/status';

    $payload = array(
        'content' => $content,
        'backend' => 'local'
    );

    $ch = curl_init($api_url . $target_endpoint);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
    curl_setopt($ch, CURLOPT_TIMEOUT, 60);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);

    $response = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curl_error = curl_error($ch);
    curl_close($ch);

    if ($curl_error) {
        throw new Exception('cURL error connecting to LLM cache service: ' . $curl_error);
    }

    if ($http_code !== 200) {
        $err = json_decode($response, true);
        $msg = $err['error'] ?? ('HTTP ' . $http_code . ': ' . substr((string)$response, 0, 200));
        throw new Exception('Cache service error: ' . $msg);
    }

    $result = json_decode($response, true);
    $result['combined_content'] = $content;
    echo json_encode($result);
    exit;

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(array(
        'success' => false,
        'error' => $e->getMessage()
    ));
    exit;
}
