<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

defined('MOODLE_INTERNAL') || die();

require_once($CFG->dirroot . '/course/moodleform_mod.php');
require_once($CFG->dirroot . '/mod/kwiz/lib.php');

class mod_kwiz_mod_form extends moodleform_mod {

    public function definition() {
        global $CFG, $DB;
        $mform = $this->_form;

        // Name
        $mform->addElement('text', 'name', get_string('name', 'mod_kwiz'), array('size' => '64'));
        $mform->setType('name', PARAM_TEXT);
        $mform->addRule('name', null, 'required', null, 'client');

        // Intro
        $this->standard_intro_elements();

        // Topic
        $mform->addElement('text', 'topic', get_string('topic', 'mod_kwiz'), array('size' => '64'));
        $mform->setType('topic', PARAM_TEXT);
        $mform->addRule('topic', null, 'required', null, 'client');
        $mform->addHelpButton('topic', 'topic', 'mod_kwiz');


        // Language
        $mform->addElement('select', 'language', get_string('language', 'mod_kwiz'), array(
            'en' => get_string('language_en', 'mod_kwiz'),
            'km' => get_string('language_km', 'mod_kwiz')
        ));
        $mform->setDefault('language', 'en');

        // LLM Backend Selection
        $mform->addElement('select', 'llm_backend', get_string('llm_backend', 'mod_kwiz'), array(
            'openai' => 'OpenAI',
            'gemini' => 'Google Gemini',
            'local' => 'Local LLM'
        ));
        $mform->setDefault('llm_backend', 'openai');
        $mform->addHelpButton('llm_backend', 'llm_backend', 'mod_kwiz');

        // User-specific OpenAI API key (saved to user preferences, not activity record).
        $mform->addElement('passwordunmask', 'openai_user_api_key', get_string('openai_user_api_key', 'mod_kwiz'));
        $mform->setType('openai_user_api_key', PARAM_RAW_TRIMMED);
        $mform->addHelpButton('openai_user_api_key', 'openai_user_api_key', 'mod_kwiz');
        $mform->hideIf('openai_user_api_key', 'llm_backend', 'neq', 'openai');

        // User-specific Gemini API key (saved to user preferences, not activity record).
        $mform->addElement('passwordunmask', 'gemini_user_api_key', get_string('gemini_user_api_key', 'mod_kwiz'));
        $mform->setType('gemini_user_api_key', PARAM_RAW_TRIMMED);
        $mform->addHelpButton('gemini_user_api_key', 'gemini_user_api_key', 'mod_kwiz');
        $mform->hideIf('gemini_user_api_key', 'llm_backend', 'neq', 'gemini');

        // Local LLM model selection (dynamic from llmapi; same HTTP/URL logic as lib.php)
        $llmmodeloptions = array('' => get_string('choose', 'moodle'));
        $models = kwiz_fetch_ollama_models();
        foreach ($models as $name => $label) {
            $llmmodeloptions[$name] = $label;
        }

        $mform->addElement('select', 'llm_model', get_string('llm_model', 'mod_kwiz'), $llmmodeloptions);
        $mform->setType('llm_model', PARAM_TEXT);
        $mform->addHelpButton('llm_model', 'llm_model', 'mod_kwiz');
        // Only relevant when backend is local.
        $mform->hideIf('llm_model', 'llm_backend', 'neq', 'local');

        // Question Bank Category Selector
        $mform->addElement('header', 'questionbankheader', get_string('questionbank', 'mod_kwiz'));
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
        $categories = array(0 => get_string('defaultcategory', 'mod_kwiz'));
        $catrecords = $DB->get_records('question_categories', array('contextid' => $coursecontext->id), 'name ASC');
        foreach ($catrecords as $cat) {
            $categories[$cat->id] = $cat->name;
        }
        
        $mform->addElement('select', 'question_category', get_string('questioncategory', 'mod_kwiz'), $categories);
        $mform->setType('question_category', PARAM_INT);
        $mform->addHelpButton('question_category', 'questioncategory', 'mod_kwiz');
        $mform->setDefault('question_category', 0);
        $this->standard_coursemodule_elements();
        $this->add_action_buttons();
    }

    public function set_data($defaultvalues) {
        global $USER;

        // Load user-specific API keys into form (never saved on activity instance).
        $defaultvalues->openai_user_api_key = get_user_preferences('mod_kwiz_openai_api_key', '', $USER->id);
        $defaultvalues->gemini_user_api_key = get_user_preferences('mod_kwiz_gemini_api_key', '', $USER->id);

        parent::set_data($defaultvalues);
    }

    public function validation($data, $files) {
        $errors = parent::validation($data, $files);

        if (!empty($data['llm_backend']) && $data['llm_backend'] === 'openai') {
            $value = trim((string)($data['openai_user_api_key'] ?? ''));
            if ($value === '') {
                $errors['openai_user_api_key'] = get_string('apikey_required_openai', 'mod_kwiz');
            }
        } else if (!empty($data['llm_backend']) && $data['llm_backend'] === 'gemini') {
            $value = trim((string)($data['gemini_user_api_key'] ?? ''));
            if ($value === '') {
                $errors['gemini_user_api_key'] = get_string('apikey_required_gemini', 'mod_kwiz');
            }
        } else if (!empty($data['llm_backend']) && $data['llm_backend'] === 'local') {
            $value = trim((string)($data['llm_model'] ?? ''));
            if ($value === '') {
                $errors['llm_model'] = get_string('llm_model_required_local', 'mod_kwiz');
            }
        }

        return $errors;
    }
}

