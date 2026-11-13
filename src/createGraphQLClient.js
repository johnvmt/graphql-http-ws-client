import { InMemoryCache } from "@apollo/client";
import { LocalState } from "@apollo/client/local-state";
import ApolloClientWithGQL from "./ApolloClientWithGQL.js";
import createGraphQLLinks from "./createGraphQLLinks.js";

export default (graphQLURL, options = {}) => {
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
