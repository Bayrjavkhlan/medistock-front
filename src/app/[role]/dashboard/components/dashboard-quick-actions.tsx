"use client";

import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { Button, Stack } from "@mui/material";
import Link from "next/link";

type DashboardQuickAction = {
  label: string;
  href: string;
};

type DashboardQuickActionsProps = {
  items: DashboardQuickAction[];
};

export default function DashboardQuickActions({
  items,
}: DashboardQuickActionsProps) {
  return (
    <Stack direction="row" spacing={1.25} useFlexGap flexWrap="wrap">
      {items.map((item) => (
        <Button
          key={item.href}
          component={Link}
          href={item.href}
          variant="contained"
          endIcon={<ArrowForwardRoundedIcon />}
          sx={{
            textTransform: "none",
            borderRadius: 999,
            px: 2.25,
            py: 1,
            boxShadow: "none",
          }}
        >
          {item.label}
        </Button>
      ))}
    </Stack>
  );
}
