"use strict";

var _puppeteerCore = _interopRequireDefault(require("puppeteer-core"));
var _gologin = _interopRequireDefault(require("../src/gologin.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const {
  connect
} = _puppeteerCore.default;
(async () => {
  const GL = new _gologin.default({
    token: 'yU0token',
    profile_id: 'yU0Pr0f1leiD',
    executablePath: '/usr/bin/orbita-browser/chrome',
    tmpdir: '/my/tmp/dir'
  });
  const wsUrl = await GL.startLocal();
  const browser = await connect({
    browserWSEndpoint: wsUrl.toString(),
    ignoreHTTPSErrors: true
  });
  const page = await browser.newPage();
  await page.goto('https://myip.link');
  console.log(await page.content());
  await browser.close();
  await GL.stopLocal({
    posting: false
  });
})();