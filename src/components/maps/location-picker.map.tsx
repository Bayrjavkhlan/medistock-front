"use client";

import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { useMemo } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";

import type { LatLng } from "@/features/explore/types";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x.src,
  iconUrl: markerIcon.src,
  shadowUrl: markerShadow.src,
});

const DEFAULT_CENTER: [number, number] = [47.9184, 106.9177];

const LocationClickHandler = ({
  onSelect,
}: {
  onSelect: (value: LatLng) => void;
}) => {
  useMapEvents({
    click: (event: any) => {
      onSelect({
        latitude: event.latlng.lat,
        longitude: event.latlng.lng,
      });
    },
  });
  return null;
};

type LocationPickerMapProps = {
  value?: LatLng | null;
  onChange: (value: LatLng) => void;
};

export default function LocationPickerMap({
  value,
  onChange,
}: LocationPickerMapProps) {
  const center = useMemo<[number, number]>(
    () => (value ? [value.latitude, value.longitude] : DEFAULT_CENTER),
    [value],
  );

  return (
    <MapContainer
      center={center}
      zoom={value ? 14 : 11}
      style={{ height: 320, width: "100%", borderRadius: 10 }}
      scrollWheelZoom
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationClickHandler onSelect={onChange} />
      {value ? <Marker position={[value.latitude, value.longitude]} /> : null}
    </MapContainer>
  );
}
