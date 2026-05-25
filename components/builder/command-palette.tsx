"use client";

import { useEffect } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBuilderStore } from "@/store/builder-store";
import { cn } from "@/lib/utils";

const actions = ["Generate template", "Preview", "Deploy", "Rollback", "Search schema", "Create mutation"];

export function CommandPalette() {
  const { commandOpen, setCommandOpen, applyInstruction } = useBuilderStore();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen(!commandOpen);
      }
      if (event.key === "Escape") setCommandOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [commandOpen, setCommandOpen]);

  if (!commandOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-ink/50 p-4 backdrop-blur-sm" onClick={() => setCommandOpen(false)}>
      <div className="mx-auto mt-20 max-w-xl rounded-lg border border-white/10 bg-navy/92 p-3 text-white shadow-[var(--shadow-glass)]" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-center gap-2 border-b border-white/10 px-2 pb-3">
          <Search className="size-4 text-live" />
          <span className="text-sm text-white/60">Command palette</span>
        </div>
        <div className="mt-3 grid gap-1">
          {actions.map((action) => (
            <Button className={cn("justify-start text-white hover:bg-white/10")} key={action} onClick={() => { applyInstruction(action); setCommandOpen(false); }} variant="ghost">
              {action}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}