"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useBuilderStore } from "@/store/builder-store";

export function GenerateAppForm() {
  const router = useRouter();
  const { setAppContext } = useBuilderStore();

  const [prompt, setPrompt] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  async function onSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setError(null);

    const clean =
      prompt.trim();

    if (!clean) {
      setError(
        "Provide a prompt to generate an app runtime."
      );

      return;
    }

    setLoading(true);

    try {
      const res =
        await fetch(
          "/api/generate",
          {
            method:
              "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify(
                {
                  prompt:
                    clean,
                }
              ),
          }
        );

      const data =
        await res.json();

      if (
        !res.ok ||
        data?.error
      ) {
        setError(
          String(
            data?.suggestion ??
              "Failed to generate."
          )
        );

        return;
      }

      const appId =
        data?.appId;

      const runtimeId =
        data?.schema
          ?.metadata
          ?.runtimeId;

      if (
        !appId ||
        !runtimeId
      ) {
        setError(
          "Generation succeeded but identifiers were missing."
        );

        return;
      }

      setAppContext(
        appId,
        runtimeId
      );

      router.push(
        `/builder/${runtimeId}`
      );
    } catch (err) {
      setError(
        err instanceof
          Error
          ? err.message
          : "Failed to generate."
      );
    } finally {
      setLoading(
        false
      );
    }
  }

  return (
    <form
      onSubmit={
        onSubmit
      }
      className="rounded-3xl border border-border bg-muted/50 p-8 shadow-sm"
    >
      <label className="block text-xl font-semibold text-slate-900">
        App prompt
      </label>

      <textarea
        value={
          prompt
        }
        onChange={(
          e
        ) =>
          setPrompt(
            e.target
              .value
          )
        }

        placeholder="e.g. Build CRM dashboard"

        className="
        mt-4
        h-56
        w-full
        resize-none
        rounded-2xl
        border-2
        border-cyan-400
        bg-white
        p-8
        text-5xl
        text-slate-900
        placeholder:text-slate-400
        caret-[#635BFF]
        outline-none
        transition
        focus:border-[#635BFF]
        focus:ring-4
        focus:ring-[#635BFF]/20
        "
      />

      {error && (
        <p className="mt-4 text-sm text-red-500">
          {error}
        </p>
      )}

      <div className="mt-8 flex items-center gap-5">
        <Button
          type="submit"
          disabled={
            loading
          }
          className="bg-[#635BFF] px-8 py-7 text-xl text-white hover:bg-[#7A73FF]"
        >
          {loading
            ? "Generating..."
            : "Generate app"}
        </Button>

        <span className="text-lg text-slate-500">
          Deterministic
          template
          match +
          persisted
          runtime.
        </span>
      </div>
    </form>
  );
}