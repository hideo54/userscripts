// ==UserScript==
// @name         English Search Button
// @namespace    https://github.com/hideo54
// @version      0.1.1
// @description  日本語版 Google の検索結果画面に英語で検索ボタンを追加します
// @author       hideo54
// @match        https://www.google.com/search?*
// @grant        none
// @updateUrl    https://raw.githubusercontent.com/hideo54/userscripts/master/english-search-button.user.js
// @downloadUrl  https://raw.githubusercontent.com/hideo54/userscripts/master/english-search-button.user.js
// ==/UserScript==

const div = document.querySelector('#hdtb-msb > div:nth-child(2)');
const searchEn = document.createElement('a');
if (location.href.includes('&lr=lang_en')) {
    console.log('hi');
    searchEn.href = location.href.replace('&lr=lang_en', '&lr=lang_ja');
    searchEn.innerText = '日本語のページを検索';
} else if (location.href.includes('&lr=lang_ja')) {
    console.log('hu');
    searchEn.href = location.href.replace('&lr=lang_ja', '&lr=lang_en');
    searchEn.innerText = '英語のページを検索';
} else {
    console.log('he');
    searchEn.href = location.href + '&lr=lang_en';
    searchEn.innerText = '英語のページを検索';
}
searchEn.className = 'GshZze';
const style = document.createElement('style');
style.innerText = `
    a.GshZze {
        color: #5f6368;
    }
    a.GshZze:visited {
        color: #5f6368;
    }
`;
div.appendChild(searchEn);
div.appendChild(style);
