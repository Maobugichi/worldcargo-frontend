"use client";

import { motion } from "motion/react";
import { SERVICES } from "../utils/placeholder-content";
import { ServiceRow } from "../components/ServiceRow";

export function ServicesPage() {
  return (
    <main className="mx-auto max-w-4xl flex-1 px-4 py-24">
      <p className="text-sm font-medium uppercase tracking-[0.25em] text-postal/70">
        Directory
      </p>
      <h1 className="mt-4 font-display text-4xl font-medium leading-tight tracking-tight text-foreground sm:text-5xl">
        Services
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/60">
        What we offer, from everyday deliveries to international shipping.
      </p>

      <div className="mt-14 border-t border-border">
        {SERVICES.map((service, i) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, delay: i * 0.06, ease: "easeOut" }}
          >
            <ServiceRow service={service} />
          </motion.div>
        ))}
      </div>
    </main>
  );
}