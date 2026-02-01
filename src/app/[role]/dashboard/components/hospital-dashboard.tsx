"use client";

import { Box, Typography } from "@mui/material";

import MetricsGrid from "./metrics-grid";

type HospitalDashboardProps = {
  organizationName: string;
  equipmentCount: number;
  logCount: number;
  staffCount: number;
};

export default function HospitalDashboard({
  organizationName,
  equipmentCount,
  logCount,
  staffCount,
}: HospitalDashboardProps) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Typography variant="h5" fontWeight={700}>
        {organizationName} • Эмнэлгийн хяналтын самбар
      </Typography>
      <MetricsGrid
        items={[
          { label: "Тоног төхөөрөмж", value: equipmentCount },
          { label: "Логууд", value: logCount },
          { label: "Ажилтнууд", value: staffCount },
        ]}
      />
    </Box>
  );
}
