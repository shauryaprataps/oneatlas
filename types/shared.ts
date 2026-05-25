import type { RuntimeSchema } from "./builder";

/**
 * Phase 1: DTOs only (no business logic).
 * These contracts become the source of truth for API <-> DB payloads.
 */

export type GenerateRequest = {
  /** User prompt from builder */
  prompt: string;

  /** Optional: if UI pins a template */
  templateId?: string;

  /** Optional: if generating into an existing app runtime */
  runtimeId?: string;
};

export type AppVersion = {
  /** App runtime identifier */
  runtimeId: string;

  /** Monotonic version number */
  version: number;
};

export type GenerateResponse = {
  app: {
    id: string;
    name: string;
    templateId: string;
    organizationId: string | null;
    createdAt: string;
  };
  /** Newly generated runtime schema version */
  runtime: AppVersion;
  schema: RuntimeSchema;
};

// Mutation (edit) DTOs
export type MutationRequest = {
  /** Runtime to mutate */
  runtimeId: string;

  /** Edit instruction from builder */
  instruction: string;
};

export type MutationResponse = {
  runtime: AppVersion;
  /** resulting schema snapshot */
  schema: RuntimeSchema;
};

// Preview snapshots DTOs
export type PreviewSnapshot = {
  id: string;
  runtimeId: string;
  /** frozen schema version */
  version: number;
  /** materialized frozen snapshot */
  schema: RuntimeSchema;
  url: string;
  createdAt: string;
  expiresAt: string | null;
};

export type PreviewResponse = {
  previews: PreviewSnapshot[];
};

