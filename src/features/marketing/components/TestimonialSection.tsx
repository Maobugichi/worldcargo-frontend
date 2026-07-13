"use client";

import { motion } from "motion/react";
import { TESTIMONIALS } from "../utils/placeholder-content";

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function TestimonialsSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24">
      <div className="max-w-xl">
        <p className="text-sm font-medium uppercase tracking-[0.25em] text-postal/70">
          Feedback
        </p>
        <h2 className="mt-4 font-display text-4xl font-medium leading-tight tracking-tight text-foreground sm:text-5xl">
          What people say once it arrives.
        </h2>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-3">
        {TESTIMONIALS.map((testimonial, i) => (
          <motion.div
            key={testimonial.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
            className="rounded-2xl border border-border bg-surface p-8"
          >
            <span className="font-mono text-xs text-postal/50">
              REF · {String(i + 1).padStart(3, "0")}
            </span>
            <p className="mt-4 font-display text-xl leading-relaxed text-foreground">
              &ldquo;{testimonial.quote}&rdquo;
            </p>
            <div className="mt-6 flex items-center gap-3 border-t border-dashed border-border pt-4">
              {testimonial.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={testimonial.photo}
                  alt=""
                  className="h-10 w-10 shrink-0 rounded-full object-cover"
                />
              ) : (
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-postal/10 text-sm font-medium text-postal"
                  aria-hidden="true"
                >
                  {initials(testimonial.name)}
                </span>
              )}
              <div>
                <p className="text-sm font-medium text-foreground">{testimonial.name}</p>
                <p className="text-sm text-foreground/50">{testimonial.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}