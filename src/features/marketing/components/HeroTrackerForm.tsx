"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function HeroTrackerForm() {
  const router = useRouter();
  const [value, setValue] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    if (trimmed) {
      router.push(`/track?number=${encodeURIComponent(trimmed)}`);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col items-stretch gap-2 sm:flex-row sm:items-center"
    >
      <label htmlFor="tracking-number" className="sr-only">
        Tracking number
      </label>
      <input
        id="tracking-number"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter your tracking number"
        className="min-w-0 flex-1 bg-transparent px-3 py-2.5 font-mono text-base tracking-wide text-postal outline-none placeholder:text-postal/40 placeholder:tracking-normal"
        autoComplete="off"
        autoCapitalize="characters"
      />
      <button
        type="submit"
        disabled={value.trim().length === 0}
        className="shrink-0 rounded-xl bg-electric px-6 py-3 text-base font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Track shipment
      </button>
    </form>
  );
}