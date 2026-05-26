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

const identity={

 pipeline:{
  terms:[
   "Revenue",
   "Accounts",
   "Pipeline"
  ],

  tone:"success" as const,

  bars:[
   42,
   72,
   61,
   84,
   76,
   92
  ]
 },

 people:{
  terms:[
   "Hiring",
   "Onboarding",
   "Headcount"
  ],

  tone:"warning" as const,

  bars:[
   34,
   58,
   77,
   66,
   82,
   70
  ]
 },

 executive:{
  terms:[
   "Charts",
   "KPIs",
   "Segments"
  ],

  tone:"live" as const,

  bars:[
   38,
   64,
   51,
   78,
   69,
   88
  ]
 },

 queue:{
  terms:[
   "Tickets",
   "Escalations",
   "SLA"
  ],

  tone:"runtime" as const,

  bars:[
   70,
   48,
   62,
   90,
   57,
   73
  ]
 }

};



export function LiveCanvas(){

 const schema=

 useBuilderStore(
 s=>s.schema
 );

 const page=
 schema.components[0];

 const layout=

 String(

 page.props.layout

 ) as keyof typeof identity;

 const visual=

 identity[layout]

 ??

 identity.pipeline;


 const children=

 page.children

 ??

 [];


 return(

 <section className="
 bg-background
 p-4
 ">

 <div className="
 mx-auto
 max-w-7xl
 space-y-4
 ">


 {/* HERO */}

 <div className="
 rounded-xl

 border

 border-border

 bg-white

 p-5

 shadow-sm
 ">

 <div className="
 flex

 items-center

 justify-between
 ">

 <div>

 <div className="
 text-xs

 uppercase

 tracking-wide

 text-muted-foreground
 ">

 {

 page.props.owner

 }

 ·

 {

 layout

 }

 </div>


 <h1 className="
 mt-2

 text-2xl

 font-semibold

 text-foreground
 ">

 {

 page.name

 }

 </h1>

 </div>



 <ToneBadge
 tone={visual.tone}
 >

 {

 schema.metadata.environment

 }

 </ToneBadge>

 </div>




 <div className="
 mt-4

 flex

 flex-wrap

 gap-2
 ">

 {

 visual.terms.map(

 term=>(

 <span

 key={term}

 className="
 rounded-md

 bg-runtime/5

 px-3

 py-1

 text-xs

 text-runtime
 "

 >

 {term}

 </span>

 )

 )

 }

 </div>

 </div>







 {/* METRICS */}

 <div className="
 grid

 gap-4

 md:grid-cols-3
 ">

 {

 children

 .filter(

 n=>

 n.type===

 "metric"

 )

 .map(

 (

 node,

 idx

 )=>(

 <Card

 key={
 node.id
 }

 className="
 border-border

 hover:shadow-runtime/10

 transition
 "

 >

 <div className="
 flex

 justify-between
 ">

 <div>

 <div className="
 text-[11px]

 uppercase

 text-muted-foreground
 ">

 {

 node.name

 }

 </div>



 <div className="
 mt-2

 text-4xl

 font-semibold
 ">

 {

 String(
 node.props.value
 )

 }

 </div>

 </div>



 <div className="
 rounded-md

 bg-success/10

 px-2

 py-1

 text-xs

 text-success
 ">

 ↑

 {

 idx%2===0

 ?

 "12%"

 :

 "4%"

 }

 </div>

 </div>




 <div className="
 mt-5

 flex

 h-10

 items-end

 gap-1
 ">

 {

 visual.bars.map(

 (

 n,

 i

 )=>(

 <div

 key={i}

 className="
 flex-1

 rounded-sm

 bg-runtime
 "

 style={{

 height:

 `${n/2}px`

 }}

 />

 )

 )

 }

 </div>




 <div className="
 mt-4

 flex

 justify-between

 text-xs

 text-muted-foreground
 ">

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









 <div className="
 grid

 gap-4

 lg:grid-cols-[2fr_1fr]
 ">


 <Card>

 <div className="
 flex

 justify-between
 ">

 <div>

 <BarChart3

 className="
 size-5

 text-runtime
 "

 />


 <h2 className="
 mt-2

 font-semibold
 ">

 Runtime analytics

 </h2>

 </div>



 <div className="
 text-xs

 text-muted-foreground
 ">

 LIVE

 </div>

 </div>



 <div className="
 mt-5

 flex

 h-44

 items-end

 gap-2
 ">

 {

 visual.bars.map(

 (

 h,

 i

 )=>(

 <div

 key={i}

 className="
 flex-1

 rounded-t-md

 bg-runtime

 hover:opacity-80
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






 <Card>

 <div className="
 flex

 items-center

 gap-2
 ">

 <Activity

 className="
 size-4

 text-runtime
 "

 />

 <h2>

 Runtime feed

 </h2>

 </div>

 <RuntimeFeed/>

 </Card>

 </div>









 <div className="
 grid

 gap-4

 lg:grid-cols-2
 ">

 <Card>

 <Route
 className="
 size-5

 text-runtime
 "
 />

 <h2 className="
 mt-2

 font-semibold
 ">

 Workflow queue

 </h2>

 <WorkflowRows/>

 </Card>




 <Card>

 <Clock3
 className="
 size-5

 text-runtime
 "
 />

 <h2 className="
 mt-2

 font-semibold
 ">

 Recent operations

 </h2>

 <RuntimeFeed/>

 </Card>

 </div>

 </div>

 </section>

 );

}






function RuntimeFeed(){

 return(

 <div className="
 mt-4

 space-y-2
 ">

 {

 [

 "Runtime synced",

 "Preview deployed",

 "Mutation applied",

 "Workflow generated"

 ]

 .map(

 (

 item,

 i

 )=>(

 <div

 key={item}

 className="
 flex

 justify-between

 rounded-md

 bg-muted

 px-3

 py-2

 text-sm

 hover:bg-runtime/5
 "

 >

 <span>

 ● {item}

 </span>

 <span className="
 text-muted-foreground
 ">

 {

 i+1

 }m

 </span>

 </div>

 )

 )

 }

 </div>

 );

}





function WorkflowRows(){

 return(

 <div className="
 mt-4

 space-y-2
 ">

 {

 Array.from({

 length:4

 })

 .map(

 (

 _,

 i

 )=>(

 <div

 key={i}

 className="
 rounded-md

 bg-muted

 px-3

 py-2

 text-sm
 "

 >

 #

 {

 i+1

 }

 · ready for mutation

 </div>

 )

 )

 }

 </div>

 );

}