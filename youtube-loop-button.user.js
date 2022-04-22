// ==UserScript==
// @name         YouTube Loop Button
// @namespace    https://github.com/hideo54
// @version      1.0.0
// @description  YouTube に無限再生ボタンを追加します
// @author       hideo54
// @match        https://www.youtube.com/watch?v=*
// @grant        none
// @updateUrl    https://raw.githubusercontent.com/hideo54/userscripts/master/youtube-loop-button.user.js
// @downloadUrl  https://raw.githubusercontent.com/hideo54/userscripts/master/youtube-loop-button.user.js
// ==/UserScript==

(() => {
    const controls = document.querySelector('div.ytp-right-controls');
    const loopButton = document.createElement('button');
    loopButton.className = 'ytp-button';
    loopButton.innerHTML = '<div>∞</div>';
    loopButton.style = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        font-size: 2.5em;
        height: 100%;
        text-align: center;
        vertical-align: top;
    `;
    loopButton.onclick = () => {
        const enabled = loopButton.getAttribute('aria-pressed') === 'true';
        loopButton.setAttribute('aria-pressed', (!enabled).toString());
    };
    controls.insertBefore(loopButton, controls.firstChild);
    const video = document.getElementsByTagName('video')[0];
    video.addEventListener('ended', () => {
        const enabled = loopButton.getAttribute('aria-pressed') === 'true';
        if (enabled) {
            video.currentTime = 0;
        }
    });
})();
