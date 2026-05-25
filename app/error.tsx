"use client";

import { Button } from "@/components/ui/button";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="grid min-h-screen place-items-center p-6">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-semibold">Something drifted out of sync.</h1>
        <p className="mt-3 text-sm text-muted-foreground">Reset the runtime surface and try again.</p>
        <Button className="mt-6" onClick={reset}>Reset</Button>
      </div>
    </main>
  );
}
