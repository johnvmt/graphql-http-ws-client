"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _coreCjs = require("@apollo/client/core/core.cjs.js");

var _cacheCjs = require("@apollo/client/cache/cache.cjs.js");

var _createGraphQLLinks = _interopRequireDefault(require("./createGraphQLLinks.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (graphQLURL, passedOptions = {}) => {
  const options = {
    resolvers: {},
    ...passedOptions
  };
  const links = (0, _createGraphQLLinks.default)(graphQLURL, options);
  const defaultApolloOptions = typeof options.defaultApolloOptions === 'object' && options.defaultApolloOptions !== null ? options.defaultApolloOptions : {};
  const cache = typeof options.cache === 'object' && options.cache !== null ? options.cache : new _cacheCjs.InMemoryCache();
  const client = new _coreCjs.ApolloClient({
    cache: cache,
    link: links.link,
    defaultOptions: defaultApolloOptions,
    resolvers: options.resolvers
  });
  return { ...links,
    client: client,
    cache: cache
  };
};

exports.default = _default;