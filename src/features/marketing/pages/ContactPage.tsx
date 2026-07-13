import { EnvelopeSimple, Phone } from "@phosphor-icons/react/dist/ssr";
import { ContactForm } from "../components/ContactForm";

export function ContactPage() {
  return (
    <main className="mx-auto max-w-4xl flex-1 px-4 py-24">
      <p className="text-sm font-medium uppercase tracking-[0.25em] text-postal/70">
        Contact
      </p>
      <h1 className="mt-4 font-display text-4xl font-medium leading-tight tracking-tight text-foreground sm:text-5xl">
        Contact us
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/60">
        Questions about a shipment or anything else — send us a message.
      </p>

      <div className="mt-14 grid gap-12 sm:grid-cols-[1.5fr_1fr] sm:gap-10">
        <ContactForm />

        <div className="sm:border-l sm:border-border sm:pl-10">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/40">
            Other ways to reach us
          </p>
          <div className="mt-3 space-y-1.5 text-sm text-foreground/60">
            <p className="flex items-center gap-1.5">
              <EnvelopeSimple size={14} aria-hidden="true" />
              <span className="font-mono">support@example.com</span>
            </p>
            <p className="flex items-center gap-1.5">
              <Phone size={14} aria-hidden="true" />
              <span className="font-mono">+234 000 000 0000</span>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}