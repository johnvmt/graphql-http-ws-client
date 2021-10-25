## GraphQL client over HTTP/WS

### Node.js with HTTP and WS links

	import { createGraphQLClient } from "graphql-http-ws-client";
	import WebSocket from "ws";
	import fetch from "node-fetch";
	
	const { client } = createGraphQLClient("MY_GRAPHQL_URL", {
		websocket: WebSocket,
		httpLinkOptions: {
            fetch: fetch
        }
	});

### Node.js with HTTP link only (no Subscriptions)

	import { createGraphQLClient } from "graphql-http-ws-client";
	import fetch from "node-fetch";
	
	const { client } = createGraphQLClient("MY_GRAPHQL_URL", {
		httpLinkOptions: {
		    fetch: fetch
		},
		createWSLink: false
	});

### Node.js with WS link only

	import { createGraphQLClient } from "graphql-http-ws-client";
	import WebSocket from "ws";
	import fetch from "node-fetch";
	
	const { client } = createGraphQLClient("MY_GRAPHQL_URL", {
		websocket: WebSocket,
		createHTTPLink: false
	});
	
### React with HTTP and WS links

	import WebSocket from "ws";
	import fetch from "node-fetch";
	import {createGraphQLClient, gql} from "graphql-http-ws-client";
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

### Simple Queries

Using the [server example from graphql-http-ws-server](https://github.com/johnvmt/graphql-http-ws-server#readme)

    client.query({
        query: `query {
            hello
        }`
    }).then(({data}) => {
        console.log("DATA", data);
    });

### Simple Subscriptions

Using the [server example from graphql-http-ws-server](https://github.com/johnvmt/graphql-http-ws-server#readme)

    client.subscribe({
        query: `subscription {
            time
        }`
    }).subscribe({
        next({data}) {
            console.log(data);
        }
    });
    
### Changes

#### v2.0

- Changed package type to module
- Passed-in queries and mutations are now automatically wrapped with gql() tag, if they are not already wrapped

#### v0.3

- Queries and mutations can now be passed as strings instead of being wrapped in the `gql` tag

#### v0.2
- Module now requires graphql and subscriptions-transport-ws as peer dependencies
- Module now exports gql and all exports from @apollo/client/core
- Renamed createWebsocketLink to createWSLink and websocket option to ws for consistency with options
- New httpLinkOptions and wsLinkOptions parameters
    - fetch option moves to httpLinkOptions option
    - all ws link options move to wsLinkOptions option