import { ApolloClient, InMemoryCache } from "@apollo/client";

import { authLink, errorLink, httpLink } from "./links";

let apolloClient: ApolloClient<any> | null = null;

const createClient = () => {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: errorLink.concat(authLink).concat(httpLink),
    cache: new InMemoryCache({
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
    }),
  });
};

export const getApolloClient = () => {
  if (typeof window === "undefined") {
    return createClient();
  }
  if (!apolloClient) {
    apolloClient = createClient();
  }
  return apolloClient;
};
