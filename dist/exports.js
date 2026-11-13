// src/createGraphQLClient.js
import { InMemoryCache } from "@apollo/client";
import { LocalState } from "@apollo/client/local-state";

// src/ApolloClientWithGQL.js
import { ApolloClient, gql } from "@apollo/client";
var parseDocumentOption = (options, key) => {
  return typeof (options == null ? void 0 : options[key]) === "string" ? { ...options, [key]: gql(options[key]) } : options;
};
var ApolloClientWithGQL = class extends ApolloClient {
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
import { ApolloLink, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { RetryLink } from "@apollo/client/link/retry";
import { SetContextLink } from "@apollo/client/link/context";
import { WebSocketLink } from "@apollo/client/link/ws";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { createClient } from "graphql-ws";
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
    const authLink = contextSetter ? new SetContextLink((prevContext, operation) => contextSetter(operation, prevContext)) : void 0;
    const httpLinkOptions = {
      uri: graphQLURL,
      ...passedHTTPLinkOptions
    };
    if (typeof httpLinkOptions.fetch !== "function" && typeof fetch !== "function")
      throw new Error(`Missing fetch implementation from node or window.fetch or options.httpLinkOptions.fetch`);
    httpLink = authLink ? authLink.concat(new HttpLink(httpLinkOptions)) : new HttpLink(httpLinkOptions);
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
      subscriptionClient = createClient({
        webSocketImpl: websocketImplementation,
        url: httpURLToWS(graphQLURL),
        ...wsLinkOptions
      });
      wsLink = new GraphQLWsLink(subscriptionClient);
    } else if (wsSubprotocol === "graphql-ws") {
      subscriptionClient = new SubscriptionClient(httpURLToWS(graphQLURL), wsLinkOptions, websocketImplementation);
      wsLink = new WebSocketLink(subscriptionClient);
    } else
      throw new Error(`Unknown wsSubprotocol`);
  }
  let transportLink = null;
  if (httpLink !== null && wsLink !== null) {
    transportLink = ApolloLink.split(
      ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
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
    retryLink = new RetryLink({
      ...mergedOptions.retryLinkOptions
    });
  }
  const links = [transportLink];
  if (retryLink)
    links.unshift(retryLink);
  if (mergedOptions.middleware)
    links.unshift(mergedOptions.middleware);
  return {
    link: ApolloLink.from(links),
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
  const cache = typeof options.cache === "object" && options.cache !== null ? options.cache : new InMemoryCache();
  const clientOptions = {
    cache,
    link: links.link,
    defaultOptions: defaultApolloOptions
  };
  if (options.resolvers)
    clientOptions.localState = new LocalState({ resolvers: options.resolvers });
  const client = new ApolloClientWithGQL_default(clientOptions);
  return {
    ...links,
    client,
    cache
  };
};

// src/exports.js
export * from "@apollo/client";
var exports_default = createGraphQLClient_default;
export {
  createGraphQLClient_default as createGraphQLClient,
  createGraphQLLinks_default as createGraphQLLinks,
  exports_default as default
};
