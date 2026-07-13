"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import {
  GlobeHemisphereWest,
  Users,
  Truck,
  CalendarBlank,
} from "@phosphor-icons/react";

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

const METRICS = [
  { icon: GlobeHemisphereWest, value: 150, suffix: "+", label: "Countries Served" },
  { icon: Users, value: 45, suffix: "k+", label: "Global Employees" },
  { icon: Truck, value: 2, suffix: "M+", label: "Daily Deliveries" },
  { icon: CalendarBlank, value: 25, suffix: "+", label: "Years Experience" },
];

const TEAM = [
  {
    name: "Bradley Henderson",
    role: "Chief Executive Officer",
    image: "/mostafa.jpg",
  },
  {
    name: "Dominic Hayes",
    role: "Chief Operating Officer",
    image: "/makeen.jpg",
  },
  {
    name: "Ian Gallagher",
    role: "VP, Logistics",
    image: "/diego.jpg",
  },
];

function StatCounter({ value, suffix }: { value: number; suffix: string }) {
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  const start = () => {
    if (started.current) return;
    started.current = true;

    const duration = 1600;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplay(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  return (
    <motion.span
      onViewportEnter={start}
      viewport={{ once: true, margin: "-80px" }}
      className="font-display text-4xl font-medium tabular-nums text-foreground sm:text-5xl"
    >
      {display}
      {suffix}
    </motion.span>
  );
}

export function AboutPage() {
  return (
    <main className="flex-1">
      {/* Banner */}
      <section className="relative overflow-hidden bg-postal py-28">
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.15]"
          preserveAspectRatio="none"
          viewBox="0 0 1200 400"
        >
          <path
            d="M -50 350 Q 300 250 600 300 T 1250 150"
            fill="none"
            stroke="var(--color-postal-foreground)"
            strokeWidth="2"
            strokeDasharray="10 10"
          />
        </svg>
        <div className="relative mx-auto max-w-3xl px-4 text-center">
         
          <h1 className="mt-4 font-display text-5xl font-medium leading-tight tracking-tight text-postal-foreground sm:text-6xl">
            About World Cargo Express
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-postal-foreground/70">
            Connecting the world through innovative logistics and unwavering reliability since 1998.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4">
        {/* Our Story */}
        <section className="grid grid-cols-1 items-center gap-10 py-24 sm:grid-cols-2 sm:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-postal/70">
              Our story
            </p>
            <h2 className="mt-4 font-display text-4xl font-medium leading-tight tracking-tight text-foreground sm:text-5xl">
              Built by people who move things for a living
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-foreground/60">
              Founded in 1998 with a single delivery van and a vision to simplify local shipping, World Cargo Express has been at the forefront of global logistics since 1998.

We recognized early on that technology would revolutionize logistics. By investing heavily in tracking infrastructure and automated sorting facilities, we set new standards for transparency and speed.

Today, we operate a massive fleet of vehicles and aircraft, serving millions of customers across 150+ countries. Yet, our core mission remains unchanged: to deliver your promises, on time, every time.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
            className="relative aspect-[4/5] overflow-hidden rounded-sm border border-border bg-surface sm:aspect-square"
          >
            <Image
              src="/william.jpg"
              alt="Our team at work"
              fill
              className="object-cover"
            />
          </motion.div>
        </section>

        {/* Trust metrics */}
        <section className="border-t border-border py-20">
          <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-4">
            {METRICS.map((metric, i) => {
              const Icon = metric.icon;
              return (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.45, delay: i * 0.08, ease: "easeOut" }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-postal">
                    <Icon className="h-6 w-6 text-postal-foreground" weight="light" />
                  </div>
                  <div className="mt-4">
                    <StatCounter value={metric.value} suffix={metric.suffix} />
                  </div>
                  <p className="mt-1 text-sm uppercase tracking-[0.15em] text-foreground/50">
                    {metric.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Meet the team */}
        <section className="border-t border-border py-24">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-postal/70">
            Team
          </p>
          <h2 className="mt-4 font-display text-3xl font-medium leading-tight tracking-tight text-foreground sm:text-4xl">
            Meet the team
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name + i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45, delay: i * 0.08, ease: "easeOut" }}
                className="flex h-[440px] flex-col overflow-hidden rounded-sm border border-border bg-surface"
              >
                <div className="relative h-[90%] w-full">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover grayscale transition-all duration-300 hover:grayscale-0"
                  />
                </div>
                <div className="flex flex-1 flex-col items-start justify-center px-4">
                  <p className="font-display text-lg font-medium text-foreground">
                    {member.name}
                  </p>
                  <p className="mt-0.5 text-xs uppercase tracking-[0.15em] text-foreground/50">
                    {member.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Values */}
        <div className="border-t border-border pb-24">
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
      </div>
    </main>
  );
}