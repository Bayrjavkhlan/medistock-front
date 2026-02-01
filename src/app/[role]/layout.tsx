import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import RoleLayoutComponent from "@/components/layout/RoleLayout";
import type { UserMembership } from "@/generated/graphql";
import { authOptions } from "@/lib/next-auth";

const getRouteRole = (
  activeMembership: UserMembership | null | undefined,
  isPlatformAdmin: boolean | undefined,
) => {
  if (isPlatformAdmin) return "admin";
  if (!activeMembership) return "user";
  return activeMembership.organization.type === "PHARMACY"
    ? "pharmacy"
    : "hospital";
};

export default async function RoleLayout({
  params,
  children,
}: {
  params: Promise<{ role: string }>;
  children: React.ReactNode;
}) {
  const { role } = await params;
  const urlRole = role.toLowerCase();

  const session = await getServerSession(authOptions);
  const activeOrgId = (await cookies()).get("x-org-id")?.value ?? null;
  const memberships = session?.user?.memberships ?? [];
  const activeMembership =
    memberships.find(
      (membership) => membership.organization.id === activeOrgId,
    ) ?? memberships[0];

  const sessionRole = getRouteRole(
    activeMembership ?? null,
    session?.user?.isPlatformAdmin,
  );

  if (sessionRole && sessionRole !== urlRole) {
    redirect(`/${sessionRole}/dashboard`);
  }

  return <RoleLayoutComponent>{children}</RoleLayoutComponent>;
}
