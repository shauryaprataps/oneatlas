"use client";

import { ToneBadge } from "@/components/ui/status-badge";
import { useBuilderStore } from "@/store/builder-store";

export function MutationTimeline() {
  const { history, diff } = useBuilderStore((state) => state.schema);

  return (
    <section className="rounded-lg border border-white/10 bg-white/6 p-3">
      <h3 className="text-sm font-semibold">Mutation timeline</h3>
      <div className="mt-3 grid gap-3">
        {history.slice(0, 5).map((event) => (
          <div className="grid grid-cols-[2.5rem_1fr] gap-3 text-xs" key={`${event.time}-${event.title}`}>
            <span className="text-white/45">{event.time}</span>
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium text-white">{event.title}</span>
                <ToneBadge tone={event.tone}>{event.tone}</ToneBadge>
              </div>
              <p className="mt-1 text-white/56">{event.detail}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-md bg-[#1A1F36]/70 p-3">
        <p className="text-xs font-medium text-white">Schema diff preview</p>
        <div className="mt-2 grid gap-1">
          {diff.map((item) => <span className="text-xs text-white/62" key={item}>{item}</span>)}
        </div>
      </div>
    </section>
  );
}
