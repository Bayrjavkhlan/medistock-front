import { usePathname } from "next/navigation";

import { Routes } from "@/constants/routes";

export const usePageTitle = (): string => {
  const pathname = usePathname();

  for (const item of Object.values(Routes)) {
    if (item.Index?.route === pathname) {
      return item.Index.title;
    }

    if (item.Create?.route === pathname) return item.Create.title;
    if (item.Update?.route === pathname) return item.Update.title;
    if (item.Detail?.route === pathname) return item.Detail.title;
  }

  for (const item of Object.values(Routes)) {
    if (item.Index?.path) {
      const pattern = item.Index.path({ id: "[^/]+" });
      const regex = new RegExp(`^${pattern}$`);
      if (regex.test(pathname)) {
        return item.Index.title;
      }
    }

    if (item.Detail?.path) {
      const pattern = item.Detail.path({ id: "[^/]+" });
      const regex = new RegExp(`^${pattern}$`);
      if (regex.test(pathname)) {
        return item.Detail.title;
      }
    }
    if (item.Update?.path) {
      const pattern = item.Update.path({ id: "[^/]+" });
      const regex = new RegExp(`^${pattern}$`);
      if (regex.test(pathname)) {
        return item.Update.title;
      }
    }
  }

  return "";
};
