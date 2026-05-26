import Link from "next/link";

import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  GitBranch,
  Database,
} from "lucide-react";

import type {
  ProductPageContent,
} from "@/types";

import {
  SiteShell,
} from "@/components/layout/site-shell";

import {
  Badge,
} from "@/components/ui/badge";

import {
  Button,
} from "@/components/ui/button";

import {
  Card,
} from "@/components/ui/card";



export function ProductPage({

content,

}:{

content:
ProductPageContent;

}){

return(

<SiteShell>





{/* HERO */}

<section

className="
relative

overflow-hidden

px-4

pt-20

pb-16
"

>

<div
className="
absolute

left-0

top-0

h-80

w-80

rounded-full

bg-runtime/10

blur-[120px]
"
/>



<div
className="
mx-auto

grid

max-w-7xl

gap-12

lg:grid-cols-[1fr_.85fr]
"
>




{/* LEFT */}

<div>

<Badge
tone="runtime"
>

{

content.eyebrow

}

</Badge>




<h1
className="
mt-6

max-w-4xl

text-5xl

font-semibold

leading-[1.02]

tracking-tight

md:text-7xl
"
>

{

content.title

}

</h1>




<p
className="
mt-6

max-w-2xl

text-lg

leading-8

text-muted-foreground
"
>

{

content.description

}

</p>






<div
className="
mt-8

flex

gap-3
"
>

<Button

asChild

size="lg"

className="
bg-runtime

hover:bg-runtime-hover
"

>

<Link href="/templates">

Open Builder

<ArrowRight
className="
size-4
"/>

</Link>

</Button>




<Button

variant="outline"

size="lg"

>

Preview Runtime

</Button>

</div>






<div
className="
mt-10

grid

gap-4

md:grid-cols-3
"
>

{

[

["50+","Templates"],

["1-click","Preview"],

["100%","Mutation Safe"],

]

.map(

([v,l])=>(

<Card

key={l}

className="
runtime-card
"

>

<div
className="
text-3xl

font-semibold
"
>

{

v

}

</div>



<div
className="
mt-1

text-sm

text-muted-foreground
"
>

{

l

}

</div>

</Card>

)

)

}

</div>

</div>








{/* RIGHT PREVIEW */}

<Card

className="
runtime-card

p-5

shadow-[var(--shadow-soft)]
"

>

<div
className="
flex

justify-between
"
>

<div>

<div
className="
font-semibold
"
>

Runtime Preview

</div>



<div
className="
text-xs

text-muted-foreground
"
>

schema v12

</div>

</div>



<Badge
tone="live"
>

Connected ●

</Badge>

</div>






<div
className="
mt-6

space-y-3
"
>

{

[

"+ Added KPI metric",

"~ Updated schema",

"+ Generated workflow",

"- Removed field",

]

.map(

item=>(

<div

key={item}

className="
rounded-lg

border

border-border

bg-muted/60

px-4

py-3

text-sm
"

>

{

item

}

</div>

)

)

}

</div>






<div
className="
mt-6

rounded-xl

bg-runtime/5

p-4
"
>

<div
className="
text-xs

text-muted-foreground
"
>

Runtime health

</div>



<div
className="
mt-3

flex

gap-1
"
>

{

[45,72,58,88,62]

.map(

(

h,

i

)=>(

<div

key={i}

className="
runtime-bar

flex-1

rounded

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

</Card>

</div>

</section>










{/* CAPABILITIES */}

<section
className="
px-4

pb-16
"
>

<div
className="
mx-auto

grid

max-w-7xl

gap-4

lg:grid-cols-2
"
>

<Card>

<div
className="
flex

items-center

gap-2
"
>

<Sparkles
className="
size-5

text-runtime
"/>



<h2
className="
font-semibold
"
>

Runtime capabilities

</h2>

</div>






<div
className="
mt-6

grid

gap-3
"
>

{

content.points.map(

point=>(

<div

key={point}

className="
flex

gap-3

rounded-lg

border

border-border

bg-muted/50

p-3
"

>

<CheckCircle2
className="
size-5

text-success
"/>



<span
className="
text-sm
"
>

{

point

}

</span>

</div>

)

)

}

</div>

</Card>







<Card>

<div
className="
flex

items-center

gap-2
"
>

<GitBranch
className="
size-5

text-runtime
"/>



<h2
className="
font-semibold
"
>

Schema metadata

</h2>

</div>






<div
className="
mt-6

space-y-3
"
>

{

[

["Runtime","v12"],

["Mutations","48"],

["Previews","12"],

["Status","Connected"],

]

.map(

([l,v])=>(

<div

key={l}

className="
flex

justify-between

rounded-md

border

border-border

p-3
"

>

<span
className="
text-muted-foreground
"
>

{

l

}

</span>



<span>

{

v

}

</span>

</div>

)

)

}

</div>

</Card>

</div>

</section>











{/* TRUST */}

<section
className="
px-4

pb-20
"
>

<div
className="
mx-auto

grid

max-w-7xl

gap-4

md:grid-cols-3
"
>

{

[

"Template-first",

"Schema-versioned",

"Deployment-ready",

]

.map(

item=>(

<Card

key={item}

className="
runtime-card
"

>

<Database
className="
size-5

text-runtime
"/>



<h2
className="
mt-4

font-semibold
"
>

{

item

}

</h2>



<p
className="
mt-2

text-sm

leading-6

text-muted-foreground
"
>

Reusable primitives keep OneAtlas operational and mutation-safe.

</p>

</Card>

)

)

}

</div>

</section>

</SiteShell>

);

}