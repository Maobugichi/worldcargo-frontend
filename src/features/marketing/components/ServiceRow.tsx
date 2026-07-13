import type { ServiceItem } from "../utils/placeholder-content";

// Derives a short routing code from a service name, e.g. "Standard Delivery" -> "SD",
// "Warehousing" -> "WA". Purely cosmetic, always in sync with real content.
function routingCode(title: string) {
  const words = title.trim().split(/\s+/);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return title.slice(0, 2).toUpperCase();
}

export function ServiceRow({ service }: { service: ServiceItem }) {
  return (
    <div className="flex flex-col gap-3 border-b border-border py-7 sm:flex-row sm:items-center sm:gap-8">
      <span className="font-mono text-sm text-postal/50 sm:w-14 sm:shrink-0">
        {routingCode(service.title)}
      </span>
      <div className="flex-1">
        <p className="font-display text-xl font-medium text-foreground">{service.title}</p>
        <p className="mt-1.5 max-w-md text-base leading-relaxed text-foreground/60">
          {service.description}
        </p>
      </div>
    </div>
  );
}