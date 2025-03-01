import Image from 'next/image'
import React from 'react'

import SocialLinks from './social-links'
import ResumeDownloadButton from './Home/ResumeDownloadButton'
import ProjectsScoutButton from './projects-scout-button'
import { InfiniteScrollingForCard } from './Home/Hero/infinite-scrolling-for-card'

const PersonalCard = () => {
  return (
    <div className='relative h-[100vh] '>
            {/* //!Top SECTION */}
            <div className="bg-[#353535] h-[300px] relative flex justify-center">
  <Image
    className="rounded-full absolute bottom-[-25px] left-1/2 transform -translate-x-1/2 w-[100px] h-[100px]"
    alt="Profile-pic"
    src="/image-placeholder.webp"
    width={200}
    height={200}
  />
</div>
<div className='w-full flex items-center justify-center flex-col mt-10 px-[5%]'>

<h1 className='text-center font-IRANSansXBlack text-xl'>
    لورم اخیرسوم 
</h1>
<h2 className='text-center mt-2 font-IRANSansXRegular'>
توسعه دهنده وب متمرکز فرانت اند
</h2>
<h3 className='mt-2'>
    location of unknown
</h3>
<div className='mt-10'>

        <SocialLinks/>
        
</div>
        <div className='flex  items-center justify-center gap-6 mt-10'>

        <ProjectsScoutButton/>
        <ResumeDownloadButton/>

        </div>
  
</div>
<div className='absolute bottom-0 w-full h-auto'>

<InfiniteScrollingForCard/>
</div>
    </div>
  )
}

export default PersonalCard