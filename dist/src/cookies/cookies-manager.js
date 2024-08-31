"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unixToLDAP = exports.loadCookiesFromFile = exports.ldapToUnix = exports.getDB = exports.getCookiesFilePath = exports.getChunckedInsertValues = exports.chunk = exports.buildCookieURL = void 0;
var _sqlite = require("sqlite");
var _sqlite2 = _interopRequireDefault(require("sqlite3"));
var _fs = require("fs");
var _path = require("path");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const {
  access
} = _fs.promises;
const {
  Database,
  OPEN_READONLY
} = _sqlite2.default;
const MAX_SQLITE_VARIABLES = 76;
const SAME_SITE = {
  '-1': 'unspecified',
  0: 'no_restriction',
  1: 'lax',
  2: 'strict'
};
const getDB = (filePath, readOnly = true) => {
  const connectionOpts = {
    filename: filePath,
    driver: Database
  };
  if (readOnly) {
    connectionOpts.mode = OPEN_READONLY;
  }
  return (0, _sqlite.open)(connectionOpts);
};
exports.getDB = getDB;
const getChunckedInsertValues = cookiesArr => {
  const todayUnix = Math.floor(new Date().getTime() / 1000.0);
  const chunckedCookiesArr = chunk(cookiesArr, MAX_SQLITE_VARIABLES);
  return chunckedCookiesArr.map(cookies => {
    const queryPlaceholders = cookies.map(() => '(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)').join(', ');
    const query = `insert or replace into cookies (creation_utc, host_key, top_frame_site_key, name, value, encrypted_value, path, expires_utc, is_secure, is_httponly, last_access_utc, has_expires, is_persistent, priority, samesite, source_scheme, source_port, is_same_party, last_update_utc) values ${queryPlaceholders}`;
    const queryParams = cookies.flatMap(cookie => {
      const creationDate = cookie.creationDate ? cookie.creationDate : unixToLDAP(todayUnix);
      let expirationDate = cookie.session ? 0 : unixToLDAP(cookie.expirationDate);
      const encryptedValue = cookie.value;
      const samesite = Object.keys(SAME_SITE).find(key => SAME_SITE[key] === (cookie.sameSite || '-1'));
      const isSecure = cookie.name.startsWith('__Host-') || cookie.name.startsWith('__Secure-') ? 1 : Number(cookie.secure);
      const sourceScheme = isSecure === 1 ? 2 : 1;
      const sourcePort = isSecure === 1 ? 443 : 80;
      // eslint-disable-next-line no-undefined
      let isPersistent = [undefined, null].includes(cookie.session) ? Number(expirationDate !== 0) : Number(!cookie.session);
      if (/^(\.)?mail.google.com$/.test(cookie.domain) && cookie.name === 'COMPASS') {
        expirationDate = 0;
        isPersistent = 0;
      }
      return [creationDate, cookie.domain, '',
      // top_frame_site_key
      cookie.name, '',
      // value
      encryptedValue, cookie.path, expirationDate, isSecure, Number(cookie.httpOnly), 0,
      // last_access_utc
      expirationDate === 0 ? 0 : 1,
      // has_expires
      isPersistent, 1,
      // default priority value (https://github.com/chromium/chromium/blob/main/net/cookies/cookie_constants.h)
      samesite, sourceScheme, sourcePort, 0,
      // is_same_party
      0 // last_update_utc
      ];
    });
    return [query, queryParams];
  });
};
exports.getChunckedInsertValues = getChunckedInsertValues;
const loadCookiesFromFile = async filePath => {
  let db;
  const cookies = [];
  try {
    db = await getDB(filePath);
    const cookiesRows = await db.all('select * from cookies');
    for (const row of cookiesRows) {
      const {
        host_key,
        name,
        encrypted_value,
        path,
        is_secure,
        is_httponly,
        expires_utc,
        is_persistent,
        samesite,
        creation_utc
      } = row;
      cookies.push({
        url: buildCookieURL(host_key, is_secure, path),
        domain: host_key,
        name,
        value: encrypted_value,
        path,
        sameSite: SAME_SITE[samesite],
        secure: Boolean(is_secure),
        httpOnly: Boolean(is_httponly),
        hostOnly: !host_key.startsWith('.'),
        session: !is_persistent,
        expirationDate: ldapToUnix(expires_utc),
        creationDate: ldapToUnix(creation_utc)
      });
    }
  } catch (error) {
    console.log(error);
  } finally {
    db && (await db.close());
  }
  return cookies;
};
exports.loadCookiesFromFile = loadCookiesFromFile;
const unixToLDAP = unixtime => {
  if (unixtime === 0) {
    return unixtime;
  }
  const win32filetime = new Date(Date.UTC(1601, 0, 1)).getTime() / 1000;
  const sum = unixtime - win32filetime;
  return sum * 1000000;
};
exports.unixToLDAP = unixToLDAP;
const ldapToUnix = ldap => {
  const ldapLength = ldap.toString().length;
  if (ldap === 0 || ldapLength > 18) {
    return ldap;
  }
  let _ldap = ldap;
  if (ldapLength < 18) {
    _ldap = Number(_ldap + '0'.repeat(18 - ldapLength));
  }
  const win32filetime = new Date(Date.UTC(1601, 0, 1)).getTime();
  return (_ldap / 10000 + win32filetime) / 1000;
};
exports.ldapToUnix = ldapToUnix;
const buildCookieURL = (domain, secure, path) => {
  let domainWithoutDot = domain;
  if (domain.startsWith('.')) {
    domainWithoutDot = domain.substr(1);
  }
  return 'http' + (secure ? 's' : '') + '://' + domainWithoutDot + path;
};
exports.buildCookieURL = buildCookieURL;
const chunk = (arr, chunkSize = 1, cache = []) => {
  const tmp = [...arr];
  if (chunkSize <= 0) {
    return cache;
  }
  while (tmp.length) {
    cache.push(tmp.splice(0, chunkSize));
  }
  return cache;
};
exports.chunk = chunk;
const getCookiesFilePath = async (profileId, tmpdir) => {
  const baseCookiesFilePath = (0, _path.join)(tmpdir, `gologin_profile_${profileId}`, 'Default', 'Cookies');
  const bypassCookiesFilePath = (0, _path.join)(tmpdir, `gologin_profile_${profileId}`, 'Default', 'Network', 'Cookies');
  return access(baseCookiesFilePath).then(() => baseCookiesFilePath).catch(() => access(bypassCookiesFilePath).then(() => bypassCookiesFilePath).catch(() => baseCookiesFilePath));
};
exports.getCookiesFilePath = getCookiesFilePath;