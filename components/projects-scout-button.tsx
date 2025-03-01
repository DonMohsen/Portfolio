import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

const ProjectsScoutButton = () => {
  return (
<Button 
      className="group rounded-full text-xs md:text-sm border-none font-IRANSansXRegular  z-[50] p-5  shadow-none w-full hover:brightness-75 bg-slate-200 dark:bg-[#362144] flex items-center justify-center"
  >                                 
      <Link className="flex items-center justify-center gap-2"
      href="/projects"
      >
<ArrowLeft className="md:group-hover:-translate-x-2 -translate-x-1 -translate-y-[1px]  transition-transform duration-300 " />     
 <p className="font-IRANSansXDemiBold">
       پروژه ها
      </p>
      </Link>
      </Button>  )
}

export default ProjectsScoutButton