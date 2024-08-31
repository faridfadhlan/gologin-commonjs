"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCurrentProfileBookmarks = void 0;
var _fs = require("fs");
const {
  readFile
} = _fs.promises;
const getCurrentProfileBookmarks = async pathToBookmarks => {
  const currentBookmarksFileData = await readFile(pathToBookmarks, {
    encoding: 'utf-8'
  });
  let bookmarks = {};
  try {
    bookmarks = JSON.parse(currentBookmarksFileData);
  } catch (error) {
    console.log(error);
  }
  return bookmarks;
};
exports.getCurrentProfileBookmarks = getCurrentProfileBookmarks;