import { Box, Paper, Typography } from "@mui/material";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/next-auth";

export default async function BookingPage({
  params,
  searchParams,
}: {
  params: Promise<{ role: string }>;
  searchParams: Promise<{ hospitalId?: string }>;
}) {
  const { role } = await params;
  const { hospitalId } = await searchParams;

  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect(`/login?next=/${role}/booking`);
  }

  return (
    <Paper sx={{ p: 3, borderRadius: 3 }} variant="outlined">
      <Typography variant="h5" fontWeight={700} gutterBottom>
        Booking Flow (Stub)
      </Typography>
      <Typography color="text.secondary">
        This page is ready for appointment-booking integration.
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Selected hospital ID: {hospitalId ?? "Not selected"}
        </Typography>
      </Box>
    </Paper>
  );
}
