"use client";

import { create } from "zustand";
import { getRuntimeSchema } from "@/config/builder-schemas";
import type { BuilderComponentNode, BuilderPanelState, RuntimeSchema } from "@/types";

interface BuilderState {
  schema: RuntimeSchema;
  selectedId: string;
  panels: BuilderPanelState;
  prompt: string;
  setSchemaById: (schemaId: string) => void;
  setAppName: (appName: string) => void;
  selectComponent: (id: string) => void;
  togglePanel: (panel: keyof BuilderPanelState) => void;
  updateSelectedProp: (key: string, value: string) => void;
  setPrompt: (prompt: string) => void;
  mockSubmitPrompt: () => void;
}

function findNode(nodes: BuilderComponentNode[], id: string): BuilderComponentNode | undefined {
  for (const node of nodes) {
    if (node.id === id) return node;
    const child = node.children ? findNode(node.children, id) : undefined;
    if (child) return child;
  }
  return undefined;
}

function updateNode(nodes: BuilderComponentNode[], id: string, key: string, value: string): BuilderComponentNode[] {
  return nodes.map((node) => {
    if (node.id === id) return { ...node, props: { ...node.props, [key]: value } };
    return node.children ? { ...node, children: updateNode(node.children, id, key, value) } : node;
  });
}

const initialSchema = getRuntimeSchema();
const initialSelected = initialSchema.components[0]?.children?.[0]?.id ?? initialSchema.components[0].id;

export const useBuilderStore = create<BuilderState>((set, get) => ({
  schema: initialSchema,
  selectedId: initialSelected,
  panels: { left: true, right: true },
  prompt: "",
  setSchemaById: (schemaId) => {
    const schema = getRuntimeSchema(schemaId);
    set({ schema, selectedId: schema.components[0]?.children?.[0]?.id ?? schema.components[0].id });
  },
  setAppName: (appName) => set((state) => ({ schema: { ...state.schema, appName, lastModified: "just now" } })),
  selectComponent: (id) => set({ selectedId: id }),
  togglePanel: (panel) => set((state) => ({ panels: { ...state.panels, [panel]: !state.panels[panel] } })),
  updateSelectedProp: (key, value) => set((state) => ({
    schema: {
      ...state.schema,
      version: state.schema.version + 1,
      lastModified: "just now",
      components: updateNode(state.schema.components, state.selectedId, key, value),
    },
  })),
  setPrompt: (prompt) => set({ prompt }),
  mockSubmitPrompt: () => {
    const prompt = get().prompt.trim();
    if (!prompt) return;
    set((state) => ({
      prompt: "",
      schema: { ...state.schema, version: state.schema.version + 1, lastModified: "just now" },
    }));
  },
}));

export function getSelectedComponent(schema: RuntimeSchema, selectedId: string) {
  return findNode(schema.components, selectedId);
}
