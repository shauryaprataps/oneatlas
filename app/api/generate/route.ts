import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { matchTemplate } from "@/lib/templateMatcher";
import { runtimeTemplates } from "@/templates";
import type { GenerateRequest } from "@/types/shared";

function deepClone<T>(val: T): T {
  return JSON.parse(JSON.stringify(val)) as T;
}

export async function POST(req: Request) {
  const body = (await req.json()) as Partial<GenerateRequest>;
  const prompt = String(body.prompt ?? "").trim();

  if (!prompt) {
    return NextResponse.json(
      { error: true, suggestion: "Provide a prompt to generate a runtime app." },
      { status: 400 },
    );
  }

  const match = matchTemplate({ prompt, templates: runtimeTemplates, threshold: 2 });
  if (!match.matched) {
    return NextResponse.json(
      { error: true, suggestion: match.suggestion },
      { status: 400 },
    );
  }

  const tpl = match.template;
  const base = deepClone(tpl.baseSchema) as any;

  // Create runtime schema instance
  const runtimeSchema = {
    ...base,
    id: base.id, // keep base shape id; runtime schema persistence owns row identity
    appName: tpl.name,
    templateId: base.templateId ?? undefined,
    version: 1,
    metadata: {
      ...base.metadata,
      runtimeId: base.metadata?.runtimeId ?? undefined,
      templateName: tpl.name,
      environment: base.metadata?.environment ?? "Production Preview",
      lastMutation: `Generated from prompt: ${prompt}`,
      lastEdited: "just now",
      mutationCount: 0,
      previewCount: 0,
      status: "connected",
    },
  };

  // Persist App + RuntimeSchema + SchemaVersion(version=1)
  const createdApp = await prisma.app.create({
    data: {
      name: `${tpl.name}`,
      organizationId: null as any,
      templateId: String((tpl.baseSchema as any)?.templateId ?? ""),
    },
  });

  // Persist runtime schema
  const createdRuntimeSchema = await prisma.runtimeSchema.create({
    data: {
      appId: createdApp.id,
      version: 1,
      schema: runtimeSchema,
    },
  });

  // Fix: Update runtimeId to use the actual persisted RuntimeSchema.id
  // Previously this used the template's static runtimeId which caused the builder
  // to open the template runtime instead of the generated persisted runtime
  runtimeSchema.metadata.runtimeId = createdRuntimeSchema.id;

  // Update the persisted schema with the correct runtimeId
  await prisma.runtimeSchema.update({
    where: { id: createdRuntimeSchema.id },
    data: { schema: runtimeSchema },
  });

  await prisma.schemaVersion.create({
    data: {
      runtimeSchemaId: createdRuntimeSchema.id,
      version: 1,
      snapshot: runtimeSchema,
    },
  });

  return NextResponse.json({
  runtimeId:
    createdRuntimeSchema.id,

  appId:
    createdApp.id,

  generatedName:
    createdApp.name,

  schema:
    runtimeSchema,

  version:
    1,
});
}

