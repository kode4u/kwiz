<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

/**
 * Page to edit gamified quiz questions
 * Similar to quiz/edit.php - allows selecting questions from question bank
 *
 * @package    mod_gamifiedquiz
 * @copyright  2025 JICA Research Project
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

require_once(__DIR__ . '/../../config.php');
require_once($CFG->dirroot . '/mod/gamifiedquiz/lib.php');
require_once($CFG->dirroot . '/question/editlib.php');

$id = required_param('id', PARAM_INT); // Course module ID
$cm = get_coursemodule_from_id('gamifiedquiz', $id, 0, false, MUST_EXIST);
$course = $DB->get_record('course', array('id' => $cm->course), '*', MUST_EXIST);
$gamifiedquiz = $DB->get_record('gamifiedquiz', array('id' => $cm->instance), '*', MUST_EXIST);

require_login($course, true, $cm);
$context = context_module::instance($cm->id);
require_capability('mod/gamifiedquiz:addinstance', $context);

// Setup question editing page (similar to quiz/edit.php)
list($thispageurl, $contexts, $cmid, $cm, $module, $pagevars) =
    question_edit_setup('editq', '/mod/gamifiedquiz/edit.php', true);

$PAGE->set_url($thispageurl);
$PAGE->set_title(get_string('editingquizx', 'mod_gamifiedquiz', format_string($gamifiedquiz->name)));
$PAGE->set_heading($course->fullname);
$PAGE->set_context($context);

// Process actions
$afteractionurl = new moodle_url($thispageurl);

// Add question to quiz
if (($addquestion = optional_param('addquestion', 0, PARAM_INT)) && confirm_sesskey()) {
    gamifiedquiz_add_quiz_question($addquestion, $gamifiedquiz);
    redirect($afteractionurl);
}

// Add multiple questions
if (optional_param('add', false, PARAM_BOOL) && confirm_sesskey()) {
    $rawdata = (array) data_submitted();
    foreach ($rawdata as $key => $value) {
        if (preg_match('!^q([0-9]+)$!', $key, $matches)) {
            $questionid = $matches[1];
            gamifiedquiz_add_quiz_question($questionid, $gamifiedquiz);
        }
    }
    redirect($afteractionurl);
}

// Remove question from quiz
if (($removequestion = optional_param('removequestion', 0, PARAM_INT)) && confirm_sesskey()) {
    $slot = $DB->get_record('gamifiedquiz_slots', array('id' => $removequestion), '*', MUST_EXIST);
    if ($slot->gamifiedquizid == $gamifiedquiz->id) {
        // Delete question reference
        $DB->delete_records('question_references', array('itemid' => $slot->id, 'component' => 'mod_gamifiedquiz'));
        // Delete slot
        $DB->delete_records('gamifiedquiz_slots', array('id' => $slot->id));
    }
    redirect($afteractionurl);
}

// Save changes (reorder, update marks)
if (optional_param('savechanges', false, PARAM_BOOL) && confirm_sesskey()) {
    $rawdata = (array) data_submitted();
    foreach ($rawdata as $key => $value) {
        if (preg_match('!^s([0-9]+)$!', $key, $matches)) {
            $slotid = $matches[1];
            $slot = $DB->get_record('gamifiedquiz_slots', array('id' => $slotid), '*', MUST_EXIST);
            if ($slot->gamifiedquizid == $gamifiedquiz->id) {
                // Update maxmark if provided
                $maxmarkkey = 'maxmark' . $slotid;
                if (isset($rawdata[$maxmarkkey])) {
                    $slot->maxmark = unformat_float($rawdata[$maxmarkkey], true);
                    $DB->update_record('gamifiedquiz_slots', $slot);
                }
            }
        }
    }
    redirect($afteractionurl);
}

echo $OUTPUT->header();

// Get current questions in quiz
$slots = $DB->get_records('gamifiedquiz_slots', 
    array('gamifiedquizid' => $gamifiedquiz->id), 
    'slot ASC'
);

// Get question bank questions
$coursecontext = context_course::instance($course->id);
$defaultcategory = question_make_default_categories(array($coursecontext));
$defaultcategoryid = $defaultcategory->id . ',' . $coursecontext->id;

// Use Moodle's question bank chooser
$questionbankurl = new moodle_url('/question/edit.php', array(
    'courseid' => $course->id,
    'cmid' => $cm->id,
    'returnurl' => new moodle_url('/mod/gamifiedquiz/edit.php', array('id' => $cm->id)),
    'category' => isset($gamifiedquiz->question_category) && $gamifiedquiz->question_category > 0 
        ? $gamifiedquiz->question_category . ',' . $coursecontext->id 
        : $defaultcategoryid
));

// Display current quiz questions
echo html_writer::start_tag('div', array('class' => 'gamifiedquiz-edit-page'));
echo html_writer::tag('h2', get_string('questionsinthisquiz', 'mod_gamifiedquiz'));

if (empty($slots)) {
    echo html_writer::tag('p', get_string('noquestions', 'mod_gamifiedquiz'));
} else {
    echo html_writer::start_tag('form', array('method' => 'post', 'action' => $thispageurl->out(false)));
    echo html_writer::empty_tag('input', array('type' => 'hidden', 'name' => 'sesskey', 'value' => sesskey()));
    
    echo html_writer::start_tag('table', array('class' => 'generaltable'));
    echo html_writer::start_tag('thead');
    echo html_writer::start_tag('tr');
    echo html_writer::tag('th', get_string('question', 'question'));
    echo html_writer::tag('th', get_string('maxmark', 'quiz'));
    echo html_writer::tag('th', get_string('actions', 'moodle'));
    echo html_writer::end_tag('tr');
    echo html_writer::end_tag('thead');
    echo html_writer::start_tag('tbody');
    
    foreach ($slots as $slot) {
        // Get question from question_references
        $questionid = $DB->get_field_sql(
            "SELECT qv.questionid 
             FROM {question_references} qr
             JOIN {question_bank_entries} qbe ON qbe.id = qr.questionbankentryid
             JOIN {question_versions} qv ON qv.questionbankentryid = qbe.id
             WHERE qr.itemid = ? AND qr.component = 'mod_gamifiedquiz' AND qr.questionarea = 'slot'
             ORDER BY qv.version DESC LIMIT 1",
            array($slot->id)
        );
        
        if ($questionid) {
            $question = $DB->get_record('question', array('id' => $questionid));
            echo html_writer::start_tag('tr');
            echo html_writer::tag('td', format_string($question->name));
            echo html_writer::start_tag('td');
            echo html_writer::empty_tag('input', array(
                'type' => 'text',
                'name' => 'maxmark' . $slot->id,
                'value' => $slot->maxmark,
                'size' => '5'
            ));
            echo html_writer::end_tag('td');
            echo html_writer::start_tag('td');
            $removeurl = new moodle_url($thispageurl, array('removequestion' => $slot->id, 'sesskey' => sesskey()));
            echo html_writer::link($removeurl, get_string('remove', 'moodle'), array('class' => 'btn btn-danger'));
            echo html_writer::end_tag('td');
            echo html_writer::end_tag('tr');
        }
    }
    
    echo html_writer::end_tag('tbody');
    echo html_writer::end_tag('table');
    
    echo html_writer::empty_tag('input', array(
        'type' => 'submit',
        'name' => 'savechanges',
        'value' => get_string('savechanges', 'quiz'),
        'class' => 'btn btn-primary'
    ));
    echo html_writer::end_tag('form');
}

// Question bank browser
echo html_writer::tag('h2', get_string('questionbank', 'question'));
echo html_writer::tag('p', get_string('selectquestionstoadd', 'mod_gamifiedquiz'));

// Use Moodle's question bank interface
echo html_writer::start_tag('div', array('class' => 'questionbank', 'style' => 'margin-top: 20px;'));
echo html_writer::tag('iframe', '', array(
    'src' => $questionbankurl->out(false),
    'style' => 'width: 100%; height: 600px; border: 1px solid #ddd;',
    'id' => 'questionbankiframe'
));
echo html_writer::end_tag('div');

echo html_writer::end_tag('div');

echo $OUTPUT->footer();
