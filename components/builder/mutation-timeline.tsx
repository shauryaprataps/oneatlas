"use client";

import {
  useMemo,
  useState,
} from "react";

import {
  Clock3,
  GitCommit,
} from "lucide-react";

import {
  ToneBadge,
} from "@/components/ui/status-badge";

import {
  useBuilderStore,
} from "@/store/builder-store";

type FeedItem = {
  time: string;
  label: string;
  detail: string;
  tone:
    | "success"
    | "warning"
    | "runtime"
    | "advanced"
    | "live"
    | "critical";
};

function pickFeedLabel(
  rawTitle?: string
): string {

  const t =
    (rawTitle ?? "")
      .toLowerCase();

  if (
    t.includes(
      "preview"
    ) ||

    t.includes(
      "diff"
    )
  ) {

    return "Preview updated";

  }

  if (
    t.includes(
      "generated"
    )
  ) {

    return "Generated workflow";

  }

  return (
    rawTitle ??
    "Mutation"
  );

}

export function MutationTimeline() {

  const {

    history,

    diff,

  } =

    useBuilderStore(

      s =>

        s.schema

    );



  const [

    seen,

    setSeen,

  ] =

    useState(
      ""
    );



  const feed =

    useMemo<FeedItem[]>(

      () =>

        history

          .slice(

            0,

            8

          )

          .map(

            event => ({

              time:
                event.time,

              label:

                pickFeedLabel(

                  event.title ??
                  ""

                ),

              detail:
                event.detail,

              tone:
                event.tone,

            })

          ),

      [history]

    );



  const latest =

    feed[0]

      ?

      `${

      feed[0].time

      }-${

      feed[0].label

      }`

      :

      "";



  if (

    latest &&

    latest !== seen

  ) {

    setSeen(

      latest

    );

  }



  return (

    <section

      className="
      rounded-lg

      border

      border-white/10

      bg-ink/70

      p-3

      text-white
      "

    >



      {/* HEADER */}

      <div

        className="
        flex

        items-center

        justify-between
        "

      >

        <div

          className="
          flex

          items-center

          gap-2
          "

        >

          <Clock3

            className="
            size-4

            text-runtime
            "

          />



          <span

            className="
            text-xs

            uppercase

            tracking-wide

            font-semibold
            "

          >

            Mutation log

          </span>

        </div>



        <span

          className="
          text-[10px]

          text-white/40
          "

        >

          LIVE

        </span>

      </div>





      {/* FEED */}

      <div

        className="
        mt-3

        space-y-2
        "

      >

        {

          feed.length === 0

            ?

            <div

              className="
              text-xs

              text-white/45
              "

            >

              No mutations

            </div>

            :

            feed.map(

              (

                item,

                idx

              ) => (

                <div

                  key={`${

                    item.time

                  }-${

                    item.label

                  }`}

                  className={`

                  rounded-md

                  border

                  border-white/5

                  bg-white/[0.02]

                  p-2

                  transition

                  hover:bg-white/[0.05]

                  ${

                    idx === 0

                      ?

                      "animate-[fadeSlide_250ms_ease-out]"

                      :

                      ""

                  }

                  `}

                >

                  <div

                    className="
                    flex

                    items-center

                    justify-between
                    "

                  >

                    <div

                      className="
                      flex

                      items-center

                      gap-2
                      "

                    >

                      <GitCommit

                        className="
                        size-3

                        text-runtime
                        "

                      />



                      <span

                        className="
                        text-xs

                        font-medium
                        "

                      >

                        {

                          item.label

                        }

                      </span>

                    </div>



                    <ToneBadge

                      tone={

                        item.tone

                      }

                    >

                      {

                        item.tone

                      }

                    </ToneBadge>

                  </div>




                  <div

                    className="
                    mt-1

                    text-[11px]

                    text-white/50
                    "

                  >

                    {

                      item.time

                    }

                  </div>



                  <div

                    className="
                    mt-2

                    text-xs

                    text-white/65
                    "

                  >

                    {

                      item.detail

                    }

                  </div>

                </div>

              )

            )

        }

      </div>






      {/* DIFF */}

      <div

        className="
        mt-4

        rounded-lg

        border

        border-white/10

        bg-white/[0.02]

        p-3
        "

      >

        <div

          className="
          mb-2

          text-xs

          uppercase

          tracking-wide

          text-white/45
          "

        >

          Schema diff

        </div>



        <div

          className="
          space-y-1
          "

        >

          {

            diff.length === 0

              ?

              <div

                className="
                text-xs

                text-white/40
                "

              >

                No diffs

              </div>

              :

              diff.map(

                d => {

                  const prefix =

                    d.trim()

                      .charAt(

                        0

                      );



                  const body =

                    d.trim()

                      .slice(

                        1

                      );



                  const cls =

                    prefix === "+"

                      ?

                      "text-success"

                      :

                      prefix === "-"

                        ?

                        "text-warning"

                        :

                        prefix === "~"

                          ?

                          "text-runtime"

                          :

                          "text-white/50";



                  return (

                    <div

                      key={d}

                      className="
                      flex

                      items-center

                      gap-2

                      rounded-sm

                      px-1

                      py-1

                      hover:bg-white/[0.03]
                      "

                    >

                      <span

                        className={`

                        font-mono

                        text-xs

                        ${

                          cls

                        }

                        `}

                      >

                        {

                          prefix

                        }

                      </span>



                      <span

                        className={`

                        text-xs

                        ${

                          cls

                        }

                        `}

                      >

                        {

                          body

                        }

                      </span>

                    </div>

                  );

                }

              )

          }

        </div>

      </div>





      <style jsx global>{`

        @keyframes fadeSlide {

          from {

            opacity:0;

            transform:
            translateY(
              4px
            );

          }

          to {

            opacity:1;

            transform:
            translateY(
              0
            );

          }

        }



        .animate-\\[fadeSlide_250ms_ease-out\\]{

          animation:

          fadeSlide

          250ms

          ease-out;

        }

      `}</style>

    </section>

  );

}