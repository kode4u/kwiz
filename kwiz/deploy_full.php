<?php
define("CLI_SCRIPT", true);
require("/var/www/html/config.php");
require_once($CFG->libdir . "/filelib.php");
require_once($CFG->dirroot . "/h5p/classes/api.php");

$filepath = "/tmp/rise-smooth-course.h5p";
if (!file_exists($filepath)) {
    die("Package file /tmp/rise-smooth-course.h5p not found\n");
}

$admin = core_user::get_user_by_username("admin");
\core\session\manager::set_user($admin);
$fs = get_file_storage();
$systemcontext = context_system::instance();

echo "1. Reading and updating library records from package...\n";
$zip = new ZipArchive();
if ($zip->open($filepath) !== TRUE) {
    die("Failed to open zip package\n");
}

for ($i = 0; $i < $zip->numFiles; $i++) {
    $filename = $zip->getNameIndex($i);
    if (substr($filename, -12) === "library.json") {
        $json = json_decode($zip->getFromIndex($i), true);
        if ($json) {
            $machinename = $json["machineName"];
            $major = (int)$json["majorVersion"];
            $minor = (int)$json["minorVersion"];
            $patch = (int)$json["patchVersion"];
            
            $existing = $DB->get_record("h5p_libraries", [
                "machinename" => $machinename,
                "majorversion" => $major,
                "minorversion" => $minor
            ]);
            
            $preloadedjs = "";
            if (!empty($json["preloadedJs"])) {
                $jsfiles = array_map(function($j) { return $j["path"]; }, $json["preloadedJs"]);
                $preloadedjs = implode(",", $jsfiles);
            }
            $preloadedcss = "";
            if (!empty($json["preloadedCss"])) {
                $cssfiles = array_map(function($c) { return $c["path"]; }, $json["preloadedCss"]);
                $preloadedcss = implode(",", $cssfiles);
            }
            
            $semantics_file = dirname($filename) . "/semantics.json";
            $semantics_str = $zip->getFromName($semantics_file);
            if ($semantics_str === FALSE) $semantics_str = "";
            
            if ($existing) {
                $existing->patchversion = $patch;
                $existing->title = $json["title"];
                $existing->preloadedjs = $preloadedjs;
                $existing->preloadedcss = $preloadedcss;
                if (!empty($semantics_str)) {
                    $existing->semantics = $semantics_str;
                }
                $existing->enabled = 1;
                $DB->update_record("h5p_libraries", $existing);
                echo "  Updated library: {$machinename} {$major}.{$minor}.{$patch} (ID: {$existing->id})\n";
            } else {
                $newrec = (object)[
                    "machinename" => $machinename,
                    "title" => $json["title"],
                    "majorversion" => $major,
                    "minorversion" => $minor,
                    "patchversion" => $patch,
                    "runnable" => !empty($json["runnable"]) ? 1 : 0,
                    "fullscreen" => 0,
                    "embedtypes" => !empty($json["embedTypes"]) ? implode(",", $json["embedTypes"]) : "",
                    "preloadedjs" => $preloadedjs,
                    "preloadedcss" => $preloadedcss,
                    "semantics" => $semantics_str,
                    "coremajor" => 1,
                    "coreminor" => 26,
                    "enabled" => 1
                ];
                $newid = $DB->insert_record("h5p_libraries", $newrec);
                echo "  Created library: {$machinename} {$major}.{$minor}.{$patch} (ID: {$newid})\n";
            }
        }
    }
}

echo "2. Updating library dependencies...\n";
for ($i = 0; $i < $zip->numFiles; $i++) {
    $filename = $zip->getNameIndex($i);
    if (substr($filename, -12) === "library.json") {
        $json = json_decode($zip->getFromIndex($i), true);
        if ($json) {
            $machinename = $json["machineName"];
            $librec = $DB->get_record("h5p_libraries", [
                "machinename" => $machinename,
                "majorversion" => (int)$json["majorVersion"],
                "minorversion" => (int)$json["minorVersion"]
            ]);
            if (!$librec) continue;
            
            if (!empty($json["preloadedDependencies"])) {
                foreach ($json["preloadedDependencies"] as $dep) {
                    $reqlib = $DB->get_record("h5p_libraries", [
                        "machinename" => $dep["machineName"],
                        "majorversion" => (int)$dep["majorVersion"],
                        "minorversion" => (int)$dep["minorVersion"]
                    ]);
                    if ($reqlib) {
                        $exists = $DB->get_record("h5p_library_dependencies", [
                            "libraryid" => $librec->id,
                            "requiredlibraryid" => $reqlib->id,
                            "dependencytype" => "preloaded"
                        ]);
                        if (!$exists) {
                            $DB->insert_record("h5p_library_dependencies", [
                                "libraryid" => $librec->id,
                                "requiredlibraryid" => $reqlib->id,
                                "dependencytype" => "preloaded"
                            ]);
                        }
                    }
                }
            }
            
            if (!empty($json["editorDependencies"])) {
                foreach ($json["editorDependencies"] as $dep) {
                    $reqlib = $DB->get_record("h5p_libraries", [
                        "machinename" => $dep["machineName"],
                        "majorversion" => (int)$dep["majorVersion"],
                        "minorversion" => (int)$dep["minorVersion"]
                    ]);
                    if ($reqlib) {
                        $exists = $DB->get_record("h5p_library_dependencies", [
                            "libraryid" => $librec->id,
                            "requiredlibraryid" => $reqlib->id,
                            "dependencytype" => "editor"
                        ]);
                        if (!$exists) {
                            $DB->insert_record("h5p_library_dependencies", [
                                "libraryid" => $librec->id,
                                "requiredlibraryid" => $reqlib->id,
                                "dependencytype" => "editor"
                            ]);
                            echo "  Added editor dep: {$machinename} -> {$dep['machineName']}\n";
                        }
                    }
                }
            }
        }
    }
}

echo "3. Syncing all files to core_h5p file storage...\n";
for ($i = 0; $i < $zip->numFiles; $i++) {
    $filename = $zip->getNameIndex($i);
    $parts = explode("/", $filename, 2);
    if (count($parts) === 2 && !empty($parts[0])) {
        $folder = $parts[0];
        $subpath = $parts[1];
        
        $libmatches = [];
        if (preg_match("/^([a-zA-Z0-9\.\_\-]+)-(\d+)\.(\d+)$/", $folder, $libmatches)) {
            $machinename = $libmatches[1];
            $major = (int)$libmatches[2];
            $minor = (int)$libmatches[3];
            
            $librecord = $DB->get_record("h5p_libraries", [
                "machinename" => $machinename,
                "majorversion" => $major,
                "minorversion" => $minor
            ]);
            
            if ($librecord && substr($filename, -1) !== "/") {
                $content = $zip->getFromIndex($i);
                $filedir = "/" . dirname($filename) . "/";
                if ($filedir === "/./") $filedir = "/" . $folder . "/";
                else if (strpos($filedir, "/" . $folder) !== 0) $filedir = "/" . $folder . "/" . dirname($subpath) . "/";
                $filedir = str_replace("//", "/", $filedir);
                $basename = basename($filename);
                
                $existing = $fs->get_file($systemcontext->id, "core_h5p", "libraries", $librecord->id, $filedir, $basename);
                if ($existing) {
                    $existing->delete();
                }
                
                $filerecord = [
                    "contextid" => $systemcontext->id,
                    "component" => "core_h5p",
                    "filearea" => "libraries",
                    "itemid" => $librecord->id,
                    "filepath" => $filedir,
                    "filename" => $basename
                ];
                $fs->create_file_from_string($filerecord, $content);
            }
        }
    }
}
$zip->close();

echo "4. Deploying package to contentbank and course activities...\n";
$coursecontext = context_course::instance(2);
$filerecord = [
    "contextid" => $coursecontext->id,
    "component" => "contentbank",
    "filearea" => "public",
    "itemid" => 0,
    "filepath" => "/",
    "filename" => "rise-smooth-course.h5p",
    "userid" => $admin->id
];
$existing = $fs->get_file($filerecord["contextid"], $filerecord["component"], $filerecord["filearea"], $filerecord["itemid"], $filerecord["filepath"], $filerecord["filename"]);
if ($existing) {
    $existing->delete();
}
$storedfile = $fs->create_file_from_pathname($filerecord, $filepath);

$cb = new \core_contentbank\contentbank();
$contents = $cb->search_contents("rise-smooth-course.h5p", $coursecontext->id);
$contenttype = new \contenttype_h5p\contenttype($coursecontext);
if (empty($contents)) {
    $content = $contenttype->upload_content($storedfile);
} else {
    $content = reset($contents);
    $content->update_content($storedfile);
}

foreach ([17, 18, 19, 20] as $cmid) {
    try {
        $contextmodule = context_module::instance($cmid);
        $modfilerecord = [
            "contextid" => $contextmodule->id,
            "component" => "mod_h5pactivity",
            "filearea" => "package",
            "itemid" => 0,
            "filepath" => "/",
            "filename" => "rise-smooth-course.h5p",
            "userid" => $admin->id
        ];
        $existingmod = $fs->get_file($modfilerecord["contextid"], $modfilerecord["component"], $modfilerecord["filearea"], $modfilerecord["itemid"], $modfilerecord["filepath"], $modfilerecord["filename"]);
        if ($existingmod) {
            $existingmod->delete();
        }
        $fs->create_file_from_pathname($modfilerecord, $filepath);
    } catch (Exception $e) {}
}

purge_all_caches();
echo "ALL_DEPLOY_OK\n";
