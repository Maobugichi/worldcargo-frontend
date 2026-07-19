"use client";

import { Plus } from "@phosphor-icons/react/dist/ssr";
import { useTranslations } from "next-intl";
import type { FaqKey } from "../utils/placeholder-content";

export function FaqAccordionItem({
  faqKey,
  isOpen,
  onToggle,
  id,
}: {
  faqKey: FaqKey;
  isOpen: boolean;
  onToggle: () => void;
  id: string | number;
}) {
  const t = useTranslations("faqs");
  const buttonId = `faq-button-${id}`;
  const panelId = `faq-panel-${id}`;

  return (
    <div className="border-b border-border">
      <button
        id={buttonId}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-6 py-6 text-left"
      >
        <span className="font-display text-lg font-medium text-foreground sm:text-xl">
          {t(`${faqKey}.question`)}
        </span>
        <Plus
          size={18}
          weight="bold"
          className={`shrink-0 text-postal-tint transition-transform duration-200 motion-reduce:transition-none ${
            isOpen ? "rotate-45" : "rotate-0"
          }`}
          aria-hidden="true"
        />
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <p className="max-w-2xl pb-6 text-base leading-relaxed text-foreground/60">
            {t(`${faqKey}.answer`)}
          </p>
        </div>
      </div>
    </div>
  );
}