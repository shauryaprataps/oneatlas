"use client";

import { useSearchParams } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
} from "react";

import { templates } from "@/config/templates";
import { useBuilderStore } from "@/store/builder-store";
import { cn } from "@/lib/utils";

import { BuilderTopbar } from "./builder-topbar";
import { CommandPalette } from "./command-palette";
import { ComponentTree } from "./component-tree";
import { LiveCanvas } from "./live-canvas";
import { RuntimeMetadataPanel } from "./runtime-metadata-panel";
import { AICopilotPanel } from "./ai-copilot-panel";

interface BuilderShellProps{
runtimeId?:string;
}



function clamp(
n:number,
min:number,
max:number
){

return Math.max(
min,
Math.min(
max,
n
)
);

}



export function BuilderShell({

runtimeId,

}:BuilderShellProps){

const params=
useSearchParams();



const {

panels,

setSchemaById,

setSchemaByRuntimeId,

}=
useBuilderStore();



const [

leftWidth,

setLeftWidth,

]=

useState(
260
);



const leftDrag=

useRef<
HTMLDivElement|null
>(
null
);



useEffect(

()=>{

if(
runtimeId
){

setSchemaByRuntimeId(
runtimeId
);

return;

}



const slug=

params.get(
"template"
);



const template=

templates.find(

item=>

item.slug===slug

);



if(
template
){

setSchemaById(
template.schemaId
);

}

},

[

params,

runtimeId,

setSchemaById,

setSchemaByRuntimeId,

]

);





/* LEFT RESIZE */

useEffect(

()=>{

function move(
e:PointerEvent
){

if(
!leftDrag.current
)
return;



const parent=

leftDrag.current.parentElement;

if(
!parent
)
return;



const rect=

parent.getBoundingClientRect();



setLeftWidth(

clamp(

e.clientX-
rect.left,

180,

360

)

);

}



function stop(){

leftDrag.current=
null;

}



window.addEventListener(
"pointermove",
move
);

window.addEventListener(
"pointerup",
stop
);



return()=>{

window.removeEventListener(
"pointermove",
move
);

window.removeEventListener(
"pointerup",
stop
);

};

},

[]

);





return(

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

<BuilderTopbar/>

<CommandPalette/>





<div

className="
grid

flex-1

min-h-0

grid-cols-1

xl:grid-cols-[auto_1fr_auto]
"

>




{/* LEFT */}

{

panels.left&&(

<aside

style={{

width:

leftWidth

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

transition-all
"

>

<div
className="
overflow-auto

p-2

flex-1
"
>

<RuntimeMetadataPanel/>





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



<ComponentTree/>

</div>

</div>





{/* resize */}

<div

ref={leftDrag}

onPointerDown={

e=>

leftDrag.current=

e.currentTarget

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

<LiveCanvas/>

</div>






{/* RIGHT */}

<div

className="
hidden

xl:flex

overflow-hidden
"

>

<AICopilotPanel/>

</div>

</div>

</div>

);

}