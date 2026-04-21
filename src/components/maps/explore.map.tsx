"use client";

import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { useEffect, useMemo } from "react";
import {
  CircleMarker,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

import type { ExploreLocation, LatLng } from "@/features/explore/types";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x.src,
  iconUrl: markerIcon.src,
  shadowUrl: markerShadow.src,
});

const DEFAULT_CENTER: [number, number] = [47.9184, 106.9177];

const MapFocusController = ({
  selectedLocation,
}: {
  selectedLocation?: ExploreLocation | null;
}) => {
  const map = useMap();
  useEffect(() => {
    if (
      selectedLocation?.latitude === null ||
      selectedLocation?.latitude === undefined ||
      selectedLocation?.longitude === null ||
      selectedLocation?.longitude === undefined
    ) {
      return;
    }

    map.flyTo([selectedLocation.latitude, selectedLocation.longitude], 14, {
      duration: 0.8,
    });
  }, [map, selectedLocation]);

  return null;
};

type ExploreMapProps = {
  locations: ExploreLocation[];
  selectedId?: string | null;
  onMarkerSelect?: (id: string) => void;
  userLocation?: LatLng | null;
  height?: number;
};

export default function ExploreMap({
  locations,
  selectedId,
  onMarkerSelect,
  userLocation,
  height = 520,
}: ExploreMapProps) {
  const withCoordinates = useMemo(
    () =>
      locations.filter(
        (item) =>
          item.latitude !== null &&
          item.latitude !== undefined &&
          item.longitude !== null &&
          item.longitude !== undefined,
      ),
    [locations],
  );

  const selectedLocation =
    withCoordinates.find((item) => item.id === selectedId) ?? null;

  const initialCenter: [number, number] = userLocation
    ? [userLocation.latitude, userLocation.longitude]
    : withCoordinates[0]
      ? [
          withCoordinates[0].latitude as number,
          withCoordinates[0].longitude as number,
        ]
      : DEFAULT_CENTER;

  return (
    <MapContainer
      center={initialCenter}
      zoom={12}
      style={{ height, width: "100%", borderRadius: 12 }}
      scrollWheelZoom
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup chunkedLoading>
        {withCoordinates.map((location) => (
          <Marker
            key={`${location.type}-${location.id}`}
            position={[
              location.latitude as number,
              location.longitude as number,
            ]}
            eventHandlers={{
              click: () => {
                onMarkerSelect?.(location.id);
              },
            }}
          >
            <Popup>
              <strong>{location.name}</strong>
              <br />
              {location.type}
              <br />
              {location.address1}
              {location.address2 ? `, ${location.address2}` : ""}
              {location.province ? `, ${location.province}` : ""}
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
      {userLocation ? (
        <CircleMarker
          center={[userLocation.latitude, userLocation.longitude]}
          radius={8}
          pathOptions={{
            color: "#0ea5e9",
            fillColor: "#0ea5e9",
            fillOpacity: 0.6,
          }}
        >
          <Popup>Your location</Popup>
        </CircleMarker>
      ) : null}
      <MapFocusController selectedLocation={selectedLocation} />
    </MapContainer>
  );
}
