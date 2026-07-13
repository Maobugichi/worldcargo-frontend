"use client";

import { motion } from "motion/react";
import { Lightning, EnvelopeSimple, Globe, ShieldCheck } from "@phosphor-icons/react/dist/ssr";

type Feature = {
  icon: typeof Lightning;
  step: string;
  title: string;
  description: string;
  live?: boolean;
};

const FEATURES: Feature[] = [
  {
    icon: Lightning,
    step: "Received",
    title: "Real-time updates",
    description: "See your shipment's status the moment it changes, not hours later.",
    live: true,
  },
  {
    icon: EnvelopeSimple,
    step: "Notified",
    title: "Email notifications",
    description: "Opt in once and get emailed automatically at every status change.",
  },
  {
    icon: Globe,
    step: "In transit",
    title: "Nationwide coverage",
    description: "From dispatch hub to final delivery, wherever you are.",
  },
  {
    icon: ShieldCheck,
    step: "Delivered",
    title: "Reliable delivery",
    description: "Every shipment is logged and tracked from the moment it's received.",
  },
];

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      className="relative flex flex-col items-start"
    >
      {/* checkpoint marker, sits on top of the connecting route line */}
      <div className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-postal/25 bg-background">
        <feature.icon size={20} weight="bold" className="text-postal" aria-hidden="true" />
        {feature.live && (
          <span
            className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-status-progress ring-2 ring-background"
            aria-hidden="true"
          />
        )}
      </div>

      <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-postal/50">
        {feature.step}
      </p>
      <h3 className="mt-2 font-display text-2xl font-medium leading-tight text-foreground">
        {feature.title}
      </h3>
      <p className="mt-3 max-w-xs text-base leading-relaxed text-foreground/60">
        {feature.description}
      </p>
    </motion.div>
  );
}

export function FeatureHighlights() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24">
      <div className="mb-20 max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-[0.25em] text-postal/70">
          Manifest
        </p>
        <h2 className="mt-4 font-display text-4xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-5xl">
          Every shipment follows a route.
          <br />
          So does every reason to trust it.
        </h2>
        <p className="mt-6 text-lg text-foreground/60">
          Four checkpoints on the way from &ldquo;received&rdquo; to &ldquo;delivered.&rdquo;
        </p>
      </div>

      {/* route line + checkpoints */}
      <div className="relative grid grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {/* horizontal route line, desktop only, runs through icon centers */}
        <div
          className="pointer-events-none absolute left-0 right-0 top-[22px] hidden border-t border-dashed border-postal/25 lg:block"
          aria-hidden="true"
        />
        {FEATURES.map((feature, i) => (
          <FeatureCard key={feature.title} feature={feature} index={i} />
        ))}
      </div>
    </section>
  );
}