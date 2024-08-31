"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadCookies = exports.setOriginalExtPaths = exports.setExtPathsAndRemoveDeleted = exports.recalculateId = exports.downloadFonts = exports.downloadCookies = exports.copyFontsConfigFile = exports.composeFonts = void 0;
var _crypto = require("crypto");
var _fs = require("fs");
var _os = require("os");
var _path = require("path");
var _url = require("url");
var _requestretry = _interopRequireDefault(require("requestretry"));
var _fonts = require("../../fonts.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const {
  access,
  readFile,
  writeFile,
  mkdir,
  readdir,
  copyFile,
  rename
} = _fs.promises;
const _filename = (0, _url.fileURLToPath)(require('url').pathToFileURL(__filename).toString());
const _dirname = (0, _path.dirname)(_filename);
const FONTS_URL = 'https://fonts.gologin.com/';
const FONTS_DIR_NAME = 'fonts';
const HOMEDIR = (0, _os.homedir)();
const BROWSER_PATH = (0, _path.join)(HOMEDIR, '.gologin', 'browser');
const OS_PLATFORM = process.platform;
const DEFAULT_ORBITA_EXTENSIONS_NAMES = ['Google Hangouts', 'Chromium PDF Viewer', 'CryptoTokenExtension', 'Web Store'];
const GOLOGIN_BASE_FOLDER_NAME = '.gologin';
const GOLOGIN_TEST_FOLDER_NAME = '.gologin_test';
const osPlatform = process.platform;
const downloadCookies = ({
  profileId,
  ACCESS_TOKEN,
  API_BASE_URL
}) => _requestretry.default.get(`${API_BASE_URL}/browser/${profileId}/cookies`, {
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    'user-agent': 'gologin-api'
  },
  json: true,
  maxAttempts: 3,
  retryDelay: 2000,
  timeout: 10 * 1000
}).catch(e => {
  console.log(e);
  return {
    body: []
  };
});
exports.downloadCookies = downloadCookies;
const uploadCookies = ({
  cookies = [],
  profileId,
  ACCESS_TOKEN,
  API_BASE_URL
}) => _requestretry.default.post(`${API_BASE_URL}/browser/${profileId}/cookies/?encrypted=true`, {
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    'User-Agent': 'gologin-api'
  },
  json: cookies,
  maxAttempts: 3,
  retryDelay: 2000,
  timeout: 20 * 1000
}).catch(e => {
  console.log(e);
  return e;
});
exports.uploadCookies = uploadCookies;
const downloadFonts = async (fontsList = [], profilePath) => {
  if (!fontsList.length) {
    return;
  }
  const browserFontsPath = (0, _path.join)(BROWSER_PATH, FONTS_DIR_NAME);
  await mkdir(browserFontsPath, {
    recursive: true
  });
  const files = await readdir(browserFontsPath);
  const fontsToDownload = fontsList.filter(font => !files.includes(font));
  let promises = fontsToDownload.map(font => _requestretry.default.get(FONTS_URL + font, {
    maxAttempts: 5,
    retryDelay: 2000,
    timeout: 30 * 1000
  }).pipe((0, _fs.createWriteStream)((0, _path.join)(browserFontsPath, font))));
  if (promises.length) {
    await Promise.all(promises);
  }
  promises = fontsList.map(font => copyFile((0, _path.join)(browserFontsPath, font), (0, _path.join)(profilePath, FONTS_DIR_NAME, font)));
  await Promise.all(promises);
};
exports.downloadFonts = downloadFonts;
const composeFonts = async (fontsList = [], profilePath, differentOs = false) => {
  if (!(fontsList.length && profilePath)) {
    return;
  }
  const fontsToDownload = _fonts.fontsCollection.filter(elem => fontsList.includes(elem.value)).reduce((res, elem) => res.concat(elem.fileNames || []), []);
  if (differentOs && !fontsToDownload.length) {
    throw new Error('No fonts to download found. Use getAvailableFonts() method and set some fonts from this list');
  }
  fontsToDownload.push('LICENSE.txt');
  fontsToDownload.push('OFL.txt');
  const pathToFontsDir = (0, _path.join)(profilePath, FONTS_DIR_NAME);
  const fontsDirExists = await access(pathToFontsDir).then(() => true, () => false);
  if (fontsDirExists) {
    (0, _fs.rmdirSync)(pathToFontsDir, {
      recursive: true
    });
  }
  await mkdir(pathToFontsDir, {
    recursive: true
  });
  await downloadFonts(fontsToDownload, profilePath);
  if (OS_PLATFORM === 'linux') {
    await copyFontsConfigFile(profilePath);
  }
};
exports.composeFonts = composeFonts;
const copyFontsConfigFile = async profilePath => {
  if (!profilePath) {
    return;
  }
  const fileContent = await readFile((0, _path.resolve)(_dirname, '..', '..', 'fonts_config'), 'utf-8');
  const result = fileContent.replace(/\$\$GOLOGIN_FONTS\$\$/g, (0, _path.join)(profilePath, FONTS_DIR_NAME));
  const defaultFolderPath = (0, _path.join)(profilePath, 'Default');
  await mkdir(defaultFolderPath, {
    recursive: true
  });
  await writeFile((0, _path.join)(defaultFolderPath, 'fonts_config'), result);
};
exports.copyFontsConfigFile = copyFontsConfigFile;
const setExtPathsAndRemoveDeleted = (settings = {}, profileExtensionsCheckRes = [], profileId = '') => {
  const formattedLocalExtArray = profileExtensionsCheckRes.map(el => {
    const [extFolderName = ''] = el.split(_path.sep).reverse();
    const [originalId] = extFolderName.split('@');
    if (!originalId) {
      return null;
    }
    return {
      path: el,
      originalId
    };
  }).filter(Boolean);
  const extensionsSettings = settings.extensions?.settings || {};
  const extensionsEntries = Object.entries(extensionsSettings);
  const promises = extensionsEntries.map(async extensionObj => {
    let [extensionId, currentExtSettings = {}] = extensionObj;
    const extName = currentExtSettings.manifest?.name || '';
    let extPath = currentExtSettings.path || '';
    let originalId = '';
    const isExtensionToBeDeleted = ['resources', 'passwords-ext', 'cookies-ext'].some(substring => extPath.includes(substring)) && [GOLOGIN_BASE_FOLDER_NAME, GOLOGIN_TEST_FOLDER_NAME].some(substring => extPath.includes(substring)) || DEFAULT_ORBITA_EXTENSIONS_NAMES.includes(extName) && [GOLOGIN_BASE_FOLDER_NAME, GOLOGIN_TEST_FOLDER_NAME].some(substring => extPath.includes(substring));
    if (isExtensionToBeDeleted) {
      delete extensionsSettings[extensionId];
      return;
    }
    if (osPlatform === 'win32') {
      extPath = extPath.replace(/\//g, '\\');
    } else {
      extPath = extPath.replace(/\\/g, '/');
    }
    extensionsSettings[extensionId].path = extPath;
    const splittedPath = extPath.split(_path.sep);
    const isExtensionManageable = ['chrome-extensions', 'user-extensions'].some(substring => extPath.includes(substring)) && [GOLOGIN_BASE_FOLDER_NAME, GOLOGIN_TEST_FOLDER_NAME].some(substring => extPath.includes(substring));
    if (isExtensionManageable) {
      const [extFolderName] = extPath.split(_path.sep).reverse();
      [originalId] = extFolderName.split('@');
    } else if (splittedPath.length === 2) {
      [originalId] = splittedPath;
    }
    if (isExtensionManageable || splittedPath.length === 2) {
      const isExtensionInProfileSettings = formattedLocalExtArray.find(el => el.path.includes(originalId));
      if (!isExtensionInProfileSettings) {
        delete extensionsSettings[extensionId];
        return;
      }
    }
    const localExtObj = originalId && formattedLocalExtArray.find(el => el.path.includes(originalId));
    if (!localExtObj) {
      return;
    }
    const initialExtName = extensionId;
    extensionId = await recalculateId({
      localExtObj,
      extensionId,
      extensionsSettings,
      currentExtSettings
    });
    if (initialExtName !== extensionId) {
      const profilePath = (0, _path.join)((0, _os.tmpdir)(), `gologin_profile_${profileId}`);
      const extSyncFolder = (0, _path.join)(profilePath, 'Default', 'Sync Extension Settings', initialExtName);
      const newSyncFolder = (0, _path.join)(profilePath, 'Default', 'Sync Extension Settings', extensionId);
      await rename(extSyncFolder, newSyncFolder).catch(() => null);
    }
    if (localExtObj.path.endsWith('.zip')) {
      localExtObj.path = localExtObj.path.replace('.zip', '');
    }
    extensionsSettings[extensionId].path = localExtObj.path || '';
  });
  return Promise.all(promises).then(() => extensionsSettings);
};
exports.setExtPathsAndRemoveDeleted = setExtPathsAndRemoveDeleted;
const setOriginalExtPaths = async (settings = {}, originalExtensionsFolder = '') => {
  if (!originalExtensionsFolder) {
    return null;
  }
  const extensionsSettings = settings.extensions?.settings || {};
  const extensionsEntries = Object.entries(extensionsSettings);
  const originalExtensionsList = await readdir(originalExtensionsFolder).catch(() => []);
  if (!originalExtensionsList.length) {
    return null;
  }
  const promises = originalExtensionsList.map(async originalId => {
    const extFolderPath = (0, _path.join)(originalExtensionsFolder, originalId);
    const extFolderContent = await readdir(extFolderPath);
    if (!extFolderPath.length) {
      return {};
    }
    if (extFolderContent.includes('manifest.json')) {
      return {
        originalId,
        path: (0, _path.join)(originalExtensionsFolder, originalId)
      };
    }
    const [version] = extFolderContent;
    return {
      originalId,
      path: (0, _path.join)(originalExtensionsFolder, originalId, version)
    };
  });
  const originalExtPaths = await Promise.all(promises);
  extensionsEntries.forEach(extensionObj => {
    const [extensionsId] = extensionObj;
    const extPath = extensionsSettings[extensionsId].path;
    if (!/chrome-extensions/.test(extPath)) {
      return;
    }
    const originalExtPath = originalExtPaths.find(el => el.originalId === extensionsId);
    if (!originalExtPath) {
      return;
    }
    extensionsSettings[extensionsId].path = originalExtPath.path || '';
  });
  return extensionsSettings;
};
exports.setOriginalExtPaths = setOriginalExtPaths;
const recalculateId = async ({
  localExtObj,
  extensionId,
  extensionsSettings,
  currentExtSettings
}) => {
  if (currentExtSettings.manifest?.key) {
    return extensionId;
  }
  const manifestFilePath = (0, _path.join)(localExtObj.path, 'manifest.json');
  const manifestString = await readFile(manifestFilePath, {
    encoding: 'utf8'
  }).catch(() => ({}));
  if (!manifestString) {
    return extensionId;
  }
  let manifestObject;
  try {
    manifestObject = JSON.parse(manifestString);
  } catch {
    return extensionId;
  }
  if (manifestObject.key) {
    return extensionId;
  }
  let encoding = 'utf8';
  if (osPlatform === 'win32') {
    encoding = 'utf16le';
  }
  const extPathToEncode = Buffer.from(localExtObj.path, encoding);
  const hexEncodedPath = (0, _crypto.createHash)('sha256').update(extPathToEncode).digest('hex');
  const newId = hexEncodedPath.split('').slice(0, 32).map(symbol => extIdEncoding[symbol]).join('');
  if (extensionId !== newId) {
    delete extensionsSettings[extensionId];
    extensionsSettings[newId] = currentExtSettings;
    extensionId = newId;
  }
  return extensionId;
};
exports.recalculateId = recalculateId;
const extIdEncoding = {
  0: 'a',
  1: 'b',
  2: 'c',
  3: 'd',
  4: 'e',
  5: 'f',
  6: 'g',
  7: 'h',
  8: 'i',
  9: 'j',
  a: 'k',
  b: 'l',
  c: 'm',
  d: 'n',
  e: 'o',
  f: 'p'
};