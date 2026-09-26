<?php
define('CLI_SCRIPT', true);

require(__DIR__ . '/../../../config.php');
require_once($CFG->dirroot . '/mod/gamifiedquiz/lib.php');

echo "=== Kwiz: Migrating Generated Questions to Question Bank & Standard Quizzes ===\n";

global $DB;

$total_before = $DB->count_records('gamifiedquiz_questions');
echo "Found {$total_before} questions in gamifiedquiz_questions table.\n";

$result = gamifiedquiz_migrate_legacy_questions();

echo "Migration complete!\n";
echo "  - Processed: {$result['total']}\n";
echo "  - Successfully synced to Question Bank: {$result['migrated']}\n";
echo "  - Standard Quizzes created/updated: " . count($result['quizzes']) . "\n";
foreach ($result['quizzes'] as $qid => $name) {
    echo "      * Quiz ID {$qid}: {$name}\n";
}

$q_count = $DB->count_records('question');
$qbe_count = $DB->count_records('question_bank_entries');
$cat_count = $DB->count_records('question_categories');
$slots_count = $DB->count_records('quiz_slots');
$quiz_count = $DB->count_records('quiz');

echo "\nCurrent Moodle Core State:\n";
echo "  - Question Categories: {$cat_count}\n";
echo "  - Question Bank Questions ({question}): {$q_count}\n";
echo "  - Question Bank Entries ({question_bank_entries}): {$qbe_count}\n";
echo "  - Standard Quizzes ({quiz}): {$quiz_count}\n";
echo "  - Standard Quiz Slots ({quiz_slots}): {$slots_count}\n";
echo "=================================================================================\n";
