import Link from "next/link";

export function Logo() {
  return (
    <Link aria-label="OneAtlas home" className="flex items-center gap-2 font-semibold tracking-normal" href="/">
      <span className="grid size-8 place-items-center rounded-md bg-navy text-white ring-1 ring-white/15 dark:bg-white dark:text-ink">
        OA
      </span>
      <span className="text-base text-navy dark:text-white">OneAtlas</span>
    </Link>
  );
}
