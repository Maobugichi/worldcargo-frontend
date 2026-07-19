"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";
import { SERVICE_KEYS } from "../utils/placeholder-content";
import { ServiceCard } from "../components/ServiceCard";

export function ServicesTeaser() {
  const t = useTranslations("servicesTeaser");
  const preview = SERVICE_KEYS.slice(0, 3);

  return (
    <section className="mx-auto max-w-6xl px-4 py-24">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-xl">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-postal-tint/80">{t("eyebrow")}</p>
          <h2 className="mt-4 font-display text-4xl font-medium leading-tight tracking-tight text-foreground sm:text-5xl">
            {t("title")}
          </h2>
        </div>
        <Link href="/services" className="group hidden shrink-0 items-center gap-1.5 text-sm font-medium text-electric sm:flex">
          {t("seeAll")}
          <CaretRight size={14} weight="bold" className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {preview.map((serviceKey, i) => (
          <motion.div
            key={serviceKey}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, delay: i * 0.06, ease: "easeOut" }}
          >
            <ServiceCard serviceKey={serviceKey} variant="compact" />
          </motion.div>
        ))}
      </div>

      <div className="mt-8 sm:hidden">
        <Link href="/services" className="inline-flex items-center gap-1.5 text-sm font-medium text-electric">
          {t("seeAll")}
          <CaretRight size={14} weight="bold" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}