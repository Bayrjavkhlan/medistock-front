import type { DefaultUser } from "next-auth";
import type { DefaultJWT } from "next-auth/jwt";

import type { EnumUserRole, Role } from "@/generated";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string;
      email?: string;
      roleKey: EnumUserRole;
      roles: Role[];
      // permissions: Permission[];
      resetPasswordToken?: string;
      phone?: string;
    };
    accessToken?: string;
    accessTokenExpiresAt?: number;
    refreshToken?: string;
  }

  interface User extends DefaultUser {
    id: string;
    name: string;
    email: string;
    roleKey: EnumUserRole;
    roles: Role[];
    // permissions: Permission[];
    resetPasswordToken?: string;
    phone?: string;

    accessToken?: string;
    refreshToken?: string;
    accessTokenExpiresAt?: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id?: string;
    name?: string;
    email?: string;
    roleKey: EnumUserRole;
    roles: Role[];
    // permissions: Permission[];
    resetPasswordToken?: string;
    phone?: string;

    accessToken?: string;
    refreshToken?: string;
    accessTokenExpiresAt?: number;
  }
}
