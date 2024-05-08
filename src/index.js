const { login } = require('./login');
const fs = require('fs');
// 读取文件名字参数
const arggs = process.argv.slice(2);
const topicName = arggs[0] || '读书的十个好习惯';

let courseUrl = `https://www.coze.com/store/bot/7344666525904764933?bid=6cbrf1k7c4g0i&from=bots_card&panel=1`;
(async () => {
  const page = await login();
  await page.goto(courseUrl, {
    timeout: 600000,
    waitUntil: 'load',
  });
  sendMsg(page, topicName);
})();

async function sendMsg(page, msg) {
  await page.pause();
  // const input = await page.
}