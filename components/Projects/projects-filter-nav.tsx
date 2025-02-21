"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const ProjectsFilterNav = () => {
  const router=useRouter();
  return (
    <div  className='w-full  p-4 '>
      <p className='text-right font-extrabold '>
        
        پروژه ها    
      </p>
      <div className='rounded-lg border mt-10 p-4 flex flex-col '>
        <div  onClick={()=>router.push("/projects?type=Practice")}   className='w-full bg-green-500' >
        Practice
        </div>
        <div onClick={()=>router.push("/projects?type=Copy")}  className='w-full bg-red-500'>
        Copy
        </div>
      </div>

</div>
  )
}

export default ProjectsFilterNav