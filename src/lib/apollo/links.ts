import { HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context"; // ← FIXED
import { ErrorLink } from "@apollo/client/link/error";
import { getSession, signOut } from "next-auth/react";

import { env } from "@/constants/config";

export const httpLink = new HttpLink({
  uri: `${env.BACKEND_URL}/api/graphql`,
  credentials: "include",
});

export const authLink = setContext(async (_, { headers }) => {
  const session = await getSession();
  const token = session?.accessToken;
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const errorLink = new ErrorLink(
  ({ graphQLErrors, networkError, forward, operation }) => {
    if (graphQLErrors) {
      for (const { message, extensions, locations, path } of graphQLErrors) {
        console.log(`[GraphQL error]: Message: ${message}`);
        console.log("extention.code:\t", extensions?.code);

        switch (extensions?.code) {
          case "INVALID_ACCESS_TOKEN":
          case "REFRESH_TOKEN_EXPIRED":
          case "INVALID_REFRESH_TOKEN":
          case "NOT_AUTHORIZED": {
            console.log("Signing out due to auth error...");
          }
          case "ACCESS_DENIED":
            // signOut({ redirect: true, callbackUrl: "/login" });
            window.location.href = "/login";
            return forward(operation);
          default:
            console.error(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            );
        }
      }
    }

    if (networkError) {
      console.error(`[Network error]: ${networkError}`);
      signOut({ redirect: true, callbackUrl: "/login" });
    }
  },
);
