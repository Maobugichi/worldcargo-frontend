import { useTranslations } from "next-intl";
import { ContactForm } from "./ContactForm";

export function ContactSection() {
  const t = useTranslations("contactSection");

  return (
    <section className="mx-auto max-w-6xl px-4 py-24">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
        <div className="max-w-md">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-postal/70">{t("eyebrow")}</p>
          <h2 className="mt-4 font-display text-4xl font-medium leading-tight tracking-tight text-foreground sm:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-foreground/60">{t("description")}</p>
        </div>

        <div className="max-w-md">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}