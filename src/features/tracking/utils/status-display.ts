import { ShipmentStatus, SHIPMENT_STATUSES } from "../types/tracking.types";

export function getProgressStepIndex(status: ShipmentStatus): number {
  return SHIPMENT_STATUSES.indexOf(status as (typeof SHIPMENT_STATUSES)[number]);
}

export function isException(status: ShipmentStatus): boolean {
  return status === "exception";
}

const STATUS_LABELS: Record<ShipmentStatus, string> = {
  received: "Received",
  in_warehouse: "In Warehouse",
  dispatched: "Dispatched",
  in_transit: "In Transit",
  arrived: "Arrived",
  delivered: "Delivered",
  exception: "Exception",
};

export function getStatusLabel(status: ShipmentStatus): string {
  return STATUS_LABELS[status];
}

export type StatusPillTone = "neutral" | "progress" | "success" | "exception";

export function getStatusTone(status: ShipmentStatus): StatusPillTone {
  if (status === "exception") return "exception";
  if (status === "delivered") return "success";
  if (status === "received" || status === "in_warehouse") return "neutral";
  return "progress";
}