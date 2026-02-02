"use client";

import { Box, Typography } from "@mui/material";

import MetricsGrid from "./metrics-grid";

type PharmacyDashboardProps = {
  organizationName: string;
  equipmentCount: number;
  logCount: number;
  drugCount: number;
};

export default function PharmacyDashboard({
  organizationName,
  equipmentCount,
  logCount,
  drugCount,
}: PharmacyDashboardProps) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Typography variant="h5" fontWeight={700}>
        {organizationName} • Эмийн сангийн хяналтын самбар
      </Typography>
      <MetricsGrid
        items={[
          { label: "Эм", value: drugCount },
          { label: "Тоног төхөөрөмж", value: equipmentCount },
          { label: "Логууд", value: logCount },
        ]}
      />
    </Box>
  );
}
