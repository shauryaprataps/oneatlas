"use client";

import { PanelLeftClose, PanelRightClose, Rocket, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useBuilderStore } from "@/store/builder-store";

export function BuilderTopbar() {
  const { schema, setAppName, togglePanel } = useBuilderStore();
  return (
    <header className="flex min-h-14 flex-wrap items-center justify-between gap-3 border-b border-border bg-card-strong px-3 py-2">
      <div className="flex items-center gap-2">
        <Button aria-label="Toggle component tree" onClick={() => togglePanel("left")} size="icon" variant="ghost"><PanelLeftClose className="size-4" /></Button>
        <input aria-label="App name" className="w-48 rounded-md border border-transparent bg-transparent px-2 py-1 font-semibold outline-none focus:border-border focus:bg-background" onChange={(event) => setAppName(event.target.value)} value={schema.appName} />
        <Badge tone="primary">schema v{schema.version}</Badge>
      </div>
      <div className="flex items-center gap-2">
        <Button size="sm" variant="outline"><Share2 className="size-4" />Share</Button>
        <Button size="sm"><Rocket className="size-4" />Deploy</Button>
        <Button aria-label="Toggle properties panel" onClick={() => togglePanel("right")} size="icon" variant="ghost"><PanelRightClose className="size-4" /></Button>
      </div>
    </header>
  );
}
