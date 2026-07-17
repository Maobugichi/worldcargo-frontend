"use client";

import { FormEvent, useState } from "react";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { SHIPMENT_STATUSES, ShipmentStatus } from "../types/admin.types";
import { setShipmentStatus } from "../api/shipments";
import { ApiError } from "@/lib/api-client";
import { EventLocationFields } from "./EventLocationFields";

function formatStatusLabel(status: string) {
  return status
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

interface SetStatusFormProps {
  shipmentId: string;
  currentStatus: ShipmentStatus;
  onUpdated: () => void;
}

export function SetStatusForm({ shipmentId, currentStatus, onUpdated }: SetStatusFormProps) {
  const [status, setStatus] = useState<ShipmentStatus>(currentStatus);
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
      await setShipmentStatus(shipmentId, {
        status,
        location,
        note,
        latitude: coords?.lat,
        longitude: coords?.lng,
      });
      setLocation("");
      setNote("");
      setCoords(null);
      setState("success");
      onUpdated();
    } catch (err) {
      setState("error");
      setError(err instanceof ApiError ? err.message : "Failed to update status.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-xl border border-border bg-elevated p-5">
      <h2 className="text-sm font-semibold text-foreground">Update status</h2>

      <div>
        <label htmlFor="set-status-select" className="mb-1 block text-xs text-foreground/50">
          New status
        </label>
        <select
          id="set-status-select"
          value={status}
          onChange={(e) => setStatus(e.target.value as ShipmentStatus)}
          className="w-full rounded-lg border border-border-strong bg-elevated px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-electric focus-visible:ring-2 focus-visible:ring-electric/30"
        >
          {SHIPMENT_STATUSES.map((s) => (
            <option key={s} value={s}>
              {formatStatusLabel(s)}
            </option>
          ))}
        </select>
      </div>

      <EventLocationFields
        location={location}
        onLocationChange={setLocation}
        locationPlaceholder="e.g. Lagos hub"
        note={note}
        onNoteChange={setNote}
        notePlaceholder="e.g. Left origin facility"
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
          Status updated.
        </p>
      )}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="rounded-lg bg-electric px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric"
      >
        {state === "submitting" ? "Updating..." : "Update status"}
      </button>
    </form>
  );
}