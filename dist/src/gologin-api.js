"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GologinApi = GologinApi;
exports.delay = void 0;
exports.exitAll = exitAll;
exports.getDefaultParams = getDefaultParams;
var _puppeteerCore = _interopRequireDefault(require("puppeteer-core"));
var _gologin = _interopRequireDefault(require("./gologin.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function getDefaultParams() {
  return {
    token: process.env.GOLOGIN_API_TOKEN,
    profile_id: process.env.GOLOGIN_PROFILE_ID,
    executablePath: process.env.GOLOGIN_EXECUTABLE_PATH,
    autoUpdateBrowser: true
  };
}
const createLegacyGologin = ({
  profileId,
  ...params
}) => {
  const defaults = getDefaultParams();
  const mergedParams = {
    ...defaults,
    ...params
  };
  mergedParams.profile_id = profileId ?? mergedParams.profile_id;
  console.log({
    mergedParams
  });
  return new _gologin.default(mergedParams);
};
const createdApis = [];
const delay = (ms = 250) => new Promise(res => setTimeout(res, ms));
exports.delay = delay;
function GologinApi({
  token
}) {
  if (!token) {
    throw new Error('GoLogin API token is missing');
  }
  const browsers = [];
  const legacyGls = [];
  const launchLocal = async params => {
    const legacyGologin = createLegacyGologin({
      ...params,
      token
    });
    if (!params.profileId) {
      const {
        id
      } = await legacyGologin.quickCreateProfile();
      await legacyGologin.setProfileId(id);
    }
    const started = await legacyGologin.start();
    const browser = await _puppeteerCore.default.connect({
      browserWSEndpoint: started.wsUrl,
      ignoreHTTPSErrors: true
    });
    browsers.push(browser);
    legacyGls.push(legacyGologin);
    return {
      browser
    };
  };
  const launchCloudProfile = async params => {
    const profileParam = params.profileId ? `&profile=${params.profileId}` : '';
    const geolocationParam = params.geolocation ? `&geolocation=${params.geolocation}` : '';
    const browserWSEndpoint = `https://cloud.gologin.com/connect?token=${token}${profileParam}${geolocationParam}`;
    const browser = await _puppeteerCore.default.connect({
      browserWSEndpoint,
      ignoreHTTPSErrors: true
    });
    browsers.push(browser);
    return {
      browser
    };
  };
  const api = {
    async launch(params = {}) {
      if (params.cloud) {
        return launchCloudProfile(params);
      }
      return launchLocal(params);
    },
    async exit(status = 0) {
      Promise.allSettled(browsers.map(browser => browser.close()));
      Promise.allSettled(legacyGls.map(gl => gl.stopLocal({
        posting: false
      })));
      process.exit(status);
    },
    delay
  };
  createdApis.push(api);
  return api;
}
function exitAll() {
  Promise.allSettled(createdApis.map(api => api.exit()));
}