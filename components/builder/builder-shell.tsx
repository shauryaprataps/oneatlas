"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { templates } from "@/config/templates";
import { useBuilderStore } from "@/store/builder-store";
import { cn } from "@/lib/utils";
import { BuilderTopbar } from "./builder-topbar";
import { ComponentTree } from "./component-tree";
import { LiveCanvas } from "./live-canvas";
import { PropertiesPanel } from "./properties-panel";
import { StatusAndInput } from "./status-input";

export function BuilderShell() {
  const params = useSearchParams();
  const { panels, setSchemaById } = useBuilderStore();

  useEffect(() => {
    const slug = params.get("template");
    const template = templates.find((item) => item.slug === slug);
    if (template) setSchemaById(template.schemaId);
  }, [params, setSchemaById]);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background text-foreground">
      <BuilderTopbar />
      <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[auto_1fr_auto]">
        <aside className={cn("hidden w-72 overflow-auto border-r border-border bg-card-strong p-3 lg:block", !panels.left && "lg:hidden")}>
          <h2 className="mb-3 text-sm font-semibold">Component tree</h2>
          <ComponentTree />
        </aside>
        <LiveCanvas />
        <aside className={cn("hidden w-80 overflow-auto border-l border-border bg-card-strong p-4 xl:block", !panels.right && "xl:hidden")}>
          <PropertiesPanel />
        </aside>
      </div>
      <StatusAndInput />
    </div>
  );
}
