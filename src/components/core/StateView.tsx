"use client";

import { Box, CircularProgress, Typography } from "@mui/material";

type StateViewProps = {
  title: string;
  description?: string;
  loading?: boolean;
};

export default function StateView({
  title,
  description,
  loading = false,
}: StateViewProps) {
  return (
    <Box
      sx={{
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        p: 4,
        textAlign: "center",
      }}
    >
      {loading && <CircularProgress size={28} sx={{ mb: 2 }} />}
      <Typography variant="h6" sx={{ mb: 1 }}>
        {title}
      </Typography>
      {description ? (
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      ) : null}
    </Box>
  );
}
