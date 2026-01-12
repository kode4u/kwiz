<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

/**
 * Plugin upgrade code
 *
 * @package    mod_gamifiedquiz
 * @copyright  2025 JICA Research Project
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

/**
 * Sync JWT secret from docker/.env file to Moodle config
 * Uses docker/.env as the single source of truth
 */
function mod_gamifiedquiz_sync_jwt_secret() {
    global $CFG;
    
    // Try to read JWT_SECRET from docker/.env file (single source of truth)
    $env_secret = null;
    
    // Try environment variable first (set by Docker)
    $env_secret = getenv('JWT_SECRET');
    
    // Try docker/.env file
    if (empty($env_secret)) {
        $env_file = $CFG->dirroot . '/../docker/.env';
        if (file_exists($env_file)) {
            $lines = file($env_file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
            foreach ($lines as $line) {
                $line = trim($line);
                if (strpos($line, '#') === 0) continue; // Skip comments
                if (strpos($line, 'JWT_SECRET=') === 0) {
                    $env_secret = trim(substr($line, strlen('JWT_SECRET=')));
                    break;
                }
            }
        }
    }
    
    // If found, sync to Moodle config
    if (!empty($env_secret)) {
        $current_secret = get_config('mod_gamifiedquiz', 'jwt_secret');
        // Only update if not already set or if it's different
        if (empty($current_secret) || $current_secret !== $env_secret) {
            set_config('jwt_secret', $env_secret, 'mod_gamifiedquiz');
            return true;
        }
    }
    
    return false;
}

/**
 * Post installation hook
 * This runs automatically when plugin is installed
 */
function xmldb_gamifiedquiz_install() {
    // Sync JWT secret from docker/.env on installation
    mod_gamifiedquiz_sync_jwt_secret();
    return true;
}

/**
 * Upgrade hook - runs on every plugin upgrade
 * This ensures JWT secret stays in sync with docker/.env file
 * 
 * @param int $oldversion The old version number
 * @return bool True on success
 */
function xmldb_gamifiedquiz_upgrade($oldversion) {
    global $CFG, $DB;
    
    $dbman = $DB->get_manager();
    
    // Sync JWT secret from docker/.env on every upgrade
    mod_gamifiedquiz_sync_jwt_secret();
    
    // Add new fields for LLM backend, template, color palette, etc.
    if ($oldversion < 2025010104) {
        $table = new xmldb_table('gamifiedquiz');
        
        // Add llm_backend field if it doesn't exist
        $field = new xmldb_field('llm_backend', XMLDB_TYPE_CHAR, '20', null, XMLDB_NOTNULL, null, 'openai', 'language');
        if (!$dbman->field_exists($table, $field)) {
            $dbman->add_field($table, $field);
        }
        
        // Add template field
        $field = new xmldb_field('template', XMLDB_TYPE_CHAR, '50', null, XMLDB_NOTNULL, null, 'default', 'llm_backend');
        if (!$dbman->field_exists($table, $field)) {
            $dbman->add_field($table, $field);
        }
        
        // Add color_palette field
        $field = new xmldb_field('color_palette', XMLDB_TYPE_CHAR, '50', null, XMLDB_NOTNULL, null, 'kahoot', 'template');
        if (!$dbman->field_exists($table, $field)) {
            $dbman->add_field($table, $field);
        }
        
        // Add use_predefined field
        $field = new xmldb_field('use_predefined', XMLDB_TYPE_INTEGER, '1', null, XMLDB_NOTNULL, null, '0', 'color_palette');
        if (!$dbman->field_exists($table, $field)) {
            $dbman->add_field($table, $field);
        }
        
        // Add predefined_data field
        $field = new xmldb_field('predefined_data', XMLDB_TYPE_TEXT, null, null, null, null, null, 'use_predefined');
        if (!$dbman->field_exists($table, $field)) {
            $dbman->add_field($table, $field);
        }
        
        // Add questions_data field
        $field = new xmldb_field('questions_data', XMLDB_TYPE_TEXT, null, null, null, null, null, 'predefined_data');
        if (!$dbman->field_exists($table, $field)) {
            $dbman->add_field($table, $field);
        }
        
        upgrade_mod_savepoint(true, 2025010104, 'gamifiedquiz');
    }
    
    // Add time_limit_per_question and leaderboard_top_n fields
    if ($oldversion < 2025010105) {
        $table = new xmldb_table('gamifiedquiz');
        
        // Find the last existing field to use as reference
        $reference_field = 'language'; // Default fallback
        $possible_fields = ['questions_data', 'predefined_data', 'use_predefined', 'color_palette', 'template', 'llm_backend'];
        
        foreach ($possible_fields as $field_name) {
            $check_field = new xmldb_field($field_name);
            if ($dbman->field_exists($table, $check_field)) {
                $reference_field = $field_name;
                break;
            }
        }
        
        // Add time_limit_per_question field
        $field = new xmldb_field('time_limit_per_question', XMLDB_TYPE_INTEGER, '10', null, XMLDB_NOTNULL, null, '60', $reference_field);
        if (!$dbman->field_exists($table, $field)) {
            $dbman->add_field($table, $field);
        }
        
        // Add leaderboard_top_n field
        $field = new xmldb_field('leaderboard_top_n', XMLDB_TYPE_INTEGER, '2', null, XMLDB_NOTNULL, null, '3', 'time_limit_per_question');
        if (!$dbman->field_exists($table, $field)) {
            $dbman->add_field($table, $field);
        }
        
        upgrade_mod_savepoint(true, 2025010105, 'gamifiedquiz');
    }
    
    // Add session results storage
    if ($oldversion < 2025010106) {
        $table = new xmldb_table('gamifiedquiz_sessions');
        
        // Add session_name field
        $field = new xmldb_field('session_name', XMLDB_TYPE_CHAR, '255', null, null, null, null, 'teacherid');
        if (!$dbman->field_exists($table, $field)) {
            $dbman->add_field($table, $field);
        }
        
        // Add questions_data field
        $field = new xmldb_field('questions_data', XMLDB_TYPE_TEXT, null, null, null, null, null, 'session_name');
        if (!$dbman->field_exists($table, $field)) {
            $dbman->add_field($table, $field);
        }
        
        // Add participants_count field
        $field = new xmldb_field('participants_count', XMLDB_TYPE_INTEGER, '10', null, XMLDB_NOTNULL, null, '0', 'questions_data');
        if (!$dbman->field_exists($table, $field)) {
            $dbman->add_field($table, $field);
        }
        
        // Add total_questions field
        $field = new xmldb_field('total_questions', XMLDB_TYPE_INTEGER, '10', null, XMLDB_NOTNULL, null, '0', 'participants_count');
        if (!$dbman->field_exists($table, $field)) {
            $dbman->add_field($table, $field);
        }
        
        // Add session_results field
        $field = new xmldb_field('session_results', XMLDB_TYPE_TEXT, null, null, null, null, null, 'total_questions');
        if (!$dbman->field_exists($table, $field)) {
            $dbman->add_field($table, $field);
        }
        
        upgrade_mod_savepoint(true, 2025010106, 'gamifiedquiz');
    }
    
    // Add participant_count and results_data to sessions, username to responses
    if ($oldversion < 2025010108) {
        // Sessions table updates
        $table = new xmldb_table('gamifiedquiz_sessions');
        
        $field = new xmldb_field('participant_count', XMLDB_TYPE_INTEGER, '10', null, XMLDB_NOTNULL, null, '0', 'started');
        if (!$dbman->field_exists($table, $field)) {
            $dbman->add_field($table, $field);
        }
        
        $field = new xmldb_field('results_data', XMLDB_TYPE_TEXT, null, null, null, null, null, 'questions_data');
        if (!$dbman->field_exists($table, $field)) {
            $dbman->add_field($table, $field);
        }
        
        // Responses table updates
        $table = new xmldb_table('gamifiedquiz_responses');
        
        $field = new xmldb_field('username', XMLDB_TYPE_CHAR, '255', null, null, null, null, 'userid');
        if (!$dbman->field_exists($table, $field)) {
            $dbman->add_field($table, $field);
        }
        
        upgrade_mod_savepoint(true, 2025010108, 'gamifiedquiz');
    }
    
    // Add question_category field for question bank integration
    if ($oldversion < 2025010109) {
        $table = new xmldb_table('gamifiedquiz');
        
        $field = new xmldb_field('question_category', XMLDB_TYPE_INTEGER, '10', null, null, null, null, 'leaderboard_top_n');
        if (!$dbman->field_exists($table, $field)) {
            $dbman->add_field($table, $field);
        }
        
        upgrade_mod_savepoint(true, 2025010109, 'gamifiedquiz');
    }
    
    // Add gamifiedquiz_slots and gamifiedquiz_grades tables (similar to quiz module)
    if ($oldversion < 2025010110) {
        // Create gamifiedquiz_slots table
        $table = new xmldb_table('gamifiedquiz_slots');
        if (!$dbman->table_exists($table)) {
            $table->add_field('id', XMLDB_TYPE_INTEGER, '10', null, XMLDB_NOTNULL, XMLDB_SEQUENCE, null);
            $table->add_field('gamifiedquizid', XMLDB_TYPE_INTEGER, '10', null, XMLDB_NOTNULL, null, null);
            $table->add_field('slot', XMLDB_TYPE_INTEGER, '10', null, XMLDB_NOTNULL, null, null);
            $table->add_field('page', XMLDB_TYPE_INTEGER, '10', null, XMLDB_NOTNULL, null, '1');
            $table->add_field('maxmark', XMLDB_TYPE_NUMBER, '10', '5', XMLDB_NOTNULL, null, '1.0');
            $table->add_field('displaynumber', XMLDB_TYPE_CHAR, '255', null, null, null, null);
            
            $table->add_key('primary', XMLDB_KEY_PRIMARY, array('id'));
            $table->add_key('gamifiedquiz', XMLDB_KEY_FOREIGN, array('gamifiedquizid'), 'gamifiedquiz', array('id'));
            $table->add_index('quiz_slot', XMLDB_INDEX_UNIQUE, array('gamifiedquizid', 'slot'));
            
            $dbman->create_table($table);
        }
        
        // Create gamifiedquiz_grades table
        $table = new xmldb_table('gamifiedquiz_grades');
        if (!$dbman->table_exists($table)) {
            $table->add_field('id', XMLDB_TYPE_INTEGER, '10', null, XMLDB_NOTNULL, XMLDB_SEQUENCE, null);
            $table->add_field('gamifiedquizid', XMLDB_TYPE_INTEGER, '10', null, XMLDB_NOTNULL, null, null);
            $table->add_field('userid', XMLDB_TYPE_INTEGER, '10', null, XMLDB_NOTNULL, null, null);
            $table->add_field('grade', XMLDB_TYPE_NUMBER, '10', '5', XMLDB_NOTNULL, null, null);
            $table->add_field('timemodified', XMLDB_TYPE_INTEGER, '10', null, XMLDB_NOTNULL, null, null);
            
            $table->add_key('primary', XMLDB_KEY_PRIMARY, array('id'));
            $table->add_key('gamifiedquiz', XMLDB_KEY_FOREIGN, array('gamifiedquizid'), 'gamifiedquiz', array('id'));
            $table->add_key('user', XMLDB_KEY_FOREIGN, array('userid'), 'user', array('id'));
            $table->add_index('quiz_user', XMLDB_INDEX_UNIQUE, array('gamifiedquizid', 'userid'));
            
            $dbman->create_table($table);
        }
        
        upgrade_mod_savepoint(true, 2025010110, 'gamifiedquiz');
    }
    
    // Add sumgrades field to gamifiedquiz table
    if ($oldversion < 2025010111) {
        $table = new xmldb_table('gamifiedquiz');
        $field = new xmldb_field('sumgrades', XMLDB_TYPE_NUMBER, '10', '2', XMLDB_NOTNULL, false, '0', 'question_category');
        
        if (!$dbman->field_exists($table, $field)) {
            $dbman->add_field($table, $field);
        }
        
        // Calculate sumgrades for existing quizzes
        $quizzes = $DB->get_records('gamifiedquiz');
        foreach ($quizzes as $quiz) {
            $sumgrades = $DB->get_field_sql(
                "SELECT COALESCE(SUM(maxmark), 0) FROM {gamifiedquiz_slots} WHERE gamifiedquizid = ?",
                array($quiz->id)
            );
            $DB->set_field('gamifiedquiz', 'sumgrades', $sumgrades, array('id' => $quiz->id));
        }
        
        upgrade_mod_savepoint(true, 2025010111, 'gamifiedquiz');
    }
    
    // Add category_name field to gamifiedquiz_questions table
    if ($oldversion < 2025010112) {
        $table = new xmldb_table('gamifiedquiz_questions');
        $field = new xmldb_field('category_name', XMLDB_TYPE_CHAR, '255', null, XMLDB_NOTNULL, false, null, 'difficulty');
        
        if (!$dbman->field_exists($table, $field)) {
            $dbman->add_field($table, $field);
        }
        
        upgrade_mod_savepoint(true, 2025010112, 'gamifiedquiz');
    }
    
    if ($oldversion < 2025010113) {
        // Create gamifiedquiz_participants table to track student joins
        $table = new xmldb_table('gamifiedquiz_participants');
        
        if (!$dbman->table_exists($table)) {
            $table->add_field('id', XMLDB_TYPE_INTEGER, '10', null, XMLDB_NOTNULL, XMLDB_SEQUENCE, null);
            $table->add_field('session_id', XMLDB_TYPE_CHAR, '100', null, XMLDB_NOTNULL, null, null);
            $table->add_field('gamifiedquizid', XMLDB_TYPE_INTEGER, '10', null, XMLDB_NOTNULL, null, null);
            $table->add_field('userid', XMLDB_TYPE_INTEGER, '10', null, XMLDB_NOTNULL, null, null);
            $table->add_field('username', XMLDB_TYPE_CHAR, '255', null, null, null, null);
            $table->add_field('timejoined', XMLDB_TYPE_INTEGER, '10', null, XMLDB_NOTNULL, null, null);
            
            $table->add_key('primary', XMLDB_KEY_PRIMARY, array('id'));
            $table->add_key('user', XMLDB_KEY_FOREIGN, array('userid'), 'user', array('id'));
            $table->add_key('gamifiedquiz', XMLDB_KEY_FOREIGN, array('gamifiedquizid'), 'gamifiedquiz', array('id'));
            
            $table->add_index('session_user', XMLDB_INDEX_UNIQUE, array('session_id', 'userid'));
            $table->add_index('session_id', XMLDB_INDEX_NOTUNIQUE, array('session_id'));
            
            $dbman->create_table($table);
        }
        
        upgrade_mod_savepoint(true, 2025010113, 'gamifiedquiz');
    }
    
    // Return true to indicate upgrade was successful
    return true;
}

