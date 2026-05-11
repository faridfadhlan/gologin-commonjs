"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GologinApi = void 0;
exports.exitAll = exitAll;
exports.getDefaultParams = void 0;
var _puppeteerCore = _interopRequireDefault(require("puppeteer-core"));
var _gologin = _interopRequireDefault(require("./gologin.js"));
var _common = require("./utils/common.js");
var _http = require("./utils/http.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const trafficLimitMessage = 'You dont have free traffic to use the proxy. Please go to app https://app.gologin.com/ and buy some traffic if you want to use the proxy';
const getDefaultParams = () => ({
  token: process.env.GOLOGIN_API_TOKEN,
  profile_id: process.env.GOLOGIN_PROFILE_ID,
  executablePath: process.env.GOLOGIN_EXECUTABLE_PATH
});
exports.getDefaultParams = getDefaultParams;
const createGologinProfileManager = ({
  profileId,
  ...params
}) => {
  const defaults = getDefaultParams();
  const mergedParams = {
    ...defaults,
    ...params
  };
  mergedParams.profile_id = profileId ?? mergedParams.profile_id;
  return new _gologin.default(mergedParams);
};
const createdApis = [];
const GologinApi = ({
  token
}) => {
  if (!token) {
    throw new Error('GoLogin API token is missing');
  }
  const browsers = [];
  const legacyGls = [];
  const launchLocal = async params => {
    const legacyGologin = createGologinProfileManager({
      ...params,
      token
    });
    if (!params.profileId) {
      const {
        id
      } = await legacyGologin.quickCreateProfile();
      await legacyGologin.setProfileId(id);
    }
    const startedProfile = await legacyGologin.start();
    const browser = await _puppeteerCore.default.connect({
      browserWSEndpoint: startedProfile.wsUrl,
      ignoreHTTPSErrors: true,
      defaultViewport: null
    });
    browsers.push(browser);
    legacyGls.push(legacyGologin);
    return {
      browser
    };
  };
  const launchCloudProfile = async params => {
    const legacyGologin = createGologinProfileManager({
      ...params,
      token
    });
    if (!params.profileId) {
      const {
        id
      } = await legacyGologin.quickCreateProfile();
      await legacyGologin.setProfileId(id);
      params.profileId = id;
    }
    legacyGls.push(legacyGologin);
    const browserWSEndpoint = `https://cloudbrowser.gologin.com/connect?token=${token}&profile=${params.profileId}`;
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
    async createProfileWithCustomParams(options) {
      const response = await (0, _http.makeRequest)(`${_common.API_URL}/browser/custom`, {
        method: 'POST',
        json: options
      }, {
        token,
        fallbackUrl: `${_common.FALLBACK_API_URL}/browser/custom`
      });
      return response.id;
    },
    async refreshProfilesFingerprint(profileIds) {
      if (!profileIds) {
        throw new Error('Profile ID is required');
      }
      const response = await (0, _http.makeRequest)(`${_common.API_URL}/browser/fingerprints`, {
        method: 'PATCH',
        json: {
          browsersIds: profileIds
        }
      }, {
        token,
        fallbackUrl: `${_common.FALLBACK_API_URL}/browser/fingerprints`
      });
      return response;
    },
    async createProfileRandomFingerprint(name = '') {
      const osInfo = await (0, _common.getOsAdvanced)();
      const {
        os,
        osSpec
      } = osInfo;
      const resultName = name || 'api-generated';
      const response = await (0, _http.makeRequest)(`${_common.API_URL}/browser/quick`, {
        method: 'POST',
        json: {
          os,
          osSpec,
          name: resultName
        }
      }, {
        token,
        fallbackUrl: `${_common.FALLBACK_API_URL}/browser/quick`
      });
      return response;
    },
    async updateUserAgentToLatestBrowser(profileIds, workspaceId = '') {
      let url = `${_common.API_URL}/browser/update_ua_to_new_browser_v`;
      if (workspaceId) {
        url += `?currentWorkspace=${workspaceId}`;
      }
      const response = await (0, _http.makeRequest)(url, {
        method: 'PATCH',
        json: {
          browserIds: profileIds,
          updateUaToNewBrowserV: true,
          updateAllProfiles: false,
          testOrbita: false
        }
      }, {
        token,
        fallbackUrl: `${_common.FALLBACK_API_URL}/browser/update_ua_to_new_browser_v`
      });
      return response;
    },
    async changeProfileProxy(profileId, proxyData) {
      const response = await (0, _http.makeRequest)(`${_common.API_URL}/browser/${profileId}/proxy`, {
        method: 'PATCH',
        json: proxyData
      }, {
        token,
        fallbackUrl: `${_common.FALLBACK_API_URL}/browser/${profileId}/proxy`
      });
      return response;
    },
    getAvailableType(availableTrafficData) {
      switch (true) {
        case availableTrafficData.mobileTrafficData.trafficUsedBytes > availableTrafficData.mobileTrafficData.trafficLimitBytes:
          return 'mobile';
        case availableTrafficData.residentialTrafficData.trafficUsedBytes < availableTrafficData.residentialTrafficData.trafficLimitBytes:
          return 'resident';
        case availableTrafficData.dataCenterTrafficData.trafficUsedBytes < availableTrafficData.dataCenterTrafficData.trafficLimitBytes:
          return 'dataCenter';
        default:
          return 'none';
      }
    },
    async addGologinProxyToProfile(profileId, countryCode, proxyType = '') {
      if (!proxyType) {
        const availableTraffic = await (0, _http.makeRequest)(`${_common.API_URL}/users-proxies/geolocation/traffic`, {
          method: 'GET'
        }, {
          token,
          fallbackUrl: `${_common.FALLBACK_API_URL}/users-proxies/geolocation/traffic`
        });
        const availableTrafficData = JSON.parse(availableTraffic);
        const availableType = this.getAvailableType(availableTrafficData);
        if (availableType === 'none') {
          throw new Error(trafficLimitMessage);
        }
        proxyType = availableType;
      }
      let isDc = false;
      let isMobile = false;
      switch (proxyType) {
        case 'mobile':
          isMobile = true;
          isDc = false;
          break;
        case 'resident':
          isMobile = false;
          isDc = false;
          break;
        case 'dataCenter':
          isMobile = false;
          isDc = true;
          break;
        default:
          throw new Error('Invalid proxy type');
      }
      const proxyResponse = await (0, _http.makeRequest)(`${_common.API_URL}/users-proxies/mobile-proxy`, {
        method: 'POST',
        json: {
          countryCode,
          isDc,
          isMobile,
          profileIdToLink: profileId
        }
      }, {
        token,
        fallbackUrl: `${_common.FALLBACK_API_URL}/users-proxies/mobile-proxy`
      });
      const proxy = proxyResponse;
      if (proxy.trafficLimitBytes < proxy.trafficUsedBytes) {
        throw new Error(trafficLimitMessage);
      }
      return proxy;
    },
    async addCookiesToProfile(profileId, cookies) {
      const response = await (0, _http.makeRequest)(`${_common.API_URL}/browser/${profileId}/cookies?fromUser=true`, {
        method: 'POST',
        json: cookies
      }, {
        token,
        fallbackUrl: `${_common.FALLBACK_API_URL}/browser/${profileId}/cookies?fromUser=true`
      });
      return response.status;
    },
    async deleteProfile(profileId) {
      const response = await (0, _http.makeRequest)(`${_common.API_URL}/browser/${profileId}`, {
        method: 'DELETE'
      }, {
        token,
        fallbackUrl: `${_common.FALLBACK_API_URL}/browser/${profileId}`
      });
      return response.status;
    },
    async exit() {
      await Promise.allSettled(browsers.map(browser => browser.close()));
      await Promise.allSettled(legacyGls.map(gl => gl.stopLocal({
        posting: true
      })));
      await Promise.allSettled(legacyGls.map(gl => gl.stopRemote({
        posting: true
      })));
    }
  };
  createdApis.push(api);
  return api;
};
exports.GologinApi = GologinApi;
function exitAll() {
  Promise.allSettled(createdApis.map(api => api.exit()));
}