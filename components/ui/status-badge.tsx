import type { RuntimeStatus, SemanticTone } from "@/types";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const toneClasses: Record<SemanticTone, string> = {
  success: "bg-success-soft text-success ring-success-ring",
  warning: "bg-warning-soft text-warning ring-warning-ring",
  runtime: "bg-runtime-soft text-runtime ring-runtime/25",
  advanced: "bg-advanced-soft text-advanced ring-advanced-ring",
  live: "bg-live-soft text-live ring-live-ring",
  critical: "bg-pending-soft text-pending ring-pending-ring",
};

const statusTone: Record<RuntimeStatus, SemanticTone> = {
  connected: "success",
  syncing: "live",
  mutation_running: "runtime",
  rollback_active: "advanced",
  preview_frozen: "live",
  offline: "warning",
};

const dotClasses: Record<SemanticTone, string> = {
  success: "bg-success",
  warning: "bg-warning",
  runtime: "bg-runtime",
  advanced: "bg-advanced",
  live: "bg-live",
  critical: "bg-pending",
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