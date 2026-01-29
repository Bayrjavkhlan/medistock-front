import { AbilityBuilder, PureAbility } from "@casl/ability";
import type { Session } from "next-auth";

import type { Action, Subject } from "@/constants/routes";
import type { OrganizationRole } from "@/generated/graphql";

export type AppAbility = PureAbility<[Action, Subject]>;
export const AppAbility = PureAbility as unknown;

export const defineAbilityFor = (
  session: Session | null,
  activeRole: OrganizationRole | null = null,
): AppAbility => {
  const { can, build } = new AbilityBuilder<AppAbility>(PureAbility);

  // === GUEST ===
  if (!session) {
    can("read", ["Auth_Login", "Auth_Forgot", "Auth_NewPassword"]);
    return build();
  }

  if (session.user?.isPlatformAdmin) {
    can(
      ["create", "read", "update", "delete"],
      [
        "Admin_Dashboard",
        "Admin_Staff",
        "Admin_Hospital",
        "Admin_Equipment",
        "Admin_EquipmentLog",
      ],
    );
    can("read", "Profile");
    return build();
  }

  const role =
    activeRole ?? session.user?.memberships?.[0]?.role ?? ("STAFF" as const);

  // === OWNER ===
  if (role === "OWNER") {
    can(
      ["create", "read", "update", "delete"],
      [
        "Hospital_Dashboard",
        "Hospital_Staff",
        "Hospital_Equipment",
        "Hospital_EquipmentLog",
      ],
    );
    can("read", "Profile");
  }

  // === MANAGER ===
  if (role === "MANAGER") {
    can(
      ["read", "create", "update"],
      [
        "Hospital_Dashboard",
        "Hospital_Staff",
        "Hospital_Equipment",
        "Hospital_EquipmentLog",
      ],
    );
    can("read", "Profile");
  }

  // === STAFF ===
  if (role === "STAFF") {
    can("read", ["Staff_Dashboard", "Staff_Equipment"]);
    can(["create", "read", "update"], "Staff_EquipmentLog");
    can("read", "Profile");
  }

  return build();
};
