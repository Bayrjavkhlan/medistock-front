"use client";

import { usePathname } from "next/navigation";

import AppLayout from "./admin";

const NO_LAYOUT_PATHS = ["/login", "/forgot-password", "/new-password", "/404"];

interface RenderLayoutProps {
  children: React.ReactNode;
}

export const RenderLayout = ({ children }: RenderLayoutProps) => {
  const pathname = usePathname() ?? "";

  const protectedPrefixes = ["/admin", "/staff", "/hospital", "/profile"];

  if (protectedPrefixes.some((prefix) => pathname.startsWith(prefix))) {
    return <AppLayout>{children}</AppLayout>;
  }

  if (NO_LAYOUT_PATHS.some((path) => pathname.startsWith(path))) {
    return <>{children}</>;
  }

  return <>{children}</>;
};
