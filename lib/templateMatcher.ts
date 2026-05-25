export type TemplateMatchResult<TTemplate> =
  | {
      matched: true;
      confidence: number;
      template: TTemplate;
      suggestion?: undefined;
    }
  | {
      matched: false;
      confidence: number;
      template?: undefined;
      suggestion: string;
    };

export type TemplateLike = {
  tags: ReadonlyArray<string>;
  name?: string;
  slug?: string;
  id?: string;
  description?: string;
};

function normalizeTokens(input: string): string[] {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/g)
    .map((t) => t.trim())
    .filter(Boolean);
}

function unique<T>(arr: ReadonlyArray<T>): T[] {
  return Array.from(new Set(arr));
}

function partialMatchScore(params: { promptToken: string; tag: string }): number {
  const { promptToken, tag } = params;

  const p = promptToken.toLowerCase();
  const t = tag.toLowerCase();

  // substring overlap
  if (t.includes(p) || p.includes(t)) return 1;

  // domain keyword normalization (deterministic)
  const canonical: Record<string, string> = {
    crm: "crm",
    inventory: "inventory",
    hr: "hr",
    people: "hr",
    analytics: "analytics",
    admin: "admin",
  };

  const pc = canonical[p];
  const tc = canonical[t];

  if (pc && tc && pc === tc) return 1;

  return 0;
}

export function matchTemplate<T extends TemplateLike>(params: {
  prompt: string;
  templates: T[];
  /** Minimum score to be considered a match */
  threshold?: number;
}): TemplateMatchResult<T> {
  const { prompt, templates, threshold = 2 } = params;
  const promptTokens = unique(normalizeTokens(prompt));

  let best: { template: T; score: number } | null = null;

  for (const template of templates) {
    let score = 0;
    const templateTags = template.tags ?? [];
    const templateName = (template.name ?? "").toLowerCase();

    // Bonus: +5 if any prompt token is a canonical domain keyword that appears in the template name
    // This ensures "Build CRM dashboard" matches CRM (crm in name), not Analytics (dashboard in name)
    // Only canonical domain keywords (crm, hr, inventory, analytics, admin) get the name bonus
    const canonical: Record<string, string> = {
      crm: "crm",
      inventory: "inventory",
      hr: "hr",
      people: "hr",
      analytics: "analytics",
      admin: "admin",
    };

    for (const promptToken of promptTokens) {
      const p = promptToken.toLowerCase();
      const canonicalKey = canonical[p];
      if (canonicalKey && templateName.includes(canonicalKey)) {
        score += 5;
        break;
      }
    }

    // Deterministic scoring strategy aligned to requirements:
    // - +2 exact tag match
    // - +1 partial match (token substring / domain keyword normalization)
    for (const tag of templateTags) {
      const tagLower = tag.toLowerCase();

      for (const promptToken of promptTokens) {
        const p = promptToken.toLowerCase();

        // +2 exact tag match (token equals tag)
        if (p === tagLower) {
          score += 2;
          continue;
        }

        // +1 partial match
        score += partialMatchScore({ promptToken, tag });

        // Extra +1 for simple normalization: prompt canonical keyword equals tag canonical keyword
        // (keeps matches deterministic for prompts like "CRM" without embeddings)
        const canonical: Record<string, string> = {
          crm: "crm",
          inventory: "inventory",
          hr: "hr",
          people: "hr",
          analytics: "analytics",
          admin: "admin",
        };

        if (canonical[p] && canonical[p] === canonical[tagLower]) {
          score += 1;
        }
      }
    }

    // deterministic tie-break: higher score wins; then lexical slug/id/name
    if (
      !best ||
      score > best.score ||
      (score === best.score &&
        String(template.slug ?? template.id ?? template.name ?? "") <
          String(best.template.slug ?? best.template.id ?? best.template.name ?? ""))
    ) {
      best = { template, score };
    }
  }

  if (!best || best.score < threshold) {
    return {
      matched: false,
      confidence: best?.score ?? 0,
      suggestion:
        "Try prompts mentioning a domain like: CRM (pipeline/accounts), Inventory (warehouse/stock/vendors), HR (headcount/onboarding), Analytics (KPI/cohorts), Admin (roles/audit).",
    };
  }

  // Confidence is the raw score, but we clamp into 0..100 for API stability.
  const confidence = Math.max(0, Math.min(100, best.score * 10));

  return {
    matched: true,
    confidence,
    template: best.template,
  };
}

