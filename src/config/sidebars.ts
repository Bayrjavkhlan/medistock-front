import ConstructionIcon from "@mui/icons-material/Construction";
import HistoryIcon from "@mui/icons-material/History";
import HomeIcon from "@mui/icons-material/Home";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import MedicationIcon from "@mui/icons-material/Medication";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import type { Session } from "next-auth";
import type { ElementType } from "react";

import type { Action, Subject } from "@/constants/routes";
import type { UserMembership } from "@/generated/graphql";
import { OrganizationRole, OrganizationType } from "@/generated/graphql";

export type RoleKey =
  | "ADMIN"
  | "HOSPITAL_OWNER"
  | "HOSPITAL_MANAGER"
  | "HOSPITAL_STAFF"
  | "PHARMACY_OWNER"
  | "PHARMACY_MANAGER"
  | "PHARMACY_STAFF"
  | "USER";

export type SidebarItem = {
  label: string;
  path: string;
  icon: ElementType;
  action: Action;
  subject: Subject;
};

export const resolveRoleKey = (
  session: Session | null,
  activeMembership: UserMembership | null,
): RoleKey => {
  if (session?.user?.isPlatformAdmin) return "ADMIN";
  if (!activeMembership) return "USER";

  const orgType = activeMembership.organization.type;
  const role = activeMembership.role;

  if (orgType === OrganizationType.Hospital) {
    if (role === OrganizationRole.Owner) return "HOSPITAL_OWNER";
    if (role === OrganizationRole.Manager) return "HOSPITAL_MANAGER";
    return "HOSPITAL_STAFF";
  }

  if (orgType === OrganizationType.Pharmacy) {
    if (role === OrganizationRole.Owner) return "PHARMACY_OWNER";
    if (role === OrganizationRole.Manager) return "PHARMACY_MANAGER";
    return "PHARMACY_STAFF";
  }

  return "USER";
};

export const SIDEBARS: Record<RoleKey, SidebarItem[]> = {
  ADMIN: [
    {
      label: "Dashboard",
      path: "/admin/dashboard",
      icon: HomeIcon,
      action: "read",
      subject: "Admin_Dashboard",
    },
    {
      label: "Hospitals",
      path: "/admin/hospital",
      icon: LocalHospitalIcon,
      action: "read",
      subject: "Admin_Hospital",
    },
    {
      label: "Pharmacies",
      path: "/admin/pharmacy",
      icon: LocalPharmacyIcon,
      action: "read",
      subject: "Admin_Pharmacy",
    },
    {
      label: "Staff",
      path: "/admin/staff",
      icon: PeopleIcon,
      action: "read",
      subject: "Admin_Staff",
    },
    {
      label: "Logs",
      path: "/admin/log",
      icon: HistoryIcon,
      action: "read",
      subject: "Admin_EquipmentLog",
    },
  ],

  HOSPITAL_OWNER: [
    {
      label: "Dashboard",
      path: "/hospital/dashboard",
      icon: HomeIcon,
      action: "read",
      subject: "Hospital_Dashboard",
    },
    {
      label: "Staff",
      path: "/hospital/staff",
      icon: PeopleIcon,
      action: "read",
      subject: "Hospital_Staff",
    },
    {
      label: "Equipment",
      path: "/hospital/equipment",
      icon: ConstructionIcon,
      action: "read",
      subject: "Hospital_Equipment",
    },
    {
      label: "Logs",
      path: "/hospital/log",
      icon: HistoryIcon,
      action: "read",
      subject: "Hospital_EquipmentLog",
    },
  ],

  HOSPITAL_MANAGER: [
    {
      label: "Dashboard",
      path: "/hospital/dashboard",
      icon: HomeIcon,
      action: "read",
      subject: "Hospital_Dashboard",
    },
    {
      label: "Equipment",
      path: "/hospital/equipment",
      icon: ConstructionIcon,
      action: "read",
      subject: "Hospital_Equipment",
    },
    {
      label: "Logs",
      path: "/hospital/log",
      icon: HistoryIcon,
      action: "read",
      subject: "Hospital_EquipmentLog",
    },
  ],

  HOSPITAL_STAFF: [
    {
      label: "Equipment",
      path: "/hospital/equipment",
      icon: ConstructionIcon,
      action: "read",
      subject: "Hospital_Equipment",
    },
    {
      label: "Logs",
      path: "/hospital/log",
      icon: HistoryIcon,
      action: "read",
      subject: "Hospital_EquipmentLog",
    },
  ],

  PHARMACY_OWNER: [
    {
      label: "Dashboard",
      path: "/pharmacy/dashboard",
      icon: HomeIcon,
      action: "read",
      subject: "Pharmacy_Dashboard",
    },
    {
      label: "Staff",
      path: "/pharmacy/staff",
      icon: PeopleIcon,
      action: "read",
      subject: "Pharmacy_Staff",
    },
    {
      label: "Medicines",
      path: "/pharmacy/medicine",
      icon: MedicationIcon,
      action: "read",
      subject: "Pharmacy_Medicine",
    },
    {
      label: "Equipment",
      path: "/pharmacy/equipment",
      icon: ConstructionIcon,
      action: "read",
      subject: "Pharmacy_Equipment",
    },
    {
      label: "Logs",
      path: "/pharmacy/log",
      icon: HistoryIcon,
      action: "read",
      subject: "Pharmacy_EquipmentLog",
    },
  ],

  PHARMACY_MANAGER: [
    {
      label: "Dashboard",
      path: "/pharmacy/dashboard",
      icon: HomeIcon,
      action: "read",
      subject: "Pharmacy_Dashboard",
    },
    {
      label: "Medicines",
      path: "/pharmacy/medicine",
      icon: MedicationIcon,
      action: "read",
      subject: "Pharmacy_Medicine",
    },
    {
      label: "Equipment",
      path: "/pharmacy/equipment",
      icon: ConstructionIcon,
      action: "read",
      subject: "Pharmacy_Equipment",
    },
    {
      label: "Logs",
      path: "/pharmacy/log",
      icon: HistoryIcon,
      action: "read",
      subject: "Pharmacy_EquipmentLog",
    },
  ],

  PHARMACY_STAFF: [
    {
      label: "Medicines",
      path: "/pharmacy/medicine",
      icon: MedicationIcon,
      action: "read",
      subject: "Pharmacy_Medicine",
    },
    {
      label: "Equipment",
      path: "/pharmacy/equipment",
      icon: ConstructionIcon,
      action: "read",
      subject: "Pharmacy_Equipment",
    },
  ],

  USER: [
    {
      label: "Dashboard",
      path: "/user/dashboard",
      icon: HomeIcon,
      action: "read",
      subject: "User_Dashboard",
    },
    {
      label: "Hospitals",
      path: "/user/hospital",
      icon: LocalHospitalIcon,
      action: "read",
      subject: "User_Hospital",
    },
    {
      label: "Pharmacies",
      path: "/user/pharmacy",
      icon: LocalPharmacyIcon,
      action: "read",
      subject: "User_Pharmacy",
    },
    {
      label: "Profile",
      path: "/profile",
      icon: PersonIcon,
      action: "read",
      subject: "Profile",
    },
  ],
};
