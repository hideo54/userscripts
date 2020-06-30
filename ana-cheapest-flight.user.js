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
const ds = document.querySelectorAll('img.icon + div');
const times = new Set();
for (const d of ds) {
    const td = d.parentElement;
    td.style.backgroundColor = 'rgba(0, 255, 0, 0.5)';
    const headCell = td.parentElement.children[0];
    const time = headCell.querySelector('p.availabilityResultFlightTime').textContent;
    times.add(time);
}

const pLowest = document.createElement('div');
pLowest.innerHTML = `この日の最安価格: ${price} (${[...times].join(', ')})`;
pLowest.style = 'color: green; font-size: 1.5em; margin: 10px;';
a.parentElement.insertBefore(pLowest, a.nextSibling);