"use client";

import { useEffect } from "react";

import {
  Search,
  Sparkles,
  Rocket,
  Database,
  Workflow,
} from "lucide-react";

import {
  Button,
} from "@/components/ui/button";

import {
  useBuilderStore,
} from "@/store/builder-store";



const groups = [

  {

    title:
      "AI Actions",

    icon:
      Sparkles,

    actions:[

      "Add field",

      "Rename module",

      "Generate workflow",

      "Create chart",

      "Add API",

      "Deploy preview",

    ]

  },



  {

    title:
      "Runtime",

    icon:
      Database,

    actions:[

      "Search schema",

      "Preview",

      "Rollback",

    ]

  },



  {

    title:
      "Deploy",

    icon:
      Rocket,

    actions:[

      "Deploy",

      "Generate template",

    ]

  },

];



export function CommandPalette(){

const {

commandOpen,

setCommandOpen,

applyInstruction

}=

useBuilderStore();



useEffect(()=>{

function onKeyDown(

event:

KeyboardEvent

){

if(

(

event.metaKey ||

event.ctrlKey

)

&&

event.key
.toLowerCase()

===

"k"

){

event.preventDefault();

setCommandOpen(

!commandOpen

);

}



if(

event.key===

"Escape"

){

setCommandOpen(

false

);

}

}



window
.addEventListener(

"keydown",

onKeyDown

);



return()=>{

window
.removeEventListener(

"keydown",

onKeyDown

);

};

},[

commandOpen,

setCommandOpen

]);



if(

!commandOpen

)

return null;



return(

<div

className="
fixed

inset-0

z-50

bg-black/50

backdrop-blur-sm

p-4
"

onClick={()=>

setCommandOpen(

false

)

}

>



<div

className="
mx-auto

mt-16

max-w-2xl

rounded-xl

border

border-white/10

bg-navy/95

p-3

text-white

shadow-[var(--shadow-glass)]
"

onClick={

e=>

e.stopPropagation()

}

>




{/* HEADER */}

<div

className="
flex

items-center

justify-between

border-b

border-white/10

pb-3
"

>

<div
className="
flex

items-center

gap-2
"
>

<Search
className="
size-4

text-runtime
"
/>



<div>

<div
className="
text-sm

font-medium
"
>

Command Palette

</div>



<div
className="
text-xs

text-white/45
"
>

⌘K /
Ctrl+K

</div>

</div>

</div>



<div
className="
text-xs

text-white/45
"
>

ESC

</div>

</div>





<div
className="
mt-3

space-y-4
"
>

{

groups.map(

group=>{

const Icon=

group.icon;



return(

<div

key={
group.title
}

>

<div

className="
mb-2

flex

items-center

gap-2

text-[11px]

uppercase

tracking-wide

text-white/40
"

>

<Icon
className="
size-3
"/>


{

group.title

}

</div>




<div
className="
space-y-1
"
>

{

group.actions.map(

action=>(

<Button

key={
action
}

variant="ghost"

className="
w-full

justify-between

rounded-md

text-left

text-sm

hover:bg-white/8
"

onClick={()=>{

applyInstruction(

action

);

setCommandOpen(

false

);

}}

>

<span>

{

action

}

</span>



<span
className="
text-[10px]

text-white/35
"
>

↵

</span>

</Button>

)

)

}

</div>

</div>

);

}

)

}

</div>

</div>

</div>

);

}