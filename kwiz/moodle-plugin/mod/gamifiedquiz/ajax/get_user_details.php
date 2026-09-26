<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

header('Content-Type: application/json');

require_once('../../../config.php');
require_once($CFG->dirroot . '/mod/gamifiedquiz/lib.php');

global $DB, $USER;

// Require login
require_login();

// Get user IDs from request
$userids = optional_param('userids', '', PARAM_TEXT);

if (empty($userids)) {
    echo json_encode(array('success' => false, 'error' => 'No user IDs provided'));
    exit;
}

// Parse user IDs (comma-separated or JSON array)
$userid_array = array();
if (strpos($userids, '[') === 0) {
    $userid_array = json_decode($userids, true);
} else {
    $userid_array = explode(',', $userids);
}

$userid_array = array_filter(array_map('intval', $userid_array));

if (empty($userid_array)) {
    echo json_encode(array('success' => false, 'error' => 'Invalid user IDs'));
    exit;
}

try {
    // Get user details from Moodle
    $users = $DB->get_records_list('user', 'id', $userid_array, '', 'id, firstname, lastname, username, email, picture');
    
    $user_details = array();
    foreach ($users as $user) {
        $fullname = fullname($user);
        // Use numeric key for consistency
        $user_details[(int)$user->id] = array(
            'id' => (int)$user->id,
            'username' => $user->username,
            'fullname' => $fullname,
            'firstname' => $user->firstname,
            'lastname' => $user->lastname,
            'email' => $user->email,
            'picture' => $user->picture
        );
    }
    
    echo json_encode(array(
        'success' => true,
        'users' => $user_details,
        'requested_ids' => $userid_array,
        'found_count' => count($user_details)
    ));
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(array(
        'success' => false,
        'error' => $e->getMessage()
    ));
}
