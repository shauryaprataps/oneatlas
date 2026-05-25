"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { templates } from "@/config/templates";
import type { TemplateDefinition } from "@/types";
import { TemplateCard } from "./template-card";
import { TemplateDetailModal } from "./template-detail-modal";

export function TemplatesGrid() {
  const params = useSearchParams();
  const [selected, setSelected] = useState<TemplateDefinition | null>(null);

  const filtered = useMemo(() => {
    return templates.filter((template) => {
      const category = params.get("category");
      const complexity = params.get("complexity");
      const collection = params.get("collection");
      return (!category || template.category === category)
        && (!complexity || template.complexity === complexity)
        && (!collection || template.collection === collection);
    });
  }, [params]);

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((template) => <TemplateCard key={template.id} onPreview={setSelected} template={template} />)}
      </div>
      {filtered.length === 0 ? <p className="rounded-lg border border-border p-6 text-sm text-muted-foreground">No templates match this filter set.</p> : null}
      <TemplateDetailModal onOpenChange={(open) => !open && setSelected(null)} template={selected} />
    </>
  );
}
