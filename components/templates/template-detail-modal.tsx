"use client";

import type { TemplateDefinition } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import Link from "next/link";

interface TemplateDetailModalProps {
  template: TemplateDefinition | null;
  onOpenChange: (open: boolean) => void;
}

export function TemplateDetailModal({ template, onOpenChange }: TemplateDetailModalProps) {
  return (
    <Dialog open={Boolean(template)} onOpenChange={onOpenChange}>
      {template ? (
        <DialogContent>
          <Badge tone="primary">{template.category}</Badge>
          <DialogTitle className="mt-4 text-2xl font-semibold">{template.name}</DialogTitle>
          <DialogDescription className="mt-3 text-sm leading-6 text-muted-foreground">
            {template.description}
          </DialogDescription>
          <div className="mt-5 rounded-lg border border-border bg-muted p-4">
            <p className="text-sm font-medium">Generated preview</p>
            <p className="mt-2 text-sm text-muted-foreground">{template.preview}</p>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <Badge tone="gold">{template.complexity}</Badge>
            <Badge tone="mint">{template.collection}</Badge>
            {template.tags.map((tag) => <Badge key={tag}>#{tag}</Badge>)}
          </div>
          <Button asChild className="mt-6">
            <Link href={`/builder?template=${template.slug}`}>Use Template</Link>
          </Button>
        </DialogContent>
      ) : null}
    </Dialog>
  );
}
