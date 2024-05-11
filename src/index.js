const { login } = require('./login');
const fs = require('fs');
const { deliverToXHS } = require('./xiaohongshu');
const {
  maxTimeout,
} = require('./variable');

// 读取文件名字参数
const arggs = process.argv.slice(2);
const topicName = arggs[0] || '怎么快速入睡';
const bid = '6cbrf1k7c4g0';
let contentURL = `https://www.coze.com/store/bot/7344666525904764933?bid=${bid}&from=bots_card&panel=1`;
(async () => {
  const page = await login();
  // await page.goto(contentURL, {
  //   timeout: maxTimeout,
  //   waitUntil: 'load',
  // });
  // const answer = await sendMsg(page, topicName);
  deliverToXHS(page);
})();

async function sendMsg(page, msg) {
  const input = await page.locator('.rc-textarea')
  await input.click();
  await input.fill(msg);
  await input.press('Enter');
  const loading = await page.getByText('Stop Responding');
  await loading.waitFor({ state: 'attached' });
  await loading.waitFor({ state: 'detached', timeout: maxTimeout });
  const msgs = await page.locator('.chat-uikit-message-box-container__message').all();
  const answer = await msgs[0].locator('.chat-uikit-message-box-inner').innerText();
  return answer;
}

async function addNewChat(page) {
  const clearButton = await page.locator('[data-test-id="chat-input-clear-context-button"]');
  await clearButton.click();
}

// 打开小红书
