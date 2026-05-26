"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import {
  Github,
  Menu,
  Search,
  X,
  ArrowRight,
} from "lucide-react";

import Link from "next/link";
import { useState } from "react";

import {
  dropdownGroups,
  primaryNavigation,
} from "@/config/navigation";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {

const [

open,

setOpen

]=

useState(false);



return(

<header

className="
sticky
top-4
z-50
px-4
"

>

<nav

className="
relative

mx-auto

max-w-7xl

rounded-2xl

border

border-border

bg-white

px-7

py-3

text-foreground

shadow-sm
"

>

{/* gradient */}

<div

className="
absolute
bottom-0
left-0
h-[2px]
w-full

bg-gradient-to-r

from-runtime

via-purple-400

to-pink-400

opacity-60
"

/>



<div

className="
flex
items-center
justify-between
gap-6
"

>



{/* LEFT */}

<div

className="
flex
items-center
gap-8
"

>

<Logo/>



<div

className="
hidden

lg:flex

items-center

gap-1
"

>

{

primaryNavigation.map(

item=>(

<Link

key={
item.label
}

href={
item.href
}

className="
rounded-lg

px-3

py-2

text-sm

text-muted-foreground

transition

hover:text-runtime

hover:bg-runtime/5
"

>

{

item.label

}

</Link>

)

)



}




{

dropdownGroups.map(

group=>(

<DropdownMenu.Root

key={
group.label
}

>

<DropdownMenu.Trigger

className="
rounded-lg

px-3

py-2

text-sm

text-muted-foreground

hover:text-runtime

hover:bg-runtime/5
"

>

{

group.label

}

</DropdownMenu.Trigger>





<DropdownMenu.Content

className="
mt-4

grid

w-[34rem]

grid-cols-2

gap-2

rounded-2xl

border

border-border

bg-white

p-4

shadow-xl
"

>

{

group.items.map(

item=>{

const Icon=

item.icon;



return(

<DropdownMenu.Item

asChild

key={
item.label
}

>

<Link

href={
item.href
}

className="
flex

gap-3

rounded-xl

p-3

hover:bg-runtime/5
"

>

{

Icon&&(

<Icon

className="
mt-1

size-4

text-runtime
"

/>

)

}



<div>

<div

className="
text-sm

font-medium

text-foreground
"

>

{

item.label

}

</div>



<div

className="
text-xs

text-muted-foreground
"

>

{

item.description

}

</div>

</div>

</Link>

</DropdownMenu.Item>

);

}

)

}

</DropdownMenu.Content>

</DropdownMenu.Root>

)

)

}

</div>

</div>






{/* RIGHT */}

<div

className="
hidden

lg:flex

items-center

gap-3
"

>


<div

className="
flex

items-center

gap-2

rounded-xl

border

border-border

bg-muted

px-3

py-2

text-xs

text-muted-foreground
"

>

<Search

className="
size-3
"

/>

⌘K

</div>



<ThemeToggle/>





<Button

asChild

variant="ghost"

className="
text-foreground

hover:text-runtime

hover:bg-runtime/5
"

>

<Link

href="/docs"

>

Login

</Link>

</Button>





<Button

asChild

variant="ghost"

size="icon"

className="
text-muted-foreground

hover:text-runtime

hover:bg-runtime/5
"

>

<Link

href="https://github.com"

target="_blank"

>

<Github

className="
size-4
"

/>

</Link>

</Button>






<Button

asChild

className="
h-11

rounded-xl

bg-runtime

px-5

text-white

hover:bg-runtime-hover
"

>

<Link

href="/templates"

>

Start Building

<ArrowRight

className="
ml-1

size-4
"

/>

</Link>

</Button>

</div>






{/* MOBILE */}

<Button

size="icon"

variant="ghost"

className="
lg:hidden
"

onClick={()=>

setOpen(

!open

)

}

>

{

open

?

<X/>

:

<Menu/>

}

</Button>

</div>

</nav>







{/* MOBILE MENU */}

<div

className={

cn(

`

mx-auto

mt-3

hidden

max-w-7xl

rounded-2xl

border

border-border

bg-white

p-4

shadow-sm

`,

open&&

"block"

)

}

>

{

[

...primaryNavigation,

...dropdownGroups.flatMap(

g=>

g.items

)

]

.map(

item=>(

<Link

key={
item.label
}

href={
item.href
}

onClick={()=>

setOpen(

false

)

}

className="
block

rounded-lg

px-4

py-3

text-foreground

hover:bg-runtime/5

hover:text-runtime
"

>

{

item.label

}

</Link>

)

)

}





<Button

asChild

className="
mt-4

w-full

bg-runtime
"

>

<Link

href="/templates"

>

Start Building

</Link>

</Button>

</div>

</header>

);

}