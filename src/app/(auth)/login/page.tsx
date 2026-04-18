import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import LoginContainer from "@/components/features/auth/containers/LoginContainer";
import { authOptions } from "@/lib/next-auth/authOptions";

const resolveRedirectPath = (
  isPlatformAdmin: boolean | undefined,
  memberships:
    | {
        role: string;
        organization: { type: string };
      }[]
    | undefined,
) => {
  if (isPlatformAdmin) return "/admin/dashboard";

  const activeMembership = memberships?.[0];
  if (!activeMembership) return "/user/dashboard";

  if (activeMembership.organization.type === "PHARMACY") {
    return activeMembership.role === "STAFF"
      ? "/pharmacy/medicine"
      : "/pharmacy/dashboard";
  }

  return activeMembership.role === "STAFF"
    ? "/hospital/equipment"
    : "/hospital/dashboard";
};

export default async function LoginPage() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect(
      resolveRedirectPath(
        session.user?.isPlatformAdmin,
        session.user?.memberships,
      ),
    );
  }
  return <LoginContainer />;
}
