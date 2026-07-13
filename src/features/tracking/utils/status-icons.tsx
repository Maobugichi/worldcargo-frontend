import {
  Clock,
  Warehouse,
  PaperPlaneTilt,
  Truck,
  MapPin,
  CheckCircle,
  WarningCircle,
  type Icon,
} from "@phosphor-icons/react";
import { ShipmentStatus } from "../types/tracking.types";

export const STATUS_ICONS: Record<ShipmentStatus, Icon> = {
  received: Clock,
  in_warehouse: Warehouse,
  dispatched: PaperPlaneTilt,
  in_transit: Truck,
  arrived: MapPin,
  delivered: CheckCircle,
  exception: WarningCircle,
};