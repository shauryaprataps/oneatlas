import Link from "next/link";
import { ArrowRight, Check, Database, GitBranch, Lock, Sparkles } from "lucide-react";
import { faqs, howItWorks, roleCards } from "@/config/content";
import { templates } from "@/config/templates";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TemplateCard } from "@/components/templates/template-card";
import { SectionHeading } from "./section-heading";

export function Hero() {
  return (
    <section className="px-4 pb-14 pt-14 md:pt-20">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.82fr] lg:items-center">
        <div>
          <Badge tone="mint">AI-native runtime app platform</Badge>
          <h1 className="mt-5 max-w-4xl text-5xl font-semibold tracking-normal text-foreground md:text-7xl">
            Build internal apps that stay editable after generation.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            OneAtlas turns reusable templates into runtime schemas for dashboards, workflows, and operational systems that evolve through targeted mutations.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg"><Link href="/builder">Start Building <ArrowRight className="size-4" /></Link></Button>
            <Button asChild size="lg" variant="outline"><Link href="/templates">Explore Templates</Link></Button>
          </div>
        </div>
        <RuntimePreview />
      </div>
    </section>
  );
}

function RuntimePreview() {
  return (
    <div className="rounded-lg border border-border bg-card-strong p-3 shadow-[var(--shadow-soft)]">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <span className="text-sm font-medium">Revenue Ops Runtime</span>
        <Badge tone="primary">schema v12</Badge>
      </div>
      <div className="mt-4 grid gap-3">
        {["Pipeline Health", "Account Risk", "Next Actions"].map((label, index) => (
          <div className="rounded-md border border-border bg-muted/60 p-4" key={label}>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{label}</span>
              <span className="text-xs text-muted-foreground">{index + 3} fields</span>
            </div>
            <div className="mt-3 h-2 rounded-full bg-primary/15">
              <div className="h-2 rounded-full bg-primary" style={{ width: `${72 - index * 14}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function HowItWorks() {
  return (
    <section className="px-4 py-16" id="how">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="How OneAtlas Works" title="Template-first, schema-driven, mutation-safe." description="The product model follows the trial document: reusable templates drive consistency, runtime schemas remain the source of truth, and updates are targeted instead of full rewrites." />
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {howItWorks.map((step, index) => (
            <Card key={step}>
              <span className="text-sm font-semibold text-primary">0{index + 1}</span>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">{step}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ModelSection() {
  const items = [
    { icon: Sparkles, title: "Latest models", text: "Prompt-to-app workflows are designed around model-assisted schema evolution." },
    { icon: GitBranch, title: "Incremental mutations", text: "Edits target fields, props, and order instead of regenerating whole apps." },
    { icon: Database, title: "Runtime metadata", text: "Schemas, versions, templates, and previews are treated as product data." },
  ];
  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Build With Latest Models" title="AI-native without giving up operational control." description="OneAtlas feels generated, editable, and governed: a runtime platform rather than a static output generator." />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {items.map((item) => <Card key={item.title}><item.icon className="size-5 text-primary" /><h3 className="mt-4 font-semibold">{item.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{item.text}</p></Card>)}
        </div>
      </div>
    </section>
  );
}

export function TemplateShowcase() {
  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Templates Showcase" title="Operational systems, not marketing cards." description="Each template carries category, complexity, schema identity, and a meaningful app preview." />
        <div className="mt-8 flex snap-x gap-4 overflow-x-auto pb-4">
          {templates.map((template) => <TemplateCard className="min-w-[20rem] snap-start" key={template.id} template={template} compact />)}
        </div>
      </div>
    </section>
  );
}

export function RolesAndTrust() {
  return (
    <section className="px-4 py-16" id="roles">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow="Atlas for Roles" title="Built for the operators who own messy workflows." description="Revenue, people, support, inventory, admin, and analytics teams can start from reusable systems and keep shaping them." />
          <div className="mt-6 flex flex-wrap gap-2">{roleCards.map((role) => <Badge key={role} tone="neutral">{role}</Badge>)}</div>
        </div>
        <Card>
          <Lock className="size-5 text-primary" />
          <h3 className="mt-4 text-xl font-semibold">Enterprise and security posture</h3>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">Governance, auditability, schema versioning, and rollback shape the product from the first interaction.</p>
          <div className="mt-5 grid gap-3">{["Template approvals", "Versioned runtime schemas", "Controlled preview links"].map((item) => <p className="flex gap-2 text-sm" key={item}><Check className="size-4 text-accent-mint" />{item}</p>)}</div>
        </Card>
      </div>
    </section>
  );
}

export function PricingFaq() {
  return (
    <section className="px-4 py-16">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
        <Card>
          <Badge tone="gold">Pricing Preview</Badge>
          <h2 className="mt-4 text-3xl font-semibold">Start with builders. Scale to governed teams.</h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">Pricing is organized around runtime app creation, template usage, and enterprise controls.</p>
          <Button asChild className="mt-6"><Link href="/pricing">View Pricing</Link></Button>
        </Card>
        <div className="grid gap-3">
          {faqs.map((faq) => <Card key={faq.question}><h3 className="font-semibold">{faq.question}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{faq.answer}</p></Card>)}
        </div>
      </div>
    </section>
  );
}
