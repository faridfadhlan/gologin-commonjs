"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateProfileUserAgent = exports.updateProfileResolution = exports.updateProfileProxy = exports.updateProfileBookmarks = void 0;
var _common = require("../utils/common.js");
var _http = require("../utils/http.js");
/**
  * @param {string} profileId
  * @param {string} ACCESS_TOKEN
  * @param {string} resolution
*/
const updateProfileResolution = (profileId, ACCESS_TOKEN, resolution) => (0, _http.makeRequest)(`${_common.API_URL}/browser/${profileId}/resolution`, {
  method: 'PATCH',
  json: {
    resolution
  },
  maxAttempts: 3,
  retryDelay: 2000,
  timeout: 10 * 1000
}, {
  token: ACCESS_TOKEN,
  fallbackUrl: `${_common.FALLBACK_API_URL}/browser/${profileId}/resolution`
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
const updateProfileUserAgent = (profileId, ACCESS_TOKEN, userAgent) => (0, _http.makeRequest)(`${_common.API_URL}/browser/${profileId}/ua`, {
  method: 'PATCH',
  json: {
    userAgent
  },
  maxAttempts: 3,
  retryDelay: 2000,
  timeout: 10 * 1000
}, {
  token: ACCESS_TOKEN,
  fallbackUrl: `${_common.FALLBACK_API_URL}/browser/${profileId}/ua`
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
const updateProfileProxy = (profileId, ACCESS_TOKEN, browserProxyData) => (0, _http.makeRequest)(`${_common.API_URL}/browser/${profileId}/proxy`, {
  method: 'PATCH',
  json: browserProxyData,
  maxAttempts: 3,
  retryDelay: 2000,
  timeout: 10 * 1000
}, {
  token: ACCESS_TOKEN,
  fallbackUrl: `${_common.FALLBACK_API_URL}/browser/${profileId}/proxy`
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
  return (0, _http.makeRequest)(`${_common.API_URL}/browser/bookmarks/many`, {
    method: 'PATCH',
    json: params,
    maxAttempts: 3,
    retryDelay: 2000,
    timeout: 10 * 1000
  }, {
    token: ACCESS_TOKEN,
    fallbackUrl: `${_common.FALLBACK_API_URL}/browser/bookmarks/many`
  }).catch(error => console.log(error));
};
exports.updateProfileBookmarks = updateProfileBookmarks;