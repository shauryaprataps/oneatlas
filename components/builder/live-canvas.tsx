"use client";

import {
  Activity,
  BarChart3,
  Clock3,
  Route,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { ToneBadge } from "@/components/ui/status-badge";
import { useBuilderStore } from "@/store/builder-store";

const identity = {
  pipeline: {
    terms: ["Revenue", "Accounts", "Pipeline"],
    tone: "success" as const,
    bars: [42, 72, 61, 84, 76, 92],
  },

  people: {
    terms: ["Hiring", "Onboarding", "Headcount"],
    tone: "warning" as const,
    bars: [34, 58, 77, 66, 82, 70],
  },

  executive: {
    terms: ["Charts", "KPIs", "Segments"],
    tone: "live" as const,
    bars: [38, 64, 51, 78, 69, 88],
  },

  queue: {
    terms: ["Tickets", "Escalations", "SLA"],
    tone: "runtime" as const,
    bars: [70, 48, 62, 90, 57, 73],
  },
};

export function LiveCanvas() {
  const schema =
    useBuilderStore(
      (s) => s.schema
    );

  const page =
    schema.components[0];

  const layout =
    String(
      page.props.layout
    ) as keyof typeof identity;

  const visual =
    identity[layout] ??
    identity.pipeline;

  const children =
    page.children ??
    [];

  return (
    <section className="flex-1 overflow-auto bg-background p-2">

      <div className="mx-auto max-w-7xl space-y-3">

        {/* HERO */}

        <div className="rounded-xl border border-white/10 bg-navy/90 p-4 text-white shadow-[var(--shadow-glass)]">

          <div className="flex items-center justify-between">

            <div>

              <div className="text-xs uppercase tracking-wide text-white/45">

                {page.props.owner} · {layout}

              </div>

              <h1 className="mt-1 text-xl font-semibold">

                {page.name}

              </h1>

            </div>

            <ToneBadge tone={visual.tone}>

              {schema.metadata.environment}

            </ToneBadge>

          </div>

          <div className="mt-3 flex flex-wrap gap-2">

            {visual.terms.map(

              term => (

                <span
                  key={term}
                  className="rounded-md bg-white/5 px-2 py-1 text-xs"
                >

                  {term}

                </span>

              )

            )}

          </div>

        </div>





        {/* METRICS */}

        <div className="grid gap-3 md:grid-cols-3">

          {

            children

              .filter(

                n =>

                  n.type ===
                  "metric"

              )

              .map(

                (

                  node,

                  idx

                ) => (

                  <Card

                    key={
                      node.id
                    }

                    className="
                    min-h-[150px]

                    border

                    border-white/10

                    bg-card

                    p-4

                    transition-all

                    hover:-translate-y-1

                    hover:shadow-lg

                    hover:shadow-runtime/10
                    "

                  >

                    <div className="flex justify-between">

                      <div>

                        <div className="text-[10px] uppercase tracking-wide text-white/45">

                          {

                            node.name

                          }

                        </div>



                        <div className="mt-2 text-4xl font-semibold">

                          {

                            String(

                              node.props.value

                            )

                          }

                        </div>

                      </div>



                      <div className="h-fit rounded-md bg-success/10 px-2 py-1 text-xs text-success">

                        ↑

                        {

                          idx % 2 === 0

                            ?

                            "12%"

                            :

                            "4%"

                        }

                      </div>

                    </div>





                    {/* sparkline */}

                    <div className="mt-4 flex h-10 items-end gap-1">

                      {

                        visual.bars.map(

                          (

                            n,

                            i

                          ) => (

                            <div

                              key={i}

                              className="flex-1 rounded-sm bg-runtime/80"

                              style={{

                                height:

                                  `${

                                  n / 2

                                  }px`

                              }}

                            />

                          )

                        )

                      }

                    </div>



                    <div className="mt-4 flex justify-between text-[10px] uppercase text-white/45">

                      <span>

                        Updated 2m

                      </span>



                      <span>

                        v{

                          schema.version

                        }

                      </span>

                    </div>

                  </Card>

                )

              )

          }

        </div>






        <div className="grid gap-3 lg:grid-cols-[2fr_1fr]">

          {/* CHART */}

          <Card className="p-4">

            <div className="flex justify-between">

              <div>

                <BarChart3 className="size-5 text-runtime" />



                <h2 className="mt-2 font-semibold">

                  Runtime analytics

                </h2>

              </div>



              <div className="text-xs text-white/45">

                LIVE

              </div>

            </div>



            <div className="mt-4 flex h-40 items-end gap-2">

              {

                visual.bars.map(

                  (

                    h,

                    i

                  ) => (

                    <div

                      key={i}

                      className="
                      flex-1

                      rounded-t-md

                      bg-runtime/80

                      transition

                      hover:scale-y-105

                      hover:bg-runtime
                      "

                      style={{

                        height:

                          `${h}%`

                      }}

                    />

                  )

                )

              }

            </div>

          </Card>





          {/* FEED */}

          <Card className="p-4">

            <div className="flex items-center gap-2">

              <Activity className="size-4 text-runtime" />



              <h2 className="font-semibold">

                Runtime feed

              </h2>

            </div>



            <RuntimeFeed />

          </Card>

        </div>






        <div className="grid gap-3 lg:grid-cols-2">

          <Card className="p-4">

            <Route className="size-5 text-runtime" />



            <h2 className="mt-2 font-semibold">

              Workflow queue

            </h2>



            <WorkflowRows />

          </Card>



          <Card className="p-4">

            <Clock3 className="size-5 text-runtime" />



            <h2 className="mt-2 font-semibold">

              Recent operations

            </h2>



            <RuntimeFeed />

          </Card>

        </div>

      </div>

    </section>

  );

}





function RuntimeFeed() {

  return (

    <div className="mt-3 space-y-2">

      {

        [

          "Runtime synced",

          "Preview deployed",

          "Mutation applied",

          "Workflow generated",

        ]

          .map(

            (

              item,

              i

            ) => (

              <div

                key={item}

                className="
                flex

                justify-between

                rounded-md

                bg-white/[0.03]

                px-3

                py-2

                text-xs

                hover:bg-white/[0.06]
                "

              >

                <span>

                  ● {item}

                </span>



                <span className="text-white/45">

                  {

                    i + 1

                  }m

                </span>

              </div>

            )

          )

      }

    </div>

  );

}



function WorkflowRows() {

  return (

    <div className="mt-3 space-y-2">

      {

        Array.from({

          length: 4

        })

          .map(

            (

              _,

              i

            ) => (

              <div

                key={i}

                className="
                rounded-md

                bg-white/[0.03]

                px-3

                py-2

                text-xs
                "

              >

                #

                {

                  i + 1

                }

                · ready for mutation

              </div>

            )

          )

      }

    </div>

  );

}