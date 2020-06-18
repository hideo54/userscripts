// ==UserScript==
// @name         List list for Twitter
// @version      0.1
// @description  Show the names of the lists which a Twitter user is a member of.
// @author       You
// @include      /^https:\/\/twitter\.com\/[a-zA-Z1-9_]+(/status/[0-9]*)?
// @grant        none
// @updateUrl    https://raw.githubusercontent.com/hideo54/userscripts/master/list-list-for-twitter.user.js
// @downloadUrl  https://raw.githubusercontent.com/hideo54/userscripts/master/list-list-for-twitter.user.js
// ==/UserScript==

const auth = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
const color = '#e7305b';

const parentSelectorForProfile = 'div.css-1dbjc4n.r-hxarbt.r-1g94qm0';
const parentSelectorForTweet = 'div.css-1dbjc4n.r-1iusvr4.r-16y2uox.r-1777fci > div > div > div > div.css-1dbjc4n.r-1wbh5a2.r-dnmrzs';

const paths = document.location.pathname.split('/');
const screen_name = paths[1];
const parentSelector = paths.length === 2 ? parentSelectorForProfile : parentSelectorForTweet;

const showLists = async () => {
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
    parent.appendChild(line);
};

const checkExist = setInterval(function() {
    if (document.querySelector(parentSelector)) {
       showLists();
       clearInterval(checkExist);
    }
}, 100);