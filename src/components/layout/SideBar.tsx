"use client";

import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  useMediaQuery,
  Box,
  Tooltip,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import GroupIcon from "@mui/icons-material/Group";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { sidebarItems } from "../../../dummydata";

type Props = {
  role: "admin" | "storeOwner" | "user";
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  mobileOpen: boolean;
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SideBar({
  role,
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const filteredItems = sidebarItems.filter((item) =>
    item.roles.includes(role)
  );

  const iconsMap: Record<string, React.ReactNode> = {
    Dashboard: <HomeIcon />,
    Orders: <ShoppingCartIcon />,
    "Manage Users": <GroupIcon />,
    Shop: <ShoppingCartIcon />,
  };

  const content = (
    <Box
      sx={{
        width: collapsed ? 100 : 300,
        bgcolor: "background.paper",
        height: "100vh",
        borderRight: `1px solid ${theme.palette.divider}`,
        py: 0,
        transition: "width 0.3s",
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        top: 0,
        left: 0,
      }}
    >
      <IconButton
        onClick={() => setCollapsed(!collapsed)}
        disableRipple
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
            Logo
          </Typography>
        )}
        {collapsed ? (
          <ChevronRightIcon sx={{ fontSize: 32 }} />
        ) : (
          <ChevronLeftIcon sx={{ fontSize: 32 }} />
        )}
      </IconButton>

      <List
        sx={{
          paddingTop: 0,
          paddingBottom: 0,
        }}
      >
        {filteredItems.map((item) => (
          <Tooltip
            key={item.text}
            title={collapsed ? item.text : ""}
            placement="right"
          >
            <ListItem
              component={"button"}
              onClick={() => console.log(item.path)}
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
                {iconsMap[item.text]}
              </ListItemIcon>
              {!collapsed && <ListItemText primary={item.text} />}
            </ListItem>
          </Tooltip>
        ))}
      </List>
    </Box>
  );

  return isMobile ? (
    <Drawer
      anchor="left"
      open={mobileOpen}
      onClose={() => setMobileOpen(false)}
      ModalProps={{ keepMounted: true }}
    >
      {content}
    </Drawer>
  ) : (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
      }}
    >
      {content}
    </Box>
  );
}
