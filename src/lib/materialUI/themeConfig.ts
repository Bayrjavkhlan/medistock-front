// src/lib/materialUI/themeConfig.ts   ← exact same path as before
import { createTheme } from "@mui/material/styles";

export const getTheme = (mode: "light" | "dark") =>
  createTheme({
    palette: {
      mode,
      primary: {
        50: "#E8EEFD",
        100: "#D0DEFB",
        200: "#A2BCF6",
        300: "#739BF2",
        400: "#447AEE",
        500: "#1659E9",
        600: "#1147BB",
        700: "#0D358C",
        800: "#09235D",
        900: "#04122F",
        main: "#1659E9",
        contrastText: "#FFFFFF",
      },
      secondary: {
        50: "#E8FDF6",
        100: "#D0FBED",
        200: "#A1F7DA",
        300: "#72F3C8",
        400: "#43EFB6",
        500: "#14EBA3",
        600: "#10BC83",
        700: "#0C8D62",
        800: "#085E41",
        900: "#042F21",
        main: "#14EBA3",
        contrastText: "#FFFFFF",
      },
      error: {
        50: "#FDE8E8",
        100: "#FBD0D0",
        200: "#F7A1A1",
        300: "#F37272",
        400: "#EF4343",
        500: "#EB1414",
        600: "#BC1010",
        700: "#8D0C0C",
        800: "#5E0808",
        900: "#2F0404",
        main: "#EB1414",
        contrastText: "#FFFFFF",
      },
      background: {
        default: mode === "light" ? "#f8fafc" : "#0f172b",
        paper: mode === "light" ? "#f1f5f9" : "#1a1f2e",
      },
      text: {
        primary: mode === "light" ? "#101317" : "#f1f5f9",
      },
    },
    shape: {
      borderRadius: 12,
    },
    typography: {
      fontFamily: '"Inter", "Roboto Condensed", sans-serif',
    },
  });
