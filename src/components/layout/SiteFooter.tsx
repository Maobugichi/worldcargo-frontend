import Link from "next/link";
import { Package, EnvelopeSimple, Phone } from "@phosphor-icons/react/dist/ssr";
import { NAV_LINKS, SITE_NAME } from "@/lib/site-nav";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div>
            <p className="flex items-center gap-2 font-display text-lg font-semibold text-foreground">
              <Package size={18} weight="bold" className="text-postal" aria-hidden="true" />
              {SITE_NAME}
            </p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-foreground/50">
              Real-time shipment tracking, from dispatch to your door.
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/40">
              Navigate
            </p>
            <nav className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-foreground/70">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/40">
              Contact
            </p>
            <div className="mt-3 space-y-1.5 text-sm text-foreground/50">
              <p className="flex items-center gap-1.5">
                <EnvelopeSimple size={14} aria-hidden="true" />
                <a className="font-mono">support@worldcargoexpress</a>
              </p>
              <p className="flex items-center gap-1.5">
                <Phone size={14} aria-hidden="true" />
                <span className="font-mono">+1 (689) 313 7819</span>
              </p>
            </div>
          </div>
        </div>

        <p className="mt-10 border-t border-border pt-6 text-xs text-foreground/40">
          © {year} {SITE_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}