// ==UserScript==
// @name         AtCoder performance colorizer
// @version      1.0
// @author       hideo54
// @match        https://atcoder.jp/users/*/history
// @grant        none
// @updateUrl    https://raw.githubusercontent.com/hideo54/userscripts/master/atcoder-performance-colorizer.user.js
// @downloadUrl  https://raw.githubusercontent.com/hideo54/userscripts/master/atcoder-performance-colorizer.user.js
// ==/UserScript==

const performances = document.querySelectorAll('#history > tbody > tr > td:nth-child(4)');
for (const performance of performances) {
    const n = Number(performance.innerText);
    if (n) {
        if (n >= 2800) {
            performance.classList.add('user-red');
        } else if (n >= 2400) {
            performance.classList.add('user-yellow');
        } else if (n >= 2000) {
            performance.classList.add('user-green');
        } else if (n >= 1600) {
            performance.classList.add('user-blue');
        } else if (n >= 1200) {
            performance.classList.add('user-cyan');
        } else if (n >= 800) {
            performance.classList.add('user-green');
        } else if (n >- 400) {
            performance.classList.add('user-brown');
        } else {
            performance.classList.add('user-gray');
        }
    }
}