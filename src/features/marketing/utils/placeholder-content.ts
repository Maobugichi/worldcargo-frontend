import { Truck, Lightning, Globe, Warehouse, ShieldCheck, Package } from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";

export type ServiceKey =
  | "standardDelivery"
  | "expressDelivery"
  | "internationalShipping"
  | "freightBulk"
  | "warehousingStorage"
  | "shipmentInsurance";

export const SERVICE_KEYS: ServiceKey[] = [
  "standardDelivery",
  "expressDelivery",
  "internationalShipping",
  "freightBulk",
  "warehousingStorage",
  "shipmentInsurance",
];

// Icons are mapped to a stable key, not derived from (translated) title text
export const SERVICE_ICONS: Record<ServiceKey, Icon> = {
  standardDelivery: Truck,
  expressDelivery: Lightning,
  internationalShipping: Globe,
  freightBulk: Truck,
  warehousingStorage: Warehouse,
  shipmentInsurance: ShieldCheck,
};

export const SERVICE_ROUTING_CODES: Record<ServiceKey, string> = {
  standardDelivery: "SD",
  expressDelivery: "EX",
  internationalShipping: "IS",
  freightBulk: "FB",
  warehousingStorage: "WS",
  shipmentInsurance: "SI",
};

export type FaqKey = "tracking" | "trackingNotWorking" | "international" | "emailUpdates" | "deliveryTime" | "exceptionStatus";

export const FAQ_KEYS: FaqKey[] = [
  "tracking",
  "trackingNotWorking",
  "international",
  "emailUpdates",
  "deliveryTime",
  "exceptionStatus",
];

export interface TestimonialData {
  key: string;
  name: string; // real names stay untranslated across locales
  photo?: string;
}

export const TESTIMONIALS: TestimonialData[] = [
  { key: "testimonial1", name: "Emily Carter", photo: "/andy.jpg" },
  { key: "testimonial2", name: "Oliver Bennett", photo: "/bruce.jpg" },
  { key: "testimonial3", name: "Émilie Tremblay", photo: "/diego.jpg" },
];