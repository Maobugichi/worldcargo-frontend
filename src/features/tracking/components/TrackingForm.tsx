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
    <div className="w-full max-w-lg rounded-xl border border-border-strong bg-elevated p-1.5">
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col items-stretch gap-2 sm:flex-row sm:items-center"
      >
        <label htmlFor="tracking-form-input" className="sr-only">
          Tracking number
        </label>
        <input
          id="tracking-form-input"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter your tracking number"
          className="min-w-0 flex-1 bg-transparent px-3 py-2.5 font-mono text-base tracking-wide text-foreground outline-none placeholder:text-foreground/40 placeholder:tracking-normal"
          autoComplete="off"
          autoCapitalize="characters"
        />
        <button
          type="submit"
          disabled={isLoading || value.trim().length === 0}
          className="shrink-0 rounded-xl bg-electric px-6 py-3 text-base font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isLoading ? "Tracking..." : "Track shipment"}
        </button>
      </form>
    </div>
  );
}