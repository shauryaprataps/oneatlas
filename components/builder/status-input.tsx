"use client";

import { SendHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { useBuilderStore } from "@/store/builder-store";

const suggestions = ["Add field", "Rename component", "Reorder module", "Add metric"];

export function StatusAndInput() {
  const { schema, prompt, setPrompt, mockSubmitPrompt, applyInstruction } = useBuilderStore();

  return (
    <footer className="border-t border-white/10 bg-navy/80 text-white shadow-[var(--shadow-glass)] backdrop-blur-xl transition-all duration-200">
      <div className="flex flex-wrap items-center gap-3 border-b border-white/10 px-3 py-2 text-xs text-white/70">
        <span>Last modified: {schema.lastModified}</span>
        <span>Runtime: {schema.metadata.runtimeId}</span>
        <span>Schema version: v{schema.version}</span>
        <StatusBadge status={schema.connection} />
      </div>
      <div className="grid gap-2 px-3 py-2">
        <div className="flex gap-2 overflow-x-auto">
          {suggestions.map((suggestion) => (
            <button className="rounded-md border border-white/10 px-2 py-1 text-xs text-white/70 transition hover:bg-white/10 hover:text-white" key={suggestion} onClick={() => applyInstruction(suggestion)} type="button">
              {suggestion}
            </button>
          ))}
        </div>
        <div className="flex gap-2 overflow-x-auto text-xs text-white/52">
          {schema.recentInstructions.slice(0, 3).map((event) => (
            <span className="whitespace-nowrap rounded-md bg-white/6 px-2 py-1" key={`${event.time}-${event.detail}`}>{event.detail}</span>
          ))}
        </div>
      </div>
      <form className="flex gap-2 border-t border-white/10 p-3" onSubmit={(event) => { event.preventDefault(); mockSubmitPrompt(); }}>
        <input className="h-11 flex-1 rounded-md border border-white/10 bg-white/8 px-3 text-sm text-white outline-none transition focus:ring-2 focus:ring-live" onChange={(event) => setPrompt(event.target.value)} placeholder="Ask OneAtlas to mutate the runtime schema..." value={prompt} />
        <Button aria-label="Send instruction" size="icon" type="submit"><SendHorizontal className="size-4" /></Button>
      </form>
    </footer>
  );
}