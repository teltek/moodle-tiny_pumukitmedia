// @module tiny_pumukitmedia/dialogue

import {
    getPumukitUrl,
    getHash,
    getUsername,
    getEmail,
} from './options';

export const openPumukitDialogue = (editor) => {
    const pumukitUrl = getPumukitUrl(editor);
    const hash = getHash(editor);
    const username = getUsername(editor);
    const email = getEmail(editor);
    const lang = document.documentElement.lang || 'en';

    const html = `
        <ul class="nav nav-tabs" role="tablist" style="margin-bottom:10px;">
            <li class="active"><a href="#manager" data-toggle="tab">Mis vídeos</a></li>
            <li><a href="#recorder" data-toggle="tab">Grabador</a></li>
            <li><a href="#playlist" data-toggle="tab">Playlist</a></li>
            <li><a href="#shared" data-toggle="tab">Compartidos</a></li>
        </ul>
        <div class="tab-content">
            <div class="tab-pane active" id="manager">
                <iframe src="${pumukitUrl}/openedx/sso/manager?hash=${hash}&username=${username}&email=${email}&lang=${lang}"
                        width="100%" height="500" frameborder="0" allowfullscreen allow="microphone; camera; display-capture"></iframe>
            </div>
            <div class="tab-pane" id="recorder">
                <iframe src="${pumukitUrl}/openedx/sso/personal_recorder?hash=${hash}&username=${username}&email=${email}&lang=${lang}"
                        width="100%" height="500" frameborder="0" allowfullscreen allow="microphone; camera; display-capture"></iframe>
            </div>
            <div class="tab-pane" id="playlist">
                <iframe src="${pumukitUrl}/openedx/sso/manager?hash=${hash}&username=${username}&email=${email}&lang=${lang}&playlist=true"
                        width="100%" height="500" frameborder="0" allowfullscreen allow="microphone; camera; display-capture"></iframe>
            </div>
            <div class="tab-pane" id="shared">
                <iframe src="${pumukitUrl}/openedx/search/public/multimediaobjects"
                        width="100%" height="500" frameborder="0" allowfullscreen allow="microphone; camera; display-capture"></iframe>
            </div>
        </div>
    `;

    const dialogApi = editor.windowManager.open({
        title: 'Insertar vídeo PuMuKIT',
        body: {
            type: 'panel',
            items: [{ type: 'htmlpanel', html }]
        },
        buttons: [
            { type: 'cancel', text: 'Cerrar' }
        ],
        width: 900,
        height: 600,
        onClose: () => {
            window.removeEventListener('message', receiveMessage);
        }
    });

    function receiveMessage(event) {
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
        dialogApi.close();
        window.removeEventListener('message', receiveMessage);
    }

    window.addEventListener('message', receiveMessage);
}
