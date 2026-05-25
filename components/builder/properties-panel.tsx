"use client";

import { getSelectedComponent, useBuilderStore } from "@/store/builder-store";

export function PropertiesPanel() {
  const { schema, selectedId, updateSelectedProp } = useBuilderStore();
  const selected = getSelectedComponent(schema, selectedId);

  if (!selected) return <p className="text-sm text-muted-foreground">Select a component.</p>;

  return (
    <div className="grid gap-4">
      <div>
        <p className="text-xs uppercase text-muted-foreground">{selected.type}</p>
        <h2 className="font-semibold">{selected.name}</h2>
      </div>
      {Object.entries(selected.props).map(([key, value]) => (
        <label className="grid gap-1 text-sm" key={key}>
          <span className="font-medium capitalize">{key}</span>
          <input className="h-10 rounded-md border border-border bg-background px-3 outline-none focus:ring-2 focus:ring-primary" onChange={(event) => updateSelectedProp(key, event.target.value)} value={String(value)} />
        </label>
      ))}
      {selected.fields ? <div className="rounded-md border border-border p-3"><p className="text-sm font-medium">Fields</p><div className="mt-2 grid gap-2">{selected.fields.map((field) => <p className="text-xs text-muted-foreground" key={field.id}>{field.label} · {field.type}</p>)}</div></div> : null}
    </div>
  );
}
