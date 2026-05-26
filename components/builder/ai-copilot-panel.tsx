"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

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
  return Math.max(
    min,
    Math.min(
      max,
      n
    )
  );
}

export function AICopilotPanel() {

  const { schema } =
    useBuilderStore();

  const [
    collapsed,
    setCollapsed
  ] =
    useState(false);

  const [
    width,
    setWidth
  ] =
    useState(390);



  /* resize refs */

  const dragging =
    useRef(false);

  const startX =
    useRef(0);

  const startWidth =
    useRef(390);



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
        !dragging.current
      )
        return;



      const delta =
        startX.current -
        e.clientX;



      const next =
        startWidth.current +
        delta;



      setWidth(

        clamp(

          next,

          360,

          520

        )

      );

    }



    function stop() {

      dragging.current =
        false;

      document.body.style.cursor =
        "default";

      document.body.style.userSelect =
        "";

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

  }, []);





  return (

    <aside

      className="
      hidden
      xl:flex
      h-full
      flex-col
      overflow-hidden
      border-l
      border-white/10
      bg-navy/95
      text-white
      relative
      "

      style={{

        width:

          collapsed

            ? 56

            : width

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

          {

            collapsed

              ?

              <ChevronRight />

              :

              <ChevronLeft />

          }

        </Button>



        {

          !collapsed && (

            <div className="flex-1">

              <div className="flex justify-between">

                <div className="font-semibold">

                  OneAtlas Chat

                </div>



                <Badge

                  className="
                  bg-success/10
                  text-success
                  "

                >

                  ● Connected

                </Badge>

              </div>



              <div

                className="
                mt-1
                text-xs
                text-white/45
                "

              >

                v{

                  schema.version

                }

                {" · "}

                {

                  schema.metadata.environment

                }

              </div>

            </div>

          )

        }

      </div>







      {

        !collapsed && (

          <>

            {/* suggestions */}

            <div

              className="
              p-3
              flex
              flex-wrap
              gap-2
              "

            >

              {

                suggestions.map(

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

                      +

                      {s}

                    </Button>

                  )

                )

              }

            </div>







            {/* messages */}

            <div

              className="
              flex-1
              overflow-auto
              px-3
              space-y-4
              "

            >

              {

                messages.map(

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

                        <div

                          className="
                          mb-1
                          text-xs
                          text-runtime
                          "

                        >

                          You

                        </div>



                        {

                          m.title

                        }

                      </div>







                      <div

                        className="
                        max-w-[90%]
                        rounded-xl
                        bg-white/[0.03]
                        p-3
                        "

                      >

                        <div

                          className="
                          mb-1
                          text-xs
                          text-runtime
                          "

                        >

                          Assistant

                        </div>



                        <div>

                          {

                            m.detail

                          }

                        </div>



                        <div

                          className="
                          mt-2
                          text-[11px]
                          text-white/40
                          "

                        >

                          {

                            m.time

                          }

                        </div>

                      </div>

                    </div>

                  )

                )

              }

            </div>







            {/* INPUT */}

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

        )

      }









      {/* RESIZE HANDLE */}

      {

        !collapsed && (

          <div

            onPointerDown={

              e => {

                dragging.current =
                  true;

                startX.current =
                  e.clientX;

                startWidth.current =
                  width;

                document.body.style.cursor =
                  "ew-resize";

                document.body.style.userSelect =
                  "none";

              }

            }

            className="
            absolute
            left-0
            top-0
            h-full
            w-2
            cursor-ew-resize
            hover:bg-runtime/20
            transition
            "

          />

        )

      }

    </aside>

  );

}