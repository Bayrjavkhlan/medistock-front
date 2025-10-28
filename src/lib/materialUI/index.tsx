"use client";
import React, { useMemo } from "react";
import {
  ThemeProvider,
  CssBaseline,
  useMediaQuery,
  StyledEngineProvider,
} from "@mui/material";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "./emotionCache";
import { getTheme } from "./themeConfig";

const clientSideEmotionCache = createEmotionCache();

const MuiConfigProvider = ({ children }: { children: React.ReactNode }) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = useMemo(
    () => getTheme(prefersDarkMode ? "dark" : "light"),
    [prefersDarkMode]
  );

  return (
    <CacheProvider value={clientSideEmotionCache}>
      <StyledEngineProvider injectFirst={false}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </StyledEngineProvider>
    </CacheProvider>
  );
};

export default MuiConfigProvider;
