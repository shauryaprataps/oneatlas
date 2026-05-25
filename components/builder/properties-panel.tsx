"use client";

import { StatusBadge } from "@/components/ui/status-badge";
import { getSelectedComponent, useBuilderStore } from "@/store/builder-store";

export function PropertiesPanel() {
  const { schema, selectedId, updateSelectedProp } = useBuilderStore();
  const selected = getSelectedComponent(schema, selectedId);

  if (!selected) return <p className="text-sm text-white/60">Select a component.</p>;

  return (
    <div className="grid gap-4">
      <div>
        <div className="mb-2 flex items-center justify-between gap-2">
          <p className="text-xs uppercase text-white/50">{selected.type}</p>
          <StatusBadge status={schema.connection} />
        </div>
        <h2 className="font-semibold">{selected.name}</h2>
        <p className="mt-1 text-xs text-white/50">{schema.metadata.templateName} · {schema.metadata.runtimeId}</p>
      </div>
      {Object.entries(selected.props).map(([key, value]) => (
        <label className="grid gap-1 text-sm" key={key}>
          <span className="font-medium capitalize">{key}</span>
          <input className="h-10 rounded-md border border-white/10 bg-white/8 px-3 text-white outline-none focus:ring-2 focus:ring-runtime" onChange={(event) => updateSelectedProp(key, event.target.value)} value={String(value)} />
        </label>
      ))}
      {selected.fields ? (
        <div className="rounded-md border border-white/10 bg-white/6 p-3">
          <p className="text-sm font-medium">Fields</p>
          <div className="mt-2 grid gap-2">
            {selected.fields.map((field) => <p className="text-xs text-white/58" key={field.id}>{field.label} · {field.type}</p>)}
          </div>
        </div>
      ) : null}
      <div className="rounded-md border border-white/10 bg-white/6 p-3 text-xs">
        <p className="font-medium">Last mutation</p>
        <p className="mt-1 text-white/58">{schema.metadata.lastMutation}</p>
      </div>
    </div>
  );
}
