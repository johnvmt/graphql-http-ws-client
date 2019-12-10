import { ApolloClient } from "apollo-client";
import { concat, split } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { RetryLink } from "apollo-link-retry";
import { getMainDefinition } from "apollo-utilities";
import { InMemoryCache } from "apollo-cache-inmemory";

export default (graphQLURL, passedOptions = {}) => {
	const httpURLToWS = (url) => {
		return url.replace(/(http)(s)?:\/\//, "ws$2://");
	};

	const options = Object.assign({
		createHTTPLink: true,
		createWebsocketLink: true,
		resolvers: {}
	}, passedOptions);

	let httpLink = null;
	if(options.createHTTPLink) {
		if(typeof options.fetch !== 'function' && (typeof window !== 'object' || typeof window.fetch !== 'function'))
			throw new Error(`Missing fetch implementation on window.fetch or options.fetch`);
		const fetchImplementation = (typeof options.fetch === 'function') ? options.fetch : window.fetch;
		httpLink = new HttpLink({ uri: graphQLURL, fetch: fetchImplementation });
	}

	let websocketLink = null;
	let subscriptionClient = null;
	if(options.createWebsocketLink) {
		if(typeof options.websocket !== 'function' && (typeof window !== 'object' || typeof window.WebSocket !== 'function'))
			throw new Error(`Missing websocket implementation on window.WebSocket or options.websocket`);

		const websocketImplementation = (typeof options.websocket === 'function') ? options.websocket : window.WebSocket;
		subscriptionClient = new SubscriptionClient(httpURLToWS(graphQLURL), {
			reconnect: true,
		}, websocketImplementation);
		websocketLink = new WebSocketLink(subscriptionClient);
	}

	let transportLink = null;
	if(httpLink !== null && websocketLink !== null) { // httpLink and websocketLink exist
		transportLink = split(({ query }) => {
				const { kind, operation } = getMainDefinition(query);
				return kind === 'OperationDefinition' && operation === 'subscription';
			},
			websocketLink,
			httpLink);
	}
	else if(websocketLink !== null) // only websocketLink exists
		transportLink = websocketLink;
	else if(httpLink !== null) // only httpLink (no Subscriptions)
		transportLink = httpLink;

	const retryLink = new RetryLink({
		attempts: {
			max: Infinity
		}
	});

	const link = concat(retryLink, transportLink);

	const defaultApolloOptions = (typeof options.defaultApolloOptions === 'object' && options.defaultApolloOptions !== null) ? options.defaultApolloOptions : {};

	const cache = (typeof options.cache === 'object' && options.cache !== null) ? options.cache : new InMemoryCache();

	const client = new ApolloClient({
		cache: cache,
		link: link,
		defaultOptions: defaultApolloOptions,
		resolvers: options.resolvers
	});

	return {
		client: client,
		subscriptionClient: subscriptionClient,
		cache: cache,
		link: link,
		httpLink: httpLink,
		websocketLink: websocketLink,
		retryLink: retryLink
	}
}
