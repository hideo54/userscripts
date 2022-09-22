// ==UserScript==
// @name         Jimin Modernizer
// @namespace    https://github.com/hideo54
// @version      0.1.0
// @description  自由民主党の議員のページの「生年月日」の年表記を元号から西暦に自動変換します。
// @author       hideo54
// @match        https://www.jimin.jp/member/*.html
// @grant        none
// @updateUrl    https://raw.githubusercontent.com/hideo54/userscripts/master/jimin-modernizer.user.js
// @downloadUrl  https://raw.githubusercontent.com/hideo54/userscripts/master/jimin-modernizer.user.js
// ==/UserScript==

(() => {
    const rows = document.querySelectorAll('div#member-main table tbody tr');
    const birthdayRows = Array.from(rows).filter(row =>
        row.querySelector('th').textContent === '生年月日'
    );
    if (birthdayRows.length === 1) {
        const birthdayTd = birthdayRows[0].querySelector('td');
        const [, gengo, gengoYear, rest] = birthdayTd.textContent.match(/^(\S{2})(\d+)年([\d月日]+)$/);
        let year = Number(gengoYear);
        if (gengo === '昭和') {
            year += 1925;
        }
        if (gengo === '平成') {
            // 実際のところ、平成生まれは土田慎さんしかいない
            // 元年問題は今のところ考えなくてよい
            year += 1988;
        }
        birthdayTd.innerHTML = `${year}年${rest}`;
    }
})();
