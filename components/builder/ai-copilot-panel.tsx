"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useBuilderStore } from "@/store/builder-store";

type ActivityItem = {
  time: string;
  title: string;
  detail: string;
  tone: string;
};

const suggestions = [
  "Add KPI",
  "Add API",
  "Create workflow",
  "Generate chart",
];

function clamp(
  n: number,
  min: number,
  max: number
) {
  return Math.max(min, Math.min(max, n));
}

export function AICopilotPanel() {
  const { schema } =
    useBuilderStore();

  const [collapsed, setCollapsed] =
    useState(false);

  const [width, setWidth] =
    useState(390);

  const [dragging, setDragging] =
    useState(false);

  const panelRef =
    useRef<HTMLElement | null>(
      null
    );

  const history =
    useBuilderStore(
      s =>
        s.schema.history
    ) as ActivityItem[];

  const messages =
    useMemo(
      () =>
        history.slice(
          0,
          5
        ),
      [history]
    );

  useEffect(() => {
    function move(
      e: PointerEvent
    ) {
      if (
        !dragging ||
        !panelRef.current
      )
        return;

      const parent =
        panelRef.current
          .parentElement;

      if (!parent)
        return;

      const rect =
        parent.getBoundingClientRect();

      const newWidth =
        rect.right -
        e.clientX;

      setWidth(
        clamp(
          newWidth,
          340,
          500
        )
      );
    }

    function stop() {
      setDragging(false);
    }

    window.addEventListener(
      "pointermove",
      move
    );

    window.addEventListener(
      "pointerup",
      stop
    );

    return () => {
      window.removeEventListener(
        "pointermove",
        move
      );

      window.removeEventListener(
        "pointerup",
        stop
      );
    };
  }, [dragging]);

  return (
    <aside
      ref={panelRef}
      className="
      hidden
      xl:flex
      flex-col
      h-full
      bg-navy/95
      text-white
      relative
      overflow-hidden
      transition-[width]
      duration-200
      border-l
      border-white/10
      "
      style={{
        width:
          collapsed
            ? "56px"
            : `${width}px`,
        minWidth:
          collapsed
            ? "56px"
            : `${width}px`,
      }}
    >

      {/* HEADER */}

      <div
        className="
        flex
        items-center
        gap-2
        border-b
        border-white/10
        px-3
        py-3
        "
      >

        <Button
          size="icon"
          variant="ghost"
          onClick={() =>
            setCollapsed(
              !collapsed
            )
          }
        >
          {collapsed ? (
            <ChevronRight />
          ) : (
            <ChevronLeft />
          )}
        </Button>

        {!collapsed && (
          <div className="flex-1">

            <div className="flex justify-between">

              <div className="font-semibold">

                OneAtlas Chat

              </div>

              <Badge className="bg-success/10 text-success">

                ● Connected

              </Badge>

            </div>

            <div className="text-xs text-white/45 mt-1">

              v{schema.version}

              {" · "}

              {schema.metadata.environment}

            </div>

          </div>
        )}

      </div>

      {!collapsed && (
        <>

          {/* Suggestions */}

          <div className="p-3 flex flex-wrap gap-2">

            {suggestions.map(
              s => (

                <Button
                  key={s}
                  size="sm"
                  variant="ghost"
                  className="
                  bg-white/[0.03]
                  hover:bg-white/[0.08]
                  text-xs
                  "
                >

                  + {s}

                </Button>

              )
            )}

          </div>


          {/* Chat */}

          <div
            className="
            flex-1
            overflow-auto
            px-3
            space-y-4
            "
          >

            {messages.map(
              m => (

                <div
                  key={
                    m.time
                  }
                >

                  <div
                    className="
                    ml-auto
                    mb-2
                    max-w-[85%]
                    rounded-xl
                    bg-runtime/10
                    p-3
                    "
                  >

                    <div className="text-xs text-runtime mb-1">

                      You

                    </div>

                    {m.title}

                  </div>


                  <div
                    className="
                    max-w-[90%]
                    rounded-xl
                    bg-white/[0.03]
                    p-3
                    "
                  >

                    <div className="text-xs text-runtime mb-1">

                      Assistant

                    </div>

                    <div>

                      {m.detail}

                    </div>

                    <div className="mt-2 text-[11px] text-white/40">

                      {m.time}

                    </div>

                  </div>

                </div>

              )
            )}

          </div>


          {/* Input */}

          <div
            className="
            border-t
            border-white/10
            p-3
            "
          >

            <input
              readOnly
              placeholder="Ask OneAtlas Chat..."
              className="
              w-full
              rounded-xl
              border
              border-white/10
              bg-white/[0.03]
              px-4
              py-3
              outline-none
              "
            />

          </div>

        </>
      )}


      {/* RESIZER */}

      {!collapsed && (

        <div

          onPointerDown={() =>
            setDragging(
              true
            )
          }

          className="
          absolute
          left-0
          top-0
          h-full
          w-2
          cursor-ew-resize
          "

        />

      )}

    </aside>
  );
}