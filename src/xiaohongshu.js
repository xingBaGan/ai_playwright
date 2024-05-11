const {
  platformUrl,
  phoneNumber,
  maxTimeout,
} = require('./variable');

async function deliverToXHS(page) {
  const context = await page.context();
  const _page = await context.newPage();
  await _page.goto(platformUrl, {
    timeout: maxTimeout,
    waitUntil: 'load',
  });

  const subscribeBtn = await _page.getByText('发布笔记', { exact: true });
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const visiable = await subscribeBtn.isEnabled();
  if (!visiable) {
    await loginToXHSIfNot(_page, phoneNumber);
  } else {
    await subscribeBtn.click();
    uploadContent(_page,'测试内容' )
  }
  return _page;
}

async function uploadContent(page, content) {
  const tab = await page.locator('div').filter({ hasText: /^上传图文$/ });
  await tab.click();
  const fileInput = await page.locator('.upload-input');
  await fileInput.setInputFiles([]);
  await page.pause();
}

async function loginToXHSIfNot(page, phone) {
  const phoneInput = await page.getByPlaceholder('手机号');
  await phoneInput.fill(phone);
  const sendMSG = await page.getByText('发送验证码');
  // await sendMSG.click();
  const msgInput = page.getByPlaceholder('验证码');
  await msgInput.fill('123456');
  await page.pause();
}

module.exports = { deliverToXHS }