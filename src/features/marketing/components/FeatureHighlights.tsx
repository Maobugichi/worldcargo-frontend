"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Lightning, EnvelopeSimple, Globe, ShieldCheck } from "@phosphor-icons/react/dist/ssr";

const FEATURE_ICONS = [Lightning, EnvelopeSimple, Globe, ShieldCheck];
const FEATURE_KEYS = ["feature1", "feature2", "feature3", "feature4"] as const;
const LIVE_INDEX = 0; // feature1 ("Received") shows the live pulse dot

function FeatureCard({
  featureKey,
  icon: Icon,
  index,
}: {
  featureKey: (typeof FEATURE_KEYS)[number];
  icon: typeof Lightning;
  index: number;
}) {
  const t = useTranslations("featureHighlights.features");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      className="relative flex flex-col items-start"
    >
      <div className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-postal-tint/30 bg-background">
        <Icon size={20} weight="bold" className="text-postal-tint" aria-hidden="true" />
        {index === LIVE_INDEX && (
          <span
            className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-status-progress ring-2 ring-background"
            aria-hidden="true"
          />
        )}
      </div>

      <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-postal-tint/70">
        {t(`${featureKey}.step`)}
      </p>
      <h3 className="mt-2 font-display text-2xl font-medium leading-tight text-foreground">
        {t(`${featureKey}.title`)}
      </h3>
      <p className="mt-3 max-w-xs text-base leading-relaxed text-foreground/60">
        {t(`${featureKey}.description`)}
      </p>
    </motion.div>
  );
}

export function FeatureHighlights() {
  const t = useTranslations("featureHighlights");

  return (
    <section className="mx-auto max-w-6xl px-4 py-24">
      <div className="mb-20 max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-[0.25em] text-postal-tint/80">
          {t("eyebrow")}
        </p>
        <h2 className="mt-4 whitespace-pre-line font-display text-4xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-5xl">
          {t("title")}
        </h2>
        <p className="mt-6 text-lg text-foreground/60">{t("subtitle")}</p>
      </div>

      <div className="relative grid grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        <div
          className="pointer-events-none absolute left-0 right-0 top-[22px] hidden border-t border-dashed border-postal-tint/25 lg:block"
          aria-hidden="true"
        />
        {FEATURE_KEYS.map((featureKey, i) => (
          <FeatureCard key={featureKey} featureKey={featureKey} icon={FEATURE_ICONS[i]} index={i} />
        ))}
      </div>
    </section>
  );
}