import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";
// @ts-ignore
import apolloLogger from "apollo-link-logger";
import fetch from "isomorphic-unfetch";
import { getEndpoint } from "./request";
import { store } from "./store";

let middlewareLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: { authorization: `Bearer ${store.getState().base.authToken}` }
  });
  return forward(operation);
});

if (__DEV__) {
  middlewareLink = middlewareLink.concat(apolloLogger);
}

// use with apollo-client
const link = middlewareLink.concat(
  new HttpLink({
    uri: getEndpoint("api-gateway/"),
    fetch
  })
);

export const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache()
});
