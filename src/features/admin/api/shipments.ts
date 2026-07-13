import { apiFetch } from "@/lib/api-client";
import {
  AddEventInput,
  CreateShipmentInput,
  SetStatusInput,
  Shipment,
  ShipmentWithEvents,
  TrackingEvent,
} from "../types/admin.types";

export async function listShipments(): Promise<Shipment[]> {
  return apiFetch<Shipment[]>("/shipments");
}

export async function getShipment(id: string): Promise<ShipmentWithEvents> {
  return apiFetch<ShipmentWithEvents>(`/shipments/${id}`);
}

export async function createShipment(input: CreateShipmentInput): Promise<Shipment> {
  return apiFetch<Shipment>("/shipments", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function setShipmentStatus(
  id: string,
  input: SetStatusInput
): Promise<{ shipment: Shipment; event: TrackingEvent }> {
  return apiFetch(`/shipments/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify(input),
  });
}

export async function addTrackingEvent(
  id: string,
  input: AddEventInput
): Promise<TrackingEvent> {
  return apiFetch<TrackingEvent>(`/shipments/${id}/events`, {
    method: "POST",
    body: JSON.stringify(input),
  });
}