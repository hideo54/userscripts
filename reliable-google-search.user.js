// ==UserScript==
// @name         Reliable Google Search
// @namespace    https://github.com/hideo54
// @version      1.9.4
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
    'apple.com',
    'candidates2021.info',
    'day.js.org',
    'developer.mozilla.org',
    'developer.twitter.com',
    'docs.github.com',
    'docs.mongodb.com',
    'docs.python.org',
    'ffmpeg.org',
    'github.com',
    'google.com',
    'help.github.com',
    'hideo54.com',
    'ja.reactjs.org',
    'mathtrain.jp',
    'nextjs.org',
    'nginx.org',
    'nodejs.org',
    'note.nkmk.me',
    'pugjs.org',
    'pytorch.org',
    'reactjs.org',
    'webkit.org',
    'www.electronjs.org',
    'www.typescriptlang.org',
];

const reliableETLDs = [
    '.go.jp',
    '.lg.jp',
];

// Manually Updated
const deprecatedDomains = [
    'apiref.com',
    'apple.stackovernet.xyz',
    'base64.work',
    'bleepcoder.com',
    'cloud6.net',
    'hubwiz.com',
    'ja.compbs.com',
    'ja.it-reply.net',
    'ja.javascript.info',
    'ja.ojit.com',
    'ja.uwenku.com',
    'kyoto.travel',
    'living-sun.com',
    'mongoing.com',
    'python5.com',
    'qastack.jp',
    'stackovernet.xyz',
    'stackoverrun.com',
    'steakrecords.com',
    'www.366service.com',
    'www.fixes.pub',
    'www.gitmemory.com',
    'www.it-mure.jp.net',
    'www.it-swarm-ja.com',
    'www.it-swarm-ja.tech',
    'www.it-swarm.dev',
    'www.it-swarm.jp.net',
    'www.javaer101.com',
    'www.sejuku.net',
    'www.webdevqa.jp.net',
    'www.xspdf.com',
    'xperimentalhamid.com',
];

const deprecatedETLDs = [
    '.cn',
    '.ru',
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
    for (const reliableDomain of reliableDomains) {
        if (domain.endsWith(reliableDomain)) {
            h3.style.fontWeight = 600;
        }
    }
    for (const reliableETLD of reliableETLDs) {
        if (domain.endsWith(reliableETLD)) {
            h3.style.fontWeight = 600;
        }
    }
    for (const deprecatedDomain of deprecatedDomains) {
        if (domain.endsWith(deprecatedDomain)) {
            s.style.opacity = 0.1;
            a.style.opacity = 0.1;
        }
    }
    for (const deprecatedETLD of deprecatedETLDs) {
        if (domain.endsWith(deprecatedETLD)) {
            s.style.opacity = 0.1;
            a.style.opacity = 0.1;
        }
    }
}
