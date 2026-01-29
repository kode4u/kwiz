<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

defined('MOODLE_INTERNAL') || die();

require_once($CFG->dirroot . '/course/moodleform_mod.php');

class mod_gamifiedquiz_mod_form extends moodleform_mod {

    public function definition() {
        $mform = $this->_form;

        // Name
        $mform->addElement('text', 'name', get_string('name', 'mod_gamifiedquiz'), array('size' => '64'));
        $mform->setType('name', PARAM_TEXT);
        $mform->addRule('name', null, 'required', null, 'client');

        // Intro
        $this->standard_intro_elements();

        // Topic
        $mform->addElement('text', 'topic', get_string('topic', 'mod_gamifiedquiz'), array('size' => '64'));
        $mform->setType('topic', PARAM_TEXT);
        $mform->addRule('topic', null, 'required', null, 'client');
        $mform->addHelpButton('topic', 'topic', 'mod_gamifiedquiz');

        // Difficulty
        $mform->addElement('select', 'difficulty', get_string('difficulty', 'mod_gamifiedquiz'), array(
            'easy' => get_string('difficulty_easy', 'mod_gamifiedquiz'),
            'medium' => get_string('difficulty_medium', 'mod_gamifiedquiz'),
            'hard' => get_string('difficulty_hard', 'mod_gamifiedquiz')
        ));
        $mform->setDefault('difficulty', 'medium');

        // Language
        $mform->addElement('select', 'language', get_string('language', 'mod_gamifiedquiz'), array(
            'en' => get_string('language_en', 'mod_gamifiedquiz'),
            'km' => get_string('language_km', 'mod_gamifiedquiz')
        ));
        $mform->setDefault('language', 'en');

        // LLM Backend Selection
        $mform->addElement('select', 'llm_backend', get_string('llm_backend', 'mod_gamifiedquiz'), array(
            'openai' => 'OpenAI',
            'gemini' => 'Google Gemini',
            'local' => 'Local LLM'
        ));
        $mform->setDefault('llm_backend', 'openai');
        $mform->addHelpButton('llm_backend', 'llm_backend', 'mod_gamifiedquiz');

        // Question Bank Category Selector
        $mform->addElement('header', 'questionbankheader', get_string('questionbank', 'mod_gamifiedquiz'));
        $mform->setExpanded('questionbankheader', false);
        
        // Get course context for question categories
        if (!empty($this->_cm)) {
            $context = context_module::instance($this->_cm->id);
            $coursecontext = context_course::instance($this->_course->id);
        } else {
            $coursecontext = context_course::instance($this->_course->id);
            $context = $coursecontext;
        }
        
        // Get question categories for this context
        global $DB;
        $categories = array(0 => get_string('defaultcategory', 'mod_gamifiedquiz'));
        $catrecords = $DB->get_records('question_categories', array('contextid' => $coursecontext->id), 'name ASC');
        foreach ($catrecords as $cat) {
            $categories[$cat->id] = $cat->name;
        }
        
        $mform->addElement('select', 'question_category', get_string('questioncategory', 'mod_gamifiedquiz'), $categories);
        $mform->setType('question_category', PARAM_INT);
        $mform->addHelpButton('question_category', 'questioncategory', 'mod_gamifiedquiz');
        $mform->setDefault('question_category', 0);

        // Template Selection
        $mform->addElement('select', 'template', get_string('template', 'mod_gamifiedquiz'), array(
            'default' => get_string('template_default', 'mod_gamifiedquiz'),
            'kahoot' => get_string('template_kahoot', 'mod_gamifiedquiz'),
            'minimal' => get_string('template_minimal', 'mod_gamifiedquiz'),
            'modern' => get_string('template_modern', 'mod_gamifiedquiz')
        ));
        $mform->setDefault('template', 'default');
        $mform->addHelpButton('template', 'template', 'mod_gamifiedquiz');

        // Color Palette
        $mform->addElement('select', 'color_palette', get_string('color_palette', 'mod_gamifiedquiz'), array(
            'kahoot' => get_string('palette_kahoot', 'mod_gamifiedquiz'),
            'blue' => get_string('palette_blue', 'mod_gamifiedquiz'),
            'green' => get_string('palette_green', 'mod_gamifiedquiz'),
            'purple' => get_string('palette_purple', 'mod_gamifiedquiz'),
            'orange' => get_string('palette_orange', 'mod_gamifiedquiz'),
            'red' => get_string('palette_red', 'mod_gamifiedquiz'),
            'custom' => get_string('palette_custom', 'mod_gamifiedquiz')
        ));
        $mform->setDefault('color_palette', 'kahoot');
        $mform->addHelpButton('color_palette', 'color_palette', 'mod_gamifiedquiz');

        // Time Limit Per Question
        $mform->addElement('text', 'time_limit_per_question', get_string('time_limit_per_question', 'mod_gamifiedquiz'), array('size' => '10'));
        $mform->setType('time_limit_per_question', PARAM_INT);
        $mform->setDefault('time_limit_per_question', 60);
        $mform->addRule('time_limit_per_question', null, 'required', null, 'client');
        $mform->addRule('time_limit_per_question', null, 'numeric', null, 'client');
        $mform->addHelpButton('time_limit_per_question', 'time_limit_per_question', 'mod_gamifiedquiz');

        // Leaderboard Top N
        $mform->addElement('select', 'leaderboard_top_n', get_string('leaderboard_top_n', 'mod_gamifiedquiz'), array(
            '3' => '3',
            '5' => '5',
            '10' => '10'
        ));
        $mform->setDefault('leaderboard_top_n', 3);
        $mform->addHelpButton('leaderboard_top_n', 'leaderboard_top_n', 'mod_gamifiedquiz');

        // Background image for question screen
        $mform->addElement('header', 'backgroundheader', get_string('background_image', 'mod_gamifiedquiz'));
        $mform->setExpanded('backgroundheader', false);
        $predefined = array(
            '' => get_string('background_none', 'mod_gamifiedquiz'),
            'predefined:gradient_blue' => get_string('background_gradient_blue', 'mod_gamifiedquiz'),
            'predefined:gradient_purple' => get_string('background_gradient_purple', 'mod_gamifiedquiz'),
            'predefined:gradient_green' => get_string('background_gradient_green', 'mod_gamifiedquiz'),
            'predefined:gradient_orange' => get_string('background_gradient_orange', 'mod_gamifiedquiz'),
            'predefined:gradient_teal' => get_string('background_gradient_teal', 'mod_gamifiedquiz')
        );
        $mform->addElement('select', 'background_image', get_string('background_predefined', 'mod_gamifiedquiz'), $predefined);
        $mform->setType('background_image', PARAM_TEXT);
        $mform->addHelpButton('background_image', 'background_image', 'mod_gamifiedquiz');
        $mform->addElement('text', 'background_image_url', get_string('background_custom_url', 'mod_gamifiedquiz'), array('size' => '60'));
        $mform->setType('background_image_url', PARAM_URL);
        $mform->addHelpButton('background_image_url', 'background_custom_url', 'mod_gamifiedquiz');

        $this->standard_coursemodule_elements();
        $this->add_action_buttons();
    }

    public function set_data($defaultvalues) {
        // When editing: if background_image is a URL, show it in the URL field
        if (!empty($defaultvalues->background_image) && strpos($defaultvalues->background_image, 'http') === 0) {
            $defaultvalues->background_image_url = $defaultvalues->background_image;
            $defaultvalues->background_image = '';
        }
        parent::set_data($defaultvalues);
    }
}

