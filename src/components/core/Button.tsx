import * as React from "react";
import Button, { ButtonProps } from "@mui/material/Button";

// Extend ButtonProps so your custom button works like a normal MUI Button
type CustomButtonProps = ButtonProps & {
  // Optional: add extra custom props if needed
};

export default function CButton({ children, ...props }: CustomButtonProps) {
  return (
    <Button
      {...props}
      variant="contained"
      sx={{
        borderRadius: "12px",
        textTransform: "none",
        fontWeight: 600,
        backgroundColor: "#1976d2",
        color: "#fff",
        "&:hover": {
          backgroundColor: "#1565c0",
        },
        ...props.sx,
      }}
    >
      {children}
    </Button>
  );
}
