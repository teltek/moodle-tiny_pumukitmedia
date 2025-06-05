import {getTinyMCE} from 'editor_tiny/loader';
import {getPluginMetadata} from 'editor_tiny/utils';
import {openPumukitDialogue} from 'tiny_pumukitmedia/dialogue';
import * as Configuration from 'tiny_pumukitmedia/configuration';
import * as Options from './options';
import {
    component,
    pluginName,
    pluginButtonName
} from './common';

/**
 * Tiny PumukitMedia plugin for Moodle.
 *
 * @module      tiny_pumukitmedia/plugin
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
export default new Promise(async (resolve) => {
    const [tinymce, pluginMetadata] = await Promise.all([
        getTinyMCE(),
        getPluginMetadata(component, pluginName)
    ]);

    tinymce.PluginManager.add(`${component}/plugin`, (editor) => {
        Options.register(editor);

        const pumukitIcon = `
            <svg width="24" height="24" viewBox="0 0 24 24">
                <path d="M4 3h16c.6 0 1 .4 1 1v16c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1V4c0-.6.4-1 1-1Zm1 2v14h14V5H5Zm4.8 2.6 5.6 4a.5.5 0 0 1 0 .8l-5.6 4A.5.5 0 0 1 9 16V8a.5.5 0 0 1 .8-.4Z" fill="red"></path>
            </svg>
        `;

        editor.ui.registry.addIcon('pumukit', pumukitIcon);

        editor.ui.registry.addButton(pluginButtonName, {
            icon: 'pumukit',
            tooltip: Options.getDialogTitle(editor) || 'Insert PuMuKIT Media',
            onAction: () => {
                openPumukitDialogue(editor);
            }
        });

        editor.ui.registry.addMenuItem(pluginButtonName, {
            text: 'Pumukit Media',
            icon: 'pumukit',
            classes: 'pumukitmedia-button',
            onAction: () => {
                openPumukitDialogue(editor);
            }
        });

        return pluginMetadata;
    });

    resolve([`${component}/plugin`, Configuration]);
});
