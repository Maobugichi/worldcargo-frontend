import { ShipmentStatus } from "../types/tracking.types";
import { getStatusLabel, getStatusTone } from "../utils/status-display";
import { STATUS_ICONS } from "../utils/status-icons";

const TONE_CLASSES: Record<string, string> = {
  neutral: "bg-status-neutral/10 text-status-neutral",
  progress: "bg-status-progress/10 text-status-progress",
  success: "bg-status-success/10 text-status-success",
  exception: "bg-status-exception/10 text-status-exception",
};

export function StatusPill({ status }: { status: ShipmentStatus }) {
  const tone = getStatusTone(status);
  const Icon = STATUS_ICONS[status];

  return (
    <span
      className={`inline-flex -rotate-2 items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ${TONE_CLASSES[tone]}`}
    >
      <Icon size={14} weight="bold" aria-hidden="true" />
      {getStatusLabel(status)}
    </span>
  );
}