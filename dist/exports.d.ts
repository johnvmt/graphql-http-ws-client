import { InMemoryCache } from '@apollo/client/cache/cache.cjs';
export * from '@apollo/client/cache/cache.cjs';
import { ApolloClient } from '@apollo/client/core/core.cjs';
export * from '@apollo/client/core/core.cjs';
import gql from 'graphql-tag';
import { getMainDefinition } from '@apollo/client/utilities/utilities.cjs';
import { split, concat } from '@apollo/client/link/core/core.cjs';
export * from '@apollo/client/link/core/core.cjs';
import { RetryLink } from '@apollo/client/link/retry/retry.cjs';
import { HttpLink } from '@apollo/client/link/http/http.cjs';
import { setContext } from '@apollo/client/link/context/context.cjs';
import { WebSocketLink } from '@apollo/client/link/ws/ws.cjs';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions/subscriptions.cjs';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { createClient } from 'graphql-ws';

class ApolloClientWithGQL extends ApolloClient {
    /**
     * Wrap query with gql(), if passed query is a string
     * @param options
     * @param args
     * @returns {*|Promise<PermissionStatus>}
     */
    query(options, ...args) {
        return ApolloClient.prototype.query.apply(this, [
            {
                ...options,
                query: (typeof options.query === "string") ? gql(options.query) : options.query // wrap query with gql, if query is a string
            }
            , ...args]
        );
    }

    /**
     * Wrap query with gql(), if passed query is a string
     * @param options
     * @param args
     * @returns {*|{unsubscribe: () => void}|AsyncIterator<ExecutionResult>|Promise<AsyncIterator<ExecutionResult> | ExecutionResult>|void|(() => void)|ZenObservable.Subscription|ZenObservable.Subscription|Promise<PushSubscription>}
     */
    subscribe(options, ...args) {
        return ApolloClient.prototype.subscribe.apply(this, [
            {
                ...options,
                query: (typeof options.query === "string") ? gql(options.query) : options.query // wrap query with gql, if query is a string
            }
            , ...args]
        );
    }

    /**
     * Wrap mutation with gql(), if passed mutation is a string
     * @param options
     * @param args
     * @returns {*}
     */
    mutate(options, ...args) {
        return ApolloClient.prototype.mutate.apply(this, [
            {
                ...options,
                mutation: (typeof options.mutation === "string") ? gql(options.mutation) : options.mutation // wrap mutation with gql, if mutation is a string
            }
            , ...args]
        );
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
		const authLink = mergedOptions.httpLinkOptions?.setContext
			? setContext(mergedOptions.httpLinkOptions?.setContext)
			: undefined;

		const httpLinkOptions = {
			uri: graphQLURL,
			...mergedOptions.httpLinkOptions
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
		transportLink = split(({ query }) => {
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
		link: concat(...links),
		httpLink: httpLink,
		wsLink: wsLink,
		transportLink: transportLink,
		retryLink: retryLink,
		subscriptionClient: subscriptionClient
	};
};

var createGraphQLClient = (graphQLURL, passedOptions = {}) => {
	const options = {
		resolvers: {},
		...passedOptions
	};

	const links = createGraphQLLinks(graphQLURL, options);

	const defaultApolloOptions = (typeof options.defaultApolloOptions === 'object' && options.defaultApolloOptions !== null) ? options.defaultApolloOptions : {};

	const cache = (typeof options.cache === 'object' && options.cache !== null) ? options.cache : new InMemoryCache();

	const client = new ApolloClientWithGQL({
		cache: cache,
		link: links.link,
		defaultOptions: defaultApolloOptions,
		resolvers: options.resolvers
	});

	return {
		...links,
		client: client,
		cache: cache
	};
};

export { createGraphQLClient, createGraphQLLinks, createGraphQLClient as default };
