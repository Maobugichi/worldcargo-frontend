"use client";

import { motion, useReducedMotion } from "motion/react";
import { Star } from "@phosphor-icons/react/dist/ssr";
import { TESTIMONIALS } from "../utils/placeholder-content";
import Image from "next/image";

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function StarRating() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="flex items-center gap-0.5" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.span
          key={i}
          className="inline-flex"
          animate={
            shouldReduceMotion ? undefined : { opacity: [1, 0.35, 1], scale: [1, 1.3, 1] }
          }
          transition={{
            duration: 1.2,
            repeat: Infinity,
            repeatDelay: 2.4,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
        >
          <Star
            size={14}
            weight="fill"
            className="text-gold drop-shadow-[0_0_4px_rgba(242,185,12,0.7)]"
            aria-hidden="true"
          />
        </motion.span>
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="relative mx-auto max-w-6xl overflow-hidden px-4 py-24">
      {/* Refraction filter powering the card's liquid-glass lensing. Zero-size + hidden: not decorative on its own. */}
      <svg className="absolute h-0 w-0" aria-hidden="true" focusable="false">
        <filter id="glass-distortion" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.008 0.012" numOctaves="2" seed="8" result="noise" />
          <feGaussianBlur in="noise" stdDeviation="2" result="softNoise" />
          <feDisplacementMap in="SourceGraphic" in2="softNoise" scale="28" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 [background-image:radial-gradient(circle,rgba(20,23,27,0.08)_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

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
            className="glass-card rounded-2xl p-8"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-postal/50">
                REF · {String(i + 1).padStart(3, "0")}
              </span>
              <StarRating />
            </div>
            <p className="mt-4 font-display text-xl leading-relaxed text-foreground">
              &ldquo;{testimonial.quote}&rdquo;
            </p>
            <div className="mt-6 flex items-center gap-3 border-t border-dashed border-border pt-4">
              {testimonial.photo ? (
                <Image
                  src={testimonial.photo}
                  alt={testimonial.name}
                  width={40}
                  height={40}
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