import type { FaqItem, ProductPageContent } from "@/types";

export const howItWorks = [
  "Choose a reusable operational template.",
  "Instantiate a runtime schema with meaningful modules.",
  "Edit the app incrementally through panels or conversation.",
  "Deploy, preview, and keep evolving without full rewrites.",
];

export const roleCards = [
  "Revenue Ops",
  "People Ops",
  "Support Leads",
  "Admin Teams",
  "Founders",
  "Data Operators",
];

export const faqs: FaqItem[] = [
  {
    question: "Is OneAtlas a code editor?",
    answer: "No. The builder shell is a runtime app surface where schemas, panels, and conversational edits evolve the app.",
  },
  {
    question: "Are templates static?",
    answer: "Templates seed consistent systems, then runtime schemas become the source of truth for ongoing changes.",
  },
  {
    question: "Can generated apps keep changing?",
    answer: "Yes. The product philosophy is incremental mutation, versioning, rollback, and editable apps after generation.",
  },
];

export const productPages: Record<string, ProductPageContent> = {
  enterprise: {
    slug: "enterprise",
    eyebrow: "Enterprise",
    title: "Govern runtime app creation across teams.",
    description: "OneAtlas gives operators a controlled way to generate, evolve, and deploy internal apps without losing consistency.",
    points: ["Workspace governance", "Template approvals", "Version history", "Team rollout support"],
  },
  security: {
    slug: "security",
    eyebrow: "Security",
    title: "Designed for mutation-safe internal systems.",
    description: "Schemas evolve through targeted changes, with audit-friendly structure and permission-aware runtime surfaces.",
    points: ["Schema versioning", "Rollback-ready snapshots", "Access boundaries", "Operational audit trail"],
  },
  pricing: {
    slug: "pricing",
    eyebrow: "Pricing",
    title: "Plans for builders, operators, and enterprises.",
    description: "Start with reusable templates, then scale runtime app creation across teams as operational complexity grows.",
    points: ["Builder plan", "Team workspaces", "Enterprise governance", "Deployment support"],
  },
  docs: {
    slug: "docs",
    eyebrow: "Docs",
    title: "Runtime-first concepts for app builders.",
    description: "Learn how schemas, templates, incremental mutations, and previews fit together inside OneAtlas.",
    points: ["Runtime schemas", "Template registry", "Builder shell", "Preview lifecycle"],
  },
  blog: {
    slug: "blog",
    eyebrow: "Blog",
    title: "Notes from the runtime app frontier.",
    description: "Product thinking on AI-native internal tools, operational dashboards, and schema-driven systems.",
    points: ["Product updates", "Operational patterns", "Architecture notes", "Release logs"],
  },
  support: {
    slug: "support",
    eyebrow: "Support",
    title: "Help for teams shipping real internal tools.",
    description: "Get guidance on setup, templates, builder workflows, preview links, and production rollout questions.",
    points: ["Setup help", "Template advice", "Builder troubleshooting", "Deployment guidance"],
  },
};
