// ==UserScript==
// @name         Reliable Google Search
// @namespace    https://github.com/hideo54
// @version      1.10.6
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
    'numpy.org',
    'pugjs.org',
    'pytorch.org',
    'reactjs.org',
    'senkyo.watch',
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
    'appleloveone.blog.fc2.com',
    'base64.work',
    'bleepcoder.com',
    'cloud6.net',
    'hubwiz.com',
    'ja.androideity.com',
    'ja.compbs.com',
    'ja.it-reply.net',
    'ja.javascript.info',
    'ja.ojit.com',
    'ja.uwenku.com',
    'kyoto.travel',
    'living-sun.com',
    'mongodb-documentation.readthedocs.io',
    'mongoing.com',
    'news.minory.org',
    'python5.com',
    'qastack.jp',
    'runebook.dev',
    'stackovernet.xyz',
    'stackoverrun.com',
    'steakrecords.com',
    'www.366service.com',
    'www.codetd.com',
    'www.fixes.pub',
    'www.gitmemory.com',
    'www.it-mure.jp.net',
    'www.it-swarm-ja.com',
    'www.it-swarm-ja.tech',
    'www.it-swarm.dev',
    'www.it-swarm.jp.net',
    'www.javaer101.com',
    'www.sejuku.net',
    'www.w3big.com',
    'www.webdevqa.jp.net',
    'www.web-dev-qa-db-ja.com',
    'www.xspdf.com',
    'xperimentalhamid.com',
];

const deprecatedETLDs = [
    '.cn',
    '.ru',
];

const results = Array.from(document.querySelectorAll('div.jtfYYd'));
for (const result of results) {
    const titleDiv = result.children[0];
    const descriptionDiv = result.children[1];
    const a = titleDiv.children[0].children[0];
    const h3 = a.children[1];
    const cite = a.children[2].children[0];
    const text = cite.textContent;
    const origin = text.split(' ')[0];
    for (const reliableDomain of reliableDomains) {
        if (origin.endsWith(reliableDomain)) {
            h3.style.fontWeight = 600;
        }
    }
    for (const reliableETLD of reliableETLDs) {
        if (origin.endsWith(reliableETLD)) {
            h3.style.fontWeight = 600;
        }
    }
    for (const deprecatedDomain of deprecatedDomains) {
        if (origin.endsWith(deprecatedDomain)) {
            descriptionDiv.style.opacity = 0.1;
            a.style.opacity = 0.1;
        }
    }
    for (const deprecatedETLD of deprecatedETLDs) {
        if (origin.endsWith(deprecatedETLD)) {
            descriptionDiv.style.opacity = 0.1;
            a.style.opacity = 0.1;
        }
    }
}
