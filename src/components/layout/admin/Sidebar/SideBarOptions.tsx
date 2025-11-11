import HistoryIcon from "@mui/icons-material/History";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import type { Session } from "next-auth";

import { Routes } from "@/constants/routes";
import { defineAbilityFor } from "@/lib/casl";

const iconMap: Record<string, React.ReactNode> = {
  "Хяналтын самбар": <HomeIcon />,
  Ажилчид: <PeopleIcon />,
  "Тоног төхөөрөмж": <MedicalServicesIcon />,
  Лог: <HistoryIcon />,
  Профайл: <SettingsIcon />,
  Гарах: <LogoutIcon />,
};

export type SidebarItem = {
  text: string;
  path: string;
  icon: React.ReactNode;
};

export const getSidebarOptions = (session: Session | null): SidebarItem[] => {
  const ability = defineAbilityFor(session);
  const role = session?.user?.roleKey;

  if (!role) return [];

  const items: SidebarItem[] = [];

  Object.values(Routes).forEach((item) => {
    const index = item.Index;
    if (!index) return;

    if (!ability.can(index.action, index.subject)) return;

    if (index.shouldBeAuthenticated && !session) return;

    items.push({
      text: index.title,
      path: index.route,
      icon: iconMap[index.title] || <HomeIcon />,
    });
  });

  items.push({
    text: "Гарах",
    path: "/api/auth/signout",
    icon: <LogoutIcon />,
  });

  return items;
};
