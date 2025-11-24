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

        $this->standard_coursemodule_elements();
        $this->add_action_buttons();
    }
}

