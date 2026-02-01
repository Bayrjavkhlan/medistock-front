"use client";

import { Box, Typography } from "@mui/material";

import MetricsGrid from "./metrics-grid";

type UserDashboardProps = {
  organizationName: string;
  equipmentCount: number;
  logCount: number;
};

export default function UserDashboard({
  organizationName,
  equipmentCount,
  logCount,
}: UserDashboardProps) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Typography variant="h5" fontWeight={700}>
        {organizationName} • Хэрэглэгчийн хяналтын самбар
      </Typography>
      <MetricsGrid
        items={[
          { label: "Тоног төхөөрөмж", value: equipmentCount },
          { label: "Миний логууд", value: logCount },
        ]}
      />
    </Box>
  );
}
