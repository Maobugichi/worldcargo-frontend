import { useTranslations } from "next-intl";
import { MagnifyingGlassMinus } from "@phosphor-icons/react";

export function NotFoundState({ trackingNumber }: { trackingNumber: string }) {
  const t = useTranslations("notFoundState");

  return (
    <div className="w-full max-w-xl rounded-xl border border-border bg-elevated p-6 text-center" aria-live="polite">
      <MagnifyingGlassMinus size={22} weight="bold" className="mx-auto text-foreground/30" aria-hidden="true" />
      <p className="mt-3 font-medium">{t("title")}</p>
      <p className="mt-1 text-sm text-foreground/50">
        {t.rich("description", {
          trackingNumber: () => <span className="font-mono">{trackingNumber}</span>,
        })}
      </p>
    </div>
  );
}