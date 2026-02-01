"use client";

import { Box, Typography } from "@mui/material";

import MetricsGrid from "./metrics-grid";

type AdminDashboardProps = {
  hospitalCount: number;
  pharmacyCount: number;
  equipmentCount: number;
  logCount: number;
  staffCount: number;
};

export default function AdminDashboard({
  hospitalCount,
  pharmacyCount,
  equipmentCount,
  logCount,
  staffCount,
}: AdminDashboardProps) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Typography variant="h5" fontWeight={700}>
        Платформын хяналтын самбар
      </Typography>
      <MetricsGrid
        items={[
          { label: "Эмнэлэг", value: hospitalCount },
          { label: "Эмийн сан", value: pharmacyCount },
          { label: "Тоног төхөөрөмж", value: equipmentCount },
          { label: "Логууд", value: logCount },
          { label: "Ажилтнууд", value: staffCount },
        ]}
      />
    </Box>
  );
}
