import { AbilityBuilder, PureAbility } from "@casl/ability";
import type { Session } from "next-auth";

import type { Action, Subject } from "@/constants/routes";

export type AppAbility = PureAbility<[Action, Subject]>;
export const AppAbility = PureAbility as unknown;

export const defineAbilityFor = (session: Session | null): AppAbility => {
  const { can, build } = new AbilityBuilder<AppAbility>(PureAbility);

  // === GUEST ===
  if (!session) {
    can("read", ["Auth_Login", "Auth_Forgot", "Auth_NewPassword"]);
    return build();
  }

  const role = session.user.roleKey;

  // === ADMIN ===
  if (role === "ADMIN") {
    can(
      ["create", "read", "update", "delete"],
      [
        "Admin_Dashboard",
        "Admin_Staff",
        "Admin_Hospitals",
        "Admin_Equipment",
        "Admin_EquipmentLog",
        "Admin_Profile",
      ],
    );
  }

  // === HOSPITAL_ADMIN ===
  if (role === "HOSPITAL_ADMIN") {
    can(
      ["read", "create", "update", "delete"],
      [
        "Hospital_Dashboard",
        "Hospital_Staff",
        "Hospital_Equipment",
        "Hospital_EquipmentLog",
      ],
    );
    can(["read", "update"], "Hospital_Profile");
  }

  // === STAFF ===
  if (role === "STAFF") {
    can("read", ["Staff_Dashboard", "Staff_Equipment"]);
    can(["create", "read", "update"], "Staff_EquipmentLog");
  }

  return build();
};
