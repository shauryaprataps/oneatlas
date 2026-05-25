"use client";

import { MessageSquare, PanelLeftClose, PanelRightClose, Rocket, Search, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useBuilderStore } from "@/store/builder-store";

export function BuilderTopbar() {
  const { schema, setAppName, togglePanel, setCommandOpen } = useBuilderStore();
  return (
    <header className="flex min-h-14 flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-[#0A2540]/80 px-3 py-2 text-white shadow-[var(--shadow-soft)] backdrop-blur-xl">
      <div className="flex items-center gap-2">
        <Button aria-label="Toggle component tree" onClick={() => togglePanel("left")} size="icon" variant="ghost"><PanelLeftClose className="size-4" /></Button>
        <input aria-label="App name" className="w-48 rounded-md border border-transparent bg-transparent px-2 py-1 font-semibold outline-none focus:border-white/20 focus:bg-white/10" onChange={(event) => setAppName(event.target.value)} value={schema.appName} />
        <Badge className="bg-white/10 text-white" tone="primary">schema v{schema.version}</Badge>
        <Badge className="hidden bg-live/10 text-live sm:inline-flex" tone="primary">{schema.metadata.runtimeId}</Badge>
        <span className="hidden text-xs text-white/55 lg:inline">{schema.metadata.templateName} · {schema.metadata.environment}</span>
      </div>
      <div className="flex items-center gap-2">
        <Button aria-label="Open command palette" onClick={() => setCommandOpen(true)} size="icon" variant="ghost"><Search className="size-4" /></Button>
        <Button size="sm" variant="outline"><Share2 className="size-4" />Share</Button>
        <Button size="sm"><Rocket className="size-4" />Deploy</Button>
        <Button aria-label="Toggle conversational strip" onClick={() => togglePanel("bottom")} size="icon" variant="ghost"><MessageSquare className="size-4" /></Button>
        <Button aria-label="Toggle properties panel" onClick={() => togglePanel("right")} size="icon" variant="ghost"><PanelRightClose className="size-4" /></Button>
      </div>
    </header>
  );
}
