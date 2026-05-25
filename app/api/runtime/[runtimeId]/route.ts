import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ runtimeId: string }> }
) {
  const { runtimeId } = await params;

  const runtime = await prisma.runtimeSchema.findUnique({
    where: {
      id: runtimeId,
    },
  });

  if (!runtime) {
    return NextResponse.json(
      { error: "Runtime not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    appId: runtime.appId,
    version: runtime.version,
    schema: runtime.schema,
  });
}