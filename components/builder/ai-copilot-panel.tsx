"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  useBuilderStore,
} from "@/store/builder-store";

type ActivityItem = {
  time:string;
  title:string;
  detail:string;
  tone:string;
};

const suggestions=[
 "Add KPI",
 "Add API",
 "Workflow",
 "Chart"
];

function clamp(
 n:number,
 min:number,
 max:number
){
 return Math.max(
  min,
  Math.min(
   max,
   n
  )
 );
}

export function AICopilotPanel(){

 const{

  schema,
  panels,
  togglePanel

 }=

 useBuilderStore();

 const[
  width,
  setWidth
 ]=
 useState(
 390
 );

 const dragging=
 useRef(false);

 const startX=
 useRef(0);

 const startWidth=
 useRef(390);

 const history=
 useBuilderStore(

  s=>

  s.schema.history

 ) as ActivityItem[];

 const messages=
 useMemo(

 ()=>

 history.slice(
  0,
  5
 ),

 [history]

 );


 useEffect(()=>{

  function move(
   e:PointerEvent
  ){

   if(
    !dragging.current
   ) return;

   const delta=

   startX.current-

   e.clientX;


   setWidth(

    clamp(

     startWidth.current+

     delta,

     320,

     520

    )

   );

  }


  function stop(){

   dragging.current=
   false;

  }


  window.addEventListener(
   "pointermove",
   move
  );

  window.addEventListener(
   "pointerup",
   stop
  );


  return()=>{

   window.removeEventListener(
    "pointermove",
    move
   );

   window.removeEventListener(
    "pointerup",
    stop
   );

  };

 },[]);



 return(

 <aside

 style={{

 width:

 panels.right

 ?

 width

 :

 56

 }}

 className="
 hidden
 xl:flex
 flex-col
 border-l
 border-border
 bg-white
 transition-[width]
 duration-200
 relative
 flex-shrink-0
 shadow-sm
 "

 >


 <div className="
 flex
 items-center
 gap-2
 border-b
 border-border
 px-3
 py-3
 ">

 <Button

 size="icon"

 variant="ghost"

 onClick={()=>

 togglePanel(
  "right"
 )

 }

 >

 {

 panels.right

 ?

 <ChevronLeft/>

 :

 <ChevronRight/>

 }

 </Button>



 {

 panels.right&&(

 <>

 <div className="flex-1">

 <div className="
 flex
 justify-between
 items-center
 ">

 <div className="
 font-semibold
 text-foreground
 ">

 OneAtlas Chat

 </div>



 <Badge
 tone="success"
 >

 Connected

 </Badge>

 </div>



 <div className="
 mt-1
 text-xs
 text-muted-foreground
 ">

 v{

 schema.version

 }

 </div>

 </div>

 </>

 )

 }

 </div>




 {

 panels.right&&(

 <>

 {/* Suggestions */}

 <div className="
 p-3
 flex
 flex-wrap
 gap-2
 ">

 {

 suggestions.map(

 s=>(

 <Button

 key={s}

 size="sm"

 variant="outline"

 className="
 bg-muted
 hover:bg-runtime/5
 "

 >

 {s}

 </Button>

 )

 )

 }

 </div>




 {/* Chat */}

 <div className="
 flex-1
 overflow-y-auto
 p-3
 space-y-4
 ">

 {

 messages.map(

 m=>(

 <div
 key={m.time}
 >

 <div className="
 ml-auto
 mb-2
 rounded-xl
 bg-runtime/8
 p-3
 text-sm
 text-foreground
 ">

 <div className="
 mb-1
 text-xs
 text-runtime
 ">

 You

 </div>

 {m.title}

 </div>



 <div className="
 rounded-xl
 bg-muted
 p-3
 ">

 <div className="
 mb-1
 text-xs
 text-runtime
 ">

 Assistant

 </div>



 <div className="
 text-sm
 text-foreground
 ">

 {m.detail}

 </div>



 <div className="
 mt-2
 text-xs
 text-muted-foreground
 ">

 {m.time}

 </div>

 </div>

 </div>

 )

 )

 }

 </div>




 {/* Input */}

 <div className="
 border-t
 border-border
 p-3
 ">

 <input

 placeholder="Ask OneAtlas..."

 className="
 w-full
 rounded-xl
 border
 border-border
 bg-muted
 px-4
 py-3
 text-sm
 outline-none
 "

 />

 </div>

 </>

 )

 }




 {

 panels.right&&(

 <div

 onPointerDown={

 e=>{

 dragging.current=
 true;

 startX.current=
 e.clientX;

 startWidth.current=
 width;

 }

 }

 className="
 absolute
 left-0
 top-0
 h-full
 w-2
 cursor-ew-resize
 "

 />

 )

 }


 </aside>

 );

}