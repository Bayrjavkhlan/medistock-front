import { Avatar, Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

import type { OrganizationRole } from "@/generated/graphql";

type ProfileProps = {
  username: string | undefined;
  role: OrganizationRole | null | undefined;
  image?: string | undefined;
};

const roleLabelMap = {
  OWNER: "Эзэмшигч",
  MANAGER: "Менежер",
  STAFF: "Ажилтан",
} as const;

export default function Profile({ username, role, image }: ProfileProps) {
  const router = useRouter();

  return (
    <Box
      onClick={() => router.push("/profile")}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        padding: "8px 12px",
        borderRadius: 999,
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          backgroundColor: "action.hover",
          transform: "translateY(-1px)",
          boxShadow: 1,
        },
        "&:active": {
          transform: "translateY(0)",
        },
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          router.push("/profile");
        }
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <Typography variant="body1">{username ?? "Хэрэглэгч"}</Typography>
          <Typography variant="caption">
            {role ? (roleLabelMap[role] ?? role) : "Профайл"}
          </Typography>
        </Box>
        <Avatar alt={username} src={image} />
      </Box>
    </Box>
  );
}
