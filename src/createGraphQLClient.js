import { InMemoryCache } from "@apollo/client/cache/cache.cjs.js";
import ApolloClientWithGQL from "./ApolloClientWithGQL.js";
import createGraphQLLinks from "./createGraphQLLinks.js";

export default (graphQLURL, passedOptions = {}) => {
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
