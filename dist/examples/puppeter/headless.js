"use strict";

var _gologin = require("gologin");
// SDK will prepare the browser and will start it on your machine then you can control it with puppeteer

const token = process.env.GL_API_TOKEN || 'your dev token here';
const gologin = (0, _gologin.GologinApi)({
  token
});
async function main() {
  const {
    browser
  } = await gologin.launch({
    extra_params: ['--headless']
    // pass profileId parameter if you want to run particular profile
    // profileId: 'your profileId here',
  });
  const page = await browser.newPage();
  await page.goto('https://iphey.com/', {
    waitUntil: 'networkidle2'
  });
  const status = await page.$eval('.trustworthy:not(.hide)', elt => elt?.innerText?.trim());
  await new Promise(resolve => setTimeout(resolve, 10000));
  console.log('status', status);
  return status;
}
main().catch(console.error).finally(gologin.exit);