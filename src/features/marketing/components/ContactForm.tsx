"use client";

import { FormEvent, useState } from "react";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { submitContactForm } from "../api/contact";
import { ApiError } from "@/lib/api-client";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await submitContactForm({ name, email, message });
      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "Something went wrong sending your message."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div
        className="flex items-start gap-3 rounded-2xl border border-border bg-surface p-6"
        aria-live="polite"
      >
        <CheckCircle
          size={22}
          weight="fill"
          className="mt-0.5 shrink-0 text-status-success"
          aria-hidden="true"
        />
        <p className="text-base leading-relaxed text-foreground">
          Thanks, {name || "there"} — we&apos;ll get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-foreground">
          Name
        </label>
        <input
          id="contact-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full rounded-lg border border-border-strong bg-surface px-4 py-3 text-base text-foreground outline-none transition-colors focus:border-accent focus-visible:ring-2 focus-visible:ring-accent/30"
        />
      </div>
      <div>
        <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-foreground">
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full rounded-lg border border-border-strong bg-surface px-4 py-3 text-base text-foreground outline-none transition-colors focus:border-accent focus-visible:ring-2 focus-visible:ring-accent/30"
        />
      </div>
      <div>
        <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-foreground">
          Message
        </label>
        <textarea
          id="contact-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={6}
          className="w-full rounded-lg border border-border-strong bg-surface px-4 py-3 text-base text-foreground outline-none transition-colors focus:border-accent focus-visible:ring-2 focus-visible:ring-accent/30"
        />
      </div>

      {error && <p className="text-sm text-status-exception">{error}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-lg bg-accent px-6 py-3 text-base font-medium text-accent-foreground transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-50"
      >
        {isSubmitting ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}