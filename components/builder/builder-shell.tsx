"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { templates } from "@/config/templates";
import { useBuilderStore } from "@/store/builder-store";

import { BuilderTopbar } from "./builder-topbar";
import { CommandPalette } from "./command-palette";
import { ComponentTree } from "./component-tree";
import { LiveCanvas } from "./live-canvas";
import { RuntimeMetadataPanel } from "./runtime-metadata-panel";
import { AICopilotPanel } from "./ai-copilot-panel";

interface BuilderShellProps{
 runtimeId?:string;
}

function clamp(
 n:number,
 min:number,
 max:number
){
 return Math.max(
  min,
  Math.min(max,n)
 );
}

export function BuilderShell({
 runtimeId,
}:BuilderShellProps){

 const params=
 useSearchParams();

 const{
  panels,
  setSchemaById,
  setSchemaByRuntimeId,
 }=
 useBuilderStore();

 const[
  leftWidth,
  setLeftWidth
 ]=
 useState(280);

 const[
  resizingLeft,
  setResizingLeft
 ]=
 useState(false);

 const shellRef=
 useRef<HTMLDivElement|null>(
  null
 );

 useEffect(()=>{

  if(runtimeId){

   setSchemaByRuntimeId(
    runtimeId
   );

   return;
  }

  const slug=
  params.get(
   "template"
  );

  const template=
  templates.find(
   t=>
   t.slug===slug
  );

  if(template){

   setSchemaById(
    template.schemaId
   );

  }

 },[
  params,
  runtimeId,
  setSchemaById,
  setSchemaByRuntimeId
 ]);


 useEffect(()=>{

  function move(
   e:PointerEvent
  ){

   if(
    !resizingLeft||
    !shellRef.current
   ) return;

   const rect=
   shellRef.current.getBoundingClientRect();

   setLeftWidth(

    clamp(

     e.clientX-
     rect.left,

     220,

     420

    )

   );

  }

  function stop(){

   setResizingLeft(
    false
   );

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

 },[
  resizingLeft
 ]);


 return(

 <div className="
 flex
 h-screen
 flex-col
 bg-background
 ">

  <BuilderTopbar/>

  <CommandPalette/>

  <div

   ref={shellRef}

   className="
   flex
   flex-1
   overflow-hidden
   "

  >


   {/* LEFT */}

   <aside

    style={{

     width:

     panels.left

     ?

     leftWidth

     :

     56

    }}

    className="
    hidden
    xl:flex
    flex-col
    border-r
    border-border
    bg-white
    transition-[width]
    duration-200
    relative
    flex-shrink-0
    shadow-sm
    "

   >

    {

     panels.left&&(

      <>

       <div className="
       flex-1
       overflow-y-auto
       p-3
       ">

        <RuntimeMetadataPanel/>

        <div className="
        mt-4
        border-t
        border-border
        pt-4
        ">

         <div className="
         mb-2
         text-xs
         uppercase
         text-muted-foreground
         ">

          Runtime Tree

         </div>

         <ComponentTree/>

        </div>

       </div>


       <div

        onPointerDown={()=>

         setResizingLeft(
          true
         )

        }

        className="
        absolute
        right-0
        top-0
        h-full
        w-2
        cursor-ew-resize
        "

       />

      </>

     )

    }

   </aside>



   {/* CENTER */}

   <main className="
   flex-1
   overflow-y-auto
   bg-background
   ">

    <LiveCanvas/>

   </main>



   {/* RIGHT */}

   <AICopilotPanel/>

  </div>

 </div>

 );

}