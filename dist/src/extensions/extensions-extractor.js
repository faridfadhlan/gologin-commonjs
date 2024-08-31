"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractExtension = exports.deleteExtensionArchive = void 0;
var _decompress = _interopRequireDefault(require("decompress"));
var _decompressUnzip = _interopRequireDefault(require("decompress-unzip"));
var _fs = require("fs");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const {
  access,
  unlink
} = _fs.promises;
const extractExtension = (source, dest) => {
  if (!(source && dest)) {
    throw new Error('Missing parameter');
  }
  return access(source).then(() => withRetry({
    fn() {
      return (0, _decompress.default)(source, dest, {
        plugins: [(0, _decompressUnzip.default)()],
        filter: file => !file.path.endsWith('/')
      });
    }
  }));
};
exports.extractExtension = extractExtension;
const deleteExtensionArchive = dest => {
  if (!dest) {
    throw new Error('Missing parameter');
  }
  return access(dest).then(() => unlink(dest), () => Promise.resolve());
};
exports.deleteExtensionArchive = deleteExtensionArchive;
const withRetry = optionsOrUndefined => {
  const opts = optionsOrUndefined || {};
  const callCounter = opts.callCounter || 1;
  const fnToProducePromise = opts.fn;
  const callLimit = opts.limit || 5;
  delete opts.callCounter;
  return fnToProducePromise(opts).catch(err => {
    console.error(err);
    if (callCounter >= callLimit) {
      return Promise.reject(err);
    }
    opts.callCounter = callCounter + 1;
    return new Promise(resolve => process.nextTick(resolve)).then(() => withRetry(opts));
  });
};