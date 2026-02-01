"use client";

import { useSession } from "next-auth/react";

import { resolveRoleKey, type RoleKey } from "@/config/sidebars";
import { useActiveOrganization } from "@/hooks/useActiveOrganization";

type RoleGuardProps = {
  allow: RoleKey[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

export function RoleGuard({ allow, children, fallback }: RoleGuardProps) {
  const { data: session } = useSession();
  const { activeOrganization } = useActiveOrganization();
  const role = resolveRoleKey(session ?? null, activeOrganization ?? null);

  if (!allow.includes(role)) return <>{fallback ?? null}</>;
  return <>{children}</>;
}

export function AdminGuard({
  children,
  fallback,
}: Omit<RoleGuardProps, "allow">) {
  return (
    <RoleGuard allow={["ADMIN"]} fallback={fallback}>
      {children}
    </RoleGuard>
  );
}

export function HospitalOwnerGuard({
  children,
  fallback,
}: Omit<RoleGuardProps, "allow">) {
  return (
    <RoleGuard allow={["HOSPITAL_OWNER"]} fallback={fallback}>
      {children}
    </RoleGuard>
  );
}

export function HospitalManagerGuard({
  children,
  fallback,
}: Omit<RoleGuardProps, "allow">) {
  return (
    <RoleGuard allow={["HOSPITAL_MANAGER"]} fallback={fallback}>
      {children}
    </RoleGuard>
  );
}

export function HospitalStaffGuard({
  children,
  fallback,
}: Omit<RoleGuardProps, "allow">) {
  return (
    <RoleGuard allow={["HOSPITAL_STAFF"]} fallback={fallback}>
      {children}
    </RoleGuard>
  );
}

export function PharmacyOwnerGuard({
  children,
  fallback,
}: Omit<RoleGuardProps, "allow">) {
  return (
    <RoleGuard allow={["PHARMACY_OWNER"]} fallback={fallback}>
      {children}
    </RoleGuard>
  );
}

export function PharmacyManagerGuard({
  children,
  fallback,
}: Omit<RoleGuardProps, "allow">) {
  return (
    <RoleGuard allow={["PHARMACY_MANAGER"]} fallback={fallback}>
      {children}
    </RoleGuard>
  );
}

export function PharmacyStaffGuard({
  children,
  fallback,
}: Omit<RoleGuardProps, "allow">) {
  return (
    <RoleGuard allow={["PHARMACY_STAFF"]} fallback={fallback}>
      {children}
    </RoleGuard>
  );
}

export function UserGuard({
  children,
  fallback,
}: Omit<RoleGuardProps, "allow">) {
  return (
    <RoleGuard allow={["USER"]} fallback={fallback}>
      {children}
    </RoleGuard>
  );
}
