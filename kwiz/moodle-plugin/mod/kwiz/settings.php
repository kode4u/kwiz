<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

defined('MOODLE_INTERNAL') || die();

if ($hassiteconfig) {
    $settings = new admin_settingpage('modsettingkwiz', get_string('pluginname', 'mod_kwiz'));
    $ADMIN->add('modsettings', $settings);

    // LLM API URL
    $settings->add(new admin_setting_configtext(
        'mod_kwiz/llmapi_url',
        get_string('llmapi_url', 'mod_kwiz'),
        get_string('llmapi_url_desc', 'mod_kwiz') . ' (Use http://llmapi:5001 for Docker, http://localhost:5001 for local)',
        'http://llmapi:5001',
        PARAM_TEXT
    ));
}
