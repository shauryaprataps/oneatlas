import { Suspense } from "react";
import { BuilderShell } from "@/components/builder/builder-shell";
import { Skeleton } from "@/components/ui/skeleton";

export default function BuilderPage() {
  return (
    <Suspense fallback={<Skeleton className="h-screen w-screen" />}>
      <BuilderShell />
    </Suspense>
  );
}
