import Link from "next/link";
import { dropdownGroups, primaryNavigation } from "@/config/navigation";
import { Logo } from "./logo";

export function Footer() {
  const resourceLinks = dropdownGroups.flatMap((group) => group.items);

  return (
    <footer className="border-t border-border px-4 py-10">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.3fr_2fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
            Runtime-generated internal apps that stay editable after generation.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          <FooterColumn title="Platform" links={primaryNavigation} />
          <FooterColumn title="Resources" links={resourceLinks.slice(0, 4)} />
          <FooterColumn title="Community" links={resourceLinks.slice(4)} />
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="text-sm font-semibold">{title}</h2>
      <div className="mt-3 grid gap-2">
        {links.map((link) => (
          <Link className="text-sm text-muted-foreground hover:text-foreground" href={link.href} key={link.label}>
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
