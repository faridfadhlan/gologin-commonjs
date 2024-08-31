"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOsAdvanced = exports.getOS = exports.composeExtractionPromises = exports.USER_EXTENSIONS_PATH = exports.CHROME_EXTENSIONS_PATH = exports.API_URL = void 0;
var _child_process = require("child_process");
var _os = require("os");
var _path = require("path");
var _util = require("util");
var _extensionsExtractor = require("../extensions/extensions-extractor.js");
const API_URL = exports.API_URL = 'https://api.gologin.com';
const HOMEDIR = (0, _os.homedir)();
const CHROME_EXT_DIR_NAME = 'chrome-extensions';
const EXTENSIONS_PATH = (0, _path.join)(HOMEDIR, '.gologin', 'extensions');
const CHROME_EXTENSIONS_PATH = (0, _path.join)(EXTENSIONS_PATH, CHROME_EXT_DIR_NAME);
const USER_EXTENSIONS_PATH = (0, _path.join)(HOMEDIR, '.gologin', 'extensions', 'user-extensions');
const composeExtractionPromises = (filteredArchives, destPath = CHROME_EXTENSIONS_PATH) => filteredArchives.map(extArchivePath => {
  const [archiveName = ''] = extArchivePath.split(_path.sep).reverse();
  const [destFolder] = archiveName.split('.');
  return (0, _extensionsExtractor.extractExtension)(extArchivePath, (0, _path.join)(destPath, destFolder)).then(() => (0, _extensionsExtractor.deleteExtensionArchive)(extArchivePath));
});
const getMacArmSpec = async () => {
  const doExec = (0, _util.promisify)(_child_process.exec);
  const {
    stdout
  } = await doExec('sysctl machdep.cpu');
  const regExp = /Apple M\d/;
  const [match] = stdout.match(regExp);
  const [_, armVersion] = match.split(' ');
  return armVersion;
};
const getOsAdvanced = async () => {
  const os = getOS();
  if (!['mac', 'macM1'].includes(os)) {
    return {
      os,
      osSpec: ''
    };
  }
  const osSpec = await getMacArmSpec();
  return {
    os: 'mac',
    osSpec
  };
};
const getOS = () => {
  if (process.platform === 'win32') {
    return 'win';
  }
  if (process.platform === 'darwin') {
    return process.arch === 'arm64' ? 'macM1' : 'mac';
  }
  return 'lin';
};
const _composeExtractionPromises = exports.composeExtractionPromises = composeExtractionPromises;
const _getOS = exports.getOS = getOS;
const _getOsAdvanced = exports.getOsAdvanced = getOsAdvanced;
const _USER_EXTENSIONS_PATH = exports.USER_EXTENSIONS_PATH = USER_EXTENSIONS_PATH;
const _CHROME_EXTENSIONS_PATH = exports.CHROME_EXTENSIONS_PATH = CHROME_EXTENSIONS_PATH;