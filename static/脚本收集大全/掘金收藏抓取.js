// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://juejin.cn/user/1697301682192878/likes
// @icon         https://www.google.com/s2/favicons?domain=juejin.cn
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const query = (start) => {
        return fetch("https://api.juejin.cn/interact_api/v1/digg/query_page", {
            "headers": {
                "accept": "*/*",
                "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
                "content-type": "application/json",
                "sec-ch-ua": "\"Chromium\";v=\"92\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"92\"",
                "sec-ch-ua-mobile": "?0",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-site"
            },
            "referrer": "https://juejin.cn/",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": JSON.stringify({ cursor: start + '', user_id: "1697301682192878", item_type: 2, sort_type: 2 }),
            "method": "POST",
            "mode": "cors",
            "credentials": "include"
        });
    }

    const airticleItem = (airticle) => {
        return `<li>
            <a href="https://juejin.cn/post/${airticle.article_id}" target="_blank">${airticle.article_info.title}</a>
        </li>`
    }

    const sleep = (timer) => {
        return new Promise(reslove => {
            setTimeout(() => {
                reslove()
            }, timer)
        })
    }

    let max = 0
    let count = 0;
    let total = 1;
    let result = '';
    const main = async () => {
        while (total > count && max++ < 150) {
            const res = await query(count).then(res => res.json());
            res.data = res.data || []
            count += res.data.length;
            total = +res.count;
            result = result + (res.data.map(airticle => airticleItem(airticle)).join(''));
            await sleep(500)
        }
        document.querySelector('.entry-list').innerHTML = result
    }

    main()
})();
