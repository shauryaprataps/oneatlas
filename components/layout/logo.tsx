import Link from "next/link";

export function Logo() {
  return (
    <Link aria-label="OneAtlas home" className="flex items-center gap-2 font-semibold tracking-normal" href="/">
      <span className="grid size-8 place-items-center rounded-md bg-ink text-white dark:bg-white dark:text-ink">
        OA
      </span>
      <span className="text-base text-foreground">OneAtlas</span>
    </Link>
  );
}
