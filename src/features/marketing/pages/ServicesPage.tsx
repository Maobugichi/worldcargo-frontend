"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { SERVICE_KEYS } from "../utils/placeholder-content";
import { ServiceCard } from "../components/ServiceCard";

export function ServicesPage() {
  const t = useTranslations("servicesPage");

  return (
    <main className="mx-auto max-w-5xl flex-1 px-4 py-24">
      <p className="text-sm font-medium uppercase tracking-[0.25em] text-postal-tint/80">{t("eyebrow")}</p>
      <h1 className="mt-4 font-display text-4xl font-medium leading-tight tracking-tight text-foreground sm:text-5xl">
        {t("title")}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/60">{t("description")}</p>

      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICE_KEYS.map((serviceKey, i) => (
          <motion.div
            key={serviceKey}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, delay: i * 0.06, ease: "easeOut" }}
          >
            <ServiceCard serviceKey={serviceKey} variant="detailed" />
          </motion.div>
        ))}
      </div>
    </main>
  );
}