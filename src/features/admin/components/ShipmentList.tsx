import Link from "next/link";
import { Shipment } from "../types/admin.types";

function formatUpdatedAt(isoString: string): string {
  return new Date(isoString).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function ShipmentList({ shipments }: { shipments: Shipment[] }) {
  if (shipments.length === 0) {
    return <p className="text-sm text-foreground/50">No shipments yet.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] text-left text-sm text-foreground">
        <thead>
          <tr className="border-b border-border text-foreground/50">
            <th className="sticky left-0 z-10 bg-elevated font-medium">
              Tracking number
            </th>
            <th className="py-2 font-medium">Status</th>
            <th className="py-2 font-medium">Route</th>
            <th className="py-2 font-medium">Updated</th>
          </tr>
        </thead>
        <tbody>
          {shipments.map((shipment) => (
            <tr key={shipment.id} className="border-b border-border">
              <td className="sticky left-0 z-10 bg-elevated">
                <Link
                  href={`/admin/shipments/${shipment.id}`}
                  className="font-mono text-electric hover:underline"
                >
                  {shipment.trackingNumber}
                </Link>
              </td>
              <td className="py-3">{shipment.status.replace("_", " ")}</td>
              <td className="py-3 text-foreground/70">
                {shipment.origin} → {shipment.destination}
              </td>
              <td className="py-3 text-foreground/50">{formatUpdatedAt(shipment.updatedAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}