"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { FAQ_KEYS } from "../utils/placeholder-content";
import { FaqAccordionItem } from "../components/FaqAccordionItem";

export function FaqPage() {
  const t = useTranslations("faqPage");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <main className="mx-auto max-w-3xl flex-1 px-4 py-24">
      <p className="text-sm font-medium uppercase tracking-[0.25em] text-postal/70">{t("eyebrow")}</p>
      <h1 className="mt-4 font-display text-4xl font-medium leading-tight tracking-tight text-foreground sm:text-5xl">
        {t("title")}
      </h1>

      <div className="mt-14 border-t border-border">
        {FAQ_KEYS.map((faqKey, i) => (
          <FaqAccordionItem
            key={faqKey}
            faqKey={faqKey}
            id={i}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </div>
    </main>
  );
}