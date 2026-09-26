<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

/**
 * Custom question bank view for gamified quiz
 * Similar to mod_quiz\question\bank\custom_view
 *
 * @package    mod_gamifiedquiz
 * @copyright  2025 JICA Research Project
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

namespace mod_gamifiedquiz\question\bank;

defined('MOODLE_INTERNAL') || die();

use core_question\local\bank\view;
use core_question\local\bank\column_manager_base;
use core_question\local\bank\column_base;

/**
 * Custom view for gamified quiz question bank
 */
class custom_view extends view {
    
    /** @var int number of questions per page */
    const DEFAULT_PAGE_SIZE = 20;
    
    /** @var string $component the component */
    public $component = 'mod_gamifiedquiz';
    
    /**
     * Constructor
     */
    public function __construct($contexts, $pageurl, $course, $cm, $params, $extraparams) {
        // Default filter condition - set up category filter if not already set
        // This matches the quiz module's approach
        if (!isset($params['filter'])) {
            $params['filter'] = [];
            // Parse category parameter (format: "categoryid,contextid" or just "categoryid")
            if (isset($params['cat']) && !empty($params['cat'])) {
                $catparam = $params['cat'];
                $categoryid = null;
                $contextid = null;
                
                if (strpos($catparam, ',') !== false) {
                    [$categoryid, $contextid] = explode(',', $catparam, 2);
                    $categoryid = (int)$categoryid;
                    $contextid = (int)$contextid;
                } else {
                    $categoryid = (int)$catparam;
                    $contextid = $contexts->lowest()->id;
                }
                
                if ($categoryid > 0) {
                    // Get category record - try with contextid first, then without
                    global $DB;
                    $category = $DB->get_record('question_categories', 
                        array('id' => $categoryid, 'contextid' => $contextid), 
                        '*', 
                        \IGNORE_MISSING
                    );
                    
                    // If not found with contextid, try without (category might be in different context)
                    if (!$category) {
                        $category = $DB->get_record('question_categories', 
                            array('id' => $categoryid), 
                            '*', 
                            \IGNORE_MISSING
                        );
                    }
                    
                    if ($category) {
                        // Use the category's actual contextid
                        $params['filter']['category'] = [
                            'jointype' => \core_question\local\bank\condition::JOINTYPE_DEFAULT,
                            'values' => [$category->id],
                            'filteroptions' => ['includesubcategories' => false],
                        ];
                    }
                }
            }
        }
        
        $this->init_columns($this->wanted_columns(), $this->heading_column());
        parent::__construct($contexts, $pageurl, $course, $cm, $params, $extraparams);
        $this->pagesize = self::DEFAULT_PAGE_SIZE;
    }
    
    /**
     * Just use the base column manager
     */
    protected function init_column_manager(): void {
        $this->columnmanager = new column_manager_base();
    }
    
    /**
     * Returns the list of question types that can be shown in this view.
     *
     * @return array
     */
    protected function wanted_question_types(): array {
        return ['multichoice'];
    }
    
    /**
     * Get question bank columns (similar to quiz module)
     */
    protected function get_question_bank_plugins(): array {
        $questionbankclasscolumns = [];
        $customviewcolumns = [
            'core_question\local\bank\checkbox_column' . column_base::ID_SEPARATOR . 'checkbox_column',
            'qbank_viewquestiontype\question_type_column' . column_base::ID_SEPARATOR . 'question_type_column',
            'qbank_viewquestionname\question_name_idnumber_tags_column' . column_base::ID_SEPARATOR . 'question_name_idnumber_tags_column',
            'qbank_previewquestion\preview_action_column' . column_base::ID_SEPARATOR . 'preview_action_column',
        ];

        foreach ($customviewcolumns as $columnid) {
            [$columnclass, $columnname] = explode(column_base::ID_SEPARATOR, $columnid, 2);
            if (class_exists($columnclass)) {
                $questionbankclasscolumns[$columnid] = $columnclass::from_column_name($this, $columnname);
            }
        }

        return $questionbankclasscolumns;
    }
    
    /**
     * Heading column
     */
    protected function heading_column(): string {
        return 'qbank_viewquestionname\\question_name_idnumber_tags_column';
    }
    
    /**
     * URL to add question to quiz
     */
    public function add_to_quiz_url($questionid) {
        global $CFG;
        require_once($CFG->dirroot . '/lib/moodlelib.php');
        $params = $this->baseurl->params();
        $params['addquestion'] = $questionid;
        $params['sesskey'] = sesskey();
        $params['cmid'] = $this->cm->id;
        return new \moodle_url('/mod/gamifiedquiz/edit.php', $params);
    }
    
    /**
     * Display bottom controls (add selected questions button)
     */
    protected function display_bottom_controls(\context $catcontext): void {
        global $CFG;
        require_once($CFG->dirroot . '/lib/moodlelib.php');
        require_once($CFG->dirroot . '/lib/html_writer.php');
        $canuseall = has_capability('moodle/question:useall', $catcontext);

        echo \html_writer::start_tag('div', ['class' => 'pt-2']);
        if ($canuseall) {
            // Add selected questions to the quiz.
            $params = [
                'type' => 'submit',
                'name' => 'add',
                'id' => 'addselected',
                'value' => get_string('addselectedquestionstoquiz', 'mod_gamifiedquiz'),
                'class' => 'btn btn-primary',
            ];
            echo \html_writer::empty_tag('input', $params);
        }
        echo \html_writer::end_tag('div');
    }
}
