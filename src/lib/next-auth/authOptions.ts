import type { NextAuthOptions } from "next-auth";
import type { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

import type { EnumStaffRole, Role } from "@/generated/graphql";
import { LoginDocument, RefreshAccessTokenDocument } from "@/generated/graphql";

import { getApolloClient } from "../apollo/ApolloClient";

const refreshAccessToken = async (token: JWT): Promise<JWT> => {
  try {
    const { data } = await getApolloClient().mutate({
      mutation: RefreshAccessTokenDocument,
      variables: { refreshToken: token.refreshToken },
      fetchPolicy: "network-only",
    });

    const payload = data?.refreshAccessToken;
    if (!payload?.staff?.id) throw new Error("Invalid refresh token");

    return {
      ...token,
      id: payload.staff.id,
      name: payload.staff.name ?? null,
      email: payload.staff.email,
      phone: payload.staff.phone ?? null,
      roleKey: payload.staff.roleKey,
      roles: payload.staff.roles,
      resetPasswordToken: payload.staff.resetPasswordToken ?? null,
      accessToken: payload.accessToken,
      refreshToken: payload.refreshToken,
      accessTokenExpiresAt: Number(payload.accessTokenExpiresAt),
    };
  } catch (error) {
    console.error("[NextAuth] Token refresh failed:", error);
    return { ...token, error: "RefreshAccessTokenError" };
  }
};

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt", maxAge: 24 * 60 * 60 },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const { data } = await getApolloClient().mutate({
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
          if (!payload?.staff?.id) return null;

          return {
            id: payload.staff.id,
            name: payload.staff.name ?? null,
            email: payload.staff.email,
            phone: payload.staff.phone ?? null,
            roleKey: payload.staff.roleKey,
            roles: payload.staff.roles,
            resetPasswordToken: payload.staff.resetPasswordToken ?? null,
            accessToken: payload.accessToken,
            refreshToken: payload.refreshToken,
            accessTokenExpiresAt: Number(payload.accessTokenExpiresAt),
          };
        } catch (error) {
          console.error("[NextAuth] Login failed:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) return { ...token, ...user };
      if (Date.now() < (token.accessTokenExpiresAt as number)) return token;
      return refreshAccessToken(token);
    },

    async session({ session, token }) {
      session.staff = {
        id: token.id as string,
        name: token.name as string,
        email: token.email as string,
        phone: token.phone as string,
        roleKey: token.roleKey as EnumStaffRole,
        roles: token.roles as Role[],
        resetPasswordToken: token.resetPasswordToken as string,
      };
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      session.accessTokenExpiresAt = token.accessTokenExpiresAt as number;
      return session;
    },
  },
  pages: { signIn: "/login" },
};
