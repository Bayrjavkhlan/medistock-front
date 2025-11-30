import { Box, Card, Typography } from "@mui/material";
import type { ReactNode } from "react";

import { useThemeMode } from "@/hooks/useThemeMode";

export default function AuthCard({
  title,
  subtitle,
  children,
  icon,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  icon: ReactNode;
}) {
  const { mode } = useThemeMode();
  const isDark = mode === "dark";

  return (
    <Card
      sx={{
        maxWidth: 500,
        width: "100%",
        borderRadius: 6,
        overflow: "hidden",
        position: "relative",
        backdropFilter: "blur(30px)",
        background: isDark
          ? "rgba(30, 41, 59, 0.8)"
          : "rgba(255, 255, 255, 0.8)",
        border: "1px solid",
        borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)",
        boxShadow: "0 25px 50px rgba(0,0,0,0.2)",
      }}
    >
      <Box
        sx={{
          height: 8,
          background: "linear-gradient(90deg, #3b82f6, #60a5fa, #3b82f6)",
        }}
      />
      <Box sx={{ p: { xs: 4, md: 8 } }}>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
          <Box
            sx={{
              width: 90,
              height: 90,
              borderRadius: 5,
              background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 15px 35px rgba(59,130,246,0.4)",
            }}
          >
            {icon}
          </Box>
        </Box>

        <Typography
          variant="h4"
          align="center"
          fontWeight={700}
          gutterBottom
          color="text.primary"
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            mb={4}
          >
            {subtitle}
          </Typography>
        )}

        {children}

        <Typography
          variant="body2"
          align="center"
          color="text.secondary"
          mt={6}
        >
          © 2025 Medistock • Mongolia
        </Typography>
      </Box>
    </Card>
  );
}
