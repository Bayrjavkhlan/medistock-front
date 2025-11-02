import { ApolloClient, InMemoryCache } from "@apollo/client";

import { httpLink } from "./links";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        items: {
          keyArgs: false,
          merge(existing = [], incoming: unknown[]) {
            return [...existing, ...incoming];
          },
        },
      },
    },
  },
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});
