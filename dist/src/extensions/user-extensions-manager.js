"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.UserExtensionsManager = void 0;
var _fs = require("fs");
var _path = require("path");
var _requestretry = _interopRequireDefault(require("requestretry"));
var _common = require("../utils/common.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const {
  readdir,
  readFile,
  stat,
  mkdir,
  copyFile
} = _fs.promises;
class UserExtensionsManager {
  #existedUserExtensions = [];
  #API_BASE_URL = '';
  #ACCESS_TOKEN = '';
  #USER_AGENT = '';
  #TWO_FA_KEY = '';
  set userAgent(userAgent) {
    if (!userAgent) {
      return;
    }
    this.#USER_AGENT = userAgent;
  }
  set accessToken(accessToken) {
    if (!accessToken) {
      return;
    }
    this.#ACCESS_TOKEN = accessToken;
  }
  set twoFaKey(twoFaKey) {
    if (!twoFaKey) {
      return;
    }
    this.#TWO_FA_KEY = twoFaKey;
  }
  set apiUrl(apiUrl) {
    if (!apiUrl) {
      return;
    }
    this.#API_BASE_URL = apiUrl;
  }
  get apiBaseUrl() {
    return this.#API_BASE_URL;
  }
  get existedUserExtensions() {
    return this.#existedUserExtensions;
  }
  get accessToken() {
    return this.#ACCESS_TOKEN;
  }
  get twoFaKey() {
    return this.#TWO_FA_KEY;
  }
  get userAgent() {
    return this.#USER_AGENT;
  }
  set existedUserExtensions(fileList) {
    if (!fileList) {
      return;
    }
    this.#existedUserExtensions = fileList;
  }
  checkLocalUserChromeExtensions = async (userChromeExtensions, profileId) => {
    if (!userChromeExtensions.length) {
      return;
    }
    const extensionsToDownloadPaths = (await _requestretry.default.post(`${this.#API_BASE_URL}/extensions/user_chrome_extensions_paths`, {
      json: true,
      fullResponse: false,
      headers: {
        Authorization: `Bearer ${this.#ACCESS_TOKEN}`,
        'user-agent': this.#USER_AGENT,
        'x-two-factor-token': this.#TWO_FA_KEY || ''
      },
      body: {
        existedUserChromeExtensions: this.#existedUserExtensions,
        profileId,
        userChromeExtensions
      }
    })) || [];
    const extensionsToDownloadPathsFiltered = extensionsToDownloadPaths.filter(extPath => userChromeExtensions.some(extId => extPath.includes(extId)));
    if (!extensionsToDownloadPathsFiltered.length) {
      return this.getExtensionsStrToIncludeAsOrbitaParam(userChromeExtensions, _common.USER_EXTENSIONS_PATH);
    }
    const promises = extensionsToDownloadPathsFiltered.map(async awsPath => {
      const [basePath] = awsPath.split('?');
      const [extId] = basePath.split('/').reverse();
      const zipPath = `${(0, _path.join)(_common.USER_EXTENSIONS_PATH, extId)}.zip`;
      const archiveZip = (0, _fs.createWriteStream)(zipPath);
      await (0, _requestretry.default)(awsPath, {
        retryDelay: 2 * 1000,
        maxAttempts: 3
      }).pipe(archiveZip);
      await new Promise(r => archiveZip.on('close', () => r()));
      return zipPath;
    });
    const zipPaths = await Promise.all(promises).catch(() => []);
    if (!zipPaths) {
      return this.getExtensionsStrToIncludeAsOrbitaParam(userChromeExtensions, _common.USER_EXTENSIONS_PATH);
    }
    const extractionPromises = (0, _common.composeExtractionPromises)(zipPaths, _common.USER_EXTENSIONS_PATH);
    const isExtensionsExtracted = await Promise.all(extractionPromises).catch(() => 'error');
    if (isExtensionsExtracted !== 'error') {
      const [downloadedFolders] = zipPaths.map(archivePath => archivePath.split(_path.sep).reverse());
      this.#existedUserExtensions = [...this.#existedUserExtensions, ...downloadedFolders];
    }
    return this.getExtensionsStrToIncludeAsOrbitaParam(userChromeExtensions, _common.USER_EXTENSIONS_PATH);
  };
  async getExtensionsStrToIncludeAsOrbitaParam(profileExtensions = [], folderPath = _common.CHROME_EXTENSIONS_PATH) {
    if (!(Array.isArray(profileExtensions) && profileExtensions.length)) {
      return [];
    }
    const folders = await readdir(folderPath).then(folderNames => folderNames.map(folderName => (0, _path.join)(folderPath, folderName)));
    if (!folders.length) {
      return [];
    }
    const formattedIdsList = folders.map(el => {
      const [folderName] = el.split(_path.sep).reverse();
      const [originalId] = folderName.split('@');
      return {
        originalId,
        path: el
      };
    });
    return profileExtensions.map(el => {
      const extExisted = formattedIdsList.find(chromeExtPathElem => chromeExtPathElem.originalId === el);
      if (!extExisted) {
        return '';
      }
      return extExisted.path;
    }).filter(Boolean);
  }
  async getExtensionsNameAndImage(extensionsIds, pathToExtensions) {
    const isCheckLocalFiles = [_common.CHROME_EXTENSIONS_PATH, _common.USER_EXTENSIONS_PATH].includes(pathToExtensions);
    const extensionFolderNames = await readdir(pathToExtensions).catch(() => {});
    const filteredExtensionFolderNames = extensionFolderNames.filter(extensionFolder => extensionsIds.some(extensionId => !extensionFolder.includes('.zip') && extensionFolder.includes(extensionId)));
    if (!filteredExtensionFolderNames.length) {
      return;
    }
    const namesPromise = extensionsIds.map(async extensionsId => {
      const folderName = filteredExtensionFolderNames.find(folderName => folderName.includes(extensionsId));
      if (!folderName) {
        return;
      }
      let pathToExtensionsFolder = [pathToExtensions, folderName];
      if (!isCheckLocalFiles) {
        const [extensionVersion] = await readdir((0, _path.join)(pathToExtensions, folderName));
        pathToExtensionsFolder = [pathToExtensions, folderName, extensionVersion];
      }
      const manifestPath = (0, _path.join)(...pathToExtensionsFolder, 'manifest.json');
      const manifestString = await readFile(manifestPath, 'utf8').catch(() => '');
      if (!manifestString) {
        return;
      }
      const manifestObject = JSON.parse(manifestString);
      let name;
      if (manifestObject.name.includes('__MSG')) {
        const manifestName = manifestObject.name || '';
        const fieldNameInLocale = manifestName.replace(/__/g, '').split('MSG_')[1];
        const localePath = (0, _path.join)(...pathToExtensionsFolder, '_locales', manifestObject.default_locale, 'messages.json');
        const localeString = await readFile(localePath, 'utf8').catch(() => {});
        try {
          const parsedLocale = JSON.parse(localeString.trim());
          name = parsedLocale[fieldNameInLocale].message;
        } catch (e) {
          console.log(e);
        }
      } else {
        name = manifestObject.name;
      }
      if (!name) {
        return;
      }
      const iconObject = manifestObject.icons;
      let iconPath = manifestObject.browser_action?.default_icon;
      if (iconObject) {
        iconPath = iconObject['128'];
      }
      let iconBSON = '';
      if (iconPath) {
        const iconPathFull = (0, _path.join)(...pathToExtensionsFolder, iconPath);
        iconBSON = await readFile(iconPathFull, 'base64').catch(() => {});
      }
      return {
        name,
        extId: extensionsId,
        iconBinary: iconBSON
      };
    });
    const extensionsArray = await Promise.all(namesPromise);
    return extensionsArray.filter(Boolean);
  }
  generateExtensionId() {
    let result = '';
    let extensionIdLength = 32;
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    while (extensionIdLength--) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
exports.UserExtensionsManager = UserExtensionsManager;
const checkFileSizeSync = async pathToFile => {
  try {
    const [fileName] = pathToFile.split(_path.sep).reverse();
    if (fileName === '.DS_Store') {
      return 0;
    }
    const fileStats = await stat(pathToFile);
    if (!fileStats.isDirectory()) {
      return fileStats.size;
    }
    const files = await readdir(pathToFile);
    const promises = files.map(async file => checkFileSizeSync((0, _path.join)(pathToFile, file)));
    return (await Promise.all(promises)).reduce((result, value) => result + value, 0);
  } catch {
    return -1;
  }
};
const copyFolder = async (fromPath, destPath) => {
  const stats = await stat(fromPath);
  if (!stats.isDirectory()) {
    return copyFile(fromPath, destPath);
  }
  await mkdir(destPath, {
    recursive: true
  }).catch(() => null);
  const files = await readdir(fromPath);
  const promises = files.map(async file => {
    await mkdir(destPath, {
      recursive: true
    }).catch(() => null);
    return copyFolder((0, _path.join)(fromPath, file), (0, _path.join)(destPath, file));
  });
  return Promise.all(promises);
};
var _default = exports.default = UserExtensionsManager;