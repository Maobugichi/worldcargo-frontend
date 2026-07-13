export const SHIPMENT_STATUSES = [
  "received",
  "in_warehouse",
  "dispatched",
  "in_transit",
  "arrived",
  "delivered",
] as const;

export type LinearShipmentStatus = (typeof SHIPMENT_STATUSES)[number];
export type ShipmentStatus = LinearShipmentStatus | "exception";

export interface TrackingEvent {
  status: ShipmentStatus;
  location: string;
  note: string;
  occurredAt: string;
  lat?: number;
  lng?: number;
}

export interface ShipmentSummary {
  trackingNumber: string;
  status: ShipmentStatus;
  origin: string;
  destination: string;
  eta: string | null;
  events: TrackingEvent[];
}