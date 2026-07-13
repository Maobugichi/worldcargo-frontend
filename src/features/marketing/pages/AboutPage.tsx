"use client";

import { motion } from "motion/react";

const VALUES = [
  {
    code: "RE",
    title: "Reliability",
    description: "Every shipment tracked and accounted for, start to finish.",
  },
  {
    code: "TR",
    title: "Transparency",
    description: "You always know exactly where things stand — no guesswork.",
  },
  {
    code: "SP",
    title: "Speed",
    description: "Fast, dependable delivery, every time.",
  },
];

export function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl flex-1 px-4 py-24">
      <p className="text-sm font-medium uppercase tracking-[0.25em] text-postal/70">
        About
      </p>
      <h1 className="mt-4 font-display text-4xl font-medium leading-tight tracking-tight text-foreground sm:text-5xl">
        About us
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/60">
        We built this platform to make shipping and delivery simple, transparent,
        and dependable. Whatever you&apos;re sending, our goal is to make sure you
        always know exactly where it is.
      </p>

      <div className="mt-16 border-t border-border">
        {VALUES.map((value, i) => (
          <motion.div
            key={value.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, delay: i * 0.08, ease: "easeOut" }}
            className="flex flex-col gap-2 border-b border-border py-7 sm:flex-row sm:items-baseline sm:gap-8"
          >
            <span className="font-mono text-sm text-postal/50 sm:w-14 sm:shrink-0">
              {value.code}
            </span>
            <div>
              <p className="font-display text-xl font-medium text-foreground">
                {value.title}
              </p>
              <p className="mt-1.5 max-w-md text-base leading-relaxed text-foreground/60">
                {value.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}