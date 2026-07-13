"use client";

import { useId } from "react";
import dynamic from "next/dynamic";

const LocationPicker = dynamic(() => import("./LocationPicker"), { ssr: false });

interface Coords {
  lat: number;
  lng: number;
}

interface EventLocationFieldsProps {
  location: string;
  onLocationChange: (value: string) => void;
  locationPlaceholder?: string;
  note: string;
  onNoteChange: (value: string) => void;
  notePlaceholder?: string;
  coords: Coords | null;
  onCoordsChange: (coords: Coords | null) => void;
}

export function EventLocationFields({
  location,
  onLocationChange,
  locationPlaceholder,
  note,
  onNoteChange,
  notePlaceholder,
  coords,
  onCoordsChange,
}: EventLocationFieldsProps) {
  // useId keeps these unique even when SetStatusForm and AddEventForm
  // render side by side on the same page.
  const locationId = useId();
  const noteId = useId();

  return (
    <>
      <div>
        <label htmlFor={locationId} className="mb-1 block text-xs text-foreground/50">
          Location
        </label>
        <input
          id={locationId}
          value={location}
          onChange={(e) => onLocationChange(e.target.value)}
          required
          placeholder={locationPlaceholder}
          className="w-full rounded-lg border border-border-strong bg-surface px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-accent focus-visible:ring-2 focus-visible:ring-accent/30"
        />
      </div>

      <div>
        <label htmlFor={noteId} className="mb-1 block text-xs text-foreground/50">
          Note
        </label>
        <input
          id={noteId}
          value={note}
          onChange={(e) => onNoteChange(e.target.value)}
          required
          placeholder={notePlaceholder}
          className="w-full rounded-lg border border-border-strong bg-surface px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-accent focus-visible:ring-2 focus-visible:ring-accent/30"
        />
      </div>

      <div>
        <div className="mb-1 flex items-center justify-between">
          <span className="text-xs text-foreground/50">Map location (optional)</span>
          {coords && (
            <button
              type="button"
              onClick={() => onCoordsChange(null)}
              className="rounded-sm text-xs text-foreground/50 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Clear pin
            </button>
          )}
        </div>
        <LocationPicker
          latitude={coords?.lat}
          longitude={coords?.lng}
          onChange={(lat, lng) => onCoordsChange({ lat, lng })}
        />
      </div>
    </>
  );
}