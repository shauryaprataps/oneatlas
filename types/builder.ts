export type BuilderComponentType =
  | "page"
  | "section"
  | "metric"
  | "table"
  | "chart"
  | "workflow"
  | "activity";

export type RuntimeStatus =
  | "connected"
  | "syncing"
  | "mutation_running"
  | "rollback_active"
  | "preview_frozen"
  | "offline";

export type SemanticTone = "success" | "warning" | "runtime" | "advanced" | "live" | "critical";

export interface BuilderField {
  id: string;
  label: string;
  type: "text" | "number" | "select" | "date" | "status";
}

export interface BuilderComponentNode {
  id: string;
  name: string;
  type: BuilderComponentType;
  props: Record<string, string | number | boolean>;
  fields?: BuilderField[];
  children?: BuilderComponentNode[];
}

export interface RuntimeEvent {
  time: string;
  title: string;
  detail: string;
  tone: SemanticTone;
}

export interface RuntimePreview {
  id: string;
  url: string;
  created: string;
  expires: string;
  frozen: boolean;
}

export interface RuntimeMetadata {
  runtimeId: string;
  templateName: string;
  complexity: string;
  lastMutation: string;
  created: string;
  lastEdited: string;
  environment: string;
  mutationCount: number;
  previewCount: number;
  status: RuntimeStatus;
}

export interface RuntimeSchema {
  id: string;
  templateId: string;
  appName: string;
  version: number;
  lastModified: string;
  connection: RuntimeStatus;
  metadata: RuntimeMetadata;
  history: RuntimeEvent[];
  recentInstructions: RuntimeEvent[];
  previews: RuntimePreview[];
  diff: string[];
  components: BuilderComponentNode[];
}

export interface BuilderPanelState {
  left: boolean;
  right: boolean;
  bottom: boolean;
}
