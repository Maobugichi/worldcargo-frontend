"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import {
  GlobeHemisphereWest,
  Users,
  Truck,
  CalendarBlank,
} from "@phosphor-icons/react";

const VALUE_KEYS = ["reliability", "transparency", "speed"] as const;
const VALUE_CODES: Record<(typeof VALUE_KEYS)[number], string> = {
  reliability: "RE",
  transparency: "TR",
  speed: "SP",
};

const METRIC_KEYS = ["countries", "employees", "dailyDeliveries", "yearsExperience"] as const;
const METRICS: Array<{
  key: (typeof METRIC_KEYS)[number];
  icon: typeof GlobeHemisphereWest;
  value: number;
  suffix: string;
}> = [
  { key: "countries", icon: GlobeHemisphereWest, value: 150, suffix: "+" },
  { key: "employees", icon: Users, value: 45, suffix: "k+" },
  { key: "dailyDeliveries", icon: Truck, value: 2, suffix: "M+" },
  { key: "yearsExperience", icon: CalendarBlank, value: 25, suffix: "+" },
];

const TEAM_ROLE_KEYS = ["ceo", "coo", "vpLogistics"] as const;
const TEAM: Array<{ name: string; roleKey: (typeof TEAM_ROLE_KEYS)[number]; image: string }> = [
  { name: "Bradley Henderson", roleKey: "ceo", image: "/mostafa.jpg" },
  { name: "Dominic Hayes", roleKey: "coo", image: "/makeen.jpg" },
  { name: "Ian Gallagher", roleKey: "vpLogistics", image: "/diego.jpg" },
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
  const t = useTranslations("aboutPage");
  const paragraphs = t.raw("story.paragraphs") as string[];

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
            {t("banner.title")}
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-postal-foreground/70">
            {t("banner.subtitle")}
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
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-postal-tint/80">
              {t("story.eyebrow")}
            </p>
            <h2 className="mt-4 font-display text-4xl font-medium leading-tight tracking-tight text-foreground sm:text-5xl">
              {t("story.title")}
            </h2>
            <div className="mt-5 max-w-md space-y-4 text-base leading-relaxed text-foreground/60">
              {paragraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
            className="relative aspect-[4/5] overflow-hidden rounded-sm border border-border bg-elevated sm:aspect-square"
          >
            <Image
              src="/william.jpg"
              alt={t("story.imageAlt")}
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
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
                  key={metric.key}
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
                    {t(`metrics.${metric.key}`)}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Meet the team */}
        <section className="border-t border-border py-24">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-postal-tint/80">
            {t("team.eyebrow")}
          </p>
          <h2 className="mt-4 font-display text-3xl font-medium leading-tight tracking-tight text-foreground sm:text-4xl">
            {t("team.title")}
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45, delay: i * 0.08, ease: "easeOut" }}
                className="flex h-[440px] flex-col overflow-hidden rounded-sm border border-border bg-elevated"
              >
                <div className="relative h-[90%] w-full">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col items-start justify-center px-4">
                  <p className="font-display text-lg font-medium text-foreground">{member.name}</p>
                  <p className="mt-0.5 text-xs uppercase tracking-[0.15em] text-foreground/50">
                    {t(`team.roles.${member.roleKey}`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Values */}
        <div className="border-t border-border pb-24">
          {VALUE_KEYS.map((valueKey, i) => (
            <motion.div
              key={valueKey}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: i * 0.08, ease: "easeOut" }}
              className="flex flex-col gap-2 border-b border-border py-7 sm:flex-row sm:items-baseline sm:gap-8"
            >
              <span className="font-mono text-sm text-postal-tint/70 sm:w-14 sm:shrink-0">
                {VALUE_CODES[valueKey]}
              </span>
              <div>
                <p className="font-display text-xl font-medium text-foreground">
                  {t(`values.${valueKey}.title`)}
                </p>
                <p className="mt-1.5 max-w-md text-base leading-relaxed text-foreground/60">
                  {t(`values.${valueKey}.description`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}