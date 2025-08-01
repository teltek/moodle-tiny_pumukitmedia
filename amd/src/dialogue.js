// @module tiny_pumukitmedia/dialogue

import PumukitModal from './modal';
import {
    getDialogTitle,
    getPumukitUrl,
    getHash,
    getUsername,
    getEmail,
    getShowPr,
    getShowPlaylist,
    getShowSharedVideos
} from './options';

let modal = null;
let receiveMessageAdded = false;

const receiveMessage = (event) => {
    const data = event.data;
    if (!data || (!data.mmId && !data.url && !data.playlist)) return;

    const pumukitUrl = getPumukitUrl(modal.editor);
    let embedUrl = '';

    if (data.url) {
        embedUrl = data.url;
    } else if (data.playlist) {
        embedUrl = `${pumukitUrl}/openedx/openedx/playlist/embed/${data.playlist}`;
    } else if (data.mmId) {
        embedUrl = `${pumukitUrl}/openedx/openedx/embed/${data.mmId}`;
    }

    const embedHtml = `<a href="${embedUrl}" target="_blank" class="pumukit-media-link">${embedUrl}</a>`;

    if (modal && modal.editor) {
        modal.editor.insertContent(embedHtml);
        modal.hide();
        modal = null;
    }

    window.removeEventListener('message', receiveMessage);
    receiveMessageAdded = false;
};

export const openPumukitDialogue = async (editor) => {
    const modaltitle = getDialogTitle(editor);
    const pumukitUrl = getPumukitUrl(editor);
    const hash = getHash(editor);
    const username = getUsername(editor);
    const email = getEmail(editor);
    const lang = document.documentElement.lang || 'en';
    const showpr = getShowPr(editor);
    const showplaylist = getShowPlaylist(editor);
    const showsharedvideos = getShowSharedVideos(editor);
    const show_extra_buttons = showpr || showplaylist || showsharedvideos;

    const context = {
        modaltitle,
        pumukitUrl,
        hash,
        username,
        email,
        lang,
        showpr,
        showplaylist,
        showsharedvideos,
        show_extra_buttons
    };

    const iframeId = 'pumukitmedia_iframe_sso';
    const existingIframe = document.getElementById(iframeId);

    const createModalAndShow = async () => {
        try {
            modal = await PumukitModal.create({
                templateContext: context,
                large: true,
            });

            modal.editor = editor; // Se guarda para uso en receiveMessage
            modal.show();
            setupModalEvents(modal);

        } catch (error) {
            console.error('Error creando la modal de PuMuKIT:', error);
        }
    };

    if (!existingIframe) {
        const iframe = document.createElement('iframe');
        iframe.id = iframeId;
        iframe.style.display = 'none';
        iframe.src = `${pumukitUrl}/openedx/sso/manager?hash=${hash}&username=${username}&email=${email}&lang=${lang}`;
        iframe.allow = "microphone; camera; display-capture; clipboard-write";

        iframe.onload = createModalAndShow;

        document.body.appendChild(iframe);
    } else {
        createModalAndShow();
    }
};

function setupModalEvents(modalInstance) {
    const root = modalInstance.getRoot()[0];

    const launcher = root.querySelector('.pumukit-launcher');
    const tabsContainer = root.querySelector('.pumukit-tabs');
    const backBtn = root.querySelector('#backToLauncher');

    if (!launcher || !tabsContainer) {
        console.warn('No se encontró el contenedor de pestañas o el launcher');
        return;
    }

    root.querySelectorAll('.pumukit-launcher .col').forEach(button => {
        button.addEventListener('click', () => {
            const tab = button.getAttribute('data-tab');

            launcher.style.display = 'none';
            tabsContainer.style.display = 'block';

            // Oculta todas las pestañas
            tabsContainer.querySelectorAll('.tab-pane').forEach(pane => {
                pane.style.display = 'none';
            });

            // Muestra solo la seleccionada
            const target = tabsContainer.querySelector(`#${tab}`);
            if (target) {
                target.style.display = 'block';
            }
        });
    });

    if (backBtn) {
        backBtn.addEventListener('click', () => {
            tabsContainer.style.display = 'none';
            launcher.style.display = 'block';
        });
    }

    // Escucha los mensajes postMessage (para incrustar el media)
    if (!receiveMessageAdded) {
        window.addEventListener('message', receiveMessage);
        receiveMessageAdded = true;
    }

    // Limpieza al cerrar la modal
    modalInstance.getRoot().on('hidden.bs.modal', () => {
        if (receiveMessageAdded) {
            window.removeEventListener('message', receiveMessage);
            receiveMessageAdded = false;
        }
        modal = null;
    });
}
