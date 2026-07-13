"use client";

import { motion } from "motion/react";
import { HeroTrackerForm } from "./HeroTrackerForm";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 py-24 sm:py-32">
      {/* faint route arc — the journey motif this whole page is built around */}
      <svg
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full text-postal/10"
        preserveAspectRatio="none"
        viewBox="0 0 1200 600"
        aria-hidden="true"
      >
        <path
          d="M -100 500 Q 300 150, 600 300 T 1300 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="2 10"
          strokeLinecap="round"
        />
      </svg>

      <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-sm font-medium uppercase tracking-[0.25em] text-postal/70"
        >
          Track a parcel
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05, ease: "easeOut" }}
          className="max-w-2xl font-display text-5xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl"
        >
         Ship Anywhere.
          Track Everything.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="max-w-lg text-lg leading-relaxed text-foreground/60"
        >
          Enterprise-grade logistics infrastructure trusted by 10,000+ businesses worldwide for secure, fast, and reliable delivery solutions. Real-time visibility from pickup to delivery.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          className="w-full max-w-xl"
        >
          <div className="rounded-2xl border border-border-strong bg-surface p-3 transition-colors focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/30">
            <HeroTrackerForm />
          </div>

          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-xs text-foreground/60">
            <span className="h-1.5 w-1.5 rounded-full bg-status-progress" aria-hidden="true" />
            Live tracking, no account needed
          </div>
        </motion.div>
      </div>
    </section>
  );
}