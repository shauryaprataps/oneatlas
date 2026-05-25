import { SiteShell } from "@/components/layout/site-shell";
import { Hero, HowItWorks, ModelSection, PricingFaq, RolesAndTrust, TemplateShowcase } from "@/components/sections/landing-sections";
import { GenerateAppForm } from "@/components/GenerateAppForm";

export default function HomePage() {
  return (
    <SiteShell>
      <Hero />

      <section className="px-4 py-16">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 md:items-start">
          <div>
            <h2 className="text-3xl font-semibold">Prompt-to-runtime</h2>
            <p className="mt-3 text-muted-foreground">
              Provide a domain prompt, match a reusable runtime template deterministically, persist a new runtime schema version,
              then open the generated runtime in the builder.
            </p>
          </div>
          <GenerateAppForm />
        </div>
      </section>

      <HowItWorks />
      <ModelSection />
      <TemplateShowcase />
      <RolesAndTrust />
      <PricingFaq />
    </SiteShell>
  );
}

