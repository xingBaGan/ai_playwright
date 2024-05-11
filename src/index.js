const { login } = require('./login');
const fs = require('fs');
const { deliverToXHS } = require('./xiaohongshu');
const {
  maxTimeout,
} = require('./variable');
const {
  sendMsg,
  addNewChat,
} = require('./ai_utils');

const { getImage } = require('./ai_image');

// 读取文件名字参数
const arggs = process.argv.slice(2);
const topicName = arggs[0] || '怎么快速入睡';
const imagePrompt = '画一个穿巫女服的猫娘';
const bid = '6cbrf1k7c4g0';
let contentURL = `https://www.coze.com/store/bot/7344666525904764933?bid=${bid}&from=bots_card&panel=1`;
(async () => {
  const page = await login();
  await page.goto(contentURL, {
    timeout: maxTimeout,
    waitUntil: 'load',
  });
  // const answer = await sendMsg(page, topicName);
  // await deliverToXHS(page);
  await getImage(page, imagePrompt);
})();

