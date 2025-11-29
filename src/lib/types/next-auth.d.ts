import "next-auth";
import "next-auth/jwt";
import type { EnumStaffRole, Role } from "@/generated/graphql";

declare module "next-auth" {
  interface Session {
    staff: {
      id: string;
      name: string;
      email: string;
      phone: string | null;
      roleKey: EnumStaffRole;
      roles: Role[];
      resetPasswordToken: string | null;
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
    roleKey: EnumStaffRole;
    roles: Role[];
    resetPasswordToken: string | null;
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
    roleKey: EnumStaffRole;
    roles: Role[];
    resetPasswordToken: string | null;
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresAt: number;
    error?: string;
  }
}
