export type Complexity = "Simple" | "Moderate" | "Advanced";

export interface TemplateMetric {
  label: string;
  value: string;
}

export interface TemplateDefinition {
  id: string;
  slug: string;
  name: string;
  category: string;
  collection: string;
  complexity: Complexity;
  description: string;
  preview: string;
  tags: string[];
  metrics: TemplateMetric[];
  schemaId: string;
}

export interface TemplateFilters {
  category: string;
  complexity: string;
  collection: string;
}
