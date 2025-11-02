"use client";

import { usePathname } from "next/navigation";

import AppLayout from "./admin";

// Paths where we DO NOT want to show the sidebar/header
const NO_LAYOUT_PATHS = ["/login", "/forgot-password", "/new-password", "/404"];

interface RenderLayoutProps {
  children: React.ReactNode;
  role?: "admin" | "storeOwner" | "user"; // Optional: can extend later
}

export const RenderLayout = ({
  children,
  role = "user",
}: RenderLayoutProps) => {
  const pathname = usePathname() ?? "";

  // Admin pages: wrap with sidebar/header
  if (pathname.startsWith("/admin")) {
    return <AppLayout role={role}>{children}</AppLayout>;
  }

  // Pages that should not have sidebar/header
  if (NO_LAYOUT_PATHS.some((path) => pathname.startsWith(path))) {
    return <>{children}</>;
  }

  // Default layout for all other pages (optional, can wrap in a public layout)
  return <>{children}</>;
};
