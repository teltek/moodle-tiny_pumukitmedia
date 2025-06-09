<?php

/**
 * Plugin version file
 *
 * @package    tiny_pumukitmedia
 * @copyright  Teltek Video Research
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

$plugin->version = 2024052200;
$plugin->requires = 2023042400;
$plugin->maturity = MATURITY_STABLE;
$plugin->component = 'tiny_pumukitmedia';
$plugin->dependencies = [
    'filter_pumukitmedia' => 2022021801
];
$plugin->release = '1.0.0';
$plugin->stylesheets = ['styles'];
