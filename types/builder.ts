export type BuilderComponentType =
  | "page"
  | "section"
  | "metric"
  | "table"
  | "chart"
  | "workflow"
  | "activity";

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

export interface RuntimeSchema {
  id: string;
  templateId: string;
  appName: string;
  version: number;
  lastModified: string;
  connection: "connected" | "syncing" | "offline";
  components: BuilderComponentNode[];
}

export interface BuilderPanelState {
  left: boolean;
  right: boolean;
}
