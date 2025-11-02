"use client";

import { Box, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";

import Header from "./Header/Header";
import SideBar from "./Sidebar/SideBar";

type Props = {
  children: React.ReactNode;
  role: "admin" | "storeOwner" | "user";
};

export default function AppLayout({ children, role }: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarWidth = 300;
  const collapsedWidth = 100;
  const headerHeight = 80;

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <Box sx={{ display: "flex" }}>
      <SideBar
        role={role}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <Box
        sx={{
          flexGrow: 1,
          transition: "margin-left 0.3s ease",
          marginLeft: isMobile
            ? 0
            : collapsed
              ? `${collapsedWidth}px`
              : `${sidebarWidth}px`,
          paddingTop: `${headerHeight}px`,
          backgroundColor: theme.palette.background.default,
          minHeight: "100vh",
        }}
      >
        <Header
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          isMobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />
        <Box sx={{ p: 3 }}>{children}</Box>
      </Box>
    </Box>
  );
}
