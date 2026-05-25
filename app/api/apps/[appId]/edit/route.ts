import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseMutation, applyMutation } from "@/lib/schemaMutator";
import type { RuntimeSchema } from "@/types/builder";

interface RouteParams {
  params: Promise<{ appId: string }>;
}

export async function POST(req: Request, { params }: RouteParams) {
  const { appId } = await params;
  
  let body: { instruction?: string; runtimeId?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: true, suggestion: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const instruction = String(body.instruction ?? "").trim();
  if (!instruction) {
    return NextResponse.json(
      { error: true, suggestion: "Provide an instruction to edit the schema." },
      { status: 400 },
    );
  }

  // Parse the instruction into a deterministic mutation
  const parseResult = parseMutation(instruction);
  if (!parseResult.success || !parseResult.parsed) {
    return NextResponse.json(
      { error: true, suggestion: parseResult.error },
      { status: 400 },
    );
  }

  const parsed = parseResult.parsed;

  // Find the app
  const app = await prisma.app.findUnique({
    where: { id: appId },
    include: {
      schemas: {
        orderBy: { version: "desc" },
        take: 1,
        include: {
          versions: {
            orderBy: { version: "desc" },
            take: 1,
          },
        },
      },
    },
  });

  if (!app || app.schemas.length === 0) {
    return NextResponse.json(
      { error: true, suggestion: "App or runtime schema not found." },
      { status: 404 },
    );
  }

  const currentRuntimeSchema = app.schemas[0];
  const currentSchema = currentRuntimeSchema.schema as unknown as RuntimeSchema;

  // Apply the mutation to get the updated schema
  const updatedSchema = applyMutation(currentSchema, parsed);

  // Calculate the new version number
  const newVersion = currentRuntimeSchema.version + 1;

  // Update the RuntimeSchema with the new schema
  await prisma.runtimeSchema.update({
    where: { id: currentRuntimeSchema.id },
    data: {
      version: newVersion,
      schema: updatedSchema as unknown as object,
    },
  });

  // Create a new SchemaVersion snapshot
  await prisma.schemaVersion.create({
    data: {
      runtimeSchemaId: currentRuntimeSchema.id,
      version: newVersion,
      snapshot: updatedSchema as unknown as object,
    },
  });

  // Record the mutation
  await prisma.mutation.create({
    data: {
      appId,
      instruction,
      summary: parsed.summary,
      schemaVersion: newVersion,
    },
  });

  // Update the App name if needed (in case template name differs)
  await prisma.app.update({
    where: { id: appId },
    data: { name: updatedSchema.appName || app.name },
  });

  return NextResponse.json({
    success: true,
    appId,
    runtimeId: currentRuntimeSchema.id,
    version: newVersion,
    schema: updatedSchema,
    mutation: {
      type: parsed.type,
      summary: parsed.summary,
      instruction: parsed.instruction,
    },
  });
}

export async function GET(req: Request, { params }: RouteParams) {
  const { appId } = await params;

  const app = await prisma.app.findUnique({
    where: { id: appId },
    include: {
      mutations: {
        orderBy: { createdAt: "desc" },
        take: 20,
      },
      schemas: {
        orderBy: { version: "desc" },
        take: 1,
      },
    },
  });

  if (!app) {
    return NextResponse.json(
      { error: true, message: "App not found." },
      { status: 404 },
    );
  }

  return NextResponse.json({
    appId: app.id,
    name: app.name,
    currentVersion: app.schemas[0]?.version || 0,
    schema: app.schemas[0]?.schema || null,
    mutations: app.mutations.map((m: { id: string; instruction: string; summary: string | null; schemaVersion: number | null; createdAt: Date }) => ({
      id: m.id,
      instruction: m.instruction,
      summary: m.summary,
      schemaVersion: m.schemaVersion,
      createdAt: m.createdAt.toISOString(),
    })),
  });
}