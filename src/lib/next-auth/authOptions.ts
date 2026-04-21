import type { NextAuthOptions } from "next-auth";
import type { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

import type { UserMembership } from "@/generated/graphql";

const refreshAccessToken = async (token: JWT): Promise<JWT> => {
  // For testing: just extend the token
  return {
    ...token,
    accessTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
  };
};

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET || "medistock-front-local-secret",
  session: { strategy: "jwt", maxAge: 24 * 60 * 60 },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(_credentials) {
        // For testing: always return mock admin user without backend call
        return {
          id: "mock-admin-id",
          name: "Test Admin",
          email: "admin@test.com",
          phone: null,
          isPlatformAdmin: true,
          memberships: [],
          accessToken: "mock-token",
          refreshToken: "mock-refresh",
          accessTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
        };
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
      session.user = {
        id: token.id as string,
        name: token.name as string,
        email: token.email as string,
        phone: token.phone as string,
        isPlatformAdmin: token.isPlatformAdmin as boolean,
        memberships: token.memberships as UserMembership[],
      };
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      session.accessTokenExpiresAt = token.accessTokenExpiresAt as number;
      return session;
    },
  },
  pages: { signIn: "/login" },
};
