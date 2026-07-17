"use client"

import { Package, Truck, Globe, Warehouse, Lightning, ShieldCheck, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import type { ServiceItem } from "../utils/placeholder-content";

function routingCode(title: string) {
  const words = title.trim().split(/\s+/);
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
  return title.slice(0, 2).toUpperCase();
}

const ICON_RULES: Array<[RegExp, typeof Package]> = [
  [/express|same-day|fast/, Lightning],
  [/international|global/, Globe],
  [/warehous|storage/, Warehouse],
  [/freight|truck|delivery/, Truck],
  [/insur|secure|protect/, ShieldCheck],
];

function serviceIcon(title: string) {
  const t = title.toLowerCase();
  const match = ICON_RULES.find(([pattern]) => pattern.test(t));
  return match ? match[1] : Package;
}

export function ServiceCard({
  service,
  variant = "compact",
}: {
  service: ServiceItem;
  variant?: "compact" | "detailed";
}) {
  const Icon = serviceIcon(service.title);
  return (
    <div className="relative border border-dashed border-border-strong bg-elevated p-6">
      <span className="absolute -left-2.5 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-background" aria-hidden="true" />
      <span className="absolute -right-2.5 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-background" aria-hidden="true" />
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-postal">
          <Icon size={20} weight="bold" className="text-postal-foreground" aria-hidden="true" />
        </div>
        <span className="font-mono text-xs tracking-[0.15em] text-foreground/50">
          {routingCode(service.title)}
        </span>
      </div>
      <p className="mt-5 font-display text-xl font-medium text-foreground">
        {service.title}
      </p>
      <p className="mt-2 text-base leading-relaxed text-foreground/60">
        {service.description}
      </p>
      {variant === "detailed" && service.features && service.features.length > 0 && (
        <ul className="mt-5 flex flex-col gap-2 border-t border-border pt-5">
          {service.features.map((feature) => (
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