"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("oneatlas-theme");
    const nextDark = stored === "dark";
    document.documentElement.classList.toggle("dark", nextDark);
    setDark(nextDark);
  }, []);

  function toggleTheme() {
    const nextDark = !dark;
    document.documentElement.classList.toggle("dark", nextDark);
    localStorage.setItem("oneatlas-theme", nextDark ? "dark" : "light");
    setDark(nextDark);
  }

  return (
    <Button aria-label="Toggle dark mode" onClick={toggleTheme} size="icon" type="button" variant="ghost">
      {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </Button>
  );
}
