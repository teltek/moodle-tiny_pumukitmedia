<?php
/**
 * Settings for the Tiny PuMuKIT plugin.
 *
 * @package    tiny_pumukitmedia
 * @copyright  Teltek
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

if ($ADMIN->fulltree) {
    $settings->add(new admin_setting_configtext(
        'tiny_pumukitmedia/pumukitmediaurl',
        get_string('pumukitmediaurl', 'tiny_pumukitmedia'),
        get_string('pumukitmediaurldesc', 'tiny_pumukitmedia'),
        'https://naked-pr-up2u.teltek.es',
        PARAM_URL
    ));

    $settings->add(new admin_setting_configtext(
        'tiny_pumukitmedia/dialogtitle',
        get_string('dialogtitle', 'tiny_pumukitmedia'),
        get_string('dialogtitledesc', 'tiny_pumukitmedia'),
        get_string('dialogtitledefval', 'tiny_pumukitmedia'),
        PARAM_TEXT
    ));

    $settings->add(new admin_setting_configtext(
        'tiny_pumukitmedia/password',
        get_string('password', 'tiny_pumukitmedia'),
        get_string('passworddesc', 'tiny_pumukitmedia'),
        get_string('passworddefval', 'tiny_pumukitmedia'),
        PARAM_TEXT
    ));

    $settings->add(new admin_setting_configcheckbox(
        'tiny_pumukitmedia/showpr',
        get_string('showprtext', 'tiny_pumukitmedia'),
        get_string('showprdesc', 'tiny_pumukitmedia'),
        1
    ));

    $settings->add(new admin_setting_configcheckbox(
        'tiny_pumukitmedia/showplaylist',
        get_string('showplaylisttext', 'tiny_pumukitmedia'),
        get_string('showplaylistdesc', 'tiny_pumukitmedia'),
        0
    ));

    $settings->add(new admin_setting_configcheckbox(
        'tiny_pumukitmedia/showsharedvideos',
        get_string('showsharedvideostext', 'tiny_pumukitmedia'),
        get_string('showsharedvideosdesc', 'tiny_pumukitmedia'),
        1
    ));

    $settings->add(new admin_setting_configcheckbox(
        'tiny_pumukitmedia/enabledebugmode',
        get_string('enabledebugmode', 'tiny_pumukitmedia'),
        get_string('enabledebugmode', 'tiny_pumukitmedia'),
        0
    ));
}
