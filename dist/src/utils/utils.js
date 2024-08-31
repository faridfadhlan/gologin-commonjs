"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isPortReachable = exports.get = exports.findLatestBrowserVersionDirectory = void 0;
var _nodeFs = require("node:fs");
var _nodeNet = _interopRequireDefault(require("node:net"));
var _nodePath = require("node:path");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const get = (value, path, defaultValue) => String(path).split('.').reduce((acc, val) => {
  try {
    acc = acc[val] ? acc[val] : defaultValue;
  } catch (e) {
    return defaultValue;
  }
  return acc;
}, value);
exports.get = get;
const isPortReachable = port => new Promise(resolve => {
  const checker = _nodeNet.default.createServer().once('error', () => {
    resolve(false);
  }).once('listening', () => checker.once('close', () => resolve(true)).close()).listen(port);
});
exports.isPortReachable = isPortReachable;
const findLatestBrowserVersionDirectory = browserPath => {
  const folderContents = (0, _nodeFs.readdirSync)(browserPath);
  const directories = folderContents.filter(file => (0, _nodeFs.statSync)((0, _nodePath.join)(browserPath, file)).isDirectory());
  const {
    folderName,
    version
  } = directories.reduce((newest, currentFolderName) => {
    const match = currentFolderName.match(/\d+/);
    if (match) {
      const findedVersion = parseInt(match[0], 10);
      if (findedVersion > newest.version) {
        return {
          folderName: currentFolderName,
          version: findedVersion
        };
      }
    }
    return newest;
  }, {
    folderName: '',
    version: 0
  });
  if (!version) {
    return 'error';
  }
  return folderName;
};
exports.findLatestBrowserVersionDirectory = findLatestBrowserVersionDirectory;