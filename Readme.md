## GraphQL client over HTTP/WS

### Node.js with HTTP and WS links

	import createGraphQLClient from "graphql-http-ws-client";
	import gql from "graphql-tag";
	import WebSocket from "ws";
	import fetch from "node-fetch";
	
	const { client } = createGraphQLClient("MY_GRAPHQL_URL", {
		websocket: WebSocket,
		fetch: fetch
	});

### Node.js with HTTP link only (no Subscriptions)

	import createGraphQLClient from "graphql-http-ws-client";
	import gql from "graphql-tag";
	import fetch from "node-fetch";
	
	const { client } = createGraphQLClient("MY_GRAPHQL_URL", {
		fetch: fetch,
		createWebsocketLink: false
	});

### Node.js with WS link only

	import createGraphQLClient from "graphql-http-ws-client";
	import gql from "graphql-tag";
	import WebSocket from "ws";
	import fetch from "node-fetch";
	
	const { client } = createGraphQLClient("MY_GRAPHQL_URL", {
		websocket: WebSocket,
		createHTTPLink: false
	});
	
### React with HTTP and WS links

	import WebSocket from "ws";
	import fetch from "node-fetch";
	import createGraphQLClient from "graphql-http-ws-client";
	import gql from "graphql-tag";    
	import { persistCache } from "apollo-cache-persist";
	
	const { client, cache } = createGraphQLClient("MY_GRAPHQL_URL");
	
	const waitOnCache = persistCache({
		cache: cache,
		storage: window.localStorage
	});
	
	waitOnCache.then(() => {
		ReactDOM.render(
			<ApolloProvider client={client}>
				<Router>
					<App/>
				</Router>
			</ApolloProvider>,
			document.getElementById('root')
		)
	});
	