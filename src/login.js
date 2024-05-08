const { chromium } = require('@playwright/test');

async function login(){
  const pathToExtension = require('path').join(__dirname, '../3.89_0');
  const userDataDir = './tmp/test-user-data-dir';
  const browserContext = await chromium.launchPersistentContext(userDataDir, {
    headless: false,
    args: [
      `--disable-extensions-except=${pathToExtension}`,
      `--load-extension=${pathToExtension}`
    ]
  });
  const pages = await browserContext.pages();
  // console.log('pages', pages[0]);
  // const page = await browserContext.newPage();
  return pages[0];
}

module.exports = { login };