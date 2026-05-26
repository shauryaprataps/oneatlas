"use client";

import { useSearchParams } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
} from "react";

import { templates } from "@/config/templates";
import { useBuilderStore } from "@/store/builder-store";

import { BuilderTopbar } from "./builder-topbar";
import { CommandPalette } from "./command-palette";
import { ComponentTree } from "./component-tree";
import { LiveCanvas } from "./live-canvas";
import { RuntimeMetadataPanel } from "./runtime-metadata-panel";
import { AICopilotPanel } from "./ai-copilot-panel";

interface BuilderShellProps {
  runtimeId?: string;
}

function clamp(
  n: number,
  min: number,
  max: number
) {
  return Math.max(
    min,
    Math.min(max, n)
  );
}

export function BuilderShell({
  runtimeId,
}: BuilderShellProps) {

  const params =
    useSearchParams();

  const {
    panels,
    setSchemaById,
    setSchemaByRuntimeId,
  } =
    useBuilderStore();

  const [
    leftWidth,
    setLeftWidth,
  ] =
    useState(260);

  const [
    resizingLeft,
    setResizingLeft,
  ] =
    useState(false);

  const shellRef =
    useRef<HTMLDivElement | null>(
      null
    );



  useEffect(() => {

    if (runtimeId) {

      setSchemaByRuntimeId(
        runtimeId
      );

      return;
    }

    const slug =
      params.get(
        "template"
      );

    const template =
      templates.find(
        item =>
          item.slug === slug
      );

    if (template) {

      setSchemaById(
        template.schemaId
      );

    }

  }, [

    params,
    runtimeId,
    setSchemaById,
    setSchemaByRuntimeId,

  ]);



  useEffect(() => {

    function move(
      e: PointerEvent
    ) {

      if (
        !resizingLeft ||
        !shellRef.current
      )
        return;

      const rect =
        shellRef.current.getBoundingClientRect();

      setLeftWidth(

        clamp(

          e.clientX -
          rect.left,

          180,

          360

        )

      );

    }



    function stop() {

      setResizingLeft(
        false
      );

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

  }, [

    resizingLeft

  ]);



  return (

    <div

      className="
      flex
      h-screen
      flex-col
      overflow-hidden
      bg-background
      text-foreground
      "

    >

      <BuilderTopbar />

      <CommandPalette />



      <div

        ref={shellRef}

        className="
        grid
        flex-1
        min-h-0
        grid-cols-1
        xl:grid-cols-[auto_minmax(0,1fr)_auto]
        "

      >



        {/* LEFT */}

        {

          panels.left && (

            <aside

              style={{

                width:
                  `${leftWidth}px`,

                minWidth:
                  `${leftWidth}px`

              }}

              className="
              relative
              hidden
              xl:flex
              flex-col
              overflow-hidden
              border-r
              border-white/10
              bg-navy/85
              text-white
              backdrop-blur-xl
              flex-shrink-0
              "

            >

              <div
                className="
                flex-1
                overflow-auto
                p-2
                "
              >

                <RuntimeMetadataPanel />

                <div
                  className="
                  mt-3
                  border-t
                  border-white/10
                  pt-3
                  "
                >

                  <div
                    className="
                    mb-2
                    text-xs
                    uppercase
                    tracking-wide
                    text-white/40
                    "
                  >

                    Runtime tree

                  </div>

                  <ComponentTree />

                </div>

              </div>



              {/* RESIZER */}

              <div

                onPointerDown={() =>

                  setResizingLeft(
                    true
                  )

                }

                className="
                absolute
                right-0
                top-0
                h-full
                w-2
                cursor-ew-resize
                "

              />

            </aside>

          )

        }



        {/* CENTER */}

        <div

          className="
          min-w-0
          overflow-hidden
          "

        >

          <LiveCanvas />

        </div>



        {/* RIGHT */}

        <div

          className="
          hidden
          xl:flex
          overflow-hidden
          flex-shrink-0
          "

        >

          <AICopilotPanel />

        </div>

      </div>

    </div>

  );

}