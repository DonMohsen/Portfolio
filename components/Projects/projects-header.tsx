import { Search, SlidersHorizontal } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const ProjectsHeader = () => {
  return (
    <div className="w-full mt-[100px] bg-white dark:bg-black flex flex-col  mb-5">
    <div className="w-full flex items-center justify-between">
      <div className="flex items-center border border-gray-400 py-2 rounded-full px-2 my-4">
        <Search className="w-5 h-5 text-gray-500" />
        <input
          type="text"
          placeholder="Search
          ..."
          className="flex-1 bg-transparent border-none outline-none px-2"
        />
      </div>
    
      <SlidersHorizontal className="cursor-pointer hover:scale-125 transition-all duration-300" />
    </div>
    <div className="w-full">
      <p> results</p>
    </div>
  </div>  )
}

export default ProjectsHeader