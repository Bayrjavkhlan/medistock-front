"use client";

import { Box } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";

import type { DashboardSeries } from "@/features/dashboard/graphql/queries.gql";

type DashboardSeriesChartProps = {
  series: DashboardSeries[];
  height?: number;
};

export default function DashboardSeriesChart({
  series,
  height = 320,
}: DashboardSeriesChartProps) {
  const axisLabels = series[0]?.points.map((point) => point.label) ?? [];

  return (
    <Box sx={{ width: "100%", overflowX: "auto" }}>
      <LineChart
        height={height}
        xAxis={[
          {
            scaleType: "point",
            data: axisLabels,
          },
        ]}
        yAxis={[{ min: 0 }]}
        series={series.map((item) => ({
          id: item.key,
          label: item.label,
          data: item.points.map((point) => point.value),
          curve: "monotoneX",
          color: item.color ?? undefined,
          showMark: false,
          area: true,
        }))}
        margin={{ left: 48, right: 24, top: 16, bottom: 24 }}
        grid={{ horizontal: true }}
      />
    </Box>
  );
}
