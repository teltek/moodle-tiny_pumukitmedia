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

        editor.ui.registry.addButton(pluginButtonName, {
            icon: 'embed',
            tooltip: Options.getDialogTitle(editor) || 'Insert PuMuKIT Media',
            classes: 'pumukitmedia-button',
            onAction: () => {
                openPumukitDialogue(editor);
            }
        });

        editor.ui.registry.addMenuItem(pluginButtonName, {
            text: 'Pumukit Media',
            icon: 'embed',
            classes: 'pumukitmedia-button',
            onAction: () => {
                openPumukitDialogue(editor);
            }
        });

        return pluginMetadata;
    });

    resolve([`${component}/plugin`, Configuration]);
});
