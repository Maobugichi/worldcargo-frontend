import { apiFetch } from "@/lib/api-client";

export async function subscribeToUpdates(trackingNumber: string, email: string): Promise<void> {
  await apiFetch<{ success: boolean }>(
    `/track/${encodeURIComponent(trackingNumber)}/subscribe`,
    {
      method: "POST",
      body: JSON.stringify({ email }),
    }
  );
}