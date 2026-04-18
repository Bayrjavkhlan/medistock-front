"use client";

import { Box } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";

import type { DashboardStat } from "@/features/dashboard/graphql/queries.gql";

type DashboardDonutChartProps = {
  items: DashboardStat[];
  height?: number;
};

const colorMap: Record<string, string> = {
  teal: "#0f766e",
  blue: "#0284c7",
  violet: "#7c3aed",
  amber: "#d97706",
  rose: "#e11d48",
  slate: "#475569",
  success: "#16a34a",
  warning: "#f59e0b",
  danger: "#ef4444",
  neutral: "#94a3b8",
};

export default function DashboardDonutChart({
  items,
  height = 280,
}: DashboardDonutChartProps) {
  return (
    <Box sx={{ width: "100%", overflowX: "auto" }}>
      <PieChart
        height={height}
        series={[
          {
            innerRadius: 55,
            outerRadius: 110,
            paddingAngle: 2,
            cornerRadius: 5,
            data: items.map((item, index) => ({
              id: index,
              value: item.value,
              label: item.label,
              color: colorMap[item.tone ?? "neutral"] ?? colorMap.neutral,
            })),
          },
        ]}
        slotProps={{
          legend: {
            direction: "vertical",
            position: { vertical: "middle", horizontal: "end" },
          },
        }}
      />
    </Box>
  );
}
