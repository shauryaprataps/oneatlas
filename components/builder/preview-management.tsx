"use client";

import {
  Copy,
  GitBranch,
  Clock3,
} from "lucide-react";

import {
  Button,
} from "@/components/ui/button";

import {
  Badge,
} from "@/components/ui/badge";

import {
  useBuilderStore,
} from "@/store/builder-store";



export function PreviewManagement(){

const {

schema,

copiedPreviewId,

markPreviewCopied,

}=

useBuilderStore();



return(

<section

className="
rounded-lg

border

border-white/10

bg-ink/70

p-3

text-white
"

>



{/* HEADER */}

<div

className="
flex

items-center

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

<GitBranch
className="
size-4

text-runtime
"/>



<span
className="
text-xs

font-semibold

uppercase

tracking-wide
"
>

Preview snapshots

</span>

</div>



<span
className="
text-[10px]

text-white/40
"
>

{

schema.previews
.length

}

VERSIONS

</span>

</div>





{/* SNAPSHOTS */}

<div

className="
mt-3

space-y-2
"

>

{

schema.previews
.length===0

?

<div
className="
text-xs

text-white/45
"
>

No snapshots

</div>

:

schema.previews.map(

preview=>(

<div

key={
preview.id
}

className="
rounded-lg

border

border-white/10

bg-white/[0.02]

p-3

transition

hover:bg-white/[0.04]

hover:border-runtime/20
"

>


<div
className="
flex

items-start

justify-between

gap-3
"
>

<div
className="
min-w-0

flex-1
"
>

<div
className="
truncate

text-xs

font-medium

text-runtime
"
>

{

preview.url

}

</div>



<div
className="
mt-1

flex

flex-wrap

items-center

gap-3

text-[10px]

uppercase

tracking-wide

text-white/45
"
>

<div
className="
flex

items-center

gap-1
"
>

<Clock3
className="
size-3
"/>


Created

{

preview.created

}

</div>



<div>

Expires

{

preview.expires

}

</div>

</div>

</div>




<Button

size="icon"

variant="ghost"

onClick={()=>

markPreviewCopied(

preview.id

)

}

>

<Copy
className="
size-3
"/>

</Button>

</div>





<div
className="
mt-3

flex

items-center

justify-between
"
>

<Badge

tone={

copiedPreviewId===

preview.id

?

"success"

:

"runtime"

}

>

{

copiedPreviewId===

preview.id

?

"Copied"

:

"Snapshot"

}

</Badge>



<div
className="
text-[10px]

uppercase

tracking-wide

text-white/40
"
>

commit ·

{

preview.id
.slice(

0,

6

)

}

</div>

</div>

</div>

)

)

}

</div>

</section>

);

}