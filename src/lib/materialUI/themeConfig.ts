// themeConfig.ts
import { createTheme } from "@mui/material/styles";

export const getTheme = (mode: "light" | "dark") =>
  createTheme({
    palette: {
      mode,
      primary: {
        light: "#63A4FF",
        main: "#1E88E5",
        dark: "#0B428A",
        contrastText: "#FFFFFF",
      },
      success: {
        light: "#6FBD7F",
        main: "#43A047",
        dark: "#257829",
        contrastText: "#FFFFFF",
      },
      error: {
        light: "#F5C1A9",
        main: "#E53935",
        dark: "#AB1F1D",
        contrastText: "#FFFFFF",
      },
      warning: {
        light: "#FFF59D",
        main: "#FBC02D",
        dark: "#F57F17",
        contrastText: "#101317",
      },
      text: {
        primary: mode === "light" ? "#101317" : "#FFFFFF",
        secondary: mode === "light" ? "#5C6670" : "#ACAFB5",
        disabled: "#ACAFB5",
      },
      background: {
        default: mode === "light" ? "#FFFFFF" : "#121212",
        paper: mode === "light" ? "#F8F9FA" : "#1E1E1E",
      },
      divider: mode === "light" ? "#E0E0E0" : "#333",
    },
    typography: {
      fontFamily: "Roboto Condensed, sans-serif",
      fontWeightBold: 700,
      h1: { fontSize: "2rem", fontWeight: 700 },
      h2: { fontSize: "1.75rem", fontWeight: 600 },
      button: { textTransform: "none", fontWeight: 600 },
      body1: { fontSize: "1rem", lineHeight: 1.5 },
      body2: { fontSize: "0.875rem", lineHeight: 1.4 },
    },
    shape: { borderRadius: 12 },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: "none",
            ":hover": { boxShadow: "0px 2px 6px rgba(0,0,0,0.1)" },
          },
          sizeSmall: { borderRadius: 8 },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 14,
            boxShadow: "0px 4px 12px rgba(0,0,0,0.08)",
          },
        },
      },
      MuiInputBase: { styleOverrides: { root: { borderRadius: 10 } } },
    },
  });
