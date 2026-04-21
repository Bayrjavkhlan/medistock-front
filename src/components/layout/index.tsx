"use client";

import { usePathname } from "next/navigation";

import RoleLayout from "./RoleLayout";

const NO_LAYOUT_PATHS = [
  "/login",
  "/register",
  "/forgot-password",
  "/new-password",
  "/404",
];

interface RenderLayoutProps {
  children: React.ReactNode;
}

export const RenderLayout = ({ children }: RenderLayoutProps) => {
  const pathname = usePathname() ?? "";

  if (pathname.startsWith("/profile")) {
    return <RoleLayout>{children}</RoleLayout>;
  }

  if (NO_LAYOUT_PATHS.some((path) => pathname.startsWith(path))) {
    return <>{children}</>;
  }

  return <>{children}</>;
};
