"use client";

import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { debounce } from "lodash";
import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";

import { usePublicExploreMapQuery } from "@/features/explore/hooks/usePublicExploreMapQuery";
import type { ExploreLocation, LatLng } from "@/features/explore/types";
import { formatDistance, haversineDistanceKm } from "@/features/explore/utils";

const ExploreMap = dynamic(() => import("@/components/maps/explore.map"), {
  ssr: false,
});

type ExploreRow = ExploreLocation & {
  distanceKm: number | null;
};

export default function ExploreClientPage() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();
  const rolePrefix = pathname.split("/")[1] || "user";

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
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      () => {
        setLocationError(
          "Location permission denied. Distances may be unknown.",
        );
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }, []);

  const rows = useMemo<ExploreRow[]>(() => {
    const base = data?.publicExploreMap ?? [];
    return base
      .map((item) => {
        if (
          !userLocation ||
          item.latitude === null ||
          item.latitude === undefined ||
          item.longitude === null ||
          item.longitude === undefined
        ) {
          return { ...item, distanceKm: null };
        }
        return {
          ...item,
          distanceKm: haversineDistanceKm(userLocation, {
            latitude: item.latitude,
            longitude: item.longitude,
          }),
        };
      })
      .sort((a, b) => {
        if (a.distanceKm === null && b.distanceKm === null) return 0;
        if (a.distanceKm === null) return 1;
        if (b.distanceKm === null) return -1;
        return a.distanceKm - b.distanceKm;
      });
  }, [data?.publicExploreMap, userLocation]);

  return (
    <Stack spacing={2}>
      <Typography variant="h5" fontWeight={700}>
        Explore Hospitals and Pharmacies
      </Typography>
      <TextField
        fullWidth
        label="Search by name or address"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      {locationError ? <Alert severity="info">{locationError}</Alert> : null}
      {error ? <Alert severity="error">{error.message}</Alert> : null}
      <Stack direction={{ xs: "column", lg: "row" }} spacing={2}>
        <Paper
          variant="outlined"
          sx={{
            width: { xs: "100%", lg: "36%" },
            maxHeight: 620,
            overflowY: "auto",
          }}
        >
          {loading ? (
            <Box sx={{ py: 8, textAlign: "center" }}>
              <CircularProgress />
            </Box>
          ) : (
            <List disablePadding>
              {rows.length === 0 ? (
                <Box sx={{ py: 4, px: 2 }}>
                  <Typography color="text.secondary">
                    No matching places found.
                  </Typography>
                </Box>
              ) : (
                rows.map((row) => (
                  <ListItemButton
                    key={`${row.type}-${row.id}`}
                    selected={selectedId === row.id}
                    onClick={() => setSelectedId(row.id)}
                    sx={{ alignItems: "flex-start", py: 1.5 }}
                  >
                    <ListItemText
                      primary={
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={1}
                          flexWrap="wrap"
                        >
                          <Typography fontWeight={600}>{row.name}</Typography>
                          <Chip
                            label={
                              row.type === "HOSPITAL" ? "Hospital" : "Pharmacy"
                            }
                            size="small"
                            icon={<PlaceOutlinedIcon fontSize="small" />}
                          />
                        </Stack>
                      }
                      secondary={
                        <Stack spacing={0.5} sx={{ mt: 0.5 }}>
                          <Typography variant="body2" color="text.secondary">
                            {row.address1}
                            {row.address2 ? `, ${row.address2}` : ""}
                            {row.province ? `, ${row.province}` : ""}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Distance: {formatDistance(row.distanceKm)}
                          </Typography>
                          {row.type === "HOSPITAL" ? (
                            <Box sx={{ pt: 0.5 }}>
                              <Button
                                size="small"
                                variant="outlined"
                                onClick={(event) => {
                                  event.stopPropagation();
                                  if (!session?.user?.id) {
                                    router.push(`/login?next=${pathname}`);
                                    return;
                                  }
                                  router.push(
                                    `/${rolePrefix}/booking?hospitalId=${encodeURIComponent(row.id)}`,
                                  );
                                }}
                              >
                                Book
                              </Button>
                            </Box>
                          ) : null}
                        </Stack>
                      }
                    />
                  </ListItemButton>
                ))
              )}
            </List>
          )}
        </Paper>

        <Box sx={{ width: { xs: "100%", lg: "64%" } }}>
          <ExploreMap
            locations={rows}
            selectedId={selectedId}
            onMarkerSelect={setSelectedId}
            userLocation={userLocation}
            height={620}
          />
        </Box>
      </Stack>
    </Stack>
  );
}
