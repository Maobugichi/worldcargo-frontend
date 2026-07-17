"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { listShipments } from "../api/shipments";
import { logout } from "../api/auth";
import { Shipment } from "../types/admin.types";
import { ShipmentList } from "../components/ShipmentList";
import { CreateShipmentForm } from "../components/CreateShipmentForm";
import { ApiError } from "@/lib/api-client";

export function AdminDashboardPage() {
  const router = useRouter();
  const [shipments, setShipments] = useState<Shipment[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    listShipments()
      .then(setShipments)
      .catch((err) => {
        if (err instanceof ApiError && err.status === 401) {
          router.push("/admin/login");
          return;
        }
        setError("Failed to load shipments.");
      });
  }, [router]);

  async function handleLogout() {
    await logout();
    router.push("/admin/login");
  }

  function handleCreated(shipment: Shipment) {
    setShipments((prev) => (prev ? [shipment, ...prev] : [shipment]));
  }

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-4 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-foreground">Shipments</h1>
        <button onClick={handleLogout} className="text-sm text-foreground/50 hover:underline">
          Sign out
        </button>
      </div>

      <CreateShipmentForm onCreated={handleCreated} />

      <div className="rounded-xl border border-border bg-elevated p-5">
        {error && <p className="text-sm text-status-exception">{error}</p>}
        {!error && shipments === null && <p className="text-sm text-foreground/50">Loading...</p>}
        {shipments && <ShipmentList shipments={shipments} />}
      </div>
    </main>
  );
}