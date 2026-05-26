"use client";

import { useState } from "react";

import {
 ChevronDown,
 Layers3,
} from "lucide-react";

import type{
 BuilderComponentNode,
}
from "@/types";

import {
 useBuilderStore,
}
from "@/store/builder-store";

import {
 cn,
}
from "@/lib/utils";



export function ComponentTree(){

 const{

 schema,
 selectedId,
 selectComponent,

 }=

 useBuilderStore();


 return(

 <div className="
 space-y-1
 ">

 {

 schema.components.map(

 node=>(

 <TreeNode

 key={
 node.id
 }

 node={
 node
 }

 selectedId={
 selectedId
 }

 selectComponent={
 selectComponent
 }

 />

 )

 )

 }

 </div>

 );

}







function TreeNode({

 node,

 selectedId,

 selectComponent,

}:{

 node:
 BuilderComponentNode;

 selectedId:
 string;

 selectComponent:
 (
 id:string
 )=>void;

}){

 const[
 open,
 setOpen
 ]=
 useState(
 true
 );


 const active=

 selectedId===

 node.id;



 return(

 <div>

 <button

 onClick={()=>{

 selectComponent(
 node.id
 );

 if(
 node.children
 ){

 setOpen(
 !open
 );

 }

 }}

 className={

 cn(

 `
 flex

 w-full

 items-center

 justify-between

 rounded-lg

 px-3

 py-2

 text-left

 text-sm

 transition

 hover:bg-runtime/5
 `,

 active&&

 `
 bg-runtime/10

 border

 border-runtime/20

 text-runtime
 `

 )

 }

 >



 <div className="
 flex

 items-center

 gap-2

 overflow-hidden
 ">

 <Layers3

 className={

 cn(

 `
 size-4

 text-muted-foreground
 `,

 active&&

 "text-runtime"

 )

 }

 />



 <span className="
 truncate

 text-foreground
 ">

 {

 node.name

 }

 </span>

 </div>







 {

 node.children&&(

 <ChevronDown

 className={

 cn(

 `
 size-4

 text-muted-foreground

 transition
 `,

 !open&&

 "-rotate-90"

 )

 }

 />

 )

 }

 </button>








 {

 node.children&&(

 <div

 className={

 cn(

 `
 ml-4

 overflow-hidden

 border-l

 border-border

 pl-3

 transition-all

 duration-200
 `,

 open

 ?

 "max-h-[600px]"

 :

 "max-h-0"

 )

 }

 >

 <div className="
 py-1

 space-y-1
 ">

 {

 node.children.map(

 child=>(

 <TreeNode

 key={
 child.id
 }

 node={
 child
 }

 selectedId={
 selectedId
 }

 selectComponent={
 selectComponent
 }

 />

 )

 )

 }

 </div>

 </div>

 )

 }

 </div>

 );

}