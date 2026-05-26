"use client";

import {
  Sparkles,
  Command,
} from "lucide-react";

import {
  Button,
} from "@/components/ui/button";

import {
  StatusBadge,
} from "@/components/ui/status-badge";

import {
  useBuilderStore,
} from "@/store/builder-store";



export function StatusAndInput(){

const {

schema,

setCommandOpen,

}=

useBuilderStore();



return(

<div

className="
fixed

bottom-5

left-5

z-40
"

>


<Button

variant="outline"

className="

flex

items-center

gap-3

rounded-xl

border

border-white/10

bg-navy/90

px-4

py-3

text-white

shadow-[var(--shadow-glass)]

backdrop-blur-xl

hover:bg-navy

"

onClick={()=>

setCommandOpen(

true

)

}

>




<div

className="
flex

items-center

gap-2
"

>

<Sparkles

className="
size-4

text-runtime
"

/>



<div
className="
flex

flex-col

items-start
"
>

<span
className="
text-xs

font-medium
"
>

Open OneAtlas Chat

</span>



<span
className="
text-[10px]

text-white/45
"
>

AI runtime assistant

</span>

</div>

</div>





<div
className="
mx-2

h-6

w-px

bg-white/10
"
/>





<div
className="
hidden

sm:flex

items-center

gap-2
"
>

<StatusBadge

status={
schema.connection
}

/>



<span
className="
text-[10px]

text-white/45
"
>

v{

schema.version

}

</span>

</div>





<div
className="
flex

items-center

gap-1

rounded-md

bg-white/5

px-2

py-1
"
>

<Command
className="
size-3
"/>


<span
className="
text-[10px]
"
>

K

</span>

</div>

</Button>

</div>

);

}