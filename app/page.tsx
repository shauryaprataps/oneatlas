import { SiteShell } from "@/components/layout/site-shell";
import {
  Hero,
  HowItWorks,
  ModelSection,
  PricingFaq,
  RolesAndTrust,
  TemplateShowcase,
} from "@/components/sections/landing-sections";

import { GenerateAppForm } from "@/components/GenerateAppForm";

export default function HomePage() {
  return (
    <SiteShell>
      <Hero />

      {/* Prompt-to-runtime */}
      <section
        id="app-prompt"
        className="px-4 py-16"
      >
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2 md:items-start">

          {/* LEFT SIDE */}
          <div>

            <h2 className="text-5xl font-semibold text-slate-900">
              Prompt-to-runtime
            </h2>

            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Provide a domain prompt, match a reusable runtime template
              deterministically, persist a new runtime schema version,
              then open the generated runtime in the builder.
            </p>


            {/* Features */}
            <div className="mt-10 space-y-4">


              <p className="text-base text-slate-700">
                ✓ Persistent runtime schemas
              </p>

              <p className="text-base text-slate-700">
                ✓ Conversational editing
              </p>

            </div>


            {/* Example prompts */}
            <div className="mt-10">

              <p className="mb-4 text-base font-semibold text-slate-900">
                Try:
              </p>

              <div className="flex flex-col gap-3">

                <span className="text-slate-500">
                  "Build CRM dashboard"
                </span>

                <span className="text-slate-500">
                  "Create inventory tracker"
                </span>

                <span className="text-slate-500">
                  "Generate HR workspace"
                </span>

              </div>

            </div>

          </div>


          {/* RIGHT SIDE */}
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