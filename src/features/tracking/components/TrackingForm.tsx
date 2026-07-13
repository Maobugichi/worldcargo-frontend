"use client";

import { FormEvent, useState } from "react";

interface TrackingFormProps {
  onSubmit: (trackingNumber: string) => void;
  isLoading: boolean;
}

export function TrackingForm({ onSubmit, isLoading }: TrackingFormProps) {
  const [value, setValue] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    if (trimmed) {
      onSubmit(trimmed);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-xl gap-2">
      <label htmlFor="tracking-form-input" className="sr-only">
        Tracking number
      </label>
      <input
        id="tracking-form-input"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter your tracking number"
        className="flex-1 rounded-lg border border-border-strong bg-surface px-4 py-3 font-mono text-base tracking-wide text-foreground outline-none transition-colors focus:border-accent focus-visible:ring-2 focus-visible:ring-accent/30"
        autoComplete="off"
        autoCapitalize="characters"
      />
      <button
        type="submit"
        disabled={isLoading || value.trim().length === 0}
        className="rounded-lg bg-accent px-6 py-3 text-base font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        {isLoading ? "Tracking..." : "Track shipment"}
      </button>
    </form>
  );
}