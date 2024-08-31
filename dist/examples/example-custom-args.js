"use strict";

var _puppeteerCore = _interopRequireDefault(require("puppeteer-core"));
var _gologin = _interopRequireDefault(require("../src/gologin.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
(async () => {
  const GL = new _gologin.default({
    profile_id: 'yU0Pr0f1leiD',
    token: 'yU0token',
    args: ['--disable-background-timer-throttling', '--disable-backgrounding-occluded-windows', '--disable-renderer-backgrounding']
  });
  const {
    status,
    wsUrl
  } = await GL.start().catch(e => {
    console.trace(e);
    return {
      status: 'failure'
    };
  });
  if (status !== 'success') {
    console.log('Invalid status');
    return;
  }
  const browser = await _puppeteerCore.default.connect({
    browserWSEndpoint: wsUrl.toString(),
    ignoreHTTPSErrors: true
  });
  const page = await browser.newPage();
  await page.goto('https://myip.link/mini');
  console.log(await page.content());
  await browser.close();
  await GL.stop();
})();