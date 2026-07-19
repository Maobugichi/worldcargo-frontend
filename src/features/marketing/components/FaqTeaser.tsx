"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";
import { FAQ_KEYS } from "../utils/placeholder-content";
import { FaqAccordionItem } from "../components/FaqAccordionItem";

export function FaqTeaser() {
  const t = useTranslations("faqTeaser");
  const topThree = FAQ_KEYS.slice(0, 3);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-elevated py-24">
      <div className="mx-auto max-w-3xl px-4">
        <div className="max-w-xl">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-postal-tint/80">
            {t("eyebrow")}
          </p>
          <h2 className="mt-4 font-display text-4xl font-medium leading-tight tracking-tight text-foreground sm:text-5xl">
            {t("title")}
          </h2>
        </div>

        <div className="mt-14 border-t border-border">
          {topThree.map((faqKey, i) => (
            <FaqAccordionItem
              key={faqKey}
              faqKey={faqKey}
              id={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link href="/faq" className="group inline-flex items-center gap-1.5 text-sm font-medium text-electric">
            {t("seeAll")}
            <CaretRight
              size={14}
              weight="bold"
              className="transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}