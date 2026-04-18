"use client";

import { Box, Chip, Stack, Typography } from "@mui/material";
import L from "leaflet";
import { useEffect, useMemo } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

import type { DashboardMapLocation } from "@/features/dashboard/graphql/queries.gql";

type AdminLocationMapProps = {
  hospitals: DashboardMapLocation[];
  drugstores: DashboardMapLocation[];
};

type MarkerRecord = DashboardMapLocation & {
  color: string;
  label: string;
};

const hospitalIcon = L.divIcon({
  className: "",
  html: `
    <span style="
      display:flex;
      align-items:center;
      justify-content:center;
      width:18px;
      height:18px;
      border-radius:9999px;
      background:#d32f2f;
      border:3px solid #ffffff;
      box-shadow:0 2px 8px rgba(0,0,0,0.35);
    "></span>
  `,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
  popupAnchor: [0, -12],
});

const drugstoreIcon = L.divIcon({
  className: "",
  html: `
    <span style="
      display:flex;
      align-items:center;
      justify-content:center;
      width:18px;
      height:18px;
      border-radius:9999px;
      background:#2e7d32;
      border:3px solid #ffffff;
      box-shadow:0 2px 8px rgba(0,0,0,0.35);
    "></span>
  `,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
  popupAnchor: [0, -12],
});

function FitBounds({ markers }: { markers: MarkerRecord[] }) {
  const map = useMap();

  useEffect(() => {
    if (markers.length === 0) return;

    const bounds = L.latLngBounds(
      markers.map(
        (marker) => [marker.latitude, marker.longitude] as [number, number],
      ),
    );

    map.fitBounds(bounds, { padding: [32, 32], maxZoom: 14 });
  }, [map, markers]);

  return null;
}

const formatAddress = (marker: DashboardMapLocation) =>
  [marker.address, marker.address2, marker.province].filter(Boolean).join(", ");

export default function AdminLocationMap({
  hospitals,
  drugstores,
}: AdminLocationMapProps) {
  const markers = useMemo<MarkerRecord[]>(
    () => [
      ...hospitals.map((marker) => ({
        ...marker,
        color: "#d32f2f",
        label: "Hospital",
      })),
      ...drugstores.map((marker) => ({
        ...marker,
        color: "#2e7d32",
        label: "Drugstore",
      })),
    ],
    [drugstores, hospitals],
  );

  if (markers.length === 0) {
    return (
      <Box
        sx={{
          border: "1px dashed",
          borderColor: "divider",
          borderRadius: 3,
          p: 4,
          textAlign: "center",
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
          Газрын зургийн мэдээлэл алга
        </Typography>
        <Typography color="text.secondary">
          Эмнэлэг болон эмийн сангийн байршлыг оруулсны дараа зураг дээр
          харагдана.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={2}
        sx={{ p: 2.5, borderBottom: "1px solid", borderColor: "divider" }}
      >
        <Box>
          <Typography variant="h6" fontWeight={700}>
            Байршлын зураг
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Системд бүртгэлтэй эмнэлэг, эмийн сангууд.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          <Chip
            label={`Эмнэлэг: ${hospitals.length}`}
            sx={{
              bgcolor: "rgba(211,47,47,0.12)",
              color: "#8e1b1b",
              fontWeight: 600,
            }}
          />
          <Chip
            label={`Эмийн сан: ${drugstores.length}`}
            sx={{
              bgcolor: "rgba(46,125,50,0.12)",
              color: "#1f5d24",
              fontWeight: 600,
            }}
          />
        </Stack>
      </Stack>

      <Box sx={{ position: "relative", height: { xs: 360, md: 460 } }}>
        <MapContainer
          center={[47.9184, 106.9177]}
          zoom={12}
          scrollWheelZoom
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <FitBounds markers={markers} />
          {hospitals.map((marker) => (
            <Marker
              key={`hospital-${marker.id}`}
              position={[marker.latitude, marker.longitude]}
              icon={hospitalIcon}
            >
              <Popup>
                <Typography fontWeight={700}>{marker.name}</Typography>
                <Typography variant="body2">Төрөл: Эмнэлэг</Typography>
                <Typography variant="body2">{formatAddress(marker)}</Typography>
                <Typography variant="body2">
                  Цагийн хуваарь: {marker.opensAt} - {marker.closesAt}
                </Typography>
              </Popup>
            </Marker>
          ))}
          {drugstores.map((marker) => (
            <Marker
              key={`drugstore-${marker.id}`}
              position={[marker.latitude, marker.longitude]}
              icon={drugstoreIcon}
            >
              <Popup>
                <Typography fontWeight={700}>{marker.name}</Typography>
                <Typography variant="body2">Төрөл: Эмийн сан</Typography>
                <Typography variant="body2">{formatAddress(marker)}</Typography>
                <Typography variant="body2">
                  Цагийн хуваарь: {marker.opensAt} - {marker.closesAt}
                </Typography>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        <Box
          sx={{
            position: "absolute",
            right: 16,
            bottom: 16,
            zIndex: 500,
            bgcolor: "rgba(255,255,255,0.94)",
            borderRadius: 2,
            px: 1.5,
            py: 1,
            boxShadow: "0 8px 24px rgba(15,23,42,0.18)",
          }}
        >
          <Stack spacing={0.75}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  bgcolor: "#d32f2f",
                }}
              />
              <Typography variant="caption">Эмнэлэг</Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  bgcolor: "#2e7d32",
                }}
              />
              <Typography variant="caption">Эмийн сан</Typography>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
