// @module tiny_pumukitmedia/dialogue

import PumukitModal from './modal';
import {
    getDialogTitle,
    getPumukitUrl,
    getHash,
    getUsername,
    getEmail,
} from './options';

export const openPumukitDialogue = async (editor) => {
    const modaltitle = getDialogTitle(editor);
    const pumukitUrl = getPumukitUrl(editor);
    const hash = getHash(editor);
    const username = getUsername(editor);
    const email = getEmail(editor);
    const lang = document.documentElement.lang || 'en';

    const context = {
        modaltitle,
        pumukitUrl,
        hash,
        username,
        email,
        lang
    };

    try {
        const modal = await PumukitModal.create({
            templateContext: context,
            large: true,
        });

        modal.show();

        modal.getRoot().on('click', '.nav-tabs .nav-link', function(e) {
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
            root.querySelector(targetId).classList.add("show", "active");
        });


        // Escuchar mensajes desde los iframes
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

            const embedHtml = `
                <div class="embed-responsive embed-responsive-16by9">
                    <iframe 
                        class="embed-responsive-item" 
                        src="${embedUrl}" 
                        width="100%" 
                        height="400" 
                        frameborder="0" 
                        allowfullscreen 
                        allow="microphone; camera; display-capture">
                    </iframe>
                </div>
            `;

            editor.insertContent(embedHtml);
            modal.hide();
            window.removeEventListener('message', receiveMessage);
        };

        window.addEventListener('message', receiveMessage);

        modal.getRoot().on('hidden.bs.modal', () => {
            window.removeEventListener('message', receiveMessage);
        });

    } catch (error) {
        console.error('Error creando la modal de PuMuKIT:', error);
    }
};
