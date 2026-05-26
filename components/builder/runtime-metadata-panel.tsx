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



const [

open,

setOpen

]=

useState(

true

);



const meta=

schema.metadata;



const items=[

["Template",

meta.templateName],

["Runtime",

meta.runtimeId],

["Version",

`v${schema.version}`],

["Complexity",

meta.complexity],

["Mutations",

String(
meta.mutationCount
)],

["Previews",

String(
meta.previewCount
)],

["Environment",

meta.environment],

["Edited",

meta.lastEdited],

];



return(

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

<div
className="
flex

items-center

gap-2
"
>

<Database
className="
size-4

text-runtime
"/>



<span
className="
text-xs

font-semibold

uppercase

tracking-wide
"
>

Runtime diagnostics

</span>

</div>



<div
className="
flex

items-center

gap-2
"
>

<StatusBadge

status={
schema.connection
}

/>



<ChevronDown

className={`

size-4

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

"max-h-[800px] mt-3"

:

"max-h-0"

}

`}

>




{/* HEALTH */}

<div
className="
mb-3

rounded-lg

border

border-runtime/10

bg-runtime/5

p-3
"
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

<Activity
className="
size-4

text-success
"/>



<span
className="
text-xs

font-medium
"
>

Runtime health

</span>

</div>



<div
className="
flex

items-center

gap-1
"
>

<span
className="
h-2

w-2

rounded-full

bg-success

animate-pulse
"/>



<span
className="
text-[10px]

text-success
"
>

Healthy

</span>

</div>

</div>



<div
className="
mt-3

grid

grid-cols-3

gap-2
"
>

<Metric
label="CPU"
value="18%"
/>

<Metric
label="Mutations"
value={String(
meta.mutationCount
)}
/>

<Metric
label="Previews"
value={String(
meta.previewCount
)}
/>

</div>

</div>





{/* META */}

<div
className="
space-y-2
"
>

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

bg-white/[0.02]

px-2

py-2

hover:bg-white/[0.04]
"

>

<span
className="
text-[10px]

uppercase

tracking-wide

text-white/40
"
>

{

label

}

</span>



<span
className="
truncate

text-xs
"
>

{

value

}

</span>

</div>

)

)

}

</div>





{/* STATUS */}

<div
className="
mt-3

grid

grid-cols-2

gap-2
"
>

<StatusCard

icon={
GitBranch
}

title="Versioned"

color="
text-runtime
"

/>



<StatusCard

icon={
Layers3
}

title="Schema source"

color="
text-success
"

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

<div
className="
rounded-md

bg-white/[0.03]

p-2

text-center
"
>

<div
className="
text-[10px]

uppercase

text-white/40
"
>

{

label

}

</div>



<div
className="
mt-1

text-sm

font-medium
"
>

{

value

}

</div>

</div>

);

}



function StatusCard({

icon:

Icon,

title,

color

}:any){

return(

<div
className="
rounded-md

border

border-white/10

p-2

hover:bg-white/[0.03]
"
>

<Icon

className={`

mb-1

size-3

${

color

}

`}

/>



<div
className="
text-[10px]

uppercase

tracking-wide

text-white/45
"
>

{

title

}

</div>

</div>

);

}