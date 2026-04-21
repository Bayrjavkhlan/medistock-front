import { AbilityBuilder, PureAbility } from "@casl/ability";
import type { Session } from "next-auth";

import type { Action, Subject } from "@/constants/routes";
import type { UserMembership } from "@/generated/graphql";

export type AppAbility = PureAbility<[Action, Subject]>;
export const AppAbility = PureAbility as unknown;

type PortalRole =
  | "ADMIN"
  | "HOSPITAL_OWNER"
  | "HOSPITAL_MANAGER"
  | "HOSPITAL_STAFF"
  | "PHARMACY_OWNER"
  | "PHARMACY_MANAGER"
  | "PHARMACY_STAFF"
  | "USER";

const resolvePortalRole = (
  user: Session["user"] | null,
  activeMembership: UserMembership | null,
): PortalRole | null => {
  if (!user) return null;
  if (user.isPlatformAdmin) return "ADMIN";
  if (!activeMembership) return "USER";

  const orgType = activeMembership.organization.type;
  const role = activeMembership.role;

  if (orgType === "HOSPITAL") {
    if (role === "OWNER") return "HOSPITAL_OWNER";
    if (role === "MANAGER") return "HOSPITAL_MANAGER";
    return "HOSPITAL_STAFF";
  }

  if (orgType === "PHARMACY") {
    if (role === "OWNER") return "PHARMACY_OWNER";
    if (role === "MANAGER") return "PHARMACY_MANAGER";
    return "PHARMACY_STAFF";
  }

  return "USER";
};

export const defineAbilityFor = (
  user: Session["user"] | null,
  activeMembership: UserMembership | null,
): AppAbility => {
  const { can, build } = new AbilityBuilder<AppAbility>(PureAbility);

  // === GUEST ===
  if (!user) {
    can("read", ["Auth_Login", "Auth_Forgot", "Auth_NewPassword"]);
    return build();
  }

  const portalRole = resolvePortalRole(user, activeMembership);
  const organizationId = activeMembership?.organization.id ?? null;
  const organizationType = activeMembership?.organization.type ?? null;

  if (portalRole === "ADMIN") {
    can(
      ["create", "read", "update", "delete"],
      [
        "Admin_Dashboard",
        "Admin_Staff",
        "Admin_Hospital",
        "Admin_Pharmacy",
        "Admin_Equipment",
        "Admin_EquipmentLog",
      ],
    );
    can("read", "Profile");
    return build();
  }

  if (
    (portalRole === "HOSPITAL_OWNER" ||
      portalRole === "HOSPITAL_MANAGER" ||
      portalRole === "HOSPITAL_STAFF") &&
    organizationType === "HOSPITAL" &&
    organizationId
  ) {
    if (portalRole === "HOSPITAL_OWNER") {
      can(
        ["create", "read", "update", "delete"],
        ["Hospital_Staff", "Hospital_Equipment", "Hospital_EquipmentLog"],
      );
      can("read", "Hospital_Dashboard");
      can(["create", "read", "update"], "Admin_Hospital");
    }
    if (portalRole === "HOSPITAL_MANAGER") {
      can(
        ["create", "read", "update", "delete"],
        ["Hospital_Equipment", "Hospital_EquipmentLog"],
      );
      can("read", "Hospital_Dashboard");
    }
    if (portalRole === "HOSPITAL_STAFF") {
      can("read", ["Hospital_Equipment", "Hospital_EquipmentLog"]);
    }
    can("read", "Profile");
  }

  if (
    (portalRole === "PHARMACY_OWNER" ||
      portalRole === "PHARMACY_MANAGER" ||
      portalRole === "PHARMACY_STAFF") &&
    organizationType === "PHARMACY" &&
    organizationId
  ) {
    if (portalRole === "PHARMACY_OWNER") {
      can(
        ["create", "read", "update", "delete"],
        [
          "Pharmacy_Staff",
          "Pharmacy_Medicine",
          "Pharmacy_Equipment",
          "Pharmacy_EquipmentLog",
        ],
      );
      can("read", "Pharmacy_Dashboard");
      can(["create", "read", "update"], "Admin_Pharmacy");
    }
    if (portalRole === "PHARMACY_MANAGER") {
      can(
        ["create", "read", "update", "delete"],
        ["Pharmacy_Medicine", "Pharmacy_Equipment", "Pharmacy_EquipmentLog"],
      );
      can("read", "Pharmacy_Dashboard");
    }
    if (portalRole === "PHARMACY_STAFF") {
      can("read", ["Pharmacy_Medicine", "Pharmacy_Equipment"]);
    }
    can("read", "Profile");
  }

  if (portalRole === "USER") {
    can("read", ["User_Dashboard", "User_Hospital", "User_Pharmacy"]);
    can("read", "Profile");
  }

  return build();
};
