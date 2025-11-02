import { ApolloLink, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { getSession, signOut } from "next-auth/react";
import type { GraphQLError } from "graphql";

import { env } from "@/constants/config";

export const httpLink = new HttpLink({
  uri: `${env.BACKEND_URL}/api/graphql`,
  credentials: "include",
});

export const authLink = setContext(async (_, { headers }) => {
  const session = await getSession();
  const token = session?.accessToken;
  return {
    headers: { ...headers, authorization: token ? `Bearer ${token}` : "" },
  };
});

export const errorLink = onError(
  ({
    graphQLErrors,
    networkError,
    operation,
    forward,
  }: {
    graphQLErrors?: readonly GraphQLError[];
    networkError?: Error;
    operation: ApolloLink.Operation;
    forward: ApolloLink.ForwardFunction;
  }) => {
    if (graphQLErrors?.length) {
      for (const { message, locations, path, extensions } of graphQLErrors) {
        switch (extensions?.code) {
          case "INVALID_ACCESS_TOKEN":
          case "REFRESH_TOKEN_EXPIRED":
          case "INVALID_REFRESH_TOKEN":
          case "NOT_AUTHORIZED":
          case "ACCESS_DENIED": {
            signOut({ redirect: true, callbackUrl: "/login" });
            return forward(operation);
          }
          default:
            console.error(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            );
        }
      }
    }

    if (networkError) {
      console.error(`[Network error]: ${networkError}`);
      signOut({ redirect: true, callbackUrl: "/login" });
    }
  }
);
