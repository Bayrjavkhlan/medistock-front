"use client";

import AbilityGuard from "@/components/AbilityGuard";
import StateView from "@/components/core/StateView";
import { useCurrentUserQuery } from "@/generated/hooks";

import ProfileDetails from "../components/profile.details";

export default function ProfileContainer() {
  const { data, loading, error } = useCurrentUserQuery({
    fetchPolicy: "cache-and-network",
  });

  const user = data?.currentUser ?? null;

  return (
    <AbilityGuard action="read" subject="Profile">
      {loading ? (
        <StateView title="Уншиж байна..." loading />
      ) : error ? (
        <StateView title="Алдаа гарлаа" description={error.message} />
      ) : !user ? (
        <StateView title="Өгөгдөл байхгүй байна" />
      ) : (
        <ProfileDetails user={user} />
      )}
    </AbilityGuard>
  );
}
