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
    <table className="w-full text-left text-sm">
      <thead>
        <tr className="border-b border-foreground/10 text-foreground/50">
          <th className="py-2 font-medium">Tracking number</th>
          <th className="py-2 font-medium">Status</th>
          <th className="py-2 font-medium">Route</th>
          <th className="py-2 font-medium">Updated</th>
        </tr>
      </thead>
      <tbody>
        {shipments.map((shipment) => (
          <tr key={shipment.id} className="border-b border-foreground/5">
            <td className="py-3">
              <Link
                href={`/admin/shipments/${shipment.id}`}
                className="font-mono text-accent hover:underline"
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
  );
}