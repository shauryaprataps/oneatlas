"use client";

import { useMemo,useState } from "react";
import { useSearchParams } from "next/navigation";
import { templates } from "@/config/templates";
import type { TemplateDefinition } from "@/types";
import { TemplateCard } from "./template-card";
import { TemplateDetailModal } from "./template-detail-modal";

export function TemplatesGrid(){

const params=
useSearchParams();

const[
selected,
setSelected
]=useState<
TemplateDefinition|null
>(null);



const filtered=
useMemo(()=>{

return templates.filter(

template=>{

const category=
params.get("category");

const complexity=
params.get("complexity");

const collection=
params.get("collection");

return(

(!category||

template.category===category)

&&

(!complexity||

template.complexity===complexity)

&&

(!collection||

template.collection===collection)

);

}

);

},[params]);



return(

<>

<div className="
flex

gap-8

overflow-x-auto

pb-6

scroll-smooth

snap-x

snap-mandatory
">

{

filtered.map(

template=>(

<div

key={
template.id
}

className="
flex-shrink-0

w-[380px]

snap-start
"

>

<TemplateCard

template={
template
}

onPreview={
setSelected
}

/>

</div>

)

)

}

</div>



<TemplateDetailModal

template={
selected
}

onOpenChange={

open=>

!open&&

setSelected(
null
)

}

/>

</>

);

}