"use client";

import { useParams } from "next/navigation";
import { AdminShipmentDetailPage } from "@/features/admin/pages/AdminDetailPage";

export default function Page() {
  const params = useParams<{ id: string }>();
  return <AdminShipmentDetailPage shipmentId={params.id} />;
}