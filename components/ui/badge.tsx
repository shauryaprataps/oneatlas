import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: "primary" | "pink" | "mint" | "gold" | "neutral";
}

const tones: Record<NonNullable<BadgeProps["tone"]>, string> = {
  primary: "bg-primary/10 text-primary",
  pink: "bg-advanced/10 text-advanced",
  mint: "bg-success/10 text-success",
  gold: "bg-critical/15 text-critical",
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
