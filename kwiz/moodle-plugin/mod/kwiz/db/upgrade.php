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
 * @package    mod_kwiz
 * @copyright  2025 JICA Research Project
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

/**
/**
 * Post installation hook
 * This runs automatically when plugin is installed
 */
function xmldb_kwiz_install() {
    return true;
}

/**
 * Upgrade hook - runs on every plugin upgrade
 * 
 * @param int $oldversion The old version number
 * @return bool True on success
 */
function xmldb_kwiz_upgrade($oldversion) {
    global $CFG, $DB;
    
    $dbman = $DB->get_manager();
    
    // Add new fields for LLM backend, template, color palette, etc.
    if ($oldversion < 2025010104) {
        $table = new xmldb_table('kwiz');
        
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
        
        upgrade_mod_savepoint(true, 2025010104, 'kwiz');
    }
    
    // Add time_limit_per_question and leaderboard_top_n fields
    if ($oldversion < 2025010105) {
        $table = new xmldb_table('kwiz');
        
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
        
        upgrade_mod_savepoint(true, 2025010105, 'kwiz');
    }
    
    // Add session results storage
    if ($oldversion < 2025010106) {
        $table = new xmldb_table('kwiz_sessions');
        
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
        
        upgrade_mod_savepoint(true, 2025010106, 'kwiz');
    }
    
    // Add participant_count and results_data to sessions, username to responses
    if ($oldversion < 2025010108) {
        // Sessions table updates
        $table = new xmldb_table('kwiz_sessions');
        
        $field = new xmldb_field('participant_count', XMLDB_TYPE_INTEGER, '10', null, XMLDB_NOTNULL, null, '0', 'started');
        if (!$dbman->field_exists($table, $field)) {
            $dbman->add_field($table, $field);
        }
        
        $field = new xmldb_field('results_data', XMLDB_TYPE_TEXT, null, null, null, null, null, 'questions_data');
        if (!$dbman->field_exists($table, $field)) {
            $dbman->add_field($table, $field);
        }
        
        // Responses table updates
        $table = new xmldb_table('kwiz_responses');
        
        $field = new xmldb_field('username', XMLDB_TYPE_CHAR, '255', null, null, null, null, 'userid');
        if (!$dbman->field_exists($table, $field)) {
            $dbman->add_field($table, $field);
        }
        
        upgrade_mod_savepoint(true, 2025010108, 'kwiz');
    }
    
    // Add question_category field for question bank integration
    if ($oldversion < 2025010109) {
        $table = new xmldb_table('kwiz');
        
        $field = new xmldb_field('question_category', XMLDB_TYPE_INTEGER, '10', null, null, null, null, 'leaderboard_top_n');
        if (!$dbman->field_exists($table, $field)) {
            $dbman->add_field($table, $field);
        }
        
        upgrade_mod_savepoint(true, 2025010109, 'kwiz');
    }
    
    // Add kwiz_slots and kwiz_grades tables (similar to quiz module)
    if ($oldversion < 2025010110) {
        // Create kwiz_slots table
        $table = new xmldb_table('kwiz_slots');
        if (!$dbman->table_exists($table)) {
            $table->add_field('id', XMLDB_TYPE_INTEGER, '10', null, XMLDB_NOTNULL, XMLDB_SEQUENCE, null);
            $table->add_field('kwizid', XMLDB_TYPE_INTEGER, '10', null, XMLDB_NOTNULL, null, null);
            $table->add_field('slot', XMLDB_TYPE_INTEGER, '10', null, XMLDB_NOTNULL, null, null);
            $table->add_field('page', XMLDB_TYPE_INTEGER, '10', null, XMLDB_NOTNULL, null, '1');
            $table->add_field('maxmark', XMLDB_TYPE_NUMBER, '10', '5', XMLDB_NOTNULL, null, '1.0');
            $table->add_field('displaynumber', XMLDB_TYPE_CHAR, '255', null, null, null, null);
            
            $table->add_key('primary', XMLDB_KEY_PRIMARY, array('id'));
            $table->add_key('kwiz', XMLDB_KEY_FOREIGN, array('kwizid'), 'kwiz', array('id'));
            $table->add_index('quiz_slot', XMLDB_INDEX_UNIQUE, array('kwizid', 'slot'));
            
            $dbman->create_table($table);
        }
        
        // Create kwiz_grades table
        $table = new xmldb_table('kwiz_grades');
        if (!$dbman->table_exists($table)) {
            $table->add_field('id', XMLDB_TYPE_INTEGER, '10', null, XMLDB_NOTNULL, XMLDB_SEQUENCE, null);
            $table->add_field('kwizid', XMLDB_TYPE_INTEGER, '10', null, XMLDB_NOTNULL, null, null);
            $table->add_field('userid', XMLDB_TYPE_INTEGER, '10', null, XMLDB_NOTNULL, null, null);
            $table->add_field('grade', XMLDB_TYPE_NUMBER, '10', '5', XMLDB_NOTNULL, null, null);
            $table->add_field('timemodified', XMLDB_TYPE_INTEGER, '10', null, XMLDB_NOTNULL, null, null);
            
            $table->add_key('primary', XMLDB_KEY_PRIMARY, array('id'));
            $table->add_key('kwiz', XMLDB_KEY_FOREIGN, array('kwizid'), 'kwiz', array('id'));
            $table->add_key('user', XMLDB_KEY_FOREIGN, array('userid'), 'user', array('id'));
            $table->add_index('quiz_user', XMLDB_INDEX_UNIQUE, array('kwizid', 'userid'));
            
            $dbman->create_table($table);
        }
        
        upgrade_mod_savepoint(true, 2025010110, 'kwiz');
    }
    
    // Add sumgrades field to kwiz table
    if ($oldversion < 2025010111) {
        $table = new xmldb_table('kwiz');
        $field = new xmldb_field('sumgrades', XMLDB_TYPE_NUMBER, '10', '2', XMLDB_NOTNULL, false, '0', 'question_category');
        
        if (!$dbman->field_exists($table, $field)) {
            $dbman->add_field($table, $field);
        }
        
        // Calculate sumgrades for existing quizzes
        $quizzes = $DB->get_records('kwiz');
        foreach ($quizzes as $quiz) {
            $sumgrades = $DB->get_field_sql(
                "SELECT COALESCE(SUM(maxmark), 0) FROM {kwiz_slots} WHERE kwizid = ?",
                array($quiz->id)
            );
            $DB->set_field('kwiz', 'sumgrades', $sumgrades, array('id' => $quiz->id));
        }
        
        upgrade_mod_savepoint(true, 2025010111, 'kwiz');
    }
    
    // Add category_name field to kwiz_questions table
    if ($oldversion < 2025010112) {
        $table = new xmldb_table('kwiz_questions');
        $field = new xmldb_field('category_name', XMLDB_TYPE_CHAR, '255', null, XMLDB_NOTNULL, false, null, 'difficulty');
        
        if (!$dbman->field_exists($table, $field)) {
            $dbman->add_field($table, $field);
        }
        
        upgrade_mod_savepoint(true, 2025010112, 'kwiz');
    }
    
    if ($oldversion < 2025010113) {
        // Create kwiz_participants table to track student joins
        $table = new xmldb_table('kwiz_participants');
        
        if (!$dbman->table_exists($table)) {
            $table->add_field('id', XMLDB_TYPE_INTEGER, '10', null, XMLDB_NOTNULL, XMLDB_SEQUENCE, null);
            $table->add_field('session_id', XMLDB_TYPE_CHAR, '100', null, XMLDB_NOTNULL, null, null);
            $table->add_field('kwizid', XMLDB_TYPE_INTEGER, '10', null, XMLDB_NOTNULL, null, null);
            $table->add_field('userid', XMLDB_TYPE_INTEGER, '10', null, XMLDB_NOTNULL, null, null);
            $table->add_field('username', XMLDB_TYPE_CHAR, '255', null, null, null, null);
            $table->add_field('timejoined', XMLDB_TYPE_INTEGER, '10', null, XMLDB_NOTNULL, null, null);
            
            $table->add_key('primary', XMLDB_KEY_PRIMARY, array('id'));
            $table->add_key('user', XMLDB_KEY_FOREIGN, array('userid'), 'user', array('id'));
            $table->add_key('kwiz', XMLDB_KEY_FOREIGN, array('kwizid'), 'kwiz', array('id'));
            
            $table->add_index('session_user', XMLDB_INDEX_UNIQUE, array('session_id', 'userid'));
            $table->add_index('session_id', XMLDB_INDEX_NOTUNIQUE, array('session_id'));
            
            $dbman->create_table($table);
        }
        
        upgrade_mod_savepoint(true, 2025010113, 'kwiz');
    }
    
    // Add background_image for quiz question screen background
    if ($oldversion < 2025010114) {
        $table = new xmldb_table('kwiz');
        $field = new xmldb_field('background_image', XMLDB_TYPE_CHAR, '500', null, null, null, null, 'question_category');
        if (!$dbman->field_exists($table, $field)) {
            $dbman->add_field($table, $field);
        }
        upgrade_mod_savepoint(true, 2025010114, 'kwiz');
    }

    // Add llm_model field for storing selected local LLM model
    if ($oldversion < 2025010115) {
        $table = new xmldb_table('kwiz');
        // Place after llm_backend if present, otherwise fall back to language
        $afterfield = 'llm_backend';
        $checkfield = new xmldb_field('llm_backend');
        if (!$dbman->field_exists($table, $checkfield)) {
            $afterfield = 'language';
        }
        $field = new xmldb_field('llm_model', XMLDB_TYPE_CHAR, '100', null, null, null, null, $afterfield);
        if (!$dbman->field_exists($table, $field)) {
            $dbman->add_field($table, $field);
        }
        upgrade_mod_savepoint(true, 2025010115, 'kwiz');
    }

    // Add generation logs table for research/performance analysis.
    if ($oldversion < 2025010116) {
        $table = new xmldb_table('kwiz_generation_logs');

        if (!$dbman->table_exists($table)) {
            $table->add_field('id', XMLDB_TYPE_INTEGER, '10', null, XMLDB_NOTNULL, XMLDB_SEQUENCE, null);
            $table->add_field('kwizid', XMLDB_TYPE_INTEGER, '10', null, XMLDB_NOTNULL, null, null);
            $table->add_field('userid', XMLDB_TYPE_INTEGER, '10', null, XMLDB_NOTNULL, null, null);
            $table->add_field('cmid', XMLDB_TYPE_INTEGER, '10', null, null, null, null);
            $table->add_field('session_id', XMLDB_TYPE_CHAR, '100', null, null, null, null);
            $table->add_field('request_uuid', XMLDB_TYPE_CHAR, '36', null, XMLDB_NOTNULL, null, null);
            $table->add_field('topic', XMLDB_TYPE_CHAR, '255', null, null, null, null);
            $table->add_field('difficulty', XMLDB_TYPE_CHAR, '20', null, null, null, null);
            $table->add_field('language', XMLDB_TYPE_CHAR, '10', null, null, null, null);
            $table->add_field('backend', XMLDB_TYPE_CHAR, '20', null, null, null, null);
            $table->add_field('llm_model', XMLDB_TYPE_CHAR, '100', null, null, null, null);
            $table->add_field('api_url', XMLDB_TYPE_CHAR, '255', null, null, null, null);
            $table->add_field('requested_count', XMLDB_TYPE_INTEGER, '10', null, XMLDB_NOTNULL, null, '0');
            $table->add_field('generated_count', XMLDB_TYPE_INTEGER, '10', null, XMLDB_NOTNULL, null, '0');
            $table->add_field('saved_count', XMLDB_TYPE_INTEGER, '10', null, XMLDB_NOTNULL, null, '0');
            $table->add_field('started_at', XMLDB_TYPE_INTEGER, '10', null, XMLDB_NOTNULL, null, null);
            $table->add_field('ended_at', XMLDB_TYPE_INTEGER, '10', null, null, null, null);
            $table->add_field('duration_ms', XMLDB_TYPE_INTEGER, '10', null, null, null, null);
            $table->add_field('questions_per_sec', XMLDB_TYPE_NUMBER, '10', '4', null, null, null);
            $table->add_field('status', XMLDB_TYPE_CHAR, '20', null, XMLDB_NOTNULL, null, 'started');
            $table->add_field('error_message', XMLDB_TYPE_TEXT, null, null, null, null, null);
            $table->add_field('timecreated', XMLDB_TYPE_INTEGER, '10', null, XMLDB_NOTNULL, null, null);
            $table->add_field('timemodified', XMLDB_TYPE_INTEGER, '10', null, XMLDB_NOTNULL, null, null);

            $table->add_key('primary', XMLDB_KEY_PRIMARY, array('id'));
            $table->add_key('kwiz', XMLDB_KEY_FOREIGN, array('kwizid'), 'kwiz', array('id'));
            $table->add_key('user', XMLDB_KEY_FOREIGN, array('userid'), 'user', array('id'));

            $table->add_index('quiz_time', XMLDB_INDEX_NOTUNIQUE, array('kwizid', 'timecreated'));
            $table->add_index('request_uuid', XMLDB_INDEX_UNIQUE, array('request_uuid'));
            $table->add_index('status', XMLDB_INDEX_NOTUNIQUE, array('status'));

            $dbman->create_table($table);
        }

        upgrade_mod_savepoint(true, 2025010116, 'kwiz');
    }

    if ($oldversion < 2025010117) {
        $table = new xmldb_table('kwiz_generation_logs');

        $field = new xmldb_field('batch_id', XMLDB_TYPE_CHAR, '36', null, null, null, null, 'request_uuid');
        if (!$dbman->field_exists($table, $field)) {
            $dbman->add_field($table, $field);
        }

        $field = new xmldb_field('category_name', XMLDB_TYPE_CHAR, '255', null, null, null, null, 'batch_id');
        if (!$dbman->field_exists($table, $field)) {
            $dbman->add_field($table, $field);
        }

        $index = new xmldb_index('batch_id', XMLDB_INDEX_NOTUNIQUE, array('batch_id'));
        if (!$dbman->index_exists($table, $index)) {
            $dbman->add_index($table, $index);
        }

        upgrade_mod_savepoint(true, 2025010117, 'kwiz');
    }

    if ($oldversion < 2025010118) {
        $table = new xmldb_table('kwiz_questions');
        $field = new xmldb_field('topic', XMLDB_TYPE_CHAR, '255', null, null, null, null, 'category_name');
        if (!$dbman->field_exists($table, $field)) {
            $dbman->add_field($table, $field);
        }

        $table = new xmldb_table('kwiz');
        $field = new xmldb_field('categories_data', XMLDB_TYPE_TEXT, null, null, null, null, null, 'questions_data');
        if (!$dbman->field_exists($table, $field)) {
            $dbman->add_field($table, $field);
        }

        // Backfill topic on questions from generation logs where possible.
        $DB->execute("
            UPDATE {kwiz_questions} q
            INNER JOIN {kwiz_generation_logs} l ON l.session_id = q.session_id
            SET q.topic = l.topic
            WHERE (q.topic IS NULL OR q.topic = '')
              AND l.topic IS NOT NULL AND l.topic <> ''
        ");

        upgrade_mod_savepoint(true, 2025010118, 'kwiz');
    }

    if ($oldversion < 2025010119) {
        $table = new xmldb_table('kwiz');
        $field = new xmldb_field('learning_outcomes', XMLDB_TYPE_CHAR, '255', null, null, null, null, 'categories_data');
        if (!$dbman->field_exists($table, $field)) {
            $dbman->add_field($table, $field);
        }

        upgrade_mod_savepoint(true, 2025010119, 'kwiz');
    }

    // Return true to indicate upgrade was successful
    return true;
}

