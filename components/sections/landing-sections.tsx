"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  ArrowRight,
} from "lucide-react";

import {
  faqs,
  howItWorks,
  roleCards,
} from "@/config/content";

import {
  templates,
} from "@/config/templates";

import {
  Badge,
} from "@/components/ui/badge";

import {
  Button,
} from "@/components/ui/button";

import {
  Card,
} from "@/components/ui/card";

import {
  TemplateCard,
} from "@/components/templates/template-card";

import {
  SectionHeading,
} from "./section-heading";





export function Hero() {

const router=
useRouter();

const [

prompt,

setPrompt,

]=

useState(
""
);



const tryPrompts=[

"CRM for sales deals",

"employee onboarding checklist",

"inventory warehouse tracker",

"support ticket helpdesk",

];



function generate(){

if(

!prompt.trim()

)

return;



router.push(

`/templates?prompt=${encodeURIComponent(prompt)}`

);

}



return(

<section

className="
relative
overflow-hidden
px-4
pt-28
pb-24
"

>



{/* GRID */}

<div

className="
absolute
inset-0
opacity-[0.04]

[background-image:linear-gradient(to_right,#0A2540_1px,transparent_1px),linear-gradient(to_bottom,#0A2540_1px,transparent_1px)]

[background-size:50px_50px]
"

/>



{/* GLOW */}

<div

className="
absolute

left-1/2

top-28

h-[26rem]

w-[26rem]

-translate-x-1/2

rounded-full

bg-runtime/10

blur-[120px]
"

/>






<div

className="
relative

mx-auto

max-w-7xl

text-center
"

>



<Badge

tone="runtime"

className="
mx-auto
rounded-full
px-5
py-2
"

>

Introducing OneAtlas 2.4 —

Schema Builder Live

</Badge>








<h1

className="
mx-auto

mt-10

max-w-6xl

text-6xl

font-bold

leading-[0.95]

tracking-tight

text-navy

md:text-8xl
"

>

Build operational apps

at the speed of

<span

className="
bg-gradient-to-r

from-runtime

via-purple-500

to-pink-400

bg-clip-text

text-transparent
"

>

thought.

</span>

</h1>








<p

className="
mx-auto

mt-8

max-w-4xl

text-xl

leading-10

text-muted-foreground
"

>

Generate secure,

database-backed CRMs,

HR dashboards,

and internal workflows

from templates or natural language prompts.

Ready to deploy in seconds.

</p>










{/* INPUT */}

<div

className="
mx-auto

mt-16

max-w-5xl
"

>

<div

className="
flex

overflow-hidden

rounded-[32px]

border

border-border

bg-card-strong

shadow-[0_15px_40px_rgba(10,37,64,.08)]
"

>



<textarea

value={prompt}

onChange={

e=>

setPrompt(
e.target.value
)

}

placeholder="Describe the app you want to build..."

className="
min-h-[110px]

flex-1

resize-none

bg-transparent

px-10

py-10

text-xl

outline-none
"

/>






<Button

onClick={
generate
}

className="
m-4

min-w-[180px]

rounded-[24px]

bg-runtime

text-lg

hover:bg-runtime-hover
"

>

Generate

<ArrowRight
className="
ml-2

size-5
"/>

</Button>

</div>








<div

className="
mt-8

flex

flex-wrap

items-center

justify-center

gap-3
"

>

<span

className="
font-semibold

text-muted-foreground
"

>

TRY:

</span>



{

tryPrompts.map(

item=>(

<button

key={item}

onClick={()=>

setPrompt(
item
)

}

className="
rounded-full

border

border-border

bg-card

px-5

py-2

text-sm

text-muted-foreground

transition

hover:border-runtime

hover:text-runtime
"

>

"{item}"

</button>

)

)

}

</div>

</div>









{/* TRUST */}

<div

className="
mt-14

flex

flex-wrap

justify-center

gap-3
"

>

{

[

"CRM",

"Analytics",

"Operations",

"Inventory",

"Support",

"Internal Tools",

]

.map(

item=>(

<Badge

key={item}

tone="neutral"

>

{item}

</Badge>

)

)

}

</div>

</div>

</section>

);

}









export function HowItWorks(){

return(

<section
id="how"
className="px-4 py-16"
>

<div className="mx-auto max-w-7xl">

<SectionHeading

eyebrow="How OneAtlas Works"

title="Template-first, schema-driven, mutation-safe."

description="Reusable templates drive consistency while runtime schemas remain source of truth."

/>



<div className="mt-8 grid gap-4 md:grid-cols-4">

{

howItWorks.map(

(step,index)=>(

<Card key={step}>

<span className="text-primary">

0{index+1}

</span>

<p className="mt-4 text-sm text-muted-foreground">

{step}

</p>

</Card>

)

)

}

</div>

</div>

</section>

);

}








export function TemplateShowcase(){

return(

<section

id="templates"

className="
px-4
py-16
"

>

<div className="mx-auto max-w-7xl">

<SectionHeading

eyebrow="Templates"

title="Operational systems, not marketing cards."

description="Templates with runtime metadata and previews."

/>



<div className="mt-8 flex gap-4 overflow-x-auto pb-4">

{

templates.map(

template=>(

<TemplateCard

key={template.id}

template={template}

compact

className="
min-w-[20rem]
"

/>

)

)

}

</div>

</div>

</section>

);

}







export function RolesAndTrust(){

return null;

}



export function ModelSection(){

return null;

}



export function PricingFaq(){

return null;

}