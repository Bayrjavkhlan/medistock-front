"use client";

import { Box, Typography } from "@mui/material";

import type { Action, Subject } from "@/constants/routes";
import { useAbility } from "@/lib/casl/useAbility";

type AbilityGuardProps = {
  action: Action;
  subject: Subject;
  children?: React.ReactNode;
  fallback?: React.ReactNode;
};

export default function AbilityGuard({
  action,
  subject,
  children,
  fallback,
}: AbilityGuardProps) {
  const ability = useAbility();

  if (!ability.can(action, subject)) {
    if (fallback) return <>{fallback}</>;
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
        <Typography variant="h6" sx={{ mb: 1 }}>
          Эрх хүрэхгүй байна
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Танд энэ хэсгийг үзэх эрх алга.
        </Typography>
      </Box>
    );
  }

  return <>{children}</>;
}
