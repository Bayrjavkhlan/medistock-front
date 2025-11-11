import { HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";

import { env } from "@/constants/config";

export const httpLink = new HttpLink({
  uri: `${env.BACKEND_URL}/api/graphql`,
  credentials: "include",
});

export const authLink = setContext(async (_, { headers }) => {
  let token = "";

  if (typeof window === "undefined") {
    const { getServerSession } = await import("next-auth/next");
    const { authOptions } = await import("@/lib/next-auth/authOptions");
    const session = await getServerSession(authOptions);
    token = session?.accessToken || "";
  } else {
    const { getSession } = await import("next-auth/react");
    const session = await getSession();
    token = session?.accessToken || "";
  }

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (typeof window === "undefined") return;

  const authErrorCodes = [
    "INVALID_ACCESS_TOKEN",
    "REFRESH_TOKEN_EXPIRED",
    "INVALID_REFRESH_TOKEN",
    "NOT_AUTHORIZED",
    "ACCESS_DENIED",
  ] as const;

  type AuthErrorCode = (typeof authErrorCodes)[number];

  const hasAuthError = graphQLErrors?.some((err) => {
    const code = err.extensions?.code;
    console.log("GraphQL Error Code:", code);
    return (
      typeof code === "string" && authErrorCodes.includes(code as AuthErrorCode)
    );
  });

  if (hasAuthError) {
    console.log("[Auth Error] Redirecting to /login");
    window.location.href = "/login";
    return;
  }

  if (networkError) {
    console.error("[Network Error]", networkError);
    window.location.href = "/login";
  }
});
