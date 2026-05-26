"use client";

import Link from "next/link";

export function Logo() {

return(

<Link

href="/"

className="
flex
items-center
gap-3
transition
hover:opacity-80
"

>

<div

className="
flex
h-10
w-10
items-center
justify-center
rounded-lg
border
border-border
bg-white
font-bold
text-navy
"

>

OA

</div>



<div

className="
font-semibold
text-lg
text-foreground
"

>

OneAtlas

</div>

</Link>

);

}