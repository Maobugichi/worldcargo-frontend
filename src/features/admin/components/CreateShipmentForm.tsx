"use client";

import { FormEvent, useState } from "react";
import { createShipment } from "../api/shipments";
import { Shipment } from "../types/admin.types";
import { ApiError } from "@/lib/api-client";

export function CreateShipmentForm({ onCreated }: { onCreated: (shipment: Shipment) => void }) {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [eta, setEta] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [emailOptIn, setEmailOptIn] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const shipment = await createShipment({
        origin,
        destination,
        eta: eta || undefined,
        recipientName: recipientName || undefined,
        recipientEmail: recipientEmail || undefined,
        emailOptIn,
      });
      onCreated(shipment);
      setOrigin("");
      setDestination("");
      setEta("");
      setRecipientName("");
      setRecipientEmail("");
      setEmailOptIn(false);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to create shipment.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-xl border border-foreground/10 bg-white p-5">
      <h2 className="text-sm font-semibold">New shipment</h2>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-xs text-foreground/50">Origin</label>
          <input
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            required
            className="w-full rounded-lg border border-foreground/15 px-3 py-2 text-sm outline-none focus:border-accent"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-foreground/50">Destination</label>
          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
            className="w-full rounded-lg border border-foreground/15 px-3 py-2 text-sm outline-none focus:border-accent"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-xs text-foreground/50">ETA (optional)</label>
        <input
          type="date"
          value={eta}
          onChange={(e) => setEta(e.target.value)}
          className="w-full rounded-lg border border-foreground/15 px-3 py-2 text-sm outline-none focus:border-accent"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-xs text-foreground/50">Recipient name (optional)</label>
          <input
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            className="w-full rounded-lg border border-foreground/15 px-3 py-2 text-sm outline-none focus:border-accent"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-foreground/50">Recipient email (optional)</label>
          <input
            type="email"
            value={recipientEmail}
            onChange={(e) => {
              setRecipientEmail(e.target.value);
              if (!e.target.value) setEmailOptIn(false);
            }}
            className="w-full rounded-lg border border-foreground/15 px-3 py-2 text-sm outline-none focus:border-accent"
          />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={emailOptIn}
          onChange={(e) => setEmailOptIn(e.target.checked)}
          disabled={!recipientEmail}
        />
        Opt this recipient into email updates
      </label>

      {error && <p className="text-sm text-status-exception">{error}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground disabled:opacity-50"
      >
        {isSubmitting ? "Creating..." : "Create shipment"}
      </button>
    </form>
  );
}