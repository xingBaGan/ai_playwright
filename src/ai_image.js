const {
  maxTimeout,
} = require('./variable');
const { sendMsg, getMsg } = require('./ai_utils');

const imageUrl = 'https://www.coze.com/store/bot/7336545150421729286?bid=6cfpa9ljc0006&from=bots_card&panel=1';

async function getImage(page, promptText){
  await page.goto(imageUrl, {
    timeout: maxTimeout,
    waitUntil: 'load',
  });
  return await getMsg(page, promptText, true);
}



async function getImageByPrompt(page, promptText){
  await page.goto(imageUrl, {
    timeout: maxTimeout,
    waitUntil: 'load',
  });
  return await sendMsg(page, promptText, true);
}


module.exports = { getImage,  getImageByPrompt};

