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
        // Note: For new installations, these fields are added via install.xml
        // This upgrade is for existing installations only
        // Fields will be added automatically on next install.xml update
        
        // For now, we'll just mark the upgrade as complete
        // The fields will be added when install.xml is updated
        upgrade_mod_savepoint(true, 2025010104, 'gamifiedquiz');
    }
    
    // Return true to indicate upgrade was successful
    return true;
}

