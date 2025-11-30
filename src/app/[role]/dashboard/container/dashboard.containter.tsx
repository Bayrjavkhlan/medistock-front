"use client";
import { Button } from "@mui/material";

import MainGrid from "@/components/core/MainGrid";
import { useThemeMode } from "@/hooks/useThemeMode";

export default function AdminDashboardContainer() {
  const { mode, toggleMode } = useThemeMode();

  return (
    <>
      {/* <CBox component={"main"}>test</CBox> */}
      <MainGrid />
      mode: {mode}
      <Button onClick={toggleMode}>ToggleMode</Button>
      {/* TODO: Material UI ashiglad dashboardaa beldene */}
      {/* TODO2: Menu bar */}
      Admin Dashboard Container123
      {/* Google map to show the equipment locations */}
      {/* total hospital  */}
      {/* total staff */}
      {/* total stock(equipment)*/}
      {/* equipment in use*/}
      {/* equipment avaible */}
      {/* equipment under maintanence */}
      {/* equipment borken */}
    </>
  );
}
