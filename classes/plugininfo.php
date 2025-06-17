<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

namespace tiny_pumukitmedia;

use context;
use editor_tiny\editor;
use editor_tiny\plugin;
use editor_tiny\plugin_with_configuration;

class plugininfo extends plugin implements plugin_with_configuration {

    /**
     * Get a list of the buttons provided by this plugin.
     *
     * @return string[]
     */
    public static function get_available_buttons(): array {
        return [
            'tiny_pumukitmedia/pumukitmedia',
            'tiny_pumukitmedia/pumukitmedia',
        ];
    }

    /**
     * Get a list of the menu items provided by this plugin.
     *
     * @return string[]
     */
    public static function get_available_menuitems(): array {
        return [
            'tiny_pumukitmedia/pumukitmedia',
        ];
    }

    /**
     * Devuelve la configuración que usará el JS del plugin.
     */
    public static function get_plugin_configuration_for_context(context $context,
            array $options,
            array $fpoptions,
            ?editor $editor = null
        ): array {
        global $USER;

        $pumukiturl = get_config('tiny_pumukitmedia', 'pumukitmediaurl');
        $password = get_config('tiny_pumukitmedia', 'password');
        $date = date('d/m/Y');
        $domain = parse_url($pumukiturl, PHP_URL_HOST);
        $hash = md5($USER->username . $password . $date . $domain);
        $showpr = (bool)get_config('tiny_pumukitmedia', 'showpr');
        $showplaylist = (bool)get_config('tiny_pumukitmedia', 'showplaylist');
        $showsharedvideos = (bool)get_config('tiny_pumukitmedia', 'showsharedvideos');

        return [
            'pumukitmediaurl' => $pumukiturl,
            'dialogtitle' => get_config('tiny_pumukitmedia', 'dialogtitle'),
            'password' => $password,
            'hash' => $hash,
            'username' => $USER->username,
            'email' => $USER->email,
            'date' => $date,
            'showpr' => $showpr,
            'showplaylist' => $showplaylist,
            'showsharedvideos' => $showsharedvideos
        ];
    }
}
