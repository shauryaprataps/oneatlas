"use client";

import Link from "next/link";
import { Eye, WandSparkles } from "lucide-react";
import type { TemplateDefinition } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface TemplateCardProps {
  template: TemplateDefinition;
  compact?: boolean;
  className?: string;
  onPreview?: (template: TemplateDefinition) => void;
}

const complexityTone: Record<TemplateDefinition["complexity"], "mint" | "gold" | "pink"> = {
  Simple: "mint",
  Moderate: "gold",
  Advanced: "pink",
};

export function TemplateCard({ template, compact = false, className, onPreview }: TemplateCardProps) {
  return (
    <Card className={cn("flex h-full flex-col", className)}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <Badge tone="primary">{template.category}</Badge>
          <h3 className="mt-4 text-xl font-semibold">{template.name}</h3>
        </div>
        <Badge tone={complexityTone[template.complexity]}>{template.complexity}</Badge>
      </div>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{template.description}</p>
      {!compact ? <p className="mt-3 rounded-md bg-muted p-3 text-xs text-muted-foreground">{template.preview}</p> : null}
      <div className="mt-5 grid grid-cols-3 gap-2">
        {template.metrics.map((metric) => (
          <div className="rounded-md border border-border p-2" key={metric.label}>
            <span className="block text-sm font-semibold">{metric.value}</span>
            <span className="text-xs text-muted-foreground">{metric.label}</span>
          </div>
        ))}
      </div>
      <div className="mt-auto flex gap-2 pt-5">
        <Button asChild className="flex-1" size="sm">
          <Link href={`/builder?template=${template.slug}`}><WandSparkles className="size-4" />Use Template</Link>
        </Button>
        <Button className="flex-1" onClick={() => onPreview?.(template)} size="sm" type="button" variant="outline">
          <Eye className="size-4" />Preview
        </Button>
      </div>
    </Card>
  );
}
