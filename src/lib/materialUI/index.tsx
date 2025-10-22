// MuiConfigProvider.tsx
"use client";
import React, { useMemo } from "react";
import { ThemeProvider, CssBaseline, useMediaQuery } from "@mui/material";
import { getTheme } from "./themeConfig";

const MuiConfigProvider = ({ children }: { children: React.ReactNode }) => {
  // Detect system preference
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  // Generate theme based on system preference
  const theme = useMemo(
    () => getTheme(prefersDarkMode ? "dark" : "light"),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default MuiConfigProvider;
