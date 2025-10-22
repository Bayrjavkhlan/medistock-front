// src/components/ui/CBox.tsx
import { Box, BoxProps } from "@mui/material";
import React from "react";

type CBoxProps = BoxProps & {
  bordered?: boolean;
  shadow?: boolean;
  rounded?: boolean | number;
  hoverable?: boolean;
  padding?: number | string;
  background?: string;
};

export default function CBox({
  children,
  bordered = false,
  shadow = false,
  rounded = true,
  hoverable = false,
  padding = 2,
  background,
  sx,
  ...props
}: CBoxProps) {
  return (
    <Box
      sx={{
        p: padding,
        border: bordered ? "1px solid #e0e0e0" : "none",
        borderRadius:
          typeof rounded === "number"
            ? `${rounded}px`
            : rounded
            ? "12px"
            : "0px",
        boxShadow: shadow ? "0 4px 10px rgba(0,0,0,0.1)" : "none",
        transition: "all 0.2s ease-in-out",
        backgroundColor: background || "background.paper",
        "&:hover": hoverable
          ? {
              boxShadow: "0 6px 14px rgba(0,0,0,0.15)",
              transform: "translateY(-2px)",
            }
          : undefined,
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
}
