import { ApolloClient } from "apollo-client";
import { getMainDefinition } from "apollo-utilities";
import { InMemoryCache } from "apollo-cache-inmemory";
import createGraphQLLinks from "./createGraphQLLinks";

export default (graphQLURL, passedOptions = {}) => {
	const options = Object.assign({
		resolvers: {}
	}, passedOptions);

	const links = createGraphQLLinks(graphQLURL, options);

	const defaultApolloOptions = (typeof options.defaultApolloOptions === 'object' && options.defaultApolloOptions !== null) ? options.defaultApolloOptions : {};

	const cache = (typeof options.cache === 'object' && options.cache !== null) ? options.cache : new InMemoryCache();

	const client = new ApolloClient({
		cache: cache,
		link: links.link,
		defaultOptions: defaultApolloOptions,
		resolvers: options.resolvers
	});

	return Object.assign(links, {
		client: client,
		cache: cache
	});
}
