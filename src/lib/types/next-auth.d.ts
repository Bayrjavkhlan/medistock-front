import "next-auth";
import "next-auth/jwt";
import type { UserMembership } from "@/generated/graphql";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      phone: string | null;
      isPlatformAdmin: boolean;
      memberships: UserMembership[];
    };
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresAt: number;
  }

  interface User {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    isPlatformAdmin: boolean;
    memberships: UserMembership[];
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresAt: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    isPlatformAdmin: boolean;
    memberships: UserMembership[];
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresAt: number;
    error?: string;
  }
}
