"use strict";

var _gologin = _interopRequireDefault(require("gologin"));
var _puppeteerCore = _interopRequireDefault(require("puppeteer-core"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Usage example: in the terminal enter
// node example-amazon-cloud-browser.js yU0token yU0Pr0f1leiD

// your token api (located in the settings, api)
// https://github.com/gologinapp/gologin#usage

const [_execPath, _filePath, GOLOGIN_API_TOKEN, GOLOGIN_PROFILE_ID] = process.argv;
(async () => {
  const GL = new _gologin.default({
    token: GOLOGIN_API_TOKEN,
    profile_id: GOLOGIN_PROFILE_ID
  });
  const browser = await _puppeteerCore.default.connect({
    browserWSEndpoint: `https://cloudbrowser.gologin.com/connect?token=${GOLOGIN_API_TOKEN}&profile=${GOLOGIN_PROFILE_ID}`,
    ignoreHTTPSErrors: true
  });
  const page = await browser.newPage();
  await page.goto('https://www.amazon.com/-/dp/B0771V1JZX');
  const content = await page.content();
  const matchData = content.match(/'initial': (.*)}/);
  if (matchData === null || matchData.length === 0) {
    console.log('no images found');
  } else {
    const data = JSON.parse(matchData[1]);
    const images = data.map(e => e.hiRes);
    console.log('images=', images);
  }
  await GL.stopRemote();
})();