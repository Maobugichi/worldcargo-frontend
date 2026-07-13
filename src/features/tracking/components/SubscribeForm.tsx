"use client";

import { FormEvent, useState } from "react";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { subscribeToUpdates } from "../api/subscribe";
import { ApiError } from "@/lib/api-client";

export function SubscribeForm({ trackingNumber }: { trackingNumber: string }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setState("submitting");
    setError(null);

    try {
      await subscribeToUpdates(trackingNumber, email);
      setState("done");
    } catch (err) {
      setState("error");
      setError(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (state === "done") {
    return (
      <div
        className="flex w-full max-w-xl items-start gap-3 rounded-2xl border border-border bg-surface p-6"
        aria-live="polite"
      >
        <CheckCircle
          size={22}
          weight="fill"
          className="mt-0.5 shrink-0 text-status-success"
          aria-hidden="true"
        />
        <p className="text-base leading-relaxed text-foreground">
          You&apos;re subscribed to updates for this shipment.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-xl flex-col items-center gap-2">
      <p className="text-sm text-foreground/50">Get an email whenever this shipment updates.</p>
      <div className="flex w-full gap-2">
        <label htmlFor="subscribe-email" className="sr-only">
          Email address
        </label>
        <input
          id="subscribe-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="you@example.com"
          aria-invalid={state === "error"}
          aria-describedby={state === "error" ? "subscribe-error" : undefined}
          className="flex-1 rounded-lg border border-border-strong bg-surface px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-accent focus-visible:ring-2 focus-visible:ring-accent/30"
        />
        <button
          type="submit"
          disabled={state === "submitting"}
          className="rounded-lg border border-border-strong px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-background disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {state === "submitting" ? "Subscribing..." : "Subscribe"}
        </button>
      </div>
      {state === "error" && (
        <p id="subscribe-error" className="text-sm text-status-exception" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}