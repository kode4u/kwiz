<?php
define('CLI_SCRIPT', true);

require(__DIR__ . '/../../../config.php');
require_once($CFG->libdir . '/adminlib.php');

echo "=== Kwiz: One-Time Migration from mod_gamifiedquiz to mod_kwiz ===\n";

global $DB;

$dbman = $DB->get_manager();

if (!$dbman->table_exists('gamifiedquiz')) {
    echo "No legacy 'gamifiedquiz' table found. Nothing to migrate.\n";
    exit(0);
}

// 1. Check module records in mdl_modules
$oldmod = $DB->get_record('modules', array('name' => 'gamifiedquiz'));
$newmod = $DB->get_record('modules', array('name' => 'kwiz'));

if (!$newmod) {
    echo "ERROR: mod_kwiz is not registered in mdl_modules. Please run php admin/cli/upgrade.php first.\n";
    exit(1);
}

echo "Old module ID (gamifiedquiz): " . ($oldmod ? $oldmod->id : 'none') . "\n";
echo "New module ID (kwiz): " . $newmod->id . "\n";

// 2. Migrate mdl_gamifiedquiz -> mdl_kwiz
$kwiz_count = $DB->count_records('kwiz');
$old_count = $DB->count_records('gamifiedquiz');
echo "Legacy quiz count: {$old_count}, Current kwiz count: {$kwiz_count}\n";

if ($old_count > 0 && $kwiz_count == 0) {
    echo "Migrating quiz instances...\n";
    $DB->execute("INSERT INTO {kwiz} (id, course, name, intro, introformat, topic, difficulty, language, llm_backend, llm_model, template, color_palette, use_predefined, predefined_data, questions_data, categories_data, learning_outcomes, time_limit_per_question, leaderboard_top_n, question_category, background_image, sumgrades, timecreated, timemodified) SELECT id, course, name, intro, introformat, topic, difficulty, language, llm_backend, llm_model, template, color_palette, use_predefined, predefined_data, questions_data, categories_data, learning_outcomes, time_limit_per_question, leaderboard_top_n, question_category, background_image, sumgrades, timecreated, timemodified FROM {gamifiedquiz}");
    echo "  Migrated " . $DB->count_records('kwiz') . " quiz instances.\n";
}

// 3. Update course_modules
if ($oldmod) {
    $cms_to_update = $DB->count_records('course_modules', array('module' => $oldmod->id));
    echo "Updating course_modules (pointing from module {$oldmod->id} to {$newmod->id}): {$cms_to_update} instances...\n";
    if ($cms_to_update > 0) {
        $DB->execute("UPDATE {course_modules} SET module = ? WHERE module = ?", array($newmod->id, $oldmod->id));
        echo "  Updated course_modules successfully.\n";
    }
}

// 4. Migrate questions
if ($dbman->table_exists('gamifiedquiz_questions') && $DB->count_records('kwiz_questions') == 0) {
    echo "Migrating questions...\n";
    $DB->execute("INSERT INTO {kwiz_questions} (id, kwizid, session_id, question_text, choices, correct_index, difficulty, category_name, topic, bloom_level, timecreated) SELECT id, gamifiedquizid, session_id, question_text, choices, correct_index, difficulty, category_name, topic, bloom_level, timecreated FROM {gamifiedquiz_questions}");
    echo "  Migrated " . $DB->count_records('kwiz_questions') . " questions.\n";
}

// 5. Migrate slots
if ($dbman->table_exists('gamifiedquiz_slots') && $DB->count_records('kwiz_slots') == 0) {
    echo "Migrating slots...\n";
    $DB->execute("INSERT INTO {kwiz_slots} (id, kwizid, slot, page, maxmark, displaynumber) SELECT id, gamifiedquizid, slot, page, maxmark, displaynumber FROM {gamifiedquiz_slots}");
    echo "  Migrated " . $DB->count_records('kwiz_slots') . " slots.\n";
}

// 6. Migrate generation logs
if ($dbman->table_exists('gamifiedquiz_generation_logs') && $DB->count_records('kwiz_generation_logs') == 0) {
    echo "Migrating generation logs...\n";
    $DB->execute("INSERT INTO {kwiz_generation_logs} (id, kwizid, userid, cmid, session_id, request_uuid, batch_id, category_name, topic, difficulty, language, backend, llm_model, api_url, requested_count, generated_count, saved_count, started_at, ended_at, duration_ms, questions_per_sec, status, error_message, timecreated, timemodified) SELECT id, gamifiedquizid, userid, cmid, session_id, request_uuid, batch_id, category_name, topic, difficulty, language, backend, llm_model, api_url, requested_count, generated_count, saved_count, started_at, ended_at, duration_ms, questions_per_sec, status, error_message, timecreated, timemodified FROM {gamifiedquiz_generation_logs}");
    echo "  Migrated " . $DB->count_records('kwiz_generation_logs') . " generation logs.\n";
}

// 7. Migrate sessions
if ($dbman->table_exists('gamifiedquiz_sessions') && $DB->count_records('kwiz_sessions') == 0) {
    echo "Migrating sessions...\n";
    $DB->execute("INSERT INTO {kwiz_sessions} (id, kwizid, session_id, teacherid, started, participant_count, questions_data, results_data, timecreated, timeended) SELECT id, gamifiedquizid, session_id, teacherid, started, participant_count, questions_data, results_data, timecreated, timeended FROM {gamifiedquiz_sessions}");
    echo "  Migrated " . $DB->count_records('kwiz_sessions') . " sessions.\n";
}

// 8. Migrate responses
if ($dbman->table_exists('gamifiedquiz_responses') && $DB->count_records('kwiz_responses') == 0) {
    echo "Migrating responses...\n";
    $DB->execute("INSERT INTO {kwiz_responses} (id, session_id, questionid, userid, username, answer_index, is_correct, score, time_spent, timecreated) SELECT id, session_id, questionid, userid, username, answer_index, is_correct, score, time_spent, timecreated FROM {gamifiedquiz_responses}");
    echo "  Migrated " . $DB->count_records('kwiz_responses') . " responses.\n";
}

// 9. Migrate grades
if ($dbman->table_exists('gamifiedquiz_grades') && $DB->count_records('kwiz_grades') == 0) {
    echo "Migrating grades...\n";
    $DB->execute("INSERT INTO {kwiz_grades} (id, kwizid, userid, grade, timemodified) SELECT id, gamifiedquizid, userid, grade, timemodified FROM {gamifiedquiz_grades}");
    echo "  Migrated " . $DB->count_records('kwiz_grades') . " grades.\n";
}

// 10. Migrate participants
if ($dbman->table_exists('gamifiedquiz_participants') && $DB->count_records('kwiz_participants') == 0) {
    echo "Migrating participants...\n";
    $DB->execute("INSERT INTO {kwiz_participants} (id, session_id, kwizid, userid, username, timejoined) SELECT id, session_id, gamifiedquizid, userid, username, timejoined FROM {gamifiedquiz_participants}");
    echo "  Migrated " . $DB->count_records('kwiz_participants') . " participants.\n";
}

// 11. Clean up old plugin registration and tables
echo "Cleaning up legacy plugin records...\n";
if ($oldmod) {
    $DB->delete_records('modules', array('id' => $oldmod->id));
}
$DB->delete_records('config_plugins', array('plugin' => 'mod_gamifiedquiz'));
$DB->delete_records_select('role_capabilities', "capability LIKE 'mod/gamifiedquiz:%'");
$DB->delete_records_select('capabilities', "name LIKE 'mod/gamifiedquiz:%'");

$tables_to_drop = array(
    'gamifiedquiz_participants',
    'gamifiedquiz_grades',
    'gamifiedquiz_responses',
    'gamifiedquiz_sessions',
    'gamifiedquiz_generation_logs',
    'gamifiedquiz_slots',
    'gamifiedquiz_questions',
    'gamifiedquiz'
);

foreach ($tables_to_drop as $t) {
    if ($dbman->table_exists($t)) {
        $table_obj = new xmldb_table($t);
        $dbman->drop_table($table_obj);
        echo "  Dropped table mdl_{$t}.\n";
    }
}

echo "Purging caches...\n";
purge_all_caches();

echo "=== Migration from gamifiedquiz to kwiz completed successfully! ===\n";
