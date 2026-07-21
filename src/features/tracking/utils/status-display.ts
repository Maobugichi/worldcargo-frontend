import { ShipmentStatus, SHIPMENT_STATUSES } from "../types/tracking.types";
import type { useTranslations } from "next-intl";

export function getProgressStepIndex(status: ShipmentStatus): number {
  return SHIPMENT_STATUSES.indexOf(status as (typeof SHIPMENT_STATUSES)[number]);
}

export function isException(status: ShipmentStatus): boolean {
  return status === "exception";
}

type StatusTranslator = ReturnType<typeof useTranslations>;

export function getStatusLabel(t: StatusTranslator, status: ShipmentStatus): string {
  return t(status);
}

export type StatusPillTone = "neutral" | "progress" | "success" | "exception";

export function getStatusTone(status: ShipmentStatus): StatusPillTone {
  if (status === "exception") return "exception";
  if (status === "delivered") return "success";
  if (status === "received" || status === "in_warehouse") return "neutral";
  return "progress";
}