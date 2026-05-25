"use client";

import { SendHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBuilderStore } from "@/store/builder-store";

export function StatusAndInput() {
  const { schema, prompt, setPrompt, mockSubmitPrompt } = useBuilderStore();
  return (
    <footer className="border-t border-border bg-card-strong">
      <div className="flex flex-wrap items-center gap-3 px-3 py-2 text-xs text-muted-foreground">
        <span>Last modified: {schema.lastModified}</span>
        <span>Schema version: v{schema.version}</span>
        <span className="flex items-center gap-2"><span className="size-2 rounded-full bg-accent-mint" />{schema.connection}</span>
      </div>
      <form className="flex gap-2 border-t border-border p-3" onSubmit={(event) => { event.preventDefault(); mockSubmitPrompt(); }}>
        <input className="h-11 flex-1 rounded-md border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary" onChange={(event) => setPrompt(event.target.value)} placeholder="Ask OneAtlas to add a field, rename a module, or reorder the canvas..." value={prompt} />
        <Button aria-label="Send instruction" size="icon" type="submit"><SendHorizontal className="size-4" /></Button>
      </form>
    </footer>
  );
}
