import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  useTheme,
} from "@mui/material";

type HeaderProps = {
  collapsed: boolean;
};

export default function Header({ collapsed }: HeaderProps) {
  const theme = useTheme();

  // Sidebar widths should match your sidebar config
  const sidebarWidth = collapsed ? 100 : 300;

  return (
    <AppBar
      position="fixed"
      color="inherit"
      elevation={0}
      sx={{
        left: `${sidebarWidth}px`,
        width: `calc(100% - ${sidebarWidth}px)`,
        backgroundColor: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`,
        transition: "all 0.3s ease",
        zIndex: theme.zIndex.drawer + 1,
        height: 80,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          minHeight: "80px !important",
        }}
      >
        {/* Page Title */}
        <Typography variant="h6" noWrap sx={{ fontWeight: 600 }}>
          Dashboard
        </Typography>

        {/* Profile Section */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="body1">John Doe</Typography>
          <Avatar alt="John Doe" src="/dummy-profile.jpg" />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
