<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

/**
 * Page to edit gamified quiz questions
 * Uses same structure and UI as quiz/edit.php
 *
 * @package    mod_gamifiedquiz
 * @copyright  2025 JICA Research Project
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

use mod_gamifiedquiz\question\bank\custom_view;

require_once(__DIR__ . '/../../config.php');
require_once($CFG->dirroot . '/mod/gamifiedquiz/lib.php');
require_once($CFG->dirroot . '/question/editlib.php');

$mdlscrollto = optional_param('mdlscrollto', '', PARAM_INT);

// Setup question editing page (exactly like quiz/edit.php)
list($thispageurl, $contexts, $cmid, $cm, $gamifiedquiz, $pagevars) =
    question_edit_setup('editq', '/mod/gamifiedquiz/edit.php', true);

$PAGE->set_url($thispageurl);
$PAGE->set_secondary_active_tab("mod_gamifiedquiz_edit");

// You need mod/gamifiedquiz:addinstance in addition to question capabilities
require_capability('mod/gamifiedquiz:addinstance', $contexts->lowest());

// Get the course object
$course = get_course($gamifiedquiz->course);

$defaultcategoryobj = question_make_default_categories($contexts->all());
$defaultcategory = $defaultcategoryobj->id . ',' . $defaultcategoryobj->contextid;

// Process commands ============================================================

// Get the list of question ids had their check-boxes ticked
$selectedslots = [];
$params = (array) data_submitted();
foreach ($params as $key => $value) {
    if (preg_match('!^s([0-9]+)$!', $key, $matches)) {
        $selectedslots[] = $matches[1];
    }
}

$afteractionurl = new moodle_url($thispageurl);

if ($mdlscrollto) {
    $afteractionurl->param('mdlscrollto', $mdlscrollto);
}

if (($addquestion = optional_param('addquestion', 0, PARAM_INT)) && confirm_sesskey()) {
    // Add a single question to the current quiz
    $addonpage = optional_param('addonpage', 0, PARAM_INT);
    gamifiedquiz_add_quiz_question($addquestion, $gamifiedquiz, $addonpage);
    
    // Refresh gamifiedquiz object to get updated sumgrades
    $gamifiedquiz = $DB->get_record('gamifiedquiz', array('id' => $gamifiedquiz->id), '*', MUST_EXIST);
    
    $thispageurl->param('lastchanged', $addquestion);
    redirect($afteractionurl);
}

if (optional_param('add', false, PARAM_BOOL) && confirm_sesskey()) {
    $addonpage = optional_param('addonpage', 0, PARAM_INT);
    // Add selected questions to the current quiz
    $rawdata = (array) data_submitted();
    foreach ($rawdata as $key => $value) {
        if (preg_match('!^q([0-9]+)$!', $key, $matches)) {
            $key = $matches[1];
            gamifiedquiz_add_quiz_question($key, $gamifiedquiz, $addonpage);
        }
    }
    redirect($afteractionurl);
}

if ((optional_param('addrandom', false, PARAM_BOOL)) && confirm_sesskey()) {
    // Add random questions to the quiz
    $recurse = optional_param('recurse', 0, PARAM_BOOL);
    $addonpage = optional_param('addonpage', 0, PARAM_INT);
    $categoryid = required_param('categoryid', PARAM_INT);
    $randomcount = required_param('randomcount', PARAM_INT);
    gamifiedquiz_add_random_questions($gamifiedquiz, $addonpage, $categoryid, $randomcount, $recurse);
    redirect($afteractionurl);
}

if (optional_param('savechanges', false, PARAM_BOOL) && confirm_sesskey()) {
    // Save maxgrade and slot marks
    $rawdata = (array) data_submitted();
    $totalmarks = 0;
    
    foreach ($rawdata as $key => $value) {
        if (preg_match('!^maxmark([0-9]+)$!', $key, $matches)) {
            $slotid = $matches[1];
            $slot = $DB->get_record('gamifiedquiz_slots', array('id' => $slotid), '*', MUST_EXIST);
            if ($slot->gamifiedquizid == $gamifiedquiz->id) {
                $slot->maxmark = unformat_float($value, true);
                if ($slot->maxmark < 0) {
                    $slot->maxmark = 0;
                }
                $DB->update_record('gamifiedquiz_slots', $slot);
                $totalmarks += $slot->maxmark;
            }
        }
    }
    
    // Update quiz's total marks (sumgrades) and grade item
    $gamifiedquiz->sumgrades = $totalmarks;
    $DB->update_record('gamifiedquiz', $gamifiedquiz);
    
    // Update grade item maximum grade
    gamifiedquiz_grade_item_update($gamifiedquiz);
    
    redirect($afteractionurl);
}

// Delete question from quiz
if (($deleteslot = optional_param('deleteslot', 0, PARAM_INT)) && confirm_sesskey()) {
    $slot = $DB->get_record('gamifiedquiz_slots', array('id' => $deleteslot), '*', MUST_EXIST);
    if ($slot->gamifiedquizid == $gamifiedquiz->id) {
        // Delete question reference
        $DB->delete_records('question_references', array('itemid' => $slot->id, 'component' => 'mod_gamifiedquiz'));
        // Delete slot
        $DB->delete_records('gamifiedquiz_slots', array('id' => $slot->id));
        
        // Recalculate sumgrades
        $sumgrades = $DB->get_field_sql(
            "SELECT COALESCE(SUM(maxmark), 0) FROM {gamifiedquiz_slots} WHERE gamifiedquizid = ?",
            array($gamifiedquiz->id)
        );
        $gamifiedquiz->sumgrades = $sumgrades;
        $DB->update_record('gamifiedquiz', $gamifiedquiz);
        
        // Update grade item
        gamifiedquiz_grade_item_update($gamifiedquiz);
        
        // Renumber remaining slots
        $remaining = $DB->get_records('gamifiedquiz_slots', 
            array('gamifiedquizid' => $gamifiedquiz->id), 
            'slot ASC'
        );
        $slotnum = 1;
        foreach ($remaining as $s) {
            if ($s->slot != $slotnum) {
                $s->slot = $slotnum;
                $DB->update_record('gamifiedquiz_slots', $s);
            }
            $slotnum++;
        }
    }
    redirect($afteractionurl);
}

// End of process commands =====================================================

$PAGE->set_pagelayout('incourse');
$PAGE->set_pagetype('mod-gamifiedquiz-edit');

$PAGE->set_title(get_string('editingquizx', 'mod_gamifiedquiz', format_string($gamifiedquiz->name)));
$PAGE->set_heading($course->fullname);
$PAGE->activityheader->disable();

echo $OUTPUT->header();

// Initialise the JavaScript (similar to quiz module)
$quizeditconfig = new stdClass();
$quizeditconfig->url = $thispageurl->out(true, ['qbanktool' => '0']);
$quizeditconfig->dialoglisteners = [];
$numberoflisteners = $DB->get_field_sql("
    SELECT COALESCE(MAX(page), 1)
      FROM {gamifiedquiz_slots}
     WHERE gamifiedquizid = ?", [$gamifiedquiz->id]);

for ($pageiter = 1; $pageiter <= $numberoflisteners; $pageiter++) {
    $quizeditconfig->dialoglisteners[] = 'addrandomdialoglaunch_' . $pageiter;
}

$PAGE->requires->data_for_js('quiz_edit_config', $quizeditconfig);
$PAGE->requires->js_call_amd('core_question/question_engine');

// Questions wrapper start
echo html_writer::start_tag('div', ['class' => 'mod-gamifiedquiz-edit-content']);

// Display quiz questions
echo html_writer::start_tag('div', ['class' => 'quiz-questions']);
echo html_writer::tag('h2', get_string('questionsinthisquiz', 'mod_gamifiedquiz'));

$slots = $DB->get_records('gamifiedquiz_slots', 
    array('gamifiedquizid' => $gamifiedquiz->id), 
    'slot ASC'
);

// Calculate total marks
$totalmarks = 0;
foreach ($slots as $slot) {
    $totalmarks += $slot->maxmark;
}

// Display total marks
if (!empty($slots)) {
    echo html_writer::start_tag('div', ['class' => 'quiz-total-marks', 'style' => 'margin-bottom: 15px; padding: 10px; background: #f8f9fa; border-radius: 4px;']);
    echo html_writer::tag('strong', get_string('totalmarks', 'quiz') . ': ' . number_format($totalmarks, 2));
    echo html_writer::end_tag('div');
}

if (empty($slots)) {
    echo html_writer::tag('p', get_string('noquestions', 'mod_gamifiedquiz'));
} else {
    echo html_writer::start_tag('form', array('method' => 'post', 'action' => $thispageurl->out(false)));
    echo html_writer::empty_tag('input', array('type' => 'hidden', 'name' => 'sesskey', 'value' => sesskey()));
    echo html_writer::input_hidden_params($thispageurl);
    
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
                'size' => '5',
                'class' => 'form-control'
            ));
            echo html_writer::end_tag('td');
            echo html_writer::start_tag('td');
            $deleteurl = new moodle_url($thispageurl, array('deleteslot' => $slot->id, 'sesskey' => sesskey()));
            echo html_writer::link($deleteurl, get_string('delete', 'moodle'), array('class' => 'btn btn-danger btn-sm'));
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

echo html_writer::end_tag('div');

// Question bank browser (using Moodle's standard UI - same as quiz module)
echo html_writer::start_tag('div', ['class' => 'questionbank-container', 'id' => 'questionbank']);
echo html_writer::tag('h2', get_string('questionbank', 'question'));

// Use Moodle's question bank custom view
$viewclass = custom_view::class;
$extraparams = ['view' => $viewclass];

// Ensure category is set in pagevars if not already set
if (!isset($pagevars['cat']) || empty($pagevars['cat'])) {
    $pagevars['cat'] = $defaultcategory;
}

// Build question bank view using question_edit_setup results
$questionbank = new $viewclass($contexts, $thispageurl, $course, $cm, $pagevars, $extraparams);

// Render question bank using core question bank renderer
$renderer = $PAGE->get_renderer('core_question', 'bank');
echo $renderer->render($questionbank);

// Include question chooser JavaScript (like quiz module)
$PAGE->requires->js_call_amd('mod_quiz/modal_quiz_question_bank', 'init', [
    $contexts->lowest()->id
]);

// Add random question support
// Ensure category is set in pagevars if not already set
if (!isset($pagevars['cat']) || empty($pagevars['cat'])) {
    $pagevars['cat'] = $defaultcategory;
}

$PAGE->requires->js_call_amd('mod_quiz/modal_add_random_question', 'init', [
    $contexts->lowest()->id,
    $pagevars['cat'],
    $thispageurl->out_as_local_url(true),
    $cm->id,
    \core\plugininfo\qbank::is_plugin_enabled(\qbank_managecategories\helper::PLUGINNAME),
]);

echo html_writer::end_tag('div');

// Questions wrapper end
echo html_writer::end_tag('div');

echo $OUTPUT->footer();
