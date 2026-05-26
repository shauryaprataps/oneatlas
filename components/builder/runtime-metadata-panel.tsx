"use client";

import { useState } from "react";

import {
 ChevronDown,
 Database,
 GitBranch,
 Layers3,
 Activity,
} from "lucide-react";

import {
 StatusBadge,
} from "@/components/ui/status-badge";

import {
 useBuilderStore,
} from "@/store/builder-store";

export function RuntimeMetadataPanel(){

 const schema=
 useBuilderStore(
 state=>
 state.schema
 );

 const[
 open,
 setOpen
 ]=
 useState(true);

 const meta=
 schema.metadata;


 const items=[

 ["Template",meta.templateName],

 ["Runtime",meta.runtimeId],

 ["Version",`v${schema.version}`],

 ["Complexity",meta.complexity],

 ["Mutations",String(
 meta.mutationCount
 )],

 ["Previews",String(
 meta.previewCount
 )],

 ["Environment",meta.environment],

 ["Edited",meta.lastEdited],

 ];


 return(

 <section

 className="
 rounded-xl
 border
 border-border
 bg-white
 p-4
 shadow-sm
 "

 >



 {/* HEADER */}

 <button

 onClick={()=>

 setOpen(
 !open
 )

 }

 className="
 flex
 w-full
 items-center
 justify-between
 "

 >

 <div className="
 flex
 items-center
 gap-2
 ">

 <Database

 className="
 size-4
 text-runtime
 "

 />


 <span className="
 text-xs
 font-semibold
 uppercase
 tracking-wide
 text-foreground
 ">

 Runtime diagnostics

 </span>

 </div>



 <div className="
 flex
 items-center
 gap-2
 ">

 <StatusBadge

 status={
 schema.connection
 }

 />

 <ChevronDown

 className={`

 size-4

 text-muted-foreground

 transition

 ${

 open

 ?

 ""

 :

 "-rotate-90"

 }

 `}

 />

 </div>

 </button>






 <div

 className={`

 overflow-hidden

 transition-all

 duration-200

 ${

 open

 ?

 "max-h-[1000px] mt-4"

 :

 "max-h-0"

 }

 `}

 >



 {/* HEALTH */}

 <div className="
 mb-4

 rounded-lg

 border

 border-runtime/10

 bg-runtime/5

 p-3
 ">


 <div className="
 flex
 justify-between
 items-center
 ">


 <div className="
 flex
 items-center
 gap-2
 ">

 <Activity

 className="
 size-4
 text-success
 "

 />


 <span className="
 text-xs
 font-medium
 ">

 Runtime health

 </span>

 </div>



 <div className="
 flex
 items-center
 gap-1
 ">

 <span className="
 h-2
 w-2

 rounded-full

 bg-success

 animate-pulse
 "/>

 <span className="
 text-xs
 text-success
 ">

 Healthy

 </span>

 </div>

 </div>




 <div className="
 mt-4

 grid

 grid-cols-3

 gap-2
 ">

 <Metric

 label="CPU"

 value="18%"

 />

 <Metric

 label="Mutations"

 value={

 String(
 meta.mutationCount
 )

 }

 />

 <Metric

 label="Previews"

 value={

 String(
 meta.previewCount
 )

 }

 />

 </div>

 </div>






 {/* META */}

 <div className="
 space-y-2
 ">

 {

 items.map(

 ([

 label,

 value

 ])=>(

 <div

 key={
 label
 }

 className="
 flex

 justify-between

 rounded-md

 bg-muted

 px-3

 py-2

 hover:bg-runtime/5

 transition
 "

 >

 <span className="
 text-[10px]

 uppercase

 tracking-wide

 text-muted-foreground
 ">

 {label}

 </span>



 <span className="
 text-xs

 truncate

 text-foreground
 ">

 {value}

 </span>

 </div>

 )

 )

 }

 </div>







 {/* STATUS */}

 <div className="
 mt-4

 grid

 grid-cols-2

 gap-2
 ">

 <StatusCard

 icon={
 GitBranch
 }

 title="Versioned"

 color="text-runtime"

 />


 <StatusCard

 icon={
 Layers3
 }

 title="Schema source"

 color="text-success"

 />

 </div>

 </div>

 </section>

 );

}




function Metric({

 label,

 value

}:any){

 return(

 <div className="
 rounded-md

 bg-muted

 p-2

 text-center
 ">

 <div className="
 text-[10px]

 uppercase

 text-muted-foreground
 ">

 {label}

 </div>



 <div className="
 mt-1

 text-sm

 font-medium

 text-foreground
 ">

 {value}

 </div>

 </div>

 );

}




function StatusCard({

 icon:Icon,

 title,

 color

}:any){

 return(

 <div className="
 rounded-md

 border

 border-border

 p-3

 hover:bg-runtime/5

 transition
 ">

 <Icon

 className={`
 mb-2

 size-4

 ${color}
 `}

 />

 <div className="
 text-[10px]

 uppercase

 tracking-wide

 text-muted-foreground
 ">

 {title}

 </div>

 </div>

 );

}