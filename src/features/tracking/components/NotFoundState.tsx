import { MagnifyingGlassMinus } from "@phosphor-icons/react";

export function NotFoundState({ trackingNumber }: { trackingNumber: string }) {
  return (
    <div
      className="w-full max-w-xl rounded-xl border border-border bg-elevated p-6 text-center"
      aria-live="polite"
    >
      <MagnifyingGlassMinus size={22} weight="bold" className="mx-auto text-foreground/30" aria-hidden="true" />
      <p className="mt-3 font-medium">We couldn&apos;t find a shipment with that tracking number.</p>
      <p className="mt-1 text-sm text-foreground/50">
        Double-check <span className="font-mono">{trackingNumber}</span> and try again.
      </p>
    </div>
  );
}