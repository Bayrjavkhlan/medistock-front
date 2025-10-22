"use client";

import React, { useState } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import SideBar from "./SideBar";
import Header from "./Header";

type Props = {
  children: React.ReactNode;
  role: "admin" | "storeOwner" | "user";
};

export default function AppLayout({ children, role }: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [collapsed, setCollapsed] = useState(false);

  const sidebarWidth = 300;
  const collapsedWidth = 100;
  const headerHeight = 80;

  return (
    <Box sx={{ display: "flex" }}>
      <SideBar role={role} collapsed={collapsed} setCollapsed={setCollapsed} />

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
        {/* Fixed Header */}
        <Header collapsed={collapsed} />

        {/* Page Content */}
        <Box sx={{ p: 3 }}>{children}</Box>
      </Box>
    </Box>
  );
}
