import { Suspense } from "react";
import { SiteShell } from "@/components/layout/site-shell";
import { SectionHeading } from "@/components/sections/section-heading";
import { TemplateFiltersBar } from "@/components/templates/template-filters";
import { TemplatesGrid } from "@/components/templates/templates-grid";
import { Skeleton } from "@/components/ui/skeleton";

export default function TemplatesPage() {
  return (
    <SiteShell>
      <section className="px-4 py-16">
        <div className="mx-auto grid max-w-7xl gap-8">
          <SectionHeading eyebrow="Templates" title="Reusable operational app systems." description="Filter shareable template views by category, complexity, and collection. Template definitions live in config files and drive both the gallery and builder entry points." />
          <Suspense fallback={<Skeleton className="h-28" />}>
            <TemplateFiltersBar />
            <TemplatesGrid />
          </Suspense>
        </div>
      </section>
    </SiteShell>
  );
}
