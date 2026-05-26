"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import {
  BarChart3,
  Blocks,
  BriefcaseBusiness,
  CircleDot,
  Database,
  Eye,
  GitBranch,
  Headphones,
  PackageSearch,
  ShieldCheck,
  UserRoundCog,
  UsersRound,
  WandSparkles,
  ArrowRight,
} from "lucide-react";

import type { TemplateDefinition } from "@/types";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { cn } from "@/lib/utils";

interface TemplateCardProps{
template:TemplateDefinition;
compact?:boolean;
className?:string;
onPreview?:(template:TemplateDefinition)=>void;
}



const complexityTone={
Simple:"success",
Moderate:"pending",
Advanced:"advanced",
} as const;



const templateIcons={

"crm-workspace":
BriefcaseBusiness,

"hr-dashboard":
UsersRound,

"admin-panel":
UserRoundCog,

"analytics-dashboard":
BarChart3,

"inventory-system":
PackageSearch,

"support-workspace":
Headphones,

};



export function TemplateCard({

template,

compact=false,

className,

onPreview,

}:TemplateCardProps){

const Icon=

templateIcons[
template.slug as keyof typeof templateIcons
]

??

Blocks;



return(

<Card

className={

cn(

`
group

overflow-hidden

border

border-white/10

bg-card

transition-all

duration-200

hover:-translate-y-1

hover:border-runtime/20

hover:shadow-lg

hover:shadow-runtime/10
`,

className

)

}

>





{/* PREVIEW */}

<div

className="
relative

h-36

overflow-hidden

border-b

border-white/10

bg-gradient-to-br

from-navy

via-ink

to-runtime/20

p-4

text-white
"

>

<div
className="
flex

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

<CircleDot
className="
size-3

text-success
"/>



<span
className="
text-xs
"
>

{

template.runtime.status

}

</span>

</div>



<Badge
tone="runtime"
>

v{

template.runtime.schemaVersion

}

</Badge>

</div>





<div
className="
mt-6

flex

items-center

gap-2
"
>

<Icon
className="
size-5

text-runtime
"/>



<h3
className="
text-lg

font-semibold
"
>

{

template.name

}

</h3>

</div>



<div
className="
mt-2

text-xs

text-white/50
"
>

{

template.schemaId

}

</div>





{/* fake preview */}

<div
className="
mt-5

flex

gap-1
"
>

{

[50,70,40,85,60].map(

(

h,

i

)=>(

<div

key={i}

className="
flex-1

rounded-t

bg-runtime/70
"

style={{

height:

`${h}px`

}}

>

</div>

)

)

}

</div>

</div>






<div
className="
flex

flex-col

p-4

h-full
"
>





<div
className="
flex

items-start

justify-between
"
>

<Badge
tone="runtime"
>

{

template.category

}

</Badge>



<Badge

tone={

complexityTone[
template.complexity
]

}

>

{

template.complexity

}

</Badge>

</div>





<p
className="
mt-3

text-sm

leading-6

text-muted-foreground
"
>

{

template.description

}

</p>






<div
className="
mt-4

grid

grid-cols-3

gap-2
"
>

<Metric

icon={
<Blocks className="size-3"/>
}

value={

String(

template.runtime.components

)

}

label="Components"

/>



<Metric

icon={
<Database className="size-3"/>
}

value={

String(

template.runtime.fields

)

}

label="Fields"

/>



<Metric

icon={
<GitBranch className="size-3"/>
}

value={

template.metrics[0]?.value

??

"0"

}

label="Objects"

/>

</div>






<div
className="
mt-4

rounded-md

border

border-white/10

bg-white/[0.02]

p-3
"
>

<div
className="
flex

justify-between

text-xs
"
>

<span
className="
text-white/45
"
>

Collection

</span>



<span>

{

template.collection

}

</span>

</div>



<div
className="
mt-2

flex

justify-between

text-xs
"
>

<span
className="
text-white/45
"
>

Mutation safe

</span>



<ShieldCheck
className="
size-3

text-success
"
/>

</div>

</div>






<div
className="
mt-auto

pt-5

flex

gap-2
"
>

<Button

asChild

className="
flex-1

bg-runtime

hover:bg-runtime/90
"

>

<Link

href={`/builder/${

template.runtime.runtimeId

}`}

>

<WandSparkles
className="
size-4
"/>



Open Builder



<ArrowRight
className="
size-4
"/>

</Link>

</Button>





<Button

asChild

variant="outline"

className="
flex-1
"

>

<Link

href={`/preview/${

template.runtime.runtimeId

}`}

onClick={()=>

onPreview?.(

template

)

}

>

<Eye
className="
size-4
"/>



Preview

</Link>

</Button>

</div>

</div>

</Card>

);

}



function Metric({

icon,

label,

value,

}:{

icon:ReactNode;

label:string;

value:string;

}){

return(

<div

className="
rounded-md

border

border-white/10

bg-white/[0.02]

p-2
"

>

<div
className="
flex

items-center

gap-1

text-sm

font-medium
"
>

{

icon

}

{

value

}

</div>



<div
className="
text-[10px]

text-white/45
"
>

{

label

}

</div>

</div>

);

}