"use client";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { debounce } from "lodash";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";

import { usePublicExploreMapQuery } from "@/features/explore/hooks/usePublicExploreMapQuery";
import type { LatLng } from "@/features/explore/types";

const ExploreMap = dynamic(() => import("@/components/maps/explore.map"), {
  ssr: false,
});

const getBookingPath = (
  isPlatformAdmin: boolean | undefined,
  membershipType?: "HOSPITAL" | "PHARMACY" | null,
) => {
  if (isPlatformAdmin) return "/admin/booking";
  if (membershipType === "PHARMACY") return "/pharmacy/booking";
  if (membershipType === "HOSPITAL") return "/hospital/booking";
  return "/user/booking";
};

export default function PublicMapPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<LatLng | null>(null);

  useEffect(() => {
    const handler = debounce(() => setDebouncedSearch(search.trim()), 350);
    handler();
    return () => handler.cancel();
  }, [search]);

  const { data, loading, error } = usePublicExploreMapQuery(debouncedSearch);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by this browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      () => {
        setLocationError(
          "Location permission denied. Distances are unavailable.",
        );
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }, []);

  const locations = data?.publicExploreMap ?? [];

  const counts = useMemo(
    () => ({
      hospitals: locations.filter((item) => item.type === "HOSPITAL").length,
      pharmacies: locations.filter((item) => item.type === "PHARMACY").length,
    }),
    [locations],
  );

  const membershipType =
    session?.user?.memberships?.[0]?.organization?.type ?? null;

  return (
    <Box sx={{ px: { xs: 2, md: 5 }, py: 4 }}>
      <Stack spacing={3}>
        <Card
          sx={{
            background:
              "linear-gradient(120deg, rgba(14,116,144,0.15), rgba(34,197,94,0.1))",
            borderRadius: 3,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="h4" fontWeight={700}>
                Medistock Public Health Map
              </Typography>
              <Typography color="text.secondary">
                Explore hospitals and pharmacies on an interactive OpenStreetMap
                view, check nearby services, and start your booking flow.
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                <Chip label={`${counts.hospitals} hospitals`} />
                <Chip label={`${counts.pharmacies} pharmacies`} />
                <Chip label="OpenStreetMap + Leaflet" />
              </Stack>
              <Box>
                <Button
                  variant="contained"
                  onClick={() => {
                    if (!session?.user?.id) {
                      router.push("/login?next=/map");
                      return;
                    }
                    router.push(
                      getBookingPath(
                        session.user.isPlatformAdmin,
                        membershipType as "HOSPITAL" | "PHARMACY" | null,
                      ),
                    );
                  }}
                >
                  Book appointment
                </Button>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        <TextField
          fullWidth
          label="Search by hospital/pharmacy name or address"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        {locationError ? <Alert severity="info">{locationError}</Alert> : null}
        {error ? <Alert severity="error">{error.message}</Alert> : null}

        {loading ? (
          <Box sx={{ py: 8, textAlign: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          <ExploreMap
            locations={locations}
            selectedId={selectedId}
            onMarkerSelect={setSelectedId}
            userLocation={userLocation}
            height={620}
          />
        )}
      </Stack>
    </Box>
  );
}
