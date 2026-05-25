import { SiteShell } from "@/components/layout/site-shell";
import { Hero, HowItWorks, ModelSection, PricingFaq, RolesAndTrust, TemplateShowcase } from "@/components/sections/landing-sections";

export default function HomePage() {
  return (
    <SiteShell>
      <Hero />
      <HowItWorks />
      <ModelSection />
      <TemplateShowcase />
      <RolesAndTrust />
      <PricingFaq />
    </SiteShell>
  );
}
