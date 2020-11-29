// ==UserScript==
// @name         Reliable Google Search
// @namespace    https://github.com/hideo54
// @version      0.2.7
// @description  Google 検索結果から、指定されたドメインのページの表示を強調したり目立たなくしたりします。
// @author       hideo54
// @match        https://www.google.com/search?*
// @grant        none
// @updateUrl    https://raw.githubusercontent.com/hideo54/userscripts/master/reliable-google-search.user.js
// @downloadUrl  https://raw.githubusercontent.com/hideo54/userscripts/master/reliable-google-search.user.js
// ==/UserScript==

const a = document.querySelector('div.g.mnr-c.g-blk div.g a');
if (a) {
    a.href = a.href.replace(/#:~:text=\S*$/, '');
}

// Manually Updated
const reliableDomains = [
    'developer.apple.com',
    'github.com',
    'docs.github.com',
    'help.github.com',
    'api.slack.com',
    'developer.twitter.com',
    'note.nkmk.me',
    'www.electronjs.org',
    'ffmpeg.org',
    'developer.mozilla.org',
    'nextjs.org',
    'nginx.org',
    'nodejs.org',
    'pugjs.org',
    'docs.python.org',
    'www.typescriptlang.org',
    'webkit.org',
];

// Manually Updated
const deprecatedDomains = [
    'www.366service.com',
    'ja.compbs.com',
    'ja.ojit.com',
    'living-sun.com',
    'python5.com',
    'qiita.com',
    'stackoverrun.com',
    'steakrecords.com',
    'xperimentalhamid.com',
    'www.it-swarm.dev',
    'www.it-swarm-ja.tech',
    'qastack.jp',
    'ja.it-reply.net',
    'www.sejuku.net',
    'apple.stackovernet.xyz',
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
            s.style.color = '#F0F0F0';
            a.style.color = '#F0F0F0';
        }
    }
    for (const reliableDomain of reliableDomains) {
        if (domain === reliableDomain) {
            h3.style.fontWeight = 600;
        }
    }
}