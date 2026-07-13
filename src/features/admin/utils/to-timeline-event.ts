import { TrackingEvent as AdminTrackingEvent } from "../types/admin.types";
import { TrackingEvent as PublicTrackingEvent } from "@/features/tracking/types/tracking.types";

export function toPublicTimelineEvent(event: AdminTrackingEvent): PublicTrackingEvent {
  return {
    status: event.status,
    location: event.location,
    note: event.note,
    occurredAt: event.occurredAt,
    ...(event.latitude !== null && event.longitude !== null
      ? { lat: event.latitude, lng: event.longitude }
      : {}),
  };
}