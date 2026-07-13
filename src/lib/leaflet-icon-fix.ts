import L from "leaflet";

let alreadyFixed = false;

export function fixLeafletDefaultIcons() {
  if (alreadyFixed) return;
  alreadyFixed = true;

  const CDN_BASE = "https://unpkg.com/leaflet@1.9.4/dist/images";

  delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: `${CDN_BASE}/marker-icon-2x.png`,
    iconUrl: `${CDN_BASE}/marker-icon.png`,
    shadowUrl: `${CDN_BASE}/marker-shadow.png`,
  });
}