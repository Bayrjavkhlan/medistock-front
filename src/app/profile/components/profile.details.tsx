"use client";

import { Box, Divider, Typography } from "@mui/material";

import type { CurrentUserQuery } from "@/generated/graphql";

type ProfileDetailsProps = {
  user: NonNullable<CurrentUserQuery["currentUser"]>;
};

export default function ProfileDetails({ user }: ProfileDetailsProps) {
  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        p: 3,
        maxWidth: 720,
      }}
    >
      <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
        Профайл
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Box sx={{ display: "grid", gap: 1.5 }}>
        <Typography variant="body1">
          Нэр: <strong>{user.name ?? "-"}</strong>
        </Typography>
        <Typography variant="body1">
          И-мэйл: <strong>{user.email ?? "-"}</strong>
        </Typography>
        <Typography variant="body1">
          Утас: <strong>{user.phone ?? "-"}</strong>
        </Typography>
        <Typography variant="body1">
          Платформ админ:{" "}
          <strong>{user.isPlatformAdmin ? "Тийм" : "Үгүй"}</strong>
        </Typography>
      </Box>
    </Box>
  );
}
