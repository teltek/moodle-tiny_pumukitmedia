/**
 * Options helper for the Moodle Tiny Pumukitmedia plugin.
 *
 * @module      tiny_pumukitmedia/options
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

import {pluginName} from './common';
import {getPluginOptionName} from 'editor_tiny/options';

const urlOption = getPluginOptionName(pluginName, 'pumukitmediaurl');
const titleOption = getPluginOptionName(pluginName, 'dialogtitle');
const usernameOption = getPluginOptionName(pluginName, 'username');
const emailOption = getPluginOptionName(pluginName, 'email');
const hashOption = getPluginOptionName(pluginName, 'hash');
const showPrOption = getPluginOptionName(pluginName, 'showpr');
const showPlaylistOption = getPluginOptionName(pluginName, 'showplaylist');
const showSharedOption = getPluginOptionName(pluginName, 'showsharedvideos');

export const register = (editor) => {
    editor.options.register(urlOption, {
        processor: 'string',
        default: '',
    });
    editor.options.register(titleOption, {
        processor: 'string',
        default: '',
    });
    editor.options.register(usernameOption, {
        processor: 'string',
        default: '',
    });
    editor.options.register(emailOption, {
        processor: 'string',
        default: '',
    });
    editor.options.register(hashOption, {
        processor: 'string',
        default: '',
    });
    editor.options.register(showPrOption, {
        processor: 'boolean',
        default: true,
    });
    editor.options.register(showPlaylistOption, {
        processor: 'boolean',
        default: false,
    });
    editor.options.register(showSharedOption, {
        processor: 'boolean',
        default: true,
    });
};

// Funciones de ayuda
export const getPumukitUrl = (editor) => {
    const value = editor.options.get(urlOption);
    return typeof value === 'string' ? value.trim() : '';
};
export const getDialogTitle = (editor) => editor.options.get(titleOption);
export const getUsername = (editor) => editor.options.get(usernameOption);
export const getEmail = (editor) => editor.options.get(emailOption);
export const getHash = (editor) => editor.options.get(hashOption);
export const getShowPr = (editor) => editor.options.get(showPrOption);
export const getShowPlaylist = (editor) => editor.options.get(showPlaylistOption);
export const getShowSharedVideos = (editor) => editor.options.get(showSharedOption);
