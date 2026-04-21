"use client";

import { CacheProvider } from "@emotion/react";
import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";

import createEmotionCache from "./emotionCache";
import { getTheme } from "./themeConfig";

const clientSideEmotionCache = createEmotionCache();

export const ThemeToggleContext = React.createContext<{
  mode: "light" | "dark";
  toggleMode: () => void;
}>({
  mode: "light",
  toggleMode: () => {},
});

const MuiConfigProvider = ({ children }: { children: React.ReactNode }) => {
  const [manualMode, setManualMode] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    if (saved) {
      setManualMode(saved);
    }
  }, []);

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const systemMode = prefersDarkMode ? "dark" : "light";

  const mode = manualMode ?? systemMode;

  const toggleMode = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setManualMode(newMode);
    localStorage.setItem("theme", newMode);
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", mode === "dark");
  }, [mode]);

  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <CacheProvider value={clientSideEmotionCache}>
      <StyledEngineProvider injectFirst={false}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ThemeToggleContext.Provider value={{ mode, toggleMode }}>
            {children}
          </ThemeToggleContext.Provider>
        </ThemeProvider>
      </StyledEngineProvider>
    </CacheProvider>
  );
};

export default MuiConfigProvider;
