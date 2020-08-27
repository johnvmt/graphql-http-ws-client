import { ApolloClient } from "@apollo/client/core";
import { InMemoryCache } from "@apollo/client/cache";
import createGraphQLLinks from "./createGraphQLLinks";

export default (graphQLURL, passedOptions = {}) => {
	const options = {
		resolvers: {},
		...passedOptions
	};

	const links = createGraphQLLinks(graphQLURL, options);

	const defaultApolloOptions = (typeof options.defaultApolloOptions === 'object' && options.defaultApolloOptions !== null) ? options.defaultApolloOptions : {};

	const cache = (typeof options.cache === 'object' && options.cache !== null) ? options.cache : new InMemoryCache();

	const client = new ApolloClient({
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


