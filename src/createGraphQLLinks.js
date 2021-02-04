import {concat, split} from '@apollo/client/link/core/core.cjs.js';
import {WebSocketLink} from "@apollo/client/link/ws/ws.cjs.js";
import {HttpLink} from "@apollo/client/link/http/http.cjs.js";
import {RetryLink} from "@apollo/client/link/retry/retry.cjs.js";
import {getMainDefinition} from "@apollo/client/utilities/utilities.cjs.js"
import { SubscriptionClient } from "subscriptions-transport-ws";

// TODO allow override of fetch options as in https://www.apollographql.com/docs/link/links/http/

export default (graphQLURL, passedOptions) => {
	const options = {
		createHTTPLink: true,
		createWSLink: true,
		...passedOptions
	};

	const httpURLToWS = (url) => {
		return url.replace(/(http)(s)?:\/\//, "ws$2://");
	};

	let httpLink = null;
	
	if(options.createHTTPLink) {
		const httpLinkOptions = {
			uri: graphQLURL,
		...options.httpLinkOptions
		};

		if(typeof httpLinkOptions.fetch !== 'function' && (typeof window !== 'object' || typeof window.fetch !== 'function'))
			throw new Error(`Missing fetch implementation on window.fetch or options.httpLinkOptions.fetch`);

		httpLink = new HttpLink(httpLinkOptions);
	}

	let wsLink = null;
	let subscriptionClient = null;
	if(options.createWSLink) {
		const wsLinkOptions = {
			reconnect: true,
			...options.wsLinkOptions
		};

		if(typeof options.ws !== 'function' && (typeof window !== 'object' || typeof window.WebSocket !== 'function'))
			throw new Error(`Missing websocket implementation on window.WebSocket or options.websocket`);

		const websocketImplementation = (typeof options.ws === 'function') ? options.ws : window.WebSocket;

		subscriptionClient = new SubscriptionClient(httpURLToWS(graphQLURL), wsLinkOptions, websocketImplementation);
		
		wsLink = new WebSocketLink(subscriptionClient);
	}

	let transportLink = null;
	if(httpLink !== null && wsLink !== null) { // httpLink and websocketLink exist
		transportLink = split(({ query }) => {
				const { kind, operation } = getMainDefinition(query);
				return kind === 'OperationDefinition' && operation === 'subscription';
			},
			wsLink,
			httpLink);
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
		link: options.hasOwnProperty('middleware') ? concat(options.middleware, link) : link,
		httpLink: httpLink,
		wsLink: wsLink,
		transportLink: transportLink,
		retryLink: retryLink,
		subscriptionClient: subscriptionClient
	};
}