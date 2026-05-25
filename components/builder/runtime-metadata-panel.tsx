"use client";

import { Database, GitBranch, Layers3 } from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";
import { useBuilderStore } from "@/store/builder-store";

export function RuntimeMetadataPanel() {
  const schema = useBuilderStore((state) => state.schema);
  const meta = schema.metadata;
  const items = [
    ["Template", meta.templateName],
    ["Runtime ID", meta.runtimeId],
    ["Version", `v${schema.version}`],
    ["Complexity", meta.complexity],
    ["Last mutation", meta.lastMutation],
    ["Created", meta.created],
    ["Last edited", meta.lastEdited],
    ["Environment", meta.environment],
    ["Mutations", String(meta.mutationCount)],
    ["Previews", String(meta.previewCount)],
  ];

  return (
    <section className="rounded-lg border border-white/10 bg-ink/60 p-3">
      <div className="flex items-center justify-between gap-2">
        <p className="flex items-center gap-2 text-sm font-semibold"><Database className="size-4 text-live" />Runtime metadata</p>
        <StatusBadge status={schema.connection} />
      </div>
      <div className="mt-3 grid gap-2 text-xs">
        {items.map(([label, value]) => (
          <div className="grid grid-cols-[6.5rem_1fr] gap-2" key={label}>
            <span className="text-white/50">{label}</span>
            <span className="truncate text-white/86">{value}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
        <span className="rounded-md bg-live-soft p-2 text-live"><GitBranch className="mb-1 size-3" />versioned</span>
        <span className="rounded-md bg-success-soft p-2 text-success"><Layers3 className="mb-1 size-3" />schema source</span>
      </div>
    </section>
  );
}