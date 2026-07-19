"use client";

import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { useTranslations } from "next-intl";
import { SERVICE_ICONS, SERVICE_ROUTING_CODES, type ServiceKey } from "../utils/placeholder-content";

export function ServiceCard({
  serviceKey,
  variant = "compact",
}: {
  serviceKey: ServiceKey;
  variant?: "compact" | "detailed";
}) {
  const t = useTranslations("services");
  const Icon = SERVICE_ICONS[serviceKey];
  const features = t.raw(`${serviceKey}.features`) as string[];

  return (
    <div className="relative border border-dashed border-border-strong bg-elevated p-6">
      <span className="absolute -left-2.5 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-background" aria-hidden="true" />
      <span className="absolute -right-2.5 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-background" aria-hidden="true" />
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-postal">
          <Icon size={20} weight="bold" className="text-postal-foreground" aria-hidden="true" />
        </div>
        <span className="font-mono text-xs tracking-[0.15em] text-foreground/50">
          {SERVICE_ROUTING_CODES[serviceKey]}
        </span>
      </div>
      <p className="mt-5 font-display text-xl font-medium text-foreground">{t(`${serviceKey}.title`)}</p>
      <p className="mt-2 text-base leading-relaxed text-foreground/60">{t(`${serviceKey}.description`)}</p>
      {variant === "detailed" && features.length > 0 && (
        <ul className="mt-5 flex flex-col gap-2 border-t border-border pt-5">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm text-foreground/70">
              <CheckCircle size={16} weight="fill" className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
              {feature}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}