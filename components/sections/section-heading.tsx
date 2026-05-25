import { Badge } from "@/components/ui/badge";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description: string;
}

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="max-w-3xl">
      <Badge tone="primary">{eyebrow}</Badge>
      <h2 className="mt-4 text-3xl font-semibold tracking-normal text-foreground md:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-muted-foreground">{description}</p>
    </div>
  );
}
