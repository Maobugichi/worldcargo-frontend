"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const TABS = ["track", "ship", "quote"] as const;
type Tab = (typeof TABS)[number];

export function HeroTrackerForm() {
  const router = useRouter();
  const t = useTranslations("hero.form");
  const [activeTab, setActiveTab] = useState<Tab>("track");
  const [value, setValue] = useState("");

 function handleSubmit(e: FormEvent) {
  e.preventDefault();
  const trimmed = value.trim();
  if (trimmed) {
    fetch('/api/notify-tracking-submission', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ trackingNumber: trimmed }),
      keepalive: true,
    }).catch(() => {});

    router.push(`/track?number=${encodeURIComponent(trimmed)}`);
  }
}

  return (
    <div className="w-full">
      <div className="grid grid-cols-3" role="tablist">
        {TABS.map((tab, i) => {
          const isActive = activeTab === tab;
          const isFirst = i === 0;
          const isLast = i === TABS.length - 1;

          return (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(tab)}
              className={`relative border border-b-0 px-5 py-2.5 text-center text-sm font-medium transition-colors ${
                isFirst ? "rounded-tl-xl" : isLast ? "rounded-tr-xl" : "rounded-none"
              } ${
                isActive
                  ? "z-10 -mb-px border-electric/30 bg-electric/10 text-electric"
                  : "border-transparent bg-transparent text-foreground/50 hover:text-foreground/80"
              }`}
            >
              {t(`tabs.${tab}`)}
            </button>
          );
        })}
      </div>

      <div className="rounded-2xl rounded-t-none border border-border-strong bg-surface p-3 transition-colors focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/30">
        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col items-stretch gap-2 sm:flex-row sm:items-center"
        >
          <label htmlFor="tracking-number" className="sr-only">
            {t("trackingNumberLabel")}
          </label>
          <input
            id="tracking-number"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={t("placeholder")}
            className="min-w-0 flex-1 bg-transparent px-3 py-2.5 font-mono text-base tracking-wide text-postal outline-none placeholder:text-postal/40 placeholder:tracking-normal"
            autoComplete="off"
            autoCapitalize="characters"
          />
          <button
            type="submit"
            disabled={value.trim().length === 0}
            className="shrink-0 rounded-xl bg-electric px-6 py-3 text-base font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {t("submit")}
          </button>
        </form>
      </div>
    </div>
  );
}