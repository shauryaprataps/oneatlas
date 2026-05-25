export type Complexity = "Simple" | "Moderate" | "Advanced";

export interface TemplateMetric {
  label: string;
  value: string;
}

export interface TemplateRuntimeMeta {
  runtimeId: string;
  status: "Ready" | "Versioned" | "Governed";
  schemaVersion: number;
  components: number;
  fields: number;
  mutationSafe: boolean;
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
  runtime: TemplateRuntimeMeta;
  schemaId: string;
}

export interface TemplateFilters {
  category: string;
  complexity: string;
  collection: string;
}
