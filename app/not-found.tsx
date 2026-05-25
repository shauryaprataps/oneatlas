import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center p-6">
      <div className="max-w-md text-center">
        <h1 className="text-3xl font-semibold">Page not found</h1>
        <p className="mt-3 text-sm text-muted-foreground">This route is not part of the current OneAtlas surface.</p>
        <Button asChild className="mt-6"><Link href="/">Return home</Link></Button>
      </div>
    </main>
  );
}
