"use client";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { getSidebarOptions } from "./SideBarOptions";

type Props = {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  mobileOpen: boolean;
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Sidebar({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { data: session } = useSession();
  const router = useRouter();

  const sidebarItems = getSidebarOptions(session);

  const content = (
    <Box
      sx={{
        width: collapsed ? 100 : 300,
        bgcolor: "background.paper",
        height: "100vh",
        borderRight: `1px solid ${theme.palette.divider}`,
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1200,
        transition: "width 0.3s ease",
      }}
    >
      <Box
        sx={{
          bgcolor: "transparent",
          borderRadius: 0,
          "&:hover": {
            bgcolor: theme.palette.action.hover,
          },
          borderBottom: `1px solid ${theme.palette.divider}`,
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
          width: "100%",
          height: 80,
        }}
      >
        {!collapsed && (
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "1.2rem",
              ml: 1,
              transition: "opacity 0.3s",
            }}
          >
            Medistock
          </Typography>
        )}
        <IconButton disableRipple onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </Box>

      <List sx={{ flexGrow: 1, paddingTop: 0, paddingBottom: 0 }}>
        {sidebarItems.map((item) => (
          <Tooltip
            key={item.path}
            title={collapsed ? item.text : ""}
            placement="right"
          >
            <ListItem
              onClick={() => {
                if (item.path.startsWith("/api/auth")) {
                  window.location.href = item.path;
                } else {
                  router.push(item.path);
                  if (isMobile) setMobileOpen(false);
                }
              }}
              sx={{
                px: collapsed ? 0 : 2,
                py: 2,
                justifyContent: collapsed ? "center" : "flex-start",
                transition: "all 0.3s ease",
                borderRadius: 0,
                "&:hover": {
                  bgcolor: theme.palette.action.hover,
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  justifyContent: collapsed ? "center" : "flex-start",
                  mr: collapsed ? 0 : 2,
                  "& svg": {
                    fontSize: collapsed ? "32px" : "32px",
                  },
                }}
              >
                {item.icon}
              </ListItemIcon>
              {!collapsed && <ListItemText primary={item.text} />}
            </ListItem>
          </Tooltip>
        ))}
      </List>

      <Box
        sx={{
          borderTop: `1px solid ${theme.palette.divider}`,
          bgcolor: "background.default",
        }}
      >
        <Tooltip title={collapsed ? "Гарах" : ""} placement="right">
          <ListItem
            onClick={() => {
              window.location.href = "/api/auth/signout";
            }}
            sx={{
              px: collapsed ? 0 : 2,
              py: 2,
              justifyContent: collapsed ? "center" : "flex-start",
              transition: "all 0.3s ease",
              borderRadius: 0,
              "&:hover": {
                bgcolor: theme.palette.action.hover,
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                justifyContent: collapsed ? "center" : "flex-start",
                mr: collapsed ? 0 : 2,
                "& svg": {
                  fontSize: "32px",
                },
                color: "error.main",
              }}
            >
              <LogoutIcon />
            </ListItemIcon>

            {/* Text — only visible when expanded */}
            {!collapsed && (
              <ListItemText
                primary="Гарах"
                sx={{
                  color: "error.main",
                }}
              />
            )}
          </ListItem>
        </Tooltip>
      </Box>
    </Box>
  );

  return isMobile ? (
    <Drawer
      anchor="left"
      open={mobileOpen}
      onClose={() => setMobileOpen(false)}
      ModalProps={{ keepMounted: true }}
      sx={{
        "& .MuiDrawer-paper": {
          width: 280,
          boxSizing: "border-box",
        },
      }}
    >
      {content}
    </Drawer>
  ) : (
    <Box sx={{ position: "fixed", top: 0, left: 0, height: "100vh" }}>
      {content}
    </Box>
  );
}
