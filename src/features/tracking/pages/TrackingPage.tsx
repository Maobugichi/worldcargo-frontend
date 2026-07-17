"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { WarningCircle } from "@phosphor-icons/react/dist/ssr";
import { getShipmentByTrackingNumber } from "../api/get-shipments";
import { ShipmentSummary } from "../types/tracking.types";
import { TrackingForm } from "../components/TrackingForm";
import { ShipmentSummaryCard } from "../components/ShipmentSummaryCard";
import { StatusProgressBar } from "../components/StatusProgressBar";
import { ShipmentTimeline } from "../components/ShipmentTimeline";
import { NotFoundState } from "../components/NotFoundState";
import { SubscribeForm } from "../components/SubscribeForm";

const ShipmentMap = dynamic(() => import("../components/ShipmentsMap"), { ssr: false });

type LookupState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "found"; shipment: ShipmentSummary }
  | { status: "not-found"; trackingNumber: string }
  | { status: "error"; message: string };

export function TrackingPage() {
  const searchParams = useSearchParams();
  const [lookup, setLookup] = useState<LookupState>({ status: "idle" });

  async function handleSubmit(trackingNumber: string) {
    setLookup({ status: "loading" });

    try {
      const shipment = await getShipmentByTrackingNumber(trackingNumber);
      if (shipment) {
        setLookup({ status: "found", shipment });
      } else {
        setLookup({ status: "not-found", trackingNumber });
      }
    } catch {
      setLookup({
        status: "error",
        message: "Something went wrong looking that up. Please try again.",
      });
    }
  }

  useEffect(() => {
    const numberFromUrl = searchParams.get("number");
    if (!numberFromUrl) return;

    queueMicrotask(() => {
      handleSubmit(numberFromUrl);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hasResult = lookup.status === "found";

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center gap-8 px-4 py-16">
      {hasResult ? (
        <p className="text-sm font-medium text-foreground/50">
          Tracking <span className="font-mono text-foreground">{lookup.shipment.trackingNumber}</span>
        </p>
      ) : (
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-postal-tint/80">
            Track
          </p>
          <h1 className="mt-3 font-display text-4xl font-medium leading-tight tracking-tight text-foreground sm:text-5xl">
            Track your shipment
          </h1>
          <p className="mt-3 text-lg text-foreground/50">
            Enter your tracking number to see the latest status.
          </p>
        </div>
      )}

      <TrackingForm onSubmit={handleSubmit} isLoading={lookup.status === "loading"} />

      {lookup.status === "loading" && (
        <p className="text-sm text-foreground/50" aria-live="polite">
          Looking up your shipment…
        </p>
      )}

      {hasResult && (
        <div className="flex w-full flex-col items-center gap-8">
          <ShipmentSummaryCard shipment={lookup.shipment} />
          <StatusProgressBar status={lookup.shipment.status} />
          <ShipmentMap events={lookup.shipment.events} />
          <ShipmentTimeline events={lookup.shipment.events} />
          <SubscribeForm trackingNumber={lookup.shipment.trackingNumber} />
        </div>
      )}

      {lookup.status === "not-found" && (
        <NotFoundState trackingNumber={lookup.trackingNumber} />
      )}

      {lookup.status === "error" && (
        <div
          className="flex w-full max-w-md items-start gap-3 rounded-2xl border border-status-exception/30 bg-status-exception/5 p-6"
          aria-live="assertive"
        >
          <WarningCircle
            size={22}
            weight="fill"
            className="mt-0.5 shrink-0 text-status-exception"
            aria-hidden="true"
          />
          <p className="text-base leading-relaxed text-foreground">{lookup.message}</p>
        </div>
      )}
    </main>
  );
}