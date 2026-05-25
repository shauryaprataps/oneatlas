import { BookOpen, LifeBuoy, MessageCircle, Newspaper, Sparkles, Users } from "lucide-react";
import type { NavigationGroup, NavigationItem } from "@/types";

export const primaryNavigation: NavigationItem[] = [
  { label: "Product", href: "/#how", description: "Runtime schemas, mutation-safe apps, and live canvases." },
  { label: "Use Cases", href: "/#roles", description: "Operational systems for every internal team." },
  { label: "Templates", href: "/templates", description: "Deployable app systems sourced from config." },
  { label: "Enterprise", href: "/enterprise", description: "Governance, teams, controls, and rollout support." },
  { label: "Security", href: "/security", description: "Runtime permissions, audit trails, and version safety." },
  { label: "Pricing", href: "/pricing", description: "Simple plans for builders and operations teams." },
];

export const dropdownGroups: NavigationGroup[] = [
  {
    label: "Resources",
    items: [
      { label: "Docs", href: "/docs", description: "Implementation guides and runtime concepts.", icon: BookOpen },
      { label: "Blog", href: "/blog", description: "Product notes and operating patterns.", icon: Newspaper },
      { label: "Support", href: "/support", description: "Help for teams building production workflows.", icon: LifeBuoy },
      { label: "Updates", href: "/blog#updates", description: "Release notes and shipped improvements.", icon: Sparkles },
    ],
  },
  {
    label: "Community",
    items: [
      { label: "Discord", href: "https://discord.com", icon: MessageCircle },
      { label: "LinkedIn", href: "https://linkedin.com", icon: Users },
      { label: "Twitter", href: "https://twitter.com", icon: MessageCircle },
      { label: "Reddit", href: "https://reddit.com", icon: MessageCircle },
      { label: "GitHub", href: "https://github.com", icon: BookOpen },
      { label: "Instagram", href: "https://instagram.com", icon: Sparkles },
    ],
  },
];
