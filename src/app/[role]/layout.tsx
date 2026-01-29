import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/next-auth";

const getRouteRole = (
  role: string | null | undefined,
  isPlatformAdmin: boolean | undefined,
) => {
  if (isPlatformAdmin) return "admin";
  if (!role) return null;
  return role === "STAFF" ? "staff" : "hospital";
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
  const activeOrgId = cookies().get("x-org-id")?.value ?? null;
  const memberships = session?.user?.memberships ?? [];
  const activeMembership =
    memberships.find(
      (membership) => membership.organization.id === activeOrgId,
    ) ?? memberships[0];

  const sessionRole = getRouteRole(
    activeMembership?.role ?? null,
    session?.user?.isPlatformAdmin,
  );

  if (sessionRole && sessionRole !== urlRole) {
    redirect(`/${sessionRole}/dashboard`);
  }

  return <>{children}</>;
}
