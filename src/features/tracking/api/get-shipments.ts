import { apiFetch, ApiError } from "@/lib/api-client";
import { ShipmentSummary } from "../types/tracking.types";

export async function getShipmentByTrackingNumber(
  trackingNumber: string
): Promise<ShipmentSummary | null> {
  try {
    return await apiFetch<ShipmentSummary>(
      `/track/${encodeURIComponent(trackingNumber)}`
    );
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) {
      return null;
    }
    throw err;
  }
}