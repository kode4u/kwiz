<?php
// Moodle AJAX endpoint: check embedding cache status and recompute SHA-256 embeddings via llmapi.

header('Content-Type: application/json');

require_once('../../../config.php');
require_once($CFG->dirroot . '/mod/kwiz/lib.php');

global $CFG, $USER, $DB;

/**
 * Execute POST request to llmapi endpoint.
 *
 * @param string $url Target URL
 * @param array $payload JSON payload
 * @param int $timeout Timeout in seconds
 * @return array Decoded response
 */
function kwiz_llmapi_cache_call($url, $payload, $timeout = 120) {
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
    curl_setopt($ch, CURLOPT_TIMEOUT, $timeout);
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

    $data = json_decode($response, true);
    if (!is_array($data)) {
        throw new Exception('Invalid JSON response from cache service.');
    }
    return $data;
}

try {
    require_login();
    require_sesskey();

    $action = optional_param('action', 'status', PARAM_ALPHANUMEXT);
    $content = optional_param('content', '', PARAM_RAW);
    $sources = optional_param('sources', '', PARAM_TEXT);
    $source = optional_param('source', '', PARAM_TEXT);
    $courseid = optional_param('courseid', 0, PARAM_INT);
    $cmid = optional_param('cmid', 0, PARAM_INT);

    if (empty($courseid) && !empty($cmid)) {
        $cm_rec = get_coursemodule_from_id('kwiz', $cmid);
        if ($cm_rec) {
            $courseid = $cm_rec->course;
        }
    }

    $api_url = get_config('mod_kwiz', 'llmapi_url');
    if (empty($api_url)) {
        $api_url = 'http://llmapi:5001';
    }
    if (strpos($api_url, 'localhost') !== false || strpos($api_url, '127.0.0.1') !== false) {
        $api_url = str_replace(['localhost', '127.0.0.1'], 'llmapi', $api_url);
    }
    $api_url = rtrim($api_url, '/');

    // 1. Check all sources batch status
    if ($action === 'check_all_sources') {
        $items = array();

        if (!empty($cmid)) {
            $preceding_cmid = kwiz_get_preceding_activity_cmid($cmid);
            if ($preceding_cmid) {
                $items['auto'] = kwiz_get_module_text_content($preceding_cmid);
            } else {
                $items['auto'] = '';
            }
        }

        if (!empty($courseid)) {
            $modinfo = get_fast_modinfo($courseid);
            // Course sections / chapters
            foreach ($modinfo->sections as $secnum => $sec_cmids) {
                $section_has_rag = false;
                foreach ($sec_cmids as $scm) {
                    if (isset($modinfo->cms[$scm])) {
                        $cm_item = $modinfo->cms[$scm];
                        if ($cm_item->uservisible && in_array($cm_item->modname, ['page', 'lesson', 'book', 'resource', 'folder', 'label'])) {
                            $section_has_rag = true;
                            break;
                        }
                    }
                }
                if ($section_has_rag) {
                    $items['section_' . $secnum] = kwiz_get_section_text_content($courseid, $secnum);
                }
            }
            // Course activities / files
            foreach ($modinfo->cms as $cm_item) {
                if ($cm_item->uservisible && in_array($cm_item->modname, ['page', 'lesson', 'book', 'resource', 'folder', 'label'])) {
                    $items['cmid_' . $cm_item->id] = kwiz_get_module_text_content($cm_item->id);
                }
            }
        }

        $res = kwiz_llmapi_cache_call($api_url . '/cache/batch_status', array(
            'items' => $items,
            'backend' => 'local'
        ), 30);

        echo json_encode($res);
        exit;
    }

    // 1b. Inspect source embedding details (vectors, chunks, raw text)
    if ($action === 'source_details') {
        if (empty($source)) {
            throw new Exception('No source specified for details inspection.');
        }

        $single_text = '';
        $source_name = '';
        $source_type = '';
        $section_name = '';

        $modinfo = !empty($courseid) ? get_fast_modinfo($courseid) : null;

        if (strpos($source, 'section_') === 0 && !empty($courseid)) {
            $sec_num = (int)substr($source, 8);
            if ($modinfo) {
                $secinfo = $modinfo->get_section_info($sec_num);
                $section_name = ($secinfo && !empty($secinfo->name)) ? $secinfo->name : ('Section ' . $sec_num);
            } else {
                $section_name = 'Section ' . $sec_num;
            }
            $source_name = $section_name;
            $source_type = 'Chapter / Section';
            $single_text = kwiz_get_section_text_content($courseid, $sec_num);
        } else if (strpos($source, 'cmid_') === 0 && !empty($courseid)) {
            $cm_id = (int)substr($source, 5);
            if ($modinfo && isset($modinfo->cms[$cm_id])) {
                $cm = $modinfo->cms[$cm_id];
                $source_name = $cm->name;
                $source_type = ucfirst($cm->modname);
                $secinfo = $modinfo->get_section_info($cm->sectionnum);
                $section_name = ($secinfo && !empty($secinfo->name)) ? $secinfo->name : ('Section ' . $cm->sectionnum);
            } else {
                $source_name = 'Module #' . $cm_id;
                $source_type = 'Module';
            }
            $single_text = kwiz_get_module_text_content($cm_id);
        } else if ($source === 'auto') {
            $source_type = 'Auto-detect';
            if (!empty($cmid)) {
                $preceding_cmid = kwiz_get_preceding_activity_cmid($cmid);
                if ($preceding_cmid && $modinfo && isset($modinfo->cms[$preceding_cmid])) {
                    $pcm = $modinfo->cms[$preceding_cmid];
                    $source_name = 'Auto: ' . $pcm->name;
                    $secinfo = $modinfo->get_section_info($pcm->sectionnum);
                    $section_name = ($secinfo && !empty($secinfo->name)) ? $secinfo->name : ('Section ' . $pcm->sectionnum);
                    $single_text = kwiz_get_module_text_content($preceding_cmid);
                } else {
                    $source_name = 'Auto-detect (No preceding activity)';
                    $single_text = '';
                }
            } else {
                $source_name = 'Auto-detect';
                $single_text = '';
            }
        }

        $res = kwiz_llmapi_cache_call($api_url . '/cache/details', array(
            'content' => $single_text,
            'source_id' => $source,
            'backend' => 'local'
        ), 30);

        $res['source'] = $source;
        $res['source_name'] = $source_name;
        $res['source_type'] = $source_type;
        $res['section_name'] = $section_name;
        echo json_encode($res);
        exit;
    }

    // 2. Re-embed a single source
    if ($action === 'reindex_single') {
        if (empty($source)) {
            throw new Exception('No source specified for re-indexing.');
        }

        $single_text = '';
        if (strpos($source, 'section_') === 0 && !empty($courseid)) {
            $sec_num = (int)substr($source, 8);
            $single_text = kwiz_get_section_text_content($courseid, $sec_num);
        } else if (strpos($source, 'cmid_') === 0) {
            $cm_id = (int)substr($source, 5);
            $single_text = kwiz_get_module_text_content($cm_id);
        } else if ($source === 'auto' && !empty($cmid)) {
            $preceding_cmid = kwiz_get_preceding_activity_cmid($cmid);
            if ($preceding_cmid) {
                $single_text = kwiz_get_module_text_content($preceding_cmid);
            }
        }

        if (empty(trim($single_text))) {
            throw new Exception('The selected source contains no extractable text content to embed.');
        }

        $res = kwiz_llmapi_cache_call($api_url . '/cache/reindex', array(
            'content' => $single_text,
            'backend' => 'local'
        ), 180);

        $res['source'] = $source;
        echo json_encode($res);
        exit;
    }

    // 3. Re-embed all changed sources in batch
    if ($action === 'reindex_all_changed') {
        $source_keys = array();
        if (!empty($sources)) {
            $source_keys = array_filter(array_map('trim', explode(',', $sources)));
        }

        $batch_items = array();
        if (!empty($courseid)) {
            $modinfo = get_fast_modinfo($courseid);
            // If specific keys given, only extract those, otherwise extract all available
            if (empty($source_keys)) {
                if (!empty($cmid)) {
                    $source_keys[] = 'auto';
                }
                foreach ($modinfo->sections as $secnum => $sec_cmids) {
                    $source_keys[] = 'section_' . $secnum;
                }
                foreach ($modinfo->cms as $cm_item) {
                    if ($cm_item->uservisible && in_array($cm_item->modname, ['page', 'lesson', 'book', 'resource', 'folder', 'label'])) {
                        $source_keys[] = 'cmid_' . $cm_item->id;
                    }
                }
            }

            foreach ($source_keys as $k) {
                if ($k === 'auto' && !empty($cmid)) {
                    $preceding_cmid = kwiz_get_preceding_activity_cmid($cmid);
                    if ($preceding_cmid) {
                        $st = kwiz_get_module_text_content($preceding_cmid);
                        if (!empty(trim($st))) {
                            $batch_items['auto'] = $st;
                        }
                    }
                } else if (strpos($k, 'section_') === 0) {
                    $sec_num = (int)substr($k, 8);
                    $st = kwiz_get_section_text_content($courseid, $sec_num);
                    if (!empty(trim($st))) {
                        $batch_items[$k] = $st;
                    }
                } else if (strpos($k, 'cmid_') === 0) {
                    $cm_id = (int)substr($k, 5);
                    $st = kwiz_get_module_text_content($cm_id);
                    if (!empty(trim($st))) {
                        $batch_items[$k] = $st;
                    }
                }
            }
        }

        if (empty($batch_items)) {
            throw new Exception('No content found in any of the specified sources to re-embed.');
        }

        $res = kwiz_llmapi_cache_call($api_url . '/cache/reindex', array(
            'items' => $batch_items,
            'backend' => 'local'
        ), 300);

        echo json_encode($res);
        exit;
    }

    // 4. Default / Backward-compatible composite status and reindex
    // If sources requested, resolve composite text from Moodle course sections/modules
    if (!empty($sources)) {
        $source_items = explode(',', $sources);
        $combined_parts = [];
        foreach ($source_items as $s) {
            $s = trim($s);
            if (empty($s)) continue;
            if (strpos($s, 'section_') === 0 && !empty($courseid)) {
                $sec_num = (int)substr($s, 8);
                $stxt = kwiz_get_section_text_content($courseid, $sec_num);
                if (!empty($stxt)) {
                    $combined_parts[] = "[Chapter / Section $sec_num]\n" . $stxt;
                }
            } else if (strpos($s, 'cmid_') === 0) {
                $cm_id = (int)substr($s, 5);
                $mtxt = kwiz_get_module_text_content($cm_id);
                if (!empty($mtxt)) {
                    $combined_parts[] = "[Course Activity $cm_id]\n" . $mtxt;
                }
            } else if ($s === 'auto' && !empty($cmid)) {
                $preceding_cmid = kwiz_get_preceding_activity_cmid($cmid);
                if ($preceding_cmid) {
                    $atxt = kwiz_get_module_text_content($preceding_cmid);
                    if (!empty($atxt)) {
                        $combined_parts[] = "[Preceding Course Material]\n" . $atxt;
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

    $result = kwiz_llmapi_cache_call($api_url . $target_endpoint, $payload, 180);
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
