"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getRuntimeById, getRuntimeSchema } from "@/config/builder-schemas";
import type {
  BuilderComponentNode,
  BuilderPanelState,
  RuntimeEvent,
  RuntimeSchema,
} from "@/types";

interface BuilderState {
  schema: RuntimeSchema;
  selectedId: string;
  panels: BuilderPanelState;
  prompt: string;
  commandOpen: boolean;
  copiedPreviewId: string;
  appId: string | null;
  runtimeId: string | null;
  version: number;

  setSchemaById: (schemaId: string) => void;
  setSchemaByRuntimeId: (
    runtimeId: string
  ) => Promise<void>;

  setAppContext: (
    appId: string,
    runtimeId: string
  ) => void;

  setAppName: (
    appName: string
  ) => void;

  selectComponent: (
    id: string
  ) => void;

  togglePanel: (
    panel: keyof BuilderPanelState
  ) => void;

  setCommandOpen: (
    open: boolean
  ) => void;

  markPreviewCopied: (
    id: string
  ) => void;

  updateSelectedProp: (
    key: string,
    value: string
  ) => void;

  setPrompt: (
    prompt: string
  ) => void;

  applyInstruction: (
    instruction: string
  ) => Promise<void>;

  mockSubmitPrompt: () => void;
}

function findNode(
  nodes: BuilderComponentNode[],
  id: string
): BuilderComponentNode | undefined {
  for (const node of nodes) {
    if (node.id === id) return node;

    const child =
      node.children
        ? findNode(
            node.children,
            id
          )
        : undefined;

    if (child) return child;
  }

  return undefined;
}

function updateNode(
  nodes: BuilderComponentNode[],
  id: string,
  key: string,
  value: string
): BuilderComponentNode[] {
  return nodes.map(
    (node) => {
      if (
        node.id === id
      ) {
        return {
          ...node,
          props: {
            ...node.props,
            [key]:
              value,
          },
        };
      }

      return node.children
        ? {
            ...node,
            children:
              updateNode(
                node.children,
                id,
                key,
                value
              ),
          }
        : node;
    }
  );
}

const initialSchema =
  getRuntimeSchema();

const initialSelected =
  initialSchema
    .components[0]
    ?.children?.[0]
    ?.id ??
  initialSchema
    .components[0]
    .id;

export const useBuilderStore =
  create<BuilderState>()(
    persist(
      (
        set,
        get
      ) => ({
        schema:
          initialSchema,

        selectedId:
          initialSelected,

        panels: {
          left: true,
          right: true,
          bottom:
            true,
        },

        prompt: "",

        commandOpen:
          false,

        copiedPreviewId:
          "",

        appId:
          null,

        runtimeId:
          null,

        version:
          initialSchema.version,

        setSchemaById:
          (
            schemaId
          ) => {
            const schema =
              getRuntimeSchema(
                schemaId
              );

            set({
              schema,

              selectedId:
                schema
                  .components[0]
                  ?.children?.[0]
                  ?.id ??
                schema
                  .components[0]
                  .id,
            });
          },

        setSchemaByRuntimeId:
          async (
            runtimeId
          ) => {
            try {
              const res =
                await fetch(
                  `/api/runtime/${runtimeId}`
                );

              if (
                res.ok
              ) {
                const data =
                  await res.json();

                const schema =
                  data.schema;

                set({
                  schema,

                  runtimeId,

                  appId:
                    data.appId,

                  version:
                    data.version,

                  selectedId:
                    schema
                      .components?.[0]
                      ?.children?.[0]
                      ?.id ??
                    schema
                      .components?.[0]
                      ?.id,
                });

                return;
              }
            } catch (
              err
            ) {
              console.error(
                err
              );
            }

            // fallback

            const schema =
              getRuntimeById(
                runtimeId
              );

            set({
              schema,

              runtimeId,

              version:
                schema.version,

              selectedId:
                schema
                  .components[0]
                  ?.children?.[0]
                  ?.id ??
                schema
                  .components[0]
                  .id,
            });
          },

        setAppContext:
          (
            appId,
            runtimeId
          ) =>
            set({
              appId,
              runtimeId,
            }),

        setAppName:
          (
            appName
          ) =>
            set(
              (
                state
              ) => ({
                schema:
                  {
                    ...state.schema,

                    appName,
                  },
              })
            ),

        selectComponent:
          (
            id
          ) =>
            set({
              selectedId:
                id,
            }),

        togglePanel:
          (
            panel
          ) =>
            set(
              (
                state
              ) => ({
                panels:
                  {
                    ...state.panels,

                    [panel]:
                      !state
                        .panels[
                        panel
                      ],
                  },
              })
            ),

        setCommandOpen:
          (
            open
          ) =>
            set({
              commandOpen:
                open,
            }),

        markPreviewCopied:
          (
            id
          ) =>
            set({
              copiedPreviewId:
                id,
            }),

        updateSelectedProp:
          (
            key,
            value
          ) =>
            set(
              (
                state
              ) => ({
                schema:
                  {
                    ...state.schema,

                    version:
                      state
                        .schema
                        .version +
                      1,

                    components:
                      updateNode(
                        state
                          .schema
                          .components,

                        state.selectedId,

                        key,

                        value
                      ),
                  },
              })
            ),

        setPrompt:
          (
            prompt
          ) =>
            set({
              prompt,
            }),

        // FIXED

        applyInstruction:
          async (
            instruction
          ) => {
            console.log(
              instruction
            );
          },

        mockSubmitPrompt:
          () =>
            get().applyInstruction(
              get()
                .prompt
            ),
      }),

      {
        name:
          "oneatlas-builder-panels",

        partialize:
          (
            state
          ) => ({
            panels:
              state.panels,
          }),
      }
    )
  );

export function getSelectedComponent(
  schema: RuntimeSchema,
  selectedId: string
) {
  return findNode(
    schema.components,
    selectedId
  );
}