"use client";

import {
  DarkMode,
  Favorite,
  LightMode,
  MonitorHeart,
  MonitorHeartOutlined,
} from "@mui/icons-material";
import { Alert, Box, IconButton, Snackbar } from "@mui/material";

import { useThemeMode } from "@/hooks/useThemeMode";

type AuthBackgroundProps = {
  children: React.ReactNode;
  setSnackbarOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  snackbarOpen?: boolean;
  errorMessage?: string;
};

export default function AuthBackground({
  children,
  setSnackbarOpen,
  snackbarOpen = false,
  errorMessage = "",
}: AuthBackgroundProps) {
  const { mode, toggleMode } = useThemeMode();
  const isDark = mode === "dark";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: isDark
          ? "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)"
          : "linear-gradient(135deg, #dbeafe 0%, #ffffff 50%, #eff6ff 100%)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          opacity: isDark ? 0.08 : 0.06,
          pointerEvents: "none",
        }}
      >
        {[...Array(25)].map((_, i) => {
          const Icon =
            i % 3 === 0
              ? MonitorHeartOutlined
              : i % 3 === 1
                ? Favorite
                : MonitorHeart;
          return (
            <Box
              key={i}
              sx={{
                position: "absolute",
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `translate(-50%, -50%) rotate(${Math.random() * 360}deg) scale(0.8)`,
                color: isDark ? "#60a5fa" : "#3b82f6",
              }}
            >
              <Icon sx={{ fontSize: { xs: 60, sm: 80 } }} />
            </Box>
          );
        })}
      </Box>

      <IconButton
        onClick={toggleMode}
        sx={{
          position: "absolute",
          top: 24,
          right: 24,
          bgcolor: "background.paper",
          backdropFilter: "blur(20px)",
          border: "1px solid",
          borderColor: "divider",
          boxShadow: 3,
          zIndex: 10,
          "&:hover": { transform: "scale(1.1)" },
        }}
      >
        {isDark ? (
          <LightMode sx={{ fontSize: 28 }} />
        ) : (
          <DarkMode sx={{ fontSize: 28 }} />
        )}
      </IconButton>

      {children}

      {!!setSnackbarOpen && (
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={() => setSnackbarOpen(false)}
            severity="error"
            variant="filled"
          >
            {errorMessage}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
}
