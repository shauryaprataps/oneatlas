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

          {/* LEFT */}
          <div>

            <h2 className="text-5xl font-semibold text-slate-900">
              Prompt-to-runtime
            </h2>

            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Provide a domain prompt, match a reusable runtime template
              deterministically, persist a new runtime schema version,
              then open the generated runtime in the builder.
            </p>


            {/* Example prompt card */}
            <div className="mt-12 max-w-md rounded-3xl border border-slate-200 bg-white/70 p-8 shadow-sm backdrop-blur">

              <p className="mb-6 text-lg font-semibold text-slate-900">
                Try prompts
              </p>


              <div className="space-y-4">

                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-slate-700 transition hover:border-[#635BFF] hover:bg-white">
                  "Build CRM dashboard"
                </div>


                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-slate-700 transition hover:border-[#635BFF] hover:bg-white">
                  "Create inventory tracker"
                </div>


                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-slate-700 transition hover:border-[#635BFF] hover:bg-white">
                  "Generate HR workspace"
                </div>

              </div>


              <div className="mt-8 border-t border-slate-200 pt-5">

               

              </div>

            </div>

          </div>


          {/* RIGHT */}
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