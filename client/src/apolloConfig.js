import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { ApolloClient, InMemoryCache, split, HttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_BASE_HTTP_URL,
  credentials: "include",
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: process.env.REACT_APP_BASE_WS_URL,
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      (definition.kind === "OperationDefinition" &&
        definition.operation === "subscription") ||
      definition.name.value === "OnlineUserIds"
    );
  },
  wsLink,
  httpLink
);

const errorLink = onError(({ networkError, operation, forward }) => {
  if (networkError) {
    if (operation.operationName === "OnlineUserIds") {
      console.log(operation);
    }
  }
  // if (networkError?.message === "Not authenticated!") {
  // }
});

export const client = new ApolloClient({
  link: from([errorLink, splitLink]),
  cache: new InMemoryCache(),
});
