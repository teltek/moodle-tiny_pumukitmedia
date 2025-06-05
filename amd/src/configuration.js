// @module tiny_pumukitmedia/configuration

import {addMenubarItem} from 'editor_tiny/utils';
import {pluginButtonName} from './common';

const configureMenu = (menu) => {
    const items = menu.insert.items.split(' ');
    const inserted = items.some((item, index) => {
        // Append after the media or video button.
        if (item.match(/(media|video)\b/)) {
            items.splice(index + 1, 0, pluginButtonName);
            return true;
        }

        return false;
    });

    if (inserted) {
        menu.insert.items = items.join(' ');
    } else {
        addMenubarItem(menu, 'insert', pluginButtonName);
    }

    return menu;
};

const configureToolbar = (toolbar) => {
    return toolbar.map((section) => {
        if (section.name === 'content') {
            const inserted = section.items.some((item, index) => {
                if (item.match(/(media|video)\b/)) {
                    section.items.splice(index + 1, 0, pluginButtonName);
                    return true;
                }
                return false;
            });

            if (!inserted) {
                section.items.unshift(pluginButtonName);
            }
        }
        return section;
    });
};

export const configure = (instanceConfig) => {
    return {
        toolbar: configureToolbar(instanceConfig.toolbar),
        menu: configureMenu(instanceConfig.menu),
    };
};
