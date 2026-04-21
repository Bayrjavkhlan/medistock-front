import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import LoginContainer from "@/components/features/auth/containers/LoginContainer";
import { authOptions } from "@/lib/next-auth/authOptions";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);
  if (session) {
    const memberships = session.user.memberships ?? [];
    const activeMembership = memberships[0] ?? null;
    const orgType = activeMembership?.organization.type ?? null;
    const orgRole = activeMembership?.role ?? null;
    const nextRoute = session.user.isPlatformAdmin
      ? "/admin/dashboard"
      : !activeMembership
        ? "/user/dashboard"
        : orgType === "PHARMACY"
          ? orgRole === "STAFF"
            ? "/pharmacy/medicine"
            : "/pharmacy/dashboard"
          : orgRole === "STAFF"
            ? "/hospital/equipment"
            : "/hospital/dashboard";

    redirect(nextRoute);
  }
  return <LoginContainer />;
}
