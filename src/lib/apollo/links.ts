import { HttpLink } from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";
import { ErrorLink } from "@apollo/client/link/error";
import type { GraphQLError } from "graphql";

import { env } from "@/constants/config";

type ApolloLikeError = {
  graphQLErrors?: readonly GraphQLError[];
  networkError?: unknown;
};

export const httpLink = new HttpLink({
  uri: `${env.BACKEND_URL}/api/graphql`,
  credentials: "include",
});

export const authLink = new SetContextLink(async (prevContext) => {
  let token = "";

  if (typeof window === "undefined") {
    // Server-side (SSR)
    const { getServerSession } = await import("next-auth/next");
    const { authOptions } = await import("@/lib/next-auth/authOptions");
    const session = await getServerSession(authOptions);
    token = session?.accessToken || "";
  } else {
    // Client-side
    const { getSession } = await import("next-auth/react");
    const session = await getSession();
    token = session?.accessToken || "";
  }

  return {
    headers: {
      ...prevContext.headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const errorLink = new ErrorLink((handler) => {
  if (typeof window === "undefined") return;

  const err = handler.error as ApolloLikeError | null | undefined;

  if (!err) return;

  const graphQLErrors = err.graphQLErrors ?? [];
  const networkError = err.networkError;

  const authErrorCodes = [
    "INVALID_ACCESS_TOKEN",
    "REFRESH_TOKEN_EXPIRED",
    "INVALID_REFRESH_TOKEN",
    "NOT_AUTHORIZED",
    "ACCESS_DENIED",
  ] as const;

  type AuthErrorCode = (typeof authErrorCodes)[number];

  const hasAuthError = graphQLErrors.some((gqlErr) => {
    const code = gqlErr.extensions?.code as string | undefined;
    return !!code && authErrorCodes.includes(code as AuthErrorCode);
  });

  if (hasAuthError) {
    window.location.href = "/login";
    return;
  }

  if (networkError) {
    console.error("[Network Error]", networkError);
  }
});
