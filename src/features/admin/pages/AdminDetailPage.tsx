"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getShipment } from "../api/shipments";
import { ShipmentWithEvents } from "../types/admin.types";
import { SetStatusForm } from "../components/SetStatusForm";
import { AddEventForm } from "../components/AddEventForm";
import { toPublicTimelineEvent } from "../utils/to-timeline-event";
import { ShipmentTimeline } from "@/features/tracking/components/ShipmentTimeline";
import { StatusPill } from "@/features/tracking/components/StatusPill";
import { ApiError } from "@/lib/api-client";

export function AdminShipmentDetailPage({ shipmentId }: { shipmentId: string }) {
  const router = useRouter();
  const [shipment, setShipment] = useState<ShipmentWithEvents | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    setError(null);
    getShipment(shipmentId)
      .then(setShipment)
      .catch((err) => {
        if (err instanceof ApiError && err.status === 401) {
          router.push("/admin/login");
          return;
        }
        setError("Failed to load shipment.");
      });
  }, [shipmentId, router]);

  useEffect(() => {
    queueMicrotask(() => load());
  }, [load]);

  if (error) {
    return (
      <div className="p-10" role="alert">
        <p className="text-sm text-status-exception">{error}</p>
        <button
          type="button"
          onClick={load}
          className="mt-3 rounded-lg border border-border-strong px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Try again
        </button>
      </div>
    );
  }

  if (!shipment) {
    return (
      <p className="p-10 text-sm text-foreground/50" aria-live="polite">
        Loading...
      </p>
    );
  }

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-4 py-10">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-mono text-lg text-foreground">{shipment.trackingNumber}</p>
          <p className="text-sm text-foreground/50">
            {shipment.origin} → {shipment.destination}
          </p>
        </div>
        <StatusPill status={shipment.status} />
      </div>

      <div className="flex flex-col gap-6">
        <SetStatusForm shipmentId={shipment.id} currentStatus={shipment.status} onUpdated={load} />
        <AddEventForm shipmentId={shipment.id} onAdded={load} />
      </div>

      <div className="rounded-xl border border-border bg-surface p-5">
        <h2 className="mb-4 text-sm font-semibold text-foreground">Timeline</h2>
        <ShipmentTimeline events={shipment.events.map(toPublicTimelineEvent)} />
      </div>
    </main>
  );
}