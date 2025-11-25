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

        // Use Predefined Data
        $mform->addElement('advcheckbox', 'use_predefined', get_string('use_predefined', 'mod_gamifiedquiz'), 
            get_string('use_predefined_desc', 'mod_gamifiedquiz'), array('group' => 1), array(0, 1));
        $mform->setDefault('use_predefined', 0);

        // Predefined Data (textarea)
        $mform->addElement('textarea', 'predefined_data', get_string('predefined_data', 'mod_gamifiedquiz'), 
            array('rows' => 5, 'cols' => 60));
        $mform->setType('predefined_data', PARAM_TEXT);
        $mform->addHelpButton('predefined_data', 'predefined_data', 'mod_gamifiedquiz');
        $mform->hideIf('predefined_data', 'use_predefined', 'eq', 0);

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

        $this->standard_coursemodule_elements();
        $this->add_action_buttons();
    }
}

