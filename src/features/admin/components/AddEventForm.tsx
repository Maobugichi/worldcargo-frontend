"use client";

import { FormEvent, useState } from "react";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { addTrackingEvent } from "../api/shipments";
import { ApiError } from "@/lib/api-client";
import { EventLocationFields } from "./EventLocationFields";

interface AddEventFormProps {
  shipmentId: string;
  onAdded: () => void;
}

export function AddEventForm({ shipmentId, onAdded }: AddEventFormProps) {
  const [location, setLocation] = useState("");
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [note, setNote] = useState("");
  const [state, setState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setState("submitting");

    try {
      await addTrackingEvent(shipmentId, {
        location,
        note,
        latitude: coords?.lat,
        longitude: coords?.lng,
      });
      setLocation("");
      setNote("");
      setCoords(null);
      setState("success");
      onAdded();
    } catch (err) {
      setState("error");
      setError(err instanceof ApiError ? err.message : "Failed to add event.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-xl border border-border bg-surface p-5">
      <div>
        <h2 className="text-sm font-semibold text-foreground">Add a note</h2>
        <p className="text-xs text-foreground/50">
          Logs an event without changing the current status.
        </p>
      </div>

      <EventLocationFields
        location={location}
        onLocationChange={setLocation}
        note={note}
        onNoteChange={setNote}
        notePlaceholder="e.g. Held briefly at customs, released same day"
        coords={coords}
        onCoordsChange={setCoords}
      />

      {state === "error" && (
        <p className="text-sm text-status-exception" role="alert">
          {error}
        </p>
      )}
      {state === "success" && (
        <p className="flex items-center gap-1.5 text-sm text-status-success" aria-live="polite">
          <CheckCircle size={14} weight="bold" aria-hidden="true" />
          Note added.
        </p>
      )}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="rounded-lg border border-border-strong px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-background disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        {state === "submitting" ? "Adding..." : "Add note"}
      </button>
    </form>
  );
}