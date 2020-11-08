// ==UserScript==
// @name         List list for Twitter
// @version      0.9
// @description  Show the lists where a given Twitter user belongs.
// @author       hideo54
// @include      /^https:\/\/twitter\.com\/[a-zA-Z1-9_]+(/status/[0-9]*)?
// @grant        none
// @updateUrl    https://raw.githubusercontent.com/hideo54/userscripts/master/list-list-for-twitter.user.js
// @downloadUrl  https://raw.githubusercontent.com/hideo54/userscripts/master/list-list-for-twitter.user.js
// ==/UserScript==

const auth = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
const color = '#e7305b';

let currentPathname = '';
let isInjectionDone = false;

const showLists = async (screen_name, parentSelector) => {
    if (isInjectionDone) return;
    console.log(`Start to fetch the lists where @${screen_name} belongs to...`);
    const csrfToken = document.cookie.match(/ct0=([0-9a-f]*)/)[1];
    const { lists } = await fetch(`https://api.twitter.com/1.1/lists/memberships.json?screen_name=${screen_name}&count=1000&filter_to_owned_lists=true`, {
      'headers': {
        'accept': '*/*',
        'accept-language': 'ja,en-US;q=0.9,en;q=0.8',
        'authorization': `Bearer ${auth}`,
        'cache-control': 'no-cache',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'x-csrf-token': csrfToken,
        'x-twitter-active-user': 'yes',
        'x-twitter-auth-type': 'OAuth2Session',
        'x-twitter-client-language': 'ja',
      },
      'body': null,
      'method': 'GET',
      'mode': 'cors',
      'credentials': 'include',
    }).then(r => r.json());
    const line = document.createElement('ul');
    line.style = 'padding: 0';
    line.innerHTML = lists.map(list => {
        const li = document.createElement('li');
        li.style = `
            display: inline;
            margin-right: .5em;
            padding: .5em;
            border-radius: .5em;
            list-style: none;
            color: white;
            background-color: ${color};`;
        li.innerHTML = list.name;
        return li.outerHTML;
    }).join('');

    const parent = document.querySelector(parentSelector);
    try {
        if (isInjectionDone) return;
        parent.appendChild(line);
        isInjectionDone = true;
        observer.diconnect();
    } catch (e) {}
};

const observer = new MutationObserver(mutations => {
    if (currentPathname === document.location.pathname) return;
    currentPathname = document.location.pathname;
    isInjectionDone = false;
    const paths = document.location.pathname.split('/');
    const screen_name = paths[1];

    const parentSelectorForProfile = 'div.css-1dbjc4n.r-ku1wi2.r-1j3t67a.r-m611by';
    const parentSelectorForTweet = 'div.css-1dbjc4n.r-1iusvr4.r-16y2uox.r-1777fci';
    const parentSelector = paths.length === 2 ? parentSelectorForProfile : parentSelectorForTweet;

    const reservedScreenName = [
        'home', 'search', 'settings',
    ];
    if (reservedScreenName.includes(screen_name)) return;
    showLists(screen_name, parentSelector);
});

observer.observe(document.getElementById('react-root'), { childList: true, subtree: true });