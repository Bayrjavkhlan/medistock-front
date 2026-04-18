"use client";

import { Box, Typography } from "@mui/material";
import dynamic from "next/dynamic";

import type { DashboardMapLocation } from "@/features/dashboard/graphql/queries.gql";

import MetricsGrid from "./metrics-grid";

const AdminLocationMap = dynamic(() => import("./admin-location-map"), {
  ssr: false,
});

type AdminDashboardProps = {
  hospitalCount: number;
  pharmacyCount: number;
  equipmentCount: number;
  logCount: number;
  staffCount: number;
  hospitals: DashboardMapLocation[];
  drugstores: DashboardMapLocation[];
};

export default function AdminDashboard({
  hospitalCount,
  pharmacyCount,
  equipmentCount,
  logCount,
  staffCount,
  hospitals,
  drugstores,
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
      <AdminLocationMap hospitals={hospitals} drugstores={drugstores} />
    </Box>
  );
}
