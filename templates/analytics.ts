import type { RuntimeSchema } from "@/types";
import type { TemplateDefinition } from "@/types";
import { getRuntimeSchema } from "@/config/builder-schemas";
import { templates as allTemplates } from "@/config/templates";

const def = allTemplates.find((t) => t.id === "tpl_analytics") as TemplateDefinition;

export const analyticsTemplate = {
  name: def.name,
  version: def.runtime.schemaVersion,
  tags: def.tags,
  description: def.description,
  baseSchema: getRuntimeSchema(def.schemaId) as RuntimeSchema,
};

