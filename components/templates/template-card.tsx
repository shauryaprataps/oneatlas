"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { BarChart3, Blocks, BriefcaseBusiness, CircleDot, Database, Eye, GitBranch, Headphones, PackageSearch, ShieldCheck, UserRoundCog, UsersRound, WandSparkles } from "lucide-react";
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

const complexityTone: Record<TemplateDefinition["complexity"], "success" | "pending" | "advanced"> = {
  Simple: "success",
  Moderate: "pending",
  Advanced: "advanced",
};

// Template-level tone (subtle, not a rainbow palette)
const templateToneByCategory: Partial<Record<TemplateDefinition["category"], "success" | "live" | "pending" | "advanced" | "runtime">> = {
  "crm-workspace": "success",
  "support-workspace": "live",
  "analytics-dashboard": "live",
  "inventory-system": "pending",
  "admin-panel": "advanced",
};

const templateIcons = {
  "crm-workspace": BriefcaseBusiness,
  "hr-dashboard": UsersRound,
  "admin-panel": UserRoundCog,
  "analytics-dashboard": BarChart3,
  "inventory-system": PackageSearch,
  "support-workspace": Headphones,
};

export function TemplateCard({ template, compact = false, className, onPreview }: TemplateCardProps) {
  const Icon = templateIcons[template.slug as keyof typeof templateIcons] ?? Blocks;
  return (
    <Card className={cn("flex h-full flex-col overflow-hidden bg-card-strong p-0", className)}>
      <div className="border-b border-border bg-navy px-5 py-4 text-white">
        <div className="flex items-center justify-between gap-3 text-xs">
          <span className="flex items-center gap-2 text-white/75">
            <CircleDot className="size-3 text-runtime" />
            {template.runtime.status}
          </span>
          <span className="rounded-md bg-white/10 px-2 py-1">schema v{template.runtime.schemaVersion}</span>
        </div>
        <h3 className="mt-4 flex items-center gap-2 text-xl font-semibold"><Icon className="size-5 text-live" />{template.name}</h3>
        <p className="mt-2 text-xs text-white/68">{template.schemaId}</p>
      </div>
      <div className="flex flex-1 flex-col p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <Badge tone="runtime">{template.category}</Badge>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{template.description}</p>
        </div>
        <div className="flex items-center gap-2">
          {/* Complexity communicates operational shape; keep it semantic and subtle */}
          <Badge tone={complexityTone[template.complexity]}>{template.complexity}</Badge>
          {/* Category tone is a small signal (icon accents stay restrained) */}
          <Badge tone={templateToneByCategory[template.category] ?? "runtime"}>
            {templateToneByCategory[template.category] ?? "runtime"}
          </Badge>
        </div>
      </div>
      {!compact ? (
        <div className="mt-4 rounded-md border border-border bg-muted/70 p-3">
          <p className="flex items-center gap-2 text-xs font-medium text-foreground">
            <Database className="size-3 text-primary" />
            Runtime schema preview
          </p>
          <p className="mt-2 text-xs leading-5 text-muted-foreground">{template.preview}</p>
        </div>
      ) : null}
      <div className="mt-5 grid grid-cols-3 gap-2">
        <Metric icon={<Blocks className="size-3" />} label="Components" value={String(template.runtime.components)} />
        <Metric icon={<Database className="size-3" />} label="Fields" value={String(template.runtime.fields)} />
        <Metric icon={<GitBranch className="size-3" />} label="Objects" value={template.metrics[0]?.value ?? "0"} />
      </div>
      <div className="mt-3 flex items-center justify-between rounded-md border border-border px-3 py-2 text-xs">
        <span className="flex items-center gap-2 text-muted-foreground">
          <ShieldCheck className="size-3 text-success" />
          Mutation-safe
        </span>
        <span className="font-medium text-navy dark:text-live">{template.collection}</span>
      </div>
      <div className="mt-auto flex gap-2 pt-5">
        <Button asChild className="flex-1" size="sm">
          <Link href={`/builder/${template.runtime.runtimeId}`}><WandSparkles className="size-4" />Use Template</Link>
        </Button>
        <Button asChild className="flex-1" size="sm" variant="outline">
          <Link href={`/preview/${template.runtime.runtimeId}`} onClick={() => onPreview?.(template)}><Eye className="size-4" />Preview</Link>
        </Button>
      </div>
      </div>
    </Card>
  );
}

function Metric({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-md border border-border bg-background p-2">
      <span className="flex items-center gap-1 text-sm font-semibold text-navy dark:text-foreground">{icon}{value}</span>
      <span className="text-[0.68rem] text-muted-foreground">{label}</span>
    </div>
  );
}
