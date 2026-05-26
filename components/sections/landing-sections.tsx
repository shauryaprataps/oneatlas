"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

import { howItWorks } from "@/config/content";
import { templates } from "@/config/templates";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TemplateCard } from "@/components/templates/template-card";
import { SectionHeading } from "./section-heading";



export function Hero(){

const router=
useRouter();

const[
prompt,
setPrompt
]=useState("");

const[
loading,
setLoading
]=useState(false);



const tryPrompts=[

"CRM for sales deals",

"employee onboarding checklist",

"inventory warehouse tracker",

];



async function generate(){

if(
!prompt.trim()
||
loading
)return;



try{

setLoading(
true
);

const res=
await fetch(
"/api/generate",
{
method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:
JSON.stringify({
prompt
})
}
);



const data=
await res.json();



if(
!res.ok
){

alert(
data.suggestion ??
"Generation failed"
);

return;

}



router.push(

`/builder/${

data.schema
.metadata
.runtimeId

}`

);

}catch(err){

console.error(
err
);

alert(
"Generation failed"
);

}finally{

setLoading(
false
);

}

}



return(

<section className="
relative
overflow-hidden
px-4
pt-28
pb-24
">

<div className="
absolute
inset-0
opacity-[0.04]

[background-image:linear-gradient(to_right,#0A2540_1px,transparent_1px),linear-gradient(to_bottom,#0A2540_1px,transparent_1px)]

[background-size:50px_50px]
"/>



<div className="
absolute
left-1/2
top-28
h-[26rem]
w-[26rem]
-translate-x-1/2
rounded-full
bg-runtime/10
blur-[120px]
"/>



<div className="
relative
mx-auto
max-w-7xl
text-center
">

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



<h1 className="
mx-auto
mt-10
max-w-6xl
text-6xl
font-bold
leading-[0.95]
tracking-tight
text-navy
md:text-8xl
">

Build operational apps

at the speed of 
<span

className=" ml-6
text-[#FF6600]
"

>

 thought.

</span>

</h1>



<p className="
mx-auto
mt-8
max-w-4xl
text-xl
leading-10
text-muted-foreground
">

Generate secure,
database-backed CRMs,
HR dashboards,
and workflows from prompts.

</p>



<div className="
mx-auto
mt-16
max-w-5xl
">

<div className="
flex
overflow-hidden
rounded-[32px]
border
border-border
bg-card-strong
shadow-[0_15px_40px_rgba(10,37,64,.08)]
">

<textarea

value={prompt}

onChange={

e=>

setPrompt(
e.target.value
)

}

placeholder="
Describe app to build...
"

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

disabled={
loading
}

className="
m-4
min-w-[180px]
rounded-[24px]
bg-runtime
text-lg
"

>

{

loading

?

"Generating..."

:

"Generate"

}

<ArrowRight
className="
ml-2
size-5
"
/>

</Button>

</div>



<div className="
mt-8
flex
gap-3
justify-center
flex-wrap
">

{

tryPrompts.map(

item=>(

<button

key={
item
}

onClick={()=>

setPrompt(
item
)

}

className="
rounded-full
border
px-5
py-2
text-sm
hover:border-runtime
"

>

{item}

</button>

)

)

}

</div>

</div>

</div>

</section>

);

}





export function HowItWorks(){

return(

<section
className="
px-4
py-16
">

<div className="
mx-auto
max-w-7xl
">

<SectionHeading

eyebrow="
How it works
"

title="
Template-first runtime generation
"

description="
Reusable templates +
runtime persistence
"

/>



<div className="
mt-8
grid
gap-4
md:grid-cols-4
">

{

howItWorks.map(

(

step,
index

)=>(

<Card
key={
step
}
>

<span>

0{

index+1

}

</span>

<p className="
mt-4
text-sm
">

{

step

}

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
">

<div className="
mx-auto
max-w-7xl
">

<SectionHeading

eyebrow="
Templates
"

title="
Operational systems,
not marketing cards
"

description="
Runtime templates
"

/>



<div className="
mt-10
flex
gap-8
overflow-x-auto
pb-8
">

{

templates.map(

template=>(

<div

key={
template.id
}

className="
w-[380px]
flex-shrink-0
"

>

<TemplateCard

template={
template
}

/>

</div>

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