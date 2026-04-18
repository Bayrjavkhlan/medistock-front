"use client";

import { useApolloClient, useMutation } from "@apollo/client/react";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState } from "react";

import { LOGOUT } from "@/features/auth/graphql/mutation.gql";

const ACTIVE_ORG_STORAGE_KEY = "medistock.activeOrgId";

type LogoutMutationResult = {
  logout: {
    message: string;
  };
};

export default function LogoutButton() {
  const router = useRouter();
  const client = useApolloClient();
  const [logoutMutation] = useMutation<LogoutMutationResult>(LOGOUT);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    if (loading) return;

    setLoading(true);

    try {
      await logoutMutation();
    } catch {
      // The local session still needs to be closed even if the API call fails.
    }

    if (typeof window !== "undefined") {
      localStorage.removeItem(ACTIVE_ORG_STORAGE_KEY);
    }

    await signOut({ redirect: false });
    await client.clearStore();
    router.push("/login");
    router.refresh();
    setLoading(false);
  };

  return (
    <Button
      onClick={handleLogout}
      variant="outlined"
      color="inherit"
      disabled={loading}
      startIcon={<LogoutRoundedIcon />}
      sx={{
        borderRadius: 999,
        px: 2,
        py: 1,
        textTransform: "none",
        fontWeight: 600,
        minWidth: { xs: "auto", sm: 120 },
      }}
    >
      {loading ? "Гарч байна..." : "Гарах"}
    </Button>
  );
}
