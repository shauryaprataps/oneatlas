import type { RuntimeStatus, SemanticTone } from "@/types";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const toneClasses: Record<SemanticTone, string> = {
  success: "bg-success/12 text-success ring-success/25",
  warning: "bg-warning/14 text-warning ring-warning/25",
  runtime: "bg-runtime/12 text-runtime ring-runtime/25",
  advanced: "bg-advanced/12 text-advanced ring-advanced/25",
  live: "bg-live/12 text-live ring-live/25",
  critical: "bg-critical/14 text-critical ring-critical/25",
};

const statusTone: Record<RuntimeStatus, SemanticTone> = {
  connected: "success",
  syncing: "live",
  mutation_running: "runtime",
  rollback_active: "critical",
  preview_frozen: "live",
  offline: "warning",
};

const dotClasses: Record<SemanticTone, string> = {
  success: "bg-success",
  warning: "bg-warning",
  runtime: "bg-runtime",
  advanced: "bg-advanced",
  live: "bg-live",
  critical: "bg-critical",
};

const labels: Record<RuntimeStatus, string> = {
  connected: "Connected",
  syncing: "Syncing",
  mutation_running: "Mutation running",
  rollback_active: "Rollback active",
  preview_frozen: "Preview frozen",
  offline: "Offline",
};

export function StatusBadge({ status, className }: { status: RuntimeStatus; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 rounded-md px-2 py-1 text-xs font-medium ring-1", toneClasses[statusTone[status]], className)}>
      <span className={cn("size-1.5 rounded-full", status === "mutation_running" && "animate-pulse", dotClasses[statusTone[status]])} />
      {labels[status]}
    </span>
  );
}

export function ToneBadge({ tone, children }: { tone: SemanticTone; children: ReactNode }) {
  return <span className={cn("rounded-md px-2 py-1 text-xs font-medium ring-1", toneClasses[tone])}>{children}</span>;
}
