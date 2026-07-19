import { useTranslations } from "next-intl";
import { EnvelopeSimple, Headset, MapPin } from "@phosphor-icons/react/dist/ssr";
import { ContactForm } from "../components/ContactForm";

function ContactRow({
  icon: Icon,
  label,
  primary,
  secondary,
  href,
}: {
  icon: typeof Headset;
  label: string;
  primary: string;
  secondary: string;
  href?: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-postal">
        <Icon size={20} weight="bold" className="text-postal-foreground" aria-hidden="true" />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/40">{label}</p>
        {href ? (
          <a href={href} className="mt-1.5 block break-words font-mono text-base text-foreground underline decoration-border-strong underline-offset-4 hover:text-postal-tint">
            {primary}
          </a>
        ) : (
          <p className="mt-1.5 break-words font-mono text-base text-foreground">{primary}</p>
        )}
        <p className="mt-0.5 text-sm text-foreground/50">{secondary}</p>
      </div>
    </div>
  );
}

export function ContactPage() {
  const t = useTranslations("contactPage");

  return (
    <main className="mx-auto max-w-4xl flex-1 px-4 py-24">
      <p className="text-sm font-medium uppercase tracking-[0.25em] text-postal-tint/80">{t("eyebrow")}</p>
      <h1 className="mt-4 font-display text-4xl font-medium leading-tight tracking-tight text-foreground sm:text-5xl">
        {t("title")}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/60">{t("subtitle")}</p>

      <div className="mt-14 grid gap-8 sm:grid-cols-[1.5fr_1fr] sm:gap-10">
        <div className="min-w-0">
          <ContactForm />
        </div>

        <div className="min-w-0 rounded-2xl border border-dashed border-border-strong bg-elevated p-8">
          <div className="flex flex-col gap-6">
            <ContactRow
              icon={Headset}
              label={t("customerService")}
              primary="+1 (689) 313 7819"
              secondary={t("availability")}
              href="https://wa.me/16893137819"
            />
            <div className="border-t border-dashed border-border" />
            <ContactRow
              icon={EnvelopeSimple}
              label={t("emailSupport")}
              primary="support@worldcargoexpress.org"
              secondary={t("replyTime")}
              href="mailto:support@worldcargoexpress.org"
            />
            <div className="border-t border-dashed border-border" />
            <ContactRow
              icon={MapPin}
              label={t("headquarters")}
              primary="1847 Harbor Point Way, Suite 400"
              secondary="Charleston, SC 29403"
            />
          </div>
        </div>
      </div>
    </main>
  );
}