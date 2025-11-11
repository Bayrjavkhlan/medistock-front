import type { NextAuthOptions } from "next-auth";
import type { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

import { LoginDocument, RefreshAccessTokenDocument } from "@/generated/graphql";
import type { EnumUserRole, Role } from "@/generated/graphql";

import { getApolloClient } from "../apollo/ApolloClient";

/**
 * Interface: Backend login response shape
 */
interface BackendLoginPayload {
  login: {
    user: {
      id: string;
      name: string | null;
      email: string;
      phone: string | null;
      roleKey: EnumUserRole;
      roles: Role[];
      //   permissions: Permission[];
      resetPasswordToken?: string | null;
    };
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresAt: string;
  };
}

/**
 * Interface: Backend refresh token response shape
 */
interface BackendRefreshPayload {
  refreshAccessToken: {
    user: {
      id: string;
      name: string | null;
      email: string;
      phone: string | null;
      roleKey: EnumUserRole;
      roles: Role[];
      //   permissions: Permission[];
      resetPasswordToken?: string | null;
    };
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresAt: string;
  };
}

/**
 * Refresh access token using stored refreshToken in JWT
 */
const refreshAccessToken = async (token: JWT): Promise<JWT> => {
  try {
    const { data } = await getApolloClient().mutate<BackendRefreshPayload>({
      mutation: RefreshAccessTokenDocument,
      variables: { refreshToken: token.refreshToken as string },
      fetchPolicy: "network-only",
    });

    const payload = data?.refreshAccessToken;
    if (!payload?.user?.id) {
      return { ...token, error: "RefreshTokenInvalid" };
    }

    return {
      ...token,
      id: payload.user.id,
      name: payload.user.name || undefined,
      email: payload.user.email,
      phone: payload.user.phone || undefined,
      roleKey: payload.user.roleKey,
      roles: payload.user.roles,
      //   permissions: payload.user.permissions,
      resetPasswordToken: payload.user.resetPasswordToken ?? "",
      accessToken: payload.accessToken,
      refreshToken: payload.refreshToken,
      accessTokenExpiresAt: Number(payload.accessTokenExpiresAt),
    };
  } catch (error) {
    console.error("[NextAuth] Token refresh failed:", error);
    return { ...token, error: "RefreshAccessTokenError" };
  }
};

/**
 * NextAuth Configuration
 */
export const authOptions: NextAuthOptions = {
  // Session Strategy
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 1 day
  },

  // Authentication Providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const { data } = await getApolloClient().mutate<BackendLoginPayload>({
            mutation: LoginDocument,
            variables: {
              input: {
                email: credentials.email,
                password: credentials.password,
              },
            },
            fetchPolicy: "network-only",
          });

          const payload = data?.login;
          if (!payload?.user?.id) return null;

          return {
            id: payload.user.id,
            name: payload.user.name,
            email: payload.user.email,
            phone: payload.user.phone,
            roleKey: payload.user.roleKey,
            roles: payload.user.roles,
            // permissions: payload.user.permissions,
            resetPasswordToken: payload.user.resetPasswordToken ?? "",
            accessToken: payload.accessToken,
            refreshToken: payload.refreshToken,
            accessTokenExpiresAt: Number(payload.accessTokenExpiresAt),
          };
        } catch (error) {
          console.error("[NextAuth] Login mutation failed:", error);
          return null;
        }
      },
    }),
  ],

  // Callbacks
  callbacks: {
    /**
     * JWT Callback: Persist user + tokens + auto-refresh
     */
    async jwt({ token, user, trigger, session }) {
      // Initial sign-in
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.phone = user.phone;
        token.roleKey = user.roleKey;
        token.roles = user.roles;
        // token.permissions = user.permissions;
        token.resetPasswordToken = user.resetPasswordToken;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.accessTokenExpiresAt = user.accessTokenExpiresAt;
      }

      // Manual session update (e.g., profile edit)
      if (trigger === "update" && session) {
        token.name = session.user.name;
        token.email = session.user.email;
        token.phone = session.user.phone;
        token.image = session.user.image;
      }

      // Check if access token is still valid
      const expiresAt = token.accessTokenExpiresAt as number;
      if (Date.now() < expiresAt) return token;

      // Refresh if expired
      return await refreshAccessToken(token);
    },

    /**
     * Session Callback: Expose data to client
     */
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.name = token.name as string | undefined;
      session.user.email = token.email as string;
      session.user.phone = token.phone as string | undefined;
      session.user.roleKey = token.roleKey as EnumUserRole;
      session.user.roles = token.roles as Role[];
      //   session.user.permissions = token.permissions as Permission[];
      session.user.resetPasswordToken = token.resetPasswordToken as string;

      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      session.accessTokenExpiresAt = token.accessTokenExpiresAt as number;

      return session;
    },
  },

  // Custom Pages
  pages: {
    signIn: "/login",
  },
};
