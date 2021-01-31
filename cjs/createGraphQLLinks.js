"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _coreCjs = require("@apollo/client/link/core/core.cjs.js");

var _wsCjs = require("@apollo/client/link/ws/ws.cjs.js");

var _httpCjs = require("@apollo/client/link/http/http.cjs.js");

var _retryCjs = require("@apollo/client/link/retry/retry.cjs.js");

var _utilitiesCjs = require("@apollo/client/utilities/utilities.cjs.js");

var _subscriptionsTransportWs = require("subscriptions-transport-ws");

// TODO allow override of fetch options as in https://www.apollographql.com/docs/link/links/http/
var _default = (graphQLURL, passedOptions) => {
  const options = {
    createHTTPLink: true,
    createWSLink: true,
    ...passedOptions
  };

  const httpURLToWS = url => {
    return url.replace(/(http)(s)?:\/\//, "ws$2://");
  };

  let httpLink = null;

  if (options.createHTTPLink) {
    const httpLinkOptions = {
      uri: graphQLURL,
      ...options.httpLinkOptions
    };
    if (typeof httpLinkOptions.fetch !== 'function' && (typeof window !== 'object' || typeof window.fetch !== 'function')) throw new Error(`Missing fetch implementation on window.fetch or options.httpLinkOptions.fetch`);
    httpLink = new _httpCjs.HttpLink(httpLinkOptions);
  }

  let wsLink = null;
  let subscriptionClient = null;

  if (options.createWSLink) {
    const wsLinkOptions = {
      reconnect: true,
      ...options.wsLinkOptions
    };
    if (typeof options.ws !== 'function' && (typeof window !== 'object' || typeof window.WebSocket !== 'function')) throw new Error(`Missing websocket implementation on window.WebSocket or options.websocket`);
    const websocketImplementation = typeof options.ws === 'function' ? options.ws : window.WebSocket;
    subscriptionClient = new _subscriptionsTransportWs.SubscriptionClient(httpURLToWS(graphQLURL), wsLinkOptions, websocketImplementation);
    wsLink = new _wsCjs.WebSocketLink(subscriptionClient);
  }

  let transportLink = null;

  if (httpLink !== null && wsLink !== null) {
    // httpLink and websocketLink exist
    transportLink = (0, _coreCjs.split)(({
      query
    }) => {
      const {
        kind,
        operation
      } = (0, _utilitiesCjs.getMainDefinition)(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    }, wsLink, httpLink);
  } else if (wsLink !== null) // only websocketLink exists
    transportLink = wsLink;else if (httpLink !== null) // only httpLink (no Subscriptions)
    transportLink = httpLink;

  const retryLink = new _retryCjs.RetryLink({
    attempts: {
      max: Infinity
    }
  });
  const link = (0, _coreCjs.concat)(retryLink, transportLink);
  return {
    link: options.hasOwnProperty('middleware') ? (0, _coreCjs.concat)(options.middleware, link) : link,
    httpLink: httpLink,
    wsLink: wsLink,
    transportLink: transportLink,
    retryLink: retryLink,
    subscriptionClient: subscriptionClient
  };
};

exports.default = _default;