"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from "react-leaflet";
import type { LatLngTuple } from "leaflet";
import { fixLeafletDefaultIcons } from "@/lib/leaflet-icon-fix";
import { MAP_REGIONS, WORLD_VIEW } from "../utils/map-regions";

fixLeafletDefaultIcons();

interface LocationPickerProps {
  latitude?: number;
  longitude?: number;
  onChange: (lat: number, lng: number) => void;
}

function ClickHandler({ onChange }: { onChange: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onChange(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

function RecenterOnRegionChange({ center, zoom }: { center: LatLngTuple; zoom: number }) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);

  return null;
}

export default function LocationPicker({ latitude, longitude, onChange }: LocationPickerProps) {
  const [selectedRegionLabel, setSelectedRegionLabel] = useState(WORLD_VIEW.label);

  const selectedRegion =
    [WORLD_VIEW, ...MAP_REGIONS].find((region) => region.label === selectedRegionLabel) ??
    WORLD_VIEW;

  const hasPosition = latitude !== undefined && longitude !== undefined;

  return (
    <div className="space-y-2">
      <select
        value={selectedRegionLabel}
        onChange={(e) => setSelectedRegionLabel(e.target.value)}
        className="w-full rounded-lg border border-foreground/15 px-3 py-2 text-sm outline-none focus:border-accent"
      >
        <option value={WORLD_VIEW.label}>{WORLD_VIEW.label}</option>
        {MAP_REGIONS.map((region) => (
          <option key={region.label} value={region.label}>
            {region.label}
          </option>
        ))}
      </select>

      <div className="overflow-hidden rounded-lg border border-foreground/15">
        <MapContainer
          center={[selectedRegion.lat, selectedRegion.lng]}
          zoom={selectedRegion.zoom}
          style={{ height: 220, width: "100%" }}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <RecenterOnRegionChange
            center={[selectedRegion.lat, selectedRegion.lng]}
            zoom={selectedRegion.zoom}
          />
          <ClickHandler onChange={onChange} />
          {hasPosition && <Marker position={[latitude, longitude]} />}
        </MapContainer>
      </div>

      {hasPosition && (
        <p className="text-xs text-foreground/50">
          Pinned: {latitude.toFixed(4)}, {longitude.toFixed(4)}
        </p>
      )}
    </div>
  );
}