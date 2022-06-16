"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  createGraphQLClient: true,
  createGraphQLLinks: true
};
Object.defineProperty(exports, "createGraphQLClient", {
  enumerable: true,
  get: function () {
    return _createGraphQLClient.default;
  }
});
Object.defineProperty(exports, "createGraphQLLinks", {
  enumerable: true,
  get: function () {
    return _createGraphQLLinks.default;
  }
});
exports.default = void 0;

var _createGraphQLClient = _interopRequireDefault(require("./createGraphQLClient.js"));

var _createGraphQLLinks = _interopRequireDefault(require("./createGraphQLLinks.js"));

var _coreCjs = require("@apollo/client/core/core.cjs.js");

Object.keys(_coreCjs).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _coreCjs[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _coreCjs[key];
    }
  });
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _createGraphQLClient.default;
exports.default = _default;