import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import LoginContainer from "@/components/features/auth/containers/LoginContainer";
import { authOptions } from "@/lib/next-auth/authOptions";
import { resolvePostLoginPath } from "@/utils/authRedirect";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect(resolvePostLoginPath(session.user));
  }

  return <LoginContainer />;
}
