"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { dropdownGroups, primaryNavigation } from "@/config/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 px-4 py-3">
      <nav aria-label="Primary navigation" className="glass mx-auto flex max-w-7xl items-center justify-between rounded-lg px-3 py-2">
        <Logo />
        <div className="hidden items-center gap-1 lg:flex">
          {primaryNavigation.map((item) => (
            <Link className="rounded-md px-3 py-2 text-sm text-navy/70 transition hover:bg-white/55 hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white" href={item.href} key={item.label}>
              {item.label}
            </Link>
          ))}
          {dropdownGroups.map((group) => (
            <DropdownMenu.Root key={group.label}>
              <DropdownMenu.Trigger className="rounded-md px-3 py-2 text-sm text-navy/70 transition hover:bg-white/55 hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white">
                {group.label}
              </DropdownMenu.Trigger>
              <DropdownMenu.Content align="center" className="z-50 mt-3 grid w-[34rem] grid-cols-2 gap-2 rounded-lg border border-white/40 bg-white/82 p-3 shadow-[var(--shadow-soft)] backdrop-blur-xl dark:border-white/10 dark:bg-navy/90">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <DropdownMenu.Item asChild key={item.label}>
                      <Link className="flex gap-3 rounded-md p-3 outline-none transition hover:bg-primary/8 focus:bg-primary/8" href={item.href}>
                        {Icon ? <Icon className="mt-0.5 size-4 text-accent-cyan" /> : null}
                        <span>
                          <span className="block text-sm font-medium">{item.label}</span>
                          {item.description ? <span className="mt-1 block text-xs text-muted-foreground">{item.description}</span> : null}
                        </span>
                      </Link>
                    </DropdownMenu.Item>
                  );
                })}
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          ))}
        </div>
        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle />
          <Button asChild variant="ghost"><Link href="/docs">Login</Link></Button>
          <Button asChild><Link href="/builder">Start Building</Link></Button>
        </div>
        <Button aria-expanded={open} aria-label="Toggle menu" className="lg:hidden" onClick={() => setOpen((value) => !value)} size="icon" variant="ghost">
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </nav>
      <div className={cn("glass mx-auto mt-2 hidden max-w-7xl rounded-lg p-3 lg:hidden", open && "block")}>
        {[...primaryNavigation, ...dropdownGroups.flatMap((group) => group.items)].map((item) => (
          <Link className="block rounded-md px-3 py-2 text-sm hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" href={item.href} key={`${item.label}-${item.href}`} onClick={() => setOpen(false)}>
            {item.label}
          </Link>
        ))}
        <div className="mt-3 grid grid-cols-2 gap-2">
          <Button asChild variant="outline"><Link href="/docs">Login</Link></Button>
          <Button asChild><Link href="/builder">Start Building</Link></Button>
        </div>
      </div>
    </header>
  );
}
