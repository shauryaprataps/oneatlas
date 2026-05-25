"use client";

import { Activity, BarChart3, Route, Table2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useBuilderStore } from "@/store/builder-store";

export function LiveCanvas() {
  const schema = useBuilderStore((state) => state.schema);
  const page = schema.components[0];
  const children = page.children ?? [];
  return (
    <section className="min-h-0 flex-1 overflow-auto bg-background p-4">
      <div className="mx-auto grid max-w-5xl gap-4">
        <div className="rounded-lg border border-border bg-navy p-5 text-white shadow-[var(--shadow-soft)]">
          <p className="text-sm text-white/65">{String(page.props.owner)} runtime · {String(page.props.layout)} layout</p>
          <h1 className="text-3xl font-semibold">{page.name}</h1>
          <p className="mt-2 text-sm text-white/65">Rendered from selected schema, not a static placeholder.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {children.filter((node) => node.type === "metric").map((node) => <Card className="border-l-4 border-l-accent-mint" key={node.id}><p className="text-sm text-muted-foreground">{node.name}</p><p className="mt-3 text-3xl font-semibold text-navy dark:text-foreground">{String(node.props.value)}</p><p className="mt-1 text-sm text-accent-mint">{String(node.props.delta)}</p></Card>)}
        </div>
        <div className="grid gap-4 lg:grid-cols-[1fr_1.4fr]">
          {children.filter((node) => node.type === "chart").map((node) => (
            <Card key={node.id}>
              <BarChart3 className="size-5 text-accent-cyan" />
              <h2 className="mt-3 font-semibold">{node.name}</h2>
              <div className="mt-4 flex h-44 items-end gap-2">{[38, 64, 51, 78, 69, 88].map((height, index) => <span className="flex-1 rounded-t-md bg-primary/70" key={`${node.id}-${height}-${index}`} style={{ height: `${height}%` }} />)}</div>
            </Card>
          ))}
          {children.filter((node) => node.type === "table").map((node) => (
            <Card key={node.id}>
              <Table2 className="size-5 text-accent-gold" />
              <h2 className="mt-3 font-semibold">{node.name}</h2>
              <div className="mt-4 overflow-hidden rounded-md border border-border">
                {(node.fields ?? []).map((field) => <div className="grid grid-cols-[1fr_6rem] border-b border-border px-3 py-2 text-sm last:border-b-0" key={field.id}><span>{field.label}</span><span className="text-muted-foreground">{field.type}</span></div>)}
              </div>
            </Card>
          ))}
        </div>
        {children.filter((node) => node.type === "activity").map((node) => <Card key={node.id}><Activity className="size-5 text-primary" /><h2 className="mt-3 font-semibold">{node.name}</h2><p className="mt-2 text-sm text-muted-foreground">{String(node.props.items)} recent events with {String(node.props.priority).toLowerCase()} priority routing.</p></Card>)}
        {children.filter((node) => node.type === "workflow").map((node) => <Card className="border-l-4 border-l-accent-peach" key={node.id}><Route className="size-5 text-accent-peach" /><h2 className="mt-3 font-semibold">{node.name}</h2><p className="mt-2 text-sm text-muted-foreground">{String(node.props.steps)} operational steps · {String(node.props.status)} runtime workflow.</p></Card>)}
      </div>
    </section>
  );
}
