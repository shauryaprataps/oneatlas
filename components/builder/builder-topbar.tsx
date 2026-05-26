"use client";

import {
  PanelLeftClose,
  PanelRightClose,
  Rocket,
  Search,
  Share2,
  Activity,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  useBuilderStore,
} from "@/store/builder-store";



export function BuilderTopbar(){

const {

schema,

setAppName,

togglePanel,

setCommandOpen,

}=

useBuilderStore();



return(

<header

className="
flex

h-14

items-center

justify-between

border-b

border-white/10

bg-navy/95

px-3

text-white

shadow-[var(--shadow-glass)]

backdrop-blur-xl
"

>



{/* LEFT */}

<div
className="
flex

items-center

gap-3

min-w-0
"
>


<Button

size="icon"

variant="ghost"

onClick={()=>

togglePanel(

"left"

)

}

>

<PanelLeftClose
className="
size-4
"/>
</Button>





<input

value={

schema.appName

}

onChange={

e=>

setAppName(

e.target.value

)

}

className="
w-44

truncate

rounded-md

border

border-transparent

bg-white/[0.03]

px-3

py-1.5

text-sm

font-medium

outline-none

focus:border-runtime/20

focus:bg-white/[0.05]
"

/>





{/* STATUS */}

<div
className="
hidden

lg:flex

items-center

gap-3

ml-2
"
>


<div
className="
flex

items-center

gap-2

rounded-md

bg-success/10

px-2

py-1
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
text-xs

text-success
"
>

Connected

</span>

</div>





<Badge

tone="runtime"

className="
bg-runtime/10

text-runtime
"

>

v{

schema.version

}

</Badge>





<div
className="
flex

items-center

gap-1

text-xs

text-white/55
"
>

<Activity
className="
size-3
"/>



2m

</div>





<div
className="
text-xs

text-white/45
"
>

{

schema.metadata.environment

}

</div>





<div
className="
truncate

text-xs

text-white/40

max-w-[100px]
"
>

{

schema.metadata.runtimeId

}

</div>

</div>

</div>






{/* RIGHT */}

<div
className="
flex

items-center

gap-2
"
>


<Button

size="icon"

variant="ghost"

onClick={()=>

setCommandOpen(

true

)

}

>

<Search
className="
size-4
"/>

</Button>





<Button

size="sm"

variant="outline"

className="
h-8

gap-1

border-white/10

bg-white/[0.03]

hover:bg-white/[0.08]
"

>

<Share2
className="
size-3
"/>



<span
className="
text-xs
"
>

Share

</span>

</Button>





<Button

size="sm"

className="
h-8

gap-1

bg-runtime

hover:bg-runtime/90
"

>

<Rocket
className="
size-3
"/>



<span
className="
text-xs
"
>

Deploy

</span>

</Button>





<Button

size="icon"

variant="ghost"

onClick={()=>

togglePanel(

"right"

)

}

>

<PanelRightClose
className="
size-4
"/>

</Button>

</div>

</header>

);

}