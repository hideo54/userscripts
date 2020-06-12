// ==UserScript==
// @name         ANA Cheapest Flight
// @version      1.0
// @description  ANA の区間検索画面で最安フライトの価格を表示
// @author       hideo54
// @include      /^https:\/\/aswbe-d\.ana\.co\.jp\/9Eile48\/dms\/[a-z0-9]+\/dyc\/be\/pages\/res\/search\/vacantResult\.xhtml[\S]*/
// @grant        none
// @updateUrl    https://raw.githubusercontent.com/hideo54/userscripts/master/ana-cheapest-flight.user.js
// @downloadUrl  https://raw.githubusercontent.com/hideo54/userscripts/master/ana-cheapest-flight.user.js
// ==/UserScript==

const a = document.querySelector('div.itinerarySeatClassAndFlight');
const price = document.querySelector('img.icon + div em').textContent;
const td = document.querySelector('img.icon + div').parentNode;
td.style.backgroundColor = 'rgba(0, 255, 0, 0.5)';
const headCell = td.parentNode.children[0];
const time = headCell.children[1].textContent;

const pLowest = document.createElement('div');
pLowest.innerHTML = `この日の最安価格: ${price} (${time})`;
pLowest.style = 'color: green; font-size: 1.5em; margin: 10px;';
a.parentElement.insertBefore(pLowest, a.nextSibling);