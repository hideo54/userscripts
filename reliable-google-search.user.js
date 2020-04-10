// ==UserScript==
// @name         Reliable Google Search
// @namespace    https://github.com/hideo54
// @version      0.1
// @description  Google 検索結果から、指定されたドメインのページの表示を強調したり目立たなくしたりします。
// @author       hideo54
// @match        https://www.google.com/search?*
// @grant        none
// @updateUrl    https://raw.githubusercontent.com/hideo54/userscripts/master/reliable-google-search.user.js
// @downloadUrl  https://raw.githubusercontent.com/hideo54/userscripts/master/reliable-google-search.user.js
// ==/UserScript==

// Manually Updated
const reliableDomains = [
    'api.slack.com',
    'github.com',
    'help.github.com',
    'nodejs.org',
    'developer.mozilla.org',
    'note.nkmk.me',
    'docs.python.org',
    'developer.twitter.com',
    'www.typescriptlang.org',
];

// Manually Updated
const deprecatedDomains = [
    'qiita.com',
    'www.sejuku.net',
];

const rcs = Array.from(document.querySelectorAll('div.rc'));
for (const rc of rcs) {
    const r = rc.children[0];
    const s = rc.children[1];
    const a = r.children[0];
    const h3 = a.children[1];
    const cite = a.children[2].children[0];
    const text = cite.textContent;
    const domain = text.split(' › ')[0];
    for (const deprecatedDomain of deprecatedDomains) {
        if (domain === deprecatedDomain) {
            s.style.color = '#A9A9A9';
            a.style.color = '#A9A9A9';
        }
    }
    for (const reliableDomain of reliableDomains) {
        if (domain === reliableDomain) {
            h3.style.fontWeight = 600;
        }
    }
}