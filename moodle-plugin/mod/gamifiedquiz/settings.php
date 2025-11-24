<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

defined('MOODLE_INTERNAL') || die();

if ($hassiteconfig) {
    $settings = new admin_settingpage('modsettinggamifiedquiz', get_string('pluginname', 'mod_gamifiedquiz'));
    $ADMIN->add('modsettings', $settings);

    // WebSocket Server URL
    $settings->add(new admin_setting_configtext(
        'mod_gamifiedquiz/websocket_url',
        get_string('websocket_url', 'mod_gamifiedquiz'),
        get_string('websocket_url_desc', 'mod_gamifiedquiz'),
        'ws://localhost:3001',
        PARAM_TEXT
    ));

    // LLM API URL
    $settings->add(new admin_setting_configtext(
        'mod_gamifiedquiz/llmapi_url',
        get_string('llmapi_url', 'mod_gamifiedquiz'),
        get_string('llmapi_url_desc', 'mod_gamifiedquiz'),
        'http://localhost:5000',
        PARAM_URL
    ));

    // JWT Secret
    $settings->add(new admin_setting_configtext(
        'mod_gamifiedquiz/jwt_secret',
        get_string('jwt_secret', 'mod_gamifiedquiz'),
        get_string('jwt_secret_desc', 'mod_gamifiedquiz'),
        'change-me-in-production',
        PARAM_TEXT
    ));
}

