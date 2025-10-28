"use client";
import { usePathname } from "next/navigation";
import AppLayout from "./admin";

const NO_LAYOUT_PATHS = ["/login", "/forgot-password", "/new-password"];

export const RenderLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return <AppLayout role="admin">{children}</AppLayout>;
  }

  if (NO_LAYOUT_PATHS.some((path) => pathname?.startsWith(path))) {
    return <>{children}</>;
  } else {
    return <>{children}</>;
  }
};
