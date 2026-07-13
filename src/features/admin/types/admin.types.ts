export const SHIPMENT_STATUSES = [
  "received",
  "in_warehouse",
  "dispatched",
  "in_transit",
  "arrived",
  "delivered",
  "exception",
] as const;

export type ShipmentStatus = (typeof SHIPMENT_STATUSES)[number];

export interface Shipment {
  id: string;
  trackingNumber: string;
  status: ShipmentStatus;
  origin: string;
  destination: string;
  eta: string | null;
  recipientName: string | null;
  recipientEmail: string | null;
  emailOptIn: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TrackingEvent {
  id: string;
  shipmentId: string;
  status: ShipmentStatus;
  location: string;
  latitude: number | null;
  longitude: number | null;
  note: string;
  occurredAt: string;
  createdAt: string;
}

export interface ShipmentWithEvents extends Shipment {
  events: TrackingEvent[];
}

export interface CreateShipmentInput {
  origin: string;
  destination: string;
  eta?: string;
  recipientName?: string;
  recipientEmail?: string;
  emailOptIn?: boolean;
}

export interface SetStatusInput {
  status: ShipmentStatus;
  location: string;
  note: string;
  occurredAt?: string;
  latitude?: number;
  longitude?: number;
}

export interface AddEventInput {
  location: string;
  note: string;
  occurredAt?: string;
  latitude?: number;
  longitude?: number;
}