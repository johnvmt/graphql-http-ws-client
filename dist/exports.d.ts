import { ApolloClient, gql, HttpLink, ApolloLink, InMemoryCache } from '@apollo/client';
export * from '@apollo/client';
import { LocalState } from '@apollo/client/local-state';
import { getMainDefinition } from '@apollo/client/utilities';
import { RetryLink } from '@apollo/client/link/retry';
import { SetContextLink } from '@apollo/client/link/context';
import { WebSocketLink } from '@apollo/client/link/ws';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { createClient } from 'graphql-ws';

/**
 * Wrap options[key] with gql(), if it is a string
 * @param options
 * @param key
 * @returns {*}
 */
const parseDocumentOption = (options, key) => {
    return (typeof options?.[key] === "string")
        ? { ...options, [key]: gql(options[key]) }
        : options;
};

class ApolloClientWithGQL extends ApolloClient {
    constructor(...args) {
        super(...args);

        // Apollo Client 4 defines some of these as instance fields, which shadow prototype methods
        // on a subclass, so the instance's own functions are wrapped instead
        const query = this.query;
        const subscribe = this.subscribe;
        const mutate = this.mutate;

        this.query = (options, ...rest) => query.call(this, parseDocumentOption(options, "query"), ...rest);
        this.subscribe = (options, ...rest) => subscribe.call(this, parseDocumentOption(options, "query"), ...rest);
        this.mutate = (options, ...rest) => mutate.call(this, parseDocumentOption(options, "mutation"), ...rest);
    }
}

// TODO allow override of fetch options as in https://www.apollographql.com/docs/link/links/http/

var createGraphQLLinks = (graphQLURL, options) => {
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
	if(mergedOptions.createHTTPLink) {
		const { setContext: contextSetter, ...passedHTTPLinkOptions } = mergedOptions.httpLinkOptions ?? {};

		// contextSetter keeps the (operation, prevContext) order callers already pass
		const authLink = contextSetter
			? new SetContextLink((prevContext, operation) => contextSetter(operation, prevContext))
			: undefined;

		const httpLinkOptions = {
			uri: graphQLURL,
			...passedHTTPLinkOptions
		};

		if(typeof httpLinkOptions.fetch !== 'function' && (typeof fetch !== 'function'))
			throw new Error(`Missing fetch implementation from node or window.fetch or options.httpLinkOptions.fetch`);

		httpLink = authLink
			? authLink.concat(new HttpLink(httpLinkOptions)) // add auth link before http link
			: new HttpLink(httpLinkOptions); // no auth link
	}

	let wsLink = null;
	let subscriptionClient = null;
	if(mergedOptions.createWSLink) {
		const wsSubprotocol = mergedOptions.wsSubprotocol
			? mergedOptions.wsSubprotocol.toLowerCase()
			: 'graphql-ws';

		const wsLinkOptions = {
			reconnect: true,
			...mergedOptions.wsLinkOptions,
			// override connectionParams to add subprotocol header
			connectionParams: async (...args) => { // add subprotocol
				const params = mergedOptions.wsLinkOptions?.connectionParams
					? await mergedOptions.wsLinkOptions?.connectionParams(...args)
					: {};

				// merge in subprotocol headers
				return {
					...params,
					headers: {
						"sec-websocket-protocol": wsSubprotocol,
						...params.headers
					}
				}
			}
		};

		if(typeof options.websocket !== 'function' && (typeof window !== 'object' || typeof window.WebSocket !== 'function'))
			throw new Error(`Missing websocket implementation on window.WebSocket or options.websocket`);

		const websocketImplementation = typeof options.websocket === 'function'
			? options.websocket
			: window.WebSocket;

		if(wsSubprotocol === 'graphql-transport-ws') { // graphql-transport-ws, from graphql-ws
			subscriptionClient = createClient({
				webSocketImpl: websocketImplementation,
				url: httpURLToWS(graphQLURL),
				...wsLinkOptions
			});
			wsLink = new GraphQLWsLink(subscriptionClient);
		}
		else if(wsSubprotocol === 'graphql-ws') { // graphql-ws, from subscriptions-transport-ws
			subscriptionClient = new SubscriptionClient(httpURLToWS(graphQLURL), wsLinkOptions, websocketImplementation);
			wsLink = new WebSocketLink(subscriptionClient);
		}
		else
			throw new Error(`Unknown wsSubprotocol`);
	}

	let transportLink = null;
	if(httpLink !== null && wsLink !== null) { // httpLink and wsLink exist
		transportLink = ApolloLink.split(({ query }) => {
				const { kind, operation } = getMainDefinition(query);
				return kind === 'OperationDefinition' && operation === 'subscription';
			},
			wsLink,
			httpLink
		);
	}
	else if(wsLink !== null) // only websocketLink exists
		transportLink = wsLink;
	else if(httpLink !== null) // only httpLink (no Subscriptions)
		transportLink = httpLink;

	let retryLink;
	if(mergedOptions.createRetryLink) {
		retryLink = new RetryLink({
			...mergedOptions.retryLinkOptions
		});
	}

	const links = [transportLink];

	if(retryLink)
		links.unshift(retryLink);

	if(mergedOptions.middleware)
		links.unshift(mergedOptions.middleware);

	return {
		link: ApolloLink.from(links),
		httpLink: httpLink,
		wsLink: wsLink,
		transportLink: transportLink,
		retryLink: retryLink,
		subscriptionClient: subscriptionClient
	};
};

var createGraphQLClient = (graphQLURL, options = {}) => {
	const links = createGraphQLLinks(graphQLURL, options);

	const defaultApolloOptions = (typeof options.defaultApolloOptions === 'object' && options.defaultApolloOptions !== null) ? options.defaultApolloOptions : {};

	const cache = (typeof options.cache === 'object' && options.cache !== null) ? options.cache : new InMemoryCache();

	const clientOptions = {
		cache: cache,
		link: links.link,
		defaultOptions: defaultApolloOptions
	};

	// Apollo Client 4 takes local resolvers through LocalState rather than a resolvers option
	if(options.resolvers)
		clientOptions.localState = new LocalState({ resolvers: options.resolvers });

	const client = new ApolloClientWithGQL(clientOptions);

	return {
		...links,
		client: client,
		cache: cache
	};
};

export { createGraphQLClient, createGraphQLLinks, createGraphQLClient as default };
