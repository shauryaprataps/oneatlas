"use client";

import {
 Activity,
 PanelLeftClose,
 PanelRightClose,
 Rocket,
 Search,
 Share2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
 useBuilderStore,
} from "@/store/builder-store";

export function BuilderTopbar(){

 const{

 schema,
 panels,
 setAppName,
 togglePanel,
 setCommandOpen,

 }=

 useBuilderStore();


 return(

 <header

 className="
 flex
 h-14
 items-center
 justify-between
 border-b
 border-border
 bg-white
 px-4
 shadow-sm
 "

 >


 {/* LEFT */}

 <div className="
 flex
 min-w-0
 items-center
 gap-3
 ">


 <Button

 size="icon"

 variant="ghost"

 onClick={()=>

 togglePanel(
 "left"
 )

 }

 >

 <PanelLeftClose

 className={`
 size-4
 text-muted-foreground
 transition-transform

 ${

 !panels.left

 ?

 "rotate-180"

 :

 ""

 }

 `}

 />

 </Button>





 <input

 value={

 schema.appName

 }

 onChange={

 e=>

 setAppName(

 e.target.value

 )

 }

 className="
 w-44
 rounded-md
 border
 border-border
 bg-muted

 px-3
 py-1.5

 text-sm
 font-medium

 text-foreground

 outline-none

 focus:border-runtime/30
 "

 />






 <div className="
 hidden
 lg:flex
 items-center
 gap-3
 ml-3
 ">



 <div className="
 flex
 items-center
 gap-2

 rounded-md

 bg-success/10

 px-2
 py-1
 ">

 <span className="
 h-2
 w-2

 rounded-full

 bg-success

 animate-pulse
 "/>



 <span className="
 text-xs
 text-success
 ">

 Connected

 </span>

 </div>





 <Badge

 tone="runtime"

 >

 v{

 schema.version

 }

 </Badge>






 <div className="
 flex
 items-center
 gap-1

 text-xs

 text-muted-foreground
 ">

 <Activity
 className="
 size-3
 "/>

 2m

 </div>






 <div className="
 text-xs
 text-muted-foreground
 ">

 {

 schema.metadata
 .environment

 }

 </div>






 <div className="
 max-w-[120px]
 truncate

 text-xs

 text-muted-foreground
 ">

 {

 schema.metadata
 .runtimeId

 }

 </div>

 </div>

 </div>








 {/* RIGHT */}

 <div className="
 flex
 items-center
 gap-2
 ">


 <Button

 size="icon"

 variant="ghost"

 onClick={()=>

 setCommandOpen(
 true
 )

 }

 >

 <Search
 className="
 size-4
 text-muted-foreground
 "/>

 </Button>






 <Button

 size="sm"

 variant="outline"

 className="
 border-border
 bg-white

 hover:bg-muted
 "

 >

 <Share2
 className="
 size-3
 "/>

 <span
 className="
 text-xs
 ">

 Share

 </span>

 </Button>







 <Button

 size="sm"

 className="
 bg-runtime

 hover:bg-runtime-hover

 text-white
 "

 >

 <Rocket
 className="
 size-3
 "/>

 <span
 className="
 text-xs
 ">

 Deploy

 </span>

 </Button>








 <Button

 size="icon"

 variant="ghost"

 onClick={()=>

 togglePanel(
 "right"
 )

 }

 >

 <PanelRightClose

 className={`
 size-4

 text-muted-foreground

 transition-transform

 ${

 !panels.right

 ?

 "rotate-180"

 :

 ""

 }

 `}

 />

 </Button>

 </div>

 </header>

 );

}