import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import RegisterContainer from "@/components/features/auth/containers/RegisterContainer";
import { authOptions } from "@/lib/next-auth/authOptions";

export default async function RegisterPage() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/admin/dashboard");
  }
  return <RegisterContainer />;
}
