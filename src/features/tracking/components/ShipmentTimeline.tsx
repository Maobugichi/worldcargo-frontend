import { TrackingEvent } from "../types/tracking.types";
import { getStatusLabel } from "../utils/status-display";
import { STATUS_ICONS } from "../utils/status-icons";

function formatTimestamp(isoString: string): string {
  return new Date(isoString).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function ShipmentTimeline({ events }: { events: TrackingEvent[] }) {
  if (events.length === 0) {
    return (
      <p className="w-full max-w-xl text-sm text-foreground/50">
        No updates logged yet.
      </p>
    );
  }

  return (
    <ol className="w-full max-w-xl space-y-0">
      {events.map((event, index) => {
        const Icon = STATUS_ICONS[event.status];
        const isMostRecent = index === 0;

        return (
          <li
            key={`${event.occurredAt}-${index}`}
            className="relative flex gap-3 border-b border-dashed border-border py-3 last:border-none"
          >
            <div
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                isMostRecent
                  ? "bg-status-progress/15 text-status-progress"
                  : "bg-foreground/8 text-foreground/40"
              }`}
            >
              <Icon size={14} weight="bold" aria-hidden="true" />
            </div>
            <div className="flex flex-1 items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium">{getStatusLabel(event.status)}</p>
                <p className="text-sm text-foreground/70">{event.note}</p>
                <p className="mt-0.5 text-xs text-foreground/40">{event.location}</p>
              </div>
              <span className="shrink-0 font-mono text-xs text-foreground/40">
                {formatTimestamp(event.occurredAt)}
              </span>
            </div>
          </li>
        );
      })}
    </ol>
  );
}