"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.captureGroupedSentryError = void 0;
var Sentry = _interopRequireWildcard(require("@sentry/node"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const captureGroupedSentryError = (error, context = {}) => {
  if (process.env.DISABLE_TELEMETRY === 'true') {
    return;
  }
  const errorMessage = error?.message || 'Unknown error';
  let fingerprint = ['default'];
  let tags = {
    errorType: 'unknown'
  };
  switch (true) {
    case errorMessage.includes('Profile deleted or not found'):
      fingerprint = ['profile-not-found'];
      tags = {
        errorType: 'profile',
        category: 'configuration'
      };
      break;
    case errorMessage.includes('Request timeout after 13000ms'):
    case errorMessage.includes('Proxy Error'):
      fingerprint = ['proxy-error'];
      tags = {
        errorType: 'proxy',
        category: 'configuration'
      };
      break;
    case errorMessage.includes('ENOSPC'):
    case errorMessage.includes('database or disk is full'):
      fingerprint = ['out-of-space'];
      tags = {
        errorType: 'out-of-space',
        category: 'filesystem'
      };
      break;
    case errorMessage.includes('ECONNREFUSED 127.0.0.1:'):
      fingerprint = ['browser-not-found'];
      tags = {
        errorType: 'browser',
        category: 'configuration'
      };
      break;
    case errorMessage.includes('end of central directory record signature not found'):
    case errorMessage.includes('invalid code lengths set'):
    case errorMessage.includes('Command failed: tar xzf'):
      fingerprint = ['archive-error'];
      tags = {
        errorType: 'archive',
        category: 'binaries'
      };
      break;
    case errorMessage.includes('spawn UNKNOWN'):
      fingerprint = ['spawn-error'];
      tags = {
        errorType: 'spawn',
        category: 'runtime'
      };
      break;
    case errorMessage.includes('unable to verify the first certificate'):
    case errorMessage.includes('write EPROTO'):
      fingerprint = ['ssl-error'];
      tags = {
        errorType: 'ssl',
        category: 'network'
      };
      break;
    case errorMessage.includes('You have reached your free API requests limit'):
      fingerprint = ['api-limit-reached'];
      tags = {
        errorType: 'api',
        category: 'rate-limit'
      };
      break;
    default:
      fingerprint = ['uncategorized', errorMessage.substring(0, 50)];
      tags = {
        errorType: 'uncategorized',
        category: 'unknown'
      };
      break;
  }
  Sentry.captureException(error, scope => {
    scope.setFingerprint(fingerprint);
    scope.setTransactionName(fingerprint);
    scope.setTags(tags);
    scope.setContext('errorDetails', {
      originalMessage: errorMessage,
      ...context
    });
  });
};
exports.captureGroupedSentryError = captureGroupedSentryError;