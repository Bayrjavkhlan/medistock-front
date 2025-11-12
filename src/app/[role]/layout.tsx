import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/next-auth/authOptions";

export default async function RoleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { role: string };
}) {
  const session = await getServerSession(authOptions);
  const sessionRole = String(session?.user?.roleKey || "").toLowerCase();
  const urlRole = params.role.toLowerCase();

  if (sessionRole && sessionRole !== urlRole) {
    redirect(`/${sessionRole}${params.role === urlRole ? "" : ""}`);
  }
  if (!sessionRole) {
    redirect("/login");
  }

  return <>{children}</>;
}
