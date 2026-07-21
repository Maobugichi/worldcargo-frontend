import { useTranslations } from "next-intl";
import { MapPin } from "@phosphor-icons/react";
import { ShipmentSummary } from "../types/tracking.types";
import { StatusPill } from "./StatusPill";

export function ShipmentSummaryCard({ shipment }: { shipment: ShipmentSummary }) {
  const t = useTranslations("shipmentSummaryCard");

  return (
    <div className="relative w-full max-w-xl rounded-xl border border-border bg-elevated p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-foreground/50">{t("trackingNumber")}</p>
          <p className="font-mono text-lg">{shipment.trackingNumber}</p>
        </div>
        <StatusPill status={shipment.status} />
      </div>

      <div className="mt-6 flex items-center justify-between text-sm">
        <div className="flex items-center gap-1.5">
          <MapPin size={14} weight="bold" className="text-foreground/40" aria-hidden="true" />
          <div>
            <p className="text-foreground/50">{t("from")}</p>
            <p className="font-medium">{shipment.origin}</p>
          </div>
        </div>
        <div className="mx-4 h-px flex-1 border-t border-dashed border-border-strong" />
        <div className="flex items-center gap-1.5">
          <div className="text-right">
            <p className="text-foreground/50">{t("to")}</p>
            <p className="font-medium">{shipment.destination}</p>
          </div>
          <MapPin size={14} weight="bold" className="text-foreground/40" aria-hidden="true" />
        </div>
      </div>

      <div className="relative -mx-6 mt-6 border-t border-dashed border-border-strong">
        <span className="absolute -left-2 -top-2 h-4 w-4 rounded-full bg-background" />
        <span className="absolute -right-2 -top-2 h-4 w-4 rounded-full bg-background" />
      </div>

      {shipment.eta && (
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-foreground/50">{t("estimatedDelivery")}</span>
          <span className="font-mono font-medium">
            {new Date(shipment.eta).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
      )}
    </div>
  );
}