"use client";

import Link from "next/link";
import { Home } from "lucide-react";

export function HomeButton(){

return(

<Link

href="/"

className="
fixed
bottom-6
right-6
z-[999]

flex
items-center
gap-2

rounded-full

bg-[#FF6600]

px-5
py-3

text-white

shadow-lg

transition

hover:bg-[#E65C00]

hover:scale-105
"

>

<Home
className="
h-5
w-5
"
/>

Home

</Link>

);

}