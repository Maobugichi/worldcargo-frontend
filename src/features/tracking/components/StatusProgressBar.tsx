import { useTranslations } from "next-intl";
import { ShipmentStatus, SHIPMENT_STATUSES } from "../types/tracking.types";
import { getProgressStepIndex, getStatusLabel, isException } from "../utils/status-display";
import { STATUS_ICONS } from "../utils/status-icons";

export function StatusProgressBar({ status }: { status: ShipmentStatus }) {
  const t = useTranslations("statusProgressBar");
  const tStatus = useTranslations("shipmentStatus");

  if (isException(status)) {
    const Icon = STATUS_ICONS.exception;
    return (
      <div className="flex w-full max-w-xl items-center gap-2 rounded-lg bg-status-exception/10 px-4 py-3 text-sm font-medium text-status-exception">
        <Icon size={16} weight="bold" aria-hidden="true" />
        {t("exceptionMessage")}
      </div>
    );
  }

  const currentIndex = getProgressStepIndex(status);

  return (
    <div className="w-full max-w-xl" role="group" aria-label={t("progressAriaLabel")}>
      <div className="flex items-center">
        {SHIPMENT_STATUSES.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;
          const isLast = index === SHIPMENT_STATUSES.length - 1;
          const Icon = STATUS_ICONS[step];
          const label = getStatusLabel(tStatus, step);

          return (
            <div key={step} className="flex flex-1 items-center last:flex-none">
              <div
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                  isCurrent ? "bg-status-progress text-background" : isCompleted ? "bg-status-success/15 text-status-success" : "bg-foreground/10 text-foreground/30"
                }`}
                title={label}
                aria-label={`${label}${isCurrent ? ` (${t("current")})` : isCompleted ? ` (${t("completed")})` : ""}`}
              >
                <Icon size={13} weight="bold" aria-hidden="true" />
              </div>
              {!isLast && (
                <div className={`h-0 flex-1 border-t-2 border-dashed ${isCompleted ? "border-status-success" : "border-foreground/15"}`} />
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-2 flex justify-between text-[11px] text-foreground/50">
        <span>{getStatusLabel(tStatus, SHIPMENT_STATUSES[0])}</span>
        <span>{getStatusLabel(tStatus, SHIPMENT_STATUSES[SHIPMENT_STATUSES.length - 1])}</span>
      </div>
    </div>
  );
}