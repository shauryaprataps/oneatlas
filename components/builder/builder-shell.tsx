"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { templates } from "@/config/templates";
import { useBuilderStore } from "@/store/builder-store";
import { cn } from "@/lib/utils";
import { BuilderTopbar } from "./builder-topbar";
import { CommandPalette } from "./command-palette";
import { ComponentTree } from "./component-tree";
import { LiveCanvas } from "./live-canvas";
import { MutationTimeline } from "./mutation-timeline";
import { PreviewManagement } from "./preview-management";
import { PropertiesPanel } from "./properties-panel";
import { RuntimeMetadataPanel } from "./runtime-metadata-panel";
import { StatusAndInput } from "./status-input";

interface BuilderShellProps {
  runtimeId?: string;
}

export function BuilderShell({ runtimeId }: BuilderShellProps) {
  const params = useSearchParams();
  const { panels, setSchemaById, setSchemaByRuntimeId } = useBuilderStore();

  useEffect(() => {
    if (runtimeId) {
      setSchemaByRuntimeId(runtimeId);
      return;
    }
    const slug = params.get("template");
    const template = templates.find((item) => item.slug === slug);
    if (template) setSchemaById(template.schemaId);
  }, [params, runtimeId, setSchemaById, setSchemaByRuntimeId]);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background text-foreground">
      <BuilderTopbar />
      <CommandPalette />
      <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[auto_1fr_auto]">
        <aside className={cn("hidden w-72 overflow-auto border-r border-white/10 bg-navy/80 p-3 text-white shadow-[var(--shadow-glass)] backdrop-blur-xl transition-all duration-200 lg:block", !panels.left && "lg:hidden")}>
          <RuntimeMetadataPanel />
          <h2 className="mb-3 mt-4 text-sm font-semibold text-white">Runtime component tree</h2>
          <ComponentTree />
        </aside>
        <LiveCanvas />
        <aside className={cn("hidden w-80 overflow-auto border-l border-white/10 bg-navy/80 p-4 text-white shadow-[var(--shadow-glass)] backdrop-blur-xl transition-all duration-200 xl:block", !panels.right && "xl:hidden")}>
          <PropertiesPanel />
          <div className="mt-4 grid gap-4">
            <MutationTimeline />
            <PreviewManagement />
          </div>
        </aside>
      </div>
      {panels.bottom ? <StatusAndInput /> : null}
    </div>
  );
}