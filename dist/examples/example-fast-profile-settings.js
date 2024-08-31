"use strict";

var _puppeteerCore = _interopRequireDefault(require("puppeteer-core"));
var _browserApi = require("../src/browser/browser-api.js");
var _gologin = _interopRequireDefault(require("../src/gologin.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const token = 'yU0token';
const profile_id = 'yU0Pr0f1leiD';
(async () => {
  const GL = new _gologin.default({
    token,
    profile_id
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

  /**
   * @see updateProfileProxy
   */
  const proxyData = {
    mode: 'none'
  };
  await GL.changeProfileProxy(proxyData);
  await GL.changeProfileResolution('1920x1080');
  const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.5359.71 Safari/537.36';
  await GL.changeProfileUserAgent(userAgent);
  await browser.close();
  await GL.stop();
})();
(async () => {
  /**
   * @see updateProfileProxy
   */
  const proxyData = {
    mode: 'none'
  };
  await (0, _browserApi.updateProfileProxy)(profile_id, token, proxyData);
  await (0, _browserApi.updateProfileResolution)(profile_id, token, '1920x1080');
  const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.5359.71 Safari/537.36';
  await (0, _browserApi.updateProfileUserAgent)(profile_id, token, userAgent);
})();