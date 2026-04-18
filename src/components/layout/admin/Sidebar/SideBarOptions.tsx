import HistoryIcon from "@mui/icons-material/History";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import MedicationIcon from "@mui/icons-material/Medication";
import PeopleIcon from "@mui/icons-material/People";
import type { Session } from "next-auth";

import { Routes } from "@/constants/routes";
import type { UserMembership } from "@/generated/graphql";
import { defineAbilityFor } from "@/lib/casl";

const iconMap: Record<string, React.ReactNode> = {
  "Хяналтын самбар": <HomeIcon />,
  Ажилчид: <PeopleIcon />,
  "Тоног төхөөрөмж": <MedicalServicesIcon />,
  Лог: <HistoryIcon />,
  "Миний лог": <HistoryIcon />,
  "Эмийн сангууд": <MedicalServicesIcon />,
  Эмүүд: <MedicationIcon />,
  Гарах: <LogoutIcon />,
};

export type SidebarItem = {
  text: string;
  path: string;
  icon: React.ReactNode;
};

export const getSidebarOptions = (
  session: Session | null,
  activeMembership: UserMembership | null = null,
): SidebarItem[] => {
  // if (!session?.staff) {
  //   return [
  //     {
  //       text: "Гарах",
  //       path: "/api/auth/signout",
  //       icon: <LogoutIcon />,
  //     },
  //   ];
  // }

  const ability = defineAbilityFor(session?.user ?? null, activeMembership);
  const items: SidebarItem[] = [];

  Object.values(Routes).forEach((route) => {
    const index = route.Index;
    if (!index) return;

    if (!ability.can(index.action, index.subject)) return;

    items.push({
      text: index.title,
      path: index.route,
      icon: iconMap[index.title] ?? <HomeIcon />,
    });
  });

  return items;
};
