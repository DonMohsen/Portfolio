import Link from 'next/link'
import React from 'react'

const ProjectsFilterNav = () => {
  return (
    <div  className='w-full  p-4 '>
      <p className='text-right font-extrabold font-serif'>
        
        پروژه ها    
      </p>
      <div className='rounded-lg border mt-10 p-4 flex flex-col '>
        <Link href="/projects?type=Practice"  className='w-full bg-green-500'>
        Practice
        </Link>
        <Link href="/projects?type=Copy"  className='w-full bg-red-500'>
        Copy
        </Link>
      </div>

</div>
  )
}

export default ProjectsFilterNav