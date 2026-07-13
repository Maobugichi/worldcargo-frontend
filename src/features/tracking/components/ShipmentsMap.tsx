"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import type { LatLngTuple } from "leaflet";
import { TrackingEvent } from "../types/tracking.types";
import { fixLeafletDefaultIcons } from "@/lib/leaflet-icon-fix";

fixLeafletDefaultIcons();

function getCssColor(variableName: string, fallback: string) {
  if (typeof window === "undefined") return fallback;
  const value = getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
  return value || fallback;
}

interface ShipmentMapProps {
  events: TrackingEvent[];
}

export default function ShipmentMap({ events }: ShipmentMapProps) {
  const pinned = events
    .filter(
      (event): event is TrackingEvent & { lat: number; lng: number } =>
        event.lat !== undefined && event.lng !== undefined
    )
    .slice()
    .reverse();

  if (pinned.length === 0) {
    return null;
  }

  const coordinates: LatLngTuple[] = pinned.map((event) => [event.lat, event.lng]);
  const mostRecentPosition = coordinates[coordinates.length - 1];
  // Read the real token instead of duplicating its hex value here, so the
  // route line always matches the theme even if the accent color changes.
  const routeColor = getCssColor("--color-accent", "#1fa98a");

  return (
    <div className="w-full max-w-xl overflow-hidden rounded-xl border border-border">
      <MapContainer
        {...(coordinates.length > 1
          ? { bounds: coordinates, boundsOptions: { padding: [24, 24] as [number, number] } }
          : { center: mostRecentPosition, zoom: 11 })}
        style={{ height: 280, width: "100%" }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polyline positions={coordinates} pathOptions={{ color: routeColor, weight: 3 }} />
        {pinned.map((event, index) => (
          <Marker key={`${event.occurredAt}-${index}`} position={[event.lat, event.lng]} />
        ))}
      </MapContainer>
    </div>
  );
}