"use strict";

var _puppeteerCore = _interopRequireDefault(require("puppeteer-core"));
var _gologin = _interopRequireDefault(require("../src/gologin.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const {
  connect
} = _puppeteerCore.default;
const delay = ms => new Promise(res => setTimeout(res, ms));
(async () => {
  const GL = new _gologin.default({
    profile_id: 'yU0token',
    token: 'yU0Pr0f1leiD',
    executablePath: '/usr/bin/orbita-browser/chrome'
  });
  const {
    status,
    wsUrl
  } = await GL.start();
  const browser = await connect({
    browserWSEndpoint: wsUrl,
    ignoreHTTPSErrors: true
  });
  const page = await browser.newPage();
  await page.goto('https://www.walmart.com/account/profile');
  if (await page.evaluate(e => document.querySelector('#email'))) {
    // need login
    await page.type('#email', 'myemail');
    await page.type('#password', 'mypassword');
    await page.click('[type=submit]');
  }
  await page.goto('https://www.walmart.com/account/wmpurchasehistory');
  await page.screenshot({
    path: 'screenshot.jpg'
  });
  await browser.close();
  await GL.stop();
})();