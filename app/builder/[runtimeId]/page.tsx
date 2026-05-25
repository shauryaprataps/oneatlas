import { Suspense } from "react";
import { BuilderShell } from "@/components/builder/builder-shell";
import { Skeleton } from "@/components/ui/skeleton";

export default async function RuntimeBuilderPage({
  params,
}: {
  params: Promise<{ runtimeId: string }>;
}) {
  const { runtimeId } = await params;
  return (
    <Suspense fallback={<Skeleton className="h-screen w-screen" />}>
      <BuilderShell runtimeId={runtimeId} />
    </Suspense>
  );
}
