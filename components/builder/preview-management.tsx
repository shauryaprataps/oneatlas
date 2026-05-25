"use client";

import { Copy, Snowflake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBuilderStore } from "@/store/builder-store";

export function PreviewManagement() {
  const { schema, copiedPreviewId, markPreviewCopied } = useBuilderStore();

  return (
    <section className="rounded-lg border border-white/10 bg-white/6 p-3">
      <h3 className="text-sm font-semibold">Preview snapshots</h3>
      <div className="mt-3 grid gap-2">
        {schema.previews.map((preview) => (
          <div className="rounded-md border border-white/10 bg-[#1A1F36]/60 p-3" key={preview.id}>
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-xs text-live">{preview.url}</p>
                <p className="mt-1 text-xs text-white/50">Created {preview.created} · Expires {preview.expires}</p>
              </div>
              <Button aria-label="Copy preview URL" onClick={() => markPreviewCopied(preview.id)} size="icon" type="button" variant="ghost">
                <Copy className="size-3" />
              </Button>
            </div>
            <p className="mt-2 flex items-center gap-2 text-xs text-success">
              <Snowflake className="size-3" />
              {copiedPreviewId === preview.id ? "Copied" : "Frozen snapshot"}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
