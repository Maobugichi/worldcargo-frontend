"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { HeroTrackerForm } from "./HeroTrackerForm";

export function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative overflow-hidden px-4 py-24 sm:py-32">
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
          className="text-sm font-medium uppercase tracking-[0.25em] text-foreground/70"
        >
          {t("eyebrow")}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05, ease: "easeOut" }}
          className="max-w-2xl font-display text-5xl font-medium leading-[1.05] tracking-tight text-electric sm:text-6xl lg:text-7xl"
        >
          {t("title")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="max-w-lg text-lg leading-relaxed text-foreground/60"
        >
          {t("description")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          className="w-full max-w-xl"
        >
          <HeroTrackerForm />

          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-xs text-foreground/60">
            <span className="h-1.5 w-1.5 rounded-full bg-status-progress" aria-hidden="true" />
            {t("liveTracking")}
          </div>
        </motion.div>
      </div>
    </section>
  );
}