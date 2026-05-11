"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getProfileChromeExtensions = void 0;
var _promises = require("fs/promises");
const getProfileChromeExtensions = async profilePreferencesPath => {
  const profileChromeExtensions = [];
  if (!profilePreferencesPath) {
    return profileChromeExtensions;
  }
  const fileContent = await (0, _promises.readFile)(profilePreferencesPath, 'utf-8');
  const settings = JSON.parse(fileContent);
  const extensionsSettingsObj = settings?.extensions || {
    settings: {}
  };
  const extensionsSettings = extensionsSettingsObj.settings || {};
  const extensionsEntries = Object.entries(extensionsSettings);
  if (!extensionsEntries.length) {
    return profileChromeExtensions;
  }
  const currentExtensions = [];
  extensionsEntries.forEach(extensionObj => {
    const [extensionsId, extensionsContent] = extensionObj;
    const {
      path: extPath = ''
    } = extensionsContent;
    const formattedPath = extPath.replace(/\\|@/g, '/');
    const regex = new RegExp(`^${extensionsId}|(?:chrome-extensions|user-extensions)/\\w+`);
    const pathMatch = formattedPath.match(regex);
    if (!pathMatch) {
      return;
    }
    currentExtensions.push(extensionsId);
    const [matched] = pathMatch;
    const [originalExtId] = matched.split('/').reverse();
    if (profileChromeExtensions.includes(originalExtId)) {
      return;
    }
    profileChromeExtensions.push(originalExtId);
  });
  return profileChromeExtensions;
};
exports.getProfileChromeExtensions = getProfileChromeExtensions;