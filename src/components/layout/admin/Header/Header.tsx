import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";

type HeaderProps = {
  collapsed: boolean;
  isMobileOpen: boolean;
  setCollapsed?: (val: boolean) => void;
  setMobileOpen?: (val: boolean) => void;
};

export default function Header({
  collapsed,
  isMobileOpen,
  setMobileOpen,
}: HeaderProps) {
  const theme = useTheme();
  const sidebarWidth = collapsed ? 100 : 300;

  return (
    <AppBar
      position="fixed"
      color="inherit"
      elevation={0}
      sx={{
        left: { xs: 0, sm: `${sidebarWidth}px` },
        width: { xs: "100%", sm: `calc(100% - ${sidebarWidth}px)` },
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
        <IconButton
          color="inherit"
          edge="start"
          onClick={() => setMobileOpen && setMobileOpen(!isMobileOpen)}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon
            sx={{
              fontSize: "32px",
            }}
          />
        </IconButton>

        <Typography variant="h6" noWrap sx={{ fontWeight: 600 }}>
          Title
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="body1">John Doe</Typography>
          <Avatar alt="John Doe" src="/dummy-profile.jpg" />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
