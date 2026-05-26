"use client";

import Link from "next/link";

import {
BarChart3,
BriefcaseBusiness,
CircleDot,
Headphones,
PackageSearch,
UserRoundCog,
UsersRound,
Blocks,
Eye,
WandSparkles
} from "lucide-react";

import {
Badge
} from "@/components/ui/badge";

import {
Button
} from "@/components/ui/button";

import {
Card
} from "@/components/ui/card";

import type {
TemplateDefinition
} from "@/types";



const icons={

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
onPreview,

}:{

template:
TemplateDefinition;

onPreview?:(
t:TemplateDefinition
)=>void;

}){

const Icon=

icons[
template.slug as keyof typeof icons
]

??

Blocks;



return(

<Card className="
h-[520px]

flex

flex-col

rounded-3xl

overflow-hidden

bg-white

border

border-border

hover:shadow-xl

transition
">




{/* HEADER */}

<div className="
h-[230px]

bg-gradient-to-br

from-navy

via-ink

to-runtime/20

p-8

text-white
">

<div className="
flex

justify-between
">

<div className="
flex

gap-2
">

<CircleDot
className="
size-3
text-success
"
/>

{

template.runtime.status

}

</div>


<Badge>

v{

template.runtime.schemaVersion

}

</Badge>

</div>




<div className="
mt-12

flex

gap-4

items-center
">

<Icon
className="
size-8

text-runtime
"
/>



<h2 className="
text-5xl

font-bold

leading-tight
">

{

template.name

}

</h2>

</div>

</div>






<div className="
flex-1

flex

flex-col

p-8
">

<div className="
flex

justify-between
">

<Badge>

{

template.category

}

</Badge>


<Badge>

{

template.complexity

}

</Badge>

</div>




<p className="
mt-6

leading-8

text-muted-foreground

line-clamp-4
">

{

template.description

}

</p>






<div className="
mt-auto

flex

gap-4
">

<Button

asChild

className="
flex-1

h-12
"

>

<Link

href={`/builder/${
template.runtime.runtimeId
}`}

>

<WandSparkles
className="
mr-2
size-4
"
/>

Use Template

</Link>

</Button>





<Button

variant="outline"

asChild

className="
flex-1

h-12
"

>

<Link

href={`/builder/${
template.runtime.runtimeId
}`}

>

<Eye
className="
mr-2
size-4
"
/>

Preview

</Link>

</Button>

</div>

</div>

</Card>

);

}