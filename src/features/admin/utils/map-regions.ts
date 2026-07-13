export interface MapRegion {
  label: string;
  lat: number;
  lng: number;
  zoom: number;
}

export const WORLD_VIEW: MapRegion = { label: "World view", lat: 20, lng: 0, zoom: 2 };

export const MAP_REGIONS: MapRegion[] = [
  { label: "Australia", lat: -25.27, lng: 133.77, zoom: 4 },
  { label: "Brazil", lat: -14.24, lng: -51.93, zoom: 4 },
  { label: "Canada", lat: 56.13, lng: -106.35, zoom: 3 },
  { label: "China", lat: 35.86, lng: 104.2, zoom: 4 },
  { label: "Egypt", lat: 26.82, lng: 30.8, zoom: 5 },
  { label: "France", lat: 46.6, lng: 2.21, zoom: 5 },
  { label: "Germany", lat: 51.17, lng: 10.45, zoom: 5 },
  { label: "Ghana", lat: 7.95, lng: -1.02, zoom: 6 },
  { label: "India", lat: 20.59, lng: 78.96, zoom: 4 },
  { label: "Indonesia", lat: -0.79, lng: 113.92, zoom: 4 },
  { label: "Japan", lat: 36.2, lng: 138.25, zoom: 5 },
  { label: "Kenya", lat: -0.02, lng: 37.91, zoom: 6 },
  { label: "Mexico", lat: 23.63, lng: -102.55, zoom: 4 },
  { label: "Netherlands", lat: 52.13, lng: 5.29, zoom: 6 },
  { label: "Nigeria", lat: 9.08, lng: 8.68, zoom: 5 },
  { label: "Saudi Arabia", lat: 23.89, lng: 45.08, zoom: 5 },
  { label: "South Africa", lat: -30.56, lng: 22.94, zoom: 5 },
  { label: "Spain", lat: 40.46, lng: -3.75, zoom: 5 },
  { label: "United Arab Emirates", lat: 23.42, lng: 53.85, zoom: 6 },
  { label: "United Kingdom", lat: 55.38, lng: -3.44, zoom: 5 },
  { label: "United States", lat: 37.09, lng: -95.71, zoom: 3 },
];