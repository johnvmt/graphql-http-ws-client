"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _coreCjs = require("@apollo/client/core/core.cjs.js");

class ApolloClientWithGQL extends _coreCjs.ApolloClient {
  /**
   * Wrap query with gql(), if passed query is a string
   * @param options
   * @param args
   * @returns {*|Promise<PermissionStatus>}
   */
  query(options, ...args) {
    return _coreCjs.ApolloClient.prototype.query.apply(this, [{ ...options,
      query: typeof options.query === "string" ? (0, _coreCjs.gql)(options.query) : options.query // wrap query with gql, if query is a string

    }, ...args]);
  }
  /**
   * Wrap query with gql(), if passed query is a string
   * @param options
   * @param args
   * @returns {*|{unsubscribe: () => void}|AsyncIterator<ExecutionResult>|Promise<AsyncIterator<ExecutionResult> | ExecutionResult>|void|(() => void)|ZenObservable.Subscription|ZenObservable.Subscription|Promise<PushSubscription>}
   */


  subscribe(options, ...args) {
    return _coreCjs.ApolloClient.prototype.subscribe.apply(this, [{ ...options,
      query: typeof options.query === "string" ? (0, _coreCjs.gql)(options.query) : options.query // wrap query with gql, if query is a string

    }, ...args]);
  }
  /**
   * Wrap mutation with gql(), if passed mutation is a string
   * @param options
   * @param args
   * @returns {*}
   */


  mutate(options, ...args) {
    return _coreCjs.ApolloClient.prototype.mutate.apply(this, [{ ...options,
      mutation: typeof options.mutation === "string" ? (0, _coreCjs.gql)(options.mutation) : options.mutation // wrap mutation with gql, if mutation is a string

    }, ...args]);
  }

}

var _default = ApolloClientWithGQL;
exports.default = _default;