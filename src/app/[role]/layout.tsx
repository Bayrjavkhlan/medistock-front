import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/next-auth";

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
  const sessionRole = String(session?.user?.roleKey || "").toLowerCase();

  if (sessionRole && sessionRole !== urlRole) {
    redirect(`/${sessionRole}/staff`);
  }

  return <>{children}</>;
}
