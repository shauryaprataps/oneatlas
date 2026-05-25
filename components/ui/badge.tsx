import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: "primary" | "pink" | "mint" | "gold" | "neutral";
}

const tones: Record<NonNullable<BadgeProps["tone"]>, string> = {
  primary: "bg-primary/10 text-primary",
  pink: "bg-accent-pink/10 text-accent-pink",
  mint: "bg-accent-mint/10 text-emerald-700 dark:text-accent-mint",
  gold: "bg-accent-gold/15 text-amber-700 dark:text-accent-gold",
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
