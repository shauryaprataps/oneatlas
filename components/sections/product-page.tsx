import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import type { ProductPageContent } from "@/types";
import { SiteShell } from "@/components/layout/site-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function ProductPage({ content }: { content: ProductPageContent }) {
  return (
    <SiteShell>
      <section className="px-4 py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-start">
          <div>
            <Badge tone="primary">{content.eyebrow}</Badge>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold md:text-6xl">{content.title}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">{content.description}</p>
            <Button asChild className="mt-8" size="lg"><Link href="/builder">Start Building <ArrowRight className="size-4" /></Link></Button>
          </div>
          <Card>
            <p className="text-sm font-semibold">Runtime capabilities</p>
            <div className="mt-5 grid gap-4">
              {content.points.map((point) => (
                <div className="flex gap-3 rounded-md border border-border bg-muted/50 p-3" key={point}>
                  <CheckCircle2 className="size-5 text-accent-mint" />
                  <span className="text-sm">{point}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>
      <section className="px-4 pb-16">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          {["Template-first", "Schema-versioned", "Deployment-ready"].map((item) => (
            <Card key={item}>
              <h2 className="font-semibold">{item}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">Reusable primitives keep OneAtlas operational, modular, and aligned with runtime app evolution.</p>
            </Card>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
