import React from 'react'
import { InfiniteMovingCards } from './Infinite-cards';
import { InfiniteMovingCardsForCard } from './infinite-cards-for-card';

export const InfiniteScrollingForCard = () => {
   return (
       <div className="absolute -translate-y-[200px] lg:-translate-y-[200px] w-full h-full rounded-md flex flex-col antialiased bg-transparent dark:bg-transparent dark:bg-grid-white/[0.05]  items-center justify-end   overflow-hidden">
       <InfiniteMovingCardsForCard
         items={logos.filter((item)=>item.id<=6)}
         direction="right"
         speed="fast"
       />
       <InfiniteMovingCardsForCard
         items={logos.filter((item)=>item.id>6)}
         direction="left"
         speed="fast"
       />
     </div>
   );
 }
 
 export const logos = [
     
       {
         src:"/icons/nextjs.svg",
         name:"Next.js"
         ,id:1
     },  
 
     {
       src:"/icons/reactjs.svg",
       name:"React"
       ,id:2
   },
          
   {
     src:"/icons/prisma.svg",
     name:"Prisma ORM"
     ,id:3
 },    
 
 {
   src:"/icons/tailwindcss.svg",
   name:"Tailwind CSS"
   ,id:4
 },
     
 {
     src:"/icons/typescript.svg",
     name:"Typescript"
     ,id:5
 },
        
 {
     src:"/icons/expressjs.svg",
     name:"Express.js"
     ,id:6
 },
        
 {
     src:"/icons/redux.svg",
     name:"Redux"
     ,id:7
 },
     
 {
     src:"/icons/git.svg",
     name:"Git"
     ,id:8
 },
     
 {
     src:"/icons/restapi.svg",
     name:"Rest API"
     ,id:9
 },
     
 {
     src:"/icons/mongodb.svg",
     name:"Mongo DB"
     ,id:10
 },
    
        
 {
     src:"/icons/uiux.svg",
     name:"UI UX Patterns"
     ,id:11
 },
    
           
 {
   src:"/icons/framermotion.svg",
   name:"Framer Motion"
   ,id:12
 },
  
  
    
        
    
    
   ];
   