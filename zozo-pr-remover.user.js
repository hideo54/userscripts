// ==UserScript==
// @name         ZOZO PR Remover
// @namespace    https://github.com/hideo54
// @version      0.1.0
// @description  ZOZOTOWN の検索結果から PR 商品の存在感を薄めます
// @author       hideo54
// @match        https://zozo.jp/*
// @grant        none
// @updateUrl    https://raw.githubusercontent.com/hideo54/userscripts/master/zozo-pr-remover.user.js
// @downloadUrl  https://raw.githubusercontent.com/hideo54/userscripts/master/zozo-pr-remover.user.js
// ==/UserScript==

(() => {
    const items = document.querySelectorAll('.o-grid-catalog__item');
    for (const item of items) {
        if (item.querySelector('.c-label-item-status__promotion-text')) {
            item.style = 'opacity: 0.2;'
        }
    }
})();
