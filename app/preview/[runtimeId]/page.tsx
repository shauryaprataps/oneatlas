import Link from "next/link";
import { getRuntimeById } from "@/config/builder-schemas";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";

export default async function PreviewPage({ params }: { params: Promise<{ runtimeId: string }> }) {
  const { runtimeId } = await params;
  const schema = getRuntimeById(runtimeId);
  const page = schema.components[0];
  const children = page.children ?? [];

  return (
    <main className="min-h-screen bg-background p-4">
      <div className="mx-auto grid max-w-6xl gap-4">
        <div className="rounded-lg border border-white/10 bg-[#0A2540]/88 p-5 text-white shadow-[var(--shadow-soft)]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm text-white/65">This is a preview · frozen snapshot</p>
              <h1 className="text-3xl font-semibold">{schema.appName}</h1>
              <p className="mt-1 text-sm text-white/65">{schema.metadata.runtimeId} · v{schema.version}</p>
            </div>
            <div className="flex gap-2">
              <StatusBadge status="preview_frozen" />
              <Button asChild><Link href={`/builder/${schema.metadata.runtimeId}`}>Open Builder</Link></Button>
            </div>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {children.filter((node) => node.type === "metric").map((node) => <Card key={node.id}><p className="text-sm text-muted-foreground">{node.name}</p><p className="mt-3 text-3xl font-semibold">{String(node.props.value)}</p></Card>)}
        </div>
        <Card>
          <h2 className="font-semibold">{page.name}</h2>
          <div className="mt-4 grid gap-2">
            {children.map((node) => <p className="rounded-md bg-muted px-3 py-2 text-sm text-muted-foreground" key={node.id}>{node.name} · {node.type}</p>)}
          </div>
        </Card>
      </div>
    </main>
  );
}
