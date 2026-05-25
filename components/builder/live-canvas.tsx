"use client";

import { Activity, BarChart3, Filter, GitPullRequestArrow, ListChecks, Route, Table2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ToneBadge } from "@/components/ui/status-badge";
import { useBuilderStore } from "@/store/builder-store";

const identity = {
  pipeline: { terms: ["Revenue", "Accounts", "Pipeline"], tone: "success" as const, bars: [42, 72, 61, 84, 76, 92] },
  people: { terms: ["Headcount", "Hiring", "Onboarding"], tone: "warning" as const, bars: [34, 58, 77, 66, 82, 70] },
  control: { terms: ["Permissions", "Audit", "Logs"], tone: "advanced" as const, bars: [88, 61, 92, 73, 80, 66] },
  executive: { terms: ["Charts", "KPIs", "Segments"], tone: "live" as const, bars: [38, 64, 51, 78, 69, 88] },
  supply: { terms: ["Stock", "Suppliers", "Reorders"], tone: "critical" as const, bars: [55, 69, 44, 82, 64, 76] },
  queue: { terms: ["Tickets", "Escalations", "SLA"], tone: "runtime" as const, bars: [70, 48, 62, 90, 57, 73] },
};

export function LiveCanvas() {
  const schema = useBuilderStore((state) => state.schema);
  const page = schema.components[0];
  const layout = String(page.props.layout) as keyof typeof identity;
  const visual = identity[layout] ?? identity.pipeline;
  const children = page.children ?? [];

  return (
    <section className="min-h-0 flex-1 overflow-auto bg-background p-4">
      <div className="mx-auto grid max-w-6xl gap-4">
        <div className="rounded-lg border border-white/10 bg-[#0A2540]/88 p-5 text-white shadow-[var(--shadow-soft)]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm text-white/65">{String(page.props.owner)} runtime · {layout} layout</p>
              <h1 className="text-3xl font-semibold">{page.name}</h1>
            </div>
            <ToneBadge tone={visual.tone}>{schema.metadata.environment}</ToneBadge>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {visual.terms.map((term) => <span className="rounded-md bg-white/8 px-2 py-1 text-xs text-white/70" key={term}>{term}</span>)}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 rounded-lg border border-border bg-card p-3">
          <Filter className="size-4 text-runtime" />
          {["Owner", "Status", "Updated", "Priority"].map((filter) => <span className="rounded-md bg-muted px-2 py-1 text-xs" key={filter}>{filter}</span>)}
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {children.filter((node) => node.type === "metric").map((node) => (
            <Card className="border-l-4 border-l-success transition hover:-translate-y-0.5" key={node.id}>
              <p className="text-sm text-muted-foreground">{node.name}</p>
              <p className="mt-3 text-3xl font-semibold text-navy dark:text-foreground">{String(node.props.value)}</p>
              <p className="mt-1 text-sm text-success">{String(node.props.delta)}</p>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_1.4fr]">
          {children.filter((node) => node.type === "chart").map((node) => (
            <Card key={node.id}>
              <BarChart3 className="size-5 text-live" />
              <h2 className="mt-3 font-semibold">{node.name}</h2>
              <div className="mt-4 flex h-44 items-end gap-2">{visual.bars.map((height, index) => <span className="flex-1 rounded-t-md bg-runtime/70" key={`${node.id}-${index}`} style={{ height: `${height}%` }} />)}</div>
            </Card>
          ))}
          {children.filter((node) => node.type === "table").map((node) => (
            <Card key={node.id}>
              <Table2 className="size-5 text-critical" />
              <h2 className="mt-3 font-semibold">{node.name}</h2>
              <div className="mt-4 overflow-hidden rounded-md border border-border">
                {(node.fields ?? []).map((field) => <div className="grid grid-cols-[1fr_6rem_5rem] border-b border-border px-3 py-2 text-sm last:border-b-0" key={field.id}><span>{field.label}</span><span className="text-muted-foreground">{field.type}</span><ToneBadge tone={visual.tone}>live</ToneBadge></div>)}
              </div>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {children.filter((node) => node.type === "activity").map((node) => <Card key={node.id}><Activity className="size-5 text-runtime" /><h2 className="mt-3 font-semibold">{node.name}</h2><ActivityRows priority={String(node.props.priority)} /></Card>)}
          {children.filter((node) => node.type === "workflow").map((node) => <Card className="border-l-4 border-l-warning" key={node.id}><Route className="size-5 text-warning" /><h2 className="mt-3 font-semibold">{node.name}</h2><WorkflowRows steps={Number(node.props.steps)} /></Card>)}
          <Card><GitPullRequestArrow className="size-5 text-advanced" /><h2 className="mt-3 font-semibold">Approval lane</h2><ActivityRows priority="Moderate" /></Card>
          <Card><ListChecks className="size-5 text-success" /><h2 className="mt-3 font-semibold">Operational queue</h2><WorkflowRows steps={4} /></Card>
        </div>
      </div>
    </section>
  );
}

function ActivityRows({ priority }: { priority: string }) {
  return <div className="mt-3 grid gap-2">{["Schema edited", "Preview generated", "Permission checked"].map((item) => <p className="rounded-md bg-muted px-3 py-2 text-sm text-muted-foreground" key={item}>{item} · {priority}</p>)}</div>;
}

function WorkflowRows({ steps }: { steps: number }) {
  return <div className="mt-3 grid gap-2">{Array.from({ length: Math.min(steps, 5) }).map((_, index) => <p className="rounded-md bg-muted px-3 py-2 text-sm text-muted-foreground" key={index}>Step {index + 1} · ready for mutation</p>)}</div>;
}
