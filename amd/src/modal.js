// amd/src/modal.js

/**
 * Abstract Recording Modal for TinyMCE's RecordRTC plugin.
 *
 * @module      tiny_pumukitmedia/modal
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

import Modal from 'core/modal';

export default class PumukitModal extends Modal {
    static TYPE = 'tiny_pumukitmedia/modal';
    static TEMPLATE = 'tiny_pumukitmedia/modal';

    registerEventListeners() {
        this.setRemoveOnClose(true);
        super.registerEventListeners();
        this.registerCloseOnCancel();
    }
}

PumukitModal.registerModalType();
