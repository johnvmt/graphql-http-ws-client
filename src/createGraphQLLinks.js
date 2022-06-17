import { getMainDefinition } from "@apollo/client/utilities/utilities.cjs";
import { concat, split } from "@apollo/client/link/core/core.cjs";
import { RetryLink } from "@apollo/client/link/retry/retry.cjs";
import { HttpLink } from "@apollo/client/link/http/http.cjs";
import { setContext } from '@apollo/client/link/context/context.cjs';
import { WebSocketLink } from "@apollo/client/link/ws/ws.cjs";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions/subscriptions.cjs";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { createClient } from "graphql-ws";

// TODO allow override of fetch options as in https://www.apollographql.com/docs/link/links/http/

export default (graphQLURL, options) => {
	const mergedOptions = {
		createHTTPLink: true,
		createWSLink: true,
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

		if(typeof httpLinkOptions.fetch !== 'function' && (typeof window !== 'object' || typeof window.fetch !== 'function'))
			throw new Error(`Missing fetch implementation on window.fetch or options.httpLinkOptions.fetch`);

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

	const retryLink = new RetryLink({
		attempts: {
			max: Infinity
		}
	});

	const link = concat(retryLink, transportLink);

	return {
		link: options.hasOwnProperty('middleware')
			? concat(options.middleware, link)
			: link,
		httpLink: httpLink,
		wsLink: wsLink,
		transportLink: transportLink,
		retryLink: retryLink,
		subscriptionClient: subscriptionClient
	};
}
