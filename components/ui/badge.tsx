import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: "runtime" | "runtime-secondary" | "success" | "live" | "warning" | "pending" | "advanced" | "neutral";
}

const tones: Record<NonNullable<BadgeProps["tone"]>, string> = {
  runtime: "bg-runtime-soft text-runtime",
  "runtime-secondary": "bg-runtime-secondary-soft text-runtime-secondary",
  success: "bg-success-soft text-success",
  live: "bg-live-soft text-live",
  warning: "bg-warning-soft text-warning",
  pending: "bg-pending-soft text-pending",
  advanced: "bg-advanced-soft text-advanced",
  neutral: "bg-muted text-muted-foreground",
};

export function Badge({ className, tone = "neutral", ...props }: BadgeProps) {
  return (
    <span
      className={cn("inline-flex rounded-md px-2 py-1 text-xs font-medium", tones[tone], className)}
      {...props}
    />
  );
}