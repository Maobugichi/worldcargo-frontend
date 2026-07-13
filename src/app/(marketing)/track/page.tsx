import { Suspense } from "react";
import { TrackingPage } from "@/features/tracking/pages/TrackingPage";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <TrackingPage />
    </Suspense>
  );
}