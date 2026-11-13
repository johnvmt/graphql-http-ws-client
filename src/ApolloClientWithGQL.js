import { ApolloClient, gql } from "@apollo/client";

/**
 * Wrap options[key] with gql(), if it is a string
 * @param options
 * @param key
 * @returns {*}
 */
const parseDocumentOption = (options, key) => {
    return (typeof options?.[key] === "string")
        ? { ...options, [key]: gql(options[key]) }
        : options;
};

class ApolloClientWithGQL extends ApolloClient {
    constructor(...args) {
        super(...args);

        // Apollo Client 4 defines some of these as instance fields, which shadow prototype methods
        // on a subclass, so the instance's own functions are wrapped instead
        const query = this.query;
        const subscribe = this.subscribe;
        const mutate = this.mutate;

        this.query = (options, ...rest) => query.call(this, parseDocumentOption(options, "query"), ...rest);
        this.subscribe = (options, ...rest) => subscribe.call(this, parseDocumentOption(options, "query"), ...rest);
        this.mutate = (options, ...rest) => mutate.call(this, parseDocumentOption(options, "mutation"), ...rest);
    }
}

export default ApolloClientWithGQL;