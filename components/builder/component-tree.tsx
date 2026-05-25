"use client";

import { ChevronRight } from "lucide-react";
import type { BuilderComponentNode } from "@/types";
import { useBuilderStore } from "@/store/builder-store";
import { cn } from "@/lib/utils";

export function ComponentTree() {
  const { schema, selectedId, selectComponent } = useBuilderStore();
  return (
    <div className="grid gap-2">
      {schema.components.map((node) => (
        <TreeNode key={node.id} node={node} selectedId={selectedId} selectComponent={selectComponent} />
      ))}
    </div>
  );
}

function TreeNode({ node, selectedId, selectComponent }: { node: BuilderComponentNode; selectedId: string; selectComponent: (id: string) => void }) {
  return (
    <div>
      <button
        className={cn("flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", selectedId === node.id && "bg-navy text-white")}
        onClick={() => selectComponent(node.id)}
        type="button"
      >
        <ChevronRight className="size-3" />
        <span>{node.name}</span>
      </button>
      {node.children ? <div className="ml-4 mt-1 grid gap-1 border-l border-border pl-2">{node.children.map((child) => <TreeNode key={child.id} node={child} selectedId={selectedId} selectComponent={selectComponent} />)}</div> : null}
    </div>
  );
}
