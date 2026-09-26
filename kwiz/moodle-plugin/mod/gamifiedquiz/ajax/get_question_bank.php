<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

header('Content-Type: application/json');

try {
    require_once('../../../config.php');
    require_once($CFG->dirroot . '/mod/gamifiedquiz/lib.php');
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(array(
        'success' => false,
        'error' => 'Failed to load Moodle config: ' . $e->getMessage()
    ));
    exit;
}

global $DB, $CFG, $USER;

// Get parameters
$quizid = required_param('quizid', PARAM_INT);
$cmid = optional_param('cmid', 0, PARAM_INT);
$categoryid = optional_param('categoryid', 0, PARAM_INT);

// Get quiz instance
$gamifiedquiz = $DB->get_record('gamifiedquiz', array('id' => $quizid), '*', MUST_EXIST);

// Get course and context
if ($cmid) {
    $cm = get_coursemodule_from_id('gamifiedquiz', $cmid, 0, false, MUST_EXIST);
    $course = $DB->get_record('course', array('id' => $cm->course), '*', MUST_EXIST);
    $context = context_module::instance($cm->id);
    require_login($course, true, $cm);
} else {
    $course = $DB->get_record('course', array('id' => $gamifiedquiz->course), '*', MUST_EXIST);
    require_login($course);
    $context = context_course::instance($course->id);
}

require_capability('mod/gamifiedquiz:addinstance', $context);

try {
    require_once($CFG->dirroot . '/question/editlib.php');
    require_once($CFG->dirroot . '/question/engine/bank.php');
    
    // Get course context
    $coursecontext = context_course::instance($course->id);
    
    // Get all question categories for this course context (including subcategories)
    // First get top-level categories
    $topcategories = $DB->get_records('question_categories', 
        array('contextid' => $coursecontext->id, 'parent' => 0), 
        'name ASC'
    );
    
    // Then get all categories in this context
    $allcategories = $DB->get_records('question_categories', 
        array('contextid' => $coursecontext->id), 
        'name ASC'
    );
    
    $categoryList = array();
    
    // Build hierarchical category list
    foreach ($allcategories as $cat) {
        // Build category name with indentation for subcategories
        $name = $cat->name;
        if ($cat->parent > 0) {
            // Find parent to build full path
            $parent = $DB->get_record('question_categories', array('id' => $cat->parent));
            if ($parent) {
                $name = $parent->name . ' / ' . $name;
            }
        }
        
        $categoryList[] = array(
            'id' => $cat->id,
            'name' => $name,
            'parent' => $cat->parent,
            'sortorder' => $cat->sortorder
        );
    }
    
    // Sort by name
    usort($categoryList, function($a, $b) {
        return strcmp($a['name'], $b['name']);
    });
    
    // If category ID is provided, get questions from that category
    $questions = array();
    if ($categoryid > 0) {
        $questions = gamifiedquiz_load_question_bank_questions($categoryid);
    }
    
    echo json_encode(array(
        'success' => true,
        'categories' => $categoryList,
        'questions' => $questions,
        'selected_category' => $categoryid
    ));
    
} catch (Exception $e) {
    http_response_code(500);
    error_log("Gamified Quiz get_question_bank error: " . $e->getMessage() . " in " . $e->getFile() . ":" . $e->getLine());
    echo json_encode(array(
        'success' => false,
        'error' => $e->getMessage()
    ));
}
