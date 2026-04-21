import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/next-auth";

import ExploreClientPage from "./view/explore.client";

export default async function ExplorePage({
  params,
}: {
  params: Promise<{ role: string }>;
}) {
  const { role } = await params;
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect(`/login?next=/${role}/explore`);
  }

  return <ExploreClientPage />;
}
