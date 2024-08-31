"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decompressProfile = exports.checkProfileArchiveIsValid = exports.archiveProfile = void 0;
var _admZip = _interopRequireDefault(require("adm-zip"));
var _fs = require("fs");
var _path = _interopRequireDefault(require("path"));
var _profileDirectoriesToRemove = require("./profile-directories-to-remove.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const {
  access
} = _fs.promises;
const archiveProfile = async (profileFolder = '', tryAgain = true) => {
  const folderExists = await access(profileFolder).then(() => true, () => false);
  if (!folderExists) {
    throw new Error('Invalid profile folder path: ' + profileFolder);
  }
  const archive = new _admZip.default();
  archive.addLocalFolder(_path.default.join(profileFolder, 'Default'), 'Default');
  try {
    archive.addLocalFile(_path.default.join(profileFolder, 'First Run'));
  } catch (e) {
    archive.addFile('First Run', Buffer.from(''));
  }
  const dirsToRemove = (0, _profileDirectoriesToRemove.getDirectoriesForArchiver)();
  dirsToRemove.forEach(entry => archive.deleteFile(entry));
  const archiveIsValid = checkProfileArchiveIsValid(archive);
  if (tryAgain && !archiveIsValid) {
    await new Promise(r => setTimeout(() => r(), 300));
    return archiveProfile(profileFolder, false);
  }
  return new Promise((resolve, reject) => archive.toBuffer(resolve, reject));
};
exports.archiveProfile = archiveProfile;
const decompressProfile = async (zipPath = '', profileFolder = '') => {
  const zipExists = await access(zipPath).then(() => true, () => false);
  if (!zipExists) {
    throw new Error('Invalid zip path: ' + zipPath);
  }
  const archive = new _admZip.default(zipPath);
  archive.getEntries().forEach(elem => {
    if (!elem.isDirectory && (elem.entryName.includes('RunningChromeVersion') || elem.entryName.includes('SingletonLock') || elem.entryName.includes('SingletonSocket') || elem.entryName.includes('SingletonCookie'))) {
      archive.deleteFile(elem);
    }
  });
  archive.extractAllTo(profileFolder, true);
};
exports.decompressProfile = decompressProfile;
const checkProfileArchiveIsValid = zipObject => {
  if (!zipObject) {
    throw new Error('No zip object provided');
  }
  return zipObject.getEntries().map(elem => {
    if (elem.isDirectory) {
      return false;
    }
    return elem.entryName.includes('Preferences') || elem.entryName.includes('Cookies');
  }).filter(Boolean).length >= 2;
};
exports.checkProfileArchiveIsValid = checkProfileArchiveIsValid;
const flatArray = (array = []) => array.map(elem => {
  if (Array.isArray(elem)) {
    return flatArray(elem).flat();
  }
  return elem;
}).flat().filter(Boolean);