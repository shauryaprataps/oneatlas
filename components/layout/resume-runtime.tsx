"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ResumeRuntimeButton() {
  const [runtimeId, setRuntimeId] = useState("");

  useEffect(() => {
    setRuntimeId(window.localStorage.getItem("oneatlas-last-runtime") ?? "");
  }, []);

  if (!runtimeId) return null;

  return (
    <Button asChild variant="ghost">
      <Link href={`/builder/${runtimeId}`}>
        <RotateCcw className="size-4" />
        Resume Runtime
      </Link>
    </Button>
  );
}
