import { HeroSection } from "../components/HeroSection";
import { FeatureHighlights } from "../components/FeatureHighlights";
import { HowItWorks } from "../components/HowItWorks";
import { ServicesTeaser } from "../components/ServicesTeaser";
import { FaqTeaser } from "../components/FaqTeaser";
import {  ContactSection } from "../components/ContactSection";
import { TestimonialsSection } from "../components/TestimonialSection";
import { TrustMarquee } from "../components/TrustMarquee";

export function HomePage() {
  return (
    <main className="flex flex-1 flex-col">
      <HeroSection />
      <TrustMarquee/>
      <FeatureHighlights />
      <HowItWorks />
      <ServicesTeaser />
      <TestimonialsSection/>
      <FaqTeaser />
      <ContactSection />
    </main>
  );
}