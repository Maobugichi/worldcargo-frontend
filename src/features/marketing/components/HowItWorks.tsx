"use client";

import { motion } from "motion/react";
import { MagnifyingGlass, CaretRight } from "@phosphor-icons/react/dist/ssr";

const STEPS = [
  {
    number: "01",
    title: "Enter your number",
    description: "Type your tracking number into the search box.",
    mockup: (
      <div className="flex items-center gap-2 rounded-full border border-border-strong bg-background/60 px-4 py-3">
        <span className="font-mono text-sm text-foreground/40">TRK</span>
        <span className="h-4 w-px bg-border-strong" aria-hidden="true" />
        <span className="font-mono text-sm text-foreground">2839471</span>
        <MagnifyingGlass size={16} weight="bold" className="ml-auto text-accent" aria-hidden="true" />
      </div>
    ),
  },
  {
    number: "02",
    title: "See live status",
    description: "View the current status, route, and full event timeline.",
    mockup: (
      <div className="rounded-2xl border border-border-strong bg-background/60 px-4 py-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-wide text-status-progress">
            In transit
          </span>
          <span className="text-xs text-foreground/40">2 of 4</span>
        </div>
        <div className="mt-3 flex items-center gap-1" aria-hidden="true">
          <span className="h-1.5 flex-1 rounded-full bg-status-success" />
          <span className="h-1.5 flex-1 rounded-full bg-status-progress" />
          <span className="h-1.5 flex-1 rounded-full bg-border-strong" />
          <span className="h-1.5 flex-1 rounded-full bg-border-strong" />
        </div>
      </div>
    ),
  },
  {
    number: "03",
    title: "Get notified",
    description: "Opt in to email updates so you never have to check manually.",
    mockup: (
      <div className="flex items-center justify-between rounded-2xl border border-border-strong bg-background/60 px-4 py-3">
        <span className="text-sm text-foreground">Email me updates</span>
        <span className="relative h-5 w-9 shrink-0 rounded-full bg-accent" aria-hidden="true">
          <span className="absolute right-0.5 top-0.5 h-4 w-4 rounded-full bg-accent-foreground" />
        </span>
      </div>
    ),
  },
];

export function HowItWorks() {
  return (
    <section className="bg-elevated py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="max-w-xl">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-accent/70">
            Process
          </p>
          <h2 className="mt-4 font-display text-4xl font-medium leading-tight tracking-tight text-foreground sm:text-5xl">
            Three steps. No account required.
          </h2>
        </div>

        <div className="relative mt-16 grid grid-cols-1 gap-14 sm:grid-cols-3 sm:gap-8">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
              className="relative"
            >
              {i < STEPS.length - 1 && (
                <CaretRight
                  size={20}
                  weight="bold"
                  className="absolute -right-6 top-1 hidden text-foreground/20 sm:block"
                  aria-hidden="true"
                />
              )}

              <p className="font-mono text-sm text-foreground/40">{step.number}</p>
              <h3 className="mt-1 font-display text-xl font-medium text-foreground">
                {step.title}
              </h3>

              <div className="mt-5">{step.mockup}</div>

              <p className="mt-5 text-base leading-relaxed text-foreground/60">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}