"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateProfileUserAgent = exports.updateProfileResolution = exports.updateProfileProxy = exports.updateProfileBookmarks = void 0;
var _requestretry = _interopRequireDefault(require("requestretry"));
var _common = require("../utils/common.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
  * @param {string} profileId
  * @param {string} ACCESS_TOKEN
  * @param {string} resolution
*/
const updateProfileResolution = (profileId, ACCESS_TOKEN, resolution) => _requestretry.default.patch(`${_common.API_URL}/browser/${profileId}/resolution`, {
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    'user-agent': 'gologin-api'
  },
  json: {
    resolution
  },
  maxAttempts: 3,
  retryDelay: 2000,
  timeout: 10 * 1000
}).catch(e => {
  console.log(e);
  return {
    body: []
  };
});

/**
  * @param {string} profileId
  * @param {string} ACCESS_TOKEN
  * @param {string} userAgent
*/
exports.updateProfileResolution = updateProfileResolution;
const updateProfileUserAgent = (profileId, ACCESS_TOKEN, userAgent) => _requestretry.default.patch(`${_common.API_URL}/browser/${profileId}/ua`, {
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    'user-agent': 'gologin-api'
  },
  json: {
    userAgent
  },
  maxAttempts: 3,
  retryDelay: 2000,
  timeout: 10 * 1000
}).catch(e => {
  console.log(e);
  return {
    body: []
  };
});

/**
  * @param {string} profileId
  * @param {string} ACCESS_TOKEN
  * @param {Object} browserProxyData
  * @param {'http' | 'socks4' | 'socks5' | 'none'} browserProxyData.mode
  * @param {string} [browserProxyData.host]
  * @param {string} [browserProxyData.port]
  * @param {string} [browserProxyData.username]
  * @param {string} [browserProxyData.password]
*/
exports.updateProfileUserAgent = updateProfileUserAgent;
const updateProfileProxy = (profileId, ACCESS_TOKEN, browserProxyData) => _requestretry.default.patch(`${_common.API_URL}/browser/${profileId}/proxy`, {
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    'user-agent': 'gologin-api'
  },
  json: browserProxyData,
  maxAttempts: 3,
  retryDelay: 2000,
  timeout: 10 * 1000
}).catch(e => {
  console.log(e);
  return {
    body: []
  };
});

/**
  * @param {string} profileId
  * @param {string} ACCESS_TOKEN
  * @param {Object} bookmarks
*/
exports.updateProfileProxy = updateProfileProxy;
const updateProfileBookmarks = async (profileIds, ACCESS_TOKEN, bookmarks) => {
  const params = {
    profileIds,
    bookmarks
  };
  return _requestretry.default.patch(`${_common.API_URL}/browser/bookmarks/many`, {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      'user-agent': 'gologin-api'
    },
    json: params,
    maxAttempts: 3,
    retryDelay: 2000,
    timeout: 10 * 1000
  }).catch(error => console.log(error));
};
exports.updateProfileBookmarks = updateProfileBookmarks;