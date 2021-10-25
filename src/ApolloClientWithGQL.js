import { ApolloClient } from "@apollo/client/core/core.cjs.js";
import gql from "graphql-tag";

class ApolloClientWithGQL extends ApolloClient {
    /**
     * Wrap query with gql(), if passed query is a string
     * @param options
     * @param args
     * @returns {*|Promise<PermissionStatus>}
     */
    query(options, ...args) {
        return ApolloClient.prototype.query.apply(this, [
            {
                ...options,
                query: (typeof options.query === "string") ? gql(options.query) : options.query // wrap query with gql, if query is a string
            }
            , ...args]
        );
    }

    /**
     * Wrap query with gql(), if passed query is a string
     * @param options
     * @param args
     * @returns {*|{unsubscribe: () => void}|AsyncIterator<ExecutionResult>|Promise<AsyncIterator<ExecutionResult> | ExecutionResult>|void|(() => void)|ZenObservable.Subscription|ZenObservable.Subscription|Promise<PushSubscription>}
     */
    subscribe(options, ...args) {
        return ApolloClient.prototype.subscribe.apply(this, [
            {
                ...options,
                query: (typeof options.query === "string") ? gql(options.query) : options.query // wrap query with gql, if query is a string
            }
            , ...args]
        );
    }

    /**
     * Wrap mutation with gql(), if passed mutation is a string
     * @param options
     * @param args
     * @returns {*}
     */
    mutate(options, ...args) {
        return ApolloClient.prototype.mutate.apply(this, [
            {
                ...options,
                mutation: (typeof options.mutation === "string") ? gql(options.mutation) : options.mutation // wrap mutation with gql, if mutation is a string
            }
            , ...args]
        );
    }
}

export default ApolloClientWithGQL;