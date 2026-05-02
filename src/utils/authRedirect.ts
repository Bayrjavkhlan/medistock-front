import type { Session } from "next-auth";

import type { UserMembership } from "@/generated/graphql";

export const resolvePostLoginPath = (
  user:
    | Pick<Session["user"], "isPlatformAdmin" | "memberships">
    | null
    | undefined,
  activeMembership?: UserMembership | null,
): string => {
  if (!user) return "/login";
  if (user.isPlatformAdmin) return "/admin/dashboard";

  const membership = activeMembership ?? user.memberships?.[0];
  if (!membership) return "/user/dashboard";

  if (membership.organization.type === "PHARMACY") {
    return membership.role === "STAFF"
      ? "/pharmacy/medicine"
      : "/pharmacy/dashboard";
  }

  if (membership.organization.type === "SUPPLIER") {
    return membership.role === "STAFF"
      ? "/supplier/supply"
      : "/supplier/supply-management";
  }

  return membership.role === "STAFF"
    ? "/hospital/equipment"
    : "/hospital/dashboard";
};
