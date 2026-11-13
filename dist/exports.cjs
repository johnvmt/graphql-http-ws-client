var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/exports.js
var exports_exports = {};
__export(exports_exports, {
  createGraphQLClient: () => createGraphQLClient_default,
  createGraphQLLinks: () => createGraphQLLinks_default,
  default: () => exports_default
});
module.exports = __toCommonJS(exports_exports);

// src/createGraphQLClient.js
var import_client3 = require("@apollo/client");
var import_local_state = require("@apollo/client/local-state");

// src/ApolloClientWithGQL.js
var import_client = require("@apollo/client");
var parseDocumentOption = (options, key) => {
  return typeof (options == null ? void 0 : options[key]) === "string" ? { ...options, [key]: (0, import_client.gql)(options[key]) } : options;
};
var ApolloClientWithGQL = class extends import_client.ApolloClient {
  constructor(...args) {
    super(...args);
    const query = this.query;
    const subscribe = this.subscribe;
    const mutate = this.mutate;
    this.query = (options, ...rest) => query.call(this, parseDocumentOption(options, "query"), ...rest);
    this.subscribe = (options, ...rest) => subscribe.call(this, parseDocumentOption(options, "query"), ...rest);
    this.mutate = (options, ...rest) => mutate.call(this, parseDocumentOption(options, "mutation"), ...rest);
  }
};
var ApolloClientWithGQL_default = ApolloClientWithGQL;

// src/createGraphQLLinks.js
var import_client2 = require("@apollo/client");
var import_utilities = require("@apollo/client/utilities");
var import_retry = require("@apollo/client/link/retry");
var import_context = require("@apollo/client/link/context");
var import_ws = require("@apollo/client/link/ws");
var import_subscriptions = require("@apollo/client/link/subscriptions");
var import_subscriptions_transport_ws = require("subscriptions-transport-ws");
var import_graphql_ws = require("graphql-ws");
var createGraphQLLinks_default = (graphQLURL, options) => {
  const mergedOptions = {
    createHTTPLink: true,
    createWSLink: true,
    createRetryLink: true,
    ...options
  };
  const httpURLToWS = (url) => {
    return url.replace(/(http)(s)?:\/\//, "ws$2://");
  };
  let httpLink = null;
  if (mergedOptions.createHTTPLink) {
    const { setContext: contextSetter, ...passedHTTPLinkOptions } = mergedOptions.httpLinkOptions ?? {};
    const authLink = contextSetter ? new import_context.SetContextLink((prevContext, operation) => contextSetter(operation, prevContext)) : void 0;
    const httpLinkOptions = {
      uri: graphQLURL,
      ...passedHTTPLinkOptions
    };
    if (typeof httpLinkOptions.fetch !== "function" && typeof fetch !== "function")
      throw new Error(`Missing fetch implementation from node or window.fetch or options.httpLinkOptions.fetch`);
    httpLink = authLink ? authLink.concat(new import_client2.HttpLink(httpLinkOptions)) : new import_client2.HttpLink(httpLinkOptions);
  }
  let wsLink = null;
  let subscriptionClient = null;
  if (mergedOptions.createWSLink) {
    const wsSubprotocol = mergedOptions.wsSubprotocol ? mergedOptions.wsSubprotocol.toLowerCase() : "graphql-ws";
    const wsLinkOptions = {
      reconnect: true,
      ...mergedOptions.wsLinkOptions,
      // override connectionParams to add subprotocol header
      connectionParams: async (...args) => {
        var _a, _b;
        const params = ((_a = mergedOptions.wsLinkOptions) == null ? void 0 : _a.connectionParams) ? await ((_b = mergedOptions.wsLinkOptions) == null ? void 0 : _b.connectionParams(...args)) : {};
        return {
          ...params,
          headers: {
            "sec-websocket-protocol": wsSubprotocol,
            ...params.headers
          }
        };
      }
    };
    if (typeof options.websocket !== "function" && (typeof window !== "object" || typeof window.WebSocket !== "function"))
      throw new Error(`Missing websocket implementation on window.WebSocket or options.websocket`);
    const websocketImplementation = typeof options.websocket === "function" ? options.websocket : window.WebSocket;
    if (wsSubprotocol === "graphql-transport-ws") {
      subscriptionClient = (0, import_graphql_ws.createClient)({
        webSocketImpl: websocketImplementation,
        url: httpURLToWS(graphQLURL),
        ...wsLinkOptions
      });
      wsLink = new import_subscriptions.GraphQLWsLink(subscriptionClient);
    } else if (wsSubprotocol === "graphql-ws") {
      subscriptionClient = new import_subscriptions_transport_ws.SubscriptionClient(httpURLToWS(graphQLURL), wsLinkOptions, websocketImplementation);
      wsLink = new import_ws.WebSocketLink(subscriptionClient);
    } else
      throw new Error(`Unknown wsSubprotocol`);
  }
  let transportLink = null;
  if (httpLink !== null && wsLink !== null) {
    transportLink = import_client2.ApolloLink.split(
      ({ query }) => {
        const { kind, operation } = (0, import_utilities.getMainDefinition)(query);
        return kind === "OperationDefinition" && operation === "subscription";
      },
      wsLink,
      httpLink
    );
  } else if (wsLink !== null)
    transportLink = wsLink;
  else if (httpLink !== null)
    transportLink = httpLink;
  let retryLink;
  if (mergedOptions.createRetryLink) {
    retryLink = new import_retry.RetryLink({
      ...mergedOptions.retryLinkOptions
    });
  }
  const links = [transportLink];
  if (retryLink)
    links.unshift(retryLink);
  if (mergedOptions.middleware)
    links.unshift(mergedOptions.middleware);
  return {
    link: import_client2.ApolloLink.from(links),
    httpLink,
    wsLink,
    transportLink,
    retryLink,
    subscriptionClient
  };
};

// src/createGraphQLClient.js
var createGraphQLClient_default = (graphQLURL, options = {}) => {
  const links = createGraphQLLinks_default(graphQLURL, options);
  const defaultApolloOptions = typeof options.defaultApolloOptions === "object" && options.defaultApolloOptions !== null ? options.defaultApolloOptions : {};
  const cache = typeof options.cache === "object" && options.cache !== null ? options.cache : new import_client3.InMemoryCache();
  const clientOptions = {
    cache,
    link: links.link,
    defaultOptions: defaultApolloOptions
  };
  if (options.resolvers)
    clientOptions.localState = new import_local_state.LocalState({ resolvers: options.resolvers });
  const client = new ApolloClientWithGQL_default(clientOptions);
  return {
    ...links,
    client,
    cache
  };
};

// src/exports.js
__reExport(exports_exports, require("@apollo/client"), module.exports);
var exports_default = createGraphQLClient_default;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createGraphQLClient,
  createGraphQLLinks,
  ...require("@apollo/client")
});
