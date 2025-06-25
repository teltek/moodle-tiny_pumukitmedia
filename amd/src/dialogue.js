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

    const context = {
        modaltitle,
        pumukitUrl,
        hash,
        username,
        email,
        lang,
        showpr,
        showplaylist,
        showsharedvideos
    };

    const iframeId = 'pumukitmedia_iframe_sso';
    const existingIframe = document.getElementById(iframeId);

    const createModalAndShow = async () => {
        try {
            const modal = await PumukitModal.create({
                templateContext: context,
                large: true,
            });

            modal.show();
            setupModalEvents(modal, editor, pumukitUrl);

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

function setupModalEvents(modal, editor, pumukitUrl) {
    modal.getRoot().on('click', '.nav-tabs .nav-link', function (e) {
        e.preventDefault();

        const root = modal.getRoot()[0];
        const clickedLink = e.target;
        const targetId = clickedLink.getAttribute('href');

        root.querySelectorAll(".nav-tabs .nav-link").forEach(link => {
            link.classList.remove("active");
        });

        root.querySelectorAll(".tab-pane").forEach(pane => {
            pane.classList.remove("show", "active");
        });

        clickedLink.classList.add("active");
        const targetPane = root.querySelector(targetId);
        if (targetPane) {
            targetPane.classList.add("show", "active");
        }
    });

    const receiveMessage = (event) => {
        const data = event.data;
        if (!data || (!data.mmId && !data.url && !data.playlist)) return;

        let embedUrl = '';
        if (data.url) {
            embedUrl = data.url;
        } else if (data.playlist) {
            embedUrl = `${pumukitUrl}/openedx/openedx/playlist/embed/${data.playlist}`;
        } else if (data.mmId) {
            embedUrl = `${pumukitUrl}/openedx/openedx/embed/${data.mmId}`;
        }

        const embedHtml = `<a href="${embedUrl}" target="_blank" class="pumukit-media-link">${embedUrl}</a>`;

        editor.insertContent(embedHtml);
        modal.hide();
        window.removeEventListener('message', receiveMessage);
    };

    window.addEventListener('message', receiveMessage);

    modal.getRoot().on('hidden.bs.modal', () => {
        window.removeEventListener('message', receiveMessage);
    });
}
