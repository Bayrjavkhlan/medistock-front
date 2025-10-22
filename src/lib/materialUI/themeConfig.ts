import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1E88E5",
    },
    error: {
      main: "#ED826D",
    },
    text: {
      primary: "#101317",
    },
    background: {
      default: "#FFFFFF",
      paper: "#F8F9FA",
    },
    success: {
      main: "#43A047",
    },
    warning: {
      main: "#FBC02D",
    },
  },
  typography: {
    fontFamily: "Roboto Condensed, sans-serif",
    fontWeightBold: 700,
    h1: {
      fontSize: "2rem",
      fontWeight: 700,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "none",
          ":hover": {
            boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
          },
        },
        sizeSmall: {
          borderRadius: 8,
        },
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
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },
  },
});

export default theme;
