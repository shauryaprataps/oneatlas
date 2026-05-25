"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { categories, collections, complexities } from "@/config/templates";
import type { TemplateFilters } from "@/types";

const filterKeys: (keyof TemplateFilters)[] = ["category", "complexity", "collection"];

export function TemplateFiltersBar() {
  const router = useRouter();
  const params = useSearchParams();

  function updateFilter(key: keyof TemplateFilters, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value === "all") next.delete(key);
    else next.set(key, value);
    router.push(`/templates?${next.toString()}`);
  }

  const options: Record<keyof TemplateFilters, string[]> = {
    category: categories,
    complexity: [...complexities],
    collection: collections,
  };

  return (
    <div className="grid gap-3 rounded-lg border border-border bg-card-strong p-3 shadow-[var(--shadow-soft)] md:grid-cols-3">
      {filterKeys.map((key) => (
        <label className="grid gap-1 text-sm" key={key}>
          <span className="font-medium capitalize">{key}</span>
          <select
            className="h-10 rounded-md border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary"
            onChange={(event) => updateFilter(key, event.target.value)}
            value={params.get(key) ?? "all"}
          >
            <option value="all">All</option>
            {options[key].map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </label>
      ))}
    </div>
  );
}
