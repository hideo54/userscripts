// ==UserScript==
// @name         Reliable Google Search
// @namespace    https://github.com/hideo54
// @version      0.5.0
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
    'api.slack.com',
    'developer.apple.com',
    'developer.mozilla.org',
    'developer.twitter.com',
    'docs.github.com',
    'docs.python.org',
    'ffmpeg.org',
    'github.com',
    'help.github.com',
    'mathtrain.jp',
    'nextjs.org',
    'nginx.org',
    'nodejs.org',
    'note.nkmk.me',
    'pugjs.org',
    'webkit.org',
    'www.electronjs.org',
    'www.typescriptlang.org',
];

// Manually Updated
const deprecatedDomains = [
    'apple.stackovernet.xyz',
    'cloud6.net',
    'ja.compbs.com',
    'ja.it-reply.net',
    'ja.javascript.info',
    'ja.ojit.com',
    'living-sun.com',
    'python5.com',
    'qastack.jp',
    'qiita.com',
    'stackoverrun.com',
    'steakrecords.com',
    'www.366service.com',
    'www.it-swarm-ja.tech',
    'www.it-swarm.dev',
    'www.it-swarm.jp.net',
    'www.sejuku.net',
    'www.xspdf.com',
    'xperimentalhamid.com',
];

const rcs = Array.from(document.querySelectorAll('div.tF2Cxc'));
for (const rc of rcs) {
    const r = rc.children[0];
    const s = rc.children[1];
    const a = r.children[0];
    const h3 = a.children[1];
    const cite = a.children[2].children[0];
    const text = cite.textContent;
    const domain = text.split(' › ')[0];
    for (const deprecatedDomain of deprecatedDomains) {
        if (domain === 'https://' + deprecatedDomain) {
            s.style.color = '#F0F0F0';
            a.style.color = '#F0F0F0';
        }
    }
    for (const reliableDomain of reliableDomains) {
        if (domain === 'https://' + reliableDomain) {
            h3.style.fontWeight = 600;
        }
    }
}
