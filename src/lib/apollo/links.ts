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
  let orgId = "";
  let isPlatformAdmin = false;
  let membershipOrgIds: string[] = [];

  if (typeof window === "undefined") {
    // Server-side (SSR)
    const { getServerSession } = await import("next-auth/next");
    const { cookies } = await import("next/headers");
    const { authOptions } = await import("@/lib/next-auth/authOptions");
    const session = await getServerSession(authOptions);
    token = session?.accessToken || "";
    orgId = (await cookies()).get("x-org-id")?.value ?? "";
    isPlatformAdmin = !!session?.user?.isPlatformAdmin;
    membershipOrgIds = (session?.user?.memberships ?? []).map(
      (membership) => membership.organization.id,
    );
  } else {
    // Client-side
    const { getSession } = await import("next-auth/react");
    const session = await getSession();
    token = session?.accessToken || "";
    orgId = localStorage.getItem("medistock.activeOrgId") ?? "";
    isPlatformAdmin = !!session?.user?.isPlatformAdmin;
    membershipOrgIds = (session?.user?.memberships ?? []).map(
      (membership) => membership.organization.id,
    );
  }

  if (isPlatformAdmin) {
    if (typeof window !== "undefined" && orgId) {
      localStorage.removeItem("medistock.activeOrgId");
    }
    orgId = "";
  } else if (orgId && !membershipOrgIds.includes(orgId)) {
    if (typeof window !== "undefined") {
      localStorage.removeItem("medistock.activeOrgId");
    }
    orgId = "";
  }

  return {
    headers: {
      ...prevContext.headers,
      authorization: token ? `Bearer ${token}` : "",
      ...(orgId ? { "x-org-id": orgId } : {}),
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
