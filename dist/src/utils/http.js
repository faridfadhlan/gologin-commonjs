"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeRequest = exports.checkSocksProxy = void 0;
var _https = require("https");
var _requestretry = _interopRequireDefault(require("requestretry"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const TIMEZONE_URL = 'https://geo.myip.link';
const createTimeoutPromise = timeoutMs => new Promise((_, reject) => {
  setTimeout(() => {
    reject(new Error(`Request timeout after ${timeoutMs}ms`));
  }, timeoutMs);
});
const attemptRequest = async (requestUrl, options) => {
  const requestPromise = (0, _requestretry.default)(requestUrl, options);
  let req;
  if (options.proxy) {
    const timeoutPromise = createTimeoutPromise(options.timeout || 30000);
    req = await Promise.race([requestPromise, timeoutPromise]);
  } else {
    req = await requestPromise;
  }
  if (req.statusCode >= 400) {
    const error = new Error(req.body);
    error.statusCode = req.statusCode;
    throw error;
  }
  return req.body;
};
const makeRequest = async (url, options, internalOptions) => {
  options.headers = {
    ...options.headers,
    'User-Agent': 'gologin-nodejs-sdk'
  };
  if (internalOptions?.token) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${internalOptions.token}`
    };
  }
  try {
    return await attemptRequest(url, options);
  } catch (error) {
    if (internalOptions?.fallbackUrl && !error.statusCode) {
      const fallbackData = await attemptRequest(internalOptions.fallbackUrl, options);
      return fallbackData;
    }
    throw error;
  }
};
exports.makeRequest = makeRequest;
const checkSocksProxy = async agent => new Promise((resolve, reject) => {
  (0, _https.get)(TIMEZONE_URL, {
    agent,
    timeout: 8000
  }, res => {
    let resultResponse = '';
    res.on('data', data => {
      resultResponse += data;
    });
    res.on('end', () => {
      resolve({
        ...res,
        body: JSON.parse(resultResponse)
      });
    });
  }).on('error', err => reject(err));
});
exports.checkSocksProxy = checkSocksProxy;