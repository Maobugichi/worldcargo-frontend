export interface NavLink {
  key: "home" | "track" | "services" | "about" | "faq" | "contact";
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { key: "home", href: "/" },
  { key: "track", href: "/track" },
  { key: "services", href: "/services" },
  { key: "about", href: "/about" },
  { key: "faq", href: "/faq" },
  { key: "contact", href: "/contact" },
];

export const SITE_NAME = "World Cargo";